// Active data and product categories for Dey Optical
// Used across EyewearSection, GallerySection, and TestimonialsSection

export const PRODUCT_CATEGORIES = [
  {
    id: "cat-eyeglasses",
    name: "Eyeglasses & Optical Frames",
    shortName: "Eyeglasses",
    tagline: "Single Vision, Bifocal & High-Index Precision Frames",
    badge: "Clinical Favorite",
    icon: "eyeglasses",
    image: "images/services/service-eyeglasses.png",
    description: "Our comprehensive optical frame collection combines surgical-grade durability with lightweight comfort. Whether you require correction for high myopia, hyperopia, or astigmatism, we curate frames engineered for optimal lens thickness, minimal chromatic aberration, and zero bridge strain.",
    highlights: [
      "Aerospace Beta-Titanium and Italian Mazzucchelli acetate",
      "Specialized beveling for high minus and high plus diopters",
      "Hypoallergenic medical silicone nose rests & flexible spring hinges",
      "Custom vertex distance & pupillary height alignment"
    ],
    availableBrands: ["Dey Signature", "Titan", "Ray-Ban Style", "Vogue", "Safilo"],
    lensCompatibility: "Single Vision, Traditional Bifocal, Anti-Fatigue & Digital Free-Form"
  },
  {
    id: "cat-sunglasses",
    name: "UV400 Polarized Sunglasses",
    shortName: "Sunglasses",
    tagline: "Total Optical Protection with Prescription Sun Tinting",
    badge: "UV400 Polarized",
    icon: "sunny",
    image: "images/services/service-sunglasses.png",
    description: "Medical-grade sunglass collections featuring category 3 polarized filtration that eliminates 99.9% of blinding road, water, and reflective glare. Available in non-prescription, polarized prescription, and photochromic transition formats.",
    highlights: [
      "100% UVA & UVB radiation blockade certified to clinical standards",
      "Hydrophobic and oleophobic outer coatings repelling smudges & rain",
      "Prescription sun lenses crafted with customized base-curve matching",
      "Contrast-enhancing driving tints (Grey, Amber, G-15 Green)"
    ],
    availableBrands: ["Ray-Ban Style", "Dey SunPro", "Polaroid", "Fastrack"],
    lensCompatibility: "Polarized Prescription, Gradient Tints, Flash Mirrors & Photochromic"
  },
  {
    id: "cat-designer",
    name: "Designer & Luxury Frames",
    shortName: "Designer Frames",
    tagline: "Artisan Craftsmanship & Architectural Eyewear Aesthetics",
    badge: "Boutique Collection",
    icon: "diamond",
    image: "images/services/service-designer-frames.png",
    description: "Curated boutique frames from renowned international designers and master frame sculptors. Featuring multi-laminate cellulose acetate, precious metal plating, and ergonomic geometric proportions that frame your facial contours with refined elegance.",
    highlights: [
      "Hand-polished biological cellulose acetate with distinctive color depths",
      "Integrated screwless micro-hinges engineered for lifetime resilience",
      "Ergonomically balanced temple weight distribution",
      "Exclusive seasonal releases and bespoke styling consultation"
    ],
    availableBrands: ["Vogue", "Titan Signature", "Dey Atelier", "Silhouette Style"],
    lensCompatibility: "Ultra-Thin High-Index 1.67 / 1.74 & Anti-Reflective Crizal / Zeiss"
  },
  {
    id: "cat-bluecut",
    name: "Blue-Cut & Digital Screen Protection",
    shortName: "Blue-Cut Lenses",
    tagline: "HEV 420nm Filtration for Digital Screen Professionals",
    badge: "Computer Defense",
    icon: "laptop",
    image: "images/services/service-bluecut-lenses.png",
    description: "Designed specifically for modern digital lifestyles, coders, students, and remote workers facing 8+ hours of daily screen exposure. Our in-monomer blue defense blocks phototoxic 415-455nm high-energy blue-violet rays without unnatural yellow discoloration.",
    highlights: [
      "In-monomer HEV absorption matrix eliminating glare & reflections",
      "Reduces nocturnal melatonin disruption & digital eyestrain headaches",
      "Available with zero prescription (Plano) or full corrective diopters",
      "Dual-sided anti-reflective nanocoating preventing monitor glare"
    ],
    availableBrands: ["Essilor Crizal Prevencia", "Zeiss BlueGuard", "Nova Digital", "Dey Shield"],
    lensCompatibility: "Available in Plano (Zero Power), Single Vision & Progressive Corridors"
  },
  {
    id: "cat-kids",
    name: "Kids & Pediatric Eyewear",
    shortName: "Kids Eyewear",
    tagline: "180° Bendable, Indestructible & Child-Ergonomic Frames",
    badge: "Pediatric Certified",
    icon: "child_care",
    image: "images/services/service-kids-eyewear.png",
    description: "Eyewear specially engineered for growing faces and active playground life. Crafted from food-grade, shatter-resistant rubber polymers with 180° flexible hinges that won't snap under playground play, combined with polycarbonate impact-proof lenses.",
    highlights: [
      "Screwless 180° bendable hinges preventing childhood facial injuries",
      "Soft silicone non-slip strap attachments for active sports & school",
      "Featherlight hypoallergenic rubber TR90 eliminating bridge irritation",
      "Polycarbonate lenses tested against high-velocity ball impacts"
    ],
    availableBrands: ["Fastrack Kids", "Dey Junior Care", "Nano Vista Style"],
    lensCompatibility: "Impact-Resistant Polycarbonate, Anti-Scratch & Myopia Control Optics"
  },
  {
    id: "cat-lenses",
    name: "Specialized Prescription & Progressive Lenses",
    shortName: "Progressive & Medical Lenses",
    tagline: "Free-Form Digital Surfacing from ZEISS, Essilor & Nova",
    badge: "Lab Precision",
    icon: "lens",
    image: "images/services/service-progressive-lenses.png",
    description: "Beyond frames, vision accuracy depends on clinical lens engineering. We specialize in point-by-point digital free-form progressive lenses, high-index 1.74 ultra-thin profiles, photochromic transitions, and anti-glare hydrophobic multicoatings calibrated to your exact pupillary distance.",
    highlights: [
      "Robotic computer-controlled diamond wheel edge profiling",
      "Seamless near-intermediate-distance transition corridor for presbyopia",
      "Photochromic transition lenses reacting rapidly to outdoor sunlight",
      "Full warranty against coating peeling, crazing, and manufacturer defects"
    ],
    availableBrands: ["ZEISS", "Essilor Crizal", "Nova", "Prime Lens"],
    lensCompatibility: "Progressives, Extended Readers, Bifocals & High Cylindrical Astigmatism"
  }
];

