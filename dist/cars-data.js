const CARS_DATA = [
  // ─── EXISTING 6 CARS (with bodyType added) ───────────────────────────
  {
    id: 1,
    brand: 'Genesis',
    model: 'G80',
    year: 2023,
    mileage: 12000,
    price: 52000,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.5L Turbo',
    color: 'Black',
    driveType: 'AWD',
    bodyType: 'sedan',
    features: [
      'Leather Seats',
      'Panoramic Sunroof',
      'Adaptive Cruise Control',
      'Head-Up Display',
      '12.3" Infotainment Screen'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Premium luxury sedan with refined ride quality and cutting-edge driver assistance technology. Well-maintained with full Genesis service history.'
  },
  {
    id: 2,
    brand: 'Hyundai',
    model: 'Palisade',
    year: 2024,
    mileage: 0,
    price: 48500,
    condition: 'New',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.8L V6',
    color: 'White',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      '7-Passenger Seating',
      'Nappa Leather Interior',
      'Blind-Spot View Monitor',
      'Harman Kardon Audio',
      'Power Tailgate'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Flagship full-size SUV offering three-row seating and a premium cabin. Ideal for families seeking comfort and space.'
  },
  {
    id: 3,
    brand: 'Kia',
    model: 'EV6',
    year: 2024,
    mileage: 0,
    price: 55000,
    condition: 'New',
    fuel: 'Electric',
    transmission: 'Automatic',
    engine: 'Dual Motor Electric',
    color: 'Gravity Blue',
    driveType: 'AWD',
    bodyType: 'electric',
    features: [
      '800V Ultra-Fast Charging',
      'Augmented Reality HUD',
      'Vehicle-to-Load (V2L)',
      'Meridian Premium Audio',
      'Remote Smart Parking'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Award-winning all-electric crossover with 800V architecture enabling 10–80% charge in just 18 minutes. Bold design meets zero-emission performance.'
  },
  {
    id: 4,
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2022,
    mileage: 35000,
    price: 18500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L MPI',
    color: 'Silver',
    driveType: 'FWD',
    bodyType: 'sedan',
    features: [
      '10.25" Touchscreen',
      'Wireless Apple CarPlay',
      'Smart Key with Push Start',
      'Lane Keep Assist'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Sleek and fuel-efficient compact sedan with a striking angular design. A practical daily driver with modern tech features.'
  },
  {
    id: 5,
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    mileage: 18000,
    price: 29500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.6L Turbo',
    color: 'Red',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      'Dual Panoramic Curved Display',
      'Heated & Ventilated Seats',
      'Harman Kardon Audio',
      'Smart Power Tailgate',
      'Terrain Mode Select'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Compact SUV with bold styling and a versatile interior. Excellent balance of comfort, technology, and all-weather capability.'
  },
  {
    id: 6,
    brand: 'Genesis',
    model: 'GV80',
    year: 2024,
    mileage: 5000,
    price: 62000,
    condition: 'Used',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '3.0L Turbo Diesel',
    color: 'Vik Black',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      'Lexicon 21-Speaker Audio',
      'Ergo Motion Seat',
      'Road Active Noise Cancellation',
      'Fingerprint Authentication',
      '3D Digital Cluster'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Luxury mid-size SUV that rivals European competitors with its exquisite craftsmanship. Low mileage and loaded with Genesis signature features.'
  },

  // ─── 18 NEW CARS ─────────────────────────────────────────────────────

  // 7 — Chevrolet Spark
  {
    id: 7,
    brand: 'Chevrolet',
    model: 'Spark',
    year: 2020,
    mileage: 52000,
    price: 5800,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.0L',
    color: 'Yellow',
    driveType: 'FWD',
    bodyType: 'compact',
    features: [
      '7" Touchscreen',
      'Bluetooth Connectivity',
      'Rear-View Camera',
      'Cruise Control'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Affordable city car perfect for urban commuting. Compact size makes parking effortless while maintaining surprising interior space.'
  },

  // 8 — Chevrolet Trax
  {
    id: 8,
    brand: 'Chevrolet',
    model: 'Trax',
    year: 2021,
    mileage: 41000,
    price: 12500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.4L Turbo',
    color: 'Graphite',
    driveType: 'FWD',
    bodyType: 'suv',
    features: [
      'Apple CarPlay & Android Auto',
      'Remote Keyless Entry',
      'Hill Start Assist',
      'Rear Parking Sensors'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Subcompact crossover offering a higher driving position and practical cargo space. A budget-friendly entry into the SUV segment.'
  },

  // 9 — Ssangyong Tivoli
  {
    id: 9,
    brand: 'Ssangyong',
    model: 'Tivoli',
    year: 2022,
    mileage: 28000,
    price: 14900,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.5L Turbo',
    color: 'Grand White',
    driveType: 'FWD',
    bodyType: 'suv',
    features: [
      '9" Infotainment Display',
      'Wireless Phone Charging',
      'Smart Key',
      'Forward Collision Avoidance'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Stylish compact crossover from Korea\'s rugged SUV specialist. Strong value proposition with generous standard equipment.'
  },

  // 10 — Ssangyong Rexton
  {
    id: 10,
    brand: 'Ssangyong',
    model: 'Rexton',
    year: 2023,
    mileage: 15000,
    price: 32000,
    condition: 'Used',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.2L e-XDi Diesel',
    color: 'Space Black',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      'Body-on-Frame Construction',
      '3.5 Ton Towing Capacity',
      'Nappa Leather Seats',
      'Around View Monitor',
      '9.2" Touchscreen'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Full-size body-on-frame SUV built for serious off-road capability and heavy towing. Premium interior belies its rugged underpinnings.'
  },

  // 11 — Renault Samsung SM6
  {
    id: 11,
    brand: 'Renault Samsung',
    model: 'SM6',
    year: 2021,
    mileage: 45000,
    price: 15500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '1.6L Turbo',
    color: 'Platinum Silver',
    driveType: 'FWD',
    bodyType: 'sedan',
    features: [
      'BOSE Premium Audio',
      'Leather-Wrapped Steering',
      'Automatic Climate Control',
      'Smart Cruise Control',
      'LED Headlamps'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Mid-size sedan based on the Renault Talisman platform offering French design finesse with Korean reliability. Quiet and composed ride quality.'
  },

  // 12 — Renault Samsung QM6
  {
    id: 12,
    brand: 'Renault Samsung',
    model: 'QM6',
    year: 2022,
    mileage: 30000,
    price: 21000,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L MPI',
    color: 'Iron Blue',
    driveType: 'FWD',
    bodyType: 'suv',
    features: [
      'Panoramic Sunroof',
      '7" Digital Cluster',
      'Rear Cross-Traffic Alert',
      'Hands-Free Power Tailgate'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Comfortable family SUV with a spacious cabin and smooth ride. Renault engineering combined with competitive Korean pricing.'
  },

  // 13 — BMW 3 Series
  {
    id: 13,
    brand: 'BMW',
    model: '3 Series',
    year: 2022,
    mileage: 22000,
    price: 42000,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L TwinPower Turbo',
    color: 'Alpine White',
    driveType: 'RWD',
    bodyType: 'sedan',
    features: [
      'BMW Live Cockpit Professional',
      'M Sport Package',
      'Adaptive LED Headlights',
      'Parking Assistant Plus',
      'Wireless Charging'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'The ultimate driving machine in its most popular form. Korean-market spec with full M Sport styling and advanced driver assistance.'
  },

  // 14 — BMW X5
  {
    id: 14,
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    mileage: 8000,
    price: 72000,
    condition: 'Used',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '3.0L TwinPower Turbo Diesel',
    color: 'Carbon Black',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      'Air Suspension',
      'Panoramic Sky Lounge LED Roof',
      'Bowers & Wilkins Surround Sound',
      'Gesture Control',
      'Driving Assistant Professional'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Flagship luxury SUV combining dynamic handling with supreme comfort. Near-new condition with full BMW Korea warranty remaining.'
  },

  // 15 — Mercedes-Benz E-Class
  {
    id: 15,
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2022,
    mileage: 19000,
    price: 48000,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo (E 200)',
    color: 'Obsidian Black',
    driveType: 'RWD',
    bodyType: 'sedan',
    features: [
      'MBUX Infotainment System',
      'Burmester 3D Surround Sound',
      'Multibeam LED Headlights',
      'Energizing Comfort Control',
      'Active Distance Assist'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Executive sedan that defines understated luxury. Smooth powertrain and whisper-quiet cabin make every journey first class.'
  },

  // 16 — Mercedes-Benz GLC
  {
    id: 16,
    brand: 'Mercedes-Benz',
    model: 'GLC',
    year: 2024,
    mileage: 0,
    price: 58000,
    condition: 'New',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo (GLC 300)',
    color: 'Polar White',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      '11.9" OLED Central Display',
      'MBUX with Augmented Reality Navigation',
      'Air Balance Cabin Fragrance',
      'Acoustic Comfort Glass',
      'Hands-Free Tailgate'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Brand-new premium compact SUV with the latest generation MBUX system. The best-selling Mercedes SUV worldwide, now available for export.'
  },

  // 17 — Volkswagen Tiguan
  {
    id: 17,
    brand: 'Volkswagen',
    model: 'Tiguan',
    year: 2023,
    mileage: 11000,
    price: 34500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L TSI',
    color: 'Oryx White',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      'Digital Cockpit Pro',
      'IQ.DRIVE Assistance',
      'Panoramic Sunroof',
      'Dynaudio Premium Audio',
      'Park Assist with Memory'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'German-engineered compact SUV known for its solid build quality and refined driving dynamics. Popular choice among Korean families.'
  },

  // 18 — Volkswagen Golf
  {
    id: 18,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    mileage: 38000,
    price: 22500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic (DSG)',
    engine: '1.4L TSI',
    color: 'Atlantic Blue',
    driveType: 'FWD',
    bodyType: 'compact',
    features: [
      '10" Discover Pro Navigation',
      'LED Matrix Headlights',
      'Adaptive Chassis Control',
      'Wireless App-Connect'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'The benchmark hatchback that set the standard for the segment. Mk8 generation with digital-first interior and sharp handling.'
  },

  // 19 — Hyundai Tucson
  {
    id: 19,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    mileage: 0,
    price: 32500,
    condition: 'New',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    engine: '1.6L Turbo Hybrid',
    color: 'Amazon Gray',
    driveType: 'AWD',
    bodyType: 'hybrid',
    features: [
      'Parametric Hidden Grille Lighting',
      '10.25" Dual Screens',
      'Bluelink Connected Car',
      'Blind-Spot Collision Avoidance',
      'Heated Steering Wheel'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Bold compact SUV with hybrid efficiency and futuristic design language. Award-winning styling meets eco-conscious engineering.'
  },

  // 20 — Hyundai Santa Fe
  {
    id: 20,
    brand: 'Hyundai',
    model: 'Santa Fe',
    year: 2024,
    mileage: 0,
    price: 41000,
    condition: 'New',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.2L CRDi Diesel',
    color: 'Shimmering Silver',
    driveType: 'AWD',
    bodyType: 'suv',
    features: [
      '12.3" Full Digital Cluster',
      'Terrain Mode (Snow/Mud/Sand)',
      'Surround View Monitor',
      'Rear Seat Reminder',
      'Premium Relaxation Seats'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Versatile mid-size SUV with a completely redesigned rugged exterior. Diesel efficiency paired with serious all-terrain capability.'
  },

  // 21 — Hyundai Staria (Van)
  {
    id: 21,
    brand: 'Hyundai',
    model: 'Staria',
    year: 2023,
    mileage: 20000,
    price: 38000,
    condition: 'Used',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.2L CRDi Diesel',
    color: 'Moonlight Blue',
    driveType: 'FWD',
    bodyType: 'van',
    features: [
      '11-Passenger Seating',
      'Sliding Side Doors',
      'Spaceship-Inspired Design',
      'Rear Seat Entertainment',
      'Swivel Second-Row Seats'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Futuristic multi-purpose van replacing the legendary Starex. Spacious interior accommodates large families or commercial cargo needs.'
  },

  // 22 — Hyundai Mighty (Truck)
  {
    id: 22,
    brand: 'Hyundai',
    model: 'Mighty',
    year: 2021,
    mileage: 85000,
    price: 22000,
    condition: 'Used',
    fuel: 'Diesel',
    transmission: 'Manual',
    engine: '3.9L CRDi Diesel',
    color: 'White',
    driveType: 'RWD',
    bodyType: 'truck',
    features: [
      '3.5 Ton Payload Capacity',
      'Air Brake System',
      'Power Steering',
      'Digital Tachograph'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Workhorse medium-duty truck popular across Asia and Africa. Proven diesel reliability for commercial transport and logistics.'
  },

  // 23 — Kia Carnival
  {
    id: 23,
    brand: 'Kia',
    model: 'Carnival',
    year: 2024,
    mileage: 0,
    price: 45000,
    condition: 'New',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.5L V6',
    color: 'Astra Blue',
    driveType: 'FWD',
    bodyType: 'van',
    features: [
      'VIP Lounge Second Row',
      'Dual Sunroofs',
      'Kia Connect with OTA Updates',
      '12.3" Panoramic Dual Display',
      'Safe Exit Assist'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Premium MPV that blurs the line between minivan and SUV. Luxurious VIP seating and SUV-like road presence make it a class leader.'
  },

  // 24 — Kia Sorento
  {
    id: 24,
    brand: 'Kia',
    model: 'Sorento',
    year: 2023,
    mileage: 16000,
    price: 36000,
    condition: 'Used',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    engine: '1.6L Turbo Hybrid',
    color: 'Gravity Gray',
    driveType: 'AWD',
    bodyType: 'hybrid',
    features: [
      'Three-Row Seating',
      '10.25" Navigation System',
      'Smart Power Tailgate',
      'Highway Driving Assist 2',
      'Multi-Terrain AWD'
    ],
    image: 'images/kia_ev6.jpg',
    description:
      'Mid-size SUV with hybrid efficiency and genuine three-row versatility. Excellent fuel economy without sacrificing space or capability.'
  },

  // 25 — Kia Bongo (Truck)
  {
    id: 25,
    brand: 'Kia',
    model: 'Bongo',
    year: 2020,
    mileage: 110000,
    price: 8500,
    condition: 'Used',
    fuel: 'Diesel',
    transmission: 'Manual',
    engine: '2.5L CRDi Diesel',
    color: 'White',
    driveType: 'RWD',
    bodyType: 'truck',
    features: [
      '1-Ton Payload Capacity',
      'Drop-Side Cargo Bed',
      'Power Windows',
      'Air Conditioning'
    ],
    image: 'images/genesis_g80.jpg',
    description:
      'Korea\'s best-selling light commercial truck, essential for small businesses. Legendary durability and low operating costs.'
  },

  // 26 — Genesis G70
  {
    id: 26,
    brand: 'Genesis',
    model: 'G70',
    year: 2023,
    mileage: 9000,
    price: 39500,
    condition: 'Used',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo',
    color: 'Havana Red',
    driveType: 'RWD',
    bodyType: 'sedan',
    features: [
      'Sport-Tuned Suspension',
      'Brembo Brakes',
      'Lexicon Premium Audio',
      '8" Touchscreen with Navigation',
      'Launch Control'
    ],
    image: 'images/hyundai_palisade.jpg',
    description:
      'Sports sedan that earned North American Car of the Year honors. Rear-wheel drive dynamics with luxury appointments at every turn.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CARS_DATA;
}
