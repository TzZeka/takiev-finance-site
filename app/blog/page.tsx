import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/sanity/queries";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { BlogHeroGrid } from "@/components/blog/BlogHeroGrid";

// Revalidate every 60 seconds so new/updated posts appear without rebuilding
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Блог - Takiev Finance",
  description:
    "Актуални новини, съвети и анализи по счетоводство, данъци и бизнес. Професионални статии от експерти в областта.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#2a3a38] to-slate-950 pt-2 md:pt-3">
      {/* Hero Banner with interactive grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 md:py-28 mx-4 md:mx-8 rounded-2xl md:rounded-3xl">
        <BlogHeroGrid />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)" }}
            >
              Блог
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
            >
              Актуални новини, съвети и анализи по счетоводство, данъци и бизнес
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 pb-16 md:pb-24">
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
