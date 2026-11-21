'use strict';

const Offer = require('../models/Offer');
const Doctor = require('../models/Doctor');
const GalleryItem = require('../models/GalleryItem');

// ── Seed data (mirrors frontend static files) ─────────────────────────────────

const SEED_GALLERY = [
  {
    galleryId: 'gallery-1',
    title: 'Precision Diagnostic Suite',
    cat: 'Store',
    sub: 'Auto-Refractometer Room',
    img: 'images/facilities/facility-diagnostic-suite.jpg',
    order: 1,
  },
  {
    galleryId: 'gallery-2',
    title: 'High-Index Lens Edging Lab',
    cat: 'Store',
    sub: 'Robotic Computer Edge Profiling',
    img: 'images/facilities/facility-edging-lab.jpg',
    order: 2,
  },
  {
    galleryId: 'gallery-3',
    title: 'Curated Acetate Showcase',
    cat: 'Eyewear',
    sub: 'Handcrafted Boutique Wall',
    img: 'images/facilities/facility-acetate-showcase.jpg',
    order: 3,
  },
  {
    galleryId: 'gallery-4',
    title: 'Pediatric Vision Check',
    cat: 'Store',
    sub: 'Gentle Refractive Screening',
    img: 'images/facilities/facility-pediatric-screening.jpg',
    order: 4,
  },
  {
    galleryId: 'gallery-5',
    title: 'Modern Spectacle Fitting',
    cat: 'Eyewear',
    sub: 'Ultrasonic Frame Customization',
    img: 'images/facilities/facility-spectacle-fitting.png',
    order: 5,
  },
  {
    galleryId: 'gallery-6',
    title: 'Corneal Slit-Lamp Bio-Check',
    cat: 'Store',
    sub: 'Microscopic Tear Film Exam',
    img: 'images/facilities/facility-slit-lamp-biocheck.png',
    order: 6,
  },
  {
    galleryId: 'gallery-7',
    title: 'Designer Eyewear Curation',
    cat: 'Eyewear',
    sub: 'Boutique Frame Collection',
    img: 'images/services/service-designer-frames.png',
    order: 7,
  },
  {
    galleryId: 'gallery-8',
    title: 'Dey Optical Clinic Lounge',
    cat: 'Store',
    sub: 'Beliatore Vision Centre',
    img: 'images/about/about-clinic.png',
    order: 8,
  },
];

const SEED_OFFERS = [
  {
    offerId: 'offer-1',
    active: true,
    title: '🔥 Flat 30% OFF on All Eyeglasses',
    description:
      'Get 30% discount on our entire Eyeglasses & Optical Frames collection including Titan, Ray-Ban Style, and Dey Signature frames.',
    badge: 'LIMITED TIME',
    validTill: 'Valid till 30 Nov 2026',
    whatsappMessage:
      "Hello Dey Optical (Beliatore)! 👋\n\nI'm interested in the *🔥 Flat 30% OFF on All Eyeglasses* offer.\n\nPlease share available frames and pricing details.\n\nThank you!",
    order: 0,
  },
  {
    offerId: 'offer-2',
    active: true,
    title: '🕶️ Buy 1 Get 1 FREE – Sunglasses',
    description:
      'Purchase any UV400 Polarized Sunglasses and get a second pair absolutely free. Includes Ray-Ban Style, Fastrack & Polaroid.',
    badge: 'BOGO DEAL',
    validTill: 'Valid till 25 Nov 2026',
    whatsappMessage:
      "Hello Dey Optical (Beliatore)! 👋\n\nI'd like to avail the *🕶️ Buy 1 Get 1 FREE – Sunglasses* offer.\n\nPlease let me know the available models.\n\nThank you!",
    order: 1,
  },
  {
    offerId: 'offer-3',
    active: true,
    title: '💻 Free Blue-Cut Coating on Progressive Lenses',
    description:
      'Get complimentary Blue-Cut HEV coating worth ₹800 when you order any Progressive or Bifocal lenses from ZEISS, Essilor, or Nova.',
    badge: 'FREE UPGRADE',
    validTill: 'Valid till 31 Dec 2026',
    whatsappMessage:
      "Hello Dey Optical (Beliatore)! 👋\n\nI'm interested in the *💻 Free Blue-Cut Coating on Progressive Lenses* offer.\n\nPlease share lens options and pricing.\n\nThank you!",
    order: 2,
  },
  {
    offerId: 'offer-4',
    active: true,
    title: '👶 20% OFF Kids Eyewear + Free Strap',
    description:
      'Special discount on our entire Pediatric Eyewear range. Every purchase includes a free silicone sports strap for active kids.',
    badge: 'KIDS SPECIAL',
    validTill: 'Valid till 15 Dec 2026',
    whatsappMessage:
      "Hello Dey Optical (Beliatore)! 👋\n\nI'd like to avail the *👶 20% OFF Kids Eyewear + Free Strap* offer for my child.\n\nPlease share available frames and sizes.\n\nThank you!",
    order: 3,
  },
  {
    offerId: 'offer-5',
    active: true,
    title: '🎁 Free Eye Check-up with Any Frame Purchase',
    description:
      'Get a comprehensive computerized eye examination absolutely free when you purchase any frame from our collection.',
    badge: 'VALUE PACK',
    validTill: 'Ongoing Offer',
    whatsappMessage:
      "Hello Dey Optical (Beliatore)! 👋\n\nI'm interested in the *🎁 Free Eye Check-up with Any Frame Purchase* offer.\n\nI'd like to book a visit.\n\nThank you!",
    order: 4,
  },
];

