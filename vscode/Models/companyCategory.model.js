import mongoose from "mongoose";

/* ----------------- CompanyCategory Schema ----------------- */
const companyCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["service", "product"],
    required: true, // Service or Product
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
    trim: true,
  },
   image: { type: String },
}, { timestamps: true });

// Slug auto-generate
companyCategorySchema.pre("save", function(next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});

const CompanyCategory = mongoose.model("CompanyCategory", companyCategorySchema);

/* ----------------- CompanySubCategory Schema ----------------- */
const companySubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "SubCategory name is required"],
    trim: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyCategory",
    required: [true, "SubCategory must belong to a CompanyCategory"],
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    default: null,
    trim: true,
  },
}, { timestamps: true });

// Unique per parent category
companySubCategorySchema.index({ name: 1, parentCategory: 1 }, { unique: true });

// Slug auto-generate
companySubCategorySchema.pre("save", function(next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  next();
});

const CompanySubCategory = mongoose.model("CompanySubCategory", companySubCategorySchema);

export { CompanyCategory, CompanySubCategory };
