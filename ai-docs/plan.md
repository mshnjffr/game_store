# Full-Stack JavaScript Game E-commerce Application - Technical Plan

## Project Overview
A modern full-stack application for buying games, built entirely with JavaScript/TypeScript, featuring a React/Next.js frontend and Node.js/Express backend.

## Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Context API + useReducer
- **Authentication:** Custom login forms with session cookies
- **Image Optimization:** Next.js Image component
- **Form Handling:** React Hook Form + Zod validation

### Backend
- **Runtime:** Node.js (Latest LTS)
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Session-based with bcrypt password hashing
- **File Storage:** Local file system (images folder)
- **Session Storage:** Express-session with in-memory store

## Gaming Industry Analysis

### Popular Gaming Websites (Research Findings)
1. **GAME.co.uk** - UK's leading games retailer
2. **Epic Games Store** - Major PC gaming platform
3. **Zatu Games** - Board games and trading cards
4. **Wayland Games** - Wargames and miniatures
5. **Board Game Prices** - Price comparison site

### Top Popular Games (2024-2025)
1. **Minecraft** - Best-selling game of all time
2. **Fortnite** - Popular battle royale
3. **Counter-Strike 2** - Most-played PC game
4. **Call of Duty: Black Ops 6** - Latest COD release
5. **ROBLOX** - User-generated content platform
6. **Monster Hunter: Wilds** - Upcoming release
7. **Ghost of Yotei** - PlayStation exclusive
8. **Grand Theft Auto 6** - Highly anticipated
9. **Mario Kart World** - Nintendo franchise
10. **Phasmophobia** - Co-op horror game

## Application Architecture

### Frontend Architecture (Next.js App Router)

```
app/
├── layout.tsx             # Root layout (HTML structure, global components)
├── page.tsx               # Home page (featured games, categories)
├── loading.tsx            # Global loading UI
├── error.tsx              # Global error boundary
├── not-found.tsx          # 404 page
├── (auth)/                # Authentication pages
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── layout.tsx
├── games/                 # Game catalog
│   ├── page.tsx           # Games listing
│   ├── [id]/page.tsx      # Game details
│   ├── category/[slug]/   # Category pages
│   └── loading.tsx
├── cart/                  # Shopping cart
│   └── page.tsx
├── checkout/              # Checkout flow
│   ├── page.tsx
│   └── success/page.tsx
├── account/               # User dashboard
│   ├── page.tsx
│   └── orders/page.tsx
├── api/                   # API routes
│   ├── auth/
│   ├── games/
│   └── orders/
└── components/
    ├── ui/                # Shared UI components (shadcn/ui)
    │   ├── button.tsx
    │   ├── card.tsx
    │   ├── input.tsx
    │   └── ...
    ├── game/              # Game-specific components
    │   ├── GameCard.tsx
    │   ├── GameList.tsx
    │   ├── GameDetails.tsx
    │   └── GameSearch.tsx
    └── layout/            # Layout components
        ├── Header.tsx     # Main navigation, logo, auth status
        ├── Footer.tsx     # Footer links, copyright
        ├── Navigation.tsx # Main nav menu
        ├── Sidebar.tsx    # Category filters, search
        └── CartIcon.tsx   # Cart counter in header
```

### Backend Architecture (Express.js)

```
server/
├── src/
│   ├── controllers/       # Route handlers
│   │   ├── authController.js
│   │   ├── gamesController.js
│   │   ├── ordersController.js
│   │   └── usersController.js
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimit.js
│   ├── models/           # Database models (Prisma)
│   │   ├── User.js
│   │   ├── Game.js
│   │   ├── Order.js
│   │   └── Category.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── games.js
│   │   └── orders.js
│   ├── services/         # Business logic
│   │   ├── imageService.js
│   │   └── inventoryService.js
│   ├── utils/            # Utility functions
│   │   ├── validation.js
│   │   ├── encryption.js
│   │   └── logger.js
│   └── config/           # Configuration
│       ├── database.js
│       └── session.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── images/               # Local image storage
└── uploads/              # Temporary file uploads
```

