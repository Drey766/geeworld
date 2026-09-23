"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Heart, Search } from "lucide-react";
import { brand } from "@/config/brand";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-brand-black/95 backdrop-blur border-b border-brand-mid">
      <div className="container-site flex items-center justify-between h-16">
        <button
          className="lg:hidden btn-ghost !px-2"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="font-display text-2xl tracking-wide text-brand-white">
          {brand.shortName}
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {brand.categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="text-sm text-brand-light hover:text-brand-primary transition-colors"
            >
              {cat.label}
            </Link>
          ))}
          <Link href="/shop" className="text-sm text-brand-light hover:text-brand-primary transition-colors">
            Shop All
          </Link>
          <Link href="/blog" className="text-sm text-brand-light hover:text-brand-primary transition-colors">
            {brand.sections.worldTalk}
          </Link>
          <Link href="/contact" className="text-sm text-brand-light hover:text-brand-primary transition-colors">
            {brand.sections.visitStore}
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/shop" className="btn-ghost !px-2" aria-label="Search products">
            <Search size={20} />
          </Link>
          <Link href="/wishlist" className="btn-ghost !px-2 relative" aria-label="Wishlist">
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-brand-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="btn-ghost !px-2 relative" aria-label="Cart">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-brand-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-brand-dark border-r border-brand-mid p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xl text-brand-white">{brand.shortName}</span>
              <button className="btn-ghost !px-2" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="min-h-[44px] flex items-center text-brand-white font-semibold border-b border-brand-mid"
              >
                Shop All
              </Link>
              {brand.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="min-h-[44px] flex items-center gap-2 text-brand-light border-b border-brand-mid"
                >
                  <span>{cat.icon}</span> {cat.label}
                </Link>
              ))}
              <Link href="/blog" onClick={() => setOpen(false)} className="min-h-[44px] flex items-center text-brand-light border-b border-brand-mid">
                {brand.sections.worldTalk}
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="min-h-[44px] flex items-center text-brand-light">
                {brand.sections.visitStore}
              </Link>
            </nav>
            <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-auto">
              DM Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
