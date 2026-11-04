import React, { useState, useEffect, useRef } from 'react';
import { animateHeroHeadline, animateFadeUp, animateStagger } from '../utils/animations.js';

const CAROUSEL_IMAGES = [
  { src: 'images/dey-carousel-1.jpg', label: 'Precision Diagnostic Suite' },
  { src: 'images/dey-carousel-2.jpg', label: 'High-Index Lens Edging Lab' },
  { src: 'images/dey-carousel-3.jpg', label: 'Curated Acetate Showcase' },
  { src: 'images/dey-carousel-4.jpg', label: 'Pediatric Vision Care' },
  { src: 'images/dey-carousel-5.jpg', label: 'Modern Spectacle Fitting' },
];

const STATS = [
  { icon: 'workspace_premium', value: '10+', label: 'Years of Expertise' },
  { icon: 'favorite', value: '10,000+', label: 'Happy Eyes' },
  { icon: 'science', value: 'Certified', label: 'In-House Lab' },
  { icon: 'verified', value: '100%', label: 'Accurate Testing' },
];

const CHECKLIST = [
  'Computerized Auto-Refraction & Slit-Lamp Examination',
  'Free-Form Digital Progressive Lens Fabrication',
  'Pediatric & Post-Op Refractive Correction',
  'Premium Frame Fitting & Optical Dispensing',
  'ZEISS, Essilor Crizal & Nova Lens Range',
];

export default function HeroSection({ scrollTo }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    animateHeroHeadline(headlineRef.current);
    animateFadeUp(subtitleRef.current, { delay: 200, duration: 700 });
    animateFadeUp(ctaRef.current, { delay: 380, duration: 700 });
    animateStagger(statsRef.current?.querySelectorAll('.stat-item'), { delay: 80, duration: 550 });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Carousel background */}
        {CAROUSEL_IMAGES.map((img, idx) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === currentSlide ? 1 : 0 }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
          <div className="max-w-2xl">
            <div
              ref={headlineRef}
              className="opacity-0"
            >
              <span className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-on-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Kolkata's Trusted Optometric Clinic
              </span>
              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-white mb-4">
                See Better.
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #6bd8cb, #89f5e7)' }}>
                  Look Better.
                </span>
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="opacity-0 text-[18px] md:text-[20px] text-white/80 font-normal leading-relaxed mb-8 max-w-lg"
            >
              Premium eyecare, boutique eyewear, and precision lens fabrication — all under one roof. Expert diagnosis by Dr. Arindam Dey, M.Optom.
            </p>

            <div ref={ctaRef} className="opacity-0 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('booking')}
                className="px-8 py-4 bg-primary text-on-primary rounded-2xl text-[16px] font-bold shadow-xl hover:bg-primary/90 hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                Book Appointment
              </button>
              <button
                onClick={() => scrollTo('gallery')}
                className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white border border-white/30 rounded-2xl text-[16px] font-bold hover:bg-white/25 active:scale-95 transition-all duration-200 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">photo_library</span>
                View Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-8 h-2.5 bg-primary'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Current slide label */}
        <div className="absolute bottom-8 right-6 z-20 hidden md:block">
          <span className="bg-black/40 backdrop-blur-sm text-white/80 text-[12px] font-medium px-3 py-1.5 rounded-full">
            {CAROUSEL_IMAGES[currentSlide].label}
          </span>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="bg-primary py-10 overflow-hidden">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-item opacity-0 flex flex-col items-center text-center group"
            >
              <span className="material-symbols-outlined text-on-primary/70 text-[28px] mb-2 group-hover:scale-110 transition-transform duration-200" style={{ fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
              <span className="text-[32px] font-bold text-on-primary tracking-tight leading-none">{stat.value}</span>
              <span className="text-[13px] font-medium text-on-primary/75 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <div className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div data-animate="fade-up">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                About the Clinic
              </span>
              <h2 className="text-[36px] md:text-[42px] font-bold text-on-surface tracking-tight leading-tight mb-5">
                Kolkata's Premier<br />
                <span className="text-primary">Optometric Clinic</span>
              </h2>
              <p className="text-[16px] text-on-surface-variant leading-relaxed mb-8">
                Dey Optical blends clinical precision with boutique style to deliver a complete optical experience. From computerized vision testing and digital lens fabrication to curated frame collections — we provide evidence-based eyecare for every age and lifestyle.
              </p>

              <ul className="space-y-3 mb-10">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-on-surface-variant">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo('booking')}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-xl font-bold text-[15px] shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
                Schedule Your Eye Exam
              </button>
            </div>

            {/* Right: Doctor card + image */}
            <div data-animate="fade-up" className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="images/dey-carousel-1.jpg"
                  alt="Dey Optical Clinic"
                  className="w-full h-[420px] object-cover"
                />
                {/* Overlay gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Doctor card floating at bottom */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <div>
                    <div className="font-bold text-[16px] text-on-surface">Dr. Arindam Dey</div>
                    <div className="text-[13px] text-secondary">M.Optom · 10+ Years Experience</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-amber-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                      <span className="text-[12px] text-secondary ml-1">4.9 / 5.0</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-primary/10 text-primary text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-on-primary rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-[22px] font-bold leading-none">10+</div>
                <div className="text-[11px] font-medium text-on-primary/80">Yrs Expertise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

