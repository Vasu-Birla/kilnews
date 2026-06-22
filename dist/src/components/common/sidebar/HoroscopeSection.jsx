


import React, { useState, useEffect } from 'react';
import { Dropdown, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, 
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces 
} from 'react-icons/gi';
import { allNews } from '../../../Services/authApi';

// All 12 Signs
const signs = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// English → Hindi Mapping
const signMapping = {
  Aries: "मेष",
  Taurus: "वृष",
  Gemini: "मिथुन",
  Cancer: "कर्क",
  Leo: "सिंह",
  Virgo: "कन्या",
  Libra: "तुला",
  Scorpio: "वृश्चिक",
  Sagittarius: "धनु",
  Capricorn: "मकर",
  Aquarius: "कुंभ",
  Pisces: "मीन"
};

// English Sign to Phonetic Mapping (based on your API response)
const signPhoneticMapping = {
    Aries: "Mesh",
    Taurus: "Vrishabh",
    Gemini: "Mithun", // Your API shows "Mithun" for Gemini
    Cancer: "Kark",
    Leo: "Singh",
    Virgo: "Kanya",
    Libra: "Tula",
    Scorpio: "Vrishchik",
    Sagittarius: "Dhanu",
    Capricorn: "Makar",
    Aquarius: "Kumbh",
    Pisces: "Meen"
};

// Sign Icons
const signIcons = { 
  Aries: <GiAries size={28} />, Taurus: <GiTaurus size={28} />, Gemini: <GiGemini size={28} />,
  Cancer: <GiCancer size={28} />, Leo: <GiLeo size={28} />, Virgo: <GiVirgo size={28} />,
  Libra: <GiLibra size={28} />, Scorpio: <GiScorpio size={28} />, Sagittarius: <GiSagittarius size={28} />,
  Capricorn: <GiCapricorn size={28} />, Aquarius: <GiAquarius size={28} />, Pisces: <GiPisces size={28} />,
};

// Category Names
const HOROSCOPE_CATEGORY = ["astrology", "राशिफल"];

