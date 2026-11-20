import React, { useState, useEffect, useRef, memo } from 'react';
import { animateHeroHeadline, animateFadeUp, animateStagger, prefersReducedMotion } from '../utils/animations.js';

const CAROUSEL_IMAGES = [
  { src: 'images/carousel/hero-carousel-1.png', label: 'Precision Diagnostic Suite' },
  { src: 'images/carousel/hero-carousel-2.png', label: 'High-Index Lens Edging Lab' },
  { src: 'images/carousel/hero-carousel-3.png', label: 'Curated Acetate Showcase' },
  { src: 'images/carousel/hero-carousel-4.png', label: 'Pediatric Vision Care' },
  { src: 'images/carousel/hero-carousel-5.png', label: 'Modern Spectacle Fitting' },
];

const CHECKLIST = [
  'Computerized Auto-Refraction & Slit-Lamp Examination',
  'Free-Form Digital Progressive Lens Fabrication',
  'Pediatric & Post-Op Refractive Correction',
  'Premium Frame Fitting & Optical Dispensing',
  'ZEISS, Essilor Crizal & Nova Lens Range',
];

const TYPEWRITER_PHRASE = "You'll Like It.";

/**
 * Isolated Typewriter leaf component.
 * Prevents the entire full-page HeroSection from re-rendering every 60-110ms.
 */
const TypewriterHeadline = memo(function TypewriterHeadline() {
  const [typewriterText, setTypewriterText] = useState(TYPEWRITER_PHRASE);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && typewriterText === TYPEWRITER_PHRASE) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && typewriterText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    } else {
      const stepSpeed = isDeleting ? 60 : 110;
      timer = setTimeout(() => {
        setTypewriterText((prev) =>
          isDeleting
            ? TYPEWRITER_PHRASE.slice(0, prev.length - 1)
            : TYPEWRITER_PHRASE.slice(0, prev.length + 1)
        );
      }, stepSpeed);
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting]);

  return (
    <span className="inline-flex items-center min-h-[1.15em] align-baseline whitespace-nowrap">
      <span
        className="text-transparent bg-clip-text"
        style={{ backgroundImage: 'linear-gradient(135deg, #FFFF00, #FFF500)' }}
      >
        {typewriterText || '\u200B'}
      </span>
      {/* Moving strand (blinking typewriter cursor) */}
      <span
        aria-hidden="true"
        className="inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.82em] bg-gradient-to-b from-[#FFFF00] to-[#FACC15] ml-1 sm:ml-1.5 rounded-full shadow-[0_0_12px_rgba(255,255,0,0.9)] align-middle typewriter-cursor flex-shrink-0"
      />
    </span>
  );
});

/**
 * Isolated StatsStrip leaf component.
 * Performs synchronized count-up animation when scrolling into viewport.
 * Triggers exactly once per page visit.
 */
