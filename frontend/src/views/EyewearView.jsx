import React, { useState, useEffect, useRef } from 'react';
import { PRODUCT_CATEGORIES } from '../data/mockData.js';
import { animateStagger } from '../utils/animations.js';

const FALLBACK_PRODUCT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUngKnxMCJb1gAlTHRhDi2CaQwPYxRcZDPijzz5Z0J3VPauRoKVRG4Lscz4wcRDrmB8f1KqchXJ0xESR3k4ceabNUtzQmw6f15IVLNDRTcEFR-4W3UTg_pjuf_uWCHweyVZlSdeLwRvT7q4zZhWs8o3kUZ87Hn5JJetmHG0oTsZ35pq5XNlqQrzB9uVfQFMjdvMx4npSwJ4VrQ4_O8G3fti0XebrJfkh2iHszyIb2J50S3umRbQoFu";

export default function EyewearView({
  navigate,
  selectedCategory,
  setCategoryFilter,
  openCategoryEnquiry,
  openProductModal,
  quickEnquireCategoryWhatsApp,
  openBookingModal
}) {
  const [activeCategoryTab, setActiveCategoryTab] = useState(selectedCategory || 'All');

  // Inline enquiry form state for the bottom section
  const [inlineName, setInlineName] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineCategory, setInlineCategory] = useState(PRODUCT_CATEGORIES[0].name);
  const [inlineNotes, setInlineNotes] = useState('');
  const [inlineSuccess, setInlineSuccess] = useState(false);

  const categoryListRef = useRef(null);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All') {
      const found = PRODUCT_CATEGORIES.find(
        (c) => c.shortName.toLowerCase() === selectedCategory.toLowerCase() ||
               c.name.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      if (found) {
        setActiveCategoryTab(found.shortName);
        const element = document.getElementById(found.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (categoryListRef.current) {
      animateStagger(categoryListRef.current.children, { delay: 40, duration: 400 });
    }
  }, []);

  const scrollToCategory = (cat) => {
    setActiveCategoryTab(cat.shortName);
    if (setCategoryFilter) {
      setCategoryFilter(cat.shortName);
    }
    const element = document.getElementById(cat.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInlineFormSubmit = (e) => {
    e.preventDefault();
    if (!inlineName.trim() || !inlinePhone.trim()) return;

    const message =
`*Dey Optical - Category Enquiry*
────────────────────────
👤 *Name:* ${inlineName.trim()}
📱 *WhatsApp:* ${inlinePhone.trim()}
👓 *Interested Category:* ${inlineCategory}
${inlineNotes.trim() ? `💬 *Notes/Requirements:* ${inlineNotes.trim()}\n` : ''}────────────────────────
_Sent from Dey Optical Eyewear Showcase_`;

    const waUrl = `https://wa.me/919830000000?text=${encodeURIComponent(message)}`;
    setInlineSuccess(true);

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <section className="view-section" id="view-eyewear">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Product &amp; Eyewear Categories</span>
        </div>

        {/* Section Header */}
        <div data-animate="fade-up" className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-label-sm font-semibold mb-3">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Clinical Optical Curation &bull; Direct Practice Dispensing</span>
          </div>
          <h1 className="text-headline-lg md:text-display font-display text-on-surface">
            Our Eyewear &amp; Lens Collections
          </h1>
          <p className="text-body-md font-body-md text-secondary mt-2 max-w-3xl">
            We are a dedicated optometric practice and optical lab, not an e-commerce store. We do not sell directly online. Instead, explore our specialized product categories below to learn about materials, clinical lens options, and sample models we dispense in our clinic.
          </p>
        </div>

        {/* Informative Banner */}
        <div data-animate="fade-up" className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">contact_support</span>
            </div>
            <div>
              <h3 className="text-label-md font-label-md font-semibold text-on-surface">
                Interested in any category?
              </h3>
              <p className="text-body-sm font-body-sm text-secondary">
                Simply click "Enquire on WhatsApp" on any category to receive customized model photos, pricing estimates, and in-store trial slots.
              </p>
            </div>
          </div>
          <button
            onClick={() => openCategoryEnquiry('General Eyewear Consultation')}
            className="shrink-0 bg-primary text-on-primary px-5 py-2.5 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Quick Category Enquiry</span>
          </button>
        </div>

        {/* Category Quick Navigation Pills */}
        <div className="mb-12">
          <div className="text-label-sm font-label-sm text-secondary uppercase tracking-wider font-semibold mb-3">
            Browse Product Categories
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat)}
                className={`px-4 py-2 rounded-xl text-label-md font-label-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeCategoryTab === cat.shortName
                    ? 'bg-primary text-on-primary shadow-sm font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-outline-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                <span>{cat.shortName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Category Showcases */}
        <div ref={categoryListRef} className="space-y-16">
          {PRODUCT_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              id={cat.id}
              className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-xs hover:border-primary/40 transition-all scroll-mt-24"
            >
              {/* Category Top Banner */}
              <div className="p-6 sm:p-8 border-b border-outline-variant/20 bg-surface-container-low/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-headline-md font-headline-md font-semibold text-on-surface">
                        {cat.name}
                      </h2>
                      <span className="text-label-sm font-label-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        {cat.badge}
                      </span>
                    </div>
                    <p className="text-body-sm font-body-sm text-secondary mt-0.5">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {/* Primary Category Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openCategoryEnquiry(cat.name)}
                    className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    <span>Fill Enquiry Form</span>
                  </button>
                  <button
                    onClick={() => quickEnquireCategoryWhatsApp(cat.name)}
                    className="bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary hover:bg-surface-container-high px-4 py-2.5 rounded-xl text-label-md font-label-md font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                    title={`Enquire about ${cat.name} on WhatsApp`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Category Content Grid */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Rich Category Information */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-label-md font-label-md text-primary font-bold uppercase tracking-wider mb-2">
                      Category Overview &amp; Clinical Guidance
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="bg-surface-container-low/70 rounded-2xl p-5 border border-outline-variant/20">
                    <h4 className="text-label-md font-label-md font-semibold text-on-surface mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                      <span>Key Features &amp; Materials We Specialize In:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cat.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-body-sm font-body-sm text-secondary">
                          <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lens Compatibility & Brands */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
                      <span className="text-label-sm font-label-sm text-secondary block font-medium">
                        Clinical Lens Options
                      </span>
                      <p className="text-body-sm font-body-sm text-on-surface font-semibold mt-1">
                        {cat.lensCompatibility}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
                      <span className="text-label-sm font-label-sm text-secondary block font-medium">
                        Curated Brand Partners
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {cat.availableBrands.map((b, bi) => (
                          <span
                            key={bi}
                            className="text-xs px-2.5 py-0.5 rounded-md bg-surface-container-high text-on-surface font-mono-data"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Consultation prompt */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => openBookingModal(`Trial: ${cat.shortName}`)}
                      className="text-primary hover:underline text-body-sm font-body-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      <span>Book in-store trial with Dr. Dey for this category</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Sample Models We Dispense in Clinic */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-1">
                    <h4 className="text-label-md font-label-md font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
                      <span>Sample Frame Silhouettes</span>
                    </h4>
                    <span className="text-xs text-secondary font-mono-data">
                      {cat.sampleProducts.length > 0 ? `${cat.sampleProducts.length} Sample Styles` : 'Custom Lab Order'}
                    </span>
                  </div>

                  {cat.sampleProducts.length > 0 ? (
                    <div className="space-y-4">
                      {cat.sampleProducts.map((p) => {
                        const imgSrc = (!p.image || p.image === 'placeholder') ? FALLBACK_PRODUCT_IMAGE : p.image;
                        return (
                          <div
                            key={p.id}
                            className="bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 p-4 hover:border-primary/50 transition-all flex flex-col sm:flex-row gap-4 items-center"
                          >
                            <div className="w-28 h-24 shrink-0 bg-surface-container-lowest rounded-xl p-2 flex items-center justify-center border border-outline-variant/20">
                              <img
                                src={imgSrc}
                                alt={p.name}
                                className="max-h-full max-w-full object-contain"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                              <div className="flex items-center gap-2 justify-center sm:justify-start">
                                <span className="text-xs font-semibold text-primary">{p.brand}</span>
                                <span className="text-xs text-outline">&bull;</span>
                                <span className="text-xs text-secondary font-mono-data">{p.material}</span>
                              </div>
                              <h5 className="text-body-md font-body-md font-semibold text-on-surface truncate mt-0.5">
                                {p.name}
                              </h5>
                              <p className="text-xs text-secondary line-clamp-1 mt-0.5">
                                {p.desc}
                              </p>
                              <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
                                <button
                                  onClick={() => openProductModal(p.id)}
                                  className="text-xs px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary border border-outline-variant/30 transition-colors cursor-pointer"
                                >
                                  Specifications
                                </button>
                                <button
                                  onClick={() => openCategoryEnquiry(cat.name, p)}
                                  className="text-xs px-2.5 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[13px]">chat</span>
                                  <span>Enquire This Frame</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Progressive / Lab Category card placeholder */
                    <div className="bg-surface-container-low/60 rounded-2xl border border-outline-variant/30 p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-[24px]">biotech</span>
                      </div>
                      <h5 className="text-label-md font-label-md font-semibold text-on-surface">
                        Bespoke Surfacing &amp; Lens Edging
                      </h5>
                      <p className="text-body-sm font-body-sm text-secondary">
                        Every progressive lens is custom-tailored to your ocular corridor at our in-house lab. Contact us with your prescription for computerized lens recommendations.
                      </p>
                      <button
                        onClick={() => openCategoryEnquiry(cat.name)}
                        className="bg-primary text-on-primary px-4 py-2 rounded-xl text-label-sm font-label-sm font-semibold hover:bg-primary-container transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>Enquire Lens Options</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Embedded Category Enquiry Form Section */}
        <div data-animate="fade-up" className="mt-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto" id="category-enquiry-section">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
              Instant Direct Connect
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mt-1">
              Have Questions About a Product Category?
            </h2>
            <p className="text-body-md font-body-md text-secondary mt-2">
              Tell us what category you are interested in. We will send you recommendations, available frames, and trial slot details directly on WhatsApp.
            </p>
          </div>

          {!inlineSuccess ? (
            <form onSubmit={handleInlineFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Debashis Banerjee"
                    value={inlineName}
                    onChange={(e) => setInlineName(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 text-body-md font-body-md placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={inlinePhone}
                    onChange={(e) => setInlinePhone(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 text-body-md font-body-md placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                  Product Category of Interest *
                </label>
                <select
                  value={inlineCategory}
                  onChange={(e) => setInlineCategory(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl px-4 py-3 text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label-sm font-label-sm text-on-surface font-medium mb-1">
                  Specific Frame Preference or Prescription Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us if you need blue-cut coating, progressive lenses, lightweight titanium frames, or child safety options..."
                  value={inlineNotes}
                  onChange={(e) => setInlineNotes(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-xl p-3.5 text-body-md font-body-md placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3.5 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Send Enquiry on WhatsApp</span>
                </button>
                <span className="text-body-sm font-body-sm text-secondary">
                  Direct reply from Dr. Dey's clinic team.
                </span>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                Enquiry Sent to WhatsApp!
              </h3>
              <p className="text-body-md font-body-md text-secondary mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-on-surface">{inlineName}</strong>. Your enquiry for <strong className="text-primary">{inlineCategory}</strong> has been opened in WhatsApp.
              </p>
              <button
                onClick={() => {
                  setInlineName('');
                  setInlinePhone('');
                  setInlineNotes('');
                  setInlineSuccess(false);
                }}
                className="mt-6 bg-surface-container text-on-surface px-6 py-2.5 rounded-xl text-label-md font-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Send Another Category Enquiry
              </button>
            </div>
          )}
        </div>

        {/* In-Clinic Styling Consultation Banner */}
        <div data-animate="fade-up" className="mt-16 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/30 text-center max-w-2xl mx-auto">
          <h3 className="text-headline-md font-headline-md text-on-surface">
            Looking for a Bespoke Custom Frame?
          </h3>
          <p className="text-body-md font-body-md text-secondary mt-2">
            We partner with global optical distributors to source specialized titanium, acetate, and rimless silhouettes. Book a personalized in-store trial and corneal test.
          </p>
          <button
            className="mt-6 bg-primary text-on-primary px-6 py-2.5 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-xs"
            onClick={() => openBookingModal('Frame Consultation & Trial')}
          >
            Book Frame Consultation &amp; Trial
          </button>
        </div>
      </div>
    </section>
  );
}
