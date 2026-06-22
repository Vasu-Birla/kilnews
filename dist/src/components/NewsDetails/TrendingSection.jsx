
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Container } from "react-bootstrap";
import { FaBolt } from "react-icons/fa";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

// Media Renderer Component
const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
  const firstMedia = media?.[0];
  const isVideo = firstMedia?.type === "video";
  const mediaUrl = firstMedia?.url;

  const commonStyles = { width, height, objectFit, borderRadius, backgroundColor: "#e0e0e0" };

  if (isVideo) {
    return (
      <video src={mediaUrl} width={width} height={height} autoPlay muted loop style={commonStyles} />
    );
  }

  return (
    <Image
      src={mediaUrl || `https://via.placeholder.com/150x90?text=No+Image`}
      alt={alt}
      style={commonStyles}
    />
  );
};

const TrendingSection = ({ stories = [] }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // ⭐ अब सिर्फ National Category की news
    const filtered = stories.filter((item) => {
      const cat = item?.category?.name?.toLowerCase();
      return cat === "national";   // 🔥 ONLY NATIONAL NEWS
    });

    setNewsData(filtered.slice(0, 6));
  }, [stories]);

  if (!newsData.length) return null;

  const linkStyle = { textDecoration: "none", color: "inherit" };

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("hi-IN", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  };

  const isLastRow = (index) => {
    const cardsPerRow = 2;
    const totalRows = Math.ceil(newsData.length / cardsPerRow);
    const currentRow = Math.floor(index / cardsPerRow) + 1;
    return currentRow === totalRows;
  };

  return (
    <Container fluid className="mt-4">
      <div className="d-flex align-items-center mb-3 flex-wrap">
        <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: "#C00000" }} className="me-2"></div>
          <h5 className="fw-bold m-0">देश न्यूज़</h5>
        </div>

        <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />

        <Link
          to="/india"
          state={{ relatedArticles: newsData }}
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: "#2E6E9E" }}
        >
          और देखें
        </Link>
      </div>

      <Row>
        {newsData.map((news, index) => (
          <Col
            key={news._id}
            xs={12}
            md={6}
            className={`${index % 2 === 0 ? "pe-md-2" : "ps-md-2"} mb-3`}
            style={{
              paddingBottom: "12px",
              borderBottom: isLastRow(index) ? "none" : "1px solid #d3d3d3",
            }}
          >
            <Link
              to={`/news/${news.slug_en || news._id}`}
              state={{ relatedArticles: newsData }}
              style={linkStyle}
              className="d-block h-100 position-relative"
            >
              <Row className="gx-2 gx-md-3 align-items-center">
                <Col xs={4} md={3}>
                  <MediaRenderer
                    media={news.media}
                    alt={news.title_hi || news.title || ""}
                    width="100%"
                    height="90px"
                  />
                </Col>

                <Col xs={8} md={9}>
                  <p className="text-danger small fw-bold mb-1">
                    {news.category?.name || "General"}
                  </p>

                  {/* <p className="fw-bold mb-1">{news.title_hi || news.title}</p> */}
                                    <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: news.title_hi || news.title }} 
                  />


                  <div className="d-flex align-items-center flex-wrap">
                    <UserAvatar user={news.createdBy} size={30} />
                    <small className="text-muted ms-1">
                      {news.createdBy?.name || "EMS News"} |{" "}
                      {formatFullDateTime(news.publishedAt)}
                    </small>
                  </div>
                </Col>
              </Row>

              <FaBolt
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  color: "#C00000",
                }}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TrendingSection;
