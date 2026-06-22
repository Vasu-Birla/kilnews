

// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   GiAries,
//   GiTaurus,
//   GiGemini,
//   GiCancer,
//   GiLeo,
//   GiVirgo,
//   GiLibra,
//   GiScorpio,
//   GiSagittarius,
//   GiCapricorn,
//   GiAquarius,
//   GiPisces,
// } from "react-icons/gi";

// // Moved outside the component to avoid re-creation on every render
// const allZodiacSigns = [
//   { name: "Aries", icon: <GiAries /> },
//   { name: "Taurus", icon: <GiTaurus /> },
//   { name: "Gemini", icon: <GiGemini /> },
//   { name: "Cancer", icon: <GiCancer /> },
//   { name: "Leo", icon: <GiLeo /> },
//   { name: "Virgo", icon: <GiVirgo /> },
//   { name: "Libra", icon: <GiLibra /> },
//   { name: "Scorpio", icon: <GiScorpio /> },
//   { name: "Sagittarius", icon: <GiSagittarius /> },
//   { name: "Capricorn", icon: <GiCapricorn /> },
//   { name: "Aquarius", icon: <GiAquarius /> },
//   { name: "Pisces", icon: <GiPisces /> },
// ];

// const zodiacMap = {
//   Aries: "मेष",
//   Taurus: "वृष",
//   Gemini: "मिथुन",
//   Cancer: "कर्क",
//   Leo: "सिंह",
//   Virgo: "कन्या",
//   Libra: "तुला",
//   Scorpio: "वृश्चिक",
//   Sagittarius: "धनु",
//   Capricorn: "मकर",
//   Aquarius: "कुंभ",
//   Pisces: "मीन",
// };

// const API_BASE_URL = "https://newsapp.aasmo.in/api/v1/user";
// const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// // Colors for the zodiac sign backgrounds - moved outside
// const zodiacColors = [
//   "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
//   "#16a085", "#2c3e50", "#c0392b", "#7f8c8d", "#9b59b6", "#34495e"
// ];

