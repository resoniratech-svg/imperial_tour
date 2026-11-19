import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Imperial Tours Qatar database...');

  // Create admin
  const hashedPassword = await bcrypt.hash('changeme123', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@imperialtours.qa' },
    update: {},
    create: {
      email: 'admin@imperialtours.qa',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created');

  // Create categories
  const categories = [
    { name: 'Desert Safari', slug: 'desert-safari', description: 'Thrilling desert adventures across Qatar\'s golden dunes', sortOrder: 1, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800' },
    { name: 'Water Sports & Adventure', slug: 'water-sports-adventure', description: 'Exciting water activities and marine adventures', sortOrder: 2, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800' },
    { name: 'Cruise Tours', slug: 'cruise-tours', description: 'Luxurious dhow cruise experiences along Qatar\'s coastline', sortOrder: 3, image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800' },
    { name: 'City Tours', slug: 'city-tours', description: 'Discover the modern marvels and heritage of Doha', sortOrder: 4, image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800' },
    { name: 'Cultural & Historical Tours', slug: 'cultural-historical-tours', description: 'Immerse yourself in Qatar\'s rich culture and heritage', sortOrder: 5, image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800' },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.tourCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }
  console.log('✅ Categories created');

  // ============================================
  // ALL 25 TOURS
  // ============================================

  const tours = [
    // CATEGORY A: DESERT SAFARI TOURS
    {
      title: 'Half Day Desert Safari',
      slug: 'half-day-desert-safari',
      shortDesc: 'Experience the thrill of Qatar\'s desert with dune bashing, camel riding, and sandboarding in a half-day adventure.',
      description: 'Embark on an unforgettable half-day desert safari adventure in Qatar. Your experienced driver will take you on an exhilarating ride through the golden sand dunes in a powerful 4x4 vehicle. Feel the rush of dune bashing before visiting a traditional desert camp where you can enjoy a camel ride, try sandboarding down towering dunes, and soak in the stunning desert landscape. This tour offers the perfect introduction to Qatar\'s magnificent desert terrain.',
      categoryId: categoryMap['desert-safari'],
      coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200',
      isFeatured: true,
      sortOrder: 1,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 6,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 700, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 400, isTotal: false },
        { minPersons: 3, maxPersons: 4, pricePerPerson: 275, isTotal: false },
        { minPersons: 5, maxPersons: 6, pricePerPerson: 200, isTotal: false },
      ],
      inclusions: [
        '4x4 vehicle with experienced driver',
        'Water and soft drinks',
        'Camel ride',
        'Sandboarding',
        'Off-road insurance',
        'Desert camp visit',
      ],
      exclusions: [
        { item: 'Quad bike', price: null },
        { item: 'Buggy ride', price: null },
        { item: 'Horse riding', price: null },
        { item: 'Meals', price: null },
      ],
    },
    {
      title: 'Full Day Desert Safari',
      slug: 'full-day-desert-safari',
      shortDesc: 'A complete desert experience with dune bashing, beach activities, buffet meals, and traditional Arabian hospitality.',
      description: 'Spend a full day exploring Qatar\'s breathtaking desert landscape. This comprehensive desert safari includes thrilling dune bashing in a 4x4 vehicle, swimming, beach volleyball, and sandboarding. Enjoy a delicious buffet lunch or dinner at a comfortable desert camp equipped with AC cabins, traditional Arabic seating, and modern amenities. A music system adds to the atmosphere as you relax under the desert sky.',
      categoryId: categoryMap['desert-safari'],
      coverImage: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200',
      isFeatured: true,
      sortOrder: 2,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1000, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 600, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 350, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 325, isTotal: false },
      ],
      inclusions: [
        '4x4 vehicle with experienced driver',
        'Buffet lunch/dinner',
        'Water',
        'Bathroom facilities',
        'Beach volleyball',
        'Swimming and sandboarding',
        'AC cabin and towels',
        'Tent with traditional Arabic seating',
        'Safety equipment at camp',
        'Off-road insurance for every participant',
        'Music system',
      ],
      exclusions: [],
    },
    {
      title: 'Overnight Safari Tour',
      slug: 'overnight-safari-tour',
      shortDesc: 'Camp under the stars in Qatar\'s desert with BBQ dinner, activities, and continental breakfast.',
      description: 'Experience the magic of a night in Qatar\'s desert with our Overnight Safari Tour. After an exciting afternoon of dune bashing, sandboarding, swimming, and beach volleyball, settle in for an unforgettable evening. Enjoy a restaurant-quality open buffet BBQ meal in a traditional Arabic seating tent. Sleep under the desert stars in a comfortable sleeping bag and wake up to a delicious continental breakfast as the sun rises over the dunes.',
      categoryId: categoryMap['desert-safari'],
      coverImage: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200',
      isFeatured: true,
      sortOrder: 3,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1400, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 775, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 575, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 475, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 450, isTotal: false },
      ],
      inclusions: [
        '4x4 vehicle with experienced driver',
        'Restaurant open buffet BBQ meal',
        'Soft drinks',
        'Bathroom facilities',
        'Beach volleyball',
        'Swimming and sandboarding',
        'AC cabin and towels',
        'Traditional Arabic seating tent',
        'Camp safety equipment',
        'Off-road insurance',
        'Music system',
        'Sleeping bag',
        'Continental breakfast in the morning',
      ],
      exclusions: [],
    },
    {
      title: 'Half Day Safari With Aquarium',
      slug: 'half-day-safari-with-aquarium',
      shortDesc: 'Combine desert thrills with an aquarium visit for a unique half-day adventure.',
      description: 'Get the best of both worlds with this unique tour combining an exciting desert safari with a visit to Qatar\'s stunning aquarium. Experience dune bashing and sandboarding before heading to explore the marine wonders at the aquarium. An English-speaking guide accompanies you throughout the journey.',
      categoryId: categoryMap['desert-safari'],
      coverImage: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200',
      sortOrder: 4,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1050, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 550, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 300, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 250, isTotal: false },
      ],
      inclusions: [
        '4x4 vehicle with experienced driver',
        'Water and soft drinks',
        'Sandboarding',
        'Off-road insurance',
        'Desert camp visit',
        'English-speaking guide',
      ],
      exclusions: [
        { item: 'Camel ride (5 minutes)', price: 20 },
        { item: 'Falcon picture', price: 20 },
        { item: 'Aquarium entrance', price: 50 },
      ],
    },
    {
      title: 'Full Day Safari With Romantic Dinner',
      slug: 'full-day-safari-with-romantic-dinner',
      shortDesc: 'A romantic desert experience for couples with dune bashing and dinner at Outpost Al Barari Resort.',
      description: 'Create unforgettable memories with your special someone on this exclusive romantic desert safari. Enjoy thrilling dune bashing through Qatar\'s golden desert before heading to the luxurious Outpost Al Barari Resort for an exquisite dinner. This intimate package is designed for couples seeking a unique and romantic experience in Qatar.',
      categoryId: categoryMap['desert-safari'],
      coverImage: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200',
      sortOrder: 5,
      pricingType: 'fixed_group',
      minPersons: 2,
      maxPersons: 2,
      pricingTiers: [
        { minPersons: 2, maxPersons: 2, pricePerPerson: 2250, isTotal: true },
      ],
      inclusions: [
        '4x4 vehicle with experienced driver',
        'Water and soft drinks',
        'Off-road insurance',
        'Dinner at Outpost Al Barari Resort',
      ],
      exclusions: [],
    },
    {
      title: 'Night Safari With Bonfire',
      slug: 'night-safari-with-bonfire',
      shortDesc: 'Experience the desert at night with dune bashing, a bonfire, and stargazing from 20:00 to midnight.',
      description: 'Discover the enchanting beauty of Qatar\'s desert after dark. Starting at 8 PM, this night safari takes you on an exhilarating dune bashing adventure under the starlit sky. Visit a desert camp where you can gather around a bonfire, enjoy the peaceful desert atmosphere, and create lasting memories. The tour runs until midnight, giving you plenty of time to experience the desert\'s nocturnal magic.',
      duration: '20:00–00:00',
      categoryId: categoryMap['desert-safari'],
      coverImage: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200',
      sortOrder: 6,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 800, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 450, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 330, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 275, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 230, isTotal: false },
      ],
      inclusions: [
        '4x4 vehicle with experienced driver',
        'Water and soft drinks',
        'Off-road insurance',
        'Desert camp visit',
      ],
      exclusions: [],
    },

    // CATEGORY B: WATER SPORTS & ADVENTURE
    {
      title: 'Scuba Diving',
      slug: 'scuba-diving',
      shortDesc: 'Explore Qatar\'s underwater world with two professional dives including all equipment and transportation.',
      description: 'Dive into the crystal-clear waters of the Arabian Gulf and discover the fascinating marine life beneath the surface. This professional scuba diving experience includes two dives with full equipment, transportation to the dive site, and comprehensive insurance. Whether you\'re a beginner or experienced diver, our certified instructors ensure a safe and unforgettable underwater adventure.',
      categoryId: categoryMap['water-sports-adventure'],
      coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
      isFeatured: true,
      sortOrder: 7,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1400, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 1250, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 1200, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 1175, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 1150, isTotal: false },
      ],
      inclusions: [
        'Transportation',
        'Water and soft drinks',
        '2 dives',
        'Insurance',
        'Diving equipment',
      ],
      exclusions: [],
    },
    {
      title: 'Horse Riding Tour',
      slug: 'horse-riding-tour',
      shortDesc: 'Enjoy a 50-minute horse riding experience with professional guidance and transportation.',
      description: 'Experience the timeless tradition of horse riding in Qatar\'s beautiful landscape. This tour offers a 50-minute horse riding session suitable for riders of all experience levels. Professional guides ensure your safety and comfort throughout the experience. Transportation, refreshments, and insurance are included for a hassle-free adventure.',
      categoryId: categoryMap['water-sports-adventure'],
      coverImage: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200',
      sortOrder: 8,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 800, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 500, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 450, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 400, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 350, isTotal: false },
      ],
      inclusions: [
        '50-minute horse riding',
        'Transportation',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [],
    },
    {
      title: 'Quad Bike Tour',
      slug: 'quad-bike-tour',
      shortDesc: 'Ride powerful quad bikes across Qatar\'s desert dunes with transportation included.',
      description: 'Feel the adrenaline rush as you ride a powerful quad bike across Qatar\'s stunning desert terrain. Navigate through golden sand dunes and enjoy the freedom of off-road riding in one of the world\'s most beautiful desert landscapes. Transportation to the location and refreshments are included.',
      categoryId: categoryMap['water-sports-adventure'],
      coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200',
      sortOrder: 9,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1200, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 850, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 735, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 675, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 640, isTotal: false },
      ],
      inclusions: [
        'Transportation',
        'Water and soft drinks',
      ],
      exclusions: [
        { item: 'Camel ride', price: null },
        { item: 'Any additional activity', price: null },
      ],
    },
    {
      title: 'Jet Ski Tour',
      slug: 'jet-ski-tour',
      shortDesc: 'Thrilling jet ski adventure near Safliya Island with speedboat trip and hotel transfers.',
      description: 'Get your heart pumping with an exciting jet ski tour in the beautiful waters around Qatar. Race across the waves near the stunning Safliya Island and enjoy a speedboat trip as part of this exhilarating water adventure. Hotel pick-up and drop-off, refreshments, and insurance are all included.',
      categoryId: categoryMap['water-sports-adventure'],
      coverImage: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200',
      sortOrder: 10,
      pricingType: 'fixed_group',
      minPersons: 1,
      maxPersons: 2,
      pricingTiers: [
        { minPersons: 1, maxPersons: 2, pricePerPerson: 1200, isTotal: true },
      ],
      inclusions: [
        'Transportation from hotel',
        'Water and soft drinks',
        'Insurance',
        'Speedboat trip near Safliya Island',
      ],
      exclusions: [],
    },
    {
      title: 'Kayaking Tour',
      slug: 'kayaking-tour',
      shortDesc: 'Paddle through Qatar\'s beautiful mangroves with an English-speaking guide.',
      description: 'Explore Qatar\'s stunning mangrove forests by kayak on this guided tour. Paddle through serene waterways surrounded by lush mangroves, a unique ecosystem that thrives in Qatar\'s coastal areas. An English-speaking guide leads you through the most beautiful routes, sharing insights about the local environment. The tour includes a visit to a traditional seating area with a changing room.',
      categoryId: categoryMap['water-sports-adventure'],
      coverImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200',
      sortOrder: 11,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1000, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 600, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 450, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 430, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 420, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Water and soft drinks',
        'Traditional seating area with changing room',
        'Mangroves visit',
        'Insurance',
      ],
      exclusions: [
        { item: 'Meals', price: null },
      ],
    },
    {
      title: 'Water Sports Tour',
      slug: 'water-sports-tour',
      shortDesc: 'Complete water sports package with speedboat, banana ride, doughnut ride, and more.',
      description: 'Experience the ultimate water sports adventure in Qatar with this action-packed tour. Enjoy a variety of thrilling water activities including a speedboat ride, banana ride, and doughnut ride. Perfect for groups of up to 5 people, this tour provides everything you need for an unforgettable day on the water. Hotel transportation, refreshments, and insurance are included.',
      categoryId: categoryMap['water-sports-adventure'],
      coverImage: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200',
      sortOrder: 12,
      pricingType: 'fixed_group',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 5, pricePerPerson: 2800, isTotal: true },
      ],
      inclusions: [
        'Transportation from hotel',
        'Speedboat',
        'Banana ride',
        'Doughnut ride',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [
        { item: 'Jet ski (per hour per jet ski)', price: 600 },
        { item: 'Any other activity', price: null },
      ],
    },

    // CATEGORY C: CRUISE TOURS
    {
      title: 'Dhow Cruise Tour',
      slug: 'dhow-cruise-tour',
      shortDesc: 'Sail along Qatar\'s coast on a traditional dhow with a private crew and guide.',
      description: 'Step aboard a traditional wooden dhow and cruise along Qatar\'s stunning coastline. This private cruise comes with an experienced crew and English-speaking guide who will share stories about Qatar\'s maritime heritage. The dhow is fully equipped with modern safety equipment including life jackets, fire extinguishers, first aid supplies, and GPS navigation. Relax to music as you take in the beautiful views of the Arabian Gulf.',
      categoryId: categoryMap['cruise-tours'],
      coverImage: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200',
      isFeatured: true,
      sortOrder: 13,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 3,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1000, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 600, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
      ],
      inclusions: [
        'Hotel transportation',
        'Private dhow with experienced crew',
        'English-speaking guide',
        'Water and soft drinks',
        'Safety equipment',
        'Life jackets',
        'Fire extinguishers',
        'First aid box',
        'GPS system',
        'Insurance',
        'Bathroom facilities',
        'Music stereo system',
      ],
      exclusions: [],
    },
    {
      title: 'Dhow Cruise With Dinner (BBQ)',
      slug: 'dhow-cruise-with-dinner-bbq',
      shortDesc: 'A luxury dhow cruise featuring live BBQ dinner, safety equipment, and professional crew.',
      description: 'Enjoy a luxurious evening cruise aboard a traditional dhow while savoring a live BBQ dinner prepared on board. This premium cruise experience includes a professional crew, English-speaking guide, and a dedicated dhow helper to ensure your comfort. The vessel is equipped with comprehensive safety features including life jackets, fire extinguishers, first aid supplies, GPS navigation, life saver rings, and radio communication.',
      categoryId: categoryMap['cruise-tours'],
      coverImage: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200',
      isFeatured: true,
      sortOrder: 14,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1200, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 650, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 500, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 400, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 350, isTotal: false },
      ],
      inclusions: [
        'Hotel transportation',
        'Private dhow with experienced crew',
        'English-speaking guide',
        'Live BBQ meal',
        'Water and soft drinks',
        'Dhow helper',
        'Safety equipment',
        'Life jackets',
        'Fire extinguishers',
        'First aid box',
        'GPS system',
        'Insurance',
        'Bathroom facilities',
        'Life saver rings',
        'Radio communication',
      ],
      exclusions: [],
    },

    // CATEGORY D: CITY & CULTURAL TOURS
    {
      title: 'Museum Tour',
      slug: 'museum-tour',
      shortDesc: 'Visit Qatar\'s top museums including NMOQ, Museum of Islamic Art, and Msheireb Museums.',
      description: 'Immerse yourself in Qatar\'s rich cultural heritage with guided visits to three of the country\'s most prestigious museums. Explore the National Museum of Qatar (NMOQ), the renowned Museum of Islamic Art, and the historically significant Msheireb Museums. An English-speaking tour guide leads you through each museum, providing fascinating insights into Qatar\'s history, art, and culture.',
      duration: '4 hours',
      availability: 'Every Saturday and Monday',
      categoryId: categoryMap['cultural-historical-tours'],
      coverImage: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200',
      sortOrder: 15,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 800, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 450, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 335, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 275, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 240, isTotal: false },
      ],
      inclusions: [
        'English-speaking tour guide',
        'Water and soft drinks',
        'Insurance',
        'Transportation',
        'Museum entrance fees',
        'Guided tours at National Museum of Qatar (NMOQ)',
        'Guided tours at Museum of Islamic Art',
        'Guided tours at Msheireb Museums',
      ],
      exclusions: [],
    },
    {
      title: 'Doha City Tour',
      slug: 'doha-city-tour',
      shortDesc: 'Discover the highlights of Qatar\'s capital city with transportation and a professional guide.',
      description: 'Discover the captivating blend of modern architecture and traditional heritage that makes Doha one of the world\'s most fascinating cities. This comprehensive city tour takes you through the city\'s most iconic landmarks, bustling souqs, and stunning waterfront. Transportation, refreshments, and insurance are included for a comfortable sightseeing experience.',
      categoryId: categoryMap['city-tours'],
      coverImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      isFeatured: true,
      sortOrder: 16,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1000, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 600, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 300, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 240, isTotal: false },
      ],
      inclusions: [
        'Transportation',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [
        { item: 'Museum admission', price: 50 },
        { item: 'Other-language tour guide (per hour, minimum 4 hours)', price: 150 },
      ],
    },
    {
      title: 'City Tour With Lunch',
      slug: 'city-tour-with-lunch',
      shortDesc: 'Explore Doha\'s highlights with an included lunch or dinner for a complete experience.',
      description: 'Enjoy a comprehensive tour of Doha\'s most impressive landmarks with a delicious included meal. This tour combines sightseeing with culinary experiences, taking you through the city\'s highlights before stopping for a satisfying lunch or dinner. Transportation, refreshments, and insurance ensure a comfortable and worry-free experience.',
      categoryId: categoryMap['city-tours'],
      coverImage: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200',
      sortOrder: 17,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 900, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 520, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 350, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 300, isTotal: false },
      ],
      inclusions: [
        'Transportation',
        'Lunch or dinner',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [
        { item: 'Museum admission', price: 50 },
      ],
    },
    {
      title: 'City Tour From Sea & Land',
      slug: 'city-tour-from-sea-and-land',
      shortDesc: 'Experience Doha from both sea and land with a 2-hour cruise and 2-hour city tour.',
      description: 'See Doha from two perspectives on this unique dual experience. Begin with a 2-hour sea tour cruising along the Doha Corniche, past the stunning West Bay skyline, and around The Pearl Island\'s Porto Arabia. Then continue with a 2-hour land tour visiting Lusail Fairmont, Katara Towers, Lusail Stadium, and Stadium 974. An English-speaking guide accompanies you throughout both segments.',
      categoryId: categoryMap['city-tours'],
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
      sortOrder: 18,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1400, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 750, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 600, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 500, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 400, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Water and soft drinks',
      ],
      exclusions: [],
      itinerary: [
        {
          title: 'Sea Tour – 2 hours',
          items: ['Doha Corniche', 'West Bay skyline', 'The Pearl Island (Porto Arabia)'],
        },
        {
          title: 'Land Tour – 2 hours',
          items: ['Lusail Fairmont', 'Katara Towers', 'Lusail Stadium', 'Stadium 974'],
        },
      ],
    },
    {
      title: 'City Tour Speedboat',
      slug: 'city-tour-speedboat',
      shortDesc: 'See Doha\'s iconic skyline from a thrilling speedboat ride along the coast.',
      description: 'Experience the thrill of a speedboat tour along Qatar\'s stunning coastline. Race past the Doha Corniche, take in the towering West Bay skyline, and cruise around The Pearl Island\'s Porto Arabia marina. This high-energy tour offers breathtaking views of Doha from the water with an unforgettable adrenaline rush.',
      categoryId: categoryMap['city-tours'],
      coverImage: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200',
      sortOrder: 19,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1150, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 600, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 500, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 400, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 300, isTotal: false },
      ],
      inclusions: [
        'Transportation',
        'Water and soft drinks',
      ],
      exclusions: [],
      itinerary: [
        {
          title: 'Speedboat Route',
          items: ['Doha Corniche', 'West Bay skyline', 'The Pearl Island (Porto Arabia)'],
        },
      ],
    },
    {
      title: 'Grand Doha City Tour',
      slug: 'grand-doha-city-tour',
      shortDesc: 'A comprehensive tour of Doha covering all major landmarks with an English-speaking guide.',
      description: 'Experience the ultimate Doha sightseeing tour covering all the major landmarks and attractions of Qatar\'s vibrant capital. An English-speaking guide leads you through the city\'s most impressive sites, sharing fascinating stories and insights about Doha\'s rapid transformation from a quiet fishing village to a world-class metropolis.',
      categoryId: categoryMap['city-tours'],
      coverImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200',
      sortOrder: 20,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 850, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 475, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 375, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 350, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 300, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [
        { item: 'Museum admission', price: 50 },
      ],
    },
    {
      title: 'North Of Qatar Tour (Historical Trip)',
      slug: 'north-of-qatar-tour',
      shortDesc: 'Explore the historic northern region of Qatar with lunch and an English-speaking guide.',
      description: 'Journey to the northern reaches of Qatar and discover the country\'s fascinating historical heritage. This tour takes you through ancient ruins, traditional villages, and historically significant sites that tell the story of Qatar\'s past. An English-speaking guide provides rich commentary throughout the trip, and a delicious lunch is included.',
      categoryId: categoryMap['cultural-historical-tours'],
      coverImage: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200',
      sortOrder: 21,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1000, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 525, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 350, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 300, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Water and soft drinks',
        'Lunch',
      ],
      exclusions: [],
    },
    {
      title: 'Cultural Tour',
      slug: 'cultural-tour',
      shortDesc: 'Discover Qatar\'s traditions, art, and living heritage with expert cultural guides.',
      description: 'Dive deep into Qatar\'s rich cultural tapestry on this immersive cultural tour. Visit traditional souqs, cultural centers, and heritage sites that showcase the country\'s traditions, arts, and way of life. An English-speaking guide shares insights into Qatari customs, hospitality, and the nation\'s journey from pearl diving to global prominence.',
      categoryId: categoryMap['cultural-historical-tours'],
      coverImage: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200',
      sortOrder: 22,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1000, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 550, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 400, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 350, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 300, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [
        { item: 'Museum admission', price: 50 },
      ],
    },
    {
      title: 'West Coast Tour',
      slug: 'west-coast-tour',
      shortDesc: 'Explore Qatar\'s scenic western coastline with stunning views and cultural stops.',
      description: 'Discover the natural beauty and cultural treasures along Qatar\'s western coast. This scenic tour takes you through picturesque coastal landscapes, traditional fishing villages, and stunning viewpoints overlooking the Arabian Gulf. An English-speaking guide shares fascinating insights about the region\'s history and ecology.',
      categoryId: categoryMap['city-tours'],
      coverImage: '/tours/west-coast-tour.jpg',
      sortOrder: 23,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 900, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 490, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 350, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 300, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 260, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [],
    },
    {
      title: 'North Of Qatar With Kayak Tour',
      slug: 'north-of-qatar-with-kayak-tour',
      shortDesc: 'Combine northern Qatar sightseeing with a mangrove kayaking adventure and lunch.',
      description: 'Experience the best of northern Qatar with this unique tour combining historical sightseeing and mangrove kayaking. Explore the northern region\'s heritage sites before paddling through serene mangrove forests in a guided kayaking session. An English-speaking guide accompanies you throughout, and a delicious lunch is included.',
      categoryId: categoryMap['cultural-historical-tours'],
      coverImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200',
      sortOrder: 24,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 1400, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 800, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 600, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 550, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 520, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        'Transportation',
        'Mangrove kayaking',
        'Water and soft drinks',
        'Lunch',
      ],
      exclusions: [],
    },
    {
      title: 'Camel Race Tour',
      slug: 'camel-race-tour',
      shortDesc: 'Witness the thrilling traditional camel races in a 4x4 vehicle with a professional guide.',
      description: 'Experience one of Qatar\'s most exciting traditional sports – camel racing. Watch as magnificent camels thunder down the racetrack in this uniquely Qatari spectacle. Travel in a comfortable 4x4 vehicle alongside the racetrack to follow the action. An English-speaking guide explains the sport\'s traditions, the training of the camels, and its cultural significance in Qatari heritage.',
      categoryId: categoryMap['cultural-historical-tours'],
      coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200',
      sortOrder: 25,
      pricingType: 'per_person',
      minPersons: 1,
      maxPersons: 5,
      pricingTiers: [
        { minPersons: 1, maxPersons: 1, pricePerPerson: 850, isTotal: false },
        { minPersons: 2, maxPersons: 2, pricePerPerson: 625, isTotal: false },
        { minPersons: 3, maxPersons: 3, pricePerPerson: 580, isTotal: false },
        { minPersons: 4, maxPersons: 4, pricePerPerson: 550, isTotal: false },
        { minPersons: 5, maxPersons: 5, pricePerPerson: 525, isTotal: false },
      ],
      inclusions: [
        'English-speaking guide',
        '4x4 transportation',
        'Water and soft drinks',
        'Insurance',
      ],
      exclusions: [],
    },
  ];

  for (const tourData of tours) {
    const { pricingTiers, inclusions, exclusions, itinerary, ...tour } = tourData;

    const existing = await prisma.tour.findUnique({ where: { slug: tour.slug } });
    if (existing) {
      console.log(`  ⏭️  Tour "${tour.title}" already exists, skipping`);
      continue;
    }

    const created = await prisma.tour.create({
      data: {
        ...tour,
        pricingTiers: {
          create: pricingTiers,
        },
        inclusions: inclusions ? {
          create: inclusions.map((item, idx) => ({ item, sortOrder: idx })),
        } : undefined,
        exclusions: exclusions && exclusions.length > 0 ? {
          create: exclusions.map((exc, idx) => ({
            item: exc.item,
            price: exc.price,
            sortOrder: idx,
          })),
        } : undefined,
        itineraryItems: itinerary ? {
          create: itinerary.map((item, idx) => ({
            title: item.title,
            items: JSON.stringify(item.items),
            sortOrder: idx,
          })),
        } : undefined,
      },
    });

    console.log(`  ✅ Created tour: ${created.title}`);
  }

  console.log('✅ All 25 tours created');

  // Create sample testimonials
  const testimonials = [
    {
      name: 'Sample Reviewer - Sarah M.',
      country: 'United Kingdom',
      rating: 5,
      comment: 'An absolutely incredible desert safari experience! The dune bashing was thrilling and the camp setup was stunning. Our guide was knowledgeable and friendly. Highly recommended! [Sample review - replace with real customer reviews]',
      tourName: 'Full Day Desert Safari',
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Sample Reviewer - Ahmed K.',
      country: 'United Arab Emirates',
      rating: 5,
      comment: 'The dhow cruise was magical. The BBQ dinner was delicious and the views of Doha\'s skyline at sunset were breathtaking. The crew was professional and made us feel very welcome. [Sample review - replace with real customer reviews]',
      tourName: 'Dhow Cruise With Dinner (BBQ)',
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Sample Reviewer - Maria L.',
      country: 'Spain',
      rating: 5,
      comment: 'The museum tour was fascinating! Our guide brought Qatar\'s history to life with incredible stories. The National Museum of Qatar is a must-visit. Great organization throughout. [Sample review - replace with real customer reviews]',
      tourName: 'Museum Tour',
      isApproved: true,
      isFeatured: true,
    },
    {
      name: 'Sample Reviewer - James R.',
      country: 'Australia',
      rating: 4,
      comment: 'Fantastic kayaking experience through the mangroves. The scenery was beautiful and our guide was excellent. A unique way to experience Qatar\'s natural beauty. [Sample review - replace with real customer reviews]',
      tourName: 'Kayaking Tour',
      isApproved: true,
      isFeatured: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('✅ Sample testimonials created');

  // Create default website settings
  const settings = [
    { key: 'site_name', value: 'Imperial Tours Qatar', group: 'general' },
    { key: 'site_tagline', value: 'Discover Qatar With Imperial Tours', group: 'general' },
    { key: 'currency', value: 'QAR', group: 'general' },
    { key: 'currency_symbol', value: 'QAR', group: 'general' },
    { key: 'phone', value: '', group: 'contact' },
    { key: 'email', value: 'info@imperialhospitality.com.qa', group: 'contact' },
    { key: 'address', value: '', group: 'contact' },
    { key: 'whatsapp', value: '', group: 'contact' },
    { key: 'google_maps_url', value: '', group: 'contact' },
    { key: 'facebook', value: '', group: 'social' },
    { key: 'instagram', value: '', group: 'social' },
    { key: 'twitter', value: '', group: 'social' },
    { key: 'youtube', value: '', group: 'social' },
    { key: 'tiktok', value: '', group: 'social' },
    { key: 'linkedin', value: '', group: 'social' },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: s,
    });
  }
  console.log('✅ Default settings created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Admin login: admin@imperialtours.qa / changeme123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
