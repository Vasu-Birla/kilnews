import { CompanyCategory, CompanySubCategory } from "../Models/companyCategory.model.js";

// ---------------- Company Category ------------------

import { deleteFileFromSpaces, uploadFileToSpaces } from '../Services/s3Service.js';

export const createCompanyCategory = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    // Handle image upload
    let image = null;
    if (req.files?.image) {
      image = await uploadFileToSpaces(req.files.image[0], "category/images");
    }

    const category = await CompanyCategory.create({ name, type, description, image });

    res.status(201).json({
      success: true,
      message: "Category created",
      data: category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all Categories
export const getAllCompanyCategories = async (req, res) => {
  try {
    const categories = await CompanyCategory.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single Category
export const getCompanyCategoryById = async (req, res) => {
  try {
    const category = await CompanyCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Category
// export const updateCompanyCategory = async (req, res) => {
//   try {
//     const category = await CompanyCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!category) return res.status(404).json({ success: false, message: "Category not found" });
//     res.status(200).json({ success: true, message: "Category updated", data: category });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const updateCompanyCategory = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    // Find existing category
    const category = await CompanyCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Handle image update
    let image = category.image; // default: existing image
    if (req.files?.image) {
      // ✅ If old image exists, delete from spaces
      if (category.image) {
        await deleteFileFromSpaces(category.image);
      }
      // ✅ Upload new image
      image = await uploadFileToSpaces(req.files.image[0], "category/images");
    }

    // Update fields
    category.name = name || category.name;
    category.type = type || category.type;
    category.description = description || category.description;
    category.image = image;

    const updatedCategory = await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete Category
export const deleteCompanyCategory = async (req, res) => {
  try {
    const category = await CompanyCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    // Also delete subcategories
    await CompanySubCategory.deleteMany({ parentCategory: req.params.id });

    res.status(200).json({ success: true, message: "Category and its subcategories deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------- Company SubCategory ------------------

// Create SubCategory
export const createCompanySubCategory = async (req, res) => {
  try {
    const { name, parentCategory, description } = req.body;

    // Validate parent
    const parent = await CompanyCategory.findById(parentCategory);
    if (!parent) return res.status(400).json({ success: false, message: "Invalid parent category" });

    const subCategory = await CompanySubCategory.create({ name, parentCategory, description });
    res.status(201).json({ success: true, message: "SubCategory created", data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all SubCategories
export const getAllCompanySubCategories = async (req, res) => {
  try {
    const subCategories = await CompanySubCategory.find().populate("parentCategory", "name type");
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single SubCategory
export const getCompanySubCategoryById = async (req, res) => {
  try {
    const subCategory = await CompanySubCategory.findById(req.params.id).populate("parentCategory", "name type");
    if (!subCategory) return res.status(404).json({ success: false, message: "SubCategory not found" });
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update SubCategory
export const updateCompanySubCategory = async (req, res) => {
  try {
    const subCategory = await CompanySubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subCategory) return res.status(404).json({ success: false, message: "SubCategory not found" });
    res.status(200).json({ success: true, message: "SubCategory updated", data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete SubCategory
export const deleteCompanySubCategory = async (req, res) => {
  try {
    const subCategory = await CompanySubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) return res.status(404).json({ success: false, message: "SubCategory not found" });
    res.status(200).json({ success: true, message: "SubCategory deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const CompanySubCategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.categoryId) {
      filter.parentCategory = req.query.categoryId;
    }

    const subCategories = await CompanySubCategory.find(filter).populate("parentCategory", "name type");
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
