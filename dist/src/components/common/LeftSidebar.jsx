
//   import React, { useRef, useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png';
// import playStoreImage from '../../assets/playstore.png';
// import appStoreImage from '../../assets/appstore.png';
// import { FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, FiBriefcase, FiUser, FiFolder } from "react-icons/fi";
// import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { Link } from "react-router-dom";


// // 🌍 LANGUAGE SYSTEM (NO DESIGN CHANGE)
// const labels = {
//   home: { en: "Home", hi: "होम" },
//   india: { en: "India", hi: "इंडिया" },
//   state: { en: "State", hi: "राज्य" },
//   entertainment: { en: "Entertainment", hi: "मनोरंजन" },
//   astrology: { en: "Astrology", hi: "ज्योतिष" },
//   sports: { en: "Sports", hi: "खेल" },
//   thoughts: { en: "Thoughts", hi: "विचार" },
//   business: { en: "Business", hi: "व्यापार" },
//   youth: { en: "Youth", hi: "युवा" },
//   directory: { en: "Directory", hi: "डायरेक्टरी" },

//   about: { en: "About Us", hi: "हमारे बारे में" },
//   advertise: { en: "Advertise With Us", hi: "हमारे साथ विज्ञापन करें" },
//   contact: { en: "Contact Us", hi: "संपर्क करें" },
//   careers: { en: "Careers", hi: "करियर" },

//   quickLinks: { en: "Quick Links", hi: "त्वरित लिंक" },
//   terms: { en: "T&C", hi: "नियम एवं शर्तें" },
//   privacy: { en: "Privacy Policy", hi: "गोपनीयता नीति" },

//   downloadText: { en: "Download App from", hi: "ऐप डाउनलोड करें" },
// };


// // 🌍 ENGLISH / HINDI language detect
// const getLang = () => localStorage.getItem("userLanguage") || "en";



// const NavItem = ({ to, Icon, text, onClick }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       "nav-link d-flex align-items-center fw-bold px-2 py-1 " +
//       (isActive ? "text-danger" : "text-dark")
//     }
//     onClick={onClick}
//   >
//     <span
//       style={{
//         width: "30px",
//         display: "inline-flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: "12px",
//       }}
//     >
//       {Icon && <Icon size={18} />}
//     </span>
//     {text}
//   </NavLink>
// );




// const LeftSidebar = ({ isOpen, onClose, states = [] }) => {

//   const lang = getLang(); // 🌍 language get

//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const stateRef = useRef(null);

//   const handleStateClick = (event) => {
//     if (window.innerWidth <= 768) {
//       event.preventDefault();
//       setIsStateDropdownOpen(!isStateDropdownOpen);
//     }
//   };

//   const handleStateMouseEnter = () => {
//     if (window.innerWidth > 768) setIsStateDropdownOpen(true);
//   };

//   const handleStateMouseLeave = () => {
//     if (window.innerWidth > 768) setIsStateDropdownOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         (!stateRef.current || !stateRef.current.contains(event.target))
//       ) {
//         onClose();
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose, isStateDropdownOpen]);



//   const DropdownContent = ({ isMobile = false }) => (
//     <div
//       className={isMobile ? "mobile-state-dropdown" : "desktop-state-dropdown"}
//       style={{
//         backgroundColor: "#c82333",
//         color: "#fff",
//         padding: "12px",
//         borderRadius: "8px",
//         zIndex: 999999,
//         display: "grid",
//         gridTemplateColumns: "repeat(1, 1fr)",
//         gap: "6px 12px",
//         ...(isMobile
//           ? { position: "static", width: "100%", marginTop: "8px" }
//           : { position: "fixed", minWidth: "540px", gridTemplateColumns: "repeat(3, 1fr)" })
//       }}
//       onMouseEnter={handleStateMouseEnter}
//       onMouseLeave={handleStateMouseLeave}
//     >
//       {states.map((state) => (
//         <NavLink
//           key={state._id}
//           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
//           className="d-block text-white"
//           style={{
//             padding: "4px 6px",
//             fontSize: "14px",
//             borderRadius: "4px",
//           }}
//           onClick={() => {
//             onClose();
//             setIsStateDropdownOpen(false);
//           }}
//         >
//           {state.name}
//         </NavLink>
//       ))}
//     </div>
//   );