## Ports & Network Configuration

### Development Environment
- **Frontend (Next.js):** Port 3000
- **Backend (Express.js):** Port 5000
- **Database (PostgreSQL):** Port 5432

## API Endpoints Specification

### Authentication Endpoints
```
POST   /api/auth/register       # User registration
POST   /api/auth/login          # User login  
POST   /api/auth/logout         # User logout
GET    /api/auth/session        # Check current session
```

### Games Endpoints
```
GET    /api/games              # Get all games
GET    /api/games/:id          # Get game by ID
GET    /api/games/category/:slug # Get games by category
GET    /api/games/search       # Search games
POST   /api/games/:id/reviews  # Add game review
```

### Orders & Cart Endpoints
```
POST   /api/orders            # Create order (from frontend cart)
GET    /api/orders            # Get user's orders
GET    /api/orders/:id        # Get order by ID
```

## Search Implementation Details

### Search Features
- Text search across title, description, developer, publisher
- Category filtering
- Price range filtering
- Rating filtering  
- Platform filtering
- Sort options (price, name, release date, featured)

### Backend Search API
- Query parameters structure (?q=search&category=fps&minPrice=0&maxPrice=50)
- PostgreSQL text search with ILIKE
- Prisma search implementation
- Search result pagination (even though we have only 10 games)

**Search API Endpoint Example:**
```javascript
// controllers/gamesController.js
export const searchGames = async (req, res) => {
  const { 
    q,           // search query
    category,    // category filter
    minPrice,    // minimum price
    maxPrice,    // maximum price
    rating,      // minimum rating
    platform,    // platform filter
    sortBy = 'name',      // sort field
    order = 'asc',        // sort order
    page = 1,             // pagination
    limit = 10            // results per page
  } = req.query;

  try {
    const whereClause = {
      AND: [
        // Text search across multiple fields
        q ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { developer: { contains: q, mode: 'insensitive' } },
            { publisher: { contains: q, mode: 'insensitive' } }
          ]
        } : {},
        // Category filter
        category ? { category: { slug: category } } : {},
        // Price range filter
        minPrice || maxPrice ? {
          AND: [
            minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
            maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {}
          ]
        } : {},
        // Rating filter
        rating ? { rating: { gte: parseFloat(rating) } } : {},
        // Platform filter
        platform ? { platform: { contains: platform, mode: 'insensitive' } } : {}
      ].filter(condition => Object.keys(condition).length > 0)
    };

    const games = await prisma.game.findMany({
      where: whereClause,
      include: {
        category: true,
        images: { where: { is_primary: true } },
        reviews: { select: { rating: true } }
      },
      orderBy: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: parseInt(limit)
    });

    const totalCount = await prisma.game.count({ where: whereClause });

    res.json({
      games,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};
```

### Frontend Search UI
- Search bar component
- Filter sidebar
- Sort dropdown
- Search results display
- No results state

**Frontend Search Hook Example:**
```javascript
// hooks/useGameSearch.js
import { useState, useEffect } from 'react';

export const useGameSearch = () => {
  const [searchParams, setSearchParams] = useState({
    q: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    platform: '',
    sortBy: 'name',
    order: 'asc'
  });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const searchGames = async (params = searchParams) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(
        Object.entries(params).filter(([key, value]) => value !== '')
      ).toString();
      
      const response = await fetch(`/api/games/search?${queryString}`);
      const data = await response.json();
      
      setGames(data.games);
      setTotalCount(data.pagination.total);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchGames();
    }, 300); // Debounce search requests

    return () => clearTimeout(debounceTimer);
  }, [searchParams]);

  return {
    searchParams,
    setSearchParams,
    games,
    loading,
    totalCount,
    searchGames
  };
};
```

