// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Image, Nav } from "react-bootstrap";
// import { getCompanyProfile } from "../../Services/authApi";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await getCompanyProfile();
//         if (response.success) setProfileData(response.data);
//         else setError(response.message || "Failed to load profile");
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /> Loading profile...</Container>;
//   if (error) return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>;
//   if (!profileData) return <Container className="my-5"><Alert variant="info">No profile data found.</Alert></Container>;

//   const tabs = [
//     { key: "about", label: "About" },
//     { key: "products", label: "Products" },
//     { key: "documents", label: "Documents" },
//     { key: "timings", label: "Business Timings" },
//     { key: "address", label: "Address" },
//   ];

//   return (
//     <Container className="my-5">
//       {/* Header */}
//       <Card className="shadow-lg rounded-4 border-0">
//         <div className="text-center p-5" style={{ backgroundColor: "#212529", color: "#fff" }}>
//           <Image
//             src={profileData.logo}
//             roundedCircle
//             style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #0d6efd" }}
//           />
//           <h2 className="mt-3">{profileData.name}</h2>
//           <p className="mb-0">{profileData.email}</p>
//           <p className="mb-0">{profileData.phone}</p>
//           {profileData.website && (
//             <p><a href={profileData.website} target="_blank" rel="noreferrer" className="text-white text-decoration-underline">{profileData.website}</a></p>
//           )}
//         </div>

//         {/* Navigation Tabs */}
//         <Nav variant="tabs" className="justify-content-between" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
//           {tabs.map((tab) => (
//             <Nav.Item key={tab.key} className="flex-fill text-center">
//               <Nav.Link eventKey={tab.key} className="fw-bold text-dark" style={{ width: "100%" }}>
//                 {tab.label}
//               </Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>

//         <Card.Body>
//           {/* ABOUT */}
//           {activeTab === "about" && (
//             <div>
//               <h4>About Company</h4>
//               <p>{profileData.description}</p>
//               <Row>
//                 <Col md={6}>
//                   <p><strong>Address:</strong> {profileData.address}</p>
//                   <p><strong>City:</strong> {profileData.city}</p>
//                   <p><strong>State:</strong> {profileData.state}</p>
//                   <p><strong>Country:</strong> {profileData.country}</p>
//                 </Col>
//                 <Col md={6}>
//                   <p><strong>GST Number:</strong> {profileData.gstNumber}</p>
//                   <p><strong>Aadhaar Number:</strong> {profileData.aadhaarNumber}</p>
//                   <p><strong>Category:</strong> {profileData.category?.name}</p>
//                   <p><strong>Company Type:</strong> {profileData.companyType}</p>
//                 </Col>
//               </Row>
//             </div>
//           )}

//           {/* PRODUCTS */}
//           {activeTab === "products" && (
//             <Row className="g-4">
//               {profileData.products?.map((p) => (
//                 <Col md={6} lg={4} key={p._id}>
//                   <Card className="h-100 shadow-sm">
//                     <Card.Img src={p.images?.[0]} style={{ height: "180px", objectFit: "cover" }} />
//                     <Card.Body>
//                       <h5 className="fw-bold">{p.name}</h5>
//                       <p>{p.description}</p>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           )}

//           {/* DOCUMENTS */}
//           {activeTab === "documents" && (
//             <Row className="g-3">
//               {profileData.aadhaarImage && (
//                 <Col md={3}>
//                   <a href={profileData.aadhaarImage} target="_blank" rel="noreferrer">
//                     <Image src={profileData.aadhaarImage} rounded fluid />
//                     <p className="text-center mt-1">Aadhaar</p>
//                   </a>
//                 </Col>
//               )}
//               {profileData.panImage && (
//                 <Col md={3}>
//                   <a href={profileData.panImage} target="_blank" rel="noreferrer">
//                     <Image src={profileData.panImage} rounded fluid />
//                     <p className="text-center mt-1">PAN</p>
//                   </a>
//                 </Col>
//               )}
//               {profileData.electricityBillImage && (
//                 <Col md={3}>
//                   <a href={profileData.electricityBillImage} target="_blank" rel="noreferrer">
//                     <Image src={profileData.electricityBillImage} rounded fluid />
//                     <p className="text-center mt-1">Electricity Bill</p>
//                   </a>
//                 </Col>
//               )}
//               {profileData.passportPhoto && (
//                 <Col md={3}>
//                   <a href={profileData.passportPhoto} target="_blank" rel="noreferrer">
//                     <Image src={profileData.passportPhoto} rounded fluid />
//                     <p className="text-center mt-1">Passport Photo</p>
//                   </a>
//                 </Col>
//               )}
//             </Row>
//           )}

//           {/* BUSINESS TIMINGS */}
//           {activeTab === "timings" && (
//             <ListGroup>
//               {Object.entries(profileData.businessTimings).map(([day, time], idx) => (
//                 <ListGroup.Item key={day} className={idx % 2 === 0 ? "bg-light" : ""}>
//                   <strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong>: {time.open} - {time.close}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}

//           {/* ADDRESS */}
//           {activeTab === "address" && (
//             <div>
//               <p><strong>Address:</strong> {profileData.address}</p>
//               <p><strong>City:</strong> {profileData.city}</p>
//               <p><strong>State:</strong> {profileData.state}</p>
//               <p><strong>Country:</strong> {profileData.country}</p>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;

// import React, { useEffect, useState } from "react";
// import { 
//   Container, Row, Col, Card, ListGroup, Spinner, Alert, Image, Nav, 
//   Modal, Button, Table // Modal और Table कंपोनेंट भी इंपोर्ट किया गया
// } from "react-bootstrap";
// import { getCompanyProfile } from "../../Services/authApi";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   // मोडल के लिए स्टेट्स
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState("");
//   const [modalImageAlt, setModalImageAlt] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getCompanyProfile();
//         if (response.success && response.data) {
//           setProfileData(response.data);
//         } else {
//           setError(response.message || "प्रोफ़ाइल डेटा लोड करने में विफल।");
//         }
//       } catch (err) {
//         console.error("प्रोफ़ाइल प्राप्त करने में त्रुटि:", err);
//         setError(err.message || "प्रोफ़ाइल डेटा प्राप्त करने में एक त्रुटि हुई।");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // मोडल खोलने के लिए हैंडलर
//   const handleImageClick = (imageUrl, imageAlt) => {
//     setModalImageUrl(imageUrl);
//     setModalImageAlt(imageAlt);
//     setShowImageModal(true);
//   };

//   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /> प्रोफ़ाइल लोड हो रही है...</Container>;
//   if (error) return <Container className="my-5"><Alert variant="danger"><strong>त्रुटि:</strong> {error}</Alert></Container>;
//   if (!profileData) return <Container className="my-5"><Alert variant="info">कोई प्रोफ़ाइल डेटा उपलब्ध नहीं है।</Alert></Container>;

//   const tabs = [
//     { key: "about", label: "अवलोकन" },
//     { key: "products", label: "उत्पाद" },
//     { key: "documents", label: "दस्तावेज़" },
//     { key: "timings", label: "व्यावसायिक समय" },
//     { key: "address", label: "पता" },
//   ];

//   // हेल्पर फ़ंक्शन जो कैमलकेस कुंजी को स्पेस वाले शब्दों में बदलता है
//   const formatKey = (key) => {
//     return key
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase())
//       .trim();
//   };

//   // नेस्टेड ऑब्जेक्ट्स जैसे category, approvedBy को रेंडर करने के लिए
//   const renderNestedObject = (obj) => {
//     if (!obj || Object.keys(obj).length === 0) return <span className="text-muted">N/A</span>;
//     const relevantFields = [];
//     if (obj.name) relevantFields.push(<span><strong>नाम:</strong> {obj.name}</span>);
//     if (obj.email) relevantFields.push(<span><strong>ईमेल:</strong> {obj.email}</span>);
//     if (obj.type) relevantFields.push(<span><strong>प्रकार:</strong> {obj.type}</span>);
//     if (obj.phone) relevantFields.push(<span><strong>फ़ोन:</strong> {obj.phone}</span>);
//     // आप यहां अन्य महत्वपूर्ण फ़ील्ड जोड़ सकते हैं
//     return (
//       <ListGroup variant="flush" className="my-1 border rounded">
//         {relevantFields.map((field, idx) => (
//           <ListGroup.Item key={idx} className="py-1 px-2 small">{field}</ListGroup.Item>
//         ))}
//       </ListGroup>
//     );
//   };


//   return (
//     <Container className="my-5">
//       {/* Header */}
//       <Card className="shadow-lg rounded-4 border-0">
//         <div className="text-center p-5" style={{ backgroundColor: "#0d2d62", color: "#fff" }}> {/* ब्लू हेडर कलर */}
//           <Image
//             src={profileData.logo || "https://via.placeholder.com/120"} // अगर लोगो नहीं है तो प्लेसहोल्डर
//             roundedCircle
//             className="mb-3"
//             style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #fff" }}
//           />
//           <h2 className="mt-2 mb-1">{profileData.name}</h2>
//           <p className="mb-0 fs-5">{profileData.email}</p>
//           <p className="mb-0 fs-5">{profileData.phone}</p>
//           {profileData.website && (
//             <p className="mt-2"><a href={profileData.website} target="_blank" rel="noreferrer" className="text-white text-decoration-underline fs-6">{profileData.website}</a></p>
//           )}
//         </div>

//         {/* Navigation Tabs */}
//         <Nav variant="tabs" className="justify-content-between profile-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
//           {tabs.map((tab) => (
//             <Nav.Item key={tab.key} className="flex-fill text-center">
//               <Nav.Link 
//                 eventKey={tab.key} 
//                 className={`fw-bold ${activeTab === tab.key ? 'text-white' : 'text-dark'}`} 
//                 style={{ 
//                   backgroundColor: activeTab === tab.key ? '#0d2d62' : '#f8f9fa', // सक्रिय टैब के लिए ब्लू
//                   borderColor: '#dee2e6',
//                   borderRadius: '0',
//                   borderBottom: activeTab === tab.key ? 'none' : '1px solid #dee2e6'
//                 }}
//               >
//                 {tab.label}
//               </Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>

//         <Card.Body className="p-4"> {/* टैब कंटेंट के लिए पैडिंग */}
//           {/* ABOUT - अवलोकन */}
//           {activeTab === "about" && (
//             <div>
//               <h4 className="mb-3 text-primary">कंपनी के बारे में</h4>
//               <p className="lead">{profileData.description || "विवरण उपलब्ध नहीं है।"}</p>
//               <hr />
//               <Row className="g-3">
//                 <Col md={6}>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item><strong>ईमेल:</strong> {profileData.email || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>फ़ोन:</strong> {profileData.phone || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>GST नंबर:</strong> {profileData.gstNumber || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>आधार नंबर:</strong> {profileData.aadhaarNumber || 'N/A'}</ListGroup.Item>
//                   </ListGroup>
//                 </Col>
//                 <Col md={6}>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item><strong>श्रेणी:</strong> {renderNestedObject(profileData.category)}</ListGroup.Item>
//                     <ListGroup.Item><strong>कंपनी प्रकार:</strong> {profileData.companyType || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>अनुमोदित:</strong> {profileData.isApproved ? 'हाँ' : 'नहीं'}</ListGroup.Item>
//                     <ListGroup.Item><strong>प्रीमियम:</strong> {profileData.isPremium ? 'हाँ' : 'नहीं'}</ListGroup.Item>
//                   </ListGroup>
//                 </Col>
//               </Row>
              
//               {profileData.socialLinks && profileData.socialLinks.length > 0 && (
//                 <div className="mt-4">
//                   <h5 className="mb-2 text-primary">सोशल लिंक्स:</h5>
//                   <div className="d-flex flex-wrap gap-2">
//                       {profileData.socialLinks.map((link, index) => (
//                           <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
//                               {link.includes('facebook') ? 'Facebook' :
//                                link.includes('twitter') ? 'X/Twitter' :
//                                link.includes('instagram') ? 'Instagram' :
//                                link.includes('youtube') ? 'Youtube' : 'Link'}
//                           </a>
//                       ))}
//                   </div>
//                 </div>
//               )}

//               {profileData.keywords && profileData.keywords.length > 0 && (
//                   <div className="mt-4">
//                       <h5 className="mb-2 text-primary">कीवर्ड्स:</h5>
//                       <div className="d-flex flex-wrap gap-2">
//                           {profileData.keywords.map((keyword, index) => (
//                               <span key={index} className="badge bg-secondary text-light p-2">{keyword}</span>
//                           ))}
//                       </div>
//                   </div>
//               )}
//             </div>
//           )}

//           {/* PRODUCTS - उत्पाद */}
//           {activeTab === "products" && (
//             <Row className="g-4">
//               {profileData.products && profileData.products.length > 0 ? (
//                 profileData.products.map((p) => (
//                   <Col md={6} lg={4} key={p._id}>
//                     <Card className="h-100 shadow-sm border-light">
//                       <Card.Img 
//                         src={p.images?.[0] || "https://via.placeholder.com/200x180"} 
//                         alt={p.name}
//                         style={{ height: "180px", objectFit: "cover" }} 
//                       />
//                       <Card.Body>
//                         <h5 className="fw-bold text-dark">{p.name || 'N/A'}</h5>
//                         <p className="text-muted small">{p.description || 'N/A'}</p>
//                         <p className="small mb-0"><strong>श्रेणी:</strong> {p.category?.name || 'N/A'}</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <Col><Alert variant="info">कोई उत्पाद उपलब्ध नहीं है।</Alert></Col>
//               )}
//             </Row>
//           )}

//           {/* DOCUMENTS - दस्तावेज़ */}
//           {activeTab === "documents" && (
//             <Row className="g-3 justify-content-center">
//               {[
//                 { src: profileData.aadhaarImage, alt: "आधार कार्ड" },
//                 { src: profileData.panImage, alt: "पैन कार्ड" },
//                 { src: profileData.electricityBillImage, alt: "बिजली बिल" },
//                 { src: profileData.passportPhoto, alt: "पासपोर्ट फोटो" },
//               ].map((doc, index) => (
//                 doc.src && (
//                   <Col xs={6} md={4} lg={3} key={index} className="text-center">
//                     <Card className="h-100 shadow-sm">
//                       <Card.Body className="p-2">
//                         <Image 
//                           src={doc.src} 
//                           alt={doc.alt} 
//                           fluid 
//                           rounded 
//                           style={{ maxHeight: '150px', objectFit: 'contain', cursor: 'pointer' }}
//                           onClick={() => handleImageClick(doc.src, doc.alt)}
//                         />
//                         <p className="mt-2 mb-0 fw-bold">{doc.alt}</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 )
//               ))}
//               {/* यदि कोई दस्तावेज़ नहीं हैं */}
//               {!profileData.aadhaarImage && !profileData.panImage && !profileData.electricityBillImage && !profileData.passportPhoto && (
//                   <Col><Alert variant="info" className="text-center">कोई दस्तावेज़ उपलब्ध नहीं है।</Alert></Col>
//               )}
//             </Row>
//           )}

//           {/* BUSINESS TIMINGS - व्यावसायिक समय */}
//           {activeTab === "timings" && (
//             <div>
//               <h4 className="mb-3 text-primary">व्यावसायिक समय</h4>
//               {profileData.businessTimings && Object.keys(profileData.businessTimings).length > 0 ? (
//                 <Table striped bordered hover responsive className="mt-3">
//                   <thead>
//                     <tr className="bg-light">
//                       <th>दिन</th>
//                       <th>खुलने का समय</th>
//                       <th>बंद होने का समय</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(profileData.businessTimings).map(([day, time], idx) => (
//                       <tr key={day}>
//                         <td><strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong></td>
//                         <td>{time.open || 'N/A'}</td>
//                         <td>{time.close || 'N/A'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <Alert variant="info">कोई व्यावसायिक समय उपलब्ध नहीं है।</Alert>
//               )}
//             </div>
//           )}

//           {/* ADDRESS - पता */}
//           {activeTab === "address" && (
//             <div>
//               <h4 className="mb-3 text-primary">कंपनी का पता</h4>
//               <ListGroup variant="flush">
//                 <ListGroup.Item><strong>पता:</strong> {profileData.address || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>शहर:</strong> {profileData.city || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>राज्य:</strong> {profileData.state || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>देश:</strong> {profileData.country || 'N/A'}</ListGroup.Item>
//               </ListGroup>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Image Modal */}
//       <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{modalImageAlt}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           <Image src={modalImageUrl} fluid alt={modalImageAlt} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowImageModal(false)}>
//             बंद करें
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from "react";
// import { 
//   Container, Row, Col, Card, ListGroup, Spinner, Alert, Image, Nav, 
//   Modal, Button, Table 
// } from "react-bootstrap";
// import { getCompanyProfile } from "../../Services/authApi";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState("");
//   const [modalImageAlt, setModalImageAlt] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getCompanyProfile();
//         if (response.success && response.data) {
//           setProfileData(response.data);
//         } else {
//           setError(response.message || "Failed to load profile data.");
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError(err.message || "An error occurred while fetching profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleImageClick = (imageUrl, imageAlt) => {
//     setModalImageUrl(imageUrl);
//     setModalImageAlt(imageAlt);
//     setShowImageModal(true);
//   };

//   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /> Loading profile...</Container>;
//   if (error) return <Container className="my-5"><Alert variant="danger"><strong>Error:</strong> {error}</Alert></Container>;
//   if (!profileData) return <Container className="my-5"><Alert variant="info">No profile data available.</Alert></Container>;

//   const tabs = [
//     { key: "about", label: "About" },
//     { key: "products", label: "Products" },
//     { key: "documents", label: "Documents" },
//     { key: "timings", label: "Business Timings" },
//     { key: "address", label: "Address" },
//   ];

//   const formatKey = (key) => {
//     return key
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase())
//       .trim();
//   };

