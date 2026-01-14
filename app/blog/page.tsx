import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/sanity/queries";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Блог - Takiev Finance",
  description:
    "Актуални новини, съвети и анализи по счетоводство, данъци и бизнес. Професионални статии от експерти в областта.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Блог
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Актуални новини, съвети и анализи по счетоводство, данъци и бизнес
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Статиите ще бъдат добавени скоро.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
