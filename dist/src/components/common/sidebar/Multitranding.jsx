
import React, { useEffect, useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTrending, fetchActiveAds } from "../../../Services/authApi";

const Multitranding = () => {
  const [news, setNews] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const newsRes = await getTrending();
        const adsRes = await fetchActiveAds();

        if (newsRes?.success) {
          setNews(newsRes.data.slice(0, 36));
        }

        if (adsRes?.success) {
          setAds(
            adsRes.ads
              .filter(a => a.position === "sidebar")
              .slice(0, 7)
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  // 🔹 AD MEDIA RENDER FUNCTION
  const renderAdMedia = (ad) => {
    if (ad.mediaType === "video") {
      return (
        <video
          src={ad.mediaUrl}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }

    // image & gif both handled here
    return (
      <img
        src={ad.mediaUrl}
        alt={ad.title || "ad"}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  };

  const items = [];
  let newsIndex = 0;

  ads.forEach((ad, adIndex) => {
    // 🔹 AD
    items.push(
      <div
        key={`ad-${adIndex}`}
        style={{
          width: 300,
          height: 250,
          margin: "12px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 6,
        }}
      >
        {renderAdMedia(ad)}
      </div>
    );

    // 🔹 5 NEWS AFTER EACH AD
    for (let i = 0; i < 5 && newsIndex < news.length; i++) {
      const item = news[newsIndex++];

      items.push(
        <div
          key={item._id}
          className="mb-3 pb-3"
          style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
          onClick={() => navigate(`/news/${item.slug_en || item._id}`)}
        >
          <p className="text-danger small fw-bold mb-2">
            {item.category?.name || "General"}
          </p>

          <div className="d-flex">
            <Image
              src={item.media?.[0]?.url || "https://via.placeholder.com/120x80"}
              style={{
                width: 120,
                height: 80,
                objectFit: "cover",
                borderRadius: 5,
              }}
              className="me-3"
            />
            {/* <p className="fw-bold m-0" style={{ fontSize: "0.9rem" }}>
              {item.title_hi || item.title_en}
            </p> */}
                  <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: item?.title_hi || item?.title_en }} 
                  />
          </div>
        </div>
      );
    }
  });

  // 🔹 Remaining news
  while (newsIndex < news.length) {
    const item = news[newsIndex++];

    items.push(
      <div
        key={item._id}
        className="mb-3 pb-3"
        style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
        onClick={() => navigate(`/news/${item.slug_en || item._id}`)}
      >
        <p className="text-danger small fw-bold mb-2">
          {item.category?.name || "General"}
        </p>

        <div className="d-flex">
          <Image
            src={item.media?.[0]?.url || "https://via.placeholder.com/120x80"}
            style={{
              width: 120,
              height: 80,
              objectFit: "cover",
              borderRadius: 5,
            }}
            className="me-3"
          />
          {/* <p className="fw-bold m-0" style={{ fontSize: "0.9rem" }}>
            {item.title_hi || item.title_en}
          </p> */}
           <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: item?.title_hi || item?.title_en }} 
                  />
        </div>
      </div>
    );
  }

  return <div>{items}</div>;
};

export default Multitranding;
