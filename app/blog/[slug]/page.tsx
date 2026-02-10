import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/sanity/queries";
import { extractHeadings } from "@/components/blog/PortableTextComponents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getImageUrl } from "@/lib/sanity/client";
import { BlogArticleLayout } from "./BlogArticleLayout";

// Revalidate every 60 seconds so new/updated articles appear without rebuilding
export const revalidate = 60;

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

  const canonicalUrl = `https://takiev.bg/blog/${slug}`;

  return {
    title: `${post.title} - Блог | Takiev Finance`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author ? [post.author.name] : [],
      images: post.mainImage ? [getImageUrl(post.mainImage)] : [],
      locale: "bg_BG",
      siteName: "Takiev Finance",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
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

  const headings = extractHeadings(post.body);
  const categories = post.tags ? [...new Set(post.tags)] : [];
  const relatedPosts = await getRelatedBlogPosts(post._id, post.tags || [], 3);
  const canonicalUrl = `https://takiev.bg/blog/${slug}`;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        authorName={post.author?.name || "Takiev Finance"}
        authorBio={post.author?.bio?.map((block: any) => block.children?.map((c: any) => c.text).join("")).join(" ")}
        authorImageUrl={post.author?.image ? getImageUrl(post.author.image) : undefined}
        publishedAt={post.publishedAt}
        modifiedAt={post._updatedAt}
        canonicalUrl={canonicalUrl}
        imageUrl={post.mainImage ? getImageUrl(post.mainImage) : undefined}
        tags={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Начало", url: "https://takiev.bg" },
          { name: "Блог", url: "https://takiev.bg/blog" },
          { name: post.title, url: canonicalUrl },
        ]}
      />

      <BlogArticleLayout
        post={post}
        headings={headings}
        categories={categories}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
