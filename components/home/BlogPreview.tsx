"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  animate,
  type MotionProps,
  type PanInfo,
} from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import type { BlogPost } from "@/types";
import { PremiumCTA } from "@/components/ui/PremiumCTA";

interface BlogPreviewProps {
  posts: BlogPost[];
}

const CARD_GAP = 16; // px — matches gap-4
const VISIBLE = 2;   // cards visible at once in carousel

/* ─── BlogPostCard ───────────────────────────────────────────────────────── */
function BlogPostCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <article
      className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
      style={{ height: "clamp(240px, 22vw, 340px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full-card link — image area clickable */}
      <Link
        href={`/blog/${post.slug.current}`}
        className="absolute inset-0 z-[1] cursor-pointer"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Image — zooms out on hover */}
      {post.mainImage ? (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1 : 1.07 }}
          transition={{ duration: 0.65, ease }}
        >
          <Image
            src={getImageUrl(post.mainImage)}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, calc(50vw - 3rem)"
            className="object-cover"
            quality={90}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f1c] to-[#060e0c]" />
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Normal state — title at bottom */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? 8 : 0 }}
        transition={{ duration: 0.3, ease }}
        className="absolute inset-x-0 bottom-0 z-20 p-5 pointer-events-none"
      >
        <span className="inline-block px-2.5 py-1 bg-primary/90 text-white text-xs font-semibold rounded-md mb-2">
          Блог
        </span>
        <h3 className="text-white font-bold text-base line-clamp-2 leading-snug">{post.title}</h3>
      </motion.div>

      {/* Hover panel — slides in from right */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.42, ease }}
        className="absolute inset-y-0 right-0 z-30 w-[68%] flex flex-col justify-between p-5"
        style={{
          background: "linear-gradient(135deg, rgba(6,14,12,0.97) 0%, rgba(13,31,28,0.97) 100%)",
          backdropFilter: "blur(12px)",
          borderLeft: "1px solid rgba(25,191,183,0.2)",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <div>
          <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              5 мин
            </span>
          </div>
          <Link href={`/blog/${post.slug.current}`} className="relative z-40">
            <h3 className="text-white font-bold text-base leading-snug mb-2 hover:text-primary transition-colors duration-200 cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <p className="font-body text-sm text-white/70 leading-relaxed line-clamp-5">
            {post.excerpt}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug.current}`}
          className="relative z-40 group/btn inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-3"
        >
          <span>Прочети повече</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Teal border glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-10 rounded-2xl pointer-events-none ring-1 ring-primary/40"
      />
    </article>
  );
}

/* ─── VerticalCarousel ───────────────────────────────────────────────────── */
function VerticalCarousel({
  posts,
  reduced,
}: {
  posts: BlogPost[];
  reduced: boolean;
}) {
  const isCarousel = posts.length > VISIBLE;

  /* state & refs — all hooks before any early return */
  const [activeIdx, setActiveIdx] = useState(0);
  const [cardH, setCardH] = useState(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const isDraggingRef = useRef(false);

  /* measure first card height (responsive) */
  useEffect(() => {
    const el = firstCardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardH(el.offsetHeight));
    ro.observe(el);
    setCardH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  /* derived sizes */
  const unit = cardH + CARD_GAP;
  const trackH = cardH > 0 ? VISIBLE * cardH + (VISIBLE - 1) * CARD_GAP : 0;
  const maxScroll = Math.max(0, (posts.length - VISIBLE) * unit);
  const dotCount = Math.max(1, posts.length - VISIBLE + 1);

  /* snap to a scroll index */
  const snapTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(posts.length - VISIBLE, idx));
      setActiveIdx(clamped);
      animate(y, -(clamped * unit), {
        type: "spring",
        stiffness: 380,
        damping: 38,
        mass: 0.85,
      });
    },
    [posts.length, unit, y]
  );

  /* snap on drag end */
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      isDraggingRef.current = false;
      if (!unit) return;
      const { y: vy } = info.velocity;
      const { y: oy } = info.offset;
      if (Math.abs(vy) > 400) snapTo(vy < 0 ? activeIdx + 1 : activeIdx - 1);
      else if (Math.abs(oy) > unit * 0.28) snapTo(oy < 0 ? activeIdx + 1 : activeIdx - 1);
      else snapTo(activeIdx);
    },
    [activeIdx, snapTo, unit]
  );

  /* mouse-wheel scroll — passive:false required to call preventDefault */
  useEffect(() => {
    if (!isCarousel) return;
    const el = trackRef.current;
    if (!el) return;
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 300) return; // throttle
      lastWheel = now;
      if (e.deltaY > 0) snapTo(activeIdx + 1);
      else if (e.deltaY < 0) snapTo(activeIdx - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isCarousel, activeIdx, snapTo]);

  /* auto-hint: peek next card briefly, repeat every 7 s */
  useEffect(() => {
    if (!isCarousel || reduced || cardH === 0) return;
    const base = -(activeIdx * unit);
    const canPeek = activeIdx < posts.length - VISIBLE;

    const doHint = () => {
      if (isDraggingRef.current || !canPeek) return;
      animate(y, base - 28, {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      });
      setTimeout(() => {
        if (!isDraggingRef.current)
          animate(y, base, {
            type: "spring" as const,
            stiffness: 300,
            damping: 26,
          });
      }, 460);
    };

    const t = setTimeout(doHint, 2400);
    const interval = setInterval(doHint, 7000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, [isCarousel, reduced, cardH, activeIdx, posts.length, unit, y]);

  /* ── not a carousel, or card not yet measured → simple stack ── */
  if (!isCarousel || cardH === 0) {
    return (
      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <div key={post._id} ref={i === 0 ? firstCardRef : undefined}>
            <BlogPostCard post={post} />
          </div>
        ))}
      </div>
    );
  }

  /* ── carousel ── */
  return (
    <div className="flex items-stretch gap-3">
      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex-1 overflow-hidden"
        style={{ height: trackH }}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: -maxScroll, bottom: 0 }}
          dragElastic={0.07}
          dragMomentum={false}
          style={{ y }}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={handleDragEnd}
          className="flex flex-col gap-4 cursor-grab active:cursor-grabbing select-none"
        >
          {posts.map((post, i) => (
            <div key={post._id} ref={i === 0 ? firstCardRef : undefined}>
              <BlogPostCard post={post} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Vertical dot indicators */}
      <div className="flex flex-col items-center justify-center gap-2">
        {Array.from({ length: dotCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
            aria-label={`Покажи позиция ${i + 1}`}
            className="flex items-center justify-center p-1"
          >
            <motion.div
              animate={{
                height: i === activeIdx ? 24 : 7,
                backgroundColor:
                  i === activeIdx ? "#19BFB7" : "rgba(255,255,255,0.18)",
                opacity: i === activeIdx ? 1 : 0.55,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ width: 3, borderRadius: 99 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── BlogPreview ────────────────────────────────────────────────────────── */
export function BlogPreview({ posts }: BlogPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion() ?? false;

  if (posts.length === 0) return null;

  const anim = (delay: number): MotionProps =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { type: "spring", stiffness: 200, damping: 30, mass: 1, delay },
        };

  return (
    <motion.section
      ref={ref}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { y: 120 },
            whileInView: { y: 0 },
            viewport: { once: true, margin: "-40px" },
            transition: { type: "spring" as const, stiffness: 80, damping: 20 },
          })}
      className="relative py-20 md:py-28 overflow-hidden shadow-sm"
      style={{
        backgroundColor: "#0d1f1c",
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        filter: "drop-shadow(0 -10px 20px rgba(0,0,0,0.10))",
      }}
    >
      {/* Top-center teal bloom */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(25,191,183,0.14) 0%, rgba(25,191,183,0.04) 50%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Bottom-right glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(25,191,183,0.07) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(25,191,183,0.3), transparent)",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
          opacity: 0.04,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: heading + CTA — always centered in column ── */}
          <motion.div {...anim(0)} className="flex flex-col justify-center">
            <SectionBadge>Нашият блог</SectionBadge>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Последни <span className="text-primary">статии</span>
            </h2>
            <p className="mt-4 text-lg text-white/50 max-w-md">
              Разгледайте нашия блог за актуални новини и съвети по счетоводство и данъци
            </p>
            <div className="mt-8">
              <PremiumCTA href="/blog">
                Всички статии
                <ArrowRight className="h-5 w-5" />
              </PremiumCTA>
            </div>
          </motion.div>

          {/* ── Right: cards / carousel ── */}
          <motion.div {...anim(0.18)}>
            <VerticalCarousel
              posts={posts.slice(0, 4)}
              reduced={prefersReducedMotion}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
