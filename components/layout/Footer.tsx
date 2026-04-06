"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Linkedin, Youtube, ExternalLink, ChevronDown, MapPin, Scale, ScrollText } from "lucide-react";
import { FlipLabel } from "@/components/ui/FlipLabel";

const cg = (wght = 650, italic = false): React.CSSProperties => ({
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

const hubot = (wght = 400): React.CSSProperties => ({
  fontFamily: "'Hubot Sans', sans-serif",
  fontVariationSettings: `'wght' ${wght}, 'wdth' 100`,
  fontWeight: wght,
});

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const heading = (
    <span className="flex items-center gap-2">
      <span style={{ color: "#19BFB7" }}>—</span>
      <span style={{ ...cg(650), fontSize: "1.18rem", color: "white", letterSpacing: "0.01em" }}>
        {title}
      </span>
    </span>
  );

  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="pt-5">
      {/* Mobile: accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between md:hidden pb-3"
        aria-expanded={isOpen}
      >
        {heading}
        <ChevronDown
          className={`w-4 h-4 text-white/25 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop: static header */}
      <div className="mb-5 hidden md:flex">{heading}</div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:!max-h-none md:!opacity-100 md:!mt-0 ${
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursor(null)}
      className="relative text-white overflow-hidden"
      style={{ backgroundColor: "#060e0c" }}
    >

      {/* ── Top teal accent line ── */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Teal glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 65% 40% at 50% 0%, rgba(25,191,183,0.08) 0%, transparent 60%)" }}
        />

        {/* Upper highlight spot */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(25,191,183,0.13) 0%, rgba(25,191,183,0.04) 45%, transparent 75%)",
            filter: "blur(18px)",
          }}
        />

        {/* Film grain */}
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

        {/* Cursor flashlight */}
        {cursor && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 260px at ${cursor.x}px ${cursor.y}px,
                rgba(25,191,183,0.07) 0%,
                rgba(25,191,183,0.03) 40%,
                transparent 70%)`,
            }}
          />
        )}

        {/* ── Watermark logo banner ── */}
        <div
          className="relative flex items-center justify-center overflow-hidden py-14 md:py-20"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2
            className="leading-none select-none whitespace-nowrap pointer-events-none"
            style={{
              fontFamily: "var(--font-berkslund)",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              color: "rgba(255,255,255,0.04)",
              fontStyle: "italic",
            }}
          >
            Takiev Finance
          </h2>
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24">

          {/* Header row — brand info */}
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 py-10"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Left: brand description */}
            <div className="max-w-xs">
              <p className="mt-2" style={{ ...cg(400, true), fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Избери своя доверен бизнес партньор. Експертно счетоводно обслужване на Вашия бизнес.
              </p>
            </div>

            {/* Right: social icons */}
            <div className="flex items-center gap-2">
              {[
                { href: "https://www.facebook.com/n.takiev", label: "Facebook", icon: <Facebook className="w-3.5 h-3.5 flex-shrink-0" /> },
                { href: "https://www.linkedin.com/company/takiev-finance/", label: "LinkedIn", icon: <Linkedin className="w-3.5 h-3.5 flex-shrink-0" /> },
                { href: "https://www.youtube.com/@nikolaytakiev6221", label: "YouTube", icon: <Youtube className="w-3.5 h-3.5 flex-shrink-0" /> },
                {
                  href: "https://www.tiktok.com/@n.takiev", label: "TikTok",
                  icon: (
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 flex items-center overflow-hidden flex-shrink-0"
                  style={{ border: "1px solid", borderRadius: "4px" }}
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: {
                      width: 32,
                      color: "rgba(255,255,255,0.50)",
                      borderColor: "rgba(255,255,255,0.18)",
                    },
                    hover: {
                      width: 120,
                      color: "#19BFB7",
                      borderColor: "rgba(25,191,183,0.50)",
                      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <span className="w-8 h-full flex items-center justify-center flex-shrink-0">
                    {icon}
                  </span>
                  <motion.span
                    className="whitespace-nowrap pr-3"
                    style={{
                      ...mona(500),
                      fontSize: "0.72rem",
                      letterSpacing: "0.06em",
                    }}
                    variants={{
                      rest: { opacity: 0, x: -10 },
                      hover: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.2, duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    {label}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Legal row ── */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 md:gap-5 py-4"
          >
            <span style={{ ...cg(650), fontSize: "1.05rem", color: "white", letterSpacing: "0.01em" }}>
              Правна информация
            </span>
            <span style={{ color: "#19BFB7", fontSize: "0.6rem" }}>—</span>
            <Link
              href="/privacy"
              className="group flex items-center transition-colors duration-200 hover:text-primary"
              style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
            >
              <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
              <FlipLabel text="Политика за поверителност" />
            </Link>
            <span style={{ color: "#19BFB7", fontSize: "0.6rem" }}>·</span>
            <Link
              href="/terms"
              className="group flex items-center transition-colors duration-200 hover:text-primary"
              style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
            >
              <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
              <FlipLabel text="Общи условия" />
              <ScrollText className="w-3 h-3 ml-1.5 opacity-35 flex-shrink-0" />
            </Link>
          </div>

          {/* ── Link columns grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 py-10"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >

            {/* Бързи връзки */}
            <FooterAccordion title="Бързи връзки">
              <ul className="space-y-2.5 pb-6">
                {[
                  { href: "/za-nas", label: "За нас" },
                  { href: "/uslugi", label: "Услуги" },
                  { href: "/blog", label: "Блог" },
                  { href: "/video", label: "Видео" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center transition-colors duration-200 hover:text-primary"
                      style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                      <FlipLabel text={label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            {/* Услуги */}
            <FooterAccordion title="Услуги">
              <ul className="space-y-2.5 pb-6">
                {[
                  { href: "/uslugi/schetovodni-uslugi", label: "Счетоводни услуги" },
                  { href: "/uslugi/danachni-konsultacii", label: "Данъчни консултации" },
                  { href: "/uslugi/pravni-uslugi", label: "Правни услуги" },
                  { href: "/uslugi/registraciq-na-firmi", label: "Регистрация на фирми" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center transition-colors duration-200 hover:text-primary"
                      style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                      <FlipLabel text={label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            {/* Полезни сайтове */}
            <FooterAccordion title="Полезни сайтове">
              <ul className="space-y-2.5 pb-6">
                {[
                  { href: "https://nula.bg", label: "Nula.bg" },
                  { href: "https://www.portalschetovodstvo.bg/", label: "Портал Счетоводство" },
                  { href: "https://nap.bg", label: "НАП" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 transition-colors duration-200 hover:text-primary"
                      style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                      <FlipLabel text={label} />
                      <ExternalLink className="w-3 h-3 opacity-35 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            {/* Контакти */}
            <FooterAccordion title="Контакти">
              <ul className="space-y-2.5 pb-6">
                <li>
                  <a href="mailto:office@takiev.bg"
                    className="group flex items-center transition-colors duration-200 hover:text-primary"
                    style={{ ...mona(680), fontSize: "0.97rem", color: "rgba(255,255,255,0.72)", fontVariationSettings: "'wght' 680, 'wdth' 110" }}
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                    office@takiev.bg
                  </a>
                </li>
                <li>
                  <a href="tel:+359899080016"
                    className="group flex items-center transition-colors duration-200 hover:text-primary"
                    style={{ ...mona(680), fontSize: "0.97rem", color: "rgba(255,255,255,0.72)", fontVariationSettings: "'wght' 680, 'wdth' 110" }}
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                    +359 89 908 0016
                  </a>
                </li>
              </ul>
            </FooterAccordion>

            {/* ── Office address row — full-width inside grid ── */}
            <div
              className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-center self-center text-center gap-3 pt-5 pb-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ ...cg(650), fontSize: "1.05rem", color: "#19BFB7", letterSpacing: "0.01em", flexShrink: 0 }}>
                Офис
              </span>
              <span style={{ color: "rgba(25,191,183,0.35)", fontSize: "0.75rem" }}>—</span>
              <a
                href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center transition-colors duration-200 hover:text-primary whitespace-nowrap"
                style={{ ...mona(680), fontSize: "0.97rem", color: "rgba(255,255,255,0.72)", fontVariationSettings: "'wght' 680, 'wdth' 110" }}
              >
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                {`бул. \u201eАлександър Стамболийски\u201c 30Б, 1000 София`}
                <MapPin className="w-3.5 h-3.5 ml-1.5 flex-shrink-0 opacity-50" />
              </a>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-wrap items-end justify-between gap-4 py-6">
            {/* Left: copyright */}
            <span style={{ fontFamily: "'Berkslund', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)" }}>
              © {currentYear}{" "}
              <span style={{ fontFamily: "'Berkslund', sans-serif", fontSize: "1.15rem", color: "#19BFB7" }}>
                Takiev Finance
              </span>
            </span>

            {/* Right: credit */}
            <div className="text-right flex flex-col gap-1">
              <span style={{ ...hubot(380), fontSize: "0.82rem", color: "rgba(255,255,255,0.52)", letterSpacing: "0.02em" }}>
                Website &amp; Design made by{" "}
                <span style={{ ...hubot(780), fontSize: "0.90rem", color: "#19BFB7", fontStyle: "italic" }}>Tsvetomir Genov</span>
              </span>
              <a
                href="mailto:tzekage@gmail.com"
                className="group flex items-center justify-end gap-0 transition-colors duration-200 hover:text-primary"
                style={{ ...hubot(380), fontSize: "0.82rem", color: "rgba(255,255,255,0.80)", letterSpacing: "0.02em" }}
              >
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2 flex-shrink-0" />
                tzekage@gmail.com
              </a>
            </div>
          </div>

        </div>
    </footer>
  );
}
