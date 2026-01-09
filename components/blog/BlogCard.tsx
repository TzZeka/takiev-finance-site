import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
        {post.mainImage && (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={getImageUrl(post.mainImage)}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {post.featured && (
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                Популярно
              </div>
            )}
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.publishedAt)}
            </div>
            {post.author && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author.name}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.nulaBgUrl && (
            <div className="flex items-center text-sm text-primary">
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>Виж в NulaBG</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
