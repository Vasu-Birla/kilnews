// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaFacebookF, FaYoutube, FaInstagram, FaApple, FaAndroid } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';


// const Footer = () => {
//     // होवर इफ़ेक्ट के लिए यह CSS ज़रूरी है। 
//     // इसे कंपोनेंट के अंदर रखने से यह सिर्फ इसी कंपोनेंट पर लागू होगा।
//     const hoverStyles = `
//         .footer-link, .social-icon {
//             display: inline-block; /* transition के लिए ज़रूरी */
//             transition: transform 0.2s ease-in-out; /* स्मूथ ज़ूम इफ़ेक्ट */
//         }
        
//         .footer-link:hover {
//             transform: scale(1.1); /* टेक्स्ट लिंक होवर पर 10% बड़ा होगा */
//             text-decoration: underline !important; /* होवर पर हमेशा अंडरलाइन दिखेगी */
//         }

//         .social-icon:hover {
//             transform: scale(1.2); /* आइकॉन होवर पर 20% बड़ा होगा */
//         }
//     `;

//     return (
//         <>
//             {/* यह स्टाइल टैग ऊपर लिखी CSS को पेज में जोड़ देगा */}
//             <style>{hoverStyles}</style>

//             <footer className="bg-dark text-white py-5">
//                 <Container>
//                     {/* 
//                       Row और Col Bootstrap के ग्रिड सिस्टम का उपयोग करते हैं।
//                       lg: डेस्कटॉप, md: टैबलेट, xs: मोबाइल
//                       यह लेआउट पूरी तरह से रिस्पॉन्सिव है।
//                     */}
//                     <Row className="align-items-start">

//                         {/* कॉलम 1: लोगो (डेस्कटॉप पर 3 कॉलम, टैबलेट पर 12) */}
//                       <Col lg={3} md={12} className="text-center text-lg-start mb-4 mb-lg-0">
// <video
//   src="/logogif.mp4"  // Assuming logogif.mp4 is directly in the public folder
//   autoPlay 
//   loop 
//   muted 
//   style={{ width: '90px' }}
// />
//   <p className="fw-bold mt-2 mb-0" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
//     EXPRESS MEDIA SERVICE
//   </p>
// </Col>

//                         {/* कॉलम 2: सोशल और ऐप्स (डेस्कटॉप पर 4 कॉलम, टैबलेट पर 6) */}
//                         <Col lg={4} md={6} className="mb-4 mb-lg-0">
//                             <div className="d-flex align-items-center mb-3">
//                                 <span className="fw-bold me-4">Follow Us</span>
//                                 {/* सभी आइकॉन्स पर 'social-icon' क्लास लगाई गई ہے */}
//                                 <a href="#" className="social-icon me-3 text-white">
//                                     <span className="d-inline-flex align-items-center justify-content-center bg-white text-dark rounded-circle" style={{ width: '28px', height: '28px' }}>
//                                         <FaFacebookF size={18} />
//                                     </span>
//                                 </a>
//                                 <a href="#" className="social-icon me-3 text-white"><FaXTwitter size={24} /></a>
//                                 <a href="#" className="social-icon me-3 text-white"><FaYoutube size={28} /></a>
//                                 <a href="#" className="social-icon text-white"><FaInstagram size={26} /></a>
//                             </div>
//                             <div className="d-flex align-items-center">
//                                 <span className="fw-bold me-3">Download Apps</span>
//                                 <a href="#" className="social-icon me-3 text-white"><FaApple size={30} /></a>
//                                 <a href="#" className="social-icon text-white"><FaAndroid size={26} /></a>
//                             </div>
//                         </Col>

//                         {/* कॉलम 3: About लिंक्स (डेस्कटॉप पर 2 कॉलम, टैबलेट पर 6) */}
//                         <Col lg={2} md={6} className="mb-4 mb-lg-0">
//                             <h6 className="fw-bold mb-3">About EMS</h6>
//                             {/* सभी लिंक्स पर 'footer-link' क्लास लगाई गई है */}
//                             <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">About Us</a>
//                             <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">Advertise With Us</a>
//                             <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">Contact Us</a>
//                             <a href="#" className="d-block text-white text-decoration-none footer-link">Careers</a>
//                         </Col>

//                         {/* कॉलम 4: Quick लिंक्स (डेस्कटॉप पर 3 कॉलम, टैबलेट पर 12) */}
//                         <Col lg={3} md={12} className="text-md-start">
//                             <h6 className="fw-bold mb-3">Quick links</h6>
//                             <div className="d-block mb-2">
//                                 • <a href="#" className="text-white text-decoration-underline footer-link">T&C</a>
//                             </div>
//                             <div>
//                                 • <a href="#" className="text-white text-decoration-underline footer-link">Privacy Policy</a>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </footer>
//         </>
//     );
// };

