
// // export default CompanyDetailPage;
// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image, Nav } from "react-bootstrap";
// import {
//   FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes
// } from 'react-icons/fa';
// import { getCompanyById } from "../Services/authApi";

// const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP";

// const CompanyDetailPage = () => {
//   const { companyId } = useParams();
//   const location = useLocation();
//   const [company, setCompany] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0); // नया स्टेट: वर्तमान बैनर इंडेक्स के लिए

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       setError(null);
//       setLoading(true);

//       if (location.state && location.state.companyDetails) {
//         setCompany(location.state.companyDetails);
//         setLoading(false);
//       } else {
//         try {
//           const res = await getCompanyById(companyId);
//           if (res.success && res.data) setCompany(res.data);
//           else setError(res.message || "Failed to fetch company details.");
//         } catch (err) {
//           setError(err.message || "Unexpected error occurred.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCompanyDetails();
//   }, [companyId, location.state]);

//   // बैनर स्लाइडर के लिए useEffect
//   useEffect(() => {
//     let intervalId;
//     if (company?.banner && company.banner.length > 1) { // यदि एक से अधिक बैनर हों तो ही स्लाइडर चलाएं
//       intervalId = setInterval(() => {
//         setCurrentBannerIndex(prevIndex =>
//           (prevIndex + 1) % company.banner.length
//         );
//       }, 3000); // हर 5 सेकंड में इमेज बदलें
//     } else {
//       setCurrentBannerIndex(0); // यदि एक या कोई बैनर नहीं है, तो इंडेक्स को 0 पर रीसेट करें
//     }

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId); // कंपोनेंट अनमाउंट होने पर इंटरवल साफ़ करें
//       }
//     };
//   }, [company]); // कंपनी डेटा बदलने पर प्रभाव फिर से चलाएं

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
//     if (rating % 1 !== 0 && rating > 0) stars.push(<span key="half" className="text-warning">&#9734;</span>);
//     for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
//     return stars;
//   };

//   if (loading) return (
//     <Container className="text-center py-5">
//       <Spinner animation="border" className="my-3" />
//       <p className="mt-3">Loading company details...</p>
//     </Container>
//   );
//   if (error || !company) return (
//     <Container className="py-5">
//       <Alert variant="danger">{error || "Company not found."}</Alert>
//       <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//     </Container>
//   );

//   const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

//   // `mainBackgroundImage` अब सीधे पृष्ठभूमि div की शैली के लिए उपयोग नहीं किया जाता है
//   // इसे नीचे `company.banner` की मैपिंग द्वारा नियंत्रित किया जाएगा

//   const allImages = [];
//   if (company.banner && company.banner.length > 0) {
//     allImages.push(...company.banner);
//   }
//   if (company.products && company.products.length > 0) {
//     company.products.forEach(product => {
//       if (product.images && product.images.length > 0) {
//         allImages.push(...product.images);
//       }
//     });
//   }

//   return (
//     <Container fluid className="p-0">
//       {/* Top section with background image slider and overlaid details */}
//       <div
//         className="position-relative"
//         style={{
//           minHeight: '350px',
//           padding: '60px 0 20px 0',
//           overflow: 'hidden', // यह सुनिश्चित करने के लिए कि एब्सोल्यूट पोजीशन वाली इमेजेस स्क्रोलबार का कारण न बनें
//         }}
//       >
//         {/* बैकग्राउंड स्लाइडर के लिए एब्सोल्यूट पोजीशन वाली इमेजेस */}
//         {company.banner && company.banner.length > 0 ? (
//           company.banner.map((url, index) => (
//             <Image
//               key={url} // URL को कुंजी के रूप में उपयोग करना (यह मानते हुए कि वे अद्वितीय हैं)
//               src={url}
//               alt={`Company Banner ${index + 1}`}
//               className="position-absolute w-100 h-100"
//               style={{
//                 top: 0,
//                 left: 0,
//                 objectFit: 'cover',
//                 transition: 'opacity 1s ease-in-out', // फेड ट्रांजीशन
//                 opacity: index === currentBannerIndex ? 1 : 0, // वर्तमान इमेज को दृश्यमान बनाएं
//                 zIndex: 0,    
//               }}
//             />
//           ))
//         ) : (
//           // यदि कोई बैनर नहीं है तो प्लेसहोल्डर दिखाएं
//           <div
//             className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
//             style={{
//               top: 0,
//               left: 0,
//               backgroundColor: '#333', // गहरा प्लेसहोल्डर बैकग्राउंड
//               zIndex: 0,
//               color: 'white',
//               fontSize: '1.5rem',
//             }}
//           >
//             No Banner Image Available
//           </div>
//         )}

