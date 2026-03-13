"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { useQuickPanel } from "@/components/layout/QuickPanelContext";

// ── BricksIcon ─────────────────────────────────────────────────────────────
// Exported so Navigation.tsx can render the trigger button
export function BricksIcon({ className, isOpen }: { className?: string; isOpen: boolean }) {
  const size = 5;
  const half = size / 2;
  const radius = 6;
  const center = 12;

  const circlePositions = [
    { x: center - half, y: center - radius - half },
    { x: center + radius - half, y: center - half },
    { x: center - half, y: center + radius - half },
    { x: center - radius - half, y: center - half },
  ];
  const logoPositions = [
    { x: 3, y: 6 },
    { x: 9.5, y: 6 },
    { x: 16, y: 6 },
    { x: 9.5, y: 13 },
  ];

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      {[0, 1, 2, 3].map((i) => {
        const closed = circlePositions[i];
        const open = logoPositions[i];
        return (
          <rect
            key={i}
            width={size}
            height={size}
            rx="0.8"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              transform: isOpen
                ? `translate(${open.x}px, ${open.y}px)`
                : `translate(${closed.x}px, ${closed.y}px)`,
              transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
            }}
          />
        );
      })}
    </svg>
  );
}

// ── FlipLabel — same text-flip hover animation as nav buttons ──────────────
function FlipLabel({ text }: { text: string }) {
  return (
    <span
      className="relative overflow-hidden inline-flex flex-col"
      style={{ height: "1.4em" }}
    >
      <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-full block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
      >
        {text}
      </span>
    </span>
  );
}

