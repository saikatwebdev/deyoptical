import React, { useState, useEffect, useCallback, memo } from 'react';
import { useAdminData } from '../context/AdminDataContext.jsx';
import { generateDoctorWhatsAppMsg } from '../data/doctorsData.js';

const CONTACT_PHONES = [
  { display: '7551808245', dial: '+917551808245', wa: '917551808245' },
  { display: '9434438460', dial: '+919434438460', wa: '919434438460' },
];

/**
 * Lightweight Doctor Card Skeleton matching the exact compact profile layout
 */
function DoctorSkeletonGrid() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
      aria-busy="true"
      aria-label="Loading doctors schedule"
    >
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-3xl p-5 sm:p-6 border border-outline-variant/20 bg-white/70 animate-pulse shadow-sm flex flex-col justify-between"
        >
          {/* Header row skeleton */}
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-surface-container-high/80 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <div className="w-20 h-4 rounded-full bg-surface-container-high/60" />
                <div className="w-24 h-4 rounded-full bg-surface-container-high/40" />
              </div>
              <div className="w-40 sm:w-48 h-5 rounded-md bg-surface-container-high/80" />
              <div className="w-32 h-3.5 rounded-md bg-surface-container-high/60" />
              <div className="w-36 h-3 rounded-md bg-surface-container-high/50" />
            </div>
          </div>

          {/* Schedule bar skeleton */}
          <div className="h-10 rounded-xl bg-surface-container-high/50 my-3.5" />

          {/* Chips skeleton */}
          <div className="flex gap-1.5 mb-3.5">
            <div className="w-20 h-5 rounded-lg bg-surface-container-high/40" />
            <div className="w-24 h-5 rounded-lg bg-surface-container-high/40" />
            <div className="w-16 h-5 rounded-lg bg-surface-container-high/40" />
          </div>

          {/* Button skeleton */}
          <div className="h-11 rounded-xl bg-surface-container-high/70" />
        </div>
      ))}
    </div>
  );
}

/**
 * Compact Doctor Profile Card
 */
