import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, ListGroup } from 'react-bootstrap';
import { fetchCompanyReviews } from '../Services/authApi'; // Adjust path if necessary
import ReviewForm from './ReviewForm'; // Import the new ReviewForm
import { FaUserCircle } from 'react-icons/fa'; // For user icon

// IMPORTANT: Replace with actual current user data from your authentication context/state
// This mock object is for demonstration purposes. In a real app, `currentUser`
// would be passed down via props or retrieved from a global state management system.
const MOCK_CURRENT_USER = {
  _id: "654321098765432109876543", // Example User ID - MUST match a real user's ID in your DB for review updates
  name: "Current User",
  email: "current.user@example.com"
};



const CompanyReviewsPage = ({ companyId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [currentUser, setCurrentUser] = useState(MOCK_CURRENT_USER); // Replace with actual user context

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0 && rating > 0;

    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-warning">&#9733;</span>);
    if (hasHalfStar) stars.push(<span key="half" className="text-warning">&#9734;</span>); // Using empty star for simplicity for half star
    for (let i = stars.length; i < 5; i++) stars.push(<span key={`empty-${i}`} className="text-secondary">&#9734;</span>);
    return stars;
  };



  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCompanyReviews(companyId);
      if (res.success) {
        setReviews(res.reviews);
        setAverageRating(res.averageRating);

        // Check if the current user has already reviewed
        const foundUserReview = res.reviews.find(
          (review) => review.user?._id.toString() === (currentUser?._id).toString()
        );
        setUserReview(foundUserReview);

      } else {
        setError(res.message || "Failed to fetch company reviews.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      console.error("Fetch Reviews Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateBreakdown = (reviews) => {
  const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach((r) => {
    breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
  });

  return breakdown;
};


  useEffect(() => {
    fetchReviews();
  }, [companyId, currentUser]); // Refetch if companyId or currentUser changes

  return (
    <Container className="my-4">
      <Row>
        <Col md={12}>
          <h3 className="mb-4">Customer Reviews</h3>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
  <Card className="p-3 shadow-sm h-100">
    {loading ? (
      <div className="text-center py-4">
        <Spinner animation="border" size="sm" />
      </div>
    ) : error ? (
      <Alert variant="danger">{error}</Alert>
    ) : (
      <>
        <Card.Title className="text-center">Overall Rating</Card.Title>

        {/* Average Rating */}
        <div className="text-center mb-3">
          <h1 className="display-4 fw-bold">{averageRating.toFixed(1)}</h1>
          <div className="mb-2">{renderStars(averageRating)}</div>
          <p className="text-muted">{reviews.length} total reviews</p>
        </div>

        <hr />

        {/* Rating Breakdown */}
        <div>
          {Object.entries(
            calculateBreakdown(reviews)
          )
            .reverse()
            .map(([star, count]) => {
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={star} className="d-flex align-items-center mb-2">
                  <span className="me-2" style={{ width: "30px" }}>
                    {star}★
                  </span>

                  <div
                    className="progress flex-grow-1"
                    style={{ height: "8px", backgroundColor: "#eee" }}
                  >
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <span className="ms-2 small text-muted">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
        </div>
      </>
    )}
  </Card>
</Col>

        <Col md={8} className="mb-4">
          {/* Review Form for current user */}
          <ReviewForm
            companyId={companyId}
            existingReview={userReview}
            onReviewSubmitted={fetchReviews} // Callback to refresh reviews after submission
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">All Reviews ({reviews.length})</Card.Title>
            {loading ? (
              <div className="text-center py-4"><Spinner animation="border" /></div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : reviews.length > 0 ? (
              <ListGroup variant="flush">
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="d-flex align-items-start py-3">
                    <FaUserCircle size={30} className="me-3 text-muted" />
                    <div>
                      <h6 className="mb-1">
                        {review.user ? review.user.name : "Anonymous User"}
                      </h6>
                      <div className="mb-1 small">
                        {renderStars(review.rating)}
                        <span className="ms-2 text-muted">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert variant="info">No reviews yet. Be the first to review!</Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyReviewsPage;