
// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { allNews } from "../../Services/authApi";
// // import { Link } from "react-router-dom";

// // const BusinessSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         const res = await allNews();
// //         if (res?.success) {
// //           // ✅ Category का नाम API में हिंदी/English दोनों हो सकता है
// //           const businessNews = res?.data?.filter(
// //             (item) =>
// //               item?.category?.name === "Business" ||
// //               item?.category?.name === "बिज़नेस"
// //           );
// //           setNewsData(businessNews || []);
// //         } else {
// //           setError("Failed to load news");
// //         }
// //       } catch (err) {
// //         setError(err.message || "Unknown error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" variant="primary" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         Error loading news: {error}
// //       </Alert>
// //     );
// //   }

// //   if (newsData?.length === 0) {
// //     return null; // ✅ Agar news hi nahi hai toh section hide
// //   }

// //   // ✅ Safe destructure
// //   const mainArticle = newsData?.[0];
// //   const bottomArticle = newsData?.[1];
// //   const sideArticles = newsData?.slice(2, 6);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };

// //   return (
// //     <Container fluid className="mt-4">
// //       {/* Section Header */}
// //       <div className="d-flex align-items-center mb-3">
// //         <div className="d-flex align-items-center flex-shrink-0">
// //           <div
// //             style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
// //             className="me-2"
// //           ></div>
// //           <h5 className="fw-bold m-0">बिज़नेस</h5>
// //         </div>
// //         <hr
// //           className="flex-grow-1 mx-3"
// //           style={{ borderTop: "2px solid #A12D2A", opacity: 1 }}
// //         />
// //         <Link
// //           to="/category/Business"
// //           className="text-decoration-none fw-bold small flex-shrink-0"
// //           style={{ color: "#005f8bff" }}
// //         >
// //           और पढ़ें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       {/* Main Content Grid */}
// //       <Row>
// //         {/* Left Column */}
// //         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
// //           {/* ✅ Main Article */}
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`} // ✅ Slug preferred
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //               className="d-block position-relative mb-4 flex-grow-1"
// //             >
// //               <Image
// //   src={
// //     mainArticle?.media?.[0]?.url || 
// //     "https://via.placeholder.com/600x400"
// //   }
// //   className="rounded w-100"
// //   style={{ 
// //     objectFit: "cover", 
// //     height: "320px" // ✅ यहाँ अपनी desired height डालें
// //   }}
// // />

// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{
// //                   background:
// //                     "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
// //                   borderRadius:
// //                     "0 0 var(--bs-border-radius) var(--bs-border-radius)",
// //                 }}
// //               >
// //                 {/* ✅ Title Hindi preferred */}
// //                 <h5 className="fw-bold">
// //                   {mainArticle?.title_hi || mainArticle?.title_en}
// //                 </h5>

// //                 {/* ✅ Author + Date */}
// //                 <small className="d-block text-light">
// //                   {mainArticle?.createdBy?.name || "EMS News"} •{" "}
// //                   {mainArticle?.createdAt
// //                     ? new Date(mainArticle?.createdAt).toLocaleDateString(
// //                         "hi-IN",
// //                         { day: "numeric", month: "short", year: "numeric" }
// //                       )
// //                     : ""}
// //                 </small>
// //               </div>
// //             </Link>
// //           )}

// //           {/* ✅ Bottom Article */}
// //           {bottomArticle && (
// //             <Link
// //               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //             >
// //               <Row className="align-items-center">
// //                 <Col xs={4} sm={3}>
// //                   <Image
// //                     src={
// //                       bottomArticle?.media?.[0]?.url ||
// //                       "https://via.placeholder.com/120x80"
// //                     }
// //                     fluid
// //                     rounded
// //                   />
// //                 </Col>
// //                 <Col xs={8} sm={9} className="ps-2">
// //                   <div>
// //                     <p className="fw-bold mb-1">
// //                       {bottomArticle?.title_hi || bottomArticle?.title_en}
// //                     </p>
// //                     <p className="text-muted small m-0">
// //                       {bottomArticle?.createdBy?.name || "EMS News"} •{" "}
// //                       {bottomArticle?.createdAt
// //                         ? new Date(bottomArticle?.createdAt).toLocaleDateString(
// //                             "hi-IN",
// //                             { day: "numeric", month: "short", year: "numeric" }
// //                           )
// //                         : ""}
// //                     </p>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Link>
// //           )}
// //         </Col>

// //         {/* Right Column */}
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
// //                     <Image
// //                       src={
// //                         article?.media?.[0]?.url ||
// //                         "https://via.placeholder.com/120x80"
// //                       }
// //                       fluid
// //                       rounded
// //                     />
// //                   </Col>
// //                   <Col xs={8} className="ps-2">
// //                     <div>
// //                       <p
// //                         className="fw-medium mb-1"
// //                         style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
// //                       >
// //                         {article?.title_hi || article?.title_en}
// //                       </p>
// //                       <p className="text-muted small m-0">
// //                         {article?.createdBy?.name || "EMS News"} •{" "}
// //                         {article?.createdAt
// //                           ? new Date(article?.createdAt).toLocaleDateString(
// //                               "hi-IN",
// //                               {
// //                                 day: "numeric",
// //                                 month: "short",
// //                                 year: "numeric",
// //                               }
// //                             )
// //                           : ""}
// //                       </p>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               </Link>
// //               {index < sideArticles.length - 1 && <hr className="my-3" />}
// //             </React.Fragment>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default BusinessSection;




// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { allNews } from "../../Services/authApi";
// // import { Link } from "react-router-dom";

// // const BusinessSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         const res = await allNews();
// //         if (res?.success) {
// //           const businessNews = res?.data?.filter(
// //             (item) =>
// //               item?.category?.name === "Business" ||
// //               item?.category?.name === "बिज़नेस"
// //           );
// //           setNewsData(businessNews || []);
// //         } else {
// //           setError("Failed to load news");
// //         }
// //       } catch (err) {
// //         setError(err.message || "Unknown error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" variant="primary" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         Error loading news: {error}
// //       </Alert>
// //     );
// //   }

// //   if (newsData?.length === 0) {
// //     return null;
// //   }

// //   const mainArticle = newsData?.[0];
// //   const bottomArticle = newsData?.[1];
// //   const sideArticles = newsData?.slice(2, 6);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };

// //   // --- Styling Constants (can be moved to a CSS file or theme) ---
// //   const accentColor = "#A12D2A";
// //   const linkColor = "#005f8bff";
// //   // ----------------------------------------------------------------

// //   return (
// //     <Container fluid className="mt-4">
// //       {/* Section Header */}
// //       <div className="d-flex align-items-center mb-3">
// //         <div className="d-flex align-items-center flex-shrink-0">
// //           <div
// //             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
// //             className="me-2"
// //           ></div>
// //           <h5 className="fw-bold m-0">बिज़नेस</h5>
// //         </div>
// //         <hr
// //           className="flex-grow-1 mx-3"
// //           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
// //         />
// //         <Link
// //           to="/category/Business"
// //           className="text-decoration-none fw-bold small flex-shrink-0"
// //           style={{ color: linkColor }}
// //         >
// //           और पढ़ें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       {/* Main Content Grid */}
// //       <Row>
// //         {/* Left Column */}
// //         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
// //           {/* Main Article */}
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //               className="d-block position-relative mb-4 flex-grow-1"
// //             >
// //               <Image
// //                 src={
// //                   mainArticle?.media?.[0]?.url ||
// //                   "https://via.placeholder.com/600x400"
// //                 }
// //                 className="rounded w-100"
// //                 style={{
// //                   objectFit: "cover",
// //                   height: "320px", // Fixed height for consistency
// //                 }}
// //               />

// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{
// //                   background:
// //                     "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
// //                   borderRadius:
// //                     "0 0 var(--bs-border-radius) var(--bs-border-radius)",
// //                 }}
// //               >
// //                 <h5 className="fw-bold text-wrap">
// //                   {mainArticle?.title_hi || mainArticle?.title_en}
// //                 </h5>

// //                 <small className="d-block text-light">
// //                   {mainArticle?.createdBy?.name || "EMS News"} |{" "} {/* ✅ Changed from •{" "} to | */}
// //                   {mainArticle?.createdAt
// //                     ? new Date(mainArticle?.createdAt).toLocaleDateString(
// //                         "hi-IN",
// //                         { day: "numeric", month: "short", year: "numeric" }
// //                       )
// //                     : ""}
// //                 </small>
// //               </div>
// //             </Link>
// //           )}

// //           {/* Bottom Article */}
// //           {bottomArticle && (
// //             <Link
// //               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //             >
// //               <Row className="align-items-center">
// //                 <Col xs={4} sm={3}>
// //                   <Image
// //                     src={
// //                       bottomArticle?.media?.[0]?.url ||
// //                       "https://via.placeholder.com/120x80"
// //                     }
// //                     fluid
// //                     rounded
// //                     style={{ height: "80px", objectFit: "cover", width: "100%" }}
// //                   />
// //                 </Col>
// //                 <Col xs={8} sm={9} className="ps-2">
// //                   <div>
// //                     <p className="fw-bold mb-1 text-wrap">
// //                       {bottomArticle?.title_hi || bottomArticle?.title_en}
// //                     </p>
// //                     <p className="text-muted small m-0">
// //                       {bottomArticle?.createdBy?.name || "EMS News"} |{" "} {/* ✅ Changed from •{" "} to | */}
// //                       {bottomArticle?.createdAt
// //                         ? new Date(bottomArticle?.createdAt).toLocaleDateString(
// //                             "hi-IN",
// //                             { day: "numeric", month: "short", year: "numeric" }
// //                           )
// //                         : ""}
// //                     </p>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Link>
// //           )}
// //         </Col>

// //         {/* Right Column */}
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
// //                     <Image
// //                       src={
// //                         article?.media?.[0]?.url ||
// //                         "https://via.placeholder.com/120x80"
// //                       }
// //                       fluid
// //                       rounded
// //                       style={{ height: "80px", objectFit: "cover", width: "100%" }}
// //                     />
// //                   </Col>
// //                   <Col xs={8} className="ps-2">
// //                     <div>
// //                       <p
// //                         className="fw-bold mb-1 text-wrap"
// //                         style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
// //                       >
// //                         {article?.title_hi || article?.title_en}
// //                       </p>
// //                       <p className="text-muted small m-0">
// //                         {article?.createdBy?.name || "EMS News"} |{" "} {/* ✅ Changed from •{" "} to | */}
// //                         {article?.createdAt
// //                           ? new Date(article?.createdAt).toLocaleDateString(
// //                               "hi-IN",
// //                               {
// //                                 day: "numeric",
// //                                 month: "short",
// //                                 year: "numeric",
// //                               }
// //                             )
// //                           : ""}
// //                       </p>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               </Link>
// //               {index < sideArticles.length - 1 && <hr className="my-3" />}
// //             </React.Fragment>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default BusinessSection;
 


// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { allNews } from "../../Services/authApi";
// // import { Link } from "react-router-dom";
// // import UserAvatar from '../Main_NewsDetails/UserAvatar'; // सुनिश्चित करें कि यह इम्पोर्टेड है यदि आप इसका उपयोग कर रहे हैं

// // const BusinessSection = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       setLoading(true);
// //       setError(null); // हर बार नई फेचिंग से पहले एरर को रीसेट करें
// //       try {
// //         console.log("Fetching all news for Business section...");
// //         const res = await allNews();
// //         console.log("Business Section API Response:", res); // API से मिली पूरी प्रतिक्रिया देखें

// //         if (res?.success) {
// //           const businessNews = res?.data?.filter(
// //             (item) =>
// //               item?.category?.name?.toLowerCase() === "business" ||
// //               item?.category?.name === "बिज़नेस"
// //           );
// //           setNewsData(businessNews || []);
// //           console.log("Filtered Business News:", businessNews); // फिल्टर होने के बाद क्या बचा, वह देखें
// //           if (businessNews?.length === 0) {
// //             console.log("No business news found after filtering.");
// //           }
// //         } else {
// //           const errorMessage = res?.message || "Failed to load news due to API response issue.";
// //           setError(errorMessage);
// //           console.error("API call was not successful for Business section:", errorMessage);
// //         }
// //       } catch (err) {
// //         setError(err.message || "An error occurred during news fetch for Business section.");
// //         console.error("Error fetching news for Business section:", err); // नेटवर्क या अन्य हार्ड एरर देखें
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" variant="primary" />
// //         <p className="mt-2">बिज़नेस समाचार लोड हो रहे हैं...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         त्रुटि: {error}
// //         <p>कृपया सुनिश्चित करें कि API सही ढंग से चल रहा है और डेटा प्रदान कर रहा है।</p>
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
// //             <h5 className="fw-bold m-0">बिज़नेस</h5>
// //           </div>
// //           <hr
// //             className="flex-grow-1 mx-3"
// //             style={{ borderTop: `2px solid #A12D2A`, opacity: 1 }}
// //           />
// //           <Link
// //             to="/category/Business"
// //             className="text-decoration-none fw-bold small flex-shrink-0"
// //             style={{ color: "#005f8bff" }}
// //           >
// //             और पढ़ें <FaArrowRight size={12} />
// //           </Link>
// //         </div>
// //         <Alert variant="info" className="my-4">
// //           कोई बिज़नेस समाचार उपलब्ध नहीं है।
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   const mainArticle = newsData?.[0];
// //   const bottomArticle = newsData?.[1];
// //   const sideArticles = newsData?.slice(2, 6);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };

// //   const accentColor = "#A12D2A";
// //   const linkColor = "#005f8bff";

// //   return (
// //     <Container fluid className="mt-4">
// //       <div className="d-flex align-items-center mb-3">
// //         <div className="d-flex align-items-center flex-shrink-0">
// //           <div
// //             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
// //             className="me-2"
// //           ></div>
// //           <h5 className="fw-bold m-0">बिज़नेस</h5>
// //         </div>
// //         <hr
// //           className="flex-grow-1 mx-3"
// //           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
// //         />
// //         <Link
// //           to="/category/Business"
// //           className="text-decoration-none fw-bold small flex-shrink-0"
// //           style={{ color: linkColor }}
// //         >
// //           और पढ़ें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       <Row>
// //         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //               className="d-block position-relative mb-4 flex-grow-1"
// //             >
// //               <Image
// //                 src={
// //                   mainArticle?.media?.[0]?.url ||
// //                   "https://via.placeholder.com/600x400"
// //                 }
// //                 className="rounded w-100"
// //                 style={{
// //                   objectFit: "cover",
// //                   height: "320px",
// //                 }}
// //               />

// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{
// //                   background:
// //                     "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
// //                   borderRadius:
// //                     "0 0 var(--bs-border-radius) var(--bs-border-radius)",
// //                 }}
// //               >
// //                 <h5 className="fw-bold text-wrap">
// //                   {mainArticle?.title_hi || mainArticle?.title_en}
// //                 </h5>
// //                 <small className="d-block text-light">
// //                   {/* {mainArticle?.createdBy && <UserAvatar user={mainArticle.createdBy} size={30} />} */}
// //                   {mainArticle?.createdBy?.name || "EMS News"} |{" "}
// //                   {(() => {
// //                     console.log("Main Business Article createdAt:", mainArticle?.publishedAt); // यहां createdAt की वैल्यू लॉग करें
// //                     return mainArticle?.publishedAt
// //                       ? new Date(mainArticle?.publishedAt).toLocaleDateString("hi-IN")
// //                       : "";
// //                   })()}
// //                 </small>
// //               </div>
// //             </Link>
// //           )}

