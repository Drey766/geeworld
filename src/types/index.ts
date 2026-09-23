export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  original_price?: number;
  images: string[];
  color: string;
  sizes: string[];
  category: "shirts" | "hoodies" | "jackets" | "suits" | "dresses" | "women" | "essentials";
  gender: "men" | "women" | "unisex";
  sku: string;
  is_featured: boolean;
  is_new: boolean;
  is_trending: boolean;
  in_stock: boolean;
  rating: number;
  review_count: number;
}

export interface CartItem {
  product: Product;
  selected_size: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  added_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  id: string;
  q: string;
  a: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  read_time: string;
  content: string;
  cover_image: string;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  county: string;
  town: string;
  address: string;
}
