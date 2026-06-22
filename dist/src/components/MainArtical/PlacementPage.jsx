// src/pages/PlacementPage.jsx

// import React from 'react';
// import { Container, Row, Col, Card, Button, Image, InputGroup, Form } from 'react-bootstrap';

// // आइकॉन्स इम्पोर्ट करें
// import { FaBuilding, FaMapMarkerAlt, FaStar, FaPhoneAlt } from 'react-icons/fa';

// // इमेज इम्पोर्ट करें (कृपया अपने सही पाथ यहाँ दें)
// import bannerBg from '../../assets/banner-bg.jpg';
// import consultantImg from '../../assets/meera-placement.png';

// // ==========================================================
// // 1. लेफ्ट कॉलम का कार्ड (Consultant Listing)
// // ==========================================================
// const ConsultantCard = ({ image, title, description }) => (
//     <Card className="mb-4 border-0 shadow-sm">
//         <Row className="g-0">
//             <Col md={3} className="d-flex align-items-center justify-content-center p-2">
//                 <Image src={image} fluid rounded />
//             </Col>
//             <Col md={9}>
//                 <Card.Body>
//                     <Card.Title as="h5" className="fw-bold" style={{ color: '#d32f2f' }}>{title}</Card.Title>
//                     <Card.Text className="small text-muted" style={{ lineHeight: 1.6 }}>
//                         {description}
//                     </Card.Text>
//                 </Card.Body>a
//             </Col>
//         </Row>
//     </Card>
// );

// // ==========================================================
// // 2. राइट कॉलम का कार्ड (Company Details)
// // ==========================================================
// const CompanyCard = ({ name, address, rating, reviews }) => (
//     <Card className="mb-4 shadow-sm" style={{ borderLeft: '4px solid #d32f2f' }}>
//         <Card.Body className="p-3">
//             <h6 className="fw-bold d-flex align-items-center mb-2" style={{ fontSize: '0.9rem' }}>
//                 <FaBuilding className="me-2 text-muted" /> {name}
//             </h6>
//             <p className="small text-muted d-flex align-items-start mb-2">
//                 <FaMapMarkerAlt className="me-2 mt-1 text-danger flex-shrink-0" /> {address}
//             </p>
//             <div className="d-flex align-items-center mb-3">
//                 <div className="text-white me-2 px-2 py-1 d-flex align-items-center" style={{ backgroundColor: '#2e7d32', borderRadius: '4px', fontSize: '0.8rem' }}>
//                     <FaStar className="me-1" size={12} /> {rating}
//                 </div>
//                 <span className="text-muted small">{reviews} Reviews</span>
//             </div>
//             <div className="d-flex gap-2">
//                 <Button variant="danger" size="sm" className="flex-fill">Get Quote</Button>
//                 <Button variant="light" size="sm" className="flex-fill border d-flex justify-content-center align-items-center">
//                     <FaPhoneAlt size={12} className="me-2" /> Contact
//                 </Button>
//             </div>
//         </Card.Body>
//     </Card>
// );

// // ==========================================================
// // 3. पूरा पेज बनाने वाला मुख्य कंपोनेंट
// // ==========================================================
// const PlacementPage = () => {
    
//     const listings = Array(4).fill({
//         consultant: {
//             image: consultantImg,
//             title: 'Placement Consultant',
//             description: 'Are you finding it tough to get a suitable talent for your company? If the answer is affirmative, look no further then Aegis I-NET (OPC) Private Limited. Ours is a Jabalpur (Pan India) and serving clients in the surrounding regions for domestic placement requirements. Being a responsi......'
//         },
//         company: {
//             name: 'Aegis I-NET (OPC) Private Limited',
//             address: 'Napier Town, Jabalpur',
//             rating: '5.0',
//             reviews: 2
//         }
//     });

//     return (
//         <div style={{ backgroundColor: '#fff' }}> {/* ✅ Background को white किया गया */}
//             {/* हीरो बैनर और सर्च सेक्शन */}
//             <div className="py-4 mb-4" style={{ background: `url(${bannerBg}) no-repeat center center`, backgroundSize: 'cover' }}>
//                 <Container>
//                     <Card className="p-2 shadow-lg" style={{ borderRadius: '8px' }}>
//                         {/* ✅ सर्च फॉर्म को बिल्कुल इमेज जैसा बनाया गया, कम गैप के साथ */}
//                         <InputGroup>
//                             <Form.Control defaultValue="All India" className="border-end-0" />
//                             {/* px-2 से + और टेक्स्ट के बीच का गैप कम किया गया */}
//                             <InputGroup.Text className="bg-white border-start-0 px-2 text-muted">+</InputGroup.Text>
                            
//                             <Form.Control defaultValue="City" className="border-end-0" />
//                             <InputGroup.Text className="bg-white border-start-0 border-end-0 px-2 text-muted">+</InputGroup.Text>
                            
//                             <Form.Control placeholder="Placement Consultants in Indore" className="border-0" />
//                             <Button variant="danger" id="button-search" className="px-5 fw-bold">Search</Button>
//                         </InputGroup>
//                     </Card>
//                 </Container>
//             </div>

//             <Container>
//                 {/* ✅ ब्रेडक्रम्ब को एक साधारण काले टेक्स्ट में बदल दिया गया है */}
//                 <p className="small mb-2 text-dark">
//                     Home  >  EMS Media Service  >  Recruitment Services in Indore  >  Placement Consultants in Indore
//                 </p>
                
