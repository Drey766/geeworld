"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/data/blogs.json";
import { BlogPost } from "@/types";
import { brand } from "@/config/brand";

const blogs = blogsData as BlogPost[];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) return notFound();

  return (
    <div className="container-site pt-6 pb-16 max-w-2xl">
      <Link href="/blog" className="text-brand-muted text-sm hover:text-brand-primary">
        ← {brand.sections.worldTalk}
      </Link>
      <p className="text-xs text-brand-muted uppercase tracking-wide mt-4">
        {post.author} · {post.date} · {post.read_time}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl tracking-wide mt-2 leading-tight">{post.title}</h1>
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-brand-dark2 mt-6">
        <Image src={post.cover_image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" priority />
      </div>
      <div className="prose-article mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
