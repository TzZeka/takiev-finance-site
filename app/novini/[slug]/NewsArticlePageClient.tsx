"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CalendarClock,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
  Info,
  Sparkles,
  FileInput,
  BookOpen,
} from "lucide-react";
import { RichNewsItem, NEWS_SOURCES, SanityExtractedDate } from "@/types/novini";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TypewriterTitle } from "@/components/ui/TypewriterTitle";

interface RecentBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  tags: string[];
}

interface NewsArticlePageClientProps {
  item: RichNewsItem;
  originalUrl: string;
  recentBlogPosts?: RecentBlogPost[];
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

/* ── Scroll-reveal ───────────────────────────────────────────────────── */
function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Date badge ──────────────────────────────────────────────────────── */
const DATE_CFG = {
  deadline:   { label: "Краен срок",       bg: "bg-red-50",   border: "border-red-100",   text: "text-red-700",   Icon: CalendarClock },
  effective:  { label: "Влиза в сила",     bg: "bg-teal-50",  border: "border-teal-100",  text: "text-teal-700",  Icon: CheckCircle2 },
  submission: { label: "Срок за подаване", bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700", Icon: FileInput },
  other:      { label: "Важна дата",       bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", Icon: Info },
} as const;

function DateBadge({ date }: { date: SanityExtractedDate }) {
  const cfg = DATE_CFG[date.type] ?? DATE_CFG.other;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} ${cfg.border}`}>
      <div className="mt-0.5 p-1.5 rounded-lg bg-white shadow-sm">
        <cfg.Icon className={`w-4 h-4 ${cfg.text}`} />
      </div>
      <div>
        <span className={`text-xs font-semibold uppercase tracking-wider ${cfg.text}`}>{cfg.label}</span>
        <p className="font-bold text-slate-800 mt-0.5">{date.date}</p>
        <p className="text-sm text-slate-600 mt-0.5">{date.description}</p>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export function NewsArticlePageClient({ item, originalUrl, recentBlogPosts = [] }: NewsArticlePageClientProps) {
  const source = NEWS_SOURCES.find((s) => s.id === item.source);
  const hasDates = item.extractedDates.length > 0;
  const hasKeyPoints = item.keyPoints.length > 0;
  const titleText = item.aiTitle ?? item.title;

  const EntityIcon =
    item.affectedEntities === "individuals" ? Users :
    item.affectedEntities === "companies"   ? Building2 : null;
  const entityLabel =
    item.affectedEntities === "individuals" ? "Физически лица" :
    item.affectedEntities === "companies"   ? "Фирми и предприятия" :
                                              "Физически лица и фирми";

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════
          HERO — same shape as NoviniHeroBanner
      ════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]"
        style={{ background: "#0d1f1c", minHeight: "520px" }}
      >
        {/* Teal radial glow — left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 60%, rgba(25,191,183,0.14) 0%, transparent 52%)",
          }}
        />

        {/* Logo — right side, part of the background */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[55%] md:w-[46%] flex items-center justify-center pointer-events-none select-none"
          initial={{ x: "28%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <Image
            src="/firm-logo/logo.svg"
            alt=""
            width={420}
            height={136}
            className="object-contain"
            style={{ opacity: 0.28 }}
            aria-hidden
          />
        </motion.div>

        {/* Left-to-right gradient — ensures title stays readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(13,31,28,1) 0%, rgba(13,31,28,0.88) 40%, rgba(13,31,28,0.15) 75%, transparent 100%)",
          }}
        />

        {/* Content — single flow: breadcrumbs → title */}
        <div className="relative z-10 px-4 md:px-8 pt-28 md:pt-32 pb-14 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">

              {/* Breadcrumbs */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="mb-6"
              >
                <Breadcrumbs overrides={item.slug ? { [item.slug]: titleText } : undefined} />
              </motion.div>

              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="mb-5"
              >
                <Link
                  href="/novini"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Всички новини
                </Link>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                className="flex flex-wrap items-center gap-2.5 mb-5"
              >
                {source && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold tracking-wider uppercase ${source.color} ${source.textColor}`}>
                    {source.fullName}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-primary/15 border border-primary/25" style={{ color: "var(--color-primary)" }}>
                  <Sparkles className="w-3 h-3" />
                  Обобщено с AI
                </span>
                {EntityIcon && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-white/[0.08] text-white/55">
                    <EntityIcon className="w-3.5 h-3.5" />
                    {entityLabel}
                  </span>
                )}
                <time className="text-sm text-white/40" dateTime={item.publishedAt}>
                  {formatDate(item.publishedAt)}
                </time>
              </motion.div>

