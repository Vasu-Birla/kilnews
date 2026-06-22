


// // import React, { useEffect, useState } from "react";
// // import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// // import { Link } from "react-router-dom";
// // import { allNews } from "../../Services/authApi";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
// //   const firstMedia = media?.[0];
// //   const isVideo = firstMedia && firstMedia.type === "video";
// //   const mediaUrl = firstMedia?.url;

// //   const commonStyles = {
// //     width,
// //     height,
// //     objectFit,
// //     borderRadius,
// //     backgroundColor: "#e0e0e0",
// //     display: "block",
// //   };

// //   if (isVideo) {
// //     return mediaUrl ? (
// //       <video src={mediaUrl} width={width} height={height} autoPlay muted loop style={commonStyles} />
// //     ) : (
// //       <Image
// //         src={`https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=VIDEO+MISSING`}
// //         alt={alt}
// //         style={commonStyles}
// //       />
// //     );
// //   } else {
// //     const imageSrc =
// //       mediaUrl ||
// //       `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=No+Media`;
// //     return (
// //       <Image
// //         src={imageSrc}
// //         alt={alt}
// //         style={commonStyles}
// //         onError={(e) => {
// //           e.target.src = `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=Error`;
// //         }}
// //       />
// //     );
// //   }
// // };

// // const SportsSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         const res = await allNews();
// //         if (res?.success) {
// //           const sportsNews = res.data.filter((item) => {
// //             const categoryName = item.category?.name?.toLowerCase() || "";
// //             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
// //             return (
// //               categoryName === "sports" ||
// //               categoryName === "खेल" ||
// //               subCategoryName === "cricket"
// //             );
// //           });
// //           setNewsData(sportsNews);
// //         } else setError("Failed to load news");
// //       } catch (err) {
// //         setError(err.message || "Error fetching news");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return "";
// //     const options = {
// //       day: "numeric",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hourCycle: "h23",
// //     };
// //     return new Date(dateString).toLocaleString("hi-IN", options);
// //   };

// //   if (loading)
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" />
// //       </div>
// //     );

// //   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
// //   if (newsData.length === 0) return null;

// //   const mainArticle = newsData[0];
// //   const belowMainArticle = newsData[1];
// //   const sideArticles = newsData.slice(2, 5);
// //   const farRightArticles = newsData.slice(5, 8);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };
// //   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

// //   const truncateStyle = {
// //     display: "-webkit-box",
// //     WebkitLineClamp: 3, // ✅ Sirf 3 lines tak headline
// //     WebkitBoxOrient: "vertical",
// //     overflow: "hidden",
// //   };

// //   const grayLine = (
// //     <div
// //       style={{
// //         height: "1px",
// //         backgroundColor: "#d3d3d3",
// //         marginTop: "8px",
// //         marginBottom: "8px",
// //       }}
// //     ></div>
// //   );

// //   return (
// //     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
// //       <Container fluid className="py-4">
// //         {/* ==== Section Header ==== */}
// //         <div className="d-flex align-items-center mb-3">
// //           <div
// //             style={{
// //               width: "5px",
// //               height: "28px",
// //               backgroundColor: "#A12D2A",
// //               marginRight: "10px",
// //             }}
// //           ></div>
// //           <h5 className="fw-bold mb-0 text-black">खेल</h5>
// //           <div className="flex-grow-1 mx-2">
// //             <hr className="border-2 border-danger opacity-100 my-0" />
// //           </div>
// //           <Link
// //             to="/sports"
// //             className="text-decoration-none fw-bold small flex-shrink-0"
// //             style={{ color: "#2E6E9E" }}
// //           >
// //             और देखें
// //           </Link>
// //         </div>

// //         <Row>
// //           {/* ==== Left Side (main article + below main) ==== */}
// //           <Col xs={12} md={5} className="mb-3" >
// //             {mainArticle && (
// //               <Link
// //                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
// //                 state={{ relatedArticles: newsData }}
// //                 style={linkStyle}
// //               >
// //                 <div className="rounded overflow-hidden mb-2" style={{ height: "155px" }}>
// //                   <MediaRenderer
// //                     media={mainArticle.media}
// //                     alt={mainArticle.title_hi || mainArticle.title_en || "Sports News"}
// //                     width="100%"
// //                     height="100%"
// //                     objectFit="cover"
// //                   />
// //                 </div>
// //                 <h6 className="fw-bold mb-1" style={{ fontSize: "1rem", ...truncateStyle }}>
// //                   {mainArticle.title_hi || mainArticle.title_en}
// //                 </h6>
// //                 <div className="d-flex align-items-center mt-1 mb-3">
// //                   <UserAvatar user={mainArticle.createdBy} size={25} />
// //                   <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
// //                     {mainArticle.createdBy?.name || "EMS News"} |{" "}
// //                     {formatFullDateTime(mainArticle.publishedAt)}
// //                   </small>
// //                 </div>
// //               </Link>
// //             )}

