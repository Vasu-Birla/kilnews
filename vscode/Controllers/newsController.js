

import News from '../Models/news.model.js';
import { Category, SubCategory, Country, State, City } from '../Models/lookupData.model.js';
import { STATUS_CODES, MESSAGES } from '../Utils/status.codes.messages.js'; // Updated MESSAGES imported
import { ApiError } from '../Utils/apiError.js';
import User from '../Models/user.model.js';
import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';
import headlineModel from '../Models/headline.model.js';
import PdfPrinter from "pdfmake";
import fs from "fs";
import path from "path";
import NewsPoll from "../Models/NewsPoll.js"; // ✅ import Poll Model
import Tag from '../Models/Tag.js';
import SavedNews from '../Models/SavedNews.js';
import { generateSlug } from '../Utils/slugifyUtils.js';
import {
  buildSharePreviewHtml,
  getPublicImageUrl,
  normalizeBaseUrl,
  toPlainText,
} from '../Utils/sharePreview.js';
// Helper function to convert Mongoose ObjectId to String for comparison
const convertIdToString = (id) => (id ? id.toString() : null);
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:3000'; // लोकल डेवलपमेंट के लिए डिफ़ॉल्ट
//chage 8/7/25

// export const createNews = async (req, res, next) => {
//   try {
//     const {
//       title,
//       content,
//       summary,
//       category,
//       subCategory,
//       subSubCategory,
//       tags = [],
//       country,
//       state,
//       city,
//       localAddress,
//       isHeadline,
//     } = req.body;

//     const userId = req.user?._id;

//     if (!userId) throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);

//     const user = await User.findById(userId);
//     if (!user) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND);

//     if (!title || !content || !category) {
//       throw new ApiError(STATUS_CODES.BAD_REQUEST, "Title, content and category are required.");
//     }

//     // Fetch category and subCategory names
//     const categoryDoc = await Category.findById(category);
//     const subCategoryDoc = await SubCategory.findById(subCategory);

//     if (!categoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid category ID");
//     if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid subCategory ID");

//     // Media upload
//     let media = [];
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const url = await uploadFileToSpaces(file, 'news-media');
//         media.push({
//           url,
//           type: file.mimetype.startsWith('video') ? 'video' : 'image',
//           caption: file.originalname || ''
//         });
//       }
//     }

//     // Status based on permission
//     const status = user.canDirectPost ? 'posted' : 'pending_approval';

//     // Prepare news payload
//     const newsPayload = {
//       title,
//       content,
//       summary,
//       category,
//       subCategory,
//       tags,
//       media,
//       country,
//       state,
//       city,
//       localAddress,
//       status,
//       createdBy: userId,
//       updatedBy: userId,
//       publishedAt: (status === 'posted' || status === 'live') ? new Date() : null
//     };

//     // ✅ Only include subSubCategory if Astrology > Rashi
//     if (
//       categoryDoc.name.toLowerCase() === 'astrology' &&
//       subCategoryDoc.name.toLowerCase() === 'rashi' &&
//       subSubCategory
//     ) {
//       newsPayload.subSubCategory = subSubCategory;
//     }

//     // ✅ Save News
//     const news = await News.create(newsPayload);
//     news.shareLink = `${FRONTEND_BASE_URL}/news/${news._id}`;
//     await news.save();

//     // ✅ If Headline option is true → save in headlineModel also
//     if (isHeadline === true || isHeadline === 'true') {
//       const newHeadline = new headlineModel({
//         newsId: news._id, // reference rakho
//         headlineText: news.title,
//         createdBy: news.createdBy,
//         category: news.category,
//         subCategory: news.subCategory || null,
//         country: news.country || null,
//         state: news.state || null,
//         city: news.city || null,
//         status: news.status,
//       });
//       await newHeadline.save();
//     }

//     // ✅ Single response only
//     res.status(STATUS_CODES.CREATED).json({
//       success: true,
//       message: MESSAGES.CREATED, // Using MESSAGES.CREATED
//       data: news
//     });

//   } catch (error) {
//     // Cleanup files if DB fails
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         if (file.location) {
//           await deleteFileFromSpaces(file.location).catch(err =>
//             console.error("Cleanup error:", err)
//           );
//         }
//       }
//     }
//     next(error);
//   }
// };


// export const createNews = async (req, res, next) => {
//   try {
//     const {
//       title,
//       content,
//       summary,
//       category,
//       subCategory,
//       subSubCategory,
//       tags = [],
//       country,
//       state,
//       city,
//       localAddress,
//       isHeadline,
//       poll, // ✅ poll data accept kar rahe hain
//     } = req.body;

//     const userId = req.user?._id;

//     if (!userId) throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);

//     const user = await User.findById(userId);
//     if (!user) throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND);

//     if (!title || !content || !category) {
//       throw new ApiError(STATUS_CODES.BAD_REQUEST, "Title, content and category are required.");
//     }

//     // Fetch category and subCategory names
//     const categoryDoc = await Category.findById(category);
//     const subCategoryDoc = await SubCategory.findById(subCategory);

//     if (!categoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid category ID");
//     if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid subCategory ID");

//     // Media upload
//     let media = [];
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         const url = await uploadFileToSpaces(file, "news-media");
//         media.push({
//           url,
//           type: file.mimetype.startsWith("video") ? "video" : "image",
//           caption: file.originalname || "",
//         });
//       }
//     }

//     // Status based on permission
//     const status = user.canDirectPost ? "posted" : "pending_approval";

//     // Prepare news payload
//     const newsPayload = {
//       title,
//       content,
//       summary,
//       category,
//       subCategory,
//       tags,
//       media,
//       country,
//       state,
//       city,
//       localAddress,
//       status,
//       createdBy: userId,
//       updatedBy: userId,
//       publishedAt: status === "posted" || status === "live" ? new Date() : null,
//     };

//     // ✅ Only include subSubCategory if Astrology > Rashi
//     if (
//       categoryDoc.name.toLowerCase() === "astrology" &&
//       subCategoryDoc.name.toLowerCase() === "rashi" &&
//       subSubCategory
//     ) {
//       newsPayload.subSubCategory = subSubCategory;
//     }

//     // ✅ Save News
//     const news = await News.create(newsPayload);
//     news.shareLink = `${FRONTEND_BASE_URL}/news/${news._id}`;
//     await news.save();

//     // ✅ If Poll data provided → create poll
//     if (poll && poll.question && poll.options?.length > 0) {
//       const createdPoll = await NewsPoll.create({
//         question: poll.question,
//         options: poll.options.map((opt) => ({ text: opt })),
//         newsId: news._id,
//         createdBy: userId,
//       });

//       // Link poll back to news
//       news.poll = createdPoll._id;
//       await news.save();
//     }

//     if (tags && tags.length > 0) {
//   for (const tagName of tags) {
//     let tag = await Tag.findOne({ name: tagName.trim() });

//     if (!tag) {
//       // Agar tag exist nahi karta → naya create karo
//       tag = await Tag.create({
//         name: tagName.trim(),
//         createdBy: userId,
//         news: [news._id],   // naya news add karte hi
//       });
//     } else {
//       // Agar tag exist karta hai → usme newsId push karo (agar already nahi hai)
//       if (!tag.news.includes(news._id)) {
//         tag.news.push(news._id);
//         await tag.save();
//       }
//     }
//   }
// }

//     // ✅ If Headline option is true → save in headlineModel also
//     if (isHeadline === true || isHeadline === "true") {
//       const newHeadline = new headlineModel({
//         newsId: news._id, // reference rakho
//         headlineText: news.title,
//         createdBy: news.createdBy,
//         category: news.category,
//         subCategory: news.subCategory || null,
//         country: news.country || null,
//         state: news.state || null,
//         city: news.city || null,
//         status: news.status,
//       });
//       await newHeadline.save();

//       // ✅ Tags ko Tag Model me bhi save karo

//     }

//     // ✅ Single response only
//     res.status(STATUS_CODES.CREATED).json({
//       success: true,
//       message: MESSAGES.CREATED, // Using MESSAGES.CREATED
//       data: news,
//     });
//   } catch (error) {
//     // Cleanup files if DB fails
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         if (file.location) {
//           await deleteFileFromSpaces(file.location).catch((err) =>
//             console.error("Cleanup error:", err)
//           );
//         }
//       }
//     }
//     next(error);
//   }
// };
///////////////////////////////////////////////////////  create new work done /////////////////////////////////

// export const createNews = async (req, res, next) => {
//   try {
//     let {
//       title,
//       content,
//       summary,
//       category,
//       subCategory,
//       subSubCategory,
//       tags = [],
//       country,
//       state,
//       city,
//       localAddress,
//       isHeadline,
//       poll,
//            referenceLinks = [], // ✅ New field for external links
//       mediaUrls = [], // frontend se aa sakta hai
//     } = req.body;

//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // ✅ Validation
//     if (!title || !content || !category) {
//       return res.status(400).json({ success: false, message: "Title, Content, Category required" });
//     }

//     // ✅ Ensure tags is array
//     if (typeof tags === "string") {
//       try {
//         tags = JSON.parse(tags);
//       } catch {
//         tags = [tags];
//       }
//     }

//     // ✅ Ensure mediaUrls is array
//     if (typeof mediaUrls === "string") {
//       try {
//         mediaUrls = JSON.parse(mediaUrls);
//       } catch {
//         mediaUrls = [mediaUrls];
//       }
//     }
//     if (!Array.isArray(mediaUrls)) mediaUrls = [];

//        // ✅ Ensure referenceLinks is an array (New change)
//     if (typeof referenceLinks === "string") {
//       try {
//         referenceLinks = JSON.parse(referenceLinks);
//       } catch {
//         referenceLinks = [referenceLinks];
//       }
//     }
//     if (!Array.isArray(referenceLinks)) referenceLinks = [];


//     // ✅ Uploaded files → media objects
//     let uploadedMedia = [];
//     if (req.files && req.files.length > 0) {
//       uploadedMedia = await Promise.all(
//         req.files.map(async (file) => {
//           const url = await uploadFileToSpaces(file, "news-media"); // ✅ proper upload
//           return {
//             url,
//             type: file.mimetype.startsWith("video") ? "video" : "image",
//             caption: file.originalname || "",
//           };
//         })
//       );
//     }

//     // ✅ External URLs → media objects
//     const externalMedia = mediaUrls.map((url) => ({
//       url,
//       type: url.includes("youtube") || url.includes(".mp4") ? "video" : "image",
//       caption: "",
//     }));

//     // ✅ Merge both
//     const media = [...uploadedMedia, ...externalMedia];

//     // ✅ Status (admin vs reporter)
//     const user = await User.findById(userId);
//     const status = user?.canDirectPost ? "posted" : "pending_approval";

//     // ✅ Final payload
//     const newsPayload = {
//       title,
//       content,
//       summary,
//       category,
//       subCategory,
//       subSubCategory,
//       tags,
//       media,
//       country,
//       state,
//       city,
//       localAddress,
//       isHeadline,
//       poll,
//       status,
//       createdBy: userId,
//       updatedBy: userId,
//       publishedAt: status === "posted" ? new Date() : null,
//             referenceLinks, // ✅ Add the new field to the payload
//     };

//     const news = await News.create(newsPayload);

//     // ✅ Generate share link
//     news.shareLink = `${FRONTEND_BASE_URL}/news/${news._id}`;
//     await news.save();

//     // ✅ Poll create
//     if (poll && poll.question && poll.options?.length > 0) {
//       const createdPoll = await NewsPoll.create({
//         question: poll.question,
//         options: poll.options.map((opt) => ({ text: opt })),
//         newsId: news._id,
//         createdBy: userId,
//       });
//       news.poll = createdPoll._id;
//       await news.save();
//     }

//     if (tags && tags.length > 0) {
//   for (const tagName of tags) {
//     let tag = await Tag.findOne({ name: tagName.trim() });

//     if (!tag) {
//       // Agar tag exist nahi karta → naya create karo
//       tag = await Tag.create({
//         name: tagName.trim(),
//         createdBy: userId,
//         news: [news._id],   // naya news add karte hi
//       });
//     } else {
//       // Agar tag exist karta hai → usme newsId push karo (agar already nahi hai)
//       if (!tag.news.includes(news._id)) {
//         tag.news.push(news._id);
//         await tag.save();
//       }
//     }
//   }
// }

//     // ✅ Headline create
//     if (isHeadline === true || isHeadline === "true") {
//       await new headlineModel({
//         newsId: news._id,
//         headlineText: news.title,
//         createdBy: news.createdBy,
//         category: news.category,
//         subCategory: news.subCategory || null,
//         country: news.country || null,
//         state: news.state || null,
//         city: news.city || null,
//         status: news.status,
//       }).save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "News created successfully",
//       data: news,
//     });
//   } catch (error) {
//     console.error("Error creating news:", error);

//     // ✅ Cleanup uploaded files agar DB save fail ho jaye
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         if (file.location) {
//           await deleteFileFromSpaces(file.location).catch((err) =>
//             console.error("Cleanup error:", err)
//           );
//         }
//       }
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to create news",
//       error: error.message,
//     });
//   }
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





 // update karn slug nhi aa rha tha 10/6/25
 
// export const createNews = async (req, res, next) => {
//     try {
//         let {
//             title_en, // New
//             title_hi, // New
//             content_en, // New
//             content_hi, // New
//             summary_en, // New
//             summary_hi, // New
//             category,
//             subCategory,
//             subSubCategory,
//             tags = [],
//             country,
//             state,
//             city,
//             localAddress,
//             isHeadline,
//             poll,
//             referenceLinks = [],
//             mediaUrls = [],
//         } = req.body;

//         const userId = req.user?._id;
//         if (!userId) {
//             return res.status(401).json({ success: false, message: "Unauthorized" });
//         }

    
//         // ✅ Ensure tags is array
//         if (typeof tags === "string") {
//             try {
//                 tags = JSON.parse(tags);
//             } catch {
//                 tags = [tags];
//             }
//         }

//         // ✅ Ensure mediaUrls is array
//         if (typeof mediaUrls === "string") {
//             try {
//                 mediaUrls = JSON.parse(mediaUrls);
//             } catch {
//                 mediaUrls = [mediaUrls];
//             }
//         }
//         if (!Array.isArray(mediaUrls)) mediaUrls = [];

//         // ✅ Ensure referenceLinks is an array (New change)
//         if (typeof referenceLinks === "string") {
//             try {
//                 referenceLinks = JSON.parse(referenceLinks);
//             } catch {
//                 referenceLinks = [referenceLinks];
//             }
//         }
//         if (!Array.isArray(referenceLinks)) referenceLinks = [];


//         // ✅ Uploaded files → media objects
//         let uploadedMedia = [];
//         if (req.files && req.files.length > 0) {
//             uploadedMedia = await Promise.all(
//                 req.files.map(async (file) => {
//                     const url = await uploadFileToSpaces(file, "news-media"); // ✅ proper upload
//                     return {
//                         url,
//                         type: file.mimetype.startsWith("video") ? "video" : "image",
//                         caption: file.originalname || "",
//                     };
//                 })
//             );
//         }

//         // ✅ External URLs → media objects
//         const externalMedia = mediaUrls.map((url) => ({
//             url,
//             type: url.includes("youtube") || url.includes(".mp4") ? "video" : "image",
//             caption: "",
//         }));

//         // ✅ Merge both
//         const media = [...uploadedMedia, ...externalMedia];

//         // ✅ Status (admin vs reporter)
//         const user = await User.findById(userId);
//         const status = user?.canDirectPost ? "posted" : "pending_approval";

           
//         // ✅ Final payload
//         const newsPayload = {
//             title_en, // New
//             title_hi, // New
//             content_en, // New
//             content_hi, // New
//             summary_en, // New
//             summary_hi, // New
             
//             category,
//               subCategory,
//               subSubCategory,
//             tags,
//             media,
//             country,
//             state,
//             city,
//             localAddress,
//             isHeadline,
//             poll,
//             status,
//             createdBy: userId,
//             updatedBy: userId,
//             publishedAt: status === "posted" ? new Date() : null,
//             referenceLinks,
//         };

//         const news = await News.create(newsPayload);

//         // ✅ Generate share link
//         const slug_en = `${generateSlug(title_en)}-${news._id}`;
// news.slug_en = slug_en;
//         news.shareLink = `${FRONTEND_BASE_URL}/news/${news._id}`;
//         // news.shareLink = `${FRONTEND_BASE_URL}/news/${slug_en}`
//         await news.save();
        

//         // ✅ Poll create
//         if (poll && poll.question && poll.options?.length > 0) {
//             const createdPoll = await NewsPoll.create({
//                 question: poll.question,
//                 options: poll.options.map((opt) => ({ text: opt })),
//                 newsId: news._id,
//                 createdBy: userId,
//             });
//             news.poll = createdPoll._id;
//             await news.save();
//         }

//         if (tags && tags.length > 0) {
//             for (const tagName of tags) {
//                 let tag = await Tag.findOne({ name: tagName.trim() });

//                 if (!tag) {
//                     // Agar tag exist nahi karta → naya create karo
//                     tag = await Tag.create({
//                         name: tagName.trim(),
//                         createdBy: userId,
//                         news: [news._id],   // naya news add karte ही
//                     });
//                 } else {
//                     // Agar tag exist karta hai → usme newsId push karo (agar already nahi hai)
//                     if (!tag.news.includes(news._id)) {
//                         tag.news.push(news._id);
//                         await tag.save();
//                     }
//                 }
//             }
//         }

//         // ✅ Headline create
//         if (isHeadline === true || isHeadline === "true") {
//             await new headlineModel({
//                 newsId: news._id,
//                 headlineText: news.title_en ||news.title_hi , // Using English title for headline text
//                 createdBy: news.createdBy,
//                 category: news.category,
//                 subCategory: news.subCategory || null,
//                 country: news.country || null,
//                 state: news.state || null,
//                 city: news.city || null,
//                 status: news.status,
//             }).save();
//         }

//         res.status(201).json({
//             success: true,
//             message: "News created successfully",
//             data: news,
//         });
//     } catch (error) {
//         console.error("Error creating news:", error);

//         // ✅ Cleanup uploaded files agar DB save fail ho jaye
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 if (file.location) {
//                     await deleteFileFromSpaces(file.location).catch((err) =>
//                         console.error("Cleanup error:", err)
//                     );
//                 }
//             }
//         }

//         res.status(500).json({
//             success: false,
//             message: "Failed to create news",
//             error: error.message,
//         });
//     }
// };


// export const createNews = async (req, res, next) => {
//     try {
//         let {
//             title_en, // New
//             title_hi, // New
//             content_en, // New
//             content_hi, // New
//             summary_en, // New
//             summary_hi, // New
//             category,
//             subCategory,
//             subSubCategory,
//             tags = [],
//             country,
//             state,
//             city,
//             localAddress,
//             isHeadline,
//             poll,
//             referenceLinks = [],
//             mediaUrls = [],
//         } = req.body;

//         const userId = req.user?._id;
//         if (!userId) {
//             return res.status(401).json({ success: false, message: "Unauthorized" });
//         }

    
//         // ✅ Ensure tags is array
//         if (typeof tags === "string") {
//             try {
//                 tags = JSON.parse(tags);
//             } catch {
//                 tags = [tags];
//             }
//         }

//         // ✅ Ensure mediaUrls is array
//         if (typeof mediaUrls === "string") {
//             try {
//                 mediaUrls = JSON.parse(mediaUrls);
//             } catch {
//                 mediaUrls = [mediaUrls];
//             }
//         }
//         if (!Array.isArray(mediaUrls)) mediaUrls = [];

//         // ✅ Ensure referenceLinks is an array (New change)
//         if (typeof referenceLinks === "string") {
//             try {
//                 referenceLinks = JSON.parse(referenceLinks);
//             } catch {
//                 referenceLinks = [referenceLinks];
//             }
//         }
//         if (!Array.isArray(referenceLinks)) referenceLinks = [];


//         // ✅ Uploaded files → media objects
//         let uploadedMedia = [];
//         if (req.files && req.files.length > 0) {
//             uploadedMedia = await Promise.all(
//                 req.files.map(async (file) => {
//                     const url = await uploadFileToSpaces(file, "news-media"); // ✅ proper upload
//                     return {
//                         url,
//                         type: file.mimetype.startsWith("video") ? "video" : "image",
//                         caption: file.originalname || "",
//                     };
//                 })
//             );
//         }

//         // ✅ External URLs → media objects
//         const externalMedia = mediaUrls.map((url) => ({
//             url,
//             type: url.includes("youtube") || url.includes(".mp4") ? "video" : "image",
//             caption: "",
//         }));

//         // ✅ Merge both
//         const media = [...uploadedMedia, ...externalMedia];

//         // ✅ Status (admin vs reporter)
//         const user = await User.findById(userId);
//         const status = user?.canDirectPost ? "posted" : "pending_approval";

           
//         // ✅ Final payload
//         const newsPayload = {
//             title_en, // New
//             title_hi, // New
//             content_en, // New
//             content_hi, // New
//             summary_en, // New
//             summary_hi, // New
             
//             category,
//               subCategory,
//               subSubCategory,
//             tags,
//             media,
//             country,
//             state,
//             city,
//             localAddress,
//             isHeadline,
//             poll,
//             status,
//             createdBy: userId,
//             updatedBy: userId,
//             publishedAt: status === "posted" ? new Date() : null,
//             referenceLinks,
//         };

//         const news = await News.create(newsPayload);

//         // ✅ Generate and assign the ONE slug (prioritizing Hindi) to the existing slug_en field
//         if (title_hi && title_hi.trim()) { // Agar Hindi title hai, toh uska slug banao
//             news.slug_en = `${generateSlug(title_hi)}-${news._id}`;
//         } else if (title_en && title_en.trim()) { // Warna, agar English title hai, toh uska slug banao
//             news.slug_en = `${generateSlug(title_en)}-${news._id}`;
//         }
//         // Agar dono nahi hain, toh slug_en null/undefined hi rahega, jaisa ki aapke schema mein 'sparse' allow karta hai.
        
//         news.shareLink = `${FRONTEND_BASE_URL}/news/${news._id}`;
//         await news.save();
        

//         // ✅ Poll create
//         if (poll && poll.question && poll.options?.length > 0) {
//             const createdPoll = await NewsPoll.create({
//                 question: poll.question,
//                 options: poll.options.map((opt) => ({ text: opt })),
//                 newsId: news._id,
//                 createdBy: userId,
//             });
//             news.poll = createdPoll._id;
//             await news.save();
//         }

//         if (tags && tags.length > 0) {
//             for (const tagName of tags) {
//                 let tag = await Tag.findOne({ name: tagName.trim() });

//                 if (!tag) {
//                     // Agar tag exist nahi karta → naya create karo
//                     tag = await Tag.create({
//                         name: tagName.trim(),
//                         createdBy: userId,
//                         news: [news._id],   // naya news add karte ही
//                     });
//                 } else {
//                     // Agar tag exist karta hai → usme newsId push karo (agar already nahi hai)
//                     if (!tag.news.includes(news._id)) {
//                         tag.news.push(news._id);
//                         await tag.save();
//                     }
//                 }
//             }
//         }

//         // ✅ Headline create
//         if (isHeadline === true || isHeadline === "true") {
//             await new headlineModel({
//                 newsId: news._id,
//                 headlineText: news.title_en || news.title_hi, // Using English title for headline text
//                 createdBy: news.createdBy,
//                 category: news.category,
//                 subCategory: news.subCategory || null,
//                 country: news.country || null,
//                 state: news.state || null,
//                 city: news.city || null,
//                 status: news.status,
//             }).save();
//         }

//         res.status(201).json({
//             success: true,
//             message: "News created successfully",
//             data: news,
//         });
//     } catch (error) {
//         console.error("Error creating news:", error);

//         // ✅ Cleanup uploaded files agar DB save fail ho jaye
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 if (file.location) {
//                     await deleteFileFromSpaces(file.location).catch((err) =>
//                         console.error("Cleanup error:", err)
//                     );
//                 }
//             }
//         }

//         res.status(500).json({
//             success: false,
//             message: "Failed to create news",
//             error: error.message,
//         });
//     }
// }; 


const stripHtmlTags = (str) => {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, '')         // 1. सारे HTML टैग्स (<p>, <span> आदि) हटाएगा
    .replace(/&nbsp;/g, ' ')        // 2. खाली जगह (&nbsp;) को नॉर्मल स्पेस बनाएगा
    .replace(/&[a-z0-9]+;/gi, '')    // 3. बाकी सारे HTML entities (&lt;, &gt;, &amp;) हटाएगा
    .trim();                        // 4. आगे-पीछे की फालतू जगह हटाएगा
};


export const createNews = async (req, res, next) => {
  try {
    let {
      title_en,
      title_hi,
      content_en,
      content_hi,
      summary_en,
      summary_hi,
      category,
      subCategory,
      subSubCategory,
      tags = [],
      country,
      state,
      city,
      localAddress,
      isHeadline,
      poll,
      referenceLinks = [],
      mediaUrls = [],
    } = req.body;

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Ensure tags is array
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = [tags];
      }
    }

    // ✅ Ensure mediaUrls is array
    if (typeof mediaUrls === "string") {
      try {
        mediaUrls = JSON.parse(mediaUrls);
      } catch {
        mediaUrls = [mediaUrls];
      }
    }
    if (!Array.isArray(mediaUrls)) mediaUrls = [];

    // ✅ Ensure referenceLinks is an array
    if (typeof referenceLinks === "string") {
      try {
        referenceLinks = JSON.parse(referenceLinks);
      } catch {
        referenceLinks = [referenceLinks];
      }
    }
    if (!Array.isArray(referenceLinks)) referenceLinks = [];

    // ✅ Separate PDF files from media files
    let uploadedMedia = [];
    let uploadedPdfFiles = [];
    
    if (req.files && req.files.length > 0) {
      const mediaPromises = req.files.map(async (file) => {
        const url = await uploadFileToSpaces(file, "news-media");
        
        // Check if file is PDF
        if (file.mimetype === "application/pdf") {
          return {
            type: 'pdf',
            url,
            originalName: file.originalname
          };
        } else {
          return {
            type: 'media',
            url,
            mediaType: file.mimetype.startsWith("video") ? "video" : "image",
            caption: file.originalname || "",
          };
        }
      });

      const uploadedFiles = await Promise.all(mediaPromises);
      
      // Separate PDFs from media
      uploadedMedia = uploadedFiles
        .filter(f => f.type === 'media')
        .map(f => ({ url: f.url, type: f.mediaType, caption: f.caption }));
      
      uploadedPdfFiles = uploadedFiles
        .filter(f => f.type === 'pdf')
        .map(f => ({ 
          url: f.url, 
          originalName: f.originalName,
          uploadedAt: new Date()
        }));
    }

    // ✅ External URLs → media objects
    const externalMedia = mediaUrls.map((url) => ({
      url,
      type: url.includes("youtube") || url.includes(".mp4") ? "video" : "image",
      caption: "",
    }));

    // ✅ Merge both
    const media = [...uploadedMedia, ...externalMedia];

    // ✅ Status (admin vs reporter)
    const user = await User.findById(userId);
    const status = user?.canDirectPost ? "posted" : "pending_approval";

    // ✅ Final payload
    const newsPayload = {
      title_en,
      title_hi,
      content_en,
      content_hi,
      summary_en,
      summary_hi,
      category,
      subCategory,
      subSubCategory,
      tags,
      media,
      pdfFiles: uploadedPdfFiles, // ✅ Add PDF files here
      country,
      state,
      city,
      localAddress,
      isHeadline,
      poll,
      status,
      createdBy: userId,
      updatedBy: userId,
      publishedAt: status === "posted" ? new Date() : null,
      referenceLinks,
    };

    const news = await News.create(newsPayload);

    // // ✅ Generate and assign the ONE slug
    // if (title_hi && title_hi.trim()) {
    //   news.slug_en = `${generateSlug(title_hi)}-${news._id}`;
    // } else if (title_en && title_en.trim()) {
    //   news.slug_en = `${generateSlug(title_en)}-${news._id}`;
    // }

        // ✅ सुधार यहाँ है: Slug बनाने से पहले HTML साफ करें
    const cleanTitleHi = stripHtmlTags(title_hi);
    const cleanTitleEn = stripHtmlTags(title_en);

     // 🛑 DEBUG: यहाँ चेक करें कि साफ़ होने के बाद क्या आ रहा है
    console.log("Original Title Hi:", title_hi);
    console.log("Clean Title Hi for Slug:", cleanTitleHi);

    if (cleanTitleHi && cleanTitleHi.trim()) {
      // साफ़ सुथरे हिंदी टाइटल से slug बनाएं
      news.slug_en = `${generateSlug(cleanTitleHi)}-${news._id}`;
    } else if (cleanTitleEn && cleanTitleEn.trim()) {
      // साफ़ सुथरे इंग्लिश टाइटल से slug बनाएं
      news.slug_en = `${generateSlug(cleanTitleEn)}-${news._id}`;
    }


    news.shareLink = `${FRONTEND_BASE_URL}/news/${news._id}`;
    await news.save();

    // ✅ Poll create
    if (poll && poll.question && poll.options?.length > 0) {
      const createdPoll = await NewsPoll.create({
        question: poll.question,
        options: poll.options.map((opt) => ({ text: opt })),
        newsId: news._id,
        createdBy: userId,
      });
      news.poll = createdPoll._id;
      await news.save();
    }

    // ✅ Tags handling
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await Tag.findOne({ name: tagName.trim() });

        if (!tag) {
          tag = await Tag.create({
            name: tagName.trim(),
            createdBy: userId,
            news: [news._id],
          });
        } else {
          if (!tag.news.includes(news._id)) {
            tag.news.push(news._id);
            await tag.save();
          }
        }
      }
    }

    // ✅ Headline create
    if (isHeadline === true || isHeadline === "true") {
      await new headlineModel({
        newsId: news._id,
        headlineText: news.title_en || news.title_hi,
        createdBy: news.createdBy,
        category: news.category,
        subCategory: news.subCategory || null,
        country: news.country || null,
        state: news.state || null,
        city: news.city || null,
        status: news.status,
      }).save();
    }

    res.status(201).json({
      success: true,
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    console.error("Error creating news:", error);

    // ✅ Cleanup uploaded files if DB save fails
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file.location) {
          await deleteFileFromSpaces(file.location).catch((err) =>
            console.error("Cleanup error:", err)
          );
        }
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to create news",
      error: error.message,
    });
  }
};







