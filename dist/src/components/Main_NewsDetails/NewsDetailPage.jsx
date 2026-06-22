
// // import React, { useState, useEffect } from "react";
// // import { useParams, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   getNewsById,
// //   addLikeToNews,
// //   addCommentToNews,
// //   allNews,
// // } from "../../Services/authApi";
// // import RelatedNews from "./RelatedNews";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import { Container, Spinner } from "react-bootstrap";

// // // --- HELPER FUNCTIONS ---
// // const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://emsindia.com";

// // // 1. HTML टैग्स को जड़ से साफ करने वाला फंक्शन
// // const stripHtmlTags = (str) => {
// //   if (!str) return "";
// //   return str
// //     .replace(/<[^>]*>/g, '')         // सारे HTML टैग्स हटाए
// //     .replace(/&nbsp;/g, ' ')        // &nbsp; हटाए
// //     .replace(/&[a-z0-9]+;/gi, '')    // बाकी Entities (&amp; आदि) हटाए
// //     .replace(/\s+/g, ' ')           // एक्स्ट्रा स्पेस हटाए
// //     .trim();
// // };

// // // 2. साफ़ सुथरा Slug बनाने वाला फंक्शन
// // const createSlug = (title) => {
// //   const cleanTitle = stripHtmlTags(title); 
// //   if (!cleanTitle) return "";
// //   return cleanTitle
// //     .toString()
// //     .toLowerCase()
// //     .trim()
// //     .replace(/\s+/g, "-")                               // स्पेस को डैश (-) बनाए
// //     .replace(/[^\u0900-\u097F\w-]+/g, "")               // सिर्फ हिंदी, इंग्लिश और डैश रखे
// //     .replace(/-+/g, "-")                                // डबल -- हटाए
// //     .replace(/^-+|-+$/g, "");                           // आगे-पीछे के डैश हटाए
// // };

// // const cleanHtmlForImages = (htmlString) => {
// //   if (!htmlString) return "";
// //   const parser = new DOMParser();
// //   const doc = parser.parseFromString(htmlString, "text/html");
// //   const images = doc.querySelectorAll("img");
// //   images.forEach((img) => {
// //     img.removeAttribute("width");
// //     img.removeAttribute("height");
// //     img.style.width = "";
// //     img.style.height = "";
// //   });
// //   return doc.body.innerHTML;
// // };

// // const MediaRenderer = ({ mediaItem }) => {
// //   if (!mediaItem) return <div className="bg-light w-100 rounded mb-3" style={{ height: "300px" }}></div>;
// //   if (mediaItem.type === "video") {
// //     return <video src={mediaItem.url} controls className="img-fluid w-100 rounded mb-3" style={{ maxHeight: "500px", backgroundColor: "#000" }} />;
// //   }
// //   return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
// // };

// // const NewsDetailPage = () => {
// //   const { slugId } = useParams();
// //   const newsId = slugId ? slugId.split("-").pop() : null;
// //   const navigate = useNavigate();

// //   const [article, setArticle] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [relatedNews, setRelatedNews] = useState([]);
// //   const [likeCount, setLikeCount] = useState(0);
// //   const [isLiked, setIsLiked] = useState(false);
// //   const [comments, setComments] = useState([]);
// //   const [showComments, setShowComments] = useState(false);
// //   const [newComment, setNewComment] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [cleanedArticleContent, setCleanedArticleContent] = useState("");

// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return "";
// //     return new Date(dateString).toLocaleString("hi-IN", {
// //       day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
// //     });
// //   };

// //   // ✅ सुधार 1: ब्राउज़र URL को डेटाबेस वाले साफ़ स्लॉग से अपडेट करें
// //   useEffect(() => {
// //     if (article) {
// //       // अगर बैकएंड से slug_en आ रहा है तो उसी को यूज़ करें, वरना साफ़ स्लॉग बनाएँ
// //       const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
// //       const cleanPath = `/news/${finalSlug}`;
// //       try {
// //         window.history.replaceState(null, "", decodeURIComponent(cleanPath));
// //       } catch (e) { console.error(e); }
// //     }
// //   }, [article]);

// //   // -------- FETCH NEWS --------
// //   useEffect(() => {
// //     if (!newsId) { setLoading(false); setError("News ID missing."); return; }
// //     const fetchArticleAndRelated = async () => {
// //       try {
// //         setLoading(true);
// //         window.scrollTo(0, 0);
// //         const articleRes = await getNewsById(newsId);
// //         if (!articleRes.success) throw new Error(articleRes.message);
// //         const currentArticle = articleRes.data;
// //         setArticle(currentArticle);
// //         setLikeCount(currentArticle.likesCount || 0);
// //         setComments(currentArticle.comments || []);
// //         setIsLiked(currentArticle.isLiked || false);
// //         setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));

// //         const allNewsRes = await allNews();
// //         if (allNewsRes.success) {
// //           setRelatedNews(allNewsRes.data.filter((item) => item._id !== currentArticle._id).slice(0, 6));
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //         if (String(err).includes("401")) navigate("/login");
// //       } finally { setLoading(false); }
// //     };
// //     fetchArticleAndRelated();
// //   }, [newsId, navigate]);

// //   // ✅ सुधार 2: शेयरिंग URL के लिए डेटाबेस स्लॉग का सीधा इस्तेमाल
// //   const getShareUrl = () => {
// //     if (!article) return "";
// //     const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
// //     const cleanBase = BASE_FRONTEND_URL.endsWith("/") ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
// //     return decodeURIComponent(`${cleanBase}/news/${finalSlug}`);
// //   };

// //   const finalShareUrl = getShareUrl();

// //   const getWhatsappShareUrl = () => {
// //     if (!article) return "";
// //     const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;

// //   const baseUrl = import.meta.env.VITE_API_BASE_URL;
// //     // return `https://newsapp.aasmo.in/api/v1/user/share/${finalSlug}`;
// //   return `${baseUrl}/api/v1/user/share/${finalSlug}`;
// //   };

// //   // -------- Mobile Share API --------
// //   const handleShareClick = async () => {
// //     if (!article) return;
// //     const plainTitle = stripHtmlTags(article.title_hi || article.title_en);
// //     if (navigator.share) {
// //       try {
// //         await navigator.share({
// //           title: plainTitle,
// //           text: `${plainTitle}\n\nपूरी खबर यहाँ पढ़ें: ${finalShareUrl}`,
// //         });
// //       } catch (err) {}
// //     } else {
// //       navigator.clipboard.writeText(finalShareUrl);
// //       alert("Link copied!");
// //     }
// //   };

// //   // ... Like और Comment हैंडलर वही रहेंगे ...
// //   const handleLikeClick = async () => {
// //     if (!article) return;
// //     const prevLiked = isLiked;
// //     const prevCount = likeCount;
// //     setIsLiked(!prevLiked);
// //     setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
// //     try {
// //       const res = await addLikeToNews(article._id);
// //       if (!res.success) { setIsLiked(prevLiked); setLikeCount(prevCount); }
// //     } catch (err) {
// //       setIsLiked(prevLiked); setLikeCount(prevCount);
// //       if (String(err).includes("401")) navigate("/login");
// //     }
// //   };

// //   const handleCommentSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!newComment.trim() || !article) return;
// //     setIsSubmitting(true);
// //     try {
// //       const res = await addCommentToNews(article._id, { text: newComment });
// //       if (res.success) {
// //         const addedComment = res.comment || res.data?.comment;
// //         if (addedComment) setComments((prev) => [...prev, addedComment]);
// //         setNewComment("");
// //       }
// //     } catch (err) {
// //       if (String(err).includes("401")) navigate("/login");
// //     } finally { setIsSubmitting(false); }
// //   };

// //   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
// //   if (error || !article) return <Container className="text-center my-5"><p>{error || "Article not found"}</p></Container>;

// //   return (
// //     <Container className="my-4">
// //       <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>
        
// //         {/* ✅ सुधार 3: हेडलाइन को HTML फॉर्मेट में दिखाएँ (टैग्स गायब हो जाएंगे) */}
// //         <h1 
// //           // className="fw-bold mb-3" 
// //            className="news-headline-master full-view" 
// //           style={{ fontSize: "1.6rem" }}
// //           dangerouslySetInnerHTML={{ __html: article.title_hi || article.title_en }} 
// //         />

// //         <MediaRenderer mediaItem={article.media?.[0]} />

// //         <div className="d-flex align-items-center mb-3">
// //           <UserAvatar user={article.createdBy} />
// //           <small className="ms-2 text-muted">
// //             {article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}
// //           </small>
// //         </div>

// //         <div
// //           className="article-content mb-3"
// //           style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
// //           dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}
// //         ></div>

// //         {/* ... सोशल बटन्स और कमेंट्स वाला हिस्सा वही रहेगा ... */}
// //         <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">
// //           <div onClick={handleLikeClick} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
// //             <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
// //             <span className="fw-semibold">{likeCount}</span>
// //           </div>
// //           <div onClick={() => setShowComments(!showComments)} className="d-flex align-items-center gap-2 text-primary" style={{ cursor: "pointer" }}>
// //             <i className="bi bi-chat-dots fs-5"></i>
// //             <span className="fw-semibold">{comments.length}</span>
// //           </div>
// //           <div onClick={handleShareClick} className="d-flex align-items-center gap-2 text-muted" style={{ cursor: "pointer" }}>
// //             <i className="bi bi-share fs-5"></i>
// //           </div>
// //           <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getWhatsappShareUrl())}`} target="_blank" rel="noopener noreferrer" className="text-success">
// //             <i className="bi bi-whatsapp fs-5"></i>
// //           </a>
// //           <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalShareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-primary">
// //             <i className="bi bi-facebook fs-5"></i>
// //           </a>
// //         </div>

