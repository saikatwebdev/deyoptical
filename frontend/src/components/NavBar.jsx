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

  const isSolid = scrolled || currentPage !== 'home' || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isSolid
          ? 'bg-[#DC143C] border-b border-white/15 shadow-[0_4px_24px_rgba(220,20,60,0.25)]'
          : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 md:h-18' : 'h-16 md:h-20'}`}>
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:outline-none focus:ring-0 outline-none cursor-pointer"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="bg-white rounded-xl p-1 sm:p-1.5 shadow-sm border border-outline-variant/30 flex items-center group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <img
                src="images/other/newlogo.png"
                alt="Dey Optical"
                width="140"
                height="40"
                decoding="async"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[12px] font-bold tracking-wider uppercase text-white drop-shadow-xs">
                Dey Optical
              </span>
              <span className="text-[10px] font-medium text-white/85">
                Beliatore, Bankura
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {DESKTOP_NAV_LINKS.map((link) => {
              const isActive =
                (link.target === 'home' && currentPage === 'home') ||
                (link.target === 'gallery' && currentPage === 'gallery') ||
                (link.target === 'lenses' && currentPage === 'lenses');

              return (
                <button
                  key={link.target}
                  onClick={() => handleNav(link.target)}
                  className={`px-4 py-2 rounded-lg text-[14px] tracking-wide transition-all duration-200 cursor-pointer ${isActive
                      ? 'bg-white/20 border border-white/30 text-white font-bold shadow-xs'
                      : 'text-white/90 font-semibold hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav('booking')}
              className={`ml-3 px-5 py-2.5 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all duration-300 cursor-pointer active:scale-95 ${currentPage === 'booking'
                  ? 'bg-white text-[#DC143C] ring-2 ring-white ring-offset-2 ring-offset-[#DC143C] shadow-lg'
                  : isSolid
                    ? 'bg-white text-[#DC143C] hover:bg-white/95 hover:shadow-lg'
                    : 'bg-[#DC143C] text-white hover:bg-[#b81032] hover:shadow-lg'
                }`}
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/15 text-white transition-colors duration-200 focus:outline-none focus-visible:outline-none focus:ring-0 outline-none border-none cursor-pointer"
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-white text-[24px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (avoiding duplication of the bottom bar items) */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-[#b81032]/98 backdrop-blur-md border-t border-[#a00e2b]/60 px-4 py-3 space-y-1.5 shadow-xl">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-[15px] transition-all duration-200 flex items-center gap-2.5 cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${currentPage === 'home'
                ? 'bg-white/20 border border-white/30 text-white font-bold shadow-xs'
                : 'text-white/90 font-semibold hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          >
            <span className="material-symbols-outlined text-white text-[20px]">home</span>
            Home
          </button>
          <button
            onClick={() => handleNav('doctors')}
            className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-2.5 cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border border-transparent"
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          >
            <span className="material-symbols-outlined text-white text-[20px]">stethoscope</span>
            Visiting Specialist Doctors
          </button>
          <button
            onClick={() => handleNav('testimonials')}
            className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-2.5 cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border border-transparent"
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          >
            <span className="material-symbols-outlined text-white text-[20px]">reviews</span>
            Patient Testimonials
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(NavBarComponent);

