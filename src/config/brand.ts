// =====================================================
// BRAND CONFIGURATION — SINGLE SOURCE OF TRUTH
// =====================================================
// To rebrand this entire site for a different shop, edit
// ONLY this file. Every page, component, and piece of copy
// imports its brand-specific values from here — nothing
// is hardcoded anywhere else in the codebase.

export const brand = {
  // ── IDENTITY ──
  name: "GEE.WRLD Clothing Store",
  shortName: "GEE.WRLD",
  tagline: "Wear the World Your Way.",
  taglineLong:
    "Curated clothing for every mood — shirts, hoodies, jackets, suits and more. Countrywide delivery.",
  instagramHandle: "@gee.wrld_clothing",
  instagramUrl: "https://www.instagram.com/gee.wrld_clothing/",

  // ── CONTACT ──
  phone: "0702 319 029",
  phoneIntl: "254702319029",
  whatsappUrl: "https://wa.me/254702319029",
  email: "hello@geewrld.co.ke",

  // ── LOCATION ──
  address: "Rasumal House, Shop 3F,17, 3rd Floor, Nairobi",
  deliveryArea: "Countrywide delivery",
  hours: "Mon–Sat, 9:30AM–7PM",

  // ── SIZING ──
  clothingSizes: ["XS", "S", "M", "L", "XL", "XXL"],

  // ── PRODUCT CATEGORIES ── (drives navbar, homepage, shop filters)
  categories: [
    { slug: "shirts", label: "Shirts", icon: "👔" },
    { slug: "hoodies", label: "Hoodies & Sweatshirts", icon: "🧥" },
    { slug: "jackets", label: "Jackets & Coats", icon: "🧥" },
    { slug: "suits", label: "Suits", icon: "🤵" },
    { slug: "dresses", label: "Dresses", icon: "👗" },
    { slug: "women", label: "Women's Fashion", icon: "👚" },
    { slug: "essentials", label: "Essentials", icon: "✨" },
  ],

  // ── VOICE / MICRO-COPY ──
  copy: {
    heroHeadline: "Wear the World Your Way.",
    heroSubtext:
      "Curated shirts, hoodies, jackets, suits and more — for every mood, every mission. Delivered countrywide.",
    emptyCart: "Cart's empty — your world's waiting to be dressed. 🌍",
    emptyWishlist: "Nothing saved yet? Go find your next fit. ✨",
    orderConfirmed:
      "Order confirmed! We're packaging your fit now — countrywide delivery on the way. 📦",
    loading: "Curating your look...",
    noResults: "Couldn't find that one — call/DM us, we might have it in store. 📞",
    footerTagline: "GEE.WRLD — Wear the World Your Way.",
    disclaimerText: "",
    newsletter: "New arrivals, first look. No spam, just style.",
    whatsappCta: "Not sure of your size or want to see more options? DM us — we're happy to help.",
    lowStock: "Almost gone — last few pieces.",
    outOfStock: "Sold out for now. DM us — we restock often.",
    deliveryBadge: "📦 Countrywide Delivery Available",
  },

  // ── SECTION LABELS ──
  sections: {
    freshIn: "Fresh In",
    shopCategories: "Shop the Categories",
    lineUp: "The Line-Up",
    styleNotes: "Style Notes",
    worldTalk: "World Talk",
    findYourFit: "Find Your Fit",
    visitStore: "Visit the Store",
    whyUs: "Why GEE.WRLD",
  },

  // ── COLOURS ── (keep in sync with tailwind.config.ts)
  colors: {
    primary: "#E8B84B",
    primaryLight: "#F0CC70",
    primaryDark: "#C99B2E",
    black: "#0D0D0D",
    dark: "#161616",
    dark2: "#202020",
    mid: "#333333",
    muted: "#8F8F8F",
    light: "#D8D8D8",
    white: "#F7F7F5",
  },

  // ── FONTS ──
  fonts: {
    display: "Bebas Neue",
    body: "DM Sans",
  },
} as const;

export type Brand = typeof brand;