// ── Framer Motion stagger variants ─────────────────────────────────────────
const containerVariants = {
  open: {
    transition: { staggerChildren: 0.11, delayChildren: 0.35 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
  closed: {
    opacity: 0,
    y: 20,
    filter: "blur(3px)",
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
  },
};

// ── QuickPanel ─────────────────────────────────────────────────────────────
export function QuickPanel() {
  const { isOpen, setIsOpen, setIsVisible } = useQuickPanel();
  const [headerHeight, setHeaderHeight] = useState(80);
  const panelRef = useRef<HTMLDivElement>(null);

  const getHeaderHeight = useCallback(() => {
    if (typeof window === "undefined") return 80;
    const isScrolled = window.scrollY > 20;
    if (isScrolled) return 64;
    return window.innerWidth >= 1280 ? 96 : 80;
  }, []);

  useEffect(() => {
    const update = () => setHeaderHeight(getHeaderHeight());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [getHeaderHeight]);

  // Footer visibility — updates shared isVisible in context
  useEffect(() => {
    const check = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const shouldHide = footer.getBoundingClientRect().top < window.innerHeight;
        if (shouldHide && isOpen) setIsOpen(false);
        setIsVisible(!shouldHide);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isOpen, setIsOpen, setIsVisible]);

  // Escape key
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [setIsOpen]);

  // Scroll-hide — mirrors header with a 150ms delay
  useEffect(() => {
    if (!isOpen) return;
    const HIDE_AFTER = 200;
    const TOLERANCE = 8;
    const DELAY = 150;
    let rafId = 0;
    let lastY = Math.max(0, window.scrollY);
    let isHidden = false;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const delta = y - lastY;

        if (y < HIDE_AFTER) {
          if (isHidden) {
            isHidden = false;
            if (delayTimer) { clearTimeout(delayTimer); delayTimer = null; }
            const el = panelRef.current;
            if (el) {
              el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
              el.style.transform = "translateY(0)";
            }
          }
        } else if (delta > TOLERANCE && !isHidden) {
          if (delayTimer) clearTimeout(delayTimer);
          delayTimer = setTimeout(() => {
            isHidden = true;
            const el = panelRef.current;
            if (el) {
              el.style.transition = "transform 0.32s cubic-bezier(0.4, 0, 1, 1)";
              el.style.transform = "translateY(-110%)";
            }
          }, DELAY);
        } else if (delta < -TOLERANCE && isHidden) {
          if (delayTimer) { clearTimeout(delayTimer); delayTimer = null; }
          isHidden = false;
          const el = panelRef.current;
          if (el) {
            el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
            el.style.transform = "translateY(0)";
          }
        }
        lastY = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      if (delayTimer) clearTimeout(delayTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isOpen]);

  // Spacer clears the header — panel island top aligns with header island top
  // Header island starts at pt-3 (12px) from viewport top; spacer = headerHeight - 4px
  const spacerHeight = headerHeight + 20;

  return (
    <>
      {/* ── Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="qp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/45"
            style={{ zIndex: 46 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Panel island ──
          Starts at top-0 with same pt-3 / px-2 as the header.
          The header sits on top (z-50) covering the panel top area.
          Content below the spacer is visible under the header.
      ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            key="qp-panel"
            className="fixed top-0 left-0 right-0 px-2 pt-3 md:px-3 md:pt-4"
            style={{ zIndex: 48, pointerEvents: "none", willChange: "transform" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Island glass container */}
            <div
              className="relative mx-auto rounded-2xl overflow-hidden"
              style={{
                maxWidth: "1480px",
                pointerEvents: "auto",
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 18%, rgba(255,255,255,0.95) 36%, #ffffff 55%)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 24px rgba(25,191,183,0.10), 0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {/* Film grain — premium texture over the gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "180px 180px",
                  mixBlendMode: "multiply",
                  opacity: 0.055,
                }}
              />

              {/* Spacer — clears the header island (pointer-events-none so header remains clickable) */}
              <div
                aria-hidden
                style={{ height: `${spacerHeight}px`, pointerEvents: "none" }}
              />

              {/* ── Content grid ── */}
              <motion.div
                className="px-6 pb-8 lg:pb-10 md:px-8"
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">

                  {/* ── Google Maps — 2 cols wide, always colorful ── */}
                  <motion.div
                    className="sm:col-span-2 lg:col-span-2"
                    variants={itemVariants}
                  >
                    <div
                      className="relative w-full rounded-xl overflow-hidden border border-slate-200"
                      style={{ height: "210px", boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)" }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.283956399353!2d23.319877890847863!3d42.697707877149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa855eff40e335%3A0xa7cffc05e42a4e56!2sTakiev%20Finance%20EOOD!5e0!3m2!1sbg!2sbg!4v1768080298879!5m2!1sbg!2sbg"
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Takiev Finance Location"
                      />
                    </div>
                  </motion.div>

                  {/* ── Useful Sites ── */}
                  <motion.div variants={itemVariants}>
                    <p className="text-sm font-bold mb-4 flex items-center text-slate-800">
                      <span className="text-primary">—</span>
                      <span className="ml-2">Полезни сайтове</span>
                    </p>
                    <ul className="space-y-2.5">
                      {[
                        { href: "https://nula.bg", label: "Nula.bg" },
                        { href: "https://www.portalschetovodstvo.bg/", label: "Портал Счетоводство" },
                        { href: "https://nap.bg", label: "НАП" },
                      ].map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-sm text-slate-600 hover:text-primary transition-colors flex items-center py-0.5"
                          >
                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                            <FlipLabel text={link.label} />
                            <ExternalLink className="w-3 h-3 ml-1.5 opacity-50 flex-shrink-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* ── Contact Info ── */}
                  <motion.div variants={itemVariants}>
                    <p className="text-sm font-bold mb-4 flex items-center text-slate-800">
                      <span className="text-primary">—</span>
                      <span className="ml-2">Контакти</span>
                    </p>
                    <ul className="space-y-2.5">
                      <li className="group flex items-center space-x-3">
                        <div className="p-1.5 bg-primary/[0.06] rounded-lg border border-slate-200 group-hover:border-primary transition-all duration-300 flex-shrink-0">
                          <Mail className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <a
                          href="mailto:office@takiev.bg"
                          className="group text-sm text-slate-600 hover:text-primary transition-colors"
                        >
                          <FlipLabel text="office@takiev.bg" />
                        </a>
                      </li>
                      <li className="group flex items-center space-x-3">
                        <div className="p-1.5 bg-primary/[0.06] rounded-lg border border-slate-200 group-hover:border-primary transition-all duration-300 flex-shrink-0">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <a
                          href="tel:+359899080016"
                          className="group text-sm text-slate-600 hover:text-primary transition-colors"
                        >
                          <FlipLabel text="+359 89 908 0016" />
                        </a>
                      </li>
                      <li className="group flex items-start space-x-3">
                        <div className="p-1.5 bg-primary/[0.06] rounded-lg border border-slate-200 group-hover:border-primary transition-all duration-300 flex-shrink-0 mt-0.5">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <a
                          href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-sm text-slate-500 leading-relaxed hover:text-primary transition-colors"
                        >
                          <FlipLabel text="бул. Александър Стамболийски 30Б" />
                        </a>
                      </li>
                    </ul>
                  </motion.div>

                  {/* ── Social Media ── */}
                  <motion.div variants={itemVariants}>
                    <p className="text-sm font-bold mb-4 flex items-center text-slate-800">
                      <span className="text-primary">—</span>
                      <span className="ml-2">Социални мрежи</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { href: "https://www.facebook.com/n.takiev", label: "Facebook", icon: <Facebook className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" /> },
                        { href: "https://www.linkedin.com/company/takiev-finance/", label: "LinkedIn", icon: <Linkedin className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" /> },
                        { href: "https://www.youtube.com/@nikolaytakiev6221", label: "YouTube", icon: <Youtube className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" /> },
                        {
                          href: "https://www.tiktok.com/@n.takiev",
                          label: "TikTok",
                          icon: (
                            <svg className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                          ),
                        },
                      ].map(({ href, label, icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-2.5 bg-slate-100 hover:bg-primary rounded-lg transition-all duration-300 border border-slate-200 hover:border-primary"
                          aria-label={label}
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Founder Photo — xl only ── */}
                  <motion.div
                    className="hidden xl:flex items-center justify-center"
                    variants={itemVariants}
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl transform rotate-3" />
                      <div className="absolute -inset-2 border border-primary/30 rounded-xl transform -rotate-2" />
                      <div className="relative w-32 h-40 transform rotate-2 overflow-hidden rounded-lg border-2 border-white/20 shadow-xl shadow-black/30">
                        <Image
                          src="/firm-logo/nikolay-takiev.jpg"
                          alt="Николай Такиев - Основател"
                          fill
                          className="object-cover object-top"
                          sizes="256px"
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rotate-2">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20 shadow-sm">
                          <p className="text-[11px] font-medium text-slate-700 whitespace-nowrap">Николай Такиев</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