//   const renderNestedObject = (obj) => {
//     if (!obj || Object.keys(obj).length === 0) return <span className="text-muted">N/A</span>;
//     const relevantFields = [];
//     if (obj.name) relevantFields.push(<span><strong>Name:</strong> {obj.name}</span>);
//     if (obj.email) relevantFields.push(<span><strong>Email:</strong> {obj.email}</span>);
//     if (obj.type) relevantFields.push(<span><strong>Type:</strong> {obj.type}</span>);
//     if (obj.phone) relevantFields.push(<span><strong>Phone:</strong> {obj.phone}</span>);
//     return (
//       <ListGroup variant="flush" className="my-1 border rounded">
//         {relevantFields.map((field, idx) => (
//           <ListGroup.Item key={idx} className="py-1 px-2 small">{field}</ListGroup.Item>
//         ))}
//       </ListGroup>
//     );
//   };

//   return (
//     <Container className="my-5">
//       {/* Header */}
//       <Card className="shadow-lg rounded-4 border-0">
//         <div className="text-center p-5" style={{ backgroundColor: "#0d2d62", color: "#fff" }}>
//           <Image
//             src={profileData.logo || "https://via.placeholder.com/120"} 
//             roundedCircle
//             className="mb-3"
//             style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #fff" }}
//           />
//           <h2 className="mt-2 mb-1">{profileData.name}</h2>
//           <p className="mb-0 fs-5">{profileData.email}</p>
//           <p className="mb-0 fs-5">{profileData.phone}</p>
//           {profileData.website && (
//             <p className="mt-2"><a href={profileData.website} target="_blank" rel="noreferrer" className="text-white text-decoration-underline fs-6">{profileData.website}</a></p>
//           )}
//         </div>

//         {/* Navigation Tabs */}
//         <Nav variant="tabs" className="justify-content-between profile-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
//           {tabs.map((tab) => (
//             <Nav.Item key={tab.key} className="flex-fill text-center">
//               <Nav.Link 
//                 eventKey={tab.key} 
//                 className={`fw-bold ${activeTab === tab.key ? 'text-white' : 'text-dark'}`} 
//                 style={{ 
//                   backgroundColor: activeTab === tab.key ? '#0d2d62' : '#f8f9fa',
//                   borderColor: '#dee2e6',
//                   borderRadius: '0',
//                   borderBottom: activeTab === tab.key ? 'none' : '1px solid #dee2e6'
//                 }}
//               >
//                 {tab.label}
//               </Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>

//         <Card.Body className="p-4">
//           {/* ABOUT */}
//           {activeTab === "about" && (
//             <div>
//               <h4 className="mb-3 text-primary">About Company</h4>
//               <p className="lead">{profileData.description || "No description available."}</p>
//               <hr />
//               <Row className="g-3">
//                 <Col md={6}>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item><strong>Email:</strong> {profileData.email || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Phone:</strong> {profileData.phone || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>GST Number:</strong> {profileData.gstNumber || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Aadhaar Number:</strong> {profileData.aadhaarNumber || 'N/A'}</ListGroup.Item>
//                   </ListGroup>
//                 </Col>
//                 <Col md={6}>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item><strong>Category:</strong> {renderNestedObject(profileData.category)}</ListGroup.Item>
//                     <ListGroup.Item><strong>Company Type:</strong> {profileData.companyType || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Approved:</strong> {profileData.isApproved ? 'Yes' : 'No'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Premium:</strong> {profileData.isPremium ? 'Yes' : 'No'}</ListGroup.Item>
//                   </ListGroup>
//                 </Col>
//               </Row>
              
//               {profileData.socialLinks && profileData.socialLinks.length > 0 && (
//                 <div className="mt-4">
//                   <h5 className="mb-2 text-primary">Social Links:</h5>
//                   <div className="d-flex flex-wrap gap-2">
//                       {profileData.socialLinks.map((link, index) => (
//                           <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
//                               {link.includes('facebook') ? 'Facebook' :
//                                link.includes('twitter') ? 'Twitter' :
//                                link.includes('instagram') ? 'Instagram' :
//                                link.includes('youtube') ? 'YouTube' : 'Link'}
//                           </a>
//                       ))}
//                   </div>
//                 </div>
//               )}

//               {profileData.keywords && profileData.keywords.length > 0 && (
//                   <div className="mt-4">
//                       <h5 className="mb-2 text-primary">Keywords:</h5>
//                       <div className="d-flex flex-wrap gap-2">
//                           {profileData.keywords.map((keyword, index) => (
//                               <span key={index} className="badge bg-secondary text-light p-2">{keyword}</span>
//                           ))}
//                       </div>
//                   </div>
//               )}
//             </div>
//           )}

//           {/* PRODUCTS */}
//           {activeTab === "products" && (
//             <Row className="g-4">
//               {profileData.products && profileData.products.length > 0 ? (
//                 profileData.products.map((p) => (
//                   <Col md={6} lg={4} key={p._id}>
//                     <Card className="h-100 shadow-sm border-light">
//                       <Card.Img 
//                         src={p.images?.[0] || "https://via.placeholder.com/200x180"} 
//                         alt={p.name}
//                         style={{ height: "180px", objectFit: "cover" }} 
//                       />
//                       <Card.Body>
//                         <h5 className="fw-bold text-dark">{p.name || 'N/A'}</h5>
//                         <p className="text-muted small">{p.description || 'N/A'}</p>
//                         <p className="small mb-0"><strong>Category:</strong> {p.category?.name || 'N/A'}</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <Col><Alert variant="info">No products available.</Alert></Col>
//               )}
//             </Row>
//           )}

