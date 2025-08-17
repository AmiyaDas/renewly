const streamingApps = [
  { name: "Netflix", icon: "/renewly/icons/netflix.png" },
  { name: "YouTube", icon: "/renewly/icons/youtube.png" },
  { name: "Amazon Prime", icon: "/renewly/icons/prime.webp" },
  { name: "JioHotstar", icon: "/renewly/icons/jiohotstar.png" },
  { name: "Zee5", icon: "/renewly/icons/zee5_icon.jpeg" },
  { name: "Sony Liv", icon: "/renewly/icons/sony_liv.png" },
  { name: "Hulu", icon: "/renewly/icons/hulu-icon.webp" },
  { name: "HBO Max", icon: "/renewly/icons/hbo_max.webp" },
  { name: "Apple TV+", icon: "/renewly/icons/appletv.webp" },
  { name: "Discovery", icon: "/renewly/icons/discovery_icon.jpeg" },
  { name: "Crunchyroll", icon: "/renewly/icons/crunchyroll_logo.webp" },
  { name: "ESPN+", icon: "/renewly/icons/espn_icon.webp" },
  // Add more as needed
];

const musicApps = [
  { name: "Spotify", icon: "/renewly/icons/spotify.svg" },
  { name: "Apple Music", icon: "/renewly/icons/apple_music.png" },
  { name: "Amazon Music", icon: "/renewly/icons/amazon_music.png" },
  { name: "YouTube Music", icon: "/renewly/icons/youtube_music.png" },
  // Add more as needed
];

const gameApps = [
  { name: "Xbox Game Pass", icon: "/renewly/icons/xbox_logo.png" },
  { name: "PlayStation Plus", icon: "/renewly/icons/playstation_logo.png" },
  { name: "Nintendo Switch Online", icon: "/renewly/icons/nintendo_icon.png" },
  // Add more as needed
];

const otherApps = [
  { name: "Adobe Creative Cloud", icon: "/renewly/icons/adobe_cc.png" },
  { name: "Microsoft 365", icon: "/renewly/icons/microsoft_365.png" },
  { name: "Canva Pro", icon: "/renewly/icons/canva_pro.png" },
  { name: "Dropbox", icon: "/renewly/icons/dropbox.png" },
  { name: "Evernote Premium", icon: "/renewly/icons/evernote_premium.png" },
  { name: "Slack", icon: "/renewly/icons/slack.png" },
  { name: "Zoom Pro", icon: "/renewly/icons/zoom_pro.png" },
  { name: "Google One", icon: "/renewly/icons/google_one.png" },
  { name: "NordVPN", icon: "/renewly/icons/nordvpn.png" },
];

const currentSubscriptions = [
  {
    id: 1,
    name: "Netflix",
    logo: "/renewly/icons/netflix.png",
    daysLeft: 30,
    renewDate: "September 14, 2025",
    price: "649.00",
  },
  {
    id: 2,
    name: "YouTube",
    logo: "/renewly/icons/youtube.png",
    daysLeft: 30,
    renewDate: "September 14, 2025",
    price: "199.00",
  },
  {
    id: 3,
    name: "Amazon Prime",
    logo: "/renewly/icons/prime.webp",
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

const durations = [
  { key: "day", value: "Every day" },
  { key: "week", value: "Every week" },
  { key: "month", value: "Every month" },
  { key: "year", value: "Every year" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "hi", label: "Hindi" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ru", label: "Russian" },
  { code: "pt", label: "Portuguese" }
];
const currencies = [
  { code: "USD", label: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", label: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "INR", label: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "GBP", label: "British Pound", symbol: "£", flag: "🇬🇧" },
];
export {
  streamingApps,
  musicApps,
  gameApps,
  otherApps,
  categories,
  currentSubscriptions,
  durations,
  languages,
  currencies
};
