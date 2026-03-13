"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { TextPressure } from "@/components/ui/TextPressure";

interface HeroSectionProps {
  motto: string;
}

interface Slide {
  video: string;
  badge: string;
  badgeIcon: "award" | "trending";
  heading: string;
  highlight: string;
  /** Sentence marked with `*` prefix will render larger */
  descriptionLines: string[];
  primaryCta: { label: string; href: string; icon: "arrow" } | null;
  secondaryCta: { label: string; href: string; icon: "arrow" | "none" } | null;
  /** When true: no text overlay, no blur — pure cinematic video */
  noContent?: boolean;
}

const slides: Slide[] = [
  {
    video: "/firm-logo/hero-video/hero-section-video-handshake.mp4",
    badge: "",
    badgeIcon: "award",
    heading: "Избери своя доверен",
    highlight: "БИЗНЕС ПАРТНЬОР",
    descriptionLines: [], // filled from motto prop at render time
    primaryCta: { label: "Изпрати запитване", href: "/kontakti", icon: "arrow" },
    secondaryCta: { label: "Разгледай услугите", href: "/uslugi", icon: "arrow" },
  },
  {
    video: "/firm-logo/hero-video/hero-section-video-2.mp4",
    badge: "",
    badgeIcon: "trending",
    heading: "",
    highlight: "",
    descriptionLines: [],
    primaryCta: null,
    secondaryCta: null,
    noContent: true, // pure cinematic slide — no text, no blur
  },
];

const SLIDE_INTERVAL = 8000;

function MagneticButton({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary";
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xS = useSpring(x, { stiffness: 400, damping: 30 });
  const yS = useSpring(y, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={btnRef}
      href={href}
      style={{ x: xS, y: yS }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl cursor-pointer ${
        isPrimary
          ? "bg-[#0E8A83] text-white shadow-lg shadow-[#19BFB7]/20"
          : "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
      }`}
    >
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
        }}
        initial={{ x: "-150%" }}
        whileHover={{ x: "150%" }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Hover bg brightening */}
      <motion.span
        aria-hidden
        className={`absolute inset-0 rounded-xl pointer-events-none ${
          isPrimary ? "bg-[#19BFB7]" : "bg-white/10"
        }`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

export function HeroSection({ motto }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  // Manual slide change — stop auto-rotation
  const goToSlide = useCallback((index: number) => {
    setAutoPlay(false);
    setActiveIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const dragStart = useRef<number | null>(null);

  // Restart video from beginning when it becomes active
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [activeIndex]);

  // Auto-rotate only while autoPlay is true
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [autoPlay, nextSlide]);

  // Build per-sentence description lines for the current slide
  const mottoLines = (() => {
    // Split motto into sentences, drop the heading-duplicate first sentence
    const sentences = motto
      .split(/(?<=\.)\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    // Remove sentence that duplicates the heading text
    const filtered = sentences.filter(
      (s) => !s.replace(/\.$/, "").includes("Избери своя доверен бизнес партньор")
    );
    // Mark the "driving force" sentence as large with * prefix
    return filtered.map((s) =>
      s.includes("Счетоводството е движеща сила") ? `*${s}` : s
    );
  })();

  const currentSlide = {
    ...slides[activeIndex],
    descriptionLines: activeIndex === 0 ? mottoLines : slides[activeIndex].descriptionLines,
  };

  const fadeDuration = prefersReducedMotion ? 0 : 0.8;
  const crossfadeDuration = prefersReducedMotion ? "duration-0" : "duration-[2000ms]";

  return (
    <section
      role="region"
      aria-label="Начален екран"
      className="relative min-h-screen flex items-start justify-center text-white overflow-hidden"
      onPointerDown={(e) => { dragStart.current = e.clientX; }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const delta = e.clientX - dragStart.current;
        if (Math.abs(delta) > 50) delta < 0 ? goToNext() : goToPrevious();
        dragStart.current = null;
      }}
    >
      {/* Video carousel layer */}
      {slides.map((slide, index) => (
        <video
          key={slide.video}
          ref={(el) => { videoRefs.current[index] = el; }}
          autoPlay={index === 0}
          loop={autoPlay}
          muted
          playsInline
          preload={index === 0 ? "metadata" : "none"}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity ${crossfadeDuration} ease-in-out ${
            slide.noContent ? "" : "blur-[2px]"
          } ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        >
          <source src={slide.video} type="video/mp4" />
        </video>
      ))}

      {/* Dark overlay gradient — fades out for noContent (cinematic) slides */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
        animate={{ opacity: currentSlide.noContent ? 0.18 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Text content layer — hidden for noContent slides */}
      {!currentSlide.noContent && (
        <div className="relative container mx-auto px-4 z-10 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 30, mass: 1 }}
              className="max-w-4xl space-y-5 pt-[18vh] md:pt-[20vh] xl:pt-[22vh]"
            >
              {/* Eyebrow */}
              <motion.div
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
              >
                <span className="h-px w-10 bg-primary/50" />
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-primary/80">
                  {currentSlide.badge || "Такиев Финанс"}
                </span>
                <span className="h-px w-10 bg-primary/50" />
              </motion.div>

              {/* Heading */}
              <h1 className="font-extrabold leading-[1.05] tracking-tight drop-shadow-lg">
                <span className="block text-fluid-hero text-white">
                  {currentSlide.heading}
                </span>
                {currentSlide.highlight && (
                  <span className="block text-[1.2em] bg-gradient-to-r from-[#19BFB7] to-[#15E6DB] bg-clip-text text-transparent">
                    <TextPressure
                      text={currentSlide.highlight}
                      minWeight={300}
                      maxWeight={900}
                      minWidth={80}
                      maxWidth={125}
                      radius={320}
                      className="text-[1em]"
                    />
                  </span>
                )}
              </h1>

              {/* Description — each sentence on its own line */}
              {currentSlide.descriptionLines.length > 0 && (
                <motion.div
                  className="flex flex-col items-center gap-3 max-w-xl mx-auto min-h-[100px]"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 24, delay: 0.3 }}
                >
                  <span className="block w-10 h-px bg-primary/40" />
                  {currentSlide.descriptionLines.map((line, i) => {
                    const isLarge = line.startsWith("*");
                    const text = isLarge ? line.slice(1) : line;
                    return (
                      <p
                        key={i}
                        className={
                          isLarge
                            ? "text-lg sm:text-xl md:text-2xl text-white font-semibold tracking-wide text-center leading-snug"
                            : "text-sm sm:text-base md:text-lg text-white/70 font-medium tracking-wide text-center leading-relaxed"
                        }
                      >
                        {text}
                      </p>
                    );
                  })}
                </motion.div>
              )}

              {/* CTA Buttons */}
              {(currentSlide.primaryCta || currentSlide.secondaryCta) && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 30, delay: 0.35 }}
                >
                  {currentSlide.primaryCta && (
                    <MagneticButton href={currentSlide.primaryCta.href} variant="primary">
                      {currentSlide.primaryCta.label}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </MagneticButton>
                  )}
                  {currentSlide.secondaryCta && (
                    <MagneticButton href={currentSlide.secondaryCta.href} variant="secondary">
                      {currentSlide.secondaryCta.label}
                      {currentSlide.secondaryCta.icon !== "none" && (
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </MagneticButton>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Arrow navigation */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </section>
  );
}
