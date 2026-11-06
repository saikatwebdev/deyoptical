import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { PRODUCTS, ARTICLES, AT_DATA, GALLERY_ITEMS } from '../data/mockData.js';
import { animateHeroHeadline, animateStagger } from '../utils/animations.js';

export default function HomeView({
  navigate,
  setCategoryFilter,
  openBookingModal,
  openProductModal,
  quickEnquireWhatsApp,
  openCategoryEnquiry,
  openLightbox,
  openArticle
}) {
  // --- HERO CAROUSEL STATE ---
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlidesCount = 5;
  const heroTimerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const heroHeadlineRef = useRef(null);
  const statsGridRef = useRef(null);
  const catGridRef = useRef(null);
  const featuredGridRef = useRef(null);

  const heroSlides = [
    {
      img: "images/dey-carousel-1.jpg",
      alt: "Dey Optical store dispensing and eyewear consultation with patient"
    },
    {
      img: "images/dey-carousel-2.jpg",
      alt: "Dey Optical personalized sports and active eyewear consultation"
    },
    {
      img: "images/dey-carousel-3.jpg",
      alt: "Dey Optical authentic store experience and custom optical packaging"
    },
    {
      img: "images/dey-carousel-4.jpg",
      alt: "Dey Optical certified opticians and showroom counter dispensing"
    },
    {
      img: "images/dey-carousel-5.jpg",
      alt: "Dey Optical patient vision excellence and eyewear delivery"
    }
  ];

  const startHeroAutoPlay = () => {
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    heroTimerRef.current = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlidesCount);
    }, 4500);
  };

  const pauseHeroAutoPlay = () => {
    if (heroTimerRef.current) {
      clearInterval(heroTimerRef.current);
      heroTimerRef.current = null;
    }
  };

  useEffect(() => {
    startHeroAutoPlay();
    if (heroHeadlineRef.current) {
      animateHeroHeadline(heroHeadlineRef.current);
    }
    if (statsGridRef.current) {
      animateStagger(statsGridRef.current.children, { delay: 60, duration: 450 });
    }
    if (catGridRef.current) {
      animateStagger(catGridRef.current.children, { delay: 40, duration: 400 });
    }
    if (featuredGridRef.current) {
      animateStagger(featuredGridRef.current.children, { delay: 60, duration: 450 });
    }
    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    };
  }, []);

  const goToHeroSlide = (idx) => {
    setHeroIndex(idx);
    pauseHeroAutoPlay();
    startHeroAutoPlay();
  };

  const heroNext = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlidesCount);
    pauseHeroAutoPlay();
    startHeroAutoPlay();
  };

  const heroPrev = () => {
    setHeroIndex((prev) => (prev - 1 + heroSlidesCount) % heroSlidesCount);
    pauseHeroAutoPlay();
    startHeroAutoPlay();
  };

  // --- ACETERNITY 3D CARD TILT HANDLERS ---
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 12;
    const rotY = dx * 12;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
    const px = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + '%';
    const py = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + '%';
    card.style.setProperty('--mouse-x', px);
    card.style.setProperty('--mouse-y', py);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  // --- ANIMATED TESTIMONIALS STACK STATE ---
  const [atIdx, setAtIdx] = useState(0);
  const [atExitingIdx, setAtExitingIdx] = useState(null);
  const atTotal = AT_DATA.length;
  const atTimerRef = useRef(null);

  const atGoTo = (newIdx) => {
    setAtExitingIdx(atIdx);
    setTimeout(() => {
      setAtIdx(newIdx);
      setAtExitingIdx(null);
    }, 60);
  };

  const atNext = () => {
    atGoTo((atIdx + 1) % atTotal);
  };

  const atPrev = () => {
    atGoTo((atIdx - 1 + atTotal) % atTotal);
  };

  useEffect(() => {
    atTimerRef.current = setInterval(atNext, 6000);
    return () => {
      if (atTimerRef.current) clearInterval(atTimerRef.current);
    };
  }, [atIdx]);

  const pauseAtTimer = () => {
    if (atTimerRef.current) clearInterval(atTimerRef.current);
  };

  const resumeAtTimer = () => {
    if (atTimerRef.current) clearInterval(atTimerRef.current);
    atTimerRef.current = setInterval(atNext, 6000);
  };

  const getAtClass = (i) => {
    if (atExitingIdx === i) return 'at-exit';
    const rel = (i - atIdx + atTotal) % atTotal;
    if (rel === 0) return 'at-active';
    if (rel === 1) return 'at-behind-1';
    if (rel === 2) return 'at-behind-2';
    if (rel === 3) return 'at-behind-3';
    return 'at-hidden';
  };

  return (
    <section className="view-section active-view" id="view-home">
      {/* HERO CAROUSEL SECTION */}
      <div
        className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-slate-900 border-b border-outline-variant/30 select-none group"
        id="hero-carousel-container"
        onMouseEnter={pauseHeroAutoPlay}
        onMouseLeave={startHeroAutoPlay}
        onTouchStart={(e) => {
          touchStartXRef.current = e.changedTouches[0].screenX;
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.changedTouches[0].screenX;
          if (touchStartXRef.current - touchEndX > 50) {
            heroNext();
          } else if (touchEndX - touchStartXRef.current > 50) {
            heroPrev();
          }
        }}
      >
        {/* Carousel Slides */}
        <div className="absolute inset-0 w-full h-full" id="hero-carousel-slides">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              className={`hero-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === heroIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              data-index={idx}
            >
              <img
                className="w-full h-full object-cover object-[center_25%] scale-100 transition-transform duration-7000 ease-out"
                alt={slide.alt}
                src={slide.img}
              />
            </div>
          ))}
        </div>

        {/* Ambient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/35 backdrop-brightness-95 pointer-events-none z-10" />

        {/* Floating Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pointer-events-auto">
          <h1 ref={heroHeadlineRef} className="text-display-mobile sm:text-display md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Try It.<br />
            <span className="text-primary-fixed">You'll LIke It..</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <button
              className="bg-white text-on-surface hover:bg-surface-bright px-7 py-3.5 rounded-lg text-label-md font-label-md transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 font-semibold backdrop-blur-sm cursor-pointer"
              onClick={() => navigate('eyewear')}
            >
              <span className="material-symbols-outlined text-[20px]">visibility</span>
              <span>Explore Eyewear</span>
            </button>
            <button
              className="hidden sm:flex bg-primary text-on-primary hover:bg-primary-container px-7 py-3.5 rounded-lg text-label-md font-label-md transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 items-center gap-2.5 font-semibold cursor-pointer"
              onClick={() => openBookingModal()}
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Book Eye Exam</span>
            </button>
          </div>
        </div>

        {/* Prev / Next Navigation Arrows */}
        <button
          aria-label="Previous Slide"
          onClick={heroPrev}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg opacity-80 hover:opacity-100 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>
        <button
          aria-label="Next Slide"
          onClick={heroNext}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg opacity-80 hover:opacity-100 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>

        {/* Slide Indicator Dots */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15"
          id="hero-carousel-indicators"
        >
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToHeroSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === heroIndex ? 'bg-primary w-7' : 'bg-white/40 hover:bg-white/70 w-2.5'
                }`}
            />
          ))}
        </div>
      </div>

      {/* TRUST STATS BAR — Aceternity 3D Card Effect & Background Lines */}
      <div className="bg-lines-wrap bg-surface-container-low border-b border-outline-variant/30 py-12">
        <svg
          className="bg-lines-svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M-20,110 C200,30 400,190 720,110 C1040,30 1240,190 1460,110" />
          <path d="M-20,80  C180,10 420,160 720,80  C1020,10 1260,160 1460,80" />
          <path d="M-20,140 C220,60 460,200 720,140 C980,60 1220,200 1460,140" />
          <path d="M-20,60  C160,-10 440,140 720,60  C1000,-10 1280,140 1460,60" />
          <path d="M-20,160 C240,80 480,210 720,160 C960,80 1200,210 1460,160" />
          <path d="M-20,40  C140,-20 460,120 720,40  C980,-20 1300,120 1460,40" />
          <path d="M-20,180 C260,100 500,220 720,180 C940,100 1180,220 1460,180" />
          <path d="M-20,20  C120,-30 480,100 720,20  C960,-30 1320,100 1460,20" />
          <path d="M-20,200 C280,120 520,230 720,200 C920,120 1160,230 1460,200" />
          <path d="M0,110   C240,50  480,170 720,110 C960,50  1200,170 1440,110" />
          <path d="M0,90    C200,20  500,160 720,90  C940,20  1240,160 1440,90" />
          <path d="M0,130   C220,70  460,180 720,130 C980,70  1220,180 1440,130" />
          <path d="M0,70    C180,10  480,150 720,70  C960,10  1260,150 1440,70" />
          <path d="M0,150   C260,90  500,190 720,150 C940,90  1180,190 1440,150" />
          <path d="M0,50    C160,-10 460,130 720,50  C980,-10 1280,130 1440,50" />
          <path d="M0,170   C280,110 520,200 720,170 C920,110 1160,200 1440,170" />
          <path d="M0,30    C140,-20 480,110 720,30  C960,-20 1300,110 1440,30" />
          <path d="M0,190   C300,130 540,210 720,190 C900,130 1140,210 1440,190" />
          <path d="M0,10    C120,-30 500,90  720,10  C940,-30 1320,90  1440,10" />
          <path d="M0,210   C320,150 560,220 720,210 C880,150 1120,220 1440,210" />
        </svg>

        <div ref={statsGridRef} data-animate-stagger className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7">
          {/* Card 1 */}
          <div className="ace-card-wrap">
            <div
              className="ace-card relative flex flex-col items-center justify-center gap-2 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 cursor-default text-center overflow-hidden group"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('images/down_hero/image.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="ace-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-1 group-hover:bg-primary/15 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">workspace_premium</span>
              </div>
              <div className="ace-card-stat text-headline-lg font-headline-lg font-bold text-primary font-mono-data leading-none">
                10+
              </div>
              <div className="ace-card-label text-label-md font-label-md text-on-surface font-semibold">
                Years Experience
              </div>
              <div className="ace-card-sub text-body-sm font-body-sm text-secondary">Optometric Excellence</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="ace-card-wrap">
            <div
              className="ace-card relative flex flex-col items-center justify-center gap-2 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 cursor-default text-center overflow-hidden group"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('images/down_hero/image copy.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="ace-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-1 group-hover:bg-primary/15 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">favorite</span>
              </div>
              <div className="ace-card-stat text-headline-lg font-headline-lg font-bold text-primary font-mono-data leading-none">
                10,000+
              </div>
              <div className="ace-card-label text-label-md font-label-md text-on-surface font-semibold">
                Happy Eyes
              </div>
              <div className="ace-card-sub text-body-sm font-body-sm text-secondary">Corrected &amp; Protected</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="ace-card-wrap">
            <div
              className="ace-card relative flex flex-col items-center justify-center gap-2 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 cursor-default text-center overflow-hidden group"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('images/down_hero/image copy 2.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="ace-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-1 group-hover:bg-primary/15 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">biotech</span>
              </div>
              <div className="ace-card-stat text-headline-lg font-headline-lg font-bold text-primary font-mono-data leading-none">
                100%
              </div>
              <div className="ace-card-label text-label-md font-label-md text-on-surface font-semibold">
                Accurate Testing
              </div>
              <div className="ace-card-sub text-body-sm font-body-sm text-secondary">Computerized Diagnostic</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="ace-card-wrap">
            <div
              className="ace-card relative flex flex-col items-center justify-center gap-2 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 cursor-default text-center overflow-hidden group"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('images/down_hero/Screenshot 2026-10-06 224245.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="ace-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-1 group-hover:bg-primary/15 transition-colors">
                <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
              </div>
              <div className="ace-card-stat text-headline-lg font-headline-lg font-bold text-primary font-mono-data leading-none">
                Certified
              </div>
              <div className="ace-card-label text-label-md font-label-md text-on-surface font-semibold">
                Lens Fitting Lab
              </div>
              <div className="ace-card-sub text-body-sm font-body-sm text-secondary">Essilor &amp; Zeiss Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div data-animate="fade-up" className="lg:col-span-5 relative">
            <img
              className="w-full h-80 rounded-2xl object-cover border border-outline-variant/40 shadow-sm"
              data-alt="An optometrist in a clean, modern clinical consultation room conducting a precise vision test using high-tech ophthalmic diagnostic equipment."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjXhg6UZ9r6BcqoXUqaWyNR7gt69IOTTOztjzIBvkLb_uywWTNAdJe7RUgPnusoYJhawRdVHCoQgK2uo9_69nrZE3WMHWUhGwKrq0i5zuSgYKh7lEFVkqvgPN4Xrc350aY_7Ca2hpy5HFwvCq7CPk-XqdQ7u-4HGsOtlWEWZb9FnMSQ-RNT3xNMFlgsMcREHW7ao40SvFbyb9nssui2JMfef5aWSQ_63lkWcfQeQotDpgikXgdJZJB"
              alt="Dr. Arindam Dey conducting vision exam"
            />
            <div className="absolute -bottom-4 -right-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 shadow-md hidden sm:flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">psychology_alt</span>
              <div>
                <p className="text-label-md font-label-md text-on-surface">Dr. Arindam Dey</p>
                <p className="text-body-sm font-body-sm text-secondary">M.Optom, FIACLE</p>
              </div>
            </div>
          </div>
          <div data-animate="fade-up" className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-primary text-label-md font-label-md">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Our Practice Heritage</span>
            </div>
            <h2 className="text-headline-lg md:text-headline-lg font-headline-lg text-on-surface">
              Your Vision, Our Responsibility.
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              At Dey Optical, our mission unites diagnostic clinical precision with modern eyewear curation. We believe
              eye care is not simply a retail transaction, but an ongoing healthcare partnership. Every single lens
              prescribed is shaped with high-index computer edging, anti-fatigue coatings, and customized vertex
              distance calculations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-body-sm font-body-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                <span>Computerized Cornea &amp; Vision Check</span>
              </div>
              <div className="flex items-center gap-2.5 text-body-sm font-body-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                <span>Hospital Grade UV Sterilized Testing</span>
              </div>
              <div className="flex items-center gap-2.5 text-body-sm font-body-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                <span>Direct Optometrist Consultation</span>
              </div>
              <div className="flex items-center gap-2.5 text-body-sm font-body-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                <span>Free Frame Fitting &amp; Screw Maintenance</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container text-label-md font-label-md cursor-pointer"
                onClick={() => navigate('about')}
              >
                <span>Learn more about our heritage &amp; lab</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EYEWEAR CATEGORIES */}
      <section className="bg-lines-wrap bg-surface-container-low/60 border-y border-outline-variant/30 py-16">
        <svg
          className="bg-lines-svg"
          viewBox="0 0 1440 340"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M-20,170 C200,60  420,280 720,170 C1020,60  1240,280 1460,170" />
          <path d="M-20,130 C180,30  440,250 720,130 C1000,30  1260,250 1460,130" />
          <path d="M-20,210 C220,100 460,310 720,210 C980,100  1220,310 1460,210" />
          <path d="M-20,90  C160,-10 460,210 720,90  C980,-10  1300,210 1460,90" />
          <path d="M-20,250 C260,140 500,330 720,250 C940,140  1180,330 1460,250" />
          <path d="M-20,50  C140,-30 480,170 720,50  C960,-30  1320,170 1460,50" />
          <path d="M-20,290 C280,180 520,340 720,290 C920,180  1160,340 1460,290" />
          <path d="M-20,20  C120,-50 500,140 720,20  C940,-50  1320,140 1460,20" />
          <path d="M-20,320 C300,210 540,340 720,320 C900,210  1140,340 1460,320" />
          <path d="M0,170   C240,80  480,260 720,170 C960,80   1200,260 1440,170" />
          <path d="M0,110   C200,10  500,230 720,110 C940,10   1240,230 1440,110" />
          <path d="M0,230   C260,120 500,320 720,230 C940,120  1180,320 1440,230" />
          <path d="M0,70    C180,-20 480,190 720,70  C960,-20  1260,190 1440,70" />
          <path d="M0,270   C280,160 520,330 720,270 C920,160  1160,330 1440,270" />
          <path d="M0,40    C160,-40 480,160 720,40  C960,-40  1280,160 1440,40" />
          <path d="M0,300   C300,190 540,340 720,300 C900,190  1140,340 1440,300" />
          <path d="M0,10    C140,-60 500,130 720,10  C940,-60  1300,130 1440,10" />
          <path d="M0,330   C320,220 560,340 720,330 C880,220  1120,340 1440,330" />
          <path d="M0,340   C340,240 580,340 720,340 C860,240  1100,340 1440,340" />
          <path d="M0,0     C120,-70 520,120 720,0   C920,-70  1320,120 1440,0" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div data-animate="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
                Curation
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">Featured Categories</h2>
            </div>
            <button
              className="text-label-md font-label-md text-primary hover:underline flex items-center gap-1 cursor-pointer"
              onClick={() => navigate('eyewear')}
            >
              <span>View all categories</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div ref={catGridRef} data-animate-stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Eyeglasses', sub: 'Single & Bifo', icon: 'eyeglasses', bg: 'images/down_hero/image.png' },
              { title: 'Sunglasses', sub: 'UV400 Polarized', icon: 'sunny', bg: 'images/down_hero/image copy.png' },
              { title: 'Designer Frames', sub: 'Acetate & Titanium', icon: 'diamond', bg: 'images/down_hero/image copy 2.png' },
              { title: 'Contact Lenses', sub: 'Daily & Monthly', icon: 'lens', bg: 'images/down_hero/Screenshot 2026-10-06 224245.png' },
              { title: 'Blue-Cut Lenses', sub: 'Screen Defense', icon: 'laptop', bg: 'images/down_hero/image copy.png' },
              { title: 'Kids Eyewear', sub: 'Flexible & Safe', icon: 'child_care', bg: 'images/down_hero/image copy 2.png' }
            ].map((cat, idx) => (
              <div key={idx} className="ace-card-wrap">
                <div
                  className="ace-card relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-outline-variant/30 cursor-pointer text-center overflow-hidden group"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,20,18,0.55), rgba(0,104,95,0.35)), url('${cat.bg}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => {
                    navigate('eyewear');
                    setCategoryFilter(cat.title);
                  }}
                >
                  <div className="ace-card-icon w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-1 group-hover:bg-white/25 transition-colors">
                    <span className="material-symbols-outlined text-white text-[24px]">{cat.icon}</span>
                  </div>
                  <h3 className="ace-card-stat text-label-md font-label-md text-white font-semibold">
                    {cat.title}
                  </h3>
                  <p className="ace-card-label text-body-sm font-body-sm text-white/75 mt-0.5">
                    {cat.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div data-animate="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
              Dispensing &amp; Eyewear Portfolio
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">Sample Eyewear Styles</h2>
            <p className="text-body-sm font-body-sm text-secondary mt-1">
              We do not sell online. View sample silhouettes from our practice categories and enquire on WhatsApp.
            </p>
          </div>
          <button
            className="text-label-md font-label-md text-primary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            onClick={() => navigate('eyewear')}
          >
            <span>Explore all product categories</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div ref={featuredGridRef} data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="home-featured-grid">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpenDetails={openProductModal}
              onQuickEnquire={quickEnquireWhatsApp}
            />
          ))}
        </div>
      </section>

      {/* LENS PARTNER STRIP */}
      <div data-animate="fade-up" className="border-y border-outline-variant/30 bg-surface-container-low py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <p className="text-center text-label-sm font-label-sm text-secondary uppercase tracking-widest mb-6 font-semibold">
            Authorized Lens Engineering Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-80">
            <div className="flex items-center gap-2 font-display text-headline-sm font-bold tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-primary text-[24px]">blur_on</span> ZEISS
            </div>
            <div className="flex items-center gap-2 font-display text-headline-sm font-bold tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-primary text-[24px]">hdr_strong</span> ESSILOR
            </div>
            <div className="flex items-center gap-2 font-display text-headline-sm font-bold tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-primary text-[24px]">adjust</span> NOVA
            </div>
            <div className="flex items-center gap-2 font-display text-headline-sm font-bold tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-primary text-[24px]">flare</span> PRIME LENS
            </div>
          </div>
        </div>
      </div>

      {/* CLINICAL EYE CARE SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div data-animate="fade-up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
            Comprehensive Clinical Scope
          </span>
          <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">Eye Care Services</h2>
          <p className="text-body-md font-body-md text-secondary mt-2">
            Certified optometric protocols, computerized auto-refraction, and customized corrective solutions designed for lifelong vision health.
          </p>
        </div>
        <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: 'biotech',
              title: 'Accurate Computerized Testing',
              desc: 'Digital auto-refractor cornea mapping and subjective refraction yielding exact diopter measurements for zero eyestrain.'
            },
            {
              icon: 'eyeglasses',
              title: 'Prescription Glasses Fitting',
              desc: 'Pupillary distance (PD) measurement and optical center alignment ensuring your focal point matches lens geometry.'
            },
            {
              icon: 'lens',
              title: 'Contact Lenses Fitting',
              desc: 'Corneal curvature evaluation, tear film stability tests, and hygienic trial insertion training for daily or monthly lenses.'
            },
            {
              icon: 'laptop',
              title: 'Progressive & Blue Consultation',
              desc: 'Seamless multi-focal corridor selection for presbyopia, plus high-spectrum blue-violet light filtration for digital workers.'
            },
            {
              icon: 'build',
              title: 'Frame Fitting & Adjustments',
              desc: 'Precision ultrasonic frame alignment, nose pad adjustments, temple curvature tuning, and screw replacements.'
            },
            {
              icon: 'child_care',
              title: 'Pediatric Eye Care',
              desc: 'Child-friendly refractive screening detecting early myopia progression, amblyopia, and ergonomic reading posture guidance.'
            }
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary/50 hover-lift transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[24px]">{service.icon}</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                  {service.title}
                </h3>
                <p className="text-body-md font-body-md text-secondary mt-2">
                  {service.desc}
                </p>
              </div>
              <button
                className="mt-4 text-primary text-label-md font-label-md flex items-center gap-1 hover:underline cursor-pointer"
                onClick={() => navigate('eye-care')}
              >
                Read protocol <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* OPTOMETRIST SPOTLIGHT */}
      <section className="bg-surface-container-low border-y border-outline-variant/30 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div data-animate="fade-up" className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="relative w-48 h-48 mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A portrait of a male consultant optometrist wearing sleek modern spectacles and a pristine clinical lab coat."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkpa7sRcXCA0qu3MlCc8uI0VzPB6SWHAjd3Wk5Ie2oKytD_iz1OYEI7GLvtea-TCeaEOqBqSf0CWSiZoMvlOl1__p0X0NBfcfQGWS9_4JzEqoRKaKMuLtAKCVaLXVvUUxMO4MJhHaZg6Eul30xRwd0hno89cRVrZPQfB8qM1-uDGwlexCu5wfd5ci9KrwxSCweczVXSki8xaBbLNprerYETNnXxblUDrmLENrMAEqRmFovwBjiWMtw"
                  alt="Dr. Arindam Dey"
                />
              </div>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-primary text-label-sm font-label-sm font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">verified</span> Chief Consultant Optometrist
              </div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Dr. Arindam Dey</h2>
              <p className="text-label-md font-label-md text-secondary font-mono-data">
                M.Optom, FIACLE (Fellow of International Association of Contact Lens Educators)
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant">
                "Our practice is rooted in uncompromising accuracy. Clear vision should never compromise personal
                expression. Whether fitting an intricate progressive corridor or treating digital strain, my priority is
                your long-term retinal and visual comfort."
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all cursor-pointer"
                  onClick={() => navigate('doctor')}
                >
                  View Doctor Profile &amp; Clinic Hours
                </button>
                <button
                  className="bg-surface-container border border-outline-variant/40 text-on-surface px-5 py-2.5 rounded-lg text-label-md font-label-md hover:bg-surface-container-high transition-all cursor-pointer"
                  onClick={() => openBookingModal()}
                >
                  Book Slot with Dr. Dey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASONRY GALLERY PREVIEW WITH LIGHTBOX TRIGGER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div data-animate="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
              Visual Tour
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">Practice &amp; Boutique Gallery</h2>
          </div>
          <button
            className="text-label-md font-label-md text-primary hover:underline flex items-center gap-1 cursor-pointer"
            onClick={() => navigate('gallery')}
          >
            <span>Open full interactive gallery</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div data-animate-stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" id="home-gallery-preview">
          {GALLERY_ITEMS.slice(0, 4).map((g, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-outline-variant/30 relative h-60 bg-surface-container-low shadow-xs hover-lift"
            >
              <img
                src={g.img || 'images/dey-carousel-1.jpg'}
                alt={`${g.title} at Dey Optical`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-label-sm font-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                  {g.cat}
                </span>
                <h4 className="text-label-md font-label-md font-semibold text-on-primary">{g.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS — Aceternity Animated Testimonials 3D Stack */}
      <section className="bg-surface-container-low border-t border-outline-variant/30 py-16" id="at-testimonials-section">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Section header */}
          <div data-animate="fade-up" className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
                Verified Patient Reviews
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">
                Stories of Restored Vision
              </h2>
              <p className="text-body-md font-body-md text-secondary mt-1">
                Clinical precision meets compassionate care. Here is what our patients say.
              </p>
            </div>
            {/* Nav Arrows (desktop) */}
            <div className="flex items-center gap-3">
              <button
                className="at-nav-btn"
                onClick={atPrev}
                aria-label="Previous testimonial"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                className="at-nav-btn"
                onClick={atNext}
                aria-label="Next testimonial"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Main 2-col content */}
          <div data-animate="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Image Card Stack */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                id="at-image-stack"
                onMouseEnter={pauseAtTimer}
                onMouseLeave={resumeAtTimer}
              >
                {AT_DATA.map((d, i) => (
                  <div key={i} className={`at-img-card ${getAtClass(i)}`}>
                    <img src={d.img} alt={d.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Animated Text Block */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined at-star text-[22px] fill-icon">
                    star
                  </span>
                ))}
                <span className="ml-2 text-body-sm font-body-sm text-secondary font-mono-data">5.0 / 5.0</span>
              </div>

              {/* Quote */}
              <blockquote
                key={`q-${atIdx}`}
                id="at-quote"
                className="at-text-anim text-headline-sm sm:text-headline-md font-headline-md font-medium text-on-surface leading-snug mb-8 relative"
              >
                "{AT_DATA[atIdx].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between border-t border-outline-variant/30 pt-6">
                <div>
                  <div
                    key={`name-${atIdx}`}
                    id="at-author-name"
                    className="at-text-anim text-headline-sm font-headline-sm font-semibold text-on-surface"
                  >
                    {AT_DATA[atIdx].name}
                  </div>
                  <div
                    key={`role-${atIdx}`}
                    id="at-author-role"
                    className="at-text-anim text-body-sm font-body-sm text-secondary mt-0.5"
                  >
                    {AT_DATA[atIdx].role}
                  </div>
                </div>

                {/* Dot Indicators */}
                <div id="at-dots" className="flex items-center gap-2 ml-2">
                  {AT_DATA.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => atGoTo(i)}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        background: i === atIdx ? 'var(--md-sys-color-primary, #00685f)' : 'var(--md-sys-color-outline-variant, rgba(0,104,95,0.3))',
                        transform: i === atIdx ? 'scale(1.35)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY / BLOG HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div data-animate="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
              Patient Education
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">Eye Health Journal</h2>
          </div>
          <button
            className="text-label-md font-label-md text-primary hover:underline flex items-center gap-1 cursor-pointer"
            onClick={() => navigate('community')}
          >
            <span>Browse all articles</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" id="home-articles-container">
          {ARTICLES.map((a) => (
            <article
              key={a.id}
              onClick={() => openArticle(a.id)}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs hover:border-primary/50 hover-lift transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="overflow-hidden h-56 w-full bg-surface-container">
                <img
                  alt={a.title}
                  src={a.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1160'}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    <span>{a.category}</span>
                    <span className="text-secondary font-mono-data font-normal">{a.readTime}</span>
                  </div>

                  <a
                    href="javascript:void(0)"
                    onClick={(e) => {
                      e.stopPropagation();
                      openArticle(a.id);
                    }}
                    className="block"
                  >
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {a.summary}
                  </p>
                </div>

                <a
                  href="javascript:void(0)"
                  onClick={(e) => {
                    e.stopPropagation();
                    openArticle(a.id);
                  }}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-container"
                >
                  Find out more
                  <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VISIT & CONTACT CTA BANNER */}
      <div data-animate="fade-up" className="bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <span className="text-label-sm font-label-sm uppercase tracking-wider text-primary-fixed font-semibold">
              Visit Our Registered Practice
            </span>
            <h2 className="text-headline-lg font-headline-lg font-bold">Experience Unmatched Visual Precision</h2>
            <p className="text-body-lg font-body-lg opacity-90 max-w-2xl">
              Walk in for computerized testing or schedule a personalized frame styling appointment. Open 7 days a week
              with certified optometrists on premise.
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-body-sm font-body-sm opacity-90">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>Mon-Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>+91 98300 00000 / 033 2456 7890</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              className="w-full bg-surface-container-lowest text-on-surface px-6 py-3 rounded-lg text-label-md font-label-md hover:bg-surface-bright transition-all text-center font-semibold shadow-sm cursor-pointer"
              onClick={() => openBookingModal()}
            >
              Schedule Eye Exam Now
            </button>
            <a
              className="w-full bg-primary-container text-on-primary border border-primary-fixed/30 px-6 py-3 rounded-lg text-label-md font-label-md hover:bg-tertiary transition-all text-center flex items-center justify-center gap-2"
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">near_me</span>
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
