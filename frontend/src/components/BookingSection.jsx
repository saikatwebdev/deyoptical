import React, { useState, useRef } from 'react';
import { animateFadeUp } from '../utils/animations.js';

const SERVICES = [
  {
    icon: 'visibility',
    name: 'Comprehensive Eye Exam',
    desc: 'Full computerized auto-refraction, slit-lamp & retinal assessment',
    duration: '45 min',
  },
  {
    icon: 'lens',
    name: 'Contact Lens Fitting',
    desc: 'Corneal topography mapping & trial lens fitting session',
    duration: '30 min',
  },
  {
    icon: 'blur_on',
    name: 'Progressive Lens Consultation',
    desc: 'Point-by-point digital free-form progressive corridor fitting',
    duration: '30 min',
  },
  {
    icon: 'child_care',
    name: 'Pediatric Eye Care',
    desc: 'Gentle visual acuity & refractive screening for children',
    duration: '40 min',
  },
  {
    icon: 'build',
    name: 'Frame Repair & Adjustment',
    desc: 'Professional ultrasonic frame realignment & nose rest adjustment',
    duration: '15 min',
  },
];

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

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
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone = 'Valid phone required';
    if (!form.service) e.service = 'Please select a service';
    if (!form.date) e.date = 'Please select a date';
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
      `Hello Dey Optical! 🙏\n\nI'd like to book an appointment:\n\n` +
      `👤 Name: ${form.name}\n` +
      `📱 Phone: ${form.phone}\n` +
      `🩺 Service: ${form.service}\n` +
      `📅 Date: ${form.date}\n` +
      `🕐 Time: ${form.timeSlot}\n` +
      (form.notes ? `📝 Notes: ${form.notes}\n` : '') +
      `\nPlease confirm my appointment. Thank you!`
    );

    window.open(`https://wa.me/919064272877?text=${msg}`, '_blank');
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
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-tertiary to-primary" />
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(0,104,95,0.07) 0%, transparent 40%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate="fade-up" className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
            Appointments
          </span>
          <h2 className="text-[36px] md:text-[42px] font-bold text-on-surface tracking-tight leading-tight mb-3">
            Book Your Eye Care
            <br />
            <span className="text-primary">Appointment</span>
          </h2>
          <p className="text-[16px] text-on-surface-variant max-w-xl mx-auto">
            Schedule a consultation with Dr. Arindam Dey. Confirm via WhatsApp — fast and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Services */}
          <div data-animate="fade-up" className="space-y-5">
            <h3 className="text-[20px] font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
              Our Services
            </h3>
            {SERVICES.map((svc) => (
              <div
                key={svc.name}
                onClick={() => setForm((f) => ({ ...f, service: svc.name }))}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  form.service === svc.name
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-outline-variant/50 bg-surface-container-low hover:border-primary/40'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  form.service === svc.name ? 'bg-primary text-on-primary' : 'bg-primary/10 text-primary'
                }`}>
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>{svc.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[15px] text-on-surface">{svc.name}</h4>
                    <span className="text-[12px] text-secondary bg-surface-container px-2 py-0.5 rounded-full">{svc.duration}</span>
                  </div>
                  <p className="text-[13px] text-on-surface-variant mt-1">{svc.desc}</p>
                </div>
                {form.service === svc.name && (
                  <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 self-center" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                )}
              </div>
            ))}

            {/* Clinic Info */}
            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
              <h4 className="font-bold text-[16px] text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                Clinic Information
              </h4>
              <div className="space-y-3 text-[14px] text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">map</span>
                  <span>Dey Optical, Kolkata, West Bengal, India</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                  <div>
                    <div>Mon – Sat: 10:00 AM – 7:30 PM</div>
                    <div>Sunday: 11:00 AM – 4:00 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">call</span>
                  <a href="tel:+919064272877" className="hover:text-primary transition-colors">+91 90642 72877</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div data-animate="fade-up">
            {submitted ? (
              <div
                ref={successRef}
                className="opacity-0 bg-primary/5 border-2 border-primary/20 rounded-3xl p-10 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                  <span className="material-symbols-outlined text-primary text-[44px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h3 className="text-[24px] font-bold text-on-surface mb-2">Booking Request Sent!</h3>
                <p className="text-on-surface-variant text-[15px] mb-6">
                  Your appointment request has been sent via WhatsApp. We'll confirm shortly!
                </p>
                <div className="bg-white rounded-2xl p-5 text-left space-y-2 mb-7 shadow-sm border border-outline-variant/20">
                  <div className="text-[13px] text-secondary font-semibold uppercase tracking-wide mb-3">Summary</div>
                  {[
                    { icon: 'person', label: 'Name', val: form.name },
                    { icon: 'medical_services', label: 'Service', val: form.service },
                    { icon: 'calendar_month', label: 'Date', val: form.date },
                    { icon: 'schedule', label: 'Time', val: form.timeSlot },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3 text-[14px]">
                      <span className="material-symbols-outlined text-primary text-[16px]">{row.icon}</span>
                      <span className="text-secondary w-20">{row.label}:</span>
                      <span className="font-semibold text-on-surface">{row.val}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-[15px] hover:bg-primary/90 active:scale-95 transition-all duration-200"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-container-low rounded-3xl p-8 shadow-lg border border-outline-variant/20 space-y-5"
              >
                <h3 className="text-[20px] font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>edit_calendar</span>
                  Appointment Details
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-error text-[12px] mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 98XXX XXXXX"
                    className={inputClass('phone')}
                  />
                  {errors.phone && <p className="text-error text-[12px] mt-1">{errors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Service *</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    className={inputClass('service')}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-error text-[12px] mt-1">{errors.service}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      min={getTodayDate()}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className={inputClass('date')}
                    />
                    {errors.date && <p className="text-error text-[12px] mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Time Slot *</label>
                    <select
                      value={form.timeSlot}
                      onChange={(e) => setForm((f) => ({ ...f, timeSlot: e.target.value }))}
                      className={inputClass('timeSlot')}
                    >
                      <option value="">Select time...</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.timeSlot && <p className="text-error text-[12px] mt-1">{errors.timeSlot}</p>}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[13px] font-semibold text-on-surface mb-1.5">Additional Notes</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Any specific concerns or requirements..."
                    className={`${inputClass('notes')} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-[16px] shadow-lg hover:bg-primary/90 hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                  </svg>
                  Confirm via WhatsApp
                </button>

                <p className="text-[12px] text-secondary text-center">
                  Clicking will open WhatsApp with your booking details pre-filled. We'll confirm within 1 hour.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

