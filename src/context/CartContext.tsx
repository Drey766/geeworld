"use client";

import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; size: string; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string; size: string }
  | { type: "UPDATE_QUANTITY"; productId: string; size: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.selected_size === action.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.selected_size === action.size
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { product: action.product, selected_size: action.size, quantity: action.quantity },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.selected_size === action.size)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId && i.selected_size === action.size
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "geewrld_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // storage unavailable — cart still works in-memory
    }
  }, [state.items]);

  const addItem = (product: Product, size: string, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", product, size, quantity });
  const removeItem = (productId: string, size: string) =>
    dispatch({ type: "REMOVE_ITEM", productId, size });
  const updateQuantity = (productId: string, size: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, size, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
