// import React from 'react';
// import { Image, Row, Col, Badge } from 'react-bootstrap';

// // सही आइकॉन्स को इम्पोर्ट करें
// // (सुनिश्चित करें कि आपने 'react-icons' इंस्टॉल किया है: npm install react-icons)
// import { BiLike, BiCommentDetail } from 'react-icons/bi';
// import { PiShareFat } from 'react-icons/pi';

// // अपनी चारों इमेज को सही पाथ से इम्पोर्ट करें
// // (सुनिश्चित करें कि ये तस्वीरें आपके src/assets/ फोल्डर में हैं)
// import mainImage from  '../../assets/img3.jpg';
// import rescueImage from '../../assets/img2.jpg'; // दूसरी तस्वीर
// import alternateFloodImage from  '../../assets/img4.png';
// import stationImage from '../../assets/img5.png'; // चौथी तस्वीर


// const ArticleFour = () => {
//   const headline = "यमुनोत्री हाईवे पर पुल बहा, बद्रीनाथ मार्ग लैंडस्लाइड से बंद; MP-शहडोल में 3 हजार घरों में पानी भरा; हिमाचल में अब तक 82 की मौत";

//   return (
//     <div>
      
//       {/* 1. मुख्य इमेज */}
//       <Image 
//         src={mainImage} 
//         alt="बाढ़ से प्रभावित इमारतें" 
//         fluid 
//         style={{ 
//           width: '100%',
//           maxHeight: '450px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />

//       {/* 2. लाइक, कमेंट, शेयर आइकॉन - सही रंगों के साथ */}
//       <Row className="my-2 align-items-center" style={{ fontSize: '15px' }}>
//         {/* लाइक और कमेंट ग्रे रंग में */}
//         <Col xs="auto" className="d-flex align-items-center" style={{ color: '#606060' }}>
//           <BiLike size={20} className="me-2" /> 800
//         </Col>
//         <Col xs="auto" className="d-flex align-items-center" style={{ color: '#606060' }}>
//           <BiCommentDetail size={20} className="me-2" /> 201
//         </Col>
//         {/* शेयर आइकॉन और नंबर लाल रंग में */}
//         <Col xs="auto" className="d-flex align-items-center" style={{ color: 'red' }}>
//           <PiShareFat size={20} className="me-2" /> 122
//         </Col>
//       </Row>

//       {/* 3. मुख्य हेडलाइन - लाल रंग के LIVE आइकॉन के साथ */}
//       <h1 className="h2 fw-bold my-3" style={{ lineHeight: '1.4', color: '#1a1a1a' }}>
//         <Badge 
//           bg="danger" 
//           className="me-2 px-2 py-1" 
//           style={{ 
//             fontSize: '14px', 
//             borderRadius: '4px', 
//             verticalAlign: 'middle',
//             position: 'relative',
//             top: '-3px'
//           }}
//         >
//           ● LIVE
//         </Badge>
//         {headline}
//       </h1>

//       {/* 4. आर्टिकल का कंटेंट - बोल्ड नंबर्स के साथ */}
//       <div className="article-body" style={{ fontSize: '18px', lineHeight: '1.8', color: '#333333' }}>
//         <p>
//           उत्तराखंड में भारी बारिश जारी है। उत्तरकाशी में यमुनोत्री हाईवे पर ओजरी इलाके में पुल बह जाने से आसपास के इलाकों का सड़क संपर्क टूट गया है। वहीं, श्रीनगर में तेज बारिश के बाद लैंडस्लाइड से बद्रीनाथ हाईवे बंद हो गया है।
//         </p>
//         <p>
//           मध्य प्रदेश के शहडोल में बीते <strong>24</strong> घंटे में <strong>4</strong> इंच बारिश हुई। आधी रात में <strong>3</strong> हजार से ज्यादा घरों में पानी भर गया। यहां अस्पताल में पानी भर जाने पर मरीजों को शिफ्ट करना पड़ा। रेलवे ट्रैक डूब जाने से <strong>4</strong> घंटे तक ट्रेन रूट बंद रहा।
//         </p>
//         <p>
//           हिमाचल प्रदेश में <strong>20</strong> जून से <strong>6</strong> जुलाई के बीच बादल फटने की <strong>19</strong> घटनाएं हुईं। <strong>23</strong> बार बाढ़ और <strong>19</strong> बार लैंडस्लाइड हुए। <strong>269</strong> सड़कें बंद हैं। बारिश से जुड़े हादसों में अब तक <strong>82</strong> लोगों की जान जा चुकी है।
//         </p>
//         <p>
//           यूपी के अयोध्या में सरयू का जलस्तर <strong>91.35</strong> मीटर पहुंच गया है। यह वार्निंग लेवल से सिर्फ <strong>20</strong> सेमी नीचे है। <strong>24</strong> घंटे में ही <strong>24</strong> सेमी का इजाफा हुआ है। कानपुर में गंगा किनारे की बस्तियों में बाढ़ का खतरा है।
//         </p>
//       </div>

