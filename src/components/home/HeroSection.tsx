import Link from "next/link";
import { brand } from "@/config/brand";

export default function HeroSection() {
  const marqueeText = `${brand.tagline} · Shirts · Hoodies · Jackets · Suits · Dresses · Countrywide Delivery · ${brand.shortName}`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 arch-glow pointer-events-none" />
      <div className="container-site relative flex flex-col items-center justify-center min-h-[75vh] py-16 text-center">
        <p className="section-tag inline-block">{brand.shortName} Clothing Store</p>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wide text-brand-white leading-[0.95] mt-3">
          {brand.copy.heroHeadline}
        </h1>
        <p className="text-brand-light max-w-md mx-auto mt-5 text-base sm:text-lg">
          {brand.copy.heroSubtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link href="/shop" className="btn-primary">
            Shop Now
          </Link>
          <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            DM Us
          </a>
        </div>
      </div>

      <div className="border-y border-brand-mid py-3 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span key={i} className="font-display text-sm tracking-widest text-brand-primary px-4 whitespace-nowrap">
              {marqueeText}&nbsp;&nbsp;&nbsp;{marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
