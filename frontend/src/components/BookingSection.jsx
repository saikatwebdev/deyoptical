import React, { useState, useRef } from 'react';
import { animateFadeUp } from '../utils/animations.js';

const SERVICES = [
  'Dr. Soumen Dandapath (Phaco Surgeon) – Sunday Chamber',
  'Optom. Apurbo Kumar Patra (Optometrist) – Thursday Chamber',
  'Comprehensive Computerized Eye Examination',
  'Contact Lens Fitting & Trial Session',
  'Progressive / Multifocal Lens Consultation',
  'Pediatric Eye Screening & Myopia Control',
  'Spectacle Power Check & Frame Selection',
];

const TIME_SLOTS = [
  'Morning (9:30 AM – 11:00 AM)',
  'Mid-Day (11:30 AM – 1:00 PM)',
  'Afternoon (2:00 PM – 4:00 PM)',
  'Evening (4:30 PM – 6:30 PM)',
  'Late Evening (6:30 PM – 8:00 PM)',
];

export default function BookingSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    timeSlot: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const successRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your full name';
    if (!form.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone = 'Valid phone number required';
    if (!form.service) e.service = 'Please select a doctor or service';
    if (!form.date) e.date = 'Please pick a preferred date';
    if (!form.timeSlot) e.timeSlot = 'Please select a time slot';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const msg = encodeURIComponent(
      `Hello Dey Optical (Beliatore)! 🙏\n\n` +
      `I would like to book an eye care appointment:\n\n` +
      `👤 *Name:* ${form.name.trim()}\n` +
      `📱 *Phone:* ${form.phone.trim()}\n` +
      `🩺 *Doctor / Service:* ${form.service}\n` +
      `📅 *Preferred Date:* ${form.date}\n` +
      `🕐 *Time Slot:* ${form.timeSlot}\n` +
      (form.notes.trim() ? `📝 *Notes / Concern:* ${form.notes.trim()}\n` : '') +
      `\nPlease confirm the appointment slot at Dey Optical, Beliatore. Thank you!`
    );

    window.open(`https://wa.me/917551808245?text=${msg}`, '_blank');
    setSubmitted(true);
    if (successRef.current) animateFadeUp(successRef.current, { duration: 500 });
  };

  const resetForm = () => {
    setForm({ name: '', phone: '', service: '', date: '', timeSlot: '', notes: '' });
    setSubmitted(false);
    setErrors({});
  };

  const getTodayDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-error bg-error-container/20' : 'border-outline-variant bg-surface'
    } text-on-surface text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder:text-outline`;

  return (
    <div className="py-16 bg-white relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-primary" />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(0,104,95,0.07) 0%, transparent 40%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate="fade-up" className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_month
            </span>
            Appointments &amp; Enquiries
          </span>
          <h2 className="text-[32px] sm:text-[38px] md:text-[44px] font-bold text-on-surface tracking-tight leading-tight mb-3">
            Book Your Eye Care <span className="text-primary">Appointment</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Schedule a visit with our visiting eye specialists or book a precision vision checkup at Dey Optical, Beliatore.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Contact & Address Card + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ── Left Column: Contact, Chamber & Address Card (lg: 5 cols) ── */}
          <div data-animate="fade-up" className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-md">
              
              {/* Clinic Brand Header */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-outline-variant/30">
                <div className="bg-white rounded-2xl p-2 shadow-xs border border-outline-variant/30 flex items-center justify-center flex-shrink-0">
                  <img
                    src="images/logo.png"
                    alt="Dey Optical Beliatore"
                    className="h-10 sm:h-11 w-auto object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Official Chamber &amp; Store
                  </div>
                  <h3 className="text-[20px] font-bold text-on-surface leading-tight mt-0.5">
                    Dey Optical, Beliatore
                  </h3>
                  <p className="text-[12px] text-secondary">Precision Eye Care &amp; Boutique Eyewear</p>
                </div>
              </div>

              {/* Address & Direction */}
              <div className="py-5 space-y-4 text-[14px] border-b border-outline-variant/30">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[19px]">location_on</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-on-surface text-[14px]">Clinic Address</div>
                    <p className="text-secondary text-[13px] leading-relaxed mt-0.5">
                      Super Market Stall No-15 (Near Panchayat),<br />
                      Beliatore, Bankura, West Bengal – 722203
                    </p>
                    <a
                      href="https://maps.google.com/?q=Dey+Optical+Beliatore+Bankura"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[12px] font-bold text-primary hover:underline mt-1.5"
                    >
                      <span>View on Google Maps</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>

                {/* Visiting Specialists Schedule */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      stethoscope
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-on-surface text-[14px]">Doctor Visiting Schedule</div>
                    <div className="mt-1 space-y-1.5 text-[12px]">
                      <div className="bg-white/80 rounded-lg p-2 border border-outline-variant/20">
                        <span className="font-bold text-primary block">Dr. Soumen Dandapath (MBBS, DOMS)</span>
                        <span className="text-secondary">Phaco Surgeon · Every Sunday (11:30 AM – 1:00 PM)</span>
                      </div>
                      <div className="bg-white/80 rounded-lg p-2 border border-outline-variant/20">
                        <span className="font-bold text-primary block">Optom. Apurbo Kumar Patra (D.OPT, R.I.O.)</span>
                        <span className="text-secondary">Clinical Optometrist · Every Thursday (9:30 AM – 11:00 AM)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Store Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[19px]">schedule</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-on-surface text-[14px]">Opening Hours</div>
                    <div className="text-[13px] text-secondary mt-0.5 space-y-0.5">
                      <div><strong className="text-on-surface font-medium">Mon – Sat:</strong> 10:00 AM – 8:00 PM</div>
                      <div><strong className="text-on-surface font-medium">Sunday:</strong> 10:30 AM – 3:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Call & WhatsApp Desk */}
              <div className="pt-5">
                <div className="text-[12px] font-bold text-on-surface uppercase tracking-wider mb-3">
                  Direct Phone Enquiries:
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <a
                    href="tel:+917551808245"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-primary hover:text-white text-on-surface border border-outline-variant/40 font-bold text-[13px] transition-all duration-200 active:scale-95 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-primary group-hover:text-white text-[16px]">call</span>
                    <span>7551808245</span>
                  </a>
                  <a
                    href="tel:+919434438460"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-primary hover:text-white text-on-surface border border-outline-variant/40 font-bold text-[13px] transition-all duration-200 active:scale-95 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-primary group-hover:text-white text-[16px]">call</span>
                    <span>9434438460</span>
                  </a>
                </div>

                <a
                  href="https://wa.me/917551808245?text=Hello%20Dey%20Optical%20(Beliatore)%2C%20I%20would%20like%20to%20enquire%20about%20your%20services%20and%20doctor%20appointments."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[14px] text-white transition-all duration-200 hover:opacity-95 active:scale-95 shadow-xs"
                  style={{ background: '#25D366' }}
                >
                  <svg viewBox="0 0 32 32" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                  </svg>
                  <span>Quick WhatsApp Enquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Column: Booking Form Card (lg: 7 cols) ── */}
          <div data-animate="fade-up" className="lg:col-span-7 order-1 lg:order-2">
            {submitted ? (
              <div
                ref={successRef}
                className="opacity-0 bg-primary/5 border-2 border-primary/20 rounded-3xl p-8 sm:p-10 text-center shadow-lg"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <span
                    className="material-symbols-outlined text-primary text-[36px] sm:text-[44px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="text-[22px] sm:text-[26px] font-bold text-on-surface mb-2">Booking Request Sent!</h3>
                <p className="text-on-surface-variant text-[14px] sm:text-[15px] mb-6 max-w-md mx-auto">
                  Your appointment details have been prepared for WhatsApp. We will confirm your preferred slot promptly!
                </p>
                
                <div className="bg-white rounded-2xl p-5 text-left space-y-2.5 mb-7 shadow-xs border border-outline-variant/30 max-w-md mx-auto">
                  <div className="text-[12px] text-secondary font-bold uppercase tracking-wider mb-2">
                    Booking Summary
                  </div>
                  {[
                    { icon: 'person', label: 'Name', val: form.name },
                    { icon: 'call', label: 'Phone', val: form.phone },
                    { icon: 'medical_services', label: 'Service', val: form.service },
                    { icon: 'calendar_month', label: 'Date', val: form.date },
                    { icon: 'schedule', label: 'Time', val: form.timeSlot },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-2.5 text-[13px] sm:text-[14px]">
                      <span className="material-symbols-outlined text-primary text-[17px] mt-0.5 flex-shrink-0">
                        {row.icon}
                      </span>
                      <span className="text-secondary w-20 flex-shrink-0">{row.label}:</span>
                      <span className="font-semibold text-on-surface break-words flex-1">{row.val}</span>
                    </div>
                  ))}
                  {form.notes && (
                    <div className="flex items-start gap-2.5 text-[13px] pt-1 border-t border-outline-variant/20">
                      <span className="material-symbols-outlined text-primary text-[17px] mt-0.5 flex-shrink-0">notes</span>
                      <span className="text-secondary w-20 flex-shrink-0">Notes:</span>
                      <span className="text-on-surface italic break-words flex-1">{form.notes}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-[14px] sm:text-[15px] hover:bg-primary/90 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-container-low rounded-3xl p-6 sm:p-8 md:p-9 shadow-lg border border-outline-variant/25 space-y-4 sm:space-y-5"
              >
                <div>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-on-surface flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-primary text-[22px] sm:text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      edit_calendar
                    </span>
                    <span>Online Appointment Booking</span>
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-secondary mt-1">
                    Fill in your details below to instantly reserve your consultation slot.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                    Full Name <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Subir Mukherjee"
                      className={inputClass('name')}
                    />
                  </div>
                  {errors.name && <p className="text-error text-[12px] mt-1 font-medium">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                    Phone / WhatsApp Number <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="e.g. 98300 XXXXX"
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-error text-[12px] mt-1 font-medium">{errors.phone}</p>}
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                    Select Doctor or Clinical Service <span className="text-error">*</span>
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    className={`${inputClass('service')} cursor-pointer`}
                  >
                    <option value="">-- Choose a visiting doctor or service --</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-error text-[12px] mt-1 font-medium">{errors.service}</p>}
                </div>

                {/* Date & Time Slot - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                      Preferred Date <span className="text-error">*</span>
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      min={getTodayDate()}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className={`${inputClass('date')} cursor-pointer`}
                    />
                    {errors.date && <p className="text-error text-[12px] mt-1 font-medium">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                      Preferred Time Slot <span className="text-error">*</span>
                    </label>
                    <select
                      value={form.timeSlot}
                      onChange={(e) => setForm((f) => ({ ...f, timeSlot: e.target.value }))}
                      className={`${inputClass('timeSlot')} cursor-pointer`}
                    >
                      <option value="">-- Select time slot --</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.timeSlot && <p className="text-error text-[12px] mt-1 font-medium">{errors.timeSlot}</p>}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">
                    Specific Symptoms / Notes <span className="text-secondary font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="e.g. Cataract consultation, blurry distant vision, headache while reading..."
                    className={`${inputClass('notes')} resize-none`}
                  />
                </div>

                {/* Submit via WhatsApp */}
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 bg-primary text-on-primary rounded-xl font-bold text-[15px] sm:text-[16px] shadow-lg hover:bg-primary/90 hover:shadow-xl active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer mt-2"
                >
                  <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                  </svg>
                  <span>Confirm Appointment via WhatsApp</span>
                </button>

                <p className="text-[12px] text-secondary text-center leading-normal">
                  Zero waiting queue upon arrival. Your appointment will be confirmed by our front desk within 1 hour.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