export const addLikeToNews = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED + ": User ID missing.");
        }

        const news = await News.findById(newsId);
        if (!news) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
        }

        // Safe check for like
        const hasLiked = news.likes.some(
            like =>
                (like.user._id ? like.user._id.toString() : like.user.toString()) === userId.toString()
        );

        if (hasLiked) {
            // Unlike
            news.likes = news.likes.filter(
                like => (like.user._id ? like.user._id.toString() : like.user.toString()) !== userId.toString()
            );
            await news.save();
            res.status(STATUS_CODES.SUCCESS).json({
                success: true,
                message: MESSAGES.NEWS_UNLIKED, // Using MESSAGES.NEWS_UNLIKED
                likesCount: news.likes.length,
            });
        } else {
            // Like
            news.likes.push({ user: userId });
            await news.save();
            res.status(STATUS_CODES.CREATED).json({
                success: true,
                message: MESSAGES.NEWS_LIKED, // Using MESSAGES.NEWS_LIKED
                likesCount: news.likes.length,
            });
        }
    } catch (error) {
        console.error("Error liking news:", error);
        next(error);
    }
};


export const addCommentToNews = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        const { text } = req.body;
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED + ": User ID missing.");
        }
        if (!text || text.trim() === '') {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Comment text cannot be empty.");
        }

        const news = await News.findById(newsId);
        if (!news) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
        }

        // Add new comment
        news.comments.push({ user: userId, text: text.trim() });
        await news.save();

        // You might want to populate the last added comment's user for the response
        const newComment = news.comments[news.comments.length - 1];
        // Populate the user who just commented on the fetched news item
        const populatedNews = await News.findById(newsId)
                                    .populate('comments.user', 'name profileImage');
        const latestCommentPopulated = populatedNews.comments.find(c => c._id.toString() === newComment._id.toString());


        res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.COMMENT_POSTED, // Using MESSAGES.COMMENT_POSTED
            comment: latestCommentPopulated,
            commentsCount: populatedNews.comments.length,
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        next(error);
    }
};

// export const getAllNews = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // select, sort हटाओ, बाकी काम करेंगे
//     const removeFields = ["select", "sort"];
//     removeFields.forEach((param) => delete reqQuery[param]);

//     // Mongo operators add
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(
//       /\b(gt|gte|lt|lte|in)\b/g,
//       (match) => `$${match}`
//     );
//     let finalQueryFilter = JSON.parse(queryStr);

//     // ✅ अगर admin/superadmin नहीं है तो सिर्फ posted/live दिखे
//     if (
//       !req.user ||
//       (req.user.role !== "admin" && req.user.role !== "superadmin")
//     ) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     query = News.find(finalQueryFilter);

//     // select handle
//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     // sort handle
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // Populate relations
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     // ✅ बिना limit/skip => सारे news मिलेंगे
//     const news = await query;

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       count: news.length,
//       message: MESSAGES.NEWS_FETCHED_SUCCESS, // Using MESSAGES.NEWS_FETCHED_SUCCESS
//       data: news.map((item) => {
//         const newsObj = item.toObject({ virtuals: true });
//         newsObj.shareLink = item.shareLink;
//         newsObj.postedDate = item.publishedAt
//           ? item.publishedAt.toISOString().split("T")[0]
//           : null;
//         newsObj.postedTime = item.publishedAt
//           ? item.publishedAt.toISOString().split("T")[1].substring(0, 8)
//           : null;
//         newsObj.createdAtDate = item.createdAt
//           .toISOString()
//           .split("T")[0];
//         newsObj.createdAtTime = item.createdAt
//           .toISOString()
//           .split("T")[1]
//           .substring(0, 8);
//         newsObj.updatedAtDate = item.updatedAt
//           .toISOString()
//           .split("T")[0];
//         newsObj.updatedAtTime = item.updatedAt
//           .toISOString()
//           .split("T")[1]
//           .substring(0, 8);

//         const currentUserId = req.user?._id?.toString();
//         newsObj.isLikedByCurrentUser = false;

//         if (currentUserId && Array.isArray(newsObj.likes)) {
//           newsObj.isLikedByCurrentUser = newsObj.likes.some((like) => {
//             const likeUserId = like.user?._id
//               ? like.user._id.toString()
//               : like.user?.toString();
//             return likeUserId === currentUserId;
//           });
//         }

//         return newsObj;
//       }),
//     });
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };


// export const getAllNews = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // Remove select and sort
//     const removeFields = ["select", "sort"];
//     removeFields.forEach(param => delete reqQuery[param]);

//     // Mongo operators
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Only posted/live for non-admin users
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     query = News.find(finalQueryFilter);

//     // select
//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     // sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // populate
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     const news = await query;

//     // Get current user's saved news IDs
//     const currentUserId = req.user?._id?.toString();
//     let savedNewsIds = [];
//     if (currentUserId) {
//       const userSavedNews = await SavedNews.findOne({ user: currentUserId });
//       if (userSavedNews && Array.isArray(userSavedNews.news)) {
//         savedNewsIds = userSavedNews.news.map(n => n.toString());
//       }
//     }

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       count: news.length,
//       message: MESSAGES.NEWS_FETCHED_SUCCESS,
//       data: news.map(item => {
//         const newsObj = item.toObject({ virtuals: true });
        
//         // Dates
//         newsObj.shareLink = item.shareLink;
//         newsObj.postedDate = item.publishedAt ? item.publishedAt.toISOString().split("T")[0] : null;
//         newsObj.postedTime = item.publishedAt ? item.publishedAt.toISOString().split("T")[1].substring(0, 8) : null;
//         newsObj.createdAtDate = item.createdAt.toISOString().split("T")[0];
//         newsObj.createdAtTime = item.createdAt.toISOString().split("T")[1].substring(0, 8);
//         newsObj.updatedAtDate = item.updatedAt.toISOString().split("T")[0];
//         newsObj.updatedAtTime = item.updatedAt.toISOString().split("T")[1].substring(0, 8);

//         // Likes
//         newsObj.isLiked  = false;
//         if (currentUserId && Array.isArray(newsObj.likes)) {
//           newsObj.isLiked = newsObj.likes.some(like => {
//             const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
//             return likeUserId === currentUserId;
//           });
//         }

//         // Saved news
//         newsObj.isSaved = savedNewsIds.includes(item._id.toString());

//         return newsObj;
//       }),
//     });
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };

// export const getAllNews = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // Remove select/sort/lang
//     const removeFields = ["select", "sort", "lang"];
//     removeFields.forEach(param => delete reqQuery[param]);

//     // Mongo operators
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Only posted/live for non-admin users
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     query = News.find(finalQueryFilter);

//     // हमेशा दोनों lang fields select करेंगे
//     let selectFields =
//       "title_en content_en summary_en title_hi content_hi summary_hi slug_en category subCategory country state city media createdBy updatedBy publishedAt status";

//     query = query.select(selectFields);

//     // sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // populate
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     const news = await query;
//     const lang = req.query.lang || "en";

//     // ✅ filter करके सिर्फ उसी lang वाले लाओ जिनमें data है
//     const filteredData = news
//       .map(item => {
//         const obj = item.toObject();

//         if (lang === "hi") {
//           if (!obj.title_hi && !obj.content_hi && !obj.summary_hi) {
//             return null; // Hindi data खाली है → exclude कर दो
//           }
//           obj.displayTitle = obj.title_hi;
//           obj.displayContent = obj.content_hi;
//           obj.displaySummary = obj.summary_hi;
//         } else {
//           if (!obj.title_en && !obj.content_en && !obj.summary_en) {
//             return null; // English data खाली है → exclude कर दो
//           }
//           obj.displayTitle = obj.title_en;
//           obj.displayContent = obj.content_en;
//           obj.displaySummary = obj.summary_en;
//         }

//         return obj;
//       })
//       .filter(item => item !== null); // null objects हटा दो

//     res.status(200).json({
//       success: true,
//       count: filteredData.length,
//       message: "News fetched successfully",
//       data: filteredData,
//     });
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };

// export const getAllNews = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // Remove select/sort/lang
//     const removeFields = ["select", "sort", "lang"];
//     removeFields.forEach(param => delete reqQuery[param]);

//     // Mongo operators
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Only posted/live for non-admin users
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     query = News.find(finalQueryFilter);

//     // ✅ language wise fields
//  const lang = req.query.lang || "hi";
    

//     let selectFieldsCommon =
//       "slug_en category subCategory subSubCategory country state city media createdBy updatedBy publishedAt status";

//     let selectFieldsLang =
//       lang === "hi"
//         ? "title_hi content_hi summary_hi"
//         : "title_en content_en summary_en";

//     query = query.select(`${selectFieldsLang} ${selectFieldsCommon}`);

//     // sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // populate
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     const news = await query;

//     // ✅ हमेशा output keys: title_hi, content_hi, summary_hi
//     const filteredData = news
//       .map(item => {
//         const obj = item.toObject();

//         if (lang === "hi") {
//           if (!obj.title_hi && !obj.content_hi && !obj.summary_hi) {
//             return null;
//           }
//           // keys वही रहेंगे
//           obj.title_hi = obj.title_hi;
//           obj.content_hi = obj.content_hi;
//           obj.summary_hi = obj.summary_hi;
//         } else {
//           if (!obj.title_en && !obj.content_en && !obj.summary_en) {
//             return null;
//           }
//           // English values को Hindi keys में map कर दो
//           obj.title_hi = obj.title_en;
//           obj.content_hi = obj.content_en;
//           obj.summary_hi = obj.summary_en;

//           // original English fields हटा दो ताकि frontend confuse ना हो
//           delete obj.title_en;
//           delete obj.content_en;
//           delete obj.summary_en;
//         }

//         return obj;
//       })
//       .filter(item => item !== null);

//     res.status(200).json({
//       success: true,
//       count: filteredData.length,
//       message: "News fetched successfully",
//       data: filteredData,
//     });
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };

export const getAllNews = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };

    const removeFields = ["select", "sort", "lang"];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    let finalQueryFilter = JSON.parse(queryStr);

    if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
      finalQueryFilter.status = { $in: ["posted", "live"] };
    }

    // ✅ Sirf valid category waali news (null category skip)
    finalQueryFilter.category = { $exists: true, $ne: null };

    const lang = req.query.lang || "hi";

    const projectFields =
      lang === "hi"
        ? { title_hi: 1, summary_hi: 1 }
        : { title_en: 1, summary_en: 1 };

    const sortBy = req.query.sort
      ? Object.fromEntries(req.query.sort.split(",").map(f =>
          f.startsWith("-") ? [f.slice(1), -1] : [f, 1]
        ))
      : { createdAt: -1 };

    // ─── Single aggregation query — top 10 per category ──────────────────────
    const news = await News.aggregate([
      { $match: finalQueryFilter },
      { $sort: sortBy },
      {
        $group: {
          _id: "$category",
          docs: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          docs: { $slice: ["$docs", 10] },
        },
      },
      { $unwind: "$docs" },
      { $replaceRoot: { newRoot: "$docs" } },

      // ─── Populate equivalents via $lookup ───────────────────────────────
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
          pipeline: [{ $project: { name: 1, iso2: 1 } }],
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategory",
          pipeline: [{ $project: { name: 1, iso2: 1 } }],
        },
      },
      { $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
          pipeline: [{ $project: { name: 1, iso2: 1 } }],
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "state",
          pipeline: [{ $project: { name: 1, iso2: 1 } }],
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
          pipeline: [{ $project: { name: 1 } }],
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
          pipeline: [{ $project: { name: 1, email: 1, role: 1, profileImage: 1 } }],
        },
      },
      { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "users",
          localField: "updatedBy",
          foreignField: "_id",
          as: "updatedBy",
          pipeline: [{ $project: { name: 1, email: 1 } }],
        },
      },
      { $unwind: { path: "$updatedBy", preserveNullAndEmptyArrays: true } },

      // ─── Final field selection ────────────────────────────────────────────
      {
        $project: {
          ...projectFields,
          slug_en: 1,
          category: 1,
          subCategory: 1,
          subSubCategory: 1,
          country: 1,
          state: 1,
          city: 1,
          media: 1,
          createdBy: 1,
          updatedBy: 1,
          publishedAt: 1,
          status: 1,
        },
      },
    ]);

    // ✅ हमेशा output keys: title_hi, summary_hi
    const filteredData = news
      .map(obj => {
        if (lang === "hi") {
          if (!obj.title_hi && !obj.summary_hi) return null;
        } else {
          if (!obj.title_en && !obj.summary_en) return null;
          obj.title_hi = obj.title_en;
          obj.summary_hi = obj.summary_en;
          delete obj.title_en;
          delete obj.summary_en;
        }
        return obj;
      })
      .filter(item => item !== null);

    res.status(200).json({
      success: true,
      count: filteredData.length,
      message: "News fetched successfully",
      data: filteredData,
    });
  } catch (error) {
    console.error("Error getting all news:", error);
    next(error);
  }
};







export const getNewsByCategoryweb = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const reqQuery = { ...req.query };

    const removeFields = ["select", "sort", "lang", "page", "limit"];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    let finalQueryFilter = JSON.parse(queryStr);

    // ✅ category id se filter
    finalQueryFilter.category = categoryId;

    if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
      finalQueryFilter.status = { $in: ["posted", "live"] };
    }

    const lang = req.query.lang || "hi";

    let selectFieldsCommon =
      "slug_en category subCategory subSubCategory country state city media createdBy updatedBy publishedAt status";

    let selectFieldsLang =
      lang === "hi"
        ? "title_hi summary_hi"
        : "title_en summary_en";

    const sortBy = req.query.sort
      ? req.query.sort.split(",").join(" ")
      : "-createdAt";

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const populateOptions = [
      { path: "createdBy", select: "name email role profileImage" },
      { path: "updatedBy", select: "name email" },
      { path: "category", select: "name iso2" },
      { path: "subCategory", select: "name iso2" },
      { path: "country", select: "name iso2" },
      { path: "state", select: "name iso2" },
      { path: "city", select: "name" },
    ];

    const news = await News.find(finalQueryFilter)
      .select(`${selectFieldsLang} ${selectFieldsCommon}`)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate(populateOptions);

    // ✅ हमेशा output keys: title_hi, summary_hi
    const filteredData = news
      .map(item => {
        const obj = item.toObject();

        if (lang === "hi") {
          if (!obj.title_hi && !obj.summary_hi) {
            return null;
          }
          obj.title_hi = obj.title_hi;
          obj.summary_hi = obj.summary_hi;
        } else {
          if (!obj.title_en && !obj.summary_en) {
            return null;
          }
          obj.title_hi = obj.title_en;
          obj.summary_hi = obj.summary_en;

          delete obj.title_en;
          delete obj.summary_en;
        }

        return obj;
      })
      .filter(item => item !== null);

    res.status(200).json({
      success: true,
      count: filteredData.length,
      message: "News fetched successfully",
      data: filteredData,
    });
  } catch (error) {
    console.error("Error getting news by category:", error);
    next(error);
  }
};








import NodeCache from "node-cache";

// ✅ Server-side cache — 2 minute TTL
// npm install node-cache
const newsCache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

// export const getAllNews = async (req, res, next) => {
//   try {
//     const lang = req.query.lang || "hi";
//     const isAdmin =
//       req.user &&
//       (req.user.role === "admin" || req.user.role === "superadmin");

//     // ─── Cache check (only for public/non-admin requests) ───────────────────
//     const cacheKey = `allNews_${lang}`;
//     if (!isAdmin) {
//       const cached = newsCache.get(cacheKey);
//       if (cached) {
//         return res.status(200).json(cached);
//       }
//     }

//     // ─── Base filter ─────────────────────────────────────────────────────────
//     const baseFilter = isAdmin ? {} : { status: { $in: ["posted", "live"] } };

//     // ─── Language-specific fields ─────────────────────────────────────────────
//     const langFields =
//       lang === "hi"
//         ? "title_hi summary_hi"        // content_hi hata diya — heavy field, homepage pe kaam nahi
//         : "title_en summary_en";

//     const commonFields =
//       "slug_en category subCategory media createdBy publishedAt status";

//     // ─── Step 1: Distinct category IDs (fast, indexed) ───────────────────────
//     // Sirf un categories ki IDs lo jinmein news hai
//     const categoryIds = await News.distinct("category", baseFilter);

//     // ─── Step 2: Har category ke liye 10 news — parallel fetch ───────────────
//     const perCategoryLimit = 10;

//     const categoryPromises = categoryIds.map((catId) =>
//       News.find({ ...baseFilter, category: catId })
//         .select(`${langFields} ${commonFields}`)
//         .sort({ publishedAt: -1 })          // latest pehle
//         .limit(perCategoryLimit)
//         .populate({ path: "createdBy", select: "name profileImage" })
//         .populate({ path: "category", select: "name" })
//         .lean()                              // ✅ toObject() skip — 30-40% faster
//     );

//     const results = await Promise.all(categoryPromises);

//     // ─── Step 3: Normalize language keys ─────────────────────────────────────
//     // Frontend hamesha title_hi, summary_hi expect karta hai
//     const normalizeItem = (item) => {
//       if (lang === "en") {
//         item.title_hi = item.title_en || "";
//         item.summary_hi = item.summary_en || "";
//         delete item.title_en;
//         delete item.summary_en;
//       }
//       return item;
//     };

//     // ─── Step 4: Grouped response banana ─────────────────────────────────────
//     // { flash: [...], business: [...], sports: [...] }
//     const grouped = {};
//     const flat = [];

//     results.forEach((categoryNews) => {
//       if (!categoryNews.length) return;

//       const normalized = categoryNews.map(normalizeItem);

//       // Category name lowercase mein key banao
//       const catName =
//         normalized[0]?.category?.name?.toLowerCase()?.trim() || "uncategorized";

//       grouped[catName] = normalized;
//       flat.push(...normalized);
//     });

//     const response = {
//       success: true,
//       count: flat.length,
//       message: "News fetched successfully",
//       data: flat,          // ✅ purana frontend (jo .data use karta hai) kaam karta rahe
//       grouped,             // ✅ naya frontend direct grouped use kar sakta hai
//     };

//     // ─── Cache store (only public) ────────────────────────────────────────────
//     if (!isAdmin) {
//       newsCache.set(cacheKey, response);
//     }

//     return res.status(200).json(response);
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };

// ─── Cache manually invalidate karo jab news publish/update ho ───────────────
// Apne news create/update/delete controller mein yeh line add karo:
// newsCache.del("allNews_hi");
// newsCache.del("allNews_en");
export const clearNewsCache = () => {
  newsCache.del("allNews_hi");
  newsCache.del("allNews_en");
};



export const getAllNewsAdmin = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // Remove fields not meant for filtering
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Convert Mongo operators (gt, gte, lt, lte, in)
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    let finalQueryFilter = JSON.parse(queryStr);

    // Role-based access: non-admins see only posted/live
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
      finalQueryFilter.status = { $in: ["posted", "live"] };
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    query = News.find(finalQueryFilter);

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Populate relations
    query = query.populate([
      { path: "createdBy", select: "name email role profileImage city state" },
      { path: "updatedBy", select: "name email" },
      { path: "category", select: "name iso2" },
      { path: "subCategory", select: "name iso2" },
      { path: "country", select: "name iso2" },
      { path: "state", select: "name iso2" },
      { path: "city", select: "name" },
      { path: "comments.user", select: "name profileImage" },
      { path: "likes.user", select: "name profileImage" },
    ]);

    // Apply pagination
    const totalNewsCount = await News.countDocuments(finalQueryFilter);
    const totalPages = Math.ceil(totalNewsCount / limit);
    const news = await query.skip(skip).limit(limit);

    // Map news objects for frontend
    const mappedNews = news.map((item) => {
      const newsObj = item.toObject({ virtuals: true });

      // Map reporterDetails
      newsObj.reporterDetails = item.createdBy;

      // Map category/subCategory
      newsObj.category = item.category?.name || "N/A";
      newsObj.subCategory = item.subCategory?.name || "N/A";

      // Timestamps
      newsObj.postedDate = item.publishedAt ? item.publishedAt.toISOString().split("T")[0] : null;
      newsObj.postedTime = item.publishedAt ? item.publishedAt.toISOString().split("T")[1].substring(0, 8) : null;
      newsObj.createdAtDate = item.createdAt.toISOString().split("T")[0];
      newsObj.createdAtTime = item.createdAt.toISOString().split("T")[1].substring(0, 8);
      newsObj.updatedAtDate = item.updatedAt.toISOString().split("T")[0];
      newsObj.updatedAtTime = item.updatedAt.toISOString().split("T")[1].substring(0, 8);

      // Share link
      newsObj.shareLink = item.shareLink;

      // Likes
      const currentUserId = req.user?._id?.toString();
      newsObj.isLiked = false;
      if (currentUserId && Array.isArray(newsObj.likes)) {
        newsObj.isLiked = newsObj.likes.some((like) => {
          const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
          return likeUserId === currentUserId;
        });
      }

      return newsObj;
    });

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      count: mappedNews.length,
      totalPages,
      page,
      message: MESSAGES.NEWS_FETCHED_SUCCESS,
      data: mappedNews,
    });
  } catch (error) {
    console.error("Error getting all news:", error);
    next(error);
  }
};

// export const getNewsById = async (req, res, next) => {
//     try {
//         const news = await News.findById(req.params.id)
//             .populate([
//                 {
//                     path: 'createdBy',
//                     select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
//                 },
//                 { path: 'updatedBy', select: 'name email' },
//                 { path: 'country', select: 'name iso2' },
//                 { path: 'state', select: 'name iso2' },
//                 { path: 'city', select: 'name' },
//                 // Populate user details for likes and comments
//                 { path: 'likes.user', select: 'name profileImage' },
//                 { path: 'comments.user', select: 'name profileImage' }
//             ]);

//         if (!news) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//         }

//         // If not an admin/superadmin, ensure the news is 'posted' or 'live'
//         if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
//             if (!['posted', 'live'].includes(news.status)) {
//                 throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND + ": This news is not publicly available.");
//             }
//         }


//         // Increment views count (optional, can be moved to a separate microservice/job for high traffic)
//         news.viewsCount = (news.viewsCount || 0) + 1;
//         await news.save();

//         const newsObj = news.toObject({ virtuals: true }); // Include virtuals

//         // Get reporter's location names for display (from createdBy user details)
//         const reporterDetails = news.createdBy; // This is now populated
//         if (reporterDetails) {
//             // Need to ensure the populated country/state/city IDs are valid ObjectIds before querying.
//             // If they are already populated by Mongoose, they'd be objects.
//             const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
//             const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
//             const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;


//             newsObj.reporterDetails = {
//                 id: reporterDetails._id,
//                 name: reporterDetails.name,
//                 email: reporterDetails.email,
//                 role: reporterDetails.role,
//                 profileImage: reporterDetails.profileImage,
//                 country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
//                 state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
//                 city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
//                 address: reporterDetails.address,
//                 dateOfBirth: reporterDetails.dateOfBirth,
//                 canDirectPost: reporterDetails.canDirectPost,
//                 canDirectGoLive: reporterDetails.canDirectGoLive,
//             };
//         } else {
//             newsObj.reporterDetails = null; // Or handle as needed
//         }


//         // Add formatted date/time fields
//         newsObj.postedDate = news.publishedAt ? news.publishedAt.toISOString().split('T')[0] : null;
//         newsObj.postedTime = news.publishedAt ? news.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         newsObj.createdAtDate = news.createdAt.toISOString().split('T')[0];
//         newsObj.createdAtTime = news.createdAt.toISOString().split('T')[1].substring(0, 8);
//         newsObj.updatedAtDate = news.updatedAt.toISOString().split('T')[0];
//         newsObj.updatedAtTime = news.updatedAt.toISOString().split('T')[1].substring(0, 8);


//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             message: MESSAGES.NEWS_FETCHED_SUCCESS, // Using MESSAGES.NEWS_FETCHED_SUCCESS
//             data: newsObj,
//         });

//     } catch (error) {
//         console.error("Error getting news by ID:", error);
//         next(error);
//     }
// };

// export const getNewsById = async (req, res, next) => {
//   try {
//     let news = await News.findById(req.params.id).populate([
//       {
//         path: 'createdBy',
//         select:
//           'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive',
//       },
//       { path: 'updatedBy', select: 'name email' },
//       { path: 'country', select: 'name iso2' },
//       { path: 'state', select: 'name iso2' },
//       { path: 'city', select: 'name' },
//       { path: 'likes.user', select: 'name profileImage' },
//       { path: 'comments.user', select: 'name profileImage' },
//       {
//         path: 'poll',
//         select: 'question options totalVotes status createdAt updatedAt',
//       },
//     ]);