// const RashifalDetailsPage = () => {
//   const navigate = useNavigate();
//   const mainRedColor = "#e74c3c";
//   const [allNews, setAllNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Added state for error handling

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     axios.get(`${API_BASE_URL}/news`)
//       .then(res => {
//         const astrologyNews = res.data.data.filter(
//           item => item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
//         );
//         setAllNews(astrologyNews);
//       })
//       .catch(err => {
//         console.error("Error fetching news:", err);
//         setError("खबरें लोड करने में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।"); // User-friendly error message
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const getRashiSpecificNews = (rashiName) => {
//     const hindiRashi = zodiacMap[rashiName].toLowerCase();
//     const engRashi = rashiName.toLowerCase();

//     return allNews.filter(item => {
//       const title = (item.title_hi || item.title_en || "").toLowerCase();
//       const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
//       const subSub = (item.subSubCategory || "").toLowerCase();
//       const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
      
//       return title.includes(hindiRashi) || title.includes(engRashi) ||
//              summary.includes(hindiRashi) || summary.includes(engRashi) ||
//              subSub.includes(hindiRashi) || subSub.includes(engRashi) ||
//              tags.includes(hindiRashi) || tags.includes(engRashi);
//     });
//   };

//   const otherGeneralHoroscopeNews = useMemo(() => {
//     if (!allNews.length) return [];
    
//     return allNews.filter(item => {
//       const isHoroscopeCategory = item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase());
//       const hasNullSubSubCategory = !item.subSubCategory || item.subSubCategory.trim() === "";
//       return isHoroscopeCategory && hasNullSubSubCategory;
//     });
//   }, [allNews]);

//   const handleRashiClick = (rashi) => {
//     const clickedRashiNews = getRashiSpecificNews(rashi);

//     if (clickedRashiNews.length === 0) {
//       alert(`${rashi} के लिए कोई खबर नहीं मिली।`);
//       return;
//     }

//     const latestClickedRashiNews = clickedRashiNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

//     // Collect latest news for all other rashis
//     const otherRashisLatestNews = [];
//     allZodiacSigns.forEach(otherSign => {
//       if (otherSign.name !== rashi) { // Exclude the clicked rashi
//         const newsForOtherRashi = getRashiSpecificNews(otherSign.name);
//         if (newsForOtherRashi.length > 0) {
//           const latestNewsForOtherRashi = newsForOtherRashi.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//           otherRashisLatestNews.push(latestNewsForOtherRashi);
//         }
//       }
//     });

//     try {
//       navigate(`/news/${latestClickedRashiNews.slug_en}`, { 
//         state: { 
//           relatedArticles: otherRashisLatestNews 
//         } 
//       });
//     } catch (navError) {
//       console.error("Error navigating to news detail page:", navError);
//       alert("खबर विवरण पेज पर जाने में त्रुटि हुई।");
//     }
//   };

//   const handleOtherNewsClick = (clickedNewsSlug) => {
//     const related = otherGeneralHoroscopeNews.filter(news => news.slug_en !== clickedNewsSlug);
    
//     try {
//       navigate(`/news/${clickedNewsSlug}`, { 
//         state: { 
//           relatedArticles: related 
//         } 
//       });
//     } catch (navError) {
//       console.error("Error navigating to news detail page:", navError);
//       alert("खबर विवरण पेज पर जाने में त्रुटि हुई।");
//     }
//   };


//   return (
//     <div className="my-4" style={{ fontFamily: "sans-serif" }}>
//       <div className="text-center mb-3">
//         <h4 className="fw-bold mb-0" style={{ color: mainRedColor }}>आज का राशिफल</h4>
//       </div>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-danger fw-bold">{error}</p>}

//       {!loading && !error && (
//         <div className="row text-center mt-4 g-3">
//           {allZodiacSigns.map((sign, index) => {
//             const bgColor = zodiacColors[index % zodiacColors.length];
//             return (
//               <div className="col-4 col-md-2" key={sign.name}>
//                 <div
//                   onClick={() => handleRashiClick(sign.name)}
//                   style={{ cursor: "pointer" }}
//                   className="d-flex flex-column align-items-center"
//                 >
//                   <div
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${bgColor}, #fff)`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                       transition: "transform 0.3s ease",
//                     }}
//                     className="mb-2 icon-circle"
//                   >
//                     {React.cloneElement(sign.icon, { size: "28px", color: "#fff" })}
//                   </div>
//                   <p className="small fw-bold mb-0 text-capitalize">{sign.name}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="mt-5">
//           <div className="d-flex align-items-center mb-3">
//             <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginRight: "8px" }}></div>
//             <h5 className="fw-bold mb-0" style={{ color: mainRedColor }}>राशिफल की अन्य खबरें</h5>
//             <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginLeft: "8px" }}></div>
//           </div>

//           <div className="row g-3">
//             {otherGeneralHoroscopeNews.length === 0 ? (
//               <div className="col-12 text-center py-4">
//                 <p className="lead text-muted">इस समय कोई अन्य राशिफल खबरें उपलब्ध नहीं हैं।</p>
//               </div>
//             ) : (
//               otherGeneralHoroscopeNews.map(news => (
//                 <div 
//                   key={news.slug_en} 
//                   className="col-12 col-md-6" 
//                   onClick={() => handleOtherNewsClick(news.slug_en)} 
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="p-3 border rounded shadow-sm h-100 news-card d-flex align-items-center" style={{ transition: "transform 0.2s ease" }}>
//                     {/* Updated to use news.media[0]?.url for the image source */}
//                     {news.media && news.media.length > 0 && ( 
//                       <div className="news-thumbnail-container me-3">
//                        <img 
//   src={news.media[0]?.url}
//   alt={news.title_hi || news.title_en} 
//   className="img-fluid rounded" 
//   style={{ width: "120px", height: "120px", objectFit: "cover" }} // ✅ बड़ा कर दिया
// />

//                       </div>
//                     )}
//                     <div className="news-content-area flex-grow-1">
//                       <h6 className="fw-bold mb-2">{news.title_hi || news.title_en}</h6>
//                       <p className="small text-muted mb-0">{(news.summary_hi || news.summary_en)?.slice(0, 80)}...</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         .icon-circle:hover {
//           transform: scale(1.15);
//         }
//         .col-12.col-md-6:hover .news-card {
//           transform: translateY(-3px);
//         }
//         .news-card {
//             min-height: 120px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//         }
//         .news-thumbnail-container {
//             flex-shrink: 0;
//         }
//         .news-content-area {
//             flex-grow: 1;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RashifalDetailsPage;




// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   GiAries,
//   GiTaurus,
//   GiGemini,
//   GiCancer,
//   GiLeo,
//   GiVirgo,
//   GiLibra,
//   GiScorpio,
//   GiSagittarius,
//   GiCapricorn,
//   GiAquarius,
//   GiPisces,
// } from "react-icons/gi";

// // Moved outside the component to avoid re-creation on every render
// const allZodiacSigns = [
//   { name: "Aries", icon: <GiAries /> },
//   { name: "Taurus", icon: <GiTaurus /> },
//   { name: "Gemini", icon: <GiGemini /> },
//   { name: "Cancer", icon: <GiCancer /> },
//   { name: "Leo", icon: <GiLeo /> },
//   { name: "Virgo", icon: <GiVirgo /> },
//   { name: "Libra", icon: <GiLibra /> },
//   { name: "Scorpio", icon: <GiScorpio /> },
//   { name: "Sagittarius", icon: <GiSagittarius /> },
//   { name: "Capricorn", icon: <GiCapricorn /> },
//   { name: "Aquarius", icon: <GiAquarius /> },
//   { name: "Pisces", icon: <GiPisces /> },
// ];

// const zodiacMap = {
//   Aries: "मेष",
//   Taurus: "वृष",
//   Gemini: "मिथुन",
//   Cancer: "कर्क",
//   Leo: "सिंह",
//   Virgo: "कन्या",
//   Libra: "तुला",
//   Scorpio: "वृश्चिक",
//   Sagittarius: "धनु",
//   Capricorn: "मकर",
//   Aquarius: "कुंभ",
//   Pisces: "मीन",
// };

// const API_BASE_URL = "https://newsapp.aasmo.in/api/v1/user";
// const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// // Colors for the zodiac sign backgrounds
// const zodiacColors = [
//   "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
//   "#16a085", "#2c3e50", "#c0392b", "#7f8c8d", "#9b59b6", "#34495e"
// ];

// const RashifalDetailsPage = () => {
//   const navigate = useNavigate();
//   const mainRedColor = "#e74c3c";
//   const [allNews, setAllNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     axios.get(`${API_BASE_URL}/news`)
//       .then(res => {
//         const astrologyNews = res.data.data.filter(
//           item => item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
//         );
//         setAllNews(astrologyNews);
//       })
//       .catch(err => {
//         console.error("Error fetching news:", err);
//         setError("खबरें लोड करने में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const getRashiSpecificNews = (rashiName) => {
//     const hindiRashi = zodiacMap[rashiName].toLowerCase();
//     const engRashi = rashiName.toLowerCase();

//     return allNews.filter(item => {
//       const title = (item.title_hi || item.title_en || "").toLowerCase();
//       const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
//       const subSub = (item.subSubCategory || "").toLowerCase();
//       const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
      
//       return title.includes(hindiRashi) || title.includes(engRashi) ||
//              summary.includes(hindiRashi) || summary.includes(engRashi) ||
//              subSub.includes(hindiRashi) || subSub.includes(engRashi) ||
//              tags.includes(hindiRashi) || tags.includes(engRashi);
//     });
//   };

//   const otherGeneralHoroscopeNews = useMemo(() => {
//     if (!allNews.length) return [];
    
//     return allNews.filter(item => {
//       const isHoroscopeCategory = item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase());
//       const hasNullSubSubCategory = !item.subSubCategory || item.subSubCategory.trim() === "";
//       return isHoroscopeCategory && hasNullSubSubCategory;
//     });
//   }, [allNews]);

//   const handleRashiClick = (rashi) => {
//     const clickedRashiNews = getRashiSpecificNews(rashi);
//     if (clickedRashiNews.length === 0) {
//       alert(`${rashi} के लिए कोई खबर नहीं मिली।`);
//       return;
//     }
//     const latestClickedRashiNews = clickedRashiNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//     const otherRashisLatestNews = [];

//     allZodiacSigns.forEach(otherSign => {
//       if (otherSign.name !== rashi) {
//         const newsForOtherRashi = getRashiSpecificNews(otherSign.name);
//         if (newsForOtherRashi.length > 0) {
//           const latestNewsForOtherRashi = newsForOtherRashi.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//           otherRashisLatestNews.push(latestNewsForOtherRashi);
//         }
//       }
//     });

//     navigate(`/news/${latestClickedRashiNews.slug_en}`, { 
//       state: { relatedArticles: otherRashisLatestNews } 
//     });
//   };

//   const handleOtherNewsClick = (clickedNewsSlug) => {
//     const related = otherGeneralHoroscopeNews.filter(news => news.slug_en !== clickedNewsSlug);
//     navigate(`/news/${clickedNewsSlug}`, { 
//       state: { relatedArticles: related } 
//     });
//   };

//   return (
//     <div className="my-4" style={{ fontFamily: "sans-serif" }}>
//       <div className="text-center mb-3">
//         <h4 className="fw-bold mb-0" style={{ color: mainRedColor }}>आज का राशिफल</h4>
//       </div>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-danger fw-bold">{error}</p>}

//       {!loading && !error && (
//         <div className="row text-center mt-4 g-3">
//           {allZodiacSigns.map((sign, index) => {
//             const bgColor = zodiacColors[index % zodiacColors.length];
//             return (
//               <div className="col-4 col-md-2" key={sign.name}>
//                 <div
//                   onClick={() => handleRashiClick(sign.name)}
//                   style={{ cursor: "pointer" }}
//                   className="d-flex flex-column align-items-center"
//                 >
//                   <div
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${bgColor}, #fff)`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                       transition: "transform 0.3s ease",
//                     }}
//                     className="mb-2 icon-circle"
//                   >
//                     {React.cloneElement(sign.icon, { size: "28px", color: "#fff" })}
//                   </div>
//                   <p className="small fw-bold mb-0 text-capitalize">{sign.name}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="mt-5">
//           <div className="d-flex align-items-center mb-3">
//             <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginRight: "8px" }}></div>
//             <h5 className="fw-bold mb-0" style={{ color: mainRedColor }}>राशिफल की अन्य खबरें</h5>
//             <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginLeft: "8px" }}></div>
//           </div>

//           <div className="row g-3">
//             {otherGeneralHoroscopeNews.length === 0 ? (
//               <div className="col-12 text-center py-4">
//                 <p className="lead text-muted">इस समय कोई अन्य राशिफल खबरें उपलब्ध नहीं हैं।</p>
//               </div>
//             ) : (
//               otherGeneralHoroscopeNews.map(news => (
//                 <div 
//                   key={news.slug_en} 
//                   className="col-12 col-md-6" 
//                   onClick={() => handleOtherNewsClick(news.slug_en)} 
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="news-card p-3 shadow-sm">
//                     {news.media && news.media.length > 0 && (
//                       <div className="news-thumbnail-container me-3">
//                         <img 
//                           src={news.media[0]?.url}
//                           alt={news.title_hi || news.title_en}
//                         />
//                       </div>
//                     )}
//                     <div className="news-content-area">
//                       <h6 className="fw-bold mb-2">{news.title_hi || news.title_en}</h6>
//                       <p>{(news.summary_hi || news.summary_en)?.slice(0, 80)}...</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ CSS Styling */}
//       <style>{`
//         .icon-circle:hover {
//           transform: scale(1.15);
//         }

//         .col-12.col-md-6:hover .news-card {
//           transform: translateY(-3px);
//         }

//         .news-card {
//           height: 130px;
//           display: flex;
//           align-items: center;
//           justify-content: flex-start;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 10px;
//           background: #fff;
//           transition: transform 0.2s ease;
//         }

//         .news-thumbnail-container img {
//           width: 90px;
//           height: 90px;
//           object-fit: cover;
//           border-radius: 8px;
//         }

//         .news-content-area {
//           flex: 1;
//           margin-left: 12px;
//           overflow: hidden;
//         }

//         .news-content-area h6 {
//           font-size: 1rem;
//           font-weight: 600;
//           margin-bottom: 6px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .news-content-area p {
//           font-size: 0.875rem;
//           color: #555;
//           margin: 0;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RashifalDetailsPage;


// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// // ✅ Correctly importing the 'allNews' function
// import { allNews } from "../../Services/authApi"; 
// import {
//   GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
//   GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces,
// } from "react-icons/gi";

// // Constants remain outside the component
// const allZodiacSigns = [
//   { name: "Aries", icon: <GiAries /> }, { name: "Taurus", icon: <GiTaurus /> },
//   { name: "Gemini", icon: <GiGemini /> }, { name: "Cancer", icon: <GiCancer /> },
//   { name: "Leo", icon: <GiLeo /> }, { name: "Virgo", icon: <GiVirgo /> },
//   { name: "Libra", icon: <GiLibra /> }, { name: "Scorpio", icon: <GiScorpio /> },
//   { name: "Sagittarius", icon: <GiSagittarius /> }, { name: "Capricorn", icon: <GiCapricorn /> },
//   { name: "Aquarius", icon: <GiAquarius /> }, { name: "Pisces", icon: <GiPisces /> },
// ];

// const zodiacMap = {
//   Aries: "मेष", Taurus: "वृष", Gemini: "मिथुन", Cancer: "कर्क", Leo: "सिंह", Virgo: "कन्या",
//   Libra: "तुला", Scorpio: "वृश्चिक", Sagittarius: "धनु", Capricorn: "मकर", Aquarius: "कुंभ", Pisces: "मीन",
// };

// const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// const zodiacColors = [
//   "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
//   "#16a085", "#2c3e50", "#c0392b", "#7f8c8d", "#9b59b6", "#34495e"
// ];

// const RashifalDetailsPage = () => {
//   const navigate = useNavigate();
//   const mainRedColor = "#e74c3c";
//   const [allNewsData, setAllNewsData] = useState([]); // Renamed for clarity
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchHoroscopeNews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // ✅ CORRECTED: Using the correct function name 'allNews'
//         const res = await allNews(); 
        
//         if (res?.success) {
//           const astrologyNews = res.data.filter(
//             item => item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
//           );
//           setAllNewsData(astrologyNews);
//         } else {
//           setError(res?.message  );
//         }
//       } catch (err) {
//         console.error("Error fetching news:", err);
//         setError(err.message );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHoroscopeNews();
//   }, []);

//   const getRashiSpecificNews = (rashiName) => {
//     const hindiRashi = zodiacMap[rashiName].toLowerCase();
//     const engRashi = rashiName.toLowerCase();

//     return allNewsData.filter(item => {
//       const title = (item.title_hi || item.title_en || "").toLowerCase();
//       const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
//       const subSub = (item.subSubCategory || "").toLowerCase();
//       const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
      
//       return title.includes(hindiRashi) || title.includes(engRashi) ||
//              summary.includes(hindiRashi) || summary.includes(engRashi) ||
//              subSub.includes(hindiRashi) || subSub.includes(engRashi) ||
//              tags.includes(hindiRashi) || tags.includes(engRashi);
//     });
//   };

//   const otherGeneralHoroscopeNews = useMemo(() => {
//     if (!allNewsData.length) return [];
    
//     return allNewsData.filter(item => {
//       const isHoroscopeCategory = item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase());
//       const hasNullSubSubCategory = !item.subSubCategory || item.subSubCategory.trim() === "";
//       return isHoroscopeCategory && hasNullSubSubCategory;
//     });
//   }, [allNewsData]);

//   const handleRashiClick = (rashi) => {
//     const clickedRashiNews = getRashiSpecificNews(rashi);
//     if (clickedRashiNews.length === 0) {
//       alert(`${rashi} `);
//       return;
//     }
//     const latestClickedRashiNews = clickedRashiNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//     const otherRashisLatestNews = [];

//     allZodiacSigns.forEach(otherSign => {
//       if (otherSign.name !== rashi) {
//         const newsForOtherRashi = getRashiSpecificNews(otherSign.name);
//         if (newsForOtherRashi.length > 0) {
//           const latestNewsForOtherRashi = newsForOtherRashi.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//           otherRashisLatestNews.push(latestNewsForOtherRashi);
//         }
//       }
//     });

//     navigate(`/news/${latestClickedRashiNews.slug_en}`, { 
//       state: { relatedArticles: otherRashisLatestNews } 
//     });
//   };

//   const handleOtherNewsClick = (clickedNewsSlug) => {
//     const related = otherGeneralHoroscopeNews.filter(news => news.slug_en !== clickedNewsSlug);
//     navigate(`/news/${clickedNewsSlug}`, { 
//       state: { relatedArticles: related } 
//     });
//   };

//   return (
//     <div className="my-4" style={{ fontFamily: "sans-serif" }}>
//       <div className="text-center mb-3">
//         <h4 className="fw-bold mb-0" style={{ color: mainRedColor }}>आज का राशिफल</h4>
//       </div>

//       {loading && <p className="text-center"></p>}
//       {error && <p className="text-center text-danger fw-bold">{error}</p>}

//       {!loading && !error && (
//         <>
//           <div className="row text-center mt-4 g-3">
//             {allZodiacSigns.map((sign, index) => {
//               const bgColor = zodiacColors[index % zodiacColors.length];
//               return (
//                 <div className="col-4 col-md-2" key={sign.name}>
//                   <div
//                     onClick={() => handleRashiClick(sign.name)}
//                     style={{ cursor: "pointer" }}
//                     className="d-flex flex-column align-items-center"
//                   >
//                     <div
//                       style={{
//                         width: "60px", height: "60px", borderRadius: "50%",
//                         background: `linear-gradient(135deg, ${bgColor}, #fff)`,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                         transition: "transform 0.3s ease",
//                       }}
//                       className="mb-2 icon-circle"
//                     >
//                       {React.cloneElement(sign.icon, { size: "28px", color: "#fff" })}
//                     </div>
//                     <p className="small fw-bold mb-0 text-capitalize">{sign.name}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-5">
//             <div className="d-flex align-items-center mb-3">
//               <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginRight: "8px" }}></div>
//               <h5 className="fw-bold mb-0" style={{ color: mainRedColor }}>राशिफल की अन्य खबरें</h5>
//               <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginLeft: "8px" }}></div>
//             </div>

//             <div className="row g-3">
//               {otherGeneralHoroscopeNews.length === 0 ? (
//                 <div className="col-12 text-center py-4">
//                   <p className="lead text-muted"></p>
//                 </div>
//               ) : (
//                 otherGeneralHoroscopeNews.map(news => (
//                   <div 
//                     key={news.slug_en} 
//                     className="col-12 col-md-6" 
//                     onClick={() => handleOtherNewsClick(news.slug_en)} 
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className="news-card p-3 shadow-sm">
//                       {news.media && news.media.length > 0 && (
//                         <div className="news-thumbnail-container me-3">
//                           <img 
//                             src={news.media[0]?.url}
//                             alt={news.title_hi || news.title_en}
//                           />
//                         </div>
//                       )}
//                       <div className="news-content-area">
//                         <h6 className="fw-bold mb-2">{news.title_hi || news.title_en}</h6>
//                         <p>{(news.summary_hi || news.summary_en)?.slice(0, 80)}...</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </>
//       )}

//       <style>{`
//         /* Styles remain the same */
//         .icon-circle:hover { transform: scale(1.15); }
//         .col-12.col-md-6:hover .news-card { transform: translateY(-3px); }
//         .news-card { height: 130px; display: flex; align-items: center; justify-content: flex-start; padding: 10px; border: 1px solid #ddd; border-radius: 10px; background: #fff; transition: transform 0.2s ease; }
//         .news-thumbnail-container img { width: 90px; height: 90px; object-fit: cover; border-radius: 8px; }
//         .news-content-area { flex: 1; margin-left: 12px; overflow: hidden; }
//         .news-content-area h6 { font-size: 1rem; font-weight: 600; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .news-content-area p { font-size: 0.875rem; color: #555; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//       `}</style>
//     </div>
//   );
// };

// export default RashifalDetailsPage;

// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { allNews, fetchActiveAds } from "../../Services/authApi"; // fetchActiveAds added
// import {
//   GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
//   GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces,
// } from "react-icons/gi";

// // --- Constants ---
// const allZodiacSigns = [
//   { name: "Aries", icon: <GiAries /> }, { name: "Taurus", icon: <GiTaurus /> },
//   { name: "Gemini", icon: <GiGemini /> }, { name: "Cancer", icon: <GiCancer /> },
//   { name: "Leo", icon: <GiLeo /> }, { name: "Virgo", icon: <GiVirgo /> },
//   { name: "Libra", icon: <GiLibra /> }, { name: "Scorpio", icon: <GiScorpio /> },
//   { name: "Sagittarius", icon: <GiSagittarius /> }, { name: "Capricorn", icon: <GiCapricorn /> },
//   { name: "Aquarius", icon: <GiAquarius /> }, { name: "Pisces", icon: <GiPisces /> },
// ];

// const zodiacMap = {
//   Aries: "मेष", Taurus: "वृष", Gemini: "मिथुन", Cancer: "कर्क", Leo: "सिंह", Virgo: "कन्या",
//   Libra: "तुला", Scorpio: "वृश्चिक", Sagittarius: "धनु", Capricorn: "मकर", Aquarius: "कुंभ", Pisces: "मीन",
// };

// const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// const zodiacColors = [
//   "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
//   "#16a085", "#2c3e50", "#c0392b", "#7f8c8d", "#9b59b6", "#34495e"
// ];

// // --- Ad Render Components ---

// // 1. Inline Ad (728x90) - Top & Middle 2
// const RenderInlineAd = ({ ad }) => {
//   if (!ad) return null;
//   return (
//     <div className="inline-ad-wrapper mb-4">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>
//       <style>{`
//         .inline-ad-wrapper { width: 100%; max-width: 728px; margin: 0 auto; text-align: center; }
//         .inline-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 728 / 90; object-fit: cover; border-radius: 4px; }
//         @media (max-width: 991px) { .inline-ad-wrapper { max-width: 100%; padding: 0 10px; } }
//       `}</style>
//     </div>
//   );
// };

// // 2. Inline Large Ad (970x250) - Middle 1 (After Title)
// const RenderInlineLargeAd = ({ ad }) => {
//   if (!ad) return null;
//   return (
//     <div className="inline-large-ad-wrapper my-4">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>
//       <style>{`
//         .inline-large-ad-wrapper { width: 100%; max-width: 970px; margin: 24px auto; text-align: center; }
//         .inline-large-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 970 / 250; object-fit: cover; border-radius: 6px; }
//         @media (max-width: 991px) { .inline-large-ad-wrapper { max-width: 100%; padding: 0 10px; } }
//       `}</style>
//     </div>
//   );
// };

// // 3. Bottom Ad (970x250)
// const RenderBottomAd = ({ ad }) => {
//   if (!ad) return null;
//   return (
//     <div className="bottom-ad-wrapper mt-4">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>
//       <style>{`
//         .bottom-ad-wrapper { width: 100%; max-width: 970px; margin: 24px auto 0; overflow: hidden; text-align: center; }
//         .bottom-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 970 / 250; object-fit: cover; border-radius: 6px; }
//         @media (max-width: 991px) { .bottom-ad-wrapper { max-width: 100%; padding: 0 10px; } }
//       `}</style>
//     </div>
//   );
// };

// // --- Main Component ---

// const RashifalDetailsPage = () => {
//   const navigate = useNavigate();
//   const mainRedColor = "#e74c3c";
//   const [allNewsData, setAllNewsData] = useState([]);
//   const [ads, setAds] = useState({
//     inline: null,
//     inlineLarge: null,
//     inline2: null,
//     bottom: null,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Parallel Fetching
//         const [newsRes, adsRes] = await Promise.all([
//           allNews(),
//           fetchActiveAds()
//         ]);
        
//         // 1. Process News
//         if (newsRes?.success) {
//           const astrologyNews = newsRes.data.filter(
//             item => item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
//           );
//           setAllNewsData(astrologyNews);
//         } else {
//           setError(newsRes?.message);
//         }

//         // 2. Process Ads (Filtered by "Astrology")
//         if (adsRes?.success && Array.isArray(adsRes.ads)) {
//           const isAstrologyAd = (ad) => {
//             return (
//               ad.categories &&
//               ad.categories.some(
//                 (cat) =>
//                   cat.toLowerCase() === "astrology" ||
//                   cat.toLowerCase() === "राशिफल"
//               )
//             );
//           };

//           const inlineAd = adsRes.ads.find(a => a.position === "inline" && isAstrologyAd(a));
//           const inlineLargeAd = adsRes.ads.find(a => a.position === "inlineLarge" && isAstrologyAd(a));
//           const inline2Ad = adsRes.ads.find(a => a.position === "inline2" && isAstrologyAd(a));
//           const bottomAd = adsRes.ads.find(a => a.position === "bottom" && isAstrologyAd(a));

//           setAds({
//             inline: inlineAd || null,
//             inlineLarge: inlineLargeAd || null,
//             inline2: inline2Ad || null,
//             bottom: bottomAd || null,
//           });
//         }

//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // --- Logic Helpers ---
//   const getRashiSpecificNews = (rashiName) => {
//     const hindiRashi = zodiacMap[rashiName].toLowerCase();
//     const engRashi = rashiName.toLowerCase();

//     return allNewsData.filter(item => {
//       const title = (item.title_hi || item.title_en || "").toLowerCase();
//       const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
//       const subSub = (item.subSubCategory || "").toLowerCase();
//       const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
      
//       return title.includes(hindiRashi) || title.includes(engRashi) ||
//              summary.includes(hindiRashi) || summary.includes(engRashi) ||
//              subSub.includes(hindiRashi) || subSub.includes(engRashi) ||
//              tags.includes(hindiRashi) || tags.includes(engRashi);
//     });
//   };

//   const otherGeneralHoroscopeNews = useMemo(() => {
//     if (!allNewsData.length) return [];
    
//     return allNewsData.filter(item => {
//       const isHoroscopeCategory = item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase());
//       const hasNullSubSubCategory = !item.subSubCategory || item.subSubCategory.trim() === "";
//       return isHoroscopeCategory && hasNullSubSubCategory;
//     });
//   }, [allNewsData]);

//   const handleRashiClick = (rashi) => {
//     const clickedRashiNews = getRashiSpecificNews(rashi);
//     if (clickedRashiNews.length === 0) {
//       alert(`${rashi} `);
//       return;
//     }
//     const latestClickedRashiNews = clickedRashiNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//     const otherRashisLatestNews = [];

//     allZodiacSigns.forEach(otherSign => {
//       if (otherSign.name !== rashi) {
//         const newsForOtherRashi = getRashiSpecificNews(otherSign.name);
//         if (newsForOtherRashi.length > 0) {
//           const latestNewsForOtherRashi = newsForOtherRashi.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
//           otherRashisLatestNews.push(latestNewsForOtherRashi);
//         }
//       }
//     });

//     navigate(`/news/${latestClickedRashiNews.slug_en}`, { 
//       state: { relatedArticles: otherRashisLatestNews } 
//     });
//   };

//   const handleOtherNewsClick = (clickedNewsSlug) => {
//     const related = otherGeneralHoroscopeNews.filter(news => news.slug_en !== clickedNewsSlug);
//     navigate(`/news/${clickedNewsSlug}`, { 
//       state: { relatedArticles: related } 
//     });
//   };

//   // --- Render News Item Helper ---
//   const renderNewsItem = (news) => (
//     <div 
//       key={news.slug_en || news._id} 
//       className="col-12 col-md-6" 
//       onClick={() => handleOtherNewsClick(news.slug_en)} 
//       style={{ cursor: "pointer" }}
//     >
//       <div className="news-card p-3 shadow-sm">
//         {news.media && news.media.length > 0 && (
//           <div className="news-thumbnail-container me-3">
//             <img 
//               src={news.media[0]?.url}
//               alt={news.title_hi || news.title_en}
//               onError={(e) => { e.target.src = "https://via.placeholder.com/90x90?text=Error"; }}
//             />
//           </div>
//         )}
//         <div className="news-content-area">
//           <h6 className="fw-bold mb-2">{news.title_hi || news.title_en}</h6>
//           <p>{(news.summary_hi || news.summary_en)?.slice(0, 80)}...</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="my-4 container" style={{ fontFamily: "sans-serif" }}>
      
//       {/* 1. TOP AD (Just above 'Aaj Ka Rashifal') */}
//       <RenderInlineAd ad={ads.inline} />

//       <div className="text-center mb-3">
//         <h4 className="fw-bold mb-0" style={{ color: mainRedColor }}>आज का राशिफल</h4>
//       </div>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-danger fw-bold">{error}</p>}

//       {!loading && !error && (
//         <>
//           {/* Zodiac Icons */}
//           <div className="row text-center mt-4 g-3">
//             {allZodiacSigns.map((sign, index) => {
//               const bgColor = zodiacColors[index % zodiacColors.length];
//               return (
//                 <div className="col-4 col-md-2" key={sign.name}>
//                   <div
//                     onClick={() => handleRashiClick(sign.name)}
//                     style={{ cursor: "pointer" }}
//                     className="d-flex flex-column align-items-center"
//                   >
//                     <div
//                       style={{
//                         width: "60px", height: "60px", borderRadius: "50%",
//                         background: `linear-gradient(135deg, ${bgColor}, #fff)`,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                         transition: "transform 0.3s ease",
//                       }}
//                       className="mb-2 icon-circle"
//                     >
//                       {React.cloneElement(sign.icon, { size: "28px", color: "#fff" })}
//                     </div>
//                     <p className="small fw-bold mb-0 text-capitalize">{sign.name}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-5">
//             {/* Divider Title */}
//             <div className="d-flex align-items-center mb-3">
//               <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginRight: "8px" }}></div>
//               <h5 className="fw-bold mb-0" style={{ color: mainRedColor }}>राशिफल की अन्य खबरें</h5>
//               <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginLeft: "8px" }}></div>
//             </div>

//             {/* 2. MIDDLE AD 1 (Inline Large) - After Title */}
//             <RenderInlineLargeAd ad={ads.inlineLarge} />

//             {/* News List */}
//             {otherGeneralHoroscopeNews.length === 0 ? (
//               <div className="col-12 text-center py-4">
//                 <p className="lead text-muted">कोई खबर उपलब्ध नहीं है।</p>
//               </div>
//             ) : (
//               <>
//                 {/* First 6 News */}
//                 <div className="row g-3">
//                   {otherGeneralHoroscopeNews.slice(0, 6).map(news => renderNewsItem(news))}
//                 </div>

//                 {/* 3. MIDDLE AD 2 (Inline) - After 6 News */}
//                 <RenderInlineAd ad={ads.inline2} />

//                 {/* Remaining News */}
//                 <div className="row g-3 mt-1">
//                   {otherGeneralHoroscopeNews.slice(6).map(news => renderNewsItem(news))}
//                 </div>
//               </>
//             )}
//           </div>
//         </>
//       )}

//       {/* 4. BOTTOM AD (At the end) */}
//       <RenderBottomAd ad={ads.bottom} />

//       <style>{`
//         /* Existing Styles */
//         .icon-circle:hover { transform: scale(1.15); }
//         .col-12.col-md-6:hover .news-card { transform: translateY(-3px); }
//         .news-card { height: 130px; display: flex; align-items: center; justify-content: flex-start; padding: 10px; border: 1px solid #ddd; border-radius: 10px; background: #fff; transition: transform 0.2s ease; }
//         .news-thumbnail-container img { width: 90px; height: 90px; object-fit: cover; border-radius: 8px; }
//         .news-content-area { flex: 1; margin-left: 12px; overflow: hidden; }
//         .news-content-area h6 { font-size: 1rem; font-weight: 600; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .news-content-area p { font-size: 0.875rem; color: #555; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//       `}</style>
//     </div>
//   );
// };

// export default RashifalDetailsPage;





 
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { allNews } from "../../Services/authApi";
import {
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces,
} from "react-icons/gi";
 
// राशियों की लिस्ट और उनके कीवर्ड्स (Phonetic names भी जोड़े हैं ताकि API से मैच हो सके)
const allZodiacSigns = [
  { name: "Aries", hindi: "मेष", phonetic: "Mesh", icon: <GiAries /> },
  { name: "Taurus", hindi: "वृष", phonetic: "Vrishabh", icon: <GiTaurus /> },
  { name: "Gemini", hindi: "मिथुन", phonetic: "Mithun", icon: <GiGemini /> },
  { name: "Cancer", hindi: "कर्क", phonetic: "Kark", icon: <GiCancer /> },
  { name: "Leo", hindi: "सिंह", phonetic: "Singh", icon: <GiLeo /> },
  { name: "Virgo", hindi: "कन्या", phonetic: "Kanya", icon: <GiVirgo /> },
  { name: "Libra", hindi: "तुला", phonetic: "Tula", icon: <GiLibra /> },
  { name: "Scorpio", hindi: "वृश्चिक", phonetic: "Vrishchik", icon: <GiScorpio /> },
  { name: "Sagittarius", hindi: "धनु", phonetic: "Dhanu", icon: <GiSagittarius /> },
  { name: "Capricorn", hindi: "मकर", phonetic: "Makar", icon: <GiCapricorn /> },
  { name: "Aquarius", hindi: "कुंभ", phonetic: "Kumbh", icon: <GiAquarius /> },
  { name: "Pisces", hindi: "मीन", phonetic: "Meen", icon: <GiPisces /> },
];
 
const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];
 
