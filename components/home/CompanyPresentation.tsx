"use client";

import {
  motion, AnimatePresence, useInView, useReducedMotion,
  type MotionProps,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Users, TrendingUp, Shield, CheckCircle, Sparkles, ChevronUp, ChevronDown, X, Grid3X3 } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import { gsap, ScrollTrigger } from "@/lib/gsap";


const stats = [
  { label: "Години опит", value: 6, suffix: "+", icon: TrendingUp },
  { label: "Доволни клиенти", value: 500, suffix: "+", icon: Users },
  { label: "Успешни проекти", value: 1200, suffix: "+", icon: Award },
  { label: "Експерти в екипа", value: 25, suffix: "", icon: Shield },
];

const values = [
  {
    icon: Shield,
    title: "Сигурност & Надеждност",
    description: "Гарантираме пълна конфиденциалност и защита на вашите данни",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Award,
    title: "Професионализъм",
    description: "Сертифицирани счетоводители с дългогодишен опит",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: TrendingUp,
    title: "Растеж & Развитие",
    description: "Помагаме на бизнеса ви да расте и процъфтява",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Sparkles,
    title: "Иновации",
    description: "Дигитализация и модерни технологии",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
];

type TimelineItem = { year: string; label: string; title: string; body: string };

const timeline: TimelineItem[] = [
  {
    year: "2021",
    label: "Основаване на Такиев Финанс",
    title: "Основаване на Такиев Финанс",
    body: "Такиев Финанс е създадена с мисията да бъде надежден партньор на бизнеса в управлението на неговите финанси. Ние вярваме, че доброто счетоводство е основата на стабилния и успешен бизнес. С много ентусиазъм, труд и вяра в това, което правим, положихме основите на нашата компания.",
  },
  {
    year: "2022",
    label: "Дигитализация",
    title: "Дигитализация без граници",
    body: "В съвременния дигитален свят местоположението вече не е ограничение. С Такиев Финанс можете да управлявате счетоводството си от всяка точка на страната или света – без притеснения и без забавяне. Всеки клиент разполага със собствена дигитална папка, в която се съхранява цялото фирмено досие. Когато ви потрябва документ, го получавате веднага, а нашата комуникация е на първо място ние сме винаги до вас, готови да отговорим на въпросите и да Ви улесним.",
  },
  {
    year: "2023",
    label: "Разширяване на екипа",
    title: "Разширяване на нашия екип",
    body: "С разширяването на екипа успяваме да обслужваме все повече клиенти, като се грижим за всеки бизнес с внимание и точност. Нашата цел е ясна, да ви осигурим спокойствие и сигурност, така че да се фокусирате върху развитието на своя бизнес, докато ние се грижим за счетоводството и финансовата яснота.",
  },
  {
    year: "2024",
    label: "Растеж и Доверие",
    title: "Повече от 150 компании ни се довериха",
    body: "Вашето доверие ни вдъхнови да растем... Фокусът ни е върху индивидуалната комуникация, която ви дава сигурност при вземането на стратегически решения.",
  },
  {
    year: "2025",
    label: "Подготовка за следващото ниво",
    title: "Подготовка за следващото ниво",
    body: "Знанието е основата на качеството... Инвестираме в бъдещето на индустрията.",
  },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-primary">
      {count}
      {suffix}
    </div>
  );
}

/* ==========================================
   Section 1: CompanyPresentation
   Header + Stats + CTA
   ========================================== */