// ✅ HoroscopeSection अब `language` prop लेगा और default 'hindi' देगा यदि prop नहीं दिया गया
const HoroscopeSection = ({ language = "hindi" }) => { 
  const navigate = useNavigate();
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [latestNews, setLatestNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // ✅ language स्टेट और toggleLanguage फंक्शन हटा दिए गए हैं

  // Fetch news
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    allNews()
      .then(res => {
        if (res.success && res.data) {
          // Filter astrology news
          const astrologyNews = res.data.filter(item =>
            item.category?.name &&
            HOROSCOPE_CATEGORY.includes(item.category.name.toLowerCase())
          );

          // Get all possible name variations for the selected sign
          const lowerEnglishSign = selectedSign.toLowerCase();
          const lowerHindiSign = signMapping[selectedSign].toLowerCase();
          const lowerPhoneticSign = signPhoneticMapping[selectedSign].toLowerCase(); 

          // Filter news by rashi & subcategory/tags
          const filtered = astrologyNews.filter(item => {
            const title = (item.title_hi || item.title_en || "").toLowerCase();
            const summary = (item.summary_hi || item.summary_en || "").toLowerCase();
            const subSubCategory = (item.subSubCategory || "").toLowerCase();
            const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";

            return (
              title.includes(lowerHindiSign) ||
              title.includes(lowerEnglishSign) ||
              title.includes(lowerPhoneticSign) || 
              summary.includes(lowerHindiSign) ||
              summary.includes(lowerEnglishSign) ||
              summary.includes(lowerPhoneticSign) || 
              subSubCategory.includes(lowerHindiSign) ||
              subSubCategory.includes(lowerEnglishSign) ||
              subSubCategory.includes(lowerPhoneticSign) || 
              tags.includes(lowerHindiSign) ||
              tags.includes(lowerEnglishSign) ||
              tags.includes(lowerPhoneticSign) 
            );
          });

          // Sort latest first
          const sorted = filtered.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );

          setLatestNews(sorted[0] || null);
        } else {
          setLatestNews(null);
        }
      })
      .catch(err => {
        console.error("Failed to fetch horoscope news:", err); 
        setError("News fetch failed. Please try again.");
      })
      .finally(() => setIsLoading(false));
  }, [selectedSign]); 

  // Icon wrapper
  const getIconWrapper = (icon) => (
    <div 
      className="d-flex justify-content-center align-items-center rounded-circle me-3 flex-shrink-0" 
      style={{ width: '50px', height: '50px', backgroundColor: '#f0f2f5' }}
    >
      {icon}
    </div>
  );

  // Truncate text
  const truncateText = (text, maxLines = 4) => {
    if (!text) return '';
    const lines = text.split('\n').slice(0, maxLines);
    const fullText = lines.join(' ');
    return fullText.length > 200 ? fullText.slice(0, 200) + "..." : fullText;
  };

  // Handle click to open news detail page using slug only
  const handleNewsClick = (news) => {
    const newsSlug = news.slug_en || news.slug;
    if (!newsSlug) return;
    navigate(`/news/${newsSlug}`);
  };

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* ✅ शीर्षक को भाषा के अनुसार बदलें (अब prop से language का उपयोग करें) */}
        <h5 className="fw-bold m-0 text-danger">
          {language === 'hindi' ? "आज का राशिफल" : "Today's Horoscope"}
        </h5> 
        
        <div className="d-flex align-items-center">
            {/* ✅ भाषा बदलने वाला बटन हटा दिया गया है */}
            {/* <button onClick={toggleLanguage} ... </button> */}

            <Dropdown onSelect={(eventKey) => setSelectedSign(eventKey)}>
              <Dropdown.Toggle 
                variant="link" 
                id="dropdown-basic" 
                className="text-dark text-decoration-none fw-bold p-0"
              >
                {/* ✅ ड्रॉपडाउन का टेक्स्ट भाषा के अनुसार बदलें (अब prop से language का उपयोग करें) */}
                {language === 'hindi' ? signMapping[selectedSign] : selectedSign}
              </Dropdown.Toggle> 
              <Dropdown.Menu>
                {signs.map(sign => (
                  <Dropdown.Item key={sign} eventKey={sign}>
                    {/* ✅ ड्रॉपडाउन के आइटम भाषा के अनुसार बदलें (अब prop से language का उपयोग करें) */}
                    {language === 'hindi' ? signMapping[sign] : sign}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu> 
            </Dropdown> 
        </div>
      </div>

      {/* Loading & Error */}
      {isLoading && <Spinner animation="border" size="sm" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* No news case */}
      {!isLoading && !error && !latestNews && (
        <Alert variant="warning">
            {/* ✅ चेतावनी संदेश को भाषा के अनुसार बदलें (अब prop से language का उपयोग करें) */}
            {language === 'hindi' ? "आज का राशिफल उपलब्ध नहीं है।" : "Today's horoscope is not available."}
        </Alert>
      )}

      {/* Latest News */}
      {!isLoading && !error && latestNews && (
        <div 
          className="mb-3 p-3 border rounded d-flex flex-column justify-content-between"
          style={{ cursor: 'pointer', minHeight: '120px', position: 'relative' }}
          onClick={() => handleNewsClick(latestNews)}
        >
          <div className="d-flex align-items-start mb-2">
            {getIconWrapper(signIcons[selectedSign])}
            <div>
              {/* <h6 className="fw-bold">
                {language === 'hindi' ? latestNews.title_hi : (latestNews.title_en || latestNews.title_hi)}
              </h6> */}
                  <div 
                    // className="fw-bold mb-1"
                        className="news-headline-master mb-1"
                    dangerouslySetInnerHTML={{ __html: latestNews?.title_hi || latestNews?.title_en }} 
                  />
              <p className="small text-muted mb-0">
                {latestNews.category?.name}
              </p>
            </div>
          </div>

          <p className="text-secondary mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
            {truncateText(language === 'hindi' ? latestNews.summary_hi : (latestNews.summary_en || latestNews.summary_hi))}
          </p>

          {/* Read More */}
          <div 
            className="text-end fw-bold mt-2" 
            style={{ fontSize: '0.85rem', color: '#ff9900ff', cursor: 'pointer' }}
          >
            {language === 'hindi' ? "और पढ़ें →" : "Read More →"}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoroscopeSection;