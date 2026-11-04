// Mock data and product categories for Dey Optical
// Dey Optical operates as an optometric clinic and optical boutique.
// Products are showcased by category for clinical inquiry, trial booking, and direct WhatsApp consultation.

export const PRODUCT_CATEGORIES = [
  {
    id: "cat-eyeglasses",
    name: "Eyeglasses & Optical Frames",
    shortName: "Eyeglasses",
    tagline: "Single Vision, Bifocal & High-Index Precision Frames",
    badge: "Clinical Favorite",
    icon: "eyeglasses",
    image: "images/dey-carousel-3.jpg",
    description: "Our comprehensive optical frame collection combines surgical-grade durability with lightweight comfort. Whether you require correction for high myopia, hyperopia, or astigmatism, we curate frames engineered for optimal lens thickness, minimal chromatic aberration, and zero bridge strain.",
    highlights: [
      "Aerospace Beta-Titanium and Italian Mazzucchelli acetate",
      "Specialized beveling for high minus and high plus diopters",
      "Hypoallergenic medical silicone nose rests & flexible spring hinges",
      "Custom vertex distance & pupillary height alignment"
    ],
    availableBrands: ["Dey Signature", "Titan", "Ray-Ban Style", "Vogue", "Safilo"],
    lensCompatibility: "Single Vision, Traditional Bifocal, Anti-Fatigue & Digital Free-Form",
    sampleProducts: [
      {
        id: "p1",
        name: "Dey Aviator Titanium",
        brand: "Dey Signature",
        category: "Eyeglasses",
        shape: "Aviator",
        gender: "Unisex",
        material: "Aerospace Titanium",
        dimensions: { lens: "54 mm", bridge: "17 mm", temple: "145 mm" },
        desc: "Ultra-featherweight double-bridge aviator frame with silicon nose rests for zero bridge strain.",
        badge: "Ultra-Lightweight"
      },
      {
        id: "p2",
        name: "Acetate Studio Round",
        brand: "Titan",
        category: "Eyeglasses",
        shape: "Round",
        gender: "Unisex",
        material: "Handcrafted Italian Acetate",
        dimensions: { lens: "49 mm", bridge: "20 mm", temple: "140 mm" },
        desc: "Classic panthos round silhouette with wire-core temples, perfect for high minus prescriptions.",
        badge: "Classic Silhouette"
      },
      {
        id: "p7",
        name: "Minimalist Rimless Classic",
        brand: "Dey Signature",
        category: "Eyeglasses",
        shape: "Rimless",
        gender: "Men",
        material: "Beta-Titanium Alloy",
        dimensions: { lens: "52 mm", bridge: "19 mm", temple: "140 mm" },
        desc: "Virtually weightless profile weighing under 9 grams. Unobstructed peripheral vision for professionals.",
        badge: "Featherweight 9g"
      }
    ]
  },
  {
    id: "cat-sunglasses",
    name: "UV400 Polarized Sunglasses",
    shortName: "Sunglasses",
    tagline: "Total Optical Protection with Prescription Sun Tinting",
    badge: "UV400 Polarized",
    icon: "sunny",
    image: "images/dey-carousel-2.jpg",
    description: "Medical-grade sunglass collections featuring category 3 polarized filtration that eliminates 99.9% of blinding road, water, and reflective glare. Available in non-prescription, polarized prescription, and photochromic transition formats.",
    highlights: [
      "100% UVA & UVB radiation blockade certified to clinical standards",
      "Hydrophobic and oleophobic outer coatings repelling smudges & rain",
      "Prescription sun lenses crafted with customized base-curve matching",
      "Contrast-enhancing driving tints (Grey, Amber, G-15 Green)"
    ],
    availableBrands: ["Ray-Ban Style", "Dey SunPro", "Polaroid", "Fastrack"],
    lensCompatibility: "Polarized Prescription, Gradient Tints, Flash Mirrors & Photochromic",
    sampleProducts: [
      {
        id: "p3",
        name: "Polarized Horizon Sun",
        brand: "Ray-Ban Style",
        category: "Sunglasses",
        shape: "Square",
        gender: "Men",
        material: "Polycarbonate & Steel",
        dimensions: { lens: "56 mm", bridge: "18 mm", temple: "148 mm" },
        desc: "Grade-3 polarized sunglasses blocking 99.9% horizontal road and water glare with UV400 shield.",
        badge: "UV400 Polarized"
      }
    ]
  },
  {
    id: "cat-designer",
    name: "Designer & Luxury Frames",
    shortName: "Designer Frames",
    tagline: "Artisan Craftsmanship & Architectural Eyewear Aesthetics",
    badge: "Boutique Collection",
    icon: "diamond",
    image: "images/down_hero/image copy 2.png",
    description: "Curated boutique frames from renowned international designers and master frame sculptors. Featuring multi-laminate cellulose acetate, precious metal plating, and ergonomic geometric proportions that frame your facial contours with refined elegance.",
    highlights: [
      "Hand-polished biological cellulose acetate with distinctive color depths",
      "Integrated screwless micro-hinges engineered for lifetime resilience",
      "Ergonomically balanced temple weight distribution",
      "Exclusive seasonal releases and bespoke styling consultation"
    ],
    availableBrands: ["Vogue", "Titan Signature", "Dey Atelier", "Silhouette Style"],
    lensCompatibility: "Ultra-Thin High-Index 1.67 / 1.74 & Anti-Reflective Crizal / Zeiss",
    sampleProducts: [
      {
        id: "p4",
        name: "Cat-Eye Emerald Acetate",
        brand: "Vogue",
        category: "Designer Frames",
        shape: "Cat-Eye",
        gender: "Women",
        material: "Cellulose Acetate",
        dimensions: { lens: "51 mm", bridge: "16 mm", temple: "142 mm" },
        desc: "Sculpted subtle lift creating flattering cheekbone contours. Fitted with anti-scratch clear demo lenses.",
        badge: "Designer Silhouette"
      },
      {
        id: "p8",
        name: "Urban Acetate Square",
        brand: "Titan",
        category: "Designer Frames",
        shape: "Square",
        gender: "Men",
        material: "Mazzucchelli Acetate",
        dimensions: { lens: "53 mm", bridge: "18 mm", temple: "145 mm" },
        desc: "Crisp architectural beveling with high-gloss hand-polished obsidian black finish.",
        badge: "Architectural Cut"
      }
    ]
  },
  {
    id: "cat-bluecut",
    name: "Blue-Cut & Digital Screen Protection",
    shortName: "Blue-Cut Lenses",
    tagline: "HEV 420nm Filtration for Digital Screen Professionals",
    badge: "Computer Defense",
    icon: "laptop",
    image: "images/down_hero/image copy.png",
    description: "Designed specifically for modern digital lifestyles, coders, students, and remote workers facing 8+ hours of daily screen exposure. Our in-monomer blue defense blocks phototoxic 415-455nm high-energy blue-violet rays without unnatural yellow discoloration.",
    highlights: [
      "In-monomer HEV absorption matrix eliminating glare & reflections",
      "Reduces nocturnal melatonin disruption & digital eyestrain headaches",
      "Available with zero prescription (Plano) or full corrective diopters",
      "Dual-sided anti-reflective nanocoating preventing monitor glare"
    ],
    availableBrands: ["Essilor Crizal Prevencia", "Zeiss BlueGuard", "Nova Digital", "Dey Shield"],
    lensCompatibility: "Available in Plano (Zero Power), Single Vision & Progressive Corridors",
    sampleProducts: [
      {
        id: "p5",
        name: "Digital Shield Blue-Cut",
        brand: "Dey Signature",
        category: "Blue-Cut Lenses",
        shape: "Square",
        gender: "Unisex",
        material: "TR90 Memory Plastic",
        dimensions: { lens: "53 mm", bridge: "18 mm", temple: "145 mm" },
        desc: "Engineered specifically for 8+ hour screen exposure. Filters 415-455nm high energy blue rays.",
        badge: "Anti-Fatigue Monomer"
      }
    ]
  },
  {
    id: "cat-kids",
    name: "Kids & Pediatric Eyewear",
    shortName: "Kids Eyewear",
    tagline: "180° Bendable, Indestructible & Child-Ergonomic Frames",
    badge: "Pediatric Certified",
    icon: "child_care",
    image: "images/dey-carousel-4.jpg",
    description: "Eyewear specially engineered for growing faces and active playground life. Crafted from food-grade, shatter-resistant rubber polymers with 180° flexible hinges that won't snap under playground play, combined with polycarbonate impact-proof lenses.",
    highlights: [
      "Screwless 180° bendable hinges preventing childhood facial injuries",
      "Soft silicone non-slip strap attachments for active sports & school",
      "Featherlight hypoallergenic rubber TR90 eliminating bridge irritation",
      "Polycarbonate lenses tested against high-velocity ball impacts"
    ],
    availableBrands: ["Fastrack Kids", "Dey Junior Care", "Nano Vista Style"],
    lensCompatibility: "Impact-Resistant Polycarbonate, Anti-Scratch & Myopia Control Optics",
    sampleProducts: [
      {
        id: "p6",
        name: "Junior Flex Safe-Frame",
        brand: "Fastrack",
        category: "Kids Eyewear",
        shape: "Round",
        gender: "Kids",
        material: "Shatter-Resistant Rubber TR90",
        dimensions: { lens: "45 mm", bridge: "15 mm", temple: "130 mm" },
        desc: "180-degree bendable arms and screw-less hinge technology making it indestructible for playful school days.",
        badge: "Kids Flex Indestructible"
      }
    ]
  },
  {
    id: "cat-lenses",
    name: "Specialized Prescription & Progressive Lenses",
    shortName: "Progressive & Medical Lenses",
    tagline: "Free-Form Digital Surfacing from ZEISS, Essilor & Nova",
    badge: "Lab Precision",
    icon: "lens",
    image: "images/down_hero/Screenshot 2026-10-06 224245.png",
    description: "Beyond frames, vision accuracy depends on clinical lens engineering. We specialize in point-by-point digital free-form progressive lenses, high-index 1.74 ultra-thin profiles, photochromic transitions, and anti-glare hydrophobic multicoatings calibrated to your exact pupillary distance.",
    highlights: [
      "Robotic computer-controlled diamond wheel edge profiling",
      "Seamless near-intermediate-distance transition corridor for presbyopia",
      "Photochromic transition lenses reacting rapidly to outdoor sunlight",
      "Full warranty against coating peeling, crazing, and manufacturer defects"
    ],
    availableBrands: ["ZEISS", "Essilor Crizal", "Nova", "Prime Lens"],
    lensCompatibility: "Progressives, Extended Readers, Bifocals & High Cylindrical Astigmatism",
    sampleProducts: []
  }
];

export const PRODUCTS = [
  {
    id: "p1",
    name: "Dey Aviator Titanium",
    brand: "Dey Signature",
    category: "Eyeglasses",
    shape: "Aviator",
    gender: "Unisex",
    material: "Aerospace Titanium",
    dimensions: { lens: "54 mm", bridge: "17 mm", temple: "145 mm" },
    desc: "Ultra-featherweight double-bridge aviator frame with silicon nose rests for zero bridge strain.",
    badge: "Bestseller"
  },
  {
    id: "p2",
    name: "Acetate Studio Round",
    brand: "Titan",
    category: "Eyeglasses",
    shape: "Round",
    gender: "Unisex",
    material: "Handcrafted Italian Acetate",
    dimensions: { lens: "49 mm", bridge: "20 mm", temple: "140 mm" },
    desc: "Classic panthos round silhouette with wire-core temples, perfect for high minus prescriptions.",
    badge: "Popular"
  },
  {
    id: "p3",
    name: "Polarized Horizon Sun",
    brand: "Ray-Ban Style",
    category: "Sunglasses",
    shape: "Square",
    gender: "Men",
    material: "Polycarbonate & Steel",
    dimensions: { lens: "56 mm", bridge: "18 mm", temple: "148 mm" },
    desc: "Grade-3 polarized sunglasses blocking 99.9% horizontal road and water glare with UV400 shield.",
    badge: "UV400 Polarized"
  },
  {
    id: "p4",
    name: "Cat-Eye Emerald Acetate",
    brand: "Vogue",
    category: "Designer Frames",
    shape: "Cat-Eye",
    gender: "Women",
    material: "Cellulose Acetate",
    dimensions: { lens: "51 mm", bridge: "16 mm", temple: "142 mm" },
    desc: "Sculpted subtle lift creating flattering cheekbone contours. Fitted with anti-scratch clear demo lenses.",
    badge: "Designer"
  },
  {
    id: "p5",
    name: "Digital Shield Blue-Cut",
    brand: "Dey Signature",
    category: "Blue-Cut Lenses",
    shape: "Square",
    gender: "Unisex",
    material: "TR90 Memory Plastic",
    dimensions: { lens: "53 mm", bridge: "18 mm", temple: "145 mm" },
    desc: "Engineered specifically for 8+ hour screen exposure. Filters 415-455nm high energy blue rays.",
    badge: "Anti-Fatigue"
  },
  {
    id: "p6",
    name: "Junior Flex Safe-Frame",
    brand: "Fastrack",
    category: "Kids Eyewear",
    shape: "Round",
    gender: "Kids",
    material: "Shatter-Resistant Rubber TR90",
    dimensions: { lens: "45 mm", bridge: "15 mm", temple: "130 mm" },
    desc: "180-degree bendable arms and screw-less hinge technology making it indestructible for playful school days.",
    badge: "Kids Flex"
  },
  {
    id: "p7",
    name: "Minimalist Rimless Classic",
    brand: "Dey Signature",
    category: "Eyeglasses",
    shape: "Rimless",
    gender: "Men",
    material: "Beta-Titanium Alloy",
    dimensions: { lens: "52 mm", bridge: "19 mm", temple: "140 mm" },
    desc: "Virtually weightless profile weighing under 9 grams. Unobstructed peripheral vision for professionals.",
    badge: "Ultra-Light"
  },
  {
    id: "p8",
    name: "Urban Acetate Square",
    brand: "Titan",
    category: "Designer Frames",
    shape: "Square",
    gender: "Men",
    material: "Mazzucchelli Acetate",
    dimensions: { lens: "53 mm", bridge: "18 mm", temple: "145 mm" },
    desc: "Crisp architectural beveling with high-gloss hand-polished obsidian black finish.",
    badge: "New Arrival"
  }
];

