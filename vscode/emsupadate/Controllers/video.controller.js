import videoModel from "../Models/video.model.js";
import { SubCategory, Category } from '../Models/lookupData.model.js';
import { ApiError } from "../Utils/apiError.js";
import { MESSAGES, STATUS_CODES } from "../Utils/status.codes.messages.js";
import { uploadFileToSpaces } from "../Services/s3Service.js";
import { generateSlug } from '../Utils/slugifyUtils.js';
// Create Video
// export const createVideo = async (req, res, next) => {
//     try {
//         const { title, videoUrl, category, subCategory } = req.body;
//         const createdById = req.user?._id;

//         const missingFields = [];
//         if (!title) missingFields.push('Title');
//         if (!videoUrl) missingFields.push('Video URL');
//         if (!category) missingFields.push('Category');
//         if (!createdById) {
//             throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED + ": User ID missing or not authenticated.");
//         }
//         if (missingFields.length > 0) {
//             throw new ApiError(STATUS_CODES.BAD_REQUEST, `${MESSAGES.BAD_REQUEST}: Missing required fields: ${missingFields.join(', ')}`);
//         }

//        const categoryDoc = await Category.findById(category);
// if (!categoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid category.");
// let subCategoryName = null;
// let subCategoryDoc = null;
// if (subCategory) {
//   subCategoryDoc = await SubCategory.findOne({ _id: subCategory, category: categoryDoc._id });
//   if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid subCategory.");
//      subCategoryName = subCategoryDoc.name; // <-- store name instead of ID
// }


//         const newVideo = new videoModel({
//             title,
//             videoUrl,
//             createdBy: createdById,
//             category: categoryDoc.name,
//             subCategory: subCategoryName || null,
//         });

//         const video = await newVideo.save();
//         const populatedVideo = await video.populate([
//             { path: 'createdBy', select: 'username email role profileImage' },
//             { path: 'updatedBy', select: 'username email' },
          
//         ]);

//         const finalVideoData = populatedVideo.toObject();
//         finalVideoData.category_name = finalVideoData.category;
//         finalVideoData.subCategory_name = finalVideoData.subCategory;

//         res.status(STATUS_CODES.CREATED).json({
//             success: true,
//             message: "Video added successfully.",
//             data: finalVideoData,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const createVideo = async (req, res, next) => {
  try {
    const { title, videoUrl, category, subCategory } = req.body;
    const createdById = req.user?._id;

    if (!title || !category || !createdById) {
      const missingFields = [];
      if (!title) missingFields.push('Title');
      if (!category) missingFields.push('Category');
      if (!createdById) missingFields.push('User ID');
      throw new ApiError(STATUS_CODES.BAD_REQUEST, `${MESSAGES.BAD_REQUEST}: Missing required fields: ${missingFields.join(', ')}`);
    }

    // ✅ Validate category
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid category.");

    // ✅ Validate subCategory if provided
    let subCategoryName = null;
    if (subCategory) {
      const subCategoryDoc = await SubCategory.findOne({ _id: subCategory, category: categoryDoc._id });
      if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid subCategory.");
      subCategoryName = subCategoryDoc.name;
    }

    // ✅ Handle file upload
    let finalVideoUrl = videoUrl || null;
    if (req.file) {
      // Assuming single file upload using multer.single('videoFile')
      finalVideoUrl = await uploadFileToSpaces(req.file, "videos");
    }

    if (!finalVideoUrl) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Either video URL or video file must be provided.");
    }

    const newVideo = new videoModel({
      title,
      videoUrl: finalVideoUrl,
      createdBy: createdById,
      category: categoryDoc.name,
      subCategory: subCategoryName,
    });

    const video = await newVideo.save();
     // ✅ Slug update karo
    video.slug = `${generateSlug(title, "hi")}-${video._id}`;
    await video.save();

    const populatedVideo = await video.populate([
      { path: 'createdBy', select: 'username email role profileImage' },
      { path: 'updatedBy', select: 'username email' },
    ]);

    const finalVideoData = populatedVideo.toObject();
    finalVideoData.category_name = finalVideoData.category;
    finalVideoData.subCategory_name = finalVideoData.subCategory;

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Video added successfully.",
      data: finalVideoData,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Videos
