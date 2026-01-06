import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from './supabase';

export type CartItem = {
  id: number;
  productId: string;
  name: string;
  price: number;
  mrp?: number;
  quantity: number;
  imageUrl?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cdm_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cdm_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const next: CartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        mrp: (product as any).mrp ?? product.price,
        imageUrl: product.image_url,
        quantity,
      };
      return [...prev, next];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
