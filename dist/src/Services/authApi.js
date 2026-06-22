

import axios from "axios";
import { API_END_POINT } from "./authRoutes";

// ======================================================================
// --- User Authentication Functions ---
// ======================================================================
const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});
 
// Logs in a user.
export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(API_END_POINT.LOGIN, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error in login:", error.response?.data || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};



// ======================================================================
// Registers a new user.
// export const userRegister = async (data) => {
//   try {
//     const response = await axios.post(API_END_POINT.REGISTER, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error in register:", error.response?.data || error.message);
//     throw error.response?.data?.message || "Registration failed";
//   }
// };


export const userRegister = async (formData) => {
  try {
    const response = await axios.post(
      API_END_POINT.REGISTER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in register:", error.response?.data || error.message);
    throw error.response?.data?.message || "Registration failed";
  }
};
// ======================================================================


// ======================================================================
// --- Content Fetching Functions ---
// ======================================================================

// Fetches headlines.
export const headline = async () => {
  try {
    const response = await axios.get(API_END_POINT.HEADLINE);
    return response.data;
  } catch (error) {
    console.error("Error fetching headline:", error.response?.data || error.message);
    throw error.response?.data?.message || "Headline fetch failed.";
  }
};
// ======================================================================

// Get all categories
export const getCategories = async () => {
  const res = await axios.get(`${API_END_POINT.GET_CATEGORIES}`, );
  return res.data;
};
// Fetches all shorts for the logged-in user.
export const newsshorts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_END_POINT.NEWSSHORTS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shorts:", error.response?.data || error.message);
    throw error.response?.data?.message || "Newsshorts fetch failed";
  }
};
// ======================================================================