//         {/* ओवरलेड डिटेल्स बॉक्स */}
//         <Container className="h-100 position-relative" style={{ zIndex: 1 }}> {/* सुनिश्चित करें कि कंटेंट इमेजेस के ऊपर हो */}
//           <Row className="h-100 align-items-end">
//             <Col xs={12} md={8} lg={6}>
//               <div
//                 className="p-4"
//                 style={{
//                   backdropFilter: 'blur(10px)',
//                   backgroundColor: 'rgba(25, 25, 25, 0.25)',
//                   borderRadius: '12px',
//                   border: '1px solid rgba(255, 255, 255, 0.18)',
//                   color: 'white',
//                   textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
//                 }}
//               >
//                 <h2 className="mb-2" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{company.name}</h2>

//                 <div className="d-flex align-items-center mb-2">
//                   {renderStars(company.averageRating || 0)}
//                   <span className="ms-1">({company.reviews?.length || 0} reviews)</span>
//                 </div>

//                 {company.address && <p className="mb-0" style={{ fontSize: '0.95rem' }}>{company.address}</p>}
//                 {(company.city || company.pincode) &&
//                   <p className="mb-2" style={{ fontSize: '0.95rem' }}>
//                     {[company.city, company.pincode].filter(Boolean).join(" - ")}
//                   </p>
//                 }

