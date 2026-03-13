"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const controls = useAnimation();
  // Track hover state so hover-end doesn't fight a mid-flight animation
  const isHoveringRef = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setIsVisible(scrollTop > 400);

    const footer = document.querySelector("footer");
    if (footer) {
      setIsNearFooter(footer.getBoundingClientRect().top < window.innerHeight + 100);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Hover: pull arrow down — rubber-band loading tension ─────────────────
  const onHoverStart = () => {
    isHoveringRef.current = true;
    controls.start({
      y: 6,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 12,
        mass: 1.4,
      },
    });
  };

  // ── Hover end: snap back to neutral ──────────────────────────────────────
  const onHoverEnd = () => {
    if (!isHoveringRef.current) return;
    isHoveringRef.current = false;
    controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 420, damping: 26 },
    });
  };

  // ── Click: slingshot release — explosive upward launch, spring settle ─────
  // Clamped to ±11px so arrow stays within the 48px container at all times.
  const onFire = () => {
    isHoveringRef.current = false;
    controls.start({
      y: [null, -11, 0],
      transition: {
        duration: 0.52,
        times: [0, 0.28, 1],
        ease: [
          [0.95, 0.05, 0.08, 0.94], // launch — explosive release
          [0.22, 1, 0.36, 1],        // settle — spring-like return
        ],
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle parameters
  const size = 48;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={onFire}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      aria-label="Върни се в началото"
      className={cn(
        "fixed z-50 group transition-all duration-500 ease-out",
        isNearFooter ? "bottom-24 sm:bottom-28" : "bottom-6 sm:bottom-8",
        "right-4 sm:right-6 lg:right-8",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Background glass pill */}
      <div className="absolute inset-0 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:bg-slate-800 group-hover:border-primary/30" />

      {/* Scroll progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90 transition-transform duration-300 group-hover:scale-110"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-150"
        />
      </svg>

      {/* Arrow — slingshot animation target, clipped to container bounds */}
      <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={controls}
          initial={{ y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ArrowUp className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
        Към началото
      </span>
    </button>
  );
}
