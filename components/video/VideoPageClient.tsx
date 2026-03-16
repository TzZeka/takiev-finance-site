"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Play, ArrowRight, Users } from "lucide-react";
import type { Video } from "@/types";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { TikTokEmbed } from "./TikTokEmbed";

// ── Icons ──────────────────────────────────────────────────────────────────────
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

// ── Filter config ──────────────────────────────────────────────────────────────
type FilterId = "all" | "youtube" | "tiktok" | "team";

interface FilterOption {
  id: FilterId;
  label: string;
  icon: ReactNode;
}

const FILTERS: FilterOption[] = [
  { id: "all", label: "Всички", icon: null },
  {
    id: "youtube",
    label: "YouTube",
    icon: <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />,
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: <TikTokIcon className="w-3.5 h-3.5 text-white/70" />,
  },
  {
    id: "team",
    label: "Нашият екип",
    icon: <Users className="w-3.5 h-3.5 text-primary" />,
  },
];

// Explicit colour tokens per platform ─ no string concatenation
const PLATFORM_COLORS = {
  youtube: {
    border: "rgba(255,0,0,0.18)",
    bg: "rgba(255,0,0,0.06)",
    line: "rgba(255,0,0,0.15)",
    hover: "rgba(255,0,0,0.22)",
    icon: "#FF0000",
  },
  tiktok: {
    border: "rgba(255,255,255,0.14)",
    bg: "rgba(255,255,255,0.04)",
    line: "rgba(255,255,255,0.12)",
    hover: "rgba(255,255,255,0.18)",
    icon: "rgba(255,255,255,0.7)",
  },
  team: {
    border: "rgba(25,191,183,0.2)",
    bg: "rgba(25,191,183,0.06)",
    line: "rgba(25,191,183,0.18)",
    hover: "rgba(25,191,183,0.25)",
    icon: "#19BFB7",
  },
} as const;