//       {/* 5. नीचे वाली तीनों इमेज */}
//       <Image 
//         src={rescueImage} 
//         alt="बचाव कार्य में लगी टीम" 
//         fluid 
//         className="my-3"
//         style={{ 
//           width: '100%', 
//           maxHeight: '400px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />
//       <Image 
//         src={alternateFloodImage} 
//         alt="बाढ़ से प्रभावित इमारतें" 
//         fluid 
//         className="mb-3"
//         style={{ 
//           width: '100%', 
//           maxHeight: '400px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />
//       <Image 
//         src={stationImage} 
//         alt="पानी में डूबा रेलवे स्टेशन" 
//         fluid 
//         className="mb-3"
//         style={{ 
//           width: '100%', 
//           maxHeight: '400px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />
//     </div>
//   );
// };

// export default ArticleFour;
// import React from 'react';
// import { Image, Row, Col, Badge } from 'react-bootstrap';

// // सही आइकॉन्स को इम्पोर्ट करें
// // (सुनिश्चित करें कि आपने 'react-icons' इंस्टॉल किया है: npm install react-icons)
// import { BiLike, BiCommentDetail } from 'react-icons/bi';
// import { PiShareFat } from 'react-icons/pi';

// // अपनी सभी इमेज को सही पाथ से इम्पोर्ट करें
// // मैंने स्क्रीनशॉट के अनुसार इमेज के नाम मान लिए हैं
// import mainImage from '../../assets/img1.jpg';      // बाढ़ वाला गाँव (ऊपर)
// import rescueWorkersImage from '../../assets/img2.jpg'; // बचाव कर्मी
// import floodedVillageImage2 from '../../assets/img3.jpg'; // बाढ़ वाला गाँव (बीच में)
// import floodedStationImage from '../../assets/img4.png';  // रेलवे स्टेशन

// const ArticleFour = () => {
//   // हेडलाइन और आर्टिकल का कंटेंट बिल्कुल स्क्रीनशॉट जैसा
//   const headline = "यमुनोत्री हाईवे पर पुल बहा, बद्रीनाथ मार्ग लैंडस्लाइड से बंद; MP-शहडोल में 3 हजार घरों में पानी भरा; हिमाचल में अब तक 82 की मौत";

//   return (
//     <div>
//       {/* 1. मुख्य इमेज */}
//       <Image 
//         src={mainImage} 
//         alt={headline} 
//         fluid 
//         style={{ 
//           width: '100%',
//           maxHeight: '450px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />

//       {/* 2. लाइक, कमेंट, शेयर आइकॉन - आपके बताए गए रंगों के साथ */}
//       <Row className="my-3 align-items-center">
//         {/* लाइक */}
//         <Col xs="auto" className="d-flex align-items-center pe-3">
//           <BiLike size={20} style={{ color: 'red' }} />
//           <span style={{ color: 'lightblue', marginLeft: '6px', fontWeight: '500', fontSize: '16px' }}>
//             800
//           </span>
//         </Col>
//         {/* कमेंट */}
//         <Col xs="auto" className="d-flex align-items-center pe-3">
//           <BiCommentDetail size={20} style={{ color: 'red' }} />
//           <span style={{ color: 'lightblue', marginLeft: '6px', fontWeight: '500', fontSize: '16px' }}>
//             201
//           </span>
//         </Col>
//         {/* शेयर */}
//         <Col xs="auto" className="d-flex align-items-center pe-3">
//           <PiShareFat size={20} style={{ color: 'red' }} />
//           <span style={{ color: 'blue', marginLeft: '6px', fontWeight: '500', fontSize: '16px' }}>
//             122
//           </span>
//         </Col>
//       </Row>

