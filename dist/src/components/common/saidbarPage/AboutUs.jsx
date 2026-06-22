// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// const AboutUs = () => {
    
//     // कस्टम स्टाइलिंग ताकि पेज बिलकुल इमेज जैसा दिखे
//     const styles = `
//         body {
//             overflow-x: hidden; // To prevent horizontal scroll on small screens
//         }
//         .heading-gold {
//             color: #b48b48;
//             font-family: serif;
//             font-weight: bold;
//         }
//         .heading-grey {
//             color: #6c757d;
//              font-family: serif;
//         }
//         .man-text {
//             font-size: 4rem;
//             font-weight: 900;
//             line-height: 1;
//         }
//         .behind-text {
//             font-size: 2rem;
//             font-weight: bold;
//             line-height: 1;
//         }
//         .section-title {
//             font-family: serif;
//             font-weight: bold;
//             color: #5a4b3a;
//             text-align: center;
//             margin-bottom: 2rem;
//         }
//         .ventures-title {
//              font-family: serif;
//             font-weight: bold;
//             color: white;
//             background-color: #5a4b3a;
//             padding: 0.5rem 1.5rem;
//             display: inline-block;
//             margin-bottom: 2.5rem;
//         }
//         .venture-item {
//             display: flex;
//             align-items: flex-start;
//             margin-bottom: 2rem;
//             border-left: 5px solid #b48b48;
//             padding-left: 15px;
//             padding-top: 10px;
//             padding-bottom: 10px;
//         }
//         .venture-item-bracket {
//             content: '';
//             border-top: 5px solid #b48b48;
//             border-bottom: 5px solid #b48b48;
//             width: 20px; 
//             align-self: stretch;
//             margin-right: 15px;
//         }
//          .venture-text h5 {
//             color: #b48b48;
//             font-weight: bold;
//         }
//     `;

//     return (
//         <>
//             <style>{styles}</style>
//             <Container className="my-5">

//                 {/* =================================================================
//                     SECTION 1: A Man Behind EMS (पहली इमेज का कंटेंट)
//                 ================================================================= */}
//                 <section className="mb-5">
//                     <Row className="align-items-center">
//                         {/* इमेज कॉलम को हटा दिया गया है */}
//                         <Col md={12}>
//                             <div className="text-center text-md-start mb-4">
//                                 <h1 className="heading-gold" style={{ fontSize: '3.5rem' }}>
//                                     NEWS <span className="text-dark" style={{ fontSize: '1.5rem', verticalAlign: 'middle' }}>WITH CREDIBILITY AND</span> TRUST
//                                 </h1>
//                                 {/* लोगो इमेज को हटा दिया गया है */}
//                             </div>

//                             <div className="text-center text-md-start">
//                                 <h2 className="heading-grey">
//                                     <span className="man-text">A MAN</span>
//                                     <span className="behind-text"> BEHIND EMS</span>
//                                 </h2>
//                                 <p className="text-secondary mt-3" style={{textAlign: 'justify'}}>
//                                     Express Media Service is a mass media company based in Madhya Pradesh introduced & founded in 1991 by Shri Sanat Kumar Jain. He is an entrepreneur, journalist, and academician. He has experience of more than 35 years in active journalism. The Express Media Service is headquartered in
//                                 </p>
//                             </div>
//                         </Col>
//                     </Row>
//                 </section>

//                 {/* =================================================================
//                     SECTION 2: Our Glorious Journey (दूसरी इमेज का कंटेंट)
//                 ================================================================= */}
//                 <section className="my-5 py-5 text-center">
//                      <h2 className="section-title">Our Glorious Journey</h2>
//                      {/* लोगो वाली div को हटा दिया गया है */}
//                      <p className="text-secondary col-lg-10 mx-auto" style={{textAlign: 'justify', lineHeight: '1.8'}}>
//                         In 1991 Jabalpur Express was first published as a district-based newspaper from Chhindwara. After that in 1992, two more editions have been launched from Jabalpur and Balaghat. A few years later in 1995 Jabalpur express has become the leading newspaper of the Mahakaushal region of Madhya Pradesh. In the year 2003 Express News started its three more editions from Bilaspur, Katni and Gwalior. We are central India's leading newspaper with a circulation of 3 lacs. EMS group received funding through Google news Initiative under its emergency relief fund program of 12500 USD on 28 august 2020.
//                      </p>
//                 </section>

