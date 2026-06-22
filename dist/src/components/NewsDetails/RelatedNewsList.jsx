
// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Row, Col, Image } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// // Format date in Hindi
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return '';
//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// // Limit text to ~150 chars
// const getTwoLines = (text) => {
//   if (!text) return '';
//   const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
//   return clean.length > 150 ? clean.substring(0, 147) + '...' : clean;
// };

// const RelatedNewsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const allArticles = location.state?.relatedArticles || [];

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   if (!allArticles.length)
//     return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-4 border-bottom pb-2">
//         इस श्रेणी में और भी खबरें
//       </h3>

//       {allArticles.map(article => (
//         <Row
//           key={article._id}
//           className="mb-4 g-3 align-items-start"
//           style={{ cursor: 'pointer' }}
//           onClick={() =>
//             navigate(`/news/${article.slug_en || article._id}`, {
//               state: { relatedArticles: allArticles }
//             })
//           }
//         >
//           <Col xs={4} sm={3}>
//             <Image
//               src={article.media?.[0]?.url || 'https://via.placeholder.com/150x90'}
//               alt={article.title_hi || article.title_en}
//               fluid
//               rounded
//               style={{ width: '100%', maxHeight: '90px', objectFit: 'cover' }}
//             />
//           </Col>

//           <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//             <h6 className="fw-bold mb-1 text-wrap">
//               {article.title_hi || article.title_en}
//             </h6>
//             <p className="mb-1 text-muted text-wrap" style={{ fontSize: '0.85rem', lineHeight: '1.3rem' }}>
//               {getTwoLines(
//                 article.summary_hi || article.summary_en || article.content_hi || article.content_en
//               )}
//             </p>
//             <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//               <UserAvatar
//                 user={article.createdBy}
//                 size={25}
//                 src={article.createdBy?.profileImage || 'https://via.placeholder.com/40x40?text=U'}
//               />
//               <small className="text-muted text-wrap" style={{ fontSize: '0.8rem' }}>
//                 {article.createdBy?.name || "EMS News"} | {formatFullDateTime(article.publishedAt || article.createdAt)}
//               </small>
//             </div>
//           </Col>
//           <hr className="mt-3" />
//         </Row>
//       ))}
//     </div>
//   );
// };

// export default RelatedNewsList;


// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Row, Col, Image } from "react-bootstrap";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// // Format date in Hindi
// const formatFullDateTime = (dateString) => {
//   if (!dateString) return "";
//   const options = {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hourCycle: "h23",
//   };
//   return new Date(dateString).toLocaleString("hi-IN", options);
// };

// // Limit text to ~150 chars and remove tags
// const getTwoLinesCleanText = (text) => {
//   if (!text) return "";
//   let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
//   cleanText = cleanText
//     .replace(/Your browser does not support the video tag\./g, "")
//     .trim();
//   const lines = cleanText.split(/[\r\n]+/);
//   const twoLines = lines.slice(0, 2).join(" ");
//   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// };

// const RelatedNewsList = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const allArticles = location.state?.relatedArticles || [];

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   if (!allArticles.length)
//     return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

//   return (
//     <div className="container my-4">
//       <style>{`
//         .title-clamp-2-lines {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .media-box {
//           width: 100%;
//           height: 90px;
//           border-radius: 8px;
//           object-fit: cover;
//           background-color: #e0e0e0;
//           display: block;
//         }
//         .media-box:hover {
//           transform: scale(1.05);
//           transition: transform 0.3s ease;
//         }
//       `}</style>

//       <h3 className="fw-bold mb-4 border-bottom pb-2">
//         इस श्रेणी में और भी खबरें
//       </h3>

//       {allArticles.map((article) => {
//         const firstMedia = article.media?.[0];
//         const isVideo = firstMedia && firstMedia.type === "video";
//         const mediaUrl =
//           firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";

//         return (
//           <React.Fragment key={article._id}>
//             <Row
//               className="mb-3 g-3 align-items-start"
//               style={{ cursor: "pointer" }}
//               onClick={() =>
//                 navigate(`/news/${article.slug_en || article._id}`, {
//                   state: { relatedArticles: allArticles },
//                 })
//               }
//             >
//               {/* Media Column */}
//               <Col xs={4} sm={3}>
//                 {isVideo ? (
//                   <video
//                     src={mediaUrl}
//                     className="media-box"
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                   />
//                 ) : (
//                   <Image
//                     src={mediaUrl}
//                     alt={article.title_hi || article.title_en || "News"}
//                     className="media-box"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/150x90?text=Error";
//                     }}
//                   />
//                 )}
//               </Col>

