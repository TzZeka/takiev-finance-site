"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, CustomEase);
}

interface HeroSectionProps {
  motto: string;
}


export function HeroSection({ motto }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scene1ContentRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

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
        onComplete: () => { gsap.set(scene1ContentRef.current, { clearProps: "filter" }); },
      }
    );

    initTl.fromTo(
      videoWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "cinematic", delay: -1.5 }
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
      style={{ backgroundColor: "#060e0c" }}
    >
      <div className="h-screen w-full relative overflow-hidden">

        {/* ── VIDEO — full viewport ─────────────────────────────────── */}
        <div ref={videoWrapRef} className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover object-center"
            autoPlay muted playsInline preload="auto"
          >
            <source src="/firm-logo/hero-video/hero-section-video-2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── GRADIENT OVERLAYS ─────────────────────────────────────── */}
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-36 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(6,14,12,0.65) 0%, transparent 100%)",
          }}
        />
        {/* Mid vignette — cinematic blend between bright video area and text zone */}
        <div
          className="absolute inset-x-0 z-[1] pointer-events-none"
          style={{
            top: "28%",
            height: "32%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(6,14,12,0.18) 100%)",
          }}
        />
        {/* Bottom dark zone — seamlessly blends into CinematicScrollSection */}
        <div
          className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none"
          style={{
            height: "65%",
            background: "linear-gradient(to top, rgba(6,14,12,1) 0%, rgba(6,14,12,0.95) 28%, rgba(6,14,12,0.60) 55%, transparent 100%)",
          }}
        />

        {/* ── CONTENT ───────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div ref={scene1ContentRef} className="absolute inset-0 pointer-events-auto">

            {/* Desktop — centered, bottom-anchored */}
            <div className="hidden md:flex flex-col items-center justify-end text-center h-full pb-16 px-8">

              <span
                className="font-body text-primary/60 tracking-[0.32em] uppercase mb-5"
                style={{ fontSize: "0.68rem", fontVariationSettings: "'wght' 500, 'wdth' 100" }}
              >
                Счетоводна Кантора
              </span>

              <h1
                className="leading-[1.02] mb-5 text-white"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontStretch: "125%",
                  fontSize: "clamp(1.6rem, 2.6vw, 3.2rem)",
                  letterSpacing: "0.015em",
                }}
              >
                ИЗБЕРИ СВОЯ{" "}
                <span className="text-primary">Доверен</span>{" "}
                БИЗНЕС ПАРТНЬОР
              </h1>

              <p
                className="mb-9 max-w-lg"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontVariationSettings: "'wght' 400",
                  fontStyle: "italic",
                  fontSize: "clamp(1.05rem, 1.35vw, 1.35rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Счетоводството е{" "}
                <span
                  className="text-primary/85"
                  style={{ fontVariationSettings: "'wght' 600" }}
                >
                  движеща сила
                </span>{" "}
                за всеки успешен бизнес.
              </p>

              <div className="flex flex-row gap-4">
                <Link
                  href="/kontakti"
                  className="group rounded-full px-8 py-4 bg-primary text-dark font-bold border-2 border-primary hover:bg-transparent hover:text-primary transition-colors duration-300 overflow-hidden"
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
                  className="group rounded-full px-7 py-4 border border-white/20 hover:border-white/50 transition-colors duration-300 overflow-hidden"
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

            {/* Mobile — bottom anchored */}
            <div className="md:hidden flex flex-col items-center justify-end text-center gap-5 px-7 pb-16 w-full h-full">
              <span
                className="font-body text-primary/60 tracking-[0.35em] uppercase"
                style={{ fontSize: "0.65rem", fontVariationSettings: "'wght' 500, 'wdth' 100" }}
              >
                Счетоводна Кантора
              </span>
              <h1
                className="leading-[1.05] text-white"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontStretch: "125%",
                  fontSize: "clamp(2.2rem, 9vw, 3.4rem)",
                  letterSpacing: "0.01em",
                }}
              >
                ИЗБЕРИ СВОЯ<br />
                <span className="text-primary">Доверен</span><br />
                БИЗНЕС ПАРТНЬОР
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
                <span
                  className="text-primary/85"
                  style={{ fontVariationSettings: "'wght' 600" }}
                >
                  движеща сила
                </span>{" "}
                за всеки успешен бизнес.
              </p>
              <div className="flex flex-col gap-3 w-full max-w-[260px] mt-1">
                <Link href="/kontakti" className="rounded-full px-8 py-4 bg-primary text-dark font-bold text-sm tracking-wide text-center">
                  Изпрати запитване
                </Link>
                <Link href="/uslugi" className="rounded-full px-7 py-3.5 border border-white/20 text-white/85 text-sm font-medium tracking-wide text-center">
                  Нашите услуги
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ── SCROLL INDICATOR ──────────────────────────────────────── */}
        <div
          ref={scrollIndicatorRef}
          className="absolute hidden md:flex flex-col items-center gap-2 z-20 bottom-7 left-1/2 -translate-x-1/2"
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
            animate={{ stroke: ["rgba(255,255,255,0.3)", "#19BFB7", "rgba(255,255,255,0.3)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 1L6 19M1 14L6 19L11 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

      </div>

      {/* ============================== */}
      {/* MOBILE FINAL SECTION           */}
      {/* ============================== */}
      <motion.div
        className="md:hidden flex flex-col px-6 pt-12 pb-16 gap-10"
        style={{ backgroundColor: "#060e0c" }}
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
