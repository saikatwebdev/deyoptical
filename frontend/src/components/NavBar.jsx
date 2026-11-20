import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

const DESKTOP_NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'Doctors', target: 'doctors' },
  { label: 'Testimonials', target: 'testimonials' },
  { label: 'Gallery', target: 'gallery' },
  { label: 'Eyewear', target: 'lenses' },
];

function NavBarComponent({ scrollTo, navigate, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleNav = useCallback((target) => {
    setMenuOpen(false);
    if (target === 'home') {
      navigate('home');
      if (typeof scrollTo === 'function') scrollTo('home');
    } else if (target === 'doctors') {
      navigate('home', 'doctors');
    } else if (target === 'testimonials') {
      navigate('home', 'testimonials');
    } else if (target === 'gallery') {
      navigate('gallery');
    } else if (target === 'lenses' || target === 'eyewear') {
      navigate('lenses');
    } else if (target === 'booking') {
      navigate('booking');
    }
  }, [navigate, scrollTo]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || currentPage !== 'home'
          ? 'bg-surface/95 backdrop-blur-md shadow-md border-b border-outline-variant/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
          >
            <div className="bg-white rounded-xl p-1 sm:p-1.5 shadow-sm border border-outline-variant/30 flex items-center group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <img
                src="images/other/logo.png"
                alt="Dey Optical"
                width="140"
                height="40"
                decoding="async"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className={`text-[12px] font-bold tracking-wider uppercase transition-colors duration-300 ${scrolled || currentPage !== 'home' ? 'text-primary' : 'text-primary-fixed drop-shadow-sm'}`}>
                Dey Optical
              </span>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${scrolled || currentPage !== 'home' ? 'text-secondary' : 'text-white/85'}`}>
                Beliatore, Bankura
              </span>
            </div>
          </button>

          {/* Desktop Nav - Unchanged layout and appearance */}
          <nav className="hidden md:flex items-center gap-1">
            {DESKTOP_NAV_LINKS.map((link) => {
              const isActive =
                (link.target === 'home' && currentPage === 'home') ||
                (link.target === 'gallery' && currentPage === 'gallery') ||
                (link.target === 'lenses' && currentPage === 'lenses');

              return (
                <button
                  key={link.target}
                  onClick={() => handleNav(link.target)}
                  className={`px-4 py-2 rounded-lg text-[14px] font-semibold tracking-wide transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                    isActive ? 'text-primary bg-primary/10' : 'text-on-surface'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav('booking')}
              className={`ml-3 px-5 py-2.5 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all duration-200 ${
                currentPage === 'booking'
                  ? 'bg-primary-container text-white ring-2 ring-primary ring-offset-2'
                  : 'bg-primary text-on-primary hover:bg-primary/90 hover:shadow-lg active:scale-95'
              }`}
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-on-surface text-[24px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (avoiding duplication of the 3 bottom bar items) */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-surface/98 backdrop-blur-md border-t border-outline-variant/30 px-4 py-3 space-y-1">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 flex items-center gap-2.5 ${
              currentPage === 'home' ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Home
          </button>
          <button
            onClick={() => handleNav('doctors')}
            className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold text-on-surface hover:bg-surface-container transition-all duration-200 flex items-center gap-2.5"
          >
            <span className="material-symbols-outlined text-[20px]">stethoscope</span>
            Visiting Specialist Doctors
          </button>
          <button
            onClick={() => handleNav('testimonials')}
            className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold text-on-surface hover:bg-surface-container transition-all duration-200 flex items-center gap-2.5"
          >
            <span className="material-symbols-outlined text-[20px]">reviews</span>
            Patient Testimonials
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(NavBarComponent);

