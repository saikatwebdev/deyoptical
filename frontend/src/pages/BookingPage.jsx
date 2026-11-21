import React, { useState, useEffect, memo } from 'react';
import BookingSection from '../components/BookingSection.jsx';
import DoctorPosterSection from '../components/DoctorPosterSection.jsx';
import { useAdminData } from '../context/AdminDataContext.jsx';

function BookingPageComponent({ navigate }) {
  const { doctors } = useAdminData();
  const doctorsCount = (doctors || []).length;

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.toLowerCase().includes('doctor')) {
      return 'doctors';
    }
    return 'shop';
  });

  // Sync hash changes if user navigates with #doctors
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.toLowerCase().includes('doctor')) {
        setActiveTab('doctors');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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

        {/* ── Category Switcher Tabs: Shop vs Doctors ── */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 border-b border-outline-variant/20 pb-3 sm:pb-4 overflow-x-auto scrollbar-none">
          {/* Tab 1: Shop & Clinic Desk */}
          <button
            onClick={() => setActiveTab('shop')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap ${
              activeTab === 'shop'
                ? 'bg-[#CC0000] text-white shadow-md ring-2 ring-[#FFFF00]/40'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
            <span>Shop &amp; Clinic Desk</span>
          </button>

          {/* Tab 2: Specialist Doctors */}
          <button
            onClick={() => setActiveTab('doctors')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap ${
              activeTab === 'doctors'
                ? 'bg-[#CC0000] text-white shadow-md ring-2 ring-[#FFFF00]/40'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stethoscope
            </span>
            <span>Visiting Doctors</span>
            {doctorsCount > 0 && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                  activeTab === 'doctors'
                    ? 'bg-white/20 text-[#FFFF00]'
                    : 'bg-outline-variant/30 text-secondary'
                }`}
              >
                {doctorsCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Content View ── */}
        {activeTab === 'shop' ? (
          <div data-animate="fade-up">
            <BookingSection />
          </div>
        ) : (
          <div data-animate="fade-up">
            <DoctorPosterSection isEmbedded={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(BookingPageComponent);
