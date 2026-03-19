"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { getImageUrl } from "@/lib/sanity/client";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (testimonials.length === 0) return null;

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const current = testimonials[currentIndex];
  const total = String(testimonials.length).padStart(2, "0");
  const idx = String(currentIndex + 1).padStart(2, "0");

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

        {/* Header row — title left, nav right */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="flex items-end justify-between mb-14 md:mb-20"
        >
          <div>
            <SectionBadge>Отзиви</SectionBadge>
            <h2
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]"
              style={{
                color: "var(--color-dark)",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontWeight: 900,
                fontStretch: "125%",
              }}
            >
              Клиентите<br />
              <span className="text-primary">говорят</span>
            </h2>
          </div>

          {/* Counter + nav */}
          {testimonials.length > 1 && (
            <div className="flex flex-col items-end gap-4">
              <span
                className="text-slate-300 font-black text-lg tracking-wider select-none"
                style={{ fontVariationSettings: "'wght' 900" }}
              >
                {idx}
                <span className="text-slate-200 font-light mx-1">/</span>
                {total}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="w-11 h-11 rounded-full border-2 border-slate-200 text-slate-400 hover:border-dark hover:text-dark transition-all duration-300 flex items-center justify-center"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-11 h-11 rounded-full border-2 border-slate-200 text-slate-400 hover:border-dark hover:text-dark transition-all duration-300 flex items-center justify-center"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Testimonial body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-start"
          >
            {/* Left — quote */}
            <div>
              {/* Ghost number */}
              <div
                className="text-[7rem] md:text-[10rem] font-black leading-none select-none -mb-6 md:-mb-10"
                style={{
                  color: "#f1f5f9",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                }}
              >
                {idx}
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl text-slate-700 leading-relaxed font-light relative z-10">
                &ldquo;{current.content}&rdquo;
              </p>
            </div>

            {/* Right — author card */}
            <div className="flex flex-col gap-5 pt-2">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < current.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                {current.avatar && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 flex-shrink-0">
                    <Image
                      src={getImageUrl(current.avatar)}
                      alt={current.clientName}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p
                    className="font-bold text-base"
                    style={{ color: "var(--color-dark)", fontVariationSettings: "'wght' 700" }}
                  >
                    {current.clientName}
                  </p>
                  <p className="text-sm text-slate-400">{current.clientRole}</p>
                  <p className="text-sm text-primary font-semibold mt-0.5">
                    {current.clientCompany}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        {testimonials.length > 1 && (
          <div className="flex items-center gap-2 mt-14">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-10 h-2 bg-primary"
                    : "w-2 h-2 bg-slate-200 hover:bg-primary/40"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </motion.section>
  );
}
