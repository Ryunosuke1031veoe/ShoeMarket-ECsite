'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types/cart';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedItems = sessionStorage.getItem('cartItems');
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...currentItems, newItem];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}