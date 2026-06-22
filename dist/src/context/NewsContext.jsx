// import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
// import { allNews } from "../Services/authApi";

// const NewsContext = createContext(null);

// export const NewsProvider = ({ children }) => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchNews = async () => {
//       try {
//         const res = await allNews();
//         if (isMounted && res?.success) {
//           setNewsData(res.data || []);
//         } else if (isMounted) {
//           setError("Failed to load news");
//         }
//       } catch (err) {
//         if (isMounted) setError(err.message || "News fetch failed");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchNews();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // ✅ Category ke hisaab se ek hi baar pre-group kar do
//   // Taaki har section ko apna .filter() na chalana pade
//   const categorized = useMemo(() => {
//     const byCategory = {};
//     newsData.forEach((item) => {
//       const catName = item?.category?.name?.toLowerCase()?.trim();
//       if (!catName) return;
//       if (!byCategory[catName]) byCategory[catName] = [];
//       byCategory[catName].push(item);
//     });
//     return byCategory;
//   }, [newsData]);

//   const value = { newsData, categorized, loading, error };

//   return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
// };

// export const useNews = () => {
//   const ctx = useContext(NewsContext);
//   if (!ctx) {
//     throw new Error("useNews must be used inside a <NewsProvider>");
//   }
//   return ctx;
// };

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { allNews } from "../Services/authApi";

const NewsContext = createContext(null);

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [categorized, setCategorized] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const res = await allNews();

        if (!isMounted) return;

        if (res?.success) {
          // ✅ Agar API ne grouped diya to seedha use karo — frontend mein filter mat chalao
          if (res.grouped && Object.keys(res.grouped).length > 0) {
            setCategorized(res.grouped);
          } else {
            // Fallback: purana API format — khud group karo
            const byCategory = {};
            (res.data || []).forEach((item) => {
              const catName = item?.category?.name?.toLowerCase()?.trim();
              if (!catName) return;
              if (!byCategory[catName]) byCategory[catName] = [];
              byCategory[catName].push(item);
            });
            setCategorized(byCategory);
          }

          setNewsData(res.data || []);
        } else {
          setError("News load nahi hui");
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Network error");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();
    return () => { isMounted = false; };
  }, []);

  // ✅ useMemo hata diya — ab server se hi grouped aa raha hai
  // (fallback path mein use hota tha, woh bhi upar handle ho gaya)

  const value = { newsData, categorized, loading, error };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be used inside <NewsProvider>");
  return ctx;
};