
// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import { AiFillHeart } from "react-icons/ai";
// import { BiCommentDetail, BiShare } from "react-icons/bi";
// import { newsshorts, addLikeToShort } from "../../Services/authApi";
// import CommentOffcanvas from "./CommentOffcanvas";
// import logo from "../../assets/logo.png";
// import logoT from "../../assets/logoT.png";
 
// const ReelViewer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { slug } = useParams();
 
//   const [shorts, setShorts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [activeShort, setActiveShort] = useState(null);
//   const [activeShortIndex, setActiveShortIndex] = useState(0);
//   const reelsListRef = useRef(null);
//   const shortRefs = useRef([]);
 
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
 
//   // ✅ API सिर्फ एक बार call होगी
//   const fetchAllShorts = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await newsshorts();
//       const fetchedShorts = response?.data || [];
//       setShorts(fetchedShorts);
 
//       let initialIndex = 0;
//       if (slug) {
//         const indexBySlug = fetchedShorts.findIndex((s) => s.slug === slug);
//         if (indexBySlug !== -1) {
//           initialIndex = indexBySlug;
//         }
//       } else if (location.state?.initialIndex !== undefined) {
//         initialIndex = location.state.initialIndex;
//       }
 
//       setActiveShortIndex(initialIndex);
//       setActiveShort(fetchedShorts[initialIndex] || null);
 
//       if (
//         fetchedShorts[initialIndex] &&
//         location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`
//       ) {
//         navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, {
//           replace: true,
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching shorts:", err);
//       setError("रील्स लोड करने में समस्या हुई");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []); // ✅ खाली dependency
 
//   useEffect(() => {
//     fetchAllShorts();
//   }, [fetchAllShorts]);
 
//   // ✅ Initial scroll position
//   useEffect(() => {
//     if (
//       shorts.length > 0 &&
//       reelsListRef.current &&
//       shortRefs.current[activeShortIndex]
//     ) {
//       const shortElement = shortRefs.current[activeShortIndex];
//       if (shortElement) {
//         shortElement.scrollIntoView({
//           behavior: "instant",
//           block: "start",
//         });
//       }
//     }
//   }, [activeShortIndex, shorts]);
 
//   // ✅ Intersection observer for slug update
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
//             const index = parseInt(entry.target.dataset.index, 10);
//             if (
//               shorts[index] &&
//               shorts[index].slug &&
//               index !== activeShortIndex
//             ) {
//               setActiveShortIndex(index);
//               setActiveShort(shorts[index]);
//               navigate(`/shorts/${shorts[index].slug}`, { replace: true });
//             }
//           }
//         });
//       },
//       {
//         root: reelsListRef.current,
//         rootMargin: "0px",
//         threshold: 0.95,
//       }
//     );
 
//     shortRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });
 
//     return () => {
//       observer.disconnect();
//     };
//   }, [shorts, navigate, activeShortIndex]);
 
//   // ✅ Infinite scroll (local state duplication only, no API call)
//   const handleScroll = () => {
//     const el = reelsListRef.current;
//     if (!el || isLoading) return;
 
//     if (
//       el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
//       shorts.length > 0
//     ) {
//       const originalLength = shorts.length;
//       setShorts((prev) => [...prev, ...prev.slice(0, originalLength)]);
//     }
//   };
 
//   // ✅ Like handler (local update + API)
//   const handleLike = async (shortId) => {
//     const originalShorts = [...shorts];
//     const updatedShorts = shorts.map((s) =>
//       s._id === shortId
//         ? {
//             ...s,
//             isLikedByCurrentUser: !s.isLikedByCurrentUser,
//             likesCount: s.isLikedByCurrentUser
//               ? s.likesCount - 1
//               : s.likesCount + 1,
//           }
//         : s
//     );
//     setShorts(updatedShorts);
 
//     try {
//       await addLikeToShort(shortId);
//     } catch (err) {
//       alert("Something went wrong while liking");
//       setShorts(originalShorts);
//     }
//   };
 
//   // ✅ Comment box open
//   const openCommentBox = (short) => {
//     setActiveShort(short);
//     setShowCommentBox(true);
//   };
 
//   // ✅ Comment posted → सिर्फ local state update
//   const handleCommentPosted = (shortId) => {
//     setShorts((prev) =>
//       prev.map((s) =>
//         s._id === shortId
//           ? { ...s, commentsCount: (s.commentsCount ?? 0) + 1 }
//           : s
//       )
//     );
//   };
 
//   // ================= UI =================
//   if (isLoading) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">Reels are loading...</h5>
//       </div>
//     );
//   }
 
//   if (error) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">{error}</h5>
//       </div>
//     );
//   }
 
//   if (shorts.length === 0) {
//     return (
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <h5 className="text-white">No reels available.</h5>
//       </div>
//     );
//   }
 
//   return (
//     <>
//       <div className="position-fixed top-0 start-0 w-100 vh-100 bg-black d-flex justify-content-center align-items-center"
//         style={{ zIndex: 99999 }}>
//         <IoArrowBack className="position-absolute top-0 start-0 m-3 text-white h2"
//           style={{ cursor: "pointer", zIndex: 10 }}
//           onClick={() => navigate(-1)} />
//         <div className="reels-main-container h-100 position-relative"
//           style={{ width: "100%", maxWidth: "420px", backgroundColor: "#000" }}>
//           <div className="reels-list h-100 overflow-y-scroll"
//             ref={reelsListRef}
//             onScroll={handleScroll}
//             style={{
//               scrollSnapType: "y mandatory",
//               msOverflowStyle: "none",
//               scrollbarWidth: "none"
//             }}>
//             {shorts.map((short, index) => (
//               <div key={`${short._id}-${index}`}
//                 ref={(el) => (shortRefs.current[index] = el)}
//                 data-index={index}
//                 className="h-100 w-100 d-flex justify-content-center align-items-center position-relative"
//                 style={{ scrollSnapAlign: "start" }}>
//                 <video
//                   src={short.videoUrl}
//                   loop
//                   autoPlay
//                   muted
//                   playsInline
//                   className="w-100 h-100"
//                   style={{ objectFit: "cover" }}
//                   onClick={(e) => (e.target.muted = !e.target.muted)}
//                 ></video>
 
//                 {/* Logo */}
//           {/* <video
//   src="/logogif.mp4"  // public folder me rakhi file
//   autoPlay
//   loop
//   muted
//   className="position-absolute top-0 start-0 m-3"
//   style={{ width: "60px", zIndex: 2100 }}
// /> */}

 
//                 {/* Bottom overlay */}
//                 <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex align-items-end"
//                   style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 10%, transparent)" }}>
//                   <div className="flex-grow-1">
//                     <h5 className="fw-bold m-0">@{short.createdBy?.name ?? "User"}</h5>
//                     <p className="m-0 mt-1 small">{short.title}</p>
//                   </div>
//                   <div className="d-flex flex-column align-items-center gap-4">
//                     <div className="text-center" style={{ cursor: "pointer" }}
//                       onClick={() => handleLike(short._id)}>
//                       <AiFillHeart
//                         className={`h1 ${short.isLikedByCurrentUser ? "text-danger" : "text-white"}`}
//                       />
//                       <span className="d-block small fw-bold text-white">
//                         {short.likesCount ?? 0}
//                       </span>
//                     </div>
//                     <div className="text-center" style={{ cursor: "pointer" }}
//                       onClick={() => openCommentBox(short)}>
//                       <BiCommentDetail className="h1 text-white" />
//                       <span className="d-block small fw-bold text-white">
//                         {short.commentsCount ?? 0}
//                       </span>
//                     </div>
//                     <div className="text-center" style={{ cursor: "pointer" }}>
//                       <BiShare className="h1 text-white"
//                         style={{ transform: "scaleX(-1)" }} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
 