// //             {belowMainArticle && (
// //               <div>
// //                 <Link
// //                   to={`/news/${belowMainArticle.slug_en || belowMainArticle._id}`}
// //                   state={{ relatedArticles: newsData }}
// //                   style={linkStyle}
// //                 >
// //                   <div className="d-flex">
// //                     <div className="flex-shrink-0 me-2">
// //                       <MediaRenderer
// //                         media={belowMainArticle.media}
// //                         alt={belowMainArticle.title_hi || belowMainArticle.title_en}
// //                         width="100px"
// //                         height="90px"
// //                         objectFit="cover"
// //                       />
// //                     </div>
// //                     <div>
// //                       <p className="fw-bold small mb-1" style={truncateStyle}>
// //                         {belowMainArticle.title_hi || belowMainArticle.title_en}
// //                       </p>
// //                       <div className="d-flex align-items-center">
// //                         <UserAvatar user={belowMainArticle.createdBy} size={20} />
// //                         <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
// //                           {belowMainArticle.createdBy?.name || "EMS"} |{" "}
// //                           {formatFullDateTime(belowMainArticle.publishedAt)}
// //                         </small>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //                 {grayLine}
// //               </div>
// //             )}
// //           </Col>

// //           {/* ==== Right Side ==== */}
// //           <Col xs={12} md={7}>
// //             <Row>
// //               {[...sideArticles, ...farRightArticles].map((article, index, arr) => (
// //                 <Col xs={12} sm={6} key={article._id} className="mb-3">
// //                   <Link
// //                     to={`/news/${article.slug_en || article._id}`}
// //                     state={{ relatedArticles: newsData }}
// //                     style={linkStyle}
// //                   >
// //                     <div className="d-flex">
// //                       <div className="flex-shrink-0 me-2">
// //                         <MediaRenderer
// //                           media={article.media}
// //                           alt={article.title_hi || article.title_en}
// //                           width="100px"
// //                           height="90px"
// //                           objectFit="cover"
// //                         />
// //                       </div>
// //                       <div>
// //                         <p className="fw-bold small mb-1" style={truncateStyle}>
// //                           {article.title_hi || article.title_en}
// //                         </p>
// //                         <div className="d-flex align-items-center">
// //                           <UserAvatar user={article.createdBy} size={20} />
// //                           <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.75rem" }}>
// //                             {article.createdBy?.name || "EMS"} |{" "}
// //                             {formatFullDateTime(article.publishedAt)}
// //                           </small>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </Link>
// //                   {/* ✅ Gray line after every card (including last) */}
// //                   {grayLine}
// //                 </Col>
// //               ))}
// //             </Row>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default SportsSection;


// // import React, { useEffect, useState } from "react";
// // import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// // import { Link } from "react-router-dom";
// // import { allNews } from "../../Services/authApi";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
// //   const firstMedia = media?.[0];
// //   const isVideo = firstMedia && firstMedia.type === "video";
// //   const mediaUrl = firstMedia?.url;

// //   const commonStyles = {
// //     width,
// //     height,
// //     objectFit,
// //     borderRadius,
// //     backgroundColor: "#e0e0e0",
// //     display: "block",
// //   };

// //   if (isVideo) {
// //     return mediaUrl ? (
// //       <video src={mediaUrl} width={width} height={height} autoPlay muted loop style={commonStyles} />
// //     ) : (
// //       <Image
// //         src={`https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=VIDEO+MISSING`}
// //         alt={alt}
// //         style={commonStyles}
// //       />
// //     );
// //   } else {
// //     const imageSrc =
// //       mediaUrl ||
// //       `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=No+Media`;
// //     return (
// //       <Image
// //         src={imageSrc}
// //         alt={alt}
// //         style={commonStyles}
// //         onError={(e) => {
// //           e.target.src = `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=Error`;
// //         }}
// //       />
// //     );
// //   }
// // };

// // const SportsSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         const res = await allNews();
// //         if (res?.success) {
// //           const sportsNews = res.data.filter((item) => {
// //             const categoryName = item.category?.name?.toLowerCase() || "";
// //             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
// //             return (
// //               categoryName === "sports" ||
// //               categoryName === "खेल" ||
// //               subCategoryName === "cricket"
// //             );
// //           });
// //           setNewsData(sportsNews);
// //         } else setError("Failed to load news");
// //       } catch (err) {
// //         setError(err.message || "Error fetching news");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return "";
// //     const options = {
// //       day: "numeric",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hourCycle: "h23",
// //     };
// //     return new Date(dateString).toLocaleString("hi-IN", options);
// //   };

// //   if (loading)
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" />
// //       </div>
// //     );

// //   if (error) return <Alert variant="danger" className="my-4">{error}</Alert>;
// //   if (newsData.length === 0) return null;

// //   const mainArticle = newsData[0];
// //   const belowMainArticle = newsData[1];
// //   const sideArticles = newsData.slice(2, 5);
// //   const farRightArticles = newsData.slice(5, 8);

// //   const linkStyle = { textDecoration: "none", color: "inherit", display: "block" };
// //   const mutedTextStyle = { color: "rgba(0, 0, 0, 0.75)" };

