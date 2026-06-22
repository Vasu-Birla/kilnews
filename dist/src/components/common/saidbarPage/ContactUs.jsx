// // import React from "react";
// // import { Container, Row, Col } from "react-bootstrap";
// // import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaMobileAlt, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

// // const ContactUs = () => {
// //   return (
// //     <Container className="my-5">
// //       <Row>
// //         {/* Contact Details */}
// //         <Col md={6}>
// //           <h5 className="mb-4 fw-bold" style={{ color: "#e74c3c" }}>Contact us</h5>
// //           <div className="mb-3 d-flex">
// //             <FaMapMarkerAlt className="me-2 mt-1" style={{ color: "#2c3e50" }} />
// //             <div>
// //               <strong>Address :</strong><br />
// //               Hall No.7, Commercial Chittod Complex, Zone-I,<br />
// //               Maharana Pratap Nagar, Bhopal, (M.P.) 462 011
// //             </div>
// //           </div>

// //           <div className="mb-3 d-flex">
// //             <FaPhone className="me-2 mt-1" style={{ color: "#2c3e50" }} />
// //             <div>
// //               <strong>Phone :</strong><br />
// //               0755- 257 2334
// //             </div>
// //           </div>

// //           <div className="mb-3 d-flex">
// //             <FaMobileAlt className="me-2 mt-1" style={{ color: "#2c3e50" }} />
// //             <div>
// //               <strong>Mobile :</strong><br />
// //               922 922 6534 / 33 / 32<br />
// //               942 500 8620
// //             </div>
// //           </div>

// //           <div className="mb-3 d-flex">
// //             <FaEnvelope className="me-2 mt-1" style={{ color: "#2c3e50" }} />
// //             <div>
// //               <strong>E-mail :</strong><br />
// //               <a href="mailto:emsems6@gmail.com" className="text-decoration-none">emsems6@gmail.com</a>
// //             </div>
// //           </div>
// //         </Col>

// //         {/* Follow Us */}
// //         <Col md={6}>
// //           <h5 className="mb-4 fw-bold" style={{ color: "#e74c3c" }}>Follow us</h5>
// //           <div className="d-flex gap-3">
// //             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
// //               <FaTwitter />
// //             </a>
// //             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
// //               <FaFacebookF />
// //             </a>
// //             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
// //               <FaYoutube />
// //             </a>
// //           </div>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default ContactUs;


// import React, { useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import {
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope,
//   FaMobileAlt,
//   FaTwitter,
//   FaFacebookF,
//   FaYoutube
// } from "react-icons/fa";

// const ContactUs = () => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     // Page open hote hi top par scroll
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setShow(true);
//   }, []);

//   return (
//     <>
//       {/* 🔹 Inline CSS (same component) */}
//       <style>
//         {`
//           /* Container animation (TOP → DOWN) */
//           .contact-animate {
//             opacity: 0;
//             transform: translateY(-50px);
//             transition: all 0.9s ease-out;
//           }
//           .contact-animate.show {
//             opacity: 1;
//             transform: translateY(0);
//           }

//           /* Contact items animation */
//           .contact-item {
//             opacity: 0;
//             transform: translateY(-20px);
//             animation: dropIn 0.6s ease forwards;
//           }
//           .contact-item:nth-child(1) { animation-delay: 0.15s; }
//           .contact-item:nth-child(2) { animation-delay: 0.3s; }
//           .contact-item:nth-child(3) { animation-delay: 0.45s; }
//           .contact-item:nth-child(4) { animation-delay: 0.6s; }

//           @keyframes dropIn {
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           /* Address text clarity */
//           .address-text {
//             color: #2c3e50;
//             font-size: 0.95rem;
//             line-height: 1.6;
//             font-weight: 500;
//           }

//           /* Social icons hover */
//           .social-btn {
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//           }
//           .social-btn:hover {
//             transform: translateY(-4px) scale(1.1);
//             box-shadow: 0 6px 15px rgba(0,0,0,0.2);
//           }
//         `}
//       </style>

//       <Container className={`my-5 contact-animate ${show ? "show" : ""}`}>
//         <Row>
//           {/* Contact Details */}
//           <Col md={6}>
//             <h5 className="mb-4 fw-bold" style={{ color: "#e74c3c" }}>
//               Contact us
//             </h5>

//             <div className="mb-3 d-flex contact-item">
//               <FaMapMarkerAlt className="me-2 mt-1" />
//               <div>
//                 <strong>Address :</strong><br />
//                 <span className="address-text">
//                   Hall No.7, Commercial Chittod Complex, Zone-I,<br />
//                   Maharana Pratap Nagar, Bhopal, (M.P.) 462 011
//                 </span>
//               </div>
//             </div>

//             <div className="mb-3 d-flex contact-item">
//               <FaPhone className="me-2 mt-1" />
//               <div>
//                 <strong>Phone :</strong><br />
//                 <span className="address-text">
//                   0755- 257 2334
//                 </span>
//               </div>
//             </div>

