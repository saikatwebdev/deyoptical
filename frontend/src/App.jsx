import React, { useRef, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import BookingSection from './components/BookingSection.jsx';
import EyewearSection from './components/EyewearSection.jsx';
import Footer from './components/Footer.jsx';
import { initScrollAnimations } from './utils/animations.js';

export default function App() {
  const homeRef = useRef(null);
  const testimonialsRef = useRef(null);
  const galleryRef = useRef(null);
  const bookingRef = useRef(null);
  const eyewearRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    testimonials: testimonialsRef,
    gallery: galleryRef,
    booking: bookingRef,
    eyewear: eyewearRef,
  };

  const scrollTo = (section) => {
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <NavBar scrollTo={scrollTo} />

      <main className="flex-1">
        <section ref={homeRef} id="home">
          <HeroSection scrollTo={scrollTo} />
        </section>

        <section ref={testimonialsRef} id="testimonials">
          <TestimonialsSection />
        </section>

        <section ref={galleryRef} id="gallery">
          <GallerySection />
        </section>

        <section ref={bookingRef} id="booking">
          <BookingSection />
        </section>

        <section ref={eyewearRef} id="eyewear">
          <EyewearSection />
        </section>
      </main>

      <Footer scrollTo={scrollTo} />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919064272877?text=Hello%20Dey%20Optical%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ background: '#25D366' }}
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm0 2.4c5.955 0 10.796 4.84 10.796 10.933 0 6.093-4.841 10.933-10.796 10.933a10.76 10.76 0 01-5.481-1.5l-.389-.232-4.096 1.075 1.095-3.985-.256-.406a10.78 10.78 0 01-1.669-5.885C5.208 9.907 10.05 5.067 16.004 5.067zm-3.063 5.2c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
        </svg>
      </a>
    </div>
  );
}