//           {/* DOCUMENTS */}
//           {activeTab === "documents" && (
//             <Row className="g-3 justify-content-center">
//               {[ 
//                 { src: profileData.aadhaarImage, alt: "Aadhaar Card" },
//                 { src: profileData.panImage, alt: "PAN Card" },
//                 { src: profileData.electricityBillImage, alt: "Electricity Bill" },
//                 { src: profileData.passportPhoto, alt: "Passport Photo" },
//               ].map((doc, index) => (
//                 doc.src && (
//                   <Col xs={6} md={4} lg={3} key={index} className="text-center">
//                     <Card className="h-100 shadow-sm">
//                       <Card.Body className="p-2">
//                         <Image 
//                           src={doc.src} 
//                           alt={doc.alt} 
//                           fluid 
//                           rounded 
//                           style={{ maxHeight: '150px', objectFit: 'contain', cursor: 'pointer' }}
//                           onClick={() => handleImageClick(doc.src, doc.alt)}
//                         />
//                         <p className="mt-2 mb-0 fw-bold">{doc.alt}</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 )
//               ))}
//               {!profileData.aadhaarImage && !profileData.panImage && !profileData.electricityBillImage && !profileData.passportPhoto && (
//                   <Col><Alert variant="info" className="text-center">No documents available.</Alert></Col>
//               )}
//             </Row>
//           )}

//           {/* BUSINESS TIMINGS */}
//           {activeTab === "timings" && (
//             <div>
//               <h4 className="mb-3 text-primary">Business Timings</h4>
//               {profileData.businessTimings && Object.keys(profileData.businessTimings).length > 0 ? (
//                 <Table striped bordered hover responsive className="mt-3">
//                   <thead>
//                     <tr className="bg-light">
//                       <th>Day</th>
//                       <th>Opening Time</th>
//                       <th>Closing Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(profileData.businessTimings).map(([day, time], idx) => (
//                       <tr key={day}>
//                         <td><strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong></td>
//                         <td>{time.open || 'N/A'}</td>
//                         <td>{time.close || 'N/A'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <Alert variant="info">No business timings available.</Alert>
//               )}
//             </div>
//           )}

//           {/* ADDRESS */}
//           {activeTab === "address" && (
//             <div>
//               <h4 className="mb-3 text-primary">Company Address</h4>
//               <ListGroup variant="flush">
//                 <ListGroup.Item><strong>Address:</strong> {profileData.address || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>City:</strong> {profileData.city || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>State:</strong> {profileData.state || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>Country:</strong> {profileData.country || 'N/A'}</ListGroup.Item>
//               </ListGroup>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Image Modal */}
//       <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{modalImageAlt}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           <Image src={modalImageUrl} fluid alt={modalImageAlt} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowImageModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from "react";
// import { 
//   Container, Row, Col, Card, ListGroup, Spinner, Alert, Image, Nav, 
//   Modal, Button, Table 
// } from "react-bootstrap";
// import { getCompanyProfile } from "../../Services/authApi";

// const Profile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("about");

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [modalImageUrl, setModalImageUrl] = useState("");
//   const [modalImageAlt, setModalImageAlt] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getCompanyProfile();
//         if (response.success && response.data) {
//           setProfileData(response.data);
//         } else {
//           setError(response.message || "Failed to load profile data.");
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError(err.message || "An error occurred while fetching profile data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleImageClick = (imageUrl, imageAlt) => {
//     setModalImageUrl(imageUrl);
//     setModalImageAlt(imageAlt);
//     setShowImageModal(true);
//   };

//   // Placeholder for update button click handler
//   const handleUpdateProfile = () => {
//     alert("Update Profile button clicked!");
//     // You would typically navigate to an edit page or open a form here
//   };

//   if (loading) return <Container className="text-center my-5"><Spinner animation="border" /> Loading profile...</Container>;
//   if (error) return <Container className="my-5"><Alert variant="danger"><strong>Error:</strong> {error}</Alert></Container>;
//   if (!profileData) return <Container className="my-5"><Alert variant="info">No profile data available.</Alert></Container>;

//   const tabs = [
//     { key: "about", label: "About" },
//     { key: "products", label: "Products" },
//     { key: "documents", label: "Documents" },
//     { key: "timings", label: "Business Timings" },
//     { key: "address", label: "Address" },
//   ];

//   const formatKey = (key) => {
//     return key
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase())
//       .trim();
//   };

//   const renderNestedObject = (obj) => {
//     if (!obj || Object.keys(obj).length === 0) return <span className="text-muted">N/A</span>;
//     const relevantFields = [];
//     if (obj.name) relevantFields.push(<span><strong>Name:</strong> {obj.name}</span>);
//     if (obj.email) relevantFields.push(<span><strong>Email:</strong> {obj.email}</span>);
//     if (obj.type) relevantFields.push(<span><strong>Type:</strong> {obj.type}</span>);
//     if (obj.phone) relevantFields.push(<span><strong>Phone:</strong> {obj.phone}</span>);
//     return (
//       <ListGroup variant="flush" className="my-1 border rounded">
//         {relevantFields.map((field, idx) => (
//           <ListGroup.Item key={idx} className="py-1 px-2 small">{field}</ListGroup.Item>
//         ))}
//       </ListGroup>
//     );
//   };

//   return (
//     <Container className="my-5">
//       {/* Header */}
//       <Card className="shadow-lg rounded-4 border-0">
//         <div className="text-center p-5" style={{ backgroundColor: "#0d2d62", color: "#fff" }}>
//           <Image
//             src={profileData.logo || "https://via.placeholder.com/120"} 
//             roundedCircle
//             className="mb-3"
//             style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #fff" }}
//           />
//           <h2 className="mt-2 mb-1">{profileData.name}</h2>
//           <p className="mb-0 fs-5">{profileData.email}</p>
//           <p className="mb-0 fs-5">{profileData.phone}</p>
//           {profileData.website && (
//             <p className="mt-2"><a href={profileData.website} target="_blank" rel="noreferrer" className="text-white text-decoration-underline fs-6">{profileData.website}</a></p>
//           )}
//           {/* Update Button Added Here */}
//           <Button 
//             variant="outline-light" 
//             className="mt-3 px-4 py-2"
//             onClick={handleUpdateProfile}
//           >
//             Update Profile
//           </Button>
//         </div>

