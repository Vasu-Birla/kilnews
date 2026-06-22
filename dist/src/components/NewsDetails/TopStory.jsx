
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { allNews } from "../../Services/authApi";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // 🟢 Media Renderer Component
// const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
//   const firstMedia = media?.[0];
//   const isVideo = firstMedia && firstMedia.type === "video";
//   const mediaUrl = firstMedia?.url;

//   const commonStyles = {
//     width: width,
//     height: height,
//     objectFit: objectFit,
//     borderRadius: borderRadius,
//     backgroundColor: "#e0e0e0",
//     display: "block",
//     position: "relative",
//     zIndex: 0,
//   };

//   if (isVideo) {
//     if (mediaUrl) {
//       return (
//         <video
//           src={mediaUrl}
//           width={width}
//           height={height}
//           controls={false}
//           autoPlay
//           muted
//           loop
//           style={commonStyles}
//         >
//           Your browser does not support the video tag.
//         </video>
//       );
//     } else {
//       const placeholderWidth = parseInt(width) || 150;
//       const placeholderHeight = parseInt(height) || 90;
//       return (
//         <Image
//           src={`https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=VIDEO+URL+MISSING`}
//           alt={alt}
//           style={commonStyles}
//         />
//       );
//     }
//   } else {
//     const imageSrc =
//       mediaUrl ||
//       `https://via.placeholder.com/${parseInt(width) || 150}x${
//         parseInt(height) || 90
//       }?text=No+Media`;
//     return (
//       <Image
//         src={imageSrc}
//         alt={alt}
//         style={commonStyles}
//         onError={(e) => {
//           const placeholderWidth = parseInt(width) || 150;
//           const placeholderHeight = parseInt(height) || 90;
//           e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
//           console.error("Image failed to load:", e.target.src);
//         }}
//       />
//     );
//   }
// };

// const TopStory = () => {
//   const categoryName = "flash";
//   const [flashNews, setflashNews] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [errorNews, setErrorNews] = useState(null);
// const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   useEffect(() => {
//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 768);
//   };
//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

//   useEffect(() => {
//     const fetchflashNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success && Array.isArray(res.data)) {                                             
//           const filtered = res.data.filter((news) =>
//             news.category
//               ? typeof news.category === "string"
//                 ? news.category.toLowerCase() === categoryName.toLowerCase()
//                 : news.category.name?.toLowerCase() === categoryName.toLowerCase()
//               : false
//           );
//           setflashNews(filtered);
//         } else {
//           setErrorNews("Failed to load flash news");
//         }
//       } catch (err) {
//         setErrorNews(err.message || "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchflashNews();
//   }, []);

//   useEffect(() => {
//     if (flashNews.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % Math.min(5, flashNews.length));
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [flashNews.length]);

//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "";
//     const options = {
//       day: "numeric",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: "h23",
//     };
//     return new Date(dateString).toLocaleString("hi-IN", options);
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading {categoryName} News...</p>
//       </div>
//     );
//   }

//   if (errorNews) {
//     return (
//       <Alert variant="danger" className="my-4">
//         {errorNews}
//       </Alert>
//     );
//   }

//   if (flashNews.length === 0) {
//     return <div className="text-center p-4">No {categoryName} news available.</div>;
//   }

//   const sliderNews = flashNews.slice(0, 5);
//   const rightSideNews = flashNews.slice(0, 4);

//   return (
//     <Row className="g-3">
//       {/* 🟢 Left Slider */}
//       <Col md={7}>
//         <div
//           style={{
//             position: "relative",
//             overflow: "hidden",
//               // height: "410px",
//                   height: isMobile ? "240px" : "410px", // 🔥 mobile f
//             width: "100%",
//             borderRadius: "8px",
//             marginBottom: "1rem",
//           }}
//         >
//           {sliderNews.map((news, index) => (
//             <Link
//               key={news.slug_en || news._id}
//               to={`/news/${news.slug_en || news._id}`}
//               state={{ relatedArticles: flashNews }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: index > currentSlide ? "100%" : index < currentSlide ? "-100%" : "0",
//                 width: "100%",
//                 height: "100%",
//                 opacity: index === currentSlide ? 1 : 0,
//                 transition: "all 0.8s ease-in-out",
//                 zIndex: index === currentSlide ? 2 : 1,
//                 cursor: "pointer",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <div className="position-relative h-100">
//                 <MediaRenderer
//                   media={news.media}
//                   alt={news?.title_hi || news?.title_en || "Top Story"}
//                   width="100%"
//                   height="100%"
//                   objectFit="cover"
//                   borderRadius="8px"
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
//                   style={{
//                     background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
//                   }}
//                 >
//                   {/* <h2 className="fs-5 fs-md-4 fw-bold m-0 text-wrap">
//                     {news?.title_hi || news?.title_en || ""}
//                   </h2> */}

