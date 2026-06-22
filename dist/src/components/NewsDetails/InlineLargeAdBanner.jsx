// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// const InlineLargeAdBanner = () => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();

//         if (res?.success && Array.isArray(res.ads)) {
//           // 🔹 sab inline ads nikalo
//           const inlineAds = res.ads.filter(
//             (a) => a.position === "inlineLarge"
//           );

//           // ✅ FIRST ad already kahin aur use ho chuka
//           // 👉 yahan SECOND ad show hogi
//           setAd(inlineAds[0] || null);
//         }
//       } catch {
//         console.log("Inline large ad not available");
//       }
//     };

//     loadAd();
//   }, []);

//   // ❌ ad nahi → kuch bhi render nahi
//   if (!ad) return null;

//   return (
//     <div className="inline-large-ad-wrapper">
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
//         /* 🖥️ Desktop – 970 × 250 */
//         .inline-large-ad-wrapper {
//           width: 100%;
//           max-width: 970px;
//           margin: 24px auto;
//         }

//         .inline-large-ad-wrapper img {
//           width: 100%;
//           height: auto;
//           aspect-ratio: 970 / 250;
//           object-fit: cover;
//           border-radius: 6px;
//         }

//         /* 📱 Tablet / Mobile – responsive */
//         @media (max-width: 991px) {
//           .inline-large-ad-wrapper {
//             max-width: 100%;
//             padding: 0 10px;
//           }

//           .inline-large-ad-wrapper img {
//             aspect-ratio: 970 / 250;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InlineLargeAdBanner;


// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// // 🟢 props me 'category' receive kiya
// const InlineLargeAdBanner = ({ category }) => {
//   const [ad, setAd] = useState(null);

//   useEffect(() => {
//     const loadAd = async () => {
//       try {
//         const res = await fetchActiveAds();

//         if (res?.success && Array.isArray(res.ads)) {
//           // 🔹 Filter Logic Updated
//           const inlineAds = res.ads.filter((a) => {
//              const isPosMatch = a.position === "inlineLarge";
             
//              // Agar category hai to check karo, nahi to true
//              const isCatMatch = category 
//                ? a.categories?.some(c => c.toLowerCase() === category.toLowerCase())
//                : true;

//              return isPosMatch && isCatMatch;
//           });

//           // Match hone wala pehla ad set karo
//           setAd(inlineAds[0] || null);
//         }
//       } catch {
//         console.log("Inline large ad not available");
//       }
//     };

//     loadAd();
//   }, [category]); // 🟢 Dependency added

//   if (!ad) return null;

//   return (
//     <div className="inline-large-ad-wrapper">
//       <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer">
//         <img src={ad.mediaUrl} alt={ad.title || "Advertisement"} />
//       </a>
//       {/* CSS Same as before */}
//       <style>{`
//         .inline-large-ad-wrapper { width: 100%; max-width: 970px; margin: 24px auto; }
//         .inline-large-ad-wrapper img { width: 100%; height: auto; aspect-ratio: 970 / 250; object-fit: cover; border-radius: 6px; }
//         @media (max-width: 991px) {
//           .inline-large-ad-wrapper { max-width: 100%; padding: 0 10px; }
//           .inline-large-ad-wrapper img { aspect-ratio: 970 / 250; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InlineLargeAdBanner;


import React, { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/authApi";

// 🟢 props me 'category' receive kiya
const InlineLargeAdBanner = ({ category }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const res = await fetchActiveAds();

        if (res?.success && Array.isArray(res.ads)) {
          // 🔹 Filter Logic Updated
          const inlineAds = res.ads.filter((a) => {
            const isPosMatch = a.position === "inlineLarge";

            // Agar category hai to check karo, nahi to true
            const isCatMatch = category 
              ? a.categories?.some(c => c.toLowerCase() === category.toLowerCase())
              : true;

            return isPosMatch && isCatMatch;
          });

          // Match hone wala pehla ad set karo
          setAd(inlineAds[0] || null);
        }
      } catch {
        console.log("Inline large ad not available");
      }
    };

    loadAd();
  }, [category]);

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
            borderRadius: 6,
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
          borderRadius: 6,
        }}
      />
    );
  };

  return (
    <div className="inline-large-ad-wrapper">
      {ad.link ? (
        <a href={ad.link} target="_blank" rel="noopener noreferrer">
          {renderAdMedia()}
        </a>
      ) : (
        renderAdMedia()
      )}

      <style>{`
        .inline-large-ad-wrapper {
          width: 100%;
          max-width: 970px;
          margin: 24px auto;
        }

        .inline-large-ad-wrapper img,
        .inline-large-ad-wrapper video {
          width: 100%;
          height: auto;
          aspect-ratio: 970 / 250;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .inline-large-ad-wrapper {
            max-width: 100%;
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default InlineLargeAdBanner;
