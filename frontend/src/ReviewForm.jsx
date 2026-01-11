import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, onCancel }) => {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const handleSubmit = () => {
        onSubmit({ rating, reviewText });
    };

    return (
        <div className="review-form-overlay">
            <div className="review-form-content">
                <h3>Write a review</h3>
                <div className="form-group">
                    <label>Rate (1-10): </label>
                    <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        className="rating-input"
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Your opinion..."
                        rows="4"
                        className="review-textarea"
                    />
                </div>
                <div className="form-actions">
                    <button className="buttonek" onClick={handleSubmit}>Submit</button>
                    <button className="buttonek2" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
