"use client";

import Link from "next/link";
import Image from "next/image";
import blogsData from "@/data/blogs.json";
import { BlogPost } from "@/types";
import { brand } from "@/config/brand";

const blogs = blogsData as BlogPost[];

export default function BlogPage() {
  return (
    <div className="container-site pt-6 pb-10">
      <p className="section-tag">{brand.sections.worldTalk}</p>
      <h1 className="font-display text-3xl tracking-wide mb-6">Style notes, guides & good sense</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="card block overflow-hidden hover:border-brand-primary transition-colors">
            <div className="relative aspect-[16/10] bg-brand-dark2">
              <Image src={post.cover_image} alt={post.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-xs text-brand-muted uppercase tracking-wide">
                {post.date} · {post.read_time}
              </p>
              <h2 className="font-display text-xl tracking-wide mt-2 leading-snug">{post.title}</h2>
              <p className="text-brand-muted text-sm mt-2 line-clamp-3">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
