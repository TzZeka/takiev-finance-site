"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { PortableText } from "@portabletext/react";
import {
  Calendar, ArrowLeft, ArrowRight, ExternalLink, Tag, User, Clock,
  Newspaper, Sparkles, FileText, Sun, Moon,
} from "lucide-react";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import { getPortableTextComponents, type ReadingTheme } from "@/components/blog/PortableTextComponents";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TypewriterTitle } from "@/components/ui/TypewriterTitle";
import type { BlogPost } from "@/types";

interface RecentNewsItem {
  _id: string;
  source: "nap" | "noi";
  title: string;
  slug?: { current: string };
  url: string;
  publishedAt: string;
}

interface BlogArticleLayoutProps {
  post: BlogPost;
  headings: Array<{ id: string; text: string; level: number }>;
  categories: string[];
  relatedPosts: BlogPost[];
  recentNews?: RecentNewsItem[];
}

function estimateReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1;
  const text = body
    .filter((b) => b._type === "block" && b.children)
    .flatMap((b) => b.children)
    .filter((c: any) => c?.text)
    .map((c: any) => c.text)
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

function buildAutoSummary(body: any[], excerpt: string): string {
  if (!body || !Array.isArray(body)) return excerpt;
  const paragraphs = body
    .filter((b) => b._type === "block" && b.style === "normal" && b.children)
    .map((b) =>
      (b.children as any[]).filter((c) => c?.text).map((c) => c.text).join("").trim()
    )
    .filter((p) => p.length > 60);
  if (paragraphs.length === 0) return excerpt;
  let result = "";
  let count = 0;
  for (const p of paragraphs) {
    if (count >= 4 || result.length + p.length > 1400) break;
    result += (result ? "\n\n" : "") + p;
    count++;
  }
  return result || excerpt;
}

