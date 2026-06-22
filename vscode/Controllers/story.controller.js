// import Story from "../Models/story.model.js";
// import User from "../Models/user.model.js";
// import { uploadFileToSpaces } from "../Services/s3Service.js";
// import { generateSlug } from "../Utils/slugifyUtils.js";
// const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:3000";

// // ✅ Create Story
// export const createStory = async (req, res) => {
//   try {
//     let { title, summary, category, tags = [], slides = [] } = req.body;
//     const userId = req.user?._id;

//     if (!title || !category) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Title & Category required" });
//     }

//     // Ensure tags is array
//     if (typeof tags === "string") {
//       try {
//         tags = JSON.parse(tags);
//       } catch {
//         tags = [tags];
//       }
//     }

//     // Ensure slides is array
//     if (typeof slides === "string") {
//       try {
//         slides = JSON.parse(slides);
//       } catch {
//         slides = [];
//       }
//     }

//     // ✅ Upload new files (if any)
//     let uploadedSlides = [];
//     if (req.files && req.files.length > 0) {
//       uploadedSlides = await Promise.all(
//         req.files.map(async (file, index) => {
//           const url = await uploadFileToSpaces(file, "story-slides");

//           let caption = "";
//           if (Array.isArray(req.body.captions)) {
//             caption = req.body.captions[index] || "";
//           } else if (req.body[`captions[${index}]`]) {
//             caption = req.body[`captions[${index}]`];
//           }

//           return {
//             mediaUrl: url,
//             mediaType: file.mimetype.startsWith("video") ? "video" : "image",
//             caption,
//           };
//         })
//       );
//     }

//     const allSlides = [...slides, ...uploadedSlides];

//     const user = await User.findById(userId);
//     const status = user?.canDirectPost ? "posted" : "pending_approval";

//     // ✅ Pehle story create karo
//     const story = await Story.create({
//       title,
//       summary,
//       category,
//       tags,
//       slides: allSlides,
//       createdBy: userId,
//       updatedBy: userId,
//       status,
//       publishedAt: status === "posted" ? new Date() : null,
//     });

//     // ✅ Slug & Share Link update
//     story.slug = `${generateSlug(title, "hi")}-${story._id}`;
//     story.shareLink = `${FRONTEND_BASE_URL}/story/${story.slug}`;
//     await story.save();

//     res.status(201).json({
//       success: true,
//       message: "Story created successfully",
//       data: story,
//     });
//   } catch (error) {
//     console.error("Error creating story:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to create story",
//         error: error.message,
//       });
//   }
// };



import Story from "../Models/story.model.js";
import User from "../Models/user.model.js";
import { uploadFileToSpaces } from "../Services/s3Service.js";
import { generateSlug } from "../Utils/slugifyUtils.js";
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:3000";

// ✅ Create Story
export const createStory = async (req, res) => {
  try {
    // Added 'externalSlides' to destructuring
    let { title, summary, category, tags = [], externalSlides = [] } = req.body;
    const userId = req.user?._id;

    if (!title || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Title & Category required" });
    }

    // Ensure tags is array
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = [tags];
      }
    }

    // Process external slides (sent as JSON string from frontend)
    let processedExternalSlides = [];
    if (typeof externalSlides === "string") {
      try {
        const parsedExternalSlides = JSON.parse(externalSlides);
        if (Array.isArray(parsedExternalSlides)) {
          processedExternalSlides = parsedExternalSlides.map(es => ({
            mediaUrl: es.mediaUrl,
            mediaType: "external",
            caption: es.caption || "",
            isExternalLink: true, // Mark as external
          }));
        }
      } catch (e) {
        console.error("Error parsing externalSlides:", e);
        processedExternalSlides = [];
      }
    }

    // ✅ Upload new files (if any)
    let uploadedFileSlides = [];
    if (req.files && req.files.length > 0) {
      uploadedFileSlides = await Promise.all(
        req.files.map(async (file, index) => {
          const url = await uploadFileToSpaces(file, "story-slides");

          let caption = "";
          // Assuming captions for files are sent in an array `req.body.captions`
          if (Array.isArray(req.body.captions)) {
            caption = req.body.captions[index] || "";
          } else if (req.body[`captions[${index}]`]) { // Fallback for older FormData methods
            caption = req.body[`captions[${index}]`];
          }

          return {
            mediaUrl: url,
            mediaType: file.mimetype.startsWith("video") ? "video" : "image",
            caption,
            isExternalLink: false, // Mark as not external
          };
        })
      );
    }

    // Combine all types of slides
    const allSlides = [...uploadedFileSlides, ...processedExternalSlides]; // Removed `slides` from req.body as it was ambiguous for new content

    const user = await User.findById(userId);
    const status = user?.canDirectPost ? "posted" : "pending_approval";

    // ✅ Pehle story create karo
    const story = await Story.create({
      title,
      summary,
      category,
      tags,
      slides: allSlides, // Use the combined slides
      createdBy: userId,
      updatedBy: userId,
      status,
      publishedAt: status === "posted" ? new Date() : null,
    });

    // ✅ Slug & Share Link update
    story.slug = `${generateSlug(title, "hi")}-${story._id}`;
    story.shareLink = `${FRONTEND_BASE_URL}/story/${story.slug}`;
    await story.save();

    res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: story,
    });
  } catch (error) {
    console.error("Error creating story:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create story",
        error: error.message,
      });
  }
};

// ... (getAllStories, getStoryById, deleteStory remain the same) ...

