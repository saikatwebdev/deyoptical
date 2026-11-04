import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AT_DATA, INITIAL_TESTIMONIALS } from '../data/mockData.js';
import { animateModalIn } from '../utils/animations.js';

const ALL_TESTIMONIALS = [...AT_DATA.map((t, i) => ({ ...t, id: i, rating: 5 }))];

function StarRating({ rating, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate && onRate(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`focus:outline-none ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <span
            className={`material-symbols-outlined text-[22px] transition-colors duration-150 ${
              star <= (interactive ? hovered || rating : rating) ? 'text-amber-400' : 'text-outline-variant'
            }`}
            style={{ fontVariationSettings: `'FILL' ${star <= (interactive ? hovered || rating : rating) ? 1 : 0}` }}
          >
            star
          </span>
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(ALL_TESTIMONIALS);
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const autoRef = useRef(null);

  const [form, setForm] = useState({ name: '', role: '', rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const goTo = useCallback((idx, dir = 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimDir(dir);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 'right');
  }, [current, testimonials.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, 'left');
  }, [current, testimonials.length, goTo]);

  useEffect(() => {
    if (showModal) return;
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [next, showModal]);

  useEffect(() => {
    if (showModal && modalRef.current) {
      animateModalIn(modalRef.current);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showModal]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && showModal) setShowModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    const newT = {
      id: testimonials.length,
      name: form.name,
      role: form.role || 'Customer',
      rating: form.rating,
      quote: form.comment,
      img: 'images/dey-carousel-1.jpg',
    };
    setTestimonials((prev) => [...prev, newT]);
    setCurrent(testimonials.length);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setForm({ name: '', role: '', rating: 5, comment: '' });
    }, 1800);
  };

  const t = testimonials[current];

  const slideClass = isAnimating
    ? animDir === 'right'
      ? 'opacity-0 translate-x-8'
      : 'opacity-0 -translate-x-8'
    : 'opacity-100 translate-x-0';

  return (
    <div className="py-24 bg-gradient-to-br from-surface-container-low to-surface relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
            Testimonials
          </span>
          <h2 className="text-[36px] md:text-[42px] font-bold text-on-surface tracking-tight leading-tight mb-3">
            What Our Patients Say
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-xl mx-auto">
            Thousands of satisfied eyes trust Dey Optical for precision, care, and quality.
          </p>
        </div>

        {/* Large quote decoration */}
        <div className="absolute top-32 left-8 text-[180px] font-serif text-primary/5 leading-none select-none hidden lg:block">"</div>

        {/* Testimonial Card */}
        <div data-animate="fade-up" className="relative">
          <div
            className={`transition-all duration-300 ease-out ${slideClass} bg-white rounded-3xl shadow-xl border border-outline-variant/20 p-8 md:p-12`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar + Info */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3 min-w-[140px]">
                <div className="relative">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-on-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="font-bold text-[16px] text-on-surface">{t.name}</div>
                  <div className="text-[13px] text-secondary">{t.role}</div>
                </div>
                <StarRating rating={t.rating} />
              </div>

              {/* Quote */}
              <div className="flex-1">
                <span className="text-[64px] leading-none text-primary/20 font-serif">"</span>
                <p className="text-[17px] md:text-[18px] text-on-surface-variant leading-relaxed -mt-6">
                  {t.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-200 group"
                aria-label="Previous"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[22px]">arrow_back</span>
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-200 group"
                aria-label="Next"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[22px]">arrow_forward</span>
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx, idx > current ? 'right' : 'left')}
                  className={`transition-all duration-300 rounded-full ${
                    idx === current ? 'w-7 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-outline-variant hover:bg-primary/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary text-[14px] font-bold hover:bg-primary/20 active:scale-95 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span className="hidden sm:inline">Share Your Experience</span>
              <span className="sm:hidden">Review</span>
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div data-animate-stagger className="grid grid-cols-3 gap-4 mt-16">
          {[
            { icon: 'star', value: '4.9/5', label: 'Average Rating', color: 'text-amber-500' },
            { icon: 'reviews', value: `${testimonials.length}+`, label: 'Patient Reviews', color: 'text-primary' },
            { icon: 'thumb_up', value: '98%', label: 'Would Recommend', color: 'text-tertiary' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-outline-variant/20 p-5 text-center shadow-sm">
              <span className={`material-symbols-outlined text-[28px] mb-2 ${s.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              <div className="text-[22px] font-bold text-on-surface">{s.value}</div>
              <div className="text-[12px] text-secondary mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div
            ref={modalRef}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10 opacity-0"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-primary text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h3 className="text-[22px] font-bold text-on-surface mb-2">Thank You!</h3>
                <p className="text-secondary">Your review has been added successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[22px] font-bold text-on-surface">Share Your Experience</h3>
                  <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-xl hover:bg-surface-container flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant text-[22px]">close</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Ravi Kumar"
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Role / Profession</label>
                      <input
                        type="text"
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="e.g. Engineer"
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-2">Your Rating</label>
                    <StarRating rating={form.rating} interactive onRate={(r) => setForm((f) => ({ ...f, rating: r }))} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Your Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.comment}
                      onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                      placeholder="Tell us about your experience at Dey Optical..."
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold text-[15px] hover:bg-primary/90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    Submit Review
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