// //   // ✅ CSS Fix: Ensure text wraps and breaks within container
// //   const truncateStyle = {
// //     display: "-webkit-box",
// //     WebkitLineClamp: 3, 
// //     WebkitBoxOrient: "vertical",
// //     overflow: "hidden",
// //     wordBreak: "break-word", // Prevents long words from overflowing
// //     width: "100%", // Ensures it respects parent width
// //   };

// //   const grayLine = (
// //     <div
// //       style={{
// //         height: "1px",
// //         backgroundColor: "#d3d3d3",
// //         marginTop: "12px",
// //         marginBottom: "12px",
// //       }}
// //     ></div>
// //   );

// //   return (
// //     <div className="mt-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
// //       <Container fluid className="py-4">
// //         {/* ==== Section Header ==== */}
// //         <div className="d-flex align-items-center mb-3">
// //           <div
// //             style={{
// //               width: "5px",
// //               height: "28px",
// //               backgroundColor: "#A12D2A",
// //               marginRight: "10px",
// //             }}
// //           ></div>
// //           <h5 className="fw-bold mb-0 text-black">खेल</h5>
// //           <div className="flex-grow-1 mx-2">
// //             <hr className="border-2 border-danger opacity-100 my-0" />
// //           </div>
// //           <Link
// //             to="/sports"
// //             className="text-decoration-none fw-bold small flex-shrink-0"
// //             style={{ color: "#2E6E9E" }}
// //           >
// //             और देखें
// //           </Link>
// //         </div>

// //         <Row>
// //           {/* ==== Left Side (Main Article) ==== */}
// //           <Col xs={12} md={5} className="mb-3">
// //             {mainArticle && (
// //               <Link
// //                 to={`/news/${mainArticle.slug_en || mainArticle._id}`}
// //                 state={{ relatedArticles: newsData }}
// //                 style={linkStyle}
// //               >
// //                 <div className="rounded overflow-hidden mb-2" style={{ height: "200px", width: "100%" }}>
// //                   <MediaRenderer
// //                     media={mainArticle.media}
// //                     alt={mainArticle.title_hi || mainArticle.title_en}
// //                     width="100%"
// //                     height="100%"
// //                     objectFit="cover"
// //                   />
// //                 </div>
// //                 {/* Wrap text in a block to control width */}
// //                 <div style={{ width: "100%" }}>
// //                   <h6 className="fw-bold mb-1" style={{ fontSize: "1.1rem", ...truncateStyle }}>
// //                     {mainArticle.title_hi || mainArticle.title_en}
// //                   </h6>
// //                   <div className="d-flex align-items-center mt-2 mb-3">
// //                     <UserAvatar user={mainArticle.createdBy} size={25} />
// //                     <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
// //                       {mainArticle.createdBy?.name || "EMS News"} |{" "}
// //                       {formatFullDateTime(mainArticle.publishedAt)}
// //                     </small>
// //                   </div>
// //                 </div>
// //               </Link>
// //             )}

// //             {grayLine}

// //             {/* ==== Below Main Article ==== */}
// //             {belowMainArticle && (
// //               <div>
// //                 <Link
// //                   to={`/news/${belowMainArticle.slug_en || belowMainArticle._id}`}
// //                   state={{ relatedArticles: newsData }}
// //                   style={linkStyle}
// //                 >
// //                   <div className="d-flex align-items-start"> {/* align-items-start prevents stretching */}
// //                     <div className="flex-shrink-0 me-3" style={{ width: "100px", height: "90px" }}>
// //                       <MediaRenderer
// //                         media={belowMainArticle.media}
// //                         alt={belowMainArticle.title_hi || belowMainArticle.title_en}
// //                         width="100%"
// //                         height="100%"
// //                         objectFit="cover"
// //                       />
// //                     </div>
// //                     {/* ✅ FIX: flex-grow-1 and minWidth: 0 is crucial for text truncation inside flex */}
// //                     <div className="flex-grow-1" style={{ minWidth: 0 }}>
// //                       <p className="fw-bold small mb-1" style={truncateStyle}>
// //                         {belowMainArticle.title_hi || belowMainArticle.title_en}
// //                       </p>
// //                       <div className="d-flex align-items-center mt-1">
// //                         <UserAvatar user={belowMainArticle.createdBy} size={20} />
// //                         <small className="ms-2 text-truncate" style={{ ...mutedTextStyle, fontSize: "0.75rem", maxWidth: "100%" }}>
// //                           {belowMainArticle.createdBy?.name || "EMS"} |{" "}
// //                           {formatFullDateTime(belowMainArticle.publishedAt).split(',')[0]}
// //                         </small>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </Link>
// //                 {grayLine}
// //               </div>
// //             )}
// //           </Col>