//                 {company.phone && <h3 className="fw-bold" style={{ fontSize: '1.7rem' }}>{company.phone}</h3>}
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Navigation Tabs */}
//       <Container className="mt-3">
//         <div className="d-flex justify-content-between align-items-center">
//           <Nav defaultActiveKey="overview" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
//             <Nav.Item>
//               <Nav.Link eventKey="overview" className={`py-2 px-3 me-2 ${activeTab === 'overview' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'overview' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
//                 Overview
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="product" className={`py-2 px-3 me-2 ${activeTab === 'product' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'product' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
//                 Product
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="photo" className={`py-2 px-3 me-2 ${activeTab === 'photo' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'photo' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
//                 Photo
//               </Nav.Link>
//             </Nav.Item>
//           </Nav>
//           <Button onClick={() => window.history.back()} className="d-flex align-items-center" style={{ backgroundColor: '#c00', borderColor: '#c00', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none' }}>
//             <FaArrowLeft className="me-2" /> Back
//           </Button>
//         </div>
//       </Container>
      
//       {/* Content based on active tab */}
//       <Container className="py-2">
//         {activeTab === 'overview' && (
//           <>
//             <Row>
//               <Col md={6} className="mb-4">
//                 <Card className="p-3 shadow-sm h-100">
//                   <Card.Title>Contact Information</Card.Title>
//                   <ListGroup variant="flush">
//                     {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
//                     {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
//                     {(company.address || company.city || company.state || company.country) &&
//                       <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
//                     }
//                     {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}
//                     {company.businessTimings && (
//                       <ListGroup.Item className="pt-3">
//                         <p className="fw-bold mb-2">Business Timings</p>
//                         <ul className="list-unstyled">
//                           {daysOrder.map(day => {
//                             const t = company.businessTimings[day];
//                             const dayName = day.charAt(0).toUpperCase() + day.slice(1);
//                             const isOpen = t && t.open && t.close && t.open !== 'Closed' && t.close !== 'Closed';
//                             const timeRange = isOpen ? `${t.open} - ${t.close}` : 'Not Specified';
//                             const status = isOpen ? 'Open' : 'Closed';
//                             return (
//                               <li key={day} className="d-flex justify-content-between align-items-center mb-1 small">
//                                 <span>{dayName}</span>
//                                 <div>
//                                   <span>{timeRange}</span>
//                                   <span className={`fw-bold ms-2 ${isOpen ? 'text-success' : 'text-danger'}`}>{status}</span>
//                                 </div>
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       </ListGroup.Item>
//                     )}
//                   </ListGroup>
//                 </Card>
//               </Col>
//               <Col md={6} className="mb-4">
//                 <Card className="p-3 shadow-sm h-100">
//                   <Card.Title>Business Details</Card.Title>
//                   <ListGroup variant="flush">
//                     {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
//                     {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
//                      {company.description && <ListGroup.Item>Company description: {company.description}</ListGroup.Item>}
                    
//                     {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
//                   </ListGroup>
//                 </Card>
//               </Col>
//             </Row>
//             {company.products?.length > 0 && (
//               <Row className="mb-4">
//                 <Col md={12}>
//                   <Card className="p-3 shadow-sm">
//                     <h5 className="mb-3"><FaBoxes className="me-2" />Products</h5>
//                     <div
//                       className="d-flex flex-nowrap overflow-x-auto py-2"
//                       style={{ gap: '15px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}
//                     >
//                       {company.products.map(prod => (
//                         <div key={prod._id} style={{ flex: '0 0 auto', width: '200px' }}>
//                           <Card className="shadow-sm h-100">
//                             {prod.images && prod.images.length > 0 && prod.images[0] ? (
//                               <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '150px', objectFit: 'cover' }} />
//                             ) : (
//                               <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '150px', objectFit: 'cover' }} />
//                             )}
//                             <Card.Body className="p-2">
//                               <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                               {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 50)}{prod.description.length > 50 ? '...' : ''}</Card.Text>}
//                               {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                             </Card.Body>
//                           </Card>
//                         </div>
//                       ))}
//                     </div>
//                   </Card>
//                 </Col>
//               </Row>
//             )}
//           </>
//         )}
//         {activeTab === 'product' && (
//           <Row className="mb-4">
//             <Col md={12}>
//               <Card className="p-3 shadow-sm">
//                 <h4 className="mb-3"><FaBoxes className="me-2" />All Products</h4>
//                 {company.products?.length > 0 ? (
//                   <Row xs={1} md={2} lg={3} className="g-3">
//                     {company.products.map(prod => (
//                       <Col key={prod._id}>
//                         <Card className="shadow-sm h-100">
//                           {prod.images && prod.images.length > 0 && prod.images[0] ? (
//                             <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '180px', objectFit: 'cover' }} />
//                           ) : (
//                             <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '180px', objectFit: 'cover' }} />
//                           )}
//                           <Card.Body className="p-2">
//                             <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
//                             {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 80)}{prod.description.length > 80 ? '...' : ''}</Card.Text>}
//                             {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
//                           </Card.Body>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info">No products available for this company.</Alert>
//                 )}
//               </Card>
//             </Col>
//           </Row>
//         )}
//         {activeTab === 'photo' && (
//           <Row className="mb-4">
//             <Col md={12}>
//               <Card className="p-3 shadow-sm">
//                 <h4 className="mb-3">Photos Gallery</h4>
//                 {allImages.length > 0 ? (
//                   <Row xs={1} sm={2} md={3} lg={4} className="g-3">
//                     {allImages.map((url, idx) => (
//                       <Col key={`all-image-${idx}`}>
//                         <Image src={url} alt={`Gallery Image ${idx+1}`} fluid rounded style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
//                       </Col>
//                     ))}
//                   </Row>
//                 ) : (
//                   <Alert variant="info">No photos available for this company.</Alert>
//                 )}
//               </Card>
//             </Col>
//           </Row>
//         )}
//         <div className="text-center mt-5">
//           <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
//         </div>
//       </Container>
//     </Container>
//   );
// };

// export default CompanyDetailPage;





import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup, Image, Nav } from "react-bootstrap";
import {
  FaCheckCircle, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowLeft, FaBoxes
} from 'react-icons/fa';
import { getCompanyById } from "../Services/authApi"; // Ensure this path is correct

// NEW: Import the CompanyReviewsPage component
import CompanyReviewsPage from './CompanyReviewsPage'; // Adjust path if necessary

const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP";

const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const location = useLocation();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setError(null);
      setLoading(true);

      if (location.state && location.state.companyDetails) {
        setCompany(location.state.companyDetails);
        setLoading(false);
      } else {
        try {
          const res = await getCompanyById(companyId);
          if (res.success && res.data) setCompany(res.data);
          else setError(res.message || "Failed to fetch company details.");
        } catch (err) {
          setError(err.message || "Unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCompanyDetails();
  }, [companyId, location.state]);

  // बैनर स्लाइडर के लिए useEffect
  useEffect(() => {
    let intervalId;
    if (company?.banner && company.banner.length > 1) {
      intervalId = setInterval(() => {
        setCurrentBannerIndex(prevIndex =>
          (prevIndex + 1) % company.banner.length
        );
      }, 3000);
    } else {
      setCurrentBannerIndex(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [company]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0 && rating > 0;

    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
    if (hasHalfStar) stars.push(<span key="half" className="text-warning">&#9734;</span>); // Using empty star for simplicity for half star
    for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
    return stars;
  };

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" className="my-3" />
      <p className="mt-3">Loading company details...</p>
    </Container>
  );
  if (error || !company) return (
    <Container className="py-5">
      <Alert variant="danger">{error || "Company not found."}</Alert>
      <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
    </Container>
  );

  const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const allImages = [];
  if (company.banner && company.banner.length > 0) {
    allImages.push(...company.banner);
  }
  if (company.products && company.products.length > 0) {
    company.products.forEach(product => {
      if (product.images && product.images.length > 0) {
        allImages.push(...product.images);
      }
    });
  }

  return (
    <Container fluid className="p-0">
      {/* Top section with background image slider and overlaid details */}
      <div
        className="position-relative"
        style={{
          minHeight: '350px',
          padding: '60px 0 20px 0',
          overflow: 'hidden',
        }}
      >
        {/* बैकग्राउंड स्लाइडर के लिए एब्सोल्यूट पोजीशन वाली इमेजेस */}
        {company.banner && company.banner.length > 0 ? (
          company.banner.map((url, index) => (
            <Image
              key={url}
              src={url}
              alt={`Company Banner ${index + 1}`}
              className="position-absolute w-100 h-100"
              style={{
                top: 0,
                left: 0,
                objectFit: 'cover',
                transition: 'opacity 1s ease-in-out',
                opacity: index === currentBannerIndex ? 1 : 0,
                zIndex: 0,
              }}
            />
          ))
        ) : (
          // यदि कोई बैनर नहीं है तो प्लेसहोल्डर दिखाएं
          <div
            className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              top: 0,
              left: 0,
              backgroundColor: '#333',
              zIndex: 0,
              color: 'white',
              fontSize: '1.5rem',
            }}
          >
            No Banner Image Available
          </div>
        )}

        {/* ओवरलेड डिटेल्स बॉक्स */}
        <Container className="h-100 position-relative" style={{ zIndex: 1 }}>
          <Row className="h-100 align-items-end">
            <Col xs={12} md={8} lg={6}>
              <div
                className="p-4"
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(25, 25, 25, 0.25)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: 'white',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                }}
              >
                <h2 className="mb-2" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{company.name}</h2>

                <div className="d-flex align-items-center mb-2">
                  {renderStars(company.averageRating || 0)}
                  <span className="ms-1">({company.reviews?.length || 0} reviews)</span>
                </div>

                {company.address && <p className="mb-0" style={{ fontSize: '0.95rem' }}>{company.address}</p>}
                {(company.city || company.pincode) &&
                  <p className="mb-2" style={{ fontSize: '0.95rem' }}>
                    {[company.city, company.pincode].filter(Boolean).join(" - ")}
                  </p>
                }

                {company.phone && <h3 className="fw-bold" style={{ fontSize: '1.7rem' }}>{company.phone}</h3>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Navigation Tabs */}
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <Nav defaultActiveKey="overview" onSelect={(selectedKey) => setActiveTab(selectedKey)}>
            <Nav.Item>
              <Nav.Link eventKey="overview" className={`py-2 px-3 me-2 ${activeTab === 'overview' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'overview' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="product" className={`py-2 px-3 me-2 ${activeTab === 'product' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'product' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
                Product
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="photo" className={`py-2 px-3 me-2 ${activeTab === 'photo' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'photo' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
                Photo
              </Nav.Link>
            </Nav.Item>
            {/* NEW: Reviews Tab */}
            <Nav.Item>
              <Nav.Link eventKey="reviews" className={`py-2 px-3 me-2 ${activeTab === 'reviews' ? 'text-dark fw-bold' : 'text-muted'}`} style={{ fontSize: '1.2rem', borderBottom: activeTab === 'reviews' ? '3px solid #c00' : '3px solid transparent', paddingBottom: '8px', transition: 'border-bottom 0.2s ease-in-out' }}>
                Reviews
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Button onClick={() => window.history.back()} className="d-flex align-items-center" style={{ backgroundColor: '#c00', borderColor: '#c00', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none' }}>
            <FaArrowLeft className="me-2" /> Back
          </Button>
        </div>
      </Container>

      {/* Content based on active tab */}
      <Container className="py-2">
        {activeTab === 'overview' && (
          <>
            <Row>
              <Col md={6} className="mb-4">
                <Card className="p-3 shadow-sm h-100">
                  <Card.Title>Contact Information</Card.Title>
                  <ListGroup variant="flush">
                    {company.phone && <ListGroup.Item><FaPhone /> {company.phone}</ListGroup.Item>}
                    {company.email && <ListGroup.Item><FaEnvelope /> {company.email}</ListGroup.Item>}
                    {(company.address || company.city || company.state || company.country) &&
                      <ListGroup.Item><FaMapMarkerAlt /> {[company.address, company.city, company.state, company.country].filter(Boolean).join(", ")}</ListGroup.Item>
                    }
                    {company.website && <ListGroup.Item><FaGlobe /> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></ListGroup.Item>}
                    {company.businessTimings && (
                      <ListGroup.Item className="pt-3">
                        <p className="fw-bold mb-2">Business Timings</p>
                        <ul className="list-unstyled">
                          {daysOrder.map(day => {
                            const t = company.businessTimings[day];
                            const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                            const isOpen = t && t.open && t.close && t.open !== 'Closed' && t.close !== 'Closed';
                            const timeRange = isOpen ? `${t.open} - ${t.close}` : 'Not Specified';
                            const status = isOpen ? 'Open' : 'Closed';
                            return (
                              <li key={day} className="d-flex justify-content-between align-items-center mb-1 small">
                                <span>{dayName}</span>
                                <div>
                                  <span>{timeRange}</span>
                                  <span className={`fw-bold ms-2 ${isOpen ? 'text-success' : 'text-danger'}`}>{status}</span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="p-3 shadow-sm h-100">
                  <Card.Title>Business Details</Card.Title>
                  <ListGroup variant="flush">
                    {company.gstNumber && <ListGroup.Item>GST Number: {company.gstNumber}</ListGroup.Item>}
                    {company.companyType && <ListGroup.Item>Company Type: {company.companyType}</ListGroup.Item>}
                     {company.description && <ListGroup.Item>Company description: {company.description}</ListGroup.Item>}

                    {company.keywords && company.keywords.length > 0 && <ListGroup.Item>Keywords: {company.keywords.join(", ")}</ListGroup.Item>}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            {company.products?.length > 0 && (
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="p-3 shadow-sm">
                    <h5 className="mb-3"><FaBoxes className="me-2" />Products</h5>
                    <div
                      className="d-flex flex-nowrap overflow-x-auto py-2"
                      style={{ gap: '15px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.2) transparent' }}
                    >
                      {company.products.map(prod => (
                        <div key={prod._id} style={{ flex: '0 0 auto', width: '200px' }}>
                          <Card className="shadow-sm h-100">
                            {prod.images && prod.images.length > 0 && prod.images[0] ? (
                              <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '150px', objectFit: 'cover' }} />
                            ) : (
                              <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '150px', objectFit: 'cover' }} />
                            )}
                            <Card.Body className="p-2">
                              <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
                              {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 50)}{prod.description.length > 50 ? '...' : ''}</Card.Text>}
                              {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        )}
        {activeTab === 'product' && (
          <Row className="mb-4">
            <Col md={12}>
              <Card className="p-3 shadow-sm">
                <h4 className="mb-3"><FaBoxes className="me-2" />All Products</h4>
                {company.products?.length > 0 ? (
                  <Row xs={1} md={2} lg={3} className="g-3">
                    {company.products.map(prod => (
                      <Col key={prod._id}>
                        <Card className="shadow-sm h-100">
                          {prod.images && prod.images.length > 0 && prod.images[0] ? (
                            <Card.Img variant="top" src={prod.images[0]} alt={prod.name || "Product Image"} style={{ height: '180px', objectFit: 'cover' }} />
                          ) : (
                            <Card.Img variant="top" src={yellowpagesPlaceholder} alt="No Product Image" style={{ height: '180px', objectFit: 'cover' }} />
                          )}
                          <Card.Body className="p-2">
                            <Card.Title className="small mb-1 fw-bold">{prod.name || "Unnamed Product"}</Card.Title>
                            {prod.description && <Card.Text className="small mb-1 text-muted">{prod.description.substring(0, 80)}{prod.description.length > 80 ? '...' : ''}</Card.Text>}
                            {prod.status && <Card.Text className="small mb-0">Status: {prod.status}</Card.Text>}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Alert variant="info">No products available for this company.</Alert>
                )}
              </Card>
            </Col>
          </Row>
        )}
        {activeTab === 'photo' && (
          <Row className="mb-4">
            <Col md={12}>
              <Card className="p-3 shadow-sm">
                <h4 className="mb-3">Photos Gallery</h4>
                {allImages.length > 0 ? (
                  <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                    {allImages.map((url, idx) => (
                      <Col key={`all-image-${idx}`}>
                        <Image src={url} alt={`Gallery Image ${idx+1}`} fluid rounded style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Alert variant="info">No photos available for this company.</Alert>
                )}
              </Card>
            </Col>
          </Row>
        )}
        {/* NEW: Reviews Tab Content */}
        {activeTab === 'reviews' && (
          <CompanyReviewsPage companyId={companyId} />
        )}
        <div className="text-center mt-5">
          <Link to="/directory"><Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>Back to Directory</Button></Link>
        </div>
      </Container>
    </Container>
  );
};

export default CompanyDetailPage; 