// //           {bottomArticle && (
// //             <Link
// //               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //             >
// //               <Row className="align-items-center">
// //                 <Col xs={4} sm={3}>
// //                   <Image
// //                     src={
// //                       bottomArticle?.media?.[0]?.url ||
// //                       "https://via.placeholder.com/120x80"
// //                     }
// //                     fluid
// //                     rounded
// //                     style={{ height: "80px", objectFit: "cover", width: "100%" }}
// //                   />
// //                 </Col>
// //                 <Col xs={8} sm={9} className="ps-2">
// //                   <div>
// //                     <p className="fw-bold mb-1 text-wrap">
// //                       {bottomArticle?.title_hi || bottomArticle?.title_en}
// //                     </p>
// //                     <p className="text-muted small m-0">
// //                       {/* {bottomArticle?.createdBy && <UserAvatar user={bottomArticle.createdBy} size={25} />} */}
// //                       {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
// //                       {(() => {
// //                         console.log("Bottom Business Article createdAt:", bottomArticle?.createdAt); // यहां createdAt की वैल्यू लॉग करें
// //                         return bottomArticle?.publishedAt
// //                           ? new Date(bottomArticle?.publishedAt).toLocaleDateString("hi-IN")
// //                           : "";
// //                       })()}
// //                     </p>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Link>
// //           )}
// //         </Col>

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
// //                     <Image
// //                       src={
// //                         article?.media?.[0]?.url ||
// //                         "https://via.placeholder.com/120x80"
// //                       }
// //                       fluid
// //                       rounded
// //                       style={{ height: "80px", objectFit: "cover", width: "100%" }}
// //                     />
// //                   </Col>
// //                   <Col xs={8} className="ps-2">
// //                     <div>
// //                       <p
// //                         className="fw-bold mb-1 text-wrap"
// //                         style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
// //                       >
// //                         {article?.title_hi || article?.title_en}
// //                       </p>
// //                       <p className="text-muted small m-0">
// //                         {/* {article?.createdBy && <UserAvatar user={article.createdBy} size={25} />} */}
// //                         {article?.createdBy?.name || "EMS News"} |{" "}
// //                         {(() => {
// //                             console.log(`Side Business Article createdAt (index ${index}):`, article?.publishedAt); // यहां createdAt की वैल्यू लॉग करें
// //                             return article?.publishedAt
// //                               ? new Date(article?.publishedAt).toLocaleDateString("hi-IN")
// //                               : "";
// //                         })()}
// //                       </p>
// //                     </div>
// //                   </Col>
// //                 </Row>
// //               </Link>
// //               {index < sideArticles.length - 1 && <hr className="my-3" />}
// //             </React.Fragment>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default BusinessSection;


// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { allNews } from "../../Services/authApi";
// // import { Link } from "react-router-dom";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // const BusinessSection = () => {
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
// //           const businessNews = res?.data?.filter(
// //             (item) =>
// //               item?.category?.name?.toLowerCase() === "business" ||
// //               item?.category?.name === "बिज़नेस"
// //           );
// //           setNewsData(businessNews || []);
// //         } else {
// //           setError(res?.message || "Failed to load business news.");
// //         }
// //       } catch (err) {
// //         setError(err.message || "An error occurred while fetching business news.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   // ✅ Proper Date-Time Formatter with Safe Checks
// //   const formatDateTime = (item) => {
// //     const rawDate = item?.publishedAt || item?.createdAt;
// //     console.log("🕒 Article Date =>", rawDate);

// //     if (!rawDate) return "समय उपलब्ध नहीं";
// //     const dateObj = new Date(rawDate);
// //     if (isNaN(dateObj)) return "Invalid Date";

// //     return dateObj.toLocaleString("hi-IN", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" variant="primary" />
// //         <p className="mt-2">बिज़नेस समाचार लोड हो रहे हैं...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         त्रुटि: {error}
// //         <p>कृपया सुनिश्चित करें कि API सही ढंग से चल रहा है और डेटा प्रदान कर रहा है।</p>
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
// //             <h5 className="fw-bold m-0">बिज़नेस</h5>
// //           </div>
// //           <hr
// //             className="flex-grow-1 mx-3"
// //             style={{ borderTop: `2px solid #A12D2A`, opacity: 1 }}
// //           />
// //           <Link
// //             to="/category/Business"
// //             className="text-decoration-none fw-bold small flex-shrink-0"
// //             style={{ color: "#005f8bff" }}
// //           >
// //             और पढ़ें <FaArrowRight size={12} />
// //           </Link>
// //         </div>
// //         <Alert variant="info" className="my-4">
// //           कोई बिज़नेस समाचार उपलब्ध नहीं है।
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   const mainArticle = newsData?.[0];
// //   const bottomArticle = newsData?.[1];
// //   const sideArticles = newsData?.slice(2, 6);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };
// //   const accentColor = "#A12D2A";
// //   const linkColor = "#005f8bff";