// //         {showComments && (
// //           <div className="mt-4 border-top pt-3">
// //             <h4 className="mb-3">टिप्पणियाँ ({comments.length})</h4>
// //             <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
// //               <input type="text" className="form-control" placeholder="अपनी टिप्पणी लिखें..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmitting} />
// //               <button type="submit" className="btn btn-primary" disabled={isSubmitting || !newComment.trim()}>Post</button>
// //             </form>
// //             <div className="comments-box">
// //               {comments.map((comment, index) => (
// //                 <div key={comment._id || index} className="border-bottom pb-2 mb-2">
// //                   <div className="d-flex align-items-center mb-1">
// //                     <UserAvatar user={comment.user} size={25} />
// //                     <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
// //                   </div>
// //                   <p className="mb-0 ps-4">{comment.text}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <RelatedNews articles={relatedNews} currentArticleId={article._id} />
// //     </Container>
// //   );
// // };

// // export default NewsDetailPage;



// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {
//   getNewsById,
//   addLikeToNews,
//   addCommentToNews,
//   allNews,
// } from "../../Services/authApi";
// import RelatedNews from "./RelatedNews";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Container, Spinner } from "react-bootstrap";

// // ─── Login Popup Styles ───────────────────────────────────────────────────────
// const loginPopupStyles = `
//   @keyframes ndp-slideUp {
//     from { transform: translateY(60px); opacity: 0; }
//     to   { transform: translateY(0);    opacity: 1; }
//   }
//   @keyframes ndp-backdropIn {
//     from { opacity: 0; }
//     to   { opacity: 1; }
//   }
//   .ndp-popup-backdrop {
//     position: fixed; inset: 0; z-index: 999999;
//     background: rgba(0,0,0,0.55);
//     display: flex; align-items: flex-end; justify-content: center;
//     animation: ndp-backdropIn 0.2s ease;
//   }
//   .ndp-popup-card {
//     width: 100%; max-width: 480px;
//     background: #ffffff;
//     border-radius: 24px 24px 0 0;
//     padding: 32px 24px 44px 24px;
//     animation: ndp-slideUp 0.32s cubic-bezier(0.34,1.56,0.64,1);
//     text-align: center;
//   }
//   .ndp-popup-icon-circle {
//     width: 64px; height: 64px; margin: 0 auto 18px;
//     background: #fff1f0;
//     border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//   }
//   .ndp-popup-title {
//     font-size: 20px; font-weight: 800; color: #1a1a1a;
//     margin: 0 0 8px 0;
//   }
//   .ndp-popup-sub {
//     font-size: 14px; color: #666;
//     margin: 0 0 28px 0; line-height: 1.55;
//   }
//   .ndp-btn-login {
//     display: block; width: 100%;
//     padding: 14px; margin-bottom: 12px;
//     background: #e53935; color: #fff;
//     border: none; border-radius: 14px;
//     font-size: 16px; font-weight: 700; cursor: pointer;
//     transition: background 0.2s, transform 0.1s;
//   }
//   .ndp-btn-login:active  { background: #c62828; transform: scale(0.97); }
//   .ndp-btn-signup {
//     display: block; width: 100%;
//     padding: 14px;
//     background: #f5f5f5; color: #333;
//     border: none; border-radius: 14px;
//     font-size: 16px; font-weight: 600; cursor: pointer;
//     transition: background 0.2s, transform 0.1s;
//   }
//   .ndp-btn-signup:active { background: #e0e0e0; transform: scale(0.97); }
//   .ndp-btn-cancel {
//     margin-top: 16px; background: none; border: none;
//     color: #aaa; font-size: 13px; cursor: pointer; display: block;
//     width: 100%;
//   }
// `;

// // ─── Login Popup Component ────────────────────────────────────────────────────
// const LoginPopup = ({ message, onClose, onNavigate }) => (
//   <>
//     <style>{loginPopupStyles}</style>
//     <div className="ndp-popup-backdrop" onClick={onClose}>
//       <div className="ndp-popup-card" onClick={(e) => e.stopPropagation()}>
//         <div className="ndp-popup-icon-circle">
//           {/* Lock icon */}
//           <svg viewBox="0 0 24 24" width="30" height="30" fill="none"
//             stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//             <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//           </svg>
//         </div>
//         <h2 className="ndp-popup-title">लॉगिन करना जरूरी है</h2>
//         <p className="ndp-popup-sub">{message}</p>
//         <button className="ndp-btn-login" onClick={() => onNavigate("/login")}>
//           लॉगिन करें
//         </button>
//         <button className="ndp-btn-signup" onClick={() => onNavigate("/login")}>
//           साइन अप करें
//         </button>
//         <button className="ndp-btn-cancel" onClick={onClose}>
//           अभी नहीं
//         </button>
//       </div>
//     </div>
//   </>
// );