// ── Main component ─────────────────────────────────────────────────────────────
export function VideoPageClient({ videos }: { videos: Video[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ytVideos   = videos.filter((v) => v.platform === "youtube");
  const ttVideos   = videos.filter((v) => v.platform === "tiktok");
  const teamVideos = videos.filter((v) => v.platform === "team");

  const visibleYt: Video[] =
    activeFilter === "all" || activeFilter === "youtube" ? ytVideos : [];

  const visibleShort: Video[] =
    activeFilter === "all"
      ? [...ttVideos, ...teamVideos]
      : activeFilter === "tiktok"
      ? ttVideos
      : activeFilter === "team"
      ? teamVideos
      : [];

  const counts: Record<FilterId, number> = {
    all:     videos.length,
    youtube: ytVideos.length,
    tiktok:  ttVideos.length,
    team:    teamVideos.length,
  };

  const handleFilter = (id: FilterId) => {
    setActiveFilter(id);
    setExpandedId(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#060e0c" }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a16] via-[#080f0d] to-[#060e0c]" />

        {/* Teal radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(25,191,183,0.13) 0%, transparent 68%)",
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-primary/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">
              Видео студио
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white tracking-tight leading-[1.04] mb-6"
          >
            Учете счетоводство
            <br />
            <span className="text-primary">безплатно</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-white/40 mb-12 max-w-md mx-auto leading-relaxed"
          >
            Практични обучения по данъци и счетоводство от нашите експерти
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex items-center justify-center gap-12 mb-12"
          >
            {[
              { value: videos.length,                       label: "видеа" },
              { value: ytVideos.length,                     label: "YouTube" },
              { value: ttVideos.length + teamVideos.length, label: "кратки" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-white tabular-nums">{s.value}</div>
                <div className="text-[11px] uppercase tracking-widest text-white/22 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.33 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="https://www.youtube.com/@nikolaytakiev6221"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-200"
              style={{
                border: "1px solid rgba(255,0,0,0.22)",
                background: "rgba(255,0,0,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,0,0,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,0,0,0.07)";
              }}
            >
              <Youtube className="w-4 h-4 text-[#FF0000]" />
              YouTube канал
              <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
            <a
              href="https://www.tiktok.com/@n.takiev"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <TikTokIcon className="w-4 h-4 text-white/65" />
              TikTok профил
              <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STICKY FILTER BAR ───────────────────────────────────────────────── */}
      <div
        className="sticky top-[62px] z-20 border-b border-white/[0.06]"
        style={{ backdropFilter: "blur(22px)", background: "rgba(6,14,12,0.92)" }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-none">
            {FILTERS.map((filter) => {
              const count = counts[filter.id];
              if (count === 0 && filter.id !== "all") return null;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilter(filter.id)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0 outline-none"
                  style={{ color: isActive ? "#060e0c" : "rgba(255,255,255,0.42)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filterPill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 390, damping: 34 }}
                    />
                  )}
                  {filter.icon && (
                    <span className="relative flex-shrink-0">{filter.icon}</span>
                  )}
                  <span className="relative">{filter.label}</span>
                  <span className="relative text-[10px] opacity-50">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT ─────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-16">

            {/* YouTube section */}
            <AnimatePresence mode="wait">
              {visibleYt.length > 0 && (
                <motion.section
                  key="yt-section"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeFilter === "all" && (
                    <SectionDivider
                      icon={<Youtube className="w-4 h-4 text-[#FF0000]" />}
                      label="YouTube"
                      colors={PLATFORM_COLORS.youtube}
                    />
                  )}
                  <div
                    className={`grid gap-5 mt-6 ${
                      visibleYt.length === 1
                        ? "grid-cols-1 max-w-3xl mx-auto"
                        : "grid-cols-1 md:grid-cols-2"
                    }`}
                  >
                    {visibleYt.map((video, i) => (
                      <YouTubeCard
                        key={video._id}
                        video={video}
                        featured={i === 0 && visibleYt.length > 2}
                      />
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Short videos section (TikTok + Team) */}
            <AnimatePresence mode="wait">
              {visibleShort.length > 0 && (
                <motion.section
                  key={`short-${activeFilter}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{
                    duration: 0.4,
                    delay: visibleYt.length > 0 ? 0.07 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {activeFilter === "all" && (
                    <SectionDivider
                      icon={<TikTokIcon className="w-4 h-4 text-white/60" />}
                      label="Кратки видеа"
                      colors={PLATFORM_COLORS.tiktok}
                    />
                  )}
                  {activeFilter === "team" && (
                    <SectionDivider
                      icon={<Users className="w-4 h-4 text-primary" />}
                      label="Нашият екип"
                      colors={PLATFORM_COLORS.team}
                    />
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {visibleShort.map((video) => (
                      <ShortVideoCard
                        key={video._id}
                        video={video}
                        isExpanded={expandedId === video._id}
                        onToggle={() =>
                          setExpandedId(expandedId === video._id ? null : video._id)
                        }
                      />
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] mt-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/18 mb-3">
            Нужна ви е помощ?
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            Свържете се с нашите експерти
          </h2>
          <p className="text-white/32 mb-8 max-w-sm mx-auto text-[15px] leading-relaxed">
            Персонализирана консултация по вашия конкретен случай.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/kontakti"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-200 bg-primary text-[#060e0c] hover:bg-primary/90"
            >
              Свържете се с нас
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white font-semibold text-sm hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
            >
              Нашите услуги
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Section divider ────────────────────────────────────────────────────────────
interface PlatformColor {
  border: string;
  bg: string;
  line: string;
}

function SectionDivider({
  icon,
  label,
  colors,
}: {
  icon: ReactNode;
  label: string;
  colors: PlatformColor;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border flex-shrink-0"
        style={{ borderColor: colors.border, background: colors.bg }}
      >
        {icon}
        <span className="text-[13px] font-semibold text-white/60">{label}</span>
      </div>
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, ${colors.line}, transparent)`,
        }}
      />
    </div>
  );
}

// ── YouTube landscape card ─────────────────────────────────────────────────────
function YouTubeCard({ video, featured }: { video: Video; featured?: boolean }) {
  const colors = PLATFORM_COLORS.youtube;

  return (
    <motion.div
      className={featured ? "md:col-span-2" : ""}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group rounded-2xl overflow-hidden border transition-colors duration-300 h-full"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: colors.border,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = colors.hover;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = colors.border;
        }}
      >
        <div className="aspect-video">
          <YouTubeEmbed videoId={video.videoId} title={video.title} />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <Youtube className="w-3.5 h-3.5 text-[#FF0000]/50 flex-shrink-0" />
            {video.featured && (
              <span
                className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
                style={{
                  color: "#19BFB7",
                  background: "rgba(25,191,183,0.1)",
                  border: "1px solid rgba(25,191,183,0.2)",
                }}
              >
                Препоръчано
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-semibold text-white/80 leading-snug group-hover:text-white transition-colors duration-200 line-clamp-2">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-[13px] text-white/28 mt-2 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Short (portrait) video card ────────────────────────────────────────────────
function ShortVideoCard({
  video,
  isExpanded,
  onToggle,
}: {
  video: Video;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isTeam = video.platform === "team";
  const colors = isTeam ? PLATFORM_COLORS.team : PLATFORM_COLORS.tiktok;

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="rounded-2xl overflow-hidden border cursor-pointer transition-colors duration-300"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderColor: isExpanded ? colors.hover : colors.border,
        }}
        onClick={onToggle}
        whileHover={!isExpanded ? { scale: 1.025, transition: { duration: 0.18 } } : {}}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <TikTokEmbed videoId={video.videoId} title={video.title} />
              <div
                className="py-2.5 text-center text-[11px] font-medium border-t"
                style={{ color: colors.icon, borderColor: colors.border }}
              >
                Затвори ↑
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="aspect-[9/16] flex flex-col items-center justify-center gap-4 p-5 relative overflow-hidden"
            >
              {/* Platform badge */}
              <div className="absolute top-3 left-3">
                {isTeam ? (
                  <span
                    className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
                    style={{
                      color: "#19BFB7",
                      background: "rgba(25,191,183,0.12)",
                      border: "1px solid rgba(25,191,183,0.25)",
                    }}
                  >
                    Екип
                  </span>
                ) : (
                  <TikTokIcon className="w-4 h-4 text-white/22" />
                )}
              </div>

              {/* Play button */}
              <motion.div
                className="w-14 h-14 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{ borderColor: colors.border, background: colors.bg }}
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.18 }}
              >
                <Play
                  className="w-5 h-5 ml-0.5"
                  style={{ color: colors.icon, fill: colors.icon }}
                />
              </motion.div>

              {/* Title */}
              <p className="text-[11px] text-white/32 text-center leading-snug line-clamp-4 px-1">
                {video.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Title below card (collapsed only) */}
      {!isExpanded && (
        <p className="text-[12px] text-white/38 leading-snug line-clamp-2 px-1">
          {video.title}
        </p>
      )}
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div
        className="w-20 h-20 rounded-2xl border flex items-center justify-center mb-6"
        style={{
          borderColor: "rgba(25,191,183,0.2)",
          background: "rgba(25,191,183,0.05)",
        }}
      >
        <Play className="w-8 h-8 text-primary/50" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Очаквайте скоро</h3>
      <p className="text-white/35 max-w-sm text-[15px]">
        Видеата ще бъдат добавени скоро. Следете ни за актуално съдържание.
      </p>
    </div>
  );
}
