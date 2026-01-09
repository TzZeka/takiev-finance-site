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
              <header className="mb-12 relative">
                {/* Decorative background elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

                {/* Decorative corner ornaments */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-primary/20 rounded-tl-3xl" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-primary/20 rounded-br-3xl" />

                <div className="relative bg-gradient-to-br from-white via-primary/5 to-white p-8 rounded-2xl border-2 border-primary/10">
                  <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>

                {/* Categories from Tags */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6 mt-6">
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
                  <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8 mt-6 shadow-xl">
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

              {/* Author Info Section */}
              {post.author && (
                <div className="relative mb-12">
                  {/* Decorative background blurs */}
                  <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

                  <div className="relative bg-gradient-to-br from-white via-primary/5 to-white rounded-2xl p-8 md:p-10 shadow-xl border-2 border-primary/20 overflow-hidden">
                    {/* Decorative corner ornaments */}
                    <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/30 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary/30 rounded-br-2xl" />

                    {/* Decorative dots */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full" />
                    <div className="absolute top-8 right-8 w-2 h-2 bg-primary/60 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 bg-primary rounded-full" />
                    <div className="absolute bottom-8 left-8 w-2 h-2 bg-primary/60 rounded-full" />

                    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Avatar with ornamental frame */}
                      <div className="relative flex-shrink-0">
                        {/* Rotating decorative border */}
                        <div className="absolute inset-0 -m-4 animate-spin-slow">
                          <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30" />
                        </div>

                        {/* Glow ring */}
                        <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-lg" />

                        {/* Avatar */}
                        {post.author.image ? (
                          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-2xl">
                            <Image
                              src={getImageUrl(post.author.image)}
                              alt={post.author.name}
                              fill
                              sizes="160px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-2xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                            <span className="text-5xl font-bold text-white">
                              {post.author.name.charAt(0)}
                            </span>
                          </div>
                        )}

                        {/* Decorative accent dots */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full shadow-lg" />
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary/70 rounded-full shadow-lg" />
                      </div>

                      {/* Author Info */}
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wide">
                          Автор
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold text-dark mb-3">
                          {post.author.name}
                        </h3>
                        {post.author.bio && post.author.bio.length > 0 && (
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            {post.author.bio[0]?.children?.[0]?.text}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/60 to-primary" />
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary/5 to-background rounded-xl p-8 text-center border-2 border-primary/10">
                <h3 className="text-2xl font-bold text-dark mb-4">
                  Имате въпроси?
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Свържете се с нас за консултация
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