//   const DropdownMenu = () => {
//     const isMobileView = window.innerWidth <= 768;

//     if (isMobileView) {
//       return (
//         <div style={{ paddingLeft: "20px" }}>
//           <DropdownContent isMobile={true} />
//         </div>
//       );
//     }

//     const portalRoot = document.getElementById("portal-root");
//     if (!portalRoot) return null;

//     const dropdownTop = stateRef.current ? stateRef.current.offsetTop + stateRef.current.offsetHeight : 0;
//     const dropdownLeft = sidebarRef.current ? sidebarRef.current.offsetLeft + sidebarRef.current.offsetWidth : 0;

//     return ReactDOM.createPortal(
//       <div
//         style={{
//           position: "fixed",
//           top: dropdownTop,
//           left: dropdownLeft,
//           zIndex: 999999,
//         }}
//       >
//         <DropdownContent />
//       </div>,
//       portalRoot
//     );
//   };




//   return (
//     <div
//       ref={sidebarRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "100vh",
//         width: "250px",
//         backgroundColor: "#fff",
//         boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
//         transform: isOpen ? "translateX(0)" : "translateX(-100%)",
//         transition: "transform 0.3s ease-in-out",
//         zIndex: 10000,
//         display: "flex",
//         flexDirection: "column",
//         padding: "10px",
//         overflowY: "auto",
//       }}
//       className="custom-sidebar"
//     >

//       {/* LOGO */}
//       <div className="mb-3 d-flex justify-content-center align-items-center">
//         <img
//           src={logo}
//           alt="EMS Logo"
//           style={{ width: "100%", maxHeight: "80px", objectFit: "contain" }}
//         />
//       </div>



//       {/* ----- NAVIGATION ----- */}
//       <div className="flex-grow-1 d-flex flex-column" style={{ gap: "8px" }}>

//         <NavItem to="/" Icon={FiHome} text={labels.home[lang]} onClick={onClose} />
//         <NavItem to="/india" Icon={FiFlag} text={labels.india[lang]} onClick={onClose} />


//         {/* STATE DROPDOWN */}
//         <div
//           ref={stateRef}
//           onMouseEnter={handleStateMouseEnter}
//           onMouseLeave={handleStateMouseLeave}
//           onClick={handleStateClick}
//         >
//           <div
//             className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1"
//             style={{ cursor: "pointer" }}
//           >
//             <FaLandmark size={15} style={{ marginRight: "25px", marginLeft: "8px" }} />
//             {labels.state[lang]} ▾
//           </div>

//           {isStateDropdownOpen && <DropdownMenu />}
//         </div>


//         <NavItem to="/entertainment" Icon={FiFilm} text={labels.entertainment[lang]} onClick={onClose} />
//         <NavItem to="/astrology" Icon={FiStar} text={labels.astrology[lang]} onClick={onClose} />
//         <NavItem to="/sports" Icon={FiAward} text={labels.sports[lang]} onClick={onClose} />
//         <NavItem to="/thoughts" Icon={FiZap} text={labels.thoughts[lang]} onClick={onClose} />
//         <NavItem to="/business" Icon={FiBriefcase} text={labels.business[lang]} onClick={onClose} />
//         <NavItem to="/youth" Icon={FiUser} text={labels.youth[lang]} onClick={onClose} />
//         <NavItem to="/directory" Icon={FiFolder} text={labels.directory[lang]} onClick={onClose} />



//         {/* FOOTER SECTION */}
//         <div className="mt-3">
//           <h6 className="fw-bold mb-2">About EMS</h6>

//           <a className="d-block mb-1 text-dark text-decoration-none">{labels.about[lang]}</a>
//           <a className="d-block mb-1 text-dark text-decoration-none">{labels.advertise[lang]}</a>
//           <a className="d-block mb-1 text-dark text-decoration-none">{labels.contact[lang]}</a>
//           <a className="d-block mb-1 text-dark text-decoration-none">{labels.careers[lang]}</a>

//           <h6 className="fw-bold mt-3 mb-2">{labels.quickLinks[lang]}</h6>

//           <a className="d-block mb-1 text-dark text-decoration-none">• {labels.terms[lang]}</a>
//           <a className="d-block text-dark text-decoration-none">• {labels.privacy[lang]}</a>
//         </div>
//       </div>




