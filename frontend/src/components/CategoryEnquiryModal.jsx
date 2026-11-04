import React, { useState, useEffect, useRef } from 'react';
import { animateModalIn } from '../utils/animations.js';

const CATEGORY_OPTIONS = [
  'Eyeglasses & Optical Frames',
  'UV400 Polarized Sunglasses',
  'Designer & Luxury Frames',
  'Blue-Cut & Digital Screen Protection',
  'Kids & Pediatric Eyewear',
  'Specialized Prescription & Progressive Lenses',
  'General Eyewear Consultation'
];

export default function CategoryEnquiryModal({
  isOpen,
  onClose,
  initialCategory,
  sampleProduct
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [inquiryType, setInquiryType] = useState('Explore Frame Styles & Availability');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (initialCategory) {
      const match = CATEGORY_OPTIONS.find((c) =>
        c.toLowerCase().includes(initialCategory.toLowerCase()) ||
        initialCategory.toLowerCase().includes(c.toLowerCase())
      );
      if (match) {
        setCategory(match);
      } else {
        setCategory(initialCategory);
      }
    }
  }, [initialCategory]);

  useEffect(() => {
    if (sampleProduct) {
      setNotes(`Interested in frame model: ${sampleProduct.name} (${sampleProduct.material})`);
    }
  }, [sampleProduct]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      animateModalIn(modalRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const text =
`*Dey Optical - Product Category Enquiry*
────────────────────────
👤 *Name:* ${name.trim()}
📱 *WhatsApp:* ${phone.trim()}
👓 *Category of Interest:* ${category}
🎯 *Inquiry Type:* ${inquiryType}
${notes.trim() ? `💬 *Details / Prescription:* ${notes.trim()}\n` : ''}────────────────────────
_Sent from Dey Optical Website Showcase_`;

    const waUrl = `https://wa.me/919830000000?text=${encodeURIComponent(text)}`;
    setIsSubmitted(true);

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setNotes('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-in fade-in duration-200"
      id="category-enquiry-modal"
      onClick={handleResetAndClose}
    >
      <div
        ref={modalRef}
        className="bg-surface-container-lowest w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-outline-variant/40 shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          onClick={handleResetAndClose}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-label-sm font-semibold mb-2">
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Direct WhatsApp Product Enquiry</span>
              </div>
              <h2 className="text-headline-md font-headline-md font-semibold text-on-surface">
                Enquire About {category}
              </h2>
              <p className="text-body-sm font-body-sm text-secondary mt-1">
                We do not sell online. Fill out this brief form and our optometric desk will connect with you directly on WhatsApp with catalog options, frame trials, and pricing.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-body-md font-body-md placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-body-md font-body-md placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                  Product Category of Interest *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                  What would you like to inquire about?
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Explore Frame Styles & Availability">
                    Explore Available Frame Styles &amp; Stock
                  </option>
                  <option value="Schedule In-Clinic Trial & Eye Test">
                    Schedule In-Clinic Frame Trial &amp; Eye Test
                  </option>
                  <option value="Lens Power & Coating Compatibility">
                    Prescription Power &amp; Lens Coating Guidance
                  </option>
                  <option value="Custom Sourcing & Designer Request">
                    Custom Frame Sourcing / Specific Brand Request
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                  Specific Requirements or Diopter Numbers (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Looking for lightweight titanium aviators, high minus prescription diopters, or photochromic grey coating..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl p-3 text-body-md font-body-md placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 px-6 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Send Enquiry on WhatsApp</span>
                </button>
                <p className="text-center text-xs text-secondary mt-2">
                  Opens WhatsApp with pre-formatted inquiry details. Zero spam, 100% confidential.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
              Enquiry Forwarded to WhatsApp!
            </h3>
            <p className="text-body-md font-body-md text-secondary mt-2 max-w-md mx-auto">
              Thank you, <strong className="text-on-surface">{name}</strong>. Your enquiry for <strong className="text-primary">{category}</strong> has been created and opened in your WhatsApp app.
            </p>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 max-w-sm mx-auto my-6 text-left text-xs font-mono-data text-secondary space-y-1">
              <div><strong>Name:</strong> {name}</div>
              <div><strong>Category:</strong> {category}</div>
              <div><strong>Type:</strong> {inquiryType}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all cursor-pointer"
                onClick={handleResetAndClose}
              >
                Done / Browse Other Categories
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
