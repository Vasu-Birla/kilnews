

// import React, { useState, useEffect } from "react";
// import { Image, Spinner, Button, Alert } from "react-bootstrap"; // Alert भी import करें
// import { useNavigate } from "react-router-dom";
// import { allNews } from "../../../Services/authApi";

// // Media Renderer Helper Component (जैसा कि अन्य कॉम्पोनेन्ट्स में उपयोग किया गया है)
// const MediaRenderer = ({ media, alt, width, height, objectFit = "cover", borderRadius = "8px" }) => {
//   const firstMedia = media?.[0];
//   const isVideo = firstMedia && firstMedia.type === 'video';
//   const mediaUrl = firstMedia?.url;

//   const commonStyles = {
//     width: width,
//     height: height,
//     objectFit: objectFit,
//     borderRadius: borderRadius,
//     backgroundColor: "#e0e0e0", // Empty/error states के लिए consistent background
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
//       const placeholderWidth = parseInt(width) || 100; // Adjusted for this section's image size
//       const placeholderHeight = parseInt(height) || 90; // Adjusted for this section's image size
//       return (
//         <Image
//           src={`https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=VIDEO+URL+MISSING`}
//           alt={alt}
//           style={commonStyles}
//         />
//       );
//     }
//   } else {
//     const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 100}x${parseInt(height) || 90}?text=No+Media`; // Adjusted for this section's image size
//     return (
//       <Image
//         src={imageSrc}
//         alt={alt}
//         style={commonStyles}
//         onError={(e) => {
//           const placeholderWidth = parseInt(width) || 100; // Adjusted for this section's image size
//           const placeholderHeight = parseInt(height) || 90; // Adjusted for this section's image size
//           e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
//           console.error("Image failed to load:", e.target.src);
//         }}
//       />
//     );
//   }
// };


// const TopHeadlinesSection = () => {
//   const [headlines, setHeadlines] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const [error, setError] = useState(null); // Error state जोड़ा गया

//   const navigate = useNavigate();

//   const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

//   useEffect(() => {
//     allNews()
//       .then((response) => {
//         // console.log("API Response Raw:", response); // ✅ Debug

//         if (response?.success) {
//           const filteredData = response.data.filter((article) => {
//             const cat = article?.category?.name?.toLowerCase();
//             if (!cat) return false;

//             return !(
//               cat === "sports" ||
//               cat === "flash" ||
//               HOROSCOPE_CATEGORY.includes(cat)
//             );
//           });

//           // console.log("Filtered Headlines:", filteredData); // ✅ Debug
//           setHeadlines(filteredData);
//         } else {
//           setError("Failed to load news"); // API विफल होने पर एरर सेट करें
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load news", err);
//         setError(err.message || "An error occurred"); // कैच एरर
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="text-center my-4">
//         <Spinner animation="border" size="sm" />
//         <p>Loading headlines...</p> {/* लोडिंग टेक्स्ट जोड़ा गया */}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="danger" className="my-4">
//         त्रुटि: {error} {/* एरर डिस्प्ले करें */}
//       </Alert>
//     );
//   }

//   const displayedHeadlines = showAll ? headlines : headlines.slice(0, 5);

//   if (!displayedHeadlines.length) { // कोई हेडलाइन न होने पर
//     return (
//       <div className="text-center my-4">
//         <p>No headlines available.</p>
//       </div>
//     );
//   }


//   return (
//     <div className="mb-4">
//       {/* Section Heading */}
//       <div className="d-flex align-items-center mb-3">
//         <div
//           style={{
//             width: "3px",
//             height: "16px",
//             backgroundColor: "#C00000",
//             marginRight: "8px",
//           }}
//         />
//         <h4
//           className="fw-bold m-0"
//           style={{ fontSize: "22px", lineHeight: "1.3", color: "#000" }}
//         >
//           Top Headlines
//         </h4>
//         <div
//           style={{
//             flex: 1,
//             height: "2px",
//             backgroundColor: "#C00000",
//             marginLeft: "12px",
//           }}
//         />
//       </div>

//       {displayedHeadlines.map((item) => {
//         const title = item?.title_hi || item?.title_en || "Untitled";
//         // ✅ MediaRenderer को अब imageUrl की सीधे जरूरत नहीं, MediaRenderer खुद हैंडल करेगा
//         const finalSlug = item?.slug || item?.slug_en || item?._id;

//         return (
//           <div
//             key={item._id}
//             className="mb-3"
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               // console.log("Clicked Item:", item); // ✅ Debug
//               navigate(`/news/${finalSlug}`, {
//                 state: { relatedArticles: headlines },
//               });
//             }}
//           >
//             {/* Category Name */}
//             <p className="text-danger small fw-bold mb-2">
//               {item.category?.name || "General"}
//             </p>

