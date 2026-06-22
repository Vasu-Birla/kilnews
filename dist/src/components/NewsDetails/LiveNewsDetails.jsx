 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Spinner, Alert, Badge } from "react-bootstrap";
import { getLiveNewsById } from "../../Services/authApi";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure icons are imported

// --- Helper: Clean HTML for Responsive Images ---
const cleanHtmlForImages = (htmlString) => {
  if (!htmlString) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const images = doc.querySelectorAll('img');
  images.forEach(img => {
    img.removeAttribute('width');
    img.removeAttribute('height');
    if (img.style.width) img.style.width = ''; 
    if (img.style.height) img.style.height = ''; 
    img.classList.add('img-fluid', 'rounded', 'my-2'); // Bootstrap classes
  });
  return doc.body.innerHTML;
};

// --- Helper: Time Ago ---
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

// --- Component: Media Renderer ---
const MediaRenderer = ({ url, type }) => {
  if (!url) return null;

  return type === "video" ? (
    <video
      src={url}
      className="w-100 rounded mb-3"
      autoPlay
      muted
      loop
      controls
      style={{
        maxHeight: "500px",
        objectFit: "cover",
        backgroundColor: "#000",
      }}
    />
  ) : (
    <Image
      src={url}
      className="w-100 rounded mb-3"
      fluid
      style={{ maxHeight: "500px", objectFit: "cover" }}
    />
  );
};

const LiveNewsDetails = () => {
  const { slug } = useParams();
  // Safe extraction of ID
  const id = slug ? slug.slice(-24) : null;
 
  const [liveNews, setLiveNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cleanedContent, setCleanedContent] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        const res = await getLiveNewsById(id);
        if (res.success) {
          setLiveNews(res.data);
          // Clean HTML content immediately
          if (res.data.content_hi) {
            setCleanedContent(cleanHtmlForImages(res.data.content_hi));
          }
        } else {
          setErrorMsg(res.message);
        }
      } catch (err) {
        setErrorMsg(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);
 
  if (loading)
    return (
      <Container className="text-center my-5" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="danger" />
        <p className="mt-2 fw-bold">Loading Live News...</p>
      </Container>
    );
 
  if (errorMsg)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{errorMsg}</Alert>
      </Container>
    );
 
  if (!liveNews)
    return (
      <Container className="mt-4">
        <Alert variant="warning">Live news not available.</Alert>
      </Container>
    );
 
  // Main Media Logic
  const mainMedia = liveNews.coverImage?.url || liveNews.updates?.[0]?.media?.[0]?.url || null;
  const mainType = liveNews.coverImage ? "image" : liveNews.updates?.[0]?.media?.[0]?.type;
 
  return (
    <Container className="my-4" style={{ maxWidth: "1000px" }}>
      {/* Main Card Container (Matches NewsDetailPage style) */}
      <div className="bg-white p-3 p-md-4 shadow-sm rounded border">
        
        {/* Header Section */}
        <h1 className="fw-bold mb-3" style={{ fontSize: "1.6rem", lineHeight: 1.4 }}>
          {liveNews.title_hi}
        </h1>
        
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <Badge bg="danger" className="px-3 py-2">🔴 LIVE</Badge>
          <small className="text-muted border-start ps-2 ms-1">
            {liveNews.createdBy?.name || "EMS News"}
          </small>
          <small className="text-muted">
             • Started {timeAgo(liveNews.createdAt)}
          </small>
        </div>
 
        {/* Main Media */}
        <MediaRenderer url={mainMedia} type={mainType} />
 
        {/* Summary */}
        {liveNews.summary_hi && (
          <div className="alert alert-light border-start border-4 border-danger p-3 mb-4" style={{ backgroundColor: "#fff5f5" }}>
            <p className="mb-0 fs-5" style={{ lineHeight: 1.6 }}>{liveNews.summary_hi}</p>
          </div>
        )}
 
        {/* Full HTML Content */}
        {cleanedContent && (
          <div
            className="article-content mb-4"
            style={{ fontSize: "1rem", lineHeight: "1.7", whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />
        )}
 
        <hr className="my-4" />
 
        {/* Live Timeline Section */}
        <h4 className="fw-bold mb-4">
            <i className="bi bi-broadcast text-danger me-2"></i> 
            Live Updates
        </h4>
        
        <div className="timeline-wrapper">
          {liveNews.updates?.map((u, index) => {
            const uMedia = u.media?.[0]?.url || null;
            const uType = u.media?.[0]?.type || "video";
            
            return (
              <div key={index} className="d-flex mb-4 position-relative">
                {/* Timeline Line & Dot */}
                <div className="d-flex flex-column align-items-center me-3" style={{ minWidth: "24px" }}>
                    {/* Pulsing Dot */}
                    <div 
                        className="bg-danger rounded-circle" 
                        style={{ width: "16px", height: "16px", marginTop: "6px", boxShadow: "0 0 0 4px rgba(220, 53, 69, 0.2)" }} 
                    />
                    {/* Vertical Line */}
                    {index !== liveNews.updates.length - 1 && (
                        <div className="bg-light border-start" style={{ width: "2px", flexGrow: 1, marginTop: "5px" }}></div>
                    )}
                </div>

                {/* Content Card */}
                <div className="flex-grow-1">
                    <div className="mb-2">
                        <small className="text-danger fw-bold text-uppercase" style={{ fontSize: "0.8rem" }}>
                            {timeAgo(u.createdAt)}
                        </small>
                    </div>
                    
                    <div className="bg-light p-3 rounded border shadow-sm">
                        <p className="fw-bold mb-2 fs-5">{u.title_hi}</p> {/* If title exists, otherwise remove */}
                        <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>{u.text_hi}</p>
                        
                        {uMedia && (
                            <div className="mt-2">
                                <MediaRenderer url={uMedia} type={uType} />
                            </div>
                        )}
                    </div>
                </div>
              </div>
            );
          })}
          
          {liveNews.updates?.length === 0 && (
              <p className="text-center text-muted">No updates yet.</p>
          )}
        </div>

      </div>
    </Container>
  );
};
 
export default LiveNewsDetails;