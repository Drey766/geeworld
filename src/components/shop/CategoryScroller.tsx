"use client";

import Link from "next/link";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

export default function CategoryScroller({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory px-4 sm:justify-center sm:flex-wrap sm:overflow-visible sm:px-0">
      {brand.categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/shop?category=${cat.slug}`}
          className={cn(
            "category-pill",
            activeCategory === cat.slug && "border-brand-primary text-brand-primary bg-brand-dark"
          )}
        >
          <span>{cat.icon}</span> {cat.label}
        </Link>
      ))}
    </div>
  );
}
