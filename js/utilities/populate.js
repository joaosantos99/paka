import LocalStorageCRUD from '/js/utilities/crud.js';
import FileStorage from '/js/utilities/fileStorage.js';

export const populateFileStorage = async () => {
  const images = [
    // Main images

    // Category images
    { path: '/img/mountain-hero-bg.png', name: 'mountain-hero-bg.png' },
    { path: '/img/water-hero-bg.png', name: 'water-hero-bg.png' },
    { path: '/img/desert-hero-bg.png', name: 'desert-hero-bg.png' },
    { path: '/img/forest-hero-bg.png', name: 'forest-hero-bg.png' },

    // Pack single images
    { path: '/img/singlePack/single-pack-01.png', name: 'single-pack-01.png' },
    { path: '/img/singlePack/single-pack-02.png', name: 'single-pack-02.png' },

    // Pack images
    // Mountain packs
    { path: '/img/defaultPacks/alpine-adventure.jpg', name: 'alpine-adventure.jpg' },
    { path: '/img/defaultPacks/nepal-mountain-experience.jpg', name: 'nepal-mountain-experience.jpg' },
    { path: '/img/defaultPacks/rocky-mountain-explorer.jpg', name: 'rocky-mountain-explorer.jpg' },
    { path: '/img/defaultPacks/patagonian-trek.jpg', name: 'patagonian-trek.jpg' },
    { path: '/img/defaultPacks/sahara-atlas-mountains.jpg', name: 'sahara-atlas-mountains.jpg' },
    { path: '/img/defaultPacks/alpine-ski-adventure.jpg', name: 'alpine-ski-adventure.jpg' },
    { path: '/img/defaultPacks/andes-expedition.jpg', name: 'andes-expedition.jpg' },
    { path: '/img/defaultPacks/caucasus-mountains.jpg', name: 'caucasus-mountains.jpg' },
    { path: '/img/defaultPacks/japanese-alps.jpg', name: 'japanese-alps.jpg' },
    { path: '/img/defaultPacks/new-zealand-alps.jpg', name: 'new-zealand-alps.jpg' },
    // Water packs
    { path: '/img/defaultPacks/mediterranean-cruise.jpg', name: 'mediterranean-cruise.jpg' },
    { path: '/img/defaultPacks/caribbean-paradise.jpg', name: 'caribbean-paradise.jpg' },
    { path: '/img/defaultPacks/great-barrier-reef.jpg', name: 'great-barrier-reef.jpg' },
    { path: '/img/defaultPacks/maldives-escape.jpg', name: 'maldives-escape.jpg' },
    { path: '/img/defaultPacks/norwegian-fjords.jpg', name: 'norwegian-fjords.jpg' },
    { path: '/img/defaultPacks/galapagos-islands.jpg', name: 'galapagos-islands.jpg' },
    { path: '/img/defaultPacks/croatian-coast.jpg', name: 'croatian-coast.jpg' },
    { path: '/img/defaultPacks/seychelles-islands.jpg', name: 'seychelles-islands.jpg' },
    { path: '/img/defaultPacks/fiji-islands.jpg', name: 'fiji-islands.jpg' },
    // Forest packs
    { path: '/img/defaultPacks/amazon-explorer.jpg', name: 'amazon-explorer.jpg' },
    { path: '/img/defaultPacks/costa-rican-rainforest.jpg', name: 'costa-rican-rainforest.jpg' },
    { path: '/img/defaultPacks/borneo-rainforest.jpg', name: 'borneo-rainforest.jpg' },
    { path: '/img/defaultPacks/congo-basin.jpg', name: 'congo-basin.jpg' },
    { path: '/img/defaultPacks/pacific-northwest.jpg', name: 'pacific-northwest.jpg' },
    { path: '/img/defaultPacks/tasmanian-wilderness.jpg', name: 'tasmanian-wilderness.jpg' },
    { path: '/img/defaultPacks/black-forest.jpg', name: 'black-forest.jpg' },
    { path: '/img/defaultPacks/daintree-rainforest.jpg', name: 'daintree-rainforest.jpg' },
    { path: '/img/defaultPacks/bialowieza-forest.jpg', name: 'bialowieza-forest.jpg' },
    // Desert packs
    { path: '/img/defaultPacks/sahara-expedition.jpg', name: 'sahara-expedition.jpg' },
    { path: '/img/defaultPacks/atacama-discovery.jpg', name: 'atacama-discovery.jpg' },
    { path: '/img/defaultPacks/namib-desert.jpg', name: 'namib-desert.jpg' },
    { path: '/img/defaultPacks/gobi-desert.jpg', name: 'gobi-desert.jpg' },
    { path: '/img/defaultPacks/arabian-desert.jpg', name: 'arabian-desert.jpg' },
    { path: '/img/defaultPacks/sonoran-desert.jpg', name: 'sonoran-desert.jpg' },
    { path: '/img/defaultPacks/thar-desert.jpg', name: 'thar-desert.jpg' },
    { path: '/img/defaultPacks/simpson-desert.jpg', name: 'simpson-desert.jpg' },
    { path: '/img/defaultPacks/kalahari-desert.jpg', name: 'kalahari-desert.jpg' },

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
    // Mountains Category (9+ packs)
    {
      id: 1,
      name: "Alpine Adventure",
      price: "1200",
      categories: ["Mountains"],
      title: "Swiss Alps Explorer",
      description: "Experience the majestic Swiss Alps with guided hiking, mountain biking, and authentic Swiss cuisine.",
      startDate: "2025-07-01",
      endDate: "2025-07-07",
      featuredImage: fileMapping['alpine-adventure.jpg'] || "file_1749913782582_alpine-adventure.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Zermatt", "Interlaken", "Lucerne"],
      difficulty: "Medium",
      continent: "Europe",
      slots: 12,
      deleted: false
    },
    {
      id: 2,
      name: "Himalayan Trek",
      price: "1500",
      categories: ["Mountains"],
      title: "Nepal Mountain Experience",
      description: "Trek through the Himalayas, visit ancient monasteries, and experience local culture.",
      startDate: "2025-11-01",
      endDate: "2025-11-14",
      featuredImage: fileMapping['nepal-mountain-experience.jpg'] || "file_1749913782582_nepal-mountain-experience.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Kathmandu", "Everest Base Camp"],
      difficulty: "Hard",
      continent: "Asia",
      slots: 15,
      deleted: false
    },
    {
      id: 3,
      name: "Rocky Mountain Explorer",
      price: "1400",
      categories: ["Mountains"],
      title: "Canadian Rockies Journey",
      description: "Discover the stunning landscapes of the Canadian Rockies with guided hikes and wildlife viewing.",
      startDate: "2026-03-15",
      endDate: "2026-03-22",
      featuredImage: fileMapping['rocky-mountain-explorer.jpg'] || "file_1749913782582_rocky-mountain-explorer.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Banff", "Jasper", "Lake Louise"],
      difficulty: "Medium",
      budgetRange: "Standard",
      slots: 18,
      deleted: false
    },
    {
      id: 4,
      name: "Patagonian Trek",
      price: "2100",
      categories: ["Mountains", "Forest"],
      title: "Southern Chile Adventure",
      description: "Hike through the stunning landscapes of Patagonia, including Torres del Paine National Park.",
      startDate: "2026-05-01",
      endDate: "2026-05-15",
      featuredImage: fileMapping['patagonian-trek.jpg'] || "file_1749913782582_patagonian-trek.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Puerto Natales"],
      difficulty: "Hard",
      continent: "South America",
      slots: 10,
      deleted: false
    },
    {
      id: 5,
      name: "Sahara & Atlas Mountains",
      price: "1700",
      categories: ["Desert", "Mountains"],
      title: "Moroccan Multi-Adventure",
      description: "Combine desert exploration with mountain trekking in the Atlas Mountains.",
      startDate: "2026-06-01",
      endDate: "2026-06-12",
      featuredImage: fileMapping['sahara-atlas-mountains.jpg'] || "file_1749913782582_sahara-atlas-mountains.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Marrakech", "Atlas Mountains", "Sahara Desert"],
      difficulty: "Hard",
      continent: "Africa",
      slots: 12,
      deleted: false
    },
    {
      id: 6,
      name: "Alpine Ski Adventure",
      price: "1800",
      categories: ["Mountains"],
      title: "Austrian Ski Experience",
      description: "Hit the slopes in the Austrian Alps with world-class skiing and après-ski culture.",
      startDate: "2025-12-15",
      endDate: "2025-12-22",
      featuredImage: fileMapping['alpine-ski-adventure.jpg'] || "file_1749913782582_alpine-ski-adventure.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Innsbruck", "Kitzbühel", "St. Anton"],
      difficulty: "Medium",
      continent: "Europe",
      slots: 16,
      deleted: false
    },
    {
      id: 7,
      name: "Andes Expedition",
      price: "1900",
      categories: ["Mountains"],
      title: "Peruvian Andes Trek",
      description: "Explore the ancient Inca trails and Machu Picchu through the stunning Andes Mountains.",
      startDate: "2025-09-01",
      endDate: "2025-09-10",
      featuredImage: fileMapping['andes-expedition.jpg'] || "file_1749913782582_andes-expedition.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Cusco", "Machu Picchu"],
      difficulty: "Medium",
      continent: "South America",
      slots: 14,
      deleted: false
    },
    {
      id: 8,
      name: "Caucasus Mountains",
      price: "1300",
      categories: ["Mountains"],
      title: "Georgian Mountain Adventure",
      description: "Discover the hidden gems of the Caucasus Mountains with traditional Georgian hospitality.",
      startDate: "2025-08-01",
      endDate: "2025-08-08",
      featuredImage: fileMapping['caucasus-mountains.jpg'] || "file_1749913782582_caucasus-mountains.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Tbilisi", "Kazbegi", "Svaneti"],
      difficulty: "Medium",
      continent: "Europe",
      slots: 12,
      deleted: false
    },
    {
      id: 9,
      name: "Japanese Alps",
      price: "1600",
      categories: ["Mountains"],
      title: "Japan Mountain Discovery",
      description: "Experience the beauty of the Japanese Alps with hot springs and traditional ryokan stays.",
      startDate: "2025-10-01",
      endDate: "2025-10-08",
      featuredImage: fileMapping['japanese-alps.jpg'] || "file_1749913782582_japanese-alps.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Nagano", "Hakuba", "Kamikochi"],
      difficulty: "Medium",
      continent: "Asia",
      slots: 15,
      deleted: false
    },
    {
      id: 10,
      name: "New Zealand Alps",
      price: "2000",
      categories: ["Mountains"],
      title: "Southern Alps Adventure",
      description: "Explore the dramatic landscapes of New Zealand's Southern Alps and Fiordland.",
      startDate: "2026-01-01",
      endDate: "2026-01-10",
      featuredImage: fileMapping['new-zealand-alps.jpg'] || "file_1749913782582_new-zealand-alps.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Queenstown", "Milford Sound", "Mount Cook"],
      difficulty: "Hard",
      continent: "Oceania",
      slots: 12,
      deleted: false
    },

    // Water Category (9+ packs)
    {
      id: 11,
      name: "Mediterranean Cruise",
      price: "2500",
      categories: ["Water"],
      title: "Greek Islands Discovery",
      description: "Sail through the crystal-clear waters of the Aegean Sea, visiting ancient ruins and beautiful beaches.",
      startDate: "2025-08-15",
      endDate: "2025-08-22",
      featuredImage: fileMapping['mediterranean-cruise.jpg'] || "file_1749914661212_mediterranean-cruise.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Santorini", "Mykonos", "Crete"],
      difficulty: "Easy",
      continent: "Europe",
      slots: 20,
      deleted: false
    },
    {
      id: 12,
      name: "Caribbean Paradise",
      price: "2800",
      categories: ["Water"],
      title: "Island Hopping Adventure",
      description: "Explore multiple Caribbean islands, enjoy pristine beaches, and vibrant local culture.",
      startDate: "2025-12-20",
      endDate: "2025-12-30",
      featuredImage: fileMapping['caribbean-paradise.jpg'] || "file_1749914661212_caribbean-paradise.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Jamaica", "Bahamas", "Cuba"],
      difficulty: "Easy",
      continent: "North America",
      slots: 16,
      deleted: false
    },
    {
      id: 13,
      name: "Great Barrier Reef",
      price: "2300",
      categories: ["Water"],
      title: "Australian Marine Adventure",
      description: "Explore the world's largest coral reef system with diving, snorkeling, and island hopping.",
      startDate: "2026-04-01",
      endDate: "2026-04-10",
      featuredImage: fileMapping['great-barrier-reef.jpg'] || "file_1749914661212_great-barrier-reef.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Cairns", "Hamilton Island"],
      difficulty: "Easy",
      continent: "Oceania",
      slots: 12,
      deleted: false
    },
    {
      id: 14,
      name: "Maldives Escape",
      price: "3200",
      categories: ["Water"],
      title: "Tropical Paradise",
      description: "Experience overwater bungalows, crystal-clear lagoons, and world-class diving in the Maldives.",
      startDate: "2025-11-15",
      endDate: "2025-11-22",
      featuredImage: fileMapping['maldives-escape.jpg'] || "file_1749914661212_maldives-escape.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Male"],
      difficulty: "Easy",
      continent: "Asia",
      slots: 10,
      deleted: false
    },
    {
      id: 15,
      name: "Norwegian Fjords",
      price: "2100",
      categories: ["Water"],
      title: "Fjord Adventure",
      description: "Cruise through the dramatic Norwegian fjords with waterfalls and stunning coastal scenery.",
      startDate: "2025-06-01",
      endDate: "2025-06-08",
      featuredImage: fileMapping['norwegian-fjords.jpg'] || "file_1749914661212_norwegian-fjords.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Bergen", "Geiranger", "Flam"],
      difficulty: "Easy",
      continent: "Europe",
      slots: 18,
      deleted: false
    },
    {
      id: 16,
      name: "Galapagos Islands",
      price: "3500",
      categories: ["Water"],
      title: "Wildlife Discovery",
      description: "Explore the unique wildlife and marine life of the Galapagos Islands with expert naturalist guides.",
      startDate: "2025-07-15",
      endDate: "2025-07-25",
      featuredImage: fileMapping['galapagos-islands.jpg'] || "file_1749914661212_galapagos-islands.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["San Cristobal", "Isabela"],
      difficulty: "Medium",
      continent: "South America",
      slots: 12,
      deleted: false
    },
    {
      id: 17,
      name: "Croatian Coast",
      price: "1800",
      categories: ["Water"],
      title: "Adriatic Adventure",
      description: "Sail along the stunning Croatian coast, visiting historic cities and hidden coves.",
      startDate: "2025-09-01",
      endDate: "2025-09-08",
      featuredImage: fileMapping['croatian-coast.jpg'] || "file_1749914661212_croatian-coast.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Split", "Hvar", "Dubrovnik"],
      difficulty: "Easy",
      continent: "Europe",
      slots: 16,
      deleted: false
    },
    {
      id: 18,
      name: "Seychelles Islands",
      price: "2900",
      categories: ["Water"],
      title: "Indian Ocean Paradise",
      description: "Discover pristine beaches, granite boulders, and turquoise waters in the Seychelles.",
      startDate: "2026-02-01",
      endDate: "2026-02-08",
      featuredImage: fileMapping['seychelles-islands.jpg'] || "file_1749914661212_seychelles-islands.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Mahe", "Praslin", "La Digue"],
      difficulty: "Easy",
      continent: "Africa",
      slots: 10,
      deleted: false
    },
    {
      id: 19,
      name: "Fiji Islands",
      price: "2400",
      categories: ["Water"],
      title: "South Pacific Dream",
      description: "Experience traditional Fijian culture, coral reefs, and pristine island beaches.",
      startDate: "2025-10-15",
      endDate: "2025-10-22",
      featuredImage: fileMapping['fiji-islands.jpg'] || "file_1749914661212_fiji-islands.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Nadi", "Mamanuca Islands"],
      difficulty: "Easy",
      continent: "Oceania",
      slots: 14,
      deleted: false
    },

    // Desert Category (9+ packs)
    {
      id: 20,
      name: "Sahara Expedition",
      price: "1800",
      categories: ["Desert"],
      title: "Moroccan Desert Adventure",
      description: "Journey through the Sahara Desert, experience Berber culture, and camp under the stars.",
      startDate: "2025-09-10",
      endDate: "2025-09-17",
      featuredImage: fileMapping['sahara-expedition.jpg'] || "file_1749914775083_sahara-expedition.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Marrakech", "Merzouga", "Fez"],
      difficulty: "Hard",
      continent: "Africa",
      slots: 8,
      deleted: false
    },
    {
      id: 21,
      name: "Atacama Discovery",
      price: "1900",
      categories: ["Desert"],
      title: "Chilean Desert Experience",
      description: "Explore the driest non-polar desert in the world, stargaze, and visit unique landscapes.",
      startDate: "2026-01-15",
      endDate: "2026-01-22",
      featuredImage: fileMapping['atacama-discovery.jpg'] || "file_1749914775083_atacama-discovery.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["San Pedro de Atacama", "Valle de la Luna", "Salar de Atacama"],
      difficulty: "Medium",
      continent: "South America",
      slots: 12,
      deleted: false
    },
    {
      id: 22,
      name: "Namib Desert",
      price: "2200",
      categories: ["Desert"],
      title: "Namibian Desert Safari",
      description: "Explore the oldest desert in the world with towering sand dunes and unique wildlife.",
      startDate: "2025-08-01",
      endDate: "2025-08-10",
      featuredImage: fileMapping['namib-desert.jpg'] || "file_1749914775083_namib-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Windhoek"],
      difficulty: "Medium",
      continent: "Africa",
      slots: 10,
      deleted: false
    },
    {
      id: 23,
      name: "Gobi Desert",
      price: "1600",
      categories: ["Desert"],
      title: "Mongolian Desert Trek",
      description: "Experience nomadic culture and vast desert landscapes in the Gobi Desert.",
      startDate: "2025-07-01",
      endDate: "2025-07-10",
      featuredImage: fileMapping['gobi-desert.jpg'] || "file_1749914775083_gobi-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Ulaanbaatar", "Dalanzadgad", "Khongoryn Els"],
      difficulty: "Hard",
      continent: "Asia",
      slots: 8,
      deleted: false
    },
    {
      id: 24,
      name: "Arabian Desert",
      price: "2000",
      categories: ["Desert"],
      title: "UAE Desert Experience",
      description: "Discover the magic of the Arabian Desert with luxury camping and traditional activities.",
      startDate: "2025-11-01",
      endDate: "2025-11-08",
      featuredImage: fileMapping['arabian-desert.jpg'] || "file_1749914775083_arabian-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Dubai", "Abu Dhabi"],
      difficulty: "Easy",
      continent: "Asia",
      slots: 15,
      deleted: false
    },
    {
      id: 25,
      name: "Sonoran Desert",
      price: "1400",
      categories: ["Desert"],
      title: "Arizona Desert Adventure",
      description: "Explore the unique Sonoran Desert with saguaro cacti and stunning sunsets.",
      startDate: "2025-10-01",
      endDate: "2025-10-08",
      featuredImage: fileMapping['sonoran-desert.jpg'] || "file_1749914775083_sonoran-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Phoenix", "Sedona"],
      difficulty: "Easy",
      continent: "North America",
      slots: 18,
      deleted: false
    },
    {
      id: 26,
      name: "Thar Desert",
      price: "1200",
      categories: ["Desert"],
      title: "Indian Desert Journey",
      description: "Experience the colorful culture and vast landscapes of the Thar Desert in Rajasthan.",
      startDate: "2025-12-01",
      endDate: "2025-12-08",
      featuredImage: fileMapping['thar-desert.jpg'] || "file_1749914775083_thar-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Jaisalmer", "Jodhpur", "Bikaner"],
      difficulty: "Medium",
      continent: "Asia",
      slots: 12,
      deleted: false
    },
    {
      id: 27,
      name: "Simpson Desert",
      price: "1800",
      categories: ["Desert"],
      title: "Australian Outback",
      description: "Cross the vast Simpson Desert with its iconic red sand dunes and unique wildlife.",
      startDate: "2026-03-01",
      endDate: "2026-03-10",
      featuredImage: fileMapping['simpson-desert.jpg'] || "file_1749914775083_simpson-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Alice Springs"],
      difficulty: "Hard",
      continent: "Oceania",
      slots: 8,
      deleted: false
    },
    {
      id: 28,
      name: "Kalahari Desert",
      price: "1700",
      categories: ["Desert"],
      title: "Botswana Desert Safari",
      description: "Explore the Kalahari Desert with its unique wildlife and San Bushman culture.",
      startDate: "2025-06-15",
      endDate: "2025-06-22",
      featuredImage: fileMapping['kalahari-desert.jpg'] || "file_1749914775083_kalahari-desert.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Gaborone", "Central Kalahari", "Makgadikgadi Pans"],
      difficulty: "Medium",
      continent: "Africa",
      slots: 10,
      deleted: false
    },

    // Forest Category (9+ packs)
    {
      id: 29,
      name: "Amazon Explorer",
      price: "2200",
      categories: ["Forest"],
      title: "Brazilian Rainforest Journey",
      description: "Discover the wonders of the Amazon rainforest with expert guides and unique wildlife encounters.",
      startDate: "2025-10-05",
      endDate: "2025-10-15",
      featuredImage: fileMapping['amazon-explorer.jpg'] || "file_1749914719945_amazon-explorer.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Manaus", "Amazon Lodge", "Rio Negro"],
      difficulty: "Hard",
      continent: "South America",
      slots: 10,
      deleted: false
    },
    {
      id: 30,
      name: "Costa Rican Rainforest",
      price: "1600",
      categories: ["Forest"],
      title: "Central American Adventure",
      description: "Experience the rich biodiversity of Costa Rica's rainforests and cloud forests.",
      startDate: "2026-02-01",
      endDate: "2026-02-10",
      featuredImage: fileMapping['costa-rican-rainforest.jpg'] || "file_1749914719945_costa-rican-rainforest.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Monteverde", "Arenal", "Manuel Antonio"],
      difficulty: "Medium",
      budgetRange: "Standard",
      slots: 14,
      deleted: false
    },
    {
      id: 31,
      name: "Borneo Rainforest",
      price: "1900",
      categories: ["Forest"],
      title: "Malaysian Jungle Adventure",
      description: "Explore the ancient rainforests of Borneo with orangutans and diverse wildlife.",
      startDate: "2025-08-15",
      endDate: "2025-08-25",
      featuredImage: fileMapping['borneo-rainforest.jpg'] || "file_1749914719945_borneo-rainforest.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Kota Kinabalu", "Kinabatangan"],
      difficulty: "Medium",
      continent: "Asia",
      slots: 12,
      deleted: false
    },
    {
      id: 32,
      name: "Congo Basin",
      price: "2500",
      categories: ["Forest"],
      title: "Central African Rainforest",
      description: "Venture into the heart of Africa's largest rainforest with gorillas and forest elephants.",
      startDate: "2025-07-01",
      endDate: "2025-07-12",
      featuredImage: fileMapping['congo-basin.jpg'] || "file_1749914719945_congo-basin.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Brazzaville", "Odzala", "Sangha"],
      difficulty: "Hard",
      continent: "Africa",
      slots: 8,
      deleted: false
    },
    {
      id: 33,
      name: "Pacific Northwest",
      price: "1400",
      categories: ["Forest"],
      title: "American Old Growth",
      description: "Hike through ancient temperate rainforests with towering trees and coastal beauty.",
      startDate: "2025-09-01",
      endDate: "2025-09-08",
      featuredImage: fileMapping['pacific-northwest.jpg'] || "file_1749914719945_pacific-northwest.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Seattle"],
      difficulty: "Easy",
      continent: "North America",
      slots: 16,
      deleted: false
    },
    {
      id: 34,
      name: "Tasmanian Wilderness",
      price: "1700",
      categories: ["Forest"],
      title: "Australian Temperate Forest",
      description: "Explore the pristine wilderness of Tasmania with ancient forests and unique wildlife.",
      startDate: "2026-01-01",
      endDate: "2026-01-10",
      featuredImage: fileMapping['tasmanian-wilderness.jpg'] || "file_1749914719945_tasmanian-wilderness.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Hobart", "Franklin-Gordon"],
      difficulty: "Medium",
      continent: "Oceania",
      slots: 12,
      deleted: false
    },
    {
      id: 35,
      name: "Black Forest",
      price: "1300",
      categories: ["Forest"],
      title: "German Forest Adventure",
      description: "Discover the enchanting Black Forest with traditional villages and scenic hiking trails.",
      startDate: "2025-06-01",
      endDate: "2025-06-08",
      featuredImage: fileMapping['black-forest.jpg'] || "file_1749914719945_black-forest.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Freiburg", "Triberg", "Baden-Baden"],
      difficulty: "Easy",
      continent: "Europe",
      slots: 18,
      deleted: false
    },
    {
      id: 36,
      name: "Daintree Rainforest",
      price: "1600",
      categories: ["Forest"],
      title: "Australian Tropical Forest",
      description: "Explore the world's oldest tropical rainforest with unique flora and fauna.",
      startDate: "2025-11-01",
      endDate: "2025-11-08",
      featuredImage: fileMapping['daintree-rainforest.jpg'] || "file_1749914719945_daintree-rainforest.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Cairns"],
      difficulty: "Medium",
      continent: "Oceania",
      slots: 14,
      deleted: false
    },
    {
      id: 37,
      name: "Białowieża Forest",
      price: "1100",
      categories: ["Forest"],
      title: "European Primeval Forest",
      description: "Experience the last remaining primeval forest in Europe with European bison.",
      startDate: "2025-05-01",
      endDate: "2025-05-08",
      featuredImage: fileMapping['bialowieza-forest.jpg'] || "file_1749914719945_bialowieza-forest.jpg",
      images: [
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
        fileMapping['single-pack-01.png'] || "file_1749913782582_single-pack-01.png",
        fileMapping['single-pack-02.png'] || "file_1749913782582_single-pack-02.png",
      ],
      stops: ["Warsaw", "Białowieża", "Białystok"],
      difficulty: "Easy",
      continent: "Europe",
      slots: 15,
      deleted: false
    }
  ];

  LocalStorageCRUD.update('packs', defaultPacks);
  LocalStorageCRUD.update('packs-index', 37);

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