
import React, { useEffect, useState } from "react";
import { Card, Container, Spinner, Alert } from "react-bootstrap";
import { BsFillCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { newsshorts } from "../../Services/authApi";
import { useNavigate, Link } from "react-router-dom";

const NewsShortsSection = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShorts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await newsshorts();
        if (response?.data) {
          setShorts(response.data);
        } else {
          setShorts([]);
          setError("Failed to load news shorts.");
        }
      } catch (error) {
        console.error("Error fetching shorts:", error);
        setShorts([]);
        setError(error.message || "Error fetching news shorts.");
      } finally {
        setLoading(false);
      }
    };
    fetchShorts();
  }, []);

  const handleReelClick = (slug) => {
    navigate(`/shorts/${slug}`);
  };

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading News Shorts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        Error loading shorts: {error}
      </Alert>
    );
  }

  if (shorts.length === 0) {
    return null; // Hide section if no shorts
  }

  // --- Styling Constants (can be moved to a CSS file or theme) ---
  const accentColor = "#A12D2A";
  const linkColor = "#2E6E9E";
  // ----------------------------------------------------------------

  return (
    <Container fluid className="mt-4">
      {/* Section Header */}
      <div className="d-flex align-items-center mb-2 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: accentColor }} className="me-2"></div>
          <h5 className="fw-bold m-0">शॉर्ट वीडियोज</h5>
        </div>
        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
        <Link
          to="/shorts"
          className="fw-bold text-decoration-none flex-shrink-0"
          style={{ color: linkColor }}
        >
          और देखें
        </Link>
      </div>

      {/* Scrollable Shorts */}
      <div
        className="d-flex flex-nowrap overflow-auto"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        <style>
          {`
            .d-flex.flex-nowrap.overflow-auto::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {shorts.slice(0, 5).map((short) => (
          <div
            key={short._id}
            className="p-2"
            // Adjusted width for better responsiveness:
            // minWidth ensures readability on small screens, maxWidth limits on large
            style={{ flex: "0 0 auto", minWidth: "180px", maxWidth: "20%" }}
          >
            <Card
              className="text-white border-0 rounded-3 position-relative bg-dark"
              onClick={() => handleReelClick(short.slug)}
              style={{ cursor: "pointer", height: "320px" }}
            >
              {short.videoUrl && short.videoUrl.endsWith(".mp4") ? (
                <video
                  src={short.videoUrl}
                  autoPlay
                  loop
                  muted
                  poster={short.thumbnailUrl || "https://via.placeholder.com/300x300?text=Short+Video"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    pointerEvents: "none",
                  }}
                />
              ) : (
                <Card.Img
                  src={short.thumbnailUrl || "https://via.placeholder.com/300x300?text=No+Media"}
                  alt={short.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                />
              )}

              <div className="position-absolute top-0 start-0 p-2">
                <BsFillCollectionPlayFill size={20} />
              </div>

              <Card.ImgOverlay
                className="d-flex flex-column justify-content-end p-2 rounded-3"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent)",
                }}
              >
                <p className="card-text fw-bold small lh-sm mb-2 text-wrap">{short.title}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small text-wrap" style={{ fontSize: "0.7rem", opacity: 0.85 }}>
                    {new Date(short.publishedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                  </span>
                  {/* Share functionality would be implemented here */}
                  <BsShareFill size={12} style={{ opacity: 0.8, cursor: "pointer" }} />
                </div>
              </Card.ImgOverlay>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NewsShortsSection;