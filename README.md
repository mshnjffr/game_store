# Full-Stack Game E-commerce Application

A modern full-stack JavaScript application for buying games, built with Next.js 15, Express.js, and PostgreSQL.

## 🚀 Technology Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Hook Form** + **Zod** for form validation
- **Context API** for state management

### Backend
- **Express.js** REST API
- **Prisma ORM** with PostgreSQL
- **Session-based authentication** with bcrypt
- **CORS** and security middleware

### Database
- **PostgreSQL** with Prisma migrations
- **Seeded** with 10 popular games
- **Normalized schema** with relations

## 📋 Features

- 🎮 **Game Catalog** - Browse and search games
- 🔍 **Advanced Search** - Filter by category, price, rating
- 🛒 **Shopping Cart** - Add/remove items, persistent cart
- 🔐 **Authentication** - Register, login, session management
- 📦 **Order Management** - Create orders, view order history
- ⭐ **Reviews & Ratings** - Leave reviews for games
- 📱 **Responsive Design** - Mobile-friendly interface
- 🖼️ **Image Optimization** - Next.js Image component

## 🛠️ Installation & Setup

### Prerequisites Installation

Before cloning this repository, ensure you have the following tools installed:

#### **macOS Installation**

**1. Install Homebrew (if not already installed)**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**2. Install Node.js and npm**
```bash
# Install Node.js (includes npm)
brew install node

# Verify installation
node --version  # Should show v18.0.0 or higher
npm --version   # Should show v9.0.0 or higher
```

**3. Install PostgreSQL**
```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Create a database user (optional)
createuser --superuser $(whoami)
```

**4. Install Git**
```bash
# Install Git
brew install git

# Verify installation
git --version
```

#### **Windows Installation**

**1. Install Node.js and npm**
- Visit [nodejs.org](https://nodejs.org/en/download/current)
- Download the Windows Installer (.msi) for Node.js v24.3.0+
- Run the installer and follow the setup wizard
- **Alternative using winget:**
```powershell
# Using Windows Package Manager
winget install OpenJS.NodeJS

# Verify installation
node --version  # Should show v18.0.0 or higher
npm --version   # Should show v9.0.0 or higher
```

**2. Install PostgreSQL**
- Visit [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
- Download the PostgreSQL installer for Windows
- Run the installer and follow the setup wizard
- **Remember the password you set for the `postgres` user**
- **Alternative using winget:**
```powershell
winget install PostgreSQL.PostgreSQL
```

**3. Install Git**
- Visit [git-scm.com/download/win](https://git-scm.com/download/win)
- Download Git for Windows
- Run the installer with default settings
- **Alternative using winget:**
```powershell
winget install Git.Git
```

**4. Verify Installation (Windows)**
Open Command Prompt or PowerShell and run:
```powershell
node --version
npm --version
git --version
psql --version
```

### Installation Requirements
- **Node.js 18+** and **npm 9+**
- **PostgreSQL 14+** database
- **Git** for version control

### 1. Clone the Repository
```bash
git clone <repository-url>
cd full-stack-js-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Copy the example environment files:
```bash
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Update the environment variables:

**Backend (.env)**:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/gamestore"
SESSION_SECRET="your-super-secret-session-key"
NODE_ENV="development"
PORT=5000
CORS_ORIGIN="http://localhost:3000"
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Database Setup
```bash
# Create database and run migrations
npm run db:setup

# Or manually:
cd backend
npx prisma migrate dev
npm run db:seed
```

### 5. Start Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:5000
```

## 📖 Available Scripts

### Root Level Commands
```bash
npm run install-all # Install all dependencies
npm run dev         # Start both frontend and backend
npm run build       # Build frontend for production
npm run start       # Start production servers
npm run db:setup    # Initialize database with migrations and seed data
npm run db:seed     # Seed database with sample data
npm run db:reset    # Reset database and reseed
npm run db:studio   # Open Prisma Studio
npm run clean       # Clean all node_modules and build files
```

### Individual Services
```bash
npm run dev:frontend    # Start Next.js development server
npm run dev:backend     # Start Express.js development server
npm run build:backend   # Build backend for production
```

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts with authentication
- **categories** - Game categories (Sandbox, FPS, etc.)
- **games** - Game catalog with pricing and details
- **game_images** - Game screenshots and cover images
- **orders** - User purchase orders
- **order_items** - Individual items in orders
- **reviews** - User reviews and ratings

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
POST   /api/auth/logout      # User logout
GET    /api/auth/session     # Check session status
```

### Games
```
GET    /api/games                    # Get all games
GET    /api/games/:id               # Get game by ID
GET    /api/games/category/:slug    # Get games by category
GET    /api/games/search            # Search games with filters
POST   /api/games/:id/reviews       # Add game review
```

### Orders
```
POST   /api/orders          # Create new order
GET    /api/orders          # Get user's orders
GET    /api/orders/:id      # Get order by ID
PUT    /api/orders/:id      # Update order status
```

## 🎯 Sample Data

The application comes with seeded data including:

### Sample Users (use these to login)
- **john.doe@email.com** / **password123**
- **jane.smith@email.com** / **password123**  
- **gamer@email.com** / **password123**

### Featured Games
1. **Minecraft** - $29.99
2. **Fortnite** - Free
3. **Counter-Strike 2** - Free
4. **Call of Duty: Black Ops 6** - $69.99 ($59.99 discounted)
5. **ROBLOX** - Free
6. **Monster Hunter Wilds** - $59.99 ($47.99 discounted)
7. **Ghost of Yōtei** - $69.99
8. **Grand Theft Auto VI** - $79.99
9. **Mario Kart 8 Deluxe** - $59.99 ($49.99 discounted)
10. **Phasmophobia** - $19.99 ($13.99 discounted)

## 🛡️ Security Features

- **Password Hashing** - bcrypt with 12 rounds
- **Session Management** - Secure HTTP-only cookies
- **CORS Protection** - Configured for development/production
- **Rate Limiting** - 100 requests per minute per IP
- **Input Validation** - Server-side validation with Joi
- **SQL Injection Prevention** - Prisma ORM parameterized queries

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
npm start
```

### Backend (Railway/Heroku)
```bash
cd backend
npm run build
npm start
```

### Database (Railway/Supabase)
Set `DATABASE_URL` to your production PostgreSQL connection string.

## 📁 Project Structure

```
/
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom hooks
│   └── lib/             # Utilities
├── backend/              # Express.js API
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/  # Custom middleware
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utilities
│   │   └── config/      # Configuration
│   └── prisma/          # Database schema & migrations
├── images/              # Static game images
├── ai-docs/             # Project documentation
├── package.json         # Root package.json with scripts
└── README.md           # This file
```

## 🔧 Development

### Adding New Games
1. Add images to `backend/images/games/` following naming convention
2. Update the seed file in `backend/prisma/seed.js`
3. Run `npm run db:seed`

### Adding New Features
1. Update database schema in `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev` to create migration
3. Update API controllers and routes
4. Update frontend components and pages

## 🐛 Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify DATABASE_URL in .env files
- Run `npm run db:setup` to reinitialize

### CORS Errors
- Ensure CORS_ORIGIN matches frontend URL
- Check both servers are running on correct ports

### Image Loading Issues
- Verify images exist in `backend/images/` directory
- Check static file serving middleware in Express


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.