// //           {/* ==== Right Side (Side Articles + Far Right) ==== */}
// //           <Col xs={12} md={7}>
// //             <Row>
// //               {[...sideArticles, ...farRightArticles].map((article) => (
// //                 <Col xs={12} sm={6} key={article._id} className="mb-3">
// //                   <Link
// //                     to={`/news/${article.slug_en || article._id}`}
// //                     state={{ relatedArticles: newsData }}
// //                     style={linkStyle}
// //                   >
// //                     <div className="d-flex align-items-start">
// //                       <div className="flex-shrink-0 me-3" style={{ width: "100px", height: "90px" }}>
// //                         <MediaRenderer
// //                           media={article.media}
// //                           alt={article.title_hi || article.title_en}
// //                           width="100%"
// //                           height="100%"
// //                           objectFit="cover"
// //                         />
// //                       </div>
                      
// //                       {/* ✅ FIX: minWidth: 0 prevents overflow */}
// //                       <div className="flex-grow-1" style={{ minWidth: 0 }}>
// //                         <p className="fw-bold small mb-1" style={truncateStyle}>
// //                           {article.title_hi || article.title_en}
// //                         </p>
// //                         <div className="d-flex align-items-center mt-1">
// //                           <UserAvatar user={article.createdBy} size={20} />
// //                           <small className="ms-2 text-truncate" style={{ ...mutedTextStyle, fontSize: "0.75rem", maxWidth: "100%" }}>
// //                             {article.createdBy?.name || "EMS"} |{" "}
// //                             {formatFullDateTime(article.publishedAt).split(',')[0]}
// //                           </small>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </Link>
// //                   {grayLine}
// //                 </Col>
// //               ))}
// //             </Row>
// //           </Col>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default SportsSection;

// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import { allNews } from "../../Services/authApi";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // // 🖼️ Media Renderer Component (Same as before)
// // const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "5px" }) => {
// //   const firstMedia = media?.[0];
// //   const isVideo = firstMedia && firstMedia.type === "video";
// //   const mediaUrl = firstMedia?.url;

// //   const commonStyles = {
// //     width,
// //     height,
// //     objectFit,
// //     borderRadius,
// //     backgroundColor: "#e0e0e0",
// //     display: "block",
// //   };

// //   if (isVideo) {
// //     return mediaUrl ? (
// //       <video src={mediaUrl} width={width} height={height} autoPlay muted loop style={commonStyles} />
// //     ) : (
// //       <Image
// //         src={`https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=VIDEO+MISSING`}
// //         alt={alt}
// //         style={commonStyles}
// //       />
// //     );
// //   } else {
// //     const imageSrc =
// //       mediaUrl ||
// //       `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=No+Media`;
// //     return (
// //       <Image
// //         src={imageSrc}
// //         alt={alt}
// //         style={commonStyles}
// //         onError={(e) => {
// //           e.target.src = `https://via.placeholder.com/${parseInt(width)}x${parseInt(height)}?text=Error`;
// //         }}
// //       />
// //     );
// //   }
// // };

// // const SportsSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         const res = await allNews();
// //         if (res?.success) {
// //           // ✅ Sports Filter Logic preserved
// //           const sportsNews = res.data.filter((item) => {
// //             const categoryName = item.category?.name?.toLowerCase() || "";
// //             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
// //             return (
// //               categoryName === "sports" ||
// //               categoryName === "खेल" ||
// //               subCategoryName === "cricket"
// //             );
// //           });
// //           setNewsData(sportsNews);
// //         } else setError("Failed to load news");
// //       } catch (err) {
// //         setError(err.message || "Error fetching news");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return "";
// //     const options = { day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
// //     return new Date(dateString).toLocaleString("hi-IN", options);
// //   };

// //   if (loading)
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" />
// //         <p>खेल समाचार लोड हो रहे हैं...</p>
// //       </div>
// //     );

// //   if (error)
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         Error: {error}
// //       </Alert>
// //     );

// //   if (newsData.length === 0) return null;

// //   // 📰 News Distribution (Matching Manoranjan Layout Logic)
// //   const mainArticle = newsData[0];
// //   const bottomArticle = newsData[1];
// //   const sideArticles = newsData.slice(2, 6); // ✅ 4 cards for the right side