// <div 
//   className="news-headline-bold text-wrap" 
//   style={{ color: "white" }} // यहाँ आप जो भी कलर देंगे, वो पक्का दिखेगा
//   dangerouslySetInnerHTML={{ __html: news?.title_hi || news?.title_en || "" }} 
// />
//                     <div className="d-flex align-items-center gap-2 mt-1">
//                       <UserAvatar
//                         src={
//                           news.createdBy?.profileImage ||
//                           news.createdBy?.profilePic ||
//                           "https://via.placeholder.com/40x40?text=U"
//                         }
//                         alt={news.createdBy?.name || "EMS News"}
//                         size={24}
//                       />
//                       <small className="text-nowrap">
//                         {news.createdBy?.name || "EMS News"} |{" "}
//                         {formatFullDateTime(news.publishedAt)}
//                       </small>
//                     </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </Col>

//       {/* 🟢 Right Side News Cards */}
//       <Col md={5}>
//         <Row>
//           {rightSideNews.length === 0 ? (
//             <div className="text-center p-4">No more {categoryName} news available.</div>
//           ) : (
//             rightSideNews.map((news, index) => (
//               <Col
//                 key={news.slug_en || news._id}
//                 xs={12}
//                 className="mb-3"
//                 style={{
//                   borderBottom: index !== rightSideNews.length - 1 ? "1px solid #ccc" : "none",
//                   paddingBottom: "8px",
//                 }}
//               >
//                 <Link
//                   to={`/news/${news.slug_en || news._id}`}
//                   state={{ relatedArticles: flashNews }}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                   className="d-block h-100 position-relative"
//                 >
//                   <Row className="gx-2 align-items-center">
//                     <Col xs={4}>
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "80px",
//                           overflow: "hidden",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         <MediaRenderer
//                           media={news.media}
//                           alt={news?.title_hi || news?.title_en || ""}
//                           width="100%"
//                           height="100%"
//                           objectFit="cover"
//                           borderRadius="6px"
//                         />
//                       </div>
//                     </Col>

//                     <Col xs={8}>
//                       {/* <p className="fw-bold small mb-1 text-wrap">
//                         {news?.title_hi || news?.title_en || ""}
//                       </p> */}

                      
//                       <div
//                     // className="fw-bold mb-1 title-clamp-2-lines"
//                      className="news-headline-master mb-1"
//                     style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
//                     dangerouslySetInnerHTML={{ __html: news.title_hi || news.title_en || "" }}
//                   />

//                       <div className="d-flex align-items-center gap-2">
//                         <UserAvatar
//                           src={
//                             news.createdBy?.profileImage ||
//                             news.createdBy?.profilePic ||
//                             "https://via.placeholder.com/40x40?text=U"
//                           }
//                           alt={news.createdBy?.name || "User"}
//                           size={24}
//                         />
//                         <small className="text-muted text-nowrap">
//                           {news.createdBy?.name || "EMS News"} |{" "}
//                           {formatFullDateTime(news.publishedAt)}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Link>
//               </Col>
//             ))
//           )}
//         </Row>
//       </Col>
//     </Row>
//   );
// };

// export default TopStory;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
import { useNews } from "../../context/NewsContext";

// 🟢 Media Renderer Component
const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
  const firstMedia = media?.[0];
  const isVideo = firstMedia && firstMedia.type === "video";
  const mediaUrl = firstMedia?.url;

  const commonStyles = {
    width: width,
    height: height,
    objectFit: objectFit,
    borderRadius: borderRadius,
    backgroundColor: "#e0e0e0",
    display: "block",
    position: "relative",
    zIndex: 0,
  };

  if (isVideo) {
    if (mediaUrl) {
      return (
        <video
          src={mediaUrl}
          width={width}
          height={height}
          controls={false}
          autoPlay
          muted
          loop
          style={commonStyles}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      const placeholderWidth = parseInt(width) || 150;
      const placeholderHeight = parseInt(height) || 90;
      return (
        <Image
          src={`https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=VIDEO+URL+MISSING`}
          alt={alt}
          style={commonStyles}
        />
      );
    }
  } else {
    const imageSrc =
      mediaUrl ||
      `https://via.placeholder.com/${parseInt(width) || 150}x${
        parseInt(height) || 90
      }?text=No+Media`;
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={commonStyles}
        onError={(e) => {
          const placeholderWidth = parseInt(width) || 150;
          const placeholderHeight = parseInt(height) || 90;
          e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
          console.error("Image failed to load:", e.target.src);
        }}
      />
    );
  }
};

// ✅ Ab "data" prop optional hai — agar NewsContent se data milta hai to use karega,
// warna khud Context se le lega. Apna fetch hata diya — duplicate API call band.
const TopStory = ({ data }) => {
  const categoryName = "flash";
  const { categorized, newsData: allNewsData, loading, error: contextError } = useNews();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Pehle Context ke pre-categorized data se "flash" news lo.
  // Agar parent ne "data" prop diya hai (poora newsData array), to usi se filter kar lo — fallback.
  const sourceArray = data && data.length ? data : allNewsData;
  const flashNews =
    categorized?.flash ||
    (sourceArray || []).filter((news) =>
      news.category
        ? typeof news.category === "string"
          ? news.category.toLowerCase() === categoryName.toLowerCase()
          : news.category.name?.toLowerCase() === categoryName.toLowerCase()
        : false
    );

  useEffect(() => {
    if (!flashNews || flashNews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(5, flashNews.length));
    }, 4000);
    return () => clearInterval(interval);
  }, [flashNews.length]);

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "";
    const options = {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    };
    return new Date(dateString).toLocaleString("hi-IN", options);
  };

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading {categoryName} News...</p>
      </div>
    );
  }

  if (contextError) {
    return (
      <Alert variant="danger" className="my-4">
        {contextError}
      </Alert>
    );
  }

  if (!flashNews || flashNews.length === 0) {
    return <div className="text-center p-4">No {categoryName} news available.</div>;
  }

  const sliderNews = flashNews.slice(0, 5);
  const rightSideNews = flashNews.slice(0, 4);

  return (
    <Row className="g-3">
      {/* 🟢 Left Slider */}
      <Col md={7}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: isMobile ? "240px" : "410px", // 🔥 mobile fix
            width: "100%",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          {sliderNews.map((news, index) => (
            <Link
              key={news.slug_en || news._id}
              to={`/news/${news.slug_en || news._id}`}
              state={{ relatedArticles: flashNews }}
              style={{
                position: "absolute",
                top: 0,
                left: index > currentSlide ? "100%" : index < currentSlide ? "-100%" : "0",
                width: "100%",
                height: "100%",
                opacity: index === currentSlide ? 1 : 0,
                transition: "all 0.8s ease-in-out",
                zIndex: index === currentSlide ? 2 : 1,
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="position-relative h-100">
                <MediaRenderer
                  media={news.media}
                  alt={news?.title_hi || news?.title_en || "Top Story"}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  borderRadius="8px"
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-2 p-md-3 text-white"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
                  }}
                >
                  <div
                    className="news-headline-bold text-wrap"
                    style={{ color: "white" }}
                    dangerouslySetInnerHTML={{ __html: news?.title_hi || news?.title_en || "" }}
                  />
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <UserAvatar
                      src={
                        news.createdBy?.profileImage ||
                        news.createdBy?.profilePic ||
                        "https://via.placeholder.com/40x40?text=U"
                      }
                      alt={news.createdBy?.name || "EMS News"}
                      size={24}
                    />
                    <small className="text-nowrap">
                      {news.createdBy?.name || "EMS News"} |{" "}
                      {formatFullDateTime(news.publishedAt)}
                    </small>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Col>

      {/* 🟢 Right Side News Cards */}
      <Col md={5}>
        <Row>
          {rightSideNews.length === 0 ? (
            <div className="text-center p-4">No more {categoryName} news available.</div>
          ) : (
            rightSideNews.map((news, index) => (
              <Col
                key={news.slug_en || news._id}
                xs={12}
                className="mb-3"
                style={{
                  borderBottom: index !== rightSideNews.length - 1 ? "1px solid #ccc" : "none",
                  paddingBottom: "8px",
                }}
              >
                <Link
                  to={`/news/${news.slug_en || news._id}`}
                  state={{ relatedArticles: flashNews }}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="d-block h-100 position-relative"
                >
                  <Row className="gx-2 align-items-center">
                    <Col xs={4}>
                      <div
                        style={{
                          width: "100%",
                          height: "80px",
                          overflow: "hidden",
                          borderRadius: "6px",
                        }}
                      >
                        <MediaRenderer
                          media={news.media}
                          alt={news?.title_hi || news?.title_en || ""}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          borderRadius="6px"
                        />
                      </div>
                    </Col>

                    <Col xs={8}>
                      <div
                        className="news-headline-master mb-1"
                        style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
                        dangerouslySetInnerHTML={{ __html: news.title_hi || news.title_en || "" }}
                      />

                      <div className="d-flex align-items-center gap-2">
                        <UserAvatar
                          src={
                            news.createdBy?.profileImage ||
                            news.createdBy?.profilePic ||
                            "https://via.placeholder.com/40x40?text=U"
                          }
                          alt={news.createdBy?.name || "User"}
                          size={24}
                        />
                        <small className="text-muted text-nowrap">
                          {news.createdBy?.name || "EMS News"} |{" "}
                          {formatFullDateTime(news.publishedAt)}
                        </small>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default TopStory;