export const GALLERY_ITEMS = [
  { id: 1, title: "Precision Diagnostic Suite", cat: "Store", sub: "Auto-Refractometer Room", img: "images/facilities/facility-diagnostic-suite.jpg" },
  { id: 2, title: "High-Index Lens Edging Lab", cat: "Lab", sub: "Robotic Computer Edge Profiling", img: "images/facilities/facility-edging-lab.jpg" },
  { id: 3, title: "Curated Acetate Showcase", cat: "Eyewear", sub: "Handcrafted Boutique Wall", img: "images/facilities/facility-acetate-showcase.jpg" },
  { id: 4, title: "Pediatric Vision Check", cat: "Eye Testing", sub: "Gentle Refractive Screening", img: "images/facilities/facility-pediatric-screening.jpg" },
  { id: 5, title: "Modern Spectacle Fitting", cat: "Eyewear", sub: "Ultrasonic Frame Customization", img: "images/facilities/facility-spectacle-fitting.png" },
  { id: 6, title: "Corneal Slit-Lamp Bio-Check", cat: "Eye Testing", sub: "Microscopic Tear Film Exam", img: "images/facilities/facility-slit-lamp-biocheck.png" },
  { id: 7, title: "Designer Eyewear Curation", cat: "Eyewear", sub: "Boutique Frame Collection", img: "images/services/service-designer-frames.png" },
  { id: 8, title: "Dey Optical Clinic Lounge", cat: "Store", sub: "Beliatore Vision Centre", img: "images/about/about-clinic.png" }
];

export const AT_DATA = [
  {
    quote: "Excellent service and a great collection of frames. Rajdip Da is polite, helpful, and guided me well. Eye testing was accurate and quick. Highly recommended!",
    name: "Abhishek",
    role: "Happy Customer",
    img: "images/testimonials/testimonial-abhishek.png"
  },
  {
    quote: "The service is too good.Affordable and lots of trending collections astonished me.The knowledge and the use modern technology make it an unique opticals store.Friends please visit and experience it by yourself.",
    name: "Bratati",
    role: "Happy Customer",
    img: "images/testimonials/testimonial-bratati.png"
  },
  {
    quote: "Dey Optical is the best Shop in Beliatore Modern eye ware &Brand Lenses (Nova, Prime etc.) collection is here, So Hurry Up guys please Go& Vist.I'm Fully satisfied ,🤗🤗🤗Many Many thanks Rajdip da & Motu Patlu Gift house💕💕💕💕💞♥️♥️🤗🤗🤗🤗🤗 ",
    name: "Saikat Chakraborty",
    role: "Teacher",
    img: "images/testimonials/testimonial-saikat.png"
  },
  {
    quote: "It is an excellent shop in the entire Bankura district. The owner is very friendly, and the prices are very reasonable. The quality of the lenses is superb. I would recommend everyone to visit 'Optical' at Beliator at least once.",
    name: "Saheli Shit",
    role: "Student",
    img: "images/testimonials/testimonial-saheli.png"
  },
  {
    quote: "Excellent experience.. Best in Beliatore even proudly can say best among Bankura,very reliable and trustworthy. Thank you to whole Dey Optical team for the great service...",
    name: "Sk Riyaj",
    role: "Happy Customer",
    img: "images/testimonials/testimonial-riyaj.png"
  }
];
