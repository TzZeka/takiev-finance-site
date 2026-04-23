"use client";

import { useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { RichNewsItem, NewsSource, NEWS_SOURCES } from "@/types/novini";
import { NewsCard } from "@/components/novini/NewsCard";
import { NewsTabs } from "@/components/novini/NewsTabs";
import { NoviniHeroBanner } from "@/components/novini/NoviniHeroBanner";
import { TimelineSidebar } from "@/components/novini/TimelineSidebar";
import { DeadlinesSidebar } from "@/components/novini/DeadlinesSidebar";

type TabId = "all" | NewsSource["id"];

interface RecentBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  tags: string[];
}

interface NoviniPageClientProps {
  items: RichNewsItem[];
  recentBlogPosts?: RecentBlogPost[];
}

function toDateKey(dateString: string): string {
  try {
    return new Date(dateString).toDateString();
  } catch {
    return dateString;
  }
}

export function NoviniPageClient({ items, recentBlogPosts = [] }: NoviniPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Apply both filters: source tab + selected date
  const filtered = items.filter((item) => {
    const matchesTab = activeTab === "all" || item.source === activeTab;
    const matchesDate = !selectedDate || toDateKey(item.publishedAt) === selectedDate;
    return matchesTab && matchesDate;
  });

  const tabs = [
    { id: "all" as TabId, label: "Всички", count: items.length },
    ...NEWS_SOURCES.map((s) => ({
      id: s.id as TabId,
      label: s.label,
      count: items.filter((i) => i.source === s.id).length,
    })),
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <NoviniHeroBanner />

      {/* Disclaimer */}
      <div className="relative z-20 bg-white px-4 py-5 text-center">
        <p className="text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: "#9ca3af" }}>
          Резюметата са генерирани с изкуствен интелект (Claude AI) за информационни цели.
          Takiev Finance не носи отговорност за пълнотата или точността на автоматично
          генерираните текстове. Винаги проверявайте официалния източник преди вземане на решения.
        </p>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 lg:px-8 relative z-20 pt-10 pb-28 md:pt-12 md:pb-32 bg-slate-50 rounded-t-[2.5rem] md:rounded-t-[3rem] border-t border-black/5">

        {/* Tabs — full width above the 3-col grid */}
        <div className="max-w-[1400px] mx-auto mb-8">
          <NewsTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        {/* 3-column grid: timeline | cards | deadlines */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] xl:grid-cols-[240px_1fr_240px] gap-6 items-start">

          {/* Left: Timeline */}
          <div className="hidden lg:block">
            <TimelineSidebar
              items={items}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* Center: News cards */}
          <main>
            {filtered.length === 0 ? (
              <div className="text-center py-24" style={{ color: "#607975" }}>
                <p className="text-lg font-medium">Няма новини за избрания филтър.</p>
                <p className="text-sm mt-2">
                  {selectedDate
                    ? "За тази дата няма публикувани новини."
                    : "Опитайте отново по-късно."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((item, i) => (
                  <NewsCard
                    key={item._id}
                    item={item}
                    index={shouldReduceMotion ? 0 : i}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Right: Deadlines */}
          <div className="hidden lg:block">
            <DeadlinesSidebar items={items} />
          </div>
        </div>

        {/* Blog cross-link strip */}
        {recentBlogPosts.length > 0 && (
          <div className="max-w-[1400px] mx-auto mt-12">
            <div className="rounded-2xl border border-black/[0.07] overflow-hidden bg-white">
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] bg-slate-50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary-link)" }} />
                  <span className="text-sm font-bold" style={{ color: "var(--color-dark)" }}>
                    Свързани статии от блога
                  </span>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-medium hover:underline"
                  style={{ color: "var(--color-primary-link)" }}
                >
                  Всички статии →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.05]">
                {recentBlogPosts.map((post, i) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  >
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="group flex items-start gap-3 p-5 hover:bg-primary/[0.03] transition-colors duration-200 h-full"
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold leading-snug mb-1.5 group-hover:text-primary transition-colors duration-200 line-clamp-2"
                          style={{ color: "var(--color-dark)" }}
                        >
                          {post.title}
                        </p>
                        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#6b7280" }}>
                          {post.excerpt}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile sidebars — stacked below cards */}
        <div className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <TimelineSidebar
            items={items}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <DeadlinesSidebar items={items} />
        </div>

      </div>
    </div>
  );
}
