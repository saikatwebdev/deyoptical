import React from 'react';

export default function Footer({ navigate }) {
  return (
    <footer className="docked full-width bottom bg-surface-container-low border-t border-outline-variant/40 mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Registered Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">eyeglasses</span>
            </div>
            <span className="text-headline-md font-headline-md font-semibold text-on-surface">
              Dey Optical
            </span>
          </div>
          <p className="text-body-sm font-body-sm text-secondary">
            © 2025 Dey Optical Precision Eye Care. Registered Optometric Practice. All rights reserved.
          </p>
        </div>

        {/* Links defined in source of truth */}
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-label-md font-label-md">
          <button
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate('community')}
          >
            Prescription Guide
          </button>
          <button
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate('community')}
          >
            Eye Health Articles
          </button>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors hidden md:inline"
            href="https://wa.me/919830000000"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Enquiry
          </a>
          <button
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate('about')}
          >
            Optical Store Locator
          </button>
          <button
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate('about')}
          >
            Privacy Policy
          </button>
          <button
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate('about')}
          >
            Medical Terms
          </button>
        </div>
      </div>
    </footer>
  );
}
