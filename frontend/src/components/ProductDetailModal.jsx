import React, { useEffect, useRef } from 'react';
import { animateModalIn } from '../utils/animations.js';

const FALLBACK_PRODUCT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUngKnxMCJb1gAlTHRhDi2CaQwPYxRcZDPijzz5Z0J3VPauRoKVRG4Lscz4wcRDrmB8f1KqchXJ0xESR3k4ceabNUtzQmw6f15IVLNDRTcEFR-4W3UTg_pjuf_uWCHweyVZlSdeLwRvT7q4zZhWs8o3kUZ87Hn5JJetmHG0oTsZ35pq5XNlqQrzB9uVfQFMjdvMx4npSwJ4VrQ4_O8G3fti0XebrJfkh2iHszyIb2J50S3umRbQoFu";

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onQuickEnquire,
  onOpenCategoryEnquiry,
  onBookFrameTrial
}) {
  if (!isOpen || !product) return null;

  const p = product;
  const imgSrc = (!p.image || p.image === 'placeholder') ? FALLBACK_PRODUCT_IMAGE : p.image;
  const modalCardRef = useRef(null);

  useEffect(() => {
    if (modalCardRef.current) {
      animateModalIn(modalCardRef.current);
    }
  }, [product?.id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-in fade-in duration-200"
      id="product-detail-modal"
      onClick={onClose}
    >
      <div
        ref={modalCardRef}
        className="bg-surface-container-lowest w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-outline-variant/40 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container z-10 cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Multi-angle Image & Zoom area */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-low p-6 flex items-center justify-center min-h-[280px]">
              <img
                className="w-full max-h-60 object-contain"
                id="modal-product-img"
                src={imgSrc}
                alt={p.name}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 bg-surface-container-low rounded-xl text-center border border-outline-variant/20">
                <span className="text-label-sm font-label-sm text-secondary block">Lens Width</span>
                <span className="font-mono-data text-body-sm font-semibold text-on-surface" id="modal-dim-lens">
                  {p.dimensions.lens}
                </span>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded-xl text-center border border-outline-variant/20">
                <span className="text-label-sm font-label-sm text-secondary block">Bridge</span>
                <span className="font-mono-data text-body-sm font-semibold text-on-surface" id="modal-dim-bridge">
                  {p.dimensions.bridge}
                </span>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded-xl text-center border border-outline-variant/20">
                <span className="text-label-sm font-label-sm text-secondary block">Temple</span>
                <span className="font-mono-data text-body-sm font-semibold text-on-surface" id="modal-dim-temple">
                  {p.dimensions.temple}
                </span>
              </div>
            </div>
          </div>

          {/* Specifications & Enquire actions */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-label-sm font-label-sm text-primary font-bold uppercase tracking-wider"
                  id="modal-product-brand"
                >
                  {p.brand} &bull; {p.category}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                  {p.badge || 'Sample Model'}
                </span>
              </div>
              <h2
                className="text-headline-md font-headline-md font-semibold text-on-surface mt-1"
                id="modal-product-name"
              >
                {p.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-label-sm font-label-sm bg-surface-container-high text-secondary px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Available for In-Store Trial &bull; Custom Lens Fitting
                </span>
              </div>
            </div>

            <p className="text-body-md font-body-md text-secondary" id="modal-product-desc">
              {p.desc} Handcrafted from premium {p.material}.
            </p>

            {/* Included Lens Upgrades Options */}
            <div className="border-t border-outline-variant/30 pt-4">
              <h4 className="text-label-md font-label-md text-on-surface font-semibold mb-2">
                Compatible Clinical Lens Coatings:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-body-sm font-body-sm text-secondary">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                  Anti-Glare Multi-Coat
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                  Blue Defense 420nm
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                  Photochromic Grey/Brown
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                  Free-Form Progressive
                </div>
              </div>
            </div>

            {/* Category Note */}
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 text-xs text-secondary">
              <strong className="text-on-surface">Practice Notice:</strong> Dey Optical dispenses frames through personalized in-clinic consultation to verify pupil optical center and corneal fit.
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                className="w-full bg-primary text-on-primary py-3 rounded-xl text-label-md font-label-md font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                id="modal-whatsapp-enquire-btn"
                onClick={() => {
                  onClose();
                  if (onOpenCategoryEnquiry) {
                    onOpenCategoryEnquiry(p.category, p);
                  } else {
                    onQuickEnquire(p.category, p.name);
                  }
                }}
              >
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
                <span>Fill Category Enquiry Form</span>
              </button>
              <button
                className="w-full bg-surface-container border border-outline-variant/40 text-on-surface py-2.5 rounded-xl text-label-md font-label-md font-medium hover:bg-surface-container-high transition-all flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => onQuickEnquire(p.category, p.name)}
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                <span>Quick WhatsApp Enquiry</span>
              </button>
              <button
                className="w-full text-secondary hover:text-primary py-2 text-label-sm font-label-sm transition-colors text-center cursor-pointer"
                onClick={() => {
                  onClose();
                  onBookFrameTrial(p);
                }}
              >
                Book Eye Exam &amp; Try Frame in Clinic &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