// //   return (
// //     <Container fluid className="mt-4">
// //       {/* Header */}
// //       <div className="d-flex align-items-center mb-3 flex-wrap">
// //         <div style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }} className="me-2"></div>
// //         <h5 className="fw-bold m-0">खेल</h5>
// //         <hr className="flex-grow-1 mx-3 border-danger border-2 opacity-100 my-0" />
// //         <Link to="/sports" className="text-decoration-none fw-bold small" style={{ color: "#2E6E9E" }}>
// //           और देखें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       <Row>
// //         {/* LEFT SIDE (Main Big + 1 Small Bottom) */}
// //         <Col lg={7} className="mb-4">
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle.slug_en || mainArticle._id}`}
// //               className="d-block position-relative mb-4"
// //               style={{ textDecoration: "none", color: "inherit" }}
// //             >
// //               {/* Main Big Image */}
// //               <MediaRenderer media={mainArticle.media} alt={mainArticle.title_hi} width="100%" height="301px" />
              
// //               {/* Gradient Overlay & Title */}
// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)" }}
// //               >
// //                 <h4 className="fw-bold">{mainArticle.title_hi || mainArticle.title_en}</h4>
// //                 <div className="d-flex align-items-center flex-wrap mt-1">
// //                   <UserAvatar user={mainArticle.createdBy} size={30} />
// //                   <small className="ms-2">
// //                     {mainArticle.createdBy?.name || "EMS News"} | {formatFullDateTime(mainArticle.publishedAt)}
// //                   </small>
// //                 </div>
// //               </div>
// //             </Link>
// //           )}

// //           {bottomArticle && (
// //             <>
// //               <Link
// //                 to={`/news/${bottomArticle.slug_en || bottomArticle._id}`}
// //                 className="d-block"
// //                 style={{ textDecoration: "none", color: "inherit" }}
// //               >
// //                 <Row className="align-items-center gx-2">
// //                   <Col xs={4} md={3}>
// //                     <MediaRenderer media={bottomArticle.media} alt={bottomArticle.title_hi} width="100%" height="90px" />
// //                   </Col>
// //                   <Col xs={8} md={9}>
// //                     <p className="fw-bold mb-1">{bottomArticle.title_hi || bottomArticle.title_en}</p>
// //                     <div className="d-flex align-items-center">
// //                       <UserAvatar user={bottomArticle.createdBy} size={25} />
// //                       <small className="ms-2 text-muted">
// //                         {bottomArticle.createdBy?.name || "EMS News"} | {formatFullDateTime(bottomArticle.publishedAt)}
// //                       </small>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               </Link>

// //               {/* Gray Line */}
// //               <div style={{ height: "1px", backgroundColor: "#dcdcdc", marginTop: "10px", marginBottom: "10px" }}></div>
// //             </>
// //           )}
// //         </Col>

// //         {/* RIGHT SIDE (List of 4 cards) */}
// //         <Col lg={5}>
// //           {sideArticles.map((article, index) => (
// //             <div key={article._id || index}>
// //               <Link
// //                 to={`/news/${article.slug_en || article._id}`}
// //                 className="d-block mb-2"
// //                 style={{ textDecoration: "none", color: "inherit" }}
// //               >
// //                 <Row className="align-items-center gx-2 mb-2">
// //                   <Col xs={4}>
// //                     <MediaRenderer media={article.media} alt={article.title_hi} width="100%" height="90px" />
// //                   </Col>
// //                   <Col xs={8}>
// //                     <p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
// //                       {article.title_hi || article.title_en}
// //                     </p>
// //                     <div className="d-flex align-items-center">
// //                       <UserAvatar user={article.createdBy} size={25} />
// //                       <small className="text-muted ms-1">
// //                         {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.publishedAt)}
// //                       </small>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               </Link>

// //               {/* Gray Line */}
// //               <div style={{ height: "1px", backgroundColor: "#dcdcdc", marginBottom: "10px" }}></div>
// //             </div>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default SportsSection;

// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { allNews } from "../../Services/authApi";
// // import { Link } from "react-router-dom";
// // // Note: UserAvatar is removed to match the specific BusinessSection text-layout perfectly, 
// // // but you can add it back if you prefer icons.

// // // 🖼️ Media Renderer Helper Component
// // const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
// //   const firstMedia = media?.[0];
// //   const isVideo = firstMedia && firstMedia.type === 'video';
// //   const mediaUrl = firstMedia?.url;

// //   const commonStyles = {
// //     width: width,
// //     height: height,
// //     objectFit: objectFit,
// //     borderRadius: borderRadius,
// //     backgroundColor: "#e0e0e0",
// //     display: "block",
// //     position: "relative",
// //     zIndex: 0,
// //   };

// //   if (isVideo) {
// //     if (mediaUrl) {
// //       return (
// //         <video
// //           src={mediaUrl}
// //           width={width}
// //           height={height}
// //           controls={false}
// //           autoPlay
// //           muted
// //           loop
// //           style={commonStyles}
// //         >
// //           Your browser does not support the video tag.
// //         </video>
// //       );
// //     } else {
// //       const placeholderWidth = parseInt(width) || 150;
// //       const placeholderHeight = parseInt(height) || 90;
// //       return (
// //         <Image
// //           src={`https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=VIDEO+URL+MISSING`}
// //           alt={alt}
// //           style={commonStyles}
// //         />
// //       );
// //     }
// //   } else {
// //     const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
// //     return (
// //       <Image
// //         src={imageSrc}
// //         alt={alt}
// //         style={commonStyles}
// //         onError={(e) => {
// //           const placeholderWidth = parseInt(width) || 150;
// //           const placeholderHeight = parseInt(height) || 90;
// //           e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
// //         }}
// //       />
// //     );
// //   }
// // };

// // const SportsSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const res = await allNews();
// //         if (res?.success) {
// //           // ✅ Sports Filter Logic
// //           const sportsNews = res.data.filter((item) => {
// //             const categoryName = item.category?.name?.toLowerCase() || "";
// //             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
// //             return (
// //               categoryName === "sports" ||
// //               categoryName === "खेल" ||
// //               subCategoryName === "cricket"
// //             );
// //           });
// //           setNewsData(sportsNews || []);
// //         } else {
// //           setError(res?.message || "Failed to load Sports news.");
// //         }
// //       } catch (err) {
// //         setError(err.message || "An error occurred while fetching news.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   // ✅ Consistent Date-Time Formatter
// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return "समय उपलब्ध नहीं";
// //     const dateObj = new Date(dateString);
// //     if (isNaN(dateObj.getTime())) return "Invalid Date";

// //     return dateObj.toLocaleString("hi-IN", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hourCycle: 'h23',
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" variant="primary" />
// //         <p className="mt-2">खेल समाचार लोड हो रहे हैं...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         त्रुटि: {error}
// //       </Alert>
// //     );
// //   }

// //   if (newsData?.length === 0) {
// //     return (
// //       <Container fluid className="mt-4">
// //         <div className="d-flex align-items-center mb-3">
// //           <div className="d-flex align-items-center flex-shrink-0">
// //             <div
// //               style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
// //               className="me-2"
// //             ></div>
// //             <h5 className="fw-bold m-0">खेल</h5>
// //           </div>
// //           <hr
// //             className="flex-grow-1 mx-3"
// //             style={{ borderTop: `2px solid #A12D2A`, opacity: 1 }}
// //           />
// //           <Link
// //             to="/sports"
// //             className="text-decoration-none fw-bold small flex-shrink-0"
// //             style={{ color: "#005f8bff" }}
// //           >
// //             और पढ़ें <FaArrowRight size={12} />
// //           </Link>
// //         </div>
// //         <Alert variant="info" className="my-4">
// //           कोई खेल समाचार उपलब्ध नहीं है।
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   // 📰 News Distribution Logic
// //   const mainArticle = newsData?.[0];
// //   const bottomArticle = newsData?.[1];
// //   const sideArticles = newsData?.slice(2, 6);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };
// //   const accentColor = "#A12D2A";
// //   const linkColor = "#005f8bff";