//       {/* 3. मुख्य हेडलाइन */}
//       <h1 className="h2 fw-bold my-3" style={{ lineHeight: '1.4', color: 'red' }}>
//         <Badge 
//           bg="danger" 
//           className="me-2 p-1" 
//           style={{ 
//             fontSize: '12px', 
//             borderRadius: '4px', 
//             verticalAlign: 'middle',
//             position: 'relative',
//             top: '-2px'
//           }}
//         >
//           ● LIVE
//         </Badge>
//         {headline}
//       </h1>

//       {/* 4. आर्टिकल का कंटेंट (बिल्कुल स्क्रीनशॉट जैसा) */}
//       <div className="article-body" style={{ fontSize: '18px', lineHeight: '1.8', color: '#333333' }}>
//         <p>
//           उत्तराखंड में भारी बारिश जारी है। उत्तरकाशी में यमुनोत्री हाईवे पर ओजरी इलाके में पुल बह जाने से आसपास के इलाकों का सड़क संपर्क टूट गया है। वहीं, श्रीनगर में तेज बारिश के बाद लैंडस्लाइड से बद्रीनाथ हाईवे बंद हो गया है।
//         </p>
//         <p>
//           मध्य प्रदेश के शहडोल में बीते 24 घंटे में 4 इंच बारिश हुई। आधी रात में 3 हजार से ज्यादा घरों में पानी भर गया। यहां अस्पताल में पानी भर जाने पर मरीजों को शिफ्ट करना पड़ा। रेलवे ट्रैक डूब जाने से 4 घंटे तक ट्रेन रूट बंद रहा।
//         </p>
//         <p>
//           हिमाचल प्रदेश में 20 जून से 6 जुलाई के बीच बादल फटने की 19 घटनाएं हुईं। 23 बार बाढ़ और 19 बार लैंडस्लाइड हुए। 269 सड़कें बंद हैं। बारिश से जुड़े हादसों में अब तक 82 लोगों की जान जा चुकी है।
//         </p>
//         <p>
//           यूपी के अयोध्या में सरयू का जलस्तर 91.35 मीटर पहुंच गया है। यह वार्निंग लेवल से सिर्फ 20 सेमी नीचे है। 24 घंटे में ही 24 सेमी का इजाफा हुआ है। कानपुर में गंगा किनारे की बस्तियों में बाढ़ का खतरा है।
//         </p>
//       </div>

//       {/* 5. नीचे वाली सभी इमेज, सही क्रम में */}
//       <Image 
//         src={rescueWorkersImage} 
//         alt="बचाव कार्य" 
//         fluid 
//         className="my-3"
//         style={{ 
//           width: '100%', 
//           maxHeight: '400px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />
//       <Image 
//         src={floodedVillageImage2} 
//         alt="बाढ़ प्रभावित क्षेत्र" 
//         fluid 
//         className="mb-3"
//         style={{ 
//           width: '100%', 
//           maxHeight: '400px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />
//       <Image 
//         src={floodedStationImage} 
//         alt="बाढ़ में डूबा रेलवे स्टेशन" 
//         fluid 
//         className="mb-3"
//         style={{ 
//           width: '100%', 
//           maxHeight: '400px',
//           objectFit: 'cover',
//           borderRadius: '5px'
//         }} 
//       />
//     </div>
//   );
// };

// export default ArticleFour;
// import React from 'react';
// import { Image, Row, Col, Badge } from 'react-bootstrap';

// // आइकॉन्स को इम्पोर्ट करें
// import { BiLike, BiCommentDetail } from 'react-icons/bi';
// import { PiShareFat } from 'react-icons/pi';

// // अपनी सभी इमेज को सही पाथ से इम्पोर्ट करें
// import mainImage from '../../assets/img1.jpg';
// import rescueWorkersImage from '../../assets/img2.jpg';
// import floodedVillageImage2 from '../../assets/img3.jpg';
// import floodedStationImage from '../../assets/img4.png';

// const ArticleFour = () => {
//     const headline = "यमुनोत्री हाईवे पर पुल बहा, बद्रीनाथ मार्ग लैंडस्लाइड से बंद; MP-शहडोल में 3 हजार घरों में पानी भरा; हिमाचल में अब तक 82 की मौत";

