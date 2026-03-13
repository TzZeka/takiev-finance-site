"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

// Calculate reading time from body blocks or fall back to excerpt estimate
function getReadingTime(post: BlogPost): number {
  if (post.readingTime) return post.readingTime;
  let words = 0;
  if (Array.isArray(post.body)) {
    (post.body as any[]).forEach((block) => {
      if (block?._type === "block" && Array.isArray(block.children)) {
        (block.children as any[]).forEach((child) => {
          if (child?.text) {
            words += (child.text as string).split(/\s+/).filter(Boolean).length;
          }
        });
      }
    });
  }
  if (!words && post.excerpt) {
    words = post.excerpt.split(/\s+/).filter(Boolean).length * 6;
  }
  if (!words) words = 200;
  return Math.max(1, Math.round(words / 200));
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const accent = post.accentColor || "#19BFB7";
  const readMins = getReadingTime(post);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.48,
        delay: Math.min(index * 0.07, 0.42),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 16px 48px ${accent}28, 0 4px 16px rgba(0,0,0,0.08)`,
      }}
      className="group h-full rounded-2xl"
    >
      <Link
        href={`/blog/${post.slug.current}`}
        id={`post-${post.slug.current}`}
        className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_2px_14px_rgba(0,0,0,0.05)] group-hover:border-primary/25 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 flex-shrink-0">
          {post.mainImage ? (
            <Image
              src={getImageUrl(post.mainImage)}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center">
              <span className="text-sm text-slate-300 font-medium tracking-wider">
                Takiev Finance
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tags on image */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-[#1b2b28] px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Featured — static dot, no ping */}
          {post.featured && (
            <div className="absolute top-3.5 right-3.5">
              <span className="w-2 h-2 rounded-full bg-primary block" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* Title */}
          <h3 className="text-[17px] md:text-[18px] font-bold text-[#1b2b28] leading-snug line-clamp-3 mb-3 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}

          <div className="flex-1" />

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] mt-auto">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {post.author && (
                <div className="flex items-center gap-2 min-w-0">
                  {post.author.image ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-black/10 flex-shrink-0">
                      <Image
                        src={getImageUrl(post.author.image)}
                        alt={post.author.name}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-primary">
                        {post.author.name[0]}
                      </span>
                    </div>
                  )}
                  <span className="text-[12px] font-medium text-slate-600 truncate">
                    {post.author.name}
                  </span>
                </div>
              )}
              <span className="text-[11px] text-slate-400 flex-shrink-0">
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-[11px] text-slate-400 flex-shrink-0">
                · {readMins} мин
              </span>
            </div>

            {/* Arrow with flip on hover */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.42, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-slate-50 border border-black/[0.06] flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-300 flex-shrink-0 ml-3"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
