"use client";

import { X } from "lucide-react";

export interface ShopFilters {
  gender: string;
  brand: string;
  size: string;
  color: string;
  onSale: boolean;
  priceMax: number;
}

interface FilterSheetProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  brands: string[];
  sizes: string[];
  colors: string[];
  maxPrice: number;
  onClose?: () => void;
  isMobileSheet?: boolean;
}

export default function FilterSheet({
  filters,
  onChange,
  brands,
  sizes,
  colors,
  maxPrice,
  onClose,
  isMobileSheet,
}: FilterSheetProps) {
  const content = (
    <div className="space-y-5">
      {isMobileSheet && (
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl tracking-wide">Filters</h2>
          <button onClick={onClose} aria-label="Close filters" className="btn-ghost !px-2">
            <X size={20} />
          </button>
        </div>
      )}

      <div>
        <label className="label">Gender</label>
        <select
          className="input"
          value={filters.gender}
          onChange={(e) => onChange({ ...filters, gender: e.target.value })}
        >
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      <div>
        <label className="label">Brand</label>
        <select
          className="input"
          value={filters.brand}
          onChange={(e) => onChange({ ...filters, brand: e.target.value })}
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Size</label>
        <select
          className="input"
          value={filters.size}
          onChange={(e) => onChange({ ...filters, size: e.target.value })}
        >
          <option value="">All sizes</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Colour</label>
        <select
          className="input"
          value={filters.color}
          onChange={(e) => onChange({ ...filters, color: e.target.value })}
        >
          <option value="">All colours</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Max price — KSh {filters.priceMax.toLocaleString()}</label>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={500}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-brand-primary"
        />
      </div>

      <label className="flex items-center gap-2 min-h-[44px] text-brand-light">
        <input
          type="checkbox"
          checked={filters.onSale}
          onChange={(e) => onChange({ ...filters, onSale: e.target.checked })}
          className="w-5 h-5 accent-brand-primary"
        />
        On Sale only
      </label>

      <button
        className="btn-outline w-full"
        onClick={() =>
          onChange({ gender: "", brand: "", size: "", color: "", onSale: false, priceMax: maxPrice })
        }
      >
        Reset Filters
      </button>
    </div>
  );

  if (isMobileSheet) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <div className="absolute bottom-0 left-0 right-0 bg-brand-dark border-t border-brand-mid rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return <aside className="hidden lg:block w-64 shrink-0 card p-5">{content}</aside>;
}