//     return (
//         <div style={{ maxWidth: '800px', margin: '20px auto' }}>

//             {/* 1. मुख्य इमेज */}
//             <Image 
//                 src={mainImage} 
//                 alt={headline} 
//                 fluid 
//                 style={{ width: '100%', borderRadius: '5px' }} 
//             />

//             {/* 2. लाइक/कमेंट/शेयर */}
//             <Row className="my-3 align-items-center">
//                 <Col xs="auto" className="d-flex align-items-center pe-3">
//                     <BiLike size={20} style={{ color: 'red' }} />
//                     {/* बदलाव: नंबर का रंग 'primary' कर दिया गया है */}
//                     <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>
//                         800
//                     </span>
//                 </Col>
//                 <Col xs="auto" className="d-flex align-items-center pe-3">
//                     <BiCommentDetail size={20} style={{ color: 'red' }} />
//                     {/* बदलाव: नंबर का रंग 'primary' कर दिया गया है */}
//                     <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>
//                         201
//                     </span>
//                 </Col>
//                 <Col xs="auto" className="d-flex align-items-center pe-3">
//                     <PiShareFat size={20} style={{ color: 'red' }} />
//                     {/* बदलाव: नंबर का रंग 'primary' कर दिया गया है */}
//                     <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>
//                         122
//                     </span>
//                 </Col>
//             </Row>

//             {/* 3. मुख्य हेडलाइन */}
//             <h1 className="h2 fw-bold my-3" style={{ lineHeight: '1.4' }}>
//                 <Badge 
//                     bg="danger" 
//                     className="me-2 p-1" 
//                     style={{ 
//                         fontSize: '12px', 
//                         borderRadius: '4px', 
//                         verticalAlign: 'middle', 
//                         position: 'relative', 
//                         top: '-2px' 
//                     }}
//                 >
//                     ● LIVE
//                 </Badge>
//                 {/* बदलाव: हेडलाइन टेक्स्ट का रंग 'danger' (लाल) कर दिया गया है */}
//                 <span className="text-danger">{headline}</span>
//             </h1>

//             {/* 4. आर्टिकल का टेक्स्ट */}
//             <div className="article-body" style={{ fontSize: '18px', lineHeight: '1.8', color: '#333333' }}>
//                 <p>उत्तराखंड में भारी बारिश जारी है। उत्तरकाशी में यमुनोत्री हाईवे पर ओजरी इलाके में पुल बह जाने से आसपास के इलाकों का सड़क संपर्क टूट गया है। वहीं, श्रीनगर में तेज बारिश के बाद लैंडस्लाइड से बद्रीनाथ हाईवे बंद हो गया है।</p>
//                 <p>मध्य प्रदेश के शहडोल में बीते 24 घंटे में 4 इंच बारिश हुई। आधी रात में 3 हजार से ज्यादा घरों में पानी भर गया। यहां अस्पताल में पानी भर जाने पर मरीजों को शिफ्ट करना पड़ा। रेलवे ट्रैक डूब जाने से 4 घंटे तक ट्रेन रूट बंद रहा।</p>
//                 <p>हिमाचल प्रदेश में 20 जून से 6 जुलाई के बीच बादल फटने की 19 घटनाएं हुईं। 23 बार बाढ़ और 19 बार लैंडस्लाइड हुए। 269 सड़कें बंद हैं। बारिश से जुड़े हादसों में अब तक 82 लोगों की जान जा चुकी है।</p>
//                 <p>यूपी के अयोध्या में सरयू का जलस्तर 91.35 मीटर पहुंच गया है। यह वार्निंग लेवल से सिर्फ 20 सेमी नीचे है। 24 घंटे में ही 24 सेमी का इजाफा हुआ है। कानपुर में गंगा किनारे की बस्तियों में बाढ़ का खतरा है।</p>
//             </div>
            
//             {/* 5. नीचे की बाकी इमेज */}
//             <Image src={rescueWorkersImage} alt="बचाव कार्य" fluid className="my-3" style={{ width: '100%', borderRadius: '5px' }} />
//             <Image src={floodedVillageImage2} alt="बाढ़ प्रभावित क्षेत्र" fluid className="mb-3" style={{ width: '100%', borderRadius: '5px' }} />
//             <Image src={floodedStationImage} alt="बाढ़ में डूबा रेलवे स्टेशन" fluid className="mb-3" style={{ width: '100%', borderRadius: '5px' }} />

