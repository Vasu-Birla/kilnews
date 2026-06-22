import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Image, Button, Dropdown } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { getVideo } from "../../Services/authApi";
import { useNavigate } from "react-router-dom";

// Re-using the formatFullDateTime from RelatedNews for consistency (हालांकि इस कंपोनेंट में सीधे उपयोग नहीं किया गया)
const formatFullDateTime = (dateString) => {
  if (!dateString) return "समय उपलब्ध नहीं";
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: 'h23',
  };
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return "Invalid Date";
  return dateObj.toLocaleString("hi-IN", options);
};

// ✅ UPDATED VideoCard कॉम्पोनेंट - यह अब डायरेक्ट वीडियो फाइलें भी चला सकता है
const VideoCard = ({ mediaSource, onClick, title }) => {
  // Check if the mediaSource URL is a direct video file (e.g., .mp4, .webm, .ogg, .mov)
  const isDirectVideoFile = mediaSource.match(/\.(mp4|webm|ogg|mov)$/i);

  return (
    <div className="mb-3">
      {/* Card with cropped image/video */}
      <div
        className="position-relative shadow-sm video-card"
        onClick={onClick}
        style={{
          cursor: "pointer",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          backgroundColor: "#000",
          height: "180px", // card height
          borderRadius: "8px", // Consistency: added border radius
        }}
      >
        {isDirectVideoFile ? (
          <video
            src={mediaSource}
            alt={title || "Video"}
            className="w-100 h-100" // Use w-100 h-100 to fill container
            controls={false} // No controls visible in gallery
            autoPlay // Auto-play the video
            muted // Mute the video for auto-play
            loop // Loop the video
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(85%)",
              display: "block",
            }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/320x180?text=Error"; console.error("Video failed to load:", e.target.src); }}
          />
        ) : (
          <Image
            src={mediaSource} // This would be YouTube thumbnail or generic image placeholder
            alt={title || "Video Thumbnail"}
            fluid
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(85%)",
              display: "block",
            }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/320x180?text=Error"; console.error("Video thumbnail failed to load:", e.target.src); }}
          />
        )}
        <FaPlayCircle
          color="#ffffff"
          size={36}
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            opacity: 0.9,
            filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Title below card */}
      <p
        className="mt-2 mb-0 fw-bold text-truncate text-center"
        style={{ color: "red", fontSize: "0.95rem" }}
        title={title} // hover pe full title
      >
        {title}
      </p>
    </div>
  );
};

const EmsRelatedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    getVideo()
      .then((res) => {
        const data = res?.data || [];
        setVideos(data);
      })
      .catch((err) => {
        setError("Failed to load videos");
        console.error(err);
      })
      .finally(() => setIsLoading(false));

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allCategories = ["All", ...new Set(videos.map((v) => v.category_name))];

  const getMaxVisibleCategories = (width) => {
    if (width <= 480) return 2; if (width <= 768) return 3; if (width <= 992) return 4; return allCategories.length;
  };
  const maxVisibleCategories = getMaxVisibleCategories(screenWidth);
  let visibleCategories = allCategories.slice(0, maxVisibleCategories);
  let hiddenCategories = allCategories.slice(maxVisibleCategories);
  const filteredVideos = selectedCategory === "All" ? videos : videos.filter((v) => v.category_name === selectedCategory);

  // ✅ UPDATED getThumbnailOrVideoUrl function - यह डायरेक्ट वीडियो URL भी लौटाता है
  const getThumbnailOrVideoUrl = (url) => {
    if (!url) return "https://via.placeholder.com/320x180?text=No+Video";
    let videoId = "";
    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop().split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      videoId = new URL(url).searchParams.get("v");
    }

    // If it's a YouTube video, return the thumbnail URL
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    // If it's not a YouTube video (assume direct video URL), return the URL itself.
    return url;
  };

  // ✅ handleShare फंक्शन को ज्यों का त्यों रखा गया है, इसमें कोई वीडियो-विशिष्ट बदलाव की आवश्यकता नहीं है
  const handleShare = async (title, videoId) => {
    const fullShareUrl = `${window.location.origin}/video/${videoId}`;
    if (navigator.share) {
      try { await navigator.share({ title, text: `Check out this video: ${title}`, url: fullShareUrl }); }
      catch (error) { console.error('Error sharing:', error); }
    } else {
      alert(`Please copy this link to share: ${fullShareUrl}`);
    }
  };


  if (isLoading) return <div className="text-center my-4"><Spinner animation="border" size="sm" /></div>;
  if (error) return <div className="text-center text-danger my-4">{error}</div>;

  return (
    <Container className="mt-4">
      <div className="d-flex align-items-center mb-3 flex-wrap">
        {/* <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "7px", height: "35px", backgroundColor: "#C00000" }} className="me-2"></div>
          <h2 className="fw-bold m-0">EMS TV</h2>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" /> */}
      </div>

      {/* <div className="d-flex flex-wrap gap-2 mb-3">
        {visibleCategories.map((cat) => (
          <Button key={cat} variant={selectedCategory === cat ? "danger" : "outline-danger"} size="sm" onClick={() => setSelectedCategory(cat)}>
            {cat}
          </Button>
        ))}
        {hiddenCategories.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle variant={hiddenCategories.includes(selectedCategory) ? "danger" : "outline-danger"} size="sm">More</Dropdown.Toggle>
            <Dropdown.Menu className="rounded shadow-sm border-0 py-1">
              {hiddenCategories.map((cat) => (
                <Dropdown.Item key={cat} onClick={() => setSelectedCategory(cat)} className={selectedCategory === cat ? "active bg-danger text-white fw-bold" : "fw-bold"}>
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div> */}

      <Row className="g-3">
        {filteredVideos.map((video) => (
          <Col key={video._id} xs={12} sm={6} md={4} lg={3}>
            <VideoCard
              mediaSource={getThumbnailOrVideoUrl(video.videoUrl)} // mediaSource प्रोप पास करें
              title={video.title}
              onClick={() => {
                navigate(`/video/${video._id}`
                //   , { // Assuming _id is sufficient for video detail page
                //   // state: { videos, currentVideo: video },
                // }
              );
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            {/* लाइक, कमेंट, शेयर बटन को ज्यों का त्यों रखा गया है, वीडियो कार्यक्षमता से सीधे संबंधित नहीं है */}
            {/* यह भाग आपके पिछले कोड से हटा दिया गया था, लेकिन चूंकि आपने 'पूरा कोड' कहा है, मैं इस बात पर जोर दे रहा हूं कि इसमें कोई बदलाव नहीं किया गया है */}
            {/* <div className="d-flex justify-content-between w-100 mt-2">
              <Button variant="link" className="text-dark px-2 py-1 text-decoration-none" title="Likes" onClick={() => handleLike(video._id)}>
                <FaThumbsUp size={18} className="me-1" style={{ color: likedVideos.has(video._id) ? 'red' : 'inherit' }} />
                {video.likes?.length || 0}
              </Button>
              <Button variant="link" className="text-dark px-2 py-1 text-decoration-none" title="Comments" onClick={() => openCommentModal(video)}>
                <FaCommentDots size={18} className="me-1" /> {video.comments?.length || 0}
              </Button>
              <Button variant="link" className="text-dark px-2 py-1 text-decoration-none" title="Share" onClick={() => handleShare(video.title, video._id)}>
                <FaShareAlt size={18} className="me-1 text-primary" /> Share
              </Button>
            </div> */}
          </Col>
        ))}
      </Row>

      {/* टिप्पणी Modal को ज्यों का त्यों रखा गया है, वीडियो कार्यक्षमता से सीधे संबंधित नहीं है */}
      {/* <Modal show={showCommentModal} onHide={closeCommentModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {currentVideoForComment?.comments?.length > 0 ? (
              currentVideoForComment.comments.map(comment => (
                <div key={comment._id} className="mb-3 d-flex align-items-start">
                    <div>
                        <p className="mb-0"><strong>{comment.user?.username || 'User'}</strong></p>
                        <p className="mb-0 text-muted">{comment.text}</p>
                    </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center my-4">No comments yet.</p>
            )}
          </div>
        </Modal.Body>
        <div className="p-2 border-top">
            {commentError && <Alert variant="danger" size="sm" className="mx-2">{commentError}</Alert>}
            <Form onSubmit={handleCommentSubmit}>
                <InputGroup>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        required
                        className="border-0"
                        style={{ resize: 'none' }}
                    />
                    <Button variant="link" type="submit" disabled={isSubmittingComment} className="p-2">
                        {isSubmittingComment
                            ? <Spinner animation="border" size="sm" />
                            : <IoSend size={24} color="#007bff" />
                        }
                    </Button>
                </InputGroup>
            </Form>
        </div>
      </Modal> */}

    </Container>
  );
};

export default EmsRelatedVideos;