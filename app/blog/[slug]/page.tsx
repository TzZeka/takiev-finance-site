import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { portableTextComponents, extractHeadings } from "@/components/blog/PortableTextComponents";
import { TableOfContents } from "@/components/blog/TableOfContents";

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

  // Extract headings for Table of Contents
  const headings = extractHeadings(post.body);

  // Get unique categories from tags
  const categories = post.tags ? [...new Set(post.tags)] : [];

  return (
    <article className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8 max-w-7xl mx-auto">
          <Button asChild variant="ghost">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Към всички статии
            </Link>
          </Button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12">
            {/* Main Content */}
            <div>
              {/* Article Header */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Author Info with Avatar */}
                {post.author && (
                  <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-xl border-2 border-primary/10">
                    {post.author.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                        <Image
                          src={getImageUrl(post.author.image)}
                          alt={post.author.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Автор</p>
                      <p className="font-bold text-dark">{post.author.name}</p>
                      {post.author.bio && post.author.bio.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.author.bio[0]?.children?.[0]?.text}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                )}

                {/* Categories from Tags */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {post.mainImage && (
                  <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8 shadow-xl">
                    <Image
                      src={getImageUrl(post.mainImage)}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1024px, 1280px"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </header>

              {/* Article Content with Custom Portable Text Components */}
              <div className="prose-custom max-w-none mb-12">
                <PortableText value={post.body} components={portableTextComponents} />
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
              <div className="bg-gradient-to-br from-primary/5 to-background rounded-xl p-8 text-center border-2 border-primary/10">
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

            {/* Table of Contents Sidebar */}
            <aside className="hidden xl:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
