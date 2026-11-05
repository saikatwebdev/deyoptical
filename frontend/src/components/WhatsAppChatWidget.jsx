import React from 'react';

export default function WhatsAppChatWidget({ isOpen, toggleConsultationChat }) {
  return (
    <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col items-end">
      {/* Collapsible Chat Card */}
      <div
        className={`mb-3 w-80 sm:w-88 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 ${isOpen ? '' : 'hidden'
          }`}
        id="whatsapp-chat-bubble"
      >
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[18px]">eyeglasses</span>
            </div>
            <div>
              <h4 className="text-label-md font-label-md font-semibold">Dey Optical Clinical Desk</h4>
              <p className="text-label-sm font-label-sm opacity-80">Typically replies within 5 mins</p>
            </div>
          </div>
          <button
            className="p-1 rounded text-on-primary/80 hover:text-on-primary cursor-pointer"
            onClick={toggleConsultationChat}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body / Choice Chips */}
        <div className="p-4 bg-surface-container-low/50 space-y-3">
          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 text-body-sm font-body-sm text-on-surface">
            Hi, welcome to Dey Optical! How can we assist your vision today?
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              className="text-left px-3 py-2 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 rounded-lg text-body-sm font-body-sm text-primary flex items-center justify-between"
              href="https://wa.me/919064272877?text=Hi%20Dey%20Optical,%20I%20would%20like%20to%20Book%20an%20Eye%20Test"
              target="_blank"
              rel="noreferrer"
            >
              <span>📅 Book Eye Test</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
            <a
              className="text-left px-3 py-2 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 rounded-lg text-body-sm font-body-sm text-primary flex items-center justify-between"
              href="https://wa.me/919064272877?text=Hi%20Dey%20Optical,%20I%20want%20to%20inquire%20about%20your%20lens%20and%20frame%20categories%20(Zeiss/Essilor)"
              target="_blank"
              rel="noreferrer"
            >
              <span>🔬 Lens &amp; Frame Categories</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
            <a
              className="text-left px-3 py-2 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 rounded-lg text-body-sm font-body-sm text-primary flex items-center justify-between"
              href="https://wa.me/919064272877?text=Hi%20Dey%20Optical,%20please%20send%20your%20exact%20store%20location"
              target="_blank"
              rel="noreferrer"
            >
              <span>📍 Store Location &amp; Hours</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
            <a
              className="text-left px-3 py-2 bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 rounded-lg text-body-sm font-body-sm text-primary flex items-center justify-between"
              href="https://wa.me/919064272877?text=Hi%20Dr.%20Dey,%20I%20have%20a%20clinical%20vision%20query"
              target="_blank"
              rel="noreferrer"
            >
              <span>👨‍⚕️ Speak to Optometrist</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        aria-label="Open Live Consultation Widget"
        className="bg-primary hover:bg-primary-container text-on-primary p-3.5 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
        onClick={toggleConsultationChat}
      >
        <span className="material-symbols-outlined text-[24px]">chat</span>
        <span className="hidden sm:inline text-label-md font-label-md font-semibold">Consultation</span>
      </button>
    </div>
  );
}
