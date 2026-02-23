"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

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
  secondaryCta: { label: string; href: string; icon: "arrow" | "none" };
}

const slides: Slide[] = [
  {
    video: "/firm-logo/hero-video/hero-section-video-handshake.mp4",
    badge: "",
    badgeIcon: "award",
    heading: "Избери своя доверен",
    highlight: "бизнес партньор",
    descriptionLines: [], // filled from motto prop at render time
    primaryCta: { label: "Изпрати запитване", href: "/kontakti", icon: "arrow" },
    secondaryCta: { label: "Разгледай услугите", href: "/uslugi", icon: "arrow" },
  },
  {
    video: "/firm-logo/hero-video/hero-section-video-2.mp4",
    badge: "Експертни финансови решения",
    badgeIcon: "trending",
    heading: "Вашият бизнес расте,",
    highlight: "ние го подкрепяме",
    descriptionLines: [
      "Професионално счетоводство, данъчни консултации и правни услуги.",
      "Всичко, от което вашият бизнес се нуждае на едно място.",
    ],
    primaryCta: null,
    secondaryCta: { label: "Кои сме ние?", href: "/za-nas", icon: "none" },
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
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
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
          className={`absolute inset-0 w-full h-full object-cover scale-105 blur-[2px] transition-opacity ${crossfadeDuration} ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={slide.video} type="video/mp4" />
        </video>
      ))}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Text content layer */}
      <div className="relative container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 30, mass: 1 }}
            className="max-w-4xl space-y-6 pt-20 md:pt-24 xl:pt-28"
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
              <span className="block text-[1.2em] bg-gradient-to-r from-[#19BFB7] to-[#15E6DB] bg-clip-text text-transparent relative">
                {currentSlide.highlight}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#19BFB7] to-[#15E6DB] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 28, delay: 0.4 }}
                />
              </span>
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
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
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
              <MagneticButton href={currentSlide.secondaryCta.href} variant="secondary">
                {currentSlide.secondaryCta.label}
                {currentSlide.secondaryCta.icon !== "none" && (
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-10 h-2 bg-[#19BFB7] shadow-sm shadow-[#19BFB7]/50"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
