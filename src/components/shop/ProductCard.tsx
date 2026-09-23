"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { brand } from "@/config/brand";

export default function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const onSale = !!product.original_price && product.original_price > product.price;

  return (
    <Link href={`/shop/${product.slug}`} className="product-card block group">
      <div className="relative aspect-[3/4] bg-brand-dark2 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-brand-black/60 backdrop-blur flex items-center justify-center"
        >
          <Heart size={16} className={cn(wishlisted ? "fill-brand-primary text-brand-primary" : "text-white")} />
        </button>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.is_new && <span className="badge-new">New</span>}
          {onSale && <span className="badge-sale">Sale</span>}
          {product.is_trending && <span className="badge-trending">Selling Fast 🔥</span>}
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-brand-muted uppercase tracking-wide truncate">{product.brand}</p>
        <h3 className="text-sm text-brand-white leading-snug line-clamp-2 mt-0.5 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-brand-primary font-semibold">{formatPrice(product.price)}</span>
          {onSale && (
            <span className="text-brand-muted text-xs line-through">
              {formatPrice(product.original_price!)}
            </span>
          )}
        </div>
        {!product.in_stock && <p className="badge-soldout mt-1.5">{brand.copy.outOfStock}</p>}
      </div>
    </Link>
  );
}
