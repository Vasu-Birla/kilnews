

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { allNews } from '../../Services/authApi';
// import { Spinner, Alert } from 'react-bootstrap';
// import UserAvatar from '../Main_NewsDetails/UserAvatar';

// // ❌ Horoscope categories ko filter karna hai
// const HOROSCOPE_CATEGORIES = ['horoscope', 'rashifal', 'astrology'];

// // ✅ Date + Time format helper
// const formatDateTime = (dateString) => {
//     if (!dateString) return 'समय उपलब्ध नहीं';
//     const dateObj = new Date(dateString);
//     if (isNaN(dateObj)) return 'Invalid Date';

//     return dateObj.toLocaleString('hi-IN', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//     });
// };

// const NewsGrid = () => {
//     const [newsData, setNewsData] = useState([]);
//     const [fullNewsList, setFullNewsList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchNews = async () => {
//             try {
//                 const response = await allNews();
//                 if (response?.success && response.data) {
//                     const filteredNews = response.data.filter(item => {
//                         const category = item.category?.name?.toLowerCase();
//                         return category && !HOROSCOPE_CATEGORIES.includes(category);
//                     });

//                     setFullNewsList(filteredNews);
//                     setNewsData(filteredNews.slice(0, 24));
//                 } else {
//                     setError("Failed to load news.");
//                 }
//             } catch (err) {
//                 setError("समाचार लोड करने में विफल।");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchNews();
//     }, []);

//     // ✅ Image placeholder style
//     const imagePlaceholderStyle = {
//         width: '80px',
//         height: '60px',
//         backgroundColor: '#e9ecef',
//         objectFit: 'cover'
//     };

//     if (loading)
//         return (
//             <div className="text-center my-4">
//                 <Spinner animation="border" />
//                 <p>Loading...</p>
//             </div>
//         );

//     if (error) return <Alert variant="danger">{error}</Alert>;

//     return (
//         <div className="container py-4" style={{ backgroundColor: '#f8f9fa' }}>
//             <div className="row g-3">
//                 {newsData.map((newsItem) => {
//                     const relatedArticlesForItem = fullNewsList.filter(
//                         article => article.category?._id === newsItem.category?._id
//                     );

//                     return (
//                         <div className="col-lg-4 col-md-6 col-12" key={newsItem._id || newsItem.slug_en}>
//                             <Link
//                                 to={`/news/${newsItem.slug_en || newsItem._id}`}
//                                 state={{ relatedArticles: relatedArticlesForItem }}
//                                 className="text-decoration-none text-dark"
//                             >
//                                 <div className="bg-white rounded shadow-sm p-2 d-flex align-items-center h-100">
//                                     {/* ✅ Image */}
//                                     {newsItem.media?.[0]?.url ? (
//                                         <img
//                                             src={newsItem.media[0].url}
//                                             alt={newsItem.title_hi || newsItem.title_en}
//                                             className="rounded flex-shrink-0"
//                                             style={imagePlaceholderStyle}
//                                         />
//                                     ) : (
//                                         <div className="rounded flex-shrink-0" style={imagePlaceholderStyle}></div>
//                                     )}

//                                     <div className="ms-3 flex-grow-1">
//                                         {/* ✅ Title */}
//                                         <p className="fw-semibold mb-1" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
//                                             {newsItem.title_hi || newsItem.title_en}
//                                         </p>

//                                         {/* ✅ Author + Date + Time */}
//                                         <div className="d-flex align-items-center">
//                                             <UserAvatar user={newsItem.createdBy} size={20} />
//                                             <small className="ms-2 text-muted" style={{ fontSize: '0.75rem' }}>
//                                                 {newsItem.createdBy?.name || "EMS News"} |{" "}
//                                                 {formatDateTime(
//                                                     newsItem.publishedAt || newsItem.createdAt || newsItem.updatedAt
//                                                 )}
//                                             </small>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default NewsGrid;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allNews } from '../../Services/authApi';
import { Spinner, Alert } from 'react-bootstrap';
import UserAvatar from '../Main_NewsDetails/UserAvatar';

// ❌ Horoscope categories ko filter karna hai
const HOROSCOPE_CATEGORIES = ['horoscope', 'rashifal', 'astrology'];

