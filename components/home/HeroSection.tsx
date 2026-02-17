"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface HeroSectionProps {
  motto: string;
}

interface Slide {
  video: string;
  badge: string;
  badgeIcon: "award" | "trending";
  heading: string;
  highlight: string;
  description: string;
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
    description: "",
    primaryCta: { label: "Изпрати запитване", href: "/kontakti", icon: "arrow" },
    secondaryCta: { label: "Разгледай услугите", href: "/uslugi", icon: "arrow" },
  },
  {
    video: "/firm-logo/hero-video/hero-section-video-2.mp4",
    badge: "Експертни финансови решения",
    badgeIcon: "trending",
    heading: "Вашият бизнес расте,",
    highlight: "ние го подкрепяме",
    description:
      "Професионално счетоводство, данъчни консултации и правни услуги. Всичко, от което вашият бизнес се нуждае на едно място.",
    primaryCta: null,
    secondaryCta: { label: "Кои сме ние?", href: "/za-nas", icon: "none" },
  },
];

const SLIDE_INTERVAL = 8000;

const CtaIcon = ({ type }: { type: "arrow" | "none" }) => {
  if (type === "none") return null;
  return <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />;
};

export function HeroSection({ motto }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  // Restart video from beginning when it becomes active
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlide = {
    ...slides[activeIndex],
    description: activeIndex === 0 ? motto : slides[activeIndex].description,
  };

  const fadeDuration = prefersReducedMotion ? 0 : 0.8;
  const crossfadeDuration = prefersReducedMotion ? "duration-0" : "duration-[2000ms]";

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Video carousel layer */}
      {slides.map((slide, index) => (
        <video
          key={slide.video}
          ref={(el) => { videoRefs.current[index] = el; }}
          autoPlay={index === 0}
          loop
          muted
          playsInline
          preload={index === 0 ? "metadata" : "none"}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity ${crossfadeDuration} ease-in-out ${
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
            transition={{ duration: fadeDuration, ease: "easeOut" }}
            className="max-w-4xl space-y-7"
          >
            {/* Badge */}
            {currentSlide.badge && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: fadeDuration, delay: 0.1 }}
              >
                <div className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium tracking-wide text-white/90">
                  {currentSlide.badge}
                </div>
              </motion.div>
            )}

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-lg">
              {currentSlide.heading}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#19BFB7] to-[#15E6DB] bg-clip-text text-transparent">
                  {currentSlide.highlight}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#19BFB7] to-[#15E6DB] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                />
              </span>
            </h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-medium tracking-wide"
              style={{ fontFamily: "'Avenir', sans-serif" }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {currentSlide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: fadeDuration, delay: 0.3 }}
            >
              {currentSlide.primaryCta && (
                <a
                  href={currentSlide.primaryCta.href}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-[#19BFB7] text-white font-semibold rounded-xl shadow-lg shadow-[#19BFB7]/25 transition-all duration-300 hover:bg-[#15E6DB] hover:shadow-[#19BFB7]/40 hover:-translate-y-0.5"
                >
                  {currentSlide.primaryCta.label}
                  <CtaIcon type={currentSlide.primaryCta.icon} />
                </a>
              )}
              <a
                href={currentSlide.secondaryCta.href}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5"
              >
                {currentSlide.secondaryCta.label}
                <CtaIcon type={currentSlide.secondaryCta.icon} />
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex gap-3 mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
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
