
// // // import React, { useEffect, useState } from 'react';
// // // import { allNews } from '../../Services/authApi';
// // // import TopStory from '../NewsDetails/TopStory';
// // // import TrendingSection from '../NewsDetails/TrendingSection';
// // // import City from '../NewsDetails/City';
// // // import Manoranjan from '../NewsDetails/Manoranjan';
// // // import PremiereSection from '../NewsDetails/PremiereSection';
// // // import SportsSection from '../NewsDetails/SportsSection';
// // // import BusinessSection from '../NewsDetails/BusinessSection';
// // // import NewsShortsSection from '../NewsDetails/NewsShortsSection';
// // // import HindiNewsSection from '../NewsDetails/LatestSection';

// // // const NewsPage = () => {
// // //   const [newsData, setNewsData] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchNewsData = async () => {
// // //       try {
// // //         const res = await allNews();
// // //         if (res.success) {
// // //           setNewsData(res.data);
// // //         }
// // //       } catch (err) {
// // //         console.error("News fetch error", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchNewsData();
// // //   }, []);

// // //   if (loading) return <div>Loading news...</div>;

// // //   return (
// // //     <div>
// // //       <div className="bg-white p-0 shadow-sm" style={{ border: '1px solid #eee' }}>
// // //         {/* ✅ TopStory component ko full data de rahe hain */}
// // //         <TopStory data={newsData} />

// // //         {/* बाकी सेक्शन बाद में */}

// // //          <hr className="my-2" />
// // //        {/* <HindiNewsSection /> */}
// // //        <HindiNewsSection
// // //   stories={newsData.slice(10, 15)} // 10 से 15 वाली news Hindi section को दो
// // // />
// // //          <hr className="my-2" />
// // //         <NewsShortsSection />
// // // <hr className="my-2" />

// // //         <TrendingSection
// // //           stories={newsData.slice(5, 10).map(news => ({
// // //             category: news?.category?.name || "General",
// // //             text: news?.title || "",
// // //             prefixIcon: false
// // //           }))}
// // //         />
// // //       </div>

// // //    {/* बाकी सेक्शन */}
// // //       <City />
// // //       <Manoranjan />
// // //       <PremiereSection />
// // //       <SportsSection />
// // //       <BusinessSection />
      
// // //     </div>
// // //   );
// // // };

// // // export default NewsPage;



// // import React, { useEffect, useState } from "react";
// // import { Container } from "react-bootstrap";
// // import { allNews } from "../../Services/authApi";
// // import TopStory from "../NewsDetails/TopStory";
// // import HindiNewsSection from "../NewsDetails/LatestSection";
// // import NewsShortsSection from "../NewsDetails/NewsShortsSection";
// // import TrendingSection from "../NewsDetails/TrendingSection";
// // import City from "../NewsDetails/City";
// // import Manoranjan from "../NewsDetails/Manoranjan";
// // import PremiereSection from "../NewsDetails/PremiereSection";
// // import SportsSection from "../NewsDetails/SportsSection";
// // import BusinessSection from "../NewsDetails/BusinessSection";
// // import WebStorySection from "../../webStory/WebStorySection";
// // import EmstvSection from "../NewsDetails/EmstvSection";
// // import MultiNewsSection from "../NewsDetails/MultiNewsSection";
// // import LiveNewsSection from "../NewsDetails/LiveNewsSection";
// // import ArticlesSection from "../NewsDetails/ArticlesSection";
// // import LifestyleSection from "../NewsDetails/LifestyleSection";
// // import IndepthExpressSection from "../NewsDetails/IndepthExpressSection";
// // import WorldNewsSection from "../NewsDetails/WorldNewsSection";
// // import AstrologySection from "../NewsDetails/AstrologySection";
// // import TopAdBanner from "../NewsDetails/TopAdBanner";
// // import InlineAdBanner from "../NewsDetails/InlineAdBanner";
// // import BottomAdBanner from "../NewsDetails/BottomAdBanner";
// // import InlineLargeAdBanner from "../NewsDetails/InlineLargeAdBanner";
// // import SecondInlineAdBanner from "../NewsDetails/SecondInlineAdBanner";
// // import PollSection from "../common/sidebar/PollSection";
// // import TrendingAndScore from "../common/sidebar/TrendingAndScore";
// // const NewsPage = () => {
// //   const [newsData, setNewsData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchNewsData = async () => {
// //       try {
// //         const res = await allNews();
// //         if (res.success) setNewsData(res.data);
// //       } catch (err) {
// //         console.error("News fetch error", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNewsData();
// //   }, []);

