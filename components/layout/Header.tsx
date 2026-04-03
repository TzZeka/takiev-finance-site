"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Facebook, Linkedin, Youtube, ChevronRight, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { ContactModal } from "@/components/shared/ContactModal";
import { cn } from "@/lib/utils";
import { servicesConfig } from "@/lib/services-config";

// ── Icons ──────────────────────────────────────────────────────────────────
function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

// ── Hamburger ──────────────────────────────────────────────────────────────
const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги", hasSubmenu: true },
  { href: "/blog", label: "Блог" },
  { href: "/novini", label: "Новини" },
  { href: "/video", label: "Видео" },
];

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-flex", flexDirection: "column", gap: "5px", width: "22px" }}
    >
      <span
        style={{
          display: "block",
          height: "2px",
          background: "white",
          borderRadius: "2px",
          transformOrigin: "center center",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isOpen ? "translateY(7px) rotate(45deg)" : "translateY(0) rotate(0deg)",
        }}
      />
      <span
        style={{
          display: "block",
          height: "2px",
          background: "white",
          borderRadius: "2px",
          transition: "transform 0.4s ease, opacity 0.25s ease",
          transform: isOpen ? "scaleX(0)" : "scaleX(1)",
          opacity: isOpen ? 0 : 1,
        }}
      />
      <span
        style={{
          display: "block",
          height: "2px",
          background: "white",
          borderRadius: "2px",
          transformOrigin: "center center",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
        }}
      />
    </span>
  );
}