// //   return (
// //     <Container fluid className="mt-4">
// //       {/* Header */}
// //       <div className="d-flex align-items-center mb-3">
// //         <div className="d-flex align-items-center flex-shrink-0">
// //           <div
// //             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
// //             className="me-2"
// //           ></div>
// //           <h5 className="fw-bold m-0">खेल</h5>
// //         </div>
// //         <hr
// //           className="flex-grow-1 mx-3"
// //           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
// //         />
// //         <Link
// //           to="/sports"
// //           className="text-decoration-none fw-bold small flex-shrink-0"
// //           style={{ color: linkColor }}
// //         >
// //           और पढ़ें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       <Row>
// //         {/* ==== Main Article Column (Left) ==== */}
// //         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //               className="d-block position-relative mb-4 flex-grow-1"
// //             >
// //               <MediaRenderer
// //                 media={mainArticle?.media}
// //                 alt={mainArticle?.title_hi || mainArticle?.title_en || "Sports News"}
// //                 width="100%"
// //                 height="320px"
// //                 objectFit="cover"
// //                 borderRadius="8px"
// //               />
// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{
// //                   background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
// //                   borderRadius: "0 0 8px 8px",
// //                 }}
// //               >
// //                 <h5 className="fw-bold text-wrap">
// //                   {mainArticle?.title_hi || mainArticle?.title_en}
// //                 </h5>
// //                 <small className="d-block text-light">
// //                   {mainArticle?.createdBy?.name || "EMS News"} |{" "}
// //                   {formatFullDateTime(mainArticle?.publishedAt || mainArticle?.createdAt)}
// //                 </small>
// //               </div>
// //             </Link>
// //           )}

// //           {/* ==== Bottom Article (Under Main) ==== */}
// //           {bottomArticle && (
// //             <Link
// //               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //             >
// //               <Row className="align-items-center">
// //                 <Col xs={4} sm={3}>
// //                   <MediaRenderer
// //                     media={bottomArticle?.media}
// //                     alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Sports News"}
// //                     width="100%"
// //                     height="90px"
// //                     objectFit="cover"
// //                     borderRadius="8px"
// //                   />
// //                 </Col>
// //                 <Col xs={8} sm={9} className="ps-2">
// //                   <p className="fw-bold mb-1 text-wrap">
// //                     {bottomArticle?.title_hi || bottomArticle?.title_en}
// //                   </p>
// //                   <p className="text-muted small m-0">
// //                     {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
// //                     {formatFullDateTime(bottomArticle?.publishedAt || bottomArticle?.createdAt)}
// //                   </p>
// //                 </Col>
// //               </Row>
// //             </Link>
// //           )}
// //         </Col>

