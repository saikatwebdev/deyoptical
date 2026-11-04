import React, { useEffect, useRef } from 'react';
import { animateStagger } from '../utils/animations.js';

export default function AboutView({ navigate, openBookingModal }) {
  const pillarsGridRef = useRef(null);

  useEffect(() => {
    if (pillarsGridRef.current) {
      animateStagger(pillarsGridRef.current.children, { delay: 60, duration: 450 });
    }
  }, []);
  return (
    <section className="view-section" id="view-about">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">About Us</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
            Clinical Discipline &amp; Boutique Heritage
          </span>
          <h1 className="text-headline-lg md:text-display font-display text-on-surface mt-2">
            Refining Sight with Scientific Rigor
          </h1>
          <p className="text-body-lg font-body-lg text-secondary mt-4">
            Established over a decade ago, Dey Optical was founded on a simple medical premise: precision diagnostics
            combined with world-class lens edging creates life-changing visual comfort.
          </p>
        </div>

        {/* 3 Pillars Bento */}
        <div ref={pillarsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[32px] mb-3">precision_manufacturing</span>
            <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">In-House Lens Edging</h3>
            <p className="text-body-md font-body-md text-secondary mt-2">
              We operate robotic 3D lens edgers capable of beveling high-index lenses down to 0.01mm tolerance,
              preventing lens stress fractures and optical aberration.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[32px] mb-3">sanitizer</span>
            <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">Clinical Sanitization</h3>
            <p className="text-body-md font-body-md text-secondary mt-2">
              Every trial frame, autorefractor forehead rest, and phoropter aperture is UV-C sterilized before every
              single patient examination.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[32px] mb-3">loyalty</span>
            <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">Honest Pricing</h3>
            <p className="text-body-md font-body-md text-secondary mt-2">
              Direct partnerships with lens makers Zeiss, Essilor and Nova allow us to eliminate markups and deliver
              certified branded vision solutions with genuine cards.
            </p>
          </div>
        </div>

        {/* Store Walkthrough Section */}
        <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Boutique Walkthrough</h2>
            <p className="text-body-md font-body-md text-secondary mt-3">
              Step into an environment engineered for focused comfort. Quiet testing suites, shadow-free mirror
              lighting, and over 1,200 curated frames indexed by face shape and bridge width.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-body-md font-body-md text-on-surface">
                  Consultation Room 1: Auto-Refraction &amp; Keratometry
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-body-md font-body-md text-on-surface">
                  Consultation Room 2: Contact Lens Hygiene &amp; Slit Lamp Evaluation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-body-md font-body-md text-on-surface">
                  Boutique Hall: Titanium, Acetate, and Sunglass Display Gallery
                </span>
              </div>
            </div>
            <button
              className="mt-8 bg-primary text-on-primary px-6 py-3 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all cursor-pointer"
              onClick={() => openBookingModal()}
            >
              Book a Private Visit
            </button>
          </div>
          <div className="rounded-xl overflow-hidden border border-outline-variant/40 shadow-sm">
            <img
              className="w-full h-80 object-cover"
              data-alt="An expansive, high-end optical boutique interior with minimalist illuminated glass display cases showcasing designer frames. Polished grey terrazzo flooring, subtle clinical teal accents, and warm ambient light create a sophisticated, sterile, yet hospitable environment."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7gpSE6CKUjYSDNBPmXf11LcDj9BeoUWmi5UCgyxsmsQiZpSNSC2EiNby3l39vyruRF6nMqr8kBLJcdqNtNwdzsvix65mzkRbku8pRF44Cv4luyZ0Sl2dRWlBfvWw9kvBgtNYS3Qx3sfaNNxDNCS0lvg-Ttl4QPq8hH1rHwBSqOa9kimgbXOwNFXaPG7qdNKlQcA4hmQ_h3uOLwLPwgZFYSVUgkO_7bQSoByGswR0QDGrIJjO-4ZVp"
              alt="Dey Optical Boutique Interior"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