// //   if (loading)
// //     return <div className="text-center my-4">Loading news...</div>;

// //   return (
// //     <Container fluid className="p-2 p-md-3">
// //     {/* <TopAdBanner /> */}
// //   <TopStory data={newsData} />
// //   <div className="d-block d-md-none">
 
// //   <PollSection />
// // </div>
// //     <LiveNewsSection/>
// //   <HindiNewsSection stories={newsData} />
// //   <hr className="my-3" />

// //   {/* MOBILE ONLY - Right Sidebar Content */}
// // <div className="d-block d-md-none">
// //    <TrendingAndScore />
// //   {/* <PollSection /> */}
// // </div>

// //   <NewsShortsSection />
// //   <hr className="my-3" />
// //    <InlineAdBanner /> 
// //   <TrendingSection stories={newsData} />
// //   <hr className="my-3" />
  
// //   <City />
// //   <WebStorySection />
// //   <hr className="my-3" />

// //   <AstrologySection />
// //   <hr className="my-3" />

// //   <Manoranjan />
// //   <hr className="my-3" />
// //   <InlineLargeAdBanner />
// //   {/* <PremiereSection /> */}
// //   <EmstvSection />
// //     <hr className="my-3" />
// //   <SportsSection />
// //   <hr className="my-3" />
// //   <ArticlesSection/>
// //    <hr className="my-3" />
  
// //     <BusinessSection />
// //     <hr className="my-3" />
// //     <SecondInlineAdBanner />
// //     <IndepthExpressSection />
// //      <hr className="my-3" />
// //        <WorldNewsSection />
// //        <hr className="my-3" />
// //       <LifestyleSection />
// //        <BottomAdBanner  />
      
// // </Container>

// //   );
// // };

// // export default NewsPage;


// import React from "react";
// import { Container } from "react-bootstrap";
// import { NewsProvider, useNews } from "../../context/NewsContext";

// import TopStory from "../NewsDetails/TopStory";
// import HindiNewsSection from "../NewsDetails/LatestSection";
// import NewsShortsSection from "../NewsDetails/NewsShortsSection";
// import TrendingSection from "../NewsDetails/TrendingSection";
// import City from "../NewsDetails/City";
// import Manoranjan from "../NewsDetails/Manoranjan";
// import PremiereSection from "../NewsDetails/PremiereSection";
// import SportsSection from "../NewsDetails/SportsSection";
// import BusinessSection from "../NewsDetails/BusinessSection";
// import WebStorySection from "../../webStory/WebStorySection";
// import EmstvSection from "../NewsDetails/EmstvSection";
// import MultiNewsSection from "../NewsDetails/MultiNewsSection";
// import LiveNewsSection from "../NewsDetails/LiveNewsSection";
// import ArticlesSection from "../NewsDetails/ArticlesSection";
// import LifestyleSection from "../NewsDetails/LifestyleSection";
// import IndepthExpressSection from "../NewsDetails/IndepthExpressSection";
// import WorldNewsSection from "../NewsDetails/WorldNewsSection";
// import AstrologySection from "../NewsDetails/AstrologySection";
// import TopAdBanner from "../NewsDetails/TopAdBanner";
// import InlineAdBanner from "../NewsDetails/InlineAdBanner";
// import BottomAdBanner from "../NewsDetails/BottomAdBanner";
// import InlineLargeAdBanner from "../NewsDetails/InlineLargeAdBanner";
// import SecondInlineAdBanner from "../NewsDetails/SecondInlineAdBanner";
// import PollSection from "../common/sidebar/PollSection";
// import TrendingAndScore from "../common/sidebar/TrendingAndScore";

// // ✅ Yeh component ab sirf render karega — data fetch karna NewsProvider ka kaam hai
// const NewsPageContent = () => {
//   const { newsData, loading, error } = useNews();

//   if (loading) {
//     return <div className="text-center my-4">Loading news...</div>;
//   }

//   if (error) {
//     return <div className="text-center my-4 text-danger">{error}</div>;
//   }

//   return (
//     <Container fluid className="p-2 p-md-3">
//       {/* <TopAdBanner /> */}
//       <TopStory data={newsData} />

//       <div className="d-block d-md-none">
//         <PollSection />
//       </div>

//       <LiveNewsSection />
//       <HindiNewsSection stories={newsData} />
//       <hr className="my-3" />

//       {/* MOBILE ONLY - Right Sidebar Content */}
//       <div className="d-block d-md-none">
//         <TrendingAndScore />
//         {/* <PollSection /> */}
//       </div>