//     if (!news) {
//       throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//     }

//     // ✅ Non-admin access control
//     if (
//       !req.user ||
//       (req.user.role !== 'admin' && req.user.role !== 'superadmin')
//     ) {
//       if (!['posted', 'live'].includes(news.status)) {
//         throw new ApiError(
//           STATUS_CODES.NOT_FOUND,
//           `${MESSAGES.NEWS_NOT_FOUND}: This news is not publicly available.`
//         );
//       }
//     }

//     // ✅ Atomic increment for viewsCount
//     await News.findByIdAndUpdate(news._id, {
//       $inc: { viewsCount: 1 },
//     });

//     // Fresh copy with incremented views
//     news = await News.findById(news._id).populate([
//       {
//         path: 'createdBy',
//         select:
//           'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive',
//       },
//       { path: 'updatedBy', select: 'name email' },
//       { path: 'country', select: 'name iso2' },
//       { path: 'state', select: 'name iso2' },
//       { path: 'city', select: 'name' },
//       { path: 'likes.user', select: 'name profileImage' },
//       { path: 'comments.user', select: 'name profileImage' },
//       {
//         path: 'poll',
//         select: 'question options totalVotes status createdAt updatedAt',
//       },
//     ]);

//     const newsObj = news.toObject({ virtuals: true });

//     // ✅ Poll percentage calculation
//     if (
//       newsObj.poll &&
//       Array.isArray(newsObj.poll.options) &&
//       newsObj.poll.totalVotes > 0
//     ) {
//       newsObj.poll.options = newsObj.poll.options.map((opt) => {
//         const optionObj = opt.toObject ? opt.toObject() : opt;
//         const percentage =
//           optionObj.votes && newsObj.poll.totalVotes > 0
//             ? ((optionObj.votes / newsObj.poll.totalVotes) * 100).toFixed(2) + '%'
//             : '0%';

//         return {
//           ...optionObj,
//           percentage,
//         };
//       });
//     }

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       message: MESSAGES.NEWS_FETCHED_SUCCESS,
//       data: newsObj,
//     });
//   } catch (error) {
//     console.error('Error getting news by ID:', error);
//     next(error);
//   }
// };


// export const updateNews = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user?._id;
//         const userRole = req.user?.role;
//         const {
//             title,
//             content,
//             summary,
//             category,
//             subCategory,
//             tags,
//             country,
//             state,
//             city,
//             localAddress,
//             status
//         } = req.body;

//         let news = await News.findById(id);

//         if (!news) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//         }

//         // Authorization: Only creator, admin, or superadmin can update
//         if (news.createdBy.toString() !== userId.toString() && !['admin', 'superadmin'].includes(userRole)) {
//             throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You are not authorized to update this news.");
//         }

//         // --- Handle Media Updates ---
//         let existingMediaUrls = news.media.map(m => m.url);
//         let updatedMedia = [];
//         let filesToDeleteFromCloud = [];

//         // If new files are uploaded, process them
//         if (req.files && req.files.length > 0) {
//         for (const file of req.files) {
//     const url = await uploadFileToSpaces(file, 'news-media');
//     updatedMedia.push({
//         url,
//         type: file.mimetype.startsWith('video') ? 'video' : 'image',
//         caption: file.originalname || ''
//     });
// }

//         }

//         // Handle `media` field from body: It should tell which existing media to keep.
//         // If `req.body.existingMedia` is provided, assume it's an array of URLs to keep.
//         // Any media in `news.media` but NOT in `req.body.existingMedia` (if provided) should be deleted.
//         if (req.body.existingMedia) { // Expect `existingMedia` to be a JSON string of URLs or an array of URLs
//             let mediaToKeep = [];
//             try {
//                 mediaToKeep = typeof req.body.existingMedia === 'string' ? JSON.parse(req.body.existingMedia) : req.body.existingMedia;
//             } catch (e) {
//                 console.error("Error parsing existingMedia:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for existingMedia.");
//             }

//             // Filter out media to delete
//             for (const oldMedia of news.media) {
//                 if (!mediaToKeep.includes(oldMedia.url)) {
//                     filesToDeleteFromCloud.push(oldMedia.url);
//                 }
//             }
//             // Add kept media to updatedMedia list
//             updatedMedia = [...updatedMedia, ...news.media.filter(m => mediaToKeep.includes(m.url))];

//         } else if (req.files && req.files.length > 0) {
//             // If new files are uploaded but no `existingMedia` specified, assume all old media are replaced
//             filesToDeleteFromCloud.push(...existingMediaUrls);
//         }
//         // If no new files and no `existingMedia` specified, `updatedMedia` remains based on prior state or empty.
//         // If `req.body.media` explicitly passed as an empty array or null, it means clear all media.
//         if (req.body.media === null || (Array.isArray(req.body.media) && req.body.media.length === 0 && !req.files?.length)) {
//              filesToDeleteFromCloud.push(...existingMediaUrls);
//              updatedMedia = [];
//         }


//         // --- Handle Location Updates ---
//         let countryId = news.country;
//         if (country !== undefined) {
//             if (country === null || country === '') {
//                 countryId = null;
//             } else {
//                 const countryDoc = await Country.findOne({ name: country });
//                 if (!countryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.COUNTRY_NOT_FOUND + ": Provided country name is invalid.");
//                 countryId = countryDoc._id;
//             }
//         }

//         let stateId = news.state;
//         if (state !== undefined) {
//             if (state === null || state === '') {
//                 stateId = null;
//             } else {
//                 const stateDoc = await State.findOne({ name: state });
//                 if (!stateDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.STATE_NOT_FOUND + ": Provided state name is invalid.");
//                 stateId = stateDoc._id;
//                 if (countryId && convertIdToString(stateDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": State does not belong to the selected country.");
//                 }
//             }
//         }

//         let cityId = news.city;
//         if (city !== undefined) {
//             if (city === null || city === '') {
//                 cityId = null;
//             } else {
//                 const cityDoc = await City.findOne({ name: city });
//                 if (!cityDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CITY_NOT_FOUND + ": Provided city name is invalid.");
//                 cityId = cityDoc._id;
//                 if (stateId && convertIdToString(cityDoc.state) !== convertIdToString(stateId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected state.");
//                 }
//                 if (countryId && convertIdToString(cityDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected country.");
//                 }
//             }
//         }

//         // --- Handle Category/SubCategory Updates ---
//         let finalCategory = news.category;
//         if (category !== undefined) {
//             if (category === null || category === '') {
//                 finalCategory = null;
//                 finalSubCategory = null; // If category is cleared, subcategory must also be cleared
//             } else {
//                 const categoryDoc = await Category.findOne({ name: category });
//                 if (!categoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category name is invalid.");
//                 finalCategory = category;
//             }
//         }

//         let finalSubCategory = news.subCategory;
//         if (subCategory !== undefined) {
//             if (subCategory === null || subCategory === '') {
//                 finalSubCategory = null;
//             } else {
//                 const currentCategoryDoc = await Category.findOne({ name: finalCategory }); // Use the (potentially updated) category
//                 if (!currentCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Category not found for subCategory validation.");
//                 const subCategoryDoc = await SubCategory.findOne({ name: subCategory, category: currentCategoryDoc._id });
//                 if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory name is invalid or does not belong to the selected category.");
//                 finalSubCategory = subCategory;
//             }
//         } else if (category !== undefined && (category === null || category === '')) {
//              // If category was explicitly cleared, clear subCategory too
//             finalSubCategory = null;
//         }


//         // --- Status Update Logic (More flexible for updates) ---
//         let updatedStatus = news.status;
//         if (status !== undefined) {
//             if (!['draft', 'pending_approval', 'posted', 'live', 'rejected'].includes(status)) {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid status provided.");
//             }

//             const currentUser = req.user; // User object from authentication middleware

//             // SuperAdmin or Admin with manageNews permission can set any valid status
//             if (currentUser.role === 'superadmin' || (currentUser.role === 'admin' && currentUser.adminPermissions.manageNews)) {
//                 updatedStatus = status;
//             }
//             // Reporter can only set specific statuses based on their permissions
//             else if (currentUser.role === 'reporter') {
//                 if (status === 'live' && currentUser.canDirectGoLive) {
//                     updatedStatus = status;
//                 } else if (['posted'].includes(status) && currentUser.canDirectPost) {
//                     updatedStatus = status;
//                 } else if (['draft', 'pending_approval'].includes(status)) {
//                     updatedStatus = status; // Reporters can always set their own news to draft/pending
//                 } else {
//                     throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to set this status.");
//                 }
//             } else { // 'user' role should not be able to update news status
//                 throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to update news status.");
//             }
//         }


//         // Prepare fields to update
//         const updateFields = {
//             title: title !== undefined ? title : news.title,
//             content: content !== undefined ? content : news.content,
//             summary: summary !== undefined ? summary : news.summary,
//             category: finalCategory,
//             subCategory: finalSubCategory,
//             tags: tags !== undefined ? tags : news.tags,
//             media: updatedMedia, // Set the updated media array
//             country: countryId,
//             state: stateId,
//             city: cityId,
//             localAddress: localAddress !== undefined ? localAddress : news.localAddress,
//             status: updatedStatus,
//             updatedBy: userId, // Set the user who updated
//         };

//         // If status changes to posted/live and was not already, update publishedAt
//         if ((updateFields.status === 'posted' || updateFields.status === 'live') && !news.publishedAt && updateFields.status !== news.status) {
//             updateFields.publishedAt = new Date();
//         } else if (updateFields.status !== 'posted' && updateFields.status !== 'live' && news.publishedAt && updateFields.status !== news.status) {
//             // If news goes out of posted/live status, clear publishedAt (optional, depends on logic)
//             // updateFields.publishedAt = null;
//         }


//         news = await News.findByIdAndUpdate(id, updateFields, {
//             new: true, // Return the updated document
//             runValidators: true // Run schema validators
//         });

//         // Delete old files from cloud after successful DB update
//         for (const url of filesToDeleteFromCloud) {
//             await deleteFileFromSpaces(url).catch(err => console.warn("Failed to delete old media file:", err.message));
//         }


//         // Populate and Format Response
//         const populatedNews = await News.findById(news._id)
//             .populate([
//                 {
//                     path: 'createdBy',
//                     select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
//                 },
//                 { path: 'updatedBy', select: 'name email' },
//                 { path: 'country', select: 'name iso2' },
//                 { path: 'state', select: 'name iso2' },
//                 { path: 'city', select: 'name' },
//                 { path: 'likes.user', select: 'name profileImage' },
//                 { path: 'comments.user', select: 'name profileImage' }
//             ]);

//         const finalNewsData = populatedNews.toObject({ virtuals: true });

//         const reporterDetails = populatedNews.createdBy;
//         if (reporterDetails) {
//              const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
//              const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
//              const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;

//             finalNewsData.reporterDetails = {
//                 id: reporterDetails._id,
//                 name: reporterDetails.name,
//                 email: reporterDetails.email,
//                 role: reporterDetails.role,
//                 profileImage: reporterDetails.profileImage,
//                 country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
//                 state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
//                 city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
//                 address: reporterDetails.address,
//                 dateOfBirth: reporterDetails.dateOfBirth,
//                 canDirectPost: reporterDetails.canDirectPost,
//                 canDirectGoLive: reporterDetails.canDirectGoLive,
//             };
//         } else {
//             finalNewsData.reporterDetails = null;
//         }

//         finalNewsData.postedDate = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[0] : null;
//         finalNewsData.postedTime = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         finalNewsData.createdAtDate = populatedNews.createdAt.toISOString().split('T')[0];
//         finalNewsData.createdAtTime = populatedNews.createdAt.toISOString().split('T')[1].substring(0, 8);
//         finalNewsData.updatedAtDate = populatedNews.updatedAt.toISOString().split('T')[0];
//         finalNewsData.updatedAtTime = populatedNews.updatedAt.toISOString().split('T')[1].substring(0, 8);


//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             message: MESSAGES.NEWS_UPDATED, // Using MESSAGES.NEWS_UPDATED
//             data: finalNewsData,
//         });

//     } catch (error) {
//         console.error("Error updating news:", error);
//         next(error);
//     }
// };

// export const getNewsById = async (req, res, next) => {
//   try {
//     let news = await News.findById(req.params.id).populate([
//       {
//         path: 'createdBy',
//         select:
//           'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive',
//       },
//       { path: 'updatedBy', select: 'name email' },
//       { path: 'country', select: 'name iso2' },
//       { path: 'state', select: 'name iso2' },
//       { path: 'city', select: 'name' },
//       { path: 'likes.user', select: 'name profileImage' },
//       { path: 'comments.user', select: 'name profileImage' },
//       {
//         path: 'poll',
//         select: 'question options totalVotes status createdAt updatedAt',
//       },
//     ]);

//     if (!news) {
//       throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//     }

//     // ✅ Non-admin access control
//     if (
//       !req.user ||
//       (req.user.role !== 'admin' && req.user.role !== 'superadmin')
//     ) {
//       if (!['posted', 'live'].includes(news.status)) {
//         throw new ApiError(
//           STATUS_CODES.NOT_FOUND,
//           `${MESSAGES.NEWS_NOT_FOUND}: This news is not publicly available.`
//         );
//       }
//     }

//     // ✅ Atomic increment for viewsCount
//     await News.findByIdAndUpdate(news._id, {
//       $inc: { viewsCount: 1 },
//     });

//     // Fresh copy with incremented views
//     news = await News.findById(news._id).populate([
//       {
//         path: 'createdBy',
//         select:
//           'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive',
//       },
//       { path: 'updatedBy', select: 'name email' },
//       { path: 'country', select: 'name iso2' },
//       { path: 'state', select: 'name iso2' },
//       { path: 'city', select: 'name' },
//       { path: 'likes.user', select: 'name profileImage' },
//       { path: 'comments.user', select: 'name profileImage' },
//       {
//         path: 'poll',
//         select: 'question options totalVotes status createdAt updatedAt',
//       },
//     ]);

//     let newsObj = news.toObject({ virtuals: true });

//     // ✅ Poll percentage calculation
//     if (
//       newsObj.poll &&
//       Array.isArray(newsObj.poll.options) &&
//       newsObj.poll.totalVotes > 0
//     ) {
//       newsObj.poll.options = newsObj.poll.options.map((opt) => {
//         const optionObj = opt.toObject ? opt.toObject() : opt;
//         const percentage =
//           optionObj.votes && newsObj.poll.totalVotes > 0
//             ? ((optionObj.votes / newsObj.poll.totalVotes) * 100).toFixed(2) + '%'
//             : '0%';

//         return {
//           ...optionObj,
//           percentage,
//         };
//       });
//     }

//     // ✅ Like status for current user
//     const currentUserId = req.user?._id?.toString();
//     newsObj.isLiked = false;
//     if (currentUserId && Array.isArray(newsObj.likes)) {
//       newsObj.isLiked = newsObj.likes.some((like) => {
//         const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
//         return likeUserId === currentUserId;
//       });
//     }

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       message: MESSAGES.NEWS_FETCHED_SUCCESS,
//       data: newsObj,
//     });
//   } catch (error) {
//     console.error('Error getting news by ID:', error);
//     next(error);
//   }
// };


export const getNewsById = async (req, res, next) => {
  try {
    const lang = req.query.lang || "en";

    let news = await News.findById(req.params.id).populate([
      {
        path: 'createdBy',
        select:
          'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive',
      },
      { path: 'updatedBy', select: 'name email' },
      { path: 'country', select: 'name iso2' },
      { path: 'state', select: 'name iso2' },
      { path: 'city', select: 'name' },
      { path: 'likes.user', select: 'name profileImage' },
      { path: 'comments.user', select: 'name profileImage' },
      {
        path: 'poll',
        select: 'question options totalVotes status createdAt updatedAt',
      },
    ]);

    if (!news) {
      throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
    }

    // ✅ Non-admin access control
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
      if (!['posted', 'live'].includes(news.status)) {
        throw new ApiError(
          STATUS_CODES.NOT_FOUND,
          `${MESSAGES.NEWS_NOT_FOUND}: This news is not publicly available.`
        );
      }
    }

    // ✅ Atomic increment for viewsCount
    await News.findByIdAndUpdate(news._id, { $inc: { viewsCount: 1 } });

    // Fresh copy with incremented views
    news = await News.findById(news._id).populate([
      {
        path: 'createdBy',
        select:
          'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive',
      },
      { path: 'updatedBy', select: 'name email' },
      { path: 'country', select: 'name iso2' },
      { path: 'state', select: 'name iso2' },
      { path: 'city', select: 'name' },
      { path: 'likes.user', select: 'name profileImage' },
      { path: 'comments.user', select: 'name profileImage' },
      {
        path: 'poll',
        select: 'question options totalVotes status createdAt updatedAt',
      },
    ]);

    let newsObj = news.toObject({ virtuals: true });

    // ✅ normalize language fields
    if (lang === "hi") {
      newsObj.title_hi = newsObj.title_hi;
      newsObj.content_hi = newsObj.content_hi;
      newsObj.summary_hi = newsObj.summary_hi;
    } else {
      newsObj.title_hi = newsObj.title_en;
      newsObj.content_hi = newsObj.content_en;
      newsObj.summary_hi = newsObj.summary_en;
    }

    // original english fields remove कर दो
    delete newsObj.title_en;
    delete newsObj.content_en;
    delete newsObj.summary_en;

    // ✅ Poll percentage calculation
    if (newsObj.poll && Array.isArray(newsObj.poll.options) && newsObj.poll.totalVotes > 0) {
      newsObj.poll.options = newsObj.poll.options.map((opt) => {
        const optionObj = opt.toObject ? opt.toObject() : opt;
        const percentage =
          optionObj.votes && newsObj.poll.totalVotes > 0
            ? ((optionObj.votes / newsObj.poll.totalVotes) * 100).toFixed(2) + '%'
            : '0%';
        return { ...optionObj, percentage };
      });
    }

    // ✅ Like status for current user
    const currentUserId = req.user?._id?.toString();
    newsObj.isLiked = false;
    if (currentUserId && Array.isArray(newsObj.likes)) {
      newsObj.isLiked = newsObj.likes.some((like) => {
        const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
        return likeUserId === currentUserId;
      });
    }

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: MESSAGES.NEWS_FETCHED_SUCCESS,
      data: newsObj,
    });
  } catch (error) {
    console.error('Error getting news by ID:', error);
    next(error);
  }
};

  

// export const updateNews = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user?._id;
//         const userRole = req.user?.role;
//         const {
//             title,
//             content,
//             summary,
//             category,
//             subCategory,
//             tags,
//             country,
//             state,
//             city,
//             localAddress,
//             status
//         } = req.body;

//         let news = await News.findById(id);

//         if (!news) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//         }

//         // Authorization: Only creator, admin, or superadmin can update
//         if (news.createdBy.toString() !== userId.toString() && !['admin', 'superadmin'].includes(userRole)) {
//             throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You are not authorized to update this news.");
//         }

//         // --- Handle Media Updates ---
//         let existingMediaUrls = news.media.map(m => m.url);
//         let updatedMedia = []; // Initialize updatedMedia here!
//         let filesToDeleteFromCloud = [];

//         // 1. Process new files (if any)
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 const url = await uploadFileToSpaces(file, 'news-media');
//                 updatedMedia.push({
//                     url,
//                     type: file.mimetype.startsWith('video') ? 'video' : 'image',
//                     caption: file.originalname || ''
//                 });
//             }
//         }

//         // 2. Determine which existing media to keep or delete
//         if (req.body.existingMedia) { // Expect `existingMedia` to be a JSON string of URLs or an array of URLs
//             let mediaToKeep = [];
//             try {
//                 mediaToKeep = typeof req.body.existingMedia === 'string' ? JSON.parse(req.body.existingMedia) : req.body.existingMedia;
//             } catch (e) {
//                 console.error("Error parsing existingMedia:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for existingMedia.");
//             }

//             // Filter out media to delete from old news.media
//             for (const oldMedia of news.media) {
//                 if (!mediaToKeep.includes(oldMedia.url)) {
//                     filesToDeleteFromCloud.push(oldMedia.url);
//                 }
//             }
//             // Add kept existing media to updatedMedia list
//             updatedMedia = [...updatedMedia, ...news.media.filter(m => mediaToKeep.includes(m.url))];

//         } else if (req.files && req.files.length > 0 && !req.body.existingMedia) {
//             // If new files are uploaded AND no `existingMedia` specified, assume all old media are replaced
//             // This case handles a complete replacement if existingMedia wasn't explicitly sent.
//             filesToDeleteFromCloud.push(...existingMediaUrls);
//             // In this scenario, updatedMedia already contains the new files from step 1.
//             // If the intent was to keep some old media, existingMedia should have been sent.
//         }
//         // 3. Handle explicit clear all media: if `req.body.media` is explicitly empty/null
//         // This condition is distinct from `existingMedia` which defines what to keep from *previous* media.
//         // `req.body.media` being null or empty array indicates a full clear, even if existingMedia was somehow malformed.
//         if (req.body.media === null || (Array.isArray(req.body.media) && req.body.media.length === 0 && (!req.files || req.files.length === 0))) {
//              filesToDeleteFromCloud.push(...existingMediaUrls);
//              updatedMedia = []; // Clear all media if explicitly requested and no new files
//         }


//         // --- Handle Location Updates ---
//         let countryId = news.country;
//         if (country !== undefined) {
//             if (country === null || country === '') {
//                 countryId = null;
//             } else {
//                 const countryDoc = await Country.findOne({ name: country });
//                 if (!countryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.COUNTRY_NOT_FOUND + ": Provided country name is invalid.");
//                 countryId = countryDoc._id;
//             }
//         }

//         let stateId = news.state;
//         if (state !== undefined) {
//             if (state === null || state === '') {
//                 stateId = null;
//             } else {
//                 const stateDoc = await State.findOne({ name: state });
//                 if (!stateDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.STATE_NOT_FOUND + ": Provided state name is invalid.");
//                 stateId = stateDoc._id;
//                 if (countryId && convertIdToString(stateDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": State does not belong to the selected country.");
//                 }
//             }
//         }

//         let cityId = news.city;
//         if (city !== undefined) {
//             if (city === null || city === '') {
//                 cityId = null;
//             } else {
//                 const cityDoc = await City.findOne({ name: city });
//                 if (!cityDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CITY_NOT_FOUND + ": Provided city name is invalid.");
//                 cityId = cityDoc._id;
//                 if (stateId && convertIdToString(cityDoc.state) !== convertIdToString(stateId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected state.");
//                 }
//                 if (countryId && convertIdToString(cityDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected country.");
//                 }
//             }
//         }

//         // --- Handle Category/SubCategory Updates ---
//         let finalCategory = news.category;
//         let categoryDocFound = null;
//         if (category !== undefined) {
//             if (category === null || category === '') {
//                 finalCategory = null;
//                 finalSubCategory = null;
//             } else {
//                 categoryDocFound = await Category.findOne({ name: category });
//                 if (!categoryDocFound) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category name is invalid.");
//                 finalCategory = categoryDocFound._id;
//             }
//         } else {
//             if (news.category) {
//                 categoryDocFound = await Category.findById(news.category);
//             }
//         }

//         let finalSubCategory = news.subCategory;
//         if (subCategory !== undefined) {
//             if (subCategory === null || subCategory === '') {
//                 finalSubCategory = null;
//             } else {
//                 if (!categoryDocFound) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Category not found for subCategory validation. Please provide a valid category first.");
//                 }
//                 const subCategoryDoc = await SubCategory.findOne({ name: subCategory, category: categoryDocFound._id });
//                 if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory name is invalid or does not belong to the selected category.");
//                 finalSubCategory = subCategoryDoc._id;
//             }
//         } else if (category !== undefined && (category === null || category === '')) {
//             finalSubCategory = null;
//         }

//         // --- Status Update Logic (More flexible for updates) ---
//         let updatedStatus = news.status;
//         if (status !== undefined) {
//             if (!['draft', 'pending_approval', 'posted', 'live', 'rejected'].includes(status)) {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid status provided.");
//             }

//             const currentUser = req.user;

//             if (currentUser.role === 'superadmin' || (currentUser.role === 'admin' && currentUser.adminPermissions.manageNews)) {
//                 updatedStatus = status;
//             }
//             else if (currentUser.role === 'reporter') {
//                 if (status === 'live' && currentUser.canDirectGoLive) {
//                     updatedStatus = status;
//                 } else if (['posted'].includes(status) && currentUser.canDirectPost) {
//                     updatedStatus = status;
//                 } else if (['draft', 'pending_approval'].includes(status)) {
//                     updatedStatus = status;
//                 } else {
//                     throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to set this status.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to update news status.");
//             }
//         }

//         // Prepare fields to update
//         const updateFields = {
//             title: title !== undefined ? title : news.title,
//             content: content !== undefined ? content : news.content,
//             summary: summary !== undefined ? summary : news.summary,
//             category: finalCategory,
//             subCategory: finalSubCategory,
//             tags: tags !== undefined ? tags : news.tags,
//             media: updatedMedia, // This will now always be defined
//             country: countryId,
//             state: stateId,
//             city: cityId,
//             localAddress: localAddress !== undefined ? localAddress : news.localAddress,
//             status: updatedStatus,
//             updatedBy: userId,
//         };

//         // If status changes to posted/live and was not already, update publishedAt
//         if ((updateFields.status === 'posted' || updateFields.status === 'live') && !news.publishedAt && updateFields.status !== news.status) {
//             updateFields.publishedAt = new Date();
//         } else if (updateFields.status !== 'posted' && updateFields.status !== 'live' && news.publishedAt && updateFields.status !== news.status) {
//             // If news goes out of posted/live status, clear publishedAt (optional, depends on logic)
//             // updateFields.publishedAt = null;
//         }


//         news = await News.findByIdAndUpdate(id, updateFields, {
//             new: true,
//             runValidators: true
//         });

//         // Delete old files from cloud after successful DB update
//         for (const url of filesToDeleteFromCloud) {
//             await deleteFileFromSpaces(url).catch(err => console.warn("Failed to delete old media file:", err.message));
//         }

//         // Populate and Format Response
//         const populatedNews = await News.findById(news._id)
//             .populate([
//                 {
//                     path: 'createdBy',
//                     select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
//                 },
//                 { path: 'updatedBy', select: 'name email' },
//                 { path: 'country', select: 'name iso2' },
//                 { path: 'state', select: 'name iso2' },
//                 { path: 'city', select: 'name' },
//                 { path: 'likes.user', select: 'name profileImage' },
//                 { path: 'comments.user', select: 'name profileImage' }
//             ]);

//         const finalNewsData = populatedNews.toObject({ virtuals: true });

//         const reporterDetails = populatedNews.createdBy;
//         if (reporterDetails) {
//              const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
//              const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
//              const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;

//             finalNewsData.reporterDetails = {
//                 id: reporterDetails._id,
//                 name: reporterDetails.name,
//                 email: reporterDetails.email,
//                 role: reporterDetails.role,
//                 profileImage: reporterDetails.profileImage,
//                 country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
//                 state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
//                 city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
//                 address: reporterDetails.address,
//                 dateOfBirth: reporterDetails.dateOfBirth,
//                 canDirectPost: reporterDetails.canDirectPost,
//                 canDirectGoLive: reporterDetails.canDirectGoLive,
//             };
//         } else {
//             finalNewsData.reporterDetails = null;
//         }

