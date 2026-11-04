import React, { useEffect, useRef } from 'react';
import { animateModalIn } from '../utils/animations.js';

export default function LightboxModal({
  item,
  isOpen,
  onClose,
  onNext,
  onPrev
}) {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      animateModalIn(imgRef.current);
    }
  }, [item?.title, isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-on-background/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
      id="lightbox-modal"
      onClick={onClose}
    >
      <div className="flex justify-between items-center text-on-secondary" onClick={(e) => e.stopPropagation()}>
        <span className="text-headline-sm font-headline-sm" id="lightbox-caption">
          {item.title} — {item.sub}
        </span>
        <button
          className="p-2 rounded-lg text-on-secondary hover:bg-surface-container-highest/20 cursor-pointer"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>
      </div>

      <div
        className="flex-grow flex items-center justify-center my-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          className="max-h-[768px] max-w-full rounded-xl object-contain shadow-2xl"
          data-alt="Fullscreen visual photograph of Dey Optical boutique interior and lens shaping laboratory in high resolution with neutral tones and clinical lighting."
          id="lightbox-img"
          src={item.img || 'images/dey-carousel-1.jpg'}
          alt={item.title}
        />
        <button
          className="absolute left-2 sm:left-4 p-3 rounded-full bg-surface/20 hover:bg-surface/40 text-on-primary backdrop-blur-sm cursor-pointer"
          onClick={onPrev}
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>
        <button
          className="absolute right-2 sm:right-4 p-3 rounded-full bg-surface/20 hover:bg-surface/40 text-on-primary backdrop-blur-sm cursor-pointer"
          onClick={onNext}
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      </div>

      <div className="text-center text-body-sm font-body-sm text-outline-variant" onClick={(e) => e.stopPropagation()}>
        Click anywhere outside or press ESC to dismiss.
      </div>
    </div>
  );
}
