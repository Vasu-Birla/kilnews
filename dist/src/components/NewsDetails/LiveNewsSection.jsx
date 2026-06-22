

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allLiveNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // FIXED MEDIA RENDERER
// const MediaRenderer = ({ item }) => {
//   const coverImage = item?.coverImage?.url;
//   const updateMedia = item?.updates?.[0]?.media?.[0]?.url;
//   const mediaUrl = coverImage || updateMedia;

//   return (
//     <img
//       src={mediaUrl}
//       alt=""
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//       }}
//     />
//   );
// };

// const LiveNewsSection = () => {
//   const [liveNews, setLiveNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLive = async () => {
//       try {
//         const res = await allLiveNews();
//         if (res.success) setLiveNews(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLive();
//   }, []);

//   const formatDate = (date) => {
//     return new Date(date).toLocaleString("hi-IN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: "h23",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p>लाइव समाचार लोड हो रहे हैं...</p>
//       </div>
//     );
//   }

//   if (liveNews.length === 0) {
//     return (
//       <Container fluid className="mt-4">
//         {/* <Alert variant="info">कोई लाइव समाचार उपलब्ध नहीं है।</Alert> */}
//       </Container>
//     );
//   }

//   const mainLive = liveNews[0];
//   const bottomLive = liveNews[1];
//   const sideLive = liveNews.slice(2, 6);

//   return (
//     <Container fluid className="mt-4">

//       {/* HEADER */}
//       <div
//         className="d-flex align-items-center mb-3"
//         style={{
//           borderLeft: "5px solid #d60000",
//           paddingLeft: 12,
//         }}
//       >
//         <h5 className="fw-bold m-0" style={{ color: "#d60000" }}>
//           🔴 लाइव समाचार
//         </h5>

//         <hr className="flex-grow-1 mx-3" style={{ opacity: 0.2 }} />

   
//       </div>

//       <Row>

//         {/* LEFT SIDE — MAIN CARD */}
//         <Col lg={7} className="mb-4">
//           {mainLive && (
//             <div
//               style={{
//                 background: "#b60000",
//                 padding: "15px",
//                 borderRadius: "10px",
//                 color: "white",
//                 display: "flex",
//                 gap: "15px",
//                 width: "170%",  // ⭐ ONLY THIS LINE ADDED
//               }}
//             >
//               {/* LEFT IMAGE */}
//               <div
//                 style={{
//                   width: "50%",
//                   height: "300px",
//                   position: "relative",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <MediaRenderer item={mainLive} />

//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "10px",
//                     left: "10px",
//                     background: "#ff0000",
//                     fontSize: "12px",
//                     padding: "4px 10px",
//                     borderRadius: "4px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   LIVE
//                 </div>
//               </div>

//               {/* RIGHT CONTENT */}
//               <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
//                 <Link
//                   to={`/live/${mainLive.slug_en || mainLive._id}`}
//                   style={{
//                     color: "white",
//                     fontSize: "22px",
//                     fontWeight: "bold",
//                     lineHeight: "1.4",
//                     textDecoration: "none",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   {mainLive.title_hi}
//                 </Link>

//                 <ul style={{ paddingLeft: "20px", margin: 0 }}>
//                   <li style={{ marginBottom: "8px" }}>
//                     {mainLive.title_hi.slice(0, 50)}...
//                   </li>
//                   <li style={{ marginBottom: "8px" }}>
//                     Breaking update जारी...
//                   </li>
//                   <li style={{ marginBottom: "8px" }}>
//                     घटना के नए तथ्य सामने आए...
//                   </li>
//                   <li style={{ marginBottom: "8px" }}>
//                     और जानकारी की प्रतीक्षा...
//                   </li>
//                 </ul>

//                 <small style={{ opacity: 0.8, marginTop: "auto" }}>
//                   {mainLive.createdBy?.name || "EMS News"} | {formatDate(mainLive.createdAt)}
//                 </small>
//               </div>
//             </div>
//           )}

//           {/* BOTTOM CARD SAME */}
//           {bottomLive && (
//             <Link
//               to={`/live/${bottomLive.slug_en || bottomLive._id}`}
//               className="text-decoration-none text-dark"
//             >
//               <Row
//                 className="align-items-center mt-3"
//                 style={{
//                   padding: "10px",
//                   borderRadius: "10px",
//                   borderLeft: "4px solid #d60000",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   background: "#fff",
//                 }}
//               >
//                 <Col xs={4}>
//                   <MediaRenderer item={bottomLive} />
//                 </Col>
//                 <Col xs={8}>
//                   <p className="fw-bold m-0">{bottomLive.title_hi}</p>
//                   <small className="text-muted">
//                     {bottomLive.createdBy?.name} | {formatDate(bottomLive.createdAt)}
//                   </small>
//                 </Col>
//               </Row>
//             </Link>
//           )}
//         </Col>

