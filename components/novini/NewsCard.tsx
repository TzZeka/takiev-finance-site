"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AINewsItem, NEWS_SOURCES } from "@/types/novini";

interface NewsCardProps {
  item: AINewsItem;
  index: number;
}

function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export function NewsCard({ item, index }: NewsCardProps) {
  const source = NEWS_SOURCES.find((s) => s.id === item.source);
  const displaySummary = item.aiSummary ?? "Резюмето временно не е налично.";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col bg-white border border-black/[0.07] rounded-xl p-6 shadow-sm hover:shadow-md hover:border-black/[0.12] transition-all duration-300"
    >
      {/* Header: badge + date */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {source && (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase ${source.color} ${source.textColor}`}
          >
            {source.label}
          </span>
        )}
        {/* surface-raised = 4.7:1 contrast on white */}
        <time
          className="text-xs flex-shrink-0"
          style={{ color: "var(--color-surface-raised)" }}
          dateTime={item.publishedAt}
        >
          {formatDate(item.publishedAt)}
        </time>
      </div>

      {/* Title — from Sanity (editor-provided) */}
      <h3
        className="font-semibold text-base leading-snug mb-3 line-clamp-3 flex-1"
        style={{ color: "var(--color-dark)" }}
      >
        {item.title}
      </h3>

      {/* AI Summary */}
      {/* surface-raised = 6.4:1 contrast on white */}
      <p
        className="text-sm leading-relaxed mb-5 line-clamp-3"
        style={{ color: "var(--color-surface-raised)" }}
      >
        {displaySummary}
      </p>

      {/* CTA */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-link hover:text-primary-link-hover transition-colors duration-200 mt-auto self-start"
      >
        Прочети повече
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </a>
    </motion.article>
  );
}