//                 {/* =================================================================
//                     SECTION 3: Different Ventures (तीसरी इमेज का कंटेंट)
//                 ================================================================= */}
//                 <section className="my-5 text-center">
//                     <h2 className="ventures-title">DIFFERENT VENTURES</h2>
//                     <Row>
//                         {/* Left Column Ventures */}
//                         <Col md={6} >
//                             <div className="venture-item">
//                                 <div className="venture-item-bracket"></div>
//                                 {/* लोगो इमेज को हटा दिया गया है */}
//                                 <div className="venture-text text-start">
//                                     <h5>JABALPUR EXPRESS:</h5>
//                                     <p className="small text-secondary">It was started in 1991. It is a daily newspaper and has 12 pages. The main editions are Jabalpur Chhindwara & Balaghat and sub editions are Seoni, Narsinghpur, Damoh Mandla, Anooppur. It has a phenomenal reach with 3 LAC circulations.</p>
//                                 </div>
//                             </div>
//                              <div className="venture-item">
//                                 <div className="venture-item-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EXPRESS NEWS:</h5>
//                                     <p className="small text-secondary">It was started in 1997. It is a daily newspaper and has 12 pages. The main editions are Bhopal, Gwalior, Katni & Bilaspur. It has 1 Lac circulations.</p>
//                                 </div>
//                             </div>
//                              <div className="venture-item">
//                                 <div className="venture-item-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMS News Agency</h5>
//                                     <p className="small text-secondary">India's largest Hindi news agency established in 1997. This is the first company to start with a satellite-based news agency in India. It daily releases more than 500 news content from regional news to national to state to international and 75 to 100 photos of the same categories. We are India's largest Hindi news agency with a clientele of 650 newspapers.</p>
//                                 </div>
//                             </div>
//                         </Col>

//                         {/* Right Column Ventures */}
//                         <Col md={6}>
//                              <div className="venture-item">
//                                 <div className="venture-item-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EXPRESS NEWS:</h5>
//                                     <p className="small text-secondary">It was started in 1997. It is a daily newspaper and has 8 pages. The main editions are Bhopal, Gwalior, Katni & Bilaspur. It has 1 Lac circulations.</p>
//                                 </div>
//                             </div>
//                              <div className="venture-item">
//                                 <div className="venture-item-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMSTV.IN</h5>
//                                     <p className="small text-secondary">was started in 2007 is the only archival-based video news channel where district-level news can be searched. It consistently delivers news from across the spectrum of current affairs regional, politics, sports, entertainment, etc. EMSTV.IN Youtube channel has more than 150 k subscribers and millions of viewers.</p>
//                                 </div>
//                             </div>
//                              <div className="venture-item">
//                                 <div className="venture-item-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMSINDIA.COM</h5>
//                                     <p className="small text-secondary">started in the year 2005. It is a leading news portal with monthly visitors of more than 2.5 lacs. Our aim to make emsindia.com India's leading multilingual news portal. Our mobile application is also available on both the Android and iOS platforms.</p>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </section>

//             </Container>
//         </>
//     );
// };

// export default AboutUs;
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// // ✅ इसे named export के रूप में रखा गया है
// export const AboutUs = () => {
    
//     // कस्टम स्टाइलिंग बिलकुल इमेज जैसी
//     const styles = `
//         /* 
//          * === सबसे ज़रूरी स्टेप ===
//          * फ़ॉन्ट को सही दिखाने के लिए, इस लाइन को अपनी public/index.html फ़ाइल में <head> टैग के अंदर डालें:
//          * <link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@700&display=swap" rel="stylesheet">
//         */

//         .about-us-page-container {
//             max-width: 1100px;
//         }