//         finalNewsData.postedDate = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[0] : null;
//         finalNewsData.postedTime = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         finalNewsData.createdAtDate = populatedNews.createdAt.toISOString().split('T')[0];
//         finalNewsData.createdAtTime = populatedNews.createdAt.toISOString().split('T')[1].substring(0, 8);
//         finalNewsData.updatedAtDate = populatedNews.updatedAt.toISOString().split('T')[0];
//         finalNewsData.updatedAtTime = populatedNews.updatedAt.toISOString().split('T')[1].substring(0, 8);


//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             message: MESSAGES.NEWS_UPDATED,
//             data: finalNewsData,
//         });

//     } catch (error) {
//         console.error("Error updating news:", error);
//         next(error);
//     }
// };

import mongoose from 'mongoose'; // Add this import for ObjectId validation

// Helper function to validate if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);




export const updateNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id;
        const userRole = req.user?.role;

        const {
            title_en,
            title_hi,
            content_en,
            content_hi,
            summary_en,
            summary_hi,
            category,
            subCategory,
            subSubCategory,
            tags,
            mediaUrls: frontendCombinedDesiredUrlsJson,
            pdfFiles: frontendPdfFilesJson, // <<<--- PDF फाइलों के लिए नया फ़ील्ड जोड़ा गया
            referenceLinks: frontendReferenceLinksJson,
            country,
            state,
            city,
            localAddress,
            status,
        } = req.body;

        let news = await News.findById(id);

        if (!news) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
        }

        // Authorization: Only creator, admin, or superadmin can update
        if (news.createdBy.toString() !== userId.toString() && !['admin', 'superadmin'].includes(userRole)) {
            throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You are not authorized to update this news.");
        }

        let filesToDeleteFromCloud = []; // URLs of actual files to delete from cloud storage
        let finalNewsMediaObjects = []; // This will store ALL image/video media as objects for the `media` field in DB
        let finalPdfFiles = [];         // This will store ALL PDF media as objects for the `pdfFiles` field in DB

        // --- 1. Process `frontendCombinedDesiredUrlsJson` (for images/videos) ---
        let frontendCombinedDesiredUrls = [];
        if (frontendCombinedDesiredUrlsJson !== undefined) {
            try {
                frontendCombinedDesiredUrls = typeof frontendCombinedDesiredUrlsJson === 'string' ? JSON.parse(frontendCombinedDesiredUrlsJson) : frontendCombinedDesiredUrlsJson;
                if (!Array.isArray(frontendCombinedDesiredUrls)) {
                    throw new Error("mediaUrls must be an array or JSON string of an array.");
                }
            } catch (e) {
                console.error("Error parsing frontendCombinedDesiredUrlsJson from frontend:", e);
                throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for mediaUrls. " + e.message);
            }
        }
        const frontendCombinedDesiredUrlsSet = new Set(frontendCombinedDesiredUrls);

        // --- 2. Process `frontendPdfFilesJson` (for PDFs) ---
        let frontendPdfFiles = [];
        if (frontendPdfFilesJson !== undefined) {
            try {
                frontendPdfFiles = typeof frontendPdfFilesJson === 'string' ? JSON.parse(frontendPdfFilesJson) : frontendPdfFilesJson;
                if (!Array.isArray(frontendPdfFiles)) {
                    throw new Error("pdfFiles must be an array or JSON string of an array.");
                }
            } catch (e) {
                console.error("Error parsing frontendPdfFilesJson from frontend:", e);
                throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for pdfFiles. " + e.message);
            }
        }
        const frontendPdfFilesSet = new Set(frontendPdfFiles.map(p => p.url)); // For efficient lookup of desired PDF URLs

        // --- 3. Process new file uploads via `req.files` (Differentiate images/videos from PDFs) ---
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const url = await uploadFileToSpaces(file, 'news-media'); // Ensure this returns the full URL
                if (file.mimetype === 'application/pdf') {
                    finalPdfFiles.push({
                        url,
                        originalName: file.originalname || file.filename || '', // filename can be a fallback
                        uploadedAt: new Date() // Add uploadedAt for new files
                    });
                } else { // Assume it's an image or video
                    finalNewsMediaObjects.push({
                        url,
                        type: file.mimetype.startsWith('video') ? 'video' : 'image',
                        caption: file.originalname || file.filename || '',
                        uploadedAt: new Date() // Add uploadedAt for new files
                    });
                }
            }
        }

        // Create a Set of URLs for all media objects *currently* intended for `finalNewsMediaObjects`
        const currentFinalNewsMediaUrlsSet = new Set(finalNewsMediaObjects.map(obj => obj.url));
        // Create a Set of URLs for all PDF objects *currently* intended for `finalPdfFiles`
        const currentFinalPdfUrlsSet = new Set(finalPdfFiles.map(obj => obj.url));

        // --- 4. Reconcile existing `news.media` objects (images/videos) ---
        for (const oldMediaObj of news.media) {
            if (frontendCombinedDesiredUrlsSet.has(oldMediaObj.url)) {
                // If the frontend still wants this media item and it's not already added (e.g., from new uploads)
                if (!currentFinalNewsMediaUrlsSet.has(oldMediaObj.url)) {
                    finalNewsMediaObjects.push(oldMediaObj);
                    currentFinalNewsMediaUrlsSet.add(oldMediaObj.url);
                }
            } else {
                // If frontend doesn't want this old media item, check if it was an internally hosted file
                // If its type is 'image' or 'video', it was likely uploaded by us and needs cloud deletion.
                if (oldMediaObj.type === 'image' || oldMediaObj.type === 'video') { // Only delete if it's an internal file type
                     filesToDeleteFromCloud.push(oldMediaObj.url);
                }
            }
        }

        // --- 5. Process any remaining URLs from `frontendCombinedDesiredUrls` (new external images/videos) ---
        for (const url of frontendCombinedDesiredUrls) {
            if (!currentFinalNewsMediaUrlsSet.has(url)) {
                // This is a new external URL, convert it to a mediaSchema object and add it.
                finalNewsMediaObjects.push({
                    url,
                    type: url.includes("youtube.com") || url.includes("vimeo.com") || /\.(mp4|webm|ogg)\b/i.test(url.split('?')[0]) ? "video" : "image",
                    caption: "", // External URLs typically don't have a specific caption from our side
                    uploadedAt: new Date() // Use current date for external links
                });
                currentFinalNewsMediaUrlsSet.add(url);
            }
        }

        // --- 6. Reconcile existing `news.pdfFiles` ---
        for (const oldPdfObj of news.pdfFiles) {
            if (frontendPdfFilesSet.has(oldPdfObj.url)) {
                // If the frontend still wants this PDF and it's not already added (e.g., from new req.files uploads)
                if (!currentFinalPdfUrlsSet.has(oldPdfObj.url)) {
                    finalPdfFiles.push(oldPdfObj);
                    currentFinalPdfUrlsSet.add(oldPdfObj.url);
                }
            } else {
                // Frontend doesn't want this old PDF. Add its URL to filesToDeleteFromCloud.
                filesToDeleteFromCloud.push(oldPdfObj.url);
            }
        }

        // --- 7. Process any remaining URLs from `frontendPdfFiles` (new external PDFs) ---
        for (const pdfObj of frontendPdfFiles) {
            if (!currentFinalPdfUrlsSet.has(pdfObj.url)) {
                // This is a new external PDF URL, add it.
                finalPdfFiles.push({
                    url: pdfObj.url,
                    originalName: pdfObj.originalName || pdfObj.url.split('/').pop() || 'external_pdf',
                    uploadedAt: new Date() // Use current date for external links
                });
                currentFinalPdfUrlsSet.add(pdfObj.url);
            }
        }


        // Ensure uniqueness for finalNewsMediaObjects (using Map to preserve order and uniqueness based on URL)
        finalNewsMediaObjects = Array.from(new Map(finalNewsMediaObjects.map(item => [item.url, item])).values());
        // Ensure uniqueness for finalPdfFiles (using Map to preserve order and uniqueness based on URL)
        finalPdfFiles = Array.from(new Map(finalPdfFiles.map(item => [item.url, item])).values());


        // --- REFERENCE LINKS HANDLING START ---
        let finalReferenceLinks = [];
        if (frontendReferenceLinksJson !== undefined) {
            try {
                finalReferenceLinks = typeof frontendReferenceLinksJson === 'string' ? JSON.parse(frontendReferenceLinksJson) : frontendReferenceLinksJson;
                if (!Array.isArray(finalReferenceLinks)) {
                    throw new Error("referenceLinks must be an array or JSON string of an array.");
                }
            } catch (e) {
                console.error("Error parsing referenceLinks from frontend:", e);
                throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for referenceLinks. " + e.message);
            }
        }
        finalReferenceLinks = Array.from(new Set(finalReferenceLinks)); // Ensure uniqueness
        // --- REFERENCE LINKS HANDLING END ---

        // --- TAGS HANDLING START ---
        let finalTags = news.tags; // Default to existing tags
        if (tags !== undefined) {
            try {
                finalTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
                if (!Array.isArray(finalTags)) { // Ensure it's an array after parsing
                    finalTags = [finalTags]; // Convert to array if it was a single tag string
                }
            } catch (e) {
                console.error("Error parsing tags:", e);
                throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for tags. " + e.message);
            }
        }
        // --- TAGS HANDLING END ---

        // --- POLL HANDLING START ---
        let finalPoll = news.poll; // Default to existing poll
        if (req.body['poll[question]'] !== undefined || req.body['poll[options][]'] !== undefined) {
            const pollQuestion = req.body['poll[question]'] ? req.body['poll[question]'].trim() : '';
            const pollOptions = Array.isArray(req.body['poll[options][]']) ? req.body['poll[options][]'].map(opt => opt.trim()).filter(opt => opt !== '') :
                               (req.body['poll[options][]'] ? [req.body['poll[options][]'].trim()].filter(opt => opt !== '') : []);

            if (pollQuestion && pollOptions.length > 0) {
                finalPoll = {
                    question: pollQuestion,
                    options: pollOptions,
                };
            } else if (!pollQuestion && pollOptions.length === 0) {
                finalPoll = null; // Clear the poll if no question and no options
            } else if (pollQuestion && pollOptions.length === 0) {
                throw new ApiError(STATUS_CODES.BAD_REQUEST, "Poll question requires at least one option.");
            } else if (!pollQuestion && pollOptions.length > 0) {
                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Poll options cannot be present without a question.");
            }
        }
        // --- POLL HANDLING END ---


        // --- Handle Location Updates by ID (Improved validation and default handling) ---
        let countryId = news.country;
        if (country !== undefined) {
            if (country === null || country === '') {
                countryId = null; // Clear country
            } else if (isValidObjectId(country)) {
                const countryDoc = await Country.findById(country);
                if (!countryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.COUNTRY_NOT_FOUND + ": Provided country ID is invalid or does not exist.");
                countryId = countryDoc._id;
            } else {
                throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided country is not a valid ID or null/empty.");
            }
        }

        let stateId = news.state;
        if (state !== undefined) {
            if (state === null || state === '') {
                stateId = null; // Clear state
            } else if (isValidObjectId(state)) {
                const stateDoc = await State.findById(state);
                if (!stateDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.STATE_NOT_FOUND + ": Provided state ID is invalid or does not exist.");
                stateId = stateDoc._id;
                // Validate if state belongs to the selected country (if both are provided)
                if (countryId && convertIdToString(stateDoc.country) !== convertIdToString(countryId)) {
                    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": State does not belong to the selected country.");
                }
            } else {
                throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided state is not a valid ID or null/empty.");
            }
        }

        let cityId = news.city;
        if (city !== undefined) {
            if (city === null || city === '') {
                cityId = null; // Clear city
            } else if (isValidObjectId(city)) {
                const cityDoc = await City.findById(city);
                if (!cityDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CITY_NOT_FOUND + ": Provided city ID is invalid or does not exist.");
                cityId = cityDoc._id;
                // Validate if city belongs to the selected state/country (if provided)
                if (stateId && convertIdToString(cityDoc.state) !== convertIdToString(stateId)) {
                    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected state.");
                }
                if (countryId && convertIdToString(cityDoc.country) !== convertIdToString(countryId)) {
                    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected country.");
                }
            } else {
                throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided city is not a valid ID or null/empty.");
            }
        }

       // --- Handle Category/SubCategory Updates by ID ---

        // 1. Sabse pehle variables initialize karein taaki initialization error na aaye
        let finalCategory = news.category;
        let finalSubCategory = news.subCategory;
        let finalSubSubCategory = news.subSubCategory;
        let categoryDocFound = null;

        // 2. Category Validation
        if (category !== undefined) {
            if (category === null || category === '') {
                finalCategory = null;
                finalSubCategory = null; // Parent clear toh child bhi clear
                finalSubSubCategory = null;
            } else if (isValidObjectId(category)) {
                categoryDocFound = await Category.findById(category);
                if (!categoryDocFound) {
                    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category ID is invalid.");
                }
                finalCategory = categoryDocFound._id;
            } else {
                throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid category ID format.");
            }
        } else if (news.category) {
            // Agar category update nahi ho rahi, toh purani category nikaalein validation ke liye
            categoryDocFound = await Category.findById(news.category);
        }

        // 3. SubCategory Validation (Optional: Agar aayi hai toh check karega, nahi toh purani rahegi)
        if (subCategory !== undefined) {
            if (subCategory === null || subCategory === '') {
                finalSubCategory = null;
                finalSubSubCategory = null;
            } else if (isValidObjectId(subCategory)) {
                // Check karein ki kya category selected hai
                if (!finalCategory) {
                    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Cannot set subCategory without a valid category.");
                }
                
                const subCategoryDoc = await SubCategory.findOne({ 
                    _id: subCategory, 
                    category: finalCategory 
                });

                if (!subCategoryDoc) {
                    throw new ApiError(STATUS_CODES.BAD_REQUEST, "SubCategory does not belong to the selected category.");
                }
                finalSubCategory = subCategoryDoc._id;
            }
        }

        // 4. SubSubCategory Validation (Simple assignment as per your requirement)
        if (subSubCategory !== undefined) {
            if (subSubCategory === null || subSubCategory === '') {
                finalSubSubCategory = null;
            } else {
                finalSubSubCategory = subSubCategory;
            }
        }
        // --- Status Update Logic ---
        let updatedStatus = news.status;
        if (status !== undefined) {
            if (!['draft', 'pending_approval', 'posted', 'live', 'rejected'].includes(status)) {
                throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid status provided.");
            }

            const currentUser = req.user;

            if (currentUser.role === 'superadmin' || (currentUser.role === 'admin' && currentUser.adminPermissions.manageNews)) {
                updatedStatus = status;
            }
            else if (currentUser.role === 'reporter') {
                if (status === 'live' && currentUser.canDirectGoLive) {
                    updatedStatus = status;
                } else if (['posted'].includes(status) && currentUser.canDirectPost) {
                    updatedStatus = status;
                } else if (['draft', 'pending_approval'].includes(status)) {
                    updatedStatus = status;
                } else {
                    throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to set this status.");
                }
            } else {
                throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to update news status.");
            }
        }

        // Prepare fields to update
        const updateFields = {
            title_en: title_en !== undefined ? title_en : news.title_en,
            title_hi: title_hi !== undefined ? title_hi : news.title_hi,
            content_en: content_en !== undefined ? content_en : news.content_en,
            content_hi: content_hi !== undefined ? content_hi : news.content_hi,
            summary_en: summary_en !== undefined ? summary_en : news.summary_en,
            summary_hi: summary_hi !== undefined ? summary_hi : news.summary_hi,
            category: finalCategory,
            subCategory: finalSubCategory,
            subSubCategory: finalSubSubCategory,
            tags: finalTags,
            media: finalNewsMediaObjects,       // ALL image/video media (internal files and external links) go here
            mediaUrls: [],                     // Explicitly clear this as `media` now holds all
            pdfFiles: finalPdfFiles,           // <<<--- PDF फाइलों को यहां अपडेट किया गया
            referenceLinks: finalReferenceLinks,
            poll: finalPoll,
            country: countryId,
            state: stateId,
            city: cityId,
            localAddress: localAddress !== undefined ? localAddress : news.localAddress,
            status: updatedStatus,
            updatedBy: userId,
        };

        // If status changes to posted/live and was not already, update publishedAt
        if ((updateFields.status === 'posted' || updateFields.status === 'live') && !news.publishedAt && updateFields.status !== news.status) {
            updateFields.publishedAt = new Date();
        } else if (updateFields.status !== 'posted' && updateFields.status !== 'live' && news.publishedAt && updateFields.status !== news.status) {
            // If news goes out of posted/live status, clear publishedAt (optional, depends on logic)
            // updateFields.publishedAt = null; // Uncomment if this logic is desired
        }

        news = await News.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true
        });

        // Delete old files from cloud storage AFTER successful DB update
        for (const url of filesToDeleteFromCloud) {
            await deleteFileFromSpaces(url).catch(err => console.warn("Failed to delete old media file:", err.message));
        }

        // Populate and Format Response
        const populatedNews = await News.findById(news._id)
            .populate([
                {
                    path: 'createdBy',
                    select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
                },
                { path: 'updatedBy', select: 'name email' },
                { path: 'category', select: 'name' },
                { path: 'subCategory', select: 'name' },
                { path: 'country', select: 'name iso2' },
                { path: 'state', select: 'name iso2' },
                { path: 'city', select: 'name' },
                { path: 'likes.user', select: 'name profileImage' },
                { path: 'comments.user', select: 'name profileImage' }
            ]);

        const finalNewsData = populatedNews.toObject({ virtuals: true });

        const reporterDetails = populatedNews.createdBy;
        if (reporterDetails) {
             const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
             const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
             const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;

            finalNewsData.reporterDetails = {
                id: reporterDetails._id,
                name: reporterDetails.name,
                email: reporterDetails.email,
                role: reporterDetails.role,
                profileImage: reporterDetails.profileImage,
                country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
                state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
                city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
                address: reporterDetails.address,
                dateOfBirth: reporterDetails.dateOfBirth,
                canDirectPost: reporterDetails.canDirectPost,
                canDirectGoLive: reporterDetails.canDirectGoLive,
            };
        } else {
            finalNewsData.reporterDetails = null;
        }

        finalNewsData.postedDate = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[0] : null;
        finalNewsData.postedTime = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
        finalNewsData.createdAtDate = populatedNews.createdAt.toISOString().split('T')[0];
        finalNewsData.createdAtTime = populatedNews.createdAt.toISOString().split('T')[1].substring(0, 8);
        finalNewsData.updatedAtDate = populatedNews.updatedAt.toISOString().split('T')[0];
        finalNewsData.updatedAtTime = populatedNews.updatedAt.toISOString().split('T')[1].substring(0, 8);


        res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: MESSAGES.NEWS_UPDATED,
            data: finalNewsData,
        });

    } catch (error) {
        console.error("Error updating news:", error);
        next(error);
    }
};


// PDF KA LIYA UPADTE KIYA HIA BHIA  11/04/2025


// export const updateNews = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user?._id;
//         const userRole = req.user?.role;

//         // Destructure all expected fields, including multi-language ones
//         const {
//             title_en,
//             title_hi,
//             content_en,
//             content_hi,
//             summary_en,
//             summary_hi,
//             category, // Expected to be an ID or null/empty string
//             subCategory, // Expected to be an ID or null/empty string
//             tags, // Expected to be a JSON string array or array
//             country, // Expected to be an ID or null/empty string
//             state, // Expected to be an ID or null/empty string
//             city, // Expected to be an ID or null/empty string
//             localAddress,
//             status,
//             existingMedia, // Expected to be a JSON string array of URLs or array
//             // req.files will contain new file uploads automatically from multer
//         } = req.body;

//         let news = await News.findById(id);

//         if (!news) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//         }

//         // Authorization: Only creator, admin, or superadmin can update
//         if (news.createdBy.toString() !== userId.toString() && !['admin', 'superadmin'].includes(userRole)) {
//             throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You are not authorized to update this news.");
//         }

//         // --- Handle Media Updates ---
//         let existingMediaUrls = news.media.map(m => m.url);
//         let updatedMedia = [];
//         let filesToDeleteFromCloud = [];

//         // 1. Process new files (if any) uploaded via 'files' field
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 const url = await uploadFileToSpaces(file, 'news-media'); // Assuming uploadFileToSpaces exists
//                 updatedMedia.push({
//                     url,
//                     type: file.mimetype.startsWith('video') ? 'video' : 'image',
//                     caption: file.originalname || ''
//                 });
//             }
//         }

//         // 2. Determine which existing media to keep or delete
//         if (existingMedia !== undefined) {
//             let mediaToKeep = [];
//             try {
//                 mediaToKeep = typeof existingMedia === 'string' ? JSON.parse(existingMedia) : existingMedia;
//                 if (!Array.isArray(mediaToKeep)) { // Ensure it's an array
//                     throw new Error("existingMedia must be an array or JSON string of an array.");
//                 }
//             } catch (e) {
//                 console.error("Error parsing existingMedia:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for existingMedia. " + e.message);
//             }

//             // Filter out media to delete from old news.media
//             for (const oldMedia of news.media) {
//                 if (!mediaToKeep.includes(oldMedia.url)) {
//                     filesToDeleteFromCloud.push(oldMedia.url);
//                 }
//             }
//             // Add kept existing media to updatedMedia list (append to new uploads)
//             updatedMedia = [...updatedMedia, ...news.media.filter(m => mediaToKeep.includes(m.url))];

//         } else if (req.files && req.files.length > 0) {
//             // If new files are uploaded AND `existingMedia` was NOT specified,
//             // assume all old media are replaced by the new ones.
//             filesToDeleteFromCloud.push(...existingMediaUrls);
//         }
//         // 3. Handle explicit clear all media: if `existingMedia` is explicitly empty array AND no new files
//         if ((existingMedia !== undefined && Array.isArray(existingMedia) && existingMedia.length === 0) && (!req.files || req.files.length === 0)) {
//              filesToDeleteFromCloud.push(...existingMediaUrls);
//              updatedMedia = []; // Clear all media
//         }

//         // --- Handle Tags Update ---
//         let finalTags = news.tags; // Default to existing tags
//         if (tags !== undefined) {
//             try {
//                 finalTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
//                 if (!Array.isArray(finalTags)) { // Ensure it's an array after parsing
//                     finalTags = [finalTags]; // Convert to array if it was a single tag string
//                 }
//             } catch (e) {
//                 console.error("Error parsing tags:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for tags. " + e.message);
//             }
//         }


//         // --- Handle Location Updates by ID ---
//         let countryId = news.country; // Default to existing
//         if (country !== undefined) {
//             if (country === null || country === '') {
//                 countryId = null; // Clear country
//             } else if (isValidObjectId(country)) {
//                 const countryDoc = await Country.findById(country); // Find by ID
//                 if (!countryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.COUNTRY_NOT_FOUND + ": Provided country ID is invalid or does not exist.");
//                 countryId = countryDoc._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided country is not a valid ID or null/empty.");
//             }
//         }

//         let stateId = news.state; // Default to existing
//         if (state !== undefined) {
//             if (state === null || state === '') {
//                 stateId = null; // Clear state
//             } else if (isValidObjectId(state)) {
//                 const stateDoc = await State.findById(state); // Find by ID
//                 if (!stateDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.STATE_NOT_FOUND + ": Provided state ID is invalid or does not exist.");
//                 stateId = stateDoc._id;
//                 // Validate if state belongs to the selected country (if both are provided)
//                 if (countryId && convertIdToString(stateDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": State does not belong to the selected country.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided state is not a valid ID or null/empty.");
//             }
//         }

//         let cityId = news.city; // Default to existing
//         if (city !== undefined) {
//             if (city === null || city === '') {
//                 cityId = null; // Clear city
//             } else if (isValidObjectId(city)) {
//                 const cityDoc = await City.findById(city); // Find by ID
//                 if (!cityDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CITY_NOT_FOUND + ": Provided city ID is invalid or does not exist.");
//                 cityId = cityDoc._id;
//                 // Validate if city belongs to the selected state/country (if provided)
//                 if (stateId && convertIdToString(cityDoc.state) !== convertIdToString(stateId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected state.");
//                 }
//                 if (countryId && convertIdToString(cityDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected country.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided city is not a valid ID or null/empty.");
//             }
//         }

//         // --- Handle Category/SubCategory Updates by ID ---
//         let finalCategory = news.category; // Default to existing
//         let categoryDocFound = null; // Used for subCategory validation
//         if (category !== undefined) {
//             if (category === null || category === '') {
//                 finalCategory = null;
//                 finalSubCategory = null; // Also clear subCategory if parent is cleared
//             } else if (isValidObjectId(category)) {
//                 categoryDocFound = await Category.findById(category); // Find by ID
//                 if (!categoryDocFound) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category ID is invalid or does not exist.");
//                 finalCategory = categoryDocFound._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category is not a valid ID or null/empty.");
//             }
//         } else {
//             // If category was not provided in req.body, use existing category for subcategory validation if it's a valid ID
//             if (news.category && isValidObjectId(news.category)) {
//                 categoryDocFound = await Category.findById(news.category);
//             }
//         }

//         let finalSubCategory = news.subCategory; // Default to existing
//         if (subCategory !== undefined) {
//             if (subCategory === null || subCategory === '') {
//                 finalSubCategory = null; // Clear subCategory
//             } else if (isValidObjectId(subCategory)) {
//                 if (!categoryDocFound) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Category not found for subCategory validation. Please provide a valid category first or ensure existing news category is valid.");
//                 }
//                 const subCategoryDoc = await SubCategory.findOne({ _id: subCategory, category: categoryDocFound._id }); // Find by ID and parent category
//                 if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory ID is invalid or does not belong to the selected category.");
//                 finalSubCategory = subCategoryDoc._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory is not a valid ID or null/empty.");
//             }
//         } else if (category !== undefined && (category === null || category === '')) {
//             // If category was explicitly cleared, also clear subCategory if not explicitly provided
//             finalSubCategory = null;
//         }


//         // --- Status Update Logic (More flexible for updates) ---
//         let updatedStatus = news.status;
//         if (status !== undefined) {
//             if (!['draft', 'pending_approval', 'posted', 'live', 'rejected'].includes(status)) {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid status provided.");
//             }

//             const currentUser = req.user;

//             if (currentUser.role === 'superadmin' || (currentUser.role === 'admin' && currentUser.adminPermissions.manageNews)) {
//                 updatedStatus = status;
//             }
//             else if (currentUser.role === 'reporter') {
//                 if (status === 'live' && currentUser.canDirectGoLive) {
//                     updatedStatus = status;
//                 } else if (['posted'].includes(status) && currentUser.canDirectPost) {
//                     updatedStatus = status;
//                 } else if (['draft', 'pending_approval'].includes(status)) {
//                     updatedStatus = status;
//                 } else {
//                     throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to set this status.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to update news status.");
//             }
//         }

//         // Prepare fields to update
//         const updateFields = {
//             title_en: title_en !== undefined ? title_en : news.title_en,
//             title_hi: title_hi !== undefined ? title_hi : news.title_hi,
//             content_en: content_en !== undefined ? content_en : news.content_en,
//             content_hi: content_hi !== undefined ? content_hi : news.content_hi,
//             summary_en: summary_en !== undefined ? summary_en : news.summary_en,
//             summary_hi: summary_hi !== undefined ? summary_hi : news.summary_hi,
//             category: finalCategory,
//             subCategory: finalSubCategory,
//             tags: finalTags, // Use the parsed tags
//             media: updatedMedia, // This will now always be defined based on logic above
//             country: countryId,
//             state: stateId,
//             city: cityId,
//             localAddress: localAddress !== undefined ? localAddress : news.localAddress,
//             status: updatedStatus,
//             updatedBy: userId,
//         };

