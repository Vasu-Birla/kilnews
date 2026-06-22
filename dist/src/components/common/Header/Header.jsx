import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
 
// Assets
import logoT from "../../../assets/logoT.png";
import epaperIcon from "../../../assets/icons/epaper-icon.svg";
import searchIcon from "../../../assets/icons/search-icon.svg";
import emstvIcon from "../../../assets/icons/emstvIcon.png";
import directoryIcon from "../../../assets/icons/directory-icon.svg";
import loginIcon from "../../../assets/icons/login-icon.svg";
 
// Google Translate
import GoogleTranslateWidget, { useGoogleTranslate } from "../../GoogleTranslateWidget";
 
// Icons
import { FaFacebookF, FaYoutube, FaInstagram, FaUserCircle } from "react-icons/fa";
import { FaXTwitter, FaBars } from "react-icons/fa6";
import { MdOutlineSubscriptions } from "react-icons/md";
 
// Sidebar
import LeftSidebar from "../LeftSidebar";
 
// API
import { headline, getStatesByCountry, getCategories, fetchActiveAds } from "../../../Services/authApi";


const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

const translations = {
  en: {
    home: "Home", india: "India", state: "State", entertainment: "Entertainment",
    astrology: "Astrology", sports: "Sports", thoughts: "Thoughts", business: "Business",
    youth: "Youth", other: "Other", epaper: "E-Paper", search: "Search",
    emstv: "EMS TV", directory: "Directory", subscriber: "Subscriber",
    liveNews: "News Headline", login: "Login/Signup", profile: "Profile", logout: "Logout"
  },
  hi: {
    home: "होम", india: "देश", state: "राज्य", entertainment: "मनोरंजन",
    astrology: "ज्योतिष", sports: "खेल", thoughts: "विचार", business: "बिजनेस",
    youth: "लाइफस्टाइल", other: "अन्य", epaper: "ई-पेपर", search: "खोजें",
    emstv: "ईएमएस टीवी", directory: "डायरेक्टरी", subscriber: "सब्सक्राइबर",
    liveNews: "न्यूज़ हेडलाइंस", login: "लॉगिन/साइनअप", profile: "प्रोफ़ाइल", logout: "लॉगआउट"
  },
};
 
const sidebarOptions = [
  { key: "home", path: "/" },
  { key: "india", path: "/india" },
  { key: "state", path: "/state", isDropdown: true },
  { key: "entertainment", path: "/entertainment" },
  { key: "astrology", path: "/astrology" },
  { key: "sports", path: "/sports" },
  { key: "thoughts", path: "/thoughts" },
  { key: "business", path: "/business" },
  { key: "youth", path: "/youth" },
];
 
const HeaderActionIcon = ({ icon, text, link, isReactIcon = false, size = 28 }) => {
  const renderedIcon = isReactIcon ? React.cloneElement(icon, { size }) : <img src={icon} alt={text} height={size} width={size} />;
  const isExternalLink = link.startsWith("http://") || link.startsWith("https://");
 
  const handleExternalLinkClick = (event) => {
    if (isExternalLink) {
      event.preventDefault();
      window.open(link, "_self");
    }
  };
 
  return isExternalLink ? (
    <a href={link} onClick={handleExternalLinkClick} className="d-flex flex-column align-items-center text-decoration-none text-center" style={{ color: "#000" }}>
      {renderedIcon}
      <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>{text}</span>
    </a>
  ) : (
    <Link to={link} className="d-flex flex-column align-items-center text-decoration-none text-center" style={{ color: "#000" }}>
      {renderedIcon}
      <span className="header-action-text" style={{ fontSize: "11px", marginTop: "4px", fontWeight: 700, lineHeight: 1.1 }}>{text}</span>
    </Link>
  );
};
 
