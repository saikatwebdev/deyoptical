import React, { memo } from 'react';
import EyewearSection from '../components/EyewearSection.jsx';

function LensPageComponent({ navigate }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner & Breadcrumb Header */}
      <div className="pt-20 sm:pt-24 pb-4 border-b border-outline-variant/20 bg-surface-container-low/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-secondary mb-3">
            <button
              onClick={() => navigate('home')}
              className="hover:text-primary transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Home
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">Lens &amp; Eyewear Information</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary">
                Optical Technology &amp; Styles
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-0.5">
                Lenses &amp; Eyewear Guide
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-secondary max-w-md">
              Learn about our precision progressive lenses, digital blue-cut coatings, UV protection, and designer frames.
            </p>
          </div>
        </div>
      </div>

      {/* Main Eyewear & Lens Section Component */}
      <div className="py-4">
        <EyewearSection />
      </div>
    </div>
  );
}

export default memo(LensPageComponent);