### Search Algorithm
- Case-insensitive search
- Partial match support
- Search across multiple fields
- Category and filter combination

## Database Schema

### Core Tables
```sql
-- Users
users (id, email, password_hash, first_name, last_name, created_at, updated_at)

-- Games
games (id, title, description, price, discount_price, category_id, developer, publisher, 
       release_date, rating, platform, stock_quantity, featured, created_at, updated_at)

-- Categories
categories (id, name, slug, description, image_url, created_at, updated_at)

-- Orders
orders (id, user_id, total_amount, status, shipping_address, 
        created_at, updated_at)

-- Order Items
order_items (id, order_id, game_id, quantity, price, created_at)

-- Game Images
game_images (id, game_id, url, alt_text, is_primary, created_at)

-- Reviews
reviews (id, user_id, game_id, rating, comment, created_at, updated_at)
```

## Security Considerations

### Authentication & Authorization
- Session-based authentication with express-session
- HTTP-only session cookies
- Simple user authentication (no roles)
- Password hashing with bcrypt (12 rounds)

### API Security
- Rate limiting (100 requests/minute per IP)
- Input validation with Zod schemas
- SQL injection prevention with Prisma ORM
- CORS configuration for frontend domain
- Helmet.js for security headers

### CORS Configuration

#### CORS Setup
- **Express CORS middleware configuration:** Configure cors package to handle cross-origin requests
- **Development vs production origins:** Allow localhost:3000 in development, restrict to production domain in production
- **Credentials support for session cookies:** Enable credentials: true for session cookie sharing
- **Allowed methods and headers:** Configure specific HTTP methods and custom headers
- **Preflight request handling:** Automatic handling of OPTIONS requests for complex requests

#### Security Considerations
- **Origin validation:** Strict origin checking to prevent unauthorized cross-domain access
- **Cookie sharing between domains:** Secure cookie attributes for cross-origin authentication
- **HTTPS requirements for production:** Enforce secure protocols for cookie transmission
- **CORS error troubleshooting:** Common debugging steps for cross-origin issues

#### Code Examples

**Express CORS Middleware Setup:**
```javascript
// server/src/middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL] 
      : ['http://localhost:3000', 'http://127.0.0.1:3000'];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
};

module.exports = cors(corsOptions);
```

**Environment-based Origin Configuration:**
```javascript
// server/src/config/cors.js
const getCorsConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    origin: isDevelopment 
      ? ['http://localhost:3000', 'http://127.0.0.1:3000']
      : [process.env.FRONTEND_URL],
    credentials: true,
    optionsSuccessStatus: 200
  };
};

// Usage in app.js
app.use(cors(getCorsConfig()));
```

**Frontend Fetch Configuration for Credentials:**
```javascript
// Frontend API utility function
const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`http://localhost:5000/api${endpoint}`, {
    ...options,
    credentials: 'include', // Include session cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};

