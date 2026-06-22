
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { Row, Col, Image } from "react-bootstrap";
// // import UserAvatar from "./UserAvatar";

// // // Format date to dd/mm/yyyy hh:mm (24-hour format)
// // const formatFullDateTime = (dateString) => {
// //   if (!dateString) return "";
// //   const options = {
// //     day: "2-digit",
// //     month: "2-digit", // Numeric month (e.g., 01 for January, 10 for October)
// //     year: "numeric",
// //     hour: "2-digit",   // Include hour
// //     minute: "2-digit", // Include minute
// //     hourCycle: 'h23', // Ensure 24-hour format
// //   };
// //   // Using "hi-IN" locale, which typically formats as DD/MM/YYYY HH:MM
// //   return new Date(dateString).toLocaleString("hi-IN", options);
// // };

// // // Clean text for showing 2 lines (this function is for description)
// // const getTwoLinesCleanText = (text) => {
// //   if (!text) return "";
// //   let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
// //   // Video error message को डिस्क्रिप्शन से हटाएँ
// //   cleanText = cleanText.replace(/Your browser does not support the video tag\./g, "").trim();
// //   const lines = cleanText.split(/[\r\n]+/);
// //   const twoLines = lines.slice(0, 2).join(" ");
// //   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// // };

// // const RelatedNews = ({ articles, currentArticleId }) => {
// //   // Filter out current article
// //   const filteredArticles = articles
// //     ? articles.filter((article) => article && article._id !== currentArticleId)
// //     : [];

// //   if (filteredArticles.length === 0) return null;

// //   const linkStyle = { textDecoration: "none", color: "inherit" };

// //   return (
// //     <div
// //       className="bg-white p-3 p-md-4 shadow-sm mt-4"
// //       style={{ border: "1px solid #eee", borderRadius: "8px" }}
// //     >
// //       {/* Custom styles for 2-line title clamping (universal) */}
// //       <style>
// //         {`
// //         .title-clamp-2-lines {
// //           display: -webkit-box;
// //           -webkit-line-clamp: 2; /* Limit to 2 lines for titles */
// //           -webkit-box-orient: vertical;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }
// //         /* Description is hidden on extra small screens using Bootstrap's d-none d-sm-block class directly on the element */
// //         `}
// //       </style>

// //       <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

// //       {filteredArticles.map((article) => {
// //         const firstMedia = article.media?.[0];
// //         const isVideo = firstMedia && firstMedia.type === 'video';
// //         const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media"; // Fallback for no media

// //         return (
// //           <React.Fragment key={article.slug_en || article._id}>
// //             <Link
// //               to={`/news/${article.slug_en || article._id}`} // Navigation using slug_en
// //               state={{ relatedArticles: articles }}
// //               style={linkStyle}
// //             >
// //               <Row className="mb-3 g-3 align-items-start">
// //                 <Col xs={4} sm={3}>
// //                   {isVideo ? (
// //                     <video
// //                       src={mediaUrl}
// //                       width="100%" // *** यहां बदलाव किया गया: "150px" से "100%" ***
// //                       height="90px" // फिक्स्ड ऊंचाई
// //                       controls={false}
// //                       autoPlay
// //                       muted
// //                       loop
// //                       style={{
// //                         borderRadius: "8px",
// //                         objectFit: "cover",
// //                         backgroundColor: "#e0e0e0",
// //                         display: "block"
// //                       }}
// //                     />
// //                   ) : (
// //                     <Image
// //                       src={mediaUrl}
// //                       alt={article.title_hi || article.title_en || "News"}
// //                       rounded
// //                       style={{
// //                         width: "100%", // *** यहां बदलाव किया गया: "150px" से "100%" ***
// //                         height: "90px", // फिक्स्ड ऊंचाई
// //                         objectFit: "cover",
// //                         display: "block",
// //                         backgroundColor: "#e0e0e0"
// //                       }}
// //                       onError={(e) => { e.target.src = "https://via.placeholder.com/150x90?text=Error"; console.error("Image failed to load:", e.target.src); }}
// //                     />
// //                   )}
// //                 </Col>

// //                 <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
// //                   <h6
// //                     className="fw-bold mb-1 title-clamp-2-lines"
// //                     style={{ fontSize: "0.95rem" }}
// //                   >
// //                     {article.title_hi || article.title_en || ""}
// //                   </h6>

// //                   <p
// //                     className="mb-1 text-muted d-none d-sm-block"
// //                     style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
// //                   >
// //                     {getTwoLinesCleanText(article.content_hi || article.content_en || "")}
// //                   </p>

