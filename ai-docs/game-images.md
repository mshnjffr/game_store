# Game Cover Images Research

This document contains research on high-quality cover images for the 10 games in our sample data.

## 1. Minecraft

**Status:** Official artwork available
- **Primary Source:** [Minecraft Official Site](https://www.minecraft.net/en-us/collectibles) - Free wallpapers and backgrounds
- **Image URL:** Available through official Minecraft downloads
- **Estimated Dimensions:** 1920x1080 (HD wallpapers available)
- **File Format:** JPG/PNG
- **Suggested Filename:** `minecraft-cover.jpg`
- **Notes:** Official HD artwork and wallpapers available from Minecraft.net. Multiple resolution options.

## 2. Fortnite

**Status:** Official promotional images available
- **Primary Source:** Epic Games/Fortnite official channels
- **Image URL:** Epic Games promotional materials
- **Estimated Dimensions:** 1920x1080+
- **File Format:** JPG/PNG
- **Suggested Filename:** `fortnite-cover.jpg`
- **Notes:** Epic provides thumbnail guidelines and promotional materials through official channels.

## 3. Counter-Strike 2

**Status:** Steam official artwork available
- **Primary Source:** Steam store page and Valve promotional materials
- **Image URL:** Steam CDN (clan.akamai.steamstatic.com)
- **Estimated Dimensions:** 1920x1080+
- **File Format:** PNG/JPG
- **Suggested Filename:** `counter-strike-2-cover.png`
- **Notes:** Available through Steam store page and official Valve assets.

## 4. Call of Duty: Black Ops 6

**Status:** Official cover art confirmed
- **Primary Source:** [Call of Duty Store](https://shop.callofduty.com/products/codtfa0012-call-of-duty-black-ops-6-cover-art-poster) - Official key art poster
- **Image URL:** Official Call of Duty promotional materials
- **Estimated Dimensions:** High-quality poster format (16.5x23.4")
- **File Format:** JPG/PNG
- **Suggested Filename:** `call-of-duty-black-ops-6-cover.jpg`
- **Notes:** Official key art available as high-quality poster from Call of Duty Store.

## 5. ROBLOX

**Status:** Official logo and promotional materials available
- **Primary Source:** Roblox official branding resources
- **Image URL:** Roblox developer resources
- **Estimated Dimensions:** Various (scalable logo formats)
- **File Format:** PNG (with transparency)
- **Suggested Filename:** `roblox-cover.png`
- **Notes:** Official logo and branding materials available through Roblox developer resources.

## 6. Monster Hunter Wilds

**Status:** Official box art revealed
- **Primary Source:** Capcom promotional materials
- **Image URL:** Official Monster Hunter channels
- **Estimated Dimensions:** 1920x1080+
- **File Format:** JPG/PNG
- **Suggested Filename:** `monster-hunter-wilds-cover.jpg`
- **Notes:** Box art officially revealed September 2024. Steel Book Edition cover art also available.

## 7. Ghost of Yōtei

**Status:** Official PlayStation promotional images available
- **Primary Source:** [PlayStation Games Page](https://www.playstation.com/en-us/games/ghost-of-yotei/)
- **Image URL:** PlayStation official promotional materials
- **Estimated Dimensions:** 1920x1080+
- **File Format:** JPG/PNG
- **Suggested Filename:** `ghost-of-yotei-cover.jpg`
- **Notes:** Official artwork available from PlayStation Store and promotional materials.

## 8. Grand Theft Auto VI

**Status:** Extensive official artwork collection available
- **Primary Source:** [Rockstar Games Official Downloads](https://www.rockstargames.com/VI/downloads/artwork-wallpapers)
- **Image URL:** https://media-rockstargames-com.akamaized.net/VI/downloads/artwork_wallpapers/GTAVI_Artwork_Wallpapers.zip
- **Estimated Dimensions:** Up to 3840x2160 (4K)
- **File Format:** JPG
- **Suggested Filename:** `grand-theft-auto-vi-cover.jpg`
- **Notes:** 17 official artwork pieces available in multiple sizes. "Jason and Lucia 02 (With Logos)" recommended as main cover.

## 9. Mario Kart 8 Deluxe

**Status:** Official Nintendo Switch box art available
- **Primary Source:** Nintendo official materials and retail sources
- **Image URL:** Nintendo promotional materials
- **Estimated Dimensions:** Standard Switch box art resolution
- **File Format:** JPG/PNG
- **Suggested Filename:** `mario-kart-8-deluxe-cover.jpg`
- **Notes:** HD artwork album with 75 images available. Official box art widely distributed.

## 10. Phasmophobia

**Status:** Official Steam promotional images available
- **Primary Source:** Steam store page and developer promotional materials
- **Image URL:** Steam promotional materials
- **Estimated Dimensions:** 1920x1080+
- **File Format:** JPG/PNG
- **Suggested Filename:** `phasmophobia-cover.jpg`
- **Notes:** Official promotional materials available through Steam and developer social channels.

## Summary

All 10 games have official cover art or promotional images available from their respective publishers/platforms:

- **Highest Quality:** Grand Theft Auto VI (up to 4K resolution, 17 official artworks)
- **Most Accessible:** Steam games (Counter-Strike 2, Phasmophobia) through Steam CDN
- **Brand Guidelines:** Fortnite, ROBLOX have specific thumbnail/branding guidelines
- **Recent Releases:** Monster Hunter Wilds, Ghost of Yōtei have newly revealed artwork

## Implemented Solution

Due to copyright restrictions and the complexity of direct downloads, I've created a structured placeholder system:

### **Folder Structure Created:**
```
images/
├── games/
│   ├── 1-cover.jpg          # Minecraft placeholder
│   ├── 2-cover.jpg          # Fortnite placeholder
│   ├── 3-cover.jpg          # Counter-Strike 2 placeholder
│   ├── 4-cover.jpg          # Call of Duty: Black Ops 6 placeholder
│   ├── 5-cover.jpg          # ROBLOX placeholder
│   ├── 6-cover.jpg          # Monster Hunter Wilds placeholder
│   ├── 7-cover.jpg          # Ghost of Yōtei placeholder
│   ├── 8-cover.jpg          # Grand Theft Auto VI placeholder
│   ├── 9-cover.jpg          # Mario Kart 8 Deluxe placeholder
│   └── 10-cover.jpg         # Phasmophobia placeholder
├── categories/
│   ├── sandbox.jpg
│   ├── battle-royale.jpg
│   ├── fps.jpg
│   ├── action-adventure.jpg
│   ├── horror.jpg
│   ├── racing.jpg
│   ├── online-platform.jpg
│   └── action-rpg.jpg
└── placeholders/
    ├── game-placeholder.jpg
    └── loading.jpg
```

### **Production Implementation Notes:**
1. Replace placeholder files with actual JPEG images (1920x1080 recommended)
2. Use official press kits and media assets from publishers
3. Ensure proper licensing for commercial use
4. Implement image optimization in Express middleware
5. Consider CDN integration for better performance

### **Legal Image Sources:**
- **Steam games:** Use Steam's CDN with proper attribution
- **PlayStation exclusives:** PlayStation Media Gallery
- **Nintendo games:** Nintendo Developer Portal assets
- **Publisher direct:** Official press kits and media resources