//       <CommentOffcanvas
//         show={showCommentBox}
//         onHide={() => setShowCommentBox(false)}
//         short={activeShort}
//         onCommentPosted={(id) => handleCommentPosted(id)}
//       />
//     </>
//   );
// };
 
// export default ReelViewer;
 

// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { newsshorts, addLikeToShort } from "../../Services/authApi";
// import CommentOffcanvas from "./CommentOffcanvas";

// // ─── Inline SVG Icons (no dependency needed) ───────────────────────────────
// const HeartIcon = ({ filled }) => (
//   <svg viewBox="0 0 24 24" width="32" height="32" fill={filled ? "#ff4757" : "none"}
//     stroke={filled ? "#ff4757" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// const CommentIcon = () => (
//   <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//   </svg>
// );

// const ShareIcon = () => (
//   <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
//     <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
//     <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
//   </svg>
// );

// const BackIcon = () => (
//   <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
//     stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );

// const MuteIcon = () => (
//   <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//     <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
//   </svg>
// );

// const UnmuteIcon = () => (
//   <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//     <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
//     <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
//   </svg>
// );

// // ─── Styles ─────────────────────────────────────────────────────────────────
// const styles = `
//   @keyframes heartPop {
//     0%   { transform: scale(1); }
//     30%  { transform: scale(1.45); }
//     60%  { transform: scale(0.88); }
//     100% { transform: scale(1); }
//   }
//   @keyframes heartGlow {
//     0%,100% { filter: drop-shadow(0 0 0px #ff4757); }
//     50%      { filter: drop-shadow(0 0 10px #ff4757cc); }
//   }
//   .icon-btn {
//     background: none; border: none; padding: 0;
//     display: flex; flex-direction: column; align-items: center; gap: 4px;
//     cursor: pointer; color: white;
//   }
//   .icon-btn span {
//     font-size: 13px; font-weight: 700; color: white;
//     text-shadow: 0 1px 4px rgba(0,0,0,0.7);
//   }
//   .icon-wrap {
//     width: 52px; height: 52px;
//     display: flex; align-items: center; justify-content: center;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.12);
//     backdrop-filter: blur(6px);
//     transition: background 0.2s, transform 0.15s;
//     filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
//   }
//   .icon-wrap:active { transform: scale(0.88); background: rgba(255,255,255,0.22); }
//   .heart-liked .icon-wrap {
//     background: rgba(255,71,87,0.18);
//     animation: heartPop 0.35s ease forwards, heartGlow 1s ease 0.35s 2;
//   }
//   .heart-liked svg { filter: drop-shadow(0 0 6px #ff4757aa); }

//   .reel-desc {
//     font-size: 14px; line-height: 1.45; color: rgba(255,255,255,0.92);
//     display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
//     overflow: hidden; transition: all 0.3s;
//   }
//   .reel-desc.expanded {
//     -webkit-line-clamp: unset; overflow: visible;
//   }
//   .read-more-btn {
//     background: none; border: none; padding: 0; margin-top: 3px;
//     color: rgba(255,255,255,0.65); font-size: 12px; cursor: pointer;
//   }

//   .mute-badge {
//     position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
//     background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
//     border-radius: 20px; padding: 6px 14px;
//     display: flex; align-items: center; gap: 6px;
//     color: white; font-size: 13px; font-weight: 600;
//     opacity: 0; transition: opacity 0.3s;
//     pointer-events: none; z-index: 20;
//   }
//   .mute-badge.visible { opacity: 1; }

//   .reels-list::-webkit-scrollbar { display: none; }
//   .reels-list { -ms-overflow-style: none; scrollbar-width: none; }
// `;

// // ─── Component ───────────────────────────────────────────────────────────────
// const ReelViewer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { slug } = useParams();

//   const [shorts, setShorts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [activeShort, setActiveShort] = useState(null);
//   const [activeShortIndex, setActiveShortIndex] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showMuteBadge, setShowMuteBadge] = useState(false);
//   const [expandedDesc, setExpandedDesc] = useState({});
//   const [likeAnimating, setLikeAnimating] = useState({});
//   const [shareToast, setShareToast] = useState(false);

//   const reelsListRef = useRef(null);
//   const shortRefs = useRef([]);
//   const videoRefs = useRef([]);
//   const muteBadgeTimer = useRef(null);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = "auto"; };
//   }, []);

//   // ── Fetch ──────────────────────────────────────────────────────────────────
//   const fetchAllShorts = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await newsshorts();
//       const fetchedShorts = response?.data || [];
//       setShorts(fetchedShorts);

//       let initialIndex = 0;
//       if (slug) {
//         const idx = fetchedShorts.findIndex((s) => s.slug === slug);
//         if (idx !== -1) initialIndex = idx;
//       } else if (location.state?.initialIndex !== undefined) {
//         initialIndex = location.state.initialIndex;
//       }

//       setActiveShortIndex(initialIndex);
//       setActiveShort(fetchedShorts[initialIndex] || null);

//       if (
//         fetchedShorts[initialIndex] &&
//         location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`
//       ) {
//         navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, { replace: true });
//       }
//     } catch (err) {
//       console.error("Error fetching shorts:", err);
//       setError("रील्स लोड करने में समस्या हुई");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchAllShorts(); }, [fetchAllShorts]);

//   // ── Initial scroll ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (shorts.length > 0 && shortRefs.current[activeShortIndex]) {
//       shortRefs.current[activeShortIndex].scrollIntoView({ behavior: "instant", block: "start" });
//     }
//   }, [activeShortIndex, shorts]);

//   // ── Sound management: mute all except active ───────────────────────────────
//   useEffect(() => {
//     videoRefs.current.forEach((vid, idx) => {
//       if (!vid) return;
//       if (idx === activeShortIndex) {
//         vid.muted = isMuted;
//         vid.play().catch(() => {});
//       } else {
//         vid.muted = true;
//         vid.pause();
//       }
//     });
//   }, [activeShortIndex, isMuted, shorts]);

//   // ── Intersection Observer ─────────────────────────────────────────────────
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
//             const index = parseInt(entry.target.dataset.index, 10);
//             if (shorts[index] && index !== activeShortIndex) {
//               setActiveShortIndex(index);
//               setActiveShort(shorts[index]);
//               navigate(`/shorts/${shorts[index].slug}`, { replace: true });
//             }
//           }
//         });
//       },
//       { root: reelsListRef.current, rootMargin: "0px", threshold: 0.9 }
//     );

//     shortRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
//     return () => observer.disconnect();
//   }, [shorts, navigate, activeShortIndex]);