const DoctorCard = memo(function DoctorCard({ doc, idx, onBook }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isPriority = idx === 0;
  const isFull = doc.availabilityStatus === 'full';

  // Availability styling
  const statusStyles = {
    full: {
      bg: 'bg-red-50 text-red-700 border-red-200/80',
      dot: 'bg-red-500',
      label: doc.availabilityLabel || 'Chamber Full',
    },
    limited: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      dot: 'bg-amber-500 animate-pulse',
      label: doc.availabilityLabel || 'Fast Filling',
    },
    leave: {
      bg: 'bg-gray-100 text-gray-700 border-gray-300',
      dot: 'bg-gray-400',
      label: doc.availabilityLabel || 'On Leave',
    },
    available: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      dot: 'bg-emerald-500',
      label: doc.availabilityLabel || 'Booking Open',
    },
  };
  const status = statusStyles[doc.availabilityStatus] || statusStyles.available;

  return (
    <div className="group relative rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col justify-between overflow-hidden">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CC0000] via-[#FFFF00] to-[#DC143C]" />

      <div>
        {/* Doctor Header: Photo + Core Identity */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Doctor Portrait */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border border-outline-variant/30 flex-shrink-0 relative shadow-sm ring-2 ring-primary/20">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-surface-container-high animate-pulse flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant/40 text-[24px]">
                  person
                </span>
              </div>
            )}
            <img
              src={doc.photo}
              alt={doc.name}
              className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading={isPriority ? 'eager' : 'lazy'}
              fetchPriority={isPriority ? 'high' : 'low'}
              decoding="async"
              width="100"
              height="100"
              onLoad={() => setImgLoaded(true)}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            {/* Status & Visiting Badge Row */}
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${status.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                <span>{status.label}</span>
              </span>

              {doc.scheduleBadge && (
                <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {doc.scheduleBadge}
                </span>
              )}
            </div>

            {/* Doctor Name */}
            <h3 className="text-base sm:text-lg font-bold text-on-surface leading-snug tracking-tight">
              {doc.name}
            </h3>

            {/* Qualifications */}
            <p className="text-xs font-semibold text-[#CC0000] mt-0.5">
              {doc.degree}
            </p>

            {/* Title / Role */}
            {doc.title && (
              <p className="text-[11px] sm:text-xs text-secondary font-medium line-clamp-1 mt-0.5">
                {doc.title}
              </p>
            )}

            {/* Hospital Affiliation */}
            {doc.hospital && (
              <p className="text-[11px] text-secondary flex items-center gap-1 mt-1 line-clamp-1">
                <span className="material-symbols-outlined text-primary text-[13px] flex-shrink-0">
                  local_hospital
                </span>
                <span className="truncate">{doc.hospital}</span>
              </p>
            )}
          </div>
        </div>

        {/* Compact Schedule Strip */}
        <div className="bg-surface-container-low/70 rounded-xl px-3 py-2.5 my-3 border border-outline-variant/20 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-on-surface">
            <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_month
            </span>
            <span className="font-bold">{doc.scheduleDay}</span>
            <span className="text-secondary">· {doc.scheduleTime}</span>
          </div>

          {doc.nextDate && doc.nextDate !== doc.scheduleDay && (
            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">event</span>
              <span>Next: {doc.nextDate}</span>
            </span>
          )}
        </div>

        {/* Chamber Notice Alert (if present) */}
        {doc.notice && (
          <div className="mb-3 text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200/60 flex items-start gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[14px] text-amber-600 flex-shrink-0 mt-0.5">campaign</span>
            <span>{doc.notice}</span>
          </div>
        )}

        {/* Specialization Tags (Compact Chips) */}
        {doc.highlights && doc.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {doc.highlights.slice(0, 3).map((h, i) => (
              <span
                key={i}
                className="bg-surface-container-high/60 text-on-surface-variant text-[11px] font-medium px-2.5 py-0.5 rounded-lg border border-outline-variant/15 line-clamp-1"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Booking CTA Button */}
      <div className="pt-2 border-t border-outline-variant/20">
        <button
          onClick={() => onBook(doc)}
          disabled={isFull}
          className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isFull
              ? 'bg-gray-100 text-gray-400 border border-gray-300 shadow-none cursor-not-allowed'
              : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer'
          }`}
        >
          <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
          </svg>
          <span>
            {isFull ? 'Chamber Slots Full' : `Book Appointment with ${doc.name.split(' ')[1] || doc.name}`}
          </span>
        </button>

        <div className="flex items-center justify-between text-[11px] text-secondary mt-1.5 px-1">
          <span className="flex items-center gap-1">
            <span className={`material-symbols-outlined text-[13px] ${isFull ? 'text-red-500' : 'text-emerald-600'}`}>
              {isFull ? 'block' : 'verified'}
            </span>
            <span>{isFull ? 'Booking Closed' : 'Direct Clinic Confirmation'}</span>
          </span>
          <span className="font-semibold text-primary">Zero Waiting</span>
        </div>
      </div>
    </div>
  );
});

function DoctorPosterSectionComponent({ isEmbedded = false }) {
  const { doctors, doctorsLoading, doctorsLoaded, doctorsError, fetchDoctors } = useAdminData();

  const isLoading = doctorsLoading && !doctorsLoaded;
  const rawDoctors = doctors || [];

  // Ensure doctors data is loaded if not already
  useEffect(() => {
    if (!doctorsLoaded && !doctorsLoading && typeof fetchDoctors === 'function') {
      fetchDoctors();
    }
  }, [doctorsLoaded, doctorsLoading, fetchDoctors]);

  const handleOpenWhatsApp = useCallback((doctor) => {
    if (doctor.availabilityStatus === 'full') return;
    const encoded = doctor.whatsappMsg || generateDoctorWhatsAppMsg(doctor);
    window.open(`https://wa.me/917551808245?text=${encoded}`, '_blank');
  }, []);

  return (
    <div className={isEmbedded ? 'py-2' : 'py-12 sm:py-14 bg-gradient-to-b from-surface-container-low/40 to-surface relative overflow-hidden'}>
      {/* Ambient background glow (only in standalone homepage mode) */}
      {!isEmbedded && (
        <>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className={isEmbedded ? '' : 'relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Section Header */}
        <div data-animate="fade-up" className={isEmbedded ? 'mb-5 sm:mb-6' : 'text-center max-w-2xl mx-auto mb-8 sm:mb-10'}>
          {isEmbedded ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-primary">
                  Visiting Specialists · Beliatore Chamber
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight mt-0.5">
                  Consult Senior Eye Specialists
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-secondary max-w-md">
                Select your specialist below to pre-book consultation via WhatsApp with zero waiting queue.
              </p>
            </div>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full mb-2.5">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stethoscope
                </span>
                Visiting Specialists · Beliatore Chamber
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                Consult Our Senior <span className="text-primary">Eye Specialists</span>
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-2 leading-relaxed">
                Experienced ophthalmic surgeons and clinical optometrists at Dey Optical, Beliatore. Pre-book your slot to avoid waiting.
              </p>
            </>
          )}
        </div>

        {/* ── SKELETON LOADING STATE ── */}
        {isLoading && <DoctorSkeletonGrid />}

        {/* ── ERROR STATE (Database connection failure) ── */}
        {!isLoading && doctorsError && rawDoctors.length === 0 && (
          <div className="text-center py-12 sm:py-14 bg-surface-container-low/50 rounded-3xl border border-outline-variant/30 max-w-md mx-auto p-6">
            <div className="w-12 h-12 rounded-2xl bg-[#CC0000]/10 text-[#CC0000] flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[26px]">cloud_off</span>
            </div>
            <h3 className="text-base font-bold text-on-surface mb-1">Unable to Load Doctors</h3>
            <p className="text-xs text-secondary mb-4 leading-relaxed">
              Could not retrieve visiting doctor schedules from the database. Please try again.
            </p>
            <button
              onClick={() => fetchDoctors && fetchDoctors()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#CC0000] text-white font-bold text-xs hover:bg-[#DC143C] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              <span>Retry Loading</span>
            </button>
          </div>
        )}

        {/* ── EMPTY STATE (No doctors in database) ── */}
        {!isLoading && !doctorsError && rawDoctors.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-surface-container-low/50 rounded-3xl border border-dashed border-outline-variant/30 max-w-md mx-auto p-6">
            <span className="material-symbols-outlined text-[36px] text-outline-variant mb-2">person_off</span>
            <h3 className="text-base font-bold text-on-surface mb-1">No Doctors Scheduled</h3>
            <p className="text-xs text-secondary">
              Visiting doctor chamber schedules will appear here once announced.
            </p>
          </div>
        )}

        {/* ── COMPACT DOCTOR CARDS GRID (Database-driven) ── */}
        {!isLoading && rawDoctors.length > 0 && (
          <div
            data-animate-stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
          >
            {rawDoctors.map((doc, idx) => (
              <DoctorCard
                key={doc.id || doc.doctorId || doc._id || idx}
                doc={doc}
                idx={idx}
                onBook={handleOpenWhatsApp}
              />
            ))}
          </div>
        )}

        {/* ── COMPACT CONTACT & CHAMBER BANNER ── */}
        <div data-animate="fade-up" className="mt-7 sm:mt-8 max-w-5xl mx-auto">
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1.5 shadow-xs border border-outline-variant/30 flex items-center justify-center flex-shrink-0">
                <img
                  src="images/other/newlogo.png"
                  alt="Dey Optical"
                  className="h-8 sm:h-9 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  width="110"
                  height="36"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  Official Chamber Desk
                </span>
                <h4 className="text-sm sm:text-base font-bold text-on-surface leading-tight">
                  Dey Optical, Beliatore
                </h4>
                <p className="text-[11px] sm:text-xs text-secondary">
                  Super Market Stall No-15, Beliatore
                </p>
              </div>
            </div>

            {/* Quick Phone Call & WhatsApp Links */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              {CONTACT_PHONES.map((phone) => (
                <a
                  key={phone.display}
                  href={`tel:${phone.dial}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-primary hover:text-white text-on-surface font-bold text-xs border border-outline-variant/40 transition-all active:scale-95 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary group-hover:text-white">call</span>
                  <span>{phone.display}</span>
                </a>
              ))}

              <a
                href="https://wa.me/917551808245?text=Hello%20Dey%20Optical%20Beliatore%2C%20I%20would%20like%20to%20enquire%20about%20doctor%20appointments."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs active:scale-95 transition-all whitespace-nowrap"
              >
                <svg viewBox="0 0 32 32" width="14" height="14" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                </svg>
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DoctorPosterSectionComponent);