// // --- HELPER FUNCTIONS ---
// const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://emsindia.com";

// const stripHtmlTags = (str) => {
//   if (!str) return "";
//   return str
//     .replace(/<[^>]*>/g, '')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/&[a-z0-9]+;/gi, '')
//     .replace(/\s+/g, ' ')
//     .trim();
// };

// const createSlug = (title) => {
//   const cleanTitle = stripHtmlTags(title);
//   if (!cleanTitle) return "";
//   return cleanTitle
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\u0900-\u097F\w-]+/g, "")
//     .replace(/-+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const cleanHtmlForImages = (htmlString) => {
//   if (!htmlString) return "";
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, "text/html");
//   const images = doc.querySelectorAll("img");
//   images.forEach((img) => {
//     img.removeAttribute("width");
//     img.removeAttribute("height");
//     img.style.width = "";
//     img.style.height = "";
//   });
//   return doc.body.innerHTML;
// };

// const MediaRenderer = ({ mediaItem }) => {
//   if (!mediaItem) return <div className="bg-light w-100 rounded mb-3" style={{ height: "300px" }}></div>;
//   if (mediaItem.type === "video") {
//     return <video src={mediaItem.url} controls className="img-fluid w-100 rounded mb-3" style={{ maxHeight: "500px", backgroundColor: "#000" }} />;
//   }
//   return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
//   const NewsDetailPage = () => {
//   const { slugId } = useParams();
//   const newsId = slugId ? slugId.split("-").pop() : null;
//   const navigate = useNavigate();

//   const [article, setArticle]                     = useState(null);
//   const [loading, setLoading]                     = useState(true);
//   const [error, setError]                         = useState(null);
//   const [relatedNews, setRelatedNews]             = useState([]);
//   const [likeCount, setLikeCount]                 = useState(0);
//   const [isLiked, setIsLiked]                     = useState(false);
//   const [comments, setComments]                   = useState([]);
//   const [showComments, setShowComments]           = useState(false);
//   const [newComment, setNewComment]               = useState("");
//   const [isSubmitting, setIsSubmitting]           = useState(false);
//   const [cleanedArticleContent, setCleanedArticleContent] = useState("");

//   // ── Login Popup State ──
//   const [loginPopup, setLoginPopup] = useState({ show: false, message: "" });

//   // ── Auth check helper ──
//   const isLoggedIn = () =>
//     !!(localStorage.getItem("token") || sessionStorage.getItem("token"));

//   const showLoginPopup = (message) =>
//     setLoginPopup({ show: true, message });

//   const closeLoginPopup = () =>
//     setLoginPopup({ show: false, message: "" });

