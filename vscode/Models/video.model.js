// import mongoose from 'mongoose';

// const videoSchema = mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Please add a video title'],
//       trim: true,
//       minlength: [5, 'Title must be at least 5 characters long'],
//       maxlength: [2000000, 'Title cannot be more than 2000000 characters long'],
//     },
//      slug: { 
//         type: String,
//         index: true,
//         sparse: true // unique: true मत लगाना, क्योंकि हम id के साथ unique बनाएँगे
//     },
//     videoUrl: {
//       type: String,
//       required: [true, 'Video URL is required'],
//       trim: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'Video creator is required'],
//     },
//     updatedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       default: null,
//     },
//     category: {
//       type: String,
//       ref: 'Category',
//       required: [true, 'Video category is required'],
//     },
//     subCategory: {
//       type: String,
//       ref: 'SubCategory',
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model('Video', videoSchema);


import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
  },
  { timestamps: true }
);


const guestLikeSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, index: true },
    userAgent: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true } // keep id so we can remove specific entries if needed
);

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a video title'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters long'],
      maxlength: [2000000, 'Title cannot be more than 2000000 characters long'],
    },
    slug: { 
      type: String,
      index: true,
      sparse: true,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Video creator is required'],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    category: {
      type: String,
      ref: 'Category',
      required: [true, 'Video category is required'],
    },
    subCategory: {
      type: String,
      ref: 'SubCategory',
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
        guestLikes: [guestLikeSchema],
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