export const getAllVideos = async (req, res, next) => {
    try {
        const videos = await videoModel.find({})
            .populate('createdBy', 'username email role profileImage')
            .populate('updatedBy', 'username email')
            .sort({ createdAt: -1 });
         

        const finalVideos = videos.map(video => {
            const v = video.toObject();
            v.category_name = video.category;
            v.subCategory_name = video.subCategory;
            return v;
        });

        res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            count: finalVideos.length,
            data: finalVideos,
        });
    } catch (error) {
        next(new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR_FETCHING_HEADLINES, [error.message]));
    }
};

// // Get Video By ID
// export const getVideoById = async (req, res, next) => {
//     try {
//         const video = await videoModel.findById(req.params.id)
//             .populate('createdBy', 'username email role profileImage')
//             .populate('updatedBy', 'username email');

//         if (!video) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.HEADLINE_NOT_FOUND);
//         }

//         const finalVideoData = video.toObject();
//         finalVideoData.category_name = finalVideoData.category;
//         finalVideoData.subCategory_name = finalVideoData.subCategory;

//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             data: finalVideoData,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// Update Video
export const updateVideo = async (req, res, next) => {
    try {
        const { title, videoUrl, category, subCategory } = req.body;
        const updatedById = req.user?._id;

        const updateData = {};

        const currentVideo = await videoModel.findById(req.params.id);
        if (!currentVideo) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.HEADLINE_NOT_FOUND);
        }

        if (title !== undefined) updateData.title = title;
        if (videoUrl !== undefined) updateData.videoUrl = videoUrl;

        if (category !== undefined) {
    if (!category) {
        updateData.category = null;
        updateData.subCategory = null;
    } else {
        const categoryDoc = await Category.findById(category); // <-- change here
        if (!categoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Provided category ID is invalid.");
        updateData.category = categoryDoc.name; // store name in DB
    }
} else {
    updateData.category = currentVideo.category;
}


        // SubCategory handling
       if (subCategory !== undefined) {
    if (!subCategory) {
        updateData.subCategory = null;
    } else {
        const subCategoryDoc = await SubCategory.findById(subCategory);
        if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Provided subCategory ID is invalid.");
        updateData.subCategory = subCategoryDoc.name;
    }
}


        if (updatedById) updateData.updatedBy = updatedById;

        if (Object.keys(updateData).length === 0) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": No fields to update provided.");
        }

        const video = await videoModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate([
            { path: 'createdBy', select: 'username email role profileImage' },
            { path: 'updatedBy', select: 'username email' }
        ]);

        const finalVideoData = video.toObject();
        finalVideoData.category_name = finalVideoData.category;
        finalVideoData.subCategory_name = finalVideoData.subCategory;

        res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: "Video updated successfully.",
            data: finalVideoData,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Video
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await videoModel.findByIdAndDelete(req.params.id);
        if (!video) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.HEADLINE_NOT_FOUND);
        }

        res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: "Video deleted successfully.",
            data: {},
        });
    } catch (error) {
        next(error);
    }
};



// export const toggleLikeVideo = async (req, res, next) => {
//   try {
//     const userId = req.user?._id;
//     const videoId = req.params.id;

//     if (!userId) {
//       throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized user.");
//     }

//     const video = await videoModel.findById(videoId);
//     if (!video) {
//       throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found.");
//     }

//     const alreadyLiked = video.likes.includes(userId);
//     if (alreadyLiked) {
//       // Unlike
//       video.likes = video.likes.filter(id => id.toString() !== userId.toString());
//     } else {
//       // Like
//       video.likes.push(userId);
//     }

//     await video.save();

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       message: alreadyLiked ? "Video unliked." : "Video liked.",
//       totalLikes: video.likes.length,
//     });
//   } catch (error) {
//     next(error);
//   }
// };



// Helper to get IP (works behind proxies if x-forwarded-for set)
const getRequestIP = (req) => {
  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    // x-forwarded-for may be: "clientIP, proxy1, proxy2"
    return xff.split(',')[0].trim();
  }
  // fallbacks
  return req.ip || (req.connection && req.connection.remoteAddress) || null;
};

