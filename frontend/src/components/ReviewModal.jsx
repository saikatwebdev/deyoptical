import React, { useState, useEffect, useRef } from 'react';
import { animateModalIn } from '../utils/animations.js';

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmitReview
}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const reviewDialogRef = useRef(null);

  useEffect(() => {
    if (reviewDialogRef.current) {
      animateModalIn(reviewDialogRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onSubmitReview({
      name: name.trim(),
      role: 'Verified Patient',
      rating,
      date: 'Just now',
      comment: comment.trim()
    });

    setName('');
    setComment('');
    setRating(5);
    onClose();
    alert('Thank you! Your patient review has been submitted to Dey Optical.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-in fade-in duration-200"
      id="review-modal"
      onClick={onClose}
    >
      <div
        ref={reviewDialogRef}
        className="bg-surface-container-lowest w-full max-w-lg rounded-2xl border border-outline-variant/40 p-6 md:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:text-on-surface cursor-pointer"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        <h3 className="text-headline-md font-headline-md text-on-surface">Share Your Feedback</h3>
        <p className="text-body-sm font-body-sm text-secondary mt-1">
          Your rating helps our clinical and optical teams maintain rigorous patient satisfaction.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-label-md font-label-md text-on-surface mb-1">Your Name *</label>
            <input
              className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md"
              id="review-name"
              placeholder="e.g. Priya Mukherjee"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface mb-1">Rating *</label>
            <div className="flex items-center gap-2 text-primary" id="star-selector">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <button
                  key={starNum}
                  className={`material-symbols-outlined text-[24px] cursor-pointer ${
                    starNum <= rating ? 'fill-icon' : ''
                  }`}
                  onClick={() => setRating(starNum)}
                  type="button"
                >
                  star
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-label-md font-label-md text-on-surface mb-1">
              Your Experience / Testimonial *
            </label>
            <textarea
              className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md"
              id="review-comment"
              placeholder="Share your experience regarding lens clarity, doctor testing, or frame fitting..."
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-primary text-on-primary py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all cursor-pointer"
            type="submit"
          >
            Submit Patient Review
          </button>
        </form>
      </div>
    </div>
  );
}
