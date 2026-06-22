import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { addOrUpdateCompanyReview } from '../Services/authApi'; // Adjust path if necessary

const ReviewForm = ({ companyId, existingReview, onReviewSubmitted }) => {
  const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
  const [comment, setComment] = useState(existingReview ? existingReview.comment : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update form fields if an existing review is passed (e.g., when editing)
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    } else {
      setRating(0);
      setComment('');
    }
  }, [existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5 stars.");
      setLoading(false);
      return;
    }

    try {
      // The userId is expected to be extracted from the authenticated user's token on the backend
      const res = await addOrUpdateCompanyReview(companyId, { rating, comment });
      if (res.success) {
        setSuccess(res.message || (existingReview ? "Review updated successfully!" : "Review added successfully!"));
        onReviewSubmitted(); // Notify parent to refresh reviews
        if (!existingReview) { // Only clear form if it was a new review submission
            setRating(0);
            setComment('');
        }
      } else {
        setError(res.message || "Failed to save review.");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving your review.");
      console.error("Submit Review Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded shadow-sm">
      <h5 className="mb-3">{existingReview ? "Update Your Review" : "Add Your Review"}</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group controlId="rating" className="mb-3">
        <Form.Label>Rating</Form.Label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ cursor: 'pointer', fontSize: '1.8rem', color: star <= rating ? 'gold' : 'lightgray' }}
              onClick={() => setRating(star)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </Form.Group>

      <Form.Group controlId="comment" className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          required
        />
      </Form.Group>

      <Button type="submit" style={{ backgroundColor: '#c00', borderColor: '#c00' }} disabled={loading || rating === 0}>
        {loading ? <Spinner animation="border" size="sm" /> : (existingReview ? "Update Review" : "Submit Review")}
      </Button>
    </Form>
  );
};

export default ReviewForm;