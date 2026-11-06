import React from 'react';

const DOCTORS = [
  {
    id: 'dr-soumen',
    name: 'Dr. Soumen Dandapath',
    title: 'Phaco Surgeon & Senior Consultant',
    degree: 'MBBS, DOMS',
    hospital: 'S.N. Bajoria Memorial Eye Hospital, Bankura',
    scheduleDay: 'Every Sunday',
    scheduleTime: '11:30 AM – 1:00 PM',
    photo: 'images/dr_soumen.jpg',
    badgeColor: 'bg-primary/95',
    scheduleBadge: 'Every Sunday',
    highlights: [
      'MBBS, DOMS Qualified Eye Surgeon',
      'Advanced Phacoemulsification Cataract Surgery',
      'Senior Consultant at S.N. Bajoria Eye Hospital',
      'Comprehensive Anterior Segment & Glaucoma Care',
    ],
    whatsappMsg: encodeURIComponent(
      `Hello Dey Optical (Beliatore),\n\nI would like to book an appointment with:\n👨‍⚕️ *Dr. Soumen Dandapath* (MBBS, DOMS | Phaco Surgeon)\n\n` +
      `📅 *Schedule:* Every Sunday (11:30 AM – 1:00 PM)\n` +
      `📍 *Location:* Dey Optical, Beliatore\n\n` +
      `*Patient Details:*\n` +
      `• Name: \n` +
      `• Age: \n` +
      `• Contact Number: \n` +
      `• Primary Eye Concern: \n\n` +
      `Please confirm the next available consultation slot. Thank you!`
    ),
  },
  {
    id: 'optom-apurbo',
    name: 'Optom. Apurbo Kumar Patra',
    title: 'Consultant Clinical Optometrist',
    degree: 'D.OPT, R.I.O., S.M.F.W.B.',
    hospital: 'Kolkata Medical College & Hospital',
    scheduleDay: 'Every Thursday',
    scheduleTime: '9:30 AM – 11:00 AM',
    photo: 'images/optom_apurbo.jpg',
    badgeColor: 'bg-tertiary/95',
    scheduleBadge: 'Every Thursday',
    highlights: [
      'D.OPT, R.I.O., S.M.F.W.B. Certified',
      'Kolkata Medical College & Hospital',
      'Computerized Refraction & Binocular Vision Check',
      'Precision Contact Lens & Pediatric Refraction',
    ],
    whatsappMsg: encodeURIComponent(
      `Hello Dey Optical (Beliatore),\n\nI would like to book an appointment with:\n👨‍⚕️ *Optom. Apurbo Kumar Patra* (D.OPT, R.I.O. | Kolkata Medical College)\n\n` +
      `📅 *Schedule:* Every Thursday (9:30 AM – 11:00 AM)\n` +
      `📍 *Location:* Dey Optical, Beliatore\n\n` +
      `*Patient Details:*\n` +
      `• Name: \n` +
      `• Age: \n` +
      `• Contact Number: \n` +
      `• Purpose of Visit (e.g. Eye Exam / Power Check / Contact Lens): \n\n` +
      `Please confirm the next available consultation slot. Thank you!`
    ),
  },
];

const CONTACT_PHONES = [
  { display: '7551808245', dial: '+917551808245', wa: '917551808245' },
  { display: '9434438460', dial: '+919434438460', wa: '919434438460' },
];