//         {/* RIGHT SIDE SAME */}
//         <Col lg={5}>
//           {sideLive.map((item, index) => (
//             <React.Fragment key={item._id}>
//               <Link
//                 to={`/live/${item.slug_en || item._id}`}
//                 className="text-decoration-none text-dark"
//               >
//                 <Row
//                   className="align-items-center mb-3"
//                   style={{
//                     padding: "10px",
//                     borderRadius: "10px",
//                     background: "#fff",
//                     borderLeft: "4px solid #d60000",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   <Col xs={4}>
//                     <MediaRenderer item={item} />
//                   </Col>
//                   <Col xs={8}>
//                     <p className="fw-bold mb-1">{item.title_hi}</p>
//                     <small className="text-muted">
//                       {item.createdBy?.name} | {formatDate(item.createdAt)}
//                     </small>
//                   </Col>
//                 </Row>
//               </Link>

//               {index < sideLive.length - 1 && (
//                 <hr style={{ opacity: 0.15 }} />
//               )}
//             </React.Fragment>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LiveNewsSection;

// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { FaArrowRight } from "react-icons/fa";
// import { allLiveNews } from "../../Services/authApi";
// import { Link } from "react-router-dom";

// // ⭐ BLINK CSS
// const blinkStyle = `
// @keyframes blink {
//   0% { opacity: 1; background-color: red; }
//   50% { opacity: 0.3; background-color: white; color: red; }
//   100% { opacity: 1; background-color: red; }
// }
// .blink-live {
//   animation: blink 1s infinite;
// }
// `;

// const MediaRenderer = ({ item }) => {
//   const coverImage = item?.coverImage?.url;
//   const updateMedia = item?.updates?.[0]?.media?.[0]?.url;
//   const mediaUrl = coverImage || updateMedia;

//   return (
//     <img
//       src={mediaUrl}
//       alt=""
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//       }}
//     />
//   );
// };

// const LiveNewsSection = () => {
//   const [liveNews, setLiveNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLive = async () => {
//       try {
//         const res = await allLiveNews();
//         if (res.success) setLiveNews(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLive();
//   }, []);

//   const formatDate = (date) => {
//     return new Date(date).toLocaleString("hi-IN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hourCycle: "h23",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" />
//         <p>लाइव समाचार लोड हो रहे हैं...</p>
//       </div>
//     );
//   }

//   if (liveNews.length === 0) {
//     return (
//       <Container fluid className="mt-4">
//         {/* <Alert variant="info">कोई लाइव समाचार उपलब्ध नहीं है।</Alert> */}
//       </Container>
//     );
//   }

//   const mainLive = liveNews[0];
//   const bottomLive = liveNews[1];
//   const sideLive = liveNews.slice(2, 6);

//   return (
//     <>
//       {/* Inject Blinking CSS */}
//       <style>{blinkStyle}</style>

//       <Container fluid className="mt-4">

//         {/* HEADER WITH BLINKING RED CIRCLE */}
//         <div
//           className="d-flex align-items-center mb-3"
//           style={{
//             borderLeft: "5px solid #d60000",
//             paddingLeft: 12,
//           }}
//         >
//           <h5 className="fw-bold m-0"
//             style={{
            
//               padding: "6px 12px",
//               color: "black",
             
//             }}
//           >
//             🔴 लाइव समाचार
//           </h5>

//           <hr className="flex-grow-1 mx-3" style={{ opacity: 0.2 }} />
//         </div>

//         <Row>

//           {/* LEFT SIDE MAIN CARD */}
//           <Col lg={7} className="mb-4">
//             {mainLive && (
//               <div
//                 style={{
//                   background: "#b60000",
//                   padding: "15px",
//                   borderRadius: "10px",
//                   color: "white",
//                   display: "flex",
//                   gap: "15px",
//                   width: "170%",
//                 }}
//               >
//                 {/* LEFT IMAGE */}
//                 <div
//                   style={{
//                     width: "50%",
//                     height: "300px",
//                     position: "relative",
//                     borderRadius: "10px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <MediaRenderer item={mainLive} />

//                   {/* ⭐ BLINKING LIVE TAG ON IMAGE */}
//                   <div
//                     className="blink-live"
//                     style={{
//                       position: "absolute",
//                       top: "10px",
//                       left: "10px",
//                       background: "#ff0000",
//                       fontSize: "12px",
//                       padding: "4px 10px",
//                       borderRadius: "4px",
//                       fontWeight: "bold",
//                       color: "white",
//                     }}
//                   >
//                     LIVE
//                   </div>
//                 </div>

