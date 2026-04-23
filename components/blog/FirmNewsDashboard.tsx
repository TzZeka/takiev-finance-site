"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/types";

interface NapNoiNewsItem {
  _id: string;
  source: "nap" | "noi";
  title: string;
  slug?: { current: string };
  url: string;
  publishedAt: string;
}

interface FirmNewsDashboardProps {
  news?: NewsItem[];
  napNoiNews?: NapNoiNewsItem[];
}

const sourceConfig = {
  nap: { label: "НАП", bg: "bg-blue-600", text: "text-white" },
  noi: { label: "НОИ", bg: "bg-emerald-600", text: "text-white" },
};

const arrowVariants = {
  idle: { x: 0 },
  hovered: { x: -5, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
  tapped: { x: 12, transition: { type: "spring" as const, stiffness: 600, damping: 15 } },
};

export function FirmNewsDashboard({ napNoiNews = [] }: FirmNewsDashboardProps) {
  if (napNoiNews.length === 0) return null;

  const scrollable = napNoiNews.length > 4;

  return (
    <section className="mt-16 mb-10">
      <div className="bg-dark rounded-2xl border border-white/[0.08] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/[0.08]">
          <div>
            <h3 className="text-[20px] md:text-[22px] font-bold text-white tracking-tight leading-tight">
              Новини НАП и НОИ
            </h3>
            <p className="text-[12px] text-white/45 mt-0.5 font-medium">
              От официалните институции
            </p>
          </div>
          <Link
            href="/novini"
            className="text-[12px] font-semibold text-white/50 hover:text-white/80 transition-colors duration-200 flex items-center gap-1"
          >
            Всички
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* News list */}
        <div
          className={scrollable ? "overflow-y-auto divide-y divide-white/[0.06] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full" : "divide-y divide-white/[0.06]"}
          style={scrollable ? { maxHeight: "272px", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" } : undefined}
        >
          {napNoiNews.map((item, i) => {
            const cfg = sourceConfig[item.source];
            const hasSlug = Boolean(item.slug?.current);
            const href = hasSlug ? `/novini/${item.slug!.current}` : item.url;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={href}
                  target={hasSlug ? undefined : "_blank"}
                  rel={hasSlug ? undefined : "noopener noreferrer"}
                  className="block"
                >
                  <motion.div
                    initial="idle"
                    whileHover="hovered"
                    whileTap="tapped"
                    className="flex items-center gap-3.5 px-5 py-4 hover:bg-white/[0.05] transition-colors duration-200 cursor-pointer"
                  >
                    {/* Source badge */}
                    <span className={`flex-shrink-0 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-white leading-snug line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-white/30 mt-1">
                        {formatDate(item.publishedAt)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      variants={arrowVariants}
                      className="flex-shrink-0 text-white/40"
                    >
                      {hasSlug
                        ? <ArrowRight className="w-5 h-5" />
                        : <ExternalLink className="w-5 h-5" />
                      }
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