//             <div className="mb-3 d-flex contact-item">
//               <FaMobileAlt className="me-2 mt-1" />
//               <div>
//                 <strong>Mobile :</strong><br />
//                 <span className="address-text">
//                   922 922 6534 / 33 / 32<br />
//                   942 500 8620
//                 </span>
//               </div>
//             </div>

//             <div className="mb-3 d-flex contact-item">
//               <FaEnvelope className="me-2 mt-1" />
//               <div>
//                 <strong>E-mail :</strong><br />
//                 <a
//                   href="mailto:emsems6@gmail.com"
//                   className="text-decoration-none address-text"
//                 >
//                   emsems6@gmail.com
//                 </a>
//               </div>
//             </div>
//           </Col>

//           {/* Follow Us */}
//           <Col md={6}>
//             <h5 className="mb-4 fw-bold" style={{ color: "#e74c3c" }}>
//               Follow us
//             </h5>
//             <div className="d-flex gap-3">
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn btn-outline-dark social-btn"
//               >
//                 <FaTwitter />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn btn-outline-dark social-btn"
//               >
//                 <FaFacebookF />
//               </a>
//               <a
//                 href="https://youtube.com"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="btn btn-outline-dark social-btn"
//               >
//                 <FaYoutube />
//               </a>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default ContactUs;


import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaMobileAlt,
  FaTwitter,
  FaFacebookF,
  FaYoutube
} from "react-icons/fa";

const ContactUs = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShow(true);
  }, []);

  return (
    <>
      <style>
        {`
          /* ===== EXISTING ANIMATION (UNCHANGED) ===== */
          .contact-animate {
            opacity: 0;
            transform: translateY(-50px);
            transition: all 0.9s ease-out;
          }
          .contact-animate.show {
            opacity: 1;
            transform: translateY(0);
          }

          .contact-item {
            opacity: 0;
            transform: translateY(-20px);
            animation: dropIn 0.6s ease forwards;
          }
          .contact-item:nth-child(1){animation-delay:.15s}
          .contact-item:nth-child(2){animation-delay:.3s}
          .contact-item:nth-child(3){animation-delay:.45s}
          .contact-item:nth-child(4){animation-delay:.6s}

          @keyframes dropIn {
            to { opacity: 1; transform: translateY(0); }
          }

          /* ===== NEW HEADING LINE ANIMATION ===== */
          .headline {
            font-size: 0.9rem;
            color: #555;
            overflow: hidden;
            white-space: nowrap;
            width: 0;
            animation: revealText 1.8s ease forwards;
          }

          .headline.delay {
            animation-delay: 0.4s;
          }

          @keyframes revealText {
            from { width: 0; }
            to { width: 100%; }
          }

          .address-text {
            color: #2c3e50;
            font-size: 0.95rem;
            line-height: 1.6;
            font-weight: 500;
          }

          .social-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .social-btn:hover {
            transform: translateY(-4px) scale(1.1);
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          }
        `}
      </style>

      <Container className={`my-5 contact-animate ${show ? "show" : ""}`}>
        <Row>
          {/* CONTACT */}
          <Col md={6}>
            <h5 className="fw-bold mb-1" style={{ color: "#e74c3c" }}>
              Contact us
            </h5>

            {/* 🔹 Animated headline */}
            <div className="headline">
              We are always here to help you
            </div>

            <div className="mt-4 d-flex contact-item">
              <FaMapMarkerAlt className="me-2 mt-1" />
              <div>
                <strong>Address :</strong><br />
                <span className="address-text">
                  Hall No.7, Commercial Chittod Complex, Zone-I,<br />
                  Maharana Pratap Nagar, Bhopal, (M.P.) 462 011
                </span>
              </div>
            </div>

            <div className="mb-3 d-flex contact-item">
              <FaPhone className="me-2 mt-1" />
              <div>
                <strong>Phone :</strong><br />
                <span className="address-text">0755- 257 2334</span>
              </div>
            </div>

            <div className="mb-3 d-flex contact-item">
              <FaMobileAlt className="me-2 mt-1" />
              <div>
                <strong>Mobile :</strong><br />
                <span className="address-text">
                  922 922 6534 / 33 / 32<br />
                  942 500 8620
                </span>
              </div>
            </div>

            <div className="mb-3 d-flex contact-item">
              <FaEnvelope className="me-2 mt-1" />
              <div>
                <strong>E-mail :</strong><br />
                <a
                  href="mailto:emsems6@gmail.com"
                  className="text-decoration-none address-text"
                >
                  emsems6@gmail.com
                </a>
              </div>
            </div>
          </Col>

          {/* FOLLOW US */}
          <Col md={6}>
            <h5 className="fw-bold mb-1" style={{ color: "#e74c3c" }}>
              Follow us
            </h5>

            {/* 🔹 Animated headline */}
            <div className="headline delay">
              Stay connected with us
            </div>

            <div className="mt-4 d-flex gap-3">
              <a href="#" className="btn btn-outline-dark social-btn"><FaTwitter /></a>
              <a href="#" className="btn btn-outline-dark social-btn"><FaFacebookF /></a>
              <a href="#" className="btn btn-outline-dark social-btn"><FaYoutube /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUs;