export const toggleLikeVideo = async (req, res, next) => {
  try {
    const userId = req.user?._id; // logged-in user id, if any
    const videoId = req.params.id;

    if (!videoId) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Video ID is required.");
    }

    const video = await videoModel.findById(videoId);
    if (!video) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found.");
    }

    // ===== Logged-in user path =====
    if (userId) {
      const alreadyLiked = video.likes.some((id) => id.toString() === userId.toString());
      if (alreadyLiked) {
        // Unlike
        video.likes = video.likes.filter((id) => id.toString() !== userId.toString());
        await video.save();
        return res.status(STATUS_CODES.SUCCESS).json({
          success: true,
          message: "Video unliked.",
          totalLikes: (video.likes?.length || 0) + (video.guestLikes?.length || 0),
        });
      } else {
        // Like
        video.likes.push(userId);
        await video.save();
        return res.status(STATUS_CODES.SUCCESS).json({
          success: true,
          message: "Video liked.",
          totalLikes: (video.likes?.length || 0) + (video.guestLikes?.length || 0),
        });
      }
    }

    // ===== Guest user (IP-based) path =====
    const ip = getRequestIP(req) || 'unknown';
    const userAgent = req.headers['user-agent'] || null;

    // check if this IP already exists in guestLikes
    const existingGuest = video.guestLikes.find(gl => gl.ip === ip);

    if (existingGuest) {
      // Already liked by this IP -> toggle to unlike: remove the entry
      video.guestLikes = video.guestLikes.filter(gl => gl.ip !== ip);
      await video.save();
      return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        message: "Video unliked (guest/IP).",
        totalLikes: (video.likes?.length || 0) + (video.guestLikes?.length || 0),
      });
    } else {
      // Not liked yet by this IP -> add guest like
      video.guestLikes.push({ ip, userAgent });
      await video.save();
      return res.status(STATUS_CODES.SUCCESS).json({
        success: true,
        message: "Video liked (guest/IP).",
        totalLikes: (video.likes?.length || 0) + (video.guestLikes?.length || 0),
      });
    }
  } catch (error) {
    next(error);
  }
};



export const addCommentToVideo = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { text } = req.body;
    const videoId = req.params.id;

    if (!userId || !text) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "User ID and comment text are required.");
    }

    const video = await videoModel.findById(videoId);
    if (!video) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found.");
    }

    const comment = { user: userId, text };
    video.comments.push(comment);
    await video.save();

    const populatedVideo = await video.populate({
      path: 'comments.user',
      select: 'username email profileImage',
    });

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Comment added successfully.",
      comments: populatedVideo.comments,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteCommentFromVideo = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { videoId, commentId } = req.params;

    const video = await videoModel.findById(videoId);
    if (!video) throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found.");

    const comment = video.comments.id(commentId);
    if (!comment) throw new ApiError(STATUS_CODES.NOT_FOUND, "Comment not found.");

    if (comment.user.toString() !== userId.toString()) {
      throw new ApiError(STATUS_CODES.FORBIDDEN, "You can delete only your own comment.");
    }

    comment.deleteOne();
    await video.save();

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};


export const getVideoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let currentUserId = null;

    // 🟢 Try to get user if logged in (optional)
    if (req.user?._id) {
      currentUserId = req.user._id.toString();
    }

    const video = await videoModel
      .findById(id)
      .populate("createdBy", "username email role profileImage")
      .populate("updatedBy", "username email")
      .populate({
        path: "comments.user",
        select: "username email role profileImage",
      });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const v = video.toObject();
    v.category_name = video.category;
    v.subCategory_name = video.subCategory;

    // 🟢 Default: not liked
    v.isLiked = false;

    // ✅ If logged in user exists → check if they liked it
    if (currentUserId && Array.isArray(v.likes)) {
      v.isLiked = v.likes.some((likeId) => {
        const likeUserId = likeId?._id ? likeId._id.toString() : likeId?.toString();
        return likeUserId === currentUserId;
      });
    }

    // ✅ If guest user (no login), check guestLikes via IP
    if (!currentUserId && req.ip && Array.isArray(v.guestLikes)) {
      v.isLiked = v.guestLikes.some((gl) => gl.ip === req.ip);
    }

    res.status(200).json({
      success: true,
      data: v,
    });
  } catch (error) {
    next(
      new ApiError(
        500,
        "Server error fetching video details",
        [error.message]
      )
    );
  }
};