//         // If status changes to posted/live and was not already, update publishedAt
//         if ((updateFields.status === 'posted' || updateFields.status === 'live') && !news.publishedAt && updateFields.status !== news.status) {
//             updateFields.publishedAt = new Date();
//         } else if (updateFields.status !== 'posted' && updateFields.status !== 'live' && news.publishedAt && updateFields.status !== news.status) {
//             // If news goes out of posted/live status, clear publishedAt (optional, depends on logic)
//             // updateFields.publishedAt = null; // Uncomment if this logic is desired
//         }


//         news = await News.findByIdAndUpdate(id, updateFields, {
//             new: true,
//             runValidators: true
//         });

//         // Delete old files from cloud after successful DB update
//         for (const url of filesToDeleteFromCloud) {
//             await deleteFileFromSpaces(url).catch(err => console.warn("Failed to delete old media file:", err.message)); // Assuming deleteFileFromSpaces exists
//         }

//         // Populate and Format Response
//         const populatedNews = await News.findById(news._id)
//             .populate([
//                 {
//                     path: 'createdBy',
//                     select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
//                 },
//                 { path: 'updatedBy', select: 'name email' },
//                 // Populate category, subCategory, country, state, city to return names to client
//                 { path: 'category', select: 'name' },
//                 { path: 'subCategory', select: 'name' },
//                 { path: 'country', select: 'name iso2' },
//                 { path: 'state', select: 'name iso2' },
//                 { path: 'city', select: 'name' },
//                 { path: 'likes.user', select: 'name profileImage' },
//                 { path: 'comments.user', select: 'name profileImage' }
//             ]);

//         const finalNewsData = populatedNews.toObject({ virtuals: true });

//         const reporterDetails = populatedNews.createdBy;
//         if (reporterDetails) {
//              const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
//              const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
//              const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;

//             finalNewsData.reporterDetails = {
//                 id: reporterDetails._id,
//                 name: reporterDetails.name,
//                 email: reporterDetails.email,
//                 role: reporterDetails.role,
//                 profileImage: reporterDetails.profileImage,
//                 country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
//                 state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
//                 city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
//                 address: reporterDetails.address,
//                 dateOfBirth: reporterDetails.dateOfBirth,
//                 canDirectPost: reporterDetails.canDirectPost,
//                 canDirectGoLive: reporterDetails.canDirectGoLive,
//             };
//         } else {
//             finalNewsData.reporterDetails = null;
//         }

//         finalNewsData.postedDate = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[0] : null;
//         finalNewsData.postedTime = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         finalNewsData.createdAtDate = populatedNews.createdAt.toISOString().split('T')[0];
//         finalNewsData.createdAtTime = populatedNews.createdAt.toISOString().split('T')[1].substring(0, 8);
//         finalNewsData.updatedAtDate = populatedNews.updatedAt.toISOString().split('T')[0];
//         finalNewsData.updatedAtTime = populatedNews.updatedAt.toISOString().split('T')[1].substring(0, 8);


//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             message: MESSAGES.NEWS_UPDATED,
//             data: finalNewsData,
//         });

//     } catch (error) {
//         console.error("Error updating news:", error);
//         next(error);
//     }
// };


//////////////////////////////////coump wordk //////////////////////////////

// export const updateNews = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user?._id; // Current user performing the update
//         const userRole = req.user?.role;

//         const {
//             title_en,
//             title_hi,
//             content_en,
//             content_hi,
//             summary_en,
//             summary_hi,
//             category,
//             subCategory,
//             subSubCategory, // Added to handle Rashi option
//             tags,
//             // Renamed from 'existingMedia' to 'frontendDesiredUrlsJson'
//             // This is the single, combined list of ALL desired URLs from the frontend
//             mediaUrls: frontendDesiredUrlsJson,
//             // Assuming referenceLinks are also sent as a JSON stringified array from frontend
//             referenceLinks: frontendReferenceLinksJson,
//             // Poll fields will be parsed from req.body directly due to their nested FormData structure
//             // Example: req.body['poll[question]'], req.body['poll[options][]']
//             country,
//             state,
//             city,
//             localAddress,
//             status,
//         } = req.body;

//         let news = await News.findById(id);

//         if (!news) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//         }

//         // Authorization: Only creator, admin, or superadmin can update
//         if (news.createdBy.toString() !== userId.toString() && !['admin', 'superadmin'].includes(userRole)) {
//             throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You are not authorized to update this news.");
//         }

//         // --- MEDIA HANDLING START ---
//         let filesToDeleteFromCloud = []; // URLs of actual files to delete from cloud storage (e.g., S3, DigitalOcean Spaces)
//         let finalNewsMediaObjects = []; // Will store objects for the `media` field in DB (internally uploaded files)
//         let finalNewsExternalMediaUrls = []; // Will store strings for the `mediaUrls` field in DB (external links)

//         // Parse `frontendDesiredUrlsJson` (the combined list of all URLs from frontend)
//         let frontendDesiredUrls = [];
//         if (frontendDesiredUrlsJson !== undefined) {
//             try {
//                 frontendDesiredUrls = typeof frontendDesiredUrlsJson === 'string' ? JSON.parse(frontendDesiredUrlsJson) : frontendDesiredUrlsJson;
//                 if (!Array.isArray(frontendDesiredUrls)) {
//                     throw new Error("mediaUrls must be an array or JSON string of an array.");
//                 }
//             } catch (e) {
//                 console.error("Error parsing mediaUrls from frontend:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for mediaUrls. " + e.message);
//             }
//         }
//         const frontendDesiredUrlsSet = new Set(frontendDesiredUrls); // For efficient lookup

//         // 1. Process new file uploads via `req.files` (multer adds these)
//         // These are guaranteed to be new files uploaded to our storage.
//         const newlyUploadedFileObjects = [];
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 // Ensure uploadFileToSpaces returns the full, publicly accessible URL
//                 const url = await uploadFileToSpaces(file, 'news-media');
//                 newlyUploadedFileObjects.push({
//                     url,
//                     type: file.mimetype.startsWith('video') ? 'video' : 'image',
//                     caption: file.originalname || ''
//                 });
//             }
//         }
//         finalNewsMediaObjects.push(...newlyUploadedFileObjects); // Add new uploads to our final list
//         const newlyUploadedUrlsSet = new Set(newlyUploadedFileObjects.map(obj => obj.url)); // For efficient lookup

//         // 2. Reconcile existing `news.media` objects (files already in our storage)
//         // Keep `news.media` objects whose URLs are in `frontendDesiredUrls`.
//         // Mark for deletion `news.media` objects whose URLs are NOT in `frontendDesiredUrls`.
//         for (const oldMediaObj of news.media) {
//             if (frontendDesiredUrlsSet.has(oldMediaObj.url)) {
//                 finalNewsMediaObjects.push(oldMediaObj); // Keep this existing uploaded file
//             } else {
//                 // This old uploaded file is no longer desired by the frontend, mark its URL for cloud deletion
//                 filesToDeleteFromCloud.push(oldMediaObj.url);
//             }
//         }

//         // 3. Reconcile `news.mediaUrls` (external links, or new external links)
//         // Iterate through all URLs the frontend wants (`frontendDesiredUrls`).
//         // If a URL is NOT a newly uploaded file and NOT an existing uploaded file,
//         // then it must be an external link (either already existing or new).
//         for (const url of frontendDesiredUrls) {
//             if (newlyUploadedUrlsSet.has(url)) {
//                 continue; // Already handled as a new upload, it's in finalNewsMediaObjects
//             }
//             if (news.media.some(m => m.url === url)) {
//                 continue; // Already handled as an existing uploaded file, it's in finalNewsMediaObjects
//             }
//             // If we reach here, it's an external URL (either old or newly added in frontend)
//             finalNewsExternalMediaUrls.push(url);
//         }

//         // Ensure uniqueness for both final arrays (if frontend sent duplicates or logic added them)
//         // Using Map to preserve order and uniqueness based on URL
//         finalNewsMediaObjects = Array.from(new Map(finalNewsMediaObjects.map(item => [item.url, item])).values());
//         finalNewsExternalMediaUrls = Array.from(new Set(finalNewsExternalMediaUrls));
//         // --- MEDIA HANDLING END ---

//         // --- REFERENCE LINKS HANDLING START ---
//         let finalReferenceLinks = [];
//         if (frontendReferenceLinksJson !== undefined) {
//             try {
//                 finalReferenceLinks = typeof frontendReferenceLinksJson === 'string' ? JSON.parse(frontendReferenceLinksJson) : frontendReferenceLinksJson;
//                 if (!Array.isArray(finalReferenceLinks)) {
//                     throw new Error("referenceLinks must be an array or JSON string of an array.");
//                 }
//             } catch (e) {
//                 console.error("Error parsing referenceLinks from frontend:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for referenceLinks. " + e.message);
//             }
//         }
//         finalReferenceLinks = Array.from(new Set(finalReferenceLinks)); // Ensure uniqueness
//         // --- REFERENCE LINKS HANDLING END ---

//         // --- TAGS HANDLING START ---
//         let finalTags = news.tags; // Default to existing tags
//         if (tags !== undefined) {
//             try {
//                 finalTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
//                 if (!Array.isArray(finalTags)) { // Ensure it's an array after parsing
//                     finalTags = [finalTags]; // Convert to array if it was a single tag string
//                 }
//             } catch (e) {
//                 console.error("Error parsing tags:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for tags. " + e.message);
//             }
//         }
//         // --- TAGS HANDLING END ---

//         // --- POLL HANDLING START ---
//         let finalPoll = news.poll; // Default to existing poll
//         // Check if poll data was sent (assuming FormData structure for poll fields)
//         if (req.body['poll[question]'] !== undefined || req.body['poll[options][]'] !== undefined) {
//             const pollQuestion = req.body['poll[question]'] ? req.body['poll[question]'].trim() : '';
//             const pollOptions = Array.isArray(req.body['poll[options][]']) ? req.body['poll[options][]'].map(opt => opt.trim()).filter(opt => opt !== '') :
//                                (req.body['poll[options][]'] ? [req.body['poll[options][]'].trim()].filter(opt => opt !== '') : []); // Handle single option string from formData

//             if (pollQuestion && pollOptions.length > 0) {
//                 finalPoll = {
//                     question: pollQuestion,
//                     options: pollOptions,
//                     // If you want to preserve existing votes when updating, retrieve them here
//                     // votes: news.poll?.votes || []
//                 };
//             } else if (!pollQuestion && pollOptions.length === 0) {
//                 // If question is empty and no options, clear the poll
//                 finalPoll = { question: '', options: [] };
//             } else if (pollQuestion && pollOptions.length === 0) {
//                 // Question provided but no options
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Poll question requires at least one option.");
//             } else if (!pollQuestion && pollOptions.length > 0) {
//                 // Options provided but no question
//                  throw new ApiError(STATUS_CODES.BAD_REQUEST, "Poll options cannot be present without a question.");
//             }
//         }
//         // --- POLL HANDLING END ---


//         // --- Handle Location Updates by ID (Improved validation and default handling) ---
//         let countryId = news.country;
//         if (country !== undefined) {
//             if (country === null || country === '') {
//                 countryId = null; // Clear country
//             } else if (isValidObjectId(country)) {
//                 const countryDoc = await Country.findById(country);
//                 if (!countryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.COUNTRY_NOT_FOUND + ": Provided country ID is invalid or does not exist.");
//                 countryId = countryDoc._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided country is not a valid ID or null/empty.");
//             }
//         }

//         let stateId = news.state;
//         if (state !== undefined) {
//             if (state === null || state === '') {
//                 stateId = null; // Clear state
//             } else if (isValidObjectId(state)) {
//                 const stateDoc = await State.findById(state);
//                 if (!stateDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.STATE_NOT_FOUND + ": Provided state ID is invalid or does not exist.");
//                 stateId = stateDoc._id;
//                 // Validate if state belongs to the selected country (if both are provided)
//                 if (countryId && convertIdToString(stateDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": State does not belong to the selected country.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided state is not a valid ID or null/empty.");
//             }
//         }

//         let cityId = news.city;
//         if (city !== undefined) {
//             if (city === null || city === '') {
//                 cityId = null; // Clear city
//             } else if (isValidObjectId(city)) {
//                 const cityDoc = await City.findById(city);
//                 if (!cityDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CITY_NOT_FOUND + ": Provided city ID is invalid or does not exist.");
//                 cityId = cityDoc._id;
//                 // Validate if city belongs to the selected state/country (if provided)
//                 if (stateId && convertIdToString(cityDoc.state) !== convertIdToString(stateId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected state.");
//                 }
//                 if (countryId && convertIdToString(cityDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected country.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided city is not a valid ID or null/empty.");
//             }
//         }

//         // --- Handle Category/SubCategory Updates by ID (Improved validation and default handling) ---
//         let finalCategory = news.category;
//         let categoryDocFound = null; // Used for subCategory validation
//         if (category !== undefined) {
//             if (category === null || category === '') {
//                 finalCategory = null;
//                 finalSubCategory = null; // Also clear subCategory if parent is cleared
//                 finalSubSubCategory = null; // Also clear subSubCategory if parent is cleared
//             } else if (isValidObjectId(category)) {
//                 categoryDocFound = await Category.findById(category); // Find by ID
//                 if (!categoryDocFound) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category ID is invalid or does not exist.");
//                 finalCategory = categoryDocFound._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category is not a valid ID or null/empty.");
//             }
//         } else {
//             // If category was not provided in req.body, use existing category for subcategory validation if it's a valid ID
//             if (news.category && isValidObjectId(news.category)) {
//                 categoryDocFound = await Category.findById(news.category);
//             }
//         }

//         let finalSubCategory = news.subCategory;
//         if (subCategory !== undefined) {
//             if (subCategory === null || subCategory === '') {
//                 finalSubCategory = null; // Clear subCategory
//                 finalSubSubCategory = null; // Also clear subSubCategory if parent is cleared
//             } else if (isValidObjectId(subCategory)) {
//                 if (!categoryDocFound) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Category not found for subCategory validation. Please provide a valid category first or ensure existing news category is valid.");
//                 }
//                 const subCategoryDoc = await SubCategory.findOne({ _id: subCategory, category: categoryDocFound._id }); // Find by ID and parent category
//                 if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory ID is invalid or does not belong to the selected category.");
//                 finalSubCategory = subCategoryDoc._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory is not a valid ID or null/empty.");
//             }
//         } else if (category !== undefined && (category === null || category === '')) {
//             // If category was explicitly cleared, also clear subCategory if not explicitly provided
//             finalSubCategory = null;
//             finalSubSubCategory = null;
//         }

//         let finalSubSubCategory = news.subSubCategory; // Default to existing
//         if (subSubCategory !== undefined) {
//             finalSubSubCategory = subSubCategory === null || subSubCategory === '' ? null : subSubCategory;
//         }


//         // --- Status Update Logic (as provided, seems okay) ---
//         let updatedStatus = news.status;
//         if (status !== undefined) {
//             if (!['draft', 'pending_approval', 'posted', 'live', 'rejected'].includes(status)) {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid status provided.");
//             }

//             const currentUser = req.user;

//             if (currentUser.role === 'superadmin' || (currentUser.role === 'admin' && currentUser.adminPermissions.manageNews)) {
//                 updatedStatus = status;
//             }
//             else if (currentUser.role === 'reporter') {
//                 if (status === 'live' && currentUser.canDirectGoLive) {
//                     updatedStatus = status;
//                 } else if (['posted'].includes(status) && currentUser.canDirectPost) {
//                     updatedStatus = status;
//                 } else if (['draft', 'pending_approval'].includes(status)) {
//                     updatedStatus = status;
//                 } else {
//                     throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to set this status.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to update news status.");
//             }
//         }

//         // Prepare fields to update
//         const updateFields = {
//             title_en: title_en !== undefined ? title_en : news.title_en,
//             title_hi: title_hi !== undefined ? title_hi : news.title_hi,
//             content_en: content_en !== undefined ? content_en : news.content_en,
//             content_hi: content_hi !== undefined ? content_hi : news.content_hi,
//             summary_en: summary_en !== undefined ? summary_en : news.summary_en,
//             summary_hi: summary_hi !== undefined ? summary_hi : news.summary_hi,
//             category: finalCategory,
//             subCategory: finalSubCategory,
//             subSubCategory: finalSubSubCategory, // Ensure this is updated
//             tags: finalTags, // Use the parsed tags
//             media: finalNewsMediaObjects, // Use the reconciled objects for internal files
//             mediaUrls: finalNewsExternalMediaUrls, // Use the reconciled strings for external links
//             referenceLinks: finalReferenceLinks, // Use the parsed reference links
//             poll: finalPoll, // Use the parsed poll data
//             country: countryId,
//             state: stateId,
//             city: cityId,
//             localAddress: localAddress !== undefined ? localAddress : news.localAddress,
//             status: updatedStatus,
//             updatedBy: userId,
//         };

//         // If status changes to posted/live and was not already, update publishedAt
//         if ((updateFields.status === 'posted' || updateFields.status === 'live') && !news.publishedAt && updateFields.status !== news.status) {
//             updateFields.publishedAt = new Date();
//         } else if (updateFields.status !== 'posted' && updateFields.status !== 'live' && news.publishedAt && updateFields.status !== news.status) {
//             // If news goes out of posted/live status, clear publishedAt (optional, depends on logic)
//             // updateFields.publishedAt = null; // Uncomment if this logic is desired
//         }

//         news = await News.findByIdAndUpdate(id, updateFields, {
//             new: true,
//             runValidators: true
//         });

//         // Delete old files from cloud storage AFTER successful DB update
//         for (const url of filesToDeleteFromCloud) {
//             await deleteFileFromSpaces(url).catch(err => console.warn("Failed to delete old media file:", err.message));
//         }

//         // Populate and Format Response (rest of the logic remains as you provided)
//         const populatedNews = await News.findById(news._id)
//             .populate([
//                 {
//                     path: 'createdBy',
//                     select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
//                 },
//                 { path: 'updatedBy', select: 'name email' },
//                 { path: 'category', select: 'name' },
//                 { path: 'subCategory', select: 'name' },
//                 { path: 'country', select: 'name iso2' },
//                 { path: 'state', select: 'name iso2' },
//                 { path: 'city', select: 'name' },
//                 { path: 'likes.user', select: 'name profileImage' },
//                 { path: 'comments.user', select: 'name profileImage' }
//             ]);

//         const finalNewsData = populatedNews.toObject({ virtuals: true });

//         const reporterDetails = populatedNews.createdBy;
//         if (reporterDetails) {
//              const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
//              const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
//              const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;

//             finalNewsData.reporterDetails = {
//                 id: reporterDetails._id,
//                 name: reporterDetails.name,
//                 email: reporterDetails.email,
//                 role: reporterDetails.role,
//                 profileImage: reporterDetails.profileImage,
//                 country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
//                 state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
//                 city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
//                 address: reporterDetails.address,
//                 dateOfBirth: reporterDetails.dateOfBirth,
//                 canDirectPost: reporterDetails.canDirectPost,
//                 canDirectGoLive: reporterDetails.canDirectGoLive,
//             };
//         } else {
//             finalNewsData.reporterDetails = null;
//         }

//         finalNewsData.postedDate = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[0] : null;
//         finalNewsData.postedTime = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         finalNewsData.createdAtDate = populatedNews.createdAt.toISOString().split('T')[0];
//         finalNewsData.createdAtTime = populatedNews.createdAt.toISOString().split('T')[1].substring(0, 8);
//         finalNewsData.updatedAtDate = populatedNews.updatedAt.toISOString().split('T')[0];
//         finalNewsData.updatedAtTime = populatedNews.updatedAt.toISOString().split('T')[1].substring(0, 8);


//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             message: MESSAGES.NEWS_UPDATED,
//             data: finalNewsData,
//         });

//     } catch (error) {
//         console.error("Error updating news:", error);
//         next(error);
//     }
// };

////////////////////////////////// complate woerk end ///////////////////////////////



// export const updateNews = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const userId = req.user?._id;
//         const userRole = req.user?.role;

//         const {
//             title_en,
//             title_hi,
//             content_en,
//             content_hi,
//             summary_en,
//             summary_hi,
//             category,
//             subCategory,
//             subSubCategory,
//             tags,
//             // This now represents ALL desired URLs from the frontend (internal and external)
//             mediaUrls: frontendCombinedDesiredUrlsJson, // Renamed for clarity in backend to reflect its combined nature
//             referenceLinks: frontendReferenceLinksJson,
//             country,
//             state,
//             city,
//             localAddress,
//             status,
//         } = req.body;

//         let news = await News.findById(id);

//         if (!news) {
//             throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
//         }

//         // Authorization: Only creator, admin, or superadmin can update
//         if (news.createdBy.toString() !== userId.toString() && !['admin', 'superadmin'].includes(userRole)) {
//             throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You are not authorized to update this news.");
//         }

//         // --- MEDIA HANDLING START (To match createNews behavior: all media into `news.media` array) ---
//         let filesToDeleteFromCloud = []; // URLs of actual files to delete from cloud storage
//         let finalNewsMediaObjects = []; // This will store ALL media as objects for the `media` field in DB

//         let frontendCombinedDesiredUrls = [];
//         if (frontendCombinedDesiredUrlsJson !== undefined) {
//             try {
//                 frontendCombinedDesiredUrls = typeof frontendCombinedDesiredUrlsJson === 'string' ? JSON.parse(frontendCombinedDesiredUrlsJson) : frontendCombinedDesiredUrlsJson;
//                 if (!Array.isArray(frontendCombinedDesiredUrls)) {
//                     throw new Error("mediaUrls must be an array or JSON string of an array.");
//                 }
//             } catch (e) {
//                 console.error("Error parsing frontendCombinedDesiredUrlsJson from frontend:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for mediaUrls. " + e.message);
//             }
//         }
//         const frontendCombinedDesiredUrlsSet = new Set(frontendCombinedDesiredUrls); // For efficient lookup of ALL URLs the frontend wants

//         // 1. Process new file uploads via `req.files`
//         // These are always internal files, so they are directly converted to mediaSchema objects.
//         if (req.files && req.files.length > 0) {
//             for (const file of req.files) {
//                 const url = await uploadFileToSpaces(file, 'news-media'); // Ensure this returns the full URL
//                 finalNewsMediaObjects.push({
//                     url,
//                     type: file.mimetype.startsWith('video') ? 'video' : 'image',
//                     caption: file.originalname || ''
//                 });
//             }
//         }

//         // Create a Set of URLs for all media objects currently intended for `finalNewsMediaObjects`
//         const currentFinalMediaUrlsSet = new Set(finalNewsMediaObjects.map(obj => obj.url));

//         // 2. Reconcile existing `news.media` objects
//         // (These might include old internal files or old external URLs if `createNews` put them there)
//         for (const oldMediaObj of news.media) {
//             if (frontendCombinedDesiredUrlsSet.has(oldMediaObj.url)) {
//                 // If the frontend still wants this media item and it's not already added (e.g., from new uploads)
//                 if (!currentFinalMediaUrlsSet.has(oldMediaObj.url)) {
//                     finalNewsMediaObjects.push(oldMediaObj);
//                     currentFinalMediaUrlsSet.add(oldMediaObj.url);
//                 }
//             } else {
//                 // If frontend doesn't want this old media item, check if it was an internally hosted file
//                 // If its type is 'image' or 'video', it was likely uploaded by us and needs cloud deletion.
//                 if (oldMediaObj.type === 'image' || oldMediaObj.type === 'video') {
//                      filesToDeleteFromCloud.push(oldMediaObj.url);
//                 }
//                 // If it was an external URL previously stored as an object, it's just dropped from the list.
//             }
//         }

//         // 3. Process any remaining URLs from `frontendCombinedDesiredUrls` that are not yet in `finalNewsMediaObjects`
//         // These are typically new external URLs added by the user.
//         for (const url of frontendCombinedDesiredUrls) {
//             if (!currentFinalMediaUrlsSet.has(url)) {
//                 // This is a new external URL, convert it to a mediaSchema object and add it.
//                 finalNewsMediaObjects.push({
//                     url,
//                     type: url.includes("youtube.com") || url.includes("vimeo.com") || /\.(mp4|webm|ogg)\b/i.test(url.split('?')[0]) ? "video" : "image",
//                     caption: "", // External URLs typically don't have a specific caption from our side
//                 });
//                 currentFinalMediaUrlsSet.add(url);
//             }
//         }

//         // Ensure uniqueness for finalNewsMediaObjects (using Map to preserve order and uniqueness based on URL)
//         finalNewsMediaObjects = Array.from(new Map(finalNewsMediaObjects.map(item => [item.url, item])).values());
//         // --- MEDIA HANDLING END ---

//         // --- REFERENCE LINKS HANDLING START ---
//         let finalReferenceLinks = [];
//         if (frontendReferenceLinksJson !== undefined) {
//             try {
//                 finalReferenceLinks = typeof frontendReferenceLinksJson === 'string' ? JSON.parse(frontendReferenceLinksJson) : frontendReferenceLinksJson;
//                 if (!Array.isArray(finalReferenceLinks)) {
//                     throw new Error("referenceLinks must be an array or JSON string of an array.");
//                 }
//             } catch (e) {
//                 console.error("Error parsing referenceLinks from frontend:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for referenceLinks. " + e.message);
//             }
//         }
//         finalReferenceLinks = Array.from(new Set(finalReferenceLinks)); // Ensure uniqueness
//         // --- REFERENCE LINKS HANDLING END ---

//         // --- TAGS HANDLING START ---
//         let finalTags = news.tags; // Default to existing tags
//         if (tags !== undefined) {
//             try {
//                 finalTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
//                 if (!Array.isArray(finalTags)) { // Ensure it's an array after parsing
//                     finalTags = [finalTags]; // Convert to array if it was a single tag string
//                 }
//             } catch (e) {
//                 console.error("Error parsing tags:", e);
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid format for tags. " + e.message);
//             }
//         }
//         // --- TAGS HANDLING END ---

//         // --- POLL HANDLING START ---
//         let finalPoll = news.poll; // Default to existing poll
//         if (req.body['poll[question]'] !== undefined || req.body['poll[options][]'] !== undefined) {
//             const pollQuestion = req.body['poll[question]'] ? req.body['poll[question]'].trim() : '';
//             const pollOptions = Array.isArray(req.body['poll[options][]']) ? req.body['poll[options][]'].map(opt => opt.trim()).filter(opt => opt !== '') :
//                                (req.body['poll[options][]'] ? [req.body['poll[options][]'].trim()].filter(opt => opt !== '') : []);

//             if (pollQuestion && pollOptions.length > 0) {
//                 finalPoll = {
//                     question: pollQuestion,
//                     options: pollOptions,
//                 };
//             } else if (!pollQuestion && pollOptions.length === 0) {
//                 finalPoll = null; // Clear the poll if no question and no options
//             } else if (pollQuestion && pollOptions.length === 0) {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, "Poll question requires at least one option.");
//             } else if (!pollQuestion && pollOptions.length > 0) {
//                  throw new ApiError(STATUS_CODES.BAD_REQUEST, "Poll options cannot be present without a question.");
//             }
//         }
//         // --- POLL HANDLING END ---


