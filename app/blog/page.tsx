import type { Metadata } from "next";
import { getAllBlogPosts, getAllNews } from "@/lib/sanity/queries";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { BlogHeroGrid } from "@/components/blog/BlogHeroGrid";
import { QuoteCarousel } from "@/components/blog/QuoteCarousel";
import { FirmNewsDashboard } from "@/components/blog/FirmNewsDashboard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

// Revalidate every 60 seconds so new/updated posts appear without rebuilding
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Блог по счетоводство и данъци - Статии и съвети",
  description:
    "Актуални статии, съвети и анализи по счетоводство, данъци и бизнес от експертите на Takiev Finance. Полезна информация за ЕООД, ООД, ДДС и данъчни декларации.",
  keywords: [
    "блог счетоводство",
    "данъчни съвети",
    "счетоводни статии",
    "бизнес съвети",
    "ДДС информация",
    "данъчна декларация съвети",
    "счетоводство за бизнес",
    "новини счетоводство България",
  ],
  alternates: {
    canonical: "https://takiev.bg/blog",
  },
  openGraph: {
    title: "Блог по счетоводство и данъци | Takiev Finance",
    description:
      "Актуални статии, съвети и анализи по счетоводство, данъци и бизнес от експертите на Takiev Finance.",
    url: "https://takiev.bg/blog",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Блог - Takiev Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог по счетоводство и данъци | Takiev Finance",
    description:
      "Актуални статии, съвети и анализи по счетоводство, данъци и бизнес от експертите на Takiev Finance.",
    images: ["/opengraph-image"],
  },
};

export default async function BlogPage() {
  const [posts, news] = await Promise.all([getAllBlogPosts(), getAllNews()]);

  return (
    <div className="min-h-screen bg-white">
      {/* Full-bleed Hero Banner */}
      <section className="relative overflow-hidden bg-white border-b border-black/5 pt-32 pb-20 md:pt-40 md:pb-28">
        <BlogHeroGrid />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Breadcrumbs />
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b2b28] mb-5 tracking-tight"
            >
              Блог
            </h1>
            <p
              className="text-lg md:text-xl text-[#3b4b48] leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Актуални новини, съвети и анализи по счетоводство, данъци и бизнес
            </p>
          </div>
        </div>
      </section>

      {/* Quote Carousel */}
      <div className="relative z-20 py-4 md:py-8 bg-white">
        <QuoteCarousel />
      </div>

      {/* Blog Content Container (Sidebar + List) */}
      <div className="px-4 md:px-8 relative z-20 pt-12 pb-28 md:pt-16 md:pb-32 bg-slate-50 rounded-t-[2.5rem] md:rounded-t-[3rem] border-t border-black/5">
        <h2 className="sr-only">Съдържание на блога</h2>

        {/* Firm News Dashboard — shown only if news exist */}
        <FirmNewsDashboard news={news} />

        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
