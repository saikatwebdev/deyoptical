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
                Bankura's Trusted Optometric Clinic
              </span>
              <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-white mb-4">
                Try It.
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #6bd8cb, #89f5e7)' }}>
                  You'll Like It..
                </span>
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="opacity-0 text-[18px] md:text-[20px] text-white/80 font-normal leading-relaxed mb-8 max-w-lg"
            >
              Premium eyecare, boutique eyewear, and precision lens fabrication in Beliatore. Chamber consultations by Senior Eye Specialists &amp; Phaco Surgeons.
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
              className={`transition-all duration-300 rounded-full ${idx === currentSlide
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
      <div className="py-11 sm:py-14 lg:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div data-animate="fade-up">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 sm:mb-5">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                About the Clinic
              </span>
              <h2 className="text-[30px] sm:text-[38px] md:text-[42px] font-bold text-on-surface tracking-tight leading-tight mb-4 sm:mb-5">
                Beliatore's Trusted<br />
                <span className="text-primary">Eye Care Centre</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-on-surface-variant leading-relaxed mb-6 sm:mb-8">
                Dey Optical blends clinical diagnostic precision with comprehensive eyewear curation. Serving Beliatore and Bankura with visiting senior ophthalmic surgeons, computerized refraction, and premium lenses tailored for every visual need.
              </p>

              <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-on-surface-variant">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => scrollTo('doctors')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-xl font-bold text-[15px] shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stethoscope</span>
                  <span>Visiting Doctors</span>
                </button>
                <button
                  onClick={() => scrollTo('booking')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-high text-on-surface rounded-xl font-bold text-[15px] hover:bg-surface-container-highest active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Right: Clinic showcase with Visiting Specialists badge (Fully Mobile Optimized) */}
            <div data-animate="fade-up" className="relative mt-4 lg:mt-0">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-outline-variant/30">
                <img
                  src="images/dey-carousel-1.jpg"
                  alt="Dey Optical Beliatore Clinic"
                  className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-[center_35%]"
                  loading="lazy"
                />
                {/* Overlay gradient at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Visiting Specialists Floating Card (Responsive Stack on Mobile) */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl border border-white/60">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[22px] sm:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stethoscope
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[14px] sm:text-[16px] text-on-surface truncate">Visiting Specialists</div>
                      <div className="text-[11px] sm:text-[13px] text-secondary font-medium truncate">
                        Dr. S. Dandapath &bull; Optom. A. Patra
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-primary mt-0.5">
                        Sunday &amp; Thursday Chambers
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => scrollTo('doctors')}
                    className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-[12px] sm:text-[13px] font-bold active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View Schedule</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Floating accent badge - safely positioned on mobile to prevent horizontal viewport overflow */}
              <div className="absolute top-3 right-3 sm:-top-3 sm:-right-3 bg-primary text-on-primary rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-white/20">
                <div className="text-[15px] sm:text-[18px] font-bold leading-none">Beliatore</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-on-primary/80">Bankura, WB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

