"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from "lucide-react";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { urlFor } from "@/lib/sanity/client";
import type { Testimonial } from "@/types";

// Opens directly to the Reviews tab on Google Maps
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Takiev+Finance+EOOD/@42.6977079,23.3198779,17z/data=!4m7!3m6!1s0x40aa855eff40e335:0xa7cffc05e42a4e56!8m2!3d42.6977079!4d23.3198779!9m1!1b1";


function GoogleGIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

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
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05]"
              style={{
                color: "var(--color-dark)",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontWeight: 900,
                fontStretch: "125%",
              }}
            >
              Какво казват<br />
              <span className="text-primary">нашите клиенти</span>
            </h2>
            {/* Google Rating Badge */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Такиев Финанс — отзиви в Google"
              className="mt-5 inline-flex items-stretch overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group cursor-pointer"
            >
              {/* Google branding column */}
              <div className="flex flex-col items-center justify-center gap-1.5 px-4 py-3.5 bg-white">
                <GoogleGIcon size={24} />
                <span
                  className="font-body font-semibold text-slate-400 uppercase leading-none"
                  style={{ fontSize: 8, letterSpacing: "0.18em" }}
                >
                  Google
                </span>
              </div>

              {/* Hairline */}
              <div className="w-px bg-slate-100 self-stretch" />

              {/* Stars column */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-white group-hover:bg-slate-50/60 transition-colors duration-300">
                <div className="flex gap-[3px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      style={{ width: 16, height: 16, color: "#F59E0B", fill: "#F59E0B" }}
                    />
                  ))}
                </div>

                <ArrowUpRight
                  className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            </a>
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
                  className="w-11 h-11 rounded-full border-2 border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-11 h-11 rounded-full border-2 border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center"
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
              {/* Ghost company name watermark */}
              <div
                className="text-[3.5rem] md:text-[5.5rem] leading-none select-none -mb-4 md:-mb-6 overflow-hidden whitespace-nowrap"
                style={{
                  color: "#f1f5f9",
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 700,
                  maxWidth: "100%",
                }}
              >
                {current.clientCompany}
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
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 flex-shrink-0">
                    <Image
                      src={urlFor(current.avatar).width(160).height(160).fit("crop").auto("format").url()}
                      alt={current.clientName}
                      fill
                      sizes="80px"
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
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      lineHeight: 1.3,
                      color: "#0a7267",
                    }}
                  >
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
