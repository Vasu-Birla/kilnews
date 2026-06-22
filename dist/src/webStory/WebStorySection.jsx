

// // import React, { useState, useEffect, useRef } from "react";
// // import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// // import { getWebStroy } from "../Services/authApi";
// // import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
// // import { Link } from "react-router-dom";
// // import {  useNavigate } from "react-router-dom";



// // const WebStorySection = () => {
// //   const [stories, setStories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();


// //   const [selectedStory, setSelectedStory] = useState(null);
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [duration, setDuration] = useState(5000);
// //   const [isPaused, setIsPaused] = useState(false);

// //   const videoRef = useRef(null);
// //   const [progress, setProgress] = useState(0);
// //   const progressRef = useRef(null);
// //   const [elapsedTime, setElapsedTime] = useState(0);

// //   // Inject Keyframes
// //   useEffect(() => {
// //     const style = document.createElement("style");
// //     style.innerHTML = `
// //       @keyframes zoomOut {
// //         0% { transform: scale(1.2); opacity: 0.8; }
// //         100% { transform: scale(1); opacity: 1; }
// //       }
// //       @keyframes slideInRight {
// //         from { transform: translateX(100%); opacity: 0; }
// //         to { transform: translateX(0); opacity: 1; }
// //       }
// //     `;
// //     document.head.appendChild(style);
// //   }, []);



// //   // Fetch stories
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //     const fetchStories = async () => {
// //       try {
// //         const response = await getWebStroy();
// //         if (response.success && response.data) {
// //           const latestFour = response.data.slice(0, 4);
// //           setStories(latestFour);
// //         } else {
// //           setError("Failed to load stories.");
// //         }
// //       } catch (err) {
// //         setError(err.message || "Error fetching stories.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchStories();
// //   }, []);

// //   // Video play/pause
// //   useEffect(() => {
// //     if (videoRef.current) {
// //       if (isPaused) videoRef.current.pause();
// //       else videoRef.current.play().catch(() => {});
// //     }
// //   }, [isPaused, currentSlide]);

// //   // Progress Control
// //   useEffect(() => {
// //     if (!selectedStory || isPaused) return;

// //     const slide = selectedStory.slides[currentSlide];
// //     if (!slide) return;

// //     let dur = 5000;
// //     if (slide.mediaType === "video") {
// //       dur =
// //         (videoRef.current && videoRef.current.duration
// //           ? videoRef.current.duration
// //           : 5) * 1000;
// //     }
// //     setDuration(dur);

// //     let start = Date.now() - elapsedTime;
// //     setProgress((elapsedTime / dur) * 100);

// //     const tick = () => {
// //       const elapsed = Date.now() - start;
// //       if (elapsed >= dur) {
// //         setProgress(100);
// //         setElapsedTime(0);
// //         nextSlide();
// //         return;
// //       }
// //       setProgress((elapsed / dur) * 100);
// //       progressRef.current = requestAnimationFrame(tick);
// //     };

// //     progressRef.current = requestAnimationFrame(tick);

// //     return () => cancelAnimationFrame(progressRef.current);
// //   }, [selectedStory, currentSlide, isPaused]);

// //   useEffect(() => {
// //     if (isPaused) setElapsedTime((progress / 100) * duration);
// //   }, [isPaused]);

// //   const nextSlide = () => {
// //     if (!selectedStory) return;
// //     if (currentSlide < selectedStory.slides.length - 1) setCurrentSlide(prev => prev + 1);
// //     else closeOverlay();
// //   };

// //   const prevSlide = () => {
// //     if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
// //   };

// //   // URL update helpers
// //   const updateURLWithSlug = (slug) => {
// //     if (window && window.history) {
// //       window.history.replaceState(null, "", `/web-stories/${slug}`);
// //     }
// //   };

// //   const openOverlay = (story) => {
// //     setSelectedStory(story);
// //     setCurrentSlide(0);
// //     setIsPaused(false);
// //     updateURLWithSlug(story.slug);
// //   };

 
// //  const closeOverlay = () => {
// //   setSelectedStory(null);
// //   setCurrentSlide(0);
// //   setIsPaused(false);
// //   navigate("/"); // ✅ यह हमेशा homepage पर redirect करेगा
// // };

// //   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
// //   if (error) return <Alert variant="danger">{error}</Alert>;

// //   return (
// //     <Container className="mt-4">
// //    <div className="d-flex align-items-center mb-3 flex-wrap">
// //   <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
// //     <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
// //     <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
// //   </div>

// //   {/* Horizontal red line */}
// //   <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />

// //   {/* और देखें Button */}
// //   <Link
// //     to="/all-webstories"
// //     state={{ allWebStories: stories }}
// //     className="text-decoration-none fw-bold small flex-shrink-0"
// //     style={{ color: "#2E6E9E" }}
// //   >
// //     और देखें
// //   </Link>
// // </div>


