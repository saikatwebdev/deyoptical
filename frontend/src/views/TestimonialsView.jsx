import React, { useEffect, useRef } from 'react';
import { animateStagger } from '../utils/animations.js';

export default function TestimonialsView({
  navigate,
  testimonials,
  openReviewModal
}) {
  const testimonialsGridRef = useRef(null);

  useEffect(() => {
    if (testimonialsGridRef.current && testimonials.length > 0) {
      animateStagger(testimonialsGridRef.current.children, { delay: 45, duration: 420 });
    }
  }, [testimonials.length]);
  return (
    <section className="view-section" id="view-testimonials">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Patient Stories</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
              Clinical Trust
            </span>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mt-1">Patient Testimonials</h1>
            <p className="text-body-md font-body-md text-secondary">
              Verified experiences from our clinic and boutique patients.
            </p>
          </div>
          <button
            className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
            onClick={openReviewModal}
          >
            <span className="material-symbols-outlined text-[18px]">rate_review</span>
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Rating Overview Bar */}
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <div className="text-display font-display font-bold text-primary">4.9</div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-primary my-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined fill-icon text-[20px]">
                  star
                </span>
              ))}
            </div>
            <p className="text-body-sm font-body-sm text-secondary">Overall Patient Satisfaction Score</p>
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center gap-3 text-body-sm font-body-sm">
              <span className="w-12 text-right font-medium">5 Star</span>
              <div className="flex-grow bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full w-[94%] rounded-full" />
              </div>
              <span className="w-10 text-secondary">94%</span>
            </div>
            <div className="flex items-center gap-3 text-body-sm font-body-sm">
              <span className="w-12 text-right font-medium">4 Star</span>
              <div className="flex-grow bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full w-[5%] rounded-full" />
              </div>
              <span className="w-10 text-secondary">5%</span>
            </div>
            <div className="flex items-center gap-3 text-body-sm font-body-sm">
              <span className="w-12 text-right font-medium">3 Star</span>
              <div className="flex-grow bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full w-[1%] rounded-full" />
              </div>
              <span className="w-10 text-secondary">1%</span>
            </div>
          </div>
        </div>

        {/* Full Testimonials Grid */}
        <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6" id="full-testimonials-grid">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(t.rating || 5)].map((_, starI) => (
                      <span key={starI} className="material-symbols-outlined fill-icon text-[18px]">
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-label-sm font-label-sm bg-surface-container-high px-2 py-0.5 rounded text-secondary font-mono-data">
                    {t.date}
                  </span>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant italic">
                  "{t.comment}"
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-label-md font-label-md font-semibold text-on-surface">{t.name}</h4>
                  <p className="text-body-sm font-body-sm text-secondary">{t.role}</p>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]" title="Verified Patient">
                  verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
