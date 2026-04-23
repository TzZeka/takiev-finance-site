"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
    image: "/firm-logo/uslugi/счетоводни-услуги.png",
    description: "Пълно счетоводно обслужване за вашия бизнес — от първичните документи до годишното приключване.",
    href: "/uslugi/schetovodni-uslugi",
  },
  {
    name: "Данъчни консултации",
    image: "/firm-logo/uslugi/данъчни-консултации.png",
    description: "Експертни данъчни решения, планиране и оптимизация за спестяване на средства.",
    href: "/uslugi/danachni-konsultacii",
  },
  {
    name: "Правни услуги",
    image: "/firm-logo/uslugi/правни-услуги.png",
    description: "Правна защита, съвети и представителство по търговски и данъчни въпроси.",
    href: "/uslugi/pravni-uslugi",
  },
  {
    name: "Регистрация на дружества",
    image: "/firm-logo/uslugi/регистрация-на-фирми.png",
    description: "Бърза и надеждна регистрация на ЕООД, ООД, ЕТ и всички видове дружества.",
    href: "/uslugi/registraciq-na-firmi",
  },
];

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

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
      className="relative pt-20 pb-28 md:pt-28 md:pb-36 bg-white overflow-hidden shadow-sm"
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
              className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05]"
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
              <PremiumCTA href="/uslugi" variant="light">
                Всички услуги
                <ArrowRight className="w-4 h-4" />
              </PremiumCTA>
            </div>
          </motion.div>

          {/* Right — service list */}
          <div className="space-y-3">
            {serviceItems.map((service, index) => (
              <motion.div key={service.name} {...anim(0.1 + index * 0.08)}>
                <Link href={service.href} className="group block">
                  <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-5">
                      {/* Service image */}
                      <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className="transition-colors duration-300 group-hover:text-primary"
                            style={{
                              color: "var(--color-dark)",
                              fontFamily: "'Cormorant Garamond', serif",
                              fontWeight: 800,
                              fontStyle: "italic",
                              fontSize: "1.4rem",
                            }}
                          >
                            {service.name}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                        </div>
                        <p className="text-slate-500 text-base leading-relaxed">
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
