
// import React, { useEffect, useState } from "react";
// import { Row, Col, Image, Spinner, Alert } from "react-bootstrap";
// import { allNews } from "../../Services/authApi"; // ✅ API function
// import { Link } from 'react-router-dom';

// const PremiereSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           // ✅ सिर्फ Premiere category वाली news filter कर रहे हैं
//           const premiereNews = res.data.filter(
//             (item) =>
//               item.category?.name === "Entertainment" || item.category?.name === "मनोरंजन"
//           );
//           setNewsData(premiereNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="danger" className="my-4">
//         Error loading news: {error}
//       </Alert>
//     );
//   }

//   if (newsData.length === 0) {
//     return (
//       <Alert variant="warning" className="my-4">
//         Premiere की कोई खबर उपलब्ध नहीं है।
//       </Alert>
//     );
//   }

//   return (
//     <div
//       className="bg-white p-3 mt-4 shadow-sm"
//       style={{ border: "1px solid #eee" }}
//     >
//       {/* सेक्शन हेडर */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div>
//           <h3 style={{ fontWeight: "bold", margin: 0, color: "#333" }}>
//             Premiere
//           </h3>
//           <div
//             style={{
//               width: "25px",
//               height: "3px",
//               backgroundColor: "#0d6efd",
//               marginTop: "4px",
//             }}
//           ></div>
//         </div>
//         {/* ===================================== */}
//         {/* <a
//           href="#"
//           className="text-decoration-none"
//           style={{ color: "#0066cc", fontWeight: "bold" }}
//         >
//           और देखें
//         </a> */}

//       <Link
//   to="/category/Entertainment"
//   className="text-decoration-none"
//   style={{ color: "#0066cc", fontWeight: "bold" }}
// >
//   और देखें
// </Link>

//       </div>

//       {/* आर्टिकल ग्रिड */}
//       <Row>
//         {newsData.slice(0, 3).map((article, index) => (
//           <Col md={4} key={article._id || index} className="mb-4">
//             <div>
//               {/* --- इमेज --- */}
//               <div className="ratio ratio-16x9 bg-light rounded mb-2">
//                 <Image
//                   src={
//                     article.media?.[0]?.url ||
//                     "https://via.placeholder.com/300x200"
//                   }
//                   alt={article.title}
//                   className="rounded"
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               </div>

//               {/* कैटेगरी */}
//               <p
//                 className="mb-1"
//                 style={{
//                   color: "#0d6efd",
//                   fontWeight: "bold",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 {article.category?.name}
//               </p>

//               {/* हेडलाइन */}
//               <p
//                 className="fw-bold mb-2"
//                 style={{
//                   fontSize: "0.9rem",
//                   color: "#212529",
//                   lineHeight: "1.4",
//                 }}
//               >
//                 {article.title}
//               </p>

//               {/* मेटाडेटा */}
//               <div className="text-muted small">
//                 <span>{article.author || "अनाम"}</span>
//                 <span className="mx-1">·</span>
//                 <span>
//                   {new Date(article.createdAt).toLocaleString("hi-IN")}
//                 </span>
//                 <span className="mx-1">·</span>
//                 <span>2 min read</span>
//               </div>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default PremiereSection;

// import React, { useEffect, useState } from "react";
// import { Row, Col, Image, Spinner, Alert, Container } from "react-bootstrap";
// import { allNews } from "../../Services/authApi";
// import { Link } from 'react-router-dom';