export default function DoctorPosterSection({ scrollTo }) {
  const handleOpenWhatsApp = (encodedMsg) => {
    window.open(`https://wa.me/917551808245?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="py-24 bg-gradient-to-b from-surface-container-low to-surface relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-animate="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[12px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stethoscope
            </span>
            Visiting Specialist Doctors · Beliatore
          </span>
          <h2 className="text-[34px] sm:text-[40px] md:text-[46px] font-bold text-on-surface tracking-tight leading-tight">
            Consult Our Senior <span className="text-primary">Eye Specialists</span>
          </h2>
          <p className="text-[15px] sm:text-[17px] text-secondary mt-3 leading-relaxed">
            Get examined by experienced ophthalmic surgeons and clinical optometrists right here at{' '}
            <strong className="text-on-surface font-semibold">Dey Optical, Beliatore</strong>. Pre-book your slot to avoid waiting.
          </p>
        </div>

        {/* ── Two Doctor Cards (Styled like Gallery Section Cards) ── */}
        <div data-animate-stagger className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="gallery-card group relative rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-surface-container-lowest flex flex-col"
            >
              {/* Photo Area with Gallery Hover Treatment */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle cinematic gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                {/* Top Badge: Specialty */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${doc.badgeColor} backdrop-blur-md text-white text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/20`}>
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      medical_services
                    </span>
                    {doc.degree}
                  </span>
                </div>

                {/* Top-Right Badge: Visiting Day */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    {doc.scheduleBadge}
                  </span>
                </div>

                {/* Doctor Identity Block Overlay (on Image) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white">
                  <span className="text-[12px] font-semibold text-primary-fixed uppercase tracking-wider block mb-1">
                    {doc.title}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-white drop-shadow-sm">
                    {doc.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-white/85 font-medium mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary-fixed text-[16px]">
                      local_hospital
                    </span>
                    {doc.hospital}
                  </p>
                </div>
              </div>

              {/* Card Body & Details */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-surface-container-lowest">
                {/* Schedule Highlight Box */}
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        event
                      </span>
                      <span className="text-[12px] font-bold uppercase tracking-wider text-primary">
                        Visiting Schedule
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">
                      Confirmed Chamber
                    </span>
                  </div>
                  <div className="mt-2 text-on-surface font-bold text-[16px] sm:text-[17px]">
                    {doc.scheduleDay}
                  </div>
                  <div className="text-secondary text-[13px] sm:text-[14px] font-medium flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[15px] text-secondary">schedule</span>
                    {doc.scheduleTime}
                  </div>
                </div>

                {/* Credentials / Key Highlights */}
                <div className="mb-6">
                  <h4 className="text-[12px] font-bold uppercase tracking-wider text-secondary mb-2.5">
                    Key Highlights &amp; Practice
                  </h4>
                  <ul className="space-y-2">
                    {doc.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-on-surface-variant leading-snug">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check
                          </span>
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp & Call Action Buttons */}
                <div className="pt-2 border-t border-outline-variant/30 space-y-2.5">
                  <button
                    onClick={() => handleOpenWhatsApp(doc.whatsappMsg)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[14px] shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.004 2.667C8.637 2.667 2.667 8.636 2.667 16c0 2.344.636 4.627 1.844 6.627L2.667 29.333l6.906-1.812A13.26 13.26 0 0016.004 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.004 2.667zm0 2.4c5.955 0 10.796 4.84 10.796 10.933 0 6.093-4.841 10.933-10.796 10.933a10.76 10.76 0 01-5.481-1.5l-.389-.232-4.096 1.075 1.095-3.985-.256-.406a10.78 10.78 0 01-1.669-5.885C5.208 9.907 10.05 5.067 16.004 5.067zm-3.063 5.2c-.197 0-.518.074-.79.37-.272.296-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.07c.148.197 2.07 3.248 5.07 4.428 2.49.983 3.002.787 3.542.737.54-.049 1.74-.712 1.986-1.4.247-.687.247-1.276.173-1.4-.074-.123-.272-.197-.567-.345-.296-.148-1.74-.857-2.012-.955-.271-.099-.468-.148-.665.148-.196.296-.762.955-.934 1.153-.173.197-.345.222-.64.074-.296-.148-1.248-.46-2.378-1.467-.879-.783-1.472-1.75-1.645-2.047-.172-.296-.018-.456.13-.603.133-.133.296-.345.444-.518.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.657-1.618-.912-2.21-.24-.577-.487-.498-.665-.507-.173-.007-.37-.01-.567-.01z" />
                    </svg>
                    <span>Book Appointment with {doc.name.split(' ')[1]}</span>
                  </button>

                  <div className="flex items-center justify-between text-[12px] text-secondary px-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
                      Direct Clinic Confirmation
                    </span>
                    <span className="font-semibold text-primary">No Waiting</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Contact Information Banner (Dey Optical, Beliatore) ── */}
        <div data-animate="fade-up" className="mt-14 max-w-5xl mx-auto">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Official Clinic Chamber
                </span>
                <h4 className="text-[20px] font-bold text-on-surface leading-tight mt-0.5">
                  Dey Optical, Beliatore
                </h4>
                <p className="text-[13px] sm:text-[14px] text-secondary mt-1">
                  Super Market Stall No-15 (Near Panchayat), Beliatore, Bankura
                </p>
                <p className="text-[12px] text-primary font-semibold mt-1">
                  For Appointments &amp; General Enquiries, Contact Us Directly:
                </p>
              </div>
            </div>

            {/* Quick Call Numbers */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              {CONTACT_PHONES.map((phone) => (
                <a
                  key={phone.display}
                  href={`tel:${phone.dial}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-surface-container-high hover:bg-primary hover:text-white text-on-surface font-bold text-[14px] border border-outline-variant/40 transition-all duration-200 active:scale-95 shadow-xs"
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-[18px]">
                    call
                  </span>
                  <span>{phone.display}</span>
                </a>
              ))}

              <a
                href={`https://wa.me/917551808245?text=${encodeURIComponent('Hello Dey Optical Beliatore, I would like to enquire about doctor visiting schedules and eye checkup appointments.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-on-primary font-bold text-[14px] shadow-sm hover:bg-primary-container transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

