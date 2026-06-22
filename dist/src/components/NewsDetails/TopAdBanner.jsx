
// import React, { useEffect, useState } from "react";
// import { fetchActiveAds } from "../../Services/authApi";

// const TopAdBanner = () => {
//   const [topAd, setTopAd] = useState(null);

//   useEffect(() => {
//     const loadAds = async () => {
//       try {
//         const res = await fetchActiveAds();

//         if (res?.success && Array.isArray(res.ads)) {
//           const ad = res.ads.find(item => item.position === "top");
//           setTopAd(ad || null);
//         }
//       } catch (error) {
//         console.log("Top ad not available");
//       }
//     };

//     loadAds();
//   }, []);

//   // ❌ No ad → nothing render
//   if (!topAd) return null;

//   return (
//     <div
//       style={{
//         maxWidth: "728px",          // 🖥️ Desktop limit
//         width: "100%",              // 📱 Responsive
//         aspectRatio: "728 / 90",    // 📐 Fixed ratio
//         margin: "0 auto 20px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden"
//       }}
//     >
//       {topAd.mediaType === "image" && (
//         <a
//           href={topAd.link || "#"}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ width: "100%", height: "100%", display: "block" }}
//         >
//           <img
//             src={topAd.mediaUrl}
//             alt={topAd.title || "Advertisement"}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "contain"   // 🔥 banner ke liye best
//             }}
//           />
//         </a>
//       )}
//     </div>
//   );
// };

// export default TopAdBanner;


import React, { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/authApi";

const TopAdBanner = () => {
  const [topAd, setTopAd] = useState(null);

  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await fetchActiveAds();

        if (res?.success && Array.isArray(res.ads)) {
          const ad = res.ads.find(item => item.position === "top");
          setTopAd(ad || null);
        }
      } catch (error) {
        console.log("Top ad not available");
      }
    };

    loadAds();
  }, []);

  // ❌ No ad → nothing render
  if (!topAd) return null;

  // 🔹 MEDIA HANDLER
  const renderAdMedia = () => {
    if (topAd.mediaType === "video") {
      return (
        <video
          src={topAd.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 4,
          }}
        />
      );
    }

    // image & gif
    return (
      <img
        src={topAd.mediaUrl}
        alt={topAd.title || "Advertisement"}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: 4,
        }}
      />
    );
  };

  return (
    <div
      style={{
        maxWidth: "728px",          // Desktop limit
        width: "100%",              // Responsive
        aspectRatio: "728 / 90",    // Fixed ratio
        margin: "0 auto 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      {topAd.link ? (
        <a
          href={topAd.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          {renderAdMedia()}
        </a>
      ) : (
        renderAdMedia()
      )}
    </div>
  );
};

export default TopAdBanner;
