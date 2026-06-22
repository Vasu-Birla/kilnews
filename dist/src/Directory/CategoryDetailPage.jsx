

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { getCompaniesByCategory } from "../Services/authApi"; // सुनिश्चित करें कि यह पथ सही है
import { FaCheckCircle } from 'react-icons/fa'; // चेक आइकन के लिए

// प्लेसहोल्डर इमेज
const placeholderImageUrl = "https://via.placeholder.com/150";
const yellowpagesPlaceholder = "https://via.placeholder.com/150?text=YP"; // येलोपेजेस के लिए प्लेसहोल्डर

const CategoryDetailPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");
  const categoryName = params.get("name") || "Unknown Category";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!categoryId) {
        setError('Category ID is missing. Please select a category from the directory.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // पिछली त्रुटियों को साफ़ करें
      try {
        const res = await getCompaniesByCategory(categoryId);
        if (res.success && res.data) {
          const top20Companies = res.data.top20 || [];
          const alphabeticalCompanies = res.data.alphabetical || [];

          // Combine and deduplicate companies
          const combinedCompaniesMap = new Map();

          // Add top20 companies first to maintain their priority and order
          top20Companies.forEach(company => {
            combinedCompaniesMap.set(company._id, company);
          });

          // Add alphabetical companies, only if they are not already present in top20
          alphabeticalCompanies.forEach(company => {
            if (!combinedCompaniesMap.has(company._id)) {
              combinedCompaniesMap.set(company._id, company);
            }
          });

          // Convert map values back to an array
          let finalCompanies = Array.from(combinedCompaniesMap.values());

          // Sort logic: Top 20 companies (those with priorityRank) come first,
          // sorted by their priorityRank. The remaining companies are then
          // sorted alphabetically by name.
          finalCompanies.sort((a, b) => {
            const aPriority = a.priorityRank !== null && a.priorityRank !== undefined ? a.priorityRank : Infinity;
            const bPriority = b.priorityRank !== null && b.priorityRank !== undefined ? b.priorityRank : Infinity;

            if (aPriority === Infinity && bPriority === Infinity) {
                // Both are not in top 20, sort alphabetically by name
                return a.name.localeCompare(b.name);
            } else if (aPriority !== Infinity && bPriority !== Infinity) {
                // Both are in top 20, sort by priority rank
                return aPriority - bPriority;
            } else if (aPriority !== Infinity) {
                // Only 'a' is in top 20, 'a' comes first
                return -1;
            } else {
                // Only 'b' is in top 20, 'b' comes first
                return 1;
            }
          });

          setCompanies(finalCompanies);

        } else {
          setError(res.message || "Failed to fetch companies for this category.");
          setCompanies([]);
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching data.");
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, [categoryId]); // categoryId बदलने पर प्रभाव को फिर से चलाएं

  // स्टार रेटिंग रेंडर करने के लिए हेल्per फ़ंक्शन
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">&#9733;</span>); // पूर्ण स्टार
    }
    // यदि रेटिंग में दशमलव है, तो एक आंशिक स्टार जोड़ें (यहां सरलता के लिए खाली स्टार)
    if (rating % 1 !== 0 && rating > 0) {
      stars.push(<span key="half" className="text-warning">&#9734;</span>); 
    }
    // शेष को खाली स्टार से भरें, कुल 5 स्टार प्रदर्शित करने के लिए
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
    }
    return stars;
  };

  // 'Get Quote' बटन के लिए शैली
  const getQuoteButtonStyle = {
    backgroundColor: '#c00', // लाल पृष्ठभूमि
    borderColor: '#c00',     // लाल बॉर्डर
    color: '#fff',           // सफेद टेक्स्ट
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem'
  };

  // 'Contact' बटन के लिए शैली
  const contactButtonStyle = {
    borderColor: '#c00',     // लाल बॉर्डर
    color: '#c00',           // लाल टेक्स्ट
    backgroundColor: 'transparent', // पारदर्शी पृष्ठभूमि
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem'
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading companies for {categoryName}...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <strong>Error:</strong> {error}
        </Alert>
        <div className="text-center mt-4">
          <Link to="/directory">
            <Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>
              Back to Directory
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* टाइटल और विवरण */}
      <h1 className="mb-3">{categoryName}</h1>
      <p className="lead mb-4">Find the best {categoryName} in the city to boost your career.</p>

      {companies.length > 0 ? (
        <Row>
          {companies.map((company) => (
            <Col md={12} className="mb-4" key={company._id}>
              {/* कंपनी कार्ड को Link से रैप करें */}
              <Link 
                to={{
                  pathname: `/company/${company._id}`,
                  state: { companyDetails: company } // पूरी कंपनी ऑब्जेक्ट को state में पास करें
                }} 
                style={{ textDecoration: 'none', color: 'inherit' }} // Link की डिफ़ॉल्ट स्टाइलिंग हटाने के लिए
              >
                <Card className="p-3">
                  <Row className="align-items-center">
                    {/* कॉलम 1: लोगो/इमेज */}
                    <Col xs={12} md={3} className="text-center">
                      <img
                        src={company.logo || yellowpagesPlaceholder} // 'logo' को कंपनी डेटा से एक्सेस करें
                        alt={company.name}
                        style={{ width: "150px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                        onError={(e) => { e.target.onerror = null; e.target.src = yellowpagesPlaceholder; }} // टूटी हुई इमेज के लिए फ़ॉलबैक
                      />
                    </Col>

                    {/* कॉलम 2: कंपनी का नाम, श्रेणी, रेटिंग, समीक्षाएं और स्थिति */}
                    <Col xs={12} md={6}>
                      <div className="d-flex align-items-center mb-1">
                        <h5 className="mb-0 me-2">{company.name}</h5>
                        {/* यदि company.isApproved true है तो चेक आइकन प्रदर्शित करें */}
                        {company.isApproved && <FaCheckCircle className="text-success" />}
                      </div>
                      {company.category?.name && <p className="text-muted mb-1 small">{company.category.name}</p>}
                      <div className="d-flex align-items-center mb-1">
                        {renderStars(company.averageRating || 0)}
                        <span className="ms-1 small">{company.averageRating?.toFixed(1) || 0}</span>
                        <span className="ms-2 small">({company.reviews?.length || 0} Reviews)</span>
                      </div>
                      {company.businessTimings && company.businessTimings.monday && (
                        <p className="mb-0 small text-success">
                          Open - until {company.businessTimings.monday.close}
                        </p>
                      )}
                    </Col>

                    {/* कॉलम 3: संपर्क विवरण और कार्य बटन */}
                    <Col xs={12} md={3} className="text-end mt-2 mt-md-0">
                      {company.phone && <p className="mb-1 small fw-bold">Call: {company.phone}</p>}
                      {company.address && 
                        <p className="mb-1 small">
                          {[company.address, company.city].filter(Boolean).join(", ")}
                        </p>
                      }
                      <div className="mt-2">
                        <Button variant="danger" size="sm" className="me-2" style={getQuoteButtonStyle} onClick={(e) => e.preventDefault()}>
                          Get Quote
                        </Button>
                        <Button variant="outline-danger" size="sm" style={contactButtonStyle} onClick={(e) => e.preventDefault()}>
                          Contact
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No companies found in "{categoryName}".</Alert>
      )}

      <div className="text-center mt-5">
        <Link to="/directory">
          <Button variant="danger" style={{ backgroundColor: '#c00', borderColor: '#c00' }}>
            Back to Directory
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default CategoryDetailPage;