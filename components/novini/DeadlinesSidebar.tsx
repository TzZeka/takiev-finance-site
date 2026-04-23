"use client";

import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, FileInput, Info } from "lucide-react";
import { RichNewsItem, SanityExtractedDate } from "@/types/novini";

interface DeadlineEntry {
  dateStr: string
  parsedDate: Date
  daysUntil: number
  description: string
  type: SanityExtractedDate["type"]
  articleTitle: string
  articleSlug?: string
  articleUrl: string
  source: "nap" | "noi"
}

function parseBGDate(s: string): Date | null {
  const m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (!m) return null
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
}

function daysUntil(date: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const t = new Date(date)
  t.setHours(0, 0, 0, 0)
  return Math.round((t.getTime() - today.getTime()) / 86400000)
}

const TYPE_CFG = {
  deadline: { label: "Краен срок", Icon: CalendarClock, color: "#dc2626" },
  effective: { label: "Влиза в сила", Icon: CheckCircle2, color: "#0d9488" },
  submission: { label: "Подаване", Icon: FileInput, color: "#d97706" },
  other: { label: "Важна дата", Icon: Info, color: "#6b7280" },
} as const

const SRC_CFG = {
  nap: { label: "НАП", bg: "bg-blue-600", text: "text-white" },
  noi: { label: "НОИ", bg: "bg-emerald-600", text: "text-white" },
}

interface DeadlinesSidebarProps {
  items: RichNewsItem[]
}

export function DeadlinesSidebar({ items }: DeadlinesSidebarProps) {
  const entries: DeadlineEntry[] = []

  for (const item of items) {
    for (const d of item.extractedDates) {
      const parsed = parseBGDate(d.date)
      if (!parsed) continue
      const days = daysUntil(parsed)
      if (days < -14 || days > 120) continue // show ±window
      entries.push({
        dateStr: d.date,
        parsedDate: parsed,
        daysUntil: days,
        description: d.description,
        type: d.type,
        articleTitle: item.aiTitle ?? item.title,
        articleSlug: item.slug,
        articleUrl: item.url,
        source: item.source,
      })
    }
  }

  entries.sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())

  const upcoming = entries.filter(e => e.daysUntil >= 0)
  const past = entries.filter(e => e.daysUntil < 0)
  const allSorted = [...upcoming, ...past]

  return (
    <aside className="sticky top-24 h-fit">
      <div className="bg-white rounded-2xl border border-black/[0.07] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span className="text-[13px] font-bold" style={{ color: "var(--color-dark)" }}>
              Предстоящи срокове
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Следващите 120 дни</p>
        </div>

        {allSorted.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <CalendarClock className="w-8 h-8 text-slate-200 mx-auto mb-3" />
            <p className="text-[12px] text-slate-400 leading-relaxed">
              Няма открити срокове.<br />
              <span className="text-slate-300">Добавете обработени статии за да се попълни автоматично.</span>
            </p>
          </div>
        ) : (
          <div
            className="divide-y divide-black/[0.04] max-h-[440px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}
          >
            {allSorted.map((entry, i) => {
              const cfg = TYPE_CFG[entry.type] ?? TYPE_CFG.other
              const srcCfg = SRC_CFG[entry.source]
              const isPast = entry.daysUntil < 0
              const isToday = entry.daysUntil === 0
              const isUrgent = entry.daysUntil > 0 && entry.daysUntil <= 7
              const href = entry.articleSlug ? `/novini/${entry.articleSlug}` : entry.articleUrl
              const isExternal = !entry.articleSlug
              const Icon = cfg.Icon

              return (
                <motion.div
                  key={`${entry.dateStr}-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`flex items-start gap-2.5 px-4 py-3.5 hover:bg-slate-50 transition-colors duration-200 ${isPast ? "opacity-40" : ""}`}
                  >
                    <Icon
                      className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                      style={{ color: cfg.color }}
                    />
                    <div className="flex-1 min-w-0">
                      {/* Date + urgency badge */}
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="text-[12px] font-bold"
                          style={{ color: isUrgent || isToday ? "#dc2626" : "var(--color-dark)" }}
                        >
                          {entry.dateStr}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full">
                            ДНЕС
                          </span>
                        )}
                        {isUrgent && (
                          <span className="text-[9px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full">
                            {entry.daysUntil}д
                          </span>
                        )}
                        {isPast && (
                          <span className="text-[9px] text-slate-400">изтекъл</span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 mb-1.5">
                        {entry.description}
                      </p>

                      {/* Source + article title */}
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${srcCfg.bg} ${srcCfg.text}`}>
                          {srcCfg.label}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {entry.articleTitle}
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
