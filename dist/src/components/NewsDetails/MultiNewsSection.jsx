import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTrending } from "../../Services/authApi";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

const MultiNewsSection = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getTrending();
        if (res?.success && Array.isArray(res.data)) {
          // Duplicate filtering logic
          const seenTitles = new Set();
          const uniqueNews = res.data.filter((item) => {
            const titleHi = item.title_hi?.trim();
            const titleEn = item.title_en?.trim();
            const primaryTitle = titleHi || titleEn;
            if (primaryTitle) {
              if (seenTitles.has(primaryTitle)) return false;
              seenTitles.add(primaryTitle);
              return true;
            }
            return true;
          });
          setNewsList(uniqueNews);
        } else {
          setError("No trending news available");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleClick = (item) => {
    const slug = item?.slug || item?.slug_en || item?._id;
    navigate(`/news/${slug}`, { state: { relatedArticles: newsList } });
  };

  if (loading) return <Spinner animation="border" className="my-3" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!newsList?.length) return <Alert variant="info">No news found</Alert>;

  // 🧱 Single News Card Component
  const NewsCard = ({ item }) => {
    const mediaUrl = item.media?.[0]?.url || "";
    const isVideo = mediaUrl.endsWith(".mp4") || item.media?.[0]?.type === "video";

    return (
      <div
        onClick={() => handleClick(item)}
        className="shadow-sm w-100" // ⭐ Added w-100 to ensure full width
        style={{
          cursor: "pointer",
          border: "1px solid #e0e0e0",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "10px",
          height: "100%", // Ensures equal height in flex row
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        {/* Media Section */}
        <div style={{ width: "100%", height: "150px", overflow: "hidden", borderRadius: "6px", marginBottom: "10px" }}>
           {mediaUrl ? (
            isVideo ? (
              <video
                src={mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Image
                src={mediaUrl}
                alt={item.title_hi || "news"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }} />
          )}
        </div>

        {/* Title */}
        <h6
          className="fw-bold text-dark mb-2"
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1, // Pushes footer down
          }}
        >
          {item.title_hi || item.title_en || "No Title"}
        </h6>

        {/* Footer (User + Date) */}
        <div className="d-flex align-items-center mt-auto pt-2 border-top">
          {item.createdBy && (
            <UserAvatar user={item.createdBy} size={24} className="me-2" />
          )}
          <small className="text-muted" style={{ fontSize: "0.75rem" }}>
             {item.createdBy?.name || "EMS News"} •{" "}
             {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString("hi-IN", {
                  day: "numeric", month: "short"
                })
              : ""}
          </small>
        </div>
      </div>
    );
  };

  // 🧩 Logic to render rows based on pattern [3, 4, 3, 4...]
  const renderNewsGrid = () => {
    const rowsPattern = [3, 4, 3, 4]; // Pattern
    let startIndex = 0;
    const renderedRows = [];
    const totalNews = newsList.length;

    // Loop indefinitely until we run out of news, repeating the pattern
    let patternIndex = 0;
    
    while (startIndex < totalNews) {
      const count = rowsPattern[patternIndex % rowsPattern.length];
      const rowItems = newsList.slice(startIndex, startIndex + count);
      
      // If we don't have enough items to fill the specific pattern row, 
      // we stop to avoid misalignment (as per your code logic)
      if (rowItems.length < count) break;

      // Determine Column Size: 
      // If count is 3 -> col-md-4 (12/3)
      // If count is 4 -> col-md-3 (12/4)
      const colSize = count === 3 ? 4 : 3;

      renderedRows.push(
        <Row key={startIndex} className="mb-4">
          {rowItems.map((item) => (
            <Col 
                key={item._id} 
                lg={colSize}  // Desktop: 3 or 4 cards
                md={6}        // Tablet: 2 cards
                xs={12}       // Mobile: 1 card
                className="d-flex align-items-stretch mb-3 mb-lg-0"
            >
              <NewsCard item={item} />
            </Col>
          ))}
        </Row>
      );

      startIndex += count;
      patternIndex++;
    }

    return renderedRows;
  };

  return (
    <Container className="my-4">
      {renderNewsGrid()}
    </Container>
  );
};

export default MultiNewsSection;