
// // import React, { useState, useEffect, useRef } from "react";
// // import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// // import { getWebStroy } from "../Services/authApi";
// // import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
// // import { useLocation } from "react-router-dom";

// // const AllWebStoriesPage = () => {
// //   const location = useLocation();
// //   const stateStories = location.state?.allWebStories;

// //   const [stories, setStories] = useState(stateStories || []);
// //   const [loading, setLoading] = useState(!stateStories); // agar state me stories nahi hai to loading true
// //   const [error, setError] = useState(null);

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

// //   // Agar state me stories nahi hai to fetch kar lo
// //   useEffect(() => {
// //     if (!stateStories) {
// //       const fetchStories = async () => {
// //         try {
// //           const response = await getWebStroy();
// //           if (response.success && response.data) {
// //             setStories(response.data);
// //           } else {
// //             setError("Failed to load stories.");
// //           }
// //         } catch (err) {
// //           setError(err.message || "Error fetching stories.");
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
// //       fetchStories();
// //     }
// //   }, [stateStories]);

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
// //       dur = (videoRef.current?.duration || 5) * 1000;
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

// //   const openOverlay = (story) => {
// //     setSelectedStory(story);
// //     setCurrentSlide(0);
// //     setIsPaused(false);
// //   };

// //   const closeOverlay = () => {
// //     setSelectedStory(null);
// //     setCurrentSlide(0);
// //     setIsPaused(false);
// //   };

// //   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
// //   if (error) return <Alert variant="danger">{error}</Alert>;
// //   if (!stories.length) return <Alert variant="info" className="mt-4">No stories found.</Alert>;

// //   return (
// //     <Container className="mt-4">
// //       <div className="d-flex align-items-center mb-3 flex-wrap">
// //     <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
// //       <div
// //         style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }}
// //         className="me-2"
// //       />
// //       <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
// //     </div>
// //   </div>

// //       <Row>
// //         {stories.map(story => {
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

// // export default AllWebStoriesPage;






// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { getWebStroy } from "../Services/authApi";
// import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";

// const AllWebStoriesPage = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [selectedStory, setSelectedStory] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [duration, setDuration] = useState(5000);
//   const [isPaused, setIsPaused] = useState(false);

//   const videoRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const progressRef = useRef(null);
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

//   // ✅ हमेशा backend से fetch करो
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await getWebStroy();
//         if (response.success && response.data) {
//           setStories(response.data); // सारे stories load होंगे
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

//   // Video play/pause
//   useEffect(() => {
//     if (videoRef.current) {
//       if (isPaused) videoRef.current.pause();
//       else videoRef.current.play().catch(() => {});
//     }
//   }, [isPaused, currentSlide]);

//   // Progress Control
//   useEffect(() => {
//     if (!selectedStory || isPaused) return;

//     const slide = selectedStory.slides[currentSlide];
//     if (!slide) return;

//     let dur = 5000;
//     if (slide.mediaType === "video") {
//       dur = (videoRef.current?.duration || 5) * 1000;
//     }
//     setDuration(dur);

//     let start = Date.now() - elapsedTime;
//     setProgress((elapsedTime / dur) * 100);

//     const tick = () => {
//       const elapsed = Date.now() - start;
//       if (elapsed >= dur) {
//         setProgress(100);
//         setElapsedTime(0);
//         nextSlide();
//         return;
//       }
//       setProgress((elapsed / dur) * 100);
//       progressRef.current = requestAnimationFrame(tick);
//     };

//     progressRef.current = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(progressRef.current);
//   }, [selectedStory, currentSlide, isPaused]);

//   useEffect(() => {
//     if (isPaused) setElapsedTime((progress / 100) * duration);
//   }, [isPaused]);

//   // Page open होते ही top पर scroll करने के लिए
// useEffect(() => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }, []);


//   const nextSlide = () => {
//     if (!selectedStory) return;
//     if (currentSlide < selectedStory.slides.length - 1) setCurrentSlide(prev => prev + 1);
//     else closeOverlay();
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
//   };

//   const openOverlay = (story) => {
//     setSelectedStory(story);
//     setCurrentSlide(0);
//     setIsPaused(false);
//   };

