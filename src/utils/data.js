const streamingApps = [
  { name: "Netflix", icon: "/icons/netflix.png" },
  { name: "YouTube", icon: "/icons/youtube.png" },
  { name: "Amazon Prime", icon: "/icons/prime.webp" },
  { name: "JioHotstar", icon: "/icons/jiohotstar.png" },
  { name: "Zee5", icon: "/icons/zee5_icon.jpeg" },
  { name: "Sony Liv", icon: "/icons/sony_liv.png" },
  { name: "Hulu", icon: "/icons/hulu-icon.webp" },
  { name: "HBO Max", icon: "/icons/hbo_max.webp" },
  { name: "Apple TV+", icon: "/icons/appletv.webp" },
  { name: "Discovery", icon: "/icons/discovery_icon.jpeg" },
  { name: "Crunchyroll", icon: "/icons/crunchyroll_logo.webp" },
  { name: "ESPN+", icon: "/icons/espn_icon.webp" },
  // Add more as needed
];

const musicApps = [
  { name: "Spotify", icon: "/icons/spotify.svg" },
  { name: "Apple Music", icon: "/icons/apple_music.png" },
  { name: "Amazon Music", icon: "/icons/amazon_music.png" },
  { name: "YouTube Music", icon: "/icons/youtube_music.png" },
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
    price: "649.00",
  },
  {
    id: 2,
    name: "YouTube",
    logo: "/icons/youtube.png",
    daysLeft: 30,
    renewDate: "September 14, 2025",
    price: "199.00",
  },
  {
    id: 3,
    name: "Amazon Prime",
    logo: "/icons/prime.webp",
    daysLeft: 170,
    renewDate: "February 1, 2026",
    price: "1,500.00",
  },
];

const categories = [
  "Streaming",
  "Music",
  "Gaming",
  "Entertainment",
  "News",
  "Education",
  "Productivity",
  "Health & Fitness",
  "Lifestyle",
  "Finance",
];

const durations = [{key:'day', value:'Every day'}, {key:'week', value:'Every week'}, {key:'month', value:'Every month'}, {key:'year', value:'Every year'}];
export  {streamingApps, musicApps, gameApps, categories, currentSubscriptions, durations};