// ✅ Date + Time format helper (RelatedNews component के समान 24-घंटे का फॉर्मेट)
const formatFullDateTime = (dateString) => {
    if (!dateString) return 'समय उपलब्ध नहीं';
    const options = {
        day: '2-digit',
        month: '2-digit', // Numeric month (e.g., 01 for January, 10 for October)
        year: 'numeric',
        hour: '2-digit',   // Include hour
        minute: '2-digit', // Include minute
        hourCycle: 'h23',  // Ensure 24-hour format
    };
    return new Date(dateString).toLocaleString('hi-IN', options);
};

const NewsGrid = () => {
    const [newsData, setNewsData] = useState([]);
    const [fullNewsList, setFullNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await allNews();
                if (response?.success && response.data) {
                    const filteredNews = response.data.filter(item => {
                        const category = item.category?.name?.toLowerCase();
                        return category && !HOROSCOPE_CATEGORIES.includes(category);
                    });

                    setFullNewsList(filteredNews);
                    setNewsData(filteredNews.slice(5, 29));
                } else {
                    setError("Failed to load news.");
                }
            } catch (err) {
                setError();
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // ✅ Image/Video box style for consistency
    const mediaBoxStyle = {
        width: '80px',
        height: '60px',
        backgroundColor: '#e9ecef', // Placeholder background
        objectFit: 'cover', // Ensures media fills the space without distortion
        borderRadius: '0.25rem', // 'rounded' के लिए
        display: 'block'
    };

    if (loading)
        return (
            <div className="text-center my-4">
                <Spinner animation="border" />
                <p>Loading...</p>
            </div>
        );

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container py-4" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="row g-3">
                {newsData.map((newsItem) => {
                    const relatedArticlesForItem = fullNewsList.filter(
                        article => article.category?._id === newsItem.category?._id
                    );

                    // Extract media information for video/image
                    const firstMedia = newsItem.media?.[0];
                    const isVideo = firstMedia && firstMedia.type === 'video';
                    const mediaUrl = firstMedia?.url || "https://via.placeholder.com/80x60?text=No+Media"; // Placeholder for image/video

                    return (
                        <div className="col-lg-4 col-md-6 col-12" key={newsItem._id || newsItem.slug_en}>
                            <Link
                                to={`/news/${newsItem.slug_en || newsItem._id}`}
                                state={{ relatedArticles: relatedArticlesForItem }}
                                className="text-decoration-none text-dark"
                            >
                                <div className="bg-white rounded shadow-sm p-2 d-flex align-items-center h-100">
                                    {/* ✅ Image/Video Conditional Rendering */}
                                    {isVideo ? (
                                        <video
                                            src={mediaUrl}
                                            alt={newsItem.title_hi || newsItem.title_en || "News Video"}
                                            className="flex-shrink-0"
                                            controls={false}
                                            autoPlay
                                            muted
                                            loop
                                            style={mediaBoxStyle}
                                        />
                                    ) : (
                                        <img
                                            src={mediaUrl}
                                            alt={newsItem.title_hi || newsItem.title_en || "News Image"}
                                            className="flex-shrink-0"
                                            style={mediaBoxStyle}
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/80x60?text=Error"; console.error("Image failed to load:", e.target.src); }}
                                        />
                                    )}

                                    <div className="ms-3 flex-grow-1">
                                        {/* ✅ Title */}
                                        {/* <p className="fw-semibold mb-1" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                                            {newsItem.title_hi || newsItem.title_en}
                                        </p> */}

                                          <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: newsItem?.title_hi || newsItem?.title_en }} 
                  />

                                        {/* ✅ Author + Date + Time */}
                                        <div className="d-flex align-items-center">
                                            <UserAvatar user={newsItem.createdBy} size={20} />
                                            <small className="ms-2 text-muted" style={{ fontSize: '0.75rem' }}>
                                                {newsItem.createdBy?.name || "EMS News"} |{" "}
                                                {formatFullDateTime(
                                                    newsItem.publishedAt || newsItem.createdAt || newsItem.updatedAt
                                                )}
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
    );
};

export default NewsGrid;