const zodiacColors = [
  "#e74c3c", "#f39c12", "#27ae60", "#2980b9", "#8e44ad", "#d35400",
  "#16a085", "#2c3e50", "#c0392b", "#7f8c8d", "#9b59b6", "#34495e"
];
 
const RashifalDetailsPage = () => {
  const navigate = useNavigate();
  const mainRedColor = "#e74c3c";
  const [allNewsData, setAllNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHoroscopeNews = async () => {
      setLoading(true);
      try {
        const res = await allNews();
        if (res?.success) {
          // केवल Astrology कैटेगरी वाली खबरें लें
          const astrologyNews = res.data.filter(
            item => item.category?.name && HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
          );
          setAllNewsData(astrologyNews);
        } else {
          setError(res?.message);
        }
      } catch (err) {
        setError("खबरें लोड करने में समस्या आ रही है।");
      } finally {
        setLoading(false);
      }
    };
    fetchHoroscopeNews();
  }, []);
 
  // 1. राशि के अनुसार फिल्टर करने वाला फंक्शन (Taurus पर क्लिक करने पर क्या दिखे)
  const getRashiSpecificNews = (signObj) => {
    const hindi = signObj.hindi.toLowerCase();
    const eng = signObj.name.toLowerCase();
    const pho = signObj.phonetic.toLowerCase();
 
    return allNewsData.filter(item => {
      const subSub = (item.subSubCategory || "").toLowerCase();
      const title = (item.title_hi || "").toLowerCase();
     
      // subSubCategory में नाम मिल जाए या टाइटल में राशि का नाम हो
      return subSub.includes(pho) || subSub.includes(eng) || subSub.includes(hindi) ||
             title.includes(hindi) || title.includes(pho);
    });
  };
 
  // 2. "अन्य खबरें" (Other News) - जिसमें कोई subSubCategory (राशि) ना हो
  const otherGeneralHoroscopeNews = useMemo(() => {
    return allNewsData.filter(item => {
      // अगर subSubCategory खाली है या null है, तभी नीचे दिखाओ
      return !item.subSubCategory || item.subSubCategory.trim() === "";
    });
  }, [allNewsData]);
 
  const handleRashiClick = (signObj) => {
    const clickedRashiNews = getRashiSpecificNews(signObj);
   
    if (clickedRashiNews.length === 0) {
      alert(`${signObj.hindi} के लिए अभी कोई ताज़ा खबर नहीं है।`);
      return;
    }
 
    // सबसे लेटेस्ट खबर चुनें
    const latestNews = clickedRashiNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
   
    // अन्य राशियों की लेटेस्ट खबरें (Related Articles के लिए)
    const otherRashisLatestNews = [];
    allZodiacSigns.forEach(s => {
      if (s.name !== signObj.name) {
        const news = getRashiSpecificNews(s);
        if (news.length > 0) {
          otherRashisLatestNews.push(news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0]);
        }
      }
    });
 
    navigate(`/news/${latestNews.slug_en}`, {
      state: { relatedArticles: otherRashisLatestNews }
    });
  };
 
  const handleOtherNewsClick = (clickedNewsSlug) => {
    const related = otherGeneralHoroscopeNews.filter(news => news.slug_en !== clickedNewsSlug);
    navigate(`/news/${clickedNewsSlug}`, {
      state: { relatedArticles: related }
    });
  };
 
  return (
    <div className="my-4" style={{ fontFamily: "sans-serif" }}>
      <div className="text-center mb-3">
        <h4 className="fw-bold mb-0" style={{ color: mainRedColor }}>आज का राशिफल</h4>
      </div>
 
      {loading && <p className="text-center">राशिफल लोड हो रहा है...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
 
      {!loading && !error && (
        <>
          {/* राशियों के आइकॉन वाला सेक्शन */}
          <div className="row text-center mt-4 g-3">
            {allZodiacSigns.map((sign, index) => {
              const bgColor = zodiacColors[index % zodiacColors.length];
              return (
                <div className="col-4 col-md-2" key={sign.name}>
                  <div
                    onClick={() => handleRashiClick(sign)}
                    style={{ cursor: "pointer" }}
                    className="d-flex flex-column align-items-center"
                  >
                    <div
                      style={{
                        width: "60px", height: "60px", borderRadius: "50%",
                        background: `linear-gradient(135deg, ${bgColor}, #fff)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        transition: "transform 0.3s ease",
                      }}
                      className="mb-2 icon-circle"
                    >
                      {React.cloneElement(sign.icon, { size: "28px", color: "#fff" })}
                    </div>
                    <p className="small fw-bold mb-0">{sign.hindi}</p>
                  </div>
                </div>
              );
            })}
          </div>
 
          {/* राशिफल की अन्य खबरें सेक्शन - यहाँ केवल वही दिखेंगी जिनमें राशि नहीं है */}
          <div className="mt-5">
            <div className="d-flex align-items-center mb-3">
              <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginRight: "8px" }}></div>
              <h5 className="fw-bold mb-0" style={{ color: mainRedColor }}>राशिफल की अन्य खबरें</h5>
              <div style={{ flex: 1, height: "2px", backgroundColor: mainRedColor, marginLeft: "8px" }}></div>
            </div>
 
            <div className="row g-3">
              {otherGeneralHoroscopeNews.length === 0 ? (
                <div className="col-12 text-center py-4">
                  <p className="text-muted">कोई अन्य खबर उपलब्ध नहीं है।</p>
                </div>
              ) : (
                otherGeneralHoroscopeNews.map(news => (
                  <div
                    key={news._id}
                    className="col-12 col-md-6"
                    onClick={() => handleOtherNewsClick(news.slug_en)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="news-card p-3 shadow-sm">
                      {news.media && news.media.length > 0 && (
                        <div className="news-thumbnail-container">
                          <img src={news.media[0]?.url} alt="news" />
                        </div>
                      )}
                      <div className="news-content-area">
                        {/* <h6 className="fw-bold mb-1">{news.title_hi || news.title_en}</h6> */}
        <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: news?.title_hi || news?.title_en }} 
                  />
                        <p className="small text-muted">{(news.summary_hi || "").slice(0, 60)}...</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
 
      <style>{`
        .icon-circle:hover { transform: scale(1.15); }
        .news-card { height: 100px; display: flex; align-items: center; border: 1px solid #eee; border-radius: 10px; background: #fff; overflow: hidden; }
        .news-thumbnail-container img { width: 80px; height: 80px; object-fit: cover; border-radius: 5px; margin-left: 10px;}
        .news-content-area { padding: 0 15px; flex: 1; }
        .news-content-area h6 { font-size: 0.95rem; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};
 
export default RashifalDetailsPage;
 