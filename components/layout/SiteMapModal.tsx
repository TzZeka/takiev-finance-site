"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ArrowUpRight } from "lucide-react";

interface SiteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cg = (wght = 700, italic = false): React.CSSProperties => ({
  fontFamily: "'Cormorant Garamond', serif",
  fontVariationSettings: `'wght' ${wght}`,
  fontWeight: wght,
  fontStyle: italic ? "italic" : "normal",
});

const mona = (wght = 420): React.CSSProperties => ({
  fontFamily: "'Mona Sans', sans-serif",
  fontVariationSettings: `'wght' ${wght}, 'wdth' 100`,
  fontWeight: wght,
});

const sections = [
  {
    index: "01",
    label: "Начало",
    href: "/",
    description: "Начална страница",
    children: [],
  },
  {
    index: "02",
    label: "За нас",
    href: "/za-nas",
    description: "История, ценности и екип",
    children: [],
  },
  {
    index: "03",
    label: "Услуги",
    href: "/uslugi",
    description: "Всички финансови услуги",
    children: [
      { label: "Счетоводни услуги", href: "/uslugi/schetovodni-uslugi" },
      { label: "Данъчни консултации", href: "/uslugi/danachni-konsultacii" },
      { label: "Правни услуги", href: "/uslugi/pravni-uslugi" },
      { label: "Регистрация на фирми", href: "/uslugi/registraciq-na-firmi" },
    ],
  },
  {
    index: "04",
    label: "Блог",
    href: "/blog",
    description: "Статии и финансови анализи",
    children: [
      { label: "Новини", href: "/novini" },
    ],
  },
  {
    index: "05",
    label: "Видео",
    href: "/video",
    description: "Видео материали и обучения",
    children: [],
  },
  {
    index: "06",
    label: "Контакти",
    href: "/kontakti",
    description: "Свържете се с нашия екип",
    children: [],
  },
];

const legal = [
  { label: "Условия за ползване", href: "/terms" },
  { label: "Политика за поверителност", href: "/privacy" },
];