// const PremiereSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           // Behtar filter logic
//           const premiereNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || '';
//             // Aap "Premiere" ko ek subCategory ya tag ke roop mein bhi check kar sakte hain
//             // Abhi ke liye hum "Entertainment" category par focus kar rahe hain
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(premiereNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   // ✅ YAHAN BADLAV KIYA GAYA HAI

//   // 1. Loading State
//   if (loading) {
//     return (
//       <div className="bg-white p-3 mt-4 shadow-sm text-center">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-2">Loading Premiere...</p>
//       </div>
//     );
//   }

//   // 2. Error State
//   if (error) {
//     return (
//       <div className="bg-white p-3 mt-4 shadow-sm">
//         <Alert variant="danger">Error: {error}</Alert>
//       </div>
//     );
//   }

//   // 3. No Data State (return null ke bajaye)
//   if (newsData.length === 0) {
//     return (
//       <div className="bg-white p-3 mt-4 shadow-sm">
//         <h3 style={{ fontWeight: "bold", margin: 0, color: "#333" }}>Premiere</h3>
//         <div style={{ width: "25px", height: "3px", backgroundColor: "#0d6efd", marginTop: "4px", marginBottom: "1rem" }}></div>
//         <Alert variant="warning">Premiere की कोई खबर उपलब्ध नहीं है।</Alert>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="bg-white p-3 mt-4 shadow-sm"
//       style={{ border: "1px solid #eee" }}
//     >
//       {/* Section Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div>
//           <h3 style={{ fontWeight: "bold", margin: 0, color: "#333" }}>
//             Premiere
//           </h3>
//           <div
//             style={{
//               width: "25px",
//               height: "3px",
//               backgroundColor: "#0d6efd",
//               marginTop: "4px",
//             }}
//           ></div>
//         </div>
//         <Link
//           to="/category/Entertainment"
//           className="text-decoration-none"
//           style={{ color: "#0066cc", fontWeight: "bold" }}
//         >
//           और देखें
//         </Link>
//       </div>

//       {/* Article Grid */}
//       <Row>
//         {newsData.slice(0, 3).map((article) => (
//           <Col md={4} key={article._id} className="mb-4">
//             <Link 
//                 to={`/news/${article._id}`} 
//                 state={{ relatedArticles: newsData }}
//                 style={{ textDecoration: 'none', color: 'inherit' }}
//             >
//               <div>
//                 {/* Image */}
//                 <div className="ratio ratio-16x9 bg-light rounded mb-2">
//                   <Image
//                     src={
//                       article.media?.[0]?.url ||
//                       "https://via.placeholder.com/300x200"
//                     }
//                     alt={article.title}
//                     className="rounded"
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                 </div>

//                 {/* Category */}
//                 <p
//                   className="mb-1"
//                   style={{
//                     color: "#0d6efd",
//                     fontWeight: "bold",
//                     fontSize: "0.8rem",
//                   }}
//                 >
//                   {article.category?.name}
//                 </p>

//                 {/* Headline */}
//                 <h6
//                   className="fw-bold mb-2"
//                   style={{
//                     color: "#212529",
//                     lineHeight: "1.4",
//                   }}
//                 >
//                   {article.title}
//                 </h6>

//                 {/* Metadata */}
//                 <div className="text-muted small">
//                   <span>{article.createdBy?.name || "अनाम"}</span>
//                   <span className="mx-1">·</span>
//                   <span>
//                     {new Date(article.createdAt).toLocaleDateString("hi-IN")}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default PremiereSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Image, Spinner, Alert, Container } from "react-bootstrap";
// import { allNews } from "../../Services/authApi";
// import { Link } from 'react-router-dom';
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const PremiereSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const premiereNews = res.data.filter(item => {
//             const categoryName = item.category?.name?.toLowerCase() || '';
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(premiereNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading) return <div className="bg-white p-3 mt-4 shadow-sm text-center"><Spinner animation="border" /><p className="mt-2">Loading Premiere...</p></div>;
//   if (error) return <div className="bg-white p-3 mt-4 shadow-sm"><Alert variant="danger">{error}</Alert></div>;
//   if (newsData.length === 0) return <div className="bg-white p-3 mt-4 shadow-sm"><Alert variant="warning">Premiere की कोई खबर उपलब्ध नहीं है।</Alert></div>;

//   return (
//     <div className="bg-white p-3 mt-4 shadow-sm" style={{ border: "1px solid #eee" }}>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div>
//           <h5 style={{ fontWeight: "bold", margin: 0, color: "#333" }}>Premiere</h5>
//           <div style={{ width: "25px", height: "3px", backgroundColor: "#0d6efd", marginTop: "4px" }}></div>
//         </div>
//         <Link to="/category/Entertainment" className="text-decoration-none" style={{ color: "#0066cc", fontWeight: "bold" }}>और देखें</Link>
//       </div>

//       <Row>
//         {newsData.slice(0, 3).map(article => (
//           <Col md={4} key={article._id} className="mb-4">
//             <Link to={`/news/${article._id}`} state={{ relatedArticles: newsData }} style={{ textDecoration: 'none', color: 'inherit' }}>
//               <div>
//                 <div className="ratio ratio-16x9 bg-light rounded mb-2">
//                   <Image src={article.media?.[0]?.url || "https://via.placeholder.com/300x200"} alt={article.title} className="rounded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                 </div>
//                 <p className="mb-1" style={{ color: "#0d6efd", fontWeight: "bold", fontSize: "0.8rem" }}>{article.category?.name}</p>
//                 <h6 className="fw-bold mb-2" style={{ color: "#212529", lineHeight: "1.4" }}>{article.title}</h6>
//                 <div className="d-flex align-items-center">
//                   <UserAvatar user={article.createdBy} size={25} />
//                   <small className="ms-2 text-muted">
//                     {article.createdBy?.name || "अनाम"} | {new Date(article.createdAt).toLocaleDateString("hi-IN")}
//                   </small>
//                 </div>
//               </div>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default PremiereSection;


// import React, { useEffect, useState } from "react";
// import { Row, Col, Image, Spinner, Alert, Container } from "react-bootstrap";
// import { allNews } from "../../Services/authApi";
// import { Link } from 'react-router-dom';
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const PremiereSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews();
//         if (res?.success) {
//           const premiereNews = res.data.filter(item => {
//             const categoryName = item.category?.name?.toLowerCase() || '';
//             return categoryName === "entertainment" || categoryName === "मनोरंजन";
//           });
//           setNewsData(premiereNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading) return <div className="bg-white p-3 mt-4 shadow-sm text-center"><Spinner animation="border" /><p className="mt-2">Loading Premiere...</p></div>;
//   if (error) return <div className="bg-white p-3 mt-4 shadow-sm"><Alert variant="danger">{error}</Alert></div>;
//   if (newsData.length === 0) return <div className="bg-white p-3 mt-4 shadow-sm"><Alert variant="warning">Premiere की कोई खबर उपलब्ध नहीं है।</Alert></div>;

//   return (
//     <Container fluid className="bg-white p-3 mt-4 shadow-sm" style={{ border: "1px solid #eee" }}>
//       {/* Section Header */}
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//         <div className="mb-2 mb-sm-0">
//           <h5 className="fw-bold m-0" style={{ color: "#333" }}>Premiere</h5>
//           <div style={{ width: "25px", height: "3px", backgroundColor: "#0d6efd", marginTop: "4px" }}></div>
//         </div>
//         <Link to="/category/Entertainment" className="text-decoration-none fw-bold" style={{ color: "#0066cc" }}>
//           और देखें
//         </Link>
//       </div>

//       <Row>
//         {newsData.slice(0, 3).map(article => (
//           <Col key={article._id} xs={12} sm={6} md={4} className="mb-4">
//             <Link to={`/news/${article._id}`} state={{ relatedArticles: newsData }} style={{ textDecoration: 'none', color: 'inherit' }}>
//               <div className="h-100 d-flex flex-column">
//                 <div className="ratio ratio-16x9 mb-2 rounded overflow-hidden bg-light">
//                   <Image
//                     src={article.media?.[0]?.url || "https://via.placeholder.com/300x200"}
//                     alt={article.title}
//                     className="w-100 h-100"
//                     style={{ objectFit: "cover" }}
//                   />
//                 </div>
//                 <p className="mb-1 text-primary fw-bold small">{article.category?.name}</p>
//                 <h6 className="fw-bold mb-2" style={{ color: "#212529", lineHeight: "1.4" }}>{article.title}</h6>
//                 <div className="d-flex align-items-center mt-auto">
//                   <UserAvatar user={article.createdBy} size={25} />
//                   <small className="ms-2 text-muted" style={{ fontSize: "0.75rem" }}>
//                     {article.createdBy?.name || "अनाम"} | {new Date(article.createdAt).toLocaleDateString("hi-IN")}
//                   </small>
//                 </div>
//               </div>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default PremiereSection;



// import React, { useEffect, useState } from "react";
// import { Row, Col, Image, Spinner, Alert, Container } from "react-bootstrap";
// import { allNews } from "../../Services/authApi"; // ✅ API: allNews
// import { Link } from "react-router-dom";
// import UserAvatar from "../Main_NewsDetails/UserAvatar";

// const PremiereSection = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       setLoading(true);
//       try {
//         const res = await allNews(); // ✅ API: allNews
//         if (res?.success) {
//           const premiereNews = res.data.filter((item) => {
//             const categoryName = item.category?.name?.toLowerCase() || "";
//             return categoryName === "entertainment" || categoryName === "मनोरंजन"; // ✅ filter for category
//           });
//           setNewsData(premiereNews);
//         } else {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching news");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, []);

//   if (loading)
//     return (
//       <div className="bg-white p-3 mt-4 shadow-sm text-center">
//         <Spinner animation="border" />
//         <p className="mt-2">Loading Premiere...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="bg-white p-3 mt-4 shadow-sm">
//         <Alert variant="danger">{error}</Alert>
//       </div>
//     );

//   if (newsData.length === 0)
//     return (
//       <div className="bg-white p-3 mt-4 shadow-sm">
//         <Alert variant="warning">Premiere की कोई खबर उपलब्ध नहीं है।</Alert>
//       </div>
//     );

//   return (
//     <Container fluid className="bg-white p-3 mt-4 shadow-sm" style={{ border: "1px solid #eee" }}>
//       {/* Section Header */}
//       <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//         <div className="mb-2 mb-sm-0">
//           <h5 className="fw-bold m-0" style={{ color: "#333" }}>Premiere</h5>
//           <div style={{ width: "25px", height: "3px", backgroundColor: "#0d6efd", marginTop: "4px" }}></div>
//         </div>
//         <Link to="/category/Entertainment" className="text-decoration-none fw-bold" style={{ color: "#0066cc" }}>
//           और देखें
//         </Link>
//       </div>

//       <Row>
//         {newsData.slice(0, 3).map((article) => (
//           <Col key={article._id} xs={12} sm={6} md={4} className="mb-4">
//             <Link
//               to={`/news/${article.slug_en}`} // ✅ Updated: slug_en used for navigation
//               state={{ relatedArticles: newsData }}
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <div className="h-100 d-flex flex-column">
//                 <div className="ratio ratio-16x9 mb-2 rounded overflow-hidden bg-light">
//                   <Image
//                     src={
//                       article.media?.[0]?.url || "https://via.placeholder.com/300x200" // ✅ API key: media[0].url with fallback
//                     }
//                     alt={article.title_hi || article.title_en} // ✅ API key: title_hi fallback title_en
//                     className="w-100 h-100"
//                     style={{ objectFit: "cover" }}
//                   />
//                 </div>
//                 <p className="mb-1 text-primary fw-bold small">
//                   {article.category?.name || "मनोरंजन"} {/* ✅ API key: category.name */}
//                 </p>
//                 <h6 className="fw-bold mb-2" style={{ color: "#212529", lineHeight: "1.4" }}>
//                   {article.title_hi || article.title_en} {/* ✅ API key: title_hi fallback title_en */}
//                 </h6>
//                 <div className="d-flex align-items-center mt-auto">
//                   <UserAvatar user={article.createdBy} size={25} /> {/* ✅ API key: createdBy */}
//                   <small className="ms-2 text-muted" style={{ fontSize: "0.75rem" }}>
//                     {article.createdBy?.name || "अनाम"} |{" "}
//                     {new Date(article.createdAt).toLocaleDateString("hi-IN")} {/* ✅ API key: createdAt */}
//                   </small>
//                 </div>
//               </div>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default PremiereSection;



import React, { useEffect, useState } from "react";
import { Row, Col, Image, Spinner, Alert, Container } from "react-bootstrap";
import { allNews } from "../../Services/authApi";
import { Link } from "react-router-dom";
import UserAvatar from "../Main_NewsDetails/UserAvatar";

const PremiereSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await allNews();
        if (res?.success) {
          const premiereNews = res.data.filter((item) => {
            const categoryName = item.category?.name?.toLowerCase() || "";
            return categoryName === "entertainment" || categoryName === "मनोरंजन";
          });
          setNewsData(premiereNews);
        } else {
          setError("Failed to load news");
        }
      } catch (err) {
        setError(err.message || "Error fetching news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="bg-white p-3 mt-4 shadow-sm text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading Premiere...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-white p-3 mt-4 shadow-sm">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  if (newsData.length === 0)
    return (
      <div className="bg-white p-3 mt-4 shadow-sm">
        <Alert variant="warning">Premiere की कोई खबर उपलब्ध नहीं है।</Alert>
      </div>
    );

  // --- Styling Constants (can be moved to a CSS file or theme) ---
  const accentColor = "#0d6efd";
  const linkColor = "#0066cc";
  // ----------------------------------------------------------------

  return (
    <Container fluid className="bg-white p-3 mt-4 shadow-sm" style={{ border: "1px solid #eee" }}>
      {/* Section Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="mb-2 mb-sm-0">
          <h5 className="fw-bold m-0" style={{ color: "#333" }}>प्रीमियर</h5>
          <div style={{ width: "25px", height: "3px", backgroundColor: accentColor, marginTop: "4px" }}></div>
        </div>
        <Link to="/category/Entertainment" className="text-decoration-none fw-bold" style={{ color: linkColor }}>
          और देखें
        </Link>
      </div>

      <Row>
        {newsData.slice(0, 3).map((article) => (
          <Col key={article._id} xs={12} sm={6} md={4} className="mb-4">
            <Link
              to={`/news/${article.slug_en || article._id}`}
              state={{ relatedArticles: newsData }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="h-100 d-flex flex-column">
                <div className="ratio ratio-16x9 mb-2 rounded overflow-hidden bg-light">
                  <Image
                    src={
                      article.media?.[0]?.url || "https://via.placeholder.com/300x200"
                    }
                    alt={article.title_hi || article.title_en}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="mb-1 text-primary fw-bold small text-wrap">
                  {article.category?.name || "मनोरंजन"}
                </p>
                <h6 className="fw-bold mb-2 text-wrap" style={{ color: "#212529", lineHeight: "1.4" }}>
                  {article.title_hi || article.title_en}
                </h6>
                <div className="d-flex align-items-center mt-auto flex-wrap">
                  <UserAvatar user={article.createdBy} size={25} />
                  <small className="ms-2 text-muted text-wrap" style={{ fontSize: "0.75rem" }}>
                    {article.createdBy?.name || "अनाम"} |{" "}
                    {new Date(article.publishedAt).toLocaleString("hi-IN", {
  day: "numeric",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})
}
                  </small>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PremiereSection;