


import mongoose from "mongoose";
import { hashPassword } from '../Utils/bcryptUtils.js';

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  // password: { type: String, required: true },
  address: { type: String },
  // city: { type: String },
  // state: { type: String },
  // country: { type: String },

    country: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Country',
              default: null,
          },
          state: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'State',
              default: null,
          },
          city: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'City',
              default: null,
          },
  gstNumber: { type: String },
  aadhaarNumber: { type: String },

  category: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyCategory", required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "CompanySubCategory" },

  companyType: { type: String, enum: ["service", "product"], required: true },

  website: { type: String },
  socialLinks: [String],
  googleMapsLink: { type: String },

  // Business timings for each day
  businessTimings: {
    sunday: { open: String, close: String },
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
  },

  logo: { type: String },
  banner: [String],
  photos: [String],

  aadhaarImage: { type: String },
  // panImage: { type: String },
  electricityBillImage: { type: String },
  passportPhoto: { type: String },
  description: { type: String },
  keywords: [String],

  isApproved: { type: Boolean, default: false },
   


  companyStatus: {
    type: String,
    enum: ['pending', 'approved', 'pending_update', 'rejected'],
    default: 'pending',
  },
  pendingProfileUpdates: { // Store proposed changes by company, awaiting admin review
    type: Object,
    default: null, // Will hold a map of changed fields and their new values
  },



  isPremium: { type: Boolean, default: false },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    priorityRank: { type: Number, min: 1, max: 20, default: null }, // Admin will set this for top 20 

  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  averageRating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
companySchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

export default mongoose.model("Company", companySchema);