//   const handlePopupNavigate = (path) => {
//     closeLoginPopup();
//     navigate(path);
//   };

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     return new Date(dateString).toLocaleString("hi-IN", {
//       day: "numeric", month: "2-digit", year: "numeric",
//       hour: "2-digit", minute: "2-digit",
//     });
//   };

//   // ── URL update ──
//   useEffect(() => {
//     if (article) {
//       const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
//       const cleanPath = `/news/${finalSlug}`;
//       try {
//         window.history.replaceState(null, "", decodeURIComponent(cleanPath));
//       } catch (e) { console.error(e); }
//     }
//   }, [article]);

//   // ── Fetch news ──
//   useEffect(() => {
//     if (!newsId) { setLoading(false); setError("News ID missing."); return; }
//     const fetchArticleAndRelated = async () => {
//       try {
//         setLoading(true);
//         window.scrollTo(0, 0);
//         const articleRes = await getNewsById(newsId);
//         if (!articleRes.success) throw new Error(articleRes.message);
//         const currentArticle = articleRes.data;
//         setArticle(currentArticle);
//         setLikeCount(currentArticle.likesCount || 0);
//         setComments(currentArticle.comments || []);
//         setIsLiked(currentArticle.isLiked || false);
//         setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));

//         const allNewsRes = await allNews();
//         if (allNewsRes.success) {
//           setRelatedNews(
//             allNewsRes.data.filter((item) => item._id !== currentArticle._id).slice(0, 6)
//           );
//         }
//       } catch (err) {
//         setError(err.message);
//         if (String(err).includes("401")) navigate("/login");
//       } finally { setLoading(false); }
//     };
//     fetchArticleAndRelated();
//   }, [newsId, navigate]);

//   // ── Share URL helpers (unchanged) ──
//   const getShareUrl = () => {
//     if (!article) return "";
//     const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
//     const cleanBase = BASE_FRONTEND_URL.endsWith("/") ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
//     return decodeURIComponent(`${cleanBase}/news/${finalSlug}`);
//   };

//   const finalShareUrl = getShareUrl();

//   const getWhatsappShareUrl = () => {
//     if (!article) return "";
//     const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;
//     return `${baseUrl}/api/v1/user/share/${finalSlug}`;
//   };

//   // ── Share (unchanged) ──
//   const handleShareClick = async () => {
//     if (!article) return;
//     const plainTitle = stripHtmlTags(article.title_hi || article.title_en);
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: plainTitle,
//           text: `${plainTitle}\n\nपूरी खबर यहाँ पढ़ें: ${finalShareUrl}`,
//         });
//       } catch (err) {}
//     } else {
//       navigator.clipboard.writeText(finalShareUrl);
//       alert("Link copied!");
//     }
//   };

//   // ── Like — login check added ──
//   const handleLikeClick = async () => {
//     if (!article) return;

//     if (!isLoggedIn()) {
//       showLoginPopup("खबर को पसंद करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।");
//       return;
//     }

//     // Original logic — untouched
//     const prevLiked = isLiked;
//     const prevCount = likeCount;
//     setIsLiked(!prevLiked);
//     setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
//     try {
//       const res = await addLikeToNews(article._id);
//       if (!res.success) { setIsLiked(prevLiked); setLikeCount(prevCount); }
//     } catch (err) {
//       setIsLiked(prevLiked); setLikeCount(prevCount);
//       if (String(err).includes("401")) navigate("/login");
//     }
//   };

//   // ── Comment — login check added ──
//   const handleCommentSectionToggle = () => {
//     if (!isLoggedIn()) {
//       showLoginPopup("टिप्पणी करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।");
//       return;
//     }
//     setShowComments(!showComments);
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim() || !article) return;

//     if (!isLoggedIn()) {
//       showLoginPopup("टिप्पणी करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।");
//       return;
//     }

//     // Original logic — untouched
//     setIsSubmitting(true);
//     try {
//       const res = await addCommentToNews(article._id, { text: newComment });
//       if (res.success) {
//         const addedComment = res.comment || res.data?.comment;
//         if (addedComment) setComments((prev) => [...prev, addedComment]);
//         setNewComment("");
//       }
//     } catch (err) {
//       if (String(err).includes("401")) navigate("/login");
//     } finally { setIsSubmitting(false); }
//   };

//   // ── Loading / Error ──
//   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
//   if (error || !article) return <Container className="text-center my-5"><p>{error || "Article not found"}</p></Container>;

//   return (
//     <>
//       {/* Login Popup — renders on top of everything when needed */}
//       {loginPopup.show && (
//         <LoginPopup
//           message={loginPopup.message}
//           onClose={closeLoginPopup}
//           onNavigate={handlePopupNavigate}
//         />
//       )}

//       <Container className="my-4">
//         <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>

//           <h1
//             className="news-headline-master full-view"
//             style={{ fontSize: "1.6rem" }}
//             dangerouslySetInnerHTML={{ __html: article.title_hi || article.title_en }}
//           />

//           <MediaRenderer mediaItem={article.media?.[0]} />

//           <div className="d-flex align-items-center mb-3">
//             <UserAvatar user={article.createdBy} />
//             <small className="ms-2 text-muted">
//               {article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}
//             </small>
//           </div>

//           <div
//             className="article-content mb-3"
//             style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
//             dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}
//           />

//           {/* Social buttons — same UI, only like & comment have login guard */}
//           <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">

//             {/* Like */}
//             <div
//               onClick={handleLikeClick}
//               className="d-flex align-items-center gap-2"
//               style={{ cursor: "pointer" }}>
//               <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
//               <span className="fw-semibold">{likeCount}</span>
//             </div>

//             {/* Comment toggle */}
//             <div
//               onClick={handleCommentSectionToggle}
//               className="d-flex align-items-center gap-2 text-primary"
//               style={{ cursor: "pointer" }}>
//               <i className="bi bi-chat-dots fs-5"></i>
//               <span className="fw-semibold">{comments.length}</span>
//             </div>

//             {/* Share — no login needed */}
//          <div
//   onClick={handleShareClick}
//   className="d-flex align-items-center gap-2 text-muted"
// >
//   <i className="bi bi-share fs-5"></i>
// </div>

//             {/* WhatsApp — no login needed */}
//             <a
//              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
//     `${stripHtmlTags(article.title_hi || article.title_en)}\n\n${finalShareUrl}`
//   )}`}
//   target="_blank" rel="noopener noreferrer" className="text-success">
//   <i className="bi bi-whatsapp fs-5"></i>
// </a>

//             {/* Facebook — no login needed */}
//             <a
//               href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalShareUrl)}`}
//               target="_blank" rel="noopener noreferrer" className="text-primary">
//               <i className="bi bi-facebook fs-5"></i>
//             </a>
//           </div>

//           {/* Comment section — only visible after login */}
//           {showComments && (
//             <div className="mt-4 border-top pt-3">
//               <h4 className="mb-3">टिप्पणियाँ ({comments.length})</h4>
//               <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="अपनी टिप्पणी लिखें..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   disabled={isSubmitting}
//                 />
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isSubmitting || !newComment.trim()}>
//                   Post
//                 </button>
//               </form>
//               <div className="comments-box">
//                 {comments.map((comment, index) => (
//                   <div key={comment._id || index} className="border-bottom pb-2 mb-2">
//                     <div className="d-flex align-items-center mb-1">
//                       <UserAvatar user={comment.user} size={25} />
//                       <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
//                     </div>
//                     <p className="mb-0 ps-4">{comment.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <RelatedNews articles={relatedNews} currentArticleId={article._id} />
//       </Container>
//     </>
//   );
// };

