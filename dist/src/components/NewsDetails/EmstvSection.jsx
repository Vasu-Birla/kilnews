

// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
// import { getVideo } from "../../Services/authApi";

// const EmstvSection = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const res = await getVideo();
//         if (res?.success) {
//           setVideos(res.data);
//         } else {
//           setError("Failed to load videos");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching videos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" variant="light" />
//       </div>
//     );

//   if (error) return <Alert variant="danger">{error}</Alert>;
//   if (videos.length === 0) return null;

//   const mainVideo = videos[0];
//   const belowMainVideo = videos[1];
//   const rightSideVideos = videos.slice(2, 10);

//   // ✅ Utility to get thumbnail for YouTube
//   const getThumbnailUrl = (url) => {
//     if (!url) return "https://via.placeholder.com/400x225";
//     let videoId = "";
//     if (url.includes("youtu.be")) videoId = url.split("/").pop().split("?")[0];
//     else if (url.includes("youtube.com/watch"))
//       videoId = new URL(url).searchParams.get("v");
//     return videoId
//       ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//       : "https://via.placeholder.com/400x225";
//   };

//   const mutedTextStyle = { color: "rgba(255,255,255,0.7)" };

//   // ✅ Navigate to full detail page
//   const handleVideoClick = (video) => {
//     const slugToNavigate = video.slug ? video.slug : video._id;
//     navigate(`/video/${slugToNavigate}`, {
//       state: { videos, currentVideo: video },
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ✅ Video/YouTube rendering helper
//   const renderVideo = (video, isMain = false) => {
//     const isYouTube =
//       video.videoUrl?.includes("youtube.com") ||
//       video.videoUrl?.includes("youtu.be");

//     return (
//       <div
//         onClick={() => handleVideoClick(video)}
//         // 👇 CHANGE 1: mb-3 को mb-2 कर दिया है ताकि गैप कम हो, और flex-grow-1 हटा दिया है
//         className="d-block mb-4" 
//         style={{ cursor: "pointer" }}
//       >
//         <div className="ratio ratio-16x9 rounded overflow-hidden mb-2">
//           {isYouTube ? (
//             <Image
//               src={getThumbnailUrl(video.videoUrl)}
//               alt={video.title}
//               className="w-100 h-100"
//               style={{ objectFit: "cover", borderRadius: "8px" }}
//             />
//           ) : (
//             <video
//               src={video.videoUrl}
//               controls
//               className="w-100 h-100 rounded"
//               style={{ objectFit: "cover", borderRadius: "8px" }}
//             />
//           )}
//         </div>
//         <h6 className="fw-bold mb-1 text-white">{video.title}</h6>
//         <div className="d-flex align-items-center">
//           <Image
//             src={video.createdBy?.profileImage || "https://via.placeholder.com/40"}
//             roundedCircle
//             width={25}
//             height={25}
//           />
//           <small className="ms-2" style={{ ...mutedTextStyle, fontSize: "0.8rem" }}>
//             {video.createdBy?.email || "EMS TV"} |{" "}
//             {new Date(video.createdAt).toLocaleDateString("hi-IN")}
//           </small>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}>
//       <Container fluid className="py-4">
//         {/* ==== EMS TV Section Heading ==== */}
//         <div className="d-flex align-items-center mb-3 flex-wrap">
//           <div className="d-flex align-items-center flex-shrink-0 mb-2 mb-sm-0">
//             <div
//               style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
//               className="me-2"
//             ></div>
//             <h5 className="fw-bold m-0 text-white">EMS TV</h5>
//           </div>
//           <hr className="flex-grow-1 mx-2 mx-sm-3 border-danger border-2 opacity-100 my-0" />
//           <Link
//             to="/emstv"
//             className="text-decoration-none fw-bold small flex-shrink-0"
//             style={{ color: "#2E6E9E" }}
//           >
//             और देखें <FaArrowRight size={12} />
//           </Link>
//         </div>

//         <Row className="align-items-stretch">
//           {/* ===== Left Section ===== */}
//           <Col xs={12} md={5} className="d-flex flex-column">
//             {mainVideo && renderVideo(mainVideo, true)}

