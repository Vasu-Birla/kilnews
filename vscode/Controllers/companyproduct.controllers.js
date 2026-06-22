// import Product from "../Models/companyProduct.model.js";
// import Company from "../Models/company.model.js";
// import { CompanyCategory, CompanySubCategory } from "../Models/companyCategory.model.js";
// import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';

// // Helper function to check if user owns the company
// const checkCompanyOwnership = async (req, res, companyId) => {
//   const company = await Company.findById(companyId);
//   if (!company) {
//     return res.status(404).json({ success: false, message: "Company not found." });
//   }
//   // Assuming req.user._id is the ID of the user who registered the company
//   if (String(company.registeredBy) !== String(req.user._id)) {
//     return res.status(403).json({ success: false, message: "You are not authorized to manage this company's products." });
//   }
//   return company;
// };

// // ------------------- Company Product Management -------------------

// // Create a new product (by company)
// export const createProduct = async (req, res) => {
//   try {
//     const {
//       companyId, name, description, categoryId, subCategoryId // 'price' field removed
//     } = req.body;

//     const company = await checkCompanyOwnership(req, res, companyId);
//     if (res.headersSent) return;

//     // Validate category and subcategory
//     const category = await CompanyCategory.findById(categoryId);
//     if (!category) return res.status(400).json({ success: false, message: "Invalid category for product." });

//     let subCategory = null;
//     if (subCategoryId) {
//       subCategory = await CompanySubCategory.findById(subCategoryId);
//       if (!subCategory) return res.status(400).json({ success: false, message: "Invalid subcategory for product." });
//       if (String(subCategory.parentCategory) !== String(category._id)) {
//         return res.status(400).json({ success: false, message: "SubCategory does not belong to selected category." });
//       }
//     }

//     // Handle image uploads for products
//     let images = [];
//     if (req.files && req.files.images) {
//       images = await Promise.all(
//         req.files.images.map(f => uploadFileToSpaces(f, `products/${companyId}/images`))
//       );
//     }

//     const product = await Product.create({
//       company: companyId,
//       name,
//       description,
//       images,
//       category: category._id,
//       subCategory: subCategory ? subCategory._id : null,
//       isApproved: false, // Requires admin approval
//       status: 'pending', // Initial status
//     });

//     // --- NEW: Add product ID to company's products array ---
//     company.products.push(product._id);
//     await company.save();
//     // --------------------------------------------------------

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully. Awaiting admin approval.",
//       data: product,
//     });
//   } catch (error) {
//     console.error("Create Product Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get all products for a specific company (for the company itself - shows pending/rejected)
// export const getCompanyProducts = async (req, res) => {
//   try {
//     const { companyId } = req.params;

//     const company = await checkCompanyOwnership(req, res, companyId);
//     if (res.headersSent) return;

//     // Products ko fetch karte waqt populate nahi karna chahiye
//     // kyunki company ka products array sirf references rakhta hai.
//     // Agar company ke products ke details chahiye, to alag se Product.find() use karna behtar hai.
//     // Lekin is function mein seedhe Product model se fetch kar rahe hain, jo sahi hai.
//     const products = await Product.find({ company: companyId })
//       .populate('category', 'name')
//       .populate('subCategory', 'name')
//       .sort({ createdAt: -1 }); // Latest first

//     res.status(200).json({
//       success: true,
//       message: "Company products fetched successfully.",
//       data: products,
//     });
//   } catch (error) {
//     console.error("Get Company Products Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Get a single product by ID (for company to view its own product)
// export const getProductByIdForCompany = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found." });

//     // Ensure the product belongs to the requesting company
//     const company = await checkCompanyOwnership(req, res, product.company);
//     if (res.headersSent) return;

//     res.status(200).json({
//       success: true,
//       message: "Product fetched successfully.",
//       data: product,
//     });
//   } catch (error) {
//     console.error("Get Product By ID For Company Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Update a product (by company)
// export const updateProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { name, description, categoryId, subCategoryId, existingImages, removeImageUrls } = req.body; // 'price' field removed

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found." });

