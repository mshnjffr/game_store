export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameImage {
  id: number;
  gameId: number;
  url: string;
  altText: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface Review {
  id: number;
  userId: number;
  gameId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  categoryId: number;
  developer: string;
  publisher: string;
  releaseDate: string;
  rating: number;
  platform: string;
  stockQuantity: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  images?: GameImage[];
  reviews?: Review[];
}

export interface CartItem {
  id: number;
  gameId: number;
  quantity: number;
  price: number;
  game: Game;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  gameId: number;
  quantity: number;
  price: number;
  createdAt: string;
  game?: Game;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface GameSearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  platform?: string;
  sortBy?: "name" | "price" | "rating" | "releaseDate";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface GameSearchResponse {
  games: Game[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface SessionResponse {
  authenticated: boolean;
  user?: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CheckoutData {
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod: string;
}