// Fetches all news articles.
export const allNews = async (filters = {}) => {
  try {
    const lang = localStorage.getItem("userLanguage") || "hi";
    const response = await axios.get(API_END_POINT.ALL_NEWS, {
      params: { ...filters, lang }  
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    throw error.response?.data?.message || "News fetch failed";
  }
};



export const allLiveNews = async (filters = {}) => {
  try {
    const lang = localStorage.getItem("userLanguage") || "hi";
    const response = await axios.get(API_END_POINT.ALL_LIVE_NEWS, {
      params: { ...filters, lang }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching live news:", error.response?.data || error.message);
    throw error.response?.data?.message || "Live news fetch failed";
  }
};


// 📌 Get Live News Details by ID
export const getLiveNewsById = async (id) => {
  try {
    const lang = localStorage.getItem("userLanguage") || "hi";

    const response = await axios.get(`${API_END_POINT.LIVE_NEWS_BY_ID}/${id}`, {
      params: { lang },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching live news by ID:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch live news details";
  }
};


// ======================================================================

// Fetches a single news article by its ID.
// ✅ सुधार: getNewsById में authentication header जोड़ा गया है
export const getNewsById = async (newsId) => {
  try {
    const lang = localStorage.getItem("userLanguage") || "hi";
    // अब सीधे getAuthHeaders() का उपयोग करें, यदि बैकएंड इस रूट पर हमेशा टोकन की उम्मीद करता है।
    // यदि बैकएंड बिना टोकन के भी न्यूज़ दिखा सकता है (लेकिन isLiked जैसे फीचर्स के बिना),
    // तो पिछले conditional logic को रखें। लेकिन त्रुटि के अनुसार, बैकएंड को टोकन चाहिए।
    const response = await axios.get(API_END_POINT.GET_NEWS_BY_ID(newsId), {
      params: { lang },
      ...getAuthHeaders() // auth हेडर को यहाँ सीधे फैलाएँ
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching news with ID ${newsId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch news details.";
  }
};
// ======================================================================


// ======================================================================
// --- News Interaction Functions ---
// ======================================================================

// Adds a like to a news article.
// ✅ सुधार: addLikeToNews में authentication header जोड़ा गया है
export const addLikeToNews = async (newsId) => {
  try {
    const response = await axios.post(API_END_POINT.LIKE_NEWS(newsId), {}, getAuthHeaders()); // getAuthHeaders का उपयोग करें
    return response.data;
  } catch (error) {
    console.error("Error liking news:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to like news";
  }
};
// ======================================================================

// Adds a comment to a news article.
// ✅ यह पहले से ही सही था, टोकन भेज रहा था
export const addCommentToNews = async (newsId, commentData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.COMMENT_ON_NEWS(newsId),
      commentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error commenting on news:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to add comment";
  }
};
// ======================================================================


// ======================================================================
// --- Shorts Interaction Functions ---
// ======================================================================

// Adds a like to a short.
export const addLikeToShort = async (shortId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.LIKE_SHORT(shortId),
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error liking short:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to like short";
  }
};
// ======================================================================

// Adds a comment to a short.
export const addCommentToShort = async (shortId, commentData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      API_END_POINT.COMMENT_ON_SHORT(shortId),
      commentData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error commenting on short:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to add comment";
  }
};
// ======================================================================

export const getCommentsForShort = async (shortId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      API_END_POINT.GET_COMMENTS_FOR_SHORT(shortId),
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments for short:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch comments";
  }
};

// ======================================================================
// --- Polls Functions ---
// ======================================================================

// Fetches all active polls for the logged-in user.
export const getAllPolls = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_END_POINT.POLLS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching polls:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch polls.";
  }
};
// ======================================================================

// Submits a vote on a specific poll.
export const voteOnPoll = async (pollId, voteData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {};
     if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await axios.post(
      API_END_POINT.VOTE_ON_POLL(pollId),
      voteData,
      config
    );
    return response.data; 
  } catch (error) {
    console.error(`Error voting on poll ${pollId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to record vote.";
  }
};
// ======================================================================


// ======================================================================
// --- Placeholder API Functions for Sidebar (Dummy Data) ---
// ======================================================================

// Fetches trending topics (placeholder).
export const getTrendingTopics = async () => {
  console.warn("Using placeholder data for getTrendingTopics. Replace with actual API call.");
  return Promise.resolve({
    success: true,
    data: ['Today\'s Horoscope', 'Your Voice', 'Aarti Chalisa', 'Admissions', 'Archive']
  });
};
// ======================================================================

// Fetches videos (placeholder).
export const getVideos = async () => {
  console.warn("Using placeholder data for getVideos. Replace with actual API call.");
  return Promise.resolve({
    success: true,
    data: {
      mainVideo: { image: 'https://via.placeholder.com/400x250', title: 'Main Video Title from API' },
      videoList: [
        { image: 'https://via.placeholder.com/200x120', title: 'Video 1 from API' },
        { image: 'https://via.placeholder.com/200x120', title: 'Video 2 from API' }
      ]
    }
  });
};
// ======================================================================

// Fetches headlines (placeholder).
export const getHeadlines = async () => {
    console.warn("Using placeholder data for getHeadlines. Replace with actual API call.");
    return Promise.resolve({
        success: true,
        data: [
            { category: 'World', text: 'Headline 1 from API...', image: 'https://via.placeholder.com/100x75' },
            { category: 'Cricket', text: 'Headline 2 from API...', image: 'https://via.placeholder.com/100x75' }
        ]
    });
};
// ======================================================================

// Fetches horoscope data for a specific sign (placeholder).
export const getHoroscope = async (sign) => {
    console.warn(`Using placeholder data for getHoroscope for ${sign}. Replace with actual API call.`);
    const horoscopes = {
        'Aries': { name: 'Aries', description: 'API says: An energetic day awaits Aries.' },
        'Taurus': { name: 'Taurus', description: 'API says: A happy day for Taurus family.' },
        // ... add other signs as needed for placeholder
    };
    return Promise.resolve({
        success: true,
        data: horoscopes[sign] || horoscopes['Aries']
    });
};
// ======================================================================


// Fetch all countries
export const getCountries = async () => {
  try {
    const response = await axios.get( API_END_POINT.GET_COUNTRIES);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    throw error?.response?.data || { message: "Error fetching countries" };
  }
};


//==============================================================================//
// Fetch states by country ID
export const getStatesByCountry = async (countryId) => {
  try {
    const url =  API_END_POINT.GET_STATES_BY_COUNTRY(countryId);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch states for country ${countryId}:`, error);
    throw error?.response?.data || { message: "" };
  }
};

//===========================================================================================//
// Fetch cities by state ID
export const getCitiesByState = async (stateId) => {
  try {
    const url =  API_END_POINT.GET_CITIES_BY_STATE(stateId);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch cities for state ${stateId}:`, error);
    throw error?.response?.data || { message: "Error fetching cities" };
  }
};


// Tranding Topics api
//===========================================================================================================//
export const getTrendingTopic = async () => {
  try {
    const response = await axios.get(API_END_POINT.GET_TRENDING_TOPICS);
    return response.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching trending topics:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch trending topics";
  }
};

//==================================================================================================================//
export const getTrending = async () =>{
  try {
    const response = await axios.get(API_END_POINT.GET_MULTITRANDING)
   return response.data; // { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching trending topics:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch trending topics";
  }
};



//======================================================================================================//
// Rightsaid baar videos
// export const getVideo = async () => {
//   try {
//     const response = await axios.get(API_END_POINT.GET_VIDEO);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching videos:", error.response?.data || error.message);
//     throw error.response?.data?.message || "Failed to fetch video";
//   }
// }

export const getVideo = async () => {
  try {
    const token = getToken(); // 🔥 get token from localStorage
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(API_END_POINT.GET_VIDEO, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch video";
  }
};

// ✅ New: Get a single video by ID (for VideoDetail page)
export const getVideoById = async (videoId) => {
  try {
    const token = getToken(); // लोकल स्टोरेज से टोकन प्राप्त करें
    const headers = token ? { Authorization: `Bearer ${token}` } : {}; // यदि टोकन है तो ऑथेंटिकेशन हेडर जोड़ें
    
    const response = await axios.get(API_END_POINT.GET_VIDEO_BY_ID(videoId), { headers });
    return response.data; // इस प्रतिक्रिया में video details, likesCount, और isLiked होनी चाहिए
  } catch (error) {
    console.error(`Error fetching video with ID ${videoId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch video details.";
  }
};


//==============================================================================================================//
// web story 
//==============================================================================================================//

export const getWebStroy = async () =>{
  try {
    const response = await axios.get(API_END_POINT.GET_WEBSTORY);
    return response.data;
  } catch (error) {
    console.error("Error fetching webStrogy:", error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to fetch video";
  }
}


//===============================Direcoty+==============================


export const registerCompany = async (data) => {
  try {
    const response = await axios.post(API_END_POINT.Company_REGISTER, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in company register:", error.response?.data || error.message);
    throw error.response?.data?.message || "Company Registration failed";
  }
};



export const getAllCompanyCategories = async () => {
  try {
    const res = await axios.get(API_END_POINT.GET_ALL_CompanyCATEGORIES, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Error in getAllCompanyCategories:", err.response?.data || err.message);
    throw err;
  }
};



export const getAllCompanySubCategories = async () => {
  try {
    const res = await axios.get(API_END_POINT.GET_ALL_CompanySUBCATEGORIES, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Error in getAllCompanySubCategories:", err.response?.data || err.message);
    throw err;
  }
};




// ✅ New: Get Companies By Category
export const getCompaniesByCategory = async (categoryId) => {
  try {
    const res = await axios.get(API_END_POINT.GET_COMPANIES_BY_CATEGORY(categoryId), getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error in getCompaniesByCategory(${categoryId}):`, err.response?.data || err.message);
    throw err;
  }
};

// ✅ New: Get Company By ID
export const getCompanyById = async (companyId) => {
  try {
    const res = await axios.get(API_END_POINT.GET_COMPANY_BY_ID(companyId), getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error in getCompanyById(${companyId}):`, err.response?.data || err.message);
    return { success: false, message: err.response?.data?.message || "Failed to fetch company details by ID." };
  }
};


export const getCompanyProfile = async () => {
  try {
    const response = await axios.get(API_END_POINT.GET_MY_COMPANY_PROFILE, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error in fetching company profile:", error.response?.data || error.message);
    throw error; 
  }
};
 
export const requestCompanyUpdate = async (updateData) => {
  try {
    const response = await axios.put(
      API_END_POINT.REQUEST_COMPANY_UPDATE,
      updateData,
      getAuthHeaders() 
    );
    return response.data;
  } catch (error) {
    console.error("Error in requestCompanyUpdate:", error);
    throw error.response?.data || error;
  }
};

// ======================================================================
// --- Video Interaction Functions ---
// ======================================================================

/**
 * वीडियो पर लाइक/अनलाइक टॉगल करता है। इसके लिए लॉगिन होना ज़रूरी है।
 * @param {string} videoId - जिस वीडियो को लाइक करना है उसकी ID.
 */
export const likeVideo = async (videoId) => {
  try {
    const response = await axios.post(
      API_END_POINT.LIKE_VIDEO(videoId),
      {}, // बॉडी खाली रहेगी, क्योंकि सर्वर सिर्फ टोकन से यूजर ID लेता है
      getAuthHeaders() // यह सुनिश्चित करेगा कि रिक्वेस्ट के साथ टोकन भेजा जाए
    );
    return response.data; 
  } catch (error) {
    console.error(`Error liking video ${videoId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to like the video.";
  }
};

/**
 * वीडियो पर एक नया कमेंट जोड़ता है। इसके लिए लॉगिन होना ज़रूरी है।
 * @param {string} videoId - जिस वीडियो पर कमेंट करना है उसकी ID.
 * @param {object} commentData - कमेंट का डेटा, उदाहरण के लिए: { text: "बहुत अच्छा वीडियो!" }.
 */
export const addCommentToVideo = async (videoId, commentData) => {
  try {
    const response = await axios.post(
      API_END_POINT.COMMENT_ON_VIDEO(videoId),
      commentData, // कमेंट का टेक्स्ट {text: "..."} बॉडी में भेजा जाएगा
      getAuthHeaders() // यह सुनिश्चित करेगा कि रिक्वेस्ट के साथ टोकन भेजा जाए
    );
    return response.data; 
  } catch (error) {
    console.error(`Error commenting on video ${videoId}:`, error.response?.data || error.message);
    throw error.response?.data?.message || "Failed to add comment to the video.";
  }
};





export const addOrUpdateCompanyReview = async (companyId, reviewData) => {
  try {
    const res = await axios.post(API_END_POINT.ADD_OR_UPDATE_REVIEW(companyId), reviewData, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error in addOrUpdateCompanyReview(${companyId}):`, err.response?.data || err.message);
    return { success: false, message: err.response?.data?.message || "Failed to add/update review." };
  }
};

// NEW: API function to fetch all reviews for a company
export const fetchCompanyReviews = async (companyId) => {
  try {
    const res = await axios.get(API_END_POINT.GET_COMPANY_REVIEWS(companyId), getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error in fetchCompanyReviews(${companyId}):`, err.response?.data || err.message);
    return { success: false, message: err.response?.data?.message || "Failed to fetch company reviews." };
  }
};


// Get all active ads
export const fetchActiveAds = async () => {
  try {
    const response = await axios.get(API_END_POINT.GET_ACTIVE_ADS);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};
