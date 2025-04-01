"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import CartDTO from "@/types/cart/cartDTO";

interface CartContextType {
  cart: CartDTO | null;
  updateCart: (newCart: CartDTO) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, initialCart }: { children: ReactNode; initialCart: CartDTO }) {
  const [cart, setCart] = useState<CartDTO>(initialCart);

  const updateCart = (newCart: CartDTO) => {
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
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