//         {/* Navigation Tabs */}
//         <Nav variant="tabs" className="justify-content-between profile-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
//           {tabs.map((tab) => (
//             <Nav.Item key={tab.key} className="flex-fill text-center">
//               <Nav.Link 
//                 eventKey={tab.key} 
//                 className={`fw-bold ${activeTab === tab.key ? 'text-white' : 'text-dark'}`} 
//                 style={{ 
//                   backgroundColor: activeTab === tab.key ? '#0d2d62' : '#f8f9fa',
//                   borderColor: '#dee2e6',
//                   borderRadius: '0',
//                   borderBottom: activeTab === tab.key ? 'none' : '1px solid #dee2e6'
//                 }}
//               >
//                 {tab.label}
//               </Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>

//         <Card.Body className="p-4">
//           {/* ABOUT */}
//           {activeTab === "about" && (
//             <div>
//               <h4 className="mb-3 text-primary">About Company</h4>
//               <p className="lead">{profileData.description || "No description available."}</p>
//               <hr />
//               <Row className="g-3">
//                 <Col md={6}>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item><strong>Email:</strong> {profileData.email || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Phone:</strong> {profileData.phone || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>GST Number:</strong> {profileData.gstNumber || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Aadhaar Number:</strong> {profileData.aadhaarNumber || 'N/A'}</ListGroup.Item>
//                   </ListGroup>
//                 </Col>
//                 <Col md={6}>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item><strong>Category:</strong> {renderNestedObject(profileData.category)}</ListGroup.Item>
//                     <ListGroup.Item><strong>Company Type:</strong> {profileData.companyType || 'N/A'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Approved:</strong> {profileData.isApproved ? 'Yes' : 'No'}</ListGroup.Item>
//                     <ListGroup.Item><strong>Premium:</strong> {profileData.isPremium ? 'Yes' : 'No'}</ListGroup.Item>
//                   </ListGroup>
//                 </Col>
//               </Row>
              
//               {profileData.socialLinks && profileData.socialLinks.length > 0 && (
//                 <div className="mt-4">
//                   <h5 className="mb-2 text-primary">Social Links:</h5>
//                   <div className="d-flex flex-wrap gap-2">
//                       {profileData.socialLinks.map((link, index) => (
//                           <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
//                               {link.includes('facebook') ? 'Facebook' :
//                                link.includes('twitter') ? 'Twitter' :
//                                link.includes('instagram') ? 'Instagram' :
//                                link.includes('youtube') ? 'YouTube' : 'Link'}
//                           </a>
//                       ))}
//                   </div>
//                 </div>
//               )}

//               {profileData.keywords && profileData.keywords.length > 0 && (
//                   <div className="mt-4">
//                       <h5 className="mb-2 text-primary">Keywords:</h5>
//                       <div className="d-flex flex-wrap gap-2">
//                           {profileData.keywords.map((keyword, index) => (
//                               <span key={index} className="badge bg-secondary text-light p-2">{keyword}</span>
//                           ))}
//                       </div>
//                   </div>
//               )}
//             </div>
//           )}

//           {/* PRODUCTS */}
//           {activeTab === "products" && (
//             <Row className="g-4">
//               {profileData.products && profileData.products.length > 0 ? (
//                 profileData.products.map((p) => (
//                   <Col md={6} lg={4} key={p._id}>
//                     <Card className="h-100 shadow-sm border-light">
//                       <Card.Img 
//                         src={p.images?.[0] || "https://via.placeholder.com/200x180"} 
//                         alt={p.name}
//                         style={{ height: "180px", objectFit: "cover" }} 
//                       />
//                       <Card.Body>
//                         <h5 className="fw-bold text-dark">{p.name || 'N/A'}</h5>
//                         <p className="text-muted small">{p.description || 'N/A'}</p>
//                         <p className="small mb-0"><strong>Category:</strong> {p.category?.name || 'N/A'}</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <Col><Alert variant="info">No products available.</Alert></Col>
//               )}
//             </Row>
//           )}

//           {/* DOCUMENTS */}
//           {activeTab === "documents" && (
//             <Row className="g-3 justify-content-center">
//               {[ 
//                 { src: profileData.aadhaarImage, alt: "Aadhaar Card" },
//                 { src: profileData.panImage, alt: "PAN Card" },
//                 { src: profileData.electricityBillImage, alt: "Electricity Bill" },
//                 { src: profileData.passportPhoto, alt: "Passport Photo" },
//               ].map((doc, index) => (
//                 doc.src && (
//                   <Col xs={6} md={4} lg={3} key={index} className="text-center">
//                     <Card className="h-100 shadow-sm">
//                       <Card.Body className="p-2">
//                         <Image 
//                           src={doc.src} 
//                           alt={doc.alt} 
//                           fluid 
//                           rounded 
//                           style={{ maxHeight: '150px', objectFit: 'contain', cursor: 'pointer' }}
//                           onClick={() => handleImageClick(doc.src, doc.alt)}
//                         />
//                         <p className="mt-2 mb-0 fw-bold">{doc.alt}</p>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 )
//               ))}
//               {!profileData.aadhaarImage && !profileData.panImage && !profileData.electricityBillImage && !profileData.passportPhoto && (
//                   <Col><Alert variant="info" className="text-center">No documents available.</Alert></Col>
//               )}
//             </Row>
//           )}

