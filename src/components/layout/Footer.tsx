"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import { brand } from "@/config/brand";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <>
      <footer className="border-t border-brand-mid bg-brand-dark mt-16">
        <div className="container-site section-padding grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-2xl text-brand-white">{brand.shortName}</span>
            <p className="text-brand-muted text-sm mt-3">{brand.copy.footerTagline}</p>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-light mt-4 hover:text-brand-primary"
            >
              <Instagram size={16} /> {brand.instagramHandle}
            </a>
          </div>

          <div>
            <h3 className="text-brand-white font-semibold mb-3 text-sm uppercase tracking-wide">Shop</h3>
            <ul className="space-y-2 text-sm text-brand-muted">
              {brand.categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/shop?category=${cat.slug}`} className="hover:text-brand-primary">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-brand-white font-semibold mb-3 text-sm uppercase tracking-wide">
              {brand.sections.visitStore}
            </h3>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li>{brand.address}</li>
              <li>{brand.hours}</li>
              <li>{brand.phone}</li>
              <li>{brand.deliveryArea}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-white font-semibold mb-3 text-sm uppercase tracking-wide">Stay Fresh</h3>
            <p className="text-sm text-brand-muted mb-3">{brand.copy.newsletter}</p>
            {submitted ? (
              <p className="text-sm text-brand-primary">You're on the list ✨</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
                <button type="submit" className="btn-outline">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-brand-mid">
          <div className="container-site py-4 text-xs text-brand-muted flex flex-col sm:flex-row justify-between gap-2">
            <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
            <span>Designed for a curated wardrobe, delivered countrywide.</span>
          </div>
        </div>
      </footer>

      <a
        href={brand.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-30 bg-[#25D366] text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-black/40 active:scale-95 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
}
