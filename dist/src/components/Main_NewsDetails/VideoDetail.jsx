// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Row, Col, Image, Button, Modal, Form, Spinner, Alert, InputGroup, Container } from "react-bootstrap";
// import { FaThumbsUp, FaCommentDots, FaShareAlt, FaLock } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import { likeVideo, addCommentToVideo, getVideoById } from "../../Services/authApi";

// const VideoDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // States
//   const [currentVideo, setCurrentVideo] = useState(location.state?.currentVideo || null);
//   const [videos, setVideos] = useState(location.state?.videos || []);
//   const [loading, setLoading] = useState(!currentVideo); // अगर वीडियो पहले से नहीं है तो लोडिंग दिखाओ
//   const [isLiked, setIsLiked] = useState(false);
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);
//   const [commentError, setCommentError] = useState("");

//   const checkIsLoggedIn = () => {
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));
//     return !!(token && user && user.id);
//   };

//   useEffect(() => {
//     if (!id) return;

//     const fetchVideo = async () => {
//       try {
//         setLoading(true);
//         const res = await getVideoById(id);
//         const videoData = res.data.data || res.data;
//         setCurrentVideo(videoData);

//         // Check if liked
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (user && videoData.likes?.includes(user._id)) {
//           setIsLiked(true);
//         } else {
//           setIsLiked(false);
//         }

//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } catch (err) {
//         console.error("Error loading video:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideo();
//   }, [id]);

//   const handleLike = async () => {
//     if (!checkIsLoggedIn()) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (!currentVideo) return;

//     try {
//       const response = await likeVideo(currentVideo._id);
//       setCurrentVideo(prev => ({ ...prev, likes: response.likes }));
//       setIsLiked(!isLiked);
//     } catch (err) {
//       alert("लाइक करने में समस्या आई।");
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!checkIsLoggedIn()) {
//       setShowLoginModal(true);
//       return;
//     }
//     if (!commentText.trim() || !currentVideo) return;

//     setIsSubmittingComment(true);
//     setCommentError("");
//     try {
//       const response = await addCommentToVideo(currentVideo._id, { text: commentText });
//       setCurrentVideo(prev => ({ ...prev, comments: response.comments }));
//       setCommentText("");
//     } catch (err) {
//       setCommentError("कमेंट जोड़ने में समस्या आई।");
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   const handleShare = async () => {
//     if (!currentVideo) return;
//     const fullShareUrl = `${window.location.origin}/video/${currentVideo.slug_en || currentVideo._id}`;
//     if (navigator.share) {
//       try {
//         await navigator.share({ title: currentVideo.title, url: fullShareUrl });
//       } catch (error) { console.error('Error sharing:', error); }
//     } else {
//       alert(`Link: ${fullShareUrl}`);
//     }
//   };

//   // YouTube ID Extraction Helper
//   const getYoutubeId = (url) => {
//     if (!url) return null;
//     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return (match && match[2].length === 11) ? match[2] : null;
//   };

//   const getPlaybackSource = (url) => {
//     const videoId = getYoutubeId(url);
//     if (videoId) {
//       return { type: "youtube", url: `https://www.youtube.com/embed/${videoId}?autoplay=1` };
//     }
//     return { type: "direct", url: url || "https://via.placeholder.com/800x450?text=No+Video" };
//   };

//   const getThumbnail = (url) => {
//     const videoId = getYoutubeId(url);
//     if (videoId) {
//       return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//     }
//     return url; // For direct files, video tag handles it
//   };

//   if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>;
//   if (!currentVideo) return <div className="text-center my-5"><h2>Video not found</h2></div>;

//   const mainMediaSource = getPlaybackSource(currentVideo.videoUrl);

//   return (
//     <Container className="my-4">
//       <div className="mb-3">
//         <h2 className="mb-3 fw-bold text-danger">{currentVideo.title}</h2>
//         <div className="video-responsive mb-3 rounded overflow-hidden" style={{ background: '#000', minHeight: '300px' }}>
//           {mainMediaSource.type === 'youtube' ? (
//             <iframe
//               width="100%"
//               height="500"
//               src={mainMediaSource.url}
//               title={currentVideo.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           ) : (
//             <video
//               width="100%"
//               height="500"
//               src={mainMediaSource.url}
//               controls
//               autoPlay
//               muted
//               style={{ objectFit: 'contain' }}
//             />
//           )}
//         </div>

//         <div className="d-flex justify-content-start align-items-center gap-4 py-2 border-bottom">
//           <Button variant="link" className="text-dark p-0 text-decoration-none d-flex align-items-center" onClick={handleLike}>
//             <FaThumbsUp size={20} style={{ color: isLiked ? 'red' : 'inherit' }} />
//             <span className="fw-bold ms-2">{currentVideo.likes?.length || 0}</span>
//           </Button>
          
//           <Button variant="link" className="text-dark p-0 text-decoration-none d-flex align-items-center" onClick={() => setShowCommentModal(true)}>
//             <span className="fw-bold me-2">Comments {currentVideo.comments?.length || 0}</span>
//             <FaCommentDots size={20} />
//           </Button>
          
//           <Button variant="link" className="text-dark p-0 text-decoration-none d-flex align-items-center" onClick={handleShare}>
//             <span className="fw-bold me-2">Share</span>
//             <FaShareAlt size={18} style={{ color: '#007bff' }} />
//           </Button>
//         </div>
//       </div>

//       {/* Other Videos */}
//       <h4 className="mt-5 mb-3">Other Videos</h4>
//       <Row>
//         {videos.filter((v) => v._id !== currentVideo._id).slice(0, 6).map((video) => {
//             const thumb = getThumbnail(video.videoUrl);
//             const isDirect = !getYoutubeId(video.videoUrl);

//             return (
//               <Col key={video._id} xs={12} sm={6} md={4} className="mb-3">
//                 <div onClick={() => navigate(`/video/${video.slug_en || video._id}`, { state: { videos } })} style={{ cursor: "pointer" }}>
//                   <div className="rounded overflow-hidden" style={{ width: "100%", height: "180px", backgroundColor: "#000" }}>
//                     {isDirect ? (
//                       <video src={thumb} className="w-100 h-100" style={{ objectFit: "cover" }} />
//                     ) : (
//                       <Image src={thumb} className="w-100 h-100" style={{ objectFit: "cover" }} />
//                     )}
//                   </div>
//                   <p className="mt-2 mb-0 fw-bold text-truncate" style={{ color: "red" }}>{video.title}</p>
//                 </div>
//               </Col>
//             );
//         })}
//       </Row>

//       {/* Login Modal */}
//       <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered size="sm">
//         <Modal.Body className="text-center p-4">
//           <FaLock size={40} className="text-danger mb-3" />
//           <h5 className="fw-bold">लॉगिन ज़रूरी है</h5>
//           <p className="text-muted small">लाइक या कमेंट करने के लिए कृपया लॉगिन करें।</p>
//           <div className="d-grid gap-2 mt-4">
//             <Button variant="danger" onClick={() => navigate('/login')}>Login करने जाएँ</Button>
//             <Button variant="light" onClick={() => setShowLoginModal(false)}>अभी नहीं</Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* Comment Modal */}
//       <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered>
//         <Modal.Header closeButton><Modal.Title>Comments</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//             {currentVideo.comments?.length > 0 ? (
//               currentVideo.comments.map((comment, index) => (
//                 <div key={index} className="mb-3 border-bottom pb-2">
//                   <p className="mb-0"><strong>{comment.user?.username || 'User'}</strong></p>
//                   <p className="mb-0 text-muted">{comment.text}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-muted text-center my-4">No comments yet.</p>
//             )}
//           </div>
//         </Modal.Body>
//         <div className="p-2 border-top">
//           {commentError && <Alert variant="danger" className="py-1 small">{commentError}</Alert>}
//           <Form onSubmit={handleCommentSubmit}>
//             <InputGroup>
//               <Form.Control
//                 placeholder="Add a comment..."
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//               />
//               <Button variant="primary" type="submit" disabled={isSubmittingComment}>
//                 {isSubmittingComment ? <Spinner size="sm" /> : <IoSend />}
//               </Button>
//             </InputGroup>
//           </Form>
//         </div>
//       </Modal>
//     </Container>
//   );
// };

// export default VideoDetail;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  InputGroup,
  Container
} from "react-bootstrap";
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaLock } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { likeVideo, addCommentToVideo, getVideoById } from "../../Services/authApi";

