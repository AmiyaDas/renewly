const streamingApps = [
    { name: 'Netflix', icon: '/icons/netflix.png' },
    { name: 'YouTube', icon: '/icons/youtube.png' },
    { name: 'Amazon Prime', icon: '/icons/prime.png' },
    { name: 'Disney+', icon: '/icons/disney.png' },
    { name: 'Hulu', icon: '/icons/hulu.png' },
    { name: 'HBO Max', icon: '/icons/hbo.png' },
    { name: 'Apple TV+', icon: '/icons/appletv.png' },
    { name: 'Paramount+', icon: '/icons/paramount.png' },
    { name: 'Peacock TV', icon: '/icons/peacock.png' },
    { name: 'Discovery', icon: '/icons/discovery.png' },
    { name: 'Crunchyroll', icon: '/icons/crunchyroll.png' },
    { name: 'ESPN+', icon: '/icons/espn.png' },
    // Add more as needed
];

const musicApps = [
    { name: 'Spotify', icon: '/icons/spotify.png' },
    { name: 'Apple Music', icon: '/icons/applemusic.png' },
    { name: 'Amazon Music', icon: '/icons/amazonmusic.png' },
    { name: 'YouTube Music', icon: '/icons/youtubemusic.png' },
    { name: 'Tidal', icon: '/icons/tidal.png' },
    { name: 'Pandora', icon: '/icons/pandora.png' },
    // Add more as needed
];

const gameApps = [
    { name: 'Xbox Game Pass', icon: '/icons/xbox.png' },
    { name: 'PlayStation Plus', icon: '/icons/playstation.png' },
    { name: 'Nintendo Switch Online', icon: '/icons/nintendo.png' },
    // Add more as needed
];

export default [...streamingApps, ...musicApps, ...gameApps];