//       {/* SOCIAL + DOWNLOAD */}
//       <div className="pt-2 mt-auto">
//         <div className="d-flex justify-content-around mb-2">
//           <a><FaFacebookF size={16} /></a>
//           <a><FaXTwitter size={16} /></a>
//           <a><FaYoutube size={16} /></a>
//           <a><FaInstagram size={16} /></a>
//         </div>

//         <p className="small text-muted mb-1">{labels.downloadText[lang]}</p>

//         <img src={playStoreImage} style={{ width: "135px", display: "block" }} />
//         <img src={appStoreImage} style={{ width: "135px", display: "block", marginTop: "5px" }} />
//       </div>

//     </div>
//   );
// };

// export default LeftSidebar;



// import React, { useRef, useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png';
// import playStoreImage from '../../assets/playstore.png';
// import appStoreImage from '../../assets/appstore.png';
// import { FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, FiBriefcase, FiUser, FiFolder } from "react-icons/fi";
// import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const NavItem = ({ to, Icon, text, onClick }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       "nav-link d-flex align-items-center fw-bold px-2 py-1 " +
//       (isActive ? "text-danger" : "text-dark")
//     }
//     onClick={onClick}
//   >
//     <span
//       style={{
//         width: "30px",
//         display: "inline-flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginRight: "12px",
//       }}
//     >
//       {Icon && <Icon size={18} />}
//     </span>
//     {text}
//   </NavLink>
// );

// const LeftSidebar = ({ isOpen, onClose, states = [] }) => {
//   const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const stateRef = useRef(null); // 'State' NavItem के लिए संदर्भ

//   // मोबाइल पर क्लिक के लिए ड्रॉपडाउन टॉगल करें, डेस्कटॉप पर होवर के लिए
//   const handleStateClick = (event) => {
//     // मोबाइल पर क्लिक व्यवहार (या छोटे स्क्रीन)
//     if (window.innerWidth <= 768) { // 768px एक सामान्य मोबाइल ब्रेकपॉइंट है
//       event.preventDefault(); // NavLink के डिफ़ॉल्ट व्यवहार को रोकें
//       setIsStateDropdownOpen(!isStateDropdownOpen);
//     }
//   };

//   const handleStateMouseEnter = () => {
//     if (window.innerWidth > 768) { 
//       setIsStateDropdownOpen(true);
//     }
//   };

//   const handleStateMouseLeave = () => {
//     if (window.innerWidth > 768) { 
//       setIsStateDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         (!stateRef.current || !stateRef.current.contains(event.target)) // यदि ड्रॉपडाउन खुला है, तो उसे बंद न करें
//       ) {
//         onClose();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose, isStateDropdownOpen]); // isStateDropdownOpen को निर्भरता के रूप में जोड़ें

//   const DropdownContent = ({ isMobile = false }) => (
//     <div
//       className={isMobile ? "mobile-state-dropdown" : "desktop-state-dropdown"}
//       style={{
//         backgroundColor: "#c82333",
//         color: "#fff",
//         padding: "12px",
//         borderRadius: "8px",
//         zIndex: 999999, // ✅ z-index को और बढ़ाया गया है
//         display: "grid",
//         gridTemplateColumns: "repeat(1, 1fr)", // मोबाइल पर स्टैक्ड लेआउट
//         gap: "6px 12px",
//         ...(isMobile ? { // मोबाइल के लिए विशिष्ट स्टाइलिंग
//           position: 'static',
//           width: '100%',
//           marginTop: '8px',
//           gridTemplateColumns: 'repeat(1, 1fr)',
//         } : { // डेस्कटॉप के लिए विशिष्ट स्टाइलिंग (यदि पोर्टल का उपयोग कर रहे हैं)
//           position: "fixed",
//           minWidth: "540px",
//           gridTemplateColumns: "repeat(3, 1fr)",
//         })
//       }}
//       onMouseEnter={handleStateMouseEnter} // होवर आउटसाइड के लिए फिर से जोड़ें
//       onMouseLeave={handleStateMouseLeave} // होवर आउटसाइड के लिए फिर से जोड़ें
//     >
//       {states.map((state) => (
//         <NavLink
//           key={state._id}
//           to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`}
//           className="d-block text-white"
//           style={{
//             padding: "4px 6px",
//             fontSize: "14px",
//             lineHeight: "1.3",
//             borderRadius: "4px",
//           }}
//           onClick={() => {
//             onClose(); // साइडबार बंद करें
//             setIsStateDropdownOpen(false); // ड्रॉपडाउन बंद करें
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "transparent")
//           }
//         >
//           {state.name}
//         </NavLink>
//       ))}
//     </div>
//   );

