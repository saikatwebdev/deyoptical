import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useAdminData } from '../context/AdminDataContext.jsx';

const WHATSAPP_NUMBER = '917551808245';
const DRAG_THRESHOLD = 5; // px before we decide it's a drag, not a tap

const OfferCard = memo(function OfferCard({ offer, onClaim }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2.5">
        <span className="inline-block bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
          {offer.badge}
        </span>
        <span className="text-[11px] text-gray-400 font-medium">{offer.validTill}</span>
      </div>
      <h4 className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-snug mb-1.5">
        {offer.title}
      </h4>
      <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
        {offer.description}
      </p>
      <button
        onClick={() => onClaim(offer)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all duration-200 active:scale-95 cursor-pointer"
        style={{ background: '#25D366' }}
      >
        <svg viewBox="0 0 32 32" width="16" height="16" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
        </svg>
        Claim via WhatsApp
      </button>
    </div>
  );
});

function OffersFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState(null); // null = not yet measured
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Single stable ref object — mutate properties, never replace the object
  const drag = useRef({
    active: false,    // currently dragging?
    moved: false,     // crossed threshold?
    startClientX: 0,
    startClientY: 0,
    startBtnX: 0,
    startBtnY: 0,
  });

  const { offers } = useAdminData();
  const activeOffers = useMemo(() => offers.filter((o) => o.active), [offers]);

  // ── Set initial position: just on top of the WhatsApp floating button ──
  useEffect(() => {
    const place = () => {
      const btn = buttonRef.current;
      const btnW = btn ? btn.offsetWidth : 120;
      const btnH = btn ? btn.offsetHeight : 44;
      setPos({
        x: Math.max(8, window.innerWidth - btnW - 24),
        y: Math.max(8, window.innerHeight - btnH - 92), // 24px (wa bottom) + 56px (wa height) + 12px (gap)
      });
    };
    requestAnimationFrame(place);
  }, []);

  // ── Drag event listeners (attached once, stable ref handles everything) ─
  useEffect(() => {
    const getXY = (e) => {
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX, y: src.clientY };
    };

    const onMove = (e) => {
      if (!drag.current.active) return;

      const { x, y } = getXY(e);
      const dx = x - drag.current.startClientX;
      const dy = y - drag.current.startClientY;

      if (!drag.current.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        drag.current.moved = true;
      }

      if (e.cancelable) e.preventDefault();

      const btn = buttonRef.current;
      const btnW = btn ? btn.offsetWidth : 120;
      const btnH = btn ? btn.offsetHeight : 44;
      const maxX = window.innerWidth - btnW - 8;
      const maxY = window.innerHeight - btnH - 8;

      setPos({
        x: Math.min(Math.max(drag.current.startBtnX + dx, 8), maxX),
        y: Math.min(Math.max(drag.current.startBtnY + dy, 8), maxY),
      });
    };

    const onUp = () => {
      drag.current.active = false;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    window.addEventListener('touchcancel', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('touchcancel', onUp);
    };
  }, []); // runs once — reads from stable `drag` ref

  // ── Pointer-down: begin drag ──────────────────────────────────────────
  const onPointerDown = useCallback((e) => {
    if (isOpen || !pos) return;
    const src = e.touches ? e.touches[0] : e;
    drag.current.active = true;
    drag.current.moved = false;
    drag.current.startClientX = src.clientX;
    drag.current.startClientY = src.clientY;
    drag.current.startBtnX = pos.x;
    drag.current.startBtnY = pos.y;
  }, [isOpen, pos]);

  // ── Click: open only if the user didn't drag ─────────────────────────
  const handleClick = useCallback(() => {
    if (drag.current.moved) return;
    setIsOpen((prev) => !prev);
  }, []);

  // ── Close on outside click ────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen]);

  // ── Escape key ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  // ── Lock scroll when panel open ───────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClaim = useCallback((offer) => {
    const msg = encodeURIComponent(offer.whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }, []);

  if (activeOffers.length === 0) return null;

  return (
    <>
      {/* ── Draggable Floating Offers Button ── */}
      <button
        ref={buttonRef}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
        onClick={handleClick}
        aria-label="View current offers"
        className="offers-fab fixed z-[60] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl select-none touch-none"
        style={{
          left: pos ? `${pos.x}px` : 'auto',
          right: pos ? 'auto' : '1.5rem',
          top: pos ? `${pos.y}px` : 'auto',
          bottom: pos ? 'auto' : '5.75rem',
          transform: 'none',
          opacity: pos ? 1 : 0,
          background: '#DC2626',
          border: '2.5px solid #FACC15',
          cursor: 'grab',
        }}
      >
        <span className="text-[18px] leading-none pointer-events-none">🎉</span>
        <span className="text-white text-[13px] font-bold tracking-wide uppercase pointer-events-none">Offers</span>
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-red-700 bg-yellow-300 border border-yellow-400 shadow pointer-events-none">
          {activeOffers.length}
        </span>
      </button>

      {/* ── Backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* ── Offers Panel (centered in viewport) ── */}
      <div
        ref={panelRef}
        className={`fixed z-[70] transition-all duration-300 ease-out ${isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }`}
        style={{
          top: '50%',
          left: '50%',
          transform: isOpen
            ? 'translate(-50%, -50%)'
            : 'translate(-50%, calc(-50% + 16px))',
          width: 'min(420px, calc(100vw - 2rem))',
        }}
      >
        <div className="bg-gray-50 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-[18px]">🎁</span>
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Special Offers</h3>
                <p className="text-[11px] text-gray-400 font-medium">Dey Optical, Beliatore</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close offers"
            >
              <span className="material-symbols-outlined text-gray-500 text-[18px]">close</span>
            </button>
          </div>

          {/* Offers List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
            {activeOffers.map((offer, idx) => (
              <OfferCard key={offer.id || offer.offerId || offer._id || idx} offer={offer} onClaim={handleClaim} />
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-white border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-400">
              Tap an offer to claim via WhatsApp • Terms apply
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(OffersFloatingButton);