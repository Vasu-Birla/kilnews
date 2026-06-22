


import mongoose from "mongoose";

// 🟢 Live Update Sub-schema
const liveUpdateSchema = new mongoose.Schema(
  {
    text_en: {
      type: String,
      trim: true,
      maxlength: [10000, "English live update cannot exceed 10,000 characters"],
    },
    text_hi: {
      type: String,
      trim: true,
      maxlength: [10000, "लाइव अपडेट 10,000 अक्षरों से अधिक नहीं हो सकता"],
    },
    media: [
      {
        url: { type: String, trim: true },
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
        caption_en: { type: String, trim: true },
        caption_hi: { type: String, trim: true },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

// 🟢 Main Live News Schema
const liveNewsSchema = new mongoose.Schema(
  {
    // 🌍 English Fields
    title_en: {
      type: String,
      trim: true,
    },
    summary_en: {
      type: String,
      maxlength: [500, "English summary cannot exceed 500 characters"],
      trim: true,
    },
    content_en: {
      type: String,
      maxlength: [1000000, "English content too long"],
    },

    // 🌍 Hindi Fields
    title_hi: {
      type: String,
      trim: true,
    },
    summary_hi: {
      type: String,
      maxlength: [500, "हिंदी सारांश 500 अक्षरों से अधिक नहीं हो सकता"],
      trim: true,
    },
    content_hi: {
      type: String,
      maxlength: [1000000, "हिंदी सामग्री बहुत लंबी है"],
    },

    // 🌍 Slugs
    slug_en: {
      type: String,
      index: true,
      sparse: true,
      trim: true,
    },
    slug_hi: {
      type: String,
      index: true,
      sparse: true,
      trim: true,
    },

    // 📂 Category Reference
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

     country: 
     {
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

    // 👤 Created / Updated Info
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🔴 Live Updates
    updates: [liveUpdateSchema],

    // 📺 Status & Timings
    status: {
      type: String,
      enum: ["live", "ended"],
      default: "live",
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      default: null,
    },

    // 🧮 Engagement
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    guestLikes: [{ ip: String }],

    // 📎 Cover Image
    coverImage: {
      url: { type: String, trim: true },
      alt_en: { type: String, trim: true },
      alt_hi: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("LiveNews", liveNewsSchema);