//   const DropdownMenu = () => {
//     const isMobileView = window.innerWidth <= 768;

//     if (isMobileView) {
//       return ( // मोबाइल पर साइडबार के अंदर सामग्री को इनलाइन रेंडर करें
//         <div style={{ paddingLeft: '20px' }}> {/* इंडेंटेशन के लिए कुछ पैडिंग */}
//           <DropdownContent isMobile={true} />
//         </div>
//       );
//     } else {
//       const portalRoot = document.getElementById("portal-root");
//       if (!portalRoot) return null;

//       const dropdownTop = stateRef.current ? stateRef.current.offsetTop + stateRef.current.offsetHeight : 0;
//       const dropdownLeft = sidebarRef.current ? sidebarRef.current.offsetLeft + sidebarRef.current.offsetWidth : 0;

//       // ✅ यहाँ बाहरी पोर्टल div में z-index जोड़ा गया है
//       return ReactDOM.createPortal(
//         <div
//           style={{
//             position: "fixed",
//             top: dropdownTop,
//             left: dropdownLeft,
//             zIndex: 999999, // ✅ सुनिश्चित करें कि यह सभी चीज़ों के ऊपर है
//           }}
//         >
//           <DropdownContent />
//         </div>,
//         portalRoot
//       );
//     }
//   };


//   return (
//     <div
//       ref={sidebarRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         height: "100vh",
//         width: "250px",
//         backgroundColor: "#fff",
//         boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
//         transform: isOpen ? "translateX(0)" : "translateX(-100%)",
//         transition: "transform 0.3s ease-in-out",
//         zIndex: 10000,
//         display: "flex",
//         flexDirection: "column",
//         padding: "10px",
//         overflowY: "auto",
//         scrollbarWidth: "none", // Firefox
//         msOverflowStyle: "none", // IE/Edge
//       }}
//       className="custom-sidebar"
//     >
//       {/* Logo */}
//       <div className="mb-3 d-flex justify-content-center align-items-center">
//         <img
//           src={logo}
//           alt="EMS Logo"
//           style={{
//             width: "100%",
//             height: "auto",
//             maxHeight: "80px",
//             objectFit: "contain",
//           }}
//         />
//       </div>

//       {/* Nav Items */}
//       <div className="flex-grow-1 d-flex flex-column" style={{ gap: "8px" }}>
//         <NavItem to="/" Icon={FiHome} text="Home" onClick={onClose} />
//         <NavItem to="/india" Icon={FiFlag} text="India" onClick={onClose} />

//         {/* State Dropdown */}
//         <div
//           ref={stateRef}
//           onMouseEnter={handleStateMouseEnter}
//           onMouseLeave={handleStateMouseLeave}
//           onClick={handleStateClick} // मोबाइल पर क्लिक को हैंडल करने के लिए
//           className="state-dropdown-wrapper" // स्टाइलिंग हुक के लिए
//         >
//           <div
//             className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1"
//             style={{ cursor: "pointer" }}
//           >
//             <FaLandmark size={15} style={{ marginRight: "25px", marginLeft: "8px" }} />
//             State ▾
//           </div>
//           {isStateDropdownOpen && <DropdownMenu />}
//         </div>

//         <NavItem to="/entertainment" Icon={FiFilm} text="Entertainment" onClick={onClose} />
//         <NavItem to="/astrology" Icon={FiStar} text="Astrology" onClick={onClose} />
//         <NavItem to="/sports" Icon={FiAward} text="Sports" onClick={onClose} />
//         <NavItem to="/thoughts" Icon={FiZap} text="Thoughts" onClick={onClose} />
//         <NavItem to="/business" Icon={FiBriefcase} text="Business" onClick={onClose} />
//         <NavItem to="/youth" Icon={FiUser} text="Youth" onClick={onClose} />
//         <NavItem to="/directory" Icon={FiFolder} text="Directory" onClick={onClose} />

//         {/* Footer Options */}
//         <div className="mt-3">
//           <h6 className="fw-bold mb-2">About EMS</h6>