export const GALLERY_ITEMS = [
  { id: 1, title: "Precision Diagnostic Suite", cat: "Store", sub: "Auto-Refractometer Room", img: "images/dey-carousel-1.jpg" },
  { id: 2, title: "High-Index Lens Edging Lab", cat: "Lab", sub: "Robotic Computer Edge Profiling", img: "images/dey-carousel-2.jpg" },
  { id: 3, title: "Curated Acetate Showcase", cat: "Eyewear", sub: "Handcrafted Boutique Wall", img: "images/dey-carousel-3.jpg" },
  { id: 4, title: "Pediatric Vision Check", cat: "Eye Testing", sub: "Gentle Refractive Screening", img: "images/dey-carousel-4.jpg" },
  { id: 5, title: "Modern Spectacle Fitting", cat: "Eyewear", sub: "Ultrasonic Frame Customization", img: "images/dey-carousel-5.jpg" },
  { id: 6, title: "Corneal Slit-Lamp Bio-Check", cat: "Eye Testing", sub: "Microscopic Tear Film Exam", img: "images/dey-carousel-1.jpg" }
];

export const INITIAL_TESTIMONIALS = [
  {
    name: "Debashis Banerjee",
    role: "Software Architect",
    rating: 5,
    date: "2 days ago",
    comment: "Dr. Arindam Dey diagnosed my progressive corridor with exact precision. I spent years getting headaches from generic opticians. At Dey Optical, the vision clarity is crisp across laptop and mobile."
  },
  {
    name: "Ananya Sen",
    role: "Graphic Designer",
    rating: 5,
    date: "1 week ago",
    comment: "The titanium frames are impossibly lightweight. Dr. Dey also took the time to measure my optical center distance properly. Exceptional clinical honesty and boutique collection!"
  },
  {
    name: "Subrata Roy",
    role: "Retired Professor",
    rating: 5,
    date: "2 weeks ago",
    comment: "Clean, hygienic, and thoroughly polite staff. Their computerized testing gave me exact reading power for my bi-focals with zero distortion. Highly recommended in Kolkata."
  }
];