//               {/* Content Column */}
//               <Col
//                 xs={8}
//                 sm={9}
//                 className="d-flex flex-column justify-content-center"
//               >
//                 <h6
//                   className="fw-bold mb-1 title-clamp-2-lines"
//                   style={{ fontSize: "0.95rem" }}
//                 >
//                   {article.title_hi || article.title_en || ""}
//                 </h6>

//                 <p
//                   className="mb-1 text-muted d-none d-sm-block"
//                   style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
//                 >
//                   {getTwoLinesCleanText(
//                     article.summary_hi ||
//                       article.summary_en ||
//                       article.content_hi ||
//                       article.content_en ||
//                       ""
//                   )}
//                 </p>

//                 <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
//                   <UserAvatar
//                     user={article.createdBy}
//                     size={25}
//                     src={
//                       article.createdBy?.profileImage ||
//                       "https://via.placeholder.com/40x40?text=U"
//                     }
//                   />
//                   <small className="text-muted" style={{ fontSize: "0.8rem" }}>
//                     {article.createdBy?.name || "EMS News"} |{" "}
//                     {formatFullDateTime(
//                       article.publishedAt || article.createdAt
//                     )}
//                   </small>
//                 </div>
//               </Col>
//             </Row>
//             <hr className="my-2" />
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// };

// export default RelatedNewsList;



import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

// Format date in Hindi
const formatFullDateTime = (dateString) => {
  if (!dateString) return "";
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  };
  return new Date(dateString).toLocaleString("hi-IN", options);
};

// Limit text to ~150 chars and remove tags
const getTwoLinesCleanText = (text) => {
  if (!text) return "";
  let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  cleanText = cleanText
    .replace(/Your browser does not support the video tag\./g, "")
    .trim();
  const lines = cleanText.split(/[\r\n]+/);
  const twoLines = lines.slice(0, 2).join(" ");
  return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
};

const RelatedNewsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allArticles = location.state?.relatedArticles || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!allArticles.length)
    return <p className="text-center mt-4">कोई समाचार उपलब्ध नहीं है।</p>;

  return (
    <div className="container my-4">
      <style>{`
        .title-clamp-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .media-box {
          width: 100%;       /* Column ke width ke andar fit ho */
          max-width: 150px;  /* Max width restrict kiya */
          height: 90px;
          border-radius: 8px;
          object-fit: cover;
          background-color: #e0e0e0;
          display: block;
        }
        .media-box:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>

      <h3 className="fw-bold mb-4 border-bottom pb-2">
        इस श्रेणी में और भी खबरें
      </h3>

      {allArticles.map((article) => {
        const firstMedia = article.media?.[0];
        const isVideo = firstMedia && firstMedia.type === "video";
        const mediaUrl =
          firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";

        return (
          <React.Fragment key={article._id}>
            <Row
              className="mb-3 g-3 align-items-start"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/news/${article.slug_en || article._id}`, {
                  state: { relatedArticles: allArticles },
                })
              }
            >
              <Col xs={4} sm={3} className="d-flex justify-content-center">
                {isVideo ? (
                  <video
                    src={mediaUrl}
                    className="media-box"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={mediaUrl}
                    alt={article.title_hi || article.title_en || "News"}
                    className="media-box"
                    rounded
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x90?text=Error";
                    }}
                  />
                )}
              </Col>

              <Col
                xs={8}
                sm={9}
                className="d-flex flex-column justify-content-center"
              >
                {/* <h6
                  className="fw-bold mb-1 title-clamp-2-lines"
                  style={{ fontSize: "0.95rem" }}
                >
                  {article.title_hi || article.title_en || ""}
                </h6> */}

                 <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: article?.title_hi || article?.title_en }} 
                  />

                <p
                  className="mb-1 text-muted d-none d-sm-block"
                  style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
                >
                  {getTwoLinesCleanText(
                    article.summary_hi ||
                      article.summary_en ||
                      article.content_hi ||
                      article.content_en ||
                      ""
                  )}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-1 mt-1">
                  <UserAvatar
                    user={article.createdBy}
                    size={25}
                    src={
                      article.createdBy?.profileImage ||
                      "https://via.placeholder.com/40x40?text=U"
                    }
                  />
                  <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {article.createdBy?.name || "EMS News"} |{" "}
                    {formatFullDateTime(
                      article.publishedAt || article.createdAt
                    )}
                  </small>
                </div>
              </Col>
            </Row>
            <hr className="my-2" />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RelatedNewsList;
  