//         // --- Handle Location Updates by ID (Improved validation and default handling) ---
//         let countryId = news.country;
//         if (country !== undefined) {
//             if (country === null || country === '') {
//                 countryId = null; // Clear country
//             } else if (isValidObjectId(country)) {
//                 const countryDoc = await Country.findById(country);
//                 if (!countryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.COUNTRY_NOT_FOUND + ": Provided country ID is invalid or does not exist.");
//                 countryId = countryDoc._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided country is not a valid ID or null/empty.");
//             }
//         }

//         let stateId = news.state;
//         if (state !== undefined) {
//             if (state === null || state === '') {
//                 stateId = null; // Clear state
//             } else if (isValidObjectId(state)) {
//                 const stateDoc = await State.findById(state);
//                 if (!stateDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.STATE_NOT_FOUND + ": Provided state ID is invalid or does not exist.");
//                 stateId = stateDoc._id;
//                 // Validate if state belongs to the selected country (if both are provided)
//                 if (countryId && convertIdToString(stateDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": State does not belong to the selected country.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided state is not a valid ID or null/empty.");
//             }
//         }

//         let cityId = news.city;
//         if (city !== undefined) {
//             if (city === null || city === '') {
//                 cityId = null; // Clear city
//             } else if (isValidObjectId(city)) {
//                 const cityDoc = await City.findById(city);
//                 if (!cityDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CITY_NOT_FOUND + ": Provided city ID is invalid or does not exist.");
//                 cityId = cityDoc._id;
//                 // Validate if city belongs to the selected state/country (if provided)
//                 if (stateId && convertIdToString(cityDoc.state) !== convertIdToString(stateId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected state.");
//                 }
//                 if (countryId && convertIdToString(cityDoc.country) !== convertIdToString(countryId)) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": City does not belong to the selected country.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided city is not a valid ID or null/empty.");
//             }
//         }

//         // --- Handle Category/SubCategory Updates by ID (Improved validation and default handling) ---
//         let finalCategory = news.category;
//         let categoryDocFound = null; // Used for subCategory validation
//         if (category !== undefined) {
//             if (category === null || category === '') {
//                 finalCategory = null;
//                 finalSubCategory = null; // Also clear subCategory if parent is cleared
//                 finalSubSubCategory = null; // Also clear subSubCategory if parent is cleared
//             } else if (isValidObjectId(category)) {
//                 categoryDocFound = await Category.findById(category); // Find by ID
//                 if (!categoryDocFound) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category ID is invalid or does not exist.");
//                 finalCategory = categoryDocFound._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided category is not a valid ID or null/empty.");
//             }
//         } else {
//             // If category was not provided in req.body, use existing category for subcategory validation if it's a valid ID
//             if (news.category && isValidObjectId(news.category)) {
//                 categoryDocFound = await Category.findById(news.category);
//             }
//         }

//         let finalSubCategory = news.subCategory;
//         if (subCategory !== undefined) {
//             if (subCategory === null || subCategory === '') {
//                 finalSubCategory = null; // Clear subCategory
//                 finalSubSubCategory = null; // Also clear subSubCategory if parent is cleared
//             } else if (isValidObjectId(subCategory)) {
//                 if (!categoryDocFound) {
//                     throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Category not found for subCategory validation. Please provide a valid category first or ensure existing news category is valid.");
//                 }
//                 const subCategoryDoc = await SubCategory.findOne({ _id: subCategory, category: categoryDocFound._id }); // Find by ID and parent category
//                 if (!subCategoryDoc) throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory ID is invalid or does not belong to the selected category.");
//                 finalSubCategory = subCategoryDoc._id;
//             } else {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Provided subCategory is not a valid ID or null/empty.");
//             }
//         } else if (category !== undefined && (category === null || category === '')) {
//             // If category was explicitly cleared, also clear subCategory if not explicitly provided
//             finalSubCategory = null;
//             finalSubSubCategory = null;
//         }

//         let finalSubSubCategory = news.subSubCategory; // Default to existing
//         if (subSubCategory !== undefined) {
//             finalSubSubCategory = subSubCategory === null || subSubCategory === '' ? null : subSubCategory;
//         }


//         // --- Status Update Logic ---
//         let updatedStatus = news.status;
//         if (status !== undefined) {
//             if (!['draft', 'pending_approval', 'posted', 'live', 'rejected'].includes(status)) {
//                 throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST + ": Invalid status provided.");
//             }

//             const currentUser = req.user;

//             if (currentUser.role === 'superadmin' || (currentUser.role === 'admin' && currentUser.adminPermissions.manageNews)) {
//                 updatedStatus = status;
//             }
//             else if (currentUser.role === 'reporter') {
//                 if (status === 'live' && currentUser.canDirectGoLive) {
//                     updatedStatus = status;
//                 } else if (['posted'].includes(status) && currentUser.canDirectPost) {
//                     updatedStatus = status;
//                 } else if (['draft', 'pending_approval'].includes(status)) {
//                     updatedStatus = status;
//                 } else {
//                     throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to set this status.");
//                 }
//             } else {
//                 throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": You do not have permission to update news status.");
//             }
//         }

//         // Prepare fields to update
//         const updateFields = {
//             title_en: title_en !== undefined ? title_en : news.title_en,
//             title_hi: title_hi !== undefined ? title_hi : news.title_hi,
//             content_en: content_en !== undefined ? content_en : news.content_en,
//             content_hi: content_hi !== undefined ? content_hi : news.content_hi,
//             summary_en: summary_en !== undefined ? summary_en : news.summary_en,
//             summary_hi: summary_hi !== undefined ? summary_hi : news.summary_hi,
//             category: finalCategory,
//             subCategory: finalSubCategory,
//             subSubCategory: finalSubSubCategory,
//             tags: finalTags,
//             media: finalNewsMediaObjects,       // ALL media (internal files and external links) go here
//             mediaUrls: [],                     // Explicitly clear this to match `createNews` behavior
//             referenceLinks: finalReferenceLinks,
//             poll: finalPoll,
//             country: countryId,
//             state: stateId,
//             city: cityId,
//             localAddress: localAddress !== undefined ? localAddress : news.localAddress,
//             status: updatedStatus,
//             updatedBy: userId,
//         };

//         // If status changes to posted/live and was not already, update publishedAt
//         if ((updateFields.status === 'posted' || updateFields.status === 'live') && !news.publishedAt && updateFields.status !== news.status) {
//             updateFields.publishedAt = new Date();
//         } else if (updateFields.status !== 'posted' && updateFields.status !== 'live' && news.publishedAt && updateFields.status !== news.status) {
//             // If news goes out of posted/live status, clear publishedAt (optional, depends on logic)
//             // updateFields.publishedAt = null; // Uncomment if this logic is desired
//         }

//         news = await News.findByIdAndUpdate(id, updateFields, {
//             new: true,
//             runValidators: true
//         });

//         // Delete old files from cloud storage AFTER successful DB update
//         for (const url of filesToDeleteFromCloud) {
//             await deleteFileFromSpaces(url).catch(err => console.warn("Failed to delete old media file:", err.message));
//         }

//         // Populate and Format Response
//         const populatedNews = await News.findById(news._id)
//             .populate([
//                 {
//                     path: 'createdBy',
//                     select: 'name email role profileImage country state city address dateOfBirth canDirectPost canDirectGoLive'
//                 },
//                 { path: 'updatedBy', select: 'name email' },
//                 { path: 'category', select: 'name' },
//                 { path: 'subCategory', select: 'name' },
//                 { path: 'country', select: 'name iso2' },
//                 { path: 'state', select: 'name iso2' },
//                 { path: 'city', select: 'name' },
//                 { path: 'likes.user', select: 'name profileImage' },
//                 { path: 'comments.user', select: 'name profileImage' }
//             ]);

//         const finalNewsData = populatedNews.toObject({ virtuals: true });

//         const reporterDetails = populatedNews.createdBy;
//         if (reporterDetails) {
//              const reporterCountry = reporterDetails.country ? await Country.findById(reporterDetails.country._id || reporterDetails.country) : null;
//              const reporterState = reporterDetails.state ? await State.findById(reporterDetails.state._id || reporterDetails.state) : null;
//              const reporterCity = reporterDetails.city ? await City.findById(reporterDetails.city._id || reporterDetails.city) : null;

//             finalNewsData.reporterDetails = {
//                 id: reporterDetails._id,
//                 name: reporterDetails.name,
//                 email: reporterDetails.email,
//                 role: reporterDetails.role,
//                 profileImage: reporterDetails.profileImage,
//                 country: reporterCountry ? reporterCountry.name : (typeof reporterDetails.country === 'object' ? reporterDetails.country.name : reporterDetails.country),
//                 state: reporterState ? reporterState.name : (typeof reporterDetails.state === 'object' ? reporterDetails.state.name : reporterDetails.state),
//                 city: reporterCity ? reporterCity.name : (typeof reporterDetails.city === 'object' ? reporterDetails.city.name : reporterDetails.city),
//                 address: reporterDetails.address,
//                 dateOfBirth: reporterDetails.dateOfBirth,
//                 canDirectPost: reporterDetails.canDirectPost,
//                 canDirectGoLive: reporterDetails.canDirectGoLive,
//             };
//         } else {
//             finalNewsData.reporterDetails = null;
//         }

//         finalNewsData.postedDate = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[0] : null;
//         finalNewsData.postedTime = populatedNews.publishedAt ? populatedNews.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         finalNewsData.createdAtDate = populatedNews.createdAt.toISOString().split('T')[0];
//         finalNewsData.createdAtTime = populatedNews.createdAt.toISOString().split('T')[1].substring(0, 8);
//         finalNewsData.updatedAtDate = populatedNews.updatedAt.toISOString().split('T')[0];
//         finalNewsData.updatedAtTime = populatedNews.updatedAt.toISOString().split('T')[1].substring(0, 8);


//         res.status(STATUS_CODES.SUCCESS).json({
//             success: true,
//             message: MESSAGES.NEWS_UPDATED,
//             data: finalNewsData,
//         });

//     } catch (error) {
//         console.error("Error updating news:", error);
//         next(error);
//     }
// };
export const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id;
        const userRole = req.user?.role;

        const news = await News.findById(id);

        if (!news) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.NEWS_NOT_FOUND);
        }

        // ✅ Role-based rules
        if (userRole === "reporter") {
            // Reporter सिर्फ़ अपनी unpublished news delete कर सकता है
            if (news.createdBy.toString() !== userId.toString()) {
                throw new ApiError(
                    STATUS_CODES.FORBIDDEN,
                    "You are not authorized to delete this news."
                );
            }

            if (news.status === "posted" || news.status === "published") {
                throw new ApiError(
                    STATUS_CODES.FORBIDDEN,
                    "This news has already been published and cannot be deleted by reporter."
                );
            }
        }

        // ✅ Admin और Superadmin किसी की भी news delete कर सकते हैं (published भी)
        if (["admin", "superadmin"].includes(userRole)) {
            // कोई restriction नहीं
        }

        // ❌ बाकी roles delete नहीं कर सकते
        if (!["reporter", "admin", "superadmin"].includes(userRole)) {
            throw new ApiError(
                STATUS_CODES.FORBIDDEN,
                "You are not authorized to delete news."
            );
        }

        // Delete associated files from Spaces
        const filesToDelete = news.media.map(m => m.url);
        for (const url of filesToDelete) {
            await deleteFileFromSpaces(url).catch(err =>
                console.warn("Failed to delete media file during news deletion:", err.message)
            );
        }

        await news.deleteOne();

        res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: MESSAGES.NEWS_DELETED,
            data: {}
        });

    } catch (error) {
        console.error("Error deleting news:", error);
        next(error);
    }
};


export const getAllPublicNews = async (req, res) => {
  try {
    const newsList = await News.find({ status: 'approved' }) // Only approved news
      .sort({ createdAt: -1 }) // Newest first
      .limit(50) // Limit to latest 50 news
      .populate([
        {
          path: 'createdBy',
          select: 'name profileImage role'
        },
        {
          path: 'category',
          select: 'name'
        },
        {
          path: 'subCategory',
          select: 'name'
        },
        {
          path: 'country',
          select: 'name'
        },
        {
          path: 'state',
          select: 'name'
        },
        {
          path: 'city',
          select: 'name'
        }
      ]);

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: MESSAGES.PUBLIC_NEWS_FETCHED_SUCCESS, // Using MESSAGES.PUBLIC_NEWS_FETCHED_SUCCESS
      data: newsList
    });
  } catch (error) {
    console.error('Error fetching public news:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ // Using STATUS_CODES.INTERNAL_SERVER_ERROR
      success: false,
      message: MESSAGES.SERVER_ERROR_FETCHING_PUBLIC_NEWS // Using MESSAGES.SERVER_ERROR_FETCHING_PUBLIC_NEWS
    });
  }
};


// // New Controller Function: Get News by Authenticated Reporter
// export const getNewsByReporter = async (req, res, next) => {
//   try {
//     const userId = req.user?._id;

//     if (!userId) {
//       throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED + ": User ID missing.");
//     }

//     // Ensure the authenticated user is a 'reporter'
//     if (req.user.role !== 'reporter' && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
//       throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": Only reporters, admins, or superadmins can view their created news.");
//     }

//     let query;
//     const reqQuery = { ...req.query };

//     const removeFields = ["select", "sort", "page", "limit"];
//     removeFields.forEach((param) => delete reqQuery[param]);

//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(
//       /\b(gt|gte|lt|lte|in)\b/g,
//       (match) => `$${match}`
//     );
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Filter by the authenticated user's ID
//     finalQueryFilter.createdBy = userId;

//     query = News.find(finalQueryFilter);

//     // Select Fields
//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     // Sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt"); // Default sort by most recent
//     }

//     // Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const total = await News.countDocuments(finalQueryFilter); // Count with filters
//     const totalPages = Math.ceil(total / limit);

//     query = query.skip(startIndex).limit(limit);

//     // Populate related fields
//     query = query.populate([
//       {
//         path: 'createdBy',
//         select: 'name email role profileImage'
//       },
//       { path: 'updatedBy', select: 'name email' },
//       { path: 'category', select: 'name iso2' },
//       { path: 'subCategory', select: 'name iso2' },
//       { path: 'country', select: 'name iso2' },
//       { path: 'state', select: 'name iso2' },
//       { path: 'city', select: 'name' },
//       { path: 'comments.user', select: 'name profileImage' },
//       { path: 'likes.user', select: 'name profileImage' }
//     ]);

//     const news = await query;

//     // Pagination result
//     const pagination = {};
//     if (endIndex < total) {
//       pagination.next = {
//         page: page + 1,
//         limit
//       };
//     }
//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit
//       };
//     }

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       count: news.length,
//       pagination,
//       message: MESSAGES.NEWS_FETCHED_SUCCESS, // Using MESSAGES.NEWS_FETCHED_SUCCESS
//       data: news.map(item => {
//         const newsObj = item.toObject({ virtuals: true }); // Include virtuals (likesCount, commentsCount)
//         newsObj.shareLink = item.shareLink; // Include shareLink
//         // Format dates/times
//         newsObj.postedDate = item.publishedAt ? item.publishedAt.toISOString().split('T')[0] : null;
//         newsObj.postedTime = item.publishedAt ? item.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
//         newsObj.createdAtDate = item.createdAt.toISOString().split('T')[0];
//         newsObj.createdAtTime = item.createdAt.toISOString().split('T')[1].substring(0, 8);
//         newsObj.updatedAtDate = item.updatedAt.toISOString().split('T')[0];
//         newsObj.updatedAtTime = item.updatedAt.toISOString().split('T')[1].substring(0, 8);

//         const currentUserId = req.user?._id?.toString();
//         newsObj.isLikedByCurrentUser = false;

//         if (currentUserId && Array.isArray(newsObj.likes)) {
//             newsObj.isLikedByCurrentUser = newsObj.likes.some(like => {
//                 const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
//                 return likeUserId === currentUserId;
//             });
//         }

//         return newsObj;
//       }),
//       totalPages
//     });

//   } catch (error) {
//     console.error("Error getting news by reporter:", error);
//     next(error);
//   }
// };

// Assuming ApiError, STATUS_CODES, MESSAGES, News, User, etc. are imported or defined.
//////////////////////////////////////// HINDI ENGLISH ////////////////////////////////////////////////////
export const getNewsByReporter = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED + ": User ID missing.");
    }

    // Ensure the authenticated user is a 'reporter'
    if (req.user.role !== 'reporter' && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN + ": Only reporters, admins, or superadmins can view their created news.");
    }

    let query;
    const reqQuery = { ...req.query };

    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    let finalQueryFilter = JSON.parse(queryStr);

    // Filter by the authenticated user's ID
    finalQueryFilter.createdBy = userId;

    query = News.find(finalQueryFilter);

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt"); // Default sort by most recent
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await News.countDocuments(finalQueryFilter); // Count with filters
    const totalPages = Math.ceil(total / limit);

    query = query.skip(startIndex).limit(limit);

    // Populate related fields
    query = query.populate([
      {
        path: 'createdBy',
        select: 'name email role profileImage'
      },
      { path: 'updatedBy', select: 'name email' },
      { path: 'category', select: 'name iso2' },
      { path: 'subCategory', select: 'name iso2' },
      { path: 'country', select: 'name iso2' },
      { path: 'state', select: 'name iso2' },
      { path: 'city', select: 'name' },
      { path: 'comments.user', select: 'name profileImage' },
      { path: 'likes.user', select: 'name profileImage' }
    ]);

    const news = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      count: news.length,
      pagination,
      message: MESSAGES.NEWS_FETCHED_SUCCESS,
      data: news.map(item => {
        const newsObj = item.toObject({ virtuals: true }); // Include virtuals (likesCount, commentsCount)
        newsObj.shareLink = item.shareLink; // Include shareLink
        // Format dates/times
        newsObj.postedDate = item.publishedAt ? item.publishedAt.toISOString().split('T')[0] : null;
        newsObj.postedTime = item.publishedAt ? item.publishedAt.toISOString().split('T')[1].substring(0, 8) : null;
        newsObj.createdAtDate = item.createdAt.toISOString().split('T')[0];
        newsObj.createdAtTime = item.createdAt.toISOString().split('T')[1].substring(0, 8);
        newsObj.updatedAtDate = item.updatedAt.toISOString().split('T')[0];
        newsObj.updatedAtTime = item.updatedAt.toISOString().split('T')[1].substring(0, 8);

        const currentUserId = req.user?._id?.toString();
        newsObj.isLikedByCurrentUser = false;

        if (currentUserId && Array.isArray(newsObj.likes)) {
            newsObj.isLikedByCurrentUser = newsObj.likes.some(like => {
                const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
                return likeUserId === currentUserId;
            });
        }

        return newsObj;
      }),
      totalPages
    });

  } catch (error) {
    console.error("Error getting news by reporter:", error);
    next(error);
  }
};

// ✅ Get Comments of a Specific News

export const getCommentsForNews = async (req, res) => {
  try {
    const { id } = req.params; // newsId

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "News ID is required in params",
      });
    }

    // ✅ populate user inside comments
    const news = await News.findById(id).populate("comments.user", "name profileImage");

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

     res.status(STATUS_CODES.SUCCESS).json({
      status: STATUS_CODES.SUCCESS,
      success: true,
      comments: news.comments, // har comment ke sath user ka name & profileImage bhi aayega
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// export const getAllNewsAPP = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // Remove select and sort
//     const removeFields = ["select", "sort"];
//     removeFields.forEach(param => delete reqQuery[param]);

//     // Mongo operators
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Only posted/live for non-admin users
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     query = News.find(finalQueryFilter);

//     // select
//     if (req.query.select) {
//       const fields = req.query.select.split(",").join(" ");
//       query = query.select(fields);
//     }

//     // sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // populate
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     const news = await query;

//     // Get current user's saved news IDs
//     const currentUserId = req.user?._id?.toString();
//     let savedNewsIds = [];
//     if (currentUserId) {
//       const userSavedNews = await SavedNews.findOne({ user: currentUserId });
//       if (userSavedNews && Array.isArray(userSavedNews.news)) {
//         savedNewsIds = userSavedNews.news.map(n => n.toString());
//       }
//     }

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       count: news.length,
//       message: MESSAGES.NEWS_FETCHED_SUCCESS,
//       data: news.map(item => {
//         const newsObj = item.toObject({ virtuals: true });
        
//         // Dates
//         newsObj.shareLink = item.shareLink;
//         newsObj.postedDate = item.publishedAt ? item.publishedAt.toISOString().split("T")[0] : null;
//         newsObj.postedTime = item.publishedAt ? item.publishedAt.toISOString().split("T")[1].substring(0, 8) : null;
//         newsObj.createdAtDate = item.createdAt.toISOString().split("T")[0];
//         newsObj.createdAtTime = item.createdAt.toISOString().split("T")[1].substring(0, 8);
//         newsObj.updatedAtDate = item.updatedAt.toISOString().split("T")[0];
//         newsObj.updatedAtTime = item.updatedAt.toISOString().split("T")[1].substring(0, 8);

//         // Likes
//         newsObj.isLiked  = false;
//         if (currentUserId && Array.isArray(newsObj.likes)) {
//           newsObj.isLiked = newsObj.likes.some(like => {
//             const likeUserId = like.user?._id ? like.user._id.toString() : like.user?.toString();
//             return likeUserId === currentUserId;
//           });
//         }

//         // Saved news
//         newsObj.isSaved = savedNewsIds.includes(item._id.toString());

//         return newsObj;
//       }),
//     });
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };


// export const getAllNewsAPP = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // Remove select/sort/lang
//     const removeFields = ["select", "sort", "lang"];
//     removeFields.forEach(param => delete reqQuery[param]);

//     // Mongo operators
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Only posted/live for non-admin users
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     // ✅ Default language = Hindi
//     const lang = req.query.lang === "en" ? "en" : "hi";

//     query = News.find(finalQueryFilter);

//     // ✅ language-wise select
//     let selectFieldsCommon =
//       "slug_en category subCategory country state city media createdBy updatedBy publishedAt status";

//     let selectFieldsLang =
//       lang === "hi"
//         ? "title_hi content_hi summary_hi title_en content_en summary_en"
//         : "title_en content_en summary_en title_hi content_hi summary_hi";

//     query = query.select(`${selectFieldsLang} ${selectFieldsCommon}`);

//     // sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // populate
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     const news = await query;

//     // ✅ Format final output cleanly
//     const filteredData = news
//       .map(item => {
//         const obj = item.toObject();

//         // Language logic
//         const isHindi = lang === "hi";

//         const title = isHindi
//           ? obj.title_hi || obj.title_en || ""
//           : obj.title_en || obj.title_hi || "";
//         const summary = isHindi
//           ? obj.summary_hi || obj.summary_en || ""
//           : obj.summary_en || obj.summary_hi || "";
//         const content = isHindi
//           ? obj.content_hi || obj.content_en || ""
//           : obj.content_en || obj.content_hi || "";

//         // Skip empty ones
//         if (!title && !summary && !content) return null;

//         // Return clean keys only
//         return {
//           _id: obj._id,
//           slug: obj.slug_en,
//           title,
//           summary,
//           content,
//           category: obj.category,
//           subCategory: obj.subCategory,
//           country: obj.country,
//           state: obj.state,
//           city: obj.city,
//           media: obj.media,
//           createdBy: obj.createdBy,
//           updatedBy: obj.updatedBy,
//           publishedAt: obj.publishedAt,
//           status: obj.status,
//         };
//       })
//       .filter(item => item !== null);

//     res.status(200).json({
//       success: true,
//       count: filteredData.length,
//       message: "News fetched successfully",
//       data: filteredData,
//     });
//   } catch (error) {
//     console.error("Error getting all news:", error);
//     next(error);
//   }
// };


// export const getAllNewsAPP = async (req, res, next) => {
//   try {
//     let query;
//     const reqQuery = { ...req.query };

//     // Remove select/sort/lang
//     const removeFields = ["select", "sort", "lang"];
//     removeFields.forEach(param => delete reqQuery[param]);

//     // Mongo operators
//     let queryStr = JSON.stringify(reqQuery);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
//     let finalQueryFilter = JSON.parse(queryStr);

//     // Only posted/live for non-admin users
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       finalQueryFilter.status = { $in: ["posted", "live"] };
//     }

//     // ✅ Default language (en/hi)
//     const lang = req.query.lang === "en" ? "en" : "hi";

//     query = News.find(finalQueryFilter);

//     // ✅ language-wise select
//     let selectFieldsCommon =
//       "slug_en slug_hi category subCategory country state city media createdBy updatedBy publishedAt status";

//     let selectFieldsLang =
//       lang === "hi"
//         ? "title_hi content_hi summary_hi"
//         : "title_en content_en summary_en";

//     query = query.select(`${selectFieldsLang} ${selectFieldsCommon}`);

//     // sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // populate
//     query = query.populate([
//       { path: "createdBy", select: "name email role profileImage" },
//       { path: "updatedBy", select: "name email" },
//       { path: "category", select: "name iso2" },
//       { path: "subCategory", select: "name iso2" },
//       { path: "country", select: "name iso2" },
//       { path: "state", select: "name iso2" },
//       { path: "city", select: "name" },
//       { path: "comments.user", select: "name profileImage" },
//       { path: "likes.user", select: "name profileImage" },
//     ]);

//     const news = await query;

//     // ✅ Output format same as getAllNews
//     const filteredData = news
//       .map(item => {
//         const obj = item.toObject();

//         if (lang === "hi") {
//           if (!obj.title_hi && !obj.content_hi && !obj.summary_hi) return null;

//           // Keep same Hindi keys
//           obj.title_hi = obj.title_hi;
//           obj.content_hi = obj.content_hi;
//           obj.summary_hi = obj.summary_hi;
//         } else {
//           if (!obj.title_en && !obj.content_en && !obj.summary_en) return null;

//           // English values mapped to Hindi keys
//           obj.title_hi = obj.title_en;
//           obj.content_hi = obj.content_en;
//           obj.summary_hi = obj.summary_en;

//           // Remove English keys to keep uniform structure
//           delete obj.title_en;
//           delete obj.content_en;
//           delete obj.summary_en;
//         }

//         return obj;
//       })
//       .filter(item => item !== null);

//     res.status(200).json({
//       success: true,
//       count: filteredData.length,
//       message: "News fetched successfully",
//       data: filteredData,
//     });
//   } catch (error) {
//     console.error("Error getting all news (APP):", error);
//     next(error);
//   }
// };

export const getAllNewsAPP = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };

    // ✅ Pagination params
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10; // हर कैटेगरी की 7 खबरें    
    const skip = (page - 1) * limit;

    // Remove select/sort/lang/page/limit
    const removeFields = ["select", "sort", "lang", "page", "limit"];
    removeFields.forEach(param => delete reqQuery[param]);     

    // Mongo operators
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );

    let finalQueryFilter = JSON.parse(queryStr);

    // ✅ Only posted/live for non-admin users
    if (
      !req.user ||
      (req.user.role !== "admin" &&
        req.user.role !== "superadmin")
    ) {
      finalQueryFilter.status = { $in: ["posted", "live"] };
    }

    // ✅ Default language
    const lang = req.query.lang === "en" ? "en" : "hi";

    // ✅ Total count
    const total = await News.countDocuments(finalQueryFilter);

    query = News.find(finalQueryFilter);

    // ✅ Language-wise select
    let selectFieldsCommon =
      "slug_en slug_hi category subCategory country state city media createdBy updatedBy publishedAt status createdAt";

    let selectFieldsLang =
      lang === "hi"
        ? "title_hi content_hi summary_hi"
        : "title_en content_en summary_en";

    query = query.select(
      `${selectFieldsLang} ${selectFieldsCommon}`
    );

    // ✅ Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // ✅ Pagination
    query = query.skip(skip).limit(limit);

    // ✅ Populate
    query = query.populate([
      {
        path: "createdBy",
        select: "name email role profileImage",
      },
      {
        path: "updatedBy",
        select: "name email",
      },
      {
        path: "category",
        select: "name iso2",
      },
      {
        path: "subCategory",
        select: "name iso2",
      },
      {
        path: "country",
        select: "name iso2",
      },
      {
        path: "state",
        select: "name iso2",
      },
      {
        path: "city",
        select: "name",
      },
      {
        path: "comments.user",
        select: "name profileImage",
      },
      {
        path: "likes.user",
        select: "name profileImage",
      },
    ]);

    const news = await query;

    // ✅ Output format
    const filteredData = news
      .map(item => {
        const obj = item.toObject();

        if (lang === "hi") {
          if (
            !obj.title_hi &&
            !obj.content_hi &&
            !obj.summary_hi
          ) {
            return null;
          }
        } else {
          if (
            !obj.title_en &&
            !obj.content_en &&
            !obj.summary_en
          ) {
            return null;
          }

          // ✅ Map English to Hindi keys
          obj.title_hi = obj.title_en;
          obj.content_hi = obj.content_en;
          obj.summary_hi = obj.summary_en;

          delete obj.title_en;
          delete obj.content_en;
          delete obj.summary_en;
        }

        return obj;
      })
      .filter(item => item !== null);

    // ✅ Pagination response
    const pagination = {};

    if (skip + limit < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: filteredData.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      pagination,
      message: "News fetched successfully",
      data: filteredData,
    });
  } catch (error) {
    console.error("Error getting all news (APP):", error);
    next(error);
  }
};

