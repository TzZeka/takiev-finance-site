"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/types";

interface FirmNewsDashboardProps {
  news: NewsItem[];
}

const priorityDot: Record<string, string> = {
  high: "bg-rose-400",
  medium: "bg-amber-300",
  low: "bg-white/40",
};

const tagColor: Record<string, string> = {
  Данъци: "bg-white/10 text-white/70",
  Счетоводство: "bg-white/10 text-white/70",
  Регулации: "bg-white/10 text-white/70",
  Компанията: "bg-white/10 text-white/70",
};

export function FirmNewsDashboard({ news }: FirmNewsDashboardProps) {
  if (!news || news.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="bg-[#40514E] rounded-2xl border border-white/[0.08] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-white/60 inline-block" />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/60">
              Фирмени новини
            </span>
          </div>
          <span className="text-[11px] text-white/35 font-medium tabular-nums">
            {news.length} {news.length === 1 ? "новина" : "новини"}
          </span>
        </div>

        {/* News list */}
        <div className="divide-y divide-white/[0.06]">
          {news.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.38,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-start gap-3.5 px-5 py-4 hover:bg-white/[0.05] transition-colors duration-200"
            >
              {/* Priority dot */}
              <div className="flex-shrink-0 mt-[5px]">
                <span
                  className={`block w-1.5 h-1.5 rounded-full ${
                    priorityDot[item.priority || "medium"]
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <p className="text-[13px] font-semibold text-white leading-snug flex-1">
                    {item.title}
                  </p>
                  {item.tag && (
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                        tagColor[item.tag] || "bg-white/10 text-white/60"
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                {item.summary && (
                  <p className="text-[12px] text-white/50 leading-relaxed mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                )}
                <p className="text-[11px] text-white/30 mt-1.5">
                  {formatDate(item.publishedAt)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