//         /* ✅ यहाँ नई हेडिंग के लिए CSS जोड़ा गया है */
//         .credibility-heading-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             text-transform: uppercase;
//             gap: 1rem;
//             margin: 2rem 0 4rem 0; /* नीचे ज़्यादा मार्जिन ताकि स्पेस अच्छा दिखे */
//             text-align: center;
//         }
//         .credibility-heading-large {
//             font-family: 'Anton', sans-serif;
//             font-size: 6.5rem;
//             color: #b48b48;
//             line-height: 1;
//         }
//         .credibility-heading-middle-block {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             font-family: 'Oswald', sans-serif;
//             font-weight: 700;
//             color: #212529;
//             line-height: 1.2;
//             transform: translateY(5px);
//         }
//         .credibility-heading-middle-block span {
//              font-size: 1.8rem;
//         }
        
//         /* Responsive Media Queries */
//         @media (max-width: 768px) {
//             .credibility-heading-large { font-size: 4rem; }
//             .credibility-heading-middle-block span { font-size: 1.1rem; }
//             .credibility-heading-container { gap: 0.5rem; }
//         }
//         @media (max-width: 480px) {
//             .credibility-heading-large { font-size: 2.8rem; }
//             .credibility-heading-middle-block span { font-size: 0.8rem; }
//         }

//         /* --- बाकी का पुराना CSS --- */
//         .heading-grey {
//             color: #808080;
//             font-family: serif;
//         }
//         .man-text {
//             font-size: 5rem;
//             font-weight: 900;
//             line-height: 1;
//         }
//         .behind-ems-text {
//             display: block;
//             font-size: 2.5rem;
//             font-weight: bold;
//             line-height: 1;
//             color: #343a40;
//         }
//         .section-title {
//             font-family: serif;
//             font-weight: bold;
//             color: #5a4b3a;
//             text-align: center;
//             margin-bottom: 2.5rem;
//             font-size: 2rem;
//         }
//         .ventures-title {
//             font-family: serif;
//             font-weight: bold;
//             color: white;
//             background-color: #5a4b3a;
//             padding: 0.5rem 2rem;
//             display: inline-block;
//             margin-bottom: 3rem;
//             font-size: 1.5rem;
//         }
//         .venture-item {
//             display: flex;
//             align-items: flex-start;
//             margin-bottom: 2.5rem;
//         }
//         .venture-bracket {
//             border-top: 4px solid #b48b48;
//             border-bottom: 4px solid #b48b48;
//             border-left: 4px solid #b48b48;
//             width: 20px; 
//             align-self: stretch;
//             margin-right: 15px;
//         }
//         .venture-text h5 {
//             color: #b48b48;
//             font-weight: bold;
//             font-size: 1rem;
//             margin-bottom: 0.25rem;
//         }
//         .venture-text p {
//             font-size: 0.85rem;
//             color: #555;
//             text-align: justify;
//         }
//         .body-text {
//             color: #333;
//             font-size: 1rem;
//             line-height: 1.7;
//             text-align: justify;
//         }
//     `;

//     return (
//         <>
//             <style>{styles}</style>
//             <Container className="my-5 about-us-page-container">

//                 {/* =================================================================
//                     SECTION 1: A Man Behind EMS
//                 ================================================================= */}
//                 <section className="mb-5">

//                     {/* ✅ नई हेडिंग का HTML यहाँ जोड़ा गया है */}
//                     <div className="credibility-heading-container">
//                         <div className="credibility-heading-large">News</div>
//                         <div className="credibility-heading-middle-block">
//                             <span>With</span>
//                             <span>Credibility</span>
//                             <span>And</span>
//                         </div>
//                         <div className="credibility-heading-large">Trust</div>
//                     </div>

//                     <Row className="align-items-center">
//                         <Col md={5} className="d-none d-md-block"></Col>
                        
//                         <Col md={7}>
//                             <div className="d-flex align-items-center">
//                                 <span className="man-text heading-grey">A MAN</span>
//                                 <div className="ms-3">
//                                     <span className="behind-ems-text">BEHIND</span>
//                                     <span className="behind-ems-text">EMS</span>
//                                 </div>
//                             </div>
//                             <p className="body-text mt-3">
//                                 Express Media Service is a mass media company based in Madhya Pradesh introduced & founded in 1991 by Shri Sanat Kumar Jain. He is an entrepreneur, journalist, and academician. He has experience of more than 35 years in active journalism. The Express Media Service is headquartered in Bhopal, Madhya Pradesh.
//                             </p>
//                         </Col>
//                     </Row>
//                 </section>

