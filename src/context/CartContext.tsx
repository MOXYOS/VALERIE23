"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { CompanionModel } from "@/data/models";

export interface CartItem {
  id: string; // Unique ID for the cart item
  model: CompanionModel;
  selections: Record<string, string>;
  finalPrice?: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (model: CompanionModel, selections: Record<string, string>, finalPrice?: number) => void;
  removeFromCart: (itemId: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (model: CompanionModel, selections: Record<string, string>, finalPrice?: number) => {
    const newItem: CartItem = {
      id: `${model.id}-${Date.now()}`,
      model,
      selections,
      finalPrice,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter(item => item.id !== itemId));
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ cart, isCartOpen, addToCart, removeFromCart, toggleCart, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
