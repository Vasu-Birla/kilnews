

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { allNews } from "../../../Services/authApi";
// import UserAvatar from "../../Main_NewsDetails/UserAvatar";

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

// const getTwoLinesCleanText = (text) => {
//   if (!text) return "";
//   let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
//   cleanText = cleanText.replace(/Your browser does not support the video tag\./g, "").trim();
//   const lines = cleanText.split(/[\r\n]+/);
//   const twoLines = lines.slice(0, 2).join(" ");
//   return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
// };

// const EntertainmentListPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const entertainmentNews = res.data.filter((item) => {
//             const categoryName =
//               typeof item.category === "string"
//                 ? item.category.toLowerCase()
//                 : item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(entertainmentNews);
//         } else setError("Failed to load news");
//       } catch (err) {
//         setError(err.message || "");
//       } finally { setLoading(false); }
//     };
//     fetchNews();
//   }, []);

//   if (loading) return <div className="text-center my-4"><Spinner animation="border" /><p>Loading...</p></div>;
//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (newsData.length === 0) return <Alert variant="warning">कोई खबर उपलब्ध नहीं है।</Alert>;

//   return (
//     <Container className="my-4">
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
//           max-width: 150px;
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

//       <h2 className="fw-bold border-bottom pb-2 mb-4">मनोरंजन</h2>

//       {newsData.map((article) => {
//         const firstMedia = article.media?.[0];
//         const isVideo = firstMedia && firstMedia.type === "video";
//         const mediaUrl =
//           firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";

//         const finalSlug = article.slug_en || article.slug || article._id;

//         return (
//           <React.Fragment key={article._id || finalSlug}>
//             {/* 🔴 पूरा कार्ड अब क्लिकेबल है */}
//             <Link
//               to={`/news/${finalSlug}`}
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <Row className="mb-3 g-3 align-items-start" style={{ cursor: "pointer" }}>
//                 <Col xs={4} sm={3} className="d-flex justify-content-center">
//                   {isVideo ? (
//                     <video
//                       src={mediaUrl}
//                       className="media-box"
//                       autoPlay
//                       muted
//                       loop
//                       playsInline
//                     />
//                   ) : (
//                     <Image
//                       src={mediaUrl}
//                       alt={article.title_hi || article.title || "News"}
//                       className="media-box"
//                       rounded
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/150x90?text=Error";
//                       }}
//                     />
//                   )}
//                 </Col>

//                 <Col xs={8} sm={9} className="d-flex flex-column justify-content-center">
//                   <h6 className="fw-bold mb-1 title-clamp-2-lines" style={{ fontSize: "0.95rem" }}>
//                     {article.title_hi || article.title}
//                   </h6>

//                   <p
//                     className="mb-1 text-muted d-none d-sm-block"
//                     style={{ fontSize: "0.85rem", lineHeight: "1.3rem" }}
//                   >
//                     {getTwoLinesCleanText(
//                       article.summary_hi ||
//                         article.summary_en ||
//                         article.content_hi ||
//                         article.content_en ||
//                         ""
//                     )}
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
//     </Container>
//   );
// };

// export default EntertainmentListPage;


import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { allNews, fetchActiveAds } from "../../../Services/authApi"; // Ensure path is correct
import UserAvatar from "../../Main_NewsDetails/UserAvatar";

// --- Helpers ---
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

const getTwoLinesCleanText = (text) => {
  if (!text) return "";
  let cleanText = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  cleanText = cleanText
    .replace(/Your browser does not support the video tag./g, "")
    .trim();
  const lines = cleanText.split(/[\r\n]+/);
  const twoLines = lines.slice(0, 2).join(" ");
  return twoLines.length > 150 ? twoLines.substring(0, 147) + "..." : twoLines;
};

// --- Ad Render Components (Internal to keep logic connected) ---

// 1. Inline Ad (728x90)
const RenderInlineAd = ({ ad }) => {
  if (!ad) return null;
  return (
    <div className="inline-ad-wrapper mb-4">
      <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
        <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
      </a>
      <style>{`
        .inline-ad-wrapper { width: 100%; max-width: 728px; margin: 0 auto; }
        .inline-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 728 / 90; object-fit: cover; border-radius: 4px; }
        @media (max-width: 991px) { .inline-ad-wrapper { max-width: 100%; padding: 0 10px; } }
      `}</style>
    </div>
  );
};

// 2. Inline Large Ad (970x250)
const RenderInlineLargeAd = ({ ad }) => {
  if (!ad) return null;
  return (
    <div className="inline-large-ad-wrapper my-4">
      <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
        <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
      </a>
      <style>{`
        .inline-large-ad-wrapper { width: 100%; max-width: 970px; margin: 24px auto; }
        .inline-large-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 970 / 250; object-fit: cover; border-radius: 6px; }
        @media (max-width: 991px) { .inline-large-ad-wrapper { max-width: 100%; padding: 0 10px; } }
      `}</style>
    </div>
  );
};