// export default NewsDetailPage;



import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getNewsById,
  addLikeToNews,
  addCommentToNews,
  allNews,
} from "../../Services/authApi";
import RelatedNews from "./RelatedNews";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Spinner } from "react-bootstrap";

// ─── Login Popup Styles ───────────────────────────────────────────────────────
const loginPopupStyles = `
  @keyframes ndp-slideUp {
    from { transform: translateY(60px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes ndp-backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .ndp-popup-backdrop {
    position: fixed; inset: 0; z-index: 999999;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: flex-end; justify-content: center;
    animation: ndp-backdropIn 0.2s ease;
  }
  .ndp-popup-card {
    width: 100%; max-width: 480px;
    background: #ffffff;
    border-radius: 24px 24px 0 0;
    padding: 32px 24px 44px 24px;
    animation: ndp-slideUp 0.32s cubic-bezier(0.34,1.56,0.64,1);
    text-align: center;
  }
  .ndp-popup-icon-circle {
    width: 64px; height: 64px; margin: 0 auto 18px;
    background: #fff1f0;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .ndp-popup-title {
    font-size: 20px; font-weight: 800; color: #1a1a1a;
    margin: 0 0 8px 0;
  }
  .ndp-popup-sub {
    font-size: 14px; color: #666;
    margin: 0 0 28px 0; line-height: 1.55;
  }
  .ndp-btn-login {
    display: block; width: 100%;
    padding: 14px; margin-bottom: 12px;
    background: #e53935; color: #fff;
    border: none; border-radius: 14px;
    font-size: 16px; font-weight: 700; cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .ndp-btn-login:active  { background: #c62828; transform: scale(0.97); }
  .ndp-btn-signup {
    display: block; width: 100%;
    padding: 14px;
    background: #f5f5f5; color: #333;
    border: none; border-radius: 14px;
    font-size: 16px; font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .ndp-btn-signup:active { background: #e0e0e0; transform: scale(0.97); }
  .ndp-btn-cancel {
    margin-top: 16px; background: none; border: none;
    color: #aaa; font-size: 13px; cursor: pointer; display: block;
    width: 100%;
  }
`;

// ─── Login Popup Component ────────────────────────────────────────────────────
const LoginPopup = ({ message, onClose, onNavigate }) => (
  <>
    <style>{loginPopupStyles}</style>
    <div className="ndp-popup-backdrop" onClick={onClose}>
      <div className="ndp-popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="ndp-popup-icon-circle">
          {/* Lock icon */}
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none"
            stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="ndp-popup-title">लॉगिन करना जरूरी है</h2>
        <p className="ndp-popup-sub">{message}</p>
        <button className="ndp-btn-login" onClick={() => onNavigate("/login")}>
          लॉगिन करें
        </button>
        <button className="ndp-btn-signup" onClick={() => onNavigate("/login")}>
          साइन अप करें
        </button>
        <button className="ndp-btn-cancel" onClick={onClose}>
          अभी नहीं
        </button>
      </div>
    </div>
  </>
);

// --- HELPER FUNCTIONS ---
const BASE_FRONTEND_URL = import.meta.env.VITE_BASE_URL || "https://news.aasmo.in";

const stripHtmlTags = (str) => {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z0-9]+;/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const createSlug = (title) => {
  const cleanTitle = stripHtmlTags(title);
  if (!cleanTitle) return "";
  return cleanTitle
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0900-\u097F\w-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const cleanHtmlForImages = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const images = doc.querySelectorAll("img");
  images.forEach((img) => {
    img.removeAttribute("width");
    img.removeAttribute("height");
    img.style.width = "";
    img.style.height = "";
  });
  return doc.body.innerHTML;
};