              {/* Typewriter title — multiline */}
              <TypewriterTitle text={titleText} />

              {/* Action required */}
              {item.actionRequired && item.actionDescription && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.9 }}
                  className="flex items-start gap-3 mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                >
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300 mb-0.5">Нужно действие</p>
                    <p className="text-sm text-amber-200/70">{item.actionDescription}</p>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTENT — scroll-revealed sections
      ════════════════════════════════════════ */}
      <div className="px-4 md:px-8 pt-14 pb-24 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* AI Summary */}
          {item.aiSummary && (
            <ScrollReveal>
              <section className="rounded-2xl border border-black/[0.07] overflow-hidden">
                <div
                  className="flex items-center gap-2 px-6 py-4 border-b border-black/[0.06]"
                  style={{ background: "rgba(25,191,183,0.05)" }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: "var(--color-primary-link)" }} />
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--color-primary-link)" }}>
                    AI Резюме
                  </span>
                  <span className="ml-auto text-xs text-slate-400">Генерирано с Claude AI</span>
                </div>
                <div className="px-6 py-6">
                  <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
                    {item.aiSummary}
                  </p>
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* Key points */}
          {hasKeyPoints && (
            <ScrollReveal delay={0.05}>
              <section>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-dark)" }}>
                  Ключови точки
                </h2>
                <ul className="space-y-3">
                  {item.keyPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "var(--color-primary-link)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed pt-0.5" style={{ color: "#374151" }}>
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          )}

          {/* Important dates */}
          {hasDates && (
            <ScrollReveal delay={0.05}>
              <section>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--color-dark)" }}>
                  Важни дати и срокове
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.extractedDates.map((date, i) => (
                    <motion.div
                      key={date._key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                    >
                      <DateBadge date={date} />
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          )}

          {/* Source CTA */}
          <ScrollReveal delay={0.05}>
            <section
              className="rounded-2xl border border-black/[0.08] p-6 md:p-8"
              style={{ background: "var(--color-dark)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white/90 mb-1">
                    Пълна статия от официалния източник
                  </p>
                  <p className="text-sm text-white/50">
                    Горното е AI резюме. За пълния текст —{" "}
                    <span className="text-white/70">{source?.fullName}</span>.
                  </p>
                </div>
                <a
                  href={originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold hover:gap-3 transition-all duration-200"
                  style={{ background: "var(--color-primary)", color: "var(--color-dark)" }}
                >
                  Отвори в {source?.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>
          </ScrollReveal>

          {/* Related blog posts */}
          {recentBlogPosts.length > 0 && (
            <ScrollReveal delay={0.05}>
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary-link)" }} />
                  <h2 className="text-lg font-bold" style={{ color: "var(--color-dark)" }}>
                    Свързани статии от блога
                  </h2>
                  <Link
                    href="/blog"
                    className="ml-auto text-xs font-medium hover:underline"
                    style={{ color: "var(--color-primary-link)" }}
                  >
                    Всички статии →
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentBlogPosts.map((post, i) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                    >
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="group flex items-start gap-4 p-4 rounded-xl border border-black/[0.07] hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-200"
                      >
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-semibold leading-snug mb-1 group-hover:text-primary transition-colors duration-200 line-clamp-2"
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
              </section>
            </ScrollReveal>
          )}

          {/* Disclaimer */}
          <ScrollReveal delay={0.05}>
            <p className="text-xs text-center leading-relaxed" style={{ color: "#9ca3af" }}>
              Резюмето е генерирано с изкуствен интелект (Claude AI) единствено за
              информационни цели. Takiev Finance не носи отговорност за пълнотата или
              точността на автоматично генерираните текстове. Винаги проверявайте
              официалния източник преди вземане на финансови или правни решения.
            </p>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
