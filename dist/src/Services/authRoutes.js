
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://newsapp.aasmo.in/api/v1/user";


                        

// export const API_BASE_URL = "http://localhost:8004/api/v1/user";
 //export const API_BASE_URL = "https://newsapp.aasmo.in/api/v1/user";
//export const API_BASE_URL = "https://backend.xpressnews.in/api/v1/user";

export const API_END_POINT = {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/refresh-token`,
    HEADLINE: `${API_BASE_URL}/headline`,
    GET_CATEGORIES: `${API_BASE_URL}/categories`,
    NEWSSHORTS: `${API_BASE_URL}/shorts`,                
    ALL_NEWS: `${API_BASE_URL}/news`,
    ALL_LIVE_NEWS:`${API_BASE_URL}/live-news`,
    // LIVE_NEWS_BY_ID:`${API_BASE_URL}/live-news`,
    LIVE_NEWS_BY_ID:`${API_BASE_URL}/getLiveNews`,
                                                                                 
    GET_NEWS_BY_ID: (newsId) => `${API_BASE_URL}/news/${newsId}`,
    LIKE_NEWS: (newsId) => `${API_BASE_URL}/news/${newsId}/like`,
    COMMENT_ON_NEWS: (newsId) => `${API_BASE_URL}/news/${newsId}/comment`,
    LIKE_SHORT: (shortId) => `${API_BASE_URL}/shorts/${shortId}/like`,
    COMMENT_ON_SHORT: (shortId) => `${API_BASE_URL}/shorts/${shortId}/comment`,
    GET_COMMENTS_FOR_SHORT:(shortId) => `${API_BASE_URL}/shorts/${shortId}/comment`,
    POLLS: `${API_BASE_URL}/polls`,
    VOTE_ON_POLL: (pollId) => `${API_BASE_URL}/polls/${pollId}/vote`, 
    GET_COUNTRIES: `${API_BASE_URL}/countries`,
    GET_STATES_BY_COUNTRY: (countryId) => `${API_BASE_URL}/countries/${countryId}/states`,
    GET_CITIES_BY_STATE: (stateId) => `${API_BASE_URL}/states/${stateId}/cities`,
    GET_TRENDING_TOPICS: `${API_BASE_URL}/getTrendingTopics`,
    GET_MULTITRANDING: `${API_BASE_URL}/selected-category-news`,
    GET_VIDEO : `${API_BASE_URL}/videos`, 
    GET_VIDEO_BY_ID: (videoId) => `${API_BASE_URL}/videos/${videoId}`, 
    GET_WEBSTORY : `${API_BASE_URL}/Stories`,
    Company_REGISTER : `${API_BASE_URL}/Companyregister`,
    GET_ALL_CompanyCATEGORIES:`${API_BASE_URL}/CompanyCategory`,
    GET_ALL_CompanySUBCATEGORIES:`${API_BASE_URL}/CompanySubCategories`,
    GET_COMPANIES_BY_CATEGORY: (categoryId) => `${API_BASE_URL}/getCompaniesByCategory/${categoryId}`,
    GET_COMPANY_BY_ID: (id) => `${API_BASE_URL}/company/${id}`,
    GET_MY_COMPANY_PROFILE: `${API_BASE_URL}/my-company-profile`,
    REQUEST_COMPANY_UPDATE: `${API_BASE_URL}/update-request`,
    LIKE_VIDEO: (videoId) => `${API_BASE_URL}/videos/${videoId}/like`,
    COMMENT_ON_VIDEO: (videoId) => `${API_BASE_URL}/videos/${videoId}/comment`,
    ADD_OR_UPDATE_REVIEW: (companyId) => `${API_BASE_URL}/company/${companyId}/review`,
    GET_COMPANY_REVIEWS: (companyId) => `${API_BASE_URL}/company/${companyId}/reviews`,
    GET_ACTIVE_ADS: `${API_BASE_URL}/ads`,
GET_NEWS_BY_CATEGORY_APP: (categoryId) =>
  `${API_BASE_URL}/news/category/${categoryId}`,
};

