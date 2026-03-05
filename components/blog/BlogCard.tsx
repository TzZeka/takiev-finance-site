import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group flex flex-col h-full bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" id={`post-${post.slug.current}`}>
      {/* Image Section */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-slate-50 flex-shrink-0 border-b border-black/5">
        {post.mainImage ? (
          <Image
            src={getImageUrl(post.mainImage)}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <span className="text-slate-300 font-medium tracking-wider">Takiev Finance</span>
          </div>
        )}

        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase z-10 shadow-sm">
            Популярно
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-[#1b2b28] line-clamp-3 mb-4 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>

        <div className="flex-1" />

        {/* Meta & Action */}
        <div className="flex items-center justify-between pt-5 border-t border-black/5 mt-auto">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-slate-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-slate-400" />
              {formatDate(post.publishedAt)}
            </div>
            {post.author && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1.5 text-slate-400" />
                {post.author.name}
              </div>
            )}
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-50 border border-black/5 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0 ml-4">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
