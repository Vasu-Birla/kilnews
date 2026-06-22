
import React from 'react';
import { Container, Nav, Button } from 'react-bootstrap';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


import GoogleTranslateWidget, { useGoogleTranslate } from '../../GoogleTranslateWidget';

const TopBar = () => {
    // हमारे कस्टम हुक से भाषा बदलने वाला फंक्शन प्राप्त करें
    const { changeLanguage } = useGoogleTranslate();

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
    };
                                                                                                                                                                                                
    return (
        <>
            {/* यह छिपा हुआ कंपोनेंट पेज में कहीं भी हो सकता है, यह स्क्रिप्ट लोड करने का काम करता है */}
            <GoogleTranslateWidget />

            <div style={{ backgroundColor: '#0185C6', padding: '2px 0' }}>
                <Container>
                    <Nav className="justify-content-end align-items-center">
                        {/* सोशल आइकॉन */}
                        <Nav.Link href="#" className="px-2"><span className="social-icon-circle"><FaFacebookF /></span></Nav.Link>
                        <Nav.Link href="#" className="px-2"><span className="social-icon-circle"><FaXTwitter /></span></Nav.Link>
                        <Nav.Link href="#" className="px-2"><span className="social-icon-circle"><FaYoutube /></span></Nav.Link>
                        <Nav.Link href="#" className="px-2"><span className="social-icon-circle"><FaInstagram /></span></Nav.Link>
                        <div className="vr text-white mx-2"></div>
                        
                        {/* भाषा बदलने वाले कस्टम बटन */}
                        <div className="language-buttons d-flex align-items-center">
                            <Button
                                variant="link"
                                className="text-white p-1 text-decoration-none"
                                onClick={() => handleLanguageChange('en')}
                            >
                                English
                            </Button>
                            <span className="text-white mx-1">|</span>
                            <Button
                                variant="link"                                                                                                                                                                                          
                                className="text-white p-1 text-decoration-none"
                                onClick={() => handleLanguageChange('hi')}
                            >
                                हिन्दी
                            </Button>
                        </div>
                    </Nav>
                </Container>
            </div>
        </>
    );
};

export default TopBar;
