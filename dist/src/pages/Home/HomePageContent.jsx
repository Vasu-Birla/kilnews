// src/pages/Home/HomePageContent.jsx

import React from 'react';

// ✅ बदलाव: सभी इम्पोर्ट के पते (path) को ठीक किया गया है
// import NewsContent from '../../components/MainArtical/NewsContent';
import Article from '../../components/MainArtical/Article';
import ArticleFour from '../../components/MainArtical/ArticleFour';
import NewsDetails from '../../components/Main_NewsDetails/NewsContent'
import RashifalDetailsPage from '../../components/MainArtical/RashifalDetailsPage';


const HomePageContent = () => (
    <>
   
        <NewsDetails/>
        {/* <Article /> */}
        {/* <ArticleFour /> */}


    </>
);

export default HomePageContent;