// //       <Row>
// //         {stories.map((story) => {
// //           const firstSlide = story.slides?.[0];
// //           return (
// //             <Col
// //               key={story._id}
// //               xs={12} sm={6} md={4} lg={3}
// //               className="mb-3"
// //               onClick={() => openOverlay(story)}
// //               style={{ cursor: "pointer" }}
// //             >
// //               <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
// //                 {firstSlide?.mediaType === "video" ? (
// //                   <video src={firstSlide.mediaUrl} muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
// //                 ) : (
// //                   <img src={firstSlide?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt={story.title} className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
// //                 )}
// //                 <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))" }}>
// //                   <h6 className="mb-0">{story.title}</h6>
// //                 </div>
// //               </div>
// //             </Col>
// //           );
// //         })}
// //       </Row>

// //       {selectedStory && (
// //         <div className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
// //           <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
// //             {/* Progress Bar */}
// //             <div className="d-flex position-absolute top-0 start-0 w-100 p-2 gap-1" style={{ zIndex: 2000 }}>
// //               {selectedStory.slides.map((_, i) => (
// //                 <div key={i} className="flex-grow-1 bg-dark rounded overflow-hidden" style={{ height: "5px" }}>
// //                   <div className="h-100" style={{
// //                     backgroundColor: "red",
// //                     width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%"
// //                   }} />
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Controls */}
// //             <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", zIndex: 2100 }}>
// //               {isPaused ? (
// //                 <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
// //               ) : (
// //                 <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
// //               )}
// //             </div>

// //             {/* Slide Navigation */}
// //             <div className="w-100 h-100 position-relative" style={{ overflow: "hidden" }} onClick={(e) => {
// //               const { clientX, currentTarget } = e;
// //               const { width, left } = currentTarget.getBoundingClientRect();
// //               const clickX = clientX - left;
// //               if (clickX < width / 2) prevSlide();
// //               else nextSlide();
// //             }}>
// //               {selectedStory.slides[currentSlide]?.mediaType === "video" ? (
// //                 <video key={currentSlide} ref={videoRef} src={selectedStory.slides[currentSlide].mediaUrl} autoPlay muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
// //               ) : (
// //                 <img key={currentSlide} src={selectedStory.slides[currentSlide]?.mediaUrl} alt="" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
// //               )}
// //             </div>

// //             {/* Caption */}
// //             <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
// //               <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
// //               <p className="small">{selectedStory.slides[currentSlide]?.caption}</p>
// //             </div>

// //             {/* Prev / Next */}
// //             <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
// //             <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, right: "-60px" }}>›</button>

// //             {/* Close */}
// //             <button onClick={closeOverlay} className="btn btn-dark position-absolute top-0 start-0 m-2">✕</button>
// //           </div>
// //         </div>
// //       )}
// //     </Container>
// //   );
// // };

// // export default WebStorySection;

// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
// import { getWebStroy } from "../Services/authApi";
// import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
// import { Link, useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const WebStorySection = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [duration, setDuration] = useState(5000); // Default duration for image slides
//   const [isPaused, setIsPaused] = useState(false);

//   const videoRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const progressAnimRef = useRef(null); // Renamed from progressRef to avoid confusion with DOM ref
//   const [elapsedTime, setElapsedTime] = useState(0);

