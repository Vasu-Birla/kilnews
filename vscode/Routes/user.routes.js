



// export default router;

import express from 'express';
import { authenticate, isUser, optionalAuthenticate } from '../Middlewares/auth.js'; // Use authenticate for general user actions
import { loginUser, registerUser, updateProfile } from '../Controllers/authController.js';
import upload from '../Middlewares/multer.middleware.js';
import { getAllCountries, getCitiesByState, getStatesByCountry } from '../Controllers/locationDataController.js';
import { getAllCategories, getAllSubCategories, getCategoryById, getSubCategoryById } from '../Controllers/taggingController.js';
import { getAllNews, getNewsById, addLikeToNews, addCommentToNews, getCommentsForNews, getAllNewsAPP,shareNewsPreview, getNewsByCategoryAPP, getNewsByLocation, getNewsByCategoryweb } from '../Controllers/newsController.js';
import { getAllShorts, getShortById, addLikeToShort, addCommentToShort, replyToComment, getCommentsByShortId } from '../Controllers/shortsController.js';
import { getAllHeadlines } from '../Controllers/headlineController.js';
import {

  getAllPolls,
  getPollById,
  voteOnPoll,
  getPollResults,
} from '../Controllers/polls.controller.js';
import { getMyProfile, getTrendingTopics } from '../Controllers/tagController.js';
import { addCommentToVideo, deleteCommentFromVideo, getAllAppVideos, getAllVideos, getVideoById, toggleLikeVideo } from '../Controllers/video.controller.js';
import { getCategoryNews } from '../Controllers/CategoryNews.js';
import { getAllAppStories, getAllStories } from '../Controllers/story.controller.js';
import { getSavedNews, toggleSaveNews } from '../Controllers/SavedNewsController.js';
import { addOrUpdateReview, getCompaniesByCategory, getCompanyById, getCompanyProfile, getCompanyReviews, registerCompany, requestCompanyUpdate } from '../Controllers/companyController.js';
import { CompanySubCategories, createCompanySubCategory, getAllCompanyCategories, getAllCompanySubCategories } from '../Controllers/companyCategory.controller.js';
import { createProduct } from '../Controllers/companyproduct.controllers.js';
import { getAllLiveNews, getLiveNewsById } from '../Controllers/liveNewsController.js';
import { getActiveAds } from '../Controllers/ad.controller.js';
const router = express.Router();


router.get("/getLiveNews/:id", getLiveNewsById);
router.get("/live-news", getAllLiveNews); // ✅ new API
router.get("/live-news/:id", getLiveNewsById); // ✅ new API
router.get('/polls', getAllPolls); 
router.get("/ads", getActiveAds)
router.get(
  "/company/:companyId/reviews",
  getCompanyReviews
);
// Public routes for authentication
router.post('/register', upload.single('profileImageFile'), registerUser);
router.post('/login', loginUser);
router.get('/news', getAllNews);
router.get("/news/category/:categoryId", getNewsByCategoryweb);
router.get('/newsbyUser', getAllNewsAPP);
router.get('/news/location', getNewsByLocation);
router.get( "/news/category/:categoryId", getNewsByCategoryAPP);
router.get('/headline', getAllHeadlines);
router.get("/getTrendingTopics", getTrendingTopics);
router.get("/Stories", getAllStories);
router.get("/getAllStories", getAllAppStories);

// Public Routes for Location Data
router.get('/countries', getAllCountries);
router.get('/countries/:countryId/states', getStatesByCountry);
router.get('/states/:stateId/cities', getCitiesByState);

// Public Routes for Categories/Subcategories
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.get('/subcategories', getAllSubCategories);
router.get('/subcategories/:id', getSubCategoryById);


// router.get('/news', getAllNews);



router.get('/news/:id',  getNewsById);
router.get('/share/:slug', shareNewsPreview);
router.get('/shorts', getAllShorts);

// router.get('/shorts', getAllShorts);
router.get('/shorts/:id', getShortById);



router.get('/videos',  optionalAuthenticate ,getAllVideos);
router.get('/getAllAppVideos',  optionalAuthenticate ,getAllAppVideos);
router.get("/videos/:id",  optionalAuthenticate ,getVideoById);
router.post('/polls/:id/vote',optionalAuthenticate,  voteOnPoll); // Vote on a poll
router.get("/selected-category-news", getCategoryNews);

router.get('/comment/:id', getCommentsForNews);


router.get("/CompanyCategory", getAllCompanyCategories);
// router.post("/CompanySubCategory", getAllCompanySubCategories);
router.get("/CompanySubCategories", CompanySubCategories);
router.get("/getCompaniesByCategory/:categoryId",  getCompaniesByCategory);

router.get("/company/:companyId", getCompanyById);

// 🟩 Public route (no auth required)


///////////////////////////////////////////////////////////////////// PROCTECTE ROUTE  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.use(authenticate,isUser); 
router.put('/update-profile',  upload.single('profileImageFile'), updateProfile);

router.post(
  "/Companyregister",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 5 },
    { name: "aadhaar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 },
      { name: "passportPhoto", maxCount: 1 } // ✅ ne
  ]),
  registerCompany
);

// router.get('/news/:id', getNewsById);
router.get('/profile', getMyProfile);
router.post('/news/:newsId/like', addLikeToNews);
router.post('/news/:newsId/comment', addCommentToNews);

router.post('/shorts/:shortId/like', addLikeToShort);

router.post('/shorts/:shortId/comment', addCommentToShort);
router.get('/shorts/:shortId/comment', getCommentsByShortId); // <-- Add this
router.post('/shorts/:shortId/comments/:commentId/reply', replyToComment);

// Potentially add user profile management routes here later if needed for 'user' role.

router.get('/shorts', getAllShorts);
// Public Routes
// router.get('/polls', getAllPolls); // Get all active polls
router.get('/polls/:id', getPollById); // Get a specific poll

router.get('/polls/:id/results', getPollResults); 




router.post('/savedNews/:newsId', toggleSaveNews);
router.get('/savedNews', getSavedNews);


router.post( "/company/products", upload.fields([{ name: "images", maxCount: 10 }]),createProduct);
router.get("/my-company-profile",  getCompanyProfile);

// router.put("/update-request", requestCompanyUpdate);



router.put("/update-request",  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 5 },
    { name: "aadhaar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 }
  ]), requestCompanyUpdate);


  // Likes
router.post('/videos/:id/like',  toggleLikeVideo);

// Comments
router.post('/videos/:id/comment',  addCommentToVideo);
router.delete('/videos/:videoId/comment/:commentId', deleteCommentFromVideo);
// router.get("/videos/:id", getVideoById);
router.post("/company/:companyId/review",addOrUpdateReview);


export default router; 