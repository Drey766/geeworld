"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { brand } from "@/config/brand";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <p className="text-brand-light text-lg">{brand.copy.emptyCart}</p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site pt-6 pb-32 lg:pb-10">
      <h1 className="font-display text-3xl tracking-wide mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selected_size}`} className="card p-3 flex gap-3">
            <Link href={`/shop/${item.product.slug}`} className="relative w-20 h-24 shrink-0 rounded-md overflow-hidden bg-brand-dark2">
              <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/shop/${item.product.slug}`} className="text-sm text-brand-white line-clamp-2">
                {item.product.name}
              </Link>
              <p className="text-brand-muted text-xs mt-1">Size: {item.selected_size}</p>
              <p className="text-brand-primary font-semibold mt-1">{formatPrice(item.product.price)}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 border border-brand-mid rounded-md">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity - 1)}
                    className="w-9 h-9 flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.product.id, item.selected_size)}
                  aria-label="Remove item"
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 mt-6 flex items-center justify-between">
        <span className="text-brand-light">Subtotal</span>
        <span className="text-xl font-semibold text-brand-primary">{formatPrice(subtotal)}</span>
      </div>
      <p className="text-brand-muted text-xs mt-2">Delivery fee calculated at checkout.</p>

      <div className="hidden lg:block mt-6">
        <Link href="/checkout" className="btn-primary w-full">
          Proceed to Checkout
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-brand-dark border-t border-brand-mid p-3">
        <Link href="/checkout" className="btn-primary w-full">
          Checkout — {formatPrice(subtotal)}
        </Link>
      </div>
    </div>
  );
}