//                 {/* ======================= SECTION 2: Our Glorious Journey ======================= */}
//                 <section className="my-5 py-5 text-center">
//                     <h2 className="section-title">Our Glorious Journey</h2>
//                     <p className="body-text col-lg-11 mx-auto">
//                         In 1991 Jabalpur Express was first published as a district-based newspaper from Chhindwara. After that in 1992, two more editions have been launched from Jabalpur and Balaghat. A few years later in 1995 Jabalpur express has become the leading newspaper of the Mahakaushal region of Madhya Pradesh. In the year 2003 Express News started its three more editions from Bilaspur, Katni and Gwalior. We are central India's leading newspaper with a circulation of 3 lacs. EMS group received funding through Google news Initiative under its emergency relief fund program of 12500 USD on 28 august 2020.
//                     </p>
//                 </section>

//                 {/* ======================= SECTION 3: Different Ventures ======================= */}
//                 <section className="my-5 text-center">
//                     <h2 className="ventures-title">DIFFERENT VENTURES</h2>
//                     <Row>
//                         <Col md={6}>
//                             <div className="venture-item">
//                                 <div className="venture-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>JABALPUR EXPRESS:</h5>
//                                     <p>It was started in 1991. It is a daily newspaper and has 12 pages. The main editions are Jabalpur Chhindwara & Balaghat and sub editions are Seoni, Narsinghpur, Damoh Mandla, Anooppur. It has a phenomenal reach with 3 LAC circulations.</p>
//                                 </div>
//                             </div>
//                              <div className="venture-item">
//                                 <div className="venture-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EXPRESS NEWS:</h5>
//                                     <p>It was started in 1997. It is a daily newspaper and has 12 pages. The main editions are Bhopal, Gwalior, Katni & Bilaspur. It has 1 Lac circulations.</p>
//                                 </div>
//                             </div>
//                              <div className="venture-item">
//                                 <div className="venture-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMS News Agency</h5>
//                                     <p>India's largest Hindi news agency established in 1997. This is the first company to start with a satellite-based news agency in India. It daily releases more than 500 news content from regional news to national to state to international and 75 to 100 photos of the same categories. We are India's largest Hindi news agency with a clientele of 650 newspapers.</p>
//                                 </div>
//                             </div>
//                         </Col>

//                         <Col md={6}>
//                             <div className="venture-item">
//                                 <div className="venture-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EXPRESS NEWS:</h5>
//                                     <p>It was started in 1997. It is a daily newspaper and has 8 pages. The main editions are Bhopal, Gwalior, Katni & Bilaspur. It has 1 Lac circulations.</p>
//                                 </div>
//                             </div>
//                             <div className="venture-item">
//                                 <div className="venture-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMSTV.IN</h5>
//                                     <p>was started in 2007 is the only archival-based video news channel where district-level news can be searched. It consistently delivers news from across the spectrum of current affairs regional, politics, sports, entertainment, etc. EMSTV.IN Youtube channel has more than 150 k subscribers and millions of viewers.</p>
//                                 </div>
//                             </div>
//                             <div className="venture-item">
//                                 <div className="venture-bracket"></div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMSINDIA.COM</h5>
//                                     <p>started in the year 2005. It is a leading news portal with monthly visitors of more than 2.5 lacs. Our aim to make emsindia.com India's leading multilingual news portal. Our mobile application is also available on both the Android and iOS platforms.</p>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </section>

//             </Container>
//         </>
//     );
// };

// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// export const AboutUs = () => {
    
//     // इस कंपोनेंट के लिए पूरी कस्टम स्टाइलिंग
//     const styles = `
//         /* 
//          * === सबसे ज़रूरी स्टेप ===
//          * फ़ॉन्ट को सही दिखाने के लिए, इस लाइन को अपनी public/index.html फ़ाइल में <head> टैग के अंदर डालें:
//          * <link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@700&display=swap" rel="stylesheet">
//         */

