"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { useQuickPanel } from "@/components/layout/QuickPanelContext";
import { FlipLabel } from "@/components/ui/FlipLabel";
import { SiteMapModal } from "@/components/layout/SiteMapModal";

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

// ── Framer Motion stagger variants ─────────────────────────────────────────
const containerVariants = {
  open: {
    transition: { staggerChildren: 0.11, delayChildren: 0.35 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
};

// 3D flip-in for map & founder photo
const flipCardVariants = {
  open: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] as const },
  },
  closed: {
    opacity: 0,
    rotateX: -22,
    y: 18,
    filter: "blur(6px)",
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
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

// ── Social media data ───────────────────────────────────────────────────────
const socials = [
  {
    href: "https://www.facebook.com/n.takiev",
    label: "Facebook",
    renderIcon: (cls: string) => <Facebook className={cls} />,
  },
  {
    href: "https://www.linkedin.com/company/takiev-finance/",
    label: "LinkedIn",
    renderIcon: (cls: string) => <Linkedin className={cls} />,
  },
  {
    href: "https://www.youtube.com/@nikolaytakiev6221",
    label: "YouTube",
    renderIcon: (cls: string) => <Youtube className={cls} />,
  },
  {
    href: "https://www.tiktok.com/@n.takiev",
    label: "TikTok",
    renderIcon: (cls: string) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

// ── Ripple helpers ─────────────────────────────────────────────────────────
type RippleEntry = { x: number; y: number; id: number };

function useRipple() {
  const [ripples, setRipples] = useState<RippleEntry[]>([]);
  const addRipple = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(p => [...p, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 700);
  }, []);
  const dots = ripples.map(({ x, y, id }) => (
    <motion.span
      key={id}
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, translateX: "-50%", translateY: "-50%", background: "rgba(25,191,183,0.28)" }}
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ width: 130, height: 130, opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.0, 0.0, 0.2, 1] }}
    />
  ));
  return { addRipple, dots };
}

interface RippleLinkProps {
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
}
interface RippleButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  children?: React.ReactNode;
}

function RippleLink({ children, className = "", href, target, rel, style, onClick }: RippleLinkProps) {
  const { addRipple, dots } = useRipple();
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      style={style}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={(e) => addRipple(e)}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
    >
      {children}
      {dots}
    </motion.a>
  );
}

function RippleButton({ children, className = "", style, onClick, type, "aria-label": ariaLabel }: RippleButtonProps) {
  const { addRipple, dots } = useRipple();
  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      style={style}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={(e) => addRipple(e)}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
    >
      {children}
      {dots}
    </motion.button>
  );
}

