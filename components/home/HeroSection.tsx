"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, CustomEase);
}

// Trail config
const TRAIL_COUNT = 6;
const TRAIL_SIZES  = [18, 13, 10, 7, 5, 3];
const TRAIL_ALPHAS = [0.40, 0.28, 0.18, 0.12, 0.08, 0.05];

// Splits text into individually-hoverable letter spans
function LetterHover({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i}> </span>
        ) : (
          <motion.span
            key={i}
            style={{ display: "inline-block", verticalAlign: "baseline" }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 520, damping: 18 }}
          >
            {char}
          </motion.span>
        )
      )}
    </>
  );
}

interface HeroSectionProps {
  motto: string;
}

export function HeroSection({ motto }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerRef  = useRef<HTMLElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const scene1ContentRef  = useRef<HTMLDivElement>(null);
  const videoWrapRef      = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Text element refs for staggered entrance
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const h1Line1Ref = useRef<HTMLSpanElement>(null);
  const h1Line2Ref = useRef<HTMLSpanElement>(null);
  const h1Line3Ref = useRef<HTMLSpanElement>(null);
  const mottoRef   = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Mobile stats
  const mobileStatsRef  = useRef<HTMLDivElement>(null);
  const statsAnimated   = useRef(false);
  const [yearCount, setYearCount]           = useState(new Date().getFullYear());
  const [yearLabelVisible, setYearLabelVisible] = useState(false);
  const [count150, setCount150]             = useState(0);
  const [plusVisible, setPlusVisible]       = useState(false);

  // ── CURSOR ──────────────────────────────────────────────────────────────
  const [isInHero, setIsInHero]       = useState(false);
  const [cursorReady, setCursorReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const trailRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRaw     = useRef({ x: -100, y: -100 });
  // positions[0] = smoothed for ring; positions[1..TRAIL_COUNT] = trail
  const positions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT + 1 }, () => ({ x: -100, y: -100 }))
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setCursorReady(true);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const raw = cursorRaw.current;
      const pos = positions.current;

      pos[0].x = lerp(pos[0].x, raw.x, 0.42);
      pos[0].y = lerp(pos[0].y, raw.y, 0.42);
      for (let i = 1; i <= TRAIL_COUNT; i++) {
        pos[i].x = lerp(pos[i].x, pos[i - 1].x, 0.36);
        pos[i].y = lerp(pos[i].y, pos[i - 1].y, 0.36);
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform =
          `translate(${raw.x - 3}px, ${raw.y - 3}px)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform =
          `translate(${pos[0].x - 18}px, ${pos[0].y - 18}px)`;
      }
      trailRefs.current.forEach((ref, i) => {
        if (ref) {
          const half = TRAIL_SIZES[i] / 2;
          ref.style.transform =
            `translate(${pos[i + 1].x - half}px, ${pos[i + 1].y - half}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove   = (e: MouseEvent) => { cursorRaw.current = { x: e.clientX, y: e.clientY }; };
    const onEnter  = () => setIsInHero(true);
    const onLeave  = () => setIsInHero(false);

    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── RIPPLE ──────────────────────────────────────────────────────────────
  const createRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const size = Math.max(btn.clientWidth, btn.clientHeight) * 2.4;

    const ripple = document.createElement("span");
    Object.assign(ripple.style, {
      position:     "absolute",
      borderRadius: "50%",
      width:  `${size}px`,
      height: `${size}px`,
      left:   `${x - size / 2}px`,
      top:    `${y - size / 2}px`,
      background: "rgba(255,255,255,0.22)",
      transform:  "scale(0)",
      animation:  "btn-ripple 0.65s ease-out forwards",
      pointerEvents: "none",
    });

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  };

  // ── VIDEO PLAY / PAUSE ─────────────────────────────────────────────────
  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsVideoPlaying(true); }
    else              { video.pause(); setIsVideoPlaying(false); }
  };

  // ── GSAP INIT ANIMATION ─────────────────────────────────────────────────
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    CustomEase.create("cinematic", "0.25, 0.1, 0.25, 1");
    CustomEase.create("lid", "0.76, 0, 0.24, 1");

    const textEls = [
      eyebrowRef.current,
      h1Line1Ref.current,
      h1Line2Ref.current,
      h1Line3Ref.current,
      mottoRef.current,
      buttonsRef.current,
    ].filter(Boolean);

    // Set initial hidden state for text + video
    gsap.set(textEls, { opacity: 0, y: 38 });
    gsap.set(videoWrapRef.current, {
      opacity: 0,
      rotateX: -72,
      transformPerspective: 900,
      transformOrigin: "top center",
    });

    const tl = gsap.timeline({ delay: 0.25 });

    // Staggered line-by-line text reveal
    tl.to(textEls, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: "cinematic",
      stagger: 0.13,
    });

    // Video "lid opening" — starts slightly after first text line
    tl.to(
      videoWrapRef.current,
      {
        opacity: 1,
        rotateX: 0,
        duration: 1.45,
        ease: "lid",
        onComplete: () => {
          gsap.set(videoWrapRef.current, { clearProps: "rotateX,transformPerspective,transformOrigin" });
        },
      },
      0.1
    );
  }, { scope: containerRef });

  // ── SCROLL EXIT ANIMATION ───────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity  = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const contentY        = useTransform(scrollYProgress, [0, 0.50], [0, -60]);
  const contentScale    = useTransform(scrollYProgress, [0, 0.42], [1, 0.93]);
  const blurPx          = useTransform(scrollYProgress, [0.06, 0.38], [0, 16]);
  const contentFilter   = useMotionTemplate`blur(${blurPx}px)`;
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  // Background parallax — moves slower than scroll (0.35x ratio)
  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const bgBlurPx = useTransform(scrollYProgress, [0, 0.5], [0, 7]);
  const bgFilter = useMotionTemplate`blur(${bgBlurPx}px)`;

  // ── MOBILE STATS COUNTER ────────────────────────────────────────────────
  useEffect(() => {
    const el = mobileStatsRef.current;
    if (!el) return;
    const currentYear = new Date().getFullYear();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || statsAnimated.current) return;
      statsAnimated.current = true;

      const yearDuration = 1800, yearRange = currentYear - 2021, yearT0 = performance.now();
      const animateYear = (now: number) => {
        const p = Math.min((now - yearT0) / yearDuration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setYearCount(Math.round(currentYear - e * yearRange));
        if (p < 1) requestAnimationFrame(animateYear);
        else { setYearCount(2021); setYearLabelVisible(true); }
      };
      requestAnimationFrame(animateYear);

      const countDuration = 1600, countT0 = performance.now() + 300;
      const animateCount = (now: number) => {
        if (now < countT0) { requestAnimationFrame(animateCount); return; }
        const p = Math.min((now - countT0) / countDuration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setCount150(Math.round(e * 150));
        if (p < 1) requestAnimationFrame(animateCount);
        else { setCount150(150); setPlusVisible(true); }
      };
      requestAnimationFrame(animateCount);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── RENDER ──────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative text-white"
      style={{ backgroundColor: "#060e0c", cursor: cursorReady ? "none" : "auto" }}
    >
      {/* ── CUSTOM CURSOR + TRAIL (position: fixed → viewport space) ──── */}
      {TRAIL_SIZES.map((size, i) => (
        <div
          key={`trail-${i}`}
          ref={el => { trailRefs.current[i] = el; }}
          style={{
            position: "fixed", top: 0, left: 0,
            width: size, height: size,
            borderRadius: "2px",
            background: `rgba(25, 191, 183, ${TRAIL_ALPHAS[i]})`,
            pointerEvents: "none",
            zIndex: 9998,
            opacity: isInHero ? 1 : 0,
            transition: "opacity 0.25s ease",
            willChange: "transform",
          }}
        />
      ))}
      {/* Ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "3px",
          border: "1.5px solid rgba(25, 191, 183, 0.72)",
          background: "rgba(25, 191, 183, 0.05)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isInHero ? 1 : 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
      />
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "1px",
          background: "#19BFB7",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: isInHero ? 1 : 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
      />

      {/* ── SVG BACKGROUND + DARK OVERLAY ────────────────────────────── */}
      {/* overflow-hidden clips the oversize parallax bg without affecting fixed cursor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{
            position: "absolute",
            top: "-8%",
            bottom: "-8%",
            left: 0,
            right: 0,
            backgroundImage: "url('/firm-logo/banners/hero-section-banner.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform, filter",
            ...(prefersReducedMotion ? {} : { y: bgY, filter: bgFilter }),
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(6,14,12,0.72)" }}
        />
      </div>

      {/* ── h-screen VIEWPORT ────────────────────────────────────────── */}
      <div className="relative z-10 h-[100dvh] w-full">

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            ref={scene1ContentRef}
            className="absolute inset-0 pointer-events-auto"
            style={prefersReducedMotion ? {} : {
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale,
              filter: contentFilter,
              willChange: "opacity, transform, filter",
            }}
          >

            {/* ── DESKTOP: two-column ─────────────────────────────── */}
            <div className="hidden md:grid md:grid-cols-2 h-full items-center px-12 xl:px-20 gap-8 xl:gap-12">

              {/* LEFT */}
              <div className="flex flex-col items-start justify-center gap-7">

                <span
                  ref={eyebrowRef}
                  className="text-primary/60 tracking-[0.28em] uppercase"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontVariationSettings: "'wght' 500",
                    fontStyle: "italic",
                    fontSize: "clamp(0.75rem, 0.95vw, 0.95rem)",
                    letterSpacing: "0.28em",
                  }}
                >
                  Счетоводна Кантора
                </span>

                <h1 style={{ lineHeight: 1.1, cursor: "default" }}>
                  {/* Line 1: ИЗБЕРИ */}
                  <span
                    ref={h1Line1Ref}
                    style={{
                      display: "block",
                      color: "white",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontVariationSettings: "'wght' 720",
                      fontWeight: 720,
                      fontSize: "clamp(2.2rem, 3.8vw, 4.6rem)",
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                    }}
                  >
                    <LetterHover text="ИЗБЕРИ" />
                  </span>
                  {/* Line 2: СВОЯ ДОВЕРЕН */}
                  <span
                    ref={h1Line2Ref}
                    style={{
                      display: "block",
                      color: "white",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontVariationSettings: "'wght' 720",
                      fontWeight: 720,
                      fontSize: "clamp(2.2rem, 3.8vw, 4.6rem)",
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                    }}
                  >
                    <LetterHover text="СВОЯ " />
                    <span className="hero-shimmer">ДОВЕРЕН</span>
                  </span>
                  {/* Line 3: БИЗНЕС ПАРТНЬОР */}
                  <span
                    ref={h1Line3Ref}
                    style={{
                      display: "block",
                      color: "#19BFB7",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontVariationSettings: "'wght' 700",
                      fontWeight: 700,
                      fontSize: "clamp(1.9rem, 3.2vw, 3.9rem)",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      marginTop: "0.45rem",
                    }}
                  >
                    <LetterHover text="БИЗНЕС ПАРТНЬОР" />
                  </span>
                </h1>

                <p
                  ref={mottoRef}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontVariationSettings: "'wght' 400",
                    fontStyle: "italic",
                    fontSize: "clamp(1.05rem, 1.35vw, 1.35rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.55)",
                    cursor: "default",
                  }}
                >
                  <LetterHover text="Счетоводството е " />
                  <span
                    className="text-primary/85"
                    style={{ fontVariationSettings: "'wght' 600" }}
                  >
                    <LetterHover text="движеща сила" />
                  </span>
                  <LetterHover text=" за всеки успешен бизнес." />
                </p>

                <div ref={buttonsRef} className="flex flex-row gap-4">
                  <Link
                    href="/kontakti"
                    className="relative group rounded-full px-8 py-4 bg-primary text-dark font-bold border-2 border-primary hover:bg-transparent hover:text-primary transition-colors duration-300 overflow-hidden"
                    onClick={createRipple}
                  >
                    <span
                      className="relative overflow-hidden inline-flex flex-col text-sm tracking-wide"
                      style={{ height: "1.2em", lineHeight: "1.2em" }}
                    >
                      <span className="block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Изпрати запитване</span>
                      <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Изпрати запитване</span>
                    </span>
                  </Link>
                  <Link
                    href="/uslugi"
                    className="relative group rounded-full px-7 py-4 border border-white/20 hover:border-white/50 transition-colors duration-300 overflow-hidden"
                    onClick={createRipple}
                  >
                    <span
                      className="relative overflow-hidden inline-flex flex-col text-sm font-medium tracking-wide"
                      style={{ height: "1.2em", lineHeight: "1.2em", color: "rgba(255,255,255,0.85)" }}
                    >
                      <span className="block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Нашите услуги</span>
                      <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Към услуги</span>
                    </span>
                  </Link>
                </div>
              </div>

              {/* RIGHT: video */}
              <div className="flex items-center justify-center h-full py-20">
                <div
                  ref={videoWrapRef}
                  style={{ position: "relative", width: "100%", maxWidth: "640px" }}
                >
                  {[
                    { top: -8, left:  -8, borderTop:    "2px solid rgba(25,191,183,0.55)", borderLeft:  "2px solid rgba(25,191,183,0.55)", borderRadius: "5px 0 0 0" },
                    { top: -8, right: -8, borderTop:    "2px solid rgba(25,191,183,0.55)", borderRight: "2px solid rgba(25,191,183,0.55)", borderRadius: "0 5px 0 0" },
                    { bottom: -8, left:  -8, borderBottom: "2px solid rgba(25,191,183,0.55)", borderLeft:  "2px solid rgba(25,191,183,0.55)", borderRadius: "0 0 0 5px" },
                    { bottom: -8, right: -8, borderBottom: "2px solid rgba(25,191,183,0.55)", borderRight: "2px solid rgba(25,191,183,0.55)", borderRadius: "0 0 5px 0" },
                  ].map((s, i) => (
                    <div key={i} style={{ position: "absolute", width: 22, height: 22, pointerEvents: "none", ...s }} />
                  ))}

                  <div
                    style={{
                      padding: "1.5px",
                      borderRadius: "1.375rem",
                      background: "linear-gradient(135deg, rgba(25,191,183,0.38) 0%, rgba(255,255,255,0.05) 45%, rgba(25,191,183,0.18) 100%)",
                      boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 80px rgba(25,191,183,0.08)",
                    }}
                  >
                    <div
                      onMouseEnter={() => setIsVideoHovered(true)}
                      onMouseLeave={() => setIsVideoHovered(false)}
                      onClick={toggleVideo}
                      style={{
                        borderRadius: "1.25rem",
                        overflow: "hidden",
                        aspectRatio: "16/9",
                        position: "relative",
                        backgroundColor: "#060e0c",
                        cursor: "none",
                      }}
                    >
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover object-center"
                        autoPlay muted playsInline preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                      >
                        <source src="/firm-logo/hero-video/hero-section-video-2.mp4" type="video/mp4" />
                      </video>

                      {/* Edge vignette */}
                      <div
                        style={{
                          position: "absolute", inset: 0, pointerEvents: "none",
                          background: "radial-gradient(ellipse at center, transparent 58%, rgba(6,14,12,0.30) 100%)",
                          zIndex: 1,
                        }}
                      />

                      {/* Play / Pause overlay */}
                      <div
                        style={{
                          position: "absolute", inset: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          zIndex: 2, pointerEvents: "none",
                        }}
                      >
                        <div
                          style={{
                            width: 54, height: 54,
                            borderRadius: "6px",
                            border: "1.5px solid rgba(25,191,183,0.65)",
                            background: "rgba(6,14,12,0.58)",
                            backdropFilter: "blur(6px)",
                            WebkitBackdropFilter: "blur(6px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            opacity: isVideoHovered ? 1 : 0,
                            transform: isVideoHovered ? "scale(1)" : "scale(0.80)",
                            transition: "opacity 0.28s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1)",
                          }}
                        >
                          {isVideoPlaying ? (
                            /* Pause: two vertical bars */
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                              <rect x="2"  y="1" width="5" height="18" rx="1.5" fill="rgba(25,191,183,0.92)" />
                              <rect x="11" y="1" width="5" height="18" rx="1.5" fill="rgba(25,191,183,0.92)" />
                            </svg>
                          ) : (
                            /* Play: forward triangle */
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                              <path d="M2 1.5L17 10L2 18.5V1.5Z" fill="rgba(25,191,183,0.92)" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── MOBILE: centered bottom-anchored ────────────────── */}
            <div className="md:hidden flex flex-col items-center justify-end text-center gap-4 sm:gap-5 px-5 sm:px-10 w-full h-full" style={{ paddingBottom: "max(3.5rem, calc(2.5rem + env(safe-area-inset-bottom, 0px)))" }}>
              <span
                className="text-primary/60 tracking-[0.28em] uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontVariationSettings: "'wght' 500",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  letterSpacing: "0.28em",
                }}
              >
                Счетоводна Кантора
              </span>
              <h1 style={{ lineHeight: 1.12 }}>
                <span
                  style={{
                    display: "block",
                    color: "white",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontVariationSettings: "'wght' 720",
                    fontWeight: 720,
                    fontSize: "clamp(2rem, 9vw, 3.2rem)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  ИЗБЕРИ СВОЯ <span className="hero-shimmer">ДОВЕРЕН</span>
                </span>
                <span
                  style={{
                    display: "block",
                    color: "#19BFB7",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontVariationSettings: "'wght' 700",
                    fontWeight: 700,
                    fontSize: "clamp(1.35rem, 5.5vw, 1.9rem)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "0.45rem",
                  }}
                >
                  БИЗНЕС ПАРТНЬОР
                </span>
              </h1>
              <p
                className="max-w-[280px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontVariationSettings: "'wght' 400",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  letterSpacing: "0.02em",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.50)",
                }}
              >
                Счетоводството е{" "}
                <span className="text-primary/85" style={{ fontVariationSettings: "'wght' 600" }}>
                  движеща сила
                </span>{" "}
                за всеки успешен бизнес.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm mt-1">
                <Link href="/kontakti" className="relative rounded-full px-8 py-4 bg-primary text-dark font-bold text-sm tracking-wide text-center overflow-hidden sm:flex-1" onClick={createRipple}>
                  Изпрати запитване
                </Link>
                <Link href="/uslugi" className="relative rounded-full px-7 py-4 border border-white/20 text-white/85 text-sm font-medium tracking-wide text-center overflow-hidden sm:flex-1" onClick={createRipple}>
                  Нашите услуги
                </Link>
              </div>
            </div>

          </motion.div>
        </div>

        {/* ── SCROLL INDICATOR ─────────────────────────────────────── */}
        <motion.div
          ref={scrollIndicatorRef}
          className="absolute hidden md:flex flex-col items-center gap-2 z-20 bottom-7 left-1/2 -translate-x-1/2"
          style={prefersReducedMotion ? {} : { opacity: indicatorOpacity }}
        >
          <div
            className="relative w-px overflow-hidden"
            style={{ height: "40px", backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="absolute left-0 w-full bg-white/50"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.svg
            width={10} height={16} viewBox="0 0 12 20" fill="none"
            animate={{
              stroke: ["rgba(255,255,255,0.3)", "#19BFB7", "rgba(255,255,255,0.3)"],
              y: [0, 6, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 1L6 19M1 14L6 19L11 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

      </div>

      {/* ── MOBILE FINAL SECTION ─────────────────────────────────────── */}
      <motion.div
        className="md:hidden flex flex-col px-6 sm:px-10 pt-12 pb-16 gap-10"
        style={{ backgroundColor: "#060e0c" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.24, delayChildren: 0.06 } } }}
      >
        {/* Divider */}
        <motion.div
          className="flex items-center gap-3"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <motion.div
            className="flex-1 h-px bg-white/10 origin-right"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } } }}
          />
          <span
            className="font-body text-white/30 tracking-[0.38em] uppercase shrink-0"
            style={{ fontSize: "0.58rem", fontVariationSettings: "'wght' 500, 'wdth' 100" }}
          >
            Такиев Финанс
          </span>
          <motion.div
            className="flex-1 h-px bg-white/10 origin-left"
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } } }}
          />
        </motion.div>

        {/* Statement */}
        <motion.h2
          className="leading-[1.15] text-white"
          style={{
            fontFamily: "'Hubot Sans', sans-serif",
            fontVariationSettings: "'wght' 820, 'wdth' 115",
            fontSize: "clamp(1.75rem, 7.5vw, 2.5rem)",
            letterSpacing: "0.005em",
          }}
          variants={{
            hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          Нашият екип ще осигури{" "}
          <span className="text-primary">сигурност и защита</span>{" "}
          на Вашия бизнес.
        </motion.h2>

        {/* Stats */}
        <motion.div
          ref={mobileStatsRef}
          className="flex gap-10 pt-1 justify-center"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className="font-body uppercase tracking-[0.2em] text-primary/60"
              style={{
                fontSize: "0.58rem",
                fontVariationSettings: "'wght' 500",
                opacity: yearLabelVisible ? 1 : 0,
                transform: yearLabelVisible ? "translateY(0)" : "translateY(5px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
              }}
            >
              Основана
            </span>
            <div
              className="leading-none text-white"
              style={{
                fontFamily: "'Hubot Sans', sans-serif",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontSize: "clamp(2.6rem, 9.5vw, 3.4rem)",
              }}
            >
              {yearCount}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div
              className="leading-none text-white flex items-baseline"
              style={{
                fontFamily: "'Hubot Sans', sans-serif",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontSize: "clamp(2.6rem, 9.5vw, 3.4rem)",
              }}
            >
              {count150}
              <AnimatePresence>
                {plusVisible && (
                  <motion.span
                    key="plus"
                    initial={{ scale: 3.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 17 }}
                    style={{ display: "inline-block", transformOrigin: "left bottom", marginLeft: "0.04em" }}
                  >
                    +
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span
              className="font-body uppercase text-primary/60 tracking-[0.2em]"
              style={{ fontSize: "0.58rem", fontVariationSettings: "'wght' 500" }}
            >
              Доволни клиенти
            </span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-row gap-8 pt-2 justify-center"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {[
            { href: "/za-nas", label: "За нас" },
            { href: "/blog", label: "Нашият блог" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="group inline-flex flex-col gap-2 w-fit">
              <span
                className="relative overflow-hidden inline-flex flex-col font-body text-white"
                style={{
                  height: "1.3em",
                  lineHeight: "1.3em",
                  fontSize: "0.95rem",
                  fontVariationSettings: "'wght' 500, 'wdth' 100",
                  letterSpacing: "0.05em",
                }}
              >
                <span className="block uppercase transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">{label}</span>
                <span aria-hidden className="absolute inset-x-0 top-full uppercase block text-primary transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">{label}</span>
              </span>
              <span className="block h-px bg-white/15 relative overflow-hidden">
                <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-420 ease-expo-out" />
              </span>
            </Link>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}
