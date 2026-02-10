import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface RelatedPostsProps {
  posts: BlogPost[];
  hasTags?: boolean;
}

export function RelatedPosts({ posts, hasTags = true }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const title = hasTags ? "Още от тази категория" : "Предложени статии";

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group block animate-fade-in-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <article className="bg-white/[0.03] rounded-xl border border-white/[0.06] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full">
              {post.mainImage && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getImageUrl(post.mainImage)}
                    alt={post.mainImage.alt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