// //                   <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
// //                     <UserAvatar
// //                       user={article.createdBy}
// //                       size={25}
// //                       src={
// //                         article.createdBy?.profileImage ||
// //                         "https://via.placeholder.com/40x40?text=U"
// //                       }
// //                     />
// //                     <small className="text-muted" style={{ fontSize: "0.8rem" }}>
// //                       {article.createdBy?.name || "EMS News"} |{" "}
// //                       {formatFullDateTime(article.publishedAt || article.createdAt)}
// //                     </small>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Link>
// //             <hr className="my-2" />
// //           </React.Fragment>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default RelatedNews;


// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { Row, Col, Image } from "react-bootstrap";
// // import UserAvatar from "./UserAvatar";

// // // Format date to dd/mm/yyyy hh:mm (24-hour format)
// // const formatFullDateTime = (dateString) => {
// //   if (!dateString) return "";
// //   const options = {
// //     day: "2-digit",
// //     month: "2-digit", // Numeric month (e.g., 01 for January, 10 for October)
// //     year: "numeric",
// //     hour: "2-digit",   // Include hour
// //     minute: "2-digit", // Include minute
// //     hourCycle: 'h23', // Ensure 24-hour format
// //   };
// //   // Using "hi-IN" locale, which typically formats as DD/MM/YYYY HH:MM
// //   return new Date(dateString).toLocaleString("hi-IN", options);
// // };

// // // Clean text for showing 2 lines (this function is for description)
// // const getTwoLinesCleanText = (text) => {
// //   if (!text) return "";
// //   let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
// //   // Video error message को डिस्क्रिप्शन से हटाएँ
// //   cleanText = cleanText.replace(/Your browser does not support the video tag\./g, "").trim();
// //   const lines = cleanText.split(/[\r\n]+/);
// //   const twoLines = lines.slice(0, 2).join(" ");
// //   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// // };

// // const RelatedNews = ({ articles, currentArticleId }) => {
// //   // Filter out current article
// //   const filteredArticles = articles
// //     ? articles.filter((article) => article && article._id !== currentArticleId)
// //     : [];

// //   if (filteredArticles.length === 0) return null;

// //   const linkStyle = { textDecoration: "none", color: "inherit" };

// //   return (
// //     <div
// //       className="bg-white p-3 p-md-4 shadow-sm mt-4"
// //       style={{ border: "1px solid #eee", borderRadius: "8px" }}
// //     >
// //       {/* Custom styles for 2-line title clamping (universal) */}
// //       <style>
// //         {`
// //         .title-clamp-2-lines {
// //           display: -webkit-box;
// //           -webkit-line-clamp: 2; /* Limit to 2 lines for titles */
// //           -webkit-box-orient: vertical;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }
// //         /* Description is hidden on extra small screens using Bootstrap's d-none d-sm-block class directly on the element */
// //         `}
// //       </style>

// //       <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

// //       {filteredArticles.map((article) => {
// //         const firstMedia = article.media?.[0];
// //         const isVideo = firstMedia && firstMedia.type === 'video';
// //         const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";

// //         return (
// //           <React.Fragment key={article.slug_en || article._id}>
// //             <Link
// //               to={`/news/${article.slug_en || article._id}`} // Navigation using slug_en
// //               state={{ relatedArticles: articles }}
// //               style={linkStyle}
// //             >
// //               <Row className="mb-3 g-3 align-items-start">
// //                 {/* *** यहां बदलाव किया गया: Col xs={4} sm={3} से Col xs={3} sm={2} *** */}
// //                 <Col xs={3} sm={2}>
// //                   {isVideo ? (
// //                     <video
// //                       src={mediaUrl}
// //                       width="100%"
// //                       height="90px"
// //                       controls={false}
// //                       autoPlay
// //                       muted
// //                       loop
// //                       style={{
// //                         borderRadius: "8px",
// //                         objectFit: "cover",
// //                         backgroundColor: "#e0e0e0",
// //                         display: "block"
// //                       }}
// //                     />
// //                   ) : (
// //                     <Image
// //                       src={mediaUrl}
// //                       alt={article.title_hi || article.title_en || "News"}
// //                       rounded
// //                       style={{
// //                         width: "100%",
// //                         height: "90px",
// //                         objectFit: "cover",
// //                         display: "block",
// //                         backgroundColor: "#e0e0e0"
// //                       }}
// //                       onError={(e) => { e.target.src = "https://via.placeholder.com/150x90?text=Error"; console.error("Image failed to load:", e.target.src); }}
// //                     />
// //                   )}
// //                 </Col>

// //                 {/* *** यहां बदलाव किया गया: Col xs={8} sm={9} से Col xs={9} sm={10} *** */}
// //                 <Col xs={9} sm={10} className="d-flex flex-column justify-content-center">
// //                   <h6
// //                     className="fw-bold mb-1 title-clamp-2-lines"
// //                     style={{ fontSize: "0.95rem" }}
// //                   >
// //                     {article.title_hi || article.title_en || ""}
// //                   </h6>