//   // ── Infinite scroll (local duplication) ───────────────────────────────────
//   const handleScroll = () => {
//     const el = reelsListRef.current;
//     if (!el || isLoading) return;
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50 && shorts.length > 0) {
//       const originalLength = shorts.length;
//       setShorts((prev) => [...prev, ...prev.slice(0, originalLength)]);
//     }
//   };

//   // ── Toggle mute (tap on video) ─────────────────────────────────────────────
//   const handleVideoTap = () => {
//     const newMuted = !isMuted;
//     setIsMuted(newMuted);
//     setShowMuteBadge(true);
//     clearTimeout(muteBadgeTimer.current);
//     muteBadgeTimer.current = setTimeout(() => setShowMuteBadge(false), 1600);
//   };

//   // ── Like ──────────────────────────────────────────────────────────────────
//   const handleLike = async (shortId) => {
//     const originalShorts = [...shorts];
//     setShorts((prev) =>
//       prev.map((s) =>
//         s._id === shortId
//           ? { ...s, isLikedByCurrentUser: !s.isLikedByCurrentUser,
//               likesCount: s.isLikedByCurrentUser ? s.likesCount - 1 : s.likesCount + 1 }
//           : s
//       )
//     );
//     // Animate
//     setLikeAnimating((prev) => ({ ...prev, [shortId]: true }));
//     setTimeout(() => setLikeAnimating((prev) => ({ ...prev, [shortId]: false })), 700);

//     try {
//       await addLikeToShort(shortId);
//     } catch {
//       alert("Something went wrong while liking");
//       setShorts(originalShorts);
//     }
//   };

//   // ── Share ─────────────────────────────────────────────────────────────────
//   const handleShare = async (short) => {
//     const shareUrl = `${window.location.origin}/shorts/${short.slug}`;
//     const shareData = {
//       title: short.title || "EMS News Short",
//       text: short.title || "Check out this reel!",
//       url: shareUrl,
//     };

//     try {
//       if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
//         await navigator.share(shareData);
//       } else {
//         await navigator.clipboard.writeText(shareUrl);
//         setShareToast(true);
//         setTimeout(() => setShareToast(false), 2200);
//       }
//     } catch (err) {
//       // User cancelled or error — try clipboard as fallback
//       try {
//         await navigator.clipboard.writeText(shareUrl);
//         setShareToast(true);
//         setTimeout(() => setShareToast(false), 2200);
//       } catch {
//         console.error("Share failed", err);
//       }
//     }
//   };

//   // ── Comment ───────────────────────────────────────────────────────────────
//   const openCommentBox = (short) => { setActiveShort(short); setShowCommentBox(true); };
//   const handleCommentPosted = (shortId) => {
//     setShorts((prev) =>
//       prev.map((s) =>
//         s._id === shortId ? { ...s, commentsCount: (s.commentsCount ?? 0) + 1 } : s
//       )
//     );
//   };

//   // ── Loading / Error / Empty ───────────────────────────────────────────────
//   const FullScreen = ({ children }) => (
//     <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999,
//       display: "flex", alignItems: "center", justifyContent: "center" }}>
//       {children}
//     </div>
//   );

//   if (isLoading) return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>Reels लोड हो रहे हैं...</p></FullScreen>;
//   if (error)    return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>{error}</p></FullScreen>;
//   if (!shorts.length) return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>कोई रील उपलब्ध नहीं।</p></FullScreen>;

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{styles}</style>

//       <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999,
//         display: "flex", justifyContent: "center", alignItems: "center" }}>

//         {/* Back button */}
//         <button onClick={() => navigate(-1)}
//           style={{ position: "absolute", top: 16, left: 16, zIndex: 10,
//             background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%",
//             width: 44, height: 44, display: "flex", alignItems: "center",
//             justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
//           <BackIcon />
//         </button>

//         {/* Share toast */}
//         {shareToast && (
//           <div style={{ position: "absolute", top: 70, left: "50%", transform: "translateX(-50%)",
//             background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
//             color: "#fff", borderRadius: 20, padding: "8px 18px", fontSize: 13,
//             fontWeight: 600, zIndex: 30, whiteSpace: "nowrap",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
//             🔗 लिंक कॉपी हो गया!
//           </div>
//         )}

//         {/* Reels container */}
//         <div style={{ width: "100%", maxWidth: 420, height: "100%", position: "relative",
//           background: "#000" }}>

//           <div ref={reelsListRef} onScroll={handleScroll}
//             className="reels-list"
//             style={{ height: "100%", overflowY: "scroll",
//               scrollSnapType: "y mandatory" }}>

//             {shorts.map((short, index) => {
//               const isActive = index === activeShortIndex;
//               const descExpanded = expandedDesc[short._id];
//               const title = short.title || "";
//               const needsExpand = title.length > 80;

//               return (
//                 <div key={`${short._id}-${index}`}
//                   ref={(el) => (shortRefs.current[index] = el)}
//                   data-index={index}
//                   style={{ height: "100%", width: "100%", position: "relative",
//                     scrollSnapAlign: "start", flexShrink: 0 }}>

//                   {/* Video */}
//                   <video
//                     ref={(el) => (videoRefs.current[index] = el)}
//                     src={short.videoUrl}
//                     loop autoPlay muted playsInline
//                     style={{ width: "100%", height: "100%", objectFit: "cover",
//                       display: "block" }}
//                     onClick={handleVideoTap}
//                   />

//                   {/* Mute badge */}
//                   <div className={`mute-badge${isActive && showMuteBadge ? " visible" : ""}`}>
//                     {isMuted ? <MuteIcon /> : <UnmuteIcon />}
//                     <span>{isMuted ? "म्यूट" : "आवाज़ चालू"}</span>
//                   </div>

//                   {/* Bottom overlay */}
//                   <div style={{
//                     position: "absolute", bottom: 0, left: 0, right: 0,
//                     padding: "60px 16px 20px 16px",
//                     background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
//                     display: "flex", alignItems: "flex-end", gap: 12,
//                   }}>
//                     {/* Left: user + description */}
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <p style={{ margin: "0 0 4px 0", fontWeight: 700, fontSize: 15,
//                         color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
//                         @{short.createdBy?.name ?? "User"}
//                       </p>

//                       {title && (
//                         <>
//                           <p className={`reel-desc${descExpanded ? " expanded" : ""}`}
//                             style={{ margin: 0 }}>
//                             {title}
//                           </p>
//                           {needsExpand && (
//                             <button className="read-more-btn"
//                               onClick={() => setExpandedDesc((prev) =>
//                                 ({ ...prev, [short._id]: !prev[short._id] }))}>
//                               {descExpanded ? "कम दिखाएं ▲" : "और पढ़ें ▼"}
//                             </button>
//                           )}
//                         </>
//                       )}
//                     </div>

//                     {/* Right: action icons */}
//                     <div style={{ display: "flex", flexDirection: "column",
//                       alignItems: "center", gap: 20, paddingBottom: 8 }}>

//                       {/* Like */}
//                       <button
//                         className={`icon-btn${short.isLikedByCurrentUser || likeAnimating[short._id] ? " heart-liked" : ""}`}
//                         onClick={() => handleLike(short._id)}>
//                         <div className="icon-wrap">
//                           <HeartIcon filled={short.isLikedByCurrentUser} />
//                         </div>
//                         <span>{short.likesCount ?? 0}</span>
//                       </button>

//                       {/* Comment */}
//                       <button className="icon-btn" onClick={() => openCommentBox(short)}>
//                         <div className="icon-wrap">
//                           <CommentIcon />
//                         </div>
//                         <span>{short.commentsCount ?? 0}</span>
//                       </button>

//                       {/* Share */}
//                       <button className="icon-btn" onClick={() => handleShare(short)}>
//                         <div className="icon-wrap">
//                           <ShareIcon />
//                         </div>
//                         <span>Share</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <CommentOffcanvas
//         show={showCommentBox}
//         onHide={() => setShowCommentBox(false)}
//         short={activeShort}
//         onCommentPosted={(id) => handleCommentPosted(id)}
//       />
//     </>
//   );
// };

// export default ReelViewer;





// import React, { useRef, useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { newsshorts, addLikeToShort } from "../../Services/authApi";
// import CommentOffcanvas from "./CommentOffcanvas";

// // ─── Inline SVG Icons (no dependency needed) ───────────────────────────────
// const HeartIcon = ({ filled }) => (
//   <svg viewBox="0 0 24 24" width="32" height="32" fill={filled ? "#ff4757" : "none"}
//     stroke={filled ? "#ff4757" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// const CommentIcon = () => (
//   <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//   </svg>
// );

// const ShareIcon = () => (
//   <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
//     <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
//     <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
//   </svg>
// );

// const BackIcon = () => (
//   <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
//     stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );

// const MuteIcon = () => (
//   <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//     <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
//   </svg>
// );

// const UnmuteIcon = () => (
//   <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
//     stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
//     <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
//     <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
//   </svg>
// );

// // ─── Styles ─────────────────────────────────────────────────────────────────
// const styles = `
//   @keyframes heartPop {
//     0%   { transform: scale(1); }
//     30%  { transform: scale(1.45); }
//     60%  { transform: scale(0.88); }
//     100% { transform: scale(1); }
//   }
//   @keyframes popupSlideUp {
//     from { transform: translateY(60px); opacity: 0; }
//     to   { transform: translateY(0);    opacity: 1; }
//   }
//   @keyframes backdropIn {
//     from { opacity: 0; }
//     to   { opacity: 1; }
//   }
//   .icon-btn {
//     background: none; border: none; padding: 0;
//     display: flex; flex-direction: column; align-items: center; gap: 4px;
//     cursor: pointer; color: white;
//   }
//   .icon-btn span {
//     font-size: 13px; font-weight: 700; color: white;
//     text-shadow: 0 1px 4px rgba(0,0,0,0.7);
//   }
//   .icon-wrap {
//     display: flex; align-items: center; justify-content: center;
//     transition: transform 0.15s;
//   }
//   .icon-wrap:active { transform: scale(0.85); }
//   .heart-liked svg {
//     animation: heartPop 0.35s ease forwards;
//   }

//   /* Login Popup */
//   .login-popup-backdrop {
//     position: fixed; inset: 0; z-index: 999999;
//     background: rgba(0,0,0,0.6);
//     display: flex; align-items: flex-end; justify-content: center;
//     animation: backdropIn 0.2s ease;
//   }
//   .login-popup-card {
//     width: 100%; max-width: 420px;
//     background: #fff;
//     border-radius: 24px 24px 0 0;
//     padding: 32px 24px 40px 24px;
//     animation: popupSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
//     text-align: center;
//   }
//   .login-popup-icon {
//     width: 64px; height: 64px; margin: 0 auto 16px;
//     background: #fff0f0; border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//   }
//   .login-popup-title {
//     font-size: 20px; font-weight: 800; color: #1a1a1a; margin: 0 0 8px;
//   }
//   .login-popup-sub {
//     font-size: 14px; color: #666; margin: 0 0 28px; line-height: 1.5;
//   }
//   .login-popup-btn-primary {
//     display: block; width: 100%;
//     padding: 14px; margin-bottom: 12px;
//     background: #e53935; color: #fff;
//     border: none; border-radius: 14px;
//     font-size: 16px; font-weight: 700; cursor: pointer;
//     transition: background 0.2s, transform 0.1s;
//   }
//   .login-popup-btn-primary:active { background: #c62828; transform: scale(0.97); }
//   .login-popup-btn-secondary {
//     display: block; width: 100%;
//     padding: 14px;
//     background: #f5f5f5; color: #333;
//     border: none; border-radius: 14px;
//     font-size: 16px; font-weight: 600; cursor: pointer;
//     transition: background 0.2s, transform 0.1s;
//   }
//   .login-popup-btn-secondary:active { background: #e0e0e0; transform: scale(0.97); }
//   .login-popup-cancel {
//     margin-top: 16px; background: none; border: none;
//     color: #999; font-size: 13px; cursor: pointer;
//   }

//   .reel-desc {
//     font-size: 14px; line-height: 1.45; color: rgba(255,255,255,0.92);
//     display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
//     overflow: hidden; transition: all 0.3s;
//   }
//   .reel-desc.expanded {
//     -webkit-line-clamp: unset; overflow: visible;
//   }
//   .read-more-btn {
//     background: none; border: none; padding: 0; margin-top: 3px;
//     color: rgba(255,255,255,0.65); font-size: 12px; cursor: pointer;
//   }

//   .mute-badge {
//     position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
//     background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
//     border-radius: 20px; padding: 6px 14px;
//     display: flex; align-items: center; gap: 6px;
//     color: white; font-size: 13px; font-weight: 600;
//     opacity: 0; transition: opacity 0.3s;
//     pointer-events: none; z-index: 20;
//   }
//   .mute-badge.visible { opacity: 1; }

//   .reels-list::-webkit-scrollbar { display: none; }
//   .reels-list { -ms-overflow-style: none; scrollbar-width: none; }
// `;

// // ─── Component ───────────────────────────────────────────────────────────────
// const ReelViewer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { slug } = useParams();

//   const [shorts, setShorts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [activeShort, setActiveShort] = useState(null);
//   const [activeShortIndex, setActiveShortIndex] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showMuteBadge, setShowMuteBadge] = useState(false);
//   const [expandedDesc, setExpandedDesc] = useState({});
//   const [likeAnimating, setLikeAnimating] = useState({});
//   const [shareToast, setShareToast] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);

//   const reelsListRef = useRef(null);
//   const shortRefs = useRef([]);
//   const videoRefs = useRef([]);
//   const muteBadgeTimer = useRef(null);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = "auto"; };
//   }, []);

//   // ── Fetch ──────────────────────────────────────────────────────────────────
//   const fetchAllShorts = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await newsshorts();
//       const fetchedShorts = response?.data || [];
//       setShorts(fetchedShorts);

//       let initialIndex = 0;
//       if (slug) {
//         const idx = fetchedShorts.findIndex((s) => s.slug === slug);
//         if (idx !== -1) initialIndex = idx;
//       } else if (location.state?.initialIndex !== undefined) {
//         initialIndex = location.state.initialIndex;
//       }

//       setActiveShortIndex(initialIndex);
//       setActiveShort(fetchedShorts[initialIndex] || null);

//       if (
//         fetchedShorts[initialIndex] &&
//         location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`
//       ) {
//         navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, { replace: true });
//       }
//     } catch (err) {
//       console.error("Error fetching shorts:", err);
//       setError("रील्स लोड करने में समस्या हुई");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchAllShorts(); }, [fetchAllShorts]);

//   // ── Initial scroll ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (shorts.length > 0 && shortRefs.current[activeShortIndex]) {
//       shortRefs.current[activeShortIndex].scrollIntoView({ behavior: "instant", block: "start" });
//     }
//   }, [activeShortIndex, shorts]);

//   // ── Sound management: mute all except active ───────────────────────────────
//   useEffect(() => {
//     videoRefs.current.forEach((vid, idx) => {
//       if (!vid) return;
//       if (idx === activeShortIndex) {
//         vid.muted = isMuted;
//         vid.play().catch(() => {});
//       } else {
//         vid.muted = true;
//         vid.pause();
//       }
//     });
//   }, [activeShortIndex, isMuted, shorts]);

//   // ── Intersection Observer ─────────────────────────────────────────────────
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
//             const index = parseInt(entry.target.dataset.index, 10);
//             if (shorts[index] && index !== activeShortIndex) {
//               setActiveShortIndex(index);
//               setActiveShort(shorts[index]);
//               navigate(`/shorts/${shorts[index].slug}`, { replace: true });
//             }
//           }
//         });
//       },
//       { root: reelsListRef.current, rootMargin: "0px", threshold: 0.9 }
//     );

//     shortRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
//     return () => observer.disconnect();
//   }, [shorts, navigate, activeShortIndex]);

//   // ── Infinite scroll (local duplication) ───────────────────────────────────
//   const handleScroll = () => {
//     const el = reelsListRef.current;
//     if (!el || isLoading) return;
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50 && shorts.length > 0) {
//       const originalLength = shorts.length;
//       setShorts((prev) => [...prev, ...prev.slice(0, originalLength)]);
//     }
//   };

//   // ── Toggle mute (tap on video) ─────────────────────────────────────────────
//   const handleVideoTap = () => {
//     const newMuted = !isMuted;
//     setIsMuted(newMuted);
//     setShowMuteBadge(true);
//     clearTimeout(muteBadgeTimer.current);
//     muteBadgeTimer.current = setTimeout(() => setShowMuteBadge(false), 1600);
//   };

//   // ── Like ──────────────────────────────────────────────────────────────────
//   const handleLike = async (shortId) => {
//     // Check if user is logged in — adjust this check to match your auth system
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       setShowLoginPopup(true);
//       return;
//     }

//     const originalShorts = [...shorts];
//     setShorts((prev) =>
//       prev.map((s) =>
//         s._id === shortId
//           ? { ...s, isLikedByCurrentUser: !s.isLikedByCurrentUser,
//               likesCount: s.isLikedByCurrentUser ? s.likesCount - 1 : s.likesCount + 1 }
//           : s
//       )
//     );
//     // Animate
//     setLikeAnimating((prev) => ({ ...prev, [shortId]: true }));
//     setTimeout(() => setLikeAnimating((prev) => ({ ...prev, [shortId]: false })), 700);

//     try {
//       await addLikeToShort(shortId);
//     } catch {
//       alert("Something went wrong while liking");
//       setShorts(originalShorts);
//     }
//   };

//   // ── Share ─────────────────────────────────────────────────────────────────
//   const handleShare = async (short) => {
//     const shareUrl = `${window.location.origin}/shorts/${short.slug}`;
//     const shareData = {
//       title: short.title || "EMS News Short",
//       text: short.title || "Check out this reel!",
//       url: shareUrl,
//     };

//     try {
//       if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
//         await navigator.share(shareData);
//       } else {
//         await navigator.clipboard.writeText(shareUrl);
//         setShareToast(true);
//         setTimeout(() => setShareToast(false), 2200);
//       }
//     } catch (err) {
//       // User cancelled or error — try clipboard as fallback
//       try {
//         await navigator.clipboard.writeText(shareUrl);
//         setShareToast(true);
//         setTimeout(() => setShareToast(false), 2200);
//       } catch {
//         console.error("Share failed", err);
//       }
//     }
//   };

//   // ── Comment ───────────────────────────────────────────────────────────────
//   const openCommentBox = (short) => { setActiveShort(short); setShowCommentBox(true); };
//   const handleCommentPosted = (shortId) => {
//     setShorts((prev) =>
//       prev.map((s) =>
//         s._id === shortId ? { ...s, commentsCount: (s.commentsCount ?? 0) + 1 } : s
//       )
//     );
//   };

//   // ── Loading / Error / Empty ───────────────────────────────────────────────
//   const FullScreen = ({ children }) => (
//     <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999,
//       display: "flex", alignItems: "center", justifyContent: "center" }}>
//       {children}
//     </div>
//   );

//   if (isLoading) return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>Reels लोड हो रहे हैं...</p></FullScreen>;
//   if (error)    return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>{error}</p></FullScreen>;
//   if (!shorts.length) return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>कोई रील उपलब्ध नहीं।</p></FullScreen>;

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{styles}</style>

//       <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999,
//         display: "flex", justifyContent: "center", alignItems: "center" }}>

//         {/* Back button */}
//         <button onClick={() => navigate(-1)}
//           style={{ position: "absolute", top: 16, left: 16, zIndex: 10,
//             background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%",
//             width: 44, height: 44, display: "flex", alignItems: "center",
//             justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
//           <BackIcon />
//         </button>

//         {/* Share toast */}
//         {shareToast && (
//           <div style={{ position: "absolute", top: 70, left: "50%", transform: "translateX(-50%)",
//             background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
//             color: "#fff", borderRadius: 20, padding: "8px 18px", fontSize: 13,
//             fontWeight: 600, zIndex: 30, whiteSpace: "nowrap",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
//             🔗 लिंक कॉपी हो गया!
//           </div>
//         )}

//         {/* Reels container */}
//         <div style={{ width: "100%", maxWidth: 420, height: "100%", position: "relative",
//           background: "#000" }}>

//           <div ref={reelsListRef} onScroll={handleScroll}
//             className="reels-list"
//             style={{ height: "100%", overflowY: "scroll",
//               scrollSnapType: "y mandatory" }}>

//             {shorts.map((short, index) => {
//               const isActive = index === activeShortIndex;
//               const descExpanded = expandedDesc[short._id];
//               const title = short.title || "";
//               const needsExpand = title.length > 80;

//               return (
//                 <div key={`${short._id}-${index}`}
//                   ref={(el) => (shortRefs.current[index] = el)}
//                   data-index={index}
//                   style={{ height: "100%", width: "100%", position: "relative",
//                     scrollSnapAlign: "start", flexShrink: 0 }}>

//                   {/* Video */}
//                   <video
//                     ref={(el) => (videoRefs.current[index] = el)}
//                     src={short.videoUrl}
//                     loop autoPlay muted playsInline
//                     style={{ width: "100%", height: "100%", objectFit: "cover",
//                       display: "block" }}
//                     onClick={handleVideoTap}
//                   />

//                   {/* Mute badge */}
//                   <div className={`mute-badge${isActive && showMuteBadge ? " visible" : ""}`}>
//                     {isMuted ? <MuteIcon /> : <UnmuteIcon />}
//                     <span>{isMuted ? "म्यूट" : "आवाज़ चालू"}</span>
//                   </div>

//                   {/* Bottom overlay */}
//                   <div style={{
//                     position: "absolute", bottom: 0, left: 0, right: 0,
//                     padding: "60px 16px 20px 16px",
//                     background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
//                     display: "flex", alignItems: "flex-end", gap: 12,
//                   }}>
//                     {/* Left: user + description */}
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <p style={{ margin: "0 0 4px 0", fontWeight: 700, fontSize: 15,
//                         color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
//                         @{short.createdBy?.name ?? "User"}
//                       </p>

//                       {title && (
//                         <>
//                           <p className={`reel-desc${descExpanded ? " expanded" : ""}`}
//                             style={{ margin: 0 }}>
//                             {title}
//                           </p>
//                           {needsExpand && (
//                             <button className="read-more-btn"
//                               onClick={() => setExpandedDesc((prev) =>
//                                 ({ ...prev, [short._id]: !prev[short._id] }))}>
//                               {descExpanded ? "कम दिखाएं ▲" : "और पढ़ें ▼"}
//                             </button>
//                           )}
//                         </>
//                       )}
//                     </div>

//                     {/* Right: action icons */}
//                     <div style={{ display: "flex", flexDirection: "column",
//                       alignItems: "center", gap: 20, paddingBottom: 8 }}>

//                       {/* Like */}
//                       <button
//                         className={`icon-btn${short.isLikedByCurrentUser || likeAnimating[short._id] ? " heart-liked" : ""}`}
//                         onClick={() => handleLike(short._id)}>
//                         <HeartIcon filled={short.isLikedByCurrentUser} />
//                         <span>{short.likesCount ?? 0}</span>
//                       </button>

//                       {/* Comment */}
//                       <button className="icon-btn" onClick={() => openCommentBox(short)}>
//                         <CommentIcon />
//                         <span>{short.commentsCount ?? 0}</span>
//                       </button>

//                       {/* Share */}
//                       <button className="icon-btn" onClick={() => handleShare(short)}>
//                         <ShareIcon />
//                         <span>शेयर</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Login Popup */}
//       {showLoginPopup && (
//         <div className="login-popup-backdrop" onClick={() => setShowLoginPopup(false)}>
//           <div className="login-popup-card" onClick={(e) => e.stopPropagation()}>
//             <div className="login-popup-icon">
//               <svg viewBox="0 0 24 24" width="32" height="32" fill="#e53935"
//                 stroke="#e53935" strokeWidth="0">
//                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//               </svg>
//             </div>
//             <h2 className="login-popup-title">पसंद करने के लिए लॉगिन करें</h2>
//             <p className="login-popup-sub">
//               रील को लाइक करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।
//             </p>
//             <button className="login-popup-btn-primary"
//               onClick={() => { setShowLoginPopup(false); navigate("/login"); }}>
//               लॉगिन करें
//             </button>
//             <button className="login-popup-btn-secondary"
//               onClick={() => { setShowLoginPopup(false); navigate("/login"); }}>
//               साइन अप करें
//             </button>
//             <button className="login-popup-cancel" onClick={() => setShowLoginPopup(false)}>
//               अभी नहीं
//             </button>
//           </div>
//         </div>
//       )}

//       <CommentOffcanvas
//         show={showCommentBox}
//         onHide={() => setShowCommentBox(false)}
//         short={activeShort}
//         onCommentPosted={(id) => handleCommentPosted(id)}
//       />
//     </>
//   );
// };

// export default ReelViewer;



import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { newsshorts, addLikeToShort } from "../../Services/authApi";
import CommentOffcanvas from "./CommentOffcanvas";

// ─── Inline SVG Icons ───────────────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill={filled ? "#ff4757" : "none"}
    stroke={filled ? "#ff4757" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const MuteIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const UnmuteIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = `
  @keyframes heartPop {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.45); }
    60%  { transform: scale(0.88); }
    100% { transform: scale(1); }
  }
  @keyframes popupSlideUp {
    from { transform: translateY(60px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes sheetSlideUp {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }
  .icon-btn {
    background: none; border: none; padding: 0;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    cursor: pointer; color: white;
  }
  .icon-btn span {
    font-size: 13px; font-weight: 700; color: white;
    text-shadow: 0 1px 4px rgba(0,0,0,0.7);
  }
  .icon-wrap {
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.15s;
  }
  .icon-wrap:active { transform: scale(0.85); }
  .heart-liked svg {
    animation: heartPop 0.35s ease forwards;
  }

  /* Login Popup */
  .login-popup-backdrop {
    position: fixed; inset: 0; z-index: 999999;
    background: rgba(0,0,0,0.6);
    display: flex; align-items: flex-end; justify-content: center;
    animation: backdropIn 0.2s ease;
  }
  .login-popup-card {
    width: 100%; max-width: 420px;
    background: #fff;
    border-radius: 24px 24px 0 0;
    padding: 32px 24px 40px 24px;
    animation: popupSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
    text-align: center;
  }
  .login-popup-icon {
    width: 64px; height: 64px; margin: 0 auto 16px;
    background: #fff0f0; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .login-popup-title {
    font-size: 20px; font-weight: 800; color: #1a1a1a; margin: 0 0 8px;
  }
  .login-popup-sub {
    font-size: 14px; color: #666; margin: 0 0 28px; line-height: 1.5;
  }
  .login-popup-btn-primary {
    display: block; width: 100%;
    padding: 14px; margin-bottom: 12px;
    background: #e53935; color: #fff;
    border: none; border-radius: 14px;
    font-size: 16px; font-weight: 700; cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .login-popup-btn-primary:active { background: #c62828; transform: scale(0.97); }
  .login-popup-btn-secondary {
    display: block; width: 100%;
    padding: 14px;
    background: #f5f5f5; color: #333;
    border: none; border-radius: 14px;
    font-size: 16px; font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .login-popup-btn-secondary:active { background: #e0e0e0; transform: scale(0.97); }
  .login-popup-cancel {
    margin-top: 16px; background: none; border: none;
    color: #999; font-size: 13px; cursor: pointer;
  }

.reel-desc-title {
    font-size: 15px; font-weight: 700; line-height: 1.4;
    color: rgba(255,255,255,0.97);
    margin: 0 0 4px 0;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  }
  .reel-desc {
    font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.78);
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
    max-height: 40px;
    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
    opacity: 1;
  }
  .reel-desc.expanded {
    -webkit-line-clamp: unset;
    overflow: visible;
    max-height: 300px;
  }
  .read-more-btn {
    background: none; border: none; padding: 2px 0 0 0; margin-top: 2px;
    color: rgba(255,255,255,0.5); font-size: 12px; cursor: pointer;
    display: flex; align-items: center; gap: 3px;
    transition: color 0.2s;
  }
  .read-more-btn:hover { color: rgba(255,255,255,0.85); }

  .mute-badge {
    position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
    border-radius: 20px; padding: 6px 14px;
    display: flex; align-items: center; gap: 6px;
    color: white; font-size: 13px; font-weight: 600;
    opacity: 0; transition: opacity 0.3s;
    pointer-events: none; z-index: 20;
  }
  .mute-badge.visible { opacity: 1; }

  .reels-list::-webkit-scrollbar { display: none; }
  .reels-list { -ms-overflow-style: none; scrollbar-width: none; }

  /* ── Comment Sheet ── */
  .comment-sheet-backdrop {
    position: fixed; inset: 0; z-index: 999998;
    background: rgba(0,0,0,0.5);
    animation: backdropIn 0.2s ease;
  }
  .comment-sheet {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 420px;
    background: #1a1a1a;
    border-radius: 20px 20px 0 0;
    z-index: 999999;
    display: flex; flex-direction: column;
    max-height: 75vh;
    animation: sheetSlideUp 0.3s cubic-bezier(0.32,0.72,0,1);
  }
  .comment-sheet-handle {
    width: 40px; height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    margin: 12px auto 0;
    flex-shrink: 0;
  }
  .comment-sheet-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  }
  .comment-sheet-title {
    font-size: 15px; font-weight: 700; color: #fff; margin: 0;
  }
  .comment-sheet-close {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.6); font-size: 22px; line-height: 1;
    padding: 0; display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px;
  }
  .comment-list {
    flex: 1; overflow-y: auto; padding: 12px 16px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .comment-list::-webkit-scrollbar { display: none; }
  .comment-item {
    display: flex; gap: 10px; align-items: flex-start;
  }
  .comment-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, #e53935, #ff7043);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .comment-body { flex: 1; }
  .comment-author {
    font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.9);
    margin: 0 0 2px;
  }
  .comment-text {
    font-size: 14px; color: rgba(255,255,255,0.75);
    margin: 0; line-height: 1.45;
  }
  .comment-time {
    font-size: 11px; color: rgba(255,255,255,0.35);
    margin-top: 3px;
  }
  .no-comments {
    text-align: center; padding: 32px 0;
    color: rgba(255,255,255,0.35); font-size: 14px;
  }

  /* ── Comment Input Bar ── */
  .comment-input-bar {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    border-top: 1px solid rgba(255,255,255,0.08);
    background: #1a1a1a;
    flex-shrink: 0;
    /* KEY FIX: stay above keyboard on mobile */
    position: sticky; bottom: 0;
    padding-bottom: max(10px, env(safe-area-inset-bottom));
  }
  .comment-input-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, #e53935, #ff7043);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .comment-input-field {
    flex: 1;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 22px;
    padding: 10px 16px;
    font-size: 14px; color: #fff;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
    max-height: 90px;
    min-height: 40px;
    line-height: 1.4;
    font-family: inherit;
  }
  .comment-input-field::placeholder { color: rgba(255,255,255,0.35); }
  .comment-input-field:focus { border-color: rgba(229,57,53,0.6); }
  .comment-send-btn {
    width: 38px; height: 38px; border-radius: 50%;
    background: #e53935; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #fff; flex-shrink: 0;
    transition: background 0.2s, transform 0.1s, opacity 0.2s;
  }
  .comment-send-btn:disabled {
    background: rgba(255,255,255,0.15); cursor: not-allowed; opacity: 0.5;
  }
  .comment-send-btn:not(:disabled):active { transform: scale(0.88); background: #c62828; }
`;

// ─── Component ───────────────────────────────────────────────────────────────
const ReelViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const [shorts, setShorts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [activeShort, setActiveShort] = useState(null);
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showMuteBadge, setShowMuteBadge] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState({});
  const [likeAnimating, setLikeAnimating] = useState({});
  const [shareToast, setShareToast] = useState(false);

  // Login popup — separate state for like vs comment context
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginPopupContext, setLoginPopupContext] = useState("like"); // "like" | "comment"

  // Comment sheet state
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const commentInputRef = useRef(null);

  const reelsListRef = useRef(null);
  const shortRefs = useRef([]);
  const videoRefs = useRef([]);
  const muteBadgeTimer = useRef(null);

  // Helper: get token
  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchAllShorts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await newsshorts();
      const fetchedShorts = response?.data || [];
      setShorts(fetchedShorts);

      let initialIndex = 0;
      if (slug) {
        const idx = fetchedShorts.findIndex((s) => s.slug === slug);
        if (idx !== -1) initialIndex = idx;
      } else if (location.state?.initialIndex !== undefined) {
        initialIndex = location.state.initialIndex;
      }

      setActiveShortIndex(initialIndex);
      setActiveShort(fetchedShorts[initialIndex] || null);

      if (
        fetchedShorts[initialIndex] &&
        location.pathname !== `/shorts/${fetchedShorts[initialIndex].slug}`
      ) {
        navigate(`/shorts/${fetchedShorts[initialIndex].slug}`, { replace: true });
      }
    } catch (err) {
      console.error("Error fetching shorts:", err);
      setError("रील्स लोड करने में समस्या हुई");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllShorts(); }, [fetchAllShorts]);

  // ── Initial scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (shorts.length > 0 && shortRefs.current[activeShortIndex]) {
      shortRefs.current[activeShortIndex].scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [activeShortIndex, shorts]);

  // ── Sound management ───────────────────────────────────────────────────────
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === activeShortIndex) {
        vid.muted = isMuted;
        vid.play().catch(() => {});
      } else {
        vid.muted = true;
        vid.pause();
      }
    });
  }, [activeShortIndex, isMuted, shorts]);

  // ── Intersection Observer ─────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (shorts[index] && index !== activeShortIndex) {
              setActiveShortIndex(index);
              setActiveShort(shorts[index]);
              navigate(`/shorts/${shorts[index].slug}`, { replace: true });
            }
          }
        });
      },
      { root: reelsListRef.current, rootMargin: "0px", threshold: 0.9 }
    );

    shortRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [shorts, navigate, activeShortIndex]);

  // ── Infinite scroll ────────────────────────────────────────────────────────
  const handleScroll = () => {
    const el = reelsListRef.current;
    if (!el || isLoading) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50 && shorts.length > 0) {
      const originalLength = shorts.length;
      setShorts((prev) => [...prev, ...prev.slice(0, originalLength)]);
    }
  };

  // ── Toggle mute ────────────────────────────────────────────────────────────
  const handleVideoTap = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setShowMuteBadge(true);
    clearTimeout(muteBadgeTimer.current);
    muteBadgeTimer.current = setTimeout(() => setShowMuteBadge(false), 1600);
  };

  // ── Like ──────────────────────────────────────────────────────────────────
  const handleLike = async (shortId) => {
    if (!getToken()) {
      setLoginPopupContext("like");
      setShowLoginPopup(true);
      return;
    }

    const originalShorts = [...shorts];
    setShorts((prev) =>
      prev.map((s) =>
        s._id === shortId
          ? { ...s, isLikedByCurrentUser: !s.isLikedByCurrentUser,
              likesCount: s.isLikedByCurrentUser ? s.likesCount - 1 : s.likesCount + 1 }
          : s
      )
    );
    setLikeAnimating((prev) => ({ ...prev, [shortId]: true }));
    setTimeout(() => setLikeAnimating((prev) => ({ ...prev, [shortId]: false })), 700);

    try {
      await addLikeToShort(shortId);
    } catch {
      alert("Something went wrong while liking");
      setShorts(originalShorts);
    }
  };

  // ── Share ─────────────────────────────────────────────────────────────────
  const handleShare = async (short) => {
    const shareUrl = `${window.location.origin}/shorts/${short.slug}`;
    const shareData = {
      title: short.title || "EMS News Short",
      text: short.title || "Check out this reel!",
      url: shareUrl,
    };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2200);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2200);
      } catch (err) {
        console.error("Share failed", err);
      }
    }
  };

  // ── Comment open ──────────────────────────────────────────────────────────
  const openCommentBox = (short) => {
    if (!getToken()) {
      setLoginPopupContext("comment");
      setShowLoginPopup(true);
      return;
    }
    setActiveShort(short);
    setComments(short.comments || []);
    setCommentText("");
    setShowCommentBox(true);
    // Focus input after sheet animates in
    setTimeout(() => commentInputRef.current?.focus(), 350);
  };

  // ── Comment submit ────────────────────────────────────────────────────────
  const handleCommentSubmit = async () => {
    const text = commentText.trim();
    if (!text || commentSubmitting || !activeShort) return;

    setCommentSubmitting(true);
    const tempComment = {
      _id: `temp-${Date.now()}`,
      text,
      createdAt: new Date().toISOString(),
      user: { name: "आप" },
    };

    // Optimistic update
    setComments((prev) => [...prev, tempComment]);
    setShorts((prev) =>
      prev.map((s) =>
        s._id === activeShort._id
          ? { ...s, commentsCount: (s.commentsCount ?? 0) + 1 }
          : s
      )
    );
    setCommentText("");

    try {
      // Replace with your actual API call, e.g.:
      // await addCommentToShort(activeShort._id, text);
      // If API returns the real comment, swap tempComment with it
    } catch {
      // Rollback on error
      setComments((prev) => prev.filter((c) => c._id !== tempComment._id));
      setShorts((prev) =>
        prev.map((s) =>
          s._id === activeShort._id
            ? { ...s, commentsCount: Math.max(0, (s.commentsCount ?? 1) - 1) }
            : s
        )
      );
      alert("कमेंट पोस्ट नहीं हो सका, दोबारा कोशिश करें।");
    } finally {
      setCommentSubmitting(false);
    }
  };

  // handle Enter key (Shift+Enter = newline)
  const handleCommentKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  // ── Loading / Error / Empty ───────────────────────────────────────────────
  const FullScreen = ({ children }) => (
    <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );

  if (isLoading) return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>Reels लोड हो रहे हैं...</p></FullScreen>;
  if (error)    return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>{error}</p></FullScreen>;
  if (!shorts.length) return <FullScreen><p style={{ color: "#fff", fontSize: 16 }}>कोई रील उपलब्ध नहीं।</p></FullScreen>;

  // ── Login popup content based on context ─────────────────────────────────
  const loginPopupContent = loginPopupContext === "comment"
    ? {
        icon: (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#e53935">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
        title: "कमेंट करने के लिए लॉगिन करें",
        sub: "रील पर कमेंट करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।",
      }
    : {
        icon: (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#e53935">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        ),
        title: "पसंद करने के लिए लॉगिन करें",
        sub: "रील को लाइक करने के लिए पहले अपना अकाउंट बनाएं या लॉगिन करें।",
      };


// ── Parse description: make URLs clickable ─────────────────────────────────
const renderDescription = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      // Reset regex lastIndex after test()
      urlRegex.lastIndex = 0;
      return (
        
          <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            color: "#4fc3f7",
            textDecoration: "underline",
            wordBreak: "break-all",
            fontSize: 12,
          }}
        >
          {part}
        </a>
      );
    }
    urlRegex.lastIndex = 0;
    return part;
  });
};
      
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>

      <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 99999,
        display: "flex", justifyContent: "center", alignItems: "center" }}>

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          style={{ position: "absolute", top: 16, left: 16, zIndex: 10,
            background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%",
            width: 44, height: 44, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
          <BackIcon />
        </button>

        {/* Share toast */}
        {shareToast && (
          <div style={{ position: "absolute", top: 70, left: "50%", transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
            color: "#fff", borderRadius: 20, padding: "8px 18px", fontSize: 13,
            fontWeight: 600, zIndex: 30, whiteSpace: "nowrap",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
            🔗 लिंक कॉपी हो गया!
          </div>
        )}

        {/* Reels container */}
        <div style={{ width: "100%", maxWidth: 420, height: "100%", position: "relative",
          background: "#000" }}>

          <div ref={reelsListRef} onScroll={handleScroll}
            className="reels-list"
            style={{ height: "100%", overflowY: "scroll", scrollSnapType: "y mandatory" }}>

            {shorts.map((short, index) => {
              const isActive = index === activeShortIndex;
              const descExpanded = expandedDesc[short._id];
       const title = short.title || "";
              return (
                <div key={`${short._id}-${index}`}
                  ref={(el) => (shortRefs.current[index] = el)}
                  data-index={index}
                  style={{ height: "100%", width: "100%", position: "relative",
                    scrollSnapAlign: "start", flexShrink: 0 }}>

                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={short.videoUrl}
                    loop autoPlay muted playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onClick={handleVideoTap}
                  />

                  <div className={`mute-badge${isActive && showMuteBadge ? " visible" : ""}`}>
                    {isMuted ? <MuteIcon /> : <UnmuteIcon />}
                    <span>{isMuted ? "म्यूट" : "आवाज़ चालू"}</span>
                  </div>

                  {/* Bottom overlay */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "60px 16px 20px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                    display: "flex", alignItems: "flex-end", gap: 12,
                  }}>
                    {/* <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 4px 0", fontWeight: 700, fontSize: 15,
                        color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                        @{short.createdBy?.name ?? "User"}
                      </p>
                      {title && (
                        <>
                          <p className={`reel-desc${descExpanded ? " expanded" : ""}`} style={{ margin: 0 }}>
                            {title}
                          </p>
                          {needsExpand && (
                            <button className="read-more-btn"
                              onClick={() => setExpandedDesc((prev) =>
                                ({ ...prev, [short._id]: !prev[short._id] }))}>
                              {descExpanded ? "कम दिखाएं ▲" : "और पढ़ें ▼"}
                            </button>
                          )}
                        </>
                      )}
                    </div> */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 4px 0", fontWeight: 700, fontSize: 13,
                        color: "rgba(255,255,255,0.7)", textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                        letterSpacing: "0.01em" }}>
                        @{short.createdBy?.name ?? "User"}
                      </p>
                      {title && (
                        <p className="reel-desc-title">{title}</p>
                      )}
                      {short.description && (() => {
                        const desc = short.description;
                        const isLong = desc.length > 80;
                        return (
                          <>
                          <p className={`reel-desc${descExpanded ? " expanded" : ""}`}
  style={{ margin: 0 }}>
  {renderDescription(desc)}
</p>
                            {isLong && (
                              <button className="read-more-btn"
                                onClick={() => setExpandedDesc((prev) =>
                                  ({ ...prev, [short._id]: !prev[short._id] }))}>
                                {descExpanded ? "▲ कम दिखाएं" : "▼ और पढ़ें"}
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    {/* Action icons */}
                    <div style={{ display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 20, paddingBottom: 8 }}>

                      <button
                        className={`icon-btn${short.isLikedByCurrentUser || likeAnimating[short._id] ? " heart-liked" : ""}`}
                        onClick={() => handleLike(short._id)}>
                        <HeartIcon filled={short.isLikedByCurrentUser} />
                        <span>{short.likesCount ?? 0}</span>
                      </button>

                      <button className="icon-btn" onClick={() => openCommentBox(short)}>
                        <CommentIcon />
                        <span>{short.commentsCount ?? 0}</span>
                      </button>

                      <button className="icon-btn" onClick={() => handleShare(short)}>
                        <ShareIcon />
                        <span>शेयर</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Login Popup (like & comment) ── */}
      {showLoginPopup && (
        <div className="login-popup-backdrop" onClick={() => setShowLoginPopup(false)}>
          <div className="login-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="login-popup-icon">
              {loginPopupContent.icon}
            </div>
            <h2 className="login-popup-title">{loginPopupContent.title}</h2>
            <p className="login-popup-sub">{loginPopupContent.sub}</p>
            <button className="login-popup-btn-primary"
              onClick={() => { setShowLoginPopup(false); navigate("/login"); }}>
              लॉगिन करें
            </button>
            <button className="login-popup-btn-secondary"
              onClick={() => { setShowLoginPopup(false); navigate("/login"); }}>
              साइन अप करें
            </button>
            <button className="login-popup-cancel" onClick={() => setShowLoginPopup(false)}>
              अभी नहीं
            </button>
          </div>
        </div>
      )}

      {/* ── Comment Sheet (built-in, replaces CommentOffcanvas for logged-in users) ── */}
      {showCommentBox && (
        <>
          <div className="comment-sheet-backdrop" onClick={() => setShowCommentBox(false)} />
          <div className="comment-sheet">
            {/* Handle */}
            <div className="comment-sheet-handle" />

            {/* Header */}
            <div className="comment-sheet-header">
              <p className="comment-sheet-title">
                कमेंट ({activeShort?.commentsCount ?? comments.length})
              </p>
              <button className="comment-sheet-close" onClick={() => setShowCommentBox(false)}>
                ×
              </button>
            </div>

            {/* Comments list */}
            <div className="comment-list">
              {comments.length === 0 ? (
                <div className="no-comments">
                  <p style={{ margin: 0 }}>💬 अभी तक कोई कमेंट नहीं।</p>
                  <p style={{ margin: "6px 0 0", fontSize: 12 }}>पहले कमेंट करें!</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="comment-item">
                    <div className="comment-avatar">
                      {(c.user?.name || c.createdBy?.name || "U")[0].toUpperCase()}
                    </div>
                    <div className="comment-body">
                      <p className="comment-author">{c.user?.name || c.createdBy?.name || "User"}</p>
                      <p className="comment-text">{c.text || c.comment}</p>
                      <p className="comment-time">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString("hi-IN", {
                              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                            })
                          : "अभी"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── Input bar — always visible ── */}
            <div className="comment-input-bar">
              <textarea
                ref={commentInputRef}
                className="comment-input-field"
                placeholder="कमेंट लिखें..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleCommentKeyDown}
                rows={1}
              />
              <button
                className="comment-send-btn"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim() || commentSubmitting}>
                <SendIcon />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Keep CommentOffcanvas in tree if other parts of app depend on it */}
      {/* Remove the line below if you no longer need CommentOffcanvas */}
      {false && (
        <CommentOffcanvas
          show={false}
          onHide={() => {}}
          short={activeShort}
          onCommentPosted={() => {}}
        />
      )}
    </>
  );
};

export default ReelViewer;