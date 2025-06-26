# GameStore Frontend

A modern React/Next.js 15 frontend application for the GameStore e-commerce platform.

## 🚀 Features

- **Next.js 15** with App Router architecture
- **React 18** with TypeScript
- **Tailwind CSS** for styling with shadcn/ui components
- **Session-based authentication** with Context API
- **Shopping cart** with localStorage persistence
- **Responsive design** optimized for all devices
- **Form validation** with React Hook Form + Zod
- **Loading states** and error boundaries
- **Game search** and filtering functionality

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home page with featured games
├── loading.tsx             # Global loading UI
├── error.tsx               # Global error boundary
├── not-found.tsx           # 404 page
├── (auth)/                 # Authentication pages
│   ├── login/page.tsx      # Login form
│   ├── register/page.tsx   # Registration form
│   └── layout.tsx          # Auth layout
├── games/                  # Game catalog
│   ├── page.tsx            # Games listing with filters
│   ├── [id]/page.tsx       # Game details
│   ├── category/[slug]/    # Category pages
│   └── loading.tsx         # Games loading state
├── cart/                   # Shopping cart
│   └── page.tsx            # Cart management
├── checkout/               # Checkout flow
│   ├── page.tsx            # Checkout form
│   └── success/page.tsx    # Order confirmation
├── account/                # User dashboard
│   ├── page.tsx            # Account overview
│   └── orders/page.tsx     # Order history
└── components/
    ├── ui/                 # Reusable UI components
    │   ├── button.tsx      # Button component
    │   ├── card.tsx        # Card component
    │   ├── input.tsx       # Input component
    │   └── ...            # Other UI components
    ├── game/              # Game-specific components
    │   ├── GameCard.tsx    # Game card display
    │   ├── GameList.tsx    # Game listing with pagination
    │   ├── GameDetails.tsx # Detailed game view
    │   └── GameSearch.tsx  # Search functionality
    └── layout/            # Layout components
        ├── Header.tsx      # Main navigation
        ├── Footer.tsx      # Footer links
        ├── Navigation.tsx  # Nav menu
        ├── Sidebar.tsx     # Filter sidebar
        └── CartIcon.tsx    # Cart counter
```

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API + useReducer
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API with custom utilities
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (Latest LTS)
- npm or yarn
- Backend API running on port 5000

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Visit [http://localhost:3000](http://localhost:3000)

### Build Commands

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

### API Integration

The frontend integrates with the backend API using custom utilities:

- **Authentication**: Session-based with HTTP-only cookies
- **CORS**: Configured for localhost development
- **Error Handling**: Centralized error management
- **Type Safety**: Full TypeScript integration

## 🎨 UI Components

### shadcn/ui Components

The project uses shadcn/ui for consistent, accessible components:

- Button, Card, Input, Label
- Select, Separator, Badge
- Form validation integration
- Customizable with Tailwind CSS

### Custom Components

**Game Components**:
- `GameCard`: Display game information with add-to-cart
- `GameList`: Paginated game listing with filters
- `GameDetails`: Comprehensive game view with images
- `GameSearch`: Search functionality with debouncing

**Layout Components**:
- `Header`: Navigation with auth status and cart
- `Footer`: Links and company information
- `Sidebar`: Advanced filtering options
- `CartIcon`: Live cart item counter

## 🛒 Shopping Cart

### Features

- **localStorage Persistence**: Cart survives page refreshes
- **Real-time Updates**: Instant quantity changes
- **Price Calculation**: Automatic totals with tax
- **Item Management**: Add, remove, update quantities
- **Responsive Design**: Optimized for mobile

### Cart Context API

```typescript
interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addItem: (game: Game, quantity?: number) => void;
  removeItem: (gameId: number) => void;
  updateQuantity: (gameId: number, quantity: number) => void;
  clearCart: () => void;
}
```

## 🔐 Authentication

### Session-based Auth

- **Login/Register**: Form validation with Zod
- **Session Management**: HTTP-only cookies
- **Protected Routes**: Automatic redirects
- **User Context**: Global auth state

### Auth Context API

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
```

## 🔍 Search & Filtering

### Advanced Search

- **Text Search**: Across title, description, developer
- **Category Filtering**: By game genre
- **Price Range**: Min/max price filters
- **Rating Filter**: Minimum rating threshold
- **Platform Filter**: PC, PlayStation, Xbox, etc.
- **Sorting**: By name, price, rating, release date

### Search Parameters

```typescript
interface GameSearchParams {
  q?: string;           // Search query
  category?: string;    // Category slug
  minPrice?: number;    // Minimum price
  maxPrice?: number;    // Maximum price
  rating?: number;      // Minimum rating
  platform?: string;    // Platform filter
  sortBy?: string;      // Sort field
  order?: 'asc' | 'desc'; // Sort order
  page?: number;        // Page number
  limit?: number;       // Items per page
}
```

## 🎯 Features

### Core Features

✅ **Home Page**: Featured games, categories, top-rated games  
✅ **Game Catalog**: Searchable, filterable game listing  
✅ **Game Details**: Comprehensive game information  
✅ **Shopping Cart**: Full cart management with localStorage  
✅ **Checkout**: Secure order processing  
✅ **User Authentication**: Login/register with session management  
✅ **User Account**: Order history and account management  
✅ **Responsive Design**: Mobile-first approach  

### UI/UX Features

✅ **Loading States**: Skeleton screens and spinners  
✅ **Error Handling**: Graceful error boundaries  
✅ **Form Validation**: Real-time validation feedback  
✅ **Image Optimization**: Next.js Image component  
✅ **Accessibility**: ARIA labels and keyboard navigation  
✅ **SEO Optimized**: Meta tags and semantic HTML  

## 🧪 Testing

### Type Safety

- Full TypeScript coverage
- Strict type checking enabled
- Interface definitions for all API responses
- Generic type utilities for reusability

### Error Boundaries

- Global error boundary for unhandled errors
- Component-level error handling
- Network error management
- Graceful fallback UI

## 🚀 Deployment

### Build Optimization

```bash
# Production build
npm run build

# Analyze bundle size
npm run build && npx @next/bundle-analyzer
```

### Environment Setup

1. Configure production environment variables
2. Set up CORS for production domain
3. Configure image optimization settings
4. Set up CDN for static assets

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

- Touch-friendly interface
- Optimized images for different screen sizes
- Simplified navigation for mobile
- Fast loading with code splitting

## 🔄 State Management

### Context Providers

- **AuthProvider**: User authentication state
- **CartProvider**: Shopping cart state
- Global state with useReducer patterns
- Efficient re-rendering with React.memo

## 🎨 Styling

### Tailwind CSS

- Utility-first CSS framework
- Custom design system variables
- Dark mode support (configurable)
- Responsive utilities

### CSS Custom Properties

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... more variables */
}
```

## 📋 TODO / Future Enhancements

- [ ] Dark mode toggle
- [ ] Wishlist functionality
- [ ] Game reviews and ratings
- [ ] Social sharing
- [ ] Progressive Web App (PWA)
- [ ] Advanced search filters
- [ ] Recommendation engine
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of a training exercise for full-stack JavaScript development.