// Example login request
const login = async (credentials) => {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};
```

**Next.js API Routes CORS Configuration:**
```javascript
// app/api/middleware.js - For Next.js API routes
export function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
}
```

### File Upload Security
- File type validation (images only)
- File size limits (5MB max)
- Secure file naming to prevent path traversal
- Local images folder with proper permissions

### Image Serving Strategy

#### Backend Image Serving
- **Express static middleware configuration**
  ```javascript
  // Express static middleware setup
  app.use('/images', express.static(path.join(__dirname, 'images'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
      if (path.includes('cover') || path.includes('screenshot')) {
        res.setHeader('Cache-Control', 'public, max-age=86400');
      }
    }
  }));
  ```

- **Image folder structure:** `/images/games/`, `/images/categories/`
- **Image naming conventions:** `game-id-cover.jpg`, `game-id-screenshot-1.jpg`
- **Image optimization middleware:** Sharp integration for resizing and compression
- **MIME type validation:** Accept only JPEG, PNG, WebP formats
- **Image resizing strategy:** Multiple sizes (thumbnail, medium, large)

#### Frontend Image Usage
- **Next.js Image component integration**
  ```jsx
  import Image from 'next/image';
  
  // Game card image
  <Image
    src={`/images/games/${game.id}-cover.jpg`}
    alt={game.title}
    width={300}
    height={400}
    className="rounded-lg"
    placeholder="blur"
    blurDataURL="/images/placeholders/loading.jpg"
  />
  ```

- **Image loading optimization:** Lazy loading with Next.js Image
- **Placeholder/fallback images:** Game placeholder for missing images
- **Responsive image sizes:** Automatic sizing based on viewport

#### File Structure
```
images/
├── games/
│   ├── 1-cover.jpg          # Minecraft cover
│   ├── 1-screenshot-1.jpg   # Minecraft screenshot 1
│   ├── 1-screenshot-2.jpg   # Minecraft screenshot 2
│   └── ...
├── categories/
│   ├── sandbox.jpg
│   ├── fps.jpg
│   └── ...
└── placeholders/
    ├── game-placeholder.jpg
    └── loading.jpg
```

## Error Handling Strategy

### Frontend Error Handling
- React Error Boundary for component-level error catching
  ```jsx
  // app/error.tsx - Global error boundary
  'use client'
  
  export default function Error({ error, reset }) {
    return (
      <div className="error-page">
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </div>
    )
  }
  ```

### API Error Handling
- Global error handling middleware in Express
  ```javascript
  // middleware/errorHandler.js
  const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
  }
  ```

### Form Validation Errors
- React Hook Form integration with error display
- Real-time validation feedback
- Server-side validation error handling

### Network & Route Handling
- 404 handling with app/not-found.tsx
- Network error handling for API calls
- Loading states for async operations
- Retry mechanisms for failed requests

## Performance Optimizations

### Frontend Optimizations
- Next.js Image optimization
- Static generation for product pages
- Client-side caching with React Query
- Code splitting and lazy loading
- CDN delivery for static assets

### Backend Optimizations
- Database connection pooling
- Image compression and optimization
- Database indexing on search fields
- In-memory session storage for development

## Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://localhost:5432/gamestore
SESSION_SECRET=dev_session_secret
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## Development Scripts

### Frontend Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Backend Package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "build": "babel src -d dist",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:push": "prisma db push",
    "prisma:migrate": "prisma migrate dev",
    "db:seed": "node prisma/seed.js"
  }
}
```

### Concurrent Development Setup
```json
{
  "scripts": {
    "dev:full": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd server && npm run dev",
    "dev:frontend": "cd frontend && npm run dev"
  }
}
```

### Database Setup Scripts
- Initial database creation and migration
- Seed script with 10 popular games
- Development data reset command
- Production backup and restore scripts

## Development Phases

### Phase 1: Core Setup (Week 1-2)
- Project initialization and basic structure
- Database setup with Prisma
- Authentication system implementation
- Basic UI components library

### Phase 2: Product Management (Week 3-4)
- Game catalog and categories
- Database seeding with 10 games
- Image upload and optimization
- Search and filtering functionality

### Phase 3: E-commerce Features (Week 5-6)
- Shopping cart implementation (localStorage)
- Simple checkout flow
- Order management system
- Basic order confirmation

### Phase 4: Enhanced Features (Week 7-8)
- User reviews and ratings
- Advanced search with filters
- Performance optimizations
- Mobile responsiveness improvements

### Phase 5: Testing & Polish (Week 9-10)
- Security hardening
- Comprehensive testing
- Bug fixes and improvements
- Final polish and documentation

This simplified plan provides a solid foundation for building a modern, full-stack game e-commerce application using JavaScript/TypeScript technologies. Perfect for learning full-stack development without the complexity of external services and advanced authentication systems.