//                 {/* RIGHT CONTENT */}
//                 <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
//                   <Link
//                     to={`/live/${mainLive.slug_en || mainLive._id}`}
//                     style={{
//                       color: "white",
//                       fontSize: "22px",
//                       fontWeight: "bold",
//                       lineHeight: "1.4",
//                       textDecoration: "none",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     {mainLive.title_hi}
//                   </Link>

//                   <ul style={{ paddingLeft: "20px", margin: 0 }}>
//                     <li style={{ marginBottom: "8px" }}>
//                       {mainLive.title_hi.slice(0, 50)}...
//                     </li>
//                     <li style={{ marginBottom: "8px" }}>Breaking update जारी...</li>
//                     <li style={{ marginBottom: "8px" }}>घटना के नए तथ्य सामने आए...</li>
//                     <li style={{ marginBottom: "8px" }}>और जानकारी की प्रतीक्षा...</li>
//                   </ul>

//                   <small style={{ opacity: 0.8, marginTop: "auto" }}>
//                     {mainLive.createdBy?.name || "EMS News"} | {formatDate(mainLive.createdAt)}
//                   </small>
//                 </div>
//               </div>
//             )}

//             {/* BOTTOM CARD */}
//             {bottomLive && (
//               <Link
//                 to={`/live/${bottomLive.slug_en || bottomLive._id}`}
//                 className="text-decoration-none text-dark"
//               >
//                 <Row
//                   className="align-items-center mt-3"
//                   style={{
//                     padding: "10px",
//                     borderRadius: "10px",
//                     borderLeft: "4px solid #d60000",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                     background: "#fff",
//                   }}
//                 >
//                   <Col xs={4}>
//                     <MediaRenderer item={bottomLive} />
//                   </Col>
//                   <Col xs={8}>
//                     <p className="fw-bold m-0">{bottomLive.title_hi}</p>
//                     <small className="text-muted">
//                       {bottomLive.createdBy?.name} | {formatDate(bottomLive.createdAt)}
//                     </small>
//                   </Col>
//                 </Row>
//               </Link>
//             )}
//           </Col>

//           {/* RIGHT COLUMN */}
//           <Col lg={5}>
//             {sideLive.map((item, index) => (
//               <React.Fragment key={item._id}>
//                 <Link
//                   to={`/live/${item.slug_en || item._id}`}
//                   className="text-decoration-none text-dark"
//                 >
//                   <Row
//                     className="align-items-center mb-3"
//                     style={{
//                       padding: "10px",
//                       borderRadius: "10px",
//                       background: "#fff",
//                       borderLeft: "4px solid #d60000",
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                     }}
//                   >
//                     <Col xs={4}>
//                       <MediaRenderer item={item} />
//                     </Col>
//                     <Col xs={8}>
//                       <p className="fw-bold mb-1">{item.title_hi}</p>
//                       <small className="text-muted">
//                         {item.createdBy?.name} | {formatDate(item.createdAt)}
//                       </small>
//                     </Col>
//                   </Row>
//                 </Link>

//                 {index < sideLive.length - 1 && (
//                   <hr style={{ opacity: 0.15 }} />
//                 )}
//               </React.Fragment>
//             ))}
//           </Col>

//         </Row>
//       </Container>
//     </>
//   );
// };

// export default LiveNewsSection;



import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { allLiveNews } from "../../Services/authApi";
import { Link } from "react-router-dom";

// ⭐ CUSTOM CSS (Blink + Responsive Layout)
const customStyle = `
  /* Blinking Animation */
  @keyframes blink {
    0% { opacity: 1; background-color: red; }
    50% { opacity: 0.3; background-color: white; color: red; }
    100% { opacity: 1; background-color: red; }
  }
  .blink-live {
    animation: blink 1s infinite;
  }

  /* 🔴 RESPONSIVE CARD SETTINGS */
  .responsive-main-card {
    background: #b60000;
    padding: 15px;
    border-radius: 10px;
    color: white;
    display: flex;
    gap: 15px;
    position: relative;
  }

  /* DESKTOP VIEW (Large Screen) - Keep your original 170% width */
  @media (min-width: 992px) {
    .responsive-main-card {
      width: 170%;        /* Your requested width */
      flex-direction: row; /* Side by side */
    }
    .responsive-child {
      width: 50%;
    }
  }

  /* MOBILE/TABLET VIEW (Small Screen) - Stack vertically */
  @media (max-width: 991px) {
    .responsive-main-card {
      width: 100%;           /* Fit to screen */
      flex-direction: column; /* Image Top, Text Bottom */
    }
    .responsive-child {
      width: 100%;
    }
    .image-container {
      height: 250px; /* Adjusted height for mobile */
    }
  }
`;

