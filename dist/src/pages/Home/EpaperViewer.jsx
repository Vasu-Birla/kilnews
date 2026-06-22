


import React, { useState, useRef } from 'react';
import { Container, Row, Col, Image, Button, Form, InputGroup } from 'react-bootstrap';
import { FaCut, FaFastBackward, FaArrowLeft, FaArrowRight, FaFastForward, FaSearchPlus, FaSearchMinus, FaDownload } from 'react-icons/fa';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Images from public folder
const jabalpurImage = "/images/jabalpur-thumb.jpg";
const seoniImage = "/images/seoni-thumb.jpg";
const balaImage = "/images/chhindwara-thumb.jpg";

// Editions data
const allEditionsData = {
    bhopal_edition: [
        { pageNumber: 1, image: jabalpurImage, thumbnail: jabalpurImage },
        { pageNumber: 2, image: seoniImage, thumbnail: seoniImage },
        { pageNumber: 3, image: balaImage, thumbnail: balaImage },
        { pageNumber: 4, image: seoniImage, thumbnail: seoniImage },
        { pageNumber: 5, image: jabalpurImage, thumbnail: jabalpurImage },
    ],
};

// Toolbar
const EpaperToolbar = ({ pageInfo, navigation, zoomHandlers, clipping, className }) => {
    const { currentIndex, totalPages, currentImage } = pageInfo;
    const { setCurrentPageIndex, handlePageInputChange, handlePageInputSubmit, pageInputRef } = navigation;
    const { handleZoomIn, handleZoomOut } = zoomHandlers;
    const { isClipping, setIsClipping } = clipping;

    return (
        <div className={`bg-light p-2 border d-flex justify-content-center align-items-center flex-wrap gap-2 ${className}`}>
            <Button variant={isClipping ? "primary" : "outline-secondary"} size="sm" onClick={() => setIsClipping(!isClipping)}><FaCut /> Clip</Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setCurrentPageIndex(0)} disabled={currentIndex === 0}><FaFastBackward /></Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setCurrentPageIndex(p => p - 1)} disabled={currentIndex === 0}><FaArrowLeft /></Button>
            <span style={{ width: '120px' }}>
                <Form onSubmit={handlePageInputSubmit} className="d-flex">
                    <InputGroup size="sm">
                        <Form.Control ref={pageInputRef} key={currentIndex} defaultValue={currentIndex + 1} onBlur={handlePageInputChange} type="number" className="text-center" />
                        <InputGroup.Text>of {totalPages}</InputGroup.Text>
                    </InputGroup>
                </Form>
            </span>
            <Button variant="outline-secondary" size="sm" onClick={() => setCurrentPageIndex(p => p + 1)} disabled={currentIndex === totalPages - 1}><FaArrowRight /></Button>
            <Button variant="outline-secondary" size="sm" onClick={() => setCurrentPageIndex(totalPages - 1)} disabled={currentIndex === totalPages - 1}><FaFastForward /></Button>
            <Button variant="outline-secondary" size="sm" onClick={handleZoomIn}><FaSearchPlus /> Zoom</Button>
            <Button variant="outline-secondary" size="sm" onClick={handleZoomOut}><FaSearchMinus /></Button>
            <Button as="a" href={currentImage} download="epaper-page.jpg" target="_blank" variant="outline-primary" size="sm"><FaDownload /> Download</Button>
        </div>
    );
};

// Viewer
const EpaperViewer = () => {
    const editionId = 'bhopal_edition';
    const pages = allEditionsData[editionId] || [];
    
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isClipping, setIsClipping] = useState(false);
    const [crop, setCrop] = useState();
    const pageInputRef = useRef(null);

    if (pages.length === 0) {
        return <Container className="text-center my-5"><h2>इस संस्करण के लिए ई-पेपर उपलब्ध नहीं है।</h2></Container>;
    }

    const currentPage = pages[currentPageIndex];
    const handleZoomIn = () => setZoomLevel(prev => Math.min(3, prev + 0.2));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(0.2, prev - 0.2));
    const handlePageInputChange = (e) => {
        const pageNum = parseInt(e.target.value, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= pages.length) {
            setCurrentPageIndex(pageNum - 1);
        } else {
            e.target.value = currentPageIndex + 1;
        }
    };
    const handlePageInputSubmit = (e) => { e.preventDefault(); handlePageInputChange({ target: pageInputRef.current }); };
    
    const pageInfo = { currentIndex: currentPageIndex, totalPages: pages.length, currentImage: currentPage.image };
    const navigation = { setCurrentPageIndex, handlePageInputChange, handlePageInputSubmit, pageInputRef };
    const zoomHandlers = { handleZoomIn, handleZoomOut };
    const clipping = { isClipping, setIsClipping };

    return (
        <Container fluid className="py-3">
            <Row className="g-3">
                <Col lg={2} className="d-none d-lg-block">
                    <div className="sticky-top" style={{ top: '20px' }}>
                        <div className="border rounded p-2 overflow-y-auto" style={{ height: 'calc(100vh - 40px)' }}>
                            {pages.map((page, index) => (
                                <div key={index} className="mb-2 position-relative">
                                    <Image src={page.thumbnail} thumbnail fluid onClick={() => setCurrentPageIndex(index)} style={{ cursor: 'pointer', border: index === currentPageIndex ? '3px solid #0d6efd' : '1px solid #ddd' }} />
                                    <div className="position-absolute top-0 start-0 bg-primary text-white px-2 py-1" style={{ fontSize: '0.8rem' }}>{index + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col lg={10} md={12}>
                    <EpaperToolbar className="rounded-top" pageInfo={pageInfo} navigation={navigation} zoomHandlers={zoomHandlers} clipping={clipping} />
                    <div className="border border-top-0 border-bottom-0 overflow-auto d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 150px)', backgroundColor: '#e9e9e9' }}>
                        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', transition: 'transform 0.2s' }}>
                            {isClipping ? (
                                <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                                    <Image src={currentPage.image} alt={`Epaper page ${currentPage.pageNumber}`} style={{ display: 'block' }}/>
                                </ReactCrop>
                            ) : (
                                <Image src={currentPage.image} alt={`Epaper page ${currentPage.pageNumber}`} style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'grab', objectFit: 'contain' }} />
                            )}
                        </div>
                    </div>
                    <EpaperToolbar className="rounded-bottom" pageInfo={pageInfo} navigation={navigation} zoomHandlers={zoomHandlers} clipping={clipping} />
                </Col>
            </Row>
        </Container>
    );
};

export default EpaperViewer;