// export default Footer;




// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { FaFacebookF, FaYoutube, FaInstagram, FaApple, FaAndroid } from 'react-icons/fa';
// import { FaXTwitter } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';
// const Footer = () => {
//     const hoverStyles = `
//         .footer-link, .social-icon {
//             display: inline-block;
//             transition: transform 0.2s ease-in-out;
//         }
//         .footer-link:hover {
//             transform: scale(1.1);
//             text-decoration: underline !important;
//         }
//         .social-icon:hover {
//             transform: scale(1.2);
//         }
//     `;

//     return (
//         <>
//             <style>{hoverStyles}</style>

//             <footer className="bg-dark text-white py-5">
//                 <Container>
//                     <Row className="align-items-start text-center text-md-start">

//                         {/* Logo */}
//                         <Col lg={3} md={12} className="mb-4 mb-lg-0">
//                             <video
//                                 src="/logogif.mp4"
//                                 autoPlay
//                                 loop
//                                 muted
//                                 style={{ width: '90px' }}
//                             />
//                             <p className="fw-bold mt-2 mb-0" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
//                                 EXPRESS MEDIA SERVICE
//                             </p>
//                         </Col>

//                         {/* Social & Apps */}
//                         <Col lg={4} md={6} className="mb-4 mb-lg-0">
//                             <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start mb-3">
//                                 <span className="fw-bold me-md-4 mb-2 mb-md-0">Follow Us</span>
//                                 <div className="d-flex justify-content-center">
//                                     <a href="#" className="social-icon me-3 text-white">
//                                         <span className="d-inline-flex align-items-center justify-content-center bg-white text-dark rounded-circle" style={{ width: '28px', height: '28px' }}>
//                                             <FaFacebookF size={18} />
//                                         </span>
//                                     </a>
//                                     <a href="#" className="social-icon me-3 text-white"><FaXTwitter size={24} /></a>
//                                     <a href="#" className="social-icon me-3 text-white"><FaYoutube size={28} /></a>
//                                     <a href="#" className="social-icon text-white"><FaInstagram size={26} /></a>
//                                 </div>
//                             </div>
//                             <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
//                                 <span className="fw-bold me-md-3 mb-2 mb-md-0">Download Apps</span>
//                                 <div className="d-flex justify-content-center">
//                                     <a href="#" className="social-icon me-3 text-white"><FaApple size={30} /></a>
//                                     <a href="#" className="social-icon text-white"><FaAndroid size={26} /></a>
//                                 </div>
//                             </div>
//                         </Col>

//                         {/* About EMS */}
//                         <Col lg={2} md={6} className="mb-4 mb-lg-0">
//                             <h6 className="fw-bold mb-3">About EMS</h6>
//                             <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">About Us</a>
//                             <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">Advertise With Us</a>
//                             {/* <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">Contact Us</a> */}
//                                  <Link 
//                                 to="/contact-us" 
//                                 className="d-block mb-1 text-dark text-decoration-none"
//                                 onClick={onClose} // optional: sidebar close karne ke liye
//                               >
//                                 Contact Us
//                               </Link>
//                             <a href="#" className="d-block text-white text-decoration-none footer-link">Careers</a>
//                         </Col>

//                         {/* Quick links */}
//                         <Col lg={3} md={12}>
//                             <h6 className="fw-bold mb-3">Quick links</h6>
//                             <div className="d-block mb-2">• <a href="#" className="text-white text-decoration-underline footer-link">T&C</a></div>
//                             <div>• <a href="#" className="text-white text-decoration-underline footer-link">Privacy Policy</a></div>
//                         </Col>

//                     </Row>
//                 </Container>
//             </footer>
//         </>
//     );
// };

// export default Footer;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaYoutube, FaInstagram, FaApple, FaAndroid } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logo1 from "../../assets/logo1.png"; 