//   // Inject Keyframes
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes zoomOut {
//         0% { transform: scale(1.2); opacity: 0.8; }
//         100% { transform: scale(1); opacity: 1; }
//       }
//       @keyframes slideInRight {
//         from { transform: translateX(100%); opacity: 0; }
//         to { transform: translateX(0); opacity: 1; }
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

//   // Fetch stories
//   useEffect(() => {
//     window.scrollTo(0, 0); // यह लाइन वेब स्टोरी सेक्शन को प्रभावित कर सकती है, अगर यह होमपेज पर है तो विचार करें
//     const fetchStories = async () => {
//       try {
//         const response = await getWebStroy();
//         if (response.success && response.data) {
//           const latestFour = response.data.slice(0, 4);
//           setStories(latestFour);
//         } else {
//           setError("Failed to load stories.");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching stories.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStories();
//   }, []);

//   // Video control (play/pause)
//   useEffect(() => {
//     if (videoRef.current) {
//       if (isPaused) videoRef.current.pause();
//       else videoRef.current.play().catch(() => {});
//     }
//   }, [isPaused, currentSlide, selectedStory]);

//   // Progress animation (for both image and video)
//   useEffect(() => {
//     if (!selectedStory || isPaused || !selectedStory.slides[currentSlide]) {
//       cancelAnimationFrame(progressAnimRef.current);
//       return;
//     }

//     const slide = selectedStory.slides[currentSlide];
//     let currentSlideDuration = duration; // Use the current state duration

//     // If it's a video and videoRef is ready, use actual video duration
//     if (slide.mediaType === "video" && videoRef.current && videoRef.current.duration) {
//         currentSlideDuration = videoRef.current.duration * 1000;
//         setDuration(currentSlideDuration); // Update duration state
//     }
    
//     // Set initial progress based on elapsedTime (if coming from paused state)
//     let startTimestamp = Date.now() - elapsedTime;
    
//     const tick = () => {
//       const elapsed = Date.now() - startTimestamp;
//       if (elapsed >= currentSlideDuration) {
//         setProgress(100);
//         setElapsedTime(0);
//         cancelAnimationFrame(progressAnimRef.current);
//         nextSlide();
//         return;
//       }
//       setProgress((elapsed / currentSlideDuration) * 100);
//       progressAnimRef.current = requestAnimationFrame(tick);
//     };

//     progressAnimRef.current = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(progressAnimRef.current);
//   }, [selectedStory, currentSlide, isPaused, duration, elapsedTime]); // Add duration and elapsedTime as dependencies

//   // Save elapsed time when paused
//   useEffect(() => {
//     if (isPaused) {
//         setElapsedTime((progress / 100) * duration);
//     }
//   }, [isPaused, progress, duration]);

//   // Reset progress and elapsed time when slide changes
//   useEffect(() => {
//     if (selectedStory) {
//       setElapsedTime(0);
//       setProgress(0);
//       setIsPaused(false); // Autoplay on new story/slide
//       if (selectedStory.slides[currentSlide]?.mediaType === "video") {
//         setDuration(5000); // Reset duration for video until metadata loads
//       } else {
//         setDuration(5000); // Default duration for image
//       }
//     }
//   }, [selectedStory, currentSlide]);


//   const nextSlide = () => {
//     if (!selectedStory) return;
//     if (currentSlide < selectedStory.slides.length - 1) {
//       setCurrentSlide((prev) => prev + 1);
//     } else {
//       closeOverlay();
//     }
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) {
//       setCurrentSlide((prev) => prev - 1);
//     } else if (currentSlide === 0 && selectedStory) {
//         // If on the first slide, do nothing or close the story, depending on desired UX
//         // For now, let's keep it on the first slide
//     }
//   };

//   // URL update helpers
//   const updateURLWithSlug = (slug) => {
//     if (window && window.history) {
//       window.history.replaceState(null, "", `/web-stories/${slug}`);
//     }
//   };

//   const openOverlay = (story) => {
//     setSelectedStory(story);
//     setCurrentSlide(0);
//     setIsPaused(false);
//     setElapsedTime(0); // Reset elapsed time
//     setProgress(0);    // Reset progress
//     updateURLWithSlug(story.slug);
//   };

 
//   const closeOverlay = () => {
//     setSelectedStory(null);
//     setCurrentSlide(0);
//     setIsPaused(false);
//     setElapsedTime(0); // Reset elapsed time
//     setProgress(0);    // Reset progress
//     navigate("/"); // ✅ यह हमेशा homepage पर redirect करेगा
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <Container className="mt-4">
//    <div className="d-flex align-items-center mb-3 flex-wrap">
//   <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//     <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
//     <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
//   </div>

//   {/* Horizontal red line */}
//   <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />

//   {/* और देखें Button */}
//   <Link
//     to="/all-webstories"
//     state={{ allWebStories: stories }}
//     className="text-decoration-none fw-bold small flex-shrink-0"
//     style={{ color: "#2E6E9E" }}
//   >
//     और देखें
//   </Link>
// </div>


//       {/* ✅ Desktop Grid View */}
//       <div className="d-none d-md-block"> {/* यह div केवल डेस्कटॉप पर दिखेगा */}
//         <Row>
//           {stories.map((story) => {
//             const firstSlide = story.slides?.[0];
//             return (
//               <Col
//                 key={story._id}
//                 xs={12} sm={6} md={4} lg={3}
//                 className="mb-3"
//                 onClick={() => openOverlay(story)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
//                   {firstSlide?.mediaType === "video" ? (
//                     <video src={firstSlide.mediaUrl} muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
//                   ) : (
//                     <img src={firstSlide?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt={story.title} className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
//                   )}
//                   <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))" }}>
//                     <h6 className="mb-0">{story.title}</h6>
//                   </div>
//                 </div>
//               </Col>
//             );
//           })}
//         </Row>
//       </div>

//       {/* ✅ Mobile Slider View */}
//       <div className="d-md-none"> {/* यह div केवल मोबाइल पर दिखेगा */}
//         <Swiper spaceBetween={10} slidesPerView={1.1}>
//           {stories.map((story) => {
//             const firstSlide = story.slides?.[0];
//             return (
//               <SwiperSlide key={story._id}>
//                 <div
//                   onClick={() => openOverlay(story)}
//                   style={{
//                     cursor: "pointer",
//                     borderRadius: "10px",
//                     overflow: "hidden",
//                     height: "350px", // मोबाइल स्लाइडर के लिए थोड़ी अधिक ऊंचाई
//                     backgroundColor: "#000",
//                     position: "relative" // Added for proper positioning of inner elements
//                   }}
//                 >
//                   {firstSlide?.mediaType === "video" ? (
//                     <video
//                       src={firstSlide.mediaUrl}
//                       muted
//                       className="w-100 h-100"
//                       style={{ objectFit: "contain", backgroundColor: "#000" }}
//                     />
//                   ) : (
//                     <img
//                       src={
//                         firstSlide?.mediaUrl ||
//                         "https://via.placeholder.com/300x400?text=Web+Story"
//                       }
//                       alt={story.title}
//                       className="w-100 h-100"
//                       style={{ objectFit: "contain", backgroundColor: "#000" }}
//                     />
//                   )}
//                   <div
//                     className="position-absolute bottom-0 start-0 w-100 p-2 text-white"
//                     style={{
//                       background:
//                         "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
//                     }}
//                   >
//                     <h6 className="mb-0">{story.title}</h6>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>

//       {/* ✅ Web Story Overlay */}
//       {selectedStory && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center"
//           style={{ zIndex: 1050 }}
//         >
//           <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
//             {/* Story Progress Bars */}
//             <div
//               className="d-flex w-100 p-2"
//               style={{ position: "absolute", top: 0, left: 0, zIndex: 1051, gap: "4px" }}
//             >
//               {selectedStory.slides.map((_, idx) => (
//                 <div key={idx} className="flex-grow-1 bg-dark rounded" style={{ height: "3px", overflow: "hidden" }}>
//                   <div
//                     className="bg-white"
//                     style={{
//                       width:
//                         idx === currentSlide
//                           ? `${progress}%`
//                           : idx < currentSlide
//                           ? "100%"
//                           : "0%",
//                       height: "100%",
//                       transition: idx === currentSlide ? "none" : "width 0.1s linear", // No transition for current slide's dynamic progress
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Close Button - Moved to top-left */}
//             <Button
//               onClick={closeOverlay}
//               className="position-absolute top-0 start-0 m-2" // 'end-0' को 'start-0' में बदला गया
//               variant="light"
//               style={{
//                 zIndex: 2100, // Make sure it's above other elements
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 backgroundColor: "rgba(255,255,255,0.7)",
//                 border: "none"
//               }}
//             >
//               &times;
//             </Button>