//     const company = await checkCompanyOwnership(req, res, product.company);
//     if (res.headersSent) return;

//     // Handle image deletions
//     let updatedImages = product.images;
//     if (removeImageUrls && Array.isArray(JSON.parse(removeImageUrls))) {
//       const imagesToRemove = JSON.parse(removeImageUrls);
//       await Promise.all(imagesToRemove.map(url => deleteFileFromSpaces(url)));
//       updatedImages = updatedImages.filter(img => !imagesToRemove.includes(img));
//     }

//     if (existingImages && Array.isArray(JSON.parse(existingImages))) {
//         const keptImages = JSON.parse(existingImages);
//         const imagesToDeleteNotKept = updatedImages.filter(img => !keptImages.includes(img));
//         await Promise.all(imagesToDeleteNotKept.map(url => deleteFileFromSpaces(url)));
//         updatedImages = keptImages;
//     }

//     // Handle new image uploads
//     if (req.files && req.files.images) {
//       const newImages = await Promise.all(
//         req.files.images.map(f => uploadFileToSpaces(f, `products/${product.company}/images`))
//       );
//       updatedImages = [...updatedImages, ...newImages];
//     }

//     // Validate category and subcategory if provided
//     let category = product.category;
//     if (categoryId) {
//       const newCategory = await CompanyCategory.findById(categoryId);
//       if (!newCategory) return res.status(400).json({ success: false, message: "Invalid category for product." });
//       category = newCategory._id;
//     }

//     let subCategory = product.subCategory;
//     if (subCategoryId) {
//       const newSubCategory = await CompanySubCategory.findById(subCategoryId);
//       if (!newSubCategory) return res.status(400).json({ success: false, message: "Invalid subcategory for product." });
//       if (String(newSubCategory.parentCategory) !== String(category)) {
//         return res.status(400).json({ success: false, message: "SubCategory does not belong to selected category." });
//       }
//       subCategory = newSubCategory._id;
//     } else if (subCategoryId === null || subCategoryId === "") {
//         subCategory = null;
//     }

//     // Update product fields and set status to pending_update
//     product.name = name || product.name;
//     product.description = description || product.description;
//     // product.price = price !== undefined ? price : product.price; // 'price' update removed
//     product.images = updatedImages;
//     product.category = category;
//     product.subCategory = subCategory;
//     product.isApproved = false; // Re-approval required
//     product.status = 'pending_update';
//     product.rejectionReason = null; // Clear any previous rejection reason
//     product.approvedBy = null; // Clear previous approval

//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: "Product update submitted for admin approval.",
//       data: product,
//     });
//   } catch (error) {
//     console.error("Update Product Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Request to delete a product (by company)
// export const requestDeleteProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found." });

//     const company = await checkCompanyOwnership(req, res, product.company);
//     if (res.headersSent) return;

//     product.status = 'pending_delete';
//     product.rejectionReason = null; // Clear previous rejection reason
//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: "Product deletion requested. Awaiting admin approval.",
//     });
//   } catch (error) {
//     console.error("Request Delete Product Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // ------------------- Admin Product Management -------------------

// // Admin: Get all products (can filter by status or company)
// export const getAllProductsForAdmin = async (req, res) => {
//   try {
//     const { status, companyId } = req.query;
//     const filter = {};
//     if (status) filter.status = status;
//     if (companyId) filter.company = companyId;

//     const products = await Product.find(filter)
//       .populate('company', 'name email')
//       .populate('category', 'name')
//       .populate('subCategory', 'name')
//       .populate('approvedBy', 'name email')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       message: "Products fetched for admin.",
//       data: products,
//     });
//   } catch (error) {
//     console.error("Get All Products for Admin Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


// // Admin: Approve a product
// export const approveProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const adminId = req.user._id;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found." });