// 1. Footer component को बताएं कि उसे 'onClose' prop मिल सकता है
const Footer = ({ onClose }) => {
    const hoverStyles = `
        .footer-link, .social-icon {
            display: inline-block;
            transition: transform 0.2s ease-in-out;
        }
        .footer-link:hover {
            transform: scale(1.1);
            text-decoration: underline !important;
        }
        .social-icon:hover {
            transform: scale(1.2);
        }
    `;

    return (
        <>
            <style>{hoverStyles}</style>

            <footer className="bg-dark text-white py-5">
                <Container>
                    <Row className="align-items-start text-center text-md-start">

                        {/* Logo */}
                        <Col lg={3} md={12} className="mb-4 mb-lg-0">
                            <video
                                src="/logogif.mp4"
                                autoPlay
                                loop
                                muted
                                style={{ width: '90px', borderRadius: '10px' }}
                            />
                            <p className="fw-bold mt-1 mb-0" style={{ fontSize: '0.9rem', letterSpacing: '1px' , color: '#c62828' }}>
                                EXPRESS MEDIA SERVICE
                            </p>
                            <p>Express Media Service is a business unit of Express Group.</p>
                               {/* Address */}
    <p >
        Hall No. 7, Chittod Complex, 3rd Floor
        M.P. Nagar, Zone-1, Bhopal, Madhya Pradesh - 462011
    </p>

    {/* Phone */}
    <p >
        📞 9425008613
    </p>

    {/* Email */}
    <p>
        ✉️ info@emsindia.com
    </p>
                {/* <img
        src={logo1}
        alt="EMS Logo"
        style={{ width: "90px", height: "auto" }}
    />
    <p
        className="fw-bold mt-2 mb-0"
        style={{ fontSize: "0.9rem", letterSpacing: "1px" }}
    >
        EXPRESS MEDIA SERVICE
    </p> */}


                        </Col>

                        {/* Social & Apps */}
                        <Col lg={4} md={6} className="mb-4 mb-lg-0">
                            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start mb-3">
                                <span className="fw-bold me-md-4 mb-2 mb-md-0">Follow Us</span>
                                <div className="d-flex justify-content-center">
                                    <a href="#" className="social-icon me-3 text-white">
                                        <span className="d-inline-flex align-items-center justify-content-center bg-white text-dark rounded-circle" style={{ width: '28px', height: '28px' }}>
                                            <FaFacebookF size={18} />
                                        </span>
                                    </a>
<a 
  href="https://x.com/EmstvI" 
  className="social-icon me-3 text-white"
>
  <FaXTwitter size={24} />
</a>

<a 
  href="https://www.youtube.com/@emstvindia" 
  className="social-icon me-3 text-white"
>
  <FaYoutube size={28} />
</a>

<a 
  href="https://www.instagram.com/emstvmp" 
  className="social-icon text-white"
>
  <FaInstagram size={26} />
</a>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
                                <span className="fw-bold me-md-3 mb-2 mb-md-0">Download Apps</span>
                                <div className="d-flex justify-content-center">
                                    <a href="#" className="social-icon me-3 text-white"><FaApple size={30} /></a>
                                    <a href="#" className="social-icon text-white"><FaAndroid size={26} /></a>
                                </div>
                            </div>
                        </Col>

                        {/* About EMS */}
                        <Col lg={2} md={6} className="mb-4 mb-lg-0">
                            <h6 className="fw-bold mb-3">About EMS</h6>




                            {/* <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">About Us</a> */}
                               <Link 
                                to="/about-us" 
                                // 3. लिंक को बाकी लिंक्स जैसा स्टाइल दिया
                                className="d-block mb-2 text-white text-decoration-none footer-link"
                                // 2. यह सुनिश्चित करें कि onClose केवल तभी कॉल हो जब वह मौजूद हो
                                onClick={() => {
                                    if (onClose) {
                                        onClose(); 
                                    }
                                }}
                            >
                                About Us
                            </Link>



                            <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">Advertise With Us</a>
                            {/* <Link 
                                to="/advertise" 
                                // 3. लिंक को बाकी लिंक्स जैसा स्टाइल दिया
                                className="d-block mb-2 text-white text-decoration-none footer-link"
                                // 2. यह सुनिश्चित करें कि onClose केवल तभी कॉल हो जब वह मौजूद हो
                                onClick={() => {
                                    if (onClose) {
                                        onClose(); 
                                    }
                                }}
                            >
                           Advertise With Us
                            </Link> */}
                            {/* --- यहाँ बदलाव किया गया है --- */}
                            <Link 
                                to="/contact-us" 
                                // 3. लिंक को बाकी लिंक्स जैसा स्टाइल दिया
                                className="d-block mb-2 text-white text-decoration-none footer-link"
                                // 2. यह सुनिश्चित करें कि onClose केवल तभी कॉल हो जब वह मौजूद हो
                                onClick={() => {
                                    if (onClose) {
                                        onClose(); 
                                    }
                                }}
                            >
                                Contact Us
                            </Link>
                             {/* <a href="#" className="d-block mb-2 text-white text-decoration-none footer-link">Contact Us</a> */}
                            <a href="#" className="d-block text-white text-decoration-none footer-link">Careers</a>
                        </Col>

                        {/* Quick links */}
                        <Col lg={3} md={12}>
                            <h6 className="fw-bold mb-3">Quick links</h6>
                            <div className="d-block mb-2">• <a href="/terms-and-conditions" className="text-white text-decoration-underline footer-link">T&C</a></div>
                            <div>• <a href="/privacy-policy" className="text-white text-decoration-underline footer-link">Privacy Policy</a></div>
                        </Col>

                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;