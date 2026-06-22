

import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { BsFillCollectionPlayFill, BsShareFill } from "react-icons/bs";
import { newsshorts } from "../../Services/authApi";
import { useNavigate } from "react-router-dom";

const AllShortsPage = () => {
  const [shorts, setShorts] = useState([]);
  const navigate = useNavigate();

  // Page open होते ही top पर scroll करने के लिए
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await newsshorts();
        setShorts(response?.data || []);
      } catch (error)
{
        console.error("Error fetching shorts:", error);
      }
    };
    fetchShorts();
  }, []);

  const handleReelClick = (slug) => {
    navigate(`/shorts/${slug}`);
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2" />
          <h4 className="fw-bold m-0"> All News Shorts</h4>
        </div>

        {/* यह line heading के right तक जाएगी */}
        <div
          style={{
            flexGrow: 1,
            height: "3px", // line की thickness
            backgroundColor: "#C00000",
            marginLeft: "10px", // heading से gap
            alignSelf: "center"
          }}
        />
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {shorts.map((short) => (
          <Col key={short._id}>
            <Card
              className="text-white border-0 rounded-3 position-relative bg-dark"
              onClick={() => handleReelClick(short.slug)}
              // --- बदलाव यहाँ किया गया है ---
              style={{ cursor: "pointer", height: "350px" }} // हाइट को 250px से 400px कर दिया गया है
            >
              {short.videoUrl && short.videoUrl.endsWith(".mp4") ? (
                <video
                  src={short.videoUrl}
                  autoPlay
                  loop
                  muted
                  poster={short.thumbnailUrl || "https://via.placeholder.com/300x400?text=..."}
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
                  src={short.thumbnailUrl || "https://via.placeholder.com/300x400?text=No+Media"}
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
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent)" }}
              >
                <p className="card-text fw-bold small lh-sm mb-2">{short.title}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small" style={{ fontSize: "0.7rem", opacity: 0.85 }}>
                    {new Date(short.publishedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                  </span>
                  <BsShareFill size={12} style={{ opacity: 0.8 }} />
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllShortsPage;