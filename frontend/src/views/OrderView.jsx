import React, { useState, useEffect, useRef } from 'react';
import { animateModalIn } from '../utils/animations.js';

export default function OrderView({
  navigate,
  preloadedService,
  preloadedNotes
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Comprehensive Eye Exam');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('Morning (10:00 AM - 1:00 PM)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const successRef = useRef(null);

  useEffect(() => {
    if (isSuccess && successRef.current) {
      animateModalIn(successRef.current);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (preloadedService) {
      setService(preloadedService);
    }
  }, [preloadedService]);

  useEffect(() => {
    if (preloadedNotes) {
      setNotes(preloadedNotes);
    }
  }, [preloadedNotes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const chosenDate = date || 'Earliest Available';
    const text = `*New Dey Optical Consultation Request*\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred Date: ${chosenDate}\nTime: ${time}\nNotes: ${notes || 'None'}`;
    const waUrl = `https://wa.me/919064272877?text=${encodeURIComponent(text)}`;

    setIsSuccess(true);

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 500);
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setDate('');
    setNotes('');
    setIsSuccess(false);
  };

  return (
    <section className="view-section" id="view-order">
      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Consultation &amp; Trial</span>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs">
          <div className="mb-8">
            <span className="text-label-sm font-label-sm text-primary font-bold uppercase tracking-wider">
              Direct Clinical Booking
            </span>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mt-1">
              Book Exam or In-Store Frame Trial
            </h1>
            <p className="text-body-md font-body-md text-secondary mt-2">
              Submit your details below for instant clinic reservation and direct WhatsApp confirmation.
            </p>
          </div>

          {!isSuccess ? (
            <form className="space-y-6" id="order-enquiry-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">Your Full Name *</label>
                  <input
                    className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                    id="order-name"
                    placeholder="e.g. Rahul Sharma"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                    id="order-phone"
                    placeholder="e.g. +91 98765 43210"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1">
                  Service / Category of Interest *
                </label>
                <select
                  className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                  id="order-service-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="Comprehensive Eye Exam">Comprehensive Computerized Eye Exam</option>
                  <option value="Progressive Lens Consultation">Progressive Lens Consultation</option>
                  <option value="Contact Lens Fitting">Contact Lens Trial &amp; Fitting</option>
                  <option value="Pediatric Eye Care">Pediatric Eye Care</option>
                  <option value="Frame Fitting &amp; Repair">Frame Repair &amp; Alignment</option>
                  <option value="Frame Consultation & Trial">Frame Consultation &amp; In-Store Trial</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">Preferred Date</label>
                  <input
                    className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                    id="order-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-1">Preferred Time Slot</label>
                  <select
                    className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                    id="order-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 5:00 PM)</option>
                    <option>Evening (5:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-1">
                  Additional Prescription Notes / Power (Optional)
                </label>
                <textarea
                  className="w-full bg-surface border border-outline-variant/40 rounded-lg p-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                  id="order-notes"
                  placeholder="Paste your SPH/CYL/AXIS diopter numbers or frame model request here..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all shadow-sm cursor-pointer"
                  type="submit"
                >
                  Confirm Booking &amp; Open WhatsApp
                </button>
                <span className="text-body-sm font-body-sm text-secondary">
                  Instant confirmation, zero obligation.
                </span>
              </div>
            </form>
          ) : (
            /* Order Success Feedback Card */
            <div ref={successRef} className="text-center py-8" id="order-success-state">
              <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface">Booking Request Received!</h3>
              <p className="text-body-md font-body-md text-secondary mt-2 max-w-md mx-auto">
                Thank you! Our optometrist desk has received your request. We have also opened your WhatsApp message
                pre-filled with all details.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  className="bg-surface-container-high text-on-surface px-6 py-2.5 rounded-lg text-label-md font-label-md hover:bg-surface-container-highest cursor-pointer"
                  onClick={() => {
                    handleResetForm();
                    navigate('home');
                  }}
                >
                  Return to Home
                </button>
                <button
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container cursor-pointer"
                  onClick={() => {
                    handleResetForm();
                    navigate('eyewear');
                  }}
                >
                  Browse Product Categories
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
