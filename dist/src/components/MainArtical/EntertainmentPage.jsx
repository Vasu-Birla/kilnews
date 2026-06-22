// src/pages/EntertainmentPage.jsx

import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Nav } from 'react-bootstrap';

// सभी जरूरी आइकॉन्स को इम्पोर्ट करें
import { BiLike, BiCommentDetail } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';

// इमेज को इम्पोर्ट करें (कृपया अपने सही पाथ यहाँ दें)
import heroBannerImage from '../../assets/news-img1.png'; 
import videoThumb1 from '../../assets/news-img2.png'; 
import videoThumb2 from '../../assets/news-img1.png';
import videoThumb3 from '../../assets/news-img1.png';

// ==========================================================
// 1. एक सिंगल वीडियो कार्ड बनाने वाला कंपोनेंट (सही किया हुआ)
// ==========================================================
const VideoCard = ({ image, title, likes, comments, shares }) => {
    return (
        <Card className="border-0 shadow-sm h-100">
            <div className="position-relative">
                <Card.Img variant="top" src={image} style={{ borderRadius: '8px' }} />
                <Badge 
                    bg="light" 
                    text="dark"
                    className="position-absolute top-0 end-0 m-2"
                    style={{ 
                        fontSize: '0.6rem', 
                        padding: '4px 8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(2px)'
                    }}
                >
                    7NEWS
                </Badge>
            </div>
            
            <Card.Body className="p-2 d-flex flex-column">
                <Card.Text className="fw-bold text-danger" style={{ fontSize: '1rem' }}>
                    {title}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="bg-white border-0 p-2 pt-0">
                <Row className="gx-3">
                    <Col className="d-flex align-items-center" style={{ fontSize: '1rem' }}>
                        <BiLike color="red" className="me-1" />
                        <span className="fw-bold text-primary">{likes}</span>
                    </Col>
                    <Col className="d-flex align-items-center" style={{ fontSize: '1rem' }}>
                        <BiCommentDetail color="red" className="me-1" />
                        <span className="fw-bold text-primary">{comments}</span>
                    </Col>
                    <Col className="d-flex align-items-center" style={{ fontSize: '1rem' }}>
                        <PiShareFat color="red" className="me-1" />
                        <span className="fw-bold text-primary">{shares}</span>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

// ==========================================================
// 2. पूरा एंटरटेनमेंट पेज बनाने वाला मुख्य कंपोनेंट (सही किया हुआ)
// ==========================================================
const EntertainmentPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = ['मनोरंजन', 'रिलिजन', 'हेल्थ', 'लाइफस्टाइल', 'पैसा', 'खेल', 'एजुकेशन', 'वायरल', 'टेक्नोलॉजी'];
    
    const handleCategoryClick = (e, index) => {
        e.preventDefault(); 
        setActiveIndex(index); 
    };

    const videoData = [
        { 
            image: videoThumb1, 
            title: 'Himachal Pradesh News | Himachal Floods: Rain Havoc Across State, Red Alert Issued For 10 Districts',
            likes: 800, comments: 201, shares: 122
        },
        { 
            image: videoThumb2, 
            title: 'Himachal Pradesh News | Himachal Floods: Rain Havoc Across State, Red Alert Issued For 10 Districts',
            likes: 800, comments: 201, shares: 122
        },
        { 
            image: videoThumb3, 
            title: 'Himachal Pradesh News | Himachal Floods: Rain Havoc Across State, Red Alert Issued For 10 Districts',
            likes: 800, comments: 201, shares: 122
        },
    ];

    const fullGridData = Array(5).fill(videoData).flat();

    return (
        // ✅ बदलाव: bg-white क्लास जोड़ी गई ताकि डार्क मोड में काला बैकग्राउंड न दिखे
        <Container fluid className="p-3 bg-white">
            <h2 className="fw-bold text-danger mb-2">Videos</h2>
            
            <Nav className="mb-3 flex-nowrap" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {categories.map((category, index) => (
                    <Nav.Link 
                        key={index} 
                        href="#"
                        onClick={(e) => handleCategoryClick(e, index)}
                        className={`fw-bold text-nowrap px-3 ${
                            index === activeIndex ? 'text-danger' : 'text-primary'
                        }`}
                    >
                        {category}
                    </Nav.Link>
                ))}
            </Nav>

            <div className="position-relative mb-4">
                <Card.Img src={heroBannerImage} style={{ borderRadius: '15px' }} />
                <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
                    color: 'white',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                }}>
                    <h3 className="fw-bold" style={{ 
                        fontFamily: "'Anton', sans-serif", 
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                        lineHeight: 1.2,
                        letterSpacing: '0.5px'
                    }}>
                        Himachal Pradesh News | Himachal Floods: <br />
                        Rain Havoc Across State, Red Alert Issued <br />
                        For 10 Districts
                    </h3>
                </div>
            </div>

            <h4 className="fw-bold mb-3 text-danger">टॉप वीडियोज</h4>
            
            <Row xs={1} md={2} lg={3} className="g-4">
                {fullGridData.map((video, index) => (
                    <Col key={index}>
                        <VideoCard {...video} />
                    </Col>
                ))}
            </Row>

        </Container>
    );
};

export default EntertainmentPage;