// //         {/* ==== Side Articles Column (Right) ==== */}
// //         <Col lg={5}>
// //           {sideArticles?.map((article, index) => (
// //             <React.Fragment key={article?._id || index}>
// //               <Link
// //                 to={`/news/${article?.slug_en || article?._id}`}
// //                 state={{ relatedArticles: newsData }}
// //                 style={linkStyle}
// //               >
// //                 <Row className="align-items-center">
// //                   <Col xs={4}>
// //                     <MediaRenderer
// //                       media={article?.media}
// //                       alt={article?.title_hi || article?.title_en || "Sports News"}
// //                       width="100%"
// //                       height="90px"
// //                       objectFit="cover"
// //                       borderRadius="8px"
// //                     />
// //                   </Col>
// //                   <Col xs={8} className="ps-2">
// //                     <p
// //                       className="fw-bold mb-1 text-wrap"
// //                       style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
// //                     >
// //                       {article?.title_hi || article?.title_en}
// //                     </p>
// //                     <p className="text-muted small m-0">
// //                       {article?.createdBy?.name || "EMS News"} |{" "}
// //                       {formatFullDateTime(article?.publishedAt || article?.createdAt)}
// //                     </p>
// //                   </Col>
// //                 </Row>
// //               </Link>
// //               {/* Divider between items */}
// //               {index < sideArticles.length - 1 && <hr className="my-3" />}
// //             </React.Fragment>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default SportsSection;

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

// const SportsSection = () => {
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
//           // ✅ Sports Filter Logic
//           const sportsNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             const subCategoryName = item.subCategory?.name?.toLowerCase() || "";
//             return (
//               categoryName === "sports" ||
//               categoryName === "खेल" ||
//               subCategoryName === "cricket"
//             );
//           });
//           setNewsData(sportsNews || []);
//         } else {
//           setError(res?.message || "Failed to load Sports news.");
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
//         {error}
//       </Alert>
//     );
//   }

//   // ✅ No Data check removed from here to allow returning empty container if needed, 
//   // but kept consistent with logic below.
//   if (newsData?.length === 0) {
//     return (
//       <Container fluid className="mt-4">
//         <div className="d-flex align-items-center mb-3">
//           <div className="d-flex align-items-center flex-shrink-0">
//             <div
//               style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
//               className="me-2"
//             ></div>
//             <h5 className="fw-bold m-0">खेल</h5>
//           </div>
//           <hr
//             className="flex-grow-1 mx-3"
//             style={{ borderTop: `2px solid #A12D2A`, opacity: 1 }}
//           />
//           <Link
//             to="/sports"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#005f8bff" }}
//           >
//             और पढ़ें <FaArrowRight size={12} />
//           </Link>
//         </div>
//         <Alert variant="info" className="my-4">
//           कोई खेल समाचार उपलब्ध नहीं है।
//         </Alert>
//       </Container>
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
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="d-flex align-items-center flex-shrink-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">खेल</h5>
//         </div>
//         <hr
//           className="flex-grow-1 mx-3"
//           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
//         />
//         <Link
//           to="/sports"
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//           और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       <Row>
//         {/* ==== Main Article Column (Left) ==== */}
//         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
//           {mainArticle && (
//             <Link
//               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//               className="d-block position-relative mb-4 flex-grow-1"
//             >
//               <MediaRenderer
//                 media={mainArticle?.media}
//                 alt={mainArticle?.title_hi || mainArticle?.title_en || "Sports News"}
//                 width="100%"
//                 // height="320px"
//                 height={window.innerWidth <= 576 ? "220px" : "320px"}
//                 objectFit="cover"
//                 borderRadius="8px"
//               />
//               <div
//                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
//                 style={{
//                   background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
//                   borderRadius: "0 0 8px 8px",
//                 }}
//               >
//                 {/* <h5 className="fw-bold text-wrap">
//                   {mainArticle?.title_hi || mainArticle?.title_en}
//                 </h5> */}

//                 <div 
//   className="news-headline-bold text-wrap" 
//   style={{ color: "white" }} // यहाँ आप जो भी कलर देंगे, वो पक्का दिखेगा
//   dangerouslySetInnerHTML={{ __html: mainArticle?.title_hi || mainArticle?.title_en || "" }} 
// />
                
//                 {/* ✅ User Avatar Added (White Text) */}
//                 <div className="d-flex align-items-center mt-2">
//                   <UserAvatar user={mainArticle?.createdBy} size={25} />
//                   <small className="ms-2 text-light">
//                     {mainArticle?.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(mainArticle?.publishedAt || mainArticle?.createdAt)}
//                   </small>
//                 </div>
//               </div>
//             </Link>
//           )}

//           {/* ==== Bottom Article (Under Main) ==== */}
//           {bottomArticle && (
//             <Link
//               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
//               state={{ relatedArticles: newsData }}
//               style={linkStyle}
//             >
//               <Row className="align-items-center">
//                 <Col xs={4} sm={3}>
//                   <MediaRenderer
//                     media={bottomArticle?.media}
//                     alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Sports News"}
//                     width="100%"
//                     height="90px"
//                     objectFit="cover"
//                     borderRadius="8px"
//                   />
//                 </Col>
//                 <Col xs={8} sm={9} className="ps-2">
//                   {/* <p className="fw-bold mb-1 text-wrap">
//                     {bottomArticle?.title_hi || bottomArticle?.title_en}
//                   </p> */}
                  
