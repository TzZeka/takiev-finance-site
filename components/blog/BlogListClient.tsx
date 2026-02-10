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
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(query);
        const matchesAuthor = post.author?.name.toLowerCase().includes(query);
        const matchesTags = post.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        return matchesTitle || matchesExcerpt || matchesAuthor || matchesTags;
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

  return (
    <>
      {/* Search - glass effect, only search field */}
      <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto">
        <BlogSearch
          onSearch={setSearchQuery}
          posts={posts.map((p) => ({ title: p.title, slug: p.slug.current, tags: p.tags }))}
        />
      </div>

      {/* Results count when filtering */}
      {isFiltering && (
        <div className="flex items-center gap-2 mb-6 px-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length === 0
              ? "Няма намерени статии"
              : `${filteredPosts.length} ${filteredPosts.length === 1 ? "статия" : "статии"}`}
          </p>
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <>
          {/* All Articles Section with Sidebar */}
          <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/5">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/[0.04] rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-500/[0.02] rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.03),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.03),transparent_60%)]" />
            </div>
            {/* Decorative feather pen */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-5 top-5 w-6 h-6 text-teal-400/50"
              style={{ animation: "drawPen 1.5s ease-out forwards", opacity: 0 }}
            >
              <path
                d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="16" y1="8" x2="2" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="17.5" y1="15" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* Dynamic title */}
            <h2 className="text-2xl font-bold text-foreground mb-4 transition-all duration-300">
              {selectedTag ? `Статии свързани с ${selectedTag}` : "Всички статии"}
            </h2>

            {/* Tags filters moved here */}
            <div className="mb-8">
              <BlogFilters
                tags={allTags}
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
              />
            </div>


            {/* Main content + Sidebar grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
              {/* Main column - article cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
                {/* Featured posts */}
                {featuredPosts.length > 0 && (
                  <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5">
                    <h3 className="flex items-center gap-3 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                      Предложени
                      <span className="flex-1 h-px bg-white/10" />
                    </h3>
                    <div className="space-y-3">
                      {featuredPosts.map((post) => (
                        <Link
                          key={post._id}
                          href={`/blog/${post.slug.current}`}
                          className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/sidebar"
                        >
                          {post.mainImage && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={getImageUrl(post.mainImage)}
                                alt={post.mainImage.alt || post.title}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-medium text-foreground leading-snug group-hover/sidebar:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
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
                <div className="bg-slate-900/50 border border-white/5 rounded-xl p-5">
                  <h3 className="flex items-center gap-3 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Последни
                    <span className="flex-1 h-px bg-white/10" />
                  </h3>
                  <div className="space-y-3">
                    {recentPosts.map((post) => (
                      <Link
                        key={post._id}
                        href={`/blog/${post.slug.current}`}
                        className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/sidebar"
                      >
                        {post.mainImage && (
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={getImageUrl(post.mainImage)}
                              alt={post.mainImage.alt || post.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-medium text-foreground leading-snug group-hover/sidebar:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl md:rounded-3xl border border-white/5">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground mb-2">
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
              className="text-primary hover:underline text-sm font-medium mt-2"
            >
              Изчисти филтрите
            </button>
          )}
        </div>
      )}
    </>
  );
}
