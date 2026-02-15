"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (posts.length === 0) return null;

  const anim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5, delay },
        };

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Subtle gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div {...anim(0)} className="text-center mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Нашият блог
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Последни <span className="text-primary">статии</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Разгледайте нашия блог за актуални новини и съвети по счетоводство и данъци
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {posts.slice(0, 3).map((post, index) => (
            <motion.div key={post._id} {...anim(0.1 + index * 0.1)}>
              <Link href={`/blog/${post.slug.current}`} className="group block h-full">
                <article className="h-full bg-white/[0.05] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  {post.mainImage && (
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={getImageUrl(post.mainImage)}
                        alt={post.mainImage.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                          Блог
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        5 мин
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-white/40 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-primary font-semibold text-sm">
                      <span>Прочети повече</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div {...anim(0.4)} className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(25,191,183,0.25)] transition-all duration-300"
          >
            Всички статии
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
