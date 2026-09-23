import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import productsData from "@/data/products.json";
import testimonialsData from "@/data/testimonials.json";
import blogsData from "@/data/blogs.json";
import { Product, Testimonial, BlogPost } from "@/types";
import { brand } from "@/config/brand";
import ProductCard from "@/components/shop/ProductCard";

const products = productsData as Product[];
const testimonials = testimonialsData as Testimonial[];
const blogs = blogsData as BlogPost[];

const WHY_US = [
  { icon: "👔", title: "Curated, Not Cluttered", text: "Every piece is chosen with intention — shirts to suits, all in one place." },
  { icon: "📦", title: "Countrywide Delivery", text: "Wherever you are in Kenya, your order finds its way to you." },
  { icon: "📍", title: "Come See Us", text: `${brand.address.split(",").slice(0, 2).join(",")}. Open ${brand.hours}.` },
  { icon: "📞", title: "We're a Call Away", text: "Sizing questions or styling advice? Reach out — we're happy to help." },
];

export default function HomeSections() {
  const featured = products.filter((p) => p.is_featured).slice(0, 8);

  return (
    <>
      {/* Fresh In */}
      <section className="section-padding container-site">
        <p className="section-tag">{brand.sections.freshIn}</p>
        <h2 className="font-display text-3xl tracking-wide mb-6">New pieces, just landed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop" className="btn-outline">
            Shop All
          </Link>
        </div>
      </section>

      {/* Shop the Categories */}
      <section className="section-padding container-site border-t border-brand-mid">
        <p className="section-tag">{brand.sections.shopCategories}</p>
        <h2 className="font-display text-3xl tracking-wide mb-6">Find your line-up</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
          {brand.categories.map((cat) => {
            const sample = products.find((p) => p.category === cat.slug);
            return (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="snap-start flex-shrink-0 w-40 sm:w-auto relative aspect-[3/4] rounded-lg overflow-hidden border border-brand-mid group"
              >
                {sample && (
                  <Image
                    src={sample.images[0]}
                    alt={cat.label}
                    fill
                    sizes="200px"
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <p className="font-display text-lg tracking-wide text-brand-white leading-tight mt-1">
                    {cat.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why GEE.WRLD */}
      <section className="section-padding container-site border-t border-brand-mid">
        <p className="section-tag">{brand.sections.whyUs}</p>
        <h2 className="font-display text-3xl tracking-wide mb-6">Why shop with us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_US.map((item) => (
            <div key={item.title} className="card p-5">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-display text-lg tracking-wide mt-3">{item.title}</h3>
              <p className="text-brand-muted text-sm mt-1.5">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Style Notes */}
      <section className="section-padding container-site border-t border-brand-mid">
        <p className="section-tag">{brand.sections.styleNotes}</p>
        <h2 className="font-display text-3xl tracking-wide mb-6">What Nairobi's saying</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-5">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? "fill-brand-primary text-brand-primary" : "text-brand-mid"}
                  />
                ))}
              </div>
              <p className="text-brand-light text-sm leading-relaxed">{t.text}</p>
              <p className="text-brand-muted text-xs mt-3">
                {t.name} · {t.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* World Talk */}
      <section className="section-padding container-site border-t border-brand-mid">
        <p className="section-tag">{brand.sections.worldTalk}</p>
        <h2 className="font-display text-3xl tracking-wide mb-6">From the blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {blogs.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card block overflow-hidden hover:border-brand-primary transition-colors">
              <div className="relative aspect-[16/10] bg-brand-dark2">
                <Image src={post.cover_image} alt={post.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs text-brand-muted uppercase tracking-wide">{post.read_time}</p>
                <h3 className="font-display text-lg tracking-wide mt-1.5 leading-snug">{post.title}</h3>
                <p className="text-brand-muted text-sm mt-2 line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="btn-ghost">
            Read more →
          </Link>
        </div>
      </section>

      {/* WhatsApp CTA Banner */}
      <section className="container-site pb-16">
        <div className="card p-8 text-center border-brand-primary/40">
          <h2 className="font-display text-2xl tracking-wide">{brand.copy.whatsappCta}</h2>
          <a
            href={brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-5 inline-flex"
          >
            Chat With Us
          </a>
        </div>
      </section>
    </>
  );
}