//         </div>
//     );
// };

// export default ArticleFour;

// import React from 'react';
// import { Image, Row, Col, Badge } from 'react-bootstrap';

// // सभी जरूरी आइकॉन्स को इम्पोर्ट करें
// import { BiLike, BiCommentDetail } from 'react-icons/bi';
// import { PiShareFat } from 'react-icons/pi'; // PiActionRedo यहाँ से हटा दिया गया है
// import { FaPlay } from "react-icons/fa";
// // ✅ समाधान: सही आइकॉन को उसकी सही लाइब्रेरी से इम्पोर्ट किया गया है
// import { IoArrowRedoOutline } from "react-icons/io5";

// // सभी जरूरी इमेज को इम्पोर्ट करें
// import mainImage from '../../assets/img1.jpg';
// import rescueWorkersImage from '../../assets/img2.jpg';
// import floodedVillageImage2 from '../../assets/img3.jpg';
// import floodedStationImage from '../../assets/img4.png'; // यह इमेज दोनों जगह इस्तेमाल होगी


// // ===============================================
// //   लाइव अपडेट्स के हर आइटम के लिए एक छोटा कंपोनेंट
// // ===============================================
// const TimelineItem = ({ data }) => {
//     return (
//         <div style={{ position: 'relative', paddingBottom: '20px' }}>
//             {/* वर्टिकल लाइन पर नीला डॉट */}
//             <div style={{
//                 position: 'absolute',
//                 left: '-23px',
//                 top: '5px',
//                 width: '16px',
//                 height: '16px',
//                 borderRadius: '50%',
//                 backgroundColor: '#007bff',
//                 border: '2px solid white',
//                 zIndex: 2
//             }}></div>

//             {/* कंटेंट का सेक्शन */}
//             <div>
//                 <Row className="align-items-center mb-2">
//                     <Col>
//                         <h5 className="fw-bold mb-0" style={{ color: '#333' }}>{data.headline}</h5>
//                     </Col>
//                     <Col xs="auto">
//                         {/* ✅ समाधान: गलत आइकॉन को सही आइकॉन से बदल दिया गया है */}
//                         <IoArrowRedoOutline size={20} color="#c00" style={{ cursor: 'pointer' }}/>
//                     </Col>
//                 </Row>
                
//                 <div className="mb-2" style={{ fontSize: '12px', color: '#6c757d' }}>
//                     <span style={{ color: '#c00', fontWeight: 'bold' }}>{data.source}</span>
//                     <FaPlay size={8} className="mx-2" />
//                     <span>{data.time}</span>
//                 </div>

//                 <p style={{ fontSize: '15px', color: '#444' }}>{data.description}</p>
//                 <Image src={data.imageSrc} fluid rounded />
//             </div>
//         </div>
//     );
// };


// // =======================================================
// //   मुख्य कंपोनेंट जिसमें आर्टिकल और लाइव अपडेट्स दोनों हैं
// // =======================================================
// const ArticleFour = () => {
//     const articleHeadline = "यमुनोत्री हाईवे पर पुल बहा, बद्रीनाथ मार्ग लैंडस्लाइड से बंद; MP-शहडोल में 3 हजार घरों में पानी भरा; हिमाचल में अब तक 82 की मौत";
    
