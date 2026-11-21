import React, { useState, memo } from 'react';
import { PRODUCT_CATEGORIES } from '../data/mockData.js';

const FRAME_CATEGORIES = PRODUCT_CATEGORIES.filter((c) =>
  ['cat-eyeglasses', 'cat-sunglasses', 'cat-designer', 'cat-kids'].includes(c.id)
);
const LENS_CATEGORIES = PRODUCT_CATEGORIES.filter((c) =>
  ['cat-bluecut', 'cat-lenses'].includes(c.id)
);

const ICON_MAP = {
  eyeglasses: 'eyeglasses',
  sunny: 'wb_sunny',
  diamond: 'diamond',
  laptop: 'laptop_chromebook',
  child_care: 'child_care',
  lens: 'blur_circular',
};

const CategoryCard = memo(function CategoryCard({ cat }) {
  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Dey Optical! 👋\n\nI'm interested in: *${cat.name}*\n\n` +
      `Tagline: ${cat.tagline}\n\n` +
      `Could you please share more details, pricing, and availability? Thank you!`
    );
    window.open(`https://wa.me/919064272877?text=${msg}`, '_blank');
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Photo with high visual priority */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-surface-container">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width="400"
          height="220"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#CC0000] text-white border border-[#FFFF00]/30 text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full shadow-sm">
            {cat.badge}
          </span>
        </div>

        {/* Icon */}
        <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-[#CC0000] text-white border border-[#FFFF00]/30 shadow-sm flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-[19px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {ICON_MAP[cat.icon] || 'eyeglasses'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[16px] text-on-surface leading-tight mb-1">{cat.name}</h3>
        <p className="text-[12px] text-[#CC0000] font-semibold mb-3">{cat.tagline}</p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {cat.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-start gap-2 text-[12px] text-secondary">
              <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[#CC0000]/15 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#CC0000] text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </span>
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>

        {/* Brands */}
        {cat.availableBrands && cat.availableBrands.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {cat.availableBrands.slice(0, 3).map((b) => (
                <span key={b} className="bg-surface-container text-secondary text-[10px] font-medium px-2 py-0.5 rounded-md">
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleWhatsApp}
          className="w-full py-2.5 rounded-xl font-bold text-[13px] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 bg-[#CC0000] text-white hover:bg-[#DC143C] shadow-sm hover:shadow-md cursor-pointer"
        >
          <svg viewBox="0 0 32 32" width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
          </svg>
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
});

const SubsectionHeader = memo(function SubsectionHeader({ title, count, icon }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
      <div className="flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[#CC0000] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">{title}</h2>
        {count !== undefined && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#CC0000]/10 text-[#CC0000]">
            {count}
          </span>
        )}
      </div>
      <div className="flex-1 h-px bg-outline-variant/30 ml-2" />
    </div>
  );
});

function EyewearSectionComponent() {
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Collections', count: 6 },
    { id: 'frames', label: 'Spectacle Frames & Sun', count: 4 },
    { id: 'lenses', label: 'Lens Technologies', count: 2 },
  ];

  const showFrames = activeTab === 'all' || activeTab === 'frames';
  const showLenses = activeTab === 'all' || activeTab === 'lenses';

  return (
    <div className="relative">
      {/* Category Filter Pills - Instant image-focused browsing */}
      <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#CC0000] text-white shadow-sm ring-2 ring-[#FFFF00]/40'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-outline-variant/30 text-secondary'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Spectacle Frames Section */}
      {showFrames && (
        <div data-animate="fade-up" className="mb-10 sm:mb-12">
          <SubsectionHeader
            title="Spectacle Frames &amp; Sunglasses"
            count={FRAME_CATEGORIES.length}
            icon="eyeglasses"
          />
          <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FRAME_CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      )}

      {/* Lens Technologies Section */}
      {showLenses && (
        <div data-animate="fade-up" className="mb-10">
          <SubsectionHeader
            title="Lens Technologies &amp; Coatings"
            count={LENS_CATEGORIES.length}
            icon="blur_circular"
          />
          <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {LENS_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="relative md:w-56 lg:w-64 h-48 md:h-auto overflow-hidden flex-shrink-0 bg-surface-container">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="240"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#CC0000] text-white border border-[#FFFF00]/30 text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full shadow-sm">
                      {cat.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#CC0000]/10 text-[#CC0000] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {ICON_MAP[cat.icon] || 'lens'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-on-surface leading-tight">{cat.name}</h3>
                      <p className="text-[12px] text-[#CC0000] font-semibold">{cat.tagline}</p>
                    </div>
                  </div>

                  <p className="text-[12px] sm:text-[13px] text-secondary leading-relaxed mb-3 line-clamp-2">
                    {cat.description}
                  </p>

                  <ul className="space-y-1.5 mb-4 flex-1">
                    {cat.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-[12px] text-secondary">
                        <span className="mt-0.5 text-[#CC0000] material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-secondary mb-4">
                    <span className="font-bold text-on-surface">Compatible: </span>
                    {cat.lensCompatibility}
                  </div>

                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Hello Dey Optical! 👋\n\nI'm interested in: *${cat.name}*\n\n` +
                        `${cat.tagline}\n\nCould you share more details and pricing? Thank you!`
                      );
                      window.open(`https://wa.me/919064272877?text=${msg}`, '_blank');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC0000] text-white hover:bg-[#DC143C] font-bold text-[13px] active:scale-95 transition-all duration-200 shadow-sm self-start cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                    </svg>
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div data-animate="fade-up" className="mt-8 sm:mt-10 text-center">
        <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-surface-container-low border border-outline-variant/30 rounded-3xl p-5 sm:p-6 max-w-2xl mx-auto shadow-sm">
          <div className="text-left">
            <h4 className="font-bold text-[16px] sm:text-[17px] text-on-surface mb-0.5">Need help choosing your lenses or frame?</h4>
            <p className="text-[13px] text-secondary">Our optometrists will help you select the ideal frame and power diopters for your eyes.</p>
          </div>
          <a
            href="https://wa.me/917551808245?text=Hello%20Dey%20Optical%20(Beliatore)!%20I%20need%20help%20choosing%20the%20right%20eyewear%20for%20my%20prescription."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#CC0000] hover:bg-[#DC143C] text-white rounded-xl font-bold text-[13px] sm:text-[14px] shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            <svg viewBox="0 0 32 32" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
            </svg>
            <span>Get Expert Advice</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(EyewearSectionComponent);