//           {/* BUSINESS TIMINGS */}
//           {activeTab === "timings" && (
//             <div>
//               <h4 className="mb-3 text-primary">Business Timings</h4>
//               {profileData.businessTimings && Object.keys(profileData.businessTimings).length > 0 ? (
//                 <Table striped bordered hover responsive className="mt-3">
//                   <thead>
//                     <tr className="bg-light">
//                       <th>Day</th>
//                       <th>Opening Time</th>
//                       <th>Closing Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(profileData.businessTimings).map(([day, time], idx) => (
//                       <tr key={day}>
//                         <td><strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong></td>
//                         <td>{time.open || 'N/A'}</td>
//                         <td>{time.close || 'N/A'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <Alert variant="info">No business timings available.</Alert>
//               )}
//             </div>
//           )}

//           {/* ADDRESS */}
//           {activeTab === "address" && (
//             <div>
//               <h4 className="mb-3 text-primary">Company Address</h4>
//               <ListGroup variant="flush">
//                 <ListGroup.Item><strong>Address:</strong> {profileData.address || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>City:</strong> {profileData.city || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>State:</strong> {profileData.state || 'N/A'}</ListGroup.Item>
//                 <ListGroup.Item><strong>Country:</strong> {profileData.country || 'N/A'}</ListGroup.Item>
//               </ListGroup>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Image Modal */}
//       <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{modalImageAlt}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           <Image src={modalImageUrl} fluid alt={modalImageAlt} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowImageModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Profile;



