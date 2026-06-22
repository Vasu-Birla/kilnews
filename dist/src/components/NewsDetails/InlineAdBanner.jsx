import React, { useEffect, useState } from "react";
import { fetchActiveAds } from "../../Services/authApi";

// 🟢 props me 'category' receive kiya
const InlineAdBanner = ({ category }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        const res = await fetchActiveAds();

        if (res?.success && Array.isArray(res.ads)) {
          // 🔹 Filter Logic (same as before)
          const inlineAd = res.ads.find(a => {
            const isPosMatch = a.position === "inline";

            const isCatMatch = category
              ? a.categories?.some(
                  c => c.toLowerCase() === category.toLowerCase()
                )
              : true;

            return isPosMatch && isCatMatch;
          });

          setAd(inlineAd || null);
        }
      } catch (e) {
        console.log("Inline ad not available");
      }
    };

    loadAd();
  }, [category]);

  // ❌ ad nahi → kuch bhi render nahi
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
    <div className="inline-ad-wrapper">
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

        .inline-ad-wrapper video,
        .inline-ad-wrapper img {
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

export default InlineAdBanner;
