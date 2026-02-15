"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Users, TrendingUp, Shield, CheckCircle, Sparkles } from "lucide-react";

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
  { year: "2019", event: "Основаване на Такиев Финанс (ЕИК: 206666484)", highlight: true },
  { year: "2020", event: "Разширяване на екипа и клиентската база" },
  { year: "2022", event: "Дигитализация на всички процеси" },
  { year: "2024", event: "500+ доволни корпоративни клиенти", highlight: true },
  { year: "2025", event: "Лидер в счетоводни услуги" },
];

const teamMembers = [
  { src: "/firm-logo/nikolay-takiev.jpg", alt: "Николай Такиев", name: "Николай Такиев" },
  { src: "/firm-logo/team/Krisi.png", alt: "Криси", name: "Криси" },
  { src: "/firm-logo/team/Rosi.png", alt: "Роси", name: "Роси" },
  { src: "/firm-logo/team/Tedi.jpg", alt: "Теди", name: "Теди" },
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

function TeamCollage() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Animated decorative lines behind the photos */}
      <svg
        className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] z-0"
        viewBox="0 0 560 620"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Animated light gradient for line 1 */}
          <linearGradient id="light1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(25,191,183,0.6)" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-1 0;2 0;-1 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </linearGradient>
          {/* Animated light gradient for line 2 */}
          <linearGradient id="light2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="2 0;-1 0;2 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </linearGradient>
          {/* Animated light gradient for line 3 */}
          <linearGradient id="light3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(25,191,183,0.4)" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="0 -1;0 2;0 -1"
              dur="7s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Static base lines — subtle silver/gray */}
        <path d="M40 100 C40 100 150 30 280 30 C410 30 520 100 520 100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M20 310 C20 310 60 200 280 200 C500 200 540 310 540 310" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d="M60 520 C60 520 160 580 280 580 C400 580 500 520 500 520" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <ellipse cx="280" cy="310" rx="260" ry="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="280" y1="10" x2="280" y2="610" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Animated light lines on top */}
        <path d="M40 100 C40 100 150 30 280 30 C410 30 520 100 520 100" stroke="url(#light1)" strokeWidth="1.5" />
        <path d="M20 310 C20 310 60 200 280 200 C500 200 540 310 540 310" stroke="url(#light2)" strokeWidth="1.5" />
        <path d="M60 520 C60 520 160 580 280 580 C400 580 500 520 500 520" stroke="url(#light1)" strokeWidth="1.5" />
        <ellipse cx="280" cy="310" rx="260" ry="280" stroke="url(#light3)" strokeWidth="1" />
      </svg>

      {/* Photo grid */}
      <div className="relative z-10 grid grid-cols-12 grid-rows-[auto] gap-3">
        {/* Nikolay — large, spans 7 cols, left side */}
        <div className="col-span-7 row-span-2 rounded-2xl overflow-hidden border border-white/[0.08]">
          <div className="relative w-full" style={{ paddingBottom: "130%" }}>
            <Image
              src={teamMembers[0].src}
              alt={teamMembers[0].alt}
              fill
              sizes="(max-width: 768px) 58vw, 290px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Krisi — medium, top-right */}
        <div className="col-span-5 rounded-2xl overflow-hidden border border-white/[0.08]">
          <div className="relative w-full" style={{ paddingBottom: "120%" }}>
            <Image
              src={teamMembers[1].src}
              alt={teamMembers[1].alt}
              fill
              sizes="(max-width: 768px) 42vw, 210px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Tedi — bottom-right beside Krisi */}
        <div className="col-span-5 rounded-2xl overflow-hidden border border-white/[0.08]">
          <div className="relative w-full" style={{ paddingBottom: "110%" }}>
            <Image
              src={teamMembers[3].src}
              alt={teamMembers[3].alt}
              fill
              sizes="(max-width: 768px) 42vw, 210px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Rosi — wide bottom strip */}
        <div className="col-span-12 rounded-2xl overflow-hidden border border-white/[0.08]">
          <div className="relative w-full" style={{ paddingBottom: "40%" }}>
            <Image
              src={teamMembers[2].src}
              alt={teamMembers[2].alt}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyPresentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay },
        };

  return (
    <section className="relative py-20 md:py-28 bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Subtle gradient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div {...anim(0)} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            За нас
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Вашият доверен{" "}
            <span className="text-primary">финансов партньор</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            От 2019 г. предоставяме професионални счетоводни услуги с грижа към всеки клиент
          </p>
        </motion.div>

        {/* Stats + Team Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-20 items-center">
          {/* Stats */}
          <motion.div {...anim(0.15)} className="grid grid-cols-2 gap-4">
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

          {/* Team Collage */}
          <motion.div {...anim(0.3)}>
            <TeamCollage />
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div {...anim(0.3)} className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Нашата <span className="text-primary">история</span>
          </h3>

          {/* Desktop horizontal */}
          <div className="hidden md:block relative max-w-5xl mx-auto">
            <div className="absolute top-[18px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex justify-between">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 20 },
                        animate: isInView ? { opacity: 1, y: 0 } : {},
                      })}
                  transition={{ delay: 0.5 + index * 0.12, duration: 0.5 }}
                  className="flex flex-col items-center text-center flex-1 group"
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-5 transition-transform group-hover:scale-125 ${
                      item.highlight
                        ? "bg-primary shadow-[0_0_12px_rgba(25,191,183,0.4)]"
                        : "bg-white/30 group-hover:bg-primary/60"
                    }`}
                  />
                  <div className={`text-xl font-bold mb-1 ${item.highlight ? "text-primary" : "text-white"}`}>
                    {item.year}
                  </div>
                  <div className="text-sm text-white/50 max-w-[150px] leading-relaxed">{item.event}</div>
                  {item.highlight && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2">
                      <CheckCircle className="w-3 h-3" />
                      Ключов момент
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden relative pl-6 max-w-sm mx-auto">
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, x: 15 },
                        animate: isInView ? { opacity: 1, x: 0 } : {},
                      })}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  <div
                    className={`absolute -left-6 top-1.5 w-[10px] h-[10px] rounded-full ${
                      item.highlight ? "bg-primary shadow-[0_0_8px_rgba(25,191,183,0.4)]" : "bg-white/30"
                    }`}
                  />
                  <div className={`text-base font-bold ${item.highlight ? "text-primary" : "text-white"}`}>
                    {item.year}
                  </div>
                  <div className="text-sm text-white/50">{item.event}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div {...anim(0.4)}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 20 },
                        animate: isInView ? { opacity: 1, y: 0 } : {},
                      })}
                  transition={{ delay: 0.6 + index * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...anim(0.6)} className="mt-16 text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-8 md:p-12 max-w-2xl">
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Готови ли сте да станете част от успеха?
            </h3>
            <p className="text-white/50 mb-6">
              Присъединете се към стотиците компании, които вече се доверяват на нашата експертиза
            </p>
            <a
              href="/kontakti"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Свържете се с нас
              <CheckCircle className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
