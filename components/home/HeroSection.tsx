"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase);
}

interface HeroSectionProps {
  motto: string;
}

const acronymFirst = [
  { letter: "Т", word: "Трансформация" },
  { letter: "А", word: "Анализ" },
  { letter: "К", word: "Коректност" },
  { letter: "И", word: "Иновация" },
  { letter: "Е", word: "Ефективност" },
  { letter: "В", word: "Възможност" },
];

const acronymSecond = [
  { letter: "Ф" },
  { letter: "И" },
  { letter: "Н" },
  { letter: "А" },
  { letter: "Н" },
  { letter: "С" },
];

export function HeroSection({ motto }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const auroraRef = useRef<HTMLCanvasElement>(null);

  // Aurora canvas animation — ambient left-side layer
  useEffect(() => {
    const canvas = auroraRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let W = 0, H = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = rect.width;
      H = rect.height;
    };
    resize();

    // 3 slow-drifting aurora blobs — brand teal palette
    const blobs = [
      { x: 0.22, y: 0.26, r: 0.52, color: "25,191,183", speed: 0.00022, phase: 0,           alpha: 0.12 },
      { x: 0.06, y: 0.68, r: 0.42, color: "20,125,108", speed: 0.00016, phase: Math.PI,      alpha: 0.09 },
      { x: 0.32, y: 0.50, r: 0.32, color: "25,191,183", speed: 0.0003,  phase: Math.PI / 2,  alpha: 0.07 },
    ];

    // 5 abstract flowing lines — financial chart texture
    const waves = [
      { y: 0.18, amp: 0.032, freq: 0.006, speed: 0.000055, alpha: 0.18, lw: 1.2 },
      { y: 0.35, amp: 0.022, freq: 0.011, speed: 0.000040, alpha: 0.14, lw: 0.9 },
      { y: 0.54, amp: 0.042, freq: 0.005, speed: 0.000032, alpha: 0.22, lw: 1.6 },
      { y: 0.71, amp: 0.018, freq: 0.014, speed: 0.000060, alpha: 0.12, lw: 0.8 },
      { y: 0.87, amp: 0.028, freq: 0.008, speed: 0.000045, alpha: 0.16, lw: 1.1 },
    ];

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      // Draw blobs
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.speed + b.phase) * 0.08) * W;
        const by = (b.y + Math.cos(t * b.speed * 0.7 + b.phase) * 0.10) * H;
        const r  = b.r * Math.max(W, H);
        const g  = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0,    `rgba(${b.color},${b.alpha})`);
        g.addColorStop(0.45, `rgba(${b.color},${+(b.alpha * 0.3).toFixed(3)})`);
        g.addColorStop(1,    `rgba(${b.color},0)`);
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Draw waves
      for (const w of waves) {
        const baseY = w.y * H;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(25,191,183,${w.alpha})`;
        ctx.lineWidth = w.lw;
        ctx.lineCap = "round";
        for (let x = 0; x <= W; x += 3) {
          const y = baseY + Math.sin(x * w.freq + t * w.speed * 50) * w.amp * H;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Gradient mask — fade everything to transparent before the video starts
      const mask = ctx.createLinearGradient(0, 0, W, 0);
      mask.addColorStop(0,    "rgba(0,0,0,1)");
      mask.addColorStop(0.28, "rgba(0,0,0,1)");
      mask.addColorStop(0.42, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = mask;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); resize(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Scene 1 — single ref for H1 + buttons grouped (FIX #4)
  const scene1ContentRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Scene 2 Phase A refs
  const takievWrapRef = useRef<HTMLDivElement>(null);
  const takievLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const takievWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statCardsRef = useRef<HTMLDivElement>(null);

  // Scene 2 Phase B refs
  const finansWrapRef = useRef<HTMLDivElement>(null);
  const finansLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Sentences refs
  const sentencesWrapRef = useRef<HTMLDivElement>(null);
  const sentence1Ref = useRef<HTMLParagraphElement>(null);

  // Scene 3 refs
  const finalTagRef = useRef<HTMLDivElement>(null);
  const finalButtonsWrapRef = useRef<HTMLDivElement>(null);
  const btnPrimaryRef = useRef<HTMLAnchorElement>(null);
  const btnBlogRef = useRef<HTMLAnchorElement>(null);

  // Mobile stats counters
  const mobileStatsRef = useRef<HTMLDivElement>(null);
  const statsAnimated = useRef(false);
  const [yearCount, setYearCount] = useState(new Date().getFullYear());
  const [yearLabelVisible, setYearLabelVisible] = useState(false);
  const [count150, setCount150] = useState(0);
  const [plusVisible, setPlusVisible] = useState(false);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReduced) return;

    CustomEase.create("cinematic", "0.25, 0.1, 0.25, 1");

    // Initial reveal — H1 + buttons animate as a unit (FIX #4)
    const initTl = gsap.timeline();

    initTl.fromTo(
      scene1ContentRef.current,
      { opacity: 0, filter: "blur(10px)", y: 40 },
      {
        opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "cinematic",
        // Clear filter after animation so scroll-back doesn't glitch
        onComplete: () => gsap.set(scene1ContentRef.current, { clearProps: "filter" }),
      }
    );

    initTl.fromTo(
      videoWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "cinematic", delay: -1.5 }
    );

    // FIX #1: Mobile — skip scrollytelling entirely, just show Scene 1
    if (isMobile) return;

    // --- SCROLLYTELLING (desktop only) ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Hard-reset to scene-1 state when user scrolls above the hero
        onLeaveBack: () => {
          gsap.set(scene1ContentRef.current,   { opacity: 1, y: 0 });
          gsap.set(videoWrapRef.current,        { opacity: 1 });
          gsap.set(scrollIndicatorRef.current,  { opacity: 1 });
          gsap.set(takievWrapRef.current,       { autoAlpha: 0 });
          gsap.set(finansWrapRef.current,       { autoAlpha: 0 });
          gsap.set(sentencesWrapRef.current,    { autoAlpha: 0, y: 30 });
          gsap.set(finalTagRef.current,         { autoAlpha: 0 });
          gsap.set(finalButtonsWrapRef.current, { autoAlpha: 0 });
          gsap.set(statCardsRef.current,        { opacity: 0 });
        },
      },
    });

    // SCENE 1 OUT — explicit fromTo on all elements so FROM is never mis-captured
    scrollTl.fromTo(
      scene1ContentRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -50, duration: 1, ease: "power1.inOut" },
      "scene1-out"
    );
    // fromTo keeps FROM=1 even if initTl hasn't finished when ScrollTrigger inits
    scrollTl.fromTo(scrollIndicatorRef.current, { opacity: 1 }, { opacity: 0, duration: 0.5 }, "scene1-out");
    scrollTl.fromTo(videoWrapRef.current,       { opacity: 1 }, { opacity: 0, duration: 1.5 }, "scene1-out");

    // SCENE 2: PHASE A — ТАКИЕВ
    scrollTl.fromTo(
      takievWrapRef.current,
      { autoAlpha: 0, top: "50%", left: "15%", yPercent: -50 },
      { autoAlpha: 1, duration: 0.1 }
    );

    scrollTl.from(
      takievLettersRef.current,
      { opacity: 0, y: 50, stagger: 0.1, fontVariationSettings: "'wght' 300, 'wdth' 125", duration: 1, ease: "power2.out" },
      "takiev-in"
    );

    scrollTl.fromTo(
      takievWordsRef.current,
      { opacity: 0, x: -20, skewX: -7 },
      { opacity: 1, x: 0, skewX: -7, stagger: 0.1, duration: 1, ease: "power2.out" },
      "takiev-in+=0.8"
    );

    scrollTl.fromTo(
      statCardsRef.current,
      { opacity: 0, scale: 0.85, x: 60 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "back.out(1.5)" },
      "takiev-in+=1.3"
    );

    scrollTl.to({}, { duration: 0.8 });

    scrollTl.to(statCardsRef.current, { opacity: 0, duration: 0.5 }, "takiev-collapse");
    scrollTl.to(
      takievWordsRef.current,
      { opacity: 0, x: -20, skewX: -7, duration: 0.5, stagger: -0.05 },
      "takiev-collapse"
    );
    scrollTl.to(
      takievWrapRef.current,
      { scale: 0.7, top: "15%", left: "10%", transformOrigin: "left center", duration: 1.5, ease: "power3.inOut" },
      "takiev-collapse"
    );

    // SCENE 2: PHASE B — ФИНАНС
    scrollTl.fromTo(
      finansWrapRef.current,
      { autoAlpha: 0, top: "50%", left: "50%", xPercent: -50, yPercent: -50 },
      { autoAlpha: 1, duration: 0.1 }
    );

    scrollTl.from(
      finansLettersRef.current,
      { opacity: 0, scale: 0.5, stagger: 0.1, fontVariationSettings: "'wght' 300, 'wdth' 125", duration: 1, ease: "power2.out" },
      "finans-in"
    );

    scrollTl.to(
      finansLettersRef.current,
      { fontVariationSettings: "'wght' 900, 'wdth' 125", duration: 1 },
      "finans-in+=0.5"
    );

    scrollTl.fromTo(
      sentencesWrapRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "finans-in+=1"
    );
    scrollTl.fromTo(
      sentence1Ref.current,
      { opacity: 0, filter: "blur(5px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1 },
      "finans-in+=1.2"
    );

    scrollTl.to({}, { duration: 1 });

    // SCENE 3: FINAL RESOLUTION
    scrollTl.to(
      [takievWrapRef.current, finansWrapRef.current],
      { opacity: 0, duration: 1 },
      "scene3-start"
    );
    scrollTl.to(
      sentencesWrapRef.current,
      { y: "-15vh", scale: 1.1, duration: 1.5, ease: "cinematic" },
      "scene3-start"
    );
    scrollTl.fromTo(
      finalTagRef.current,
      { autoAlpha: 0, y: -20, letterSpacing: "0.1em" },
      { autoAlpha: 1, y: 0, letterSpacing: "0.4em", duration: 1.5, ease: "power2.out" },
      "scene3-start+=0.5"
    );

    // FIX #3: autoAlpha only — no display override, preserves flex-col md:flex-row
    scrollTl.to(finalButtonsWrapRef.current, { autoAlpha: 1, duration: 0.5 }, "scene3-start+=1");
    scrollTl.fromTo(
      [btnPrimaryRef.current, btnBlogRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)" },
      "scene3-start+=1"
    );
  }, { scope: containerRef });

  // Mobile stats: year countdown + 150 count-up
  useEffect(() => {
    const el = mobileStatsRef.current;
    if (!el) return;
    const currentYear = new Date().getFullYear();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || statsAnimated.current) return;
        statsAnimated.current = true;

        // Year: currentYear → 2021
        const yearDuration = 1800;
        const yearRange = currentYear - 2021;
        const yearT0 = performance.now();
        const animateYear = (now: number) => {
          const p = Math.min((now - yearT0) / yearDuration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setYearCount(Math.round(currentYear - e * yearRange));
          if (p < 1) requestAnimationFrame(animateYear);
          else { setYearCount(2021); setYearLabelVisible(true); }
        };
        requestAnimationFrame(animateYear);

        // 150: 0 → 150, then + spring-in
        const countDuration = 1600;
        const countT0 = performance.now() + 300;
        const animateCount = (now: number) => {
          if (now < countT0) { requestAnimationFrame(animateCount); return; }
          const p = Math.min((now - countT0) / countDuration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setCount150(Math.round(e * 150));
          if (p < 1) requestAnimationFrame(animateCount);
          else { setCount150(150); setPlusVisible(true); }
        };
        requestAnimationFrame(animateCount);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative text-white"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      <div className="h-screen w-full relative overflow-hidden">

        {/* Aurora canvas — animated ambient left layer, must be before video in DOM */}
        <canvas
          ref={auroraRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
          aria-hidden
        />

        {/* ============================== */}
        {/* VIDEO BACKGROUND               */}
        {/* ============================== */}
        <div
          ref={videoWrapRef}
          className="hero-video-arc absolute top-0 right-0 w-full md:w-[55%] h-full z-0 overflow-hidden"
        >
          <video
            ref={videoRef}
            className="w-full h-[110%] object-cover object-center"
            autoPlay muted loop playsInline preload="metadata"
          >
            <source src="/firm-logo/hero-video/hero-section-video-2.mp4" type="video/mp4" />
          </video>
          {/* Top + bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(var(--color-dark-rgb),0.5) 0%, transparent 25%, transparent 70%, rgba(var(--color-dark-rgb),0.55) 100%)",
            }}
          />
        </div>

        {/* Mobile-only cinematic overlay — darkens video for text legibility */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none md:hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(var(--color-dark-rgb),0.72) 0%, rgba(var(--color-dark-rgb),0.38) 45%, rgba(var(--color-dark-rgb),0.78) 100%)",
          }}
        />

        {/* ============================== */}
        {/* SCENE 1: THE FIRST FOLD        */}
        {/* ============================== */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            ref={scene1ContentRef}
            className="absolute inset-0 flex items-center justify-center md:justify-start pl-0 md:pl-[4%] pt-0 md:pt-[13%] pointer-events-auto"
          >
            {/* Desktop layout */}
            <div className="hidden md:flex flex-col gap-20 relative z-20 md:max-w-[42%]">
              <div className="flex flex-col gap-5">
                <h1
                  className="leading-[1.1] text-white"
                  style={{
                    fontFamily: "'Hubot Sans', sans-serif",
                    fontVariationSettings: "'wght' 900, 'wdth' 125",
                    fontWeight: 900,
                    fontStretch: "125%",
                    fontSize: "clamp(1.6rem, 0.6rem + 2.5vw, 3.4rem)",
                    letterSpacing: "0.01em",
                    textShadow: "0 2px 24px rgba(0,0,0,0.75), 0 0 80px rgba(0,0,0,0.35)",
                  }}
                >
                  <span style={{ fontSize: "clamp(2.2rem, 0.8rem + 3.5vw, 4.6rem)" }}>ИЗБЕРИ СВОЯ</span><br />
                  <span className="text-primary" style={{ fontVariationSettings: "'wght' 900, 'wdth' 125", fontWeight: 900, fontStretch: "125%" }}>
                    Доверен
                  </span><br />
                  <span style={{ fontVariationSettings: "'wght' 900, 'wdth' 125", fontWeight: 900, fontStretch: "125%" }}>
                    БИЗНЕС ПАРТНЬОР
                  </span>
                </h1>
                <p
                  className="font-body text-white/65 max-w-sm"
                  style={{
                    fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                    fontVariationSettings: "'wght' 350, 'wdth' 95",
                    letterSpacing: "0.025em",
                    lineHeight: 1.6,
                  }}
                >
                  Счетоводството е{" "}
                  <span className="text-primary" style={{ fontVariationSettings: "'wght' 500, 'wdth' 95", fontStyle: "italic" }}>
                    движеща сила
                  </span>{" "}
                  за всеки успешен бизнес.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakti" className="group rounded-full px-8 py-4 bg-primary text-dark font-bold border-2 border-primary hover:bg-transparent hover:text-primary transition-colors duration-300 shadow-xl overflow-hidden">
                  <span className="relative overflow-hidden inline-flex flex-col text-sm tracking-wide" style={{ height: "1.2em", lineHeight: "1.2em" }}>
                    <span className="block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Изпрати запитване</span>
                    <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Изпрати запитване</span>
                  </span>
                </Link>
                <Link href="/uslugi" className="group rounded-full px-7 py-4 border border-white/25 text-white hover:border-white/60 transition-colors duration-300 backdrop-blur-sm bg-black/10 shadow-lg overflow-hidden">
                  <span className="relative overflow-hidden inline-flex flex-col text-sm font-medium tracking-wide" style={{ height: "1.2em", lineHeight: "1.2em" }}>
                    <span className="block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Нашите услуги</span>
                    <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">Към услуги</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile layout — centered cinematic */}
            <div className="md:hidden flex flex-col items-center text-center gap-8 px-7 w-full z-20">
              {/* Brand tag */}
              <span
                className="font-body text-primary/80 tracking-[0.35em] uppercase"
                style={{ fontSize: "0.65rem", fontVariationSettings: "'wght' 500, 'wdth' 100" }}
              >
                Счетоводна Кантора
              </span>

              {/* H1 */}
              <h1
                className="leading-[1.05] text-white"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontStretch: "125%",
                  fontSize: "clamp(2.4rem, 9vw, 3.6rem)",
                  letterSpacing: "0.01em",
                  textShadow: "0 2px 32px rgba(0,0,0,0.8)",
                }}
              >
                ИЗБЕРИ СВОЯ<br />
                <span className="text-primary">Доверен</span><br />
                БИЗНЕС ПАРТНЬОР
              </h1>

              {/* Subtitle */}
              <p
                className="font-body text-white/60 max-w-[280px]"
                style={{
                  fontSize: "0.92rem",
                  fontVariationSettings: "'wght' 350, 'wdth' 95",
                  letterSpacing: "0.02em",
                  lineHeight: 1.65,
                }}
              >
                Счетоводството е{" "}
                <span className="text-primary" style={{ fontVariationSettings: "'wght' 500, 'wdth' 95", fontStyle: "italic" }}>
                  движеща сила
                </span>{" "}
                за всеки успешен бизнес.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 w-full max-w-[260px]">
                <Link href="/kontakti" className="rounded-full px-8 py-4 bg-primary text-dark font-bold text-sm tracking-wide text-center shadow-xl">
                  Изпрати запитване
                </Link>
                <Link href="/uslugi" className="rounded-full px-7 py-3.5 border border-white/30 text-white text-sm font-medium tracking-wide text-center backdrop-blur-sm bg-black/10">
                  Нашите услуги
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-[72.5%] -translate-x-1/2 flex-col items-center gap-2 z-20 hidden md:flex"
        >
          <motion.img
            src="/icon.svg" alt="" aria-hidden width={32} height={32}
            className="opacity-60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Скролни надолу</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <motion.svg width={22} height={13} viewBox="0 0 22 13" fill="none"
              animate={{ stroke: ["rgba(255,255,255,0.25)", "#19BFB7", "rgba(255,255,255,0.25)"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M1 1.5L11 11L21 1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Scenes 2+3 — desktop scrollytelling ONLY, completely hidden on mobile */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">

        {/* ============================== */}
        {/* SCENE 2: THE DEEP DIVE         */}
        {/* ============================== */}

        {/* Phase A wrapper */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">

          {/* Phase A: ТАКИЕВ */}
          <div
            ref={takievWrapRef}
            className="absolute flex-col gap-3 pointer-events-auto"
            style={{ visibility: "hidden" }}
          >
            {acronymFirst.map((item, i) => (
              <div key={item.letter} className="flex items-center" style={{ gap: "0.6em" }}>
                <div style={{ display: "inline-block", transform: "skewX(-6deg)", transformOrigin: "left center" }}>
                  <span
                    ref={(el) => { takievLettersRef.current[i] = el; }}
                    className="text-fluid-2xl md:text-fluid-hero text-white inline-block"
                    style={{ fontFamily: "'Hubot Sans'", fontVariationSettings: "'wght' 900, 'wdth' 125" }}
                  >
                    {item.letter}
                  </span>
                </div>
                <span
                  ref={(el) => { takievWordsRef.current[i] = el; }}
                  className="inline-block"
                  style={{
                    fontFamily: "'Hubot Sans', sans-serif",
                    fontVariationSettings: "'wght' 300, 'wdth' 100",
                    fontStyle: "italic",
                    fontSize: "clamp(0.85rem, 1.4vw, 1.3rem)",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {item.word.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Stat cards */}
          <div
            ref={statCardsRef}
            className="absolute top-1/2 right-[8%] -translate-y-1/2 flex flex-col gap-5"
            style={{ opacity: 0 }}
          >
            <div className="rounded-2xl border border-white/15 backdrop-blur-sm bg-white/[0.04] p-6 min-w-[185px]">
              <div
                className="leading-none text-white mb-2"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 5.5vw, 4.5rem)",
                }}
              >
                150+
              </div>
              <div className="text-white/45 text-xs tracking-[0.18em] uppercase">Доволни клиенти</div>
            </div>

            {/* FIX #5: "От 2021 г." — ясно и точно */}
            <div className="rounded-2xl border border-primary/20 backdrop-blur-sm bg-primary/[0.05] p-6 min-w-[185px]">
              <div
                className="leading-none text-primary mb-2"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)",
                }}
              >
                2021
              </div>
              <div className="text-white/45 text-xs tracking-[0.18em] uppercase">От 2021 г.</div>
            </div>
          </div>
        </div>

        {/* Phase B: ФИНАНС
            FIX #8: text-[3.5rem] on mobile (was text-fluid-xl which was too large)
            FIX #9: removed opacity-20 CSS class — GSAP controls opacity via `from({ opacity: 0 })` */}
        <div
          ref={finansWrapRef}
          className="absolute flex-col items-center justify-center gap-1 z-30 w-full"
          style={{ visibility: "hidden" }}
        >
          {acronymSecond.map((item, i) => (
            <span
              key={`${item.letter}-${i}`}
              ref={(el) => { finansLettersRef.current[i] = el; }}
              className="text-[3.5rem] md:text-[7rem] leading-[0.85] text-white inline-block"
              style={{
                fontFamily: "'Hubot Sans'",
                fontVariationSettings: "'wght' 300, 'wdth' 125",
              }}
            >
              {item.letter}
            </span>
          ))}
        </div>

        {/* Sentences overlapping Phase B */}
        <div
          ref={sentencesWrapRef}
          className="absolute inset-x-0 bottom-[15vh] md:bottom-[20vh] flex flex-col items-center justify-center text-center z-40 px-6 max-w-4xl mx-auto"
          style={{ visibility: "hidden" }}
        >
          <p
            ref={sentence1Ref}
            className="text-primary text-fluid-lg md:text-fluid-2xl font-light mb-4"
            style={{ fontVariationSettings: "'wght' 300" }}
          >
            Нашият екип ще осигури{" "}
            <span className="font-bold text-white" style={{ fontVariationSettings: "'wght' 700" }}>
              сигурност и защита
            </span>.
          </p>
        </div>

        {/* ============================== */}
        {/* SCENE 3: FINAL RESOLUTION      */}
        {/* ============================== */}

        <div
          ref={finalTagRef}
          className="absolute top-12 w-full text-center z-50 text-white/50 text-sm md:text-base uppercase"
          style={{ visibility: "hidden" }}
        >
          [ ТАКИЕВ ФИНАНС ]
        </div>

        {/* FIX #3: No display override from GSAP — element is always flex, autoAlpha controls visibility
            FIX #6: Primary CTA added as the payoff button in Scene 3 */}
        <div
          ref={finalButtonsWrapRef}
          className="absolute inset-x-0 bottom-16 md:bottom-24 flex flex-col md:flex-row items-center justify-center gap-6 z-50"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {/* Primary — За нас */}
          <Link
            href="/za-nas"
            ref={btnPrimaryRef}
            className="group rounded-full px-8 py-4 bg-primary text-dark font-bold border-2 border-primary hover:bg-transparent hover:text-primary transition-colors duration-300 shadow-xl overflow-hidden"
          >
            <span
              className="relative overflow-hidden inline-flex flex-col text-sm tracking-wide"
              style={{ height: "1.2em", lineHeight: "1.2em" }}
            >
              <span className="block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">
                За нас
              </span>
              <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">
                За нас
              </span>
            </span>
          </Link>

          {/* Tertiary — Blog */}
          <Link
            href="/blog"
            ref={btnBlogRef}
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors border-b border-white/20 pb-1"
          >
            <span className="text-base font-medium relative overflow-hidden uppercase tracking-widest">
              Блог
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* End scenes 2+3 desktop wrapper */}
        </div>

      </div>

      {/* ============================== */}
      {/* MOBILE FINAL SECTION           */}
      {/* ============================== */}
      <motion.div
        className="md:hidden flex flex-col px-6 pt-12 pb-16 gap-10"
        style={{ backgroundColor: "var(--color-dark)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.24, delayChildren: 0.06 } } }}
      >
        {/* Divider + brand label — lines grow outward from center */}
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

        {/* Statement — blur-fade + slide up */}
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

        {/* Stats — typographic, no cards, counter animated separately */}
        <motion.div
          ref={mobileStatsRef}
          className="flex gap-10 pt-1 justify-center"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {/* 2021 — counts down from current year */}
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

          {/* 150+ — counts up */}
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

        {/* CTAs — underline style with text flip on hover */}
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
                <span className="block uppercase transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">
                  {label}
                </span>
                <span aria-hidden className="absolute inset-x-0 top-full uppercase block text-primary transition-transform duration-420 ease-expo-out group-hover:-translate-y-full">
                  {label}
                </span>
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
