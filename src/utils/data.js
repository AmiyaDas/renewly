const streamingApps = [
  { name: "Netflix", icon: "/icons/netflix.png" },
  { name: "YouTube", icon: "/icons/youtube.png" },
  { name: "Amazon Prime", icon: "/icons/prime.webp" },
  { name: "JioHotstar", icon: "/icons/jiohotstar.png" },
  { name: "Hulu", icon: "/icons/appletv.webp" },
  { name: "HBO Max", icon: "/icons/appletv.webp" },
  { name: "Apple TV+", icon: "/icons/appletv.webp" },
  { name: "Paramount+", icon: "/icons/appletv.webp" },
  { name: "Peacock TV", icon: "/icons/appletv.webp" },
  { name: "Discovery", icon: "/icons/appletv.webp" },
  { name: "Crunchyroll", icon: "/icons/appletv.webp" },
  { name: "ESPN+", icon: "/icons/appletv.webp" },
  // Add more as needed
];

const musicApps = [
  { name: "Spotify", icon: "/icons/spotify.png" },
  { name: "Apple Music", icon: "/icons/applemusic.png" },
  { name: "Amazon Music", icon: "/icons/amazonmusic.png" },
  { name: "YouTube Music", icon: "/icons/youtubemusic.png" },
  { name: "Tidal", icon: "/icons/tidal.png" },
  { name: "Pandora", icon: "/icons/pandora.png" },
  // Add more as needed
];

const gameApps = [
  { name: "Xbox Game Pass", icon: "/icons/xbox.png" },
  { name: "PlayStation Plus", icon: "/icons/playstation.png" },
  { name: "Nintendo Switch Online", icon: "/icons/nintendo.png" },
  // Add more as needed
];

const currentSubscriptions = [
  {
    id: 1,
    name: "Netflix",
    logo: "/icons/netflix.png",
    daysLeft: 30,
    renewDate: "September 14, 2025",
    price: "₹ 649.00",
  },
  {
    id: 2,
    name: "YouTube",
    logo: "/icons/youtube.png",
    daysLeft: 30,
    renewDate: "September 14, 2025",
    price: "₹ 199.00",
  },
  {
    id: 3,
    name: "Amazon Prime",
    logo: "/icons/prime.webp",
    daysLeft: 170,
    renewDate: "February 1, 2026",
    price: "₹ 1,500.00",
  },
];

export { streamingApps, musicApps, gameApps, currentSubscriptions };
