// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { allNews } from '../../Services/authApi';
// import { Spinner, Alert } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// // ❌ Horoscope categories ko filter karna hai
// const HOROSCOPE_CATEGORIES = ['horoscope', 'rashifal', 'astrology'];

// // ✅ Date format helper
// const formatDate = (dateString) => {
//     if (!dateString) return '';
//     return new Date(dateString).toLocaleDateString('hi-IN', { 
//         day: 'numeric', 
//         month: 'long', 
//         year: 'numeric' 
//     });
// };

// const OtherNews = () => {
//     const [newsData, setNewsData] = useState([]);
//     const [fullNewsList, setFullNewsList] = useState([]); 
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchNews = async () => {
//             setLoading(true);
//             try {
//                 const response = await allNews();
//                 if (response?.success && response.data) {
//                     // ✅ API -> category.name ko check karke horoscope filter
//                     const filteredNews = response.data.filter(item => {
//                         const category = item.category?.name?.toLowerCase();
//                         return category && !HOROSCOPE_CATEGORIES.includes(category);
//                     });

//                     setFullNewsList(filteredNews);
//                     setNewsData(filteredNews.slice(5)); // ✅ skip first 5, show others
//                 } else {
//                     setError("Failed to load news.");
//                 }
//             } catch (err) {
//                 setError("अन्य समाचार लोड करने में विफल।");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchNews();
//     }, []);

//     // ✅ Placeholder style
//     const imagePlaceholderStyle = {
//         width: '150px',
//         height: '100px',
//         backgroundColor: '#e9ecef',
//         objectFit: 'cover'
//     };
//     const redColor = '#c0392b';

//     if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>;
//     if (error) return <div className="container my-4"><Alert variant="danger">{error}</Alert></div>;

//     return (
//         <div className="container my-5">
//             {/* ✅ Header */}
//             <div className="d-flex align-items-center mb-3">
//                 <h3 className="fw-bold mb-0 flex-shrink-0 me-3" style={{ color: redColor }}>
//                     भारत की अन्य खबरें
//                 </h3>
//                 <div className="flex-grow-1" style={{ height: '3px', backgroundColor: redColor }}></div>
//             </div>

//             <div>
//                 {newsData.map((newsItem, index) => {
//                     // ✅ Related articles filter by category._id
//                     const relatedArticlesForThisItem = fullNewsList.filter(
//                         article => article.category?._id === newsItem.category?._id
//                     );

//                     return (
//                         <Link 
//                             // ✅ API -> slug_en
//                             to={`/news/${newsItem.slug_en}`} 
//                             key={newsItem.slug_en}
//                             state={{ relatedArticles: relatedArticlesForThisItem }}
//                             className="text-decoration-none text-dark"
//                         >
//                             <div className={`d-flex py-3 ${index < newsData.length - 1 ? 'border-bottom' : ''}`}>
                                
//                                 {/* ✅ API -> media[0].url */}
//                                 {newsItem.media && newsItem.media[0] ? (
//                                     <img 
//                                         src={newsItem.media[0].url} 
//                                         alt={newsItem.title_hi || newsItem.title_en} 
//                                         className="rounded flex-shrink-0 me-3" 
//                                         style={imagePlaceholderStyle} 
//                                     />
//                                 ) : (
//                                     <div className="rounded flex-shrink-0 me-3" style={imagePlaceholderStyle}></div>
//                                 )}

//                                 <div className="d-flex flex-column flex-grow-1">
//                                     {/* ✅ Title: API -> title_hi / title_en */}
//                                     <h5 className="fw-bold mb-1" style={{ lineHeight: '1.4' }}>
//                                         {newsItem.title_hi || newsItem.title_en}
//                                     </h5>

//                                     {/* ✅ Author + Date */}
//                                     <div className="d-flex align-items-center mb-1">
//                                         <UserAvatar user={newsItem.createdBy} size={20} />
//                                         <small className="ms-2 text-muted" style={{ fontSize: '0.75rem' }}>
//                                             {newsItem.createdBy?.name || "EMS News"} | {formatDate(newsItem.createdAt)}
//                                         </small>
//                                     </div>

//                                     {/* ✅ Summary: API -> summary */}
//                                     <p className="mb-0 text-secondary" style={{ fontSize: '0.95rem' }}>
//                                         {newsItem.summary}
//                                     </p>
//                                 </div>
//                             </div>
//                         </Link>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default OtherNews;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { allNews } from '../../Services/authApi';
// import { Spinner, Alert } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// const HOROSCOPE_CATEGORIES = ['horoscope', 'rashifal', 'astrology'];

// const OtherNews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [fullNewsList, setFullNewsList] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const response = await allNews();
//         if (response?.success && response.data) {
//           const filteredNews = response.data.filter(item => {
//             const category = item.category?.name?.toLowerCase();
//             return category && !HOROSCOPE_CATEGORIES.includes(category);
//           });

//           setFullNewsList(filteredNews);
//           setNewsData(filteredNews.slice(5));
//         } else {
//           setError("Failed to load news.");
//         }
//       } catch (err) {
//         setError("अन्य समाचार लोड करने में विफल।");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const imagePlaceholderStyle = {
//     width: '150px',
//     height: '100px',
//     backgroundColor: '#e9ecef',
//     objectFit: 'cover'
//   };
//   const redColor = '#c0392b';

//   if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>;
//   if (error) return <div className="container my-4"><Alert variant="danger">{error}</Alert></div>;

//   return (
//     <div className="container my-5">
//       {/* ✅ Header */}
//       <div className="d-flex align-items-center mb-3">
//         <h3 className="fw-bold mb-0 flex-shrink-0 me-3" style={{ color: redColor }}>
//           भारत की अन्य खबरें
//         </h3>
//         <div className="flex-grow-1" style={{ height: '3px', backgroundColor: redColor }}></div>
//       </div>

//       <div>
//         {newsData.map((newsItem, index) => {
//           const relatedArticlesForThisItem = fullNewsList.filter(
//             article => article.category?._id === newsItem.category?._id
//           );

//           return (
//             <Link 
//               to={`/news/${newsItem.slug_en}`} 
//               key={newsItem.slug_en}
//               state={{ relatedArticles: relatedArticlesForThisItem }}
//               className="text-decoration-none text-dark"
//             >
//               <div className={`d-flex py-3 ${index < newsData.length - 1 ? 'border-bottom' : ''}`}>
                
//                 {/* ✅ Image */}
//                 {newsItem.media && newsItem.media[0] ? (
//                   <img 
//                     src={newsItem.media[0].url} 
//                     alt={newsItem.title_hi || newsItem.title_en} 
//                     className="rounded flex-shrink-0 me-3" 
//                     style={imagePlaceholderStyle} 
//                   />
//                 ) : (
//                   <div className="rounded flex-shrink-0 me-3" style={imagePlaceholderStyle}></div>
//                 )}

//                 <div className="d-flex flex-column flex-grow-1">
//                   {/* ✅ Title */}
//                   <h5 className="fw-bold mb-1" style={{ lineHeight: '1.4' }}>
//                     {newsItem.title_hi || newsItem.title_en}
//                   </h5>

//                   {/* ✅ Summary (2 line clamp) */}
//                   <p 
//                     className="mb-1 text-secondary"
//                     style={{ 
//                       fontSize: '0.95rem',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis'
//                     }}
//                   >
//                     {newsItem.summary_hi || newsItem.summary_en}
//                   </p>

//                   {/* ✅ Author + Date */}
//                   <div className="d-flex align-items-center">
//                     <UserAvatar user={newsItem.createdBy} size={22} />
//                     <small className="ms-2 text-muted" style={{ fontSize: '0.8rem' }}>
//                       {newsItem.createdBy?.name || "EMS News"} |{" "}
//                       {newsItem.postedDate || new Date(newsItem.publishedAt).toLocaleDateString("hi-IN")}{" "}
//                       {newsItem.postedTime ? `| ${newsItem.postedTime}` : ""}
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default OtherNews;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const HOROSCOPE_CATEGORIES = ["horoscope", "rashifal", "astrology"];

// const OtherNews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [fullNewsList, setFullNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const response = await allNews();
//         if (response?.success && response.data) {
//           const filteredNews = response.data.filter((item) => {
//             const category = item.category?.name?.toLowerCase();
//             return category && !HOROSCOPE_CATEGORIES.includes(category);
//           });

//           setFullNewsList(filteredNews);
//           setNewsData(filteredNews.slice(5));
//         } else {
//           setError("Failed to load news.");
//         }
//       } catch (err) {
//         setError("अन्य समाचार लोड करने में विफल।");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // ✅ Proper Date + Time Formatter (safe for missing fields)
//   const formatDateTime = (item) => {
//     const rawDate = item?.publishedAt || item?.createdAt || item?.updatedAt;
//     if (!rawDate) return "समय उपलब्ध नहीं";

//     const dateObj = new Date(rawDate);
//     if (isNaN(dateObj)) return "Invalid Date";

//     return dateObj.toLocaleString("hi-IN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const imagePlaceholderStyle = {
//     width: "150px",
//     height: "100px",
//     backgroundColor: "#e9ecef",
//     objectFit: "cover",
//   };

//   const redColor = "#c0392b";

//   if (loading)
//     return (
//       <div className="text-center my-5">
//         <Spinner animation="border" variant="danger" />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="container my-4">
//         <Alert variant="danger">{error}</Alert>
//       </div>
//     );

//   return (
//     <div className="container my-5">
//       {/* ✅ Header */}
//       <div className="d-flex align-items-center mb-3">
//         <h3
//           className="fw-bold mb-0 flex-shrink-0 me-3"
//           style={{ color: redColor }}
//         >
//           भारत की अन्य खबरें
//         </h3>
//         <div
//           className="flex-grow-1"
//           style={{ height: "3px", backgroundColor: redColor }}
//         ></div>
//       </div>

//       <div>
//         {newsData.map((newsItem, index) => {
//           const relatedArticlesForThisItem = fullNewsList.filter(
//             (article) => article.category?._id === newsItem.category?._id
//           );

//           return (
//             <Link
//               to={`/news/${newsItem.slug_en || newsItem._id}`}
//               key={newsItem._id || index}
//               state={{ relatedArticles: relatedArticlesForThisItem }}
//               className="text-decoration-none text-dark"
//             >
//               <div
//                 className={`d-flex py-3 ${
//                   index < newsData.length - 1 ? "border-bottom" : ""
//                 }`}
//               >
//                 {/* ✅ Image */}
//                 {newsItem.media && newsItem.media[0] ? (
//                   <img
//                     src={newsItem.media[0].url}
//                     alt={newsItem.title_hi || newsItem.title_en}
//                     className="rounded flex-shrink-0 me-3"
//                     style={imagePlaceholderStyle}
//                   />
//                 ) : (
//                   <div
//                     className="rounded flex-shrink-0 me-3"
//                     style={imagePlaceholderStyle}
//                   ></div>
//                 )}

//                 {/* ✅ Text Content */}
//                 <div className="d-flex flex-column flex-grow-1">
//                   <h5 className="fw-bold mb-1" style={{ lineHeight: "1.4" }}>
//                     {newsItem.title_hi || newsItem.title_en}
//                   </h5>

//                   <p
//                     className="mb-1 text-secondary"
//                     style={{
//                       fontSize: "0.95rem",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {newsItem.summary_hi || newsItem.summary_en}
//                   </p>

//                   {/* ✅ Author + Date + Time */}
//                   <div className="d-flex align-items-center">
//                     <UserAvatar user={newsItem.createdBy} size={22} />
//                     <small
//                       className="ms-2 text-muted"
//                       style={{ fontSize: "0.8rem" }}
//                     >
//                       {newsItem.createdBy?.name || "EMS News"} |{" "}
//                       {formatDateTime(newsItem)}
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default OtherNews;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const HOROSCOPE_CATEGORIES = ["horoscope", "rashifal", "astrology"];

// // Re-using the formatFullDateTime from RelatedNews for consistency
// // Format date to dd/mm/yyyy hh:mm (24-hour format)
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "समय उपलब्ध नहीं";
//   const options = {
//     day: "2-digit",
//     month: "2-digit", // Numeric month (e.g., 01 for January, 10 for October)
//     year: "numeric",
//     hour: "2-digit",   // Include hour
//     minute: "2-digit", // Include minute
//     hourCycle: 'h23', // Ensure 24-hour format
//   };
//   // Using "hi-IN" locale, which typically formats as DD/MM/YYYY HH:MM
//   const dateObj = new Date(dateString);
//   if (isNaN(dateObj)) return "Invalid Date"; // Handle invalid date strings
//   return dateObj.toLocaleString("hi-IN", options);
// };

// const OtherNews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [fullNewsList, setFullNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const response = await allNews();
//         if (response?.success && response.data) {
//           const filteredNews = response.data.filter((item) => {
//             const category = item.category?.name?.toLowerCase();
//             return category && !HOROSCOPE_CATEGORIES.includes(category);
//           });

//           setFullNewsList(filteredNews);
//           setNewsData(filteredNews.slice(29)); // Assuming you want news from the 6th item onwards
//         } else {
//           setError("Failed to load news.");
//         }
//       } catch (err) {
//         setError();
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // ✅ Media box style for consistency (same as imagePlaceholderStyle but for both media types)
//   const mediaBoxStyle = {
//     width: "150px",
//     height: "100px",
//     backgroundColor: "#e9ecef", // Placeholder background
//     objectFit: "cover", // Ensures media fills the space without distortion
//     borderRadius: "0.25rem", // 'rounded' के लिए
//     display: "block"
//   };

//   const redColor = "#c0392b";

//   if (loading)
//     return (
//       <div className="text-center my-5">
//         <Spinner animation="border" variant="danger" />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="container my-4">
//         <Alert variant="danger">{error}</Alert>
//       </div>
//     );

//   return (
//     <div className="container my-5">
//       {/* ✅ Header */}
//       <div className="d-flex align-items-center mb-3">
//         <h3
//           className="fw-bold mb-0 flex-shrink-0 me-3"
//           style={{ color: redColor }}
//         >
//           भारत की अन्य खबरें
//         </h3>
//         <div
//           className="flex-grow-1"
//           style={{ height: "3px", backgroundColor: redColor }}
//         ></div>
//       </div>

//       <div>
//         {newsData.map((newsItem, index) => {
//           const relatedArticlesForThisItem = fullNewsList.filter(
//             (article) => article.category?._id === newsItem.category?._id
//           );

//           // Extract media information for video/image
//           const firstMedia = newsItem.media?.[0];
//           const isVideo = firstMedia && firstMedia.type === 'video';
//           const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x100?text=No+Media"; // Placeholder for image/video

//           return (
//             <Link
//               to={`/news/${newsItem.slug_en || newsItem._id}`}
//               key={newsItem._id || index}
//               state={{ relatedArticles: relatedArticlesForThisItem }}
//               className="text-decoration-none text-dark"
//             >
//               <div
//                 className={`d-flex py-3 ${
//                   index < newsData.length - 1 ? "border-bottom" : ""
//                 }`}
//               >
//                 {/* ✅ Image/Video Conditional Rendering */}
//                 {isVideo ? (
//                   <video
//                     src={mediaUrl}
//                     alt={newsItem.title_hi || newsItem.title_en || "News Video"}
//                     className="flex-shrink-0 me-3" // Apply me-3 here
//                     controls={false}
//                     autoPlay
//                     muted
//                     loop
//                     style={mediaBoxStyle}
//                   />
//                 ) : (
//                   <img
//                     src={mediaUrl}
//                     alt={newsItem.title_hi || newsItem.title_en || "News Image"}
//                     className="flex-shrink-0 me-3" // Apply me-3 here
//                     style={mediaBoxStyle}
//                     onError={(e) => { e.target.src = "https://via.placeholder.com/150x100?text=Error"; console.error("Image failed to load:", e.target.src); }}
//                   />
//                 )}

//                 {/* ✅ Text Content */}
//                 <div className="d-flex flex-column flex-grow-1">
//                   <h5 className="fw-bold mb-1" style={{ lineHeight: "1.4" }}>
//                     {newsItem.title_hi || newsItem.title_en}
//                   </h5>

//                   <p
//                     className="mb-1 text-secondary"
//                     style={{
//                       fontSize: "0.95rem",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {newsItem.summary_hi || newsItem.summary_en}
//                   </p>

//                   {/* ✅ Author + Date + Time */}
//                   <div className="d-flex align-items-center">
//                     <UserAvatar user={newsItem.createdBy} size={22} />
//                     <small
//                       className="ms-2 text-muted"
//                       style={{ fontSize: "0.8rem" }}
//                     >
//                       {newsItem.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(newsItem.publishedAt || newsItem.createdAt || newsItem.updatedAt)}
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default OtherNews;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";
// // ✅ Import किया (Ensure path is correct)
// import SecondInlineAdBanner from "../NewsDetails/SecondInlineAdBanner"; 

// const HOROSCOPE_CATEGORIES = ["horoscope", "rashifal", "astrology"];

// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "समय उपलब्ध नहीं";
//   const options = {
//     day: "2-digit", month: "2-digit", year: "numeric",
//     hour: "2-digit", minute: "2-digit", hourCycle: 'h23',
//   };
//   const dateObj = new Date(dateString);
//   if (isNaN(dateObj)) return "Invalid Date";
//   return dateObj.toLocaleString("hi-IN", options);
// };

// const OtherNews = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [fullNewsList, setFullNewsList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const response = await allNews();
//         if (response?.success && response.data) {
//           const filteredNews = response.data.filter((item) => {
//             const category = item.category?.name?.toLowerCase();
//             return category && !HOROSCOPE_CATEGORIES.includes(category);
//           });
//           setFullNewsList(filteredNews);
//           setNewsData(filteredNews.slice(29)); 
//         } else {
//           setError("Failed to load news.");
//         }
//       } catch (err) {
//         setError("Error loading news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   const mediaBoxStyle = {
//     width: "150px", height: "100px", backgroundColor: "#e9ecef",
//     objectFit: "cover", borderRadius: "0.25rem", display: "block"
//   };
//   const redColor = "#c0392b";

//   if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>;
//   if (error) return <div className="container my-4"><Alert variant="danger">{error}</Alert></div>;

//   return (
//     <div className="container my-5">
//       <div className="d-flex align-items-center mb-3">
//         <h3 className="fw-bold mb-0 flex-shrink-0 me-3" style={{ color: redColor }}>
//           भारत की अन्य खबरें
//         </h3>
//         <div className="flex-grow-1" style={{ height: "3px", backgroundColor: redColor }}></div>
//       </div>

//       <div>
//         {newsData.map((newsItem, index) => {
//           const relatedArticlesForThisItem = fullNewsList.filter(
//             (article) => article.category?._id === newsItem.category?._id
//           );
//           const firstMedia = newsItem.media?.[0];
//           const isVideo = firstMedia && firstMedia.type === 'video';
//           const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x100?text=No+Media";

//           return (
//             // ✅ React.Fragment added to wrap Link and potentially the Ad
//             <React.Fragment key={newsItem._id || index}>
//               <Link
//                 to={`/news/${newsItem.slug_en || newsItem._id}`}
//                 state={{ relatedArticles: relatedArticlesForThisItem }}
//                 className="text-decoration-none text-dark"
//               >
//                 <div className={`d-flex py-3 ${index < newsData.length - 1 ? "border-bottom" : ""}`}>
//                   {isVideo ? (
//                     <video src={mediaUrl} className="flex-shrink-0 me-3" autoPlay muted loop style={mediaBoxStyle} />
//                   ) : (
//                     <img src={mediaUrl} className="flex-shrink-0 me-3" style={mediaBoxStyle} onError={(e) => { e.target.src = "https://via.placeholder.com/150x100?text=Error"; }} alt="news" />
//                   )}

//                   <div className="d-flex flex-column flex-grow-1">
//                     <h5 className="fw-bold mb-1" style={{ lineHeight: "1.4" }}>
//                       {newsItem.title_hi || newsItem.title_en}
//                     </h5>
//                     <p className="mb-1 text-secondary" style={{ fontSize: "0.95rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
//                       {newsItem.summary_hi || newsItem.summary_en}
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <UserAvatar user={newsItem.createdBy} size={22} />
//                       <small className="ms-2 text-muted" style={{ fontSize: "0.8rem" }}>
//                         {newsItem.createdBy?.name || "EMS News"} | {formatFullDateTime(newsItem.publishedAt || newsItem.createdAt)}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </Link>

//               {/* ✅ LOGIC: Show Ad after the 7th news item (index 6) */}
//               {/* category="india" पास किया गया है */}
//               {index === 6 && (
//                 <div className="my-3 w-100">
//                   <SecondInlineAdBanner category="india" />
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default OtherNews;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allNews } from "../../Services/authApi";
import { Spinner, Alert } from "react-bootstrap";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
// ✅ Import updated SecondInlineAdBanner
import SecondInlineAdBanner from "../NewsDetails/SecondInlineAdBanner"; 

