import React from 'react';

const QUICK_LINKS = [
  { label: 'Home', section: 'home' },
  { label: 'Testimonials', section: 'testimonials' },
  { label: 'Gallery', section: 'gallery' },
  { label: 'Book Appointment', section: 'booking' },
  { label: 'Eyewear', section: 'eyewear' },
];

export default function Footer({ scrollTo }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-on-background text-inverse-on-surface">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 mb-5 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <span className="material-symbols-outlined text-on-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  visibility
                </span>
              </div>
              <div>
                <div className="font-bold text-[18px] text-white">Dey Optical</div>
                <div className="text-[11px] text-white/50 tracking-widest uppercase font-medium">Precision Eyecare</div>
              </div>
            </button>
            <p className="text-[14px] text-white/60 leading-relaxed mb-5">
              Kolkata's premier optometric clinic combining clinical precision with boutique eyewear curation. Expert care by Dr. Arindam Dey, M.Optom.
            </p>
            <a
              href="https://wa.me/919830000000?text=Hello%20Dey%20Optical%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: '#25D366', color: '#fff' }}
            >
              <svg viewBox="0 0 32 32" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm-3.063 7.6c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[14px] font-bold text-white tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => scrollTo(link.section)}
                    className="text-[14px] text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[14px] font-bold text-white tracking-widest uppercase mb-5">Contact & Hours</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <div>
                  <div className="text-[14px] text-white/80 font-medium">Dey Optical</div>
                  <div className="text-[13px] text-white/50 mt-0.5">Kolkata, West Bengal, India</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                <div className="text-[13px] text-white/60 space-y-0.5">
                  <div><span className="text-white/80">Mon – Sat:</span> 10:00 AM – 7:30 PM</div>
                  <div><span className="text-white/80">Sunday:</span> 11:00 AM – 4:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                <a href="tel:+919830000000" className="text-[14px] text-white/70 hover:text-primary transition-colors duration-200">
                  +91 98300 00000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40 text-center sm:text-left">
            © {year} Dey Optical. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[13px] text-white/40">
            <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            Crafted with care in Kolkata
          </div>
        </div>
      </div>
    </footer>
  );
}
