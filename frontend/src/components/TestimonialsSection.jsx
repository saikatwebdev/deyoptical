import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AT_DATA } from '../data/mockData.js';
import { animateModalIn } from '../utils/animations.js';

// Pre-computed rotation angles for stacked card realism (Aceternity style)
const ROTATIONS = [-6, 5, -8, 7, -4, 6, -5, 8];

// Inject Aceternity-grade CSS keyframes once
function injectStyles() {
  if (typeof document === 'undefined' || document.getElementById('aceternity-at-styles')) return;
  const style = document.createElement('style');
  style.id = 'aceternity-at-styles';
  style.textContent = `
    /* Word-by-word blur reveal (recreates framer-motion word stagger) */
    @keyframes atWordBlurIn {
      0% {
        filter: blur(10px);
        opacity: 0;
        transform: translateY(6px);
      }
      100% {
        filter: blur(0px);
        opacity: 1;
        transform: translateY(0px);
      }
    }
    .at-word-blur {
      display: inline-block;
      animation: atWordBlurIn 0.28s cubic-bezier(0.25, 1, 0.5, 1) both;
    }

    /* Name & role fade slide in */
    @keyframes atMetaIn {
      0% {
        opacity: 0;
        transform: translateY(12px);
      }
      100% {
        opacity: 1;
        transform: translateY(0px);
      }
    }
    .at-meta-in {
      animation: atMetaIn 0.32s cubic-bezier(0.25, 1, 0.5, 1) both;
    }

    /* Aceternity signature image entrance: lift up and settle into place */
    @keyframes atImageLift {
      0% {
        opacity: 0.5;
        transform: translateY(0px) scale(0.94) rotate(-3deg);
      }
      45% {
        opacity: 0.95;
        transform: translateY(-55px) scale(1.02) rotate(0deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0px) scale(1) rotate(0deg);
      }
    }
    .at-image-active {
      animation: atImageLift 0.6s cubic-bezier(0.34, 1.3, 0.64, 1) both;
    }
  `;
  document.head.appendChild(style);
}

