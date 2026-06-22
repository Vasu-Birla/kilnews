
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";
// // ✅ UserAvatar Import किया गया
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // 🖼️ Media Renderer Helper Component
// const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
//   const firstMedia = media?.[0];
//   const isVideo = firstMedia && firstMedia.type === 'video';
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
//     const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
//     return (
//       <Image
//         src={imageSrc}
//         alt={alt}
//         style={commonStyles}
//         onError={(e) => {
//           const placeholderWidth = parseInt(width) || 150;
//           const placeholderHeight = parseInt(height) || 90;
//           e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
//         }}
//       />
//     );
//   }
// };

// const Manoranjan = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           // ✅ Entertainment Filter Logic
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews || []);
//         } else {
//           setError(res?.message || "Failed to load Entertainment news.");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching news.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // ✅ Consistent Date-Time Formatter
//   const formatFullDateTime = (dateString) => {
//     if (!dateString) return "समय उपलब्ध नहीं";
//     const dateObj = new Date(dateString);
//     if (isNaN(dateObj.getTime())) return "Invalid Date";

//     return dateObj.toLocaleString("hi-IN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: 'h23',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2"></p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="danger" className="my-4">
//          {error}
//       </Alert>
//     );
//   }

//   // 📰 News Distribution Logic
//   const mainArticle = newsData?.[0];
//   const bottomArticle = newsData?.[1];
//   const sideArticles = newsData?.slice(2, 6);

//   const linkStyle = { textDecoration: "none", color: "inherit" };
//   const accentColor = "#A12D2A";
//   const linkColor = "#005f8bff";

//   return (
//     <Container fluid className="mt-4">
//       {/* ✅ Header (Only appears once) */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="d-flex align-items-center flex-shrink-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">मनोरंजन</h5>
//         </div>
//         <hr
//           className="flex-grow-1 mx-3"
//           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
//         />
//         <Link
//           to="/entertainment"
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//          और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       {/* ✅ Content Block */}
//       {newsData.length === 0 ? (
//         <Alert variant="info" className="my-4">
//           कोई मनोरंजन समाचार उपलब्ध नहीं है।
//         </Alert>
//       ) : (
//         <Row>
//           {/* ==== Main Article Column (Left) ==== */}
//           <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
//             {mainArticle && (
//               <Link
//                 to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//                 className="d-block position-relative mb-4 flex-grow-1"
//               >
//                 <MediaRenderer
//                   media={mainArticle?.media}
//                   alt={mainArticle?.title_hi || mainArticle?.title_en || "Entertainment News"}
//                   width="100%"
//                   // height="320px"
//                          height={window.innerWidth <= 576 ? "220px" : "320px"}
//                   objectFit="cover"
//                   borderRadius="8px"
//                 />
//                 <div
//                   className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                   style={{
//                     background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
//                     borderRadius: "0 0 8px 8px",
//                   }}
//                 >
//                   {/* <h5 className="fw-bold text-wrap">
//                     {mainArticle?.title_hi || mainArticle?.title_en}
//                   </h5>
//                    */}

//                       {/* 🔥 Main Title Rendered as HTML */}
//                   {/* <div 
//                     className="fw-bold h5 mb-1" 
//                     dangerouslySetInnerHTML={{ __html: mainArticle?.title_hi || mainArticle?.title_en }} 
//                   /> */}

                                    
// <div 
//   className="news-headline-bold text-wrap" 
//   style={{ color: "white" }} // यहाँ आप जो भी कलर देंगे, वो पक्का दिखेगा
//   dangerouslySetInnerHTML={{ __html: mainArticle?.title_hi || mainArticle?.title_en || "" }} 
// />
//                   {/* ✅ User Avatar Added (White text for overlay) */}
//                   <div className="d-flex align-items-center mt-2">
//                     <UserAvatar user={mainArticle?.createdBy} size={25} />
//                     <small className="ms-2 text-light">
//                       {mainArticle?.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(mainArticle?.publishedAt || mainArticle?.createdAt)}
//                     </small>
//                   </div>
//                 </div>
//               </Link>
//             )}