//         .about-us-page-container {
//             max-width: 1100px;
//         }

//         /* ----- Section 1: Main Heading CSS ----- */
//         .credibility-heading-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             text-transform: uppercase;
//             gap: 1rem;
//             margin: 2rem 0 4rem 0;
//             text-align: center;
//         }
//         .credibility-heading-large {
//             font-family: 'Anton', sans-serif;
//             font-size: 6.5rem;
//             color: #b48b48;
//             line-height: 1;
//         }
//         .credibility-heading-middle-block {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             font-family: 'Oswald', sans-serif;
//             font-weight: 700;
//             color: #212529;
//             line-height: 1.2;
//             transform: translateY(5px);
//         }
//         .credibility-heading-middle-block span {
//              font-size: 1.8rem;
//         }
        
//         /* Responsive Media Queries for Heading */
//         @media (max-width: 768px) {
//             .credibility-heading-large { font-size: 4rem; }
//             .credibility-heading-middle-block span { font-size: 1.1rem; }
//             .credibility-heading-container { gap: 0.5rem; }
//         }
//         @media (max-width: 480px) {
//             .credibility-heading-large { font-size: 2.8rem; }
//             .credibility-heading-middle-block span { font-size: 0.8rem; }
//         }

//         /* ----- Section 1: "A Man Behind EMS" CSS ----- */
//         .heading-grey { color: #808080; font-family: serif; }
//         .man-text { font-size: 5rem; font-weight: 900; line-height: 1; }
//         .behind-ems-text { display: block; font-size: 2.5rem; font-weight: bold; line-height: 1; color: #343a40; }

//         /* ----- Section 2: "Glorious Journey" CSS ----- */
//         .section-title { font-family: serif; font-weight: bold; color: #5a4b3a; text-align: center; margin-bottom: 2.5rem; font-size: 2rem; }
//         .body-text { color: #333; font-size: 1rem; line-height: 1.7; text-align: justify; }

//         /* ----- Section 3: "Different Ventures" CSS ----- */
//         .ventures-title {
//             font-family: serif;
//             font-weight: bold;
//             color: white;
//             background-color: #6d6051;
//             padding: 0.75rem 2.5rem;
//             display: inline-block;
//             margin-bottom: 3rem;
//             font-size: 1.8rem;
//             border-radius: 8px;
//             text-transform: uppercase;
//         }
//         .venture-item {
//             display: flex;
//             align-items: center;
//             margin-bottom: 2.5rem;
//             gap: 1rem;
//         }
//         .venture-logo-container {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             flex-shrink: 0;
//         }
//         .venture-bracket {
//             width: 25px;
//             height: 60px;
//             border-top: 5px solid #b48b48;
//             border-bottom: 5px solid #b48b48;
//         }
//         .venture-bracket.left { border-left: 5px solid #b48b48; }
//         .venture-bracket.right { border-right: 5px solid #b48b48; }
//         .venture-logo-placeholder {
//             width: 150px;
//             height: 50px;
//             background-color: #f0f0f0;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #aaa;
//             font-size: 0.8rem;
//             text-align: center;
//             border-radius: 5px;
//         }
//         .venture-text h5 {
//             font-family: sans-serif;
//             font-weight: bold;
//             color: #333;
//             font-size: 1.1rem;
//             margin-bottom: 0.25rem;
//             text-transform: uppercase;
//         }
//         .venture-text p {
//             font-family: sans-serif;
//             font-size: 0.9rem;
//             color: #555;
//             text-align: justify;
//             line-height: 1.6;
//         }
//     `;

//     return (
//         <>
//             <style>{styles}</style>
//             <Container className="my-5 about-us-page-container">

