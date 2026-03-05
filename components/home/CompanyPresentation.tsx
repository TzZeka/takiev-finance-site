"use client";

import { motion, AnimatePresence, useInView, useReducedMotion, type MotionProps } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Award, Users, TrendingUp, Shield, CheckCircle, Sparkles } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import { FluidBackground } from "@/components/ui/FluidBackground";
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

const timeline = [
  { year: "2019", event: "Основаване на Такиев Финанс", highlight: true },
  { year: "2020", event: "Разширяване на екипа и клиентската база" },
  { year: "2022", event: "Дигитализация на всички процеси" },
  { year: "2024", event: "500+ доволни корпоративни клиенти", highlight: true },
  { year: "2025", event: "Лидер в счетоводни услуги" },
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
   MobileTimelineItem — used by CompanyHistory
   ========================================== */
function MobileTimelineItem({
  item,
  index,
  image,
}: {
  item: { year: string; event: string; highlight?: boolean };
  index: number;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Dot on the left line */}
      <div
        className={`absolute -left-6 top-3 w-3 h-3 rounded-full ${
          item.highlight
            ? "bg-primary shadow-[0_0_8px_rgba(25,191,183,0.5)]"
            : "bg-slate-300"
        }`}
      />

      {/* Card */}
      <div
        className={`rounded-2xl overflow-hidden ${
          item.highlight
            ? "border border-primary/30 bg-primary/5"
            : "border border-slate-100 bg-slate-50/50"
        }`}
      >
        {/* Thumbnail */}
        <div className="relative h-36 overflow-hidden">
          <Image
            src={image}
            alt={item.event}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
        {/* Text */}
        <div className="p-4">
          <div
            className={`text-xs font-bold uppercase tracking-widest mb-1 ${
              item.highlight ? "text-primary" : "text-slate-400"
            }`}
          >
            {item.year}
          </div>
          <div className="text-sm font-semibold text-slate-700">{item.event}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================
   Section 2: CompanyHistory
   Premium scrollytelling — white bg + GSAP
   ========================================== */
export function CompanyHistory() {
  // stickyRef is the element GSAP pins — no CSS sticky needed
  const stickyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const timelineImages = [
    "/firm-logo/nikolay-takiev.jpg",
    "/firm-logo/banners/banner-for-us.png",
    "/firm-logo/messages-videos/дигитализирано-счетоводствто.png",
    "/firm-logo/awards/certificate-carrer-show.jpg",
    "/firm-logo/Takiev Finance Banner.png",
  ];

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (!stickyRef.current) return;

    const ctx = gsap.context(() => {
      // pin: true is more robust than CSS sticky — works regardless of
      // ancestor transforms (e.g. Framer Motion template.tsx transition div)
      ScrollTrigger.create({
        trigger: stickyRef.current,
        pin: true,
        anticipatePin: 1,
        start: "top top",
        end: "+=400vh",
        scrub: 0.5,
        onUpdate: (self) => {
          if (lineRef.current) {
            lineRef.current.style.height = `${self.progress * 100}%`;
          }
          const idx = Math.min(4, Math.floor(self.progress * 5));
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative bg-white"
      style={{
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        // boxShadow instead of filter:drop-shadow — drop-shadow creates a stacking context
        // that breaks position:sticky on child elements
        boxShadow: "0 -12px 40px rgba(0,0,0,0.12)",
      }}
    >
      {/* Fluid teal/green orbs — absolute, no overflow:hidden on section */}
      <FluidBackground baseOpacity={0.09} />

      {/* ── Header (normal document flow) ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-12 md:pb-16 text-left md:text-center">
        <SectionBadge>Нашият път</SectionBadge>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
          Нашата <span className="text-primary">история</span>
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl md:mx-auto">
          Ключовите моменти, които ни направиха лидер в счетоводните услуги
        </p>
      </div>

      {/* ── Desktop scroll zone — GSAP pin (robust vs CSS sticky) ── */}
      {/* stickyRef is the pinned element; GSAP adds the 400vh spacer automatically */}
      <div className="hidden md:block">
        <div
          ref={stickyRef}
          className="h-screen overflow-hidden grid bg-white"
          style={{ gridTemplateColumns: "2fr 3fr" }}
        >

            {/* LEFT — Timeline */}
            <div className="relative flex flex-col justify-center px-10 md:px-16 py-8">
              {/* Year watermark — teal tint so it reads on white background */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[9rem] font-black select-none pointer-events-none leading-none transition-all duration-500"
                style={{ color: "rgba(25, 191, 183, 0.13)" }}
                aria-hidden="true"
              >
                {timeline[activeIndex].year}
              </div>

              {/* Track + items container */}
              <div className="relative z-10 h-[360px] md:h-[420px]">
                {/* Track background — full height */}
                <div className="absolute left-1.5 inset-y-0 w-px bg-slate-200" />
                {/* Progress fill — height driven directly by GSAP */}
                <div
                  ref={lineRef}
                  className="absolute left-1.5 top-0 w-px bg-gradient-to-b from-primary to-emerald-400"
                  style={{ height: "0%" }}
                />

                {/* Items spread across container height */}
                <div className="absolute inset-0 flex flex-col justify-between py-2">
                  {timeline.map((item, i) => {
                    const isPast = i < activeIndex;
                    const isActive = i === activeIndex;
                    return (
                      <div key={item.year} className="flex items-center gap-5">
                        {/* Dot — centered on the track line (left-1.5 = 6px) */}
                        <div className="relative flex-shrink-0 w-3 flex justify-center">
                          <div
                            className={`rounded-full transition-all duration-500 ${
                              isActive
                                ? "w-4 h-4 bg-primary shadow-[0_0_14px_rgba(25,191,183,0.7)]"
                                : isPast
                                ? "w-3 h-3 bg-primary/60"
                                : "w-3 h-3 bg-slate-300"
                            }`}
                          />
                          {isActive && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/30 animate-ping" />
                          )}
                        </div>

                        {/* Text */}
                        <div
                          className={`transition-all duration-500 ${
                            isActive ? "opacity-100" : isPast ? "opacity-50" : "opacity-30"
                          }`}
                        >
                          <div
                            className={`text-xs font-bold tracking-widest uppercase mb-0.5 ${
                              isActive ? "text-primary" : "text-slate-400"
                            }`}
                          >
                            {item.year}
                          </div>
                          <div
                            className={`text-sm md:text-base font-medium leading-snug ${
                              isActive ? "text-slate-800" : "text-slate-500"
                            }`}
                          >
                            {item.event}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT — Image panel */}
            <div className="relative overflow-hidden">
              {/* Decorative corner frames */}
              <div className="absolute top-8 right-8 z-20 pointer-events-none">
                <div className="w-8 h-8 border-t-2 border-r-2 border-primary/60" />
              </div>
              <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                <div className="w-8 h-8 border-b-2 border-l-2 border-primary/60" />
              </div>

              {/* All 5 images mounted — crossfade via opacity/scale */}
              {timelineImages.map((src, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  style={{ zIndex: activeIndex === i ? 2 : 1 }}
                >
                  <Image
                    src={src}
                    alt={timeline[i].event}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 60vw, 100vw"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </motion.div>
              ))}

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
                {/* Step-dots indicator */}
                <div className="flex gap-2 mb-4">
                  {timeline.map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 rounded-full transition-all duration-500 ${
                        i === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Animated text swap */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-primary text-xs tracking-widest uppercase font-semibold">
                      {timeline[activeIndex].year}
                    </div>
                    <div className="text-white font-bold text-xl md:text-2xl mt-1">
                      {timeline[activeIndex].event}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

        </div>
      </div>

      {/* ── Mobile layout — no sticky, no GSAP ── */}
      <div className="md:hidden container mx-auto px-4 pb-12">
        <div className="relative pl-6">
          {/* Gradient left line */}
          <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary/50 via-primary/25 to-transparent" />
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <MobileTimelineItem
                key={item.year}
                item={item}
                index={i}
                image={timelineImages[i]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pb-20" />
    </section>
  );
}

/* ==========================================
   Section 3: CompanyValues
   Auto-scrolling carousel
   ========================================== */
export function CompanyValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Duplicate items for infinite scroll effect
  const carouselItems = [...values, ...values, ...values, ...values];

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
      {/* Background gradient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div {...anim(0)} className="text-left md:text-center mb-14">
          <SectionBadge>Ценности</SectionBadge>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Нашите <span className="text-primary">ценности</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl md:mx-auto">
            Принципите, които ръководят нашата работа всеки ден
          </p>
        </motion.div>
      </div>

      {/* Carousel — full width, overflows container */}
      <motion.div {...anim(0.2)}>
        <div className="relative overflow-hidden group/carousel">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          {/* Scrolling track — pauses on hover */}
          <div
            className="flex gap-5 animate-scroll-left group-hover/carousel:[animation-play-state:paused]"
            style={{
              animationDuration: `${carouselItems.length * 4}s`,
              width: "max-content",
            }}
          >
            {carouselItems.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={`val-${index}`}
                  className="group flex-shrink-0 w-72 sm:w-80"
                >
                  <div className="h-full rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