// ─── Star Rating Component ────────────────────────────────────────────────────
function StarRating({ rating = 5, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (interactive ? hovered || rating : rating);
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={`focus:outline-none transition-transform ${
              interactive ? 'cursor-pointer hover:scale-115' : 'cursor-default'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-colors duration-150 ${
                filled ? 'text-amber-400' : 'text-outline-variant/60'
              }`}
              style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
            >
              star
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Animated Word Component ──────────────────────────────────────────────────
function AnimatedWord({ text, delay }) {
  return (
    <span
      className="at-word-blur"
      style={{ animationDelay: `${delay}ms` }}
    >
      {text}&nbsp;
    </span>
  );
}

// ─── Aceternity Animated Testimonials Core Component ──────────────────────────
export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
  onOpenReviewModal,
}) {
  const [active, setActive] = useState(0);
  const [animSeed, setAnimSeed] = useState(0);
  const timerRef = useRef(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
    setAnimSeed((s) => s + 1);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAnimSeed((s) => s + 1);
  }, [testimonials.length]);

  const handleSelect = (idx) => {
    setActive(idx);
    setAnimSeed((s) => s + 1);
  };

  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(handleNext, 5500);
    return () => clearInterval(timerRef.current);
  }, [autoplay, handleNext]);

  const current = testimonials[active] || testimonials[0];
  const words = current?.quote ? current.quote.split(' ') : [];

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
      {/* ── LEFT: Aceternity Stacked Image Display ── */}
      <div className="relative">
        <div className="relative h-80 sm:h-92 md:h-96 w-full max-w-md mx-auto">
          {testimonials.map((testimonial, index) => {
            const isActive = index === active;
            const rot = ROTATIONS[index % ROTATIONS.length];
            // Calculate stacking order relative to active item
            const diff = (index - active + testimonials.length) % testimonials.length;
            const zIndex = isActive ? 40 : 30 - diff;

            return (
              <div
                key={isActive ? `active-${testimonial.id || index}-${animSeed}` : `item-${testimonial.id || index}`}
                className={`absolute inset-0 origin-bottom transition-all duration-500 ease-out ${
                  isActive ? 'at-image-active' : ''
                }`}
                style={{
                  zIndex,
                  opacity: isActive ? 1 : Math.max(0.3, 0.8 - diff * 0.18),
                  transform: isActive
                    ? undefined
                    : `rotate(${rot}deg) scale(${Math.max(0.88, 0.95 - diff * 0.03)}) translateY(${diff * 4}px)`,
                }}
              >
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-surface-container">
                  <img
                    src={testimonial.src || testimonial.img}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full object-cover object-center select-none"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                  {/* Rating pill on image */}
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-white text-[12px] font-bold">
                      {testimonial.rating || 5}.0
                    </span>
                  </div>

                  {/* Verified patient badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90">
                    <span className="text-[12px] font-semibold tracking-wide flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                      Verified Consultation
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: Aceternity Animated Text & Controls ── */}
      <div className="flex flex-col justify-between py-2 md:py-4">
        <div key={`text-block-${animSeed}`}>
          {/* Header & Rating */}
          <div className="at-meta-in">
            <div className="flex items-center justify-between mb-3">
              <StarRating rating={current.rating || 5} />
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                Patient Story
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              {current.name}
            </h3>
            <p className="text-sm font-medium text-secondary mt-1">
              {current.designation || current.role || 'Eyewear Patient'}
            </p>
          </div>

          {/* Quote: Word-by-word blur-in animation */}
          <div className="mt-6 md:mt-8 text-base sm:text-lg text-on-surface-variant leading-relaxed font-normal">
            <span className="text-[40px] leading-none text-primary/30 font-serif mr-1.5 select-none align-top">
              “
            </span>
            {words.map((word, index) => (
              <AnimatedWord
                key={`${animSeed}-${index}`}
                text={word}
                delay={index * 20}
              />
            ))}
            <span className="text-[40px] leading-none text-primary/30 font-serif ml-1 select-none align-bottom">
              ”
            </span>
          </div>
        </div>

        {/* ── Bottom Controls ── */}
        <div className="flex flex-wrap items-center gap-4 pt-8 md:pt-12">
          {/* Aceternity Signature Arrow Buttons */}
          <div className="flex items-center gap-3">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full bg-surface-container-high hover:bg-primary hover:text-white text-on-surface flex items-center justify-center group/btn shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] group-hover/btn:rotate-12 transition-transform duration-300">
                arrow_back
              </span>
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full bg-surface-container-high hover:bg-primary hover:text-white text-on-surface flex items-center justify-center group/btn shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] group-hover/btn:-rotate-12 transition-transform duration-300">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Slider Progress Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                aria-label={`Jump to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === active
                    ? 'w-7 h-2 bg-primary'
                    : 'w-2 h-2 bg-outline-variant/60 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Share Review CTA button */}
          {onOpenReviewModal && (
            <button
              onClick={onOpenReviewModal}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-on-primary text-[13px] font-bold transition-all duration-200 active:scale-95 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">rate_review</span>
              <span className="hidden sm:inline">Share Experience</span>
              <span className="sm:hidden">Review</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section Wrapper with Header, Trust Strip, and Review Modal ───────────────
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(() =>
    AT_DATA.map((t, idx) => ({
      ...t,
      id: idx,
      rating: 5,
      designation: t.role,
      src: t.img,
    }))
  );

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', rating: 5, comment: '' });
  const modalRef = useRef(null);

  useEffect(() => {
    injectStyles();
  }, []);

  // Modal open animation & body scroll locking
  useEffect(() => {
    if (showModal && modalRef.current) {
      animateModalIn(modalRef.current);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) setShowModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;

    const newTestimonial = {
      id: testimonials.length,
      name: form.name.trim(),
      designation: form.role.trim() || 'Valued Patient',
      role: form.role.trim() || 'Valued Patient',
      rating: form.rating,
      quote: form.comment.trim(),
      src: 'images/dey-carousel-1.jpg',
      img: 'images/dey-carousel-1.jpg',
    };

    setTestimonials((prev) => [newTestimonial, ...prev]);
    setSubmitted(true);

    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setForm({ name: '', role: '', rating: 5, comment: '' });
    }, 1800);
  };

  return (
    <div className="py-24 bg-gradient-to-b from-surface to-surface-container-low/50 relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div data-animate="fade-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              reviews
            </span>
            Aceternity Animated Testimonials
          </span>
          <h2 className="text-[36px] md:text-[44px] font-bold text-on-surface tracking-tight leading-tight">
            Stories of Restored <span className="text-primary">Vision</span>
          </h2>
          <p className="text-[16px] text-secondary mt-3 max-w-xl mx-auto">
            Clinical precision meets compassionate care. Here is what our patients say about their eyecare journey at Dey Optical.
          </p>
        </div>

        {/* ── The Aceternity Animated Testimonials Component ── */}
        <div data-animate="fade-up" className="bg-surface-container-lowest/80 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-3xl border border-outline-variant/30 shadow-xl">
          <AnimatedTestimonials
            testimonials={testimonials}
            autoplay={!showModal}
            onOpenReviewModal={() => setShowModal(true)}
          />
        </div>

        {/* ── Trust Metrics Strip ── */}
        <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
          {[
            {
              icon: 'star',
              value: '4.9 / 5.0',
              label: 'Verified Patient Rating',
              sub: 'Across 1,200+ Clinical Consultations',
              color: 'text-amber-500',
              bg: 'bg-amber-500/10',
            },
            {
              icon: 'recommend',
              value: '99.4%',
              label: 'Refraction Accuracy',
              sub: 'Zero Eyestrain Guarantee',
              color: 'text-primary',
              bg: 'bg-primary/10',
            },
            {
              icon: 'diversity_3',
              value: '10,000+',
              label: 'Spectacles Dispensed',
              sub: 'Precision Zeiss & Essilor Partner',
              color: 'text-tertiary',
              bg: 'bg-tertiary/10',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {stat.icon}
                </span>
              </div>
              <div>
                <div className="text-xl font-bold text-on-surface leading-tight font-mono-data">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-on-surface mt-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-secondary">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Patient Review Submission Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          />

          {/* Dialog Container */}
          <div
            ref={modalRef}
            className="relative bg-surface-container-lowest rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 z-10 border border-outline-variant/30 opacity-0"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto mb-4">
                  <span
                    className="material-symbols-outlined text-[36px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-secondary text-sm max-w-sm mx-auto">
                  Your review has been successfully submitted and added to our live patient testimonials.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-on-surface">Share Your Experience</h3>
                    <p className="text-xs text-secondary mt-0.5">Your feedback helps fellow patients find great eyecare</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    aria-label="Close review modal"
                    className="w-9 h-9 rounded-xl hover:bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                        Your Full Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Rahul Sen"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                        Profession / Area
                      </label>
                      <input
                        type="text"
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="e.g. Architect, Kolkata"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                      Your Rating
                    </label>
                    <div className="bg-surface p-2.5 rounded-xl border border-outline-variant/40 inline-block">
                      <StarRating
                        rating={form.rating}
                        interactive
                        onRate={(r) => setForm((f) => ({ ...f, rating: r }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                      Your Review & Experience <span className="text-error">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.comment}
                      onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                      placeholder="Share details about your consultation with Dr. Dey, frame trial, lens fitting..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      send
                    </span>
                    Publish Patient Story
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