//             {/* Controls (Play/Pause) - Positioned on top-right, relative to close button */}
//             <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", right: "10px", zIndex: 2100 }}> {/* Removed right: "60px" and adjusted to be clear of new close button */}
//               {isPaused ? (
//                 <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
//               ) : (
//                 <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
//               )}
//             </div>

//             {/* Slide Navigation */}
//             <div className="w-100 h-100 position-relative" style={{ overflow: "hidden" }} onClick={(e) => {
//               const { clientX, currentTarget } = e;
//               const { width, left } = currentTarget.getBoundingClientRect();
//               const clickX = clientX - left;
//               if (clickX < width / 2) prevSlide();
//               else nextSlide();
//             }}>
//               {selectedStory.slides[currentSlide]?.mediaType === "video" ? (
//                 <video key={currentSlide} ref={videoRef} src={selectedStory.slides[currentSlide].mediaUrl} autoPlay muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }}
//                     onLoadedMetadata={(e) => {
//                         // Ensure duration is set for video on metadata load, but only if not paused
//                         if (videoRef.current && !isPaused) {
//                             setDuration(e.currentTarget.duration * 1000);
//                         }
//                     }}
//                 />
//               ) : (
//                 <img key={currentSlide} src={selectedStory.slides[currentSlide]?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt="" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
//               )}
//             </div>

//             {/* Caption */}
//             <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
//               <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
//               <p className="mb-0 small">{selectedStory.slides[currentSlide]?.caption}</p>
//             </div>

//             {/* Prev / Next buttons for overlay (outside clickable area) */}
//             <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 translate-middle-y d-none d-md-block" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
//             <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 translate-middle-y d-none d-md-block" style={{ zIndex: 2100, right: "-60px" }}>›</button>

//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default WebStorySection;


/// upate by yash 11/13/25







// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { getWebStroy } from "../Services/authApi";
// import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
// import { Link, useNavigate } from "react-router-dom";

// // Helper to extract YouTube video ID from various YouTube URLs
// const getYouTubeVideoId = (url) => {
//   if (!url) return null;
//   // Updated regex to include YouTube Shorts pattern '/shorts/'
//   const regExp =
//     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
//   const match = url.match(regExp);
//   // Check for the length of the matched ID (YouTube IDs are 11 characters)
//   return (match && match[2] && match[2].length === 11) ? match[2] : null;
// };

// // Helper to get YouTube thumbnail URL
// const getYouTubeThumbnail = (videoId) => {
//   if (!videoId) return null;
//   // Using 'mqdefault' for medium quality thumbnail, 'hqdefault' for high quality
//   return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
// };

// const WebStorySection = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();


//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [duration, setDuration] = useState(5000); // Default duration for images/external non-video
//   const [isPaused, setIsPaused] = useState(false);

//   const videoRef = useRef(null); // Ref for native <video> elements
//   const [progress, setProgress] = useState(0);
//   const progressRef = useRef(null);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   // Inject Keyframes for animations
//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       @keyframes zoomOut {
//         0% { transform: scale(1.2); opacity: 0.8; }
//         100% { transform: scale(1); opacity: 1; }
//       }
//       @keyframes slideInRight {
//         from { transform: translateX(100%); opacity: 0; }
//         to { transform: translateX(0); opacity: 1; }
//       }
//     `;
//     document.head.appendChild(style);
//   }, []);

//   // Fetch stories
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchStories = async () => {
//       try {
//         const response = await getWebStroy();
//         if (response.success && response.data) {
//           const latestFour = response.data.slice(0, 4);
//           setStories(latestFour);
//         } else {
//           setError("Failed to load stories.");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching stories.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStories();
//   }, []);

//   // Video play/pause (for native <video> elements)
//   useEffect(() => {
//     // Only apply to native video elements when a story is selected
//     if (selectedStory && selectedStory.slides[currentSlide]?.mediaType === "video" && videoRef.current) {
//       if (isPaused) videoRef.current.pause();
//       else videoRef.current.play().catch(() => {});
//     }
//   }, [isPaused, currentSlide, selectedStory]); // Added selectedStory as dependency

//   // Progress Control for slides (images, native videos, external links)
//   useEffect(() => {
//     if (!selectedStory || isPaused) {
//         cancelAnimationFrame(progressRef.current); // Stop animation on pause or no story
//         return;
//     }

//     const slide = selectedStory.slides[currentSlide];
//     if (!slide) {
//         cancelAnimationFrame(progressRef.current);
//         return;
//     }

//     let calculatedDuration = 7000; // Default duration for most slides (images, external)
//     if (slide.mediaType === "video" && videoRef.current) {
//       // For native video, use its actual duration
//       calculatedDuration = videoRef.current.duration * 1000;
//     } else if (slide.isExternalLink) {
//         // For external links (like YouTube), use a fixed duration
//         calculatedDuration = 7000; // E.g., 7 seconds per external link slide
//     }

//     setDuration(calculatedDuration);

//     let startTime = Date.now() - elapsedTime;
//     setProgress((elapsedTime / calculatedDuration) * 100);

//     const tick = () => {
//       const elapsed = Date.now() - startTime;
//       if (elapsed >= calculatedDuration) {
//         setProgress(100);
//         setElapsedTime(0);
//         nextSlide();
//         return;
//       }
//       setProgress((elapsed / calculatedDuration) * 100);
//       progressRef.current = requestAnimationFrame(tick);
//     };

//     progressRef.current = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(progressRef.current);
//   }, [selectedStory, currentSlide, isPaused, elapsedTime]); // Added elapsedTime to dependencies for accurate restart

//   useEffect(() => {
//     if (isPaused) setElapsedTime((progress / 100) * duration);
//   }, [isPaused, progress, duration]);


//   const nextSlide = () => {
//     if (!selectedStory) return;
//     setIsPaused(true); // Pause briefly before transitioning
//     setElapsedTime(0); // Reset elapsed time for the new slide
//     setProgress(0); // Reset progress for the new slide
//     if (currentSlide < selectedStory.slides.length - 1) {
//       setCurrentSlide(prev => prev + 1);
//     } else {
//       closeOverlay();
//     }
//     setTimeout(() => setIsPaused(false), 100); // Resume after a short delay
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) {
//       setIsPaused(true); // Pause briefly before transitioning
//       setElapsedTime(0); // Reset elapsed time for the new slide
//       setProgress(0); // Reset progress for the new slide
//       setCurrentSlide(prev => prev - 1);
//       setTimeout(() => setIsPaused(false), 100); // Resume after a short delay
//     }
//   };

//   // URL update helpers
//   const updateURLWithSlug = (slug) => {
//     if (window && window.history) {
//       window.history.replaceState(null, "", `/web-stories/${slug}`);
//     }
//   };

//   const openOverlay = (story) => {
//     setSelectedStory(story);
//     setCurrentSlide(0);
//     setElapsedTime(0); // Ensure elapsed time is reset when opening a new story
//     setProgress(0); // Reset progress bar
//     setIsPaused(false);
//     updateURLWithSlug(story.slug);
//   };

//   const closeOverlay = () => {
//     setSelectedStory(null);
//     setCurrentSlide(0);
//     setIsPaused(false);
//     setElapsedTime(0);
//     setProgress(0);
//     navigate("/"); // ✅ यह हमेशा homepage पर redirect करेगा
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <Container className="mt-4">
//       <div className="d-flex align-items-center mb-3 flex-wrap">
//         <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//           <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
//           <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
//         </div>

//         {/* Horizontal red line */}
//         <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />

//         {/* और देखें Button */}
//         <Link
//           to="/all-webstories"
//           state={{ allWebStories: stories }}
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: "#2E6E9E" }}
//         >
//           और देखें
//         </Link>
//       </div>

//       <Row>
//         {stories.map((story) => {
//           const firstSlide = story.slides?.[0];
//           const youTubeVideoId = firstSlide?.isExternalLink && firstSlide?.mediaUrl ? getYouTubeVideoId(firstSlide.mediaUrl) : null;
//           const youTubeThumbnailUrl = youTubeVideoId ? getYouTubeThumbnail(youTubeVideoId) : null;

