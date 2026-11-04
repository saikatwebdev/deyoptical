import React, { useEffect, useRef } from 'react';
import { animateStagger } from '../utils/animations.js';

export default function DoctorView({ navigate, openBookingModal }) {
  const credentialsGridRef = useRef(null);

  useEffect(() => {
    if (credentialsGridRef.current) {
      animateStagger(credentialsGridRef.current.children, { delay: 60, duration: 420 });
    }
  }, []);
  return (
    <section className="view-section" id="view-doctor">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Specialist Doctors</span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-8 md:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Photo & Availability */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm mb-4">
              <img
                className="w-full h-80 object-cover"
                data-alt="A portrait of a male consultant optometrist wearing sleek modern spectacles and a pristine clinical lab coat."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJz9ICyKmiFG5sSpF1FGUophJhVk8dWTCRhTazaTS7QondEwjcgtzCw-zv7nXtG8Xnh6OMOsW0GQkPP2DiGmaffT4DdD7vE8PYua7E4uAv32zivgMzaEGWr1abFUrmd8sMjMW_Ri9Jz9QbwIuWlLo1uBEotvP_WxvG8_JWVxKz3SFAAYbN1xAJvR5q1poM-ySirtRIWanYyjV7mpeAcBJ3MuoVDWOYgq--PnzD-nkHUJzfJGLFDOat"
                alt="Dr. Arindam Dey"
              />
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <h4 className="text-label-md font-label-md text-on-surface font-semibold">Clinic Availability</h4>
              <div className="mt-2 space-y-1.5 text-body-sm font-body-sm text-secondary">
                <div className="flex justify-between">
                  <span>Mon - Sat:</span>
                  <span className="text-on-surface font-medium">10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-on-surface font-medium">11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-on-surface font-medium">Main Boutique Lab</span>
                </div>
              </div>
              <button
                className="w-full mt-4 bg-primary text-on-primary py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container transition-all cursor-pointer"
                onClick={() => openBookingModal('Consultation with Dr. Arindam Dey')}
              >
                Book Dr. Dey's Slot
              </button>
            </div>
          </div>

          {/* Right: Bio & Credentials */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <span className="text-label-sm font-label-sm text-primary font-bold uppercase tracking-wider">
                Chief Optometrist &amp; Founder
              </span>
              <h1 className="text-headline-lg md:text-display font-display text-on-surface mt-1">
                Dr. Arindam Dey
              </h1>
              <p className="text-body-md font-body-md text-secondary font-mono-data mt-1">
                M.Optom, FIACLE (Fellow of International Association of Contact Lens Educators)
              </p>
            </div>
            <div className="prose text-body-md font-body-md text-on-surface-variant space-y-3">
              <p>
                With over a decade of clinical experience in advanced refractive corrections and anterior eye health,
                Dr. Arindam Dey leads the diagnostic protocols at Dey Optical.
              </p>
              <p>
                He holds an advanced Master of Optometry degree and is an accredited Fellow of the IACLE (Switzerland).
                His specialized areas of practice include custom progressive lens corridor designs, digital eye strain
                mitigation for IT professionals, and pediatric refractive management.
              </p>
            </div>

            {/* Credentials & Badges */}
            <div ref={credentialsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">school</span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface font-semibold">Master of Optometry</h4>
                  <p className="text-body-sm font-body-sm text-secondary">Advanced Binocular Vision &amp; Refraction</p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">workspace_premium</span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-surface font-semibold">FIACLE Fellow</h4>
                  <p className="text-body-sm font-body-sm text-secondary">Intl. Contact Lens Educator Credential</p>
                </div>
              </div>
            </div>

            {/* Patient Philosophy Quote */}
            <div className="p-6 bg-secondary-container/30 rounded-xl border-l-4 border-primary">
              <p className="italic text-body-md font-body-md text-on-surface">
                "Our eye exams never feel hurried. I ensure that every individual leaves understanding their ocular
                measurements, how their lenses work, and how to maintain healthy vision for decades to come."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
