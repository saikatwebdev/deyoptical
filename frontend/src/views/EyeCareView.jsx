import React, { useEffect, useRef } from 'react';
import { animateStagger } from '../utils/animations.js';

export default function EyeCareView({ navigate, openBookingModal }) {
  const stepsGridRef = useRef(null);
  const servicesGridRef = useRef(null);

  useEffect(() => {
    if (stepsGridRef.current) {
      animateStagger(stepsGridRef.current.children, { delay: 50, duration: 420 });
    }
    if (servicesGridRef.current) {
      animateStagger(servicesGridRef.current.children, { delay: 60, duration: 450 });
    }
  }, []);
  return (
    <section className="view-section" id="view-eye-care">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Clinical Services</span>
        </div>

        <div data-animate="fade-up" className="max-w-3xl mb-12">
          <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
            Optometric Diagnostics
          </span>
          <h1 className="text-headline-lg md:text-display font-display text-on-surface mt-2">
            Comprehensive Clinical Eye Care
          </h1>
          <p className="text-body-lg font-body-lg text-secondary mt-4">
            We employ modern computerized refractor systems, subjective lens balances, and slit lamp biomicroscopy to
            deliver an uncompromised standard of vision assessment.
          </p>
        </div>

        {/* 20-Minute Exam Protocol Walkthrough */}
        <div data-animate="fade-up" className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 mb-16">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
            What to Expect in Our 20-Minute Exam
          </h2>
          <p className="text-body-md font-body-md text-secondary mb-8">
            A methodical, step-by-step clinical evaluation designed for comfort, speed, and exact diagnostic outcomes.
          </p>
          <div ref={stepsGridRef} data-animate-stagger className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 relative">
              <span className="text-headline-md font-headline-md font-bold text-primary font-mono-data">01</span>
              <h4 className="text-label-md font-label-md text-on-surface mt-2 font-semibold">
                Auto-Refractometry
              </h4>
              <p className="text-body-sm font-body-sm text-secondary mt-1">
                Digital corneal mapping and automated diopter measurement estimating your spherical and cylindrical power.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 relative">
              <span className="text-headline-md font-headline-md font-bold text-primary font-mono-data">02</span>
              <h4 className="text-label-md font-label-md text-on-surface mt-2 font-semibold">
                Subjective Refraction
              </h4>
              <p className="text-body-sm font-body-sm text-secondary mt-1">
                Cross-cylinder testing and red-green duochrome balance to verify binocular sharpness without eye muscle strain.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 relative">
              <span className="text-headline-md font-headline-md font-bold text-primary font-mono-data">03</span>
              <h4 className="text-label-md font-label-md text-on-surface mt-2 font-semibold">
                Anterior Segment Check
              </h4>
              <p className="text-body-sm font-body-sm text-secondary mt-1">
                Slit-lamp examination assessing cornea transparency, tear break-up time (dry eyes), and conjunctival health.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 relative">
              <span className="text-headline-md font-headline-md font-bold text-primary font-mono-data">04</span>
              <h4 className="text-label-md font-label-md text-on-surface mt-2 font-semibold">
                PD &amp; Lens Selection
              </h4>
              <p className="text-body-sm font-body-sm text-secondary mt-1">
                Digital pupillometer measurement ensuring your optical centers strictly correspond with your custom frame geometry.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Clinical Services Cards */}
        <div ref={servicesGridRef} data-animate-stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover-lift transition-all flex gap-4">
            <span className="material-symbols-outlined text-primary text-[28px] shrink-0">biotech</span>
            <div>
              <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                Computerized Vision Testing
              </h3>
              <p className="text-body-md font-body-md text-secondary mt-2">
                Ultra-precise evaluation suitable for astigmatism, myopia, hyperopia, and complex presbyopic needs.
              </p>
              <button
                className="mt-4 text-primary text-label-md font-label-md font-semibold hover:underline cursor-pointer"
                onClick={() => openBookingModal('Computerized Vision Testing')}
              >
                Book This Service →
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover-lift transition-all flex gap-4">
            <span className="material-symbols-outlined text-primary text-[28px] shrink-0">eyeglasses</span>
            <div>
              <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                Progressive Lens Consulting
              </h3>
              <p className="text-body-md font-body-md text-secondary mt-2">
                Specialized corridor mapping eliminating distortion waves commonly felt with generic progressive lenses.
              </p>
              <button
                className="mt-4 text-primary text-label-md font-label-md font-semibold hover:underline cursor-pointer"
                onClick={() => openBookingModal('Progressive Lens Consultation')}
              >
                Book This Service →
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover-lift transition-all flex gap-4">
            <span className="material-symbols-outlined text-primary text-[28px] shrink-0">lens</span>
            <div>
              <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                Contact Lens Trial &amp; Fitting
              </h3>
              <p className="text-body-md font-body-md text-secondary mt-2">
                Toric, multifocal, and daily disposable trial fits with insertion and hygienic maintenance training.
              </p>
              <button
                className="mt-4 text-primary text-label-md font-label-md font-semibold hover:underline cursor-pointer"
                onClick={() => openBookingModal('Contact Lens Fitting')}
              >
                Book This Service →
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover-lift transition-all flex gap-4">
            <span className="material-symbols-outlined text-primary text-[28px] shrink-0">child_care</span>
            <div>
              <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                Pediatric Vision Care
              </h3>
              <p className="text-body-md font-body-md text-secondary mt-2">
                Gentle, child-oriented refraction focusing on early digital myopia prevention and durable flexible frames.
              </p>
              <button
                className="mt-4 text-primary text-label-md font-label-md font-semibold hover:underline cursor-pointer"
                onClick={() => openBookingModal('Pediatric Vision Care')}
              >
                Book This Service →
              </button>
            </div>
          </div>
        </div>

        {/* Direct Consultation CTA Card */}
        <div data-animate="fade-up" className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 text-center max-w-2xl mx-auto">
          <h3 className="text-headline-md font-headline-md text-on-surface">Ready for your eye check?</h3>
          <p className="text-body-md font-body-md text-secondary mt-2">
            Book directly with our clinical optometrist. Zero wait time with advance booking.
          </p>
          <button
            className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all cursor-pointer"
            onClick={() => openBookingModal()}
          >
            Schedule Eye Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
