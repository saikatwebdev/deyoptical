import React, { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Home', section: 'home' },
  { label: 'Doctors', section: 'doctors' },
  { label: 'Testimonials', section: 'testimonials' },
  { label: 'Gallery', section: 'gallery' },
  { label: 'Eyewear', section: 'eyewear' },
];

export default function NavBar({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleNav = (section) => {
    scrollTo(section);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
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
                src="images/logo.png"
                alt="Dey Optical"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className={`text-[12px] font-bold tracking-wider uppercase transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-primary-fixed drop-shadow-sm'}`}>
                Dey Optical
              </span>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${scrolled ? 'text-secondary' : 'text-white/85'}`}>
                Beliatore, Bankura
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => handleNav(link.section)}
                className={`px-4 py-2 rounded-lg text-[14px] font-semibold tracking-wide transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                  scrolled ? 'text-on-surface' : 'text-on-surface'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('booking')}
              className="ml-3 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-[14px] font-bold tracking-wide shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-200"
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

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-surface/98 backdrop-blur-md border-t border-outline-variant/30 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.section}
              onClick={() => handleNav(link.section)}
              className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold text-on-surface hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('booking')}
            className="w-full mt-2 px-5 py-3 rounded-xl bg-primary text-on-primary text-[15px] font-bold tracking-wide shadow-md hover:bg-primary/90 active:scale-95 transition-all duration-200"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}