// //                   <p
// //                     className="mb-1 text-muted d-none d-sm-block"
// //                     style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
// //                   >
// //                     {getTwoLinesCleanText(article.content_hi || article.content_en || "")}
// //                   </p>

// //                   <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
// //                     <UserAvatar
// //                       user={article.createdBy}
// //                       size={25}
// //                       src={
// //                         article.createdBy?.profileImage ||
// //                         "https://via.placeholder.com/40x40?text=U"
// //                       }
// //                     />
// //                     <small className="text-muted" style={{ fontSize: "0.8rem" }}>
// //                       {article.createdBy?.name || "EMS News"} |{" "}
// //                       {formatFullDateTime(article.publishedAt || article.createdAt)}
// //                     </small>
// //                   </div>
// //                 </Col>
// //               </Row>
// //             </Link>
// //             <hr className="my-2" />
// //           </React.Fragment>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default RelatedNews;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Image } from "react-bootstrap";
// import UserAvatar from "./UserAvatar";

// // Format date to dd/mm/yyyy hh:mm (24-hour format)
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "";
//   const options = {
//     day: "2-digit",
//     month: "2-digit", // Numeric month (e.g., 01 for January, 10 for October)
//     year: "numeric",
//     hour: "2-digit",   // Include hour
//     minute: "2-digit", // Include minute
//     hourCycle: 'h23', // Ensure 24-hour format
//   };
//   // Using "hi-IN" locale, which typically formats as DD/MM/YYYY HH:MM
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// // Clean text for showing 2 lines (this function is for description)
// const getTwoLinesCleanText = (text) => {
//   if (!text) return "";
//   let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
//   // Video error message को डिस्क्रिप्शन से हटाएँ
//   cleanText = cleanText.replace(/Your browser does not support the video tag\./g, "").trim();
//   const lines = cleanText.split(/[\r\n]+/);
//   const twoLines = lines.slice(0, 2).join(" ");
//   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// };

// const RelatedNews = ({ articles, currentArticleId }) => {
//   // Filter out current article
//   const filteredArticles = articles
//     ? articles.filter((article) => article && article._id !== currentArticleId)
//     : [];

//   if (filteredArticles.length === 0) return null;

//   const linkStyle = { textDecoration: "none", color: "inherit" };

//   return (
//     <div
//       className="bg-white p-3 p-md-4 shadow-sm mt-4"
//       style={{ border: "1px solid #eee", borderRadius: "8px" }}
//     >
//       {/* Custom styles for 2-line title clamping (universal) */}
//       <style>
//         {`
//         .title-clamp-2-lines {
//           display: -webkit-box;
//           -webkit-line-clamp: 2; /* Limit to 2 lines for titles */
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         /* Description is hidden on extra small screens using Bootstrap's d-none d-sm-block class directly on the element */
//         `}
//       </style>

//       <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

//       {filteredArticles.map((article) => {
//         const firstMedia = article.media?.[0];
//         const isVideo = firstMedia && firstMedia.type === 'video';
//         const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";

//         return (
//           <React.Fragment key={article.slug_en || article._id}>
//             <Link
//               to={`/news/${article.slug_en || article._id}`} // Navigation using slug_en
//               state={{ relatedArticles: articles }}
//               style={linkStyle}
//             >
//               <Row className="mb-3 g-3 align-items-start">
//                 {/* *** यहां बदलाव किया गया: Col xs={3} sm={2} से Col xs={4} sm={2} *** */}
//                 <Col xs={4} sm={2}>
//                   {isVideo ? (
//                     <video
//                       src={mediaUrl}
//                       width="100%"
//                       height="90px"
//                       controls={false}
//                       autoPlay
//                       muted
//                       loop
//                       style={{
//                         borderRadius: "8px",
//                         objectFit: "cover",
//                         backgroundColor: "#e0e0e0",
//                         display: "block"
//                       }}
//                     />
//                   ) : (
//                     <Image
//                       src={mediaUrl}
//                       alt={article.title_hi || article.title_en || "News"}
//                       rounded
//                       style={{
//                         width: "100%",
//                         height: "90px",
//                         objectFit: "cover",
//                         display: "block",
//                         backgroundColor: "#e0e0e0"
//                       }}
//                       onError={(e) => { e.target.src = "https://via.placeholder.com/150x90?text=Error"; console.error("Image failed to load:", e.target.src); }}
//                     />
//                   )}
//                 </Col>

