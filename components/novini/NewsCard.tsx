"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, CalendarClock } from "lucide-react";
import { RichNewsItem, NEWS_SOURCES } from "@/types/novini";

interface NewsCardProps {
  item: RichNewsItem;
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
  const hasInternalPage = Boolean(item.slug);
  const href = hasInternalPage ? `/novini/${item.slug}` : item.url;
  const isExternal = !hasInternalPage;
  const deadlines = item.extractedDates.filter((d) => d.type === "deadline");

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.48,
        delay: Math.min(index * 0.07, 0.42),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
        boxShadow: "0 24px 64px rgba(25,191,183,0.13), 0 8px 24px rgba(0,0,0,0.07)",
        transition: { type: "spring", stiffness: 280, damping: 20 },
      }}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_2px_14px_rgba(0,0,0,0.05)]"
    >
      {/* Banner */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ background: "#0d1f1c", aspectRatio: "16/7" }}
      >
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 65%, rgba(25,191,183,0.3) 0%, transparent 68%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/firm-logo/logo.svg"
            alt="Takiev Finance"
            width={210}
            height={68}
            className="object-contain opacity-85 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Source badge */}
        {source && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider uppercase ${source.color} ${source.textColor}`}
            >
              {source.label}
            </span>
          </div>
        )}

        {/* Date */}
        <time
          className="absolute top-3 right-3 z-10 text-[11px] font-medium text-white/55"
          dateTime={item.publishedAt}
        >
          {formatDate(item.publishedAt)}
        </time>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Clickable title */}
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block mb-3 cursor-pointer"
        >
          <h3
            className="text-[16px] font-bold leading-snug line-clamp-3 group-hover:text-primary transition-colors duration-200"
            style={{ color: "var(--color-dark)" }}
          >
            {item.aiTitle || item.title}
          </h3>
        </Link>

        {/* Summary — not clickable */}
        <p
          className="text-[13px] leading-relaxed line-clamp-3 mb-4"
          style={{ color: "var(--color-surface-raised)" }}
        >
          {displaySummary}
        </p>

        <div className="flex-1" />

        {/* Deadline badge */}
        {deadlines.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4 px-2.5 py-1.5 rounded-lg bg-red-50 w-fit">
            <CalendarClock className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
            <span className="text-xs font-medium text-red-700 line-clamp-1">
              Срок: {deadlines[0].date}
            </span>
          </div>
        )}

        {/* Action required badge */}
        {item.actionRequired && !deadlines.length && (
          <div className="flex items-center gap-1.5 mb-4 px-2.5 py-1.5 rounded-lg bg-amber-50 w-fit">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="text-xs font-medium text-amber-700">Нужно действие</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] mt-auto">
          <span className="text-[12px] font-medium text-slate-400">
            {hasInternalPage ? "Прочети резюмето" : "Виж статията"}
          </span>

          {/* Clickable arrow */}
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="cursor-pointer"
            aria-label="Прочети"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.42, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-slate-50 border border-black/[0.06] flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-300"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