export const ARTICLES = [
  {
    id: "art-1",
    title: "5 Subtle Signs You May Need New Prescription Glasses",
    category: "Vision Health",
    readTime: "4 min read",
    author: "Dr. Arindam Dey",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1160",
    summary: "Frequent evening forehead strain, holding text at arm's length, and night halos indicate your refractive index requires recalibration.",
    fullContent: `
      <h1 class="text-headline-lg font-headline-lg font-bold text-on-surface mb-4">5 Subtle Signs You May Need New Prescription Glasses</h1>
      <div class="flex items-center gap-3 text-body-sm font-body-sm text-secondary pb-6 border-b border-outline-variant/30 mb-6">
        <span>By Dr. Arindam Dey (M.Optom)</span> • <span>Published in Dey Health Journal</span> • <span>4 min read</span>
      </div>
      <div class="prose text-body-md font-body-md text-on-surface-variant space-y-4">
        <p>Vision changes rarely occur overnight. The human brain continuously compensates for blurred signals, which frequently masks refractive degradation until eyestrain manifests as chronic migraines or fatigue.</p>
        <h3 class="text-headline-sm font-headline-sm font-semibold text-on-surface mt-6">1. Frequent Tension Headaches Around the Brow</h3>
        <p>If you experience dull, throbbing sensations between your eyebrows after two hours of computer work, your ciliary muscles are overworking to force focal convergence.</p>
        <h3 class="text-headline-sm font-headline-sm font-semibold text-on-surface mt-6">2. Glare and Halos Surrounding Night Traffic</h3>
        <p>Night driving dispersion often points to uncorrected astigmatism or scratched anti-reflective coatings scattering oncoming photon waves.</p>
        <h3 class="text-headline-sm font-headline-sm font-semibold text-on-surface mt-6">3. The Smartphone "Push-Away" Motion</h3>
        <p>If you find yourself extending your elbow outwards to read text notifications, physiological presbyopia has commenced, necessitating progressive reading support.</p>
        <div class="p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 my-6">
          <h4 class="text-label-md font-label-md font-semibold text-primary">Optometrist's Recommendation</h4>
          <p class="text-body-sm font-body-sm text-secondary mt-1">Schedule a comprehensive computerized vision check every 12 to 14 months to prevent unneeded ocular strain.</p>
        </div>
      </div>
    `
  },
  {
    id: "art-2",
    title: "Blue Light Protection: Clinical Facts vs Commercial Myths",
    category: "Optical Tech",
    readTime: "6 min read",
    author: "Dey Optical Lab Team",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=1160",
    summary: "Do blue lenses help circadian rhythm or eye fatigue? A deep breakdown of 420nm filtration coatings.",
    fullContent: `
      <h1 class="text-headline-lg font-headline-lg font-bold text-on-surface mb-4">Blue Light Protection: Clinical Facts vs Commercial Myths</h1>
      <div class="flex items-center gap-3 text-body-sm font-body-sm text-secondary pb-6 border-b border-outline-variant/30 mb-6">
        <span>By Dey Optical Lens Team</span> • <span>Optical Tech Series</span> • <span>6 min read</span>
      </div>
      <div class="prose text-body-md font-body-md text-on-surface-variant space-y-4">
        <p>High-energy visible (HEV) blue light between 415nm and 455nm presents the greatest phototoxic potential for retinal pigment epithelium. However, not all blue blockers are engineered alike.</p>
        <h3 class="text-headline-sm font-headline-sm font-semibold text-on-surface mt-6">Coating vs In-Monomer Absorption</h3>
        <p>Standard cheap yellow coatings reflect surface light, creating distracting purple reflections on video calls. High-grade clinical lenses embed the absorption matrix inside the lens monomer itself, preserving crystal transparency.</p>
      </div>
    `
  },
  {
    id: "art-3",
    title: "How Often Should You Really Test Your Eyes?",
    category: "Preventative Care",
    readTime: "3 min read",
    author: "Dr. Arindam Dey",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1160",
    summary: "Guidelines across age brackets: school-age children, screen professionals, and adults over 40.",
    fullContent: `
      <h1 class="text-headline-lg font-headline-lg font-bold text-on-surface mb-4">How Often Should You Really Test Your Eyes?</h1>
      <div class="flex items-center gap-3 text-body-sm font-body-sm text-secondary pb-6 border-b border-outline-variant/30 mb-6">
        <span>By Dr. Arindam Dey</span> • <span>Preventative Series</span> • <span>3 min read</span>
      </div>
      <div class="prose text-body-md font-body-md text-on-surface-variant space-y-4">
        <p>Eye tests are health checks, not merely prescription upgrades. Auto-refraction and slit-lamp examinations assess vascular corneal health, tear film quality, and early signs of glaucoma.</p>
        <p>Adults between 20-40 should undergo comprehensive screening every 18 months, while digital users and individuals over 40 must undergo annual assessments.</p>
      </div>
    `
  }
];