function SocialItem({ href, label, renderIcon }: { href: string; label: string; renderIcon: (cls: string) => React.ReactNode }) {
  const { addRipple, dots } = useRipple();
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2.5 px-3 py-2 rounded-lg overflow-hidden"
      style={{
        backgroundColor: "rgba(64,81,78,0.07)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(64,81,78,0.18)",
      }}
      whileHover={{
        scale: 1.035,
        y: -2,
        backgroundColor: "#19BFB7",
        borderColor: "#19BFB7",
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={(e) => addRipple(e)}
      aria-label={label}
    >
      {renderIcon("h-4 w-4 flex-shrink-0 transition-colors duration-300 group-hover:text-white")}
      <span
        className="text-xs font-semibold transition-colors duration-300 group-hover:text-white leading-none"
        style={{ color: "var(--color-surface-raised)" }}
      >
        <FlipLabel text={label} height="1.5em" />
      </span>
      {dots}
    </motion.a>
  );
}

// ── QuickPanel ─────────────────────────────────────────────────────────────
export function QuickPanel() {
  const { isOpen, setIsOpen, setIsVisible } = useQuickPanel();
  const [headerHeight, setHeaderHeight] = useState(80);
  const [siteMapOpen, setSiteMapOpen] = useState(false);

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

  // Close panel when header hides (scroll down past 200px)
  useEffect(() => {
    if (!isOpen) return;
    const HIDE_AFTER = 200;
    const TOLERANCE = 8;
    let rafId = 0;
    let lastY = Math.max(0, window.scrollY);

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY);
        const delta = y - lastY;
        if (y >= HIDE_AFTER && delta > TOLERANCE) {
          setIsOpen(false);
        }
        lastY = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isOpen, setIsOpen]);

  // Spacer clears the header — panel island top aligns with header island top
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

      {/* ── Panel island ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
            {/* Island glass container — Glassmorphism 2.0 */}
            <div
              className="relative mx-auto rounded-2xl overflow-hidden"
              style={{
                maxWidth: "1480px",
                pointerEvents: "auto",
                background: "rgba(236, 249, 245, 0.97)",
                backdropFilter: "blur(56px) saturate(160%) brightness(1.01)",
                WebkitBackdropFilter: "blur(56px) saturate(160%) brightness(1.01)",
                border: "1px solid rgba(255,255,255,0.98)",
                boxShadow: "0 12px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(25,191,183,0.06), 0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {/* Film grain — subtle texture on glass */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "180px 180px",
                  mixBlendMode: "overlay",
                  opacity: 0.045,
                }}
              />

              {/* Spacer — clears the header island */}
              <div
                aria-hidden
                style={{ height: `${spacerHeight}px`, pointerEvents: "none" }}
              />

              {/* ── Content ── */}
              <motion.div
                className="px-6 pb-8 lg:pb-10 md:px-8"
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Main grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">

                  {/* ── Google Maps — 2 cols wide ── */}
                  <motion.div
                    className="sm:col-span-2 lg:col-span-2"
                    variants={flipCardVariants}
                    style={{ transformPerspective: 900 }}
                  >
                    <div
                      className="relative w-full rounded-xl overflow-hidden"
                      style={{
                        height: "210px",
                        border: "1.5px solid rgba(25,191,183,0.32)",
                        boxShadow: "0 0 0 1px rgba(255,255,255,0.45)",
                      }}
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
                    <p className="mb-4 flex items-center" style={{ color: "var(--color-surface-deeper)", fontFamily: "'Cormorant Garamond', serif", fontVariationSettings: "'wght' 650", fontWeight: 650, fontSize: "1.3rem", letterSpacing: "0.01em" }}>
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
                          <RippleLink
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-sm font-medium hover:text-primary transition-colors flex items-center py-0.5 rounded"
                            style={{ color: "var(--color-surface-raised)" }}
                          >
                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                            <FlipLabel text={link.label} height="1.5em" />
                            <ExternalLink className="w-3 h-3 ml-1.5 flex-shrink-0" style={{ color: "var(--color-dark)", opacity: 0.5 }} />
                          </RippleLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* ── Contact Info (no address) ── */}
                  <motion.div variants={itemVariants}>
                    <p className="mb-4 flex items-center" style={{ color: "var(--color-surface-deeper)", fontFamily: "'Cormorant Garamond', serif", fontVariationSettings: "'wght' 650", fontWeight: 650, fontSize: "1.3rem", letterSpacing: "0.01em" }}>
                      <span className="text-primary">—</span>
                      <span className="ml-2">Контакти</span>
                    </p>
                    <ul className="space-y-2.5">
                      <li className="group flex items-center space-x-3">
                        <div
                          className="p-1.5 rounded-lg border group-hover:border-primary transition-all duration-300 flex-shrink-0"
                          style={{ background: "rgba(64,81,78,0.07)", borderColor: "rgba(64,81,78,0.20)" }}
                        >
                          <Mail className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <RippleLink
                          href="mailto:office@takiev.bg"
                          className="group/link hover:text-primary transition-colors flex items-center rounded"
                          style={{
                            color: "var(--color-surface-raised)",
                            fontFamily: "'Mona Sans', sans-serif",
                            fontVariationSettings: "'wght' 620, 'wdth' 110",
                            fontSize: "0.95rem",
                          }}
                        >
                          <span className="w-0 group-hover/link:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover/link:mr-2 flex-shrink-0" />
                          office@takiev.bg
                        </RippleLink>
                      </li>
                      <li className="group flex items-center space-x-3">
                        <div
                          className="p-1.5 rounded-lg border group-hover:border-primary transition-all duration-300 flex-shrink-0"
                          style={{ background: "rgba(64,81,78,0.07)", borderColor: "rgba(64,81,78,0.20)" }}
                        >
                          <Phone className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <RippleLink
                          href="tel:+359899080016"
                          className="group/link hover:text-primary transition-colors flex items-center rounded"
                          style={{
                            color: "var(--color-surface-raised)",
                            fontFamily: "'Mona Sans', sans-serif",
                            fontVariationSettings: "'wght' 620, 'wdth' 110",
                            fontSize: "0.95rem",
                          }}
                        >
                          <span className="w-0 group-hover/link:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover/link:mr-2 flex-shrink-0" />
                          +359 89 908 0016
                        </RippleLink>
                      </li>
                    </ul>
                  </motion.div>

                  {/* ── Social Media — icon + label ── */}
                  <motion.div variants={itemVariants}>
                    <p className="mb-4 flex items-center" style={{ color: "var(--color-surface-deeper)", fontFamily: "'Cormorant Garamond', serif", fontVariationSettings: "'wght' 650", fontWeight: 650, fontSize: "1.3rem", letterSpacing: "0.01em" }}>
                      <span className="text-primary">—</span>
                      <span className="ml-2">Социални мрежи</span>
                    </p>
                    <div className="flex flex-col gap-2">
                      {socials.map((s) => (
                        <SocialItem key={s.label} {...s} />
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Founder Photo — xl only ── */}
                  <motion.div
                    className="hidden xl:flex items-center justify-center"
                    variants={flipCardVariants}
                    style={{ transformPerspective: 900 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl transform rotate-3" />
                      <div className="absolute -inset-2 border border-primary/30 rounded-xl transform -rotate-2" />
                      <div className="relative w-36 h-44 transform rotate-2 overflow-hidden rounded-xl border-2 border-white/20">
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
                          <p className="text-[11px] font-medium whitespace-nowrap" style={{ color: "var(--color-surface-deeper)" }}>Николай Такиев</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* ── Office Address Row — full width ── */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center gap-4 mt-6 pt-5"
                  style={{ borderTop: "1px solid rgba(64,81,78,0.15)" }}
                >
                  <p className="flex items-center flex-shrink-0" style={{ color: "var(--color-surface-deeper)", fontFamily: "'Cormorant Garamond', serif", fontVariationSettings: "'wght' 650", fontWeight: 650, fontSize: "1.3rem", letterSpacing: "0.01em" }}>
                    <span className="text-primary">—</span>
                    <span className="ml-2">Офис</span>
                  </p>
                  <RippleLink
                    href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/addr hover:text-primary transition-colors leading-relaxed flex items-center rounded"
                    style={{
                      color: "var(--color-surface-raised)",
                      fontFamily: "'Mona Sans', sans-serif",
                      fontVariationSettings: "'wght' 720, 'wdth' 110",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span className="w-0 group-hover/addr:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover/addr:mr-2 flex-shrink-0" />
                    бул. Александър Стамболийски 30Б, гр. София
                    <MapPin className="h-3.5 w-3.5 text-primary ml-1.5 flex-shrink-0 opacity-60" />
                  </RippleLink>
                </motion.div>

                {/* ── Site map button — bottom right ── */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end mt-2"
                >
                  <RippleButton
                    onClick={() => { setSiteMapOpen(true); setIsOpen(false); }}
                    className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-300 hover:bg-primary/10"
                    style={{
                      fontFamily: "'Mona Sans', sans-serif",
                      fontVariationSettings: "'wght' 520, 'wdth' 100",
                      fontSize: "0.78rem",
                      color: "#19BFB7",
                      border: "1.5px solid rgba(25,191,183,0.45)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9 1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                    </svg>
                    <FlipLabel text="Карта на сайта" />
                  </RippleButton>
                </motion.div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteMapModal isOpen={siteMapOpen} onClose={() => setSiteMapOpen(false)} />
    </>
  );
}
