// // import React, { useEffect, useState } from "react";
// // import { fetchActiveAds } from "../../Services/authApi";

// // const BottomAdBanner = () => {
// //   const [bottomAd, setBottomAd] = useState(null);

// //   useEffect(() => {
// //     const loadAds = async () => {
// //       try {
// //         const res = await fetchActiveAds();
// //         if (res?.success && Array.isArray(res.ads)) {
// //           // sirf "bottom" ya baaki jahan position define nahi ho → ek ad choose kar lo
// //           const ad = res.ads.find(ad => ad.position === "bottom") || res.ads[0];
// //           setBottomAd(ad || null);
// //         }
// //       } catch (err) {
// //         console.log("Bottom ad not available");
// //       }
// //     };

// //     loadAds();
// //   }, []);

// //   if (!bottomAd) return null;

// //   return (
// //     <div className="bottom-ad-wrapper">
// //       <img
// //         src={bottomAd.mediaUrl}
// //         alt={bottomAd.title || "Advertisement"}
// //       />

// //       <style>{`
// //         .bottom-ad-wrapper {
// //           width: 100%;
// //           max-width: 728px;
// //           margin: 20px auto 0;
// //           overflow: hidden;
// //         }

// //         .bottom-ad-wrapper img {
// //           width: 100%;
// //           height: auto;
// //           aspect-ratio: 728 / 90;
// //           object-fit: cover;
// //           border-radius: 5px;
// //         }

// //         /* Tablet / Mobile Responsive */
// //         @media (max-width: 991px) {
// //           .bottom-ad-wrapper img {
// //             width: 100%;
// //             height: auto;
// //             aspect-ratio: 728 / 90; /* shrink height automatically */
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default BottomAdBanner;

// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// const BottomAdBanner = () => {
//   const [bottomAd, setBottomAd] = useState(null);

//   useEffect(() => {
//     const loadAds = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
//           const ad = res.ads.find(ad => ad.position === "bottom");
//           setBottomAd(ad || null);
//         }
//       } catch (err) {
//         console.log("Bottom ad not available");
//       }
//     };

//     loadAds();
//   }, []);

//   // ❌ No ad → nothing render
//   if (!bottomAd) return null;

//   return (
//     <div className="bottom-ad-wrapper">
//       <a
//         href={bottomAd.link || "#"}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <img
//           src={bottomAd.mediaUrl}
//           alt={bottomAd.title || "Advertisement"}
//         />
//       </a>

//       <style>{`
//         /* 🖥️ Desktop – 970 × 250 */
//         .bottom-ad-wrapper {
//           width: 100%;
//           max-width: 970px;
//           margin: 24px auto 0;
//           overflow: hidden;
//         }

//         .bottom-ad-wrapper img {
//           width: 100%;
//           height: auto;
//           aspect-ratio: 970 / 250;
//           object-fit: cover;
//           border-radius: 6px;
//         }

//         /* 📱 Tablet / Mobile – responsive shrink */
//         @media (max-width: 991px) {
//           .bottom-ad-wrapper {
//             max-width: 100%;
//             padding: 0 10px;
//           }

//           .bottom-ad-wrapper img {
//             aspect-ratio: 970 / 250;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BottomAdBanner;


// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// // 🟢 props me 'category' receive kiya
// const BottomAdBanner = ({ category }) => {
//   const [bottomAd, setBottomAd] = useState(null);

//   useEffect(() => {
//     const loadAds = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
          
//           // 🔹 Filter Logic Updated
//           const ad = res.ads.find(a => {
//             const isPosMatch = a.position === "bottom";
            
//             const isCatMatch = category 
//                ? a.categories?.some(c => c.toLowerCase() === category.toLowerCase())
//                : true;

//             return isPosMatch && isCatMatch;
//           });

//           setBottomAd(ad || null);
//         }
//       } catch (err) {
//         console.log("Bottom ad not available");
//       }
//     };

//     loadAds();
//   }, [category]); // 🟢 Dependency added

//   if (!bottomAd) return null;

//   return (
//     <div className="bottom-ad-wrapper">
//       <a href={bottomAd.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={bottomAd.mediaUrl} alt={bottomAd.title || "Advertisement"} />
//       </a>
//       {/* CSS Same as before */}
//       <style>{`
//         .bottom-ad-wrapper { width: 100%; max-width: 970px; margin: 24px auto 0; overflow: hidden; }
//         .bottom-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 970 / 250; object-fit: cover; border-radius: 6px; }
//         @media (max-width: 991px) {
//           .bottom-ad-wrapper { max-width: 100%; padding: 0 10px; }
//           .bottom-ad-wrapper img { aspect-ratio: 970 / 250; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BottomAdBanner;


import React, { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/authApi";

// 🟢 props me 'category' receive kiya
const BottomAdBanner = ({ category }) => {
  const [bottomAd, setBottomAd] = useState(null);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await fetchActiveAds();

        if (res?.success && Array.isArray(res.ads)) {
          // 🔹 Filter Logic (same as before)
          const ad = res.ads.find(a => {
            const isPosMatch = a.position === "bottom";

            const isCatMatch = category
              ? a.categories?.some(
                  c => c.toLowerCase() === category.toLowerCase()
                )
              : true;

            return isPosMatch && isCatMatch;
          });

          setBottomAd(ad || null);
        }
      } catch (err) {
        console.log("Bottom ad not available");
      }
    };

    loadAds();
  }, [category]);

  if (!bottomAd) return null;

  // 🔹 MEDIA HANDLER (image / gif / video)
  const renderAdMedia = () => {
    if (bottomAd.mediaType === "video") {
      return (
        <video
          src={bottomAd.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      );
    }

    // image & gif
    return (
      <img
        src={bottomAd.mediaUrl}
        alt={bottomAd.title || "Advertisement"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 6,
        }}
      />
    );
  };

  return (
    <div className="bottom-ad-wrapper">
      {bottomAd.link ? (
        <a href={bottomAd.link} target="_blank" rel="noopener noreferrer">
          {renderAdMedia()}
        </a>
      ) : (
        renderAdMedia()
      )}

      <style>{`
        .bottom-ad-wrapper {
          width: 100%;
          max-width: 970px;
          margin: 24px auto 0;
          overflow: hidden;
        }

        .bottom-ad-wrapper img,
        .bottom-ad-wrapper video {
          width: 100%;
          height: auto;
          aspect-ratio: 970 / 250;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .bottom-ad-wrapper {
            max-width: 100%;
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default BottomAdBanner;