import EmsRelatedVideos from "./EmsRelatedVideos";

const VideoDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] = useState(location.state?.currentVideo || null);
  const [videos] = useState(location.state?.videos || []);
  const [loading, setLoading] = useState(!currentVideo);
  const [isLiked, setIsLiked] = useState(false);
 const [likeCount, setLikeCount] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  // ================= LOGIN CHECK =================
  const checkIsLoggedIn = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    return !!(token && user && user.id);
  };

  // ================= FETCH VIDEO =================
  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        const res = await getVideoById(id);
        const videoData = res.data.data || res.data;

        setCurrentVideo(videoData);

        // 🔥 Like state check (IMPORTANT FIX)
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setIsLiked(videoData.likes?.includes(user.id));
        } else {
          setIsLiked(false);
        }
        // 👇 ADD THIS LINE
setLikeCount(
  (videoData.likes?.length || 0) + (videoData.guestLikes?.length || 0)
);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Error loading video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // ================= LIKE HANDLER =================
  // const handleLike = async () => {
  //   if (!checkIsLoggedIn()) {
  //     setShowLoginModal(true);
  //     return;
  //   }

  //   try {
  //     const response = await likeVideo(currentVideo._id);

  //     const updatedLikes = response.likes || [];

  //     setCurrentVideo((prev) => ({
  //       ...prev,
  //       likes: updatedLikes,
  //     }));

  //     const user = JSON.parse(localStorage.getItem("user"));
  //     setIsLiked(updatedLikes.includes(user?.id));

  //   } catch (err) {
  //     alert("लाइक करने में समस्या आई।");
  //   }
  // };

  const handleLike = async () => {
  if (!checkIsLoggedIn()) {
    setShowLoginModal(true);
    return;
  }

  try {
    const response = await likeVideo(currentVideo._id);

    // 🔥 backend se aa raha hai
    setIsLiked(response.isLiked);
    setLikeCount(response.totalLikes);

  } catch (err) {
    alert("लाइक करने में समस्या आई।");
  }
};

  // ================= COMMENT HANDLER =================
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!checkIsLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    if (!commentText.trim()) return;

    try {
      setIsSubmittingComment(true);
      setCommentError("");

      const response = await addCommentToVideo(currentVideo._id, {
        text: commentText,
      });

      setCurrentVideo((prev) => ({
        ...prev,
        comments: response.comments,
      }));

      setCommentText("");

    } catch (err) {
      setCommentError("कमेंट जोड़ने में समस्या आई।");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // ================= SHARE =================
  const handleShare = async () => {
    const fullShareUrl = `${window.location.origin}/video/${currentVideo.slug || currentVideo._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: currentVideo.title,
          url: fullShareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert(`Link: ${fullShareUrl}`);
    }
  };

  // ================= YOUTUBE HELPER =================
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getPlaybackSource = (url) => {
    const videoId = getYoutubeId(url);
    if (videoId) {
      return {
        type: "youtube",
        url: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
      };
    }
    return { type: "direct", url };
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="danger" />
      </div>
    );

  if (!currentVideo)
    return (
      <div className="text-center my-5">
        <h2>Video not found</h2>
      </div>
    );

  const mainMediaSource = getPlaybackSource(currentVideo.videoUrl);

  return (
    <Container className="my-4">
      <h2 className="mb-3 fw-bold text-danger">{currentVideo.title}</h2>

      <div
        className="video-responsive mb-3 rounded overflow-hidden"
        style={{ background: "#000", minHeight: "300px" }}
      >
        {mainMediaSource.type === "youtube" ? (
          <iframe
            width="100%"
            height="500"
            src={mainMediaSource.url}
            title={currentVideo.title}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <video
            width="100%"
            height="500"
            src={mainMediaSource.url}
            controls
            autoPlay
            muted
            style={{ objectFit: "contain" }}
          />
        )}
      </div>

      {/* ACTION BAR */}
      <div className="d-flex align-items-center gap-4 py-2 border-bottom">
        <Button
          variant="link"
          className="text-dark p-0 text-decoration-none d-flex align-items-center"
          onClick={handleLike}
        >
          <FaThumbsUp size={20} style={{ color: isLiked ? "red" : "inherit" }} />
          <span className="fw-bold ms-2">
         {likeCount}
          </span>
        </Button>

        <Button
          variant="link"
          className="text-dark p-0 text-decoration-none d-flex align-items-center"
          onClick={() => setShowCommentModal(true)}
        >
          <span className="fw-bold me-2">
            Comments {currentVideo.comments?.length || 0}
          </span>
          <FaCommentDots size={20} />
        </Button>

        <Button
          variant="link"
          className="text-dark p-0 text-decoration-none d-flex align-items-center"
          onClick={handleShare}
        >
          <span className="fw-bold me-2">Share</span>
          <FaShareAlt size={18} />
        </Button>
      </div>

      {/* LOGIN MODAL */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered size="sm">
        <Modal.Body className="text-center p-4">
          <FaLock size={40} className="text-danger mb-3" />
          <h5 className="fw-bold">लॉगिन ज़रूरी है</h5>
          <p className="text-muted small">
            लाइक या कमेंट करने के लिए कृपया लॉगिन करें।
          </p>
          <div className="d-grid gap-2 mt-4">
            <Button variant="danger" onClick={() => navigate("/login")}>
              Login करने जाएँ
            </Button>
            <Button variant="light" onClick={() => setShowLoginModal(false)}>
              अभी नहीं
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* COMMENT MODAL */}
<Modal
  show={showCommentModal}
  onHide={() => setShowCommentModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Comments</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {/* Existing Comments */}
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {currentVideo.comments?.length > 0 ? (
        currentVideo.comments.map((comment, index) => (
          <div key={index} className="mb-3 border-bottom pb-2">
            <strong>{comment.user?.name || "User"}</strong>
            <p className="mb-1">{comment.text}</p>
          </div>
        ))
      ) : (
        <p className="text-muted">No comments yet</p>
      )}
    </div>

    {/* Add Comment Form */}
    <Form onSubmit={handleCommentSubmit} className="mt-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          type="submit"
          variant="danger"
          disabled={isSubmittingComment}
        >
          {isSubmittingComment ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <IoSend />
          )}
        </Button>
      </InputGroup>
      {commentError && (
        <Alert variant="danger" className="mt-2">
          {commentError}
        </Alert>
      )}
    </Form>
  </Modal.Body>
</Modal>
     <EmsRelatedVideos currentVideoId={id}></EmsRelatedVideos>
    </Container>
  );
};

export default VideoDetail;