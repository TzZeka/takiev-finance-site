"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";

interface ServicesPreviewProps {
  services: Service[];
}

const serviceItems = [
  {
    name: "Счетоводни услуги",
    icon: "chart",
    description: "Пълно счетоводно обслужване за вашия бизнес — от първичните документи до годишното приключване.",
    category: "Счетоводни",
    accent: "from-primary to-emerald-400",
    iconBg: "bg-primary/10",
  },
  {
    name: "Данъчни консултации",
    icon: "calculator",
    description: "Експертни данъчни решения, планиране и оптимизация за спестяване на средства.",
    category: "Данъчни",
    accent: "from-blue-500 to-indigo-400",
    iconBg: "bg-blue-500/10",
  },
  {
    name: "Правни услуги",
    icon: "scale",
    description: "Правна защита, съвети и представителство по търговски и данъчни въпроси.",
    category: "Правни",
    accent: "from-amber-500 to-orange-400",
    iconBg: "bg-amber-500/10",
  },
  {
    name: "Регистрация на дружества",
    icon: "building",
    description: "Бърза и надеждна регистрация на ЕООД, ООД, ЕТ и всички видове дружества.",
    category: "Регистрация",
    accent: "from-violet-500 to-purple-400",
    iconBg: "bg-violet-500/10",
  },
];

const renderIcon = (iconType: string) => {
  const cls = "w-7 h-7";
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

  const anim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5, delay },
        };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div {...anim(0)} className="text-center mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Какво предлагаме
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Нашите <span className="text-primary">услуги</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-primary to-emerald-400 mx-auto rounded-full" />
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {serviceItems.map((service, index) => (
            <motion.div key={service.name} {...anim(0.1 + index * 0.1)}>
              <Link href={getServiceLink(service.category)} className="group block h-full">
                <div className="relative h-full rounded-2xl border border-slate-200 bg-slate-50/50 p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 overflow-hidden">
                  {/* Gradient accent line on left */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${service.accent} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0 text-slate-600 group-hover:scale-110 transition-transform duration-300`}>
                      {renderIcon(service.icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div {...anim(0.5)} className="text-center mt-12">
          <Link
            href="/uslugi"
            className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-primary hover:shadow-lg"
          >
            Всички услуги
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
