

import Company from "../Models/company.model.js";
import User from "../Models/user.model.js";
import { CompanyCategory, CompanySubCategory } from "../Models/companyCategory.model.js";
import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';


// export const getCompanyById = async (req, res) => {
//   try {
//     const { companyId } = req.params;

//     if (!companyId) {
//       return res.status(400).json({ success: false, message: "Company ID is required" });
//     }

//     // Fetch company with all relations populated
//     const company = await Company.findById(companyId)
//       .populate("category", "name type")
//       .populate("subCategory", "name")
//       .populate("approvedBy", "name email role")
//       .populate("registeredBy", "name email role")
//       .populate({
//         path: "products",
//         select: "name description price images stock status", // adjust fields based on your Product model
//       });

//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Company details fetched successfully",
//       data: company,
//     });
//   } catch (error) {
//     console.error("Get Company By ID Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };



export const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({ success: false, message: "Company ID is required" });
    }

    // Fetch company with all relations populated
    const company = await Company.findById(companyId)
      .populate("category", "name type")
      .populate("subCategory", "name")
      .populate("approvedBy", "name email role")
      .populate("registeredBy", "name email role")
      .populate({
        path: "products",
        select: "name description price images stock status",
      })
      // ✅ Added these three populates:
      .populate("country", "name code")  // show country name, code etc.
      .populate("state", "name")         // show state name
      .populate("city", "name");         // show city name

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      message: "Company details fetched successfully",
      data: company,
    });
  } catch (error) {
    console.error("Get Company By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const registerCompany = async (req, res) => {
  try {
    const {
      name, email, phone, password,
      address, city, state, country,
      gstNumber, aadhaarNumber,
      category: categoryId, subCategory: subCategoryId, companyType,
      website, socialLinks, googleMapsLink,
      businessTimings, description, keywords
    } = req.body;

    const userId = req.user._id;

      const alreadyRegistered = await Company.findOne({ registeredBy: userId });
    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You have already registered a company. Multiple registrations are not allowed."
      });
    }

    // 🔹 Validate category
    const category = await CompanyCategory.findById(categoryId);
    if (!category) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // 🔹 Validate subCategory (if provided)
    let subCategory = null;
    if (subCategoryId) {
      subCategory = await CompanySubCategory.findById(subCategoryId);
      if (!subCategory) {
        return res.status(400).json({ success: false, message: "Invalid subcategory" });
      }
      if (String(subCategory.parentCategory) !== String(category._id)) {
        return res.status(400).json({ success: false, message: "SubCategory does not belong to selected category" });
      }
      if (category.type === "service") {
        return res.status(400).json({ success: false, message: "Services category cannot have subcategories" });
      }
    }

    // 🔹 Check duplicate company email
    const existing = await Company.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Company already registered" });
    }

    // 🔹 Upload files
    let logo = null,
      banners = [],
      aadhaarImage = null,
      panImage = null,
      electricityBillImage = null,
      passportPhoto = null; // ✅ NEW

    if (req.files?.logo) {
      logo = await uploadFileToSpaces(req.files.logo[0], "company/logo");
    }
    if (req.files?.banner) {
      banners = await Promise.all(
        req.files.banner.map(f => uploadFileToSpaces(f, "company/banner"))
      );
    }
    if (req.files?.aadhaar) {
      aadhaarImage = await uploadFileToSpaces(req.files.aadhaar[0], "company/documents");
    }
    if (req.files?.pan) {
      panImage = await uploadFileToSpaces(req.files.pan[0], "company/documents");
    }
    if (req.files?.electricityBill) {
      electricityBillImage = await uploadFileToSpaces(req.files.electricityBill[0], "company/documents");
    }
    if (req.files?.passportPhoto) {
      passportPhoto = await uploadFileToSpaces(req.files.passportPhoto[0], "company/documents"); // ✅ NEW
    }

    // 🔹 Save company
    const company = await Company.create({
      name, email, phone, password,
      address, city, state, country,
      gstNumber, aadhaarNumber,
      category: category._id,
      subCategory: subCategory ? subCategory._id : null,
      companyType,
      website,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : [],
      googleMapsLink,
      businessTimings: businessTimings ? JSON.parse(businessTimings) : {},
      description,
      keywords: keywords ? JSON.parse(keywords) : [],
      logo,
      banner: banners,
      aadhaarImage,
      panImage,
      electricityBillImage,
      passportPhoto, // ✅ NEW
      isApproved: false,
      registeredBy: userId
    });

    res.status(201).json({
      success: true,
      message: "Company registered successfully. Waiting for admin approval.",
      data: company
    });
  } catch (error) {
    console.error("Register Company Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};




export const approveCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const adminId = req.user._id;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    company.isApproved = true;
    company.approvedBy = adminId;
    await company.save();

    // ✅ Update user who registered this company
    if (company.registeredBy) {
      await User.findByIdAndUpdate(company.registeredBy, { companyRegistered: true });
    }

    res.status(200).json({ success: true, message: "Company approved successfully", data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Admin rejects company
export const rejectCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    if (company.logo) await deleteFileFromSpaces(company.logo);
    if (company.banner?.length) await Promise.all(company.banner.map(b => deleteFileFromSpaces(b)));
    if (company.photos?.length) await Promise.all(company.photos.map(p => deleteFileFromSpaces(p)));

    await company.deleteOne();

    res.status(200).json({ success: true, message: "Company rejected/deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};








export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("category", "name type")
      .populate("subCategory", "name")
      .populate("approvedBy", "name email")
      .populate("registeredBy", "name email");

    res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};








// Modified controller to get companies by category ID with top 20 and alphabetical sorting
export const getCompaniesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const categoryExists = await CompanyCategory.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Fetch only APPROVED companies for the specified category
    const allApprovedCompaniesInCategory = await Company.find({ category: categoryId, isApproved: true })
      .populate("category", "name type")
      .populate("subCategory", "name")
      .populate("approvedBy", "name email")
      .populate("registeredBy", "name email")
      .lean(); // Use .lean() for performance if you don't need Mongoose document methods

    if (allApprovedCompaniesInCategory.length === 0) {
      return res.status(404).json({ success: false, message: "No approved companies found for this category." });
    }

    // Separate into top (priorityRank 1-20) and other companies
    const topCompanies = allApprovedCompaniesInCategory
      .filter(company => company.priorityRank && company.priorityRank >= 1 && company.priorityRank <= 20)
      .sort((a, b) => a.priorityRank - b.priorityRank); // Sort by priorityRank ascending

    const otherCompanies = allApprovedCompaniesInCategory
      .filter(company => !company.priorityRank || company.priorityRank < 1 || company.priorityRank > 20)
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    res.status(200).json({
      success: true,
      message: `Companies in category '${categoryExists.name}' fetched successfully with priority.`,
      data: {
        top20: topCompanies,
        alphabetical: otherCompanies
      },
    });
  } catch (error) {
    console.error("Get Companies By Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



// ... (registerCompany, approveCompany, rejectCompany, getAllCompanies, getCompaniesByCategory functions will remain as they are) ...


export const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const {
      name, email, phone, address, city, state, country,
      gstNumber, aadhaarNumber, category, subCategory, companyType,
      website, socialLinks, googleMapsLink, businessTimings,
      description, keywords, isApproved, isPremium, priorityRank // Crucial: include priorityRank
    } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Store current category and old priorityRank for uniqueness check later
    // These are needed before potentially updating company.category
    const currentCompanyCategory = company.category;
    const oldPriorityRank = company.priorityRank;

    // Update other fields only if they are provided in the request
    if (name !== undefined) company.name = name;
    if (email !== undefined) company.email = email;
    if (phone !== undefined) company.phone = phone;
    if (address !== undefined) company.address = address;
    if (city !== undefined) company.city = city;
    if (state !== undefined) company.state = state;
    if (country !== undefined) company.country = country;
    if (gstNumber !== undefined) company.gstNumber = gstNumber;
    if (aadhaarNumber !== undefined) company.aadhaarNumber = aadhaarNumber;
    
    // If category is updated, the uniqueness check must apply to the new category
    if (category !== undefined) company.category = category;
    if (subCategory !== undefined) company.subCategory = subCategory;

    if (companyType !== undefined) company.companyType = companyType;
    if (website !== undefined) company.website = website;
    if (socialLinks !== undefined) company.socialLinks = JSON.parse(socialLinks); // Assuming it comes as stringified JSON
    if (googleMapsLink !== undefined) company.googleMapsLink = googleMapsLink;
    if (businessTimings !== undefined) company.businessTimings = JSON.parse(businessTimings); // Assuming it comes as stringified JSON
    if (description !== undefined) company.description = description;
    if (keywords !== undefined) company.keywords = JSON.parse(keywords); // Assuming it comes as stringified JSON
    if (isApproved !== undefined) company.isApproved = isApproved;
    if (isPremium !== undefined) company.isPremium = isPremium;

    // --- Handle priorityRank update with uniqueness check ---
    if (priorityRank !== undefined) {
      const newRank = parseInt(priorityRank, 10);

      // If a valid rank (1-20) is being proposed
      if (!isNaN(newRank) && newRank >= 1 && newRank <= 20) {
        // Only perform uniqueness check if the rank is actually changing
        // or if an old rank was null/undefined and a new rank is being set
        if (newRank !== oldPriorityRank || (oldPriorityRank === null && newRank !== null)) {
            // Check if another approved company in the (potentially new) category already has this priorityRank
            const duplicateRankCompany = await Company.findOne({
                _id: { $ne: companyId }, // Exclude the current company itself from the search
                category: company.category, // Use the potentially updated category
                isApproved: true, // Only check against other approved companies
                priorityRank: newRank // Check for the new rank value
            });

            if (duplicateRankCompany) {
                return res.status(400).json({
                    success: false,
                    message: `Priority Rank #${newRank} is already assigned to another approved company (${duplicateRankCompany.name}) in this category. Please choose a different rank.`
                });
            }
        }
        company.priorityRank = newRank; // If unique, set the new valid rank
      } else {
        // If the rank is invalid (not a number, or outside 1-20 range) or empty string, set it to null
        company.priorityRank = null;
      }
    }

    // Handle file uploads (logo, banner etc.) - this part typically needs more sophisticated logic
    // for updates, checking if new files are provided and deleting old ones if necessary.
    // For this context, we're assuming priorityRank is the primary update.

    await company.save();

    res.status(200).json({ success: true, message: "Company updated successfully", data: company });
  } catch (error) {
    console.error("Update Company Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// New: Get company's own profile (for the company itself)
export const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `req.user` is set by authentication middleware

    const company = await Company.findOne({ registeredBy: userId })
      .populate("category", "name type")
      .populate("subCategory", "name")
      .populate("approvedBy", "name email")
      .populate({ // PRODUCTS KO BHI POPULATE KAREIN
          path: 'products',
          // match: { status: { $ne: 'pending_delete' } }, // Optional: pending_delete products ko na dikhaye
          populate: [ // Products ke andar ki category aur subcategory ko bhi populate karein
              { path: 'category', select: 'name' },
              { path: 'subCategory', select: 'name' }
          ]
      });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company profile not found for this user." });
    }

    // `company.products` field ab populated hoga agar usmein IDs hain
    // Toh `products` ko alag se fetch karne ki zaroorat nahi hai agar `populate` use kiya gaya hai.
    // Lekin agar aapko non-approved products bhi dikhane hain ya specific filter karna hai, to alag se fetch kar sakte hain.
    // For company profile, showing all products (including pending/rejected) is appropriate.
    // Agar alag se products fetch karna hai:
    // const products = await Product.find({ company: company._id })
    //     .populate('category', 'name')
    //     .populate('subCategory', 'name')
    //     .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      message: "Company profile fetched successfully.",
      data: company // `company` object mein ab `products` array populated hoga
    });
  } catch (error) {
    console.error("Get Company Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};




// export const requestCompanyUpdate = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const company = await Company.findOne({ registeredBy: userId });

//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     if (company.companyStatus === "pending_update") {
//       return res.status(400).json({ success: false, message: "Update already pending approval" });
//     }

//     // Merge only changed fields
//     const updatedFields = req.body;
//     company.pendingProfileUpdates = updatedFields; // Store changes
//     company.companyStatus = "pending_update";

//     await company.save();

//     res.status(200).json({
//       success: true,
//       message: "Update request submitted for admin approval",
//       data: company.pendingProfileUpdates,
//     });
//   } catch (error) {
//     console.error("Request Company Update Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


// export const requestCompanyUpdate = async (req, res) => {
//   try {

//       console.log('req.body (text fields from form):', req.body);
//        console.log('req.files (files parsed by Multer):', req.files);
//     const userId = req.user._id;
//     const company = await Company.findOne({ registeredBy: userId });
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     if (company.companyStatus === "pending_update") {
//       return res.status(400).json({ success: false, message: "Update already pending approval" });
//     }
  
//     // Upload files if present
//     let filesToUpdate = {};
//     if (req.files?.logo) {
//       filesToUpdate.logo = await uploadFileToSpaces(req.files.logo[0], "company/logo");
//     }
//     if (req.files?.banner) {
//       filesToUpdate.banner = await Promise.all(req.files.banner.map(f => uploadFileToSpaces(f, "company/banner")));
//     }
//     if (req.files?.aadhaar) {
//       filesToUpdate.aadhaarImage = await uploadFileToSpaces(req.files.aadhaar[0], "company/documents");
//     }
//     if (req.files?.pan) {
//       filesToUpdate.panImage = await uploadFileToSpaces(req.files.pan[0], "company/documents");
//     }
//     if (req.files?.electricityBill) {
//       filesToUpdate.electricityBillImage = await uploadFileToSpaces(req.files.electricityBill[0], "company/documents");
//     }
//     if (req.files?.passportPhoto) {
//       filesToUpdate.passportPhoto = await uploadFileToSpaces(req.files.passportPhoto[0], "company/documents");
//     }

//     // Merge body fields and files
//     const updatedFields = { ...req.body, ...filesToUpdate };
//     company.pendingProfileUpdates = updatedFields;
//     company.companyStatus = "pending_update";

//     await company.save();

//     res.status(200).json({
//       success: true,
//       message: "Update request submitted for admin approval",
//       data: company.pendingProfileUpdates,
//     });

//   } catch (error) {
//     console.error("Request Company Update Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


// export const requestCompanyUpdate = async (req, res) => {
//   try {
//     console.log('req.body (text fields from form):', req.body);
//     console.log('req.files (files parsed by Multer):', req.files);
    
//     const userId = req.user._id;
//     const company = await Company.findOne({ registeredBy: userId });
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     if (company.companyStatus === "pending_update") {
//       return res.status(400).json({ success: false, message: "Update already pending approval" });
//     }
  
//     // Upload files if present
//     let filesToUpdate = {};
//     if (req.files?.logo) {
//       filesToUpdate.logo = await uploadFileToSpaces(req.files.logo[0], "company/logo");
//     }
//     if (req.files?.banner) {
//       filesToUpdate.banner = await Promise.all(req.files.banner.map(f => uploadFileToSpaces(f, "company/banner")));
//     }
//     if (req.files?.aadhaar) {
//       filesToUpdate.aadhaarImage = await uploadFileToSpaces(req.files.aadhaar[0], "company/documents");
//     }
//     if (req.files?.pan) {
//       filesToUpdate.panImage = await uploadFileToSpaces(req.files.pan[0], "company/documents");
//     }
//     if (req.files?.electricityBill) {
//       filesToUpdate.electricityBillImage = await uploadFileToSpaces(req.files.electricityBill[0], "company/documents");
//     }
//     if (req.files?.passportPhoto) {
//       filesToUpdate.passportPhoto = await uploadFileToSpaces(req.files.passportPhoto[0], "company/documents");
//     }

//     // Prepare updatedFields by parsing stringified JSON fields
//     const updatedFields = { ...req.body, ...filesToUpdate };

//     // Explicitly parse JSON string fields back to objects/arrays
//     if (updatedFields.businessTimings && typeof updatedFields.businessTimings === 'string') {
//         try {
//             updatedFields.businessTimings = JSON.parse(updatedFields.businessTimings);
//         } catch (e) {
//             console.error("Failed to parse businessTimings:", e);
//             return res.status(400).json({ success: false, message: "Invalid business timings format." });
//         }
//     }
//     if (updatedFields.socialLinks && typeof updatedFields.socialLinks === 'string') {
//         try {
//             updatedFields.socialLinks = JSON.parse(updatedFields.socialLinks);
//         } catch (e) {
//             console.error("Failed to parse socialLinks:", e);
//             return res.status(400).json({ success: false, message: "Invalid social links format." });
//         }
//     }
//     if (updatedFields.keywords && typeof updatedFields.keywords === 'string') {
//         try {
//             updatedFields.keywords = JSON.parse(updatedFields.keywords);
//         } catch (e) {
//             console.error("Failed to parse keywords:", e);
//             return res.status(400).json({ success: false, message: "Invalid keywords format." });
//         }
//     }
//     // Handle category and subCategory, which are sent as IDs if changed
//     if (updatedFields.category) {
//         updatedFields.category = updatedFields.category; // Mongoose will handle casting to ObjectId
//     }
//     if (updatedFields.subCategory) {
//         updatedFields.subCategory = updatedFields.subCategory; // Mongoose will handle casting to ObjectId
//     }

//     company.pendingProfileUpdates = updatedFields;
//     company.companyStatus = "pending_update";

//     await company.save();

//     res.status(200).json({
//       success: true,
//       message: "Update request submitted for admin approval",
//       data: company.pendingProfileUpdates,
//     });

//   } catch (error) {
//     console.error("Request Company Update Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };




// Example of how your Company model and uploadFileToSpaces might be imported
// import Company from '../models/Company';
// import { uploadFileToSpaces } from '../utils/fileUpload'; // Your actual file upload utility

export const requestCompanyUpdate = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available from authentication
    const company = await Company.findOne({ registeredBy: userId });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    if (company.companyStatus === "pending_update") {
      return res.status(400).json({ success: false, message: "Update already pending approval" });
    }

    // --- File Uploads ---
    let uploadedFiles = {};
    if (req.files?.logo) {
      uploadedFiles.logo = await uploadFileToSpaces(req.files.logo[0], "company/logo");
    }
    if (req.files?.banner) {
      uploadedFiles.newBanners = await Promise.all(req.files.banner.map(f => uploadFileToSpaces(f, "company/banner")));
    }
    if (req.files?.aadhaar) {
      uploadedFiles.aadhaarImage = await uploadFileToSpaces(req.files.aadhaar[0], "company/documents");
    }
    if (req.files?.pan) {
      uploadedFiles.panImage = await uploadFileToSpaces(req.files.pan[0], "company/documents");
    }
    if (req.files?.electricityBill) {
      uploadedFiles.electricityBillImage = await uploadFileToSpaces(req.files.electricityBill[0], "company/documents");
    }
    if (req.files?.passportPhoto) {
      uploadedFiles.passportPhoto = await uploadFileToSpaces(req.files.passportPhoto[0], "company/documents");
    }
    // --- End File Uploads ---

    const updatedFields = { ...req.body, ...uploadedFiles };

    // --- Parse JSON string fields ---
    ['businessTimings', 'socialLinks', 'keywords', 'bannersToDelete'].forEach(field => {
      if (updatedFields[field] && typeof updatedFields[field] === 'string') {
        try {
          updatedFields[field] = JSON.parse(updatedFields[field]);
        } catch (e) {
          console.error(`Failed to parse ${field}:`, e);
          return res.status(400).json({ success: false, message: `Invalid ${field} format.` });
        }
      }
    });
    // --- End Parse JSON string fields ---

    // --- Handle Banners (existing, to delete, and new uploads) ---
    let finalBannersForPending = company.banner || [];

    // Remove banners marked for deletion
    if (updatedFields.bannersToDelete && Array.isArray(updatedFields.bannersToDelete)) {
      finalBannersForPending = finalBannersForPending.filter(url => !updatedFields.bannersToDelete.includes(url));
    }

    // Add newly uploaded banners
    if (uploadedFiles.newBanners && Array.isArray(uploadedFiles.newBanners)) {
      finalBannersForPending = [...finalBannersForPending, ...uploadedFiles.newBanners];
    }
    updatedFields.banner = finalBannersForPending; // Assign the merged banner array
    delete updatedFields.newBanners; // Clean up temporary field
    delete updatedFields.bannersToDelete; // Clean up temporary field
    // --- End Handle Banners ---

    // Ensure category and subCategory are stored as IDs if they exist and are not already objects
    if (updatedFields.category && typeof updatedFields.category === 'string') {
        // Mongoose will convert to ObjectId on save
    }
    if (updatedFields.subCategory && typeof updatedFields.subCategory === 'string') {
        // Mongoose will convert to ObjectId on save
    }

    company.pendingProfileUpdates = updatedFields;
    company.companyStatus = "pending_update";
    company.updatedAt = new Date(); // Update the timestamp for the request

    await company.save();

    // Populate category and subCategory for the response to the user's profile page
    // This allows the frontend to display the names of the selected category/subcategory
    const populatedPendingUpdates = await Company.populate(company.pendingProfileUpdates, [
      { path: 'category', select: 'name' },
      { path: 'subCategory', select: 'name' }
    ]);

    res.status(200).json({
      success: true,
      message: "Update request submitted for admin approval",
      data: populatedPendingUpdates, // Send the populated pending updates
    });

  } catch (error) {
    console.error("Request Company Update Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getPendingCompanyUpdates = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ companyStatus: "pending_update" })
      .populate("registeredBy", "name email")
      .populate("category subCategory");

    res.status(200).json({
      success: true,
      message: "Pending company updates fetched successfully.",
      data: pendingCompanies,
    });
  } catch (error) {
    console.error("Get Pending Updates Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const approveCompanyUpdate = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    if (!company.pendingProfileUpdates) {
      return res.status(400).json({ success: false, message: "No pending updates found" });
    }

    // Apply pending updates
    Object.entries(company.pendingProfileUpdates).forEach(([key, value]) => {
      company[key] = value;
    });

    company.pendingProfileUpdates = null;
    company.companyStatus = "approved";

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company update approved successfully",
      data: company,
    });
  } catch (error) {
    console.error("Approve Company Update Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const rejectCompanyUpdate = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    company.pendingProfileUpdates = null;
    company.companyStatus = "approved"; // revert back to approved
    await company.save();

    res.status(200).json({ success: true, message: "Update request rejected successfully" });
  } catch (error) {
    console.error("Reject Company Update Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const getApprovedCompanies = async (req, res) => {
  try {
    const companies = await Company.find({
      $or: [
        { companyStatus: "approved" },
        { companyStatus: "pending_update" }, // show old data till update approved
      ],
      isApproved: true,
    });

    const formatted = companies.map((c) => {
      // Show old (live) data, ignore pending update
      const liveData = { ...c.toObject() };
      delete liveData.pendingProfileUpdates;
      return liveData;
    });

    res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

