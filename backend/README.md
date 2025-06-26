# Game Store Backend

Express.js backend API for the Game E-commerce Store application.

## Features

- **Authentication**: Session-based authentication with bcrypt password hashing
- **Games API**: Complete CRUD operations for games catalog
- **Orders API**: Order creation and management
- **Search**: Advanced search with filtering and pagination
- **Security**: Rate limiting, input validation, and security headers
- **Image Serving**: Static file serving for game images

## Tech Stack

- **Node.js** with **Express.js**
- **Session-based authentication** with express-session
- **bcrypt** for password hashing
- **Express-validator** for input validation
- **Rate limiting** with express-rate-limit
- **CORS** configured for frontend communication
- **Helmet.js** for security headers
- **Morgan** for logging
- **Sharp** for image processing

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Check current session

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get game by ID
- `GET /api/games/category/:slug` - Get games by category
- `GET /api/games/search` - Search games with filters
- `POST /api/games/:id/reviews` - Add game review (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)
- `GET /api/orders/stats` - Get user's order statistics (requires auth)

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://localhost:5432/gamestore
SESSION_SECRET=your_session_secret_here
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## Project Structure

```
backend/
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
│   ├── config/           # Configuration
│   │   ├── database.js
│   │   └── session.js
│   └── server.js         # Main server file
├── images/               # Static image files
│   ├── games/
│   ├── categories/
│   └── placeholders/
└── package.json
```

## Security Features

- **Rate Limiting**: 100 requests/minute general, 5 auth attempts/15 minutes
- **Input Validation**: Express-validator for all inputs
- **Password Hashing**: bcrypt with 12 rounds
- **Session Security**: HTTP-only cookies, secure in production
- **CORS**: Configured for frontend domain only
- **Security Headers**: Helmet.js for security headers

## Development Features

- **Mock Data**: Pre-populated with sample games and test user
- **Logging**: Comprehensive logging with different levels
- **Error Handling**: Global error handling middleware
- **Hot Reload**: Nodemon for development
- **Environment Config**: Separate dev/production configs

## Test User

For development testing:
- **Email**: test@example.com
- **Password**: password123

## Mock Data

The application includes mock data for:
- 5 sample games (Minecraft, Fortnite, Counter-Strike 2, Call of Duty, ROBLOX)
- Game categories (Sandbox, Battle Royale, FPS, RPG, Strategy)
- Inventory management system
- In-memory session storage

## Ready for Database Integration

The backend is structured to easily integrate with Prisma ORM and PostgreSQL:
- Controllers use service layer for data access
- Mock data can be easily replaced with Prisma queries
- Database configuration files are ready
- Migration scripts placeholder included

## CORS Configuration

The backend is configured to work with the frontend running on localhost:3000:
- Credentials enabled for session cookies
- Proper headers configured
- Environment-based origin configuration

## Next Steps

1. **Database Setup**: Replace mock data with Prisma/PostgreSQL
2. **Image Upload**: Add file upload endpoints
3. **Payment Integration**: Add payment processing
4. **Admin Panel**: Add admin-only endpoints
5. **Testing**: Add comprehensive test suite
