# Game Images Directory

This is the **correct location** for game images. The Express backend serves images from this directory.

## Image Serving Implementation

**Backend Configuration** (`backend/src/server.js`):
```javascript
// Static file serving for images
app.use('/images', express.static(path.join(__dirname, '../images'), {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.includes('cover') || path.includes('screenshot')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));
```

**Frontend Usage** (`frontend/components/game/GameCard.tsx`):
```typescript
const primaryImage = game.images?.find(img => img.isPrimary)?.url;
const imageUrl = primaryImage 
  ? `${process.env.NEXT_PUBLIC_API_URL}${primaryImage}`
  : '/placeholder-game.jpg';
```

## URL Structure

- **Database stores**: `/images/games/1-cover.jpg`
- **Backend serves at**: `http://localhost:5000/images/games/1-cover.jpg`
- **Frontend requests**: `${NEXT_PUBLIC_API_URL}/images/games/1-cover.jpg`

## Current Images

✅ **1-cover.jpg** - Minecraft  
✅ **2-cover.jpg** - Fortnite  
✅ **3-cover.jpg** - Counter-Strike 2  
✅ **4-cover.jpg** - Call of Duty: Black Ops 6  
✅ **5-cover.jpg** - ROBLOX  
✅ **6-cover.jpg** - Monster Hunter Wilds  
✅ **7-cover.jpg** - Ghost of Yōtei  
✅ **8-cover.jpg** - Grand Theft Auto VI  
✅ **9-cover.jpg** - Mario Kart 8 Deluxe  
✅ **10-cover.jpg** - Phasmophobia  

**All games now have cover images and placeholder screenshots!**