// //   return (
// //     <Container fluid className="mt-4">
// //       <div className="d-flex align-items-center mb-3">
// //         <div className="d-flex align-items-center flex-shrink-0">
// //           <div
// //             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
// //             className="me-2"
// //           ></div>
// //           <h5 className="fw-bold m-0">बिज़नेस</h5>
// //         </div>
// //         <hr
// //           className="flex-grow-1 mx-3"
// //           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
// //         />
// //         <Link
// //           to="/category/Business"
// //           className="text-decoration-none fw-bold small flex-shrink-0"
// //           style={{ color: linkColor }}
// //         >
// //           और पढ़ें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       <Row>
// //         {/* ==== Main Article ==== */}
// //         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //               className="d-block position-relative mb-4 flex-grow-1"
// //             >
// //               <Image
// //                 src={
// //                   mainArticle?.media?.[0]?.url ||
// //                   "https://via.placeholder.com/600x400"
// //                 }
// //                 className="rounded w-100"
// //                 style={{ objectFit: "cover", height: "320px" }}
// //               />
// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{
// //                   background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
// //                   borderRadius: "0 0 var(--bs-border-radius) var(--bs-border-radius)",
// //                 }}
// //               >
// //                 <h5 className="fw-bold text-wrap">
// //                   {mainArticle?.title_hi || mainArticle?.title_en}
// //                 </h5>
// //                 <small className="d-block text-light">
// //                   {mainArticle?.createdBy?.name || "EMS News"} |{" "}
// //                   {formatDateTime(mainArticle)}
// //                 </small>
// //               </div>
// //             </Link>
// //           )}

