import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group" id={`post-${post.slug.current}`}>
      <div className="relative h-72 md:h-80 rounded-xl overflow-hidden">
        {post.mainImage ? (
          <Image
            src={getImageUrl(post.mainImage)}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />

        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
            Популярно
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-teal-400/20 text-teal-200 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">
            {post.title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-white/70">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formatDate(post.publishedAt)}
            </div>
            {post.author && (
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1" />
                {post.author.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