//           return (
//             <Col
//               key={story._id}
//               xs={12} sm={6} md={4} lg={3}
//               className="mb-3"
//               onClick={() => openOverlay(story)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
//                 {firstSlide ? (
//                   firstSlide.isExternalLink && youTubeThumbnailUrl ? (
//                     <img
//                       src={youTubeThumbnailUrl}
//                       alt={story.title}
//                       className="w-100 h-100"
//                       style={{ objectFit: "contain", backgroundColor: "#000" }}
//                     />
//                   ) : firstSlide.mediaType === "video" ? (
//                     <video
//                       src={firstSlide.mediaUrl}
//                       muted
//                       className="w-100 h-100"
//                       style={{ objectFit: "contain", backgroundColor: "#000" }}
//                     />
//                   ) : ( // Default to image for local images or placeholder for other external links
//                     <img
//                       src={firstSlide.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"}
//                       alt={story.title}
//                       className="w-100 h-100"
//                       style={{ objectFit: "contain", backgroundColor: "#000" }}
//                     />
//                   )
//                 ) : (
//                   <img src="https://via.placeholder.com/300x400?text=Web+Story" alt="Placeholder" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
//                 )}
//                 <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))" }}>
//                   <h6 className="mb-0">{story.title}</h6>
//                 </div>
//               </div>
//             </Col>
//           );
//         })}
//       </Row>

//       {selectedStory && (
//         <div className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
//           <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
//             {/* Progress Bar */}
//             <div className="d-flex position-absolute top-0 start-0 w-100 p-2 gap-1" style={{ zIndex: 2000 }}>
//               {selectedStory.slides.map((_, i) => (
//                 <div key={i} className="flex-grow-1 bg-dark rounded overflow-hidden" style={{ height: "5px" }}>
//                   <div className="h-100" style={{
//                     backgroundColor: "red",
//                     width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%"
//                   }} />
//                 </div>
//               ))}
//             </div>

//             {/* Controls */}
//             <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", zIndex: 2100 }}>
//               {isPaused ? (
//                 <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
//               ) : (
//                 <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
//               )}
//             </div>

//             {/* Slide Content (Image, Native Video, or YouTube Iframe) */}
//             <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center" style={{ overflow: "hidden" }} onClick={(e) => {
//               const { clientX, currentTarget } = e;
//               const { width, left } = currentTarget.getBoundingClientRect();
//               const clickX = clientX - left;
//               if (clickX < width / 2) prevSlide();
//               else nextSlide();
//             }}>
//               {selectedStory.slides[currentSlide]?.isExternalLink ? (
//                 // External Link (e.g., YouTube)
//                 (() => {
//                   const slideUrl = selectedStory.slides[currentSlide].mediaUrl;
//                   const youTubeId = getYouTubeVideoId(slideUrl);
//                   if (youTubeId) {
//                     return (
//                       <div style={{ width: '100%', height: '100%', position: 'relative' }}>
//                         <iframe
//                           key={currentSlide} // Key change ensures iframe re-renders
//                           width="100%"
//                           height="100%"
//                           src={`https://www.youtube.com/embed/${youTubeId}?autoplay=${isPaused ? 0 : 1}&mute=1`} // Autoplay only when not paused
//                           title="YouTube video player"
//                           frameBorder="0"
//                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                           allowFullScreen
//                           style={{ objectFit: "contain", backgroundColor: "#000" }}
//                         />
//                       </div>
//                     );
//                   } else {
//                     return (
//                       <div className="text-white text-center p-3">
//                         <p>Cannot display external link directly: <a href={slideUrl} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline">{slideUrl}</a></p>
//                       </div>
//                     );
//                   }
//                 })()
//               ) : selectedStory.slides[currentSlide]?.mediaType === "video" ? (
//                 // Native Video
//                 <video
//                   key={currentSlide}
//                   ref={videoRef}
//                   src={selectedStory.slides[currentSlide].mediaUrl}
//                   autoPlay={!isPaused} // Control autoplay with isPaused
//                   muted
//                   className="w-100 h-100"
//                   style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }}
//                   onEnded={nextSlide} // Go to next slide when native video ends
//                 />
//               ) : (
//                 // Image
//                 <img
//                   key={currentSlide}
//                   src={selectedStory.slides[currentSlide]?.mediaUrl}
//                   alt={selectedStory.title}
//                   className="w-100 h-100"
//                   style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }}
//                 />
//               )}
//             </div>

//             {/* Caption */}
//             <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
//               <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
//               <p className="small">{selectedStory.slides[currentSlide]?.caption}</p>
//             </div>

//             {/* Prev / Next Buttons for user click */}
//             <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
//             <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, right: "-60px" }}>›</button>

//             {/* Close Button */}
//             <button onClick={closeOverlay} className="btn btn-dark position-absolute top-0 start-0 m-2" style={{ zIndex: 2100 }}>✕</button>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default WebStorySection;

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { getWebStroy } from "../Services/authApi";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