//   const closeOverlay = () => {
//     setSelectedStory(null);
//     setCurrentSlide(0);
//     setIsPaused(false);
//   };

//   if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (!stories.length) return <Alert variant="info" className="mt-4">No stories found.</Alert>;

//   return (
//     <Container className="mt-4">
//       {/* Heading with Red Line */}
//      <div className="d-flex align-items-center mb-3 flex-wrap">
//   <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//     <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
//     <h4 className="fw-bold m-0">वेब स्टोरीज</h4>
//   </div>

//   {/* यह line heading के right तक जाएगी */}
//   <div
//     style={{
//       flexGrow: 1,
//       height: "3px",          // line की thickness
//       backgroundColor: "#C00000",
//       marginLeft: "10px",     // heading से gap
//       alignSelf: "center"
//     }}
//   />
// </div>

//       {/* ✅ अब backend से आने वाली सारी stories render होंगी */}
//       <Row>
//         {stories.map(story => {
//           const firstSlide = story.slides?.[0];
//           return (
//             <Col
//               key={story._id}
//               xs={12} sm={6} md={4} lg={3}
//               className="mb-3"
//               onClick={() => openOverlay(story)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
//                 {firstSlide?.mediaType === "video" ? (
//                   <video src={firstSlide.mediaUrl} muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
//                 ) : (
//                   <img src={firstSlide?.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"} alt={story.title} className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
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

//             {/* Slide Navigation */}
//             <div className="w-100 h-100 position-relative" style={{ overflow: "hidden" }} onClick={(e) => {
//               const { clientX, currentTarget } = e;
//               const { width, left } = currentTarget.getBoundingClientRect();
//               const clickX = clientX - left;
//               if (clickX < width / 2) prevSlide();
//               else nextSlide();
//             }}>
//               {selectedStory.slides[currentSlide]?.mediaType === "video" ? (
//                 <video key={currentSlide} ref={videoRef} src={selectedStory.slides[currentSlide].mediaUrl} autoPlay muted className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
//               ) : (
//                 <img key={currentSlide} src={selectedStory.slides[currentSlide]?.mediaUrl} alt="" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }} />
//               )}
//             </div>

//             {/* Caption */}
//             <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
//               <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
//               <p className="small">{selectedStory.slides[currentSlide]?.caption}</p>
//             </div>

//             {/* Prev / Next */}
//             <button onClick={prevSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
//             <button onClick={nextSlide} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, right: "-60px" }}>›</button>

//             {/* Close */}
//             <button onClick={closeOverlay} className="btn btn-dark position-absolute top-0 start-0 m-2">✕</button>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default AllWebStoriesPage;



/// upate by yash


import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { getWebStroy } from "../Services/authApi";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
import { Link } from "react-router-dom"; // Link for navigation, removed useNavigate as not needed for homepage redirect

// Helper to extract YouTube video ID from various YouTube URLs
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  // Updated regex to include YouTube Shorts pattern '/shorts/'
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  // Check for the length of the matched ID (YouTube IDs are 11 characters)
  return (match && match[2] && match[2].length === 11) ? match[2] : null;
};