// //           {/* ==== Bottom Article ==== */}
// //           {bottomArticle && (
// //             <Link
// //               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //             >
// //               <Row className="align-items-center">
// //                 <Col xs={4} sm={3}>
// //                   <Image
// //                     src={
// //                       bottomArticle?.media?.[0]?.url ||
// //                       "https://via.placeholder.com/120x80"
// //                     }
// //                     fluid
// //                     rounded
// //                     style={{ height: "80px", objectFit: "cover", width: "100%" }}
// //                   />
// //                 </Col>
// //                 <Col xs={8} sm={9} className="ps-2">
// //                   <p className="fw-bold mb-1 text-wrap">
// //                     {bottomArticle?.title_hi || bottomArticle?.title_en}
// //                   </p>
// //                   <p className="text-muted small m-0">
// //                     {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
// //                     {formatDateTime(bottomArticle)}
// //                   </p>
// //                 </Col>
// //               </Row>
// //             </Link>
// //           )}
// //         </Col>

// //         {/* ==== Side Articles ==== */}
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
// //                     <Image
// //                       src={
// //                         article?.media?.[0]?.url ||
// //                         "https://via.placeholder.com/120x80"
// //                       }
// //                       fluid
// //                       rounded
// //                       style={{ height: "80px", objectFit: "cover", width: "100%" }}
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
// //                       {formatDateTime(article)}
// //                     </p>
// //                   </Col>
// //                 </Row>
// //               </Link>
// //               {index < sideArticles.length - 1 && <hr className="my-3" />}
// //             </React.Fragment>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default BusinessSection;


// // import React, { useEffect, useState } from "react";
// // import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// // import { FaArrowRight } from "react-icons/fa";
// // import { allNews } from "../../Services/authApi";
// // import { Link } from "react-router-dom";
// // import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // // Media Renderer Helper Component (जैसा कि अन्य कॉम्पोनेन्ट्स में उपयोग किया गया है)
// // const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
// //   const firstMedia = media?.[0];
// //   const isVideo = firstMedia && firstMedia.type === 'video';
// //   const mediaUrl = firstMedia?.url;

// //   const commonStyles = {
// //     width: width,
// //     height: height,
// //     objectFit: objectFit,
// //     borderRadius: borderRadius,
// //     backgroundColor: "#e0e0e0", // Empty/error states के लिए consistent background
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
// //           console.error("Image failed to load:", e.target.src);
// //         }}
// //       />
// //     );
// //   }
// // };


// // const BusinessSection = () => {
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
// //           const businessNews = res?.data?.filter(
// //             (item) =>
// //               item?.category?.name?.toLowerCase() === "business" ||
// //               item?.category?.name === "बिज़नेस"
// //           );
// //           setNewsData(businessNews || []);
// //         } else {
// //           setError(res?.message || "Failed to load business news.");
// //         }
// //       } catch (err) {
// //         setError(err.message || "An error occurred while fetching business news.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, []);

// //   // ✅ Consistent Date-Time Formatter (24-hour format)
// //   const formatFullDateTime = (dateString) => {
// //     if (!dateString) return "समय उपलब्ध नहीं";
// //     const dateObj = new Date(dateString);
// //     if (isNaN(dateObj.getTime())) return "Invalid Date"; // Use getTime() for robust check

// //     return dateObj.toLocaleString("hi-IN", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hourCycle: 'h23', // Ensure 24-hour format
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center my-4">
// //         <Spinner animation="border" variant="primary" />
// //         <p className="mt-2">बिज़नेस समाचार लोड हो रहे हैं...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Alert variant="danger" className="my-4">
// //         त्रुटि: {error}
// //         <p>कृपया सुनिश्चित करें कि API सही ढंग से चल रहा है और डेटा प्रदान कर रहा है।</p>
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
// //             <h5 className="fw-bold m-0">बिज़नेस</h5>
// //           </div>
// //           <hr
// //             className="flex-grow-1 mx-3"
// //             style={{ borderTop: `2px solid #A12D2A`, opacity: 1 }}
// //           />
// //           <Link
// //             to="/category/Business"
// //             className="text-decoration-none fw-bold small flex-shrink-0"
// //             style={{ color: "#005f8bff" }}
// //           >
// //             और पढ़ें <FaArrowRight size={12} />
// //           </Link>
// //         </div>
// //         <Alert variant="info" className="my-4">
// //           कोई बिज़नेस समाचार उपलब्ध नहीं है।
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   const mainArticle = newsData?.[0];
// //   const bottomArticle = newsData?.[1];
// //   const sideArticles = newsData?.slice(2, 6);

// //   const linkStyle = { textDecoration: "none", color: "inherit" };
// //   const accentColor = "#A12D2A";
// //   const linkColor = "#005f8bff";

