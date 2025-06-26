# Sample Game Data & Database Schema

## Game Categories

Based on our 10 selected games, here are the game categories we need:

1. **Sandbox** - Creative building and exploration games
2. **Battle Royale** - Last-player-standing competitive games  
3. **FPS (First-Person Shooter)** - Tactical and action shooting games
4. **Action Adventure** - Story-driven exploration and combat
5. **Horror** - Scary and suspenseful games
6. **Racing** - Vehicle-based competitive games
7. **Online Platform** - User-generated content and social games
8. **Action RPG** - Role-playing with real-time combat

## Enhanced Database Schema

### Games Table
```sql
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    category_id INTEGER REFERENCES categories(id),
    developer VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    release_date DATE,
    rating VARCHAR(10), -- E, T, M, E10+, etc.
    platform VARCHAR(100), -- PC, PlayStation, Xbox, Nintendo Switch, etc.
    stock_quantity INTEGER DEFAULT 100,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game_images (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Sample Game Data

### 1. Minecraft
```json
{
    "title": "Minecraft",
    "description": "Minecraft is a 2011 sandbox game developed and published by Mojang Studios. The game allows players to build and destroy various types of blocks in a 3D procedurally generated world. Players can explore the world, gather resources, craft items, and build structures or earthworks.",
    "price": 29.99,
    "discount_price": null,
    "category": "Sandbox",
    "developer": "Mojang Studios",
    "publisher": "Microsoft Studios",
    "release_date": "2011-11-18",
    "rating": "E10+",
    "platform": "PC, PlayStation, Xbox, Nintendo Switch",
    "stock_quantity": 100,
    "featured": true
}
```

### 2. Fortnite
```json
{
    "title": "Fortnite",
    "description": "Fortnite is a free-to-play battle royale game developed by Epic Games. Drop into a massive 100-player PvP battle where strategy and quick thinking are essential for survival. Build structures, find weapons, and be the last player standing.",
    "price": 0.00,
    "discount_price": null,
    "category": "Battle Royale",
    "developer": "Epic Games",
    "publisher": "Epic Games",
    "release_date": "2017-07-21",
    "rating": "T",
    "platform": "PC, PlayStation, Xbox, Nintendo Switch",
    "stock_quantity": 100,
    "featured": true
}
```

### 3. Counter-Strike 2
```json
{
    "title": "Counter-Strike 2",
    "description": "Counter-Strike 2 is a free-to-play tactical first-person shooter developed by Valve. The game features classic Counter-Strike gameplay with enhanced graphics, improved audio, and redesigned maps built on the Source 2 engine.",
    "price": 0.00,
    "discount_price": null,
    "category": "FPS",
    "developer": "Valve",
    "publisher": "Valve",
    "release_date": "2023-09-27",
    "rating": "M",
    "platform": "PC",
    "stock_quantity": 100,
    "featured": true
}
```

### 4. Call of Duty: Black Ops 6
```json
{
    "title": "Call of Duty: Black Ops 6",
    "description": "Call of Duty: Black Ops 6 is a 2024 first-person shooter developed by Treyarch and Raven Software. The game features a gripping campaign, competitive multiplayer, and the return of Zombies mode with new maps and features.",
    "price": 69.99,
    "discount_price": 59.99,
    "category": "FPS",
    "developer": "Treyarch, Raven Software",
    "publisher": "Activision",
    "release_date": "2024-10-25",
    "rating": "M",
    "platform": "PC, PlayStation, Xbox",
    "stock_quantity": 100,
    "featured": true
}
```

### 5. ROBLOX
```json
{
    "title": "ROBLOX",
    "description": "Roblox is an online game platform and game creation system that allows users to program and play games created by themselves or other users. With millions of games across every genre imaginable, there's always something new to discover.",
    "price": 0.00,
    "discount_price": null,
    "category": "Online Platform",
    "developer": "Roblox Corporation",
    "publisher": "Roblox Corporation",
    "release_date": "2006-09-01",
    "rating": "E10+",
    "platform": "PC, Xbox, PlayStation",
    "stock_quantity": 100,
    "featured": true
}
```

### 6. Monster Hunter Wilds
```json
{
    "title": "Monster Hunter Wilds",
    "description": "Monster Hunter Wilds is an upcoming action RPG developed by Capcom. Experience the pinnacle of hunting action as you track, battle, and conquer massive monsters in stunning new environments. Features enhanced combat mechanics and cooperative gameplay.",
    "price": 59.99,
    "discount_price": 47.99,
    "category": "Action RPG",
    "developer": "Capcom",
    "publisher": "Capcom",
    "release_date": "2025-02-28",
    "rating": "T",
    "platform": "PC, PlayStation 5, Xbox Series X/S",
    "stock_quantity": 100,
    "featured": true
}
```

### 7. Ghost of Yōtei
```json
{
    "title": "Ghost of Yōtei",
    "description": "Ghost of Yōtei is an upcoming action-adventure game developed by Sucker Punch Productions. Set more than three centuries after Ghost of Tsushima, explore a new story of honor, sacrifice, and the way of the samurai in feudal Japan.",
    "price": 69.99,
    "discount_price": null,
    "category": "Action Adventure",
    "developer": "Sucker Punch Productions",
    "publisher": "Sony Interactive Entertainment",
    "release_date": "2025-10-15",
    "rating": "M",
    "platform": "PlayStation 5",
    "stock_quantity": 100,
    "featured": true
}
```

### 8. Grand Theft Auto VI
```json
{
    "title": "Grand Theft Auto VI",
    "description": "Grand Theft Auto VI is an upcoming action-adventure game developed by Rockstar Games. Return to Vice City in this highly anticipated sequel featuring an open world, compelling characters, and the signature GTA gameplay experience.",
    "price": 79.99,
    "discount_price": null,
    "category": "Action Adventure",
    "developer": "Rockstar Games",
    "publisher": "Rockstar Games",
    "release_date": "2026-05-15",
    "rating": "M",
    "platform": "PC, PlayStation 5, Xbox Series X/S",
    "stock_quantity": 100,
    "featured": true
}
```

### 9. Mario Kart 8 Deluxe
```json
{
    "title": "Mario Kart 8 Deluxe",
    "description": "Mario Kart 8 Deluxe is a kart racing game developed by Nintendo. Race against friends and family with beloved Nintendo characters across beautifully designed tracks. Features both local and online multiplayer for endless fun.",
    "price": 59.99,
    "discount_price": 49.99,
    "category": "Racing",
    "developer": "Nintendo EPD",
    "publisher": "Nintendo",
    "release_date": "2017-04-28",
    "rating": "E",
    "platform": "Nintendo Switch",
    "stock_quantity": 100,
    "featured": false
}
```

### 10. Phasmophobia
```json
{
    "title": "Phasmophobia",
    "description": "Phasmophobia is a 4-player online co-op psychological horror game developed by Kinetic Games. Use ghost-hunting equipment to investigate paranormal activity and identify different types of ghosts. Work together to gather evidence and survive.",
    "price": 19.99,
    "discount_price": 13.99,
    "category": "Horror",
    "developer": "Kinetic Games",
    "publisher": "Kinetic Games",
    "release_date": "2020-09-18",
    "rating": "T",
    "platform": "PC, PlayStation VR2",
    "stock_quantity": 100,
    "featured": false
}
```

## Categories Data

```json
[
    {
        "name": "Sandbox",
        "slug": "sandbox",
        "description": "Creative building and exploration games where players can construct, modify, and interact with virtual worlds.",
        "image_url": "/images/categories/sandbox.jpg"
    },
    {
        "name": "Battle Royale",
        "slug": "battle-royale", 
        "description": "Competitive multiplayer games where players fight to be the last one standing.",
        "image_url": "/images/categories/battle-royale.jpg"
    },
    {
        "name": "FPS",
        "slug": "fps",
        "description": "First-person shooter games featuring gunplay and tactical combat.",
        "image_url": "/images/categories/fps.jpg"
    },
    {
        "name": "Action Adventure",
        "slug": "action-adventure",
        "description": "Games combining action-packed combat with exploration and story-driven adventures.",
        "image_url": "/images/categories/action-adventure.jpg"
    },
    {
        "name": "Horror",
        "slug": "horror",
        "description": "Scary and suspenseful games designed to frighten and create tension.",
        "image_url": "/images/categories/horror.jpg"
    },
    {
        "name": "Racing",
        "slug": "racing",
        "description": "Vehicle-based competitive games focused on speed and racing mechanics.",
        "image_url": "/images/categories/racing.jpg"
    },
    {
        "name": "Online Platform",
        "slug": "online-platform",
        "description": "Games that serve as platforms for user-generated content and social interaction.",
        "image_url": "/images/categories/online-platform.jpg"
    },
    {
        "name": "Action RPG",
        "slug": "action-rpg",
        "description": "Role-playing games with real-time combat and character progression systems.",
        "image_url": "/images/categories/action-rpg.jpg"
    }
]
```

## Price Range Analysis

- **Free-to-Play:** Fortnite ($0.00), Counter-Strike 2 ($0.00), ROBLOX ($0.00)
- **Budget:** Phasmophobia ($19.99)
- **Standard:** Minecraft ($29.99)
- **Premium:** Mario Kart 8 Deluxe ($59.99), Monster Hunter Wilds ($59.99)
- **AAA Full Price:** Call of Duty: Black Ops 6 ($69.99), Ghost of Yōtei ($69.99)
- **Premium AAA:** Grand Theft Auto VI ($79.99)

This pricing structure provides a realistic range from free games to premium AAA titles, perfect for testing e-commerce functionality.