import React, { useEffect, useState, useCallback } from "react"; // useCallback जोड़ा गया है
import {
  Container, Row, Col, Card, ListGroup, Spinner, Alert, Image, Nav,
  Modal, Button, Table
} from "react-bootstrap";
import { getCompanyProfile } from "../Services/authApi"; // सुनिश्चित करें कि यह सही पाथ है
import UpdateProfileForm from "./UpdateProfileForm"; // नया कंपोनेंट आयात करें

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  // नया स्टेट: अपडेट फॉर्म दिखाने या छिपाने के लिए
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // प्रोफाइल डेटा फेच करने के लिए एक फंक्शन बनाएं, ताकि इसे री-यूज़ किया जा सके
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCompanyProfile();
      if (response.success && response.data) {
        setProfileData(response.data);
      } else {
        setError(response.message || "Failed to load profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message || "An error occurred while fetching profile data.");
    } finally {
      setLoading(false);
    }
  }, []); // खाली डिपेंडेंसी एरे का मतलब यह केवल एक बार बनेगा

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); // fetchProfile को डिपेंडेंसी के रूप में पास करें

  const handleImageClick = (imageUrl, imageAlt) => {
    setModalImageUrl(imageUrl);
    setModalImageAlt(imageAlt);
    setShowImageModal(true);
  };

  const handleUpdateProfileClick = () => {
    setShowUpdateForm(true); // अपडेट फॉर्म दिखाएं
  };

  const handleUpdateSuccess = (updatedData) => {
    setShowUpdateForm(false); // फॉर्म छिपाएं
    fetchProfile(); // प्रोफाइल डेटा को री-फेच करें ताकि अपडेटेड जानकारी दिखे
  };

  const handleUpdateCancel = () => {
    setShowUpdateForm(false); // फॉर्म छिपाएं
  };


  if (loading) return <Container className="text-center my-5"><Spinner animation="border" /> Loading profile...</Container>;
  if (error) return <Container className="my-5"><Alert variant="danger"><strong>Error:</strong> {error}</Alert></Container>;
  if (!profileData) return <Container className="my-5"><Alert variant="info">No profile data available.</Alert></Container>;

  // अगर अपडेट फॉर्म दिखाना है, तो उसे रेंडर करें
  if (showUpdateForm) {
    return (
      <UpdateProfileForm
        currentProfileData={profileData}
        onUpdateSuccess={handleUpdateSuccess}
        onCancel={handleUpdateCancel}
      />
    );
  }

  // बाकी प्रोफाइल डिस्प्ले लॉजिक (जब showUpdateForm false हो)
  const tabs = [
    { key: "about", label: "About" },
    { key: "products", label: "Products" },
    { key: "documents", label: "Documents" },
    { key: "timings", label: "Business Timings" },
    { key: "address", label: "Address" },
  ];

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const renderNestedObject = (obj) => {
    if (!obj || Object.keys(obj).length === 0) return <span className="text-muted">N/A</span>;
    const relevantFields = [];
    if (obj.name) relevantFields.push(<span><strong>Name:</strong> {obj.name}</span>);
    if (obj.email) relevantFields.push(<span><strong>Email:</strong> {obj.email}</span>);
    if (obj.type) relevantFields.push(<span><strong>Type:</strong> {obj.type}</span>);
    if (obj.phone) relevantFields.push(<span><strong>Phone:</strong> {obj.phone}</span>);
    return (
      <ListGroup variant="flush" className="my-1 border rounded">
        {relevantFields.map((field, idx) => (
          <ListGroup.Item key={idx} className="py-1 px-2 small">{field}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <Container className="my-5">
      {/* Header */}
      <Card className="shadow-lg rounded-4 border-0">
        <div className="text-center p-5" style={{ backgroundColor: "#0d2d62", color: "#fff" }}>
          <Image
            src={profileData.logo || "https://via.placeholder.com/120"}
            roundedCircle
            className="mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #fff" }}
          />
          <h2 className="mt-2 mb-1">{profileData.name}</h2>
          <p className="mb-0 fs-5">{profileData.email}</p>
          <p className="mb-0 fs-5">{profileData.phone}</p>
          {profileData.website && (
            <p className="mt-2"><a href={profileData.website} target="_blank" rel="noreferrer" className="text-white text-decoration-underline fs-6">{profileData.website}</a></p>
          )}
          {/* Update Button */}
          <Button
            variant="outline-light"
            className="mt-3 px-4 py-2 fw-bold"
            onClick={handleUpdateProfileClick} // यह अब नया हैंडलर कॉल करेगा
            style={{ borderRadius: '25px', letterSpacing: '1px', textTransform: 'uppercase' }}
          >
            Update Profile
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Nav variant="tabs" className="justify-content-between profile-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          {tabs.map((tab) => (
            <Nav.Item key={tab.key} className="flex-fill text-center">
              <Nav.Link
                eventKey={tab.key}
                className={`fw-bold ${activeTab === tab.key ? 'text-white' : 'text-dark'}`}
                style={{
                  backgroundColor: activeTab === tab.key ? '#0d2d62' : '#f8f9fa',
                  borderColor: '#dee2e6',
                  borderRadius: '0',
                  borderBottom: activeTab === tab.key ? 'none' : '1px solid #dee2e6'
                }}
              >
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Card.Body className="p-4">
          {/* ABOUT */}
          {activeTab === "about" && (
            <div>
              <h4 className="mb-3 text-primary">About Company</h4>
              <p className="lead">{profileData.description || "No description available."}</p>
              <hr />
              <Row className="g-3">
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Email:</strong> {profileData.email || 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>Phone:</strong> {profileData.phone || 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>GST Number:</strong> {profileData.gstNumber || 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>Aadhaar Number:</strong> {profileData.aadhaarNumber || 'N/A'}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Category:</strong> {renderNestedObject(profileData.category)}</ListGroup.Item>
                    <ListGroup.Item><strong>Company Type:</strong> {profileData.companyType || 'N/A'}</ListGroup.Item>
                    <ListGroup.Item><strong>Approved:</strong> {profileData.isApproved ? 'Yes' : 'No'}</ListGroup.Item>
                    <ListGroup.Item><strong>Premium:</strong> {profileData.isPremium ? 'Yes' : 'No'}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>

              {profileData.socialLinks && profileData.socialLinks.length > 0 && (
                <div className="mt-4">
                  <h5 className="mb-2 text-primary">Social Links:</h5>
                  <div className="d-flex flex-wrap gap-2">
                      {profileData.socialLinks.map((link, index) => (
                          <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                              {link.includes('facebook') ? 'Facebook' :
                               link.includes('twitter') ? 'Twitter' :
                               link.includes('instagram') ? 'Instagram' :
                               link.includes('youtube') ? 'YouTube' : 'Link'}
                          </a>
                      ))}
                  </div>
                </div>
              )}

              {profileData.keywords && profileData.keywords.length > 0 && (
                  <div className="mt-4">
                      <h5 className="mb-2 text-primary">Keywords:</h5>
                      <div className="d-flex flex-wrap gap-2">
                          {profileData.keywords.map((keyword, index) => (
                              <span key={index} className="badge bg-secondary text-light p-2">{keyword}</span>
                          ))}
                      </div>
                  </div>
              )}
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === "products" && (
            <Row className="g-4">
              {profileData.products && profileData.products.length > 0 ? (
                profileData.products.map((p) => (
                  <Col md={6} lg={4} key={p._id}>
                    <Card className="h-100 shadow-sm border-light">
                      <Card.Img
                        src={p.images?.[0] || "https://via.placeholder.com/200x180"}
                        alt={p.name}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <h5 className="fw-bold text-dark">{p.name || 'N/A'}</h5>
                        <p className="text-muted small">{p.description || 'N/A'}</p>
                        <p className="small mb-0"><strong>Category:</strong> {p.category?.name || 'N/A'}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col><Alert variant="info">No products available.</Alert></Col>
              )}
            </Row>
          )}

          {/* DOCUMENTS */}
          {activeTab === "documents" && (
            <Row className="g-3 justify-content-center">
              {[
                { src: profileData.aadhaarImage, alt: "Aadhaar Card" },
                { src: profileData.panImage, alt: "PAN Card" },
                { src: profileData.electricityBillImage, alt: "Electricity Bill" },
                { src: profileData.passportPhoto, alt: "Passport Photo" },
              ].map((doc, index) => (
                doc.src && (
                  <Col xs={6} md={4} lg={3} key={index} className="text-center">
                    <Card className="h-100 shadow-sm">
                      <Card.Body className="p-2">
                        <Image
                          src={doc.src}
                          alt={doc.alt}
                          fluid
                          rounded
                          style={{ maxHeight: '150px', objectFit: 'contain', cursor: 'pointer' }}
                          onClick={() => handleImageClick(doc.src, doc.alt)}
                        />
                        <p className="mt-2 mb-0 fw-bold">{doc.alt}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              ))}
              {!profileData.aadhaarImage && !profileData.panImage && !profileData.electricityBillImage && !profileData.passportPhoto && (
                  <Col><Alert variant="info" className="text-center">No documents available.</Alert></Col>
              )}
            </Row>
          )}

          {/* BUSINESS TIMINGS */}
          {activeTab === "timings" && (
            <div>
              <h4 className="mb-3 text-primary">Business Timings</h4>
              {profileData.businessTimings && Object.keys(profileData.businessTimings).length > 0 ? (
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr className="bg-light">
                      <th>Day</th>
                      <th>Opening Time</th>
                      <th>Closing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(profileData.businessTimings).map(([day, time], idx) => (
                      <tr key={day}>
                        <td><strong>{day.charAt(0).toUpperCase() + day.slice(1)}</strong></td>
                        <td>{time.open || 'N/A'}</td>
                        <td>{time.close || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No business timings available.</Alert>
              )}
            </div>
          )}

          {/* ADDRESS */}
          {activeTab === "address" && (
            <div>
              <h4 className="mb-3 text-primary">Company Address</h4>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Address:</strong> {profileData.address || 'N/A'}</ListGroup.Item>
                <ListGroup.Item><strong>City:</strong> {profileData.city || 'N/A'}</ListGroup.Item>
                <ListGroup.Item><strong>State:</strong> {profileData.state || 'N/A'}</ListGroup.Item>
                <ListGroup.Item><strong>Country:</strong> {profileData.country || 'N/A'}</ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalImageAlt}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image src={modalImageUrl} fluid alt={modalImageAlt} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;


