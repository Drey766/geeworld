"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { brand } from "@/config/brand";
import ProductCard from "@/components/shop/ProductCard";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <p className="text-brand-light text-lg">{brand.copy.emptyWishlist}</p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site pt-6 pb-10">
      <h1 className="font-display text-3xl tracking-wide mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.product.id} product={item.product} />
        ))}
      </div>
    </div>
  );
}
