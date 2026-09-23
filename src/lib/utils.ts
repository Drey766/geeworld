import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return `KSh ${value.toLocaleString("en-KE")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const KENYA_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Kiambu", "Machakos",
  "Kajiado", "Meru", "Nyeri", "Kakamega", "Bungoma", "Kilifi", "Kwale", "Kisii",
  "Kericho", "Bomet", "Nandi", "Trans Nzoia", "Laikipia", "Embu", "Murang'a",
  "Kirinyaga", "Nyandarua", "Narok", "Migori", "Homa Bay", "Siaya", "Vihiga",
  "Busia", "Turkana", "West Pokot", "Baringo", "Elgeyo Marakwet", "Samburu",
  "Isiolo", "Marsabit", "Garissa", "Wajir", "Mandera", "Tana River", "Lamu",
  "Taita Taveta", "Makueni", "Kitui", "Tharaka Nithi", "Nyamira",
];

export function getShippingFee(county: string): number {
  return county === "Nairobi" ? 300 : 500;
}

export function generateOrderId(): string {
  return `GW-${Date.now()}`;
}