// ── Header ─────────────────────────────────────────────────────────────────
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealDone, setRevealDone] = useState(false);
  const scrollYRef = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // ── Hide-on-scroll / reveal-on-up ─────────────────────────────────────────
  // Uses RAF + passive listener for 60fps. Direct DOM mutation (no re-render).
  // iOS bounce guard: Math.max(0, scrollY) prevents negative values.
  useEffect(() => {
    const HIDE_AFTER = 200; // px before hide logic activates
    const TOLERANCE = 8;    // px buffer to ignore micro-scrolls

    let rafId = 0;
    let lastY = Math.max(0, window.scrollY);
    let isHidden = false;

    // Set initial glass state immediately
    setScrolled(lastY > 40);

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = Math.max(0, window.scrollY); // iOS bounce guard
        const delta = y - lastY;

        // Update glass backdrop state
        setScrolled(y > 40);

        // Compute next visibility
        let nextHidden = isHidden;
        if (y < HIDE_AFTER) {
          nextHidden = false; // always show near top
        } else if (delta > TOLERANCE) {
          nextHidden = true;  // scrolling down
        } else if (delta < -TOLERANCE) {
          nextHidden = false; // scrolling up
        }

        if (nextHidden !== isHidden) {
          isHidden = nextHidden;
          const el = headerRef.current;
          if (el) {
            // Different easing for hide vs reveal — snappy out, spring in
            el.style.transition = nextHidden
              ? "transform 0.32s cubic-bezier(0.4, 0, 1, 1)"
              : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
            el.style.transform = nextHidden ? "translateY(-110%)" : "translateY(0)";
          }
        }

        lastY = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  // iOS-safe scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const savedY = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, savedY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ══════════════════════════ FLOATING ISLAND ══════════════════════════
          pointer-events-none on the outer wrapper lets clicks pass through
          the transparent padding area around the island.
      ════════════════════════════════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-5 md:pt-4 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {/* Island — fluid width-reveal on mount, never re-animates on nav */}
        <motion.div
          className="relative mx-auto rounded-2xl pointer-events-auto"
          style={{ maxWidth: "1400px" }}
          initial={{ clipPath: "inset(0 42% 0 42% round 1rem)" }}
          animate={{ clipPath: revealDone ? "none" : "inset(0 0% 0 0% round 1rem)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          onAnimationComplete={() => {
            if (!revealDone) setRevealDone(true);
          }}
        >
          {/* Glass backdrop — always visible, darkens on scroll */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              backgroundColor: scrolled
                ? "rgba(12, 22, 19, 0.97)"
                : "rgba(14, 28, 24, 0.86)",
              borderColor: scrolled
                ? "rgba(255, 255, 255, 0.09)"
                : "rgba(255, 255, 255, 0.13)",
            }}
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              backdropFilter: "blur(18px) saturate(160%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Content — padding reduces on scroll for a thinner collapsed state */}
          <motion.div
            animate={{
              paddingTop: scrolled ? "0.5rem" : "0.875rem",
              paddingBottom: scrolled ? "0.5rem" : "0.875rem",
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6"
          >
            {/* ── Col 1: Logo ── */}
            <div className="flex items-center justify-start">
              <Logo />
            </div>

            {/* ── Col 2: Nav — always centered ── */}
            <div className="hidden md:flex">
              <div
                className="rounded-xl px-2 py-1.5 transition-all duration-500"
                style={{
                  background: scrolled
                    ? "rgba(0,0,0,0.18)"
                    : "rgba(0,0,0,0.26)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: scrolled ? "none" : "blur(10px)",
                  WebkitBackdropFilter: scrolled ? "none" : "blur(10px)",
                }}
              >
                <Navigation />
              </div>
            </div>

            {/* ── Col 3: Контакти pill + CTA + Hamburger ── */}
            <div className="flex items-center justify-end gap-2">

{/* Desktop CTA — mail → paper-plane on hover, collapses on scroll */}
              <motion.button
                whileHover="hover"
                initial="idle"
                onClick={() => setContactModalOpen(true)}
                className="group hidden md:flex items-center justify-center text-white font-medium text-[13px] rounded-full bg-primary overflow-hidden flex-shrink-0"
                style={{
                  height: "2.25rem",
                  maxWidth: scrolled ? "2.25rem" : "240px",
                  minWidth: "2.25rem",
                  paddingLeft: scrolled ? "0" : "1rem",
                  paddingRight: scrolled ? "0" : "1rem",
                  gap: scrolled ? "0" : "0.5rem",
                  transition:
                    "max-width 0.45s cubic-bezier(0.22,1,0.36,1), padding 0.4s cubic-bezier(0.22,1,0.36,1), gap 0.35s ease, background-color 0.2s ease",
                }}
              >
                {/* Icon wrapper */}
                <span className="relative flex-shrink-0 w-4 h-4">
                  {/* Mail — exits on hover */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    variants={{
                      idle: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                      },
                      hover: {
                        opacity: 0,
                        x: 5,
                        y: -8,
                        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                      },
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.span>

                  {/* Paper plane — enters on hover */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    variants={{
                      idle: {
                        opacity: 0,
                        x: -5,
                        y: 8,
                        transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                      },
                      hover: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <PaperPlaneIcon className="w-4 h-4" />
                  </motion.span>
                </span>

                {/* Label — hides when scrolled */}
                <span
                  className="overflow-hidden whitespace-nowrap leading-none"
                  style={{
                    display: "inline-block",
                    maxWidth: scrolled ? "0" : "200px",
                    opacity: scrolled ? 0 : 1,
                    transition:
                      "max-width 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
                  }}
                >
                  Свържете се с нас
                </span>
              </motion.button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden relative w-11 h-11 flex items-center justify-center flex-shrink-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Затвори меню" : "Отвори меню"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-panel"
              >
                <MenuIcon isOpen={mobileMenuOpen} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ═════════════════════════ MOBILE PANEL ══════════════════════════════
          Dark, premium, Awwwwards-quality full-screen overlay.
          Numbered nav items, staggered entrance, contact footer.
      ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-panel"
            id="mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Мобилно меню"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0% 0)", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[49] flex flex-col"
            style={{ height: "100dvh", backgroundColor: "#1a2b27" }}
          >
            {/* Teal accent line top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(25,191,183,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(25,191,183,0.04) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            {/* Nav area */}
            <nav
              className="relative z-[1] flex-1 min-h-0 overflow-y-auto flex flex-col justify-center px-8 sm:px-12"
              style={{ paddingTop: "88px", paddingBottom: "20px" }}
            >
              <div className="flex flex-col">
                {navItems.map((item, index) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === "/uslugi" && pathname.startsWith("/uslugi"));
                  const num = String(index + 1).padStart(2, "0");

                  if (item.hasSubmenu) {
                    return (
                      <div key={item.href} className="border-b border-white/[0.05]">
                        <motion.div
                          initial={{ opacity: 0, x: -28 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.1 + index * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-center justify-between py-4"
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group flex items-center gap-5 flex-1"
                          >
                            <span className="text-[10px] tracking-[0.22em] text-white/20 font-mono w-6 flex-shrink-0 leading-none">
                              {num}
                            </span>
                            <span
                              className={cn(
                                "text-[2rem] sm:text-[2.4rem] leading-none font-bold tracking-tight transition-colors duration-200",
                                isActive ? "text-primary" : "text-white group-hover:text-white/60"
                              )}
                            >
                              {item.label}
                            </span>
                          </Link>
                          <button
                            onClick={() => setServicesExpanded(!servicesExpanded)}
                            className="p-2 text-white/20 hover:text-primary transition-colors"
                            aria-label="Покажи подменю"
                          >
                            <motion.div
                              animate={{ rotate: servicesExpanded ? 90 : 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </motion.div>
                          </button>
                        </motion.div>

                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-11 pb-4 space-y-0.5">
                                {servicesConfig.map((service) => (
                                  <Link
                                    key={service.id}
                                    href={`/uslugi/${service.slug}`}
                                    className="flex items-center gap-2 py-2 text-[15px] text-white/30 hover:text-primary transition-colors"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setServicesExpanded(false);
                                    }}
                                  >
                                    <span className="text-primary/40">→</span>
                                    {service.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-white/[0.05]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center gap-5 py-4"
                      >
                        <span className="text-[10px] tracking-[0.22em] text-white/20 font-mono w-6 flex-shrink-0 leading-none">
                          {num}
                        </span>
                        <span
                          className={cn(
                            "text-[2rem] sm:text-[2.4rem] leading-none font-bold tracking-tight transition-colors duration-200",
                            isActive ? "text-primary" : "text-white group-hover:text-white/60"
                          )}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Footer: contacts + social + CTA */}
            <motion.div
              className="relative z-[1] flex-shrink-0 border-t border-white/[0.05] px-8 sm:px-12 pt-5"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2.5">
                  <a href="mailto:office@takiev.bg" className="flex items-center gap-3 group">
                    <Mail className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" />
                    <span className="text-[13px] text-white/30 group-hover:text-white/60 transition-colors">
                      office@takiev.bg
                    </span>
                  </a>
                  <a href="tel:+359899080016" className="flex items-center gap-3 group">
                    <Phone className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" />
                    <span className="text-[13px] text-white/30 group-hover:text-white/60 transition-colors">
                      +359 89 908 0016
                    </span>
                  </a>

                  {/* Social icons */}
                  <div className="flex items-center gap-0.5 pt-1">
                    {[
                      {
                        href: "https://www.facebook.com/n.takiev",
                        label: "Facebook",
                        icon: <Facebook className="w-3.5 h-3.5" />,
                      },
                      {
                        href: "https://www.linkedin.com/company/takiev-finance/",
                        label: "LinkedIn",
                        icon: <Linkedin className="w-3.5 h-3.5" />,
                      },
                      {
                        href: "https://www.youtube.com/@nikolaytakiev6221",
                        label: "YouTube",
                        icon: <Youtube className="w-3.5 h-3.5" />,
                      },
                      {
                        href: "https://www.tiktok.com/@n.takiev",
                        label: "TikTok",
                        icon: (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
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
                        aria-label={label}
                        className="p-2 rounded-lg text-white/20 hover:text-primary/70 transition-colors"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setContactModalOpen(true);
                  }}
                  className="group flex items-center gap-2.5 bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-primary/90 flex-shrink-0"
                >
                  <span>Свържете се</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal / Side Panel */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