// Helper to extract YouTube video ID from various YouTube URLs
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2] && match[2].length === 11) ? match[2] : null;
};

// Helper to get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const WebStorySection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(5000);
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Inject Styles for Keyframes and Mobile Scrolling
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes zoomOut {
        0% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      /* Mobile Horizontal Scrolling Styles */
      @media (max-width: 575.98px) {
        .mobile-scroll-row {
          display: flex !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          padding-bottom: 10px; /* Space for shadow/overflow */
          margin-right: -12px; /* Offset container padding */
          margin-left: -12px;
          padding-left: 12px; /* Start padding */
        }
        .mobile-scroll-row::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
        .mobile-scroll-col {
          flex: 0 0 70% !important; /* Card width on mobile */
          max-width: 70% !important;
          margin-right: 15px; /* Spacing between cards */
          margin-bottom: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        /* Ensure the last card has spacing on the right */
        .mobile-scroll-col:last-child {
          margin-right: 12px;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      // document.head.removeChild(style); // Cleanup if needed
    };
  }, []);

  // Fetch stories
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStories = async () => {
      try {
        const response = await getWebStroy();
        if (response.success && response.data) {
          const latestFour = response.data.slice(0, 4);
          setStories(latestFour);
        } else {
          setError("Failed to load stories.");
        }
      } catch (err) {
        setError(err.message || "Error fetching stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // ... (Remaining effects for video, progress, slides remain unchanged)
  useEffect(() => {
    if (selectedStory && selectedStory.slides[currentSlide]?.mediaType === "video" && videoRef.current) {
      if (isPaused) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
  }, [isPaused, currentSlide, selectedStory]);

  useEffect(() => {
    if (!selectedStory || isPaused) {
        cancelAnimationFrame(progressRef.current);
        return;
    }

    const slide = selectedStory.slides[currentSlide];
    if (!slide) {
        cancelAnimationFrame(progressRef.current);
        return;
    }

    let calculatedDuration = 7000;
    if (slide.mediaType === "video" && videoRef.current) {
      calculatedDuration = videoRef.current.duration * 1000;
    } else if (slide.isExternalLink) {
        calculatedDuration = 7000;
    }

    setDuration(calculatedDuration);

    let startTime = Date.now() - elapsedTime;
    setProgress((elapsedTime / calculatedDuration) * 100);

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= calculatedDuration) {
        setProgress(100);
        setElapsedTime(0);
        nextSlide();
        return;
      }
      setProgress((elapsed / calculatedDuration) * 100);
      progressRef.current = requestAnimationFrame(tick);
    };

    progressRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(progressRef.current);
  }, [selectedStory, currentSlide, isPaused, elapsedTime]);

  useEffect(() => {
    if (isPaused) setElapsedTime((progress / 100) * duration);
  }, [isPaused, progress, duration]);

  const nextSlide = () => {
    if (!selectedStory) return;
    setIsPaused(true);
    setElapsedTime(0);
    setProgress(0);
    if (currentSlide < selectedStory.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      closeOverlay();
    }
    setTimeout(() => setIsPaused(false), 100);
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsPaused(true);
      setElapsedTime(0);
      setProgress(0);
      setCurrentSlide(prev => prev - 1);
      setTimeout(() => setIsPaused(false), 100);
    }
  };

  const updateURLWithSlug = (slug) => {
    if (window && window.history) {
      window.history.replaceState(null, "", `/web-stories/${slug}`);
    }
  };

  const openOverlay = (story) => {
    setSelectedStory(story);
    setCurrentSlide(0);
    setElapsedTime(0);
    setProgress(0);
    setIsPaused(false);
    updateURLWithSlug(story.slug);
  };

  const closeOverlay = () => {
    setSelectedStory(null);
    setCurrentSlide(0);
    setIsPaused(false);
    setElapsedTime(0);
    setProgress(0);
    navigate("/");
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4 overflow-hidden"> {/* overflow-hidden on container prevents horizontal scrollbar on body */}
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
          <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
        <Link
          to="/all-webstories"
          state={{ allWebStories: stories }}
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: "#2E6E9E" }}
        >
          और देखें
        </Link>
      </div>

      {/* 
        Apply custom class 'mobile-scroll-row' to Row 
        and 'mobile-scroll-col' to Col for mobile styling 
      */}
      <Row className="mobile-scroll-row">
        {stories.map((story) => {
          const firstSlide = story.slides?.[0];
          const youTubeVideoId = firstSlide?.isExternalLink && firstSlide?.mediaUrl ? getYouTubeVideoId(firstSlide.mediaUrl) : null;
          const youTubeThumbnailUrl = youTubeVideoId ? getYouTubeThumbnail(youTubeVideoId) : null;

          return (
            <Col
              key={story._id}
              xs={12} sm={6} md={4} lg={3}
              className="mb-3 mobile-scroll-col" // Custom class for mobile
              onClick={() => openOverlay(story)}
              style={{ cursor: "pointer" }}
            >
              <div className="position-relative overflow-hidden rounded shadow-sm" style={{ height: "300px", backgroundColor: "#000" }}>
                {firstSlide ? (
                  firstSlide.isExternalLink && youTubeThumbnailUrl ? (
                    <img
                      src={youTubeThumbnailUrl}
                      alt={story.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", backgroundColor: "#000" }}
                    />
                  ) : firstSlide.mediaType === "video" ? (
                    <video
                      src={firstSlide.mediaUrl}
                      muted
                      className="w-100 h-100"
                      style={{ objectFit: "cover", backgroundColor: "#000" }}
                    />
                  ) : (
                    <img
                      src={firstSlide.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"}
                      alt={story.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover", backgroundColor: "#000" }}
                    />
                  )
                ) : (
                  <img src="https://via.placeholder.com/300x400?text=Web+Story" alt="Placeholder" className="w-100 h-100" style={{ objectFit: "cover", backgroundColor: "#000" }} />
                )}
                <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))" }}>
                  <h6 className="mb-0 fw-bold" style={{ fontSize: "0.95rem", lineHeight: "1.3" }}>{story.title}</h6>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Overlay logic remains the same */}
      {selectedStory && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
          <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "100%" }}> {/* MaxWidth 100% for mobile */}
            {/* Progress Bar */}
            <div className="d-flex position-absolute top-0 start-0 w-100 p-2 gap-1" style={{ zIndex: 2000 }}>
              {selectedStory.slides.map((_, i) => (
                <div key={i} className="flex-grow-1 bg-dark rounded overflow-hidden" style={{ height: "3px" }}>
                  <div className="h-100" style={{
                    backgroundColor: "white",
                    width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%"
                  }} />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="d-flex position-absolute top-0 end-0 p-3 gap-3" style={{ marginTop: "15px", zIndex: 2100 }}>
               {/* Close Button shifted inside controls row for better mobile access */}
              <button onClick={closeOverlay} className="btn p-0 text-white me-2" style={{ fontSize: "1.5rem", lineHeight: 1 }}>✕</button>
              {isPaused ? (
                <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
              ) : (
                <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
              )}
            </div>

            {/* Slide Content */}
            <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center" style={{ overflow: "hidden", backgroundColor: "#000" }} onClick={(e) => {
              const { clientX, currentTarget } = e;
              const { width, left } = currentTarget.getBoundingClientRect();
              const clickX = clientX - left;
              if (clickX < width / 2) prevSlide();
              else nextSlide();
            }}>
              {selectedStory.slides[currentSlide]?.isExternalLink ? (
                (() => {
                  const slideUrl = selectedStory.slides[currentSlide].mediaUrl;
                  const youTubeId = getYouTubeVideoId(slideUrl);
                  if (youTubeId) {
                    return (
                      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <iframe
                          key={currentSlide}
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=${isPaused ? 0 : 1}&mute=0&controls=0&rel=0&playsinline=1&enablejsapi=1`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-white text-center p-3">
                         <img src={selectedStory.slides[currentSlide].mediaUrl} alt="" className="img-fluid" style={{maxHeight: '60vh'}} />
                         <br />
                        <a href={slideUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm mt-3 rounded-pill px-4">Visit Link</a>
                      </div>
                    );
                  }
                })()
              ) : selectedStory.slides[currentSlide]?.mediaType === "video" ? (
                <video
                  key={currentSlide}
                  ref={videoRef}
                  src={selectedStory.slides[currentSlide].mediaUrl}
                  autoPlay={!isPaused}
                  muted={false} // Usually stories are sound-on by default or user toggles
                  className="w-100 h-100"
                  style={{ objectFit: "contain", animation: "zoomOut 3s ease-out" }}
                  onEnded={nextSlide}
                  playsInline // Important for mobile
                />
              ) : (
                <img
                  key={currentSlide}
                  src={selectedStory.slides[currentSlide]?.mediaUrl}
                  alt={selectedStory.title}
                  className="w-100 h-100"
                  style={{ objectFit: "contain", animation: "zoomOut 3s ease-out" }}
                />
              )}
            </div>

            {/* Caption */}
            <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))", paddingBottom: "40px" }}>
              <h5 style={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem", textShadow: "1px 1px 2px black" }}>{selectedStory.title}</h5>
              <p className="small mb-0" style={{opacity: 0.9}}>{selectedStory.slides[currentSlide]?.caption}</p>
            </div>
            
             {/* Mobile tap areas visualisation (Optional: transparent overlays) */}
             <div className="position-absolute top-50 start-0 translate-middle-y d-none d-md-block" style={{ left: "10px", zIndex: 2100 }}>
                <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="btn btn-dark rounded-circle" style={{width: '40px', height: '40px', padding: 0}}>‹</button>
             </div>
             <div className="position-absolute top-50 end-0 translate-middle-y d-none d-md-block" style={{ right: "10px", zIndex: 2100 }}>
                <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="btn btn-dark rounded-circle" style={{width: '40px', height: '40px', padding: 0}}>›</button>
             </div>

          </div>
        </div>
      )}
    </Container>
  );
};

export default WebStorySection;