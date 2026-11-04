import React, { useState, useEffect, useCallback, useRef } from 'react';
import { animatePageEnter, initScrollAnimations, refreshScrollAnimations } from './utils/animations.js';
import TopNavBar from './components/TopNavBar.jsx';
import SideDrawer from './components/SideDrawer.jsx';
import Footer from './components/Footer.jsx';
import ProductDetailModal from './components/ProductDetailModal.jsx';
import CategoryEnquiryModal from './components/CategoryEnquiryModal.jsx';
import LightboxModal from './components/LightboxModal.jsx';
import ReviewModal from './components/ReviewModal.jsx';
import WhatsAppChatWidget from './components/WhatsAppChatWidget.jsx';

import HomeView from './views/HomeView.jsx';
import AboutView from './views/AboutView.jsx';
import EyewearView from './views/EyewearView.jsx';
import EyeCareView from './views/EyeCareView.jsx';
import DoctorView from './views/DoctorView.jsx';
import GalleryView from './views/GalleryView.jsx';
import TestimonialsView from './views/TestimonialsView.jsx';
import CommunityView from './views/CommunityView.jsx';
import ArticleReaderView from './views/ArticleReaderView.jsx';
import OrderView from './views/OrderView.jsx';

import { PRODUCTS, GALLERY_ITEMS, INITIAL_TESTIMONIALS, ARTICLES } from './data/mockData.js';