//                 {/* ======================= SECTION 1: A Man Behind EMS ======================= */}
//                 <section className="mb-5">
//                     <div className="credibility-heading-container">
//                         <div className="credibility-heading-large">News</div>
//                         <div className="credibility-heading-middle-block">
//                             <span>With</span>
//                             <span>Credibility</span>
//                             <span>And</span>
//                         </div>
//                         <div className="credibility-heading-large">Trust</div>
//                     </div>
//                     <Row className="align-items-center">
//                         <Col md={5} className="d-none d-md-block"></Col>
//                         <Col md={7}>
//                             <div className="d-flex align-items-center">
//                                 <span className="man-text heading-grey">A MAN</span>
//                                 <div className="ms-3">
//                                     <span className="behind-ems-text">BEHIND</span>
//                                     <span className="behind-ems-text">EMS</span>
//                                 </div>
//                             </div>
//                             <p className="body-text mt-3">
//                                 Express Media Service is a mass media company based in Madhya Pradesh introduced & founded in 1991 by Shri Sanat Kumar Jain. He is an entrepreneur, journalist, and academician. He has experience of more than 35 years in active journalism. The Express Media Service is headquartered in Bhopal, Madhya Pradesh.
//                             </p>
//                         </Col>
//                     </Row>
//                 </section>

//                 {/* ======================= SECTION 2: Our Glorious Journey ======================= */}
//                 <section className="my-5 py-5 text-center">
//                     <h2 className="section-title">Our Glorious Journey</h2>
//                     <p className="body-text col-lg-11 mx-auto">
//                         In 1991 Jabalpur Express was first published as a district-based newspaper from Chhindwara. After that in 1992, two more editions have been launched from Jabalpur and Balaghat. A few years later in 1995 Jabalpur express has become the leading newspaper of the Mahakaushal region of Madhya Pradesh. In the year 2003 Express News started its three more editions from Bilaspur, Katni and Gwalior. We are central India's leading newspaper with a circulation of 3 lacs. EMS group received funding through Google news Initiative under its emergency relief fund program of 12500 USD on 28 august 2020.
//                     </p>
//                 </section>

//                 {/* ======================= SECTION 3: Different Ventures ======================= */}
//                 <section className="my-5 text-center">
//                     <h2 className="ventures-title">DIFFERENT VENTURES</h2>
//                     <Row>
//                         {/* Left Column Ventures */}
//                         <Col md={6}>
//                             <div className="venture-item">
//                                 <div className="venture-logo-container">
//                                     <div className="venture-bracket left"></div>
//                                     <div className="venture-logo-placeholder">(Jabalpur Express Logo)</div>
//                                     <div className="venture-bracket right"></div>
//                                 </div>
//                                 <div className="venture-text text-start">
//                                     <h5>JABALPUR EXPRESS:</h5>
//                                     <p>It was started in 1991. It is a daily newspaper and has 12 pages. The main editions are Jabalpur Chhindwara & Balaghat and sub editions are Seoni, Narsinghpur, Damoh Mandla, Anooppur. It has a phenomenal reach with 3 LAC circulations.</p>
//                                 </div>
//                             </div>
//                             <div className="venture-item">
//                                 <div className="venture-logo-container">
//                                     <div className="venture-bracket left"></div>
//                                     <div className="venture-logo-placeholder">(Express News Logo)</div>
//                                     <div className="venture-bracket right"></div>
//                                 </div>
//                                 <div className="venture-text text-start">
//                                     <h5>EXPRESS NEWS:</h5>
//                                     <p>It was started in 1997. It is a daily newspaper and has 12 pages. The main editions are Bhopal, Gwalior, Katni & Bilaspur. It has 1 Lac circulations.</p>
//                                 </div>
//                             </div>
//                             <div className="venture-item">
//                                 <div className="venture-logo-container">
//                                     <div className="venture-bracket left"></div>
//                                     <div className="venture-logo-placeholder">(EMS Media Service Logo)</div>
//                                     <div className="venture-bracket right"></div>
//                                 </div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMS News Agency</h5>
//                                     <p>India's largest Hindi news agency established in 1997. This is the first company to start with a satellite-based news agency in India. It daily releases more than 500 news content from regional news to national to state to international and 75 to 100 photos of the same categories. We are India's largest Hindi news agency with a clientele of 650 newspapers.</p>
//                                 </div>
//                             </div>
//                         </Col>
//                         {/* Right Column Ventures */}
//                         <Col md={6}>
//                             <div className="venture-item">
//                                 <div className="venture-logo-container">
//                                     <div className="venture-bracket left"></div>
//                                     <div className="venture-logo-placeholder">(Express News Logo)</div>
//                                     <div className="venture-bracket right"></div>
//                                 </div>
//                                 <div className="venture-text text-start">
//                                     <h5>EXPRESS NEWS:</h5>
//                                     <p>It was started in 1997. It is a daily newspaper and has 8 pages. The main editions are Bhopal, Gwalior, Katni & Bilaspur. It has 1 Lac circulations.</p>
//                                 </div>
//                             </div>
//                             <div className="venture-item">
//                                <div className="venture-logo-container">
//                                     <div className="venture-bracket left"></div>
//                                     <div className="venture-logo-placeholder">(EMS TV.IN Logo)</div>
//                                     <div className="venture-bracket right"></div>
//                                 </div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMSTV.IN</h5>
//                                     <p>was started in 2007 is the only archival-based video news channel where district-level news can be searched. It consistently delivers news from across the spectrum of current affairs regional, politics, sports, entertainment, etc. EMSTV.IN Youtube channel has more than 150 k subscribers and millions of viewers.</p>
//                                 </div>
//                             </div>
//                             <div className="venture-item">
//                                 <div className="venture-logo-container">
//                                     <div className="venture-bracket left"></div>
//                                     <div className="venture-logo-placeholder">(EMS INDIA Logo)</div>
//                                     <div className="venture-bracket right"></div>
//                                 </div>
//                                 <div className="venture-text text-start">
//                                     <h5>EMSINDIA.COM</h5>
//                                     <p>started in the year 2005. It is a leading news portal with monthly visitors of more than 2.5 lacs. Our aim to make emsindia.com India's leading multilingual news portal. Our mobile application is also available on both the Android and iOS platforms.</p>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </section>

