"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { Search, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchOverlayHeight, setSearchOverlayHeight] = useState(0);

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedTag && !post.tags?.includes(selectedTag)) {
        return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();

        const matchesTitle = (post.title || "").toLowerCase().includes(q);
        const matchesExcerpt = (post.excerpt || "").toLowerCase().includes(q);
        const matchesAuthor = (post.author?.name || "").toLowerCase().includes(q);
        const matchesTags = post.tags?.some((tag) => tag.toLowerCase().includes(q));

        return matchesTitle || matchesExcerpt || matchesAuthor || !!matchesTags;
      }

      return true;
    });
  }, [posts, searchQuery, selectedTag]);

  const isFiltering = searchQuery || selectedTag;

  // Featured posts for sidebar
  const featuredPosts = useMemo(() => {
    return posts.filter((p) => p.featured);
  }, [posts]);

  // Recent posts for sidebar (first 3 from all posts, not filtered)
  const recentPosts = posts.slice(0, 3);

  const sidebarWidgets = (
    <>
      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 lg:p-6">
          <h3 className="text-[13px] font-bold text-[#1b2b28] uppercase tracking-wider mb-4 border-b border-black/5 pb-3">
            Предложени
          </h3>
          <div className="space-y-5">
            {featuredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="flex gap-4 group items-center"
              >
                {post.mainImage?.asset && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm border border-black/5">
                    <Image
                      src={getImageUrl(post.mainImage)}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="text-[13px] font-semibold text-[#1b2b28] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-500 font-medium">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent posts */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 lg:p-6">
        <h3 className="text-[13px] font-bold text-[#1b2b28] uppercase tracking-wider mb-4 border-b border-black/5 pb-3">
          Последни
        </h3>
        <div className="space-y-5">
          {recentPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="flex gap-4 group items-center"
            >
              {post.mainImage?.asset && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm border border-black/5">
                  <Image
                    src={getImageUrl(post.mainImage)}
                    alt={post.mainImage.alt || post.title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-[13px] font-semibold text-[#1b2b28] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-500 font-medium">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12 relative z-0">
      {/* Sidebar (Left on Desktop) */}
      <aside className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0 space-y-6 lg:sticky lg:top-28 lg:self-start relative z-[60]">

        {/* Search */}
        <div className="relative z-[100]">
          <BlogSearch
            onSearch={setSearchQuery}
            posts={posts.map((p) => ({ title: p.title, slug: p.slug.current, tags: p.tags, mainImage: p.mainImage }))}
            onExpandedHeightChange={(height) => setSearchOverlayHeight(height)}
          />
        </div>

        {/* Categories, Featured & Recent - Slide down when Search expands */}
        <div
          className="space-y-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-40"
          style={searchOverlayHeight > 0 ? { marginTop: `calc(1.5rem + ${searchOverlayHeight}px)` } : {}}
        >
          {/* Categories / Filters */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 lg:p-6">
            <h3 className="text-[13px] font-bold text-[#1b2b28] uppercase tracking-wider mb-4 border-b border-black/5 pb-3">Категории</h3>
            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <BlogFilters
                tags={allTags}
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
              />
            </div>
          </div>

          <div className="hidden lg:flex flex-col space-y-6">
            {sidebarWidgets}
          </div>
        </div>
      </aside>

      {/* Main Content (Right) */}
      <main
        className="flex-1 min-w-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-10"
        style={searchOverlayHeight > 0 ? { marginTop: `${searchOverlayHeight}px` } : undefined}
      >
        {/* Header line */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-black/5 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1b2b28] tracking-tight relative z-20">
            {selectedTag ? `Статии свързани с ${selectedTag}` : "Всички статии"}
          </h2>
          {isFiltering && (
            <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium bg-white px-3 py-1.5 rounded-full border border-black/5 shadow-sm whitespace-nowrap">
              <Search className="w-3.5 h-3.5" />
              <span>{filteredPosts.length} резултата</span>
            </div>
          )}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-slate-50 flex items-center justify-center border border-black/5">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-lg text-[#1b2b28] font-semibold mb-2">
              {isFiltering
                ? "Няма намерени статии по зададените критерии."
                : "Статиите ще бъдат добавени скоро."}
            </p>
            {isFiltering && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="text-primary hover:text-[#14a39d] hover:underline text-sm font-medium mt-2 transition-colors"
              >
                Изчисти филтрите
              </button>
            )}
          </div>
        )}
      </main>

      {/* Mobile Widgets (Below Grid) */}
      <div className="flex lg:hidden flex-col space-y-6 mt-2 relative z-0">
        {sidebarWidgets}
      </div>
    </div>
  );
}
