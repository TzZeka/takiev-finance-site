"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
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

  const currentTestimonial = testimonials[currentIndex];

  const anim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5, delay },
        };

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div {...anim(0)} className="text-center mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Отзиви
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Какво казват <span className="text-primary">нашите клиенти</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Довери на опита на клиентите, които работят с нас
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div {...anim(0.15)} className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-md overflow-hidden">
              {/* Top gradient accent */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-primary" />

              <div className="p-8 md:p-12 relative">
                {/* Large decorative quote */}
                <div className="absolute top-6 right-8 text-[120px] md:text-[160px] leading-none font-serif text-primary/[0.05] select-none pointer-events-none">
                  &ldquo;
                </div>

                <Quote className="h-8 w-8 text-primary/20 mb-6" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed font-light relative z-10">
                      &ldquo;{currentTestimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center pt-6 border-t border-slate-200">
                      {currentTestimonial.avatar && (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-primary/15 ring-offset-2">
                          <Image
                            src={getImageUrl(currentTestimonial.avatar)}
                            alt={currentTestimonial.clientName}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 text-lg">
                          {currentTestimonial.clientName}
                        </p>
                        <p className="text-slate-500 text-sm">
                          {currentTestimonial.clientRole}
                        </p>
                        <p className="text-primary text-sm font-semibold">
                          {currentTestimonial.clientCompany}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-14 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:border-primary hover:text-primary hover:shadow-md transition-all duration-300 shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-14 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:border-primary hover:text-primary hover:shadow-md transition-all duration-300 shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center mt-8 gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2.5 bg-gradient-to-r from-primary to-emerald-400"
                      : "w-2.5 h-2.5 bg-slate-300 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
