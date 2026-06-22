// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// // ✅ Second Inline Ad Component
// const SecondInlineAdBanner = () => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
//           const inlineAds = res.ads.filter(a => a.position === "inline2");
//           setAd(inlineAds[1] || null); // second inline ad
//         }
//       } catch {
//         console.log("Second inline ad not available");
//       }
//     };
//     loadAd();
//   }, []);

//   if (!ad) return null;

//   return (
//     <div className="inline-ad-wrapper">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>

//       <style>{`
//         .inline-ad-wrapper {
//           width: 100%;
//           max-width: 728px;
//           margin: 20px auto;
//         }

//         .inline-ad-wrapper img {
//           width: 100%;
//           height: auto;
//           aspect-ratio: 728 / 90;
//           object-fit: cover;
//           border-radius: 4px;
//         }

//         @media (max-width: 991px) {
//           .inline-ad-wrapper {
//             max-width: 100%;
//             padding: 0 10px;
//           }
//           .inline-ad-wrapper img {
//             aspect-ratio: 728 / 90;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SecondInlineAdBanner;


// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// const SecondInlineAdBanner = () => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
//           // ✅ sirf EK inline ad
//           const inlineAd = res.ads.find(a => a.position === "inline2");
//           setAd(inlineAd || null);
//         }
//       } catch {
//         console.log("Inline ad not available");
//       }
//     };

//     loadAd();
//   }, []);

//   // ❌ ad nahi → kuch bhi render nahi
//   if (!ad) return null;

//   return (
//     <div className="inline-ad-wrapper">
//       <a
//         href={ad.link || "#"}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <img
//           src={ad.mediaUrl}
//           alt={ad.title || "Advertisement"}
//         />
//       </a>

//       <style>{`
//         /* 🖥️ Desktop – 728 × 90 */
//         .inline-ad-wrapper {
//           width: 100%;
//           max-width: 728px;
//           margin: 20px auto;
//         }

//         .inline-ad-wrapper img {
//           width: 100%;
//           height: auto;
//           aspect-ratio: 728 / 90;
//           object-fit: cover;
//           border-radius: 4px;
//         }

//         /* 📱 Mobile / Tablet – responsive */
//         @media (max-width: 991px) {
//           .inline-ad-wrapper {
//             max-width: 100%;
//             padding: 0 10px;
//           }

//           .inline-ad-wrapper img {
//             aspect-ratio: 728 / 90;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SecondInlineAdBanner;


// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// // 🟢 props में 'category' receive किया
// const SecondInlineAdBanner = ({ category }) => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();
//         if (res?.success && Array.isArray(res.ads)) {
          
//           // 🔹 Strict Filter Logic
//           const targetAd = res.ads.find(a => {
//             // 1. Position Must be 'inline2'
//             const isPosMatch = a.position === "inline2";
            
//             // 2. Category Logic
//             // अगर category prop पास किया गया है (जैसे "india"), 
//             // तो Ad के categories array में वह होना ही चाहिए।
//             const isCatMatch = category 
//               ? a.categories?.some(c => c.toLowerCase() === category.toLowerCase())
//               : true; // अगर category पास नहीं की, तो पुराना लॉजिक (दिखा दो)

//             return isPosMatch && isCatMatch;
//           });

//           setAd(targetAd || null);
//         }
//       } catch {
//         console.log("Inline2 ad not available");
//       }
//     };

//     loadAd();
//   }, [category]); // 🟢 Dependency added

//   // ❌ अगर Ad नहीं मिला (या Category match नहीं हुई) → तो कुछ भी render नहीं होगा
//   if (!ad) return null;

//   return (
//     <div className="inline-ad-wrapper mb-4">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>
//       <style>{`
//         .inline-ad-wrapper { width: 100%; max-width: 728px; margin: 20px auto; }
//         .inline-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 728 / 90; object-fit: cover; border-radius: 4px; }
//         @media (max-width: 991px) { .inline-ad-wrapper { max-width: 100%; padding: 0 10px; } }
//       `}</style>
//     </div>
//   );
// };

// export default SecondInlineAdBanner;

import React, { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/authApi";

// 🟢 props में 'category' receive किया
const SecondInlineAdBanner = ({ category }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const res = await fetchActiveAds();

        if (res?.success && Array.isArray(res.ads)) {
          // 🔹 Strict Filter Logic
          const targetAd = res.ads.find(a => {
            // 1. Position Must be 'inline2'
            const isPosMatch = a.position === "inline2";

            // 2. Category Logic
            const isCatMatch = category
              ? a.categories?.some(c => c.toLowerCase() === category.toLowerCase())
              : true;

            return isPosMatch && isCatMatch;
          });

          setAd(targetAd || null);
        }
      } catch {
        console.log("Inline2 ad not available");
      }
    };

    loadAd();
  }, [category]);

  // ❌ अगर Ad नहीं मिला (या Category match नहीं हुई)
  if (!ad) return null;

  // 🔹 MEDIA HANDLER (image / gif / video)
  const renderAdMedia = () => {
    if (ad.mediaType === "video") {
      return (
        <video
          src={ad.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      );
    }

    // image & gif
    return (
      <img
        src={ad.mediaUrl}
        alt={ad.title || "Advertisement"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
    );
  };

  return (
    <div className="inline-ad-wrapper mb-4">
      {ad.link ? (
        <a href={ad.link} target="_blank" rel="noopener noreferrer">
          {renderAdMedia()}
        </a>
      ) : (
        renderAdMedia()
      )}

      <style>{`
        .inline-ad-wrapper {
          width: 100%;
          max-width: 728px;
          margin: 20px auto;
        }

        .inline-ad-wrapper img,
        .inline-ad-wrapper video {
          width: 100%;
          height: auto;
          aspect-ratio: 728 / 90;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .inline-ad-wrapper {
            max-width: 100%;
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SecondInlineAdBanner;
