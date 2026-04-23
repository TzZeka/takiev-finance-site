"use client";

import { motion } from "framer-motion";
import { CalendarDays, Calendar } from "lucide-react";
import { RichNewsItem } from "@/types/novini";

interface TimelineSidebarProps {
  items: RichNewsItem[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
}

function formatDisplayDate(dateString: string): string {
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

function toDateKey(dateString: string): string {
  try {
    return new Date(dateString).toDateString();
  } catch {
    return dateString;
  }
}

export function TimelineSidebar({
  items,
  selectedDate,
  onDateSelect,
}: TimelineSidebarProps) {
  const todayKey = new Date().toDateString();

  // Group by calendar date
  const groups: Record<string, { label: string; count: number; isoDate: string }> = {};
  for (const item of items) {
    const key = toDateKey(item.publishedAt);
    if (!groups[key]) {
      groups[key] = { label: formatDisplayDate(item.publishedAt), count: 0, isoDate: item.publishedAt };
    }
    groups[key].count++;
  }

  const sorted = Object.entries(groups).sort(
    ([, a], [, b]) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime()
  );

  const todayHasNews = Boolean(groups[todayKey]);

  return (
    <aside className="sticky top-24 h-fit">
      <div className="bg-white rounded-2xl border border-black/[0.07] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-black/[0.06]">
          <CalendarDays className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary-link)" }} />
          <span className="text-[13px] font-bold" style={{ color: "var(--color-dark)" }}>
            Хронология
          </span>
        </div>

        <div className="px-3 pt-3 pb-3">
          {/* Today button */}
          <button
            onClick={() => todayHasNews && onDateSelect(selectedDate === todayKey ? null : todayKey)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 mb-2 ${
              selectedDate === todayKey
                ? "text-white"
                : todayHasNews
                  ? "hover:bg-primary/10 cursor-pointer"
                  : "cursor-default opacity-70"
            }`}
            style={
              selectedDate === todayKey
                ? { background: "var(--color-primary-link)", color: "#fff" }
                : { color: "var(--color-dark)" }
            }
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Новини от днес
            </span>
            {todayHasNews ? (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  selectedDate === todayKey ? "bg-white/25 text-white" : "bg-primary/10"
                }`}
                style={selectedDate !== todayKey ? { color: "var(--color-primary-link)" } : {}}
              >
                {groups[todayKey].count}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-normal">няма</span>
            )}
          </button>

          {!todayHasNews && (
            <p className="text-[11px] text-slate-400 text-center pb-2">
              За днес няма добавени новини
            </p>
          )}

          <div className="h-px bg-black/[0.05] my-2" />

          {/* Date list */}
          <div
            className="space-y-0.5 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}
          >
            {sorted
              .filter(([key]) => key !== todayKey)
              .map(([key, group], i) => {
                const isSelected = selectedDate === key;
                return (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => onDateSelect(isSelected ? null : key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 ${
                      isSelected ? "text-white" : "hover:bg-slate-50"
                    }`}
                    style={
                      isSelected
                        ? { background: "var(--color-primary-link)" }
                        : { color: "var(--color-dark)" }
                    }
                  >
                    <span className="text-[12px] font-medium leading-snug">{group.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ml-2 ${
                        isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {group.count}
                    </span>
                  </motion.button>
                );
              })}
          </div>

          {selectedDate && (
            <>
              <div className="h-px bg-black/[0.05] my-2" />
              <button
                onClick={() => onDateSelect(null)}
                className="w-full text-[11px] text-center py-1.5 rounded-lg transition-colors duration-200 hover:bg-slate-50"
                style={{ color: "var(--color-surface-raised)" }}
              >
                ← Покажи всички
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
