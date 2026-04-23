"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function WatermarkText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scalesRef = useRef<number[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chars = Array.from("Takiev Finance");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  useEffect(() => {
    scalesRef.current = chars.map(() => 1);
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = null; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const mouse = mouseRef.current;
      const RADIUS = 130;
      const MIN = 0.28;
      spanRefs.current.forEach((span, i) => {
        if (!span) return;
        let target = 1;
        if (mouse) {
          const r = span.getBoundingClientRect();
          const dx = mouse.x - (r.left + r.width / 2);
          const dy = mouse.y - (r.top + r.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / RADIUS);
          const smooth = t * t * (3 - 2 * t);
          target = 1 - (1 - MIN) * smooth;
        }
        scalesRef.current[i] += (target - scalesRef.current[i]) * 0.09;
        span.style.transform = `scale(${scalesRef.current[i].toFixed(4)})`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center py-6 md:py-8 cursor-default"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", overflowX: "clip" }}
    >
      <motion.div style={{ y }} suppressHydrationWarning>
        <h2
          className="leading-none select-none whitespace-nowrap pointer-events-none"
          style={{
            fontFamily: "var(--font-berkslund)",
            fontWeight: 400,
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "0.04em",
          }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              ref={el => { spanRefs.current[i] = el; }}
              style={{
                display: "inline-block",
                transformOrigin: "center 70%",
                padding: "0.15em 0",
                background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(25,191,183,0.12) 55%, rgba(255,255,255,0.04) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </motion.div>
    </div>
  );
}

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
        className="w-full flex items-center justify-between sm:hidden pb-3"
        aria-expanded={isOpen}
      >
        {heading}
        <ChevronDown
          className={`w-4 h-4 text-white/25 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop: static header */}
      <div className="mb-5 hidden sm:flex">{heading}</div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out sm:!max-h-none sm:!opacity-100 sm:!mt-0 ${
          isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

const fOuter = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
};
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const fItem = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE } },
};
const fCols = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.0, ease: EASE, staggerChildren: 0.18, delayChildren: 0.25 },
  },
};

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
              background: `radial-gradient(circle 140px at ${cursor.x}px ${cursor.y}px,
                rgba(25,191,183,0.07) 0%,
                rgba(25,191,183,0.03) 40%,
                transparent 70%)`,
            }}
          />
        )}

        {/* ── Watermark logo banner ── */}
        <WatermarkText />

        {/* ── Main content ── */}
        <motion.div
          className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24"
          variants={fOuter}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >

          {/* Header row — brand info */}
          <motion.div
            variants={fItem}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 py-10"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Left: brand description */}
            <div className="flex-1 text-center">
              <p style={{ ...cg(400, true), fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                Избери своя доверен бизнес партньор.
                <br />
                Експертно счетоводно обслужване на Вашия бизнес.
              </p>
            </div>

          </motion.div>

          {/* ── Legal row ── */}
          <motion.div
            variants={fItem}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-5 py-4"
          >
            <span className="flex items-center gap-2 flex-shrink-0">
              <span style={{ color: "#19BFB7" }}>—</span>
              <span style={{ ...cg(650), fontSize: "1.18rem", color: "white", letterSpacing: "0.01em" }}>
                Правна информация
              </span>
            </span>
            {/* Links always grouped — separator never orphans */}
            <span className="hidden sm:inline flex-shrink-0" style={{ color: "#19BFB7" }}>·</span>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <Link
                href="/privacy"
                className="group flex items-center transition-colors duration-200 hover:text-primary"
                style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
              >
                <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                <FlipLabel text="Политика за поверителност" />
              </Link>
              <span style={{ color: "#19BFB7", fontSize: "0.6rem" }}>·</span>
              <Link
                href="/terms"
                className="group flex items-center transition-colors duration-200 hover:text-primary"
                style={{ ...mona(420), fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}
              >
                <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                <FlipLabel text="Общи условия" />
                <ScrollText className="w-3.5 h-3.5 ml-1.5 opacity-35 flex-shrink-0 self-center" />
              </Link>
            </div>
          </motion.div>

          {/* ── Link columns grid ── */}
          <motion.div
            variants={fCols}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-16 xl:gap-x-24 py-10"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >

            {/* Бързи връзки */}
            <motion.div variants={fItem}><FooterAccordion title="Бързи връзки">
              <ul className="space-y-2.5 pb-6">
                {[
                  { href: "/za-nas", label: "За нас" },
                  { href: "/uslugi", label: "Услуги" },
                  { href: "/blog", label: "Блог" },
                  { href: "/video", label: "Видео" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center transition-colors duration-200 hover:text-primary"
                      style={{ ...mona(420), fontSize: "0.93rem", color: "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                      <FlipLabel text={label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion></motion.div>

            {/* Услуги */}
            <motion.div variants={fItem}><FooterAccordion title="Услуги">
              <ul className="space-y-2.5 pb-6">
                {[
                  { href: "/uslugi/schetovodni-uslugi", label: "Счетоводни услуги" },
                  { href: "/uslugi/danachni-konsultacii", label: "Данъчни консултации" },
                  { href: "/uslugi/pravni-uslugi", label: "Правни услуги" },
                  { href: "/uslugi/registraciq-na-firmi", label: "Регистрация на фирми" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center transition-colors duration-200 hover:text-primary"
                      style={{ ...mona(420), fontSize: "0.93rem", color: "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                      <FlipLabel text={label} />
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion></motion.div>

            {/* Полезни сайтове */}
            <motion.div variants={fItem}><FooterAccordion title="Полезни сайтове">
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
                      style={{ ...mona(420), fontSize: "0.93rem", color: "rgba(255,255,255,0.55)" }}
                    >
                      <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                      <FlipLabel text={label} />
                      <ExternalLink className="w-3 h-3 opacity-35 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </FooterAccordion></motion.div>

            {/* Контакти */}
            <motion.div variants={fItem}><FooterAccordion title="Контакти">
              <ul className="space-y-2.5 pb-6">
                <li>
                  <a href="mailto:office@takiev.bg"
                    className="group flex items-center transition-colors duration-200 hover:text-primary"
                    style={{ ...mona(680), fontSize: "0.97rem", color: "rgba(255,255,255,0.72)", fontVariationSettings: "'wght' 680, 'wdth' 110" }}
                  >
                    <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                    office@takiev.bg
                  </a>
                </li>
                <li>
                  <a href="tel:+359899080016"
                    className="group flex items-center transition-colors duration-200 hover:text-primary"
                    style={{ ...mona(680), fontSize: "0.97rem", color: "rgba(255,255,255,0.72)", fontVariationSettings: "'wght' 680, 'wdth' 110" }}
                  >
                    <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                    +359 89 908 0016
                  </a>
                </li>
              </ul>
            </FooterAccordion></motion.div>

            {/* ── Office address row — full-width inside grid ── */}
            <motion.div
              variants={fItem}
              className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col items-center gap-4 pt-5 pb-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Address */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="flex items-center gap-2">
                  <span style={{ color: "#19BFB7" }}>—</span>
                  <span style={{ ...cg(650), fontSize: "1.18rem", color: "#19BFB7", letterSpacing: "0.01em" }}>
                    Офис
                  </span>
                  <span style={{ color: "#19BFB7" }}>·</span>
                </span>
                <a
                  href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline sm:items-center transition-colors duration-200 hover:text-primary text-center sm:text-left"
                  style={{ ...mona(680), fontSize: "0.97rem", color: "rgba(255,255,255,0.72)", fontVariationSettings: "'wght' 680, 'wdth' 110" }}
                >
                  <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left hidden sm:block" style={{ marginTop: "0.5em" }} />
                  <span>{`бул. \u201eАлександър Стамболийски\u201c 30Б, 1000 София`}</span>
                  <MapPin className="w-3.5 h-3.5 ml-1.5 flex-shrink-0 opacity-50 self-start" style={{ marginTop: "0.15em" }} />
                </a>
              </div>

              {/* Social icons */}
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
                      style={{ ...mona(500), fontSize: "0.72rem", letterSpacing: "0.06em" }}
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
            </motion.div>

          </motion.div>

          {/* ── Bottom bar ── */}
          <motion.div variants={fItem} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 py-6">
            {/* Left: copyright */}
            <span style={{ fontFamily: "'Berkslund', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)" }}>
              © {currentYear}{" "}
              <span style={{ fontFamily: "'Berkslund', sans-serif", fontSize: "1.15rem", color: "#19BFB7" }}>
                Takiev Finance
              </span>
            </span>

            {/* Right: credit */}
            <div className="flex flex-col gap-1 sm:text-right sm:items-end">
              <span style={{ ...hubot(380), fontSize: "0.82rem", color: "rgba(255,255,255,0.52)", letterSpacing: "0.02em" }}>
                Website &amp; Design made by{" "}
                <span style={{ ...hubot(780), fontSize: "0.90rem", color: "#19BFB7", fontStyle: "italic" }}>Tsvetomir Genov</span>
              </span>
              <a
                href="mailto:tzekage@gmail.com"
                className="group flex items-center justify-end gap-0 transition-colors duration-200 hover:text-primary"
                style={{ ...hubot(380), fontSize: "0.82rem", color: "rgba(255,255,255,0.80)", letterSpacing: "0.02em" }}
              >
                <span className="w-2 h-0.5 bg-primary transition-all duration-300 mr-2 flex-shrink-0 scale-x-0 group-hover:scale-x-100 origin-left" />
                tzekage@gmail.com
              </a>
            </div>
          </motion.div>

        </motion.div>
    </footer>
  );
}