//             {/* ==== Bottom Article (Under Main) ==== */}
//             {bottomArticle && (
//               <Link
//                 to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//               >
//                 <Row className="align-items-center">
//                   <Col xs={4} sm={3}>
//                     <MediaRenderer
//                       media={bottomArticle?.media}
//                       alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Entertainment News"}
//                       width="100%"
//                       height="90px"
//                       objectFit="cover"
//                       borderRadius="8px"
//                     />
//                   </Col>
//                   <Col xs={8} sm={9} className="ps-2">
//                     {/* <p className="fw-bold mb-1 text-wrap">
//                       {bottomArticle?.title_hi || bottomArticle?.title_en}
//                     </p> */}

//                         <div 
//                     // className="fw-bold mb-1"
//                         className="news-headline-master mb-1"
//                     dangerouslySetInnerHTML={{ __html: bottomArticle?.title_hi || bottomArticle?.title_en }} 
//                   />
                    
//                     {/* ✅ User Avatar Added */}
//                     <div className="d-flex align-items-center mt-1">
//                       <UserAvatar user={bottomArticle?.createdBy} size={20} />
//                       <small className="text-muted ms-1">
//                         {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
//                         {formatFullDateTime(bottomArticle?.publishedAt || bottomArticle?.createdAt)}
//                       </small>
//                     </div>
//                   </Col>
//                 </Row>
//               </Link>
//             )}
//           </Col>

//           {/* ==== Side Articles Column (Right) ==== */}
//           <Col lg={5}>
//             {sideArticles?.map((article, index) => (
//               <React.Fragment key={article?._id || index}>
//                 <Link
//                   to={`/news/${article?.slug_en || article?._id}`}
//                   state={{ relatedArticles: newsData }}
//                   style={linkStyle}
//                 >
//                   <Row className="align-items-center">
//                     <Col xs={4}>
//                       <MediaRenderer
//                         media={article?.media}
//                         alt={article?.title_hi || article?.title_en || "Entertainment News"}
//                         width="100%"
//                         height="90px"
//                         objectFit="cover"
//                         borderRadius="8px"
//                       />
//                     </Col>
//                     <Col xs={8} className="ps-2">
//                       {/* <p
//                         className="fw-bold mb-1 text-wrap"
//                         style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
//                       >
//                         {article?.title_hi || article?.title_en}
//                       </p> */}

//                              <div 
//                     // className="fw-bold mb-1"
//                         className="news-headline-master mb-1"
//                     dangerouslySetInnerHTML={{ __html: article?.title_hi || article?.title_en }} 
//                   />
                      
//                       {/* ✅ User Avatar Added */}
//                       <div className="d-flex align-items-center mt-1">
//                         <UserAvatar user={article?.createdBy} size={20} />
//                         <small className="text-muted ms-1">
//                           {article?.createdBy?.name || "EMS News"} |{" "}
//                           {formatFullDateTime(article?.publishedAt || article?.createdAt)}
//                         </small>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Link>
//                 {/* Divider between items */}
//                 {index < sideArticles.length - 1 && <hr className="my-3" />}
//               </React.Fragment>
//             ))}
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default Manoranjan;


import React from "react";
import { Container, Row, Col, Image, Alert } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
import { useNews } from "../../context/NewsContext";

// 🖼️ Media Renderer
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
        <video src={mediaUrl} width={width} height={height} controls={false} autoPlay muted loop style={commonStyles}>
          Your browser does not support the video tag.
        </video>
      );
    }
    return (
      <Image
        src={`https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=VIDEO+URL+MISSING`}
        alt={alt}
        style={commonStyles}
      />
    );
  }

  const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
  return (
    <Image
      src={imageSrc}
      alt={alt}
      style={commonStyles}
      onError={(e) => {
        e.target.src = `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=Error`;
      }}
    />
  );
};