const StatsStrip = memo(function StatsStrip() {
  const containerRef = useRef(null);
  const [counts, setCounts] = useState({
    exp: 0,
    eyes: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setCounts({ exp: 32, eyes: 10000, accuracy: 100 });
      const items = el.querySelectorAll('.stat-item');
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Trigger once and disconnect immediately so it never replays
          observer.disconnect();

          // Animate the items entrance (fade up with subtle stagger)
          const items = el.querySelectorAll('.stat-item');
          animateStagger(items, { delay: 60, duration: 550 });

          // Start synchronized count-up animation
          const DURATION = 2000;
          let startTimestamp = null;
          let rafId = null;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / DURATION, 1);
            // Ease-out cubic: smooth acceleration followed by graceful deceleration
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              exp: Math.round(ease * 32),
              eyes: Math.round(ease * 10000),
              accuracy: Math.round(ease * 100),
            });

            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            } else {
              setCounts({ exp: 32, eyes: 10000, accuracy: 100 });
            }
          };

          rafId = requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    {
      icon: 'workspace_premium',
      displayValue: `${counts.exp}+`,
      label: 'Years Experience',
    },
    {
      icon: 'favorite',
      displayValue: `${counts.eyes.toLocaleString()}+`,
      label: 'Happy Eyes',
    },
    {
      icon: 'science',
      displayValue: 'Certified',
      label: 'In-House Lab',
    },
    {
      icon: 'verified',
      displayValue: `${counts.accuracy}%`,
      label: 'Accurate Testing',
    },
  ];

  return (
    <div className="bg-[#CC0000] py-10 overflow-hidden border-y border-[#DC143C]/40">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-item opacity-0 flex flex-col items-center text-center group"
          >
            <span
              className="material-symbols-outlined text-[#FFFF00] text-[28px] mb-2 group-hover:scale-110 transition-transform duration-200"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {stat.icon}
            </span>
            <span className="text-[32px] font-bold text-white tracking-tight leading-none tabular-nums min-h-[32px] flex items-center justify-center">
              {stat.displayValue}
            </span>
            <span className="text-[13px] font-medium text-white/85 mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

function HeroSectionComponent({ scrollTo, navigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const handleBookingClick = () => {
    if (typeof navigate === 'function') navigate('booking');
    else if (typeof scrollTo === 'function') scrollTo('booking');
  };

  const handleGalleryClick = () => {
    if (typeof navigate === 'function') navigate('gallery');
    else if (typeof scrollTo === 'function') scrollTo('gallery');
  };

  useEffect(() => {
    animateHeroHeadline(headlineRef.current);
    animateFadeUp(subtitleRef.current, { delay: 200, duration: 700 });
    animateFadeUp(ctaRef.current, { delay: 380, duration: 700 });
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
              fetchpriority={idx === 0 ? 'high' : 'low'}
              decoding="async"
              width="1920"
              height="1080"
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
              <span className="inline-flex items-center gap-2 bg-[#CC0000] backdrop-blur-sm text-white text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-[#FFFF00]/40 shadow-md">
                <span className="material-symbols-outlined text-[#FFFF00] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Bankura's Trusted Optometric Clinic
              </span>
              <h1 className="text-[40px] sm:text-[54px] md:text-[64px] lg:text-[72px] font-bold leading-[1.08] tracking-tight text-white mb-4">
                Try It.
                <br />
                <TypewriterHeadline />
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
                onClick={handleBookingClick}
                className="px-8 py-4 bg-[#CC0000] text-white rounded-2xl text-[16px] font-bold shadow-xl hover:bg-[#DC143C] hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                Book Appointment
              </button>
              <button
                onClick={handleGalleryClick}
                className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:border-[#FFFF00]/60 hover:bg-[#FFFF00]/15 rounded-2xl text-[16px] font-bold active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
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
                ? 'w-8 h-2.5 bg-[#FFFF00] shadow-sm'
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
      <StatsStrip />

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
                  onClick={handleBookingClick}
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
                  src="images/about/about-clinic.png"
                  alt="Dey Optical Beliatore Clinic"
                  className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-[center_35%]"
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="420"
                />
                {/* Overlay gradient at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Visiting Specialists Floating Card (Responsive Stack on Mobile) */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl border border-white/60">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#CC0000]/15 text-[#CC0000] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[22px] sm:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stethoscope
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[14px] sm:text-[16px] text-on-surface truncate">Visiting Specialists</div>
                      <div className="text-[11px] sm:text-[13px] text-secondary font-medium truncate">
                        Dr. S. Dandapath &bull; Optom. A. Patra
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-[#CC0000] mt-0.5">
                        Sunday &amp; Thursday Chambers
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => scrollTo('doctors')}
                    className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-xl bg-[#CC0000] hover:bg-[#DC143C] text-white text-[12px] sm:text-[13px] font-bold active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View Schedule</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Floating accent badge - safely positioned on mobile to prevent horizontal viewport overflow */}
              <div className="absolute top-3 right-3 sm:-top-3 sm:-right-3 bg-[#CC0000] text-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-[#FFFF00]/40">
                <div className="text-[15px] sm:text-[18px] font-bold leading-none text-[#FFFF00]">Beliatore</div>
                <div className="text-[10px] sm:text-[11px] font-medium text-white/90">Bankura, WB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(HeroSectionComponent);