// 3. Bottom Ad (970x250)
const RenderBottomAd = ({ ad }) => {
  if (!ad) return null;
  return (
    <div className="bottom-ad-wrapper mt-4">
      <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
        <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
      </a>
      <style>{`
        .bottom-ad-wrapper { width: 100%; max-width: 970px; margin: 24px auto 0; overflow: hidden; }
        .bottom-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 970 / 250; object-fit: cover; border-radius: 6px; }
        @media (max-width: 991px) { .bottom-ad-wrapper { max-width: 100%; padding: 0 10px; } }
      `}</style>
    </div>
  );
};

// --- Main Page Component ---

const EntertainmentListPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [ads, setAds] = useState({
    inline: null,
    inlineLarge: null,
    inline2: null,
    bottom: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Parallel fetching for performance
        const [newsRes, adsRes] = await Promise.all([
          allNews(),
          fetchActiveAds(),
        ]);

        // 1. Process News
        if (newsRes?.success) {
          const entertainmentNews = newsRes.data.filter((item) => {
            const categoryName =
              typeof item.category === "string"
                ? item.category.toLowerCase()
                : item.category?.name?.toLowerCase() || "";
            return (
              categoryName === "entertainment" || categoryName === "मनोरंजन"
            );
          });
          setNewsData(entertainmentNews);
        } else {
          setError("Failed to load news");
        }

        // 2. Process Ads
        if (adsRes?.success && Array.isArray(adsRes.ads)) {
          // Helper to check if ad category matches entertainment
          // Note: Backend must have "entertainment" or "मनोरंजन" in categories array
          const isEntertainmentAd = (ad) => {
            return (
              ad.categories &&
              ad.categories.some(
                (cat) =>
                  cat.toLowerCase() === "entertainment" ||
                  cat.toLowerCase() === "मनोरंजन"
              )
            );
          };

          // Filter ads by position AND category
          // Fallback: If no entertainment specific ad, logic implies we don't show,
          // but if you want to show 'home' ads as fallback, remove the `&& isEntertainmentAd(a)` check.
          // Based on prompt: "category Entertainment hogi atbhi show karna hai" -> keeping strict check.
          
          const inlineAd = adsRes.ads.find(
            (a) => a.position === "inline" && isEntertainmentAd(a)
          );
          
          const inlineLargeAd = adsRes.ads.find(
            (a) => a.position === "inlineLarge" && isEntertainmentAd(a)
          );
          
          const inline2Ad = adsRes.ads.find(
            (a) => a.position === "inline2" && isEntertainmentAd(a)
          );
          
          const bottomAd = adsRes.ads.find(
            (a) => a.position === "bottom" && isEntertainmentAd(a)
          );

          setAds({
            inline: inlineAd || null,
            inlineLarge: inlineLargeAd || null,
            inline2: inline2Ad || null,
            bottom: bottomAd || null,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Render News Card Helper ---
  const renderNewsCard = (article) => {
    const firstMedia = article.media?.[0];
    const isVideo = firstMedia && firstMedia.type === "video";
    const mediaUrl =
      firstMedia?.url || "https://via.placeholder.com/150x90?text=No+Media";
    const finalSlug = article.slug_en || article.slug || article._id;

    return (
      <React.Fragment key={article._id || finalSlug}>
        <Link
          to={`/news/${finalSlug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Row
            className="mb-3 g-3 align-items-start"
            style={{ cursor: "pointer" }}
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
                  alt={article.title_hi || article.title || "News"}
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
                {article.title_hi || article.title}
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
                  {formatFullDateTime(article.publishedAt || article.createdAt)}
                </small>
              </div>
            </Col>
          </Row>
        </Link>
        <hr className="my-2" />
      </React.Fragment>
    );
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  
  // Note: We show error only if news fails. If ads fail/missing, we just don't show ads.
  if (error && newsData.length === 0) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-4">
      {/* Styles for News List */}
      <style>
        {`
          .title-clamp-2-lines { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; } 
          .media-box { width: 100%; max-width: 150px; height: 90px; border-radius: 8px; object-fit: cover; background-color: #e0e0e0; display: block; } 
          .media-box:hover { transform: scale(1.05); transition: transform 0.3s ease; }
        `}
      </style>

      <h2 className="fw-bold border-bottom pb-2 mb-4">मनोरंजन</h2>

      {/* 1. First Ad: Inline Ad Banner (Before any news) */}
      <RenderInlineAd ad={ads.inline} />

      {/* 2. First 5 News */}
      {newsData.length === 0 && !loading && (
        <Alert variant="warning">कोई खबर उपलब्ध नहीं है।</Alert>
      )}
      {newsData.slice(0, 5).map((article) => renderNewsCard(article))}

      {/* 3. Second Ad: Inline Large Ad Banner (After 5 news) */}
      <RenderInlineLargeAd ad={ads.inlineLarge} />

      {/* 4. Next 5 News (5 to 10) */}
      {newsData.slice(5, 10).map((article) => renderNewsCard(article))}

      {/* 5. Third Ad: Second Inline Ad Banner (After 10 news) */}
      <RenderInlineAd ad={ads.inline2} />

      {/* 6. Remaining News (10 onwards) */}
      {newsData.slice(10).map((article) => renderNewsCard(article))}

      {/* 7. Bottom Ad: Bottom Ad Banner (At the very end) */}
      <RenderBottomAd ad={ads.bottom} />

    </Container>
  );
};

export default EntertainmentListPage;