const HOROSCOPE_CATEGORIES = ["horoscope", "rashifal", "astrology"];

const formatFullDateTime = (dateString) => {
  if (!dateString) return "समय उपलब्ध नहीं";
  const options = {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hourCycle: 'h23',
  };
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return "Invalid Date";
  return dateObj.toLocaleString("hi-IN", options);
};

const OtherNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [fullNewsList, setFullNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await allNews();
        if (response?.success && response.data) {
          const filteredNews = response.data.filter((item) => {
            const category = item.category?.name?.toLowerCase();
            return category && !HOROSCOPE_CATEGORIES.includes(category);
          });
          setFullNewsList(filteredNews);
          setNewsData(filteredNews.slice(29)); 
        } else {
          setError("Failed to load news.");
        }
      } catch (err) {
        setError("Error loading news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const mediaBoxStyle = {
    width: "150px", height: "100px", backgroundColor: "#e9ecef",
    objectFit: "cover", borderRadius: "0.25rem", display: "block"
  };
  const redColor = "#c0392b";

  if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>;
  if (error) return <div className="container my-4"><Alert variant="danger">{error}</Alert></div>;

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center mb-3">
        <h3 className="fw-bold mb-0 flex-shrink-0 me-3" style={{ color: redColor }}>
          भारत की अन्य खबरें
        </h3>
        <div className="flex-grow-1" style={{ height: "3px", backgroundColor: redColor }}></div>
      </div>

      <div>
        {newsData.map((newsItem, index) => {
          const relatedArticlesForThisItem = fullNewsList.filter(
            (article) => article.category?._id === newsItem.category?._id
          );
          const firstMedia = newsItem.media?.[0];
          const isVideo = firstMedia && firstMedia.type === 'video';
          const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x100?text=No+Media";

          return (
            <React.Fragment key={newsItem._id || index}>
              <Link
                to={`/news/${newsItem.slug_en || newsItem._id}`}
                state={{ relatedArticles: relatedArticlesForThisItem }}
                className="text-decoration-none text-dark"
              >
                <div className={`d-flex py-3 ${index < newsData.length - 1 ? "border-bottom" : ""}`}>
                  {isVideo ? (
                    <video src={mediaUrl} className="flex-shrink-0 me-3" autoPlay muted loop style={mediaBoxStyle} />
                  ) : (
                    <img src={mediaUrl} className="flex-shrink-0 me-3" style={mediaBoxStyle} onError={(e) => { e.target.src = "https://via.placeholder.com/150x100?text=Error"; }} alt="news" />
                  )}

                  <div className="d-flex flex-column flex-grow-1">
                    {/* <h5 className="fw-bold mb-1" style={{ lineHeight: "1.4" }}>
                      {newsItem.title_hi || newsItem.title_en}
                    </h5> */}
                      

                                      <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: newsItem?.title_hi || newsItem?.title_en }} 
                  />
                    <p className="mb-1 text-secondary" style={{ fontSize: "0.95rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {newsItem.summary_hi || newsItem.summary_en}
                    </p>
                    <div className="d-flex align-items-center">
                      <UserAvatar user={newsItem.createdBy} size={22} />
                      <small className="ms-2 text-muted" style={{ fontSize: "0.8rem" }}>
                        {newsItem.createdBy?.name || "EMS News"} | {formatFullDateTime(newsItem.publishedAt || newsItem.createdAt)}
                      </small>
                    </div>
                  </div>
                </div>
              </Link>

              {/* ✅ Show Ad after the 7th news item (index 6) */}
              <div className="my-3 w-100">
                {index === 6 && <SecondInlineAdBanner category="india" />}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OtherNews;