//             <div className="d-flex flex-wrap align-items-center">
//               {/* MediaRenderer का उपयोग करें */}
//               <div className="me-3 mb-2 mb-sm-0 rounded overflow-hidden flex-shrink-0"
//                    style={{ width: "100px", height: "90px" }} // रैपर div को fixed size दें
//               >
//                 <MediaRenderer
//                   media={item.media}
//                   alt={title}
//                   width="100%" // MediaRenderer अपने रैपर div का 100% width लेगा
//                   height="100%" // MediaRenderer अपने रैपर div का 100% height लेगा
//                   objectFit="cover"
//                   borderRadius="0px" // Rounded class ऊपर div पर है
//                 />
//               </div>

//               <p
//                 className="fw-bold m-0"
//                 style={{ fontSize: "0.9rem", lineHeight: "1.4", flex: 1 }}
//               >
//                 {title}
//               </p>
//             </div>
//           </div>
//         );
//       })}

//       {headlines.length > 5 && (
//         <div className="text-center mt-2">
//           <Button variant="link" onClick={() => setShowAll(!showAll)}>
//             {showAll ? "Read Less" : "Read More"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopHeadlinesSection;

import React, { useState, useEffect } from "react";
import { Image, Spinner, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { allNews } from "../../../Services/authApi";

// ✅ MediaRenderer (unchanged)
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
        />
      );
    } else {
      const placeholderWidth = parseInt(width) || 100;
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
    const imageSrc = mediaUrl || `https://via.placeholder.com/${parseInt(width) || 100}x${parseInt(height) || 90}?text=No+Media`;
    return (
      <Image
        src={imageSrc}
        alt={alt}
        style={commonStyles}
        onError={(e) => {
          const placeholderWidth = parseInt(width) || 100;
          const placeholderHeight = parseInt(height) || 90;
          e.target.src = `https://via.placeholder.com/${placeholderWidth}x${placeholderHeight}?text=Error`;
          console.error("Image failed to load:", e.target.src);
        }}
      />
    );
  }
};

const TopHeadlinesSection = () => {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HOROSCOPE_CATEGORY = ["horoscope", "rashifal", "astrology"];

  useEffect(() => {
    allNews()
      .then((response) => {
        if (response?.success) {
          const filteredData = response.data.filter((article) => {
            const cat = article?.category?.name?.toLowerCase();
            if (!cat) return false;
            return !(
              cat === "sports" ||
              cat === "flash" ||
              HOROSCOPE_CATEGORY.includes(cat)
            );
          });
          setHeadlines(filteredData);
        } else {
          setError("Failed to load news");
        }
      })
      .catch((err) => {
        console.error("Failed to load news", err);
        setError(err.message || "An error occurred");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" size="sm" />
        <p>Loading headlines...</p>
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

  const displayedHeadlines = showAll ? headlines : headlines.slice(0, 5);

  if (!displayedHeadlines.length) {
    return (
      <div className="text-center my-4">
        <p>No headlines available.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {/* Section Heading */}
      <div className="d-flex align-items-center mb-3">
        <div
          style={{
            width: "3px",
            height: "16px",
            backgroundColor: "#C00000",
            marginRight: "8px",
          }}
        />
        <h4
          className="fw-bold m-0"
          style={{ fontSize: "22px", lineHeight: "1.3", color: "#000" }}
        >
          Top Headlines
        </h4>
        <div
          style={{
            flex: 1,
            height: "2px",
            backgroundColor: "#C00000",
            marginLeft: "12px",
          }}
        />
      </div>

      {displayedHeadlines.map((item, index) => {
        const title = item?.title_hi || item?.title_en || "Untitled";
        const finalSlug = item?.slug || item?.slug_en || item?._id;

        return (
          <div
            key={item._id}
            className="mb-3 pb-3"
            style={{
              cursor: "pointer",
              borderBottom:
                index !== displayedHeadlines.length - 1
                  ? "1px solid #d3d3d3" // ✅ Gray line after every card except last
                  : "none",
            }}
            onClick={() =>
              navigate(`/news/${finalSlug}`, {
                state: { relatedArticles: headlines },
              })
            }
          >
            {/* Category */}
            <p className="text-danger small fw-bold mb-2">
              {item.category?.name || "General"}
            </p>

            <div className="d-flex align-items-start">
              <div
                className="me-3 mb-2 mb-sm-0 rounded overflow-hidden flex-shrink-0"
                style={{ width: "80px", height: "70px" }}
              >
                <MediaRenderer
                  media={item.media}
                  alt={title}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  borderRadius="0px"
                />
              </div>

              {/* <p
                className="fw-bold m-0"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.4",
                  flex: 1,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // ✅ 3 lines max
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </p> */}

                   <div 
                       className="news-headline-master mb-1"
                    style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
                dangerouslySetInnerHTML={{ __html: title }} 
              />
            </div>
          </div>
        );
      })}

      {headlines.length > 5 && (
        <div className="text-center mt-2">
          <Button variant="link" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Read Less" : "Read More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopHeadlinesSection;
