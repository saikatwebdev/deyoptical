import React, { useEffect, useRef } from 'react';
import { GALLERY_ITEMS } from '../data/mockData.js';
import { animateStagger } from '../utils/animations.js';

export default function GalleryView({
  navigate,
  galleryCategory,
  setGalleryCategory,
  openLightbox
}) {
  const categories = ['All', 'Store', 'Eyewear', 'Eye Testing', 'Lab'];

  const filteredItems = galleryCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.cat === galleryCategory);

  const galleryGridRef = useRef(null);

  useEffect(() => {
    if (galleryGridRef.current && filteredItems.length > 0) {
      animateStagger(galleryGridRef.current.children, { delay: 40, duration: 400, scale: [0.96, 1] });
    }
  }, [galleryCategory, filteredItems.length]);

  return (
    <section className="view-section" id="view-gallery">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Visual Gallery</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
              Practice Impressions
            </span>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mt-1">Visual Gallery</h1>
            <p className="text-body-md font-body-md text-secondary">
              Explore our clinical suites, frame collections, and happy patient moments.
            </p>
          </div>

          {/* Gallery Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1" id="gallery-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={
                  galleryCategory === cat
                    ? 'gal-pill active-gal-pill px-4 py-1.5 rounded-full text-label-md font-label-md bg-primary text-on-primary border border-primary transition-all cursor-pointer whitespace-nowrap'
                    : 'gal-pill px-4 py-1.5 rounded-full text-label-md font-label-md bg-surface-container-lowest text-on-surface-variant border border-outline-variant/40 hover:border-primary transition-all cursor-pointer whitespace-nowrap'
                }
                onClick={() => setGalleryCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div ref={galleryGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="full-gallery-grid">
          {filteredItems.map((g) => {
            const originalIdx = GALLERY_ITEMS.indexOf(g);
            return (
              <div
                key={g.id}
                onClick={() => openLightbox(originalIdx)}
                className="group cursor-pointer rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low shadow-xs relative h-72"
              >
                <img
                  src={g.img || 'images/dey-carousel-1.jpg'}
                  alt={`${g.title} at Dey Optical`}
                  data-alt={`Photograph showcasing ${g.title} at Dey Optical practice with high-precision optical equipment.`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-transparent to-transparent flex flex-col justify-end p-5">
                  <span className="text-label-sm font-label-sm text-primary-fixed uppercase font-semibold">
                    {g.cat}
                  </span>
                  <h3 className="text-headline-sm font-headline-sm font-semibold text-on-primary">
                    {g.title}
                  </h3>
                  <p className="text-body-sm font-body-sm text-outline-variant">{g.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
