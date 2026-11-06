import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/mockData.js';
import { animateModalIn, animateStagger } from '../utils/animations.js';

const FILTERS = ['All', 'Store', 'Lab', 'Eye Testing', 'Eyewear'];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null); // { index: number, items: array }
  const modalRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.cat === activeFilter);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.gallery-card');
      animateStagger(cards, { duration: 400, delay: 60 });
    }
  }, [activeFilter]);

  useEffect(() => {
    if (lightbox !== null && modalRef.current) {
      animateModalIn(modalRef.current);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [lightbox]);

  const openLightbox = (index) => {
    setLightbox({ index, items: filtered });
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const lightboxNext = useCallback(() => {
    if (!lightbox) return;
    setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lb.items.length }));
  }, [lightbox]);

  const lightboxPrev = useCallback(() => {
    if (!lightbox) return;
    setLightbox((lb) => ({ ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length }));
  }, [lightbox]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox, lightboxNext, lightboxPrev]);

  const currentItem = lightbox ? lightbox.items[lightbox.index] : null;

  return (
    <div className="py-16 bg-surface-container-low relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,104,95,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,104,95,0.06) 0%, transparent 50%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate="fade-up" className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>photo_library</span>
            Gallery
          </span>
          <h2 className="text-[36px] md:text-[42px] font-bold text-on-surface tracking-tight leading-tight mb-3">
            Inside Dey Optical
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-xl mx-auto">
            Take a visual tour of our clinic, state-of-the-art lab, and eyewear showroom.
          </p>
        </div>

        {/* Filter Tabs */}
        <div data-animate="fade-up" className="flex flex-wrap justify-center gap-2 mb-7">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-on-primary shadow-md scale-105'
                  : 'bg-white text-on-surface-variant border border-outline-variant hover:border-primary hover:text-primary hover:bg-primary/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="gallery-card opacity-0 group relative rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => openLightbox(idx)}
            >
              <div className={`relative overflow-hidden ${idx % 5 === 0 ? 'h-72' : 'h-56'}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 backdrop-blur-sm text-on-primary text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
                    {item.cat}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[20px]">fullscreen</span>
                  </div>
                </div>

                {/* Title on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <h3 className="text-white font-bold text-[16px] leading-tight">{item.title}</h3>
                  <p className="text-white/75 text-[13px] mt-0.5">{item.sub}</p>
                </div>
              </div>

              {/* Info footer */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-[14px] text-on-surface">{item.title}</h3>
                <p className="text-[12px] text-secondary">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-secondary">
            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-3">photo_library</span>
            <p className="text-[16px]">No images in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          />

          {/* Modal */}
          <div
            ref={modalRef}
            className="relative z-10 max-w-4xl w-full opacity-0"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-white text-[22px]">close</span>
            </button>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentItem.img}
                alt={currentItem.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />

              {/* Nav arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined text-white text-[24px]">arrow_back_ios</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined text-white text-[24px]">arrow_forward_ios</span>
              </button>
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-[18px]">{currentItem.title}</h3>
              <p className="text-white/60 text-[14px] mt-1">{currentItem.sub}</p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="bg-primary/80 text-on-primary text-[12px] font-bold px-3 py-1 rounded-full">
                  {currentItem.cat}
                </span>
                <span className="text-white/50 text-[13px]">
                  {lightbox.index + 1} / {lightbox.items.length}
                </span>
              </div>
            </div>

            {/* Thumbnails strip */}
            <div className="flex justify-center gap-2 mt-5 overflow-x-auto pb-1">
              {lightbox.items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setLightbox((lb) => ({ ...lb, index: idx }))}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    idx === lightbox.index ? 'border-primary scale-110' : 'border-white/20 opacity-50 hover:opacity-75'
                  }`}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