const MediaRenderer = ({ item }) => {
  const coverImage = item?.coverImage?.url;
  const updateMedia = item?.updates?.[0]?.media?.[0]?.url;
  const mediaUrl = coverImage || updateMedia;

  return (
    <img
      src={mediaUrl}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

const LiveNewsSection = () => {
  const [liveNews, setLiveNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await allLiveNews();
        if (res.success) setLiveNews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLive();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("hi-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  };

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" />
      
      </div>
    );
  }

  if (liveNews.length === 0) {
    return (
      <Container fluid className="mt-4">
        {/* Empty state */}
      </Container>
    );
  }

  const mainLive = liveNews[0];
  const bottomLive = liveNews[1];
  const sideLive = liveNews.slice(2, 6);

  return (
    <>
      {/* Inject CSS */}
      <style>{customStyle}</style>

      <Container fluid className="mt-4">

        {/* HEADER */}
        <div
          className="d-flex align-items-center mb-3"
          style={{
            borderLeft: "5px solid #d60000",
            paddingLeft: 12,
          }}
        >
          <h5 className="fw-bold m-0" style={{ padding: "6px 12px", color: "black" }}>
            🔴 लाइव समाचार
          </h5>
          <hr className="flex-grow-1 mx-3" style={{ opacity: 0.2 }} />
        </div>

        <Row>
          {/* LEFT SIDE MAIN CARD */}
          <Col lg={7} className="mb-4">
            {mainLive && (
              // ⭐ Using the new class here
              <div className="responsive-main-card">
                
                {/* LEFT IMAGE (Top on Mobile) */}
                <div
                  className="responsive-child"
                  style={{
                    // height: "300px",
                    height: window.innerWidth <= 576 ? "180px" : "300px", // 📱 image chhoti
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <MediaRenderer item={mainLive} />

                  <div
                    className="blink-live"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "#ff0000",
                      fontSize: "12px",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    LIVE
                  </div>
                </div>

                {/* RIGHT CONTENT (Bottom on Mobile) */}
                <div 
                  className="responsive-child" 
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Link
                    to={`/live/${mainLive.slug_en || mainLive._id}`}
                    style={{
                      color: "white",
                      fontSize: "22px",
                      fontWeight: "bold",
                      lineHeight: "1.4",
                      textDecoration: "none",
                      marginBottom: "12px",
                    }}
                  >
                    {mainLive.title_hi}
                  </Link>

                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    <li style={{ marginBottom: "8px" }}>
                      {mainLive.title_hi.slice(0, 50)}...
                    </li>
                    <li style={{ marginBottom: "8px" }}>Breaking update जारी...</li>
                    <li style={{ marginBottom: "8px" }}>घटना के नए तथ्य सामने आए...</li>
                    <li style={{ marginBottom: "8px" }}>और जानकारी की प्रतीक्षा...</li>
                  </ul>

                  <small style={{ opacity: 0.8, marginTop: "auto" }}>
                    {mainLive.createdBy?.name || "EMS News"} | {formatDate(mainLive.createdAt)}
                  </small>
                </div>
              </div>
            )}

            {/* BOTTOM CARD */}
            {bottomLive && (
              <Link
                to={`/live/${bottomLive.slug_en || bottomLive._id}`}
                className="text-decoration-none text-dark"
              >
                <Row
                  className="align-items-center mt-3"
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    borderLeft: "4px solid #d60000",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    background: "#fff",
                  }}
                >
                  <Col xs={4}>
                    <MediaRenderer item={bottomLive} />
                  </Col>
                  <Col xs={8}>
                    <p className="fw-bold m-0">{bottomLive.title_hi}</p>
                    <small className="text-muted">
                      {bottomLive.createdBy?.name} | {formatDate(bottomLive.createdAt)}
                    </small>
                  </Col>
                </Row>
              </Link>
            )}
          </Col>

          {/* RIGHT COLUMN */}
          <Col lg={5}>
            {sideLive.map((item, index) => (
              <React.Fragment key={item._id}>
                <Link
                  to={`/live/${item.slug_en || item._id}`}
                  className="text-decoration-none text-dark"
                >
                  <Row
                    className="align-items-center mb-3"
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      background: "#fff",
                      borderLeft: "4px solid #d60000",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Col xs={4}>
                      <MediaRenderer item={item} />
                    </Col>
                    <Col xs={8}>
                      <p className="fw-bold mb-1">{item.title_hi}</p>
                      <small className="text-muted">
                        {item.createdBy?.name} | {formatDate(item.createdAt)}
                      </small>
                    </Col>
                  </Row>
                </Link>

                {index < sideLive.length - 1 && (
                  <hr style={{ opacity: 0.15 }} />
                )}
              </React.Fragment>
            ))}
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default LiveNewsSection;