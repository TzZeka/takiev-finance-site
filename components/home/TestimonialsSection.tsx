"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (testimonials.length === 0) return null;

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#19BFB7 1px, transparent 1px),
              linear-gradient(90deg, #19BFB7 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#19BFB7] tracking-wider uppercase">
              Отзиви
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Какво казват <span className="text-[#19BFB7]">нашите клиенти</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Довери на опита на клиентите, които работят с нас
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Card */}
            <div
              className={`relative bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl transition-all duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Top accent bar */}
              <div className="h-2 bg-gradient-to-r from-[#19BFB7] to-[#40514E] rounded-t-2xl" />

              <div className="p-8 md:p-12">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="h-12 w-12 text-[#19BFB7]/20" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating
                          ? "text-[#19BFB7] fill-[#19BFB7]"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-light">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </p>

                {/* Client Info */}
                <div className="flex items-center pt-6 border-t-2 border-slate-200 dark:border-slate-800">
                  {currentTestimonial.avatar && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-[#19BFB7]/20">
                      <Image
                        src={getImageUrl(currentTestimonial.avatar)}
                        alt={currentTestimonial.clientName}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">
                      {currentTestimonial.clientName}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {currentTestimonial.clientRole}
                    </p>
                    <p className="text-[#19BFB7] text-sm font-semibold">
                      {currentTestimonial.clientCompany}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={isAnimating}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white dark:bg-slate-950 border-2 border-[#19BFB7] text-[#19BFB7] flex items-center justify-center hover:bg-[#19BFB7] hover:text-white transition-all duration-300 disabled:opacity-50 shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={isAnimating}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white dark:bg-slate-950 border-2 border-[#19BFB7] text-[#19BFB7] flex items-center justify-center hover:bg-[#19BFB7] hover:text-white transition-all duration-300 disabled:opacity-50 shadow-lg"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  disabled={isAnimating}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-2 bg-[#19BFB7]"
                      : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-[#19BFB7]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {[
            { number: "100+", label: "Доволни клиенти" },
            { number: "15+", label: "Години опит" },
            { number: "99%", label: "Успешност" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="text-4xl md:text-5xl font-bold text-[#19BFB7] mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
