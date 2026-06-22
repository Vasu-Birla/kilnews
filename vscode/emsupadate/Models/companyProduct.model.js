import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  images: [String], // S3 URLs for product images
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyCategory",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanySubCategory",
    default: null,
  },
  // Approval status for the product itself
  isApproved: {
    type: Boolean,
    default: false,
  },
  // Status to track pending, approved, rejected, pending_delete actions
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "pending_update", "pending_delete"],
    default: "pending",
  },
  rejectionReason: {
    type: String,
    default: null,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` on every save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;