export const addSlidesToStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    // We expect 'captions' for uploaded files and 'externalSlides' for new links.
    let { captions = [], externalSlides = [] } = req.body;

    // Ensure captions is array
    if (typeof captions === "string") {
      try { captions = JSON.parse(captions); } catch { captions = []; }
    }

    // Process external slides (sent as JSON string from frontend)
    let processedExternalSlides = [];
    if (typeof externalSlides === "string") {
      try {
        const parsedExternalSlides = JSON.parse(externalSlides);
        if (Array.isArray(parsedExternalSlides)) {
          processedExternalSlides = parsedExternalSlides.map(es => ({
            mediaUrl: es.mediaUrl,
            mediaType: "external",
            caption: es.caption || "",
            isExternalLink: true, // Mark as external
          }));
        }
      } catch (e) {
        console.error("Error parsing externalSlides for addSlidesToStory:", e);
        processedExternalSlides = [];
      }
    }

    // ✅ Upload new files and associate with captions
    let uploadedFilesWithCaptions = [];
    if (req.files && req.files.length > 0) {
      uploadedFilesWithCaptions = await Promise.all(
        req.files.map(async (file, index) => {
          const url = await uploadFileToSpaces(file, "story-slides");
          return {
            mediaUrl: url,
            mediaType: file.mimetype.startsWith("video") ? "video" : "image",
            caption: captions[index] || file.originalname || "", // Use caption from req.body.captions
            isExternalLink: false, // Mark as not external
          };
        })
      );
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    // ✅ Add new slides (uploaded files + external links)
    story.slides.push(...uploadedFilesWithCaptions, ...processedExternalSlides);
    story.updatedBy = req.user?._id; // Assuming req.user is populated by middleware
    await story.save();

    res.json({
      success: true,
      message: "Slides added successfully",
      data: story,
    });
  } catch (error) {
    console.error("Error adding slides:", error);
    res.status(500).json({ success: false, message: "Failed to add slides", error: error.message });
  }
};

// ✅ Get All Stories
export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("createdBy", "name")  .populate("category", "name") .sort({ createdAt: -1 });
    res.json({ success: true, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stories" });
  }
};

// ✅ Get All Stories with Pagination
export const getAllAppStories = async (req, res) => {
  try {
    // Page & Limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10       ;

    // Skip Formula
    const skip = (page - 1) * limit;

    // Total Stories Count
    const totalStories = await Story.countDocuments();

    // Fetch Stories
    const stories = await Story.find()
      .populate("createdBy", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total Pages
    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalStories,
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching stories",
      error: error.message,
    });
  }
};

// ✅ Get Single Story
export const getStoryById = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId).populate("createdBy", "name");
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });
    res.json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching story" });
  }
};

// Delete Story
export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ success: false, message: "Story not found" });

    await story.deleteOne(); // Remove the story

    res.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ success: false, message: "Failed to delete story", error: error.message });
  }
};


// export const addSlidesToStory = async (req, res) => {
//   try {
//     const { storyId } = req.params;
//     // We expect 'slides' from req.body to be pre-existing slides (if any, not the files)
//     // and 'captions' to be an array corresponding to the uploaded files.
//     let { slides = [], captions = [] } = req.body; // Added 'captions' here

//     // Ensure slides is array (if they were sent as stringified JSON)
//     if (typeof slides === "string") {
//       try { slides = JSON.parse(slides); } catch { slides = []; }
//     }
//     // Ensure captions is array
//     if (typeof captions === "string") {
//       try { captions = JSON.parse(captions); } catch { captions = []; }
//     }


//     // ✅ Upload new files and associate with captions
//     let uploadedFilesWithCaptions = [];
//     if (req.files && req.files.length > 0) {
//       uploadedFilesWithCaptions = await Promise.all(
//         req.files.map(async (file, index) => { // Added 'index' here
//           const url = await uploadFileToSpaces(file, "story-slides");
//           return {
//             mediaUrl: url,
//             mediaType: file.mimetype.startsWith("video") ? "video" : "image",
//             caption: captions[index] || file.originalname || "", // Use caption from req.body.captions
//           };
//         })
//       );
//     }

//     const story = await Story.findById(storyId);
//     if (!story) {
//       return res.status(404).json({ success: false, message: "Story not found" });
//     }

  
//     story.slides.push(...slides, ...uploadedFilesWithCaptions); // Keep existing 'slides' if any, then add the newly uploaded ones.
//     story.updatedBy = req.user?._id;
//     await story.save();

//     res.json({
//       success: true,
//       message: "Slides added successfully",
//       data: story,
//     });
//   } catch (error) {
//     console.error("Error adding slides:", error);
//     res.status(500).json({ success: false, message: "Failed to add slides", error: error.message });
//   }
// };


// export const addSlidesToStory = async (req, res) => {
//   try {
//     const { storyId } = req.params;
//     let { slides = [] } = req.body;

//     // Ensure slides is array
//     if (typeof slides === "string") {
//       try { slides = JSON.parse(slides); } catch { slides = []; }
//     }

//     // ✅ Upload new files if any
//     let uploadedSlides = [];
//     if (req.files && req.files.length > 0) {
//       uploadedSlides = await Promise.all(
//         req.files.map(async (file) => {
//           const url = await uploadFileToSpaces(file, "story-slides");
//           return {
//             mediaUrl: url,
//             mediaType: file.mimetype.startsWith("video") ? "video" : "image",
//             caption: file.originalname || "",
//           };
//         })
//       );
//     }

//     const story = await Story.findById(storyId);
//     if (!story) {
//       return res.status(404).json({ success: false, message: "Story not found" });
//     }

//     // ✅ Add new slides
//     story.slides.push(...slides, ...uploadedSlides);
//     story.updatedBy = req.user?._id;
//     await story.save();

//     res.json({
//       success: true,
//       message: "Slides added successfully",
//       data: story,
//     });
//   } catch (error) {
//     console.error("Error adding slides:", error);
//     res.status(500).json({ success: false, message: "Failed to add slides", error: error.message });
//   }
// };