const SEED_DOCTORS = [
  {
    doctorId: 'dr-soumen',
    name: 'Dr. Soumen Dandapath',
    title: 'Phaco Surgeon & Senior Consultant',
    degree: 'MBBS, DOMS',
    hospital: 'S.N. Bajoria Memorial Eye Hospital, Bankura',
    scheduleDay: 'Every Sunday',
    nextDate: 'Upcoming Sunday',
    scheduleTime: '11:30 AM – 1:00 PM',
    scheduleBadge: 'Every Sunday',
    availabilityStatus: 'available',
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
    order: 0,
  },
  {
    doctorId: 'optom-apurbo',
    name: 'Optom. Apurbo Kumar Patra',
    title: 'Consultant Clinical Optometrist',
    degree: 'D.OPT, R.I.O., S.M.F.W.B.',
    hospital: 'Kolkata Medical College & Hospital',
    scheduleDay: 'Every Thursday',
    nextDate: 'Upcoming Thursday',
    scheduleTime: '9:30 AM – 11:00 AM',
    scheduleBadge: 'Every Thursday',
    availabilityStatus: 'available',
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
    order: 1,
  },
];

/**
 * Seeds the database with initial offers and doctors if collections are empty.
 * Safe to call on every server start — only inserts if the collection is empty.
 */
const seedDatabase = async (force = false) => {
  try {
    // ── Offers ──────────────────────────────────────────────────────────────
    const offerCount = await Offer.countDocuments();
    if (offerCount === 0 || force) {
      if (force) await Offer.deleteMany({});
      await Offer.insertMany(SEED_OFFERS);
      console.log(`✅ Seeded ${SEED_OFFERS.length} initial offers into MongoDB.`);
    } else {
      console.log(`ℹ️  Offers collection already has ${offerCount} document(s). Skipping seed.`);
    }

    // ── Doctors ──────────────────────────────────────────────────────────────
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0 || force) {
      if (force) await Doctor.deleteMany({});
      await Doctor.insertMany(SEED_DOCTORS);
      console.log(`✅ Seeded ${SEED_DOCTORS.length} initial doctors into MongoDB.`);
    } else {
      console.log(`ℹ️  Doctors collection already has ${doctorCount} document(s). Skipping seed.`);
    }

    // ── Gallery ──────────────────────────────────────────────────────────────
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0 || force) {
      if (force) await GalleryItem.deleteMany({});
      await GalleryItem.insertMany(SEED_GALLERY);
      console.log(`✅ Seeded ${SEED_GALLERY.length} initial gallery photos into MongoDB.`);
    } else {
      console.log(`ℹ️  Gallery collection already has ${galleryCount} document(s). Skipping seed.`);
    }
  } catch (err) {
    console.error('❌ Database seeding error:', err.message);
  }
};

module.exports = seedDatabase;