//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>About Us</a>
//                  {/* <Link 
//     to="/about-us" 
//     className="d-block mb-1 text-dark text-decoration-none"
//     onClick={onClose} // optional: sidebar close karne ke liye
//   >
//     About Us
//   </Link> */}




//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Advertise With Us</a>
//                           {/* <Link 
//     to="/advertise" 
//     className="d-block mb-1 text-dark text-decoration-none"
//     onClick={onClose} // optional: sidebar close karne ke liye
//   >
// Advertise With Us
//   </Link> */}







//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Contact Us</a>
//            {/* <Link 
//     to="/contact-us" 
//     className="d-block mb-1 text-dark text-decoration-none"
//     onClick={onClose} // optional: sidebar close karne ke liye
//   >
//     Contact Us
//   </Link> */}


  
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Careers</a>

//           <h6 className="fw-bold mt-3 mb-2">Quick Links</h6>
//           <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>• T&C</a>
//           <a href="#" className="d-block text-dark text-decoration-none" onClick={onClose}>• Privacy Policy</a>
//         </div>
//       </div>

//       {/* Social + App Download */}
//       <div className="pt-2 mt-auto">
//         <div className="d-flex justify-content-around mb-2">
//           <a href="#"><FaFacebookF size={16} /></a>
//           <a href="#"><FaXTwitter size={16} /></a>
//           <a href="#"><FaYoutube size={16} /></a>
//           <a href="#"><FaInstagram size={16} /></a>
//         </div>
//         <p className="small text-muted mb-1">Download App from</p>
//         <a href="YOUR_PLAY_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block" style={{ marginBottom: "-95px" }}>
//           <img src={playStoreImage} alt="Get it on Google Play" style={{ width: "135px", height: "auto", display: "block" }} />
//         </a>
//         <a href="YOUR_APP_STORE_LINK" target="_blank" rel="noopener noreferrer" className="d-block">
//           <img src={appStoreImage} alt="Download on the App Store" style={{ width: "135px", height: "auto", display: "block" }} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;

import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";

// Assets (Replace paths if needed)
import logo from '../../assets/logo.png';
import playStoreImage from '../../assets/playstore.png';
import appStoreImage from '../../assets/appstore.png';

