import React from "react";

import trumpImage from "../../assets/trump.jpg"; // सुनिश्चित करें कि इमेज का पाथ सही है
import { Image, Row, Col } from "react-bootstrap";

// सही आइकॉन्स को इम्पोर्ट करें
// (सुनिश्चित करें कि आपने 'react-icons' इंस्टॉल किया है: npm install react-icons)
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
// Social Button के लिए एक कस्टम कंपोनेंट ताकि कोड साफ रहे
const SocialButton = ({ icon, count, bgColor, iconColor = "white" }) => (
  <div
    className="d-flex align-items-center border me-2"
    style={{ padding: "2px", borderRadius: "4px", cursor: "pointer" }}
  >
    <span
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: bgColor,
        color: iconColor,
        width: "24px",          
        height: "24px",
        borderRadius: "3px",
      }}
    >
      {icon}
    </span>
    <span className="fw-bold ms-2 pe-2">{count}</span>
  </div>
);

const Article = () => {
  return (
    <div>
      {/* 1. Main Article Image */}
      <Image src={trumpImage} fluid className="mb-3" />

      {/* 2. Headline (रंग बदला गया) */}
      <h1
        className="fw-bold mb-2"
        style={{ fontSize: "2.2rem", lineHeight: "1.3", color: "#c82333" }}
      >
        Trump Tariff: ट्रंप ने BRICS में शामिल देशों को दी एक्स्ट्रा टैरिफ की
        धमकी, क्या भारत पर भी बढ़ाएंगे टैक्स?
      </h1>

      {/* 3. Summary Paragraph (ग्रे रंग हटाया गया) */}
      <p style={{ fontSize: "1.1rem" }}>
        BRICS समिट में ईरान पर अमेरिका और इजरायली हमलों की निंदा की गई, जिसके
        बाद डोनाल्ड ट्रंप भड़क गए और उन्होंने कहा कि अमेरिकी विरोधी देशों पर
        एक्स्ट्रा टैरिफ लगाया जाएगा.
      </p>

      {/* 4. Author and Date Info */}
      <p className="small mb-3">
        <strong style={{ color: "#dc3545" }}>By: EMS NEWS</strong> | Edited By:{" "}
        <strong>हुमर</strong> | Updated at : 07 Jul 2025 09:02 AM (IST)
      </p>
  {/* Blue space */}
      <div className="px-3">
        <div
          style={{ height: "150px", backgroundColor: "#0066ff" }}
          className="mb-3"
        ></div>
      </div>

      {/* 5. Main Article Content (टेक्स्ट इमेज से मिलाया गया है) */}
      <div
        className="article-body"
        style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
      >
        <p>
          <strong>Donald Trump Tariff On BRICS: अमेरिकी</strong> राष्ट्रपति
          डोनाल्ड ट्रंप ने ब्रिक्स देशों के सदस्यों को चेतावनी दी है. उन्होंने
          कहा कि यह किसी भी ऐसी नीति का समर्थन करने वाले देशों पर अतिरिक्त टैरिफ
          लगाएंगे, जो अमेरिकी विरोधी होगा. उनके मुताबिक, अमेरिका का विरोध करने
          पर ब्रिक्स देशों के सदस्यों पर अतिरिक्त <strong>10</strong> फीसदी की
          टैरिफ लगेगी. ट्रंप का यह बयान ब्रिक्स <strong>2025</strong> शिखर
          सम्मेलन में ईरान पर अमेरिका और इजरायल के हमलों की निंदा के बाद आया है.
        </p>
        <p>
          ब्राजील में आयोजित ब्रिक्स <strong>2025</strong> शिखर सम्मेलन में,{" "}
          <strong>10</strong> सदस्य देशों - ब्राजील, चीन, मिस्र, इथियोपिया,
          भारत, इंड़
        </p>
           <div className="px-3">
        <div style={{ height: '150px', backgroundColor: '#0066ff' }} className="mb-3"></div>
    </div>

        <p className="text-muted text-center my-3">ads</p>

        <p>
          ोनेशिया, ईरान, रूसी संघ, दक्षिण अफ्रीका, संयुक्त अरब अमीरात ने ईरानी
          परमाणु और सैन्य सुविधाओं पर अमेरिकी-इजरायल हमलों की निंदा की और हमलों
          को अवैध बताया. इसके अलावा, ब्राजील शिखर सम्मेलन में भारतीय प्रधान
          मंत्री नरेंद्र मोदी ने वैश्विक दक्षिण में हमलों के मामले में आतंकवाद
          के प्रति दोहरे मानदंड को उजागर किया.
        </p>
        <p>ब्रिक्स देशों की संयुक्त घोषणा में पहलागाम हमले का जिक्र</p>
        <p>
          ब्रिक्स देशों की संयुक्त घोषणा में जम्मू और कश्मीर में पहलागाम हमले की
          निंदा की गई. ब्रिक्स देशों ने आतंकवादियों की सीमा पार आवाजाही, आतंकवाद
          के वित्तपोषण और सुरक्षित ठिकानों का मुकाबला करने का आह्वान किया. बयान
          में कहा गया, "हम आतंकवाद के प्रति शून्य सहिष्णुता सुनिश्चित करने और
          आतंकवाद का मुकाबला करने में दोहरे मानदंडों को अस्वीकार करने का आग्रह
          करते हैं.
        </p>
        <p>
          इसके अलावा संयुक्त घोषणापत्र में अमेरिका का नाम लिए बिना टैरिफ में की
          गई अंधाधुंध बढ़ोतरी की आलोचना की गई और कहा गया कि इस तरह के उपायों से
          वैश्विक व्यापार कमजोर होने और वैश्विक आपूर्ति श्रृंखलाओं में बाधा
          उत्पन्न होने का खतरा है. बता दें कि अमेरिका ने चीन और भारत पर
          भारी-भरकम टैरिफ लगाने की घोषणा पहले ही कर चुका है.
        </p>
      </div>

      <hr />

      {/* 6. Social Share Buttons (पूरी तरह से नया स्टाइल) */}
      <Row
        className="my-2 align-items-center"
        style={{ color: "#606060", fontSize: "15px" }}
      >
        <Col xs="auto" className="d-flex align-items-center">
          <BiLike size={20} className="me-2" /> 800
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <BiCommentDetail size={20} className="me-2" /> 201
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <PiShareFat size={20} className="me-2" /> 122
        </Col>
      </Row>
    </div>
  );
};

export default Article;