//     // लाइव अपडेट्स के लिए डेटा
//     const updatesData = [
//         { headline: 'महाराष्ट्र के नागपुर में तेज बारिश जारी', source: 'EMS NEWS', time: '1 min ago', description: 'नागपुर के कई इलाकों में बारिश हुई है मौसम विभाग ने विदर्भ क्षेत्र के लिए अगले 48 घंटों का ऑरेंज अलर्ट जारी किया है लोगों को सावधानी बरतने की सलाह दी गई है', imageSrc: floodedStationImage },
//         { headline: 'महाराष्ट्र के नागपुर में तेज बारिश जारी', source: 'EMS NEWS', time: '1 min ago', description: 'नागपुर के कई इलाकों में बारिश हुई है मौसम विभाग ने विदर्भ क्षेत्र के लिए अगले 48 घंटों का ऑरेंज अलर्ट जारी किया है लोगों को सावधानी बरतने की सलाह दी गई है', imageSrc: floodedStationImage },
//         { headline: 'महाराष्ट्र के नागपुर में तेज बारिश जारी', source: 'EMS NEWS', time: '1 min ago', description: 'नागपुर के कई इलाकों में बारिश हुई है मौसम विभाग ने विदर्भ क्षेत्र के लिए अगले 48 घंटों का ऑरेंज अलर्ट जारी किया है लोगों को सावधानी बरतने की सलाह दी गई है', imageSrc: floodedStationImage },
//         { headline: 'महाराष्ट्र के नागपुर में तेज बारिश जारी', source: 'EMS NEWS', time: '1 min ago', description: 'नागपुर के कई इलाकों में बारिश हुई है मौसम विभाग ने विदर्भ क्षेत्र के लिए अगले 48 घंटों का ऑरेंज अलर्ट जारी किया है लोगों को सावधानी बरतने की सलाह दी गई है', imageSrc: floodedStationImage }
//     ];

//     return (
//         <div style={{ maxWidth: '800px', margin: '20px auto' }}>

//             {/* ---------- पार्ट 1: मुख्य आर्टिकल ---------- */}
//             <Image src={mainImage} alt={articleHeadline} fluid style={{ width: '100%', borderRadius: '5px' }} />
//             <Row className="my-3 align-items-center">
//                 <Col xs="auto" className="d-flex align-items-center pe-3">
//                     <BiLike size={20} style={{ color: 'red' }} />
//                     <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>800</span>
//                 </Col>
//                 <Col xs="auto" className="d-flex align-items-center pe-3">
//                     <BiCommentDetail size={20} style={{ color: 'red' }} />
//                     <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>201</span>
//                 </Col>
//                 <Col xs="auto" className="d-flex align-items-center pe-3">
//                     <PiShareFat size={20} style={{ color: 'red' }} />
//                     <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>122</span>
//                 </Col>
//             </Row>
//             <h1 className="h2 fw-bold my-3" style={{ lineHeight: '1.4' }}>
//                 <Badge bg="danger" className="me-2 p-1" style={{ fontSize: '12px', borderRadius: '4px', verticalAlign: 'middle', position: 'relative', top: '-2px' }}>● LIVE</Badge>
//                 <span className="text-danger">{articleHeadline}</span>
//             </h1>
//             <div className="article-body" style={{ fontSize: '18px', lineHeight: '1.8', color: '#333333' }}>
//                 <p>उत्तराखंड में भारी बारिश जारी है। उत्तरकाशी में यमुनोत्री हाईवे पर ओजरी इलाके में पुल बह जाने से आसपास के इलाकों का सड़क संपर्क टूट गया है। वहीं, श्रीनगर में तेज बारिश के बाद लैंडस्लाइड से बद्रीनाथ हाईवे बंद हो गया है।</p>
//                 <p>मध्य प्रदेश के शहडोल में बीते 24 घंटे में 4 इंच बारिश हुई। आधी रात में 3 हजार से ज्यादा घरों में पानी भर गया। यहां अस्पताल में पानी भर जाने पर मरीजों को शिफ्ट करना पड़ा। रेलवे ट्रैक डूब जाने से 4 घंटे तक ट्रेन रूट बंद रहा।</p>
//                 <p>हिमाचल प्रदेश में 20 जून से 6 जुलाई के बीच बादल फटने की 19 घटनाएं हुईं। 23 बार बाढ़ और 19 बार लैंडस्लाइड हुए। 269 सड़कें बंद हैं। बारिश से जुड़े हादसों में अब तक 82 लोगों की जान जा चुकी है।</p>
//                 <p>यूपी के अयोध्या में सरयू का जलस्तर 91.35 मीटर पहुंच गया है। यह वार्निंग लेवल से सिर्फ 20 सेमी नीचे है। 24 घंटे में ही 24 सेमी का इजाफा हुआ है। कानपुर में गंगा किनारे की बस्तियों में बाढ़ का खतरा है।</p>
//             </div>
//             <Image src={rescueWorkersImage} alt="बचाव कार्य" fluid className="my-3" style={{ width: '100%', borderRadius: '5px' }} />
//             <Image src={floodedVillageImage2} alt="बाढ़ प्रभावित क्षेत्र" fluid className="mb-3" style={{ width: '100%', borderRadius: '5px' }} />
//             <Image src={floodedStationImage} alt="बाढ़ में डूबा रेलवे स्टेशन" fluid className="mb-3" style={{ width: '100%', borderRadius: '5px' }} />
            
