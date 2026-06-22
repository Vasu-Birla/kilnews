import React, { useState } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

// Page components
import NewsPage from '../Main_NewsDetails/NewsContent';
import Article from './Article';
import ArticleFour from './ArticleFour';
import SportsSection from '../NewsDetails/SportsSection';
import BusinessSection from '../NewsDetails/BusinessSection';
import EntertainmentPage from './EntertainmentPage';
import RashifalDetailsPage from './RashifalDetailsPage';
import PlacementPage from './PlacementPage';
import WebStories from './WebStories';

const epaperData = {
  '2024-07-25': [
    { pageNumber: 1, title: 'मुख्य पृष्ठ', component: <NewsPage /> },
    { pageNumber: 2, title: 'विस्तृत समाचार', component: <Article /> },
    { pageNumber: 3, title: 'लाइव अपडेट्स', component: <ArticleFour /> },
    { pageNumber: 4, title: 'खेल जगत', component: <SportsSection /> },
    { pageNumber: 5, title: 'कारोबार', component: <BusinessSection /> },
    { pageNumber: 6, title: 'मनोरंजन और वीडियो', component: <EntertainmentPage /> },
    { pageNumber: 7, title: 'वेब स्टोरीज़', component: <WebStories /> },
    { pageNumber: 8, title: 'राशिफल', component: <RashifalDetailsPage /> },
    { pageNumber: 9, title: 'प्लेसमेंट/डायरेक्टरी', component: <PlacementPage /> },
  ],
  '2024-07-24': [
    { pageNumber: 1, title: 'मुख्य पृष्ठ', component: <NewsPage /> },
    { pageNumber: 2, title: 'खेल जगत', component: <SportsSection /> },
    { pageNumber: 3, title: 'मनोरंजन', component: <EntertainmentPage /> },
  ],
};

const EpaperPage = () => {
  const [selectedDate, setSelectedDate] = useState(Object.keys(epaperData)[0]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const pages = epaperData[selectedDate] || [];
  const currentPage = pages[currentPageIndex];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPageIndex(0);
  };

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) setCurrentPageIndex(currentPageIndex + 1);
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) setCurrentPageIndex(currentPageIndex - 1);
  };

  return (
    <Container className="my-4">
      <Row className="mb-3 align-items-center">
        <Col><h2 className="fw-bold text-danger mb-0">E-Paper</h2></Col>
        <Col md={4}>
          <Form.Group controlId="epaperDateSelect">
            <Form.Label className="fw-bold">अख़बार की तारीख चुनें:</Form.Label>
            <Form.Select value={selectedDate} onChange={handleDateChange}>
              {Object.keys(epaperData).map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {pages.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-3">
            <Button variant="dark" onClick={handlePrevPage} disabled={currentPageIndex === 0}>← पिछला पेज</Button>
            <span className="fw-bold text-center">
              पेज {currentPage.pageNumber} / {pages.length}<br/>
              <span className="text-danger small">{currentPage.title}</span>
            </span>
            <Button variant="dark" onClick={handleNextPage} disabled={currentPageIndex === pages.length - 1}>अगला पेज →</Button>
          </div>
          <div className="border p-3 shadow-sm bg-white" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
            {currentPage.component}
          </div>
        </>
      ) : (
        <div className="text-center p-5 border rounded">
          <p className="lead">चुनी हुई तारीख के लिए कोई E-Paper उपलब्ध नहीं है।</p>
        </div>
      )}
    </Container>
  );
};

export default EpaperPage;