//     // Agar ye pending delete request hai, to actual mein delete kar dein
//     if (product.status === 'pending_delete') {
//         // --- NEW: Remove product ID from company's products array ---
//         await Company.findByIdAndUpdate(
//             product.company,
//             { $pull: { products: product._id } },
//             { new: true } // Return the updated company document
//         );
//         // -----------------------------------------------------------

//         if (product.images && product.images.length > 0) {
//             await Promise.all(product.images.map(url => deleteFileFromSpaces(url)));
//         }
//         await product.deleteOne();
//         return res.status(200).json({ success: true, message: "Product deleted successfully (approved deletion)." });
//     }

//     // Normal product approval
//     product.isApproved = true;
//     product.status = 'approved';
//     product.approvedBy = adminId;
//     product.rejectionReason = null; // Clear any previous rejection reason
//     await product.save();

//     res.status(200).json({ success: true, message: "Product approved successfully.", data: product });
//   } catch (error) {
//     console.error("Approve Product Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // Admin: Reject a product
// export const rejectProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const { rejectionReason } = req.body; // Admin can provide a reason

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found." });

//     // Agar ye pending delete request thi, to uska status previous state mein revert kar dein
//     if (product.status === 'pending_delete') {
//         product.status = product.isApproved ? 'approved' : 'pending'; // Approved thi to approved, warna pending
//         product.rejectionReason = rejectionReason || "Deletion request rejected by admin.";
//         await product.save();
//         return res.status(200).json({ success: true, message: "Product deletion request rejected.", data: product });
//     }

//     // Naye products ya updates ke liye, rejected mark karein
//     product.isApproved = false;
//     product.status = 'rejected';
//     product.approvedBy = req.user._id; // Admin jisne reject kiya
//     product.rejectionReason = rejectionReason || "No specific reason provided.";
//     await product.save();

//     res.status(200).json({ success: true, message: "Product rejected successfully.", data: product });
//   } catch (error) {
//     console.error("Reject Product Error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// export const getPublicCompanyProducts = async (req, res) => {
//   try {
//     const { companyId } = req.params;

//     const company = await Company.findById(companyId);
//     if (!company || company.companyStatus !== 'approved' || !company.isApproved) {
//       return res.status(404).json({ success: false, message: "Company not found or not approved." });
//     }

//     // ✅ Only approved products visible to public
//     const products = await Product.find({
//       company: companyId,
//       isApproved: true,
//       status: 'approved'
//     })
//       .populate('category', 'name')
//       .populate('subCategory', 'name')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       message: "Approved products fetched successfully.",
//       data: products,
//     });
//   } catch (error) {
//     console.error("Get Public Company Products Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// }; 


import Product from "../Models/companyProduct.model.js";
import Company from "../Models/company.model.js";
import { CompanyCategory, CompanySubCategory } from "../Models/companyCategory.model.js";
import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';

// Helper function to check if user owns the company
const checkCompanyOwnership = async (req, res, companyId) => {
  const company = await Company.findById(companyId);
  if (!company) {
    return res.status(404).json({ success: false, message: "Company not found." });
  }
  // Assuming req.user._id is the ID of the user who registered the company
  if (String(company.registeredBy) !== String(req.user._id)) {
    return res.status(403).json({ success: false, message: "You are not authorized to manage this company's products." });
  }
  return company;
};

// ------------------- Company Product Management -------------------

// Create a new product (by company)
export const createProduct = async (req, res) => {
  try {
    const {
      companyId, name, description, categoryId, subCategoryId
    } = req.body;

    const company = await checkCompanyOwnership(req, res, companyId);
    if (res.headersSent) return;

    // Validate category and subcategory
    const category = await CompanyCategory.findById(categoryId);
    if (!category) return res.status(400).json({ success: false, message: "Invalid category for product." });

    let subCategory = null;
    if (subCategoryId) {
      subCategory = await CompanySubCategory.findById(subCategoryId);
      if (!subCategory) return res.status(400).json({ success: false, message: "Invalid subcategory for product." });
      if (String(subCategory.parentCategory) !== String(category._id)) {
        return res.status(400).json({ success: false, message: "SubCategory does not belong to selected category." });
      }
    }

    // Handle image uploads for products
    let images = [];
    if (req.files && req.files.images) {
      images = await Promise.all(
        req.files.images.map(f => uploadFileToSpaces(f, `products/${companyId}/images`))
      );
    }

    const product = await Product.create({
      company: companyId,
      name,
      description,
      images,
      category: category._id,
      subCategory: subCategory ? subCategory._id : null,
      isApproved: false, // Requires admin approval
      status: 'pending', // Initial status
    });

    // --- OLD: product ID was added here, but now it will be added only upon admin approval. ---
    // company.products.push(product._id);
    // await company.save();
    // ------------------------------------------------------------------------------------------

    res.status(201).json({
      success: true,
      message: "Product created successfully. Awaiting admin approval.",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all products for a specific company (for the company itself - shows pending/rejected)
export const getCompanyProducts = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await checkCompanyOwnership(req, res, companyId);
    if (res.headersSent) return;

    const products = await Product.find({ company: companyId })
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      success: true,
      message: "Company products fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error("Get Company Products Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a single product by ID (for company to view its own product)
export const getProductByIdForCompany = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    // Ensure the product belongs to the requesting company
    const company = await checkCompanyOwnership(req, res, product.company);
    if (res.headersSent) return;

    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      data: product,
    });
  } catch (error) {
    console.error("Get Product By ID For Company Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update a product (by company)
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, categoryId, subCategoryId, existingImages, removeImageUrls } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    const company = await checkCompanyOwnership(req, res, product.company);
    if (res.headersSent) return;

    // Handle image deletions
    let updatedImages = product.images;
    if (removeImageUrls && Array.isArray(JSON.parse(removeImageUrls))) {
      const imagesToRemove = JSON.parse(removeImageUrls);
      await Promise.all(imagesToRemove.map(url => deleteFileFromSpaces(url)));
      updatedImages = updatedImages.filter(img => !imagesToRemove.includes(img));
    }

    if (existingImages && Array.isArray(JSON.parse(existingImages))) {
        const keptImages = JSON.parse(existingImages);
        const imagesToDeleteNotKept = updatedImages.filter(img => !keptImages.includes(img));
        await Promise.all(imagesToDeleteNotKept.map(url => deleteFileFromSpaces(url)));
        updatedImages = keptImages;
    }

    // Handle new image uploads
    if (req.files && req.files.images) {
      const newImages = await Promise.all(
        req.files.images.map(f => uploadFileToSpaces(f, `products/${product.company}/images`))
      );
      updatedImages = [...updatedImages, ...newImages];
    }

    // Validate category and subcategory if provided
    let category = product.category;
    if (categoryId) {
      const newCategory = await CompanyCategory.findById(categoryId);
      if (!newCategory) return res.status(400).json({ success: false, message: "Invalid category for product." });
      category = newCategory._id;
    }

    let subCategory = product.subCategory;
    if (subCategoryId) {
      const newSubCategory = await CompanySubCategory.findById(subCategoryId);
      if (!newSubCategory) return res.status(400).json({ success: false, message: "Invalid subcategory for product." });
      if (String(newSubCategory.parentCategory) !== String(category)) {
        return res.status(400).json({ success: false, message: "SubCategory does not belong to selected category." });
      }
      subCategory = newSubCategory._id;
    } else if (subCategoryId === null || subCategoryId === "") {
        subCategory = null;
    }

    // Update product fields and set status to pending_update
    product.name = name || product.name;
    product.description = description || product.description;
    product.images = updatedImages;
    product.category = category;
    product.subCategory = subCategory;
    product.isApproved = false; // Re-approval required
    product.status = 'pending_update';
    product.rejectionReason = null; // Clear any previous rejection reason
    product.approvedBy = null; // Clear previous approval

    await product.save();

    // If a product is updated, and it was previously approved, it means it's now 'pending_update'.
    // In this scenario, it should be removed from the company's approved products list
    // until it's re-approved by an admin.
    await Company.findByIdAndUpdate(
        product.company,
        { $pull: { products: product._id } },
        { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product update submitted for admin approval.",
      data: product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Request to delete a product (by company)
export const requestDeleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    const company = await checkCompanyOwnership(req, res, product.company);
    if (res.headersSent) return;

    product.status = 'pending_delete';
    product.rejectionReason = null; // Clear previous rejection reason
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deletion requested. Awaiting admin approval.",
    });
  } catch (error) {
    console.error("Request Delete Product Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ------------------- Admin Product Management -------------------

// Admin: Get all products (can filter by status or company)
export const getAllProductsForAdmin = async (req, res) => {
  try {
    const { status, companyId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (companyId) filter.company = companyId;

    const products = await Product.find(filter)
      .populate('company', 'name email')
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Products fetched for admin.",
      data: products,
    });
  } catch (error) {
    console.error("Get All Products for Admin Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// Admin: Approve a product
export const approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const adminId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    // Agar ye pending delete request hai, to actual mein delete kar dein
    if (product.status === 'pending_delete') {
        // Remove product ID from company's products array before actual deletion
        await Company.findByIdAndUpdate(
            product.company,
            { $pull: { products: product._id } },
            { new: true } // Return the updated company document
        );

        if (product.images && product.images.length > 0) {
            await Promise.all(product.images.map(url => deleteFileFromSpaces(url)));
        }
        await product.deleteOne();
        return res.status(200).json({ success: true, message: "Product deleted successfully (approved deletion)." });
    }

    // Normal product approval
    product.isApproved = true;
    product.status = 'approved';
    product.approvedBy = adminId;
    product.rejectionReason = null; // Clear any previous rejection reason
    await product.save();

    // --- NEW: Add product ID to company's products array ONLY upon approval ---
    // Using $addToSet to prevent adding duplicate IDs if somehow it was already there
    await Company.findByIdAndUpdate(
        product.company,
        { $addToSet: { products: product._id } },
        { new: true }
    );
    // -------------------------------------------------------------------------

    res.status(200).json({ success: true, message: "Product approved successfully.", data: product });
  } catch (error) {
    console.error("Approve Product Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Admin: Reject a product
export const rejectProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rejectionReason } = req.body; // Admin can provide a reason

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });

    // Agar ye pending delete request thi, to uska status previous state mein revert kar dein
    if (product.status === 'pending_delete') {
        product.status = product.isApproved ? 'approved' : 'pending'; // Approved thi to approved, warna pending
        product.rejectionReason = rejectionReason || "Deletion request rejected by admin.";
        await product.save();
        return res.status(200).json({ success: true, message: "Product deletion request rejected.", data: product });
    }

    // Naye products ya updates ke liye, rejected mark karein
    product.isApproved = false;
    product.status = 'rejected';
    product.approvedBy = req.user._id; // Admin jisne reject kiya
    product.rejectionReason = rejectionReason || "No specific reason provided.";
    await product.save();

    // --- NEW: Remove product ID from company's products array upon rejection ---
    await Company.findByIdAndUpdate(
        product.company,
        { $pull: { products: product._id } },
        { new: true }
    );
    // --------------------------------------------------------------------------

    res.status(200).json({ success: true, message: "Product rejected successfully.", data: product });
  } catch (error) {
    console.error("Reject Product Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getPublicCompanyProducts = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company || company.companyStatus !== 'approved' || !company.isApproved) {
      return res.status(404).json({ success: false, message: "Company not found or not approved." });
    }

    // ✅ Only approved products visible to public (This part correctly uses product's own status)
    // Now that `company.products` only holds approved products, you could also do:
    // const products = await Product.find({ _id: { $in: company.products } })
    // but fetching directly from Product collection with explicit conditions is still robust.
    const products = await Product.find({
      company: companyId,
      isApproved: true,
      status: 'approved'
    })
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Approved products fetched successfully.",
      data: products,
    });
  } catch (error) {
    console.error("Get Public Company Products Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};