//                 {/* *** यहां बदलाव किया गया: Col xs={9} sm={10} से Col xs={8} sm={10} *** */}
//                 <Col xs={8} sm={10} className="d-flex flex-column justify-content-center">
//                   <h6
//                     className="fw-bold mb-1 title-clamp-2-lines"
//                     style={{ fontSize: "0.95rem" }}
//                   >
//                     {article.title_hi || article.title_en || ""}
//                   </h6>

//                   <p
//                     className="mb-1 text-muted d-none d-sm-block"
//                     style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
//                   >
//                     {getTwoLinesCleanText(article.content_hi || article.content_en || "")}
//                   </p>

//                   <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//                     <UserAvatar
//                       user={article.createdBy}
//                       size={25}
//                       src={
//                         article.createdBy?.profileImage ||
//                         "https://via.placeholder.com/40x40?text=U"
//                       }
//                     />
//                     <small className="text-muted" style={{ fontSize: "0.8rem" }}>
//                       {article.createdBy?.name || "EMS News"} |{" "}
//                       {formatFullDateTime(article.publishedAt || article.createdAt)}
//                     </small>
//                   </div>
//                 </Col>
//               </Row>
//             </Link>
//             <hr className="my-2" />
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// export default RelatedNews;

import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import UserAvatar from "./UserAvatar";

// Format date to dd/mm/yyyy hh:mm (24-hour format)
const formatFullDateTime = (dateString) => {
  if (!dateString) return "";
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: 'h23',
  };
  return new Date(dateString).toLocaleString("hi-IN", options);
};

// Clean text for showing 2 lines (description के लिए HTML हटाना ही बेहतर है)
const getTwoLinesCleanText = (text) => {
  if (!text) return "";
  // HTML टैग्स हटाना ताकि डिस्क्रिप्शन सादा टेक्स्ट दिखे
  let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  cleanText = cleanText.replace(/Your browser does not support the video tag\./g, "").trim();
  const lines = cleanText.split(/[\r\n]+/);
  const twoLines = lines.slice(0, 2).join(" ");
  return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
};

const RelatedNews = ({ articles, currentArticleId }) => {
  const filteredArticles = articles
    ? articles.filter((article) => article && article._id !== currentArticleId)
    : [];

  if (filteredArticles.length === 0) return null;

  const linkStyle = { textDecoration: "none", color: "inherit" };

  return (
    <div
      className="bg-white p-3 p-md-4 shadow-sm mt-4 related-news-section"
      style={{ border: "1px solid #eee", borderRadius: "8px" }}
    >
      <style>
        {`
        .title-clamp-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        /* एडिटर से आने वाले टाइटल के p टैग की मार्जिन हटाना */
        .title-clamp-2-lines p {
          margin: 0 !important;
          padding: 0 !important;
          display: inline;
        }
        `}
      </style>

      <h3 className="fw-bold mb-4 border-bottom pb-2">इस श्रेणी में और भी खबरें</h3>

      {filteredArticles.map((article) => {
        const firstMedia = article.media?.[0];
        const isVideo = firstMedia && firstMedia.type === 'video';
        const mediaUrl = firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";

        return (
          <React.Fragment key={article.slug_en || article._id}>
            <Link
              to={`/news/${article.slug_en || article._id}`} 
              state={{ relatedArticles: articles }}
              style={linkStyle}
            >
              <Row className="mb-3 g-3 align-items-start">
                <Col xs={4} sm={2}>
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      width="100%"
                      height="90px"
                      autoPlay
                      muted
                      loop
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        backgroundColor: "#e0e0e0",
                        display: "block"
                      }}
                    />
                  ) : (
                    <Image
                      src={mediaUrl}
                      alt="News"
                      rounded
                      style={{
                        width: "100%",
                        height: "90px",
                        objectFit: "cover",
                        display: "block",
                        backgroundColor: "#e0e0e0"
                      }}
                    />
                  )}
                </Col>

                <Col xs={8} sm={10} className="d-flex flex-column justify-content-center">
                  
                  {/* 🔥 टाइटल को HTML के रूप में रेंडर किया गया है */}
                  <div
                    // className="fw-bold mb-1 title-clamp-2-lines"
                     className="news-headline-master mb-1"
                    style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
                    dangerouslySetInnerHTML={{ __html: article.title_hi || article.title_en || "" }}
                  />

                  <p
                    className="mb-1 text-muted d-none d-sm-block"
                    style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
                  >
                    {getTwoLinesCleanText(article.content_hi || article.content_en || "")}
                  </p>

                  <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
                    <UserAvatar user={article.createdBy} size={25} />
                    <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                      {article.createdBy?.name || "EMS News"} |{" "}
                      {formatFullDateTime(article.publishedAt || article.createdAt)}
                    </small>
                  </div>
                </Col>
              </Row>
            </Link>
            <hr className="my-2" />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RelatedNews;