// //   return (
// //     <Container fluid className="mt-4">
// //       <div className="d-flex align-items-center mb-3">
// //         <div className="d-flex align-items-center flex-shrink-0">
// //           <div
// //             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
// //             className="me-2"
// //           ></div>
// //           <h5 className="fw-bold m-0">बिज़नेस</h5>
// //         </div>
// //         <hr
// //           className="flex-grow-1 mx-3"
// //           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
// //         />
// //         <Link
// //           to="/category/Business"
// //           className="text-decoration-none fw-bold small flex-shrink-0"
// //           style={{ color: linkColor }}
// //         >
// //           और पढ़ें <FaArrowRight size={12} />
// //         </Link>
// //       </div>

// //       <Row>
// //         {/* ==== Main Article ==== */}
// //         <Col lg={7} className="mb-4 mb-lg-0 d-flex flex-column">
// //           {mainArticle && (
// //             <Link
// //               to={`/news/${mainArticle?.slug_en || mainArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //               className="d-block position-relative mb-4 flex-grow-1"
// //             >
// //               {/* MediaRenderer for Main Article */}
// //               <MediaRenderer
// //                 media={mainArticle?.media}
// //                 alt={mainArticle?.title_hi || mainArticle?.title_en || "Business News"}
// //                 width="100%"
// //                 height="320px" // Main article के लिए ऊंचाई बरकरार
// //                 objectFit="cover"
// //                 borderRadius="8px"
// //               />
// //               <div
// //                 className="position-absolute bottom-0 start-0 text-white w-100 p-3"
// //                 style={{
// //                   background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
// //                   borderRadius: "0 0 var(--bs-border-radius) var(--bs-border-radius)",
// //                 }}
// //               >
// //                 <h5 className="fw-bold text-wrap">
// //                   {mainArticle?.title_hi || mainArticle?.title_en}
// //                 </h5>
// //                 <small className="d-block text-light">
// //                   {mainArticle?.createdBy?.name || "EMS News"} |{" "}
// //                   {formatFullDateTime(mainArticle?.publishedAt || mainArticle?.createdAt)} {/* formatFullDateTime का उपयोग करें */}
// //                 </small>
// //               </div>
// //             </Link>
// //           )}

// //           {/* ==== Bottom Article ==== */}
// //           {bottomArticle && (
// //             <Link
// //               to={`/news/${bottomArticle?.slug_en || bottomArticle?._id}`}
// //               state={{ relatedArticles: newsData }}
// //               style={linkStyle}
// //             >
// //               <Row className="align-items-center">
// //                 <Col xs={4} sm={3}> {/* Col sizes adjusted for consistency */}
// //                   {/* MediaRenderer for Bottom Article */}
// //                   <MediaRenderer
// //                     media={bottomArticle?.media}
// //                     alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Business News"}
// //                     width="100%"
// //                     height="90px" // RelatedNews के समान ऊंचाई
// //                     objectFit="cover"
// //                     borderRadius="8px"
// //                   />
// //                 </Col>
// //                 <Col xs={8} sm={9} className="ps-2"> {/* Col sizes adjusted for consistency */}
// //                   <p className="fw-bold mb-1 text-wrap">
// //                     {bottomArticle?.title_hi || bottomArticle?.title_en}
// //                   </p>
// //                   <p className="text-muted small m-0">
// //                     {bottomArticle?.createdBy?.name || "EMS News"} |{" "}
// //                     {formatFullDateTime(bottomArticle?.publishedAt || bottomArticle?.createdAt)} {/* formatFullDateTime का उपयोग करें */}
// //                   </p>
// //                 </Col>
// //               </Row>
// //             </Link>
// //           )}
// //         </Col>

// //         {/* ==== Side Articles ==== */}
// //         <Col lg={5}>
// //           {sideArticles?.map((article, index) => (
// //             <React.Fragment key={article?._id || index}>
// //               <Link
// //                 to={`/news/${article?.slug_en || article?._id}`}
// //                 state={{ relatedArticles: newsData }}
// //                 style={linkStyle}
// //               >
// //                 <Row className="align-items-center">
// //                   <Col xs={4}> {/* Col size consistent for side articles */}
// //                     {/* MediaRenderer for Side Articles */}
// //                     <MediaRenderer
// //                       media={article?.media}
// //                       alt={article?.title_hi || article?.title_en || "Business News"}
// //                       width="100%"
// //                       height="90px" // RelatedNews के समान ऊंचाई
// //                       objectFit="cover"
// //                       borderRadius="8px"
// //                     />
// //                   </Col>
// //                   <Col xs={8} className="ps-2"> {/* Col size consistent for side articles */}
// //                     <p
// //                       className="fw-bold mb-1 text-wrap"
// //                       style={{ fontSize: "0.9rem", lineHeight: "1.4" }}
// //                     >
// //                       {article?.title_hi || article?.title_en}
// //                     </p>
// //                     <p className="text-muted small m-0">
// //                       {article?.createdBy?.name || "EMS News"} |{" "}
// //                       {formatFullDateTime(article?.publishedAt || article?.createdAt)} {/* formatFullDateTime का उपयोग करें */}
// //                     </p>
// //                   </Col>
// //                 </Row>
// //               </Link>
// //               {index < sideArticles.length - 1 && <hr className="my-3" />}
// //             </React.Fragment>
// //           ))}
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default BusinessSection;

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