//             {/* === Below Main Video === */}
//             {belowMainVideo && (
//               <div
//                 onClick={() => handleVideoClick(belowMainVideo)}
//                 // 👇 CHANGE 2: यहाँ से 'mt-auto' हटा दिया गया है ताकि यह ऊपर शिफ्ट हो जाए
//                 className="mt-2" 
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex">
//                   <div
//                     className="flex-shrink-0 me-2"
//                     style={{ width: "100px", height: "70px" }}
//                   >
//                     {belowMainVideo.videoUrl?.includes(".mp4") ? (
//                       <video
//                         src={belowMainVideo.videoUrl}
//                         className="w-100 h-100 rounded"
//                         style={{ objectFit: "cover", borderRadius: "8px" }}
//                         muted
//                       />
//                     ) : (
//                       <Image
//                         src={getThumbnailUrl(belowMainVideo.videoUrl)}
//                         alt={belowMainVideo.title}
//                         className="w-100 h-100 rounded"
//                         style={{ objectFit: "cover", borderRadius: "8px" }}
//                       />
//                     )}
//                   </div>
//                   <div>
//                     <p className="fw-bold small mb-1 text-white">
//                       {belowMainVideo.title}
//                     </p>
//                     <div className="d-flex align-items-center">
//                       <Image
//                         src={
//                           belowMainVideo.createdBy?.profileImage ||
//                           "https://via.placeholder.com/30"
//                         }
//                         roundedCircle
//                         width={20}
//                         height={20}
//                       />
//                       <small
//                         className="ms-2"
//                         style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                       >
//                         {belowMainVideo.createdBy?.email || "EMS"} |{" "}
//                         {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Col>

//           {/* ===== Right Section ===== */}
//           <Col xs={12} md={7} className="d-flex flex-column">
//             <Row className="mt-2 mt-md-0">
//               {rightSideVideos.map((video) => (
//                 <Col xs={12} sm={6} key={video._id} className="mb-4">
//                   <div
//                     onClick={() => handleVideoClick(video)}
//                     style={{ cursor: "pointer" }}
//                     className="d-flex"
//                   >
//                     <div
//                       className="flex-shrink-0 me-2"
//                       style={{ width: "100px", height: "70px" }}
//                     >
//                       {video.videoUrl?.includes(".mp4") ? (
//                         <video
//                           src={video.videoUrl}
//                           className="w-100 h-100 rounded"
//                           muted
//                           autoPlay="true"
//                           style={{ objectFit: "cover", borderRadius: "8px" }}
//                         />
//                       ) : (
//                         <Image
//                           src={getThumbnailUrl(video.videoUrl)}
//                           alt={video.title}
//                           className="w-100 h-100 rounded"
//                           style={{ objectFit: "cover", borderRadius: "8px" }}
//                         />
//                       )}
//                     </div>
//                     <div>
//                       <p
//                         className="fw-bold small mb-1 text-white"
//                         style={{
//                           fontSize: "0.9rem",
//                           lineHeight: "1.3",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {video.title}
//                       </p>
//                       <div className="d-flex align-items-center">
//                         <Image
//                           src={video.createdBy?.profileImage || "https://via.placeholder.com/30"}
//                           roundedCircle
//                           width={20}
//                           height={20}
//                         />
//                         <small
//                           className="ms-2"
//                           style={{ ...mutedTextStyle, fontSize: "0.75rem" }}
//                         >
//                           {video.createdBy?.email || "EMS"} |{" "}
//                           {new Date(video.createdAt).toLocaleDateString("hi-IN")}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default EmstvSection;

import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getVideo } from "../../Services/authApi";

const EmstvSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await getVideo();
        if (res?.success) setVideos(res.data || []);
        else setError("Failed to load videos");
      } catch (err) {
        setError(err.message || "Error fetching videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!videos.length) return null;

  const mainVideo = videos[0];
  const belowMainVideo = videos?.[1] || null;
  const rightSideVideos = videos.slice(2, 10);

  const mutedTextStyle = { color: "rgba(255,255,255,0.7)" };

  // ✅ Safe YouTube thumbnail
  const getThumbnailUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x225";

    try {
      let videoId = "";

      if (url.includes("youtu.be")) {
        videoId = url.split("/").pop()?.split("?")[0];
      } else if (url.includes("youtube.com/watch")) {
        const u = new URL(url);
        videoId = u.searchParams.get("v");
      }

      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "https://via.placeholder.com/400x225";
    } catch {
      return "https://via.placeholder.com/400x225";
    }
  };

  const handleVideoClick = (video) => {
    if (!video) return;

    const slugToNavigate = video.slug || video._id;

    navigate(`/video/${slugToNavigate}`, {
      state: { currentVideo: video },
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderVideo = (video) => {
    const isYouTube =
      video?.videoUrl?.includes("youtube.com") ||
      video?.videoUrl?.includes("youtu.be");

    return (
      <div
        onClick={() => handleVideoClick(video)}
        className="d-block mb-3"
        style={{ cursor: "pointer" }}
      >
        <div className="ratio ratio-16x9 rounded overflow-hidden mb-2">
          {isYouTube ? (
            <Image
              src={getThumbnailUrl(video.videoUrl)}
              alt={video.title}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <video
              src={video.videoUrl}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <h6 className="fw-bold mb-1 text-white">{video.title}</h6>

        <div className="d-flex align-items-center">
          <Image
            src={video.createdBy?.profileImage || "https://via.placeholder.com/40"}
            roundedCircle
            width={25}
            height={25}
          />
          <small className="ms-2" style={mutedTextStyle}>
            {video.createdBy?.email || "EMS TV"} |{" "}
            {new Date(video.createdAt).toLocaleDateString("hi-IN")}
          </small>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4" style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
      <Container fluid className="py-4">

        {/* Heading */}
        <div className="d-flex align-items-center mb-3 flex-wrap">
          <div className="d-flex align-items-center flex-shrink-0">
            <div
              style={{ width: "5px", height: "24px", backgroundColor: "#A12D2A" }}
              className="me-2"
            />
            <h5 className="fw-bold m-0 text-white">EMS TV</h5>
          </div>

          <hr className="flex-grow-1 mx-3 border-danger border-2 opacity-100" />

          <Link
            to="/emstv"
            className="text-decoration-none fw-bold small"
            style={{ color: "#2E6E9E" }}
          >
            और देखें <FaArrowRight size={12} />
          </Link>
        </div>

        <Row>
          {/* LEFT SIDE */}
          <Col xs={12} md={5}>
            {mainVideo && renderVideo(mainVideo)}

            {belowMainVideo && (
              <div
                onClick={() => handleVideoClick(belowMainVideo)}
                className="mt-2 d-flex"
                style={{ cursor: "pointer" }}
              >
                <div style={{ width: "100px", height: "70px" }}>
                  {belowMainVideo.videoUrl?.includes(".mp4") ? (
                    <video
                      src={belowMainVideo.videoUrl}
                      className="w-100 h-100 rounded"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={getThumbnailUrl(belowMainVideo.videoUrl)}
                      className="w-100 h-100 rounded"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>

                <div className="ms-2">
                  <p className="fw-bold small mb-1 text-white">
                    {belowMainVideo.title}
                  </p>

                  <small style={mutedTextStyle}>
                    {belowMainVideo.createdBy?.email || "EMS"} |{" "}
                    {new Date(belowMainVideo.createdAt).toLocaleDateString("hi-IN")}
                  </small>
                </div>
              </div>
            )}
          </Col>

          {/* RIGHT SIDE */}
          <Col xs={12} md={7}>
            <Row>
              {rightSideVideos.map((video) => (
                <Col xs={12} sm={6} key={video._id} className="mb-3">
                  <div
                    onClick={() => handleVideoClick(video)}
                    className="d-flex"
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ width: "100px", height: "70px" }}>
                      {video.videoUrl?.includes(".mp4") ? (
                        <video
                          src={video.videoUrl}
                          className="w-100 h-100 rounded"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <Image
                          src={getThumbnailUrl(video.videoUrl)}
                          className="w-100 h-100 rounded"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>

                    <div className="ms-2">
                      <p
                        className="fw-bold small mb-1 text-white"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {video.title}
                      </p>

                      <small style={mutedTextStyle}>
                        {video.createdBy?.email || "EMS"} |{" "}
                        {new Date(video.createdAt).toLocaleDateString("hi-IN")}
                      </small>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default EmstvSection;