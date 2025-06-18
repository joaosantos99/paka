import LocalStorageCRUD from '/js/utilities/crud.js';

export const populate = () => {
  console.log('populate');
  const defaultCategories = [
    {
      id: 1,
      name: "Mountains",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: "file_1749913782582_mountain-hero-bg.png",
      icon: "file_1749913782586_ic-mountain.svg",
      numberOfPacks: 0,
      deleted: false
    },
    {
      id: 2,
      name: "Water",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: "file_1749914661212_water-hero-bg.png",
      icon: "file_1749914661215_ic-water.svg",
      numberOfPacks: 0,
      deleted: false
    },
    {
      id: 3,
      name: "Desert",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: "file_1749914775083_desert-hero-bg.png",
      icon: "file_1749914775085_ic-cactus.svg",
      numberOfPacks: 0,
      deleted: false
    },
    {
      id: 4,
      name: "Forest",
      description: "Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.",
      featuredImage: "file_1749914719945_forest-hero-bg.png",
      icon: "file_1749914719948_ic-tree.svg",
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
    }
  ];

  LocalStorageCRUD.update('flights', defaultFlights);
  LocalStorageCRUD.update('flights-index', 16);

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
      featuredImage: "file_1749913782582_mountain-hero-bg.png",
      images: ["file_1749913782582_mountain-hero-bg.png"],
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
      featuredImage: "file_1749914661212_water-hero-bg.png",
      images: ["file_1749914661212_water-hero-bg.png"],
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
      featuredImage: "file_1749914775083_desert-hero-bg.png",
      images: ["file_1749914775083_desert-hero-bg.png"],
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
      featuredImage: "file_1749914719945_forest-hero-bg.png",
      images: ["file_1749914719945_forest-hero-bg.png"],
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
      featuredImage: "file_1749913782582_mountain-hero-bg.png",
      images: ["file_1749913782582_mountain-hero-bg.png"],
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
      featuredImage: "file_1749914661212_water-hero-bg.png",
      images: ["file_1749914661212_water-hero-bg.png"],
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
      featuredImage: "file_1749914775083_desert-hero-bg.png",
      images: ["file_1749914775083_desert-hero-bg.png"],
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
      featuredImage: "file_1749914719945_forest-hero-bg.png",
      images: ["file_1749914719945_forest-hero-bg.png"],
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
      featuredImage: "file_1749913782582_mountain-hero-bg.png",
      images: ["file_1749913782582_mountain-hero-bg.png"],
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
      featuredImage: "file_1749914661212_water-hero-bg.png",
      images: ["file_1749914661212_water-hero-bg.png"],
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
      featuredImage: "file_1749913782582_mountain-hero-bg.png",
      images: ["file_1749913782582_mountain-hero-bg.png"],
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
      featuredImage: "file_1749914775083_desert-hero-bg.png",
      images: ["file_1749914775083_desert-hero-bg.png"],
      stops: ["Marrakech", "Atlas Mountains", "Sahara Desert"],
      difficulty: "Hard",
      continent: "Africa",
      slots: 12,
      deleted: false
    }
  ];

  LocalStorageCRUD.update('packs', defaultPacks);
  LocalStorageCRUD.update('packs-index', 12);

}