export const AT_DATA = [
  {
    quote: "Dr. Arindam Dey diagnosed my progressive corridor with exact precision. I spent years getting headaches from generic opticians. At Dey Optical, the vision clarity is crisp across laptop and mobile.",
    name:  "Debashis Banerjee",
    role:  "Software Architect",
    img:   "images/dey-carousel-1.jpg"
  },
  {
    quote: "The titanium frames are impossibly lightweight. Dr. Dey took the time to measure my optical center distance properly. Exceptional clinical honesty and a truly boutique collection!",
    name:  "Ananya Sen",
    role:  "Graphic Designer",
    img:   "images/dey-carousel-2.jpg"
  },
  {
    quote: "Clean, hygienic, and thoroughly polite staff. Their computerised testing gave me exact reading power for my bi-focals with zero distortion. Highly recommended in Kolkata.",
    name:  "Subrata Roy",
    role:  "Retired Professor",
    img:   "images/dey-carousel-3.jpg"
  },
  {
    quote: "Finally found a place that takes children's eye care seriously. The paediatric examination was thorough and my daughter was completely at ease throughout. Perfect fit on her first pair of glasses!",
    name:  "Priya Chakraborty",
    role:  "School Teacher",
    img:   "images/dey-carousel-4.jpg"
  },
  {
    quote: "I came in after a cataract surgery referral and the post-op lens correction was spot on. The Essilor Crizal coating Dr. Dey recommended has eliminated all glare from my night drives.",
    name:  "Rajat Mukherjee",
    role:  "Senior Manager, TATA",
    img:   "images/dey-carousel-5.jpg"
  }
];
