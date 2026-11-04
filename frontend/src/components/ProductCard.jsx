import React from 'react';

const FALLBACK_PRODUCT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUngKnxMCJb1gAlTHRhDi2CaQwPYxRcZDPijzz5Z0J3VPauRoKVRG4Lscz4wcRDrmB8f1KqchXJ0xESR3k4ceabNUtzQmw6f15IVLNDRTcEFR-4W3UTg_pjuf_uWCHweyVZlSdeLwRvT7q4zZhWs8o3kUZ87Hn5JJetmHG0oTsZ35pq5XNlqQrzB9uVfQFMjdvMx4npSwJ4VrQ4_O8G3fti0XebrJfkh2iHszyIb2J50S3umRbQoFu";

export default function ProductCard({ product, onOpenDetails, onQuickEnquire }) {
  const p = product;
  const imgSrc = (!p.image || p.image === 'placeholder') ? FALLBACK_PRODUCT_IMAGE : p.image;

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-primary/50 hover-lift overflow-hidden group flex flex-col justify-between shadow-xs transition-all">
      <div className="p-5 relative bg-surface-container-low/40">
        <span className="absolute top-3 left-3 text-label-sm font-label-sm font-semibold bg-surface-container-highest/80 text-primary px-2.5 py-0.5 rounded-full">
          {p.badge || 'Sample Model'}
        </span>
        <div className="h-44 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
          <img
            src={imgSrc}
            alt={p.name}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="text-label-sm font-label-sm text-secondary font-medium">
            {p.brand} &bull; {p.category}
          </div>
          <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface mt-0.5">
            {p.name}
          </h3>
          <p className="text-body-sm font-body-sm text-secondary line-clamp-2 mt-1">
            {p.desc}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 mb-3 text-xs text-secondary font-mono-data">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {p.material}
            </span>
            <span>
              {p.dimensions.lens}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(p.id)}
              className="bg-surface-container text-on-surface py-2 rounded-xl text-label-md font-label-md hover:bg-surface-container-high transition-all text-center cursor-pointer"
            >
              Details
            </button>
            <button
              onClick={() => onQuickEnquire(p.category, p.name)}
              className="bg-primary text-on-primary py-2 rounded-xl text-label-md font-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
