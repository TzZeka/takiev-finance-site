"use client";

import {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  Fragment,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { BlogCard } from "@/components/blog/BlogCard";
import { FirmNewsDashboard } from "@/components/blog/FirmNewsDashboard";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost, NewsItem } from "@/types";

const POSTS_PER_PAGE = 8;
const MAX_VISIBLE_TAGS = 3;

// Highlight matching words in a title
function HighlightedTitle({ title, query }: { title: string; query: string }) {
  const words = query.split(/\s+/).filter((w) => w.length > 0);
  if (!words.length) return <>{title}</>;
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = title.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-primary font-bold">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

interface BlogListClientProps {
  posts: BlogPost[];
  news?: NewsItem[];
}

export function BlogListClient({ posts, news }: BlogListClientProps) {
  const router = useRouter();

  // ── State ──────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [pillExpanded, setPillExpanded] = useState(false);
  const [pillHidden, setPillHidden] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicking, setCursorClicking] = useState(false);
  const [isMobilePointer, setIsMobilePointer] = useState(true); // default true avoids flash
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFocused, setSearchFocused] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [iconFlipKey, setIconFlipKey] = useState(0);
  const [svgPath, setSvgPath] = useState("");
  const [totalLength, setTotalLength] = useState(0);

  // Desktop search expansion: captured rect of main content at focus moment
  const [expandedRect, setExpandedRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const twoColRef = useRef<HTMLDivElement>(null);
  const dividerSpacerRef = useRef<HTMLDivElement>(null);
  const recentSectionRef = useRef<HTMLElement>(null);
  const newsSectionRef = useRef<HTMLDivElement>(null);

  // ── Detect touch/coarse pointer — hide cursor on mobile ───────────────────
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobilePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobilePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Hide pill near footer ──────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      setPillHidden(
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 180
      );
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  // ── Periodic cursor click simulation ──────────────────────────────────────
  useEffect(() => {
    if (!cursorVisible || isMobilePointer) return;
    const id = setInterval(() => {
      setCursorClicking(true);
      setTimeout(() => setCursorClicking(false), 260);
    }, 3500);
    return () => clearInterval(id);
  }, [cursorVisible, isMobilePointer]);

  // ── Custom cursor spring ───────────────────────────────────────────────────
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const smoothX = useSpring(mouseX, { damping: 26, stiffness: 280 });
  const smoothY = useSpring(mouseY, { damping: 26, stiffness: 280 });
  const dashoffsetMV = useMotionValue(0);

  // ── Scroll progress with spring for smoothness ────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  // Spring smooths out choppy scroll events and slows down the fill rate
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 38,
    damping: 18,
    restDelta: 0.001,
  });

  // ── SVG progress path: compute geometry with padding + rounded corners ─────
  const svgAnimatedPathRef = useRef<SVGPathElement>(null);

  const computePath = useCallback(() => {
    if (!containerRef.current || !dividerSpacerRef.current || !recentSectionRef.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const spacerRect = dividerSpacerRef.current.getBoundingClientRect();
    const recentRect = recentSectionRef.current.getBoundingClientRect();

    const divX = Math.round(spacerRect.left - cRect.left);
    const cW = Math.round(cRect.width);
    const PAD = 14; // gap from section borders
    const R = 10;   // corner radius

    const rT = Math.round(recentRect.top - cRect.top) - PAD;
    const rB = Math.round(recentRect.bottom - cRect.top) + PAD;

    // Path: vertical divider → bracket around "Последни" (rounded corners)
    let p =
      `M ${divX} 0 ` +
      `L ${divX} ${rT - R} ` +
      `Q ${divX} ${rT} ${divX + R} ${rT} ` +
      `L ${cW - R} ${rT} ` +
      `Q ${cW} ${rT} ${cW} ${rT + R} ` +
      `L ${cW} ${rB - R} ` +
      `Q ${cW} ${rB} ${cW - R} ${rB} ` +
      `L ${divX + R} ${rB} ` +
      `Q ${divX} ${rB} ${divX} ${rB + R}`;

    if (newsSectionRef.current) {
      const nRect = newsSectionRef.current.getBoundingClientRect();
      if (nRect.height > 4) {
        const nT = Math.round(nRect.top - cRect.top) - PAD;
        const nB = Math.round(nRect.bottom - cRect.top) + PAD;
        p +=
          ` L ${divX} ${nT - R} ` +
          `Q ${divX} ${nT} ${divX + R} ${nT} ` +
          `L ${cW - R} ${nT} ` +
          `Q ${cW} ${nT} ${cW} ${nT + R} ` +
          `L ${cW} ${nB - R} ` +
          `Q ${cW} ${nB} ${cW - R} ${nB} ` +
          `L ${divX} ${nB}`;
      }
    }

    setSvgPath(p);
  }, []);

  // Measure exact path length via SVG after path string changes
  useEffect(() => {
    if (svgAnimatedPathRef.current && svgPath) {
      setTotalLength(svgAnimatedPathRef.current.getTotalLength());
    }
  }, [svgPath]);

  useLayoutEffect(() => { computePath(); }, [computePath]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(computePath);
    ro.observe(container);
    return () => ro.disconnect();
  }, [computePath]);

  // Sync dashoffset with spring progress (smooth + slower fill)
  useEffect(() => {
    const update = (v: number) => dashoffsetMV.set(totalLength * (1 - v));
    update(springProgress.get());
    return springProgress.on("change", update);
  }, [springProgress, totalLength, dashoffsetMV]);

  // ── Tags ───────────────────────────────────────────────────────────────────
  const allTags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [posts]);

  const visibleTags = showAllTags ? allTags : allTags.slice(0, MAX_VISIBLE_TAGS);

  // ── Smart search suggestions (word-based scoring) ─────────────────────────
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const words = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return posts
      .map((post) => {
        let score = 0;
        const tl = post.title.toLowerCase();
        const el = (post.excerpt || "").toLowerCase();
        const al = (post.author?.name || "").toLowerCase();
        const tagl = (post.tags || []).join(" ").toLowerCase();
        words.forEach((w) => {
          if (tl.includes(w)) score += 4;
          if (el.includes(w)) score += 2;
          if (al.includes(w)) score += 1;
          if (tagl.includes(w)) score += 1;
        });
        return { post, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ post }) => post);
  }, [posts, searchQuery]);

  // ── Filtered posts — ALL words must match (not "some") ────────────────────
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedTag && !post.tags?.includes(selectedTag)) return false;
      const trimmed = searchQuery.trim();
      if (trimmed) {
        const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
        if (!words.length) return true;
        const searchable = [
          post.title,
          post.excerpt || "",
          post.author?.name || "",
          ...(post.tags || []),
        ]
          .join(" ")
          .toLowerCase();
        // Every word must be present → avoids false matches from common words
        return words.every((w) => searchable.includes(w));
      }
      return true;
    });
  }, [posts, searchQuery, selectedTag]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Resets
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedTag]);
  useEffect(() => { setSuggestionIndex(-1); }, [searchQuery]);

  // ── Sidebar "Предложени" — always show top 3 relevant, ignores pagination ──
  const suggestedPosts = useMemo(() => {
    if (selectedTag) {
      return posts.filter((p) => p.tags?.includes(selectedTag)).slice(0, 3);
    }
    const featured = posts.filter((p) => p.featured);
    return (featured.length >= 2 ? featured : posts).slice(0, 3);
  }, [posts, selectedTag]);

  // ── Close suggestions on outside click ────────────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!searchWrapperRef.current?.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isFiltering = !!(searchQuery || selectedTag);

  // ── Keyboard navigation for suggestions ───────────────────────────────────
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchFocused || !searchSuggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSuggestionIndex((i) => Math.min(i + 1, searchSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSuggestionIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && suggestionIndex >= 0) {
      e.preventDefault();
      const picked = searchSuggestions[suggestionIndex];
      if (picked) {
        closeSearch();
        router.push(`/blog/${picked.slug.current}`);
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  // ── Desktop search expansion + scroll lock ────────────────────────────────
  const openSearch = useCallback(() => {
    setSearchFocused(true);
    setIconFlipKey((k) => k + 1);
    if (!isMobilePointer && mainRef.current && searchWrapperRef.current) {
      // Lock page scroll instantly
      document.body.style.overflow = "hidden";
      const mRect = mainRef.current.getBoundingClientRect();
      const sRect = searchWrapperRef.current.getBoundingClientRect();
      setExpandedRect({
        top: sRect.top,
        left: mRect.left,
        width: mRect.width,
      });
    }
  }, [isMobilePointer]);

  const closeSearch = useCallback(() => {
    setSearchFocused(false);
    setSuggestionIndex(-1);
    setExpandedRect(null);
    // Restore scroll immediately
    document.body.style.overflow = "";
  }, []);

  // Ensure scroll is always restored on unmount
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  const recentPosts = posts.slice(0, 6);

  // ── Search wrapper inline style (desktop expansion) ────────────────────────
  const searchStyle: React.CSSProperties =
    expandedRect
      ? {
          position: "fixed",
          top: expandedRect.top,
          left: expandedRect.left,
          width: expandedRect.width,
          zIndex: 200,
          transition: "box-shadow 0.3s ease",
        }
      : {};

  return (
    <div ref={containerRef} className="relative">
      {/* ── CLICK-OUTSIDE CAPTURE (no blur, just closes search) ─────────── */}
      {expandedRect && (
        <div className="fixed inset-0 z-[199]" onClick={closeSearch} />
      )}

      {/* ── CUSTOM CURSOR (desktop only) ──────────────────────────────────── */}
      <AnimatePresence>
        {cursorVisible && !isMobilePointer && (
          <motion.div
            className="fixed z-[9999] pointer-events-none"
            style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: cursorClicking ? 0.78 : 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{
              duration: cursorClicking ? 0.08 : 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="w-[68px] h-[68px] rounded-full bg-surface/75 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <span className="text-white text-[8px] font-bold tracking-[0.18em] uppercase">
                ПРОЧЕТИ
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TWO-COLUMN LAYOUT ─────────────────────────────────────────────── */}
      <div ref={twoColRef} className="flex flex-col lg:flex-row">

        {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
        <aside className="w-full lg:w-[250px] xl:w-[268px] flex-shrink-0 lg:sticky lg:top-28 lg:self-start space-y-5 pb-8 lg:pb-0">

          {/* Search */}
          <div
            ref={searchWrapperRef}
            style={searchStyle}
            className={expandedRect ? "shadow-[0_8px_40px_rgba(0,0,0,0.18)]" : ""}
          >
            <div
              className={`bg-white/70 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-200 shadow-sm ${
                searchFocused
                  ? "border-primary/60 ring-2 ring-primary/10"
                  : "border-black/[0.08]"
              }`}
            >
              {/* Input row */}
              <div className="relative flex items-center">
                {/* Icon — one-time flip on focus */}
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <motion.div
                    key={iconFlipKey}
                    animate={
                      iconFlipKey > 0
                        ? { rotateY: [0, 180, 360] }
                        : { rotateY: 0 }
                    }
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    style={{ transformPerspective: 300 }}
                  >
                    <Search className="h-4 w-4 text-primary" />
                  </motion.div>
                </div>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={openSearch}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Търси статии..."
                  className={`w-full bg-transparent pl-10 pr-9 py-3 text-[13px] text-surface placeholder:text-slate-400 outline-none transition-shadow duration-200 ${
                    expandedRect ? "text-[15px] py-3.5" : ""
                  }`}
                />

                {/* X — spin on appear/disappear + counter-clockwise on hover */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                      whileHover={{ rotate: -360, transition: { duration: 0.4 } }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => {
                        setSearchQuery("");
                        closeSearch();
                        searchInputRef.current?.blur();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Suggestions — inside the container */}
              <AnimatePresence>
                {searchFocused && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-black/[0.06]">
                      {searchSuggestions.map((post, idx) => (
                        <button
                          key={post._id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            closeSearch();
                            router.push(`/blog/${post.slug.current}`);
                          }}
                          onMouseEnter={() => setSuggestionIndex(idx)}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left border-b border-black/[0.04] last:border-0 transition-colors duration-150 ${
                            suggestionIndex === idx
                              ? "bg-primary/[0.07]"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          {post.mainImage?.asset && (
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                              <Image
                                src={getImageUrl(post.mainImage)}
                                alt={post.title}
                                fill
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-surface leading-snug line-clamp-1">
                              <HighlightedTitle
                                title={post.title}
                                query={searchQuery}
                              />
                            </p>
                            {post.tags?.[0] && (
                              <span className="text-[10px] text-slate-400">
                                {post.tags[0]}
                              </span>
                            )}
                          </div>
                          {suggestionIndex === idx && (
                            <span className="text-[10px] text-primary font-bold flex-shrink-0">
                              ↵
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Placeholder to prevent layout shift when search goes fixed */}
          {expandedRect && <div className="h-[52px]" />}

          {/* Categories — glassmorphism, max 3 visible */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-black/[0.06] shadow-sm p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              Категории
            </h3>
            <div className="space-y-0.5">
              <button
                onClick={() => setSelectedTag(null)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 flex items-center justify-between ${
                  !selectedTag
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-surface"
                }`}
              >
                <span>Всички</span>
                <span
                  className={`text-[11px] font-normal ${
                    !selectedTag ? "text-white/70" : "text-slate-400"
                  }`}
                >
                  {posts.length}
                </span>
              </button>

              {visibleTags.map((tag) => {
                const count = posts.filter((p) => p.tags?.includes(tag)).length;
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 flex items-center justify-between ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-surface"
                    }`}
                  >
                    <span className="truncate mr-2">{tag}</span>
                    <span
                      className={`text-[11px] font-normal flex-shrink-0 ${
                        isActive ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* Show all / collapse */}
              {allTags.length > MAX_VISIBLE_TAGS && (
                <button
                  onClick={() => setShowAllTags((v) => !v)}
                  className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-semibold text-slate-400 hover:text-primary flex items-center gap-1.5 transition-colors duration-200 mt-1"
                >
                  <motion.span
                    animate={{ rotate: showAllTags ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                  {showAllTags
                    ? "Покажи по-малко"
                    : `Покажи всички (${allTags.length})`}
                </button>
              )}
            </div>
          </div>

          {/* Предложени — sidebar (context-aware, always shows) */}
          {suggestedPosts.length > 0 && (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-black/[0.06] shadow-sm p-5">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={selectedTag ?? "suggested"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4"
                >
                  {selectedTag ? `Още от ${selectedTag}` : "Предложени"}
                </motion.h3>
              </AnimatePresence>
              <div className="space-y-4">
                {suggestedPosts.map((post, i) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm">
                        {post.mainImage?.asset && (
                          <Image
                            src={getImageUrl(post.mainImage)}
                            alt={post.mainImage.alt || post.title}
                            fill
                            sizes="56px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[12px] font-semibold text-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {post.tags?.[0] && (
                            <span className="text-[9px] font-bold tracking-wider uppercase text-primary/70">
                              {post.tags[0]}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ── DIVIDER SPACER — keeps layout; SVG draws the actual animated line */}
        <div
          ref={dividerSpacerRef}
          className="hidden lg:block flex-shrink-0 w-px mx-8 xl:mx-10"
        />

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <main ref={mainRef} className="flex-1 min-w-0">
          {/* Section header with letter stagger */}
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-black/[0.06]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={selectedTag ?? "all"}
                className="text-2xl md:text-[28px] font-bold text-surface tracking-tight flex items-center gap-1"
              >
                {selectedTag ? (
                  <>
                    <motion.span
                      className="text-primary mr-0.5"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      #
                    </motion.span>
                    <span className="inline-flex">
                      {selectedTag.split("").map((char, i) => (
                        <motion.span
                          key={`${selectedTag}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{
                            duration: 0.28,
                            delay: i * 0.03,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </span>
                  </>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Всички статии
                  </motion.span>
                )}
              </motion.h2>
            </AnimatePresence>

            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <AnimatePresence>
                {isFiltering && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag(null);
                    }}
                    className="text-[12px] text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Изчисти
                  </motion.button>
                )}
              </AnimatePresence>
              <span className="text-[13px] text-slate-400 font-medium tabular-nums">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "статия" : "статии"}
              </span>
            </div>
          </div>

          {/* Posts grid */}
          {paginatedPosts.length > 0 ? (
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => {
                if (!isMobilePointer) setCursorVisible(true);
              }}
              onMouseLeave={() => setCursorVisible(false)}
              className={
                cursorVisible && !isMobilePointer
                  ? "cursor-none [&_a]:cursor-none [&_button]:cursor-none"
                  : ""
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-7">
                <AnimatePresence mode="popLayout">
                  {paginatedPosts.map((post, i) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.93,
                        transition: { duration: 0.16, ease: "easeIn" },
                      }}
                      transition={{
                        duration: 0.32,
                        delay: Math.min(i * 0.05, 0.25),
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <BlogCard post={post} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-black/[0.06]">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-slate-50 flex items-center justify-center border border-black/[0.06]">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-[15px] font-semibold text-surface mb-3">
                {isFiltering
                  ? "Няма намерени статии по зададените критерии."
                  : "Статиите ще бъдат добавени скоро."}
              </p>
              {isFiltering && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="text-primary hover:underline text-[13px] font-medium mt-1"
                >
                  Изчисти филтрите
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl border border-black/[0.08] bg-white flex items-center justify-center text-slate-500 hover:text-surface hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      page === currentPage
                        ? "bg-primary text-white shadow-sm"
                        : "border border-black/[0.08] bg-white text-slate-500 hover:border-primary/40 hover:text-surface"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-xl border border-black/[0.08] bg-white flex items-center justify-center text-slate-500 hover:text-surface hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── HORIZONTAL SCROLL-SNAP — Последни публикации ────────────────── */}
      {recentPosts.length > 0 && (
        <section ref={recentSectionRef} className="mt-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-black/[0.06]" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex-shrink-0">
              Последни публикации
            </h3>
            <div className="h-px flex-1 bg-black/[0.06]" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group flex-shrink-0 w-[280px] snap-start bg-white rounded-2xl border border-black/[0.06] overflow-hidden hover:border-primary/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                  {post.mainImage?.asset ? (
                    <Image
                      src={getImageUrl(post.mainImage)}
                      alt={post.mainImage.alt || post.title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-slate-100" />
                  )}
                  {post.tags?.[0] && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[9px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-surface px-2 py-0.5 rounded-full">
                        {post.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-[13px] font-bold text-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {formatDate(post.publishedAt)}
                    </span>
                    {post.readingTime && (
                      <span className="text-[11px] text-slate-400">
                        · {post.readingTime} мин
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FIRM NEWS DASHBOARD ─────────────────────────────────────────── */}
      <div ref={newsSectionRef}>
        <FirmNewsDashboard news={news ?? []} />
      </div>

      {/* ── SVG SCROLL PROGRESS PATH (desktop only, absolute) ───────────── */}
      {svgPath && (
        <svg
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ zIndex: 1, overflow: "visible", width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          {/* Gray background track */}
          <path
            d={svgPath}
            stroke="rgba(64,81,78,0.15)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated fill */}
          <motion.path
            ref={svgAnimatedPathRef}
            d={svgPath}
            stroke="var(--color-dark)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength}
            style={{ strokeDashoffset: dashoffsetMV }}
          />
        </svg>
      )}

      {/* ── FLOATING CONTROL PILL ────────────────────────────────────────── */}
      {allTags.length > 0 && (
        <FloatingPill
          postCount={filteredPosts.length}
          totalCount={posts.length}
          tags={allTags}
          selectedTag={selectedTag}
          onTagSelect={(tag) =>
            setSelectedTag(selectedTag === tag ? null : tag)
          }
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedTag(null);
          }}
          isFiltering={isFiltering}
          expanded={pillExpanded}
          onToggle={() => setPillExpanded((p) => !p)}
          hidden={pillHidden}
        />
      )}
    </div>
  );
}

// ── Floating Pill ──────────────────────────────────────────────────────────────

interface FloatingPillProps {
  postCount: number;
  totalCount: number;
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string) => void;
  onClearFilters: () => void;
  isFiltering: boolean;
  expanded: boolean;
  onToggle: () => void;
  hidden: boolean;
}

function FloatingPill({
  postCount,
  totalCount,
  tags,
  selectedTag,
  onTagSelect,
  onClearFilters,
  isFiltering,
  expanded,
  onToggle,
  hidden,
}: FloatingPillProps) {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      style={{ pointerEvents: hidden ? "none" : "auto" }}
      variants={{
        hidden: {
          y: 80,
          opacity: 0,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      initial="hidden"
      animate={hidden ? "hidden" : "visible"}
    >
      <motion.div
        layout
        className="bg-white/90 backdrop-blur-xl border border-black/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
        animate={{ borderRadius: expanded ? "1.25rem" : "9999px" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.button
              key="collapsed"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onToggle}
              className="flex items-center gap-3 px-5 py-3 whitespace-nowrap"
            >
              <span className="flex items-center gap-2 text-[13px] font-semibold text-surface">
                {/* Static dot — no pulsing */}
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                {postCount} статии
              </span>
              <span className="w-px h-4 bg-black/10 flex-shrink-0" />
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap items-center gap-2 px-4 py-3 max-w-[92vw] md:max-w-2xl"
            >
              <button
                onClick={onToggle}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <span className="text-[12px] text-slate-400 font-medium">
                {postCount}/{totalCount}
              </span>
              <span className="w-px h-4 bg-black/[0.08] flex-shrink-0" />
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagSelect(tag)}
                  className={`text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                    selectedTag === tag
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {isFiltering && (
                <button
                  onClick={onClearFilters}
                  className="text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all duration-200 whitespace-nowrap"
                >
                  Изчисти
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
