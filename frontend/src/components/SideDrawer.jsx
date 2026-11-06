import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES } from '../data/mockData.js';
import { animateDrawerItems } from '../utils/animations.js';

export default function SideDrawer({
  isOpen,
  toggleMobileDrawer,
  activeRoute,
  navigate,
  setCategoryFilter,
  filterGallery,
  openArticle,
  openReviewModal,
  openCategoryEnquiry
}) {
  const [openSection, setOpenSection] = useState(null);
  const navListRef = useRef(null);

  useEffect(() => {
    if (isOpen && navListRef.current) {
      animateDrawerItems(navListRef.current.children);
    }
  }, [isOpen]);

  const toggleSection = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const handleNav = (route) => {
    navigate(route);
    toggleMobileDrawer(false);
  };

  const handleCategoryNav = (cat) => {
    if (setCategoryFilter) {
      setCategoryFilter(cat);
    }
    navigate('eyewear');
    toggleMobileDrawer(false);
  };

  const handleGalleryNav = (cat) => {
    if (filterGallery) {
      filterGallery(cat);
    } else {
      navigate('gallery');
    }
    toggleMobileDrawer(false);
  };

  const handleArticleNav = (articleId) => {
    if (openArticle) {
      openArticle(articleId);
    } else {
      navigate('community');
    }
    toggleMobileDrawer(false);
  };

  const getTabClass = (target) => {
    const isActive = activeRoute === target;
    return `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-label-md font-label-md transition-all duration-150 ${isActive
        ? 'bg-primary/10 text-primary font-semibold'
        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
      }`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-on-background/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        id="drawer-backdrop"
        onClick={() => toggleMobileDrawer(false)}
      />

      {/* Side Drawer - Slides smoothly from Top-Right */}
      <aside
        className={`fixed inset-y-0 right-0 w-[88vw] max-w-[360px] z-50 bg-surface-container-lowest shadow-2xl border-l border-outline-variant/40 flex flex-col justify-between h-full transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        id="side-drawer"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">visibility</span>
            </div>
            <div>
              <h2 className="text-title-md font-title-md font-semibold text-on-surface tracking-tight">
                Dey Optical
              </h2>
              <p className="text-[11px] font-body-sm text-secondary">
                Precision Eye Care &amp; Luxury Eyewear
              </p>
            </div>
          </div>
          <button
            aria-label="Close Navigation Menu"
            className="w-9 h-9 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => toggleMobileDrawer(false)}
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Scrollable Navigation & Features Area */}
        <div ref={navListRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2" id="drawer-nav-list">
          {/* Quick Features Badge */}
          <div className="px-3 py-2 bg-surface-container-low rounded-xl flex items-center justify-between text-xs text-secondary font-medium mb-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Optical Lab &amp; Clinic Open
            </span>
            <span className="font-mono-data text-[11px]">Est. 1989</span>
          </div>

          {/* 1. Home */}
          <button
            className={getTabClass('home')}
            onClick={() => handleNav('home')}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span>Home</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          </button>

          {/* 2. Eyewear Discovery (Accordion with all frame features) */}
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container-lowest">
            <button
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-label-md font-label-md transition-colors ${activeRoute === 'eyewear' ? 'text-primary font-semibold bg-primary/5' : 'text-on-surface'
                }`}
              onClick={() => toggleSection('eyewear')}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">eyeglasses</span>
                <span>Product Categories</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-200 ${openSection === 'eyewear' ? 'rotate-180' : ''
                }`}>
                expand_more
              </span>
            </button>
            {openSection === 'eyewear' && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-surface-container-low/40 border-t border-outline-variant/20">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-between"
                  onClick={() => handleCategoryNav('All')}
                >
                  <span>All Product Categories</span>
                  <span className="text-[11px] font-mono-data bg-surface-container-high px-1.5 py-0.5 rounded">6 Categories</span>
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center gap-2"
                  onClick={() => handleCategoryNav('Eyeglasses')}
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Eyeglasses &amp; Frames</span>
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center gap-2"
                  onClick={() => handleCategoryNav('Sunglasses')}
                >
                  <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
                  <span>Polarized Sunglasses</span>
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center gap-2"
                  onClick={() => handleCategoryNav('Designer Frames')}
                >
                  <span className="material-symbols-outlined text-[16px]">diamond</span>
                  <span>Designer &amp; Luxury Frames</span>
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center gap-2"
                  onClick={() => handleCategoryNav('Blue-Cut Lenses')}
                >
                  <span className="material-symbols-outlined text-[16px]">laptop_chromebook</span>
                  <span>Blue-Cut Screen Defense</span>
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center gap-2"
                  onClick={() => handleCategoryNav('Kids Eyewear')}
                >
                  <span className="material-symbols-outlined text-[16px]">child_care</span>
                  <span>Kids &amp; Pediatric Eyewear</span>
                </button>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center gap-2"
                  onClick={() => handleCategoryNav('Progressive & Medical Lenses')}
                >
                  <span className="material-symbols-outlined text-[16px]">lens</span>
                  <span>Specialized Clinical Lenses</span>
                </button>
                <div className="pt-1 border-t border-outline-variant/20">
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-primary font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
                    onClick={() => {
                      toggleMobileDrawer(false);
                      if (openCategoryEnquiry) {
                        openCategoryEnquiry('General Eyewear Consultation');
                      } else {
                        navigate('eyewear');
                      }
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Category WhatsApp Enquiry</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Clinical Services (Accordion) */}
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container-lowest">
            <button
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-label-md font-label-md transition-colors ${activeRoute === 'eye-care' ? 'text-primary font-semibold bg-primary/5' : 'text-on-surface'
                }`}
              onClick={() => toggleSection('services')}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">medical_services</span>
                <span>Clinical Services</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-200 ${openSection === 'services' ? 'rotate-180' : ''
                }`}>
                expand_more
              </span>
            </button>
            {openSection === 'services' && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-surface-container-low/40 border-t border-outline-variant/20">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                  onClick={() => handleNav('eye-care')}
                >
                  View All Clinical Services
                </button>
                <div className="px-3 py-1.5 text-xs text-on-surface-variant space-y-1">
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
                    <span>Comprehensive Eye Exam</span>
                  </div>
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
                    <span>Computerized Refraction</span>
                  </div>
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
                    <span>Contact Lens Fitting &amp; Care</span>
                  </div>
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
                    <span>Progressive Lens Fitting</span>
                  </div>
                  <div className="flex items-center gap-2 py-0.5">
                    <span className="material-symbols-outlined text-[15px] text-primary">check_circle</span>
                    <span>Pediatric Vision Screening</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Specialist Doctors */}
          <button
            className={getTabClass('doctor')}
            onClick={() => handleNav('doctor')}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">stethoscope</span>
              <div className="text-left">
                <span>Specialist Doctors</span>
                <span className="block text-[11px] text-secondary font-normal">Dr. Arindam Dey (B.Optom, FIACLE)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          </button>

          {/* 5. Visual Gallery (Accordion) */}
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container-lowest">
            <button
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-label-md font-label-md transition-colors ${activeRoute === 'gallery' ? 'text-primary font-semibold bg-primary/5' : 'text-on-surface'
                }`}
              onClick={() => toggleSection('gallery')}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">photo_library</span>
                <span>Visual Gallery</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-200 ${openSection === 'gallery' ? 'rotate-180' : ''
                }`}>
                expand_more
              </span>
            </button>
            {openSection === 'gallery' && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-surface-container-low/40 border-t border-outline-variant/20">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                  onClick={() => handleGalleryNav('all')}
                >
                  Full Visual Showcase
                </button>
                <div className="flex flex-wrap gap-1.5 px-2 pt-1">
                  <button
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors text-secondary"
                    onClick={() => handleGalleryNav('eyewear')}
                  >
                    Eyewear
                  </button>
                  <button
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors text-secondary"
                    onClick={() => handleGalleryNav('clinic')}
                  >
                    Clinic
                  </button>
                  <button
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors text-secondary"
                    onClick={() => handleGalleryNav('lab')}
                  >
                    Optical Lab
                  </button>
                  <button
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary transition-colors text-secondary"
                    onClick={() => handleGalleryNav('pediatric')}
                  >
                    Pediatric
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 6. Patient Stories & Reviews */}
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container-lowest">
            <button
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-label-md font-label-md transition-colors ${activeRoute === 'testimonials' ? 'text-primary font-semibold bg-primary/5' : 'text-on-surface'
                }`}
              onClick={() => toggleSection('testimonials')}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">rate_review</span>
                <span>Patient Stories &amp; Reviews</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-200 ${openSection === 'testimonials' ? 'rotate-180' : ''
                }`}>
                expand_more
              </span>
            </button>
            {openSection === 'testimonials' && (
              <div className="px-3 pb-3 pt-1 space-y-2 bg-surface-container-low/40 border-t border-outline-variant/20">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors flex items-center justify-between"
                  onClick={() => handleNav('testimonials')}
                >
                  <span>Read 380+ Verified Reviews</span>
                  <span className="text-amber-500 font-semibold text-xs flex items-center gap-0.5">
                    ★ 4.9
                  </span>
                </button>
                {openReviewModal && (
                  <button
                    className="w-full py-2 px-3 rounded-lg bg-surface-container text-primary font-semibold text-body-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      openReviewModal();
                      toggleMobileDrawer(false);
                    }}
                  >
                    <span className="material-symbols-outlined text-[16px]">rate_review</span>
                    <span>Write Patient Review</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 7. Eye Health Journal (Articles) */}
          <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container-lowest">
            <button
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-label-md font-label-md transition-colors ${activeRoute === 'community' ? 'text-primary font-semibold bg-primary/5' : 'text-on-surface'
                }`}
              onClick={() => toggleSection('journal')}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-primary">article</span>
                <span>Eye Health Journal</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-200 ${openSection === 'journal' ? 'rotate-180' : ''
                }`}>
                expand_more
              </span>
            </button>
            {openSection === 'journal' && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-surface-container-low/40 border-t border-outline-variant/20">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-body-sm font-body-sm text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                  onClick={() => handleNav('community')}
                >
                  All Clinical Articles
                </button>
                {ARTICLES.map((art) => (
                  <button
                    key={art.id}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors line-clamp-1"
                    onClick={() => handleArticleNav(art.id)}
                  >
                    • {art.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 8. About Practice */}
          <button
            className={getTabClass('about')}
            onClick={() => handleNav('about')}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>About Our Practice</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          </button>
        </div>

        {/* Drawer Footer: Saved Frames & Store Details (NO BOOK / NO WHATSAPP BUTTONS) */}
        <div className="border-t border-outline-variant/30 p-4 bg-surface-container-low/50 flex flex-col gap-3">
          {/* Saved Frames */}
          <button
            className="flex items-center justify-between text-body-sm font-body-sm text-secondary hover:text-primary px-3 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 transition-colors cursor-pointer"
            onClick={() => handleNav('eyewear')}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-primary">bookmark</span>
              <span className="font-medium text-on-surface">Saved Frames Wishlist</span>
            </div>
            <span
              className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full font-mono-data"
              id="saved-frames-counter"
            >
              3
            </span>
          </button>

          {/* Practice Contact & Timings Overview */}
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 text-xs text-secondary space-y-1.5">
            <div className="flex items-center gap-2 text-on-surface font-medium">
              <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
              <span>124 Park Street, Bankura - 700016</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
              <span>Mon - Sat: 10:00 AM - 8:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
              <a href="tel:+919830000000" className="hover:underline text-primary font-medium">
                +91 98300 00000
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