//                 <h2 className="fw-bold mb-4" style={{color: '#0056b3'}}>Placement Consultants in Jabalpur</h2>

//                 {/* लिस्टिंग का लूप */}
//                 {listings.map((item, index) => (
//                     <Row key={index}>
//                         <Col lg={8}>
//                             <ConsultantCard {...item.consultant} />
//                         </Col>
//                         <Col lg={4}>
//                             <CompanyCard {...item.company} />
//                         </Col>
//                     </Row>
//                 ))}
//             </Container>
//         </div>
//     );
// };

// export default PlacementPage;
// src/pages/PlacementPage.jsx

import React from 'react';
import { Container, Row, Col, Card, Button, Image, InputGroup, Form } from 'react-bootstrap';
import { FaBuilding, FaMapMarkerAlt, FaStar, FaPhoneAlt } from 'react-icons/fa';
import bannerBg from '../../assets/banner-bg.jpg';
import consultantImg from '../../assets/meera-placement.png';

// --- Components ---
const ConsultantCard = ({ image, title, description }) => (
    <Card className="mb-4 border-0 shadow-sm">
        <Row className="g-0">
            <Col md={3} className="d-flex align-items-center justify-content-center p-2">
                <Image src={image} fluid rounded />
            </Col>
            <Col md={9}>
                <Card.Body>
                    <Card.Title as="h5" className="fw-bold" style={{ color: '#d32f2f' }}>{title}</Card.Title>
                    <Card.Text className="small text-muted" style={{ lineHeight: 1.6 }}>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Col>
        </Row>
    </Card>
);

const CompanyCard = ({ name, address, rating, reviews }) => (
    <Card className="mb-4 shadow-sm" style={{ borderLeft: '4px solid #d32f2f' }}>
        <Card.Body className="p-3">
            <h6 className="fw-bold d-flex align-items-center mb-2" style={{ fontSize: '0.9rem' }}>
                <FaBuilding className="me-2 text-muted" /> {name}
            </h6>
            <p className="small text-muted d-flex align-items-start mb-2">
                <FaMapMarkerAlt className="me-2 mt-1 text-danger flex-shrink-0" /> {address}
            </p>
            <div className="d-flex align-items-center mb-3">
                <div className="text-white me-2 px-2 py-1 d-flex align-items-center" style={{ backgroundColor: '#2e7d32', borderRadius: '4px', fontSize: '0.8rem' }}>
                    <FaStar className="me-1" size={12} /> {rating}
                </div>
                <span className="text-muted small">{reviews} Reviews</span>
            </div>
            <div className="d-flex gap-2">
                <Button variant="danger" size="sm" className="flex-fill">Get Quote</Button>
                <Button variant="light" size="sm" className="flex-fill border d-flex justify-content-center align-items-center">
                    <FaPhoneAlt size={12} className="me-2" /> Contact
                </Button>
            </div>
        </Card.Body>
    </Card>
);


// --- Main Page Component ---
const PlacementPage = () => {
    
    // ✅ IMPROVEMENT: Dummy data banane ka behtar tareeka
    const listings = Array.from({ length: 4 }, (_, index) => ({
        id: index,
        consultant: {
            image: consultantImg,
            title: 'Placement Consultant',
            description: 'Are you finding it tough to get a suitable talent for your company? If the answer is affirmative, look no further then Aegis I-NET (OPC) Private Limited. Ours is a Jabalpur (Pan India) and serving clients in the surrounding regions for domestic placement requirements. Being a responsi......'
        },
        company: {
            name: 'Aegis I-NET (OPC) Private Limited',
            address: 'Napier Town, Jabalpur',
            rating: '5.0',
            reviews: 2
        }
    }));

    return (
        <div style={{ backgroundColor: '#fff' }}>
            {/* हीरो बैनर और सर्च सेक्शन */}
            <div className="py-4 mb-4" style={{ background: `url(${bannerBg}) no-repeat center center`, backgroundSize: 'cover' }}>
                <Container>
                    <Card className="p-2 shadow-lg" style={{ borderRadius: '8px' }}>
                        <InputGroup>
                            <Form.Control defaultValue="All India" className="border-end-0" />
                            <InputGroup.Text className="bg-white border-start-0 px-2 text-muted">+</InputGroup.Text>
                            <Form.Control defaultValue="City" className="border-end-0" />
                            <InputGroup.Text className="bg-white border-start-0 border-end-0 px-2 text-muted">+</InputGroup.Text>
                            <Form.Control placeholder="Placement Consultants in Indore" className="border-0" />
                            <Button variant="danger" id="button-search" className="px-5 fw-bold">Search</Button>
                        </InputGroup>
                    </Card>
                </Container>
            </div>

            <Container>
                {/* ✅ FIX: Breadcrumb warning ko theek kiya gaya hai */}
                <p className="small mb-2 text-dark">
                    Home{' > '}EMS Media Service{' > '}Recruitment Services in Indore{' > '}Placement Consultants in Indore
                </p>
                
                <h2 className="fw-bold mb-4" style={{color: '#0056b3'}}>Placement Consultants in Jabalpur</h2>

                {/* लिस्टिंग का लूप */}
                {listings.map((item) => (
                    <Row key={item.id}> {/* ✅ IMPROVEMENT: Key ko unique ID se joda gaya */}
                        <Col lg={8}>
                            <ConsultantCard {...item.consultant} />
                        </Col>
                        <Col lg={4}>
                            <CompanyCard {...item.company} />
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default PlacementPage;