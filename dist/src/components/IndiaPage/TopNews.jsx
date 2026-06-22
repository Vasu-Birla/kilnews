

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allNews } from '../../Services/authApi';
import { Spinner, Alert } from 'react-bootstrap';
import UserAvatar from '../Main_NewsDetails/UserAvatar';

const HOROSCOPE_CATEGORIES = ['horoscope', 'rashifal', 'astrology'];

// Re-using the formatFullDateTime from RelatedNews for consistency
// Format date to dd/mm/yyyy hh:mm (24-hour format)
const formatFullDateTime = (dateString) => {
  if (!dateString) return '';
  const options = {
    day: '2-digit',
    month: '2-digit', // Numeric month (e.g., 01 for January, 10 for October)
    year: 'numeric',
    hour: '2-digit',   // Include hour
    minute: '2-digit', // Include minute
    hourCycle: 'h23', // Ensure 24-hour format
  };
  const dateObj = new Date(dateString);
  if (isNaN(dateObj)) return "Invalid Date"; // Handle invalid date strings
  return dateObj.toLocaleString('hi-IN', options);
};

const TopNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Ensure loading is true before fetch
      try {
        const response = await allNews();
        // console.log("All News API:", response.data); // Removed console.log for production

        const filteredNews = Array.isArray(response?.data)
          ? response.data.filter(item => {
              let category = '';
              if (typeof item.category === 'string') {
                category = item.category.toLowerCase();
              } else if (item.category?.name) {
                category = item.category.name.toLowerCase();
              }
              return category && !HOROSCOPE_CATEGORIES.includes(category);
            })
          : [];

        // setNews(filteredNews);
        setNews(filteredNews.slice(0, 5)); // ✅ FIXED
      } catch (err) {
        console.error("News fetch error:", err);
        setError();
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="text-center my-5">{error}</Alert>;

  return (
    <div className="container my-4">
      <h3 className="fw-bold" style={{ color: '#ff0000' }}>देश न्यूज़</h3>
      <hr className="mb-3" style={{ borderTop: '2px solid #e0e0e0' }} />

      <div className="container-fluid px-0">
        <div className="row g-3 mb-3">
          {news.slice(0, 2).map((story, idx) => {
            const firstMedia = story.media?.[0];
            const isVideo = firstMedia && firstMedia.type === 'video';
            const mediaUrl = firstMedia?.url || 'https://via.placeholder.com/600x400?text=No+Media';

            return (
              <div className="col-lg-6 col-md-6" key={story._id || story.slug_en || idx}>
                <Link
                  to={`/news/${story.slug_en || story._id}`} // slug_en को प्राथमिकता दें
                  state={{ relatedArticles: news }}
                  className="text-decoration-none"
                >
                  <div className="card border-0 rounded-0 h-100 overflow-hidden">
                    <div className="position-relative h-100">
                      {isVideo ? (
                        <video
                          src={mediaUrl}
                          alt={story.title_hi || story.title_en || "News Video"}
                          className="w-100 h-100"
                          controls={false}
                          autoPlay
                          muted
                          loop
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt={story.title_hi || story.title_en || "News Image"}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Error"; console.error("Image failed to load:", e.target.src); }}
                        />
                      )}
                      <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                        {/* <h4 className="fw-bold text-white">{story.title_hi || story.title_en}</h4> */}

                                  <div 
  className="news-headline-bold text-wrap" 
  style={{ color: "white" }} // यहाँ आप जो भी कलर देंगे, वो पक्का दिखेगा
  dangerouslySetInnerHTML={{ __html: story?.title_hi || story?.title_en || "" }} 
/>
                        <div className="d-flex align-items-center">
                          <UserAvatar user={story.createdBy} size={20} />
                          <small className="ms-2 text-light opacity-75">
                            {story.createdBy?.name || "EMS News"} | {formatFullDateTime(story.publishedAt)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="row g-3">
          {news.slice(2, 5).map((story, idx) => {
            const firstMedia = story.media?.[0];
            const isVideo = firstMedia && firstMedia.type === 'video';
            const mediaUrl = firstMedia?.url || 'https://via.placeholder.com/400x225?text=No+Media';

            return (
              <div className={`col-lg-4 col-md-${idx === 2 ? '12' : '6'}`} key={story._id || story.slug_en || idx}>
                <Link
                  to={`/news/${story.slug_en || story._id}`} // slug_en को प्राथमिकता दें
                  state={{ relatedArticles: news }}
                  className="text-decoration-none text-dark"
                >
                  <div className="card border-0 rounded-0 h-100 overflow-hidden">
                    <div className="position-relative">
                      {isVideo ? (
                        <video
                          src={mediaUrl}
                          alt={story.title_hi || story.title_en || "News Video"}
                          className="w-100"
                          controls={false}
                          autoPlay
                          muted
                          loop
                          style={{ height: "220px", objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt={story.title_hi || story.title_en || "News Image"}
                          className="w-100"
                          style={{ height: "220px", objectFit: "cover" }}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Error"; console.error("Image failed to load:", e.target.src); }}
                        />
                      )}
                    </div>
                    <div className="card-body px-2 py-3">
                      {/* <p className="card-text fw-bold">{story.title_hi || story.title_en}</p> */}

                         <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: story?.title_hi || story?.title_en }} 
                  />

                      <div className="d-flex align-items-center">
                        <UserAvatar user={story.createdBy} size={20} />
                        <small className="ms-2 text-muted">
                          {story.createdBy?.name || "EMS News"} | {formatFullDateTime(story.publishedAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <hr style={{ borderTop: '4px solid red', marginTop: '2rem' }} />
    </div>
  );
};

export default TopNews;