;

// export const getAllNewsAPP = async (req, res, next) => {
//   try {
//     // 1. पेजिनेशन पैरामीटर्स (न्यूज़ के लिए)
//     const page = parseInt(req.query.page, 10) || 1; 
//     const limit = 5; // हर कैटेगरी की 10 खबरें
//     const skip = (page - 1) * limit;

//     // 2. भाषा का चुनाव
//     const lang = req.query.lang === "en" ? "en" : "hi";

//     // 3. बेस फिल्टर (सिर्फ लाइव खबरें)
//     let baseFilter = {};
//     if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
//       baseFilter.status = { $in: ["posted", "live"] };
//     }

//     // 4. सारी कैटेगरीज निकालें
//     const categories = await Category.find();

//     // 5. हर कैटेगरी के लिए न्यूज़ निकालें (पेजिनेशन के साथ)
//     const categoryWiseData = await Promise.all(
//       categories.map(async (cat) => {
//         // इस कैटेगरी के लिए फिल्टर
//         const newsFilter = { ...baseFilter, category: cat._id };

//         // न्यूज़ निकालें: skip और limit का इस्तेमाल करके
//         let newsItems = await News.find(newsFilter)
//           .sort("-createdAt")
//           .skip(skip)   // अगले पेज के लिए न्यूज़ छोड़ें
//           .limit(limit) // सिर्फ 10 न्यूज़ लें
//           .populate([
//             { path: "createdBy", select: "name profileImage" },
//             { path: "category", select: "name slug" },
//             { path: "state", select: "name" },
//             { path: "city", select: "name" }
//           ]);

//         // अगर इस पेज पर इस कैटेगरी में कोई न्यूज़ नहीं है, तो null भेजें
//         if (newsItems.length === 0) return null;

//         // डेटा फॉर्मेटिंग (English to Hindi mapping)
//         const formattedNews = newsItems.map(item => {
//           const obj = item.toObject();
//           if (lang === "hi") {
//             if (!obj.title_hi) return null;
//           } else {
//             if (!obj.title_en) return null;
//             // इंग्लिश वैल्यूज को हिंदी कीज़ (keys) में डालना
//             obj.title_hi = obj.title_en;
//             obj.content_hi = obj.content_en;
//             obj.summary_hi = obj.summary_en;
//             obj.slug_hi = obj.slug_en;
//             delete obj.title_en; delete obj.content_en; delete obj.summary_en; delete obj.slug_en;
//           }
//           return obj;
//         }).filter(n => n !== null);

//         return {
//           categoryName: cat.name,
//           categoryId: cat._id,
//           categorySlug: cat.slug,
//           newsCount: formattedNews.length,
//           news: formattedNews
//         };
//       })
//     );

//     // खाली डेटा को हटा दें
//     const finalData = categoryWiseData.filter(item => item !== null);

//     res.status(200).json({
//       success: true,
//       currentPage: page,
//       message: `Page ${page}: हर कैटेगरी की 10 खबरें लोड की गई हैं`,
//       data: finalData,
//     });

//   } catch (error) {
//     console.error("Error in getAllNewsAPP:", error);
//     next(error);
//   }
// };

export const getNewsByCategoryAPP = async (req, res, next) => {
  try {
    // =========================
    // 1. Params & Pagination
    // =========================
    const { categoryId } = req.params;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const skip = (page - 1) * limit;

    // =========================
    // 2. Language
    // =========================
    const lang = req.query.lang === "en" ? "en" : "hi";

    // =========================
    // 3. Base Filter
    // =========================
    let filter = {
      category: categoryId,
    };

    // Admin / Superadmin सब देख सकते हैं
    if (
      !req.user ||
      (req.user.role !== "admin" &&
        req.user.role !== "superadmin")
    ) {
      filter.status = { $in: ["posted", "live"] };
    }

    // =========================
    // 4. Category Check
    // =========================
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // =========================
    // 5. Total News Count
    // =========================
    const totalNews = await News.countDocuments(filter);

    // =========================
    // 6. Fetch News
    // =========================
    let newsItems = await News.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit)
      .populate([
        {
          path: "createdBy",
          select: "name profileImage",
        },
        {
          path: "category",
          select: "name slug",
        },
        {
          path: "state",
          select: "name",
        },
        {
          path: "city",
          select: "name",
        },
      ]);

    // =========================
    // 7. Language Formatting
    // =========================
    const formattedNews = newsItems
      .map((item) => {
        const obj = item.toObject({
          virtuals: true,
        });

        // Likes & Comments Count
        obj.likesCount = obj.likes?.length || 0;
        obj.commentsCount = obj.comments?.length || 0;

        if (lang === "hi") {
          // Hindi only
          if (!obj.title_hi) return null;
        } else {
          // English Mapping
          if (!obj.title_en) return null;

          obj.title_hi = obj.title_en;
          obj.content_hi = obj.content_en;
          obj.summary_hi = obj.summary_en;
          obj.slug_hi = obj.slug_en;

          delete obj.title_en;
          delete obj.content_en;
          delete obj.summary_en;
          delete obj.slug_en;
        }

        return obj;
      })
      .filter((n) => n !== null);

    // =========================
    // 8. Response
    // =========================
    res.status(200).json({
      success: true,

      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalNews / limit),
        totalNews,
        limit,
        hasNextPage: page < Math.ceil(totalNews / limit),
        hasPrevPage: page > 1,
      },

      newsCount: formattedNews.length,

      data: formattedNews,
    });
  } catch (error) {
    console.error(
      "Error in getNewsByCategoryAPP:",
      error
    );

    next(error);
  }
};

export const downloadNewsPDF = async (req, res) => {
  try {
    const { startDate, endDate, language } = req.query;

    if (!startDate || !endDate || !language) {
      return res.status(400).json({
        success: false,
        message: "Please provide startDate, endDate, and language.",
      });
    }

    // ✅ Query conditions object
    let queryConditions = {
      createdAt: {
        $gte: new Date(`${startDate}T00:00:00Z`),
        $lte: new Date(`${endDate}T23:59:59Z`),
      },
    };

    // ✅ Add language-specific content check to the query
    if (language === "english") {
      queryConditions.$or = [
        { title_en: { $exists: true, $ne: null, $ne: '' } }, // Title exists and is not empty
        { summary_en: { $exists: true, $ne: null, $ne: '' } }, // Summary exists and is not empty
        { content_en: { $exists: true, $ne: null, $ne: '' } }  // Content exists and is not empty
      ];
    } else if (language === "hindi") {
      queryConditions.$or = [
        { title_hi: { $exists: true, $ne: null, $ne: '' } },
        { summary_hi: { $exists: true, $ne: null, $ne: '' } },
        { content_hi: { $exists: true, $ne: null, $ne: '' } }
      ];
    }

    // ✅ Fetch News Data from MongoDB with language filter
    const newsList = await News.find(queryConditions) // ✅ यहाँ queryConditions का उपयोग किया गया है
      .populate("createdBy", "name email")
      .populate("category", "name_en name_hi")
      .sort({ createdAt: -1 });

    if (!newsList.length) {
      return res.status(404).json({
        success: false,
        message: `No ${language} news found in the selected date range with available content.`, // ✅ अधिक विशिष्ट संदेश
      });
    }

    // ✅ Font Paths (Check Hindi Font)
    const hindiFontPath = path.resolve("fonts/NotoSerifDevanagari-Regular.ttf");
    if (!fs.existsSync(hindiFontPath)) {
      console.error(`Hindi font not found at: ${hindiFontPath}`);
      return res.status(500).json({
        success: false,
        message: `Hindi font not found at: ${hindiFontPath}\nPlease download from:\nhttps://fonts.google.com/noto/specimen/Noto+Serif+Devanagari`,
      });
    }

    // ✅ Define Fonts
    const fonts = {
      NotoSerifDevanagari: {
        normal: hindiFontPath,
        bold: hindiFontPath,
        italics: hindiFontPath,
        bolditalics: hindiFontPath,
      },
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };

    const printer = new PdfPrinter(fonts);

    // ✅ Clean text (Keep Unicode safe)
    const cleanText = (text) =>
      text ? text.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() : "";

    // ✅ Build PDF content - Conditional rendering based on language
    const content = [
      { text: "📰 EMS News Report", style: "header", font: "Helvetica" },
      {
        text: `Date Range: ${startDate} → ${endDate}\nGenerated On: ${new Date().toLocaleString()}`,
        style: "subheader",
        font: "Helvetica",
      },
      { text: "\n" },
    ];

    newsList.forEach((news, index) => {
      if (index > 0) { // पहले आइटम के लिए विभाजक नहीं, बाकी के लिए
        content.push(
          { text: "\n──────────────────────────────────────────────\n", font: "Helvetica" }
        );
      }

      if (language === "english") {
        content.push(
          {
            text: `${index + 1}. ${cleanText(news.title_en) || "No English Title"}`,
            style: "title_en",
            font: "Helvetica",
          },
          {
            text: `Published: ${
              news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString()
                : "N/A"
            } | Author: ${news.createdBy?.name || "Unknown"}`,
            style: "meta",
            font: "Helvetica",
          },
          {
            text: `Category: ${news.category?.name_en || "N/A"}`,
            style: "meta",
            font: "Helvetica",
          },
          {
            text: `\nSummary (English):\n${cleanText(news.summary_en) || "No English Summary"}`,
            style: "summary_en",
            font: "Helvetica",
          },
          {
            text: `\nEnglish Content:\n${cleanText(news.content_en) || "No English Content"}`,
            style: "content_en",
            font: "Helvetica",
          }
        );
      } else if (language === "hindi") {
        content.push(
          {
            text: `${index + 1}. ${news.title_hi ? cleanText(news.title_hi) : "कोई हिंदी शीर्षक नहीं"}`,
            style: "title_hi",
            font: "NotoSerifDevanagari",
          },
          {
            text: `प्रकाशित: ${
              news.publishedAt
                ? new Date(news.publishedAt).toLocaleDateString("hi-IN")
                : "N/A"
            } | लेखक: ${news.createdBy?.name || "अज्ञात"}`,
            style: "meta",
            font: "NotoSerifDevanagari",
          },
          {
            text: `श्रेणी: ${news.category?.name_hi || "N/A"}`,
            style: "meta",
            font: "NotoSerifDevanagari",
          },
          {
            text: `\nसारांश (हिंदी):\n${cleanText(news.summary_hi) || "कोई हिंदी सारांश नहीं"}`,
            style: "summary_hi",
            font: "NotoSerifDevanagari",
          },
          {
            text: `\nहिन्दी सामग्री:\n${cleanText(news.content_hi) || "कोई हिंदी सामग्री नहीं"}`,
            style: "content_hi",
            font: "NotoSerifDevanagari",
          }
        );
      }
    });

    // ✅ PDF Document Definition
    const docDefinition = {
      content,
      defaultStyle: { font: "Helvetica" },
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: "center",
          margin: [0, 10, 0, 10],
          font: "Helvetica"
        },
        subheader: {
          fontSize: 12,
          alignment: "center",
          color: "gray",
          margin: [0, 0, 0, 10],
          font: "Helvetica"
        },
        title_en: { fontSize: 14, bold: true, color: "#1a73e8", margin: [0, 5, 0, 2] },
        summary_en: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
        content_en: { fontSize: 11, margin: [0, 4, 0, 6] },
        title_hi: { fontSize: 13, bold: true, margin: [0, 4, 0, 5] },
        summary_hi: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
        content_hi: { fontSize: 11, margin: [0, 4, 0, 6] },
        meta: { fontSize: 10, color: "gray", margin: [0, 2, 0, 2] },
      },
      footer: (currentPage, pageCount) => ({
        text: `Page ${currentPage} of ${pageCount} • EMS Report`,
        alignment: "center",
        fontSize: 9,
        color: "gray",
        font: language === "hindi" ? "NotoSerifDevanagari" : "Helvetica",
      }),
      pageMargins: [40, 40, 40, 40],
    };

    // ✅ Generate and Send PDF
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=News_Report_${startDate}_to_${endDate}_${language}.pdf`
      );
      res.send(pdfBuffer);
    });
    pdfDoc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
      error: error.message,
    });
  }
};



// // news.controller.js में जोड़ें
// export const shareNewsPreview = async (req, res) => {
//   try {
//     const news = await News.findById(req.params.id);
//     if (!news) return res.status(404).send("खबर नहीं मिली");

//     const title = news.title_hi || news.title_en;
//     const image = news.media?.[0]?.url || "";
//     // आपकी वेबसाइट का असली पता
//     const frontendUrl = `https://news.aasmo.in/news/news-${news._id}`;

//     // यह HTML व्हाट्सएप का बोट पढ़ेगा और फोटो दिखाएगा
//     const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="UTF-8">
//           <title>${title}</title>
//           <meta property="og:title" content="${title}" />
//           <meta property="og:image" content="${image}" />
//           <meta property="og:description" content="ताज़ा और सटीक खबरें सबसे पहले - Aasmo News" />
//           <meta property="og:url" content="${frontendUrl}" />
//           <meta property="og:type" content="article" />
//           <meta name="twitter:card" content="summary_large_image" />
//           <script>
//             // इंसान के क्लिक करते ही असली खबर पर भेज दो
//             window.location.href = "${frontendUrl}";
//           </script>
//         </head>
//         <body>
//           <p>Redirecting to: ${title}</p>
//         </body>
//       </html>
//     `;
//     res.setHeader('Content-Type', 'text/html');
//     res.status(200).send(html);
//   } catch (error) {
//     res.status(500).send("सर्वर एरर");
//   }
// };


  

// export const shareNewsPreview = async (req, res) => {
//  try {
//     const slug = req.params.slug;
//     const newsId = slug.split("-").pop();
//     const news = await newsModel.findById(newsId);

//     if (!news) return res.status(404).send("Not found");

//     const title = news.title_hi || news.title_en || "Aasmo News";
//     const desc = news.short_description || "";
//     const image = news.media?.[0]?.url ||
//       "https://uma-classees.blr1.digitaloceanspaces.com/news-media/b4055033-663c-4a98-b0cf-b4bf8bee7dd8.avif";

//     const newsUrl = `https://news.aasmo.in/news/${slug}`;

//     res.send(`
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8" />

//   <meta property="og:title" content="${title}" />
//   <meta property="og:description" content="${desc}" />
//   <meta property="og:image" content="${image}" />
//   <meta property="og:image:width" content="1200" />
//   <meta property="og:image:height" content="630" />
//   <meta property="og:url" content="${newsUrl}" />
//   <meta name="twitter:card" content="summary_large_image" />

//   <title>${title}</title>

//   <script>
//     window.location.href="${newsUrl}";
//   </script>
// </head>
// <body></body>
// </html>
//     `);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };




export const shareNewsPreview = async (req, res) => {
  try {
    const frontendBaseUrl = normalizeBaseUrl(process.env.FRONTEND_BASE_URL);
    const slug = String(req.params.slug || "").trim();
    const newsId = slug.split("-").pop();

    if (!slug || !isValidObjectId(newsId)) {
      return res.status(400).type("text/plain").send("Invalid article slug");
    }

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).type("text/plain").send("News not found");
    }

    const title = toPlainText(news.title_hi || news.title_en, 160) || "EMS-News";
    const description =
      toPlainText(
        news.short_description ||
          news.summary_hi ||
          news.summary_en ||
          news.content_hi ||
          news.content_en ||
          news.content,
        300,
      ) || "Read the full article on EMS-News.";
    const imageSource = news.media?.find((item) => item.type !== "video")?.url;
    const imageUrl = getPublicImageUrl(
      imageSource,
      frontendBaseUrl,
      process.env.BACKEND_PUBLIC_URL,
    );
    const articleUrl = `${frontendBaseUrl}/news/${encodeURIComponent(slug)}`;
    const html = buildSharePreviewHtml({
      articleUrl,
      description,
      imageUrl,
      title,
    });

    res
      .status(200)
      .set({
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Content-Type": "text/html; charset=utf-8",
      })
      .send(html);
  } catch (err) {
    console.error("Failed to render news share preview:", err);
    res.status(500).type("text/plain").send("Server Error");
  }
};

// export const downloadNewsPDF = async (req, res) => {
//   try {
//     const { startDate, endDate, language } = req.query; // ✅ यहाँ 'language' को destructure किया गया है

//     if (!startDate || !endDate || !language) { // ✅ language चेक भी जोड़ा गया
//       return res.status(400).json({
//         success: false,
//         message: "Please provide startDate, endDate, and language.",
//       });
//     }

//     // ✅ Fetch News Data from MongoDB
//     const newsList = await News.find({
//       createdAt: {
//         $gte: new Date(`${startDate}T00:00:00Z`),
//         $lte: new Date(`${endDate}T23:59:59Z`),
//       },
//     })
//       .populate("createdBy", "name email")
//       .populate("category", "name_en name_hi") // English और Hindi दोनों नाम अभी भी fetch करें
//       .sort({ createdAt: -1 });

//     if (!newsList.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No news found in the selected date range.",
//       });
//     }

//     // ✅ Font Paths (Check Hindi Font)
//     const hindiFontPath = path.resolve("fonts/NotoSerifDevanagari-Regular.ttf");
//     if (!fs.existsSync(hindiFontPath)) {
//       console.error(`Hindi font not found at: ${hindiFontPath}`);
//       return res.status(500).json({
//         success: false,
//         message: `Hindi font not found at: ${hindiFontPath}\nPlease download from:\nhttps://fonts.google.com/noto/specimen/Noto+Serif+Devanagari`,
//       });
//     }

//     // ✅ Define Fonts
//     const fonts = {
//       NotoSerifDevanagari: {
//         normal: hindiFontPath,
//         bold: hindiFontPath,
//         italics: hindiFontPath,
//         bolditalics: hindiFontPath,
//       },
//       Helvetica: {
//         normal: "Helvetica",
//         bold: "Helvetica-Bold",
//         italics: "Helvetica-Oblique",
//         bolditalics: "Helvetica-BoldOblique",
//       },
//     };

//     const printer = new PdfPrinter(fonts);

//     // ✅ Clean text (Keep Unicode safe)
//     const cleanText = (text) =>
//       text ? text.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() : "";

//     // ✅ Build PDF content - Conditional rendering based on language
//     const content = [
//       { text: "📰 EMS News Report", style: "header", font: "Helvetica" },
//       {
//         text: `Date Range: ${startDate} → ${endDate}\nGenerated On: ${new Date().toLocaleString()}`,
//         style: "subheader",
//         font: "Helvetica",
//       },
//       { text: "\n" },
//     ];

//     newsList.forEach((news, index) => {
//       // प्रत्येक न्यूज़ आइटम के लिए एक विभाजक जोड़ें
//       content.push(
//         { text: "\n──────────────────────────────────────────────\n", font: "Helvetica" }
//       );

//       if (language === "english") {
//         content.push(
//           {
//             text: `${index + 1}. ${cleanText(news.title_en) || "No English Title"}`,
//             style: "title_en",
//             font: "Helvetica",
//           },
//           {
//             text: `Published: ${
//               news.publishedAt
//                 ? new Date(news.publishedAt).toLocaleDateString()
//                 : "N/A"
//             } | Author: ${news.createdBy?.name || "Unknown"}`,
//             style: "meta",
//             font: "Helvetica",
//           },
//           {
//             text: `Category: ${news.category?.name_en || "N/A"}`, // केवल English category नाम
//             style: "meta",
//             font: "Helvetica",
//           },
//           {
//             text: `\nSummary (English):\n${cleanText(news.summary_en)}`,
//             style: "summary_en",
//             font: "Helvetica",
//           },
//           {
//             text: `\nEnglish Content:\n${cleanText(news.content_en)}`,
//             style: "content_en",
//             font: "Helvetica",
//           }
//         );
//       } else if (language === "hindi") {
//         content.push(
//           {
//             text: `${index + 1}. ${news.title_hi ? cleanText(news.title_hi) : "कोई हिंदी शीर्षक नहीं"}`,
//             style: "title_hi",
//             font: "NotoSerifDevanagari",
//           },
//           {
//             text: `प्रकाशित: ${
//               news.publishedAt
//                 ? new Date(news.publishedAt).toLocaleDateString("hi-IN") // हिंदी डेट फॉर्मेट
//                 : "N/A"
//             } | लेखक: ${news.createdBy?.name || "अज्ञात"}`,
//             style: "meta",
//             font: "NotoSerifDevanagari", // मेटाडेटा के लिए हिंदी फॉन्ट
//           },
//           {
//             text: `श्रेणी: ${news.category?.name_hi || "N/A"}`, // केवल Hindi category नाम
//             style: "meta",
//             font: "NotoSerifDevanagari",
//           },
//           {
//             text: `\nसारांश (हिंदी):\n${cleanText(news.summary_hi)}`,
//             style: "summary_hi",
//             font: "NotoSerifDevanagari",
//           },
//           {
//             text: `\nहिन्दी सामग्री:\n${cleanText(news.content_hi)}`,
//             style: "content_hi",
//             font: "NotoSerifDevanagari",
//           }
//         );
//       }
//     });

//     // अंतिम विभाजक को हटा दें यदि यह मौजूद है (वैकल्पिक, स्वच्छ आउटपुट के लिए)
//     if (content.length > 0 && content[content.length - 1].text === "\n──────────────────────────────────────────────\n") {
//         content.pop();
//     }

//     // ✅ PDF Document Definition
//     const docDefinition = {
//       content,
//       defaultStyle: { font: "Helvetica" }, // डिफ़ॉल्ट रूप से Helvetica, हिंदी के लिए स्पष्ट रूप से सेट किया गया है
//       styles: {
//         header: {
//           fontSize: 20,
//           bold: true,
//           alignment: "center",
//           margin: [0, 10, 0, 10],
//           font: "Helvetica" // सुनिश्चित करें कि हेडर हमेशा Helvetica में हो
//         },
//         subheader: {
//           fontSize: 12,
//           alignment: "center",
//           color: "gray",
//           margin: [0, 0, 0, 10],
//           font: "Helvetica" // सुनिश्चित करें कि सबहेडर हमेशा Helvetica में हो
//         },
//         // English Styles
//         title_en: { fontSize: 14, bold: true, color: "#1a73e8", margin: [0, 5, 0, 2] },
//         summary_en: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
//         content_en: { fontSize: 11, margin: [0, 4, 0, 6] },
//         // Hindi Styles
//         title_hi: { fontSize: 13, bold: true, margin: [0, 4, 0, 5] },
//         summary_hi: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
//         content_hi: { fontSize: 11, margin: [0, 4, 0, 6] },
//         meta: { fontSize: 10, color: "gray", margin: [0, 2, 0, 2] }, // इस स्टाइल में फ़ॉन्ट को सामग्री में सेट किया जाएगा
//       },
//       footer: (currentPage, pageCount) => ({
//         text: `Page ${currentPage} of ${pageCount} • EMS Report`,
//         alignment: "center",
//         fontSize: 9,
//         color: "gray",
//         font: language === "hindi" ? "NotoSerifDevanagari" : "Helvetica", // फुटर फ़ॉन्ट को भाषा के अनुसार सेट करें
//       }),
//       pageMargins: [40, 40, 40, 40],
//     };

//     // ✅ Generate and Send PDF
//     const pdfDoc = printer.createPdfKitDocument(docDefinition);
//     const chunks = [];
//     pdfDoc.on("data", (chunk) => chunks.push(chunk));
//     pdfDoc.on("end", () => {
//       const pdfBuffer = Buffer.concat(chunks);
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=News_Report_${startDate}_to_${endDate}_${language}.pdf` // ✅ फ़ाइल नाम में भाषा जोड़ें
//       );
//       res.send(pdfBuffer);
//     });
//     pdfDoc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate PDF",
//       error: error.message,
//     });
//   }
// };

// export const downloadNewsPDF = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both startDate and endDate.",
//       });
//     }

//     // ✅ Fetch News Data from MongoDB
//     const newsList = await News.find({
//       createdAt: {
//         $gte: new Date(`${startDate}T00:00:00Z`),
//         $lte: new Date(`${endDate}T23:59:59Z`),
//       },
//     })
//       .populate("createdBy", "name email")
//       .populate("category", "name_en name_hi")
//       .sort({ createdAt: -1 });

//     if (!newsList.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No news found in the selected date range.",
//       });
//     }

//     // ✅ Font Paths (Check Hindi Font)
//     const hindiFontPath = path.resolve("fonts/NotoSerifDevanagari-Regular.ttf");
//     if (!fs.existsSync(hindiFontPath)) {
//       return res.status(500).json({
//         success: false,
//         message: `Hindi font not found at: ${hindiFontPath}\nPlease download from:\nhttps://fonts.google.com/noto/specimen/Noto+Serif+Devanagari`,
//       });
//     }

//     // ✅ Define Fonts
//     const fonts = {
//       NotoSerifDevanagari: {
//         normal: hindiFontPath,
//         bold: hindiFontPath,
//         italics: hindiFontPath,
//         bolditalics: hindiFontPath,
//       },
//       Helvetica: {
//         normal: "Helvetica",
//         bold: "Helvetica-Bold",
//         italics: "Helvetica-Oblique",
//         bolditalics: "Helvetica-BoldOblique",
//       },
//     };

//     const printer = new PdfPrinter(fonts);

//     // ✅ Clean text (Keep Unicode safe)
//     const cleanText = (text) =>
//       text ? text.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() : "";

//     // ✅ Build PDF content
//     const content = [
//       { text: "📰 EMS News Report", style: "header", font: "Helvetica" },
//       {
//         text: `Date Range: ${startDate} → ${endDate}\nGenerated On: ${new Date().toLocaleString()}`,
//         style: "subheader",
//         font: "Helvetica",
//       },
//       { text: "\n" },
//     ];

