import React, { memo } from 'react';
import BookingSection from '../components/BookingSection.jsx';

function BookingPageComponent({ navigate }) {
  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek, minimal header without lengthy descriptions or clutter */}
        <div className="flex items-center justify-between py-3 sm:py-4 mb-4 sm:mb-6 border-b border-outline-variant/20">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate('home')}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-secondary hover:text-[#CC0000] active:scale-95 transition-all cursor-pointer"
              aria-label="Back to Home"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Home</span>
            </button>
            <span className="text-outline-variant/60 font-light">/</span>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-on-surface tracking-tight">
              Appointment Booking
            </h1>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#CC0000]/10 text-[#CC0000] border border-[#CC0000]/20">
            Online Chamber Desk
          </span>
        </div>

        {/* Main Booking Section Component */}
        <BookingSection />
      </div>
    </div>
  );
}

export default memo(BookingPageComponent);

