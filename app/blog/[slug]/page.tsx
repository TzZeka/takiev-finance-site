import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, ExternalLink } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Статия не е намерена - Takiev Finance",
    };
  }

  return {
    title: `${post.title} - Блог | Takiev Finance`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
      images: post.mainImage ? [getImageUrl(post.mainImage)] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8 max-w-4xl mx-auto">
          <Button asChild variant="ghost">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Към всички статии
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {formatDate(post.publishedAt)}
            </div>
            {post.author && (
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {post.author.name}
              </div>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.mainImage && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={getImageUrl(post.mainImage)}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <PortableText value={post.body} />
          </div>

          {/* NulaBG Link */}
          {post.nulaBgUrl && (
            <div className="bg-muted/30 rounded-lg p-6 mb-12">
              <p className="text-sm text-muted-foreground mb-2">
                Тази статия е публикувана също в:
              </p>
              <a
                href={post.nulaBgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline font-medium"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                NulaBG - Професионален блог
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-background rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-dark mb-4">
              Имате въпроси?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Свържете се с нас за професионална консултация
            </p>
            <Button asChild size="lg">
              <Link href="/kontakti">Свържи се с нас</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