//       <NewsShortsSection />
//       <hr className="my-3" />
//       <InlineAdBanner />
//       <TrendingSection stories={newsData} />
//       <hr className="my-3" />

//       <City />
//       <WebStorySection />
//       <hr className="my-3" />

//       <AstrologySection />
//       <hr className="my-3" />

//       <Manoranjan />
//       <hr className="my-3" />
//       <InlineLargeAdBanner />
//       {/* <PremiereSection /> */}
//       <EmstvSection />
//       <hr className="my-3" />
//       <SportsSection />
//       <hr className="my-3" />
//       <ArticlesSection />
//       <hr className="my-3" />

//       <BusinessSection />
//       <hr className="my-3" />
//       <SecondInlineAdBanner />
//       <IndepthExpressSection />
//       <hr className="my-3" />
//       <WorldNewsSection />
//       <hr className="my-3" />
//       <LifestyleSection />
//       <BottomAdBanner />
//     </Container>
//   );
// };

// // ✅ NewsPage sirf Provider lagata hai — yahin se EK BAAR allNews() call hoga
// const NewsPage = () => (
//   <NewsProvider>
//     <NewsPageContent />
//   </NewsProvider>
// );

// export default NewsPage;

import React from "react";
import { Container } from "react-bootstrap";

// ✅ NewsProvider NAHI — sirf useNews hook
// Provider ab App.jsx mein hai, isliye yahan zaroorat nahi
import { useNews } from "../../context/NewsContext";

import TopStory from "../NewsDetails/TopStory";
import HindiNewsSection from "../NewsDetails/LatestSection";
import NewsShortsSection from "../NewsDetails/NewsShortsSection";
import TrendingSection from "../NewsDetails/TrendingSection";
import City from "../NewsDetails/City";
import Manoranjan from "../NewsDetails/Manoranjan";
import PremiereSection from "../NewsDetails/PremiereSection";
import SportsSection from "../NewsDetails/SportsSection";
import BusinessSection from "../NewsDetails/BusinessSection";
import WebStorySection from "../../webStory/WebStorySection";
import EmstvSection from "../NewsDetails/EmstvSection";
import MultiNewsSection from "../NewsDetails/MultiNewsSection";
import LiveNewsSection from "../NewsDetails/LiveNewsSection";
import ArticlesSection from "../NewsDetails/ArticlesSection";
import LifestyleSection from "../NewsDetails/LifestyleSection";
import IndepthExpressSection from "../NewsDetails/IndepthExpressSection";
import WorldNewsSection from "../NewsDetails/WorldNewsSection";
import AstrologySection from "../NewsDetails/AstrologySection";
import TopAdBanner from "../NewsDetails/TopAdBanner";
import InlineAdBanner from "../NewsDetails/InlineAdBanner";
import BottomAdBanner from "../NewsDetails/BottomAdBanner";
import InlineLargeAdBanner from "../NewsDetails/InlineLargeAdBanner";
import SecondInlineAdBanner from "../NewsDetails/SecondInlineAdBanner";
import PollSection from "../common/sidebar/PollSection";
import TrendingAndScore from "../common/sidebar/TrendingAndScore";

const NewsPage = () => {
  const { newsData, loading, error } = useNews();

  if (loading) {
    return <div className="text-center my-4">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center my-4 text-danger">{error}</div>;
  }

  return (
    <Container fluid className="p-2 p-md-3">
      {/* <TopAdBanner /> */}
      <TopStory data={newsData} />

      <div className="d-block d-md-none">
        <PollSection />
      </div>

      <LiveNewsSection />
      <HindiNewsSection stories={newsData} />
      <hr className="my-3" />

      <div className="d-block d-md-none">
        <TrendingAndScore />
      </div>

      <NewsShortsSection />
      <hr className="my-3" />
      <InlineAdBanner />
      <TrendingSection stories={newsData} />
      <hr className="my-3" />

      <City />
      <WebStorySection />
      <hr className="my-3" />

      <AstrologySection />
      <hr className="my-3" />

      <Manoranjan />
      <hr className="my-3" />
      <InlineLargeAdBanner />
      {/* <PremiereSection /> */}
      <EmstvSection />
      <hr className="my-3" />
      <SportsSection />
      <hr className="my-3" />
      <ArticlesSection />
      <hr className="my-3" />

      <BusinessSection />
      <hr className="my-3" />
      <SecondInlineAdBanner />
      <IndepthExpressSection />
      <hr className="my-3" />
      <WorldNewsSection />
      <hr className="my-3" />
      <LifestyleSection />
      <BottomAdBanner />
    </Container>
  );
};

export default NewsPage;