const Manoranjan = () => {
  // ✅ Context se data — koi alag fetch nahi
  const { categorized, loading, error } = useNews();
  const newsData = categorized["entertainment"] || categorized["मनोरंजन"] || [];

  const formatFullDateTime = (dateString) => {
    if (!dateString) return "समय उपलब्ध नहीं";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return "Invalid Date";
    return dateObj.toLocaleString("hi-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  };

  const accentColor = "#A12D2A";
  const linkColor = "#005f8bff";
  const linkStyle = { textDecoration: "none", color: "inherit" };

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">लोड हो रहा है...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="my-4">{error}</Alert>;
  }

  const mainArticle = newsData?.[0];
  const bottomArticle = newsData?.[1];
  const sideArticles = newsData?.slice(2, 6);

  return (
    <Container fluid className="mt-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <div className="d-flex align-items-center flex-shrink-0">
          <div style={{ width: "5px", height: "24px", backgroundColor: accentColor }} className="me-2" />
          <h5 className="fw-bold m-0">मनोरंजन</h5>
        </div>
        <hr className="flex-grow-1 mx-3" style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }} />
        <Link
          to="/entertainment"
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: linkColor }}
        >
          और देखें <FaArrowRight size={12} />
        </Link>
      </div>

      {/* Content */}
      {newsData.length === 0 ? (
        <Alert variant="info" className="my-4">कोई मनोरंजन समाचार उपलब्ध नहीं है।</Alert>
      ) : (
        <Row>
          {/* Left Column */}
          <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
            {mainArticle && (
              <Link
                to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
                state={{ relatedArticles: newsData }}
                style={linkStyle}
                className="d-block position-relative mb-4 flex-grow-1"
              >
                <MediaRenderer
                  media={mainArticle?.media}
                  alt={mainArticle?.title_hi || mainArticle?.title_en || "Entertainment News"}
                  width="100%"
                  height={window.innerWidth <= 576 ? "220px" : "320px"}
                  objectFit="cover"
                  borderRadius="8px"
                />
                <div
                  className="position-absolute bottom-0 start-0 text-white w-100 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  <div
                    className="news-headline-bold text-wrap"
                    style={{ color: "white" }}
                    dangerouslySetInnerHTML={{ __html: mainArticle?.title_hi || mainArticle?.title_en || "" }}
                  />
                  <div className="d-flex align-items-center mt-2">
                    <UserAvatar user={mainArticle?.createdBy} size={25} />
                    <small className="ms-2 text-light">
                      {mainArticle?.createdBy?.name || "EMS News"} |{" "}
                      {formatFullDateTime(mainArticle?.publishedAt || mainArticle?.createdAt)}
                    </small>
                  </div>
                </div>
              </Link>
            )}

            {/* Bottom Article */}
            {bottomArticle && (
              <Link
                to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
                state={{ relatedArticles: newsData }}
                style={linkStyle}
              >
                <Row className="align-items-center">
                  <Col xs={4} sm={3}>
                    <MediaRenderer
                      media={bottomArticle?.media}
                      alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Entertainment News"}
                      width="100%"
                      height="90px"
                      objectFit="cover"
                      borderRadius="8px"
                    />
                  </Col>
                  <Col xs={8} sm={9} className="ps-2">
                    <div
                      className="news-headline-master mb-1"
                      dangerouslySetInnerHTML={{ __html: bottomArticle?.title_hi || bottomArticle?.title_en }}
                    />
                    <div className="d-flex align-items-center mt-1">
                      <UserAvatar user={bottomArticle?.createdBy} size={20} />
                      <small className="text-muted ms-1">
                        {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
                        {formatFullDateTime(bottomArticle?.publishedAt || bottomArticle?.createdAt)}
                      </small>
                    </div>
                  </Col>
                </Row>
              </Link>
            )}
          </Col>

          {/* Right Column */}
          <Col lg={5}>
            {sideArticles?.map((article, index) => (
              <React.Fragment key={article?._id || index}>
                <Link
                  to={`/news/${article?.slug_en || article?._id}`}
                  state={{ relatedArticles: newsData }}
                  style={linkStyle}
                >
                  <Row className="align-items-center">
                    <Col xs={4}>
                      <MediaRenderer
                        media={article?.media}
                        alt={article?.title_hi || article?.title_en || "Entertainment News"}
                        width="100%"
                        height="90px"
                        objectFit="cover"
                        borderRadius="8px"
                      />
                    </Col>
                    <Col xs={8} className="ps-2">
                      <div
                        className="news-headline-master mb-1"
                        dangerouslySetInnerHTML={{ __html: article?.title_hi || article?.title_en }}
                      />
                      <div className="d-flex align-items-center mt-1">
                        <UserAvatar user={article?.createdBy} size={20} />
                        <small className="text-muted ms-1">
                          {article?.createdBy?.name || "EMS News"} |{" "}
                          {formatFullDateTime(article?.publishedAt || article?.createdAt)}
                        </small>
                      </div>
                    </Col>
                  </Row>
                </Link>
                {index < sideArticles.length - 1 && <hr className="my-3" />}
              </React.Fragment>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Manoranjan;