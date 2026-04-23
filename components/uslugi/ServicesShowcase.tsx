"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { servicesConfig, type ServiceConfig } from "@/lib/services-config";

const SPRING_SOFT  = { type: "spring", stiffness: 280, damping: 24 } as const;
const SPRING_CRISP = { type: "spring", stiffness: 480, damping: 22 } as const;
const EASE_OUT     = [0.22, 1, 0.36, 1] as const;

const serviceImages: Record<string, string> = {
  schetovodstvo: "/firm-logo/uslugi/счетоводни-услуги.png",
  danaci:        "/firm-logo/uslugi/данъчни-консултации.png",
  pravni:        "/firm-logo/uslugi/правни-услуги.png",
  registraciq:   "/firm-logo/uslugi/регистрация-на-фирми.png",
};

const serviceHighlights: Record<string, string[]> = {
  schetovodstvo: [
    "Месечно счетоводно обслужване",
    "Годишно приключване",
    "ТРЗ и работни заплати",
    "Счетоводство за физически лица",
  ],
  danaci: [
    "ДДС регистрация и отчитане",
    "Данъчно планиране",
    "Представителство пред НАП",
    "Данъчни декларации",
  ],
  pravni: [
    "Изготвяне на договори",
    "Трудово право",
    "Търговско право",
    "Правни консултации",
  ],
  registraciq: [
    "Регистрация на ЕООД/ООД",
    "Регистрация на ЕТ",
    "Промени в обстоятелства",
    "Ликвидация на фирми",
  ],
};

/* ─────────────────────────────────────────────────────────────────────────── */

