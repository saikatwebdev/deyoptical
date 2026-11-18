// Doctors and Visiting Eye Specialists initial data for Dey Optical
// Used across DoctorPosterSection and the Admin Panel

export const generateDoctorWhatsAppMsg = (doctor) => {
  const scheduleLine = doctor.nextDate && doctor.nextDate !== doctor.scheduleDay
    ? `📅 *Schedule:* ${doctor.scheduleDay} (${doctor.nextDate}) | ${doctor.scheduleTime}`
    : `📅 *Schedule:* ${doctor.scheduleDay} (${doctor.scheduleTime})`;

  const statusNote = doctor.availabilityStatus === 'full'
    ? `⚠️ *Chamber Note:* Currently marked as FULL. Please check if waiting list or next date is available.\n`
    : doctor.availabilityStatus === 'leave'
    ? `⚠️ *Chamber Note:* Doctor on leave for this slot. Checking for upcoming dates.\n`
    : '';

  return encodeURIComponent(
    `Hello Dey Optical (Beliatore),\n\nI would like to book an appointment with:\n👨‍⚕️ *${doctor.name}* (${doctor.degree} | ${doctor.title})\n\n` +
    `${scheduleLine}\n` +
    `📍 *Location:* Dey Optical, Beliatore\n` +
    (statusNote ? `${statusNote}\n` : '') +
    (doctor.notice ? `📢 *Notice:* ${doctor.notice}\n\n` : '\n') +
    `*Patient Details:*\n` +
    `• Name: \n` +
    `• Age: \n` +
    `• Contact Number: \n` +
    `• Primary Eye Concern: \n\n` +
    `Please confirm my consultation slot. Thank you!`
  );
};

export const DEFAULT_DOCTORS = [
  {
    id: 'dr-soumen',
    name: 'Dr. Soumen Dandapath',
    title: 'Phaco Surgeon & Senior Consultant',
    degree: 'MBBS, DOMS',
    hospital: 'S.N. Bajoria Memorial Eye Hospital, Bankura',
    scheduleDay: 'Every Sunday',
    nextDate: 'Upcoming Sunday',
    scheduleTime: '11:30 AM – 1:00 PM',
    scheduleBadge: 'Every Sunday',
    availabilityStatus: 'available', // 'available' | 'limited' | 'full' | 'leave'
    availabilityLabel: 'Booking Open',
    notice: '',
    photo: 'images/doctors/doctor-soumen.jpg',
    badgeColor: 'bg-primary/95',
    highlights: [
      'MBBS, DOMS Qualified Eye Surgeon',
      'Advanced Phacoemulsification Cataract Surgery',
      'Senior Consultant at S.N. Bajoria Eye Hospital',
      'Comprehensive Anterior Segment & Glaucoma Care',
    ],
  },
  {
    id: 'optom-apurbo',
    name: 'Optom. Apurbo Kumar Patra',
    title: 'Consultant Clinical Optometrist',
    degree: 'D.OPT, R.I.O., S.M.F.W.B.',
    hospital: 'Kolkata Medical College & Hospital',
    scheduleDay: 'Every Thursday',
    nextDate: 'Upcoming Thursday',
    scheduleTime: '9:30 AM – 11:00 AM',
    scheduleBadge: 'Every Thursday',
    availabilityStatus: 'available', // 'available' | 'limited' | 'full' | 'leave'
    availabilityLabel: 'Booking Open',
    notice: '',
    photo: 'images/doctors/optometrist-apurbo.jpg',
    badgeColor: 'bg-tertiary/95',
    highlights: [
      'D.OPT, R.I.O., S.M.F.W.B. Certified',
      'Kolkata Medical College & Hospital',
      'Computerized Refraction & Binocular Vision Check',
      'Precision Contact Lens & Pediatric Refraction',
    ],
  },
];