//             {/* ---------- पार्ट 2: लाइव अपडेट्स टाइमलाइन ---------- */}
//             <div style={{ marginTop: '40px' }}>
//                 <h2 className="text-danger fw-bold mb-4">लाइव अपडेट्स</h2>
//                 <div style={{ position: 'relative', paddingLeft: '30px' }}>
//                     {/* वर्टिकल लाल लाइन */}
//                     <div style={{ position: 'absolute', left: '7px', top: '5px', bottom: '5px', width: '2px', backgroundColor: '#c00', zIndex: 1 }}></div>
//                     {updatesData.map((update, index) => (
//                         <TimelineItem key={index} data={update} />
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ArticleFour;
import React from 'react';
import { Image, Row, Col, Badge } from 'react-bootstrap';

// सभी जरूरी आइकॉन्स को इम्पोर्ट करें
import { BiLike, BiCommentDetail } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';
import { BsCameraVideo } from 'react-icons/bs';
import { IoArrowRedoOutline } from 'react-icons/io5';

// सभी जरूरी इमेज को इम्पोर्ट करें (आपके दिए हुए नए नाम)
import img1 from '../../assets/Articlefour-img1.png';
import img2 from '../../assets/articlefour-img2.png';
import img3 from '../../assets/articlefour-img3.png';
import img4 from '../../assets/articlefour-img4.png';


// ==================================================
//   लाइव अपडेट्स के हर आइटम के लिए एक छोटा कंपोनेंट
// ==================================================
const TimelineItem = ({ data }) => {
    return (
        <div style={{ position: 'relative', paddingBottom: '25px' }}>
            <div style={{
                position: 'absolute',
                left: '-29.5px',
                top: '5px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                border: '2px solid white',
                zIndex: 2
            }}></div>
            <div>
                <Row className="align-items-start mb-2">
                    <Col>
                        <h5 className="fw-bold mb-0" style={{ fontSize: '1.1rem', color: '#333' }}>{data.headline}</h5>
                    </Col>
                    <Col xs="auto" className="ps-1">
                        <IoArrowRedoOutline size={22} color="#dc3545" style={{ cursor: 'pointer' }}/>
                    </Col>
                </Row>
                <div className="mb-2 d-flex align-items-center" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                    <span style={{ color: '#dc3545', fontWeight: 'bold', marginRight: '8px' }}>{data.source}</span>
                    <BsCameraVideo size={14} color="#dc3545" className="me-1"/>
                    <span>{data.time}</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>{data.description}</p>
                
                <Image 
                    src={data.imageSrc} 
                    fluid 
                    rounded 
                    style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'cover'
                    }}
                />
            </div>
        </div>
    );
};


