"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { brand } from "@/config/brand";
import ProductCard from "@/components/shop/ProductCard";
import CategoryScroller from "@/components/shop/CategoryScroller";
import FilterSheet, { ShopFilters } from "@/components/shop/FilterSheet";

const products = productsData as Product[];
const MAX_PRICE = Math.max(...products.map((p) => p.price));

type SortOption = "newest" | "price-asc" | "price-desc" | "trending";

function ShopSkeleton() {
  return (
    <div className="container-site section-padding">
      <div className="h-8 w-40 bg-brand-dark2 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-brand-dark2 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filters, setFilters] = useState<ShopFilters>({
    gender: "",
    brand: "",
    size: "",
    color: "",
    onSale: false,
    priceMax: MAX_PRICE,
  });

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(), []);
  const colors = useMemo(() => Array.from(new Set(products.map((p) => p.color))).sort(), []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (filters.gender && p.gender !== filters.gender) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      if (filters.size && !p.sizes.includes(filters.size)) return false;
      if (filters.color && p.color !== filters.color) return false;
      if (filters.onSale && !(p.original_price && p.original_price > p.price)) return false;
      if (p.price > filters.priceMax) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "trending":
        list = [...list].sort((a, b) => Number(b.is_trending) - Number(a.is_trending));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.is_new) - Number(a.is_new));
    }
    return list;
  }, [category, filters, search, sort]);

  return (
    <div className="pb-10">
      <div className="container-site pt-6 pb-3">
        <h1 className="font-display text-3xl tracking-wide">{brand.sections.lineUp}</h1>
        <p className="text-brand-muted text-sm mt-1">{filtered.length} pieces found</p>
      </div>

      <div className="sticky top-16 z-20 bg-brand-black/95 backdrop-blur py-3 border-b border-brand-mid">
        <CategoryScroller activeCategory={category} />
      </div>

      <div className="container-site mt-4 flex gap-2 items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="input w-auto"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="trending">Trending</option>
        </select>
        <button className="btn-outline !px-3 lg:hidden" onClick={() => setSheetOpen(true)} aria-label="Open filters">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="container-site mt-6 flex gap-6">
        <FilterSheet
          filters={filters}
          onChange={setFilters}
          brands={brands}
          sizes={sizes}
          colors={colors}
          maxPrice={MAX_PRICE}
        />
        {sheetOpen && (
          <FilterSheet
            filters={filters}
            onChange={setFilters}
            brands={brands}
            sizes={sizes}
            colors={colors}
            maxPrice={MAX_PRICE}
            isMobileSheet
            onClose={() => setSheetOpen(false)}
          />
        )}

        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-brand-muted text-center py-16">{brand.copy.noResults}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