export function SiteMapModal({ isOpen, onClose }: SiteMapModalProps) {
  const pathname = usePathname();

  // A section is "active" if the current path matches it or one of its children
  const isActive = (section: typeof sections[number]) => {
    if (section.href === "/") return pathname === "/";
    if (pathname === section.href) return true;
    return section.children.some((c) => pathname === c.href) || pathname.startsWith(section.href + "/");
  };

  const activeChild = (href: string) => pathname === href;

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sm-modal"
          className="fixed inset-0 flex flex-col overflow-hidden"
          style={{ zIndex: 9501, backgroundColor: "#060e0c" }}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] } }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Teal glow — decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 65% 40% at 50% 0%, rgba(25,191,183,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Film grain — decorative */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
              mixBlendMode: "overlay",
              opacity: 0.07,
            }}
          />

          {/* ── Header ──────────────────────────────────────────────── */}
          <div
            className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 md:px-12 py-4 md:py-5"
            style={{ borderBottom: "1px solid rgba(25,191,183,0.14)" }}
          >
            <div className="flex flex-col gap-0.5">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Berkslund', sans-serif",
                  fontSize: "0.68rem",
                  /* WCAG AA: teal #19BFB7 on #060e0c ≈ 8.6:1 */
                  color: "rgba(25,191,183,0.80)",
                  letterSpacing: "0.08em",
                }}
              >
                Takiev Finance
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  ...cg(700),
                  /* Large text (≥18pt): need 3:1 — white = 21:1 ✓ */
                  fontSize: "clamp(1.9rem, 3.8vw, 3.6rem)",
                  color: "white",
                  lineHeight: 1,
                }}
              >
                Карта на сайта
              </motion.h2>
            </div>

            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.38, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.1, borderColor: "rgba(25,191,183,0.55)", color: "white" }}
              whileTap={{ scale: 0.9 }}
              className="group flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-colors duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.20)",
                color: "rgba(255,255,255,0.75)",
              }}
              aria-label="Затвори карта на сайта"
            >
              <motion.span
                className="flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <X className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </div>

          {/* ── Body — fills remaining height, no scroll ─────────────── */}
          <div className="relative z-10 flex-1 min-h-0 flex flex-col px-6 md:px-12 pb-3">

            {/* Grid — stretches to fill available height */}
            <div
              className="flex-1 min-h-0 grid grid-cols-2 lg:grid-cols-3 [grid-template-rows:repeat(3,1fr)] lg:[grid-template-rows:repeat(2,1fr)]"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {sections.map((section, i) => (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col gap-2 p-4 md:p-5 min-h-0 overflow-hidden"
                  style={{
                    borderTop: isActive(section)
                      ? "1px solid rgba(25,191,183,0.55)"
                      : "1px solid rgba(255,255,255,0.06)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    background: isActive(section)
                      ? "rgba(25,191,183,0.04)"
                      : "transparent",
                  }}
                >
                  {/* "Вие сте тук" badge */}
                  {isActive(section) && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                      className="flex items-center gap-1.5 self-start"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                        style={{ boxShadow: "0 0 6px rgba(25,191,183,0.8)" }}
                      />
                      <span
                        style={{
                          fontFamily: "'Mona Sans', sans-serif",
                          fontVariationSettings: "'wght' 500, 'wdth' 100",
                          fontSize: "0.62rem",
                          color: "#19BFB7",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        Вие сте тук
                      </span>
                    </motion.div>
                  )}

                  {/* Index — decorative, no contrast req */}
                  <span
                    style={{
                      ...cg(400, true),
                      fontSize: "0.68rem",
                      color: "rgba(25,191,183,0.65)",
                      letterSpacing: "0.16em",
                    }}
                    aria-hidden
                  >
                    {section.index}
                  </span>

                  {/* Page title link */}
                  <Link
                    href={section.href}
                    onClick={onClose}
                    className="group/link flex items-start justify-between gap-1"
                  >
                    <h3
                      className="transition-colors duration-250 group-hover/link:text-primary"
                      style={{
                        ...cg(700),
                        /* Large text ≥18pt: need 3:1 — white = 21:1 ✓ */
                        fontSize: "clamp(1.3rem, 2.1vw, 2.1rem)",
                        color: "white",
                        lineHeight: 1.05,
                      }}
                    >
                      {section.label}
                    </h3>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                      aria-hidden
                    />
                  </Link>

                  {/* Description */}
                  <p
                    style={{
                      ...cg(400, true),
                      fontSize: "0.82rem",
                      /* WCAG AA normal text: need 4.5:1 — rgba(255,255,255,0.58) ≈ 7.1:1 ✓ */
                      color: "rgba(255,255,255,0.58)",
                      lineHeight: 1.45,
                    }}
                  >
                    {section.description}
                  </p>

                  {/* Sub-pages */}
                  {section.children.length > 0 && (
                    <ul
                      className="flex flex-col gap-1 mt-auto pt-2"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      {section.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="group/child flex items-center gap-2 transition-colors duration-200 hover:text-primary"
                            style={{
                              ...mona(activeChild(child.href) ? 550 : 400),
                              fontSize: "0.76rem",
                              color: activeChild(child.href) ? "#19BFB7" : "rgba(255,255,255,0.60)",
                              letterSpacing: "0.01em",
                            }}
                          >
                            <span
                              className="h-px flex-shrink-0 transition-all duration-300 group-hover/child:w-4"
                              style={{
                                width: activeChild(child.href) ? "16px" : "10px",
                                background: activeChild(child.href) ? "#19BFB7" : "rgba(25,191,183,0.55)",
                              }}
                            />
                            {child.label}
                            {activeChild(child.href) && (
                              <span
                                style={{
                                  ...mona(500),
                                  fontSize: "0.58rem",
                                  color: "#19BFB7",
                                  letterSpacing: "0.12em",
                                  textTransform: "uppercase",
                                  marginLeft: "2px",
                                }}
                              >
                                ← тук
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bottom reveal line on hover */}
                  <div className="absolute bottom-0 left-0 h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </motion.div>
              ))}
            </div>

            {/* ── Legal footer — compact ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.72 }}
              className="flex-shrink-0 flex flex-wrap items-center justify-between gap-3 pt-2.5"
            >
              <div className="flex flex-wrap items-center gap-1.5 md:gap-4">
                <span
                  style={{
                    ...mona(380),
                    fontSize: "0.68rem",
                    /* WCAG AA: rgba(255,255,255,0.45) ≈ 4.5:1 ✓ */
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                  }}
                >
                  Правна информация
                </span>
                <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.6rem" }}>—</span>
                {legal.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="transition-colors duration-200 hover:text-primary"
                    style={{
                      ...mona(400),
                      fontSize: "0.73rem",
                      /* WCAG AA: rgba(255,255,255,0.55) ≈ 6.3:1 ✓ */
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'Berkslund', sans-serif",
                  fontSize: "0.75rem",
                  /* Decorative — rgba(255,255,255,0.45) ≈ 4.5:1 ✓ */
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                © {new Date().getFullYear()} Takiev Finance
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
