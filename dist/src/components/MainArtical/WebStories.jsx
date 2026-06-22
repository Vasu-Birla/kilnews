// src/pages/FullStoryGrid.jsx (या आपकी फाइल का नाम)

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// 'स्टोरी' वाला आइकॉन इम्पोर्ट किया गया है
import { MdAutoStories } from 'react-icons/md'; 

// आपकी दी हुई 5 इमेज को इम्पोर्ट किया गया है
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";
import card4 from "../../assets/card4.png";
import card5 from "../../assets/card5.png";

// ==========================================================
// 1. एक सिंगल स्टोरी कार्ड बनाने वाला कंपोनेंट (अपडेटेड)
// ==========================================================
const StoryCard = ({ image, mainText }) => {
  return (
    // ✅ बदलाव 1: कार्ड की ऊंचाई 300px से बढ़ाकर 400px कर दी गई है
    <Card className="text-white border-0 shadow-sm" style={{ height: '400px', borderRadius: '12px' }}>
      <Card.Img src={image} alt={mainText} style={{ height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
      
      <Card.ImgOverlay className="d-flex flex-column p-0" style={{ borderRadius: '12px' }}>
        
        {/* स्टोरी वाला आइकॉन */}
        <div className="position-absolute top-0 end-0 m-2">
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MdAutoStories color="white" size={18} />
          </div>
        </div>

        {/* नीचे वाला टेक्स्ट */}
        <div 
          className="mt-auto w-100"
          style={{
            position: 'relative',
            padding: '15px',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            minHeight: '95px', 
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <p className="mb-0 fw-bold" style={{ 
              fontSize: '1rem', 
              lineHeight: '1.4',
              width: '100%',
           }}>
            {mainText}
          </p>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
};

// ==========================================================
// 2. पूरा 24 कार्ड का ग्रिड बनाने वाला मुख्य कंपोनेंट (अपडेटेड)
// ==========================================================
const FullStoryGrid = () => {
  
  // ✅ बदलाव 2: सिर्फ 5 कार्ड का डेटा बनाया गया, जो आपकी इमेज से मेल खाता है
  const storiesData = [
    { image: card1, mainText: 'टेस्ट क्रिकेट में एक मैच में दोहरा शतक और शतक लगाने वाले 9 बल्लेबाज, ये रही पूरी लिस्ट' },
    { image: card2, mainText: 'टेस्ट मैच की एक पारी में सबसे ज्यादा छक्के लगाने वाले कप्तान, शुभमन गिल इस नंबर पर' },
    { image: card3, mainText: 'टेस्ट की दोनों पारियों में शतक जड़ने वाले भारतीय बल्लेबाज, लिस्ट में शुभमन गिल की नई एंट्री' },
    { image: card4, mainText: 'टेस्ट क्रिकेट में सबसे ज्यादा दोहरा शतक किसने लगाया है?' },
    { image: card5, mainText: 'एक्शन में दिख रहे ये हैं पाकिस्तान के पूर्व कप्तान, टॉप पर पाकिस्तानी कोच' },
  ];

  // ✅ बदलाव 3: 5 कार्ड के डेटा को दोहराकर ठीक 24 कार्ड का पूरा ग्रिड बनाया गया है
  const fullGridData = [
    ...storiesData, // 5
    ...storiesData, // 10
    ...storiesData, // 15
    ...storiesData, // 20
    ...storiesData.slice(0, 4) // +4 = 24 कार्ड
  ];

  return (
    <Container fluid className="p-3">
      <h4 className="fw-bold mb-3 text-danger">Web Stories</h4>
      
      <Row xs={2} md={3} lg={4} className="g-3">
        {fullGridData.map((story, index) => (
          <Col key={index}>
            <StoryCard
              image={story.image}
              mainText={story.mainText}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FullStoryGrid;