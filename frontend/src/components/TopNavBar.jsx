import React, { useState } from 'react';

export default function TopNavBar({
  activeRoute,
  navigate,
  setCategoryFilter,
  filterGallery,
  openArticle,
  openBookingModal,
  openCategoryEnquiry,
  toggleConsultationChat,
  toggleMobileDrawer
}) {
  const [headerSearch, setHeaderSearch] = useState('');

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && headerSearch.trim().length > 0) {
      navigate('eyewear');
      // trigger search
      setCategoryFilter('All', headerSearch.trim());
      setHeaderSearch('');
    }
  };

  const getNavButtonClass = (target) => {
    if (activeRoute === target) {
      return "text-primary font-semibold border-b-2 border-primary pb-1 text-label-md font-label-md transition-colors flex items-center gap-1";
    }
    return "text-on-surface-variant hover:text-on-surface transition-colors text-label-md font-label-md py-1 flex items-center gap-1";
  };

  return (
    <header className="docked full-width top-0 sticky z-50 bg-surface/90 dark:bg-inverse-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 lg:px-8 max-w-7xl mx-auto h-16">
        {/* Brand Logo & Badge */}
        <a
          className="flex items-center gap-3 group cursor-pointer"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigate('home');
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-headline-sm">eyeglasses</span>
          </div>
          <div className="flex flex-col">
            <span className="text-headline-md font-headline-md font-semibold tracking-tight text-on-surface">
              Dey Optical
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" id="desktop-nav-container">
          {/* Eyewear Dropdown */}
          <div className="relative group py-4">
            <button
              className={getNavButtonClass('eyewear')}
              data-nav-target="eyewear"
              onClick={() => navigate('eyewear')}
            >
              <span>Eyewear</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50 animate-in fade-in duration-150">
              <div className="w-64 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-lg p-2 flex flex-col gap-1">
                <a
                  href="#eyewear"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eyewear');
                    setCategoryFilter('Eyeglasses');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Eyeglasses &amp; Frames</span>
                  <span className="text-xs text-secondary font-mono-data">Optical</span>
                </a>
                <a
                  href="#eyewear"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eyewear');
                    setCategoryFilter('Sunglasses');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Polarized Sunglasses</span>
                  <span className="text-xs text-secondary font-mono-data">UV400</span>
                </a>
                <a
                  href="#eyewear"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eyewear');
                    setCategoryFilter('Designer Frames');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Designer &amp; Luxury Frames</span>
                  <span className="text-xs text-secondary font-mono-data">Acetate</span>
                </a>
                <a
                  href="#eyewear"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eyewear');
                    setCategoryFilter('Blue-Cut Lenses');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Blue-Cut Screen Defense</span>
                  <span className="text-xs text-secondary font-mono-data">420nm</span>
                </a>
                <a
                  href="#eyewear"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eyewear');
                    setCategoryFilter('Kids Eyewear');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Kids &amp; Pediatric Eyewear</span>
                  <span className="text-xs text-secondary font-mono-data">Flex</span>
                </a>
                <a
                  href="#eyewear"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eyewear');
                    setCategoryFilter('Progressive & Medical Lenses');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Specialized Clinical Lenses</span>
                  <span className="text-[11px] text-primary font-semibold">ZEISS &bull; Essilor</span>
                </a>
                <div className="border-t border-outline-variant/20 my-1"></div>
                <button
                  onClick={() => {
                    if (openCategoryEnquiry) {
                      openCategoryEnquiry('General Eyewear Consultation');
                    } else {
                      navigate('eyewear');
                    }
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-primary hover:bg-primary/10 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Category WhatsApp Enquiry</span>
                </button>
              </div>
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="relative group py-4">
            <button
              className={getNavButtonClass('eye-care')}
              data-nav-target="eye-care"
              onClick={() => navigate('eye-care')}
            >
              <span>Services</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50 animate-in fade-in duration-150">
              <div className="w-64 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-lg p-2 flex flex-col gap-1">
                <a
                  href="#eye-care"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eye-care');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">visibility</span>
                  <span>Comprehensive Eye Exam</span>
                </a>
                <a
                  href="#eye-care"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eye-care');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">biotech</span>
                  <span>Computerized Refraction</span>
                </a>
                <a
                  href="#eye-care"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eye-care');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">lens</span>
                  <span>Contact Lens Fitting</span>
                </a>
                <a
                  href="#eye-care"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eye-care');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">eyeglasses</span>
                  <span>Progressive Lens Fitting</span>
                </a>
                <a
                  href="#eye-care"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('eye-care');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">child_care</span>
                  <span>Pediatric Eye Care</span>
                </a>
              </div>
            </div>
          </div>

          {/* Optometrists Dropdown */}
          <div className="relative group py-4">
            <button
              className={getNavButtonClass('doctor')}
              data-nav-target="doctor"
              onClick={() => navigate('doctor')}
            >
              <span>Optometrists</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50 animate-in fade-in duration-150">
              <div className="w-64 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-lg p-2 flex flex-col gap-1">
                <a
                  href="#doctor"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('doctor');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex flex-col"
                >
                  <span className="font-medium">Dr. Arindam Dey</span>
                  <span className="text-xs text-secondary font-mono-data">Chief Optometrist • FIACLE</span>
                </a>
                <div className="border-t border-outline-variant/20 my-1"></div>
                <a
                  href="#doctor"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('doctor');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <span>Clinical Specializations</span>
                </a>
                <a
                  href="#doctor"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('doctor');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <span>Consultations &amp; Hours</span>
                </a>
                <a
                  href="#doctor"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('doctor');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <span>Eye Health Philosophy</span>
                </a>
              </div>
            </div>
          </div>

          {/* Gallery Dropdown */}
          <div className="relative group py-4">
            <button
              className={getNavButtonClass('gallery')}
              data-nav-target="gallery"
              onClick={() => navigate('gallery')}
            >
              <span>Gallery</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50 animate-in fade-in duration-150">
              <div className="w-60 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-lg p-2 flex flex-col gap-1">
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('gallery');
                    filterGallery('Eyewear');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Eyewear Showcase</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">photo_library</span>
                </a>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('gallery');
                    filterGallery('Store');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Clinic &amp; Store Tour</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">storefront</span>
                </a>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('gallery');
                    filterGallery('Lab');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Diagnostic Tech &amp; Lab</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">biotech</span>
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('testimonials');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>Happy Patients &amp; Stories</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                </a>
              </div>
            </div>
          </div>

          {/* Community Dropdown */}
          <div className="relative group py-4">
            <button
              className={getNavButtonClass('community')}
              data-nav-target="community"
              onClick={() => navigate('community')}
            >
              <span>Community</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:rotate-180">
                expand_more
              </span>
            </button>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50 animate-in fade-in duration-150">
              <div className="w-64 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-lg p-2 flex flex-col gap-1">
                <a
                  href="#community"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('community');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                  <span>Eye Health Journal</span>
                </a>
                <a
                  href="#community"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('community');
                    openArticle('art-2');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">devices</span>
                  <span>Digital Eye Strain Guide</span>
                </a>
                <a
                  href="#community"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('community');
                    openArticle('art-1');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">warning</span>
                  <span>Signs You Need New Glasses</span>
                </a>
                <a
                  href="#community"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('community');
                    openArticle('art-3');
                  }}
                  className="px-3 py-2 rounded-lg text-body-sm font-body-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">health_and_safety</span>
                  <span>Preventive Vision Care</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Only Actions (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <button
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all duration-150 cursor-pointer"
              onClick={() => navigate('eyewear')}
              title="Explore Product Categories"
            >
              <span className="material-symbols-outlined text-[20px]">eyeglasses</span>
            </button>
            <button
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all duration-150 cursor-pointer"
              onClick={toggleConsultationChat}
              title="Live WhatsApp Chat"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </button>

            {/* Desktop Book Exam */}
            <button
              className="hidden lg:flex items-center gap-1.5 bg-primary text-on-primary px-3.5 py-1.5 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all duration-150 shadow-sm active:scale-[0.98] cursor-pointer"
              onClick={() => openBookingModal()}
            >
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>Book Exam</span>
            </button>

            {/* Desktop WhatsApp Consultation */}
            <a
              className="inline-flex items-center gap-1.5 bg-surface-container border border-outline-variant/40 text-primary px-3 py-1.5 rounded-lg text-label-md font-label-md hover:bg-surface-container-high transition-all duration-150 active:scale-[0.98]"
              href="https://wa.me/919830000000?text=Hello%20Dey%20Optical,%20I%20would%20like%20to%20consult%20an%20optometrist"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[16px]">contact_support</span>
              <span className="hidden xl:inline">WhatsApp Consultation</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Three-Bar (Hamburger) Menu Button - Top Right */}
          <button
            aria-label="Open Navigation Menu"
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-on-surface bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 active:scale-95 transition-all shadow-xs cursor-pointer"
            onClick={() => toggleMobileDrawer(true)}
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
