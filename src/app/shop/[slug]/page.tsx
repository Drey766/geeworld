"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ChevronDown } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { brand } from "@/config/brand";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SizeSelector from "@/components/ui/SizeSelector";
import ProductCard from "@/components/shop/ProductCard";

const products = productsData as Product[];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [careOpen, setCareOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();

  if (!product) {
    notFound();
    return null;
  }

  const onSale = !!product.original_price && product.original_price > product.price;
  const wishlisted = isWishlisted(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  function handleAddToCart() {
    if (!selectedSize || !product) return;
    addItem(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in "${product.name}" (${formatPrice(product.price)}) from ${brand.shortName}. Is it available?`
  );

  return (
    <div className="pb-28 lg:pb-10">
      <div className="container-site pt-6 grid lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] bg-brand-dark2 rounded-lg overflow-hidden">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative w-16 h-20 shrink-0 rounded-md overflow-hidden border",
                    i === activeImage ? "border-brand-primary" : "border-brand-mid"
                  )}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="gender-tag">
            {product.brand} · {product.gender}
          </p>
          <h1 className="font-display text-3xl tracking-wide mt-1">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(product.rating) ? "fill-brand-primary text-brand-primary" : "text-brand-mid"}
              />
            ))}
            <span className="text-brand-muted text-sm ml-1">
              {product.rating} ({product.review_count} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-semibold text-brand-primary">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-brand-muted line-through">{formatPrice(product.original_price!)}</span>
            )}
            {product.is_trending && <span className="badge-trending">Selling Fast 🔥</span>}
          </div>

          <p className="text-brand-light text-sm mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <p className="label">Colour: {product.color}</p>
          </div>

          <div className="mt-4">
            <p className="label">{brand.sections.findYourFit}</p>
            <SizeSelector sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />
            {!selectedSize && <p className="text-brand-muted text-xs mt-2">Select a size to add to cart</p>}
          </div>

          <div className="hidden lg:flex gap-3 mt-6">
            <button onClick={handleAddToCart} className="btn-primary flex-1" disabled={!selectedSize}>
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleItem(product)}
              aria-label="Toggle wishlist"
              className="btn-outline !px-4"
            >
              <Heart size={18} className={cn(wishlisted && "fill-brand-primary text-brand-primary")} />
            </button>
          </div>

          <p className="text-sm text-brand-primary mt-4">{brand.copy.deliveryBadge}</p>

          <a
            href={`${brand.whatsappUrl}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-4 w-full"
          >
            Check My Size on WhatsApp
          </a>

          <div className="mt-6 border-t border-brand-mid pt-4">
            <button
              onClick={() => setCareOpen((v) => !v)}
              className="flex items-center justify-between w-full text-left min-h-[44px]"
            >
              <span className="font-semibold text-brand-white">Care Instructions</span>
              <ChevronDown size={18} className={cn("transition-transform", careOpen && "rotate-180")} />
            </button>
            {careOpen && (
              <p className="text-brand-muted text-sm mt-2">
                Check label for wash instructions. Store folded or hung to maintain shape.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky mobile add to cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-brand-dark border-t border-brand-mid p-3 flex gap-3">
        <button
          onClick={() => toggleItem(product)}
          aria-label="Toggle wishlist"
          className="btn-outline !px-4"
        >
          <Heart size={18} className={cn(wishlisted && "fill-brand-primary text-brand-primary")} />
        </button>
        <button onClick={handleAddToCart} className="btn-primary flex-1" disabled={!selectedSize}>
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>

      {/* You Might Also Love */}
      {related.length > 0 && (
        <section className="container-site mt-14">
          <h2 className="font-display text-2xl tracking-wide mb-4">You Might Also Love</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
            {related.map((p) => (
              <div key={p.id} className="w-40 shrink-0 sm:w-auto">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