// =======================================================
//   मुख्य कंपोनेंट जिसमें आर्टिकल और लाइव अपडेट्स दोनों हैं
// =======================================================
const ArticleFour = () => {
    const articleHeadline = "यमुनोत्री हाईवे पर पुल बहा, बद्रीनाथ मार्ग लैंडस्लाइड से बंद; MP-शहडोल में 3 हजार घरों में पानी भरा; हिमाचल में अब तक 82 की मौत";
    
    const updateItemData = {
        headline: 'महाराष्ट्र के नागपुर में तेज बारिश जारी',
        source: 'EMS NEWS',
        time: '1 min ago',
        description: 'नागपुर के कई इलाकों में बारिश हुई है मौसम विभाग ने विदर्भ क्षेत्र के लिए अगले 48 घंटों का ऑरेंज अलर्ट जारी किया है लोगों को सावधानी बरतने की सलाह दी गई है',
        // ✅ बदलाव: गलत वैरिएबल नाम को सही किया गया (floodedStationImage -> img4)
        imageSrc: img4
    };

    const updatesData = [updateItemData, updateItemData, updateItemData];

    const bottomImageStyle = {
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        borderRadius: '5px'
    };


    return (
        <div style={{ padding: '15px' }}>

            {/* ---------- पार्ट 1: मुख्य आर्टिकल ---------- */}
            {/* ✅ बदलाव: गलत वैरिएबल नाम को सही किया गया (mainImage -> img1) */}
            <Image src={img1} alt={articleHeadline} fluid style={{ width: '100%', borderRadius: '5px' }} />
            <Row className="my-3 align-items-center">
                <Col xs="auto" className="d-flex align-items-center pe-3">
                    <BiLike size={20} style={{ color: 'red' }} />
                    <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>800</span>
                </Col>
                <Col xs="auto" className="d-flex align-items-center pe-3">
                    <BiCommentDetail size={20} style={{ color: 'red' }} />
                    <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>201</span>
                </Col>
                <Col xs="auto" className="d-flex align-items-center pe-3">
                    <PiShareFat size={20} style={{ color: 'red' }} />
                    <span className="text-primary" style={{ marginLeft: '6px', fontWeight: '600', fontSize: '16px' }}>122</span>
                </Col>
            </Row>
            <h1 className="h2 fw-bold my-3" style={{ lineHeight: '1.4' }}>
                <Badge bg="danger" className="me-2 p-1" style={{ fontSize: '12px', borderRadius: '4px', verticalAlign: 'middle', position: 'relative', top: '-2px' }}>● LIVE</Badge>
                <span className="text-danger">{articleHeadline}</span>
            </h1>
            <div className="article-body" style={{ fontSize: '18px', lineHeight: '1.8', color: '#333333' }}>
                <p>उत्तराखंड में भारी बारिश जारी है। उत्तरकाशी में यमुनोत्री हाईवे पर ओजरी इलाके में पुल बह जाने से आसपास के इलाकों का सड़क संपर्क टूट गया है। वहीं, श्रीनगर में तेज बारिश के बाद लैंडस्लाइड से बद्रीनाथ हाईवे बंद हो गया है।</p>
                <p>मध्य प्रदेश के शहडोल में बीते 24 घंटे में 4 इंच बारिश हुई। आधी रात में 3 हजार से ज्यादा घरों में पानी भर गया। यहां अस्पताल में पानी भर जाने पर मरीजों को शिफ्ट करना पड़ा। रेलवे ट्रैक डूब जाने से 4 घंटे तक ट्रेन रूट बंद रहा।</p>
                <p>हिमाचल प्रदेश में 20 जून से 6 जुलाई के बीच बादल फटने की 19 घटनाएं हुईं। 23 बार बाढ़ और 19 बार लैंडस्लाइड हुए। 269 सड़कें बंद हैं। बारिश से जुड़े हादसों में अब तक 82 लोगों की जान जा चुकी है।</p>
                <p>यूपी के अयोध्या में सरयू का जलस्तर 91.35 मीटर पहुंच गया है। यह वार्निंग लेवल से सिर्फ 20 सेमी नीचे है। 24 घंटे में ही 24 सेमी का इजाफा हुआ है। कानपुर में गंगा किनारे की बस्तियों में बाढ़ का खतरा है।</p>
            </div>
            
            {/* ✅ बदलाव: गलत वैरिएबल नामों को सही किया गया */}
            <Image src={img2} alt="बचाव कार्य" fluid className="my-3" style={bottomImageStyle} />
            <Image src={img3} alt="बाढ़ प्रभावित क्षेत्र" fluid className="mb-3" style={bottomImageStyle} />
            <Image src={img4} alt="बाढ़ में डूबा रेलवे स्टेशन" fluid className="mb-3" style={bottomImageStyle} />
            
            {/* ---------- पार्ट 2: लाइव अपडेट्स टाइमलाइन ---------- */}
            <div style={{ marginTop: '40px' }}>
                <h2 className="text-danger fw-bold mb-4" style={{ fontSize: '1.5rem' }}>लाइव अपडेट्स</h2>
                <div style={{ position: 'relative', paddingLeft: '30px' }}>
                    <div style={{ position: 'absolute', left: '7px', top: '5px', bottom: '5px', width: '3px', backgroundColor: '#dc3545', zIndex: 1 }}></div>
                    {updatesData.map((update, index) => (
                        <TimelineItem key={index} data={update} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ArticleFour;