/* ── AI Pill ─────────────────────────────────────────────────────────── */
function AiPillButton({ isAiMode, onToggle }: { isAiMode: boolean; onToggle: () => Promise<void> }) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white focus:outline-none overflow-hidden"
      style={{
        background: isAiMode ? "#0d1f1c" : "linear-gradient(135deg,#19BFB7 0%,#0fa8a2 100%)",
        boxShadow: isAiMode ? "0 4px 20px rgba(13,31,28,0.30)" : "0 4px 20px rgba(25,191,183,0.38)",
      }}
    >
      {!isAiMode && (
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 1.6 }}
        />
      )}
      <AnimatePresence mode="wait">
        {isAiMode ? (
          <motion.span key="orig" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.14 }} className="flex items-center gap-2">
            <FileText className="w-4 h-4 flex-shrink-0" />
            Оригинална статия
          </motion.span>
        ) : (
          <motion.span key="ai" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.14 }} className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            AI резюме
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Theme toggle ────────────────────────────────────────────────────── */
function ThemeButton({ theme, onToggle }: { theme: ReadingTheme; onToggle: () => void }) {
  const isLight = theme === "light";
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      title={isLight ? "Превключи към тъмна тема" : "Превключи към светла тема"}
      className="inline-flex items-center justify-center rounded-full focus:outline-none"
      style={{
        width: 44, height: 44,
        background:   isLight ? "#e8f3f2"              : "rgba(255,255,255,0.10)",
        color:        isLight ? "#374151"              : "rgba(255,255,255,0.80)",
        border:       isLight ? "1px solid #c8dedd"    : "1px solid rgba(255,255,255,0.14)",
        transition:   "background 0.3s, border-color 0.3s, color 0.3s",
      }}
    >
      <AnimatePresence mode="wait">
        {isLight ? (
          <motion.span key="moon" initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 30, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon style={{ width: 18, height: 18 }} />
          </motion.span>
        ) : (
          <motion.span key="sun" initial={{ rotate: 30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -30, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun style={{ width: 18, height: 18 }} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── AI Summary panel ────────────────────────────────────────────────── */
function AiSummaryPanel({ text, isLight }: { text: string; isLight: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{
      border: isLight ? "1px solid #c5dedd" : "1px solid rgba(25,191,183,0.20)",
    }}>
      <div className="flex items-center gap-2 px-6 py-4" style={{
        background:   isLight ? "rgba(25,191,183,0.07)" : "rgba(25,191,183,0.10)",
        borderBottom: isLight ? "1px solid #c5dedd"     : "1px solid rgba(25,191,183,0.18)",
      }}>
        <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary-link)" }} />
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--color-primary-link)" }}>
          AI Резюме
        </span>
        <span className="ml-auto text-xs" style={{ color: isLight ? "#6b7280" : "rgba(255,255,255,0.40)" }}>
          Генерирано с Claude AI
        </span>
      </div>
      <div className="px-6 py-8" style={{ background: isLight ? "#ffffff" : "#0e1f1c" }}>
        {text.split("\n\n").map((para, i) => (
          <p key={i} className="text-[17px] md:text-[18px] leading-[1.9] mb-5 last:mb-0"
            style={{ color: isLight ? "#374151" : "rgba(255,255,255,0.82)" }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export function BlogArticleLayout({
  post, headings, categories, relatedPosts, recentNews = [],
}: BlogArticleLayoutProps) {
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);
  const [isAiMode, setIsAiMode]   = useState(false);
  const [theme, setTheme]         = useState<ReadingTheme>("light");
  const flipControls      = useAnimation();
  const titleFlipControls = useAnimation();

  const readingTime  = useMemo(() => estimateReadingTime(post.body), [post.body]);
  const summaryText  = useMemo(() => post.aiSummary || buildAutoSummary(post.body, post.excerpt), [post.aiSummary, post.body, post.excerpt]);
  const ptComponents = useMemo(() => getPortableTextComponents(theme), [theme]);
  const hasTags      = categories.length > 0;
  const isLight      = theme === "light";

  // ── color tokens ─────────────────────────────────────────────────────
  const cardBg       = isLight ? "#ffffff"  : "#111e1c";
  const cardBorder   = isLight ? "#dde9e7"  : "rgba(255,255,255,0.06)";
  const dividerColor = isLight ? "#dde9e7"  : "rgba(255,255,255,0.07)";
  const mutedColor   = isLight ? "#6b7280"  : "rgba(255,255,255,0.50)";

  // author section
  const authorBg        = isLight ? "linear-gradient(135deg,#eef8f7 0%,#f5faf9 50%,#eef8f7 100%)" : "linear-gradient(135deg,#060e0c 0%,#0d1f1c 50%,#060e0c 100%)";
  const authorBorderC   = isLight ? "rgba(25,191,183,0.18)" : "rgba(255,255,255,0.06)";
  const authorOrb1      = isLight ? "rgba(25,191,183,0.12)" : "rgba(25,191,183,0.15)";
  const authorOrb2      = isLight ? "rgba(13,31,28,0.06)"   : "rgba(0,0,0,0.15)";
  const authorName      = isLight ? "#0d1f1c" : "#ffffff";
  const authorBio       = isLight ? "#4b5563" : "rgba(255,255,255,0.50)";
  const authorLabel     = "rgba(25,191,183,0.68)";
  const socialCardBase  = isLight ? "rgba(25,191,183,0.07)" : "rgba(255,255,255,0.05)";
  const socialCardBd    = isLight ? "rgba(25,191,183,0.14)" : "rgba(255,255,255,0.08)";
  const socialText      = isLight ? "#374151" : "rgba(255,255,255,0.70)";
  const authorDivider   = isLight ? "rgba(25,191,183,0.14)" : "rgba(255,255,255,0.08)";

  const handleAiToggle = async () => {
    await Promise.all([
      flipControls.start({ rotateX: 90, transition: { duration: 0.15, ease: "easeIn" } }),
      titleFlipControls.start({ rotateX: 90, transition: { duration: 0.15, ease: "easeIn" } }),
    ]);
    setIsAiMode((prev) => !prev);
    await Promise.all([
      flipControls.start({ rotateX: 0, transition: { duration: 0.20, ease: "easeOut" } }),
      titleFlipControls.start({ rotateX: 0, transition: { duration: 0.20, ease: "easeOut" } }),
    ]);
  };

  return (
    <article>

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <div className="relative w-full min-h-[52vh] flex items-end overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
        {post.mainImage && (
          <Image src={getImageUrl(post.mainImage)} alt={post.mainImage.alt || post.title}
            fill sizes="100vw" className="object-cover" priority />
        )}
        <div className={`absolute inset-0 ${post.mainImage ? "bg-gradient-to-t from-black/85 via-black/45 to-black/10" : "bg-gradient-to-br from-[#0a2420] via-[#0e2e28] to-[#122e28]"}`} />

        <div className="relative z-10 w-full pb-10 pt-32 md:pt-40 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">

              <motion.div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
                <Breadcrumbs overrides={{ [post.slug.current]: post.title }} />
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/45 hover:text-white/75 transition-colors flex-shrink-0">
                  <ArrowLeft className="w-4 h-4" />
                  Всички статии
                </Link>
              </motion.div>

              <div className="mb-5">
                <TypewriterTitle text={post.title} delay={0.5}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.18] tracking-tight" />
              </div>

              <motion.div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/65 mb-5"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(post.publishedAt)}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-1.5">
                    {post.author.image ? (
                      <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/25">
                        <Image src={getImageUrl(post.author.image)} alt={post.author.name} fill sizes="20px" className="object-cover" />
                      </div>
                    ) : <User className="h-4 w-4" />}
                    <span className="text-sm font-medium text-white/80">{post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{readingTime} мин. четене</span>
                </div>
              </motion.div>

              {categories.length > 0 && (
                <motion.div className="flex flex-wrap gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }}>
                  {categories.map((cat, i) => (
                    <motion.span key={cat} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 1.0 + i * 0.08 }}
                      className="inline-flex items-center gap-1 bg-white/10 text-white/85 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                      <Tag className="w-3 h-3" />
                      {cat}
                    </motion.span>
                  ))}
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ══ CONTENT AREA ═════════════════════════════════════════════ */}
      <div className="mt-5 md:mt-7 rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden" style={{ background: "#f5f7f6" }}>
        <div className="px-4 md:px-6 lg:px-8 pt-10 md:pt-14 pb-14 md:pb-20">

          {/* Controls: AI pill + theme toggle */}
          <motion.div className="max-w-[960px] mx-auto mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            <motion.div animate={flipControls} style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}>
              <AiPillButton isAiMode={isAiMode} onToggle={handleAiToggle} />
            </motion.div>
            <ThemeButton theme={theme} onToggle={() => setTheme((t) => t === "light" ? "dark" : "light")} />
          </motion.div>

          {/* Article + TOC */}
          <div className="flex gap-6 items-start justify-between max-w-[1280px] mx-auto">
            <div className="flex-1 min-w-0">
              <div className="max-w-[900px]">

                {/* Entry animation wrapper — fires once on mount */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
                  {/* Theme-color animated card */}
                  <div
                    className="rounded-3xl px-6 md:px-12 lg:px-16 py-10 md:py-14 overflow-hidden transition-colors duration-500"
                    style={{
                      backgroundColor: cardBg,
                      border:          `1px solid ${cardBorder}`,
                      boxShadow:       isLight ? "0 2px 32px rgba(13,31,28,0.07)" : "0 2px 32px rgba(0,0,0,0.35)",
                    }}
                  >

                    {/* Dynamic content title — flips in sync with the pill button */}
                    <motion.div
                      animate={titleFlipControls}
                      style={{ transformPerspective: 800, transformStyle: "preserve-3d" }}
                      className="mb-8"
                    >
                      <div className="pb-5 transition-colors duration-500" style={{ borderBottom: `1px solid ${dividerColor}` }}>
                        <AnimatePresence mode="wait">
                          {isAiMode ? (
                            <motion.div key="ai-title"
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.14 }}>
                              <div className="flex items-center gap-2.5 mb-2">
                                <Sparkles className="w-5 h-5 flex-shrink-0" style={{ color: "#19BFB7" }} />
                                <h2 className="text-2xl md:text-3xl font-bold transition-colors duration-500"
                                  style={{ color: isLight ? "#0d1f1c" : "#f0faf9" }}>
                                  AI Резюме
                                </h2>
                              </div>
                              <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-primary/70 to-transparent" />
                            </motion.div>
                          ) : (
                            <motion.div key="orig-title"
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.14 }}>
                              <div className="flex items-center gap-2.5 mb-2">
                                <FileText className="w-5 h-5 flex-shrink-0" style={{ color: "#19BFB7" }} />
                                <h2 className="text-2xl md:text-3xl font-bold transition-colors duration-500"
                                  style={{ color: isLight ? "#0d1f1c" : "#f0faf9" }}>
                                  Оригинална статия
                                </h2>
                              </div>
                              <div className="h-0.5 w-14 rounded-full bg-gradient-to-r from-primary/70 to-transparent" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {isAiMode ? (
                        <motion.div key="ai"
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                          <AiSummaryPanel text={summaryText} isLight={isLight} />
                        </motion.div>
                      ) : (
                        <motion.div key="orig"
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                          <PortableText value={post.body} components={ptComponents} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {post.nulaBgUrl && (
                      <div className="mt-10 pt-8 transition-colors duration-500" style={{ borderTop: `1px solid ${dividerColor}` }}>
                        <p className="text-sm mb-2" style={{ color: mutedColor }}>Тази статия е публикувана също в:</p>
                        <a href={post.nulaBgUrl} target="_blank" rel="noopener noreferrer author"
                          className="inline-flex items-center text-primary hover:underline font-medium">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          NulaBG - Професионален блог
                        </a>
                      </div>
                    )}

                    <div className="mt-10 pt-8 transition-colors duration-500" style={{ borderTop: `1px solid ${dividerColor}` }}>
                      <ShareButtons url={`https://takiev.bg/blog/${post.slug.current}`} title={post.title} isLight={isLight} />
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {headings.length > 0 && (
              <aside className="hidden lg:block shrink-0 transition-all duration-300" style={{ width: isTocCollapsed ? 56 : 280 }}>
                <BlogTableOfContents headings={headings} isCollapsed={isTocCollapsed}
                  onToggleCollapse={() => setIsTocCollapsed((p) => !p)} theme={theme} />
              </aside>
            )}
          </div>

        </div>
      </div>

      {/* ══ AUTHOR ════════════════════════════════════════════════════ */}
      {post.author && (
        <motion.div className="mt-6 md:mt-8 mb-12 px-4 md:px-6"
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative rounded-3xl overflow-hidden transition-all duration-500"
            style={{ backgroundImage: authorBg, border: `1px solid ${authorBorderC}` }}>

            {/* Orbs */}
            <div className="absolute -top-20 right-[10%] w-60 h-60 rounded-full blur-[150px] pointer-events-none" style={{ background: authorOrb1 }} />
            <div className="absolute -bottom-20 left-[5%] w-60 h-60 rounded-full blur-[150px] pointer-events-none" style={{ background: authorOrb2 }} />

            <div className="relative z-10 flex flex-col-reverse md:flex-row items-stretch">
              <div className="flex-1 text-center md:text-left p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest font-semibold mb-2 transition-colors duration-500" style={{ color: authorLabel }}>Автор</p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 transition-colors duration-500" style={{ color: authorName }}>
                  {post.author.name}
                </h3>
                {post.author.bio && post.author.bio.length > 0 && (
                  <p className="leading-relaxed mb-6 text-sm md:text-base max-w-xl transition-colors duration-500" style={{ color: authorBio }}>
                    {(post.author.bio[0] as any)?.children?.[0]?.text}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {[
                    { href: "https://www.facebook.com/n.takiev",          label: "Facebook", iconPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                    { href: "https://www.linkedin.com/company/takiev-finance/", label: "LinkedIn", iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                    { href: "https://www.youtube.com/@nikolaytakiev6221",  label: "YouTube",  iconPath: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                    { href: "https://www.tiktok.com/@n.takiev",            label: "TikTok",   iconPath: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
                  ].map(({ href, label, iconPath }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300"
                      style={{
                        background: socialCardBase,
                        border: `1px solid ${socialCardBd}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = isLight ? "rgba(25,191,183,0.14)" : "rgba(255,255,255,0.10)";
                        (e.currentTarget as HTMLElement).style.borderColor = isLight ? "rgba(25,191,183,0.30)" : "rgba(255,255,255,0.20)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = socialCardBase;
                        (e.currentTarget as HTMLElement).style.borderColor = socialCardBd;
                      }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: isLight ? "#19BFB7" : "rgba(255,255,255,0.60)" }}>
                        <path d={iconPath} />
                      </svg>
                      <span className="text-sm font-medium transition-colors duration-200" style={{ color: socialText }}>{label}</span>
                    </a>
                  ))}
                  <a href="https://blog.nula.bg/author/nikolai/" target="_blank" rel="author noopener noreferrer"
                    className="group flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300"
                    style={{ background: socialCardBase, border: `1px solid ${socialCardBd}` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = isLight ? "rgba(25,191,183,0.14)" : "rgba(25,191,183,0.18)";
                      (e.currentTarget as HTMLElement).style.borderColor = isLight ? "rgba(25,191,183,0.30)" : "rgba(25,191,183,0.40)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = socialCardBase;
                      (e.currentTarget as HTMLElement).style.borderColor = socialCardBd;
                    }}
                  >
                    <ExternalLink className="w-5 h-5 transition-colors duration-200" style={{ color: isLight ? "#19BFB7" : "rgba(255,255,255,0.60)" }} />
                    <span className="text-sm font-medium transition-colors duration-200" style={{ color: socialText }}>NULA.bg</span>
                  </a>
                </div>
              </div>

              <div className="hidden md:flex items-center">
                <div className="w-[1px] h-3/4 transition-colors duration-500" style={{
                  background: `linear-gradient(to bottom, transparent, ${authorDivider}, transparent)`
                }} />
              </div>

              <div className="w-full md:w-auto shrink-0 flex items-end justify-end">
                {post.author.image ? (
                  <Image src={getImageUrl(post.author.image)} alt={post.author.name}
                    width={420} height={420} sizes="(max-width: 768px) 100vw, 420px"
                    className="w-full md:w-[320px] lg:w-[420px] h-auto block" />
                ) : (
                  <div className="w-full md:w-[320px] lg:w-[420px] aspect-square flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(25,191,183,0.25), rgba(25,191,183,0.10))" }}>
                    <span className="text-6xl font-bold" style={{ color: "var(--color-primary)" }}>
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══ BELOW AUTHOR ══════════════════════════════════════════════ */}
      <div className="container mx-auto px-4 max-w-7xl pb-12 md:pb-16">

        {relatedPosts.length > 0 && (
          <div className="max-w-[900px] mx-auto">
            <RelatedPosts posts={relatedPosts} hasTags={hasTags} />
          </div>
        )}

        {recentNews.length > 0 && (
          <motion.div className="max-w-[900px] mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <div className="rounded-2xl border border-black/[0.07] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] bg-[#f5f8f7]">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary-link)" }} />
                  <span className="text-sm font-bold" style={{ color: "var(--color-dark)" }}>Актуални новини от НАП и НОИ</span>
                </div>
                <Link href="/novini" className="text-xs font-medium hover:underline" style={{ color: "var(--color-primary-link)" }}>
                  Всички новини →
                </Link>
              </div>
              <div className="divide-y divide-black/[0.04]">
                {recentNews.map((news, i) => {
                  const href = news.slug?.current ? `/novini/${news.slug.current}` : news.url;
                  const isExt = !news.slug?.current;
                  return (
                    <motion.div key={news._id} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}>
                      <Link href={href} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 px-5 py-3.5 hover:bg-[#f5f8f7] transition-colors duration-200">
                        <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex-shrink-0 ${news.source === "nap" ? "bg-blue-600" : "bg-emerald-600"}`}>
                          {news.source === "nap" ? "НАП" : "НОИ"}
                        </span>
                        <span className="flex-1 text-sm font-medium leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200" style={{ color: "var(--color-dark)" }}>
                          {news.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 text-[#9ca3af] group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA — always brand dark, no slate */}
        <motion.div className="max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative rounded-2xl p-10 md:p-14 overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#060e0c 0%,#0d1f1c 50%,#060e0c 100%)" }} />
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(25,191,183,0.18)" }} />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(6,14,12,0.25)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Имате въпроси?</h3>
                <p className="leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.50)" }}>
                  Свържете се с нас и ще ви помогнем с вашите финансови и счетоводни нужди.
                </p>
              </div>
              <div className="shrink-0">
                <PremiumCTA href="/kontakti">Свържи се с нас</PremiumCTA>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </article>
  );
}
