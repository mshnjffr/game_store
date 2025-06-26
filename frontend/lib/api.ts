import { 
  Game, 
  GameSearchParams, 
  GameSearchResponse, 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  Order, 
  Category,
  ApiResponse,
  AuthResponse,
  SessionResponse
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, errorData.error || 'API request failed');
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (credentials: RegisterCredentials): Promise<AuthResponse> =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: (): Promise<ApiResponse<null>> =>
    apiCall('/auth/logout', {
      method: 'POST',
    }),

  getSession: (): Promise<SessionResponse> =>
    apiCall('/auth/session'),
};

// Games API
export const gamesApi = {
  getAll: async (): Promise<Game[]> => {
    const response = await apiCall<{games: Game[], total: number}>('/games');
    return response.games;
  },

  getById: (id: number): Promise<Game> =>
    apiCall(`/games/${id}`),

  search: (params: GameSearchParams): Promise<GameSearchResponse> => {
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    ).toString();
    
    return apiCall(`/games/search?${queryString}`);
  },

  getByCategory: (slug: string): Promise<Game[]> =>
    apiCall(`/games/category/${slug}`),

  addReview: (gameId: number, review: { rating: number; comment: string }): Promise<any> =>
    apiCall(`/games/${gameId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    }),
};

// Categories API
export const categoriesApi = {
  getAll: (): Promise<Category[]> =>
    apiCall('/categories'),

  getBySlug: (slug: string): Promise<Category> =>
    apiCall(`/categories/slug/${slug}`),
};

// Orders API
export const ordersApi = {
  create: (orderData: { items: Array<{ gameId: number; quantity: number; price: number }>, shippingAddress: string }): Promise<Order> =>
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getAll: async (): Promise<{orders: Order[], pagination: any}> => {
    return apiCall('/orders');
  },

  getById: (id: number): Promise<Order> =>
    apiCall(`/orders/${id}`),
};

export { ApiError };
