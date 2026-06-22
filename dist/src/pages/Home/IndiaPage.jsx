// // src/pages/IndiaPage.jsx

// import React from 'react';
// import { Container } from 'react-bootstrap';
// import NewsGrid from '../../components/IndiaPage/NewsGrid';
// import OtherNews from '../../components/IndiaPage/OtherNews';
// import TopNews from '../../components/IndiaPage/TopNews';
// import InlineAdBanner from '../../components/NewsDetails/InlineAdBanner';
// import InlineLargeAdBanner from '../../components/NewsDetails/InlineLargeAdBanner';
// import BottomAdBanner from '../../components/NewsDetails/BottomAdBanner';

// const IndiaPage = () => {
//   return (
//     <>
//     <TopNews/>
//      <InlineAdBanner /> 
//     <NewsGrid/>
//      <InlineAdBanner /> 
//     <OtherNews/>
//     <BottomAdBanner/>
//     </>

//   );
// };

// export default IndiaPage;









import React from 'react';
import NewsGrid from '../../components/IndiaPage/NewsGrid';
import OtherNews from '../../components/IndiaPage/OtherNews';
import TopNews from '../../components/IndiaPage/TopNews';
import InlineAdBanner from '../../components/NewsDetails/InlineAdBanner';
import InlineLargeAdBanner from '../../components/NewsDetails/InlineLargeAdBanner';
import BottomAdBanner from '../../components/NewsDetails/BottomAdBanner';

const IndiaPage = () => {
  return (
    <>
      <TopNews/>
      
      {/* 🔴 category="india" पास किया */}
      <InlineAdBanner category="india" /> 
      
      <NewsGrid/>
      
      {/* 🔴 category="india" पास किया */}
      <InlineLargeAdBanner category="india" /> 
      
      <OtherNews/>
      
      {/* 🔴 category="india" पास किया */}
      <BottomAdBanner category="india" />
    </>
  );
};

export default IndiaPage;