// Helper to get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return null;
  // Using 'mqdefault' for medium quality thumbnail, 'hqdefault' for high quality
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const AllWebStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(7000); // Default duration for images/external non-video
  const [isPaused, setIsPaused] = useState(false);

  const videoRef = useRef(null); // Ref for native <video> elements
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Inject Keyframes for animations
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
    `;
    document.head.appendChild(style);
  }, []);

  // Fetch all stories from the backend
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page load
    const fetchStories = async () => {
      try {
        const response = await getWebStroy();
        if (response.success && response.data) {
          setStories(response.data); // Load all stories
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

  // Video play/pause (for native <video> elements)
  useEffect(() => {
    // Only apply to native video elements when a story is selected
    if (selectedStory && selectedStory.slides[currentSlide]?.mediaType === "video" && videoRef.current) {
      if (isPaused) videoRef.current.pause();
      else videoRef.current.play().catch(() => {});
    }
    // For iframes, we control autoplay via src URL parameter, no ref needed
  }, [isPaused, currentSlide, selectedStory]); // Added selectedStory as dependency

  // Progress Control for slides (images, native videos, external links)
  useEffect(() => {
    if (!selectedStory || isPaused) {
        cancelAnimationFrame(progressRef.current); // Stop animation on pause or no story
        return;
    }

    const slide = selectedStory.slides[currentSlide];
    if (!slide) {
        cancelAnimationFrame(progressRef.current);
        return;
    }

    let calculatedDuration = 7000; // Default duration for most slides (images, external)
    if (slide.mediaType === "video" && !slide.isExternalLink && videoRef.current) {
      // For native video, use its actual duration
      calculatedDuration = videoRef.current.duration * 1000;
    } else if (slide.isExternalLink) {
        // For external links (like YouTube), use a fixed duration
        calculatedDuration = 7000; // E.g., 7 seconds per external link slide
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
  }, [selectedStory, currentSlide, isPaused, elapsedTime]); // Added elapsedTime to dependencies for accurate restart

  useEffect(() => {
    if (isPaused) setElapsedTime((progress / 100) * duration);
  }, [isPaused, progress, duration]);


  const nextSlide = () => {
    if (!selectedStory) return;
    setIsPaused(true); // Pause briefly before transitioning
    setElapsedTime(0); // Reset elapsed time for the new slide
    setProgress(0); // Reset progress for the new slide
    if (currentSlide < selectedStory.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      closeOverlay();
    }
    setTimeout(() => setIsPaused(false), 100); // Resume after a short delay
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsPaused(true); // Pause briefly before transitioning
      setElapsedTime(0); // Reset elapsed time for the new slide
      setProgress(0); // Reset progress for the new slide
      setCurrentSlide(prev => prev - 1);
      setTimeout(() => setIsPaused(false), 100); // Resume after a short delay
    }
  };

  const openOverlay = (story) => {
    setSelectedStory(story);
    setCurrentSlide(0);
    setElapsedTime(0); // Ensure elapsed time is reset when opening a new story
    setProgress(0); // Reset progress bar
    setIsPaused(false);
  };

  const closeOverlay = () => {
    setSelectedStory(null);
    setCurrentSlide(0);
    setIsPaused(false);
    setElapsedTime(0);
    setProgress(0);
    // You could redirect to homepage or just close the overlay without navigation
    // navigate("/"); // If you want to navigate back to homepage
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!stories.length) return <Alert variant="info" className="mt-4">No stories found.</Alert>;

  return (
    <Container className="mt-4">
      {/* Heading with Red Line */}
     <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
          <h4 className="fw-bold m-0">सभी वेब स्टोरीज</h4>
        </div>

        {/* This line will extend to the right of the heading */}
        <div
          style={{
            flexGrow: 1,
            height: "3px",          // Line thickness
            backgroundColor: "#C00000",
            marginLeft: "10px",     // Gap from heading
            alignSelf: "center"
          }}
        />
      </div>

      {/* Render all stories from the backend */}
      <Row>
        {stories.map(story => {
          const firstSlide = story.slides?.[0];
          const youTubeVideoId = firstSlide?.isExternalLink && firstSlide?.mediaUrl ? getYouTubeVideoId(firstSlide.mediaUrl) : null;
          const youTubeThumbnailUrl = youTubeVideoId ? getYouTubeThumbnail(youTubeVideoId) : null;

          return (
            <Col
              key={story._id}
              xs={12} sm={6} md={4} lg={3}
              className="mb-3"
              onClick={() => openOverlay(story)}
              style={{ cursor: "pointer" }}
            >
              <div className="position-relative overflow-hidden rounded" style={{ height: "300px", backgroundColor: "#000" }}>
                {firstSlide ? (
                  firstSlide.isExternalLink && youTubeThumbnailUrl ? (
                    <img
                      src={youTubeThumbnailUrl}
                      alt={story.title}
                      className="w-100 h-100"
                      style={{ objectFit: "contain", backgroundColor: "#000" }}
                    />
                  ) : firstSlide.mediaType === "video" && !firstSlide.isExternalLink ? ( // Ensure it's a native video
                    <video
                      src={firstSlide.mediaUrl}
                      muted
                      className="w-100 h-100"
                      style={{ objectFit: "contain", backgroundColor: "#000" }}
                    />
                  ) : ( // Default to image for local images or placeholder for other external links
                    <img
                      src={firstSlide.mediaUrl || "https://via.placeholder.com/300x400?text=Web+Story"}
                      alt={story.title}
                      className="w-100 h-100"
                      style={{ objectFit: "contain", backgroundColor: "#000" }}
                    />
                  )
                ) : (
                  <img src="https://via.placeholder.com/300x400?text=Web+Story" alt="Placeholder" className="w-100 h-100" style={{ objectFit: "contain", backgroundColor: "#000" }} />
                )}
                <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))" }}>
                  <h6 className="mb-0">{story.title}</h6>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {selectedStory && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
          <div className="position-relative" style={{ height: "100vh", width: "500px", maxWidth: "95%" }}>
            {/* Progress Bar */}
            <div className="d-flex position-absolute top-0 start-0 w-100 p-2 gap-1" style={{ zIndex: 2000 }}>
              {selectedStory.slides.map((_, i) => (
                <div key={i} className="flex-grow-1 bg-dark rounded overflow-hidden" style={{ height: "5px" }}>
                  <div className="h-100" style={{
                    backgroundColor: "red",
                    width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%"
                  }} />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="d-flex position-absolute top-0 end-0 p-2 gap-3" style={{ marginTop: "10px", zIndex: 2100 }}>
              {isPaused ? (
                <HiOutlinePlay onClick={() => setIsPaused(false)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
              ) : (
                <HiOutlinePause onClick={() => setIsPaused(true)} style={{ cursor: "pointer", fontSize: "1.6rem", color: "white" }} />
              )}
            </div>

            {/* Slide Content (Image, Native Video, or YouTube Iframe) */}
            <div className="w-100 h-100 position-relative d-flex align-items-center justify-content-center" style={{ overflow: "hidden" }} onClick={(e) => {
              const { clientX, currentTarget } = e;
              const { width, left } = currentTarget.getBoundingClientRect();
              const clickX = clientX - left;
              if (clickX < width / 2) prevSlide();
              else nextSlide();
            }}>
              {selectedStory.slides[currentSlide]?.isExternalLink ? (
                // External Link (e.g., YouTube)
                (() => {
                  const slideUrl = selectedStory.slides[currentSlide].mediaUrl;
                  const youTubeId = getYouTubeVideoId(slideUrl);
                  if (youTubeId) {
                    return (
                      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <iframe
                          key={currentSlide} // Key change ensures iframe re-renders
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=${isPaused ? 0 : 1}&mute=1`} // Autoplay only when not paused
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          style={{ objectFit: "contain", backgroundColor: "#000" }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-white text-center p-3">
                        <p>Cannot display external link directly: <a href={slideUrl} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline">{slideUrl}</a></p>
                      </div>
                    );
                  }
                })()
              ) : selectedStory.slides[currentSlide]?.mediaType === "video" ? (
                // Native Video
                <video
                  key={currentSlide}
                  ref={videoRef}
                  src={selectedStory.slides[currentSlide].mediaUrl}
                  autoPlay={!isPaused} // Control autoplay with isPaused
                  muted
                  className="w-100 h-100"
                  style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }}
                  onEnded={nextSlide} // Go to next slide when native video ends
                />
              ) : (
                // Image
                <img
                  key={currentSlide}
                  src={selectedStory.slides[currentSlide]?.mediaUrl}
                  alt={selectedStory.title}
                  className="w-100 h-100"
                  style={{ objectFit: "contain", backgroundColor: "#000", animation: "zoomOut 3s ease-out" }}
                />
              )}
            </div>

            {/* Caption */}
            <div key={currentSlide} className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))", animation: "slideInRight 0.6s ease-out" }}>
              <h5 style={{ color: "#ff4d4d", fontWeight: "bold" }}>{selectedStory.title}</h5>
              <p className="small">{selectedStory.slides[currentSlide]?.caption}</p>
            </div>

            {/* Prev / Next Buttons for user click */}
            <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, left: "-60px" }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="btn btn-dark position-absolute top-50 translate-middle-y" style={{ zIndex: 2100, right: "-60px" }}>›</button>

            {/* Close Button */}
            <button onClick={closeOverlay} className="btn btn-dark position-absolute top-0 start-0 m-2" style={{ zIndex: 2100 }}>✕</button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AllWebStoriesPage;