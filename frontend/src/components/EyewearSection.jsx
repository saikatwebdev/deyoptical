import React, { memo } from 'react';
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
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          width="400"
          height="192"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-primary/90 backdrop-blur-sm text-on-primary text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
            {cat.badge}
          </span>
        </div>

        {/* Icon */}
        <div className="absolute bottom-3 left-3 w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {ICON_MAP[cat.icon] || 'eyeglasses'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-[17px] text-on-surface leading-tight mb-1">{cat.name}</h3>
        <p className="text-[13px] text-primary font-semibold mb-3">{cat.tagline}</p>
        <p className="text-[13px] text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
          {cat.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-5 flex-1">
          {cat.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-[12px] text-on-surface-variant">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </span>
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>

        {/* Brands */}
        {cat.availableBrands && cat.availableBrands.length > 0 && (
          <div className="mb-5">
            <div className="text-[11px] font-bold text-secondary uppercase tracking-wide mb-2">Brands</div>
            <div className="flex flex-wrap gap-1.5">
              {cat.availableBrands.slice(0, 4).map((b) => (
                <span key={b} className="bg-surface-container text-on-surface-variant text-[11px] font-medium px-2.5 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleWhatsApp}
          className="w-full py-3 rounded-xl font-bold text-[14px] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
        >
          <svg viewBox="0 0 32 32" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
          </svg>
          Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
});

const SubsectionHeader = memo(function SubsectionHeader({ title, subtitle, icon }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <div>
        <h3 className="text-[24px] font-bold text-on-surface">{title}</h3>
        <p className="text-[14px] text-on-surface-variant">{subtitle}</p>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-outline-variant/40 to-transparent ml-4" />
    </div>
  );
});

function EyewearSectionComponent() {
  return (
    <div className="py-16 bg-gradient-to-b from-surface-container-low to-surface relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate="fade-up" className="text-center mb-11">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>eyeglasses</span>
            Eyewear Collection
          </span>
          <h2 className="text-[36px] md:text-[42px] font-bold text-on-surface tracking-tight leading-tight mb-3">
            Spectacles & Lens
            <br />
            <span className="text-primary">Categories</span>
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-2xl mx-auto">
            From aerospace titanium frames to digital free-form progressive lenses — browse our complete collection and enquire via WhatsApp for pricing and availability.
          </p>
        </div>

        {/* Spectacle Frames Subsection */}
        <div data-animate="fade-up" className="mb-11">
          <SubsectionHeader
            title="Spectacle Frames"
            subtitle="Precision-engineered frames for every face shape and lifestyle"
            icon="eyeglasses"
          />
          <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FRAME_CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>

        {/* Lens Types Subsection */}
        <div data-animate="fade-up">
          <SubsectionHeader
            title="Lens Technologies"
            subtitle="Advanced clinical lens solutions for every visual need"
            icon="blur_circular"
          />
          <div data-animate-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LENS_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md border border-outline-variant/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-56 h-48 md:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="240"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm text-on-primary text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">
                        {cat.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {ICON_MAP[cat.icon] || 'lens'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-[16px] text-on-surface leading-tight">{cat.name}</h3>
                        <p className="text-[13px] text-primary font-semibold">{cat.tagline}</p>
                      </div>
                    </div>

                    <p className="text-[13px] text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                      {cat.description}
                    </p>

                    <ul className="space-y-1.5 mb-4 flex-1">
                      {cat.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[12px] text-on-surface-variant">
                          <span className="mt-0.5 text-primary material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-[11px] text-secondary mb-4">
                      <span className="font-bold text-on-surface-variant">Compatible: </span>
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13px] hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-md self-start"
                    >
                      <svg viewBox="0 0 32 32" width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                      </svg>
                      Enquire on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div data-animate="fade-up" className="mt-11 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-primary/5 border border-primary/20 rounded-3xl px-8 py-7">
            <div className="text-left">
              <h4 className="font-bold text-[18px] text-on-surface mb-1">Not sure which to choose?</h4>
              <p className="text-[14px] text-on-surface-variant">Our clinical eye specialists will recommend the ideal lens and frame for your power and lifestyle.</p>
            </div>
            <a
              href="https://wa.me/917551808245?text=Hello%20Dey%20Optical%20(Beliatore)!%20I%20need%20help%20choosing%20the%20right%20eyewear%20for%20my%20prescription."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-on-primary rounded-2xl font-bold text-[15px] shadow-lg hover:bg-primary/90 hover:shadow-xl active:scale-95 transition-all duration-200 whitespace-nowrap"
            >
              <svg viewBox="0 0 32 32" width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
              </svg>
              Get Expert Advice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(EyewearSectionComponent);