//             </Container>
//         </>
//     );
// };

// import React from "react";

// export const AboutUs = () => {
//   const pageStyle = {
//     width: "100vw",
//     height: "150vh",
//     backgroundColor: "white",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start", // top se align
//     overflow: "hidden",
//     paddingTop: "15px", // ⬆️ top margin
//   };

//   const imageStyle = {
//     width: "100%",
//     height: "70%",
//     objectFit: "contain",
//     transform: "scale(1.5)", // 🔍 50% zoom in
//     transformOrigin: "top center", // zoom top se ho
//   };

//   return (
//     <div style={pageStyle}>
//       <img
//         src="/image.png"
//         alt="About Us"
//         style={imageStyle}
//       />
//     </div>
//   );
// };

import React from "react";

export const AboutUs = () => {
  const pageStyle = {
    width: "100vw",
    height: "150vh",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // top se align
    overflow: "hidden",
    paddingTop: "15px", // ⬆️ top margin
  };

  // Ek container banayenge jo image aur button ko wrap karega
  const containerStyle = {
    position: "relative", // Yeh zaroori hai button ko position karne ke liye
    width: "100%",
    height: "70%", // Image jitni height
  };

  const imageStyle = {
    width: "100%",
    height: "100%", // Ab ye container ki poori height lega
    objectFit: "contain",
    transform: "scale(1.5)", // 🔍 50% zoom in
    transformOrigin: "top center", // zoom top se ho
  };

  // Download button ke liye styles
  const buttonStyle = {
    position: "absolute", // Isse button ko container ke andar kahin bhi rakh sakte hain
    bottom: "-42%", // Bilkul neeche, bina margin ke
    left: "50%", // Center align ke liye
    transform: "translateX(-50%)", // Perfect center ke liye
    padding: "12px 24px",
    backgroundColor: "#007bff", // Blue color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none", // Link ka underline hatane ke liye
    fontSize: "16px",
    fontWeight: "bold",
  
  


    zIndex: 10, // Yeh ensure karega ki button image ke upar hi rahe
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <img
          src="/image.png"
          alt="About Us"
          style={imageStyle}
        />
        {/* PDF Download ka button */}
        {/* <a
          href="/EMS Brochure_03.pdf" // Maan kar chal rahe hain ki PDF public folder mein hai
          download="EMS_Brochure.pdf" // Jab user download karega to ye file ka naam hoga
          style={buttonStyle}
        >
          Download PDF
        </a> */}
      </div>
    </div>
  );
};