export function ServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const active: ServiceConfig    = servicesConfig[activeIdx];
  const highlights: string[]     = serviceHighlights[active.id] ?? [];
  const imageSrc: string         = serviceImages[active.id] ?? "";

  const others: Array<{ svc: ServiceConfig; originalIdx: number }> =
    servicesConfig
      .map((svc, i) => ({ svc, originalIdx: i }))
      .filter(({ originalIdx }) => originalIdx !== activeIdx);

  const contentVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0,
      transition: { duration: 0.45, ease: EASE_OUT as [number,number,number,number] } },
    exit:    { opacity: 0, y: prefersReducedMotion ? 0 : -12,
      transition: { duration: 0.3, ease: [0.55,0,0.1,1] as [number,number,number,number] } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 1.03 },
    animate: { opacity: 1, scale: 1,
      transition: { duration: 0.55, ease: EASE_OUT as [number,number,number,number] } },
    exit:    { opacity: 0, scale: prefersReducedMotion ? 1 : 0.98,
      transition: { duration: 0.3, ease: [0.55,0,0.1,1] as [number,number,number,number] } },
  };

  return (
    <motion.div
      className="w-full overflow-hidden lg:sticky"
      style={{ top: 0, zIndex: 1, borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem" }}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, clipPath: "inset(0 0 18% 0 round 2.5rem 2.5rem 0 0)" }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, clipPath: "inset(0 0 0% 0 round 2.5rem 2.5rem 0 0)" }
      }
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.85, ease: EASE_OUT }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[42%_1fr] w-full lg:h-[90dvh]">

        {/* ── Left panel — text content ── */}
        <div
          className="relative flex flex-col justify-start lg:justify-center
                     px-5 sm:px-8 md:px-12 lg:px-14
                     py-8 sm:py-10 lg:py-16"
          style={{ backgroundColor: "#060e0c" }}
        >
          <div
            aria-hidden
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to left, transparent 0%, #060e0c 100%)" }}
          />

          {prefersReducedMotion ? (
            <div className="relative z-20 flex flex-col gap-4 sm:gap-5 lg:gap-6 max-w-lg">
              <ServiceContent
                active={active} highlights={highlights}
                activeIdx={activeIdx} onDotClick={setActiveIdx}
              />
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                variants={contentVariants}
                initial="initial" animate="animate" exit="exit"
                className="relative z-20 flex flex-col gap-4 sm:gap-5 lg:gap-6 max-w-lg"
              >
                <ServiceContent
                  active={active} highlights={highlights}
                  activeIdx={activeIdx} onDotClick={setActiveIdx}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── Right panel — image ── */}
        <div className="relative h-[44vh] sm:h-[52vh] lg:h-auto lg:min-h-0 overflow-hidden">

          {prefersReducedMotion ? (
            <div className="absolute inset-0">
              <Image src={imageSrc} alt={active.title} fill
                sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" priority />
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                variants={imageVariants}
                initial="initial" animate="animate" exit="exit"
                className="absolute inset-0"
              >
                <Image src={imageSrc} alt={active.title} fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover" priority={activeIdx === 0} />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Left gradient (desktop) */}
          <div aria-hidden
            className="hidden lg:block absolute inset-y-0 left-0 w-[55%] pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, #060e0c 0%, rgba(6,14,12,0.4) 25%, transparent 55%)",
            }}
          />

          {/* Bottom gradient */}
          <div aria-hidden
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: "160px",
              background: "linear-gradient(to top, rgba(6,14,12,0.80) 0%, transparent 100%)",
            }}
          />

          {/* ── Thumbnail navigation ── */}
          <div
            className="absolute bottom-4 left-0 right-0 z-20
                       flex items-end justify-center gap-2 px-4
                       lg:bottom-6 lg:left-auto lg:right-28 lg:justify-end lg:gap-2.5 lg:px-0"
            role="group"
            aria-label="Превключване на услуга"
          >
            {others.map(({ svc, originalIdx }) => (
              /*
               * Variant propagation: button is the root "hover" emitter.
               * All child motion elements receive the same variant string.
               */
              <motion.button
                key={svc.id}
                onClick={() => setActiveIdx(originalIdx)}
                aria-label={`Покажи ${svc.title}`}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  rest: { borderColor: "rgba(255,255,255,0.22)" },
                  hover: { borderColor: "rgba(25,191,183,0.70)" },
                  tap:   { scale: 0.96 },
                }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group/card relative flex-shrink-0 rounded-xl overflow-hidden
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                           w-[84px] h-[58px] sm:w-[100px] sm:h-[68px] lg:w-[110px] lg:h-[74px]"
                style={{ borderWidth: "1px", borderStyle: "solid" }}
              >
                {/* Image — brightens + zooms on hover */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: { scale: 1,    opacity: 0.55 },
                    hover: { scale: 1.09, opacity: 0.88 },
                  }}
                  transition={SPRING_SOFT}
                >
                  <Image
                    src={serviceImages[svc.id] ?? ""}
                    alt={svc.title} fill
                    sizes="(max-width: 640px) 84px, (max-width: 1024px) 100px, 110px"
                    className="object-cover"
                  />
                </motion.div>

                {/* Dark overlay — lifts on hover */}
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    rest: { backgroundColor: "rgba(0,0,0,0.38)" },
                    hover: { backgroundColor: "rgba(0,0,0,0.06)" },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Label — static, no nudge */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-2 py-1"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                  }}
                >
                  <span
                    className="font-body font-medium text-white block leading-tight"
                    style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.92)" }}
                  >
                    {svc.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* ServiceContent sub-component                                                */
/* ─────────────────────────────────────────────────────────────────────────── */

interface ServiceContentProps {
  active: ServiceConfig;
  highlights: string[];
  activeIdx: number;
  onDotClick: (idx: number) => void;
}

function ServiceContent({ active, highlights, activeIdx, onDotClick }: ServiceContentProps) {
  return (
    <>
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(1.7rem, 5vw, 4rem)",
          color: "#ffffff",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {active.title}
      </h2>

      {/* Description */}
      <p
        className="font-body"
        style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(1rem, 1.4vw, 1.02rem)", lineHeight: 1.75, margin: 0 }}
      >
        {active.description}
      </p>

      {/* Highlights */}
      <ul className="flex flex-col gap-2 sm:gap-2.5" role="list">
        {highlights.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle className="flex-shrink-0 text-primary" style={{ width: 16, height: 16 }} aria-hidden />
            <span className="font-body" style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* ── "Виж повече" — variant propagation: circle fills, arrow shoots diagonally ── */}
      <motion.div initial="rest" whileHover="hover" style={{ display: "inline-block", alignSelf: "flex-start" }}>
        <Link
          href={`/uslugi/${active.slug}`}
          className="inline-flex items-center gap-3 font-body font-medium"
          style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.95rem" }}
        >
          <span className="tracking-wide">Виж повече</span>

          {/* Circle — border glows, background fills */}
          <motion.span
            className="inline-flex items-center justify-center rounded-full"
            style={{ width: 36, height: 36, borderWidth: "1px", borderStyle: "solid" }}
            variants={{
              rest: {
                borderColor: "rgba(255,255,255,0.28)",
                backgroundColor: "rgba(25,191,183,0)",
                scale: 1,
              },
              hover: {
                borderColor: "rgba(25,191,183,1)",
                backgroundColor: "rgba(25,191,183,0.18)",
                scale: 1.15,
              },
            }}
            transition={SPRING_SOFT}
          >
            {/* Arrow — shoots to top-right on hover */}
            <motion.span
              variants={{
                rest:  { x: 0,  y: 0  },
                hover: { x: 3,  y: -3 },
              }}
              transition={SPRING_CRISP}
            >
              <ArrowUpRight className="text-primary" style={{ width: 16, height: 16 }} aria-hidden />
            </motion.span>
          </motion.span>
        </Link>
      </motion.div>

      {/* ── Arrow navigation — icon nudges in its direction on hover ── */}
      <div className="flex items-center gap-3 pt-1 sm:pt-2">

        {/* Left */}
        <motion.button
          onClick={() => onDotClick((activeIdx - 1 + servicesConfig.length) % servicesConfig.length)}
          aria-label="Предишна услуга"
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          variants={{
            rest:  { borderColor: "rgba(255,255,255,0.28)", backgroundColor: "rgba(255,255,255,0.00)" },
            hover: { borderColor: "rgba(25,191,183,1)",     backgroundColor: "rgba(25,191,183,0.10)" },
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex items-center justify-center rounded-full
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ width: 44, height: 44, borderWidth: "1px", borderStyle: "solid" }}
        >
          <motion.span
            variants={{ rest: { x: 0 }, hover: { x: -4 } }}
            transition={SPRING_CRISP}
          >
            <ChevronLeft className="text-white" style={{ width: 18, height: 18 }} aria-hidden />
          </motion.span>
        </motion.button>

        {/* Right */}
        <motion.button
          onClick={() => onDotClick((activeIdx + 1) % servicesConfig.length)}
          aria-label="Следваща услуга"
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          variants={{
            rest:  { borderColor: "rgba(255,255,255,0.28)", backgroundColor: "rgba(255,255,255,0.00)" },
            hover: { borderColor: "rgba(25,191,183,1)",     backgroundColor: "rgba(25,191,183,0.10)" },
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="inline-flex items-center justify-center rounded-full
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ width: 44, height: 44, borderWidth: "1px", borderStyle: "solid" }}
        >
          <motion.span
            variants={{ rest: { x: 0 }, hover: { x: 4 } }}
            transition={SPRING_CRISP}
          >
            <ChevronRight className="text-white" style={{ width: 18, height: 18 }} aria-hidden />
          </motion.span>
        </motion.button>

        {/* Counter — mobile only */}
        <span
          className="lg:hidden font-body ml-1"
          style={{ color: "rgba(255,255,255,0.50)", fontSize: "0.82rem" }}
          aria-live="polite"
          aria-atomic="true"
        >
          {activeIdx + 1} / {servicesConfig.length}
        </span>
      </div>
    </>
  );
}
