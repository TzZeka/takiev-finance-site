"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Dots pattern background */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #19BFB7 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#19BFB7]/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#40514E]/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#19BFB7] tracking-wider uppercase">
              Нашият блог
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Последни <span className="text-[#19BFB7]">статии</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Разгледайте нашия блог за актуални новини и съвети по счетоводство и данъци
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 3).map((post, index) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className={`group block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <article className="h-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-[#19BFB7] transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                {post.mainImage && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={getImageUrl(post.mainImage)}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#19BFB7] text-white text-xs font-semibold rounded">
                        Блог
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      5 мин
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#19BFB7] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center text-[#19BFB7] font-semibold text-sm">
                    <span>Прочети повече</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-[#19BFB7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#19BFB7] text-white font-semibold rounded-lg hover:bg-[#40514E] transition-colors duration-300"
          >
            Всички статии
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
