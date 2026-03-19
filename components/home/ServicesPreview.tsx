"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type MotionProps } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { PremiumCTA } from "@/components/ui/PremiumCTA";

interface ServicesPreviewProps {
  services: Service[];
}

const serviceItems = [
  {
    name: "Счетоводни услуги",
    icon: "chart",
    description: "Пълно счетоводно обслужване за вашия бизнес — от първичните документи до годишното приключване.",
    category: "Счетоводни",
  },
  {
    name: "Данъчни консултации",
    icon: "calculator",
    description: "Експертни данъчни решения, планиране и оптимизация за спестяване на средства.",
    category: "Данъчни",
  },
  {
    name: "Правни услуги",
    icon: "scale",
    description: "Правна защита, съвети и представителство по търговски и данъчни въпроси.",
    category: "Правни",
  },
  {
    name: "Регистрация на дружества",
    icon: "building",
    description: "Бърза и надеждна регистрация на ЕООД, ООД, ЕТ и всички видове дружества.",
    category: "Регистрация",
  },
];

const renderIcon = (iconType: string) => {
  const cls = "w-5 h-5";
  switch (iconType) {
    case "chart":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case "calculator":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "scale":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      );
    case "building":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    default:
      return null;
  }
};

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const getServiceLink = (category: string) => {
    const match = services.find((s) => s.category === category);
    return match ? `/uslugi/${match.slug.current}` : "/uslugi";
  };

  const anim = (delay: number): MotionProps =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { type: "spring", stiffness: 200, damping: 30, mass: 1, delay },
        };

  return (
    <motion.section
      ref={ref}
      {...(prefersReducedMotion ? {} : {
        initial: { y: 120 },
        whileInView: { y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { type: "spring" as const, stiffness: 80, damping: 20 },
      })}
      className="relative py-20 md:py-28 bg-white overflow-hidden shadow-sm"
      style={{
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        filter: "drop-shadow(0 -10px 20px rgba(0,0,0,0.10))",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* Left — sticky title */}
          <motion.div {...anim(0)} className="lg:sticky lg:top-28">
            <SectionBadge>Какво предлагаме</SectionBadge>
            <h2
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]"
              style={{
                color: "var(--color-dark)",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontWeight: 900,
                fontStretch: "125%",
              }}
            >
              Нашите<br />
              <span className="text-primary">услуги</span>
            </h2>
            <p className="mt-5 text-slate-500 text-base leading-relaxed max-w-xs">
              Комплексни финансови решения, създадени за Вашия бизнес.
            </p>
            <div className="mt-8">
              <PremiumCTA href="/uslugi">
                Всички услуги
                <ArrowRight className="w-4 h-4" />
              </PremiumCTA>
            </div>
          </motion.div>

          {/* Right — service list */}
          <div className="space-y-3">
            {serviceItems.map((service, index) => (
              <motion.div key={service.name} {...anim(0.1 + index * 0.08)}>
                <Link href={getServiceLink(service.category)} className="group block">
                  <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all duration-300">
                    {/* Number */}
                    <span
                      className="absolute top-5 right-5 text-[2.5rem] font-black leading-none select-none text-slate-100 group-hover:text-primary/15 transition-colors duration-300"
                      style={{ fontVariationSettings: "'wght' 900, 'wdth' 125" }}
                    >
                      0{index + 1}
                    </span>

                    <div className="flex items-start gap-4 pr-12">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                        {renderIcon(service.icon)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <h3
                            className="text-base font-bold transition-colors duration-300 group-hover:text-primary"
                            style={{ color: "var(--color-dark)" }}
                          >
                            {service.name}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