const MediaRenderer = ({ mediaItem }) => {
  if (!mediaItem) return <div className="bg-light w-100 rounded mb-3" style={{ height: "300px" }}></div>;
  if (mediaItem.type === "video") {
    return <video src={mediaItem.url} controls className="img-fluid w-100 rounded mb-3" style={{ maxHeight: "500px", backgroundColor: "#000" }} />;
  }
  return <img src={mediaItem.url} alt={mediaItem.caption || "News Media"} className="img-fluid w-100 rounded mb-3" />;
};

// ─── Main Component ───────────────────────────────────────────────────────────
  const NewsDetailPage = () => {
  const { slugId } = useParams();
  const newsId = slugId ? slugId.split("-").pop() : null;
  const navigate = useNavigate();

  const [article, setArticle]                     = useState(null);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState(null);
  const [relatedNews, setRelatedNews]             = useState([]);
  const [likeCount, setLikeCount]                 = useState(0);
  const [isLiked, setIsLiked]                     = useState(false);
  const [comments, setComments]                   = useState([]);
  const [showComments, setShowComments]           = useState(false);
  const [newComment, setNewComment]               = useState("");
  const [isSubmitting, setIsSubmitting]           = useState(false);
  const [cleanedArticleContent, setCleanedArticleContent] = useState("");

  // ── Login Popup State ──
  const [loginPopup, setLoginPopup] = useState({ show: false, message: "" });

  // ── Auth check helper ──
  const isLoggedIn = () =>
    !!(localStorage.getItem("token") || sessionStorage.getItem("token"));

  const showLoginPopup = (message) =>
    setLoginPopup({ show: true, message });

  const closeLoginPopup = () =>
    setLoginPopup({ show: false, message: "" });

  const handlePopupNavigate = (path) => {
    closeLoginPopup();
    navigate(path);
  };

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("hi-IN", {
      day: "numeric", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  // ── URL update ──
  useEffect(() => {
    if (article) {
      const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
      const cleanPath = `/news/${finalSlug}`;
      try {
        window.history.replaceState(null, "", decodeURIComponent(cleanPath));
      } catch (e) { console.error(e); }
    }
  }, [article]);

  // ── Fetch news ──
  useEffect(() => {
    if (!newsId) { setLoading(false); setError("News ID missing."); return; }
    const fetchArticleAndRelated = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const articleRes = await getNewsById(newsId);
        if (!articleRes.success) throw new Error(articleRes.message);
        const currentArticle = articleRes.data;
        setArticle(currentArticle);
        setLikeCount(currentArticle.likesCount || 0);
        setComments(currentArticle.comments || []);
        setIsLiked(currentArticle.isLiked || false);
        setCleanedArticleContent(cleanHtmlForImages(currentArticle.content_hi));

        const allNewsRes = await allNews();
        if (allNewsRes.success) {
          setRelatedNews(
            allNewsRes.data.filter((item) => item._id !== currentArticle._id).slice(0, 6)
          );
        }
      } catch (err) {
        setError(err.message);
        if (String(err).includes("401")) navigate("/login");
      } finally { setLoading(false); }
    };
    fetchArticleAndRelated();
  }, [newsId, navigate]);

  // ── Share URL helpers (unchanged) ──
  const getShareUrl = () => {
    if (!article) return "";
    const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
    const cleanBase = BASE_FRONTEND_URL.endsWith("/") ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
    return decodeURIComponent(`${cleanBase}/news/${finalSlug}`);
  };

  const finalShareUrl = getShareUrl();

  // const getWhatsappShareUrl = () => {
  //   if (!article) return "";
  //   const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
  //   const baseUrl = import.meta.env.VITE_API_BASE_URL;
  //   return `${baseUrl}/share/${finalSlug}`;
  // };
// इसे अपडेट करें
const getWhatsappShareUrl = () => {
  if (!article) return "";
  const finalSlug = article.slug_en || `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
  const cleanBase = BASE_FRONTEND_URL.endsWith("/") ? BASE_FRONTEND_URL.slice(0, -1) : BASE_FRONTEND_URL;
  
  // अब यह Frontend का ही सुंदर लिंक भेजेगा
  return decodeURIComponent(`${cleanBase}/share/${finalSlug}`);
};
  // ── Share (unchanged) ──
  const handleShareClick = async () => {
    if (!article) return;
    const plainTitle = stripHtmlTags(article.title_hi || article.title_en);
    const previewShareUrl = getWhatsappShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: plainTitle,
          text: plainTitle,
          url: previewShareUrl,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(previewShareUrl);
      alert("Link copied!");
    }
  };

  // ── Like — login check added ──
  const handleLikeClick = async () => {
    if (!article) return;

    if (!isLoggedIn()) {
      showLoginPopup("खबर को पसंद करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।");
      return;
    }

    // Original logic — untouched
    const prevLiked = isLiked;
    const prevCount = likeCount;
    setIsLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      const res = await addLikeToNews(article._id);
      if (!res.success) { setIsLiked(prevLiked); setLikeCount(prevCount); }
    } catch (err) {
      setIsLiked(prevLiked); setLikeCount(prevCount);
      if (String(err).includes("401")) navigate("/login");
    }
  };

  // ── Comment — login check added ──
  const handleCommentSectionToggle = () => {
    if (!isLoggedIn()) {
      showLoginPopup("टिप्पणी करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।");
      return;
    }
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !article) return;

    if (!isLoggedIn()) {
      showLoginPopup("टिप्पणी करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।");
      return;
    }

    // Original logic — untouched
    setIsSubmitting(true);
    try {
      const res = await addCommentToNews(article._id, { text: newComment });
      if (res.success) {
        const addedComment = res.comment || res.data?.comment;
        if (addedComment) setComments((prev) => [...prev, addedComment]);
        setNewComment("");
      }
    } catch (err) {
      if (String(err).includes("401")) navigate("/login");
    } finally { setIsSubmitting(false); }
  };

  // ── Loading / Error ──
  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /></Container>;
  if (error || !article) return <Container className="text-center my-5"><p>{error || "Article not found"}</p></Container>;

  return (
    <>
      {/* Login Popup — renders on top of everything when needed */}
      {loginPopup.show && (
        <LoginPopup
          message={loginPopup.message}
          onClose={closeLoginPopup}
          onNavigate={handlePopupNavigate}
        />
      )}

      <Container className="my-4">
        <div className="bg-white p-3 p-md-4 shadow-sm" style={{ border: "1px solid #eee", borderRadius: "8px" }}>

          <h1
            className="news-headline-master full-view"
            style={{ fontSize: "1.6rem" }}
            dangerouslySetInnerHTML={{ __html: article.title_hi || article.title_en }}
          />

          <MediaRenderer mediaItem={article.media?.[0]} />

          <div className="d-flex align-items-center mb-3">
            <UserAvatar user={article.createdBy} />
            <small className="ms-2 text-muted">
              {article.createdBy?.name || "EMS"} | {formatFullDateTime(article.createdAt)}
            </small>
          </div>

          <div
            className="article-content mb-3"
            style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
            dangerouslySetInnerHTML={{ __html: cleanedArticleContent }}
          />

          {/* Social buttons — same UI, only like & comment have login guard */}
          <div className="d-flex flex-wrap align-items-center gap-4 mt-3 pt-2 border-top">

            {/* Like */}
            <div
              onClick={handleLikeClick}
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}>
              <i className={`fs-5 bi ${isLiked ? "bi-hand-thumbs-up-fill text-danger" : "bi-hand-thumbs-up"}`}></i>
              <span className="fw-semibold">{likeCount}</span>
            </div>

            {/* Comment toggle */}
            <div
              onClick={handleCommentSectionToggle}
              className="d-flex align-items-center gap-2 text-primary"
              style={{ cursor: "pointer" }}>
              <i className="bi bi-chat-dots fs-5"></i>
              <span className="fw-semibold">{comments.length}</span>
            </div>

            {/* Share — no login needed */}
         <div
  onClick={handleShareClick}
  className="d-flex align-items-center gap-2 text-muted"
>
  <i className="bi bi-share fs-5"></i>
</div>

            {/* WhatsApp — no login needed */}
           {/* WhatsApp — Direct Icon */}
<a
  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${stripHtmlTags(article.title_hi || article.title_en)}\n\n${getWhatsappShareUrl()}`
  )}`}
  target="_blank" 
  rel="noopener noreferrer" 
  className="text-success"
>
  <i className="bi bi-whatsapp fs-5"></i>
</a>

            {/* Facebook — no login needed */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalShareUrl)}`}
              target="_blank" rel="noopener noreferrer" className="text-primary">
              <i className="bi bi-facebook fs-5"></i>
            </a>
          </div>

          {/* Comment section — only visible after login */}
          {showComments && (
            <div className="mt-4 border-top pt-3">
              <h4 className="mb-3">टिप्पणियाँ ({comments.length})</h4>
              <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="अपनी टिप्पणी लिखें..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !newComment.trim()}>
                  Post
                </button>
              </form>
              <div className="comments-box">
                {comments.map((comment, index) => (
                  <div key={comment._id || index} className="border-bottom pb-2 mb-2">
                    <div className="d-flex align-items-center mb-1">
                      <UserAvatar user={comment.user} size={25} />
                      <strong className="ms-2">{comment.user?.name || "Anonymous"}</strong>
                    </div>
                    <p className="mb-0 ps-4">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <RelatedNews articles={relatedNews} currentArticleId={article._id} />
      </Container>
    </>
  );
};
export default NewsDetailPage;