//     newsList.forEach((news, index) => {
//       content.push(
//         {
//           text: `${index + 1}. ${cleanText(news.title_en) || "No English Title"}`,
//           style: "title_en",
//           font: "Helvetica",
//         },
//         {
//           text: news.title_hi ? cleanText(news.title_hi) : "",
//           style: "title_hi",
//           font: "NotoSerifDevanagari",
//         },
//         {
//           text: `Published: ${
//             news.publishedAt
//               ? new Date(news.publishedAt).toLocaleDateString()
//               : "N/A"
//           } | Author: ${news.createdBy?.name || "Unknown"}`,
//           style: "meta",
//           font: "Helvetica",
//         },
//         {
//           text: `Category: ${news.category?.name_en || "N/A"} (${
//             news.category?.name_hi || ""
//           })`,
//           style: "meta",
//           font: "Helvetica",
//         },

//         // English Summary + Content
//         {
//           text: `\nSummary (English):\n${cleanText(news.summary_en)}`,
//           style: "summary_en",
//           font: "Helvetica",
//         },
//         {
//           text: `\nEnglish Content:\n${cleanText(news.content_en)}`,
//           style: "content_en",
//           font: "Helvetica",
//         },
//         { text: "\n──────────────────────────────────────────────\n", font: "Helvetica" },

//         // Hindi Summary + Content
//         {
//           text: `\nसारांश (Hindi):\n${cleanText(news.summary_hi)}`,
//           style: "summary_hi",
//           font: "NotoSerifDevanagari",
//         },
//         {
//           text: `\nहिन्दी सामग्री:\n${cleanText(news.content_hi)}`,
//           style: "content_hi",
//           font: "NotoSerifDevanagari",
//         },
//         { text: "\n──────────────────────────────────────────────\n", font: "Helvetica" }
//       );
//     });

//     // ✅ PDF Document Definition
//     const docDefinition = {
//       content,
//       defaultStyle: { font: "NotoSerifDevanagari" },
//       styles: {
//         header: {
//           fontSize: 20,
//           bold: true,
//           alignment: "center",
//           margin: [0, 10, 0, 10],
//         },
//         subheader: {
//           fontSize: 12,
//           alignment: "center",
//           color: "gray",
//           margin: [0, 0, 0, 10],
//         },
//         title_en: { fontSize: 14, bold: true, color: "#1a73e8", margin: [0, 5, 0, 2] },
//         summary_en: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
//         content_en: { fontSize: 11, margin: [0, 4, 0, 6] },
//         title_hi: { fontSize: 13, bold: true, margin: [0, 4, 0, 5] },
//         summary_hi: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
//         content_hi: { fontSize: 11, margin: [0, 4, 0, 6] },
//         meta: { fontSize: 10, color: "gray", margin: [0, 2, 0, 2] },
//       },
//       footer: (currentPage, pageCount) => ({
//         text: `Page ${currentPage} of ${pageCount} • EMS Report`,
//         alignment: "center",
//         fontSize: 9,
//         color: "gray",
//       }),
//       pageMargins: [40, 40, 40, 40],
//     };

//     // ✅ Generate and Send PDF
//     const pdfDoc = printer.createPdfKitDocument(docDefinition);
//     const chunks = [];
//     pdfDoc.on("data", (chunk) => chunks.push(chunk));
//     pdfDoc.on("end", () => {
//       const pdfBuffer = Buffer.concat(chunks);
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=News_Report_${startDate}_to_${endDate}.pdf`
//       );
//       res.send(pdfBuffer);
//     });
//     pdfDoc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate PDF",
//       error: error.message,
//     });
//   }
// };


// export const downloadNewsPDF = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both startDate and endDate.",
//       });
//     }

//     // ✅ Fetch News Data
//     const newsList = await News.find({
//       createdAt: {
//         $gte: new Date(`${startDate}T00:00:00Z`),
//         $lte: new Date(`${endDate}T23:59:59Z`),
//       },
//     })
//       .populate("createdBy", "name email")
//       .populate("category", "name_en name_hi")
//       .sort({ createdAt: -1 });

//     if (!newsList.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No news found in the selected date range.",
//       });
//     }

//     // ✅ Load Fonts (Both English + Hindi Support)
//     const hindiFontPath = path.resolve("fonts/NotoSerifDevanagari-Regular.ttf");
//     const englishFont = "Helvetica";

//     const fonts = {
//       NotoSerifDevanagari: {
//         normal: hindiFontPath,
//         bold: hindiFontPath,
//         italics: hindiFontPath,
//         bolditalics: hindiFontPath,
//       },
//       Helvetica: {
//         normal: "Helvetica",
//         bold: "Helvetica-Bold",
//         italics: "Helvetica-Oblique",
//         bolditalics: "Helvetica-BoldOblique",
//       },
//     };

//     const printer = new PdfPrinter(fonts);

//     // ✅ Clean HTML tags and limit text
//     const cleanText = (text) =>
//       text ? text.replace(/<[^>]+>/g, "").trim().substring(0, 3000) : "";

//     // ✅ Build PDF Content
//     const content = [
//       { text: "📰 EMS News Report", style: "header", font: englishFont },
//       {
//         text: `Date Range: ${startDate} → ${endDate}\nGenerated On: ${new Date().toLocaleString()}`,
//         style: "subheader",
//         font: englishFont,
//       },
//       { text: "\n" },
//     ];

//     newsList.forEach((news, index) => {
//       content.push(
//         { text: `${index + 1}. ${cleanText(news.title_en) || "No English Title"}`, style: "title_en", font: englishFont },
//         { text: news.title_hi ? cleanText(news.title_hi) : "", style: "title_hi", font: "NotoSerifDevanagari" },
//         {
//           text: `Published: ${
//             news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : "N/A"
//           } | Author: ${news.createdBy?.name || "Unknown"}`,
//           style: "meta",
//           font: englishFont,
//         },
//         {
//           text: `Category: ${news.category?.name_en || "N/A"} (${news.category?.name_hi || ""})`,
//           style: "meta",
//           font: englishFont,
//         },
//         { text: `\nSummary (English):\n${cleanText(news.summary_en)}`, style: "summary_en", font: englishFont },
//                 { text: `\nEnglish Content:\n${cleanText(news.content_en)}`, style: "content_en", font: englishFont },

//                   { text: "\n──────────────────────────────────────────────\n", font: englishFont },
//         { text: `\nसारांश (Hindi):\n${cleanText(news.summary_hi)}`, style: "summary_hi", font: "NotoSerifDevanagari" },

//         { text: `\nहिन्दी सामग्री:\n${cleanText(news.content_hi)}`, style: "content_hi", font: "NotoSerifDevanagari" },
//         { text: "\n──────────────────────────────────────────────\n", font: englishFont }
//       );
//     });

//     // ✅ Define PDF Layout
//     const docDefinition = {
//       content,
//       defaultStyle: { font: "Helvetica" },
//       styles: {
//         header: { fontSize: 20, bold: true, alignment: "center", margin: [0, 10, 0, 10] },
//         subheader: { fontSize: 12, alignment: "center", color: "gray", margin: [0, 0, 0, 10] },
//         title_en: { fontSize: 14, bold: true, color: "#1a73e8", margin: [0, 5, 0, 2] },
//           summary_en: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
//             content_en: { fontSize: 11, margin: [0, 4, 0, 6] },
//         title_hi: { fontSize: 13, bold: true, margin: [0, 0, 0, 5] },
        
//         meta: { fontSize: 10, color: "gray", margin: [0, 2, 0, 2] },
      
//         summary_hi: { fontSize: 11, italics: true, margin: [0, 4, 0, 4] },
      
//         content_hi: { fontSize: 11, margin: [0, 4, 0, 6] },
//       },
//       footer: (currentPage, pageCount) => ({
//         text: `Page ${currentPage} of ${pageCount} • EMS Report`,
//         alignment: "center",
//         fontSize: 9,
//         color: "gray",
//       }),
//       pageMargins: [40, 40, 40, 40],
//     };

//     // ✅ Generate and Send PDF
//     const pdfDoc = printer.createPdfKitDocument(docDefinition);
//     const chunks = [];
//     pdfDoc.on("data", (chunk) => chunks.push(chunk));
//     pdfDoc.on("end", () => {
//       const pdfBuffer = Buffer.concat(chunks);
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=News_Report_${startDate}_to_${endDate}.pdf`
//       );
//       res.send(pdfBuffer);
//     });
//     pdfDoc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate PDF",
//       error: error.message,
//     });
//   }
// };

// export const downloadNewsPDF = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both startDate and endDate.",
//       });
//     }

//     // ✅ Fetch News in Date Range
//     const newsList = await News.find({
//       createdAt: {
//         $gte: new Date(`${startDate}T00:00:00Z`),
//         $lte: new Date(`${endDate}T23:59:59Z`),
//       },
//     })
//       .populate("createdBy", "name email")
//       .populate("category", "name_en name_hi")
//       .sort({ createdAt: -1 });

//     if (!newsList.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No news found in the selected date range.",
//       });
//     }

//     // ✅ Built-in Fonts Only (No .ttf)
//     const fonts = {
//       Helvetica: {
//         normal: "Helvetica",
//         bold: "Helvetica-Bold",
//         italics: "Helvetica-Oblique",
//         bolditalics: "Helvetica-BoldOblique",
//       },
//     };
//     const printer = new PdfPrinter(fonts);

//     // ✅ Utility: Clean or Skip Hindi Content
//     const cleanText = (text) => {
//       if (!text) return "No English content available.";
//       // Detect Hindi (Devanagari range)
//       const hasHindi = /[\u0900-\u097F]/.test(text);
//       if (hasHindi) return "(Non-English text skipped)";
//       // Strip HTML tags
//       return text.replace(/<[^>]+>/g, "").substring(0, 800) + "...";
//     };

//     // ✅ Build Content
//     const content = [
//       { text: "EMS News Report", style: "header" },
//       {
//         text: `Date Range: ${startDate} → ${endDate}\nGenerated On: ${new Date().toLocaleString()}`,
//         style: "subheader",
//       },
//       { text: "\n" },
//     ];

//     newsList.forEach((news, index) => {
//       const title = cleanText(news.title_en) || "(No English title available)";
//       const summary = cleanText(news.summary_en) || "No English summary available.";
//       const content_en = cleanText(news.content_en || "");
//           const content_hi = cleanText(news.content_hi || " hindi nhi ha ");
//       const body = cleanText(news.content_en);

//       content.push(
//         { text: `${index + 1}. ${title}`, style: "newsTitle" },
//         {
//           text: `Published: ${
//             news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : "N/A"
//           } | Author: ${news.createdBy?.name || "Unknown"}`,
//           style: "metaInfo",
//         },
//         {
//           text: `Category: ${news.category?.name_en || "N/A"} | Status: ${news.status}`,
//           style: "metaInfo",
//         },
//         { text: `Summary: ${summary}`, style: "summary" },
//         { text: body, style: "content" },
//          { text: "\n--------------------------------------------------------\n", style: "divider" },
//           { text: `content_en: ${content_en}`, style: "content_en" },
//         { text: body, style: "content" },
//          { text: "\n--------------------------------------------------------\n", style: "divider" },
//           { text: `content_en: ${content_hi}`, style: "content_en" },
//         { text: body, style: "content" },
//         { text: "\n--------------------------------------------------------\n", style: "divider" }
//       );
//     });

//     // ✅ Document Layout
//     const docDefinition = {
//       content,
//       styles: {
//         header: {
//           fontSize: 20,
//           bold: true,
//           alignment: "center",
//           margin: [0, 10, 0, 10],
//         },
//         subheader: {
//           fontSize: 12,
//           italics: true,
//           alignment: "center",
//           color: "gray",
//         },
//         newsTitle: { fontSize: 14, bold: true, color: "#1a73e8", margin: [0, 5, 0, 3] },
//         metaInfo: { fontSize: 10, color: "#555" },
//         summary: { fontSize: 11, italics: true, color: "#444" },
//         content: { fontSize: 11, color: "#222", margin: [0, 2, 0, 6] },
//         divider: { color: "#ccc" },
//       },
//       defaultStyle: { font: "Helvetica" },
//       pageMargins: [40, 40, 40, 40],
//       footer: (currentPage, pageCount) => ({
//         text: `Page ${currentPage} of ${pageCount} • Generated by EMS`,
//         alignment: "center",
//         fontSize: 9,
//         color: "gray",
//       }),
//     };

//     // ✅ Generate PDF
//     const pdfDoc = printer.createPdfKitDocument(docDefinition);
//     const chunks = [];
//     pdfDoc.on("data", (chunk) => chunks.push(chunk));
//     pdfDoc.on("end", () => {
//       const pdfBuffer = Buffer.concat(chunks);
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=News_Report_${startDate}_to_${endDate}.pdf`
//       );
//       res.send(pdfBuffer);
//     });
//     pdfDoc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate PDF",
//       error: error.message,
//     });
//   }
// };



// export const downloadNewsPDF = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both startDate and endDate.",
//       });
//     }

//     // ✅ Fetch News Data
//     const newsList = await News.find({
//       createdAt: {
//         $gte: new Date(`${startDate}T00:00:00Z`),
//         $lte: new Date(`${endDate}T23:59:59Z`),
//       },
//     })
//       .populate("createdBy", "name email")
//       .populate("category", "name_en name_hi")
//       .sort({ createdAt: -1 });

//     if (!newsList.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No news found in the selected date range.",
//       });
//     }

//     // ✅ Use Unicode font for Hindi + English
//     const fontPath = path.resolve("fonts/NotoSerifDevanagari-Regular.ttf");
//     const fonts = {
//       NotoSerifDevanagari: {
//         normal: fontPath,
//         bold: fontPath,
//         italics: fontPath,
//         bolditalics: fontPath,
//       },
//     };
//     const printer = new PdfPrinter(fonts);

//     // ✅ Clean HTML tags (keep plain text)
//     const cleanText = (text) =>
//       text ? text.replace(/<[^>]+>/g, "").trim().substring(0, 2000) : "";

//     // ✅ Build PDF Content
//     const content = [
//       { text: "📰 EMS News Report", style: "header" },
//       {
//         text: `Date Range: ${startDate} → ${endDate}\nGenerated On: ${new Date().toLocaleString()}`,
//         style: "subheader",
//       },
//       { text: "\n" },
//     ];

//     newsList.forEach((news, index) => {
//       content.push(
//         { text: `${index + 1}. ${news.title_en || "No English Title"}`, style: "title" },
//         { text: news.title_hi || "", style: "title_hi" },
//         {
//           text: `Published: ${
//             news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : "N/A"
//           } | Author: ${news.createdBy?.name || "Unknown"}`,
//           style: "meta",
//         },
//         {
//           text: `Category: ${news.category?.name_en || "N/A"} (${news.category?.name_hi || ""})`,
//           style: "meta",
//         },
//         { text: `Summary (EN): ${cleanText(news.summary_en)}`, style: "summary" },
//         { text: `सारांश (HI): ${cleanText(news.summary_hi)}`, style: "summary_hi" },
//         { text: `\nEnglish Content:\n${cleanText(news.content_en)}`, style: "content" },
//         { text: `\nहिन्दी सामग्री:\n${cleanText(news.content_hi)}`, style: "content_hi" },
//         { text: "\n──────────────────────────────────────────────\n" }
//       );
//     });

//     // ✅ PDF Layout
//     const docDefinition = {
//       content,
//       defaultStyle: { font: "NotoSerifDevanagari" },
//       styles: {
//         header: { fontSize: 20, bold: true, alignment: "center", margin: [0, 10, 0, 10] },
//         subheader: { fontSize: 12, alignment: "center", color: "gray", margin: [0, 0, 0, 10] },
//         title: { fontSize: 14, bold: true, color: "#1a73e8" },
//         title_hi: { fontSize: 13, bold: true, margin: [0, 2, 0, 5] },
//         meta: { fontSize: 10, color: "gray" },
//         summary: { fontSize: 11, italics: true, margin: [0, 5, 0, 5] },
//         summary_hi: { fontSize: 11, italics: true, margin: [0, 5, 0, 5] },
//         content: { fontSize: 11, margin: [0, 5, 0, 5] },
//         content_hi: { fontSize: 11, margin: [0, 5, 0, 5] },
//       },
//       footer: (currentPage, pageCount) => ({
//         text: `Page ${currentPage} of ${pageCount} • EMS Report`,
//         alignment: "center",
//         fontSize: 9,
//         color: "gray",
//       }),
//     };

//     // ✅ Generate PDF and send
//     const pdfDoc = printer.createPdfKitDocument(docDefinition);
//     const chunks = [];
//     pdfDoc.on("data", (chunk) => chunks.push(chunk));
//     pdfDoc.on("end", () => {
//       const pdfBuffer = Buffer.concat(chunks);
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=News_Report_${startDate}_to_${endDate}.pdf`
//       );
//       res.send(pdfBuffer);
//     });
//     pdfDoc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({ success: false, message: "Failed to generate PDF", error: error.message });
//   }
// };

export const bulkDeleteNews = async (req, res) => {
  try {
    const { startDate, endDate, categoryId, ids } = req.body;

    let query = {};

    // LOGIC: Agar frontend se specific IDs aayi hain toh query waisi hogi
    if (ids && Array.isArray(ids) && ids.length > 0) {
      query = { _id: { $in: ids } };
    } else {
      // Purana logic: Date aur Category filter
      if (!startDate || !endDate) {
        return res.status(400).json({ success: false, message: "Please provide dates or select specific news" });
      }

      query = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
        },
      };

      if (categoryId) {
        query.category = categoryId;
      }
    }

    // 1. News items dhundo taaki media delete ho sake
    const newsToDelete = await News.find(query);

    if (newsToDelete.length === 0) {
      return res.status(404).json({ success: false, message: "No news found to delete" });
    }

    // 2. File Storage se delete karna (S3/Spaces)
    for (const news of newsToDelete) {
      if (news.media) {
        for (const item of news.media) {
          if (item.url) await deleteFileFromSpaces(item.url).catch(e => console.log(e));
        }
      }
      if (news.pdfFiles) {
        for (const pdf of news.pdfFiles) {
          if (pdf.url) await deleteFileFromSpaces(pdf.url).catch(e => console.log(e));
        }
      }
    }

    const newsIds = newsToDelete.map(n => n._id);

    // 3. Database cleanup
    await News.deleteMany({ _id: { $in: newsIds } });
    await headlineModel.deleteMany({ newsId: { $in: newsIds } });
    await NewsPoll.deleteMany({ newsId: { $in: newsIds } });
    await SavedNews.deleteMany({ newsId: { $in: newsIds } });

    res.status(200).json({
      success: true,
      message: `${newsIds.length} news items deleted successfully.`,
      deletedCount: newsIds.length
    });

  } catch (error) {
    console.error("Bulk Delete Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// export const bulkDeleteNews = async (req, res) => {
//   try {
//     const { startDate, endDate, categoryId } = req.body;

//     // 1. Validation: डेट होना ज़रूरी है
//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both startDate and endDate",
//       });
//     }

//     // 2. Query Build करना
//     let query = {
//       createdAt: {
//         $gte: new Date(startDate), // इस तारीख से
//         $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)), // इस तारीख के अंत तक
//       },
//     };

//     // अगर कैटेगरी आईडी भेजी गई है, तो उसे फिल्टर में जोड़ें
//     if (categoryId) {
//       query.category = categoryId;
//     }

//     // 3. डिलीट करने से पहले न्यूज़ ढूँढना (ताकि उनकी फाइल्स डिलीट कर सकें)
//     const newsToDelete = await News.find(query);

//     if (newsToDelete.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No news found for the selected criteria",
//       });
//     }

//     // 4. Cloud Storage (S3/Spaces) से फाइल्स डिलीट करना
//     for (const news of newsToDelete) {
//       // मीडिया फाइल्स डिलीट करें
//       if (news.media && news.media.length > 0) {
//         for (const item of news.media) {
//           if (item.url) {
//             await deleteFileFromSpaces(item.url).catch(err => console.log("File delete error:", err));
//           }
//         }
//       }
//       // PDF फाइल्स डिलीट करें
//       if (news.pdfFiles && news.pdfFiles.length > 0) {
//         for (const pdf of news.pdfFiles) {
//           if (pdf.url) {
//             await deleteFileFromSpaces(pdf.url).catch(err => console.log("PDF delete error:", err));
//           }
//         }
//       }
//     }

//     const newsIds = newsToDelete.map(n => n._id);

//     // 5. Database से डिलीट करना
//     // न्यूज़ डिलीट करें
//     await News.deleteMany({ _id: { $in: newsIds } });

//     // हेडलाइंस भी डिलीट करें अगर इस न्यूज़ की बनी थीं
//     await headlineModel.deleteMany({ newsId: { $in: newsIds } });

//     // न्यूज़ पोल भी डिलीट करें
//     await NewsPoll.deleteMany({ newsId: { $in: newsIds } });
    
//     // Saved News से भी हटा दें
//     await SavedNews.deleteMany({ newsId: { $in: newsIds } });

//     res.status(200).json({
//       success: true,
//       message: `${newsToDelete.length} news items deleted successfully along with their media.`,
//       deletedCount: newsToDelete.length
//     });

//   } catch (error) {
//     console.error("Bulk Delete Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

export const bulkPreviewNews = async (req, res) => {
  try {

    const { startDate, endDate, categoryId } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide startDate and endDate",
      });
    }

    let matchQuery = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
      },
    };

    if (categoryId) {
      matchQuery.category = new mongoose.Types.ObjectId(categoryId);
    }

    const news = await News.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          title_en: 1,
          title_hi: 1,
          createdAt: 1,
          "category.name": 1,

          mediaUrl: {
            $arrayElemAt: ["$media.url", 0],
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      totalNews: news.length,
      news: news,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// export const getAllNewsWithFilters = async (req, res) => {
//   try {

//     const {
//       status,
//       category,
//       reporter,
//       city,
//       state,
//       startDate,
//       endDate,
//       search,
//       page = 1,
//       limit = 10
//     } = req.query;

//     let filter = {};

//     if (status && status !== "all") {
//       filter.status = status;
//     } else if (!status) {
//       // जब कोई फ़िल्टर नहीं लगा हो, तब 'pending_approval' दिखाओ
//       filter.status = 'pending_approval';
//     } 

//     // ✅ Status filter
//     if (status) {
//       filter.status = status;
//     }

//     // ✅ Category filter
//     if (category) {
//       filter.category = category;
//     }

//     // ✅ Reporter filter
//     if (reporter) {
//       filter.createdBy = reporter;
//     }

//     // ✅ City filter
//     if (city) {
//       filter.city = city;
//     }

//     // ✅ State filter
//     if (state) {
//       filter.state = state;
//     }

//     // ✅ Date filter
//     if (startDate || endDate) {
//       filter.createdAt = {};
//       if (startDate) filter.createdAt.$gte = new Date(startDate);
//       if (endDate) {
//         const end = new Date(endDate);
//         end.setHours(23, 59, 59, 999); // दिन के अंत तक का डेटा लेने के लिए
//         filter.createdAt.$lte = end;
//       };
//     }

//     // ✅ Search by title
//     if (search) {
//       filter.$or = [
//         { title_en: { $regex: search, $options: "i" } },
//         { title_hi: { $regex: search, $options: "i" } }
//       ];
//     }

//     const skip = (page - 1) * limit;

//     const news = await News.find(filter)
//       .populate("createdBy", "name email")
//       .populate("category", "name")
//       .populate("state", "name")
//       .populate("city", "name")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(Number(limit));

//     const total = await News.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       total,
//       page: Number(page),
//       pages: Math.ceil(total / limit),
//       data: news
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }
// };

// न्यूज़ का स्टेटस अपडेट करने के लिए (Approve/Reject)


export const getAllNewsWithFilters = async (req, res) => {
  try {
    const {
      status,
      category,
      reporter,
      city,
      state,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 10
    } = req.query;

    let filter = {};

    // ✅ Status filter: Agar status 'all' hai toh filter mat lagao
    if (status && status !== "all") {
      filter.status = status;
    } else if (!status) {
      // Default: Agar kuch select nahi hai toh pending_approval dikhao
      filter.status = 'pending_approval';
    }

    // ✅ Search by title (Regex)
    if (search) {
      filter.$or = [
        { title_en: { $regex: search, $options: "i" } },
        { title_hi: { $regex: search, $options: "i" } }
      ];
    }

    // ✅ Specific Field Filters
    if (category) filter.category = category;
    if (reporter) filter.createdBy = reporter;
    if (state)    filter.state = state;
    if (city)     filter.city = city;

    // ✅ Date Range Filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); 
        filter.createdAt.$lte = end;
      }
    }

    const skip = (page - 1) * Number(limit);

    const news = await News.find(filter)
      .populate("createdBy", "name email")
      .populate("category", "name")
      .populate("state", "name")
      .populate("city", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await News.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: news
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNewsStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'posted' या 'rejected'

        if (!['posted', 'rejected', 'pending_approval'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ success: false, message: "News not found" });
        }

        news.status = status;
        news.updatedBy = req.user._id;

        // अगर स्टेटस 'posted' हो रहा है, तो पब्लिश डेट भी सेट करें
        if (status === 'posted') {
            news.publishedAt = new Date();
        }

        await news.save();

        res.status(200).json({
            success: true,
            message: `News ${status === 'posted' ? 'Approved' : 'Updated'} successfully`,
            data: news
        });
    } catch (error) {
        next(error);
    }
};


export const getNewsByLocation = async (req, res, next) => {
  try {
    const { city, state, search, category, lang, page, limit } = req.query;

    let filter = {};

    // 1. ✅ सर्चिंग लॉजिक (अगर सर्च में कुछ लिखा है)
    if (search) {
      filter.$or = [
        { title_hi: { $regex: search, $options: 'i' } }, // 'i' मतलब small/capital letter का फर्क नहीं पड़ेगा
        { title_en: { $regex: search, $options: 'i' } },
        { summary_hi: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. ✅ लोकेशन फ़िल्टर
    if (city) filter.city = city;
    if (state) filter.state = state;
    if (category) filter.category = category;

    // स्टेटस फ़िल्टर (केवल लाइव खबरें)
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
      filter.status = { $in: ["posted", "live"] };
    }

    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const skip = (currentPage - 1) * itemsPerPage;

    const selectedLang = lang === "en" ? "en" : "hi";
    
    // 3. ✅ डेटाबेस क्वेरी
    // अगर सर्च है तो हम score के आधार पर सॉर्ट कर सकते हैं (Optional)
    const total = await News.countDocuments(filter);
    const news = await News.find(filter)
      .populate([
        { path: "city", select: "name" },
        { path: "state", select: "name iso2" },
        { path: "category", select: "name" }
      ])
      .sort("-createdAt") // नई खबरें पहले
      .skip(skip)
      .limit(itemsPerPage);

    // 4. ✅ भाषा के हिसाब से डेटा सेट करना
    const formattedData = news.map(item => {
      const obj = item.toObject();
      if (selectedLang === "en") {
        obj.title_hi = obj.title_en || obj.title_hi;
        obj.content_hi = obj.content_en || obj.content_hi;
        obj.summary_hi = obj.summary_en || obj.summary_hi;
      }
      return obj;
    });

    res.status(200).json({
      success: true,
      count: formattedData.length,
      total,
      currentPage,
      data: formattedData,
    });

  } catch (error) {
    next(error);
  }
}; 
