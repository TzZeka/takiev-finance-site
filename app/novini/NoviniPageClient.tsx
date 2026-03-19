"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { AINewsItem, NewsSource, NEWS_SOURCES } from "@/types/novini";
import { NewsCard } from "@/components/novini/NewsCard";
import { NewsTabs } from "@/components/novini/NewsTabs";

type TabId = "all" | NewsSource["id"];

interface NoviniPageClientProps {
  items: AINewsItem[];
}

export function NoviniPageClient({ items }: NoviniPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const shouldReduceMotion = useReducedMotion();

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.source === activeTab);

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
      <div className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            {/* Decorative lines — primary color */}
            <span className="h-px w-8 bg-primary/60" />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--color-primary-link)" }}
            >
              Официални източници
            </span>
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            style={{ color: "var(--color-dark)" }}
          >
            Новини от{" "}
            {/* primary-link = 4.9:1 on white — passes WCAG AA */}
            <span style={{ color: "var(--color-primary-link)" }}>НАП, НОИ и МФ</span>
          </h1>
          {/* #4B6360 = 6.4:1 on white — replaces opacity hack */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#4B6360" }}
          >
            Автоматично обобщени с AI — само практически важната информация за
            вашия бизнес, директно от официалните институции.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        {/* Tabs */}
        <div className="mb-8">
          <NewsTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#607975" }}>
            <p className="text-lg">Няма налични новини в момента.</p>
            <p className="text-sm mt-2">Опитайте отново по-късно.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <NewsCard key={item._id} item={item} index={shouldReduceMotion ? 0 : i} />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-black/[0.06] text-center">
          <p className="text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: "#607975" }}>
            Резюметата са генерирани с изкуствен интелект (Google Gemini) за
            информационни цели. Takiev Finance не носи отговорност за пълнотата
            или точността на автоматично генерираните текстове. Винаги
            проверявайте официалния източник преди вземане на решения.
          </p>
        </div>
      </div>
    </div>
  );
}
