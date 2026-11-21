import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useAdminData } from '../context/AdminDataContext.jsx';
import { animateModalIn, animateStagger } from '../utils/animations.js';

const GALLERY_TAGS = ['All', 'Store', 'Eyewear'];

/**
 * Individual Gallery Card with viewport priority & per-image lazy loading
 */
const GalleryCard = memo(function GalleryCard({ item, idx, onOpen }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  // Prioritize top 4 photos for immediate above-the-fold visibility
  const isPriority = idx < 4;

  return (
    <div
      className="gallery-card opacity-0 group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-container-high cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 select-none"
      onClick={() => onOpen(idx)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(idx);
        }
      }}
      aria-label={`View photo: ${item.title}`}
    >
      {/* Shimmer placeholder while image bytes download */}
      {!imgLoaded && (
        <div className="absolute inset-0 bg-surface-container-high animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-outline-variant/30 text-[28px]">
            image
          </span>
        </div>
      )}

      {/* Image with uniform dimensions and gentle hover scale */}
      <img
        src={item.img}
        alt={item.title}
        className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={isPriority ? 'eager' : 'lazy'}
        fetchPriority={isPriority ? 'high' : 'low'}
        decoding="async"
        width="600"
        height="450"
        onLoad={() => setImgLoaded(true)}
      />

      {/* Clean, image-focused hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2.5 sm:p-3.5 pointer-events-none">
        <div className="flex justify-end">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-[#FFFF00] shadow-sm">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">fullscreen</span>
          </span>
        </div>
        <div>
          <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FFFF00] mb-0.5">
            {item.cat}
          </span>
          <h3 className="text-white text-xs sm:text-sm font-semibold leading-tight line-clamp-1 drop-shadow-xs">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
});

/**
 * Loading Skeletons matching exact 2-col (mobile) and 4-col (desktop) grid
 */
function GallerySkeletonGrid() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
      aria-busy="true"
      aria-label="Loading gallery photos"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-container-high/60 border border-outline-variant/15 relative animate-pulse shadow-xs"
        >
          {/* Shimmer gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-high via-surface-container-highest/70 to-surface-container-high" />

          {/* Center icon placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-outline-variant/25 text-[32px]">
              image
            </span>
          </div>

          {/* Bottom tag & title placeholder */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 space-y-1.5">
            <div className="w-12 sm:w-14 h-2.5 sm:h-3 rounded-full bg-outline-variant/30" />
            <div className="w-2/3 h-3 sm:h-3.5 rounded-full bg-outline-variant/20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GallerySectionComponent() {
  const adminData = useAdminData();
  const rawGallery = adminData?.gallery || [];
  const isLoading = adminData?.galleryLoading && !adminData?.galleryLoaded;
  const error = adminData?.galleryError;
  const fetchGallery = adminData?.fetchGallery;

  const [selectedTag, setSelectedTag] = useState('All');
  const [lightbox, setLightbox] = useState(null); // { index: number, items: array }
  const modalRef = useRef(null);
  const gridRef = useRef(null);

  // Trigger initial database fetch if not loaded yet
  useEffect(() => {
    if (!adminData?.galleryLoaded && !adminData?.galleryLoading && typeof fetchGallery === 'function') {
      fetchGallery();
    }
  }, [adminData?.galleryLoaded, adminData?.galleryLoading, fetchGallery]);

  // Filter items based on selected tag
  const filteredItems = selectedTag === 'All'
    ? rawGallery
    : rawGallery.filter((item) => item.cat === selectedTag);

  // Stagger animation on initial mount and when tag changes or items finish loading
  useEffect(() => {
    if (!isLoading && gridRef.current && filteredItems.length > 0) {
      const cards = gridRef.current.querySelectorAll('.gallery-card');
      if (cards.length > 0) {
        animateStagger(cards, { duration: 380, delay: 45 });
      }
    }
  }, [selectedTag, filteredItems.length, isLoading]);

  // Lightbox open/close modal zoom animation & body scroll lock
  useEffect(() => {
    if (lightbox !== null && modalRef.current) {
      animateModalIn(modalRef.current);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  const openLightbox = useCallback((index) => {
    setLightbox({ index, items: filteredItems });
  }, [filteredItems]);

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
    <div className="w-full relative">
      {/* ── FILTER PILLS (All, Store, Eyewear) ── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
        {GALLERY_TAGS.map((tag) => {
          const count = tag === 'All'
            ? rawGallery.length
            : rawGallery.filter((g) => g.cat === tag).length;
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              disabled={isLoading}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border whitespace-nowrap active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-[#CC0000] text-white border-[#DC143C] shadow-md ring-2 ring-[#FFFF00]/40'
                  : 'bg-surface-container-high/60 text-on-surface-variant hover:text-[#CC0000] border-outline-variant/30 hover:border-[#CC0000]/40 hover:bg-surface-container-high'
              }`}
            >
              <span>{tag}</span>
              <span
                className={`text-[11px] font-semibold px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-[#FFFF00]' : 'bg-outline-variant/20 text-secondary'
                }`}
              >
                {isLoading ? '…' : count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── LOADING SKELETON STATE ── */}
      {isLoading && <GallerySkeletonGrid />}

      {/* ── ERROR STATE (Database connection failed) ── */}
      {!isLoading && error && rawGallery.length === 0 && (
        <div className="text-center py-14 sm:py-18 bg-surface-container-low/50 rounded-3xl border border-outline-variant/30 max-w-lg mx-auto p-6 sm:p-8 my-4">
          <div className="w-14 h-14 rounded-2xl bg-[#CC0000]/10 text-[#CC0000] flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[30px]">cloud_off</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1">
            Unable to Load Gallery
          </h3>
          <p className="text-xs sm:text-sm text-secondary mb-5 leading-relaxed">
            Could not connect to the database to fetch gallery photos. Please check your connection and try again.
          </p>
          <button
            onClick={() => fetchGallery && fetchGallery()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC0000] text-white font-bold text-xs sm:text-sm hover:bg-[#DC143C] active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Retry Loading</span>
          </button>
        </div>
      )}

      {/* ── EMPTY STATE (No photos in database) ── */}
      {!isLoading && !error && rawGallery.length === 0 && (
        <div className="text-center py-16 sm:py-20 bg-surface-container-low/50 rounded-3xl border border-dashed border-outline-variant/40 max-w-lg mx-auto p-6 sm:p-8 my-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-container-highest text-secondary flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-outline-variant">photo_library</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-on-surface mb-1">
            No Photos in Gallery
          </h3>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            No photos have been uploaded yet. Photos uploaded through the Admin Panel will appear here automatically.
          </p>
        </div>
      )}

      {/* ── RESPONSIVE PHOTO GALLERY GRID (Database items only) ── */}
      {!isLoading && rawGallery.length > 0 && (
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {filteredItems.map((item, idx) => (
            <GalleryCard
              key={item.id || item.galleryId || item._id || idx}
              item={item}
              idx={idx}
              onOpen={openLightbox}
            />
          ))}
        </div>
      )}

      {/* ── TAG-FILTER EMPTY STATE ── */}
      {!isLoading && rawGallery.length > 0 && filteredItems.length === 0 && (
        <div className="text-center py-14 text-secondary bg-surface-container-lowest/50 rounded-2xl border border-dashed border-outline-variant/40 mt-4">
          <span className="material-symbols-outlined text-[40px] text-outline-variant mb-2">photo_library</span>
          <p className="text-sm font-medium">No photos found in "{selectedTag}".</p>
          <button
            onClick={() => setSelectedTag('All')}
            className="mt-2 text-xs font-bold text-[#CC0000] hover:underline cursor-pointer"
          >
            View all photos ({rawGallery.length})
          </button>
        </div>
      )}

      {/* ── LIGHTBOX MODAL (Full Preview & Gallery Navigation) ── */}
      {lightbox && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/92 backdrop-blur-md"
            onClick={closeLightbox}
          />

          {/* Modal Container */}
          <div
            ref={modalRef}
            className="relative z-10 max-w-4xl w-full opacity-0 flex flex-col items-center"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-11 right-0 sm:-right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all z-20 cursor-pointer text-white"
              aria-label="Close photo viewer"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">close</span>
            </button>

            {/* Main Full Photo View */}
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center">
              <img
                src={currentItem.img}
                alt={currentItem.title}
                className="w-full max-h-[68vh] sm:max-h-[72vh] object-contain"
              />

              {/* Prev / Next navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxPrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-90"
                aria-label="Previous photo"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">chevron_left</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-90"
                aria-label="Next photo"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">chevron_right</span>
              </button>
            </div>

            {/* Photo Caption & Info */}
            <div className="mt-3 sm:mt-4 text-center max-w-xl px-4">
              <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">
                {currentItem.title}
              </h3>
              {currentItem.sub && (
                <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                  {currentItem.sub}
                </p>
              )}
              <div className="flex items-center justify-center gap-2.5 mt-2">
                <span className="bg-[#CC0000] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#FFFF00]/30 shadow-xs">
                  {currentItem.cat}
                </span>
                <span className="text-white/60 text-xs font-medium">
                  {lightbox.index + 1} of {lightbox.items.length}
                </span>
              </div>
            </div>

            {/* Quick-Jump Thumbnail Strip */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 max-w-full overflow-x-auto pb-1 px-2 scrollbar-none">
              {lightbox.items.map((item, idx) => (
                <button
                  key={item.id || item.galleryId || item._id || idx}
                  onClick={() => setLightbox((lb) => ({ ...lb, index: idx }))}
                  className={`flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    idx === lightbox.index
                      ? 'border-[#FFFF00] scale-105 shadow-md opacity-100 ring-2 ring-[#CC0000]'
                      : 'border-white/20 opacity-50 hover:opacity-85'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="56"
                    height="56"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(GallerySectionComponent);
