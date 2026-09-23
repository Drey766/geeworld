"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { WishlistItem, Product } from "@/types";

interface WishlistContextValue {
  items: WishlistItem[];
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  removeItem: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const STORAGE_KEY = "geewrld_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — wishlist still works in-memory
    }
  }, [items, hydrated]);

  const isWishlisted = (productId: string) => items.some((i) => i.product.id === productId);

  const toggleItem = (product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) {
        return prev.filter((i) => i.product.id !== product.id);
      }
      return [...prev, { product, added_at: new Date().toISOString() }];
    });
  };

  const removeItem = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== productId));

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted, removeItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
