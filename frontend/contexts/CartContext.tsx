'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Game } from '@/types';

interface CartContextType extends Cart {
  addItem: (game: Game, quantity?: number) => void;
  removeItem: (gameId: number) => void;
  updateQuantity: (gameId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { game: Game; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { gameId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { gameId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { game, quantity } = action.payload;
      const existingItem = state.items.find(item => item.gameId === game.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.gameId === game.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, {
          id: Date.now(), // Simple ID generation for client-side
          gameId: game.id,
          quantity,
          price: game.discountPrice || game.price,
          game,
        }];
      }
      
      return calculateTotals(newItems);
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.gameId !== action.payload.gameId);
      return calculateTotals(newItems);
    }
    
    case 'UPDATE_QUANTITY': {
      const { gameId, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.gameId !== gameId);
        return calculateTotals(newItems);
      }
      
      const newItems = state.items.map(item =>
        item.gameId === gameId
          ? { ...item, quantity }
          : item
      );
      return calculateTotals(newItems);
    }
    
    case 'CLEAR_CART':
      return { items: [], totalAmount: 0, totalItems: 0 };
    
    case 'LOAD_CART':
      return calculateTotals(action.payload);
    
    default:
      return state;
  }
};

function calculateTotals(items: CartItem[]): Cart {
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { items, totalAmount, totalItems };
}

const initialState: Cart = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gamestore_cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('gamestore_cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  const addItem = (game: Game, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { game, quantity } });
  };

  const removeItem = (gameId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { gameId } });
  };

  const updateQuantity = (gameId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { gameId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