// Icons
import { 
  FiHome, FiFlag, FiFilm, FiStar, FiAward, FiZap, 
  FiBriefcase, FiUser, FiFolder, FiGrid 
} from "react-icons/fi";
import { FaLandmark, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// API Import (Ensure this path is correct)
import { getCategories } from "../../Services/authApi";

// --- Helper: NavItem Component ---
const NavItem = ({ to, Icon, text, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "nav-link d-flex align-items-center fw-bold px-2 py-1 " +
      (isActive ? "text-danger" : "text-dark")
    }
    onClick={onClick}
  >
    <span
      style={{
        width: "30px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "12px",
      }}
    >
      {Icon && <Icon size={18} />}
    </span>
    {text}
  </NavLink>
);

const LeftSidebar = ({ isOpen, onClose, states = [] }) => {
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  // Refs
  const sidebarRef = useRef(null);
  const stateRef = useRef(null); 
  const otherRef = useRef(null); 

  // --- 1. Fetch Categories ---
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await getCategories();
        if (res?.success) {
          const staticNames = [
            "home", "india", "state", "entertainment", "astrology", 
            "sports", "thoughts", "business", "youth", "directory"
          ];
          const filteredCats = res.data.filter(cat => 
             !staticNames.includes(cat.name.toLowerCase())
          );
          setAllCategories(filteredCats);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        // Fallback to avoid empty list if API fails
        setAllCategories([]); 
      }
    };
    fetchAllCategories();
  }, []);

  // --- 2. Event Handlers ---
  const handleStateMouseEnter = () => { if (window.innerWidth > 768) setIsStateDropdownOpen(true); };
  const handleStateMouseLeave = () => { if (window.innerWidth > 768) setIsStateDropdownOpen(false); };
  
  const handleOtherMouseEnter = () => { if (window.innerWidth > 768) setIsOtherDropdownOpen(true); };
  const handleOtherMouseLeave = () => { if (window.innerWidth > 768) setIsOtherDropdownOpen(false); };

  const handleStateClick = (e) => {
    if (window.innerWidth <= 768) { e.preventDefault(); setIsStateDropdownOpen(!isStateDropdownOpen); setIsOtherDropdownOpen(false); }
  };
  const handleOtherClick = (e) => {
    if (window.innerWidth <= 768) { e.preventDefault(); setIsOtherDropdownOpen(!isOtherDropdownOpen); setIsStateDropdownOpen(false); }
  };

  // --- 3. Click Outside Logic ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Safety checks for refs
      const clickedSidebar = sidebarRef.current && sidebarRef.current.contains(event.target);
      const clickedState = stateRef.current && stateRef.current.contains(event.target);
      const clickedOther = otherRef.current && otherRef.current.contains(event.target);

      if (!clickedSidebar && !clickedState && !clickedOther) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // --- 4. Content Component ---
  const GenericDropdownContent = ({ items, isMobile, type, closeMenu }) => (
    <div
      className={isMobile ? `mobile-${type}-dropdown` : `desktop-${type}-dropdown`}
      style={{
        backgroundColor: "#c82333",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px",
        zIndex: 999999,
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "6px 12px",
        ...(isMobile ? {
          position: 'static', width: '100%', marginTop: '8px',
        } : {
          position: "fixed", minWidth: "540px", gridTemplateColumns: "repeat(3, 1fr)",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
        })
      }}
      onMouseEnter={type === 'state' ? handleStateMouseEnter : handleOtherMouseEnter}
      onMouseLeave={type === 'state' ? handleStateMouseLeave : handleOtherMouseLeave}
    >
      {items && items.length > 0 ? (
        items.map((item) => {
            const path = type === 'state' 
                ? `/state/${item.name.toLowerCase().replace(/\s+/g, "-")}/${item._id}`
                : `/category/${item.name}`;
            return (
                <NavLink
                  key={item._id}
                  to={path}
                  className="d-block text-white"
                  style={{ padding: "4px 6px", fontSize: "14px", lineHeight: "1.3", borderRadius: "4px", textDecoration: "none" }}
                  onClick={() => { onClose(); closeMenu(false); }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {item.name}
                </NavLink>
            );
        })
      ) : (
          <span style={{ fontSize: "14px", padding: "4px" }}>Loading...</span>
      )}
    </div>
  );

  // --- 5. Render Logic (Safe Portal) ---
  const DropdownMenuRenderer = ({ type, items, parentRef, isOpenState, setIsOpenState }) => {
    const isMobileView = window.innerWidth <= 768;

    if (!isOpenState) return null;

    if (isMobileView) {
      return (
        <div style={{ paddingLeft: '20px' }}>
          <GenericDropdownContent items={items} isMobile={true} type={type} closeMenu={setIsOpenState} />
        </div>
      );
    } else {
      // ✅ Auto-create portal root if missing to prevent Crash
      let portalRoot = document.getElementById("portal-root");
      if (!portalRoot) {
        portalRoot = document.createElement("div");
        portalRoot.id = "portal-root";
        document.body.appendChild(portalRoot);
      }

      // Safety check: if refs aren't ready, don't render yet
      if (!parentRef.current || !sidebarRef.current) return null;

      const parentRect = parentRef.current.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const dropdownLeft = sidebarRect.right; 

      let style = {
        position: "fixed",
        left: `${dropdownLeft}px`,
        zIndex: 999999,
        maxHeight: "80vh",
        overflowY: "auto"
      };

      if (type === 'other') {
        // ✅ ALIGNMENT LOGIC:
        // window.innerHeight - parentRect.bottom = Screen ke bottom se Button ke bottom tak ki doori.
        // Isse menu ka bottom edge, button ke bottom edge se mil jayega.
        // Aur menu UPAR (Upwards) ki taraf khulega.
        const bottomOffset = window.innerHeight - parentRect.bottom;
        style.bottom = `${bottomOffset}px`;
        style.top = "auto"; 
      } else {
        // State dropdown logic (Top aligned)
        style.top = `${parentRect.top}px`;
        style.bottom = "auto";
      }

      return ReactDOM.createPortal(
        <div style={style}>
          <GenericDropdownContent items={items} isMobile={false} type={type} closeMenu={setIsOpenState} />
        </div>,
        portalRoot
      );
    }
  };

  return (
    <div
      ref={sidebarRef}
      style={{
        position: "fixed", top: 0, left: 0, height: "100vh", width: "250px",
        backgroundColor: "#fff", boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out", zIndex: 10000,
        display: "flex", flexDirection: "column", padding: "10px",
        overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none",
      }}
      className="custom-sidebar"
    >
      {/* Logo */}
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <img src={logo} alt="EMS Logo" style={{ width: "100%", maxHeight: "80px", objectFit: "contain" }} />
      </div>

      <div className="flex-grow-1 d-flex flex-column" style={{ gap: "8px" }}>
        <NavItem to="/" Icon={FiHome} text="Home" onClick={onClose} />
        <NavItem to="/india" Icon={FiFlag} text="India" onClick={onClose} />

        {/* State Dropdown */}
        <div ref={stateRef} onMouseEnter={handleStateMouseEnter} onMouseLeave={handleStateMouseLeave} onClick={handleStateClick} className="state-dropdown-wrapper">
          <div className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1" style={{ cursor: "pointer" }}>
            <FaLandmark size={15} style={{ marginRight: "25px", marginLeft: "8px" }} /> State ▾
          </div>
          <DropdownMenuRenderer type="state" items={states} parentRef={stateRef} isOpenState={isStateDropdownOpen} setIsOpenState={setIsStateDropdownOpen} />
        </div>

        <NavItem to="/entertainment" Icon={FiFilm} text="Entertainment" onClick={onClose} />
        <NavItem to="/astrology" Icon={FiStar} text="Astrology" onClick={onClose} />
        <NavItem to="/sports" Icon={FiAward} text="Sports" onClick={onClose} />
        <NavItem to="/thoughts" Icon={FiZap} text="Thoughts" onClick={onClose} />
        <NavItem to="/business" Icon={FiBriefcase} text="Business" onClick={onClose} />
        <NavItem to="/youth" Icon={FiUser} text="Youth" onClick={onClose} />
        <NavItem to="/directory" Icon={FiFolder} text="Directory" onClick={onClose} />

        {/* ✅ Other Dropdown (Upward Aligned) */}
        <div ref={otherRef} onMouseEnter={handleOtherMouseEnter} onMouseLeave={handleOtherMouseLeave} onClick={handleOtherClick} className="other-dropdown-wrapper">
          <div className="nav-link d-flex align-items-center text-dark fw-bold px-2 py-1" style={{ cursor: "pointer" }}>
            <FiGrid size={18} style={{ marginRight: "22px", marginLeft: "5px" }} /> Other ▾
          </div>
          <DropdownMenuRenderer type="other" items={allCategories} parentRef={otherRef} isOpenState={isOtherDropdownOpen} setIsOpenState={setIsOtherDropdownOpen} />
        </div>

        {/* Footer Links */}
        <div className="mt-3">
          <h6 className="fw-bold mb-2">About EMS</h6>
          <a href="/about-us" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>About Us</a>
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Advertise With Us</a>
          <a href="/contact-us" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Contact Us</a>
          <a href="#" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>Careers</a>
          <h6 className="fw-bold mt-3 mb-2">Quick Links</h6>
          <a href="/terms-and-conditions" className="d-block mb-1 text-dark text-decoration-none" onClick={onClose}>• T&C</a>
          <a href="/privacy-policy" className="d-block text-dark text-decoration-none" onClick={onClose}>• Privacy Policy</a>
        </div>
      </div>

      {/* Social & Download */}
      <div className="pt-2 mt-auto">
        <div className="d-flex justify-content-around mb-2">
          <a href="https://www.facebook.com/profile.php?id=100064235764414"><FaFacebookF size={16} /></a>
          <a href="https://x.com/EmstvI"><FaXTwitter size={16} /></a>
          <a href="https://www.youtube.com/@emstv"><FaYoutube size={16} /></a>
          <a href="https://www.instagram.com/emstv/"><FaInstagram size={16} /></a>
        </div>
        <p className="small text-muted mb-1">Download App from</p>
        <a href="#" className="d-block" style={{ marginBottom: "-95px" }}>
          <img src={playStoreImage} alt="Play Store" style={{ width: "135px", display: "block" }} />
        </a>
        <a href="#" className="d-block">
          <img src={appStoreImage} alt="App Store" style={{ width: "135px", display: "block" }} />
        </a>
      </div>
    </div>
  );
};

export default LeftSidebar;