export function CompanyPresentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

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
      {...(prefersReducedMotion ? {} : {
        initial: { y: 120 },
        whileInView: { y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { type: "spring" as const, stiffness: 80, damping: 20 },
      })}
      className="relative py-20 md:py-28 bg-slate-950 overflow-hidden shadow-sm"
      style={{
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        filter: "drop-shadow(0 -10px 20px rgba(0,0,0,0.10))",
      }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div {...anim(0)} className="text-left md:text-center mb-16">
          <SectionBadge>За нас</SectionBadge>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            За <span className="text-primary">нас</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl md:mx-auto">
            От 2021 г. предоставяме професионални счетоводни услуги с грижа към всеки клиент
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...anim(0.15)} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon className="w-5 h-5 text-primary/30" />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-sm text-white/50 mt-2 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div {...anim(0.4)} className="text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-8 md:p-12 max-w-2xl">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Готови ли сте да станете част от успеха?
            </h3>
            <p className="text-white/50 mb-6">
              Присъединете се към стотиците компании, които вече се доверяват на нашата експертиза
            </p>
            <PremiumCTA href="/kontakti">
              Свържете се с нас
              <CheckCircle className="w-5 h-5" />
            </PremiumCTA>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ==========================================
   InflatableTitle — per-word proximity swell on hover
   ========================================== */
function InflatableTitle({ text, style }: { text: string; style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [strengths, setStrengths] = useState<number[]>([]);
  const words = text.split(" ");

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setStrengths(
      wordRefs.current.map((span) => {
        if (!span) return 0;
        const sr = span.getBoundingClientRect();
        const cx = sr.left - rect.left + sr.width / 2;
        const cy = sr.top - rect.top + sr.height / 2;
        const s = Math.max(0, 1 - Math.hypot(mx - cx, my - cy) / 160);
        return s * s;
      })
    );
  };

  const onMouseLeave = () => setStrengths([]);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...style, display: "flex", flexWrap: "wrap", columnGap: "0.28em" }}
    >
      {words.map((word, i) => {
        const s = strengths[i] ?? 0;
        return (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{
              display: "inline-block",
              transform: `scale(${1 + s * 0.07})`,
              transformOrigin: "center bottom",
              fontVariationSettings: `'wght' 900, 'wdth' ${Math.round(130 + s * 18)}`,
              transition:
                "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), font-variation-settings 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

/* ==========================================
   MobileTimelineItem — used by CompanyHistory
   ========================================== */
function MobileTimelineItem({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="rounded-2xl border border-slate-100 bg-white p-5">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1">
          {item.year}
        </div>
        <div className="font-bold text-slate-800 mb-2">{item.title}</div>
        <div className="text-sm text-slate-500 leading-relaxed">{item.body}</div>
      </div>
    </motion.div>
  );
}

/* ==========================================
   Section 2: CompanyHistory
   Split-screen sticky scroll — white left + forest right
   ========================================== */
export function CompanyHistory() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const rippleCounter = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorDir, setCursorDir] = useState<"up" | "down">("down");
  const [ripples, setRipples] = useState<number[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Hide cursor on mount
  useEffect(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (!stickyRef.current) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: stickyRef.current,
        pin: true,
        anticipatePin: 1,
        start: "top top",
        end: "+=500vh",
        scrub: 0.5,
        onUpdate: (self) => {
          if (lineRef.current) {
            lineRef.current.style.height = `${self.progress * 100}%`;
          }
          if (watermarkRef.current) {
            watermarkRef.current.style.transform = `translateY(${self.progress * -60}px)`;
          }
          const idx = Math.min(4, Math.floor(self.progress * 5));
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        },
      });
    });

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const handleRightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
      cursorRef.current.style.opacity = "1";
    }
    const newDir = y < rect.height / 2 ? "up" : "down";
    setCursorDir((prev) => (prev !== newDir ? newDir : prev));
  };

  const handleRightMouseLeave = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isUp = e.clientY - rect.top < rect.height / 2;
    const targetIdx = isUp
      ? Math.max(0, activeIndex - 1)
      : Math.min(timeline.length - 1, activeIndex + 1);

    // Scroll to the middle of the target step — GSAP picks it up naturally
    const st = stRef.current;
    if (st) {
      const targetProgress = (targetIdx + 0.5) / timeline.length;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }

    // Ring squeeze via Web Animations API
    cursorRingRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(0.72)" }, { transform: "scale(1)" }],
      { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );

    // Ripple pulse
    const id = ++rippleCounter.current;
    setRipples((prev) => [...prev, id]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r !== id)), 650);
  };

  return (
    <section
      className="relative bg-white"
      style={{
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        boxShadow: "0 -12px 40px rgba(0,0,0,0.12)",
      }}
    >


      {/* ── Header ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-12 md:pb-16 text-left md:text-center">
        <SectionBadge>Нашият път</SectionBadge>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
          Нашата <span className="text-primary">история</span>
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl md:mx-auto">
          Ключовите моменти, които ни направиха лидер в счетоводните услуги
        </p>
      </div>

      {/* ── Desktop scroll zone — GSAP pin ── */}
      <div className="hidden md:block">
        <div
          ref={stickyRef}
          className="h-screen overflow-hidden grid"
          style={{ gridTemplateColumns: "35% 65%" }}
        >
          {/* LEFT — Year Typography Heroes */}
          <div className="relative h-full flex items-center bg-white overflow-hidden">
            <div
              className="relative w-full grid"
              style={{ height: "72vh", gridTemplateColumns: "40px 1fr" }}
            >
              {/* Dot column with vertical track */}
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-100" />
                <div
                  ref={lineRef}
                  className="absolute left-3.5 top-0 w-px bg-primary/60"
                  style={{ height: "0%" }}
                />
                <div className="h-full flex flex-col justify-between py-2">
                  {timeline.map((item, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    return (
                      <div key={item.year} className="flex items-center justify-center relative">
                        <div
                          className="rounded-full"
                          style={{
                            width: isActive ? 14 : 10,
                            height: isActive ? 14 : 10,
                            backgroundColor: isActive
                              ? "var(--color-primary)"
                              : isPast
                              ? "rgba(var(--color-primary-rgb),0.5)"
                              : "#e2e8f0",
                            boxShadow: isActive ? "0 0 12px rgba(var(--color-primary-rgb),0.7)" : "none",
                            transition: "all 0.5s ease",
                          }}
                        />
                        {isActive && (
                          <div
                            className="absolute rounded-full bg-primary/20 animate-ping"
                            style={{ width: 14, height: 14 }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Year + label column */}
              <div className="flex flex-col justify-between py-2 pl-5 pr-6">
                {timeline.map((item, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <div key={item.year}>
                      <div
                        style={{
                          fontVariationSettings: "'wght' 900, 'wdth' 125",
                          fontSize: isActive
                            ? "clamp(3rem, 4.5vw, 4.5rem)"
                            : "clamp(1.75rem, 2.8vw, 2.5rem)",
                          color: isActive
                            ? "var(--color-dark)"
                            : isPast
                            ? "rgba(var(--color-primary-rgb),0.55)"
                            : "#e2e8f0",
                          transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                          lineHeight: 1.05,
                        }}
                      >
                        {item.year}
                      </div>
                      <div
                        className="text-xs tracking-[0.18em] uppercase mt-1 transition-colors duration-500"
                        style={{ color: isActive ? "var(--color-primary)" : "#94a3b8" }}
                      >
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — Forest text panel */}
          <div
            className="relative h-full overflow-hidden"
            style={{ backgroundColor: "#0d1f1c", cursor: "none", borderTopLeftRadius: "1.5rem", borderBottomLeftRadius: "1.5rem" }}
            onMouseMove={handleRightMouseMove}
            onMouseLeave={handleRightMouseLeave}
            onClick={handleRightClick}
          >
            {/* Ghost watermark year — parallax via GSAP */}
            <div
              ref={watermarkRef}
              className="absolute bottom-[-15%] right-[-5%] select-none pointer-events-none leading-none"
              aria-hidden="true"
              style={{
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontSize: "clamp(10rem, 18vw, 17rem)",
                color: "rgba(255,255,255,0.05)",
              }}
            >
              {timeline[activeIndex].year}
            </div>

            {/* Halo cursor — position via direct DOM, direction via state */}
            <div
              ref={cursorRef}
              className="absolute pointer-events-none z-50"
              style={{ transform: "translate(-50%, -50%)", transition: "opacity 0.25s ease" }}
            >
              {/* Click ripples — expand & fade outward */}
              {ripples.map((id) => (
                <motion.div
                  key={id}
                  initial={{ scale: 0.9, opacity: 0.55 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Ring — squeezed on click via Web Animations API */}
              <div
                ref={cursorRingRef}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  boxShadow: "0 0 22px rgba(255,255,255,0.08), inset 0 0 12px rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(3px)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cursorDir}
                    initial={{ opacity: 0, y: cursorDir === "down" ? -4 : 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: cursorDir === "down" ? 4 : -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {cursorDir === "up" ? (
                      <ChevronUp className="w-3.5 h-3.5 text-white/60" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Content */}
            <div
              className="relative z-10 h-full flex items-center"
              style={{ padding: "8% 10% 8% 12%" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Title — Cormorant Garamond bold italic */}
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(2.2rem, 4vw, 3.75rem)",
                      color: "#ffffff",
                      lineHeight: 1.1,
                      maxWidth: 580,
                    }}
                  >
                    {timeline[activeIndex].title.split(/(\d+)/).map((part, i) =>
                      /^\d+$/.test(part) ? (
                        <span
                          key={i}
                          style={{
                            fontWeight: 900,
                            fontSize: "1.3em",
                            letterSpacing: "0.06em",
                            display: "inline-block",
                          }}
                        >
                          {part}
                        </span>
                      ) : part
                    )}
                  </h3>

                  {/* Body — each sentence on its own line, shifted right */}
                  <div
                    style={{
                      fontSize: "1.13rem",
                      lineHeight: 1.82,
                      color: "rgba(255,255,255,0.65)",
                      maxWidth: 600,
                      marginTop: "1.25rem",
                      marginLeft: "1.25rem",
                    }}
                  >
                    {timeline[activeIndex].body
                      .split(/(?<=\.)\s+/)
                      .filter(s => s.trim())
                      .map((sentence, i) => (
                        <span key={i} style={{ display: "block" }}>{sentence}</span>
                      ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden container mx-auto px-4 pb-12">
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <MobileTimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="pb-20" />
    </section>
  );
}

/* ==========================================
   Section 3: CompanyValues
   Split layout — left heading, right auto-cycling diagonal card
   ========================================== */

function cgStyle(wght = 700, italic = false) {
  return {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: wght,
    fontStyle: italic ? "italic" : "normal",
  };
}

export function CompanyValues() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Auto-cycle every 1.8 s — pauses while card is hovered/focused
  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;
    const t = setInterval(() => setActiveIdx(prev => (prev + 1) % values.length), 1800);
    return () => clearInterval(t);
  }, [isHovered, prefersReducedMotion]);

  const anim = (delay: number): MotionProps =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { type: "spring", stiffness: 200, damping: 30, mass: 1, delay },
        };

  const v = values[activeIdx];

  return (
    <motion.section
      ref={sectionRef}
      {...(prefersReducedMotion ? {} : {
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
      {/* ── Decorative — same palette as BlogPreview ── */}
      <div aria-hidden className="absolute pointer-events-none" style={{ top: "-30%", left: "50%", transform: "translateX(-50%)", width: "900px", height: "500px", background: "radial-gradient(ellipse at center, rgba(25,191,183,0.14) 0%, rgba(25,191,183,0.04) 50%, transparent 70%)", filter: "blur(30px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ bottom: "-10%", right: "-5%", width: "500px", height: "400px", background: "radial-gradient(ellipse at center, rgba(25,191,183,0.07) 0%, transparent 65%)", filter: "blur(50px)" }} />
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(25,191,183,0.3), transparent)" }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px", mixBlendMode: "overlay" as const, opacity: 0.04 }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: heading + indicators + show-all button ── */}
          <motion.div {...anim(0)} className="flex flex-col justify-center">
            <SectionBadge>Ценности</SectionBadge>
            <h2
              className="mt-4 text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.05] text-white"
              style={{ fontVariationSettings: "'wght' 900, 'wdth' 125" }}
            >
              Нашите<br />
              <span className="text-primary">ценности</span>
            </h2>
            <p
              className="mt-5 text-white/50 text-base leading-relaxed max-w-sm"
              style={{ fontFamily: "'Mona Sans', sans-serif" }}
            >
              Принципите, които ръководят нашата работа всеки ден и правят разликата за нашите клиенти.
            </p>

            {/* Pill dot indicators */}
            <div className="flex items-center gap-2.5 mt-8">
              {values.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Ценност ${i + 1}`}
                  className="flex items-center justify-center p-1"
                >
                  <motion.div
                    animate={{
                      width: i === activeIdx ? 28 : 7,
                      backgroundColor: i === activeIdx ? "#19BFB7" : "rgba(255,255,255,0.2)",
                      opacity: i === activeIdx ? 1 : 0.55,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    style={{ height: 3, borderRadius: 99 }}
                  />
                </button>
              ))}
            </div>

            {/* Show all cards button */}
            <button
              onClick={() => setShowAll(true)}
              className="mt-6 group inline-flex items-center gap-2 text-xs text-white/40 hover:text-primary transition-colors duration-200 self-start"
              style={{ fontFamily: "'Mona Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              <Grid3X3 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Всички ценности</span>
            </button>
          </motion.div>

          {/* ── Right: diagonal auto-cycling card ── */}
          <motion.div {...anim(0.18)} className="relative">
            <div
              className="relative select-none"
              style={{ height: "clamp(360px, 54vh, 500px)" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Parallelogram clip wrapper */}
              <div
                className="relative h-full"
                style={{ clipPath: "polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex flex-col justify-end p-8 md:p-10"
                    style={{
                      background: "linear-gradient(155deg, rgba(25,191,183,0.06) 0%, rgba(6,14,12,0.99) 55%)",
                      border: "1px solid rgba(25,191,183,0.22)",
                    }}
                  >
                    {/* Decorative ghost index — Cormorant Garamond thin italic */}
                    <div
                      aria-hidden
                      style={{
                        ...cgStyle(300, true),
                        position: "absolute",
                        top: "1.25rem",
                        right: "2.5rem",
                        fontSize: "clamp(6rem, 12vw, 9rem)",
                        lineHeight: 1,
                        color: "rgba(25,191,183,0.07)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {String(activeIdx + 1).padStart(2, "0")}
                    </div>

                    {/* Card content */}
                    <div className="relative z-10">
                      {/* Title — Cormorant Garamond bold italic */}
                      <h3
                        style={{
                          ...cgStyle(700, true),
                          fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
                          color: "white",
                          lineHeight: 1.1,
                        }}
                      >
                        {v.title}
                      </h3>
                      {/* Description — Cormorant Garamond regular */}
                      <p
                        style={{
                          ...cgStyle(400, false),
                          fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                          color: "rgba(255,255,255,0.55)",
                          lineHeight: 1.65,
                          marginTop: "0.75rem",
                        }}
                      >
                        {v.description}
                      </p>
                      {/* Teal accent line */}
                      <motion.div
                        key={`line-${activeIdx}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="origin-left"
                        style={{
                          marginTop: "1.5rem",
                          height: "1px",
                          width: "3.5rem",
                          background: "linear-gradient(90deg, #19BFB7, rgba(25,191,183,0.25))",
                        }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Top blur fade into section background */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-20 pointer-events-none"
                  style={{
                    height: "100px",
                    background: "linear-gradient(to bottom, rgba(13,31,28,0.88) 0%, transparent 100%)",
                  }}
                />
                {/* Bottom blur fade */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
                  style={{
                    height: "70px",
                    background: "linear-gradient(to top, rgba(13,31,28,0.65) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── "Show all" overlay grid ── */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            key="cv-all-grid"
            className="fixed inset-0 z-[9000] flex items-center justify-center p-5 md:p-12"
            style={{ backgroundColor: "rgba(6,14,12,0.96)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={() => setShowAll(false)}
          >
            {/* Teal top glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(25,191,183,0.07) 0%, transparent 60%)" }} />

            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ scale: 0.95, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-end justify-between mb-7">
                <h2
                  style={{
                    ...cgStyle(700, true),
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  Нашите ценности
                </h2>
                <button
                  onClick={() => setShowAll(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/55 hover:text-white hover:border-primary/50 transition-colors duration-200 flex-shrink-0 mb-1"
                  aria-label="Затвори"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2×2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, delay: 0.06 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl p-7 overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: i === activeIdx
                        ? "1px solid rgba(25,191,183,0.35)"
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Ghost index */}
                    <div
                      aria-hidden
                      style={{
                        ...cgStyle(300, true),
                        position: "absolute",
                        top: "0.5rem",
                        right: "1rem",
                        fontSize: "4rem",
                        lineHeight: 1,
                        color: "rgba(25,191,183,0.06)",
                        userSelect: "none",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3
                      style={{
                        ...cgStyle(700, true),
                        fontSize: "1.45rem",
                        color: "white",
                        lineHeight: 1.15,
                      }}
                    >
                      {val.title}
                    </h3>
                    <p
                      style={{
                        ...cgStyle(400),
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.5)",
                        marginTop: "0.55rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {val.description}
                    </p>
                    <div
                      style={{
                        marginTop: "1.1rem",
                        height: "1px",
                        width: "2.25rem",
                        background: "linear-gradient(90deg, #19BFB7, transparent)",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