//                           <div 
//                     // className="fw-bold mb-1"
//                         className="news-headline-master mb-1"
//                     dangerouslySetInnerHTML={{ __html: bottomArticle?.title_hi || bottomArticle?.title_en }} 
//                   />

//                   {/* ✅ User Avatar Added */}
//                   <div className="d-flex align-items-center mt-1">
//                     <UserAvatar user={bottomArticle?.createdBy} size={20} />
//                     <small className="text-muted ms-1">
//                       {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(bottomArticle?.publishedAt || bottomArticle?.createdAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//           )}
//         </Col>

//         {/* ==== Side Articles Column (Right) ==== */}
//         <Col lg={5}>
//           {sideArticles?.map((article, index) => (
//             <React.Fragment key={article?._id || index}>
//               <Link
//                 to={`/news/${article?.slug_en || article?._id}`}
//                 state={{ relatedArticles: newsData }}
//                 style={linkStyle}
//               >
//                 <Row className="align-items-center">
//                   <Col xs={4}>
//                     <MediaRenderer
//                       media={article?.media}
//                       alt={article?.title_hi || article?.title_en || "Sports News"}
//                       width="100%"
//                       height="90px"
//                       objectFit="cover"
//                       borderRadius="8px"
//                     />
//                   </Col>
//                   <Col xs={8} className="ps-2">
//                     {/* <p
//                       className="fw-bold mb-1 text-wrap"
//                       style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
//                     >
//                       {article?.title_hi || article?.title_en}
//                     </p> */}

//                         <div 
//                     // className="fw-bold mb-1"
//                         className="news-headline-master mb-1"
//                     dangerouslySetInnerHTML={{ __html: article?.title_hi || article?.title_en }} 
//                   />

                    
//                     {/* ✅ User Avatar Added */}
//                     <div className="d-flex align-items-center mt-1">
//                       <UserAvatar user={article?.createdBy} size={20} />
//                       <small className="text-muted ms-1">
//                         {article?.createdBy?.name || "EMS News"} |{" "}
//                         {formatFullDateTime(article?.publishedAt || article?.createdAt)}
//                       </small>
//                     </div>
//                   </Col>
//                 </Row>
//               </Link>
//               {/* Divider between items */}
//               {index < sideArticles.length - 1 && <hr className="my-3" />}
//             </React.Fragment>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SportsSection;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Alert } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserAvatar from "../Main_NewsDetails/UserAvatar";
import { useNews } from "../../context/NewsContext";

// 🖼️ Media Renderer Helper Component
const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
  const firstMedia = media?.[0];
  const isVideo = firstMedia && firstMedia.type === 'video';
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
    const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 150}x${parseInt(height) || 90}?text=No+Media`;
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={commonStyles}
        onError={(e) => {
          const placeholderWidth = parseInt(width) || 150;
          const placeholderHeight = parseInt(height) || 90;
          e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
        }}
      />
    );
  }
};

const Manoranjan = () => {
  // ✅ Apna fetch hata diya — ab Context se data
  const { categorized, loading, error } = useNews();
  const newsData = categorized["entertainment"] || categorized["मनोरंजन"] || [];

  // ✅ window.innerWidth direct render mein use karna risky hai (resize pe update nahi hota,
  // aur SSR mein crash karta hai). Proper state + listener use kiya — TopStory jaisa pattern.
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 576 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Consistent Date-Time Formatter
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
      hourCycle: 'h23',
    });
  };

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2"></p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4">
         {error}
      </Alert>
    );
  }

  // 📰 News Distribution Logic
  const mainArticle = newsData?.[0];
  const bottomArticle = newsData?.[1];
  const sideArticles = newsData?.slice(2, 6);

  const linkStyle = { textDecoration: "none", color: "inherit" };
  const accentColor = "#A12D2A";
  const linkColor = "#005f8bff";

  return (
    <Container fluid className="mt-4">
      {/* ✅ Header (Only appears once) */}
      <div className="d-flex align-items-center mb-3">
        <div className="d-flex align-items-center flex-shrink-0">
          <div
            style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
            className="me-2"
          ></div>
          <h5 className="fw-bold m-0">मनोरंजन</h5>
        </div>
        <hr
          className="flex-grow-1 mx-3"
          style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
        />
        <Link
          to="/entertainment"
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: linkColor }}
        >
         और देखें <FaArrowRight size={12} />
        </Link>
      </div>

      {/* ✅ Content Block */}
      {newsData.length === 0 ? (
        <Alert variant="info" className="my-4">
          कोई मनोरंजन समाचार उपलब्ध नहीं है।
        </Alert>
      ) : (
        <Row>
          {/* ==== Main Article Column (Left) ==== */}
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
                  height={isMobile ? "220px" : "320px"}
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
                  {/* ✅ User Avatar Added (White text for overlay) */}
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

            {/* ==== Bottom Article (Under Main) ==== */}
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

                    {/* ✅ User Avatar Added */}
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

          {/* ==== Side Articles Column (Right) ==== */}
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

                      {/* ✅ User Avatar Added */}
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
                {/* Divider between items */}
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