export default function App() {
  // --- ROUTING STATE ---
  const getInitialRoute = () => {
    const hash = window.location.hash.replace('#', '');
    const validRoutes = [
      'home', 'about', 'eyewear', 'eye-care', 'doctor',
      'gallery', 'testimonials', 'community', 'article-reader', 'order'
    ];
    return validRoutes.includes(hash) ? hash : 'home';
  };

  const [activeRoute, setActiveRoute] = useState(getInitialRoute);

  const navigate = useCallback((route) => {
    const validRoutes = [
      'home', 'about', 'eyewear', 'eye-care', 'doctor',
      'gallery', 'testimonials', 'community', 'article-reader', 'order'
    ];
    const target = validRoutes.includes(route) ? route : 'home';
    setActiveRoute(target);
    window.location.hash = `#${target}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const mainRef = useRef(null);

  // Initialize global scroll reveal engine on app mount
  useEffect(() => {
    initScrollAnimations();
  }, []);

  // Smooth anime.js transition between views and refresh scroll animations
  useEffect(() => {
    if (mainRef.current) {
      animatePageEnter(mainRef.current);
    }
    const timer = setTimeout(() => {
      refreshScrollAnimations();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeRoute]);

  // --- MODAL & OVERLAY STATES ---
  const [productModalId, setProductModalId] = useState(null);
  const [categoryEnquiryData, setCategoryEnquiryData] = useState({
    isOpen: false,
    category: null,
    sampleProduct: null
  });
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // --- DATA & FILTER STATES ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryCategory, setGalleryCategory] = useState('All');
  const [selectedArticleId, setSelectedArticleId] = useState('art-1');
  const [preloadedService, setPreloadedService] = useState('Comprehensive Eye Exam');
  const [preloadedNotes, setPreloadedNotes] = useState('');
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);

  // Close all modals on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setProductModalId(null);
        setCategoryEnquiryData({ isOpen: false, category: null, sampleProduct: null });
        setLightboxIndex(null);
        setIsReviewModalOpen(false);
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when modal/drawer is open
  useEffect(() => {
    const isAnyModalOpen =
      productModalId !== null ||
      categoryEnquiryData.isOpen ||
      lightboxIndex !== null ||
      isReviewModalOpen ||
      isDrawerOpen;
    if (isAnyModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [productModalId, categoryEnquiryData.isOpen, lightboxIndex, isReviewModalOpen, isDrawerOpen]);

  // --- ACETERNITY MOVING BORDER SCANNER ---
  useEffect(() => {
    const initMovingBorders = () => {
      const EXCLUDE = [
        '[aria-label]',
        '[data-nav-target]',
        '[data-drawer-tab]',
        '.p-1', '.p-2',
        '.mbtn-outer button',
        '.mbtn-outer a',
      ];

      const CTA_SELECTORS = [
        'button.bg-primary',
        'button.bg-inverse-surface',
        'button.bg-white.text-on-surface',
        'button.bg-surface-container.border',
        'a.bg-primary',
        'a.bg-surface-container.border',
      ];

      const excludeSelector = EXCLUDE.join(',');

      CTA_SELECTORS.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          if (el.matches(excludeSelector)) return;
          if (el.closest('.mbtn-outer')) return;
          const text = el.innerText ? el.innerText.trim() : '';
          if (!text) return;

          const outer = document.createElement('span');
          outer.className = 'mbtn-outer';

          const isFullWidth = el.classList.contains('w-full');
          if (isFullWidth) outer.classList.add('mbtn-w-full');

          if (el.classList.contains('rounded-full')) outer.classList.add('mbtn-r-full');
          else if (el.classList.contains('rounded-2xl')) outer.classList.add('mbtn-r-2xl');
          else if (el.classList.contains('rounded-xl')) outer.classList.add('mbtn-r-xl');

          const displayRe = /^(hidden|flex|inline-flex|(sm|md|lg|xl):(?:hidden|flex|inline-flex|block|inline))$/;
          const toMove = [...el.classList].filter((c) => displayRe.test(c));
          toMove.forEach((c) => {
            el.classList.remove(c);
            outer.classList.add(c);
          });
          if (!outer.classList.contains('hidden')) {
            outer.style.display = outer.classList.contains('flex') ? 'inline-flex' : 'inline-flex';
          }

          const rotor = document.createElement('span');
          rotor.className = 'mbtn-rotor';
          rotor.setAttribute('aria-hidden', 'true');

          if (el.parentNode) {
            el.parentNode.insertBefore(outer, el);
            outer.appendChild(rotor);
            outer.appendChild(el);
          }
        });
      });
    };

    const timer = setTimeout(initMovingBorders, 100);
    return () => clearTimeout(timer);
  }, [activeRoute, productModalId, lightboxIndex]);

  // --- ACTIONS & HANDLERS ---
  const handleOpenCategoryEnquiry = (categoryName = 'General Eyewear Consultation', sampleProduct = null) => {
    setCategoryEnquiryData({
      isOpen: true,
      category: categoryName,
      sampleProduct: sampleProduct
    });
  };

  const handleCloseCategoryEnquiry = () => {
    setCategoryEnquiryData({ isOpen: false, category: null, sampleProduct: null });
  };

  const handleQuickEnquireWhatsApp = (categoryOrItem, sampleName = null) => {
    let text = `Hello Dey Optical, I would like to enquire about your "${categoryOrItem}" collection.`;
    if (sampleName) {
      text += ` Specifically regarding styles like "${sampleName}".`;
    }
    text += ` Could you share available models and consultation trial options?`;
    window.open(`https://wa.me/919830000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleOpenBookingModal = (serviceName) => {
    if (serviceName) {
      setPreloadedService(serviceName);
    }
    navigate('order');
  };

  const handleBookFrameTrial = (product) => {
    setProductModalId(null);
    setPreloadedService('Frame Consultation & Trial');
    setPreloadedNotes(`Interested in trial for: ${product.name} (${product.material || product.category})`);
    navigate('order');
  };

  const handleOpenArticle = (artId) => {
    setSelectedArticleId(artId);
    navigate('article-reader');
  };

  const handleCategoryFilter = (cat, searchQ) => {
    setSelectedCategory(cat);
    navigate('eyewear');
  };

  const handleOpenLightbox = (idx) => {
    setLightboxIndex(idx);
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleSubmitReview = (newReview) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const activeProduct = PRODUCTS.find((p) => p.id === productModalId);
  const activeLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;
  const activeArticle = ARTICLES.find((a) => a.id === selectedArticleId);

  return (
    <div className="bg-background text-on-surface antialiased font-body-md text-body-md selection:bg-tertiary-fixed selection:text-on-tertiary-fixed flex flex-col min-h-screen">
      {/* 1. TOP NAVIGATION BAR */}
      <TopNavBar
        activeRoute={activeRoute}
        navigate={navigate}
        setCategoryFilter={handleCategoryFilter}
        filterGallery={(cat) => {
          setGalleryCategory(cat);
          navigate('gallery');
        }}
        openArticle={handleOpenArticle}
        openBookingModal={handleOpenBookingModal}
        openCategoryEnquiry={handleOpenCategoryEnquiry}
        toggleConsultationChat={() => setIsChatOpen((prev) => !prev)}
        toggleMobileDrawer={(open) => setIsDrawerOpen(open)}
      />

      {/* 2. MOBILE DRAWER - Accessible via Top-Right Three-Bar Menu */}
      <SideDrawer
        isOpen={isDrawerOpen}
        toggleMobileDrawer={setIsDrawerOpen}
        activeRoute={activeRoute}
        navigate={navigate}
        setCategoryFilter={handleCategoryFilter}
        filterGallery={(cat) => {
          setGalleryCategory(cat);
          navigate('gallery');
        }}
        openArticle={handleOpenArticle}
        openReviewModal={() => setIsReviewModalOpen(true)}
        openCategoryEnquiry={handleOpenCategoryEnquiry}
      />

      {/* 3. ROUTED VIEWS CONTAINER */}
      <main ref={mainRef} className="flex-grow">
        {activeRoute === 'home' && (
          <HomeView
            navigate={navigate}
            setCategoryFilter={handleCategoryFilter}
            openBookingModal={handleOpenBookingModal}
            openProductModal={(id) => setProductModalId(id)}
            quickEnquireWhatsApp={handleQuickEnquireWhatsApp}
            openCategoryEnquiry={handleOpenCategoryEnquiry}
            openLightbox={handleOpenLightbox}
            openArticle={handleOpenArticle}
          />
        )}

        {activeRoute === 'about' && (
          <AboutView
            navigate={navigate}
            openBookingModal={handleOpenBookingModal}
          />
        )}

        {activeRoute === 'eyewear' && (
          <EyewearView
            navigate={navigate}
            selectedCategory={selectedCategory}
            setCategoryFilter={setSelectedCategory}
            openCategoryEnquiry={handleOpenCategoryEnquiry}
            openProductModal={(id) => setProductModalId(id)}
            quickEnquireCategoryWhatsApp={handleQuickEnquireWhatsApp}
            openBookingModal={handleOpenBookingModal}
          />
        )}

        {activeRoute === 'eye-care' && (
          <EyeCareView
            navigate={navigate}
            openBookingModal={handleOpenBookingModal}
          />
        )}

        {activeRoute === 'doctor' && (
          <DoctorView
            navigate={navigate}
            openBookingModal={handleOpenBookingModal}
          />
        )}

        {activeRoute === 'gallery' && (
          <GalleryView
            navigate={navigate}
            galleryCategory={galleryCategory}
            setGalleryCategory={setGalleryCategory}
            openLightbox={handleOpenLightbox}
          />
        )}

        {activeRoute === 'testimonials' && (
          <TestimonialsView
            navigate={navigate}
            testimonials={testimonials}
            openReviewModal={() => setIsReviewModalOpen(true)}
          />
        )}

        {activeRoute === 'community' && (
          <CommunityView
            navigate={navigate}
            openArticle={handleOpenArticle}
          />
        )}

        {activeRoute === 'article-reader' && (
          <ArticleReaderView
            article={activeArticle}
            navigate={navigate}
          />
        )}

        {activeRoute === 'order' && (
          <OrderView
            navigate={navigate}
            preloadedService={preloadedService}
            preloadedNotes={preloadedNotes}
          />
        )}
      </main>

      {/* 4. FOOTER */}
      <Footer navigate={navigate} />

      {/* 5. MODALS & OVERLAYS */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={productModalId !== null}
        onClose={() => setProductModalId(null)}
        onQuickEnquire={handleQuickEnquireWhatsApp}
        onOpenCategoryEnquiry={handleOpenCategoryEnquiry}
        onBookFrameTrial={handleBookFrameTrial}
      />

      <CategoryEnquiryModal
        isOpen={categoryEnquiryData.isOpen}
        onClose={handleCloseCategoryEnquiry}
        initialCategory={categoryEnquiryData.category}
        sampleProduct={categoryEnquiryData.sampleProduct}
      />

      <LightboxModal
        item={activeLightboxItem}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* 6. FLOATING WHATSAPP CHAT WIDGET */}
      <WhatsAppChatWidget
        isOpen={isChatOpen}
        toggleConsultationChat={() => setIsChatOpen((prev) => !prev)}
      />

    </div>
  );
}