// const BusinessSection = () => {
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
//           const businessNews = res?.data?.filter(
//             (item) =>
//               item?.category?.name?.toLowerCase() === "business" ||
//               item?.category?.name === "बिज़नेस"
//           );
//           setNewsData(businessNews || []);
//         } else {
//           setError(res?.message || "Failed to load business news.");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching business news.");
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
//       {/* ✅ Header (Single Instance) */}
//       <div className="d-flex align-items-center mb-3">
//         <div className="d-flex align-items-center flex-shrink-0">
//           <div
//             style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
//             className="me-2"
//           ></div>
//           <h5 className="fw-bold m-0">बिज़नेस</h5>
//         </div>
//         <hr
//           className="flex-grow-1 mx-3"
//           style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
//         />
//         <Link
//           to="/category/Business"
//           className="text-decoration-none fw-bold small flex-shrink-0"
//           style={{ color: linkColor }}
//         >
//        और देखें <FaArrowRight size={12} />
//         </Link>
//       </div>

//       {/* ✅ Content Block */}
//       {newsData.length === 0 ? (
//         <Alert variant="info" className="my-4">
//           कोई बिज़नेस समाचार उपलब्ध नहीं है।
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
//                   alt={mainArticle?.title_hi || mainArticle?.title_en || "Business News"}
//                   width="100%"
//                   height="320px"
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
//                   </h5> */}

//                                <div 
//   className="news-headline-bold text-wrap" 
//   style={{ color: "white" }} // यहाँ आप जो भी कलर देंगे, वो पक्का दिखेगा
//   dangerouslySetInnerHTML={{ __html: mainArticle?.title_hi || mainArticle?.title_en || "" }} 
// />
                  
//                   {/* ✅ User Avatar Added (White Text) */}
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
//                       alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Business News"}
//                       width="100%"
//                       height="90px"
//                       objectFit="cover"
//                       borderRadius="8px"
//                     />
//                   </Col>
//                   <Col xs={8} sm={9} className="ps-2">
//                     {/* <p className="fw-bold mb-1 text-wrap">
//                       {bottomArticle?.title_hi || bottomArticle?.title_en}
//                     </p>
//                      */}

//                          <div 
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
//                         alt={article?.title_hi || article?.title_en || "Business News"}
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
//                       </p>
//                        */}

//                           <div 
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

// export default BusinessSection;

import React from "react";
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

const BusinessSection = () => {
  // ✅ Apna fetch hata diya — ab Context se data
  const { categorized, loading, error } = useNews();
  const newsData = categorized["business"] || categorized["बिज़नेस"] || [];

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
      {/* ✅ Header (Single Instance) */}
      <div className="d-flex align-items-center mb-3">
        <div className="d-flex align-items-center flex-shrink-0">
          <div
            style={{ width: "5px", height: "24px", backgroundColor: accentColor }}
            className="me-2"
          ></div>
          <h5 className="fw-bold m-0">बिज़नेस</h5>
        </div>
        <hr
          className="flex-grow-1 mx-3"
          style={{ borderTop: `2px solid ${accentColor}`, opacity: 1 }}
        />
        <Link
          to="/category/Business"
          className="text-decoration-none fw-bold small flex-shrink-0"
          style={{ color: linkColor }}
        >
       और देखें <FaArrowRight size={12} />
        </Link>
      </div>

      {/* ✅ Content Block */}
      {newsData.length === 0 ? (
        <Alert variant="info" className="my-4">
          कोई बिज़नेस समाचार उपलब्ध नहीं है।
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
                  alt={mainArticle?.title_hi || mainArticle?.title_en || "Business News"}
                  width="100%"
                  height="320px"
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

                  {/* ✅ User Avatar Added (White Text) */}
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
                      alt={bottomArticle?.title_hi || bottomArticle?.title_en || "Business News"}
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
                        alt={article?.title_hi || article?.title_en || "Business News"}
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

export default BusinessSection;