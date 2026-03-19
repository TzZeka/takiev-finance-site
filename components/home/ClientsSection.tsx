"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type MotionProps, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import type { Client } from "@/types";
import { useImageParallax } from "@/hooks/useScrollAnim";


interface ClientsSectionProps {
  clients: Client[];
}

/* ─── Framer Motion variants ─────────────────────────────────── */

const cardVariants = {
  rest:    { y: 0,  scale: 1 },
  hovered: { y: -6, scale: 1.018 },
};

const imageVariants = {
  rest:    { scale: 1 },
  hovered: { scale: 1 },
};

const shimmerVariants = {
  rest:    { x: "-140%", opacity: 0 },
  hovered: { x:  "140%", opacity: 1 },
};

const glowVariants = {
  rest:    { opacity: 0 },
  hovered: { opacity: 1 },
};

const arrowVariants: Variants = {
  rest: { x: 0, y: 0, opacity: 0.6, scale: 1 },
  hovered: {
    /* Phase 1 (0–28%): shoots out top-right, fades out          */
    /* Phase 2 (28–55%): invisible, teleports to bottom-left     */
    /* Phase 3 (55–100%): slides in from bottom-left, settles    */
    x:       [0,  22,  -14,  5],
    y:       [0, -22,   14, -5],
    opacity: [0.6,  0,  0.7,  1],
    scale:   [1, 0.6,  1.2,   1],
    transition: {
      duration: 0.52,
      times:    [0, 0.28, 0.55, 1],
      ease:     ["easeIn", "linear", "easeOut"],
    },
  },
};

/** Bottom reveal — gradient + name slides up from below */
const overlayVariants = {
  rest:    { y: "100%", opacity: 0 },
  hovered: { y: "0%",   opacity: 1 },
};

const nameLabelVariants = {
  rest:    { y: 12, opacity: 0 },
  hovered: { y: 0,  opacity: 1 },
};

/* ─── PartnerCard ────────────────────────────────────────────── */

function PartnerCard({
  partner,
  index,
  anim,
  reduced,
}: {
  partner: Client;
  index: number;
  anim: (d: number) => object;
  reduced: boolean;
}) {
  const hasCard = !!partner.cardImage?.asset?._ref;
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  useImageParallax(imgContainerRef, imgInnerRef);

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 22 };

  const shimmerTransition = reduced
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

  /*
   * CARD HEIGHT — explicit pixels via clamp().
   * "block" is required on <a> because <a> is inline by default
   * and height has no effect on inline elements.
   */
  const CARD_H = "clamp(300px, 32vw, 500px)";

  const sharedCardClass =
    "group relative block w-full rounded-2xl overflow-hidden border border-white/[0.08] hover:border-primary/40 shadow-lg hover:shadow-2xl hover:shadow-primary/15 transition-[border-color,box-shadow] duration-300";

  /*
   * Inner layers — all absolutely positioned relative to the card.
   * The card itself is `position: relative` (via `relative` class).
   */
  const inner = (
    <>
      {hasCard ? (
        /*
         * Layer 0 — card image.
         * <img> fills the card via absolute inset-0 + w-full/h-full.
         * We use a plain <img> (not next/image fill) because fill requires
         * position:relative on its direct parent, which conflicts with
         * the scale() animation wrapper needing absolute positioning.
         */
        <motion.div
          ref={imgContainerRef}
          variants={imageVariants}
          transition={spring}
          className="absolute inset-0 overflow-hidden"
        >
          <div
            ref={imgInnerRef}
            style={{ position: "absolute", inset: "-15%", willChange: "transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(partner.cardImage!)}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      ) : (
        /*
         * Layer 0 — fallback dark card (no cardImage uploaded).
         * Shows logo + company name + arrow if has website.
         */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-br from-[#2e3e3b] to-[#1e2e2b]">
          <div className="relative w-36 h-20">
            <Image
              src={getImageUrl(partner.logo)}
              alt={partner.name}
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-white/40">
            {partner.name}
          </p>
          {partner.website && (
            <motion.div
              variants={arrowVariants}
              transition={spring}
              className="absolute top-4 right-4"
            >
              <ArrowUpRight
                className="w-7 h-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                strokeWidth={2.8}
              />
            </motion.div>
          )}
        </div>
      )}

      {/* Layer 1 — bottom reveal overlay (card images only) */}
      {hasCard && (
        <motion.div
          variants={overlayVariants}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="absolute inset-x-0 bottom-0 z-20 pointer-events-none px-5 pb-5 pt-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent"
        >
          <motion.p
            variants={nameLabelVariants}
            transition={{ type: "spring", stiffness: 340, damping: 32, delay: 0.04 }}
            className="text-white font-semibold text-base tracking-wide leading-tight"
          >
            {partner.name}
          </motion.p>
          {partner.website && (
            <motion.p
              variants={nameLabelVariants}
              transition={{ type: "spring", stiffness: 340, damping: 32, delay: 0.08 }}
              className="text-primary text-xs tracking-widest uppercase mt-1 font-medium"
            >
              Посети сайта
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Layer 2 — arrow on card images (only when has website) */}
      {hasCard && partner.website && (
        <motion.div
          variants={arrowVariants}
          transition={spring}
          className="absolute top-4 right-4 z-20 pointer-events-none"
        >
          <ArrowUpRight
            className="w-7 h-7 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            strokeWidth={2.8}
          />
        </motion.div>
      )}

      {/* Layer 1 — diagonal shimmer sweep (above image) */}
      {!reduced && (
        <motion.div
          variants={shimmerVariants}
          transition={shimmerTransition}
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ skewX: "-14deg" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </motion.div>
      )}

      {/* Layer 1 — teal ring glow */}
      <motion.div
        variants={glowVariants}
        transition={{ duration: 0.3 }}
        aria-hidden
        className="absolute inset-0 z-10 rounded-2xl ring-2 ring-primary/50 pointer-events-none"
      />

      {/* Layer 1 — bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center pointer-events-none" />
    </>
  );

  return (
    <motion.div {...(anim(0.08 * index) as object)}>
      {partner.website ? (
        <motion.a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={partner.name}
          variants={cardVariants}
          initial="rest"
          whileHover="hovered"
          animate="rest"
          transition={spring}
          className={sharedCardClass}
          style={{ height: CARD_H }}
        >
          {inner}
        </motion.a>
      ) : (
        <motion.div
          variants={cardVariants}
          initial="rest"
          whileHover="hovered"
          animate="rest"
          transition={spring}
          className={sharedCardClass}
          style={{ height: CARD_H }}
        >
          {inner}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── ClientsSection ─────────────────────────────────────────── */

export function ClientsSection({ clients }: ClientsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion() ?? false;

  if (clients.length === 0) return null;

  const anim = (delay: number): MotionProps =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
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
      className="relative py-20 md:py-28 overflow-hidden shadow-sm"
      style={{
        backgroundColor: "var(--color-dark)",
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        filter: "drop-shadow(0 -10px 20px rgba(0,0,0,0.10))",
      }}
    >
      {/* Radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div {...(anim(0) as object)} className="text-left md:text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Нашите <span className="text-primary">партньори</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl md:mx-auto">
            Сътрудничим с водещи компании за цялостни решения на Вашия бизнес
          </p>
        </motion.div>

        {/* Fluid auto-fill grid — columns reflow continuously, no breakpoint jumps */}
        <div
          className="grid gap-4 md:gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
        >
          {clients.map((partner, index) => (
            <PartnerCard
              key={partner._id}
              partner={partner}
              index={index}
              anim={anim}
              reduced={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
