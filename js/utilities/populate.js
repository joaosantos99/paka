import LocalStorageCRUD from '/js/utilities/crud.js';
import FileStorage from '/js/utilities/fileStorage.js';

export const populateFileStorage = async () => {
  const images = [
    // Main images
    { path: '/img/404-bg.png', name: '404-bg.png' },
    { path: '/img/black-logo.svg', name: 'black-logo.svg' },
    { path: '/img/cactus-img.png', name: 'cactus-img.png' },
    { path: '/img/cactus-img1.png', name: 'cactus-img1.png' },
    { path: '/img/contact-hero-bg.png', name: 'contact-hero-bg.png' },
    { path: '/img/desert-hero-bg.png', name: 'desert-hero-bg.png' },
    { path: '/img/favicon.svg', name: 'favicon.svg' },
    { path: '/img/feature-card-img1.png', name: 'feature-card-img1.png' },
    { path: '/img/feature-card-img2.png', name: 'feature-card-img2.png' },
    { path: '/img/feature-card-img3.png', name: 'feature-card-img3.png' },
    { path: '/img/feature-card-img4.png', name: 'feature-card-img4.png' },
    { path: '/img/forest-hero-bg.png', name: 'forest-hero-bg.png' },
    { path: '/img/home-hero-bg.png', name: 'home-hero-bg.png' },
    { path: '/img/light-logo.svg', name: 'light-logo.svg' },
    { path: '/img/login-hero-bg.png', name: 'login-hero-bg.png' },
    { path: '/img/map.png', name: 'map.png' },
    { path: '/img/mountain-hero-bg.png', name: 'mountain-hero-bg.png' },
    { path: '/img/mountain-img.png', name: 'mountain-img.png' },
    { path: '/img/mountain-img-light.png', name: 'mountain-img-light.png' },
    { path: '/img/pack-hero-bg.png', name: 'pack-hero-bg.png' },
    { path: '/img/profile-card-img.png', name: 'profile-card-img.png' },
    { path: '/img/tree-img.png', name: 'tree-img.png' },
    { path: '/img/tree-img1.png', name: 'tree-img1.png' },
    { path: '/img/upload-img.png', name: 'upload-img.png' },
    { path: '/img/user-profile.svg', name: 'user-profile.svg' },
    { path: '/img/water-hero-bg.png', name: 'water-hero-bg.png' },
    { path: '/img/water-img.png', name: 'water-img.png' },

    // Pack images
    { path: '/img/packs/1.png', name: 'pack-1.png' },
    { path: '/img/packs/2.png', name: 'pack-2.png' },
    { path: '/img/packs/3.png', name: 'pack-3.png' },
    { path: '/img/packs/4.png', name: 'pack-4.png' },
    { path: '/img/packs/5.png', name: 'pack-5.png' },
    { path: '/img/packs/6.png', name: 'pack-6.png' },
    { path: '/img/packs/7.png', name: 'pack-7.png' },
    { path: '/img/packs/8.png', name: 'pack-8.png' },
    { path: '/img/packs/9.png', name: 'pack-9.png' },

    // Icons
    { path: '/img/icon/ic-cactus.svg', name: 'ic-cactus.svg' },
    { path: '/img/icon/ic-close.svg', name: 'ic-close.svg' },
    { path: '/img/icon/ic-delete.svg', name: 'ic-delete.svg' },
    { path: '/img/icon/ic-edit.svg', name: 'ic-edit.svg' },
    { path: '/img/icon/ic-empty-globe.svg', name: 'ic-empty-globe.svg' },
    { path: '/img/icon/ic-eye-closed.svg', name: 'ic-eye-closed.svg' },
    { path: '/img/icon/ic-fb.svg', name: 'ic-fb.svg' },
    { path: '/img/icon/ic-filled-globe.svg', name: 'ic-filled-globe.svg' },
    { path: '/img/icon/ic-insta.svg', name: 'ic-insta.svg' },
    { path: '/img/icon/ic-mountain.svg', name: 'ic-mountain.svg' },
    { path: '/img/icon/ic-toggle-light.svg', name: 'ic-toggle-light.svg' },
    { path: '/img/icon/ic-toggle.svg', name: 'ic-toggle.svg' },
    { path: '/img/icon/ic-tree.svg', name: 'ic-tree.svg' },
    { path: '/img/icon/ic-twitter.svg', name: 'ic-twitter.svg' },
    { path: '/img/icon/ic-user-light.svg', name: 'ic-user-light.svg' },
    { path: '/img/icon/ic-user.svg', name: 'ic-user.svg' },
    { path: '/img/icon/ic-water.svg', name: 'ic-water.svg' }
  ];

  const fileMapping = {};

  for (const image of images) {
    try {
      const response = await fetch(image.path);
      if (response.ok) {
        const blob = await response.blob();
        const file = new File([blob], image.name, { type: blob.type });
        const fileKey = await FileStorage.saveFile(file);
        fileMapping[image.name] = fileKey;
        console.log(`Uploaded: ${image.name} with key: ${fileKey}`);
      } else {
        console.warn(`Failed to fetch ${image.path}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error uploading ${image.name}:`, error);
    }
  }

  console.log(`Successfully uploaded ${Object.keys(fileMapping).length} images to file storage`);
  return fileMapping;
};

export const populate = async () => {
  // First populate file storage with images
  const fileMapping = await populateFileStorage();

  const defaultCategories = [
    {
      id: 1,
      name: "Mountains",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
      icon: fileMapping['ic-mountain.svg'] || "file_1749914661215_ic-mountain.svg",
      numberOfPacks: 0,
      deleted: false
    },
    {
      id: 2,
      name: "Water",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
      icon: fileMapping['ic-water.svg'] || "file_1749914661215_ic-water.svg",
      numberOfPacks: 0,
      deleted: false
    },
    {
      id: 3,
      name: "Desert",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
      icon: fileMapping['ic-cactus.svg'] || "file_1749914775085_ic-cactus.svg",
      numberOfPacks: 0,
      deleted: false
    },
    {
      id: 4,
      name: "Forest",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: fileMapping['forest-hero-bg.png'] || "file_1749914719945_forest-hero-bg.png",
      icon: fileMapping['ic-tree.svg'] || "file_1749914719948_ic-tree.svg",
      numberOfPacks: 0,
      deleted: false
    }
  ];

  LocalStorageCRUD.update('categories', defaultCategories);
  LocalStorageCRUD.update('categories-index', 4);

  const defaultFlights = [
    {
      id: 1,
      departure: "Lisbon",
      departureDate: "2025-06-15",
      departureTime: "10:30",
      arrival: "Paris",
      arrivalDate: "2025-06-15",
      arrivalTime: "13:45",
      price: "250",
      deleted: false
    },
    {
      id: 2,
      departure: "Madrid",
      departureDate: "2025-06-18",
      departureTime: "09:15",
      arrival: "Rome",
      arrivalDate: "2025-06-18",
      arrivalTime: "11:30",
      price: "180",
      deleted: false
    },
    {
      id: 3,
      departure: "Porto",
      departureDate: "2025-06-19",
      departureTime: "13:36",
      arrival: "Cairo",
      arrivalDate: "2025-06-20",
      arrivalTime: "16:37",
      price: "1000",
      deleted: false
    },
    {
      id: 4,
      departure: "Barcelona",
      departureDate: "2025-06-22",
      departureTime: "14:20",
      arrival: "Amsterdam",
      arrivalDate: "2025-06-22",
      arrivalTime: "16:45",
      price: "220",
      deleted: false
    },
    {
      id: 5,
      departure: "Zurich",
      departureDate: "2025-07-01",
      departureTime: "08:00",
      arrival: "Zermatt",
      arrivalDate: "2025-07-01",
      arrivalTime: "09:30",
      price: "150",
      deleted: false
    },
    {
      id: 6,
      departure: "Athens",
      departureDate: "2025-08-15",
      departureTime: "10:00",
      arrival: "Santorini",
      arrivalDate: "2025-08-15",
      arrivalTime: "10:45",
      price: "120",
      deleted: false
    },
    {
      id: 7,
      departure: "Casablanca",
      departureDate: "2025-09-10",
      departureTime: "09:00",
      arrival: "Marrakech",
      arrivalDate: "2025-09-10",
      arrivalTime: "10:00",
      price: "100",
      deleted: false
    },
    {
      id: 8,
      departure: "São Paulo",
      departureDate: "2025-10-05",
      departureTime: "08:00",
      arrival: "Manaus",
      arrivalDate: "2025-10-05",
      arrivalTime: "10:30",
      price: "300",
      deleted: false
    },
    {
      id: 9,
      departure: "Delhi",
      departureDate: "2025-11-01",
      departureTime: "07:00",
      arrival: "Kathmandu",
      arrivalDate: "2025-11-01",
      arrivalTime: "09:00",
      price: "250",
      deleted: false
    },
    {
      id: 10,
      departure: "Miami",
      departureDate: "2025-12-20",
      departureTime: "09:00",
      arrival: "Kingston",
      arrivalDate: "2025-12-20",
      arrivalTime: "10:30",
      price: "280",
      deleted: false
    },
    {
      id: 11,
      departure: "Santiago",
      departureDate: "2026-01-15",
      departureTime: "08:00",
      arrival: "Calama",
      arrivalDate: "2026-01-15",
      arrivalTime: "10:00",
      price: "200",
      deleted: false
    },
    {
      id: 12,
      departure: "San José",
      departureDate: "2026-02-01",
      departureTime: "07:00",
      arrival: "Monteverde",
      arrivalDate: "2026-02-01",
      arrivalTime: "08:30",
      price: "150",
      deleted: false
    },
    {
      id: 13,
      departure: "Vancouver",
      departureDate: "2026-03-15",
      departureTime: "08:00",
      arrival: "Calgary",
      arrivalDate: "2026-03-15",
      arrivalTime: "10:00",
      price: "250",
      deleted: false
    },
    {
      id: 14,
      departure: "Sydney",
      departureDate: "2026-04-01",
      departureTime: "07:00",
      arrival: "Cairns",
      arrivalDate: "2026-04-01",
      arrivalTime: "09:30",
      price: "300",
      deleted: false
    },
    {
      id: 15,
      departure: "Santiago",
      departureDate: "2026-05-01",
      departureTime: "08:00",
      arrival: "Punta Arenas",
      arrivalDate: "2026-05-01",
      arrivalTime: "11:00",
      price: "350",
      deleted: false
    },
    {
      id: 16,
      departure: "Casablanca",
      departureDate: "2026-06-01",
      departureTime: "09:00",
      arrival: "Marrakech",
      arrivalDate: "2026-06-01",
      arrivalTime: "10:00",
      price: "100",
      deleted: false
    },
    {
      id: 17,
      departure: "Lucerne",
      departureDate: "2025-07-07",
      departureTime: "14:00",
      arrival: "Zurich",
      arrivalDate: "2025-07-07",
      arrivalTime: "15:30",
      price: "120",
      deleted: false
    },
    {
      id: 18,
      departure: "Crete",
      departureDate: "2025-08-22",
      departureTime: "16:00",
      arrival: "Athens",
      arrivalDate: "2025-08-22",
      arrivalTime: "17:30",
      price: "150",
      deleted: false
    },
    {
      id: 19,
      departure: "Fez",
      departureDate: "2025-09-17",
      departureTime: "10:00",
      arrival: "Casablanca",
      arrivalDate: "2025-09-17",
      arrivalTime: "11:30",
      price: "90",
      deleted: false
    },
    {
      id: 20,
      departure: "Rio Negro",
      departureDate: "2025-10-15",
      departureTime: "13:00",
      arrival: "Manaus",
      arrivalDate: "2025-10-15",
      arrivalTime: "14:30",
      price: "180",
      deleted: false
    },
    {
      id: 21,
      departure: "Everest Base Camp",
      departureDate: "2025-11-14",
      departureTime: "08:00",
      arrival: "Kathmandu",
      arrivalDate: "2025-11-14",
      arrivalTime: "10:30",
      price: "200",
      deleted: false
    },
    {
      id: 22,
      departure: "Cuba",
      departureDate: "2025-12-30",
      departureTime: "15:00",
      arrival: "Miami",
      arrivalDate: "2025-12-30",
      arrivalTime: "16:30",
      price: "250",
      deleted: false
    },
    {
      id: 23,
      departure: "Salar de Atacama",
      departureDate: "2026-01-22",
      departureTime: "11:00",
      arrival: "Calama",
      arrivalDate: "2026-01-22",
      arrivalTime: "12:30",
      price: "120",
      deleted: false
    },
    {
      id: 24,
      departure: "Manuel Antonio",
      departureDate: "2026-02-10",
      departureTime: "14:00",
      arrival: "San José",
      arrivalDate: "2026-02-10",
      arrivalTime: "15:30",
      price: "100",
      deleted: false
    },
    {
      id: 25,
      departure: "Lake Louise",
      departureDate: "2026-03-22",
      departureTime: "13:00",
      arrival: "Calgary",
      arrivalDate: "2026-03-22",
      arrivalTime: "14:30",
      price: "180",
      deleted: false
    },
    {
      id: 26,
      departure: "Hamilton Island",
      departureDate: "2026-04-10",
      departureTime: "15:00",
      arrival: "Sydney",
      arrivalDate: "2026-04-10",
      arrivalTime: "17:30",
      price: "280",
      deleted: false
    },
    {
      id: 27,
      departure: "El Calafate",
      departureDate: "2026-05-15",
      departureTime: "10:00",
      arrival: "Santiago",
      arrivalDate: "2026-05-15",
      arrivalTime: "12:30",
      price: "220",
      deleted: false
    },
    {
      id: 28,
      departure: "Sahara Desert",
      departureDate: "2026-06-12",
      departureTime: "09:00",
      arrival: "Marrakech",
      arrivalDate: "2026-06-12",
      arrivalTime: "10:30",
      price: "110",
      deleted: false
    }
  ];

  LocalStorageCRUD.update('flights', defaultFlights);
  LocalStorageCRUD.update('flights-index', 28);

  const defaultPacks = [
    {
      id: 1,
      name: "Alpine Adventure",
      price: "1200",
      categories: ["Mountains"],
      title: "Swiss Alps Explorer",
      description: "Experience the majestic Swiss Alps with guided hiking, mountain biking, and authentic Swiss cuisine.",
      startDate: "2025-07-01",
      endDate: "2025-07-07",
      featuredImage: fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
      images: [
        fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
        fileMapping['pack-1.png'] || "file_1749913782582_pack-1.png"
      ],
      stops: ["Zermatt", "Interlaken", "Lucerne"],
      difficulty: "Medium",
      continent: "Europe",
      slots: 12,
      deleted: false
    },
    {
      id: 2,
      name: "Mediterranean Cruise",
      price: "2500",
      categories: ["Water"],
      title: "Greek Islands Discovery",
      description: "Sail through the crystal-clear waters of the Aegean Sea, visiting ancient ruins and beautiful beaches.",
      startDate: "2025-08-15",
      endDate: "2025-08-22",
      featuredImage: fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
      images: [
        fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
        fileMapping['pack-2.png'] || "file_1749914661212_pack-2.png"
      ],
      stops: ["Santorini", "Mykonos", "Crete"],
      difficulty: "Easy",
      continent: "Europe",
      slots: 20,
      deleted: false
    },
    {
      id: 3,
      name: "Sahara Expedition",
      price: "1800",
      categories: ["Desert"],
      title: "Moroccan Desert Adventure",
      description: "Journey through the Sahara Desert, experience Berber culture, and camp under the stars.",
      startDate: "2025-09-10",
      endDate: "2025-09-17",
      featuredImage: fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
      images: [
        fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
        fileMapping['pack-3.png'] || "file_1749914775083_pack-3.png"
      ],
      stops: ["Marrakech", "Merzouga", "Fez"],
      difficulty: "Hard",
      continent: "Africa",
      slots: 8,
      deleted: false
    },
    {
      id: 4,
      name: "Amazon Explorer",
      price: "2200",
      categories: ["Forest"],
      title: "Brazilian Rainforest Journey",
      description: "Discover the wonders of the Amazon rainforest with expert guides and unique wildlife encounters.",
      startDate: "2025-10-05",
      endDate: "2025-10-15",
      featuredImage: fileMapping['forest-hero-bg.png'] || "file_1749914719945_forest-hero-bg.png",
      images: [
        fileMapping['forest-hero-bg.png'] || "file_1749914719945_forest-hero-bg.png",
        fileMapping['pack-4.png'] || "file_1749914719945_pack-4.png"
      ],
      stops: ["Manaus", "Amazon Lodge", "Rio Negro"],
      difficulty: "Hard",
      continent: "South America",
      slots: 10,
      deleted: false
    },
    {
      id: 5,
      name: "Himalayan Trek",
      price: "1500",
      categories: ["Mountains"],
      title: "Nepal Mountain Experience",
      description: "Trek through the Himalayas, visit ancient monasteries, and experience local culture.",
      startDate: "2025-11-01",
      endDate: "2025-11-14",
      featuredImage: fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
      images: [
        fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
        fileMapping['pack-5.png'] || "file_1749913782582_pack-5.png"
      ],
      stops: ["Kathmandu", "Namche Bazaar", "Everest Base Camp"],
      difficulty: "Hard",
      continent: "Asia",
      slots: 15,
      deleted: false
    },
    {
      id: 6,
      name: "Caribbean Paradise",
      price: "2800",
      categories: ["Water"],
      title: "Island Hopping Adventure",
      description: "Explore multiple Caribbean islands, enjoy pristine beaches, and vibrant local culture.",
      startDate: "2025-12-20",
      endDate: "2025-12-30",
      featuredImage: fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
      images: [
        fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
        fileMapping['pack-6.png'] || "file_1749914661212_pack-6.png"
      ],
      stops: ["Jamaica", "Bahamas", "Cuba"],
      difficulty: "Easy",
      continent: "North America",
      slots: 16,
      deleted: false
    },
    {
      id: 7,
      name: "Atacama Discovery",
      price: "1900",
      categories: ["Desert"],
      title: "Chilean Desert Experience",
      description: "Explore the driest non-polar desert in the world, stargaze, and visit unique landscapes.",
      startDate: "2026-01-15",
      endDate: "2026-01-22",
      featuredImage: fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
      images: [
        fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
        fileMapping['pack-7.png'] || "file_1749914775083_pack-7.png"
      ],
      stops: ["San Pedro de Atacama", "Valle de la Luna", "Salar de Atacama"],
      difficulty: "Medium",
      continent: "South America",
      slots: 12,
      deleted: false
    },
    {
      id: 8,
      name: "Costa Rican Rainforest",
      price: "1600",
      categories: ["Forest"],
      title: "Central American Adventure",
      description: "Experience the rich biodiversity of Costa Rica's rainforests and cloud forests.",
      startDate: "2026-02-01",
      endDate: "2026-02-10",
      featuredImage: fileMapping['forest-hero-bg.png'] || "file_1749914719945_forest-hero-bg.png",
      images: [
        fileMapping['forest-hero-bg.png'] || "file_1749914719945_forest-hero-bg.png",
        fileMapping['pack-8.png'] || "file_1749914719945_pack-8.png"
      ],
      stops: ["Monteverde", "Arenal", "Manuel Antonio"],
      difficulty: "Medium",
      budgetRange: "Standard",
      slots: 14,
      deleted: false
    },
    {
      id: 9,
      name: "Rocky Mountain Explorer",
      price: "1400",
      categories: ["Mountains"],
      title: "Canadian Rockies Journey",
      description: "Discover the stunning landscapes of the Canadian Rockies with guided hikes and wildlife viewing.",
      startDate: "2026-03-15",
      endDate: "2026-03-22",
      featuredImage: fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
      images: [
        fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
        fileMapping['pack-9.png'] || "file_1749913782582_pack-9.png"
      ],
      stops: ["Banff", "Jasper", "Lake Louise"],
      difficulty: "Medium",
      budgetRange: "Standard",
      slots: 18,
      deleted: false
    },
    {
      id: 10,
      name: "Great Barrier Reef",
      price: "2300",
      categories: ["Water"],
      title: "Australian Marine Adventure",
      description: "Explore the world's largest coral reef system with diving, snorkeling, and island hopping.",
      startDate: "2026-04-01",
      endDate: "2026-04-10",
      featuredImage: fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
      images: [
        fileMapping['water-hero-bg.png'] || "file_1749914661212_water-hero-bg.png",
        fileMapping['pack-1.png'] || "file_1749914661212_pack-1.png"
      ],
      stops: ["Cairns", "Whitsunday Islands", "Hamilton Island"],
      difficulty: "Easy",
      continent: "Oceania",
      slots: 12,
      deleted: false
    },
    {
      id: 11,
      name: "Patagonian Trek",
      price: "2100",
      categories: ["Mountains", "Forest"],
      title: "Southern Chile Adventure",
      description: "Hike through the stunning landscapes of Patagonia, including Torres del Paine National Park.",
      startDate: "2026-05-01",
      endDate: "2026-05-15",
      featuredImage: fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
      images: [
        fileMapping['mountain-hero-bg.png'] || "file_1749913782582_mountain-hero-bg.png",
        fileMapping['pack-2.png'] || "file_1749913782582_pack-2.png"
      ],
      stops: ["Puerto Natales", "Torres del Paine", "El Calafate"],
      difficulty: "Hard",
      continent: "South America",
      slots: 10,
      deleted: false
    },
    {
      id: 12,
      name: "Sahara & Atlas Mountains",
      price: "1700",
      categories: ["Desert", "Mountains"],
      title: "Moroccan Multi-Adventure",
      description: "Combine desert exploration with mountain trekking in the Atlas Mountains.",
      startDate: "2026-06-01",
      endDate: "2026-06-12",
      featuredImage: fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
      images: [
        fileMapping['desert-hero-bg.png'] || "file_1749914775083_desert-hero-bg.png",
        fileMapping['pack-3.png'] || "file_1749914775083_pack-3.png"
      ],
      stops: ["Marrakech", "Atlas Mountains", "Sahara Desert"],
      difficulty: "Hard",
      continent: "Africa",
      slots: 12,
      deleted: false
    }
  ];

  LocalStorageCRUD.update('packs', defaultPacks);
  LocalStorageCRUD.update('packs-index', 12);

  const defaultUsers = [
    {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      password: "password123",
      isAdmin: true,
      deleted: false
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      isAdmin: false,
      deleted: false
    },
  ];

  LocalStorageCRUD.update('users', defaultUsers);
  LocalStorageCRUD.update('users-index', 2);
}

// Helper function to get file mapping for use in other parts of the application
export const getFileMapping = async () => {
  const files = await FileStorage.listFiles();
  const mapping = {};

  for (const file of files) {
    // Extract the original filename from the key
    const originalName = file.key.split('_').slice(2).join('_');
    mapping[originalName] = file.key;
  }

  return mapping;
};

// Convenience function to populate everything
export const populateAll = async () => {
  console.log('Starting population of file storage and default data...');
  await populate();
  console.log('Population completed successfully!');

  window.location.reload();
};