const Header = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("userLanguage") || "hi");
  const [headlineData, setHeadlineData] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [topAd, setTopAd] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
 
  const profileDropdownRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const otherDropdownRef = useRef(null);
  const t = translations[currentLanguage] || translations.en;
 
  const changeAppLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("userLanguage", lang);
    navigate("/");
    window.location.reload();
  };
 
  useEffect(() => {
    const handleScroll = () => {
      // scrollY > 20 helps detect scroll earlier and smoother
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try { setLoggedInUser(JSON.parse(userData)); } catch { setLoggedInUser(null); }
    }
  }, []);
 
  useEffect(() => {
    const loadAds = async () => {
      try {
        const res = await fetchActiveAds();
        if (res?.success && Array.isArray(res.ads)) {
          const ad = res.ads.find(item => item.position === "top");
          setTopAd(ad || null);
        }
      } catch (error) { setTopAd(null); }
    };
    loadAds();
  }, []);
 
  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const response = await headline();
        const dataArray = response?.data || [];
        const allHeadlines = dataArray
          .filter((item) => item.headlineText)
          .map((item) => ({
            id: item.newsId?._id || item._id,
            slug: item.newsId?.slug_en || "",
            text: item.headlineText.trim(),
          }));
        setHeadlineData(allHeadlines.length ? allHeadlines : [{ id: "0", slug: "", text: "No headline available" }]);
      } catch {
        setHeadlineData([{ id: "0", slug: "", text: "Error loading headlines" }]);
      }
    };
    fetchHeadline();
  }, [currentLanguage]);
 
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getStatesByCountry("687a1e2185f0230715032380");
        if (res?.success) setAllStates(res.data);
      } catch {}
    };
    fetchStates();
  }, []);
 
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await getCategories();
        if (res?.success) {
          const staticNames = sidebarOptions.map(opt => opt.key.toLowerCase());
          const filteredCats = res.data.filter(cat => !staticNames.includes(cat.name.toLowerCase()));
          setAllCategories(filteredCats);
        }
      } catch {}
    };
    fetchAllCategories();
  }, []);
 
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) setIsStateDropdownOpen(false);
      if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) setIsOtherDropdownOpen(false);
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) setIsProfileDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsProfileDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  const containerTop = topAd ? 0 : 0; // Removed the 5px top gap to prevent jumping

  return (
    <>
        {/* --- YE CSS ADD KAREIN --- */}
    <style>
      {`
        .headline-wrapper {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .headline-track {
          display: inline-block;
          animation: marquee-move 40s linear infinite; /* Speed yahan se control karein */
        }
        .headline-track:hover {
          animation-play-state: paused; /* Mouse le jane par ruk jayega */
        }
        @keyframes marquee-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}
    </style>
      <GoogleTranslateWidget />
 
      {/* Blue Header + Ad Wrapper */}
      <div
        style={{
          position: "fixed",
          top: containerTop,
          left: 0,
          right: 0,
          zIndex: 2000,
          // scroll behavior: direct move up
          transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.3s ease-in-out", 
          backgroundColor: "#fff" 
        }}
      >
        {topAd && (
          <div className="d-flex flex-column align-items-center w-100 bg-white">
            <div style={{ maxWidth: "728px", width: "100%", aspectRatio: "728 / 90", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              {topAd.mediaType === "image" && (
                <a href={topAd.link || "#"} target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%", display: "block" }}>
                  <img src={topAd.mediaUrl} alt={topAd.title || "Advertisement"} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </a>
              )}
            </div>
            <div style={{ height: "5px", width: "100%", backgroundColor: "white" }}></div>
          </div>
        )}

        {/* BLUE HEADER */}
        <div style={{ backgroundColor: "#0d2d62", color: "white", height: "40px", width: "100%" }}>
          <Container fluid className="d-flex justify-content-between align-items-center py-1 px-3">
            <div className="d-flex align-items-center" style={{ marginLeft: "70px" }}>
              <Button variant="link" className="text-white fw-bold p-0 me-3" onClick={() => changeAppLanguage("hi")} style={{ textDecoration: currentLanguage === "hi" ? "underline" : "none" }}>हिंदी</Button>
              <Button variant="link" className="text-white fw-bold p-0" onClick={() => changeAppLanguage("en")} style={{ textDecoration: currentLanguage === "en" ? "underline" : "none" }}>English</Button>
            </div>
            <div className="d-flex align-items-center">
              <a href="https://www.facebook.com/profile.php?id=100064235764414" className="text-white mx-2 d-none d-md-inline-block"><FaFacebookF size={16} /></a>
              <a href="https://x.com/EmstvI" className="text-white mx-2 d-none d-md-inline-block"><FaXTwitter size={16} /></a>
              <a href="https://www.youtube.com/@emstvindia" className="text-white mx-2 d-none d-md-inline-block"><FaYoutube size={16} /></a>
              <a href="https://www.instagram.com/emstvmp" className="text-white mx-2 d-none d-md-inline-block"><FaInstagram size={16} /></a>
              {/* <div ref={profileDropdownRef} className="position-relative ms-3">
                {loggedInUser ? (
                  <Button variant="link" onClick={(e) => { e.stopPropagation(); setIsProfileDropdownOpen((prev) => !prev); }} className="p-0 border-0 d-flex align-items-center text-decoration-none">
                    {loggedInUser.profileImage ? <img src={loggedInUser.profileImage} alt={loggedInUser.name} className="rounded-circle" style={{ width: "28px", height: "28px", objectFit: "cover" }} /> : <FaUserCircle size={28} color="white" />}
                    <span className="ms-2 text-white fw-bold d-none d-lg-inline">{loggedInUser.name.split(" ")[0]}</span>
                  </Button>
                ) : (
                  <Link to="/login" className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3">
                    <img src={loginIcon} alt="Login" height="28" className="me-1" />
                    <span>{t.login}</span>
                  </Link>
                )}
                {isProfileDropdownOpen && loggedInUser && (
                  <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#0d2d62", color: "white", padding: "8px 0", minWidth: "120px", borderRadius: "4px", zIndex: 2001 }}>
                    <Link to="/profile" className="d-block text-white text-decoration-none px-3 py-1" onClick={() => setIsProfileDropdownOpen(false)}>{t.profile}</Link>
                    <Button variant="link" className="d-block text-white text-decoration-none w-100 text-start px-3 py-1" onClick={handleLogout}>{t.logout}</Button>
                  </div>
                )}
              </div> */}
              <div ref={profileDropdownRef} className="position-relative ms-3">
  {loggedInUser ? (
    <Button variant="link" onClick={(e) => { e.stopPropagation(); setIsProfileDropdownOpen((prev) => !prev); }} className="p-0 border-0 d-flex align-items-center text-decoration-none">
      {loggedInUser.profileImage ? <img src={loggedInUser.profileImage} alt={loggedInUser.name} className="rounded-circle" style={{ width: "28px", height: "28px", objectFit: "cover" }} /> : <FaUserCircle size={28} color="white" />}
      <span className="ms-2 text-white fw-bold d-none d-lg-inline">{loggedInUser.name.split(" ")[0]}</span>
    </Button>
  ) : (
    <a href="https://services.emsindia.com" className="d-flex align-items-center text-decoration-none text-white fw-bold me-3 ms-3">
      <img src={loginIcon} alt="Login" height="28" className="me-1" />
      <span>{t.login}</span>
    </a>
  )}
  {isProfileDropdownOpen && loggedInUser && (
    <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#0d2d62", color: "white", padding: "8px 0", minWidth: "120px", borderRadius: "4px", zIndex: 2001 }}>
      <Link to="/profile" className="d-block text-white text-decoration-none px-3 py-1" onClick={() => setIsProfileDropdownOpen(false)}>{t.profile}</Link>
      <Button variant="link" className="d-block text-white text-decoration-none w-100 text-start px-3 py-1" onClick={handleLogout}>{t.logout}</Button>
    </div>
  )}
</div>
            </div>
          </Container>
        </div>
      </div>
 
      {/* Spacer to push content down */}
      <div style={{ marginTop: topAd ? "135px" : "40px" }} />
 
      {/* White Header (Navigation) */}
      <div className="bg-white border-bottom sticky-top" style={{ zIndex: 1020 }}>
        <Container fluid className="d-flex justify-content-between align-items-center py-2 px-3">
          {/* LOGO FIXED HERE - No more translateY animation */}
          {/* {/* <Link to="/" className="d-flex flex-column align-items-center text-decoration-none"> */}
            {/* <video src="/logogif.mp4" autoPlay loop muted style={{ width: "60px", marginBottom: "2px" }} />
            <img src={logoT} alt="EMS Tagline" style={{ height: "5px" }} /> */}
          
          <Link to="/" className="d-flex flex-column align-items-center text-decoration-none">
  <video 
    src="/logogif.mp4" 
    autoPlay 
    loop 
    muted 
    playsInline             // ✅ Ye iPhone par automatic play (autoplay) karega
    webkit-playsinline="true" // ✅ Purane Safari browsers ke liye fix
    preload="auto"          // ✅ Page load hote hi video load kar lega
    style={{ width: "60px", marginBottom: "2px" }} 
  />
  <img src={logoT} alt="EMS Tagline" style={{ height: "5px" }} />
</Link>
 
          {/* Center Menu */}
          <Nav className="flex-grow-1 d-none d-md-flex justify-content-center align-items-center fw-bold" style={{ gap: "45px" }}>
            {sidebarOptions.map((opt, index) =>
              opt.isDropdown ? (
                <div key={index} ref={stateDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
                  <span onClick={() => setIsStateDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>{t[opt.key]} ▾</span>
                  {isStateDropdownOpen && (
                    <div style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#c82333", color: "white", padding: "6px", minWidth: "540px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", zIndex: 999 }}>
                      {allStates.map((state) => (
                        <NavLink key={state._id} to={`/state/${state.name.toLowerCase().replace(/\s+/g, "-")}/${state._id}`} className="text-white text-decoration-none" style={{ padding: "6px 8px", fontSize: "14px", borderRadius: "4px" }} onClick={() => setIsStateDropdownOpen(false)}>{state.name}</NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={index} to={opt.path} className="text-decoration-none text-black" style={{ fontWeight: 600 }}>{t[opt.key]}</NavLink>
              )
            )}
            <div ref={otherDropdownRef} className="position-relative" style={{ cursor: "pointer", color: "black" }}>
              <span onClick={() => setIsOtherDropdownOpen((prev) => !prev)} style={{ fontWeight: 600 }}>{t.other} ▾</span>
              {isOtherDropdownOpen && (
  <div
    style={{
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "#c82333",
      color: "white",
      padding: "8px 0",
      minWidth: "200px",
      display: "flex",
      flexDirection: "column",
      zIndex: 999,
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
    }}
  >
                  {allCategories.length > 0 ? allCategories.map((cat) => (
                    <NavLink key={cat._id} to={`/category/${cat.name}`} className="text-white text-decoration-none" style={{ padding: "6px 8px", fontSize: "14px" }} onClick={() => setIsOtherDropdownOpen(false)}>{cat.name}</NavLink>
                  )) : <span className="text-white p-2">Loading...</span>}
                </div>
              )}
            </div>
          </Nav>
 
          {/* Right Icons */}
          <Nav className="d-flex flex-row align-items-center gap-3 gap-md-4">
            <HeaderActionIcon icon={epaperIcon} text={t.epaper} link="http://www.jabalpurexpress.com/" />
            <HeaderActionIcon icon={searchIcon} text={t.search} link="/search" />
            <HeaderActionIcon icon={emstvIcon} text={t.emstv} link="/emstv" />
            <HeaderActionIcon icon={directoryIcon} text={t.directory} link="/directory" />
            {/* <HeaderActionIcon icon={<MdOutlineSubscriptions color="#c41229ff" />} text={t.subscriber} link="https://services.emsindia.com/public/authentication/admin_login" isReactIcon size={28} /> */}
          </Nav>
        </Container>
      </div>
 
      {/* Live News */}
      <div className="bg-white border-top border-bottom">
        <Container fluid className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center px-2 py-1" style={{ backgroundColor: "#0d2d62", flexShrink: 0 }}>
            <Button variant="link" className="text-white me-2 p-0" onClick={toggleSidebar} style={{ fontSize: "20px" }}><FaBars /></Button>
            <span className="text-white fw-bold px-2 py-0" style={{ minWidth: "120px", fontSize: "14px" }}>{t.liveNews}</span>
          </div>
        

{/* --- NAYA CODE YAHAN PASTE KAREIN --- */}
<div className="headline-wrapper py-1" style={{ flexGrow: 1, marginLeft: "8px" }}>
  <div className="headline-track">
    {/* Pehla Set */}
    {headlineData.map((headline, idx) => (
      <Link
        key={`set1-${headline.id}-${idx}`}
        to={headline.slug ? `/news/${headline.slug}` : "#"}
        className="text-decoration-none text-dark mx-3 fw-bold"
        style={{ display: "inline-block" }}
      >
        {stripHtml(headline.text)}
      </Link>
    ))}
    {/* Dusra Set (Loop ko seamless banane ke liye zaroori hai) */}
    {headlineData.map((headline, idx) => (
      <Link
        key={`set2-${headline.id}-${idx}`}
        to={headline.slug ? `/news/${headline.slug}` : "#"}
        className="text-decoration-none text-dark mx-4 fw-bold"
        style={{ display: "inline-block" }}
      >
        {stripHtml(headline.text)}
      </Link>
    ))}
  </div>
</div>
        </Container>
      </div>
 
      <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} states={allStates} />
    </>
  );
};
 
export default Header;