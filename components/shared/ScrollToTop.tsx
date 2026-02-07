"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearFooter, setIsNearFooter] = useState(false);

  // Calculate scroll progress and visibility
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setIsVisible(scrollTop > 400);

    // Check if near footer
    const footer = document.querySelector("footer");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      setIsNearFooter(footerRect.top < window.innerHeight + 100);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circle parameters
  const size = 48;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Върни се в началото"
      className={cn(
        "fixed z-50 group transition-all duration-500 ease-out",
        // Position - moves up when near footer
        isNearFooter ? "bottom-24 sm:bottom-28" : "bottom-6 sm:bottom-8",
        "right-4 sm:right-6 lg:right-8",
        // Visibility
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Background with blur */}
      <div className="absolute inset-0 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 transition-all duration-300 group-hover:bg-slate-800 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/20" />

      {/* Progress circle */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90 transition-transform duration-300 group-hover:scale-110"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress circle */}
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

      {/* Arrow icon */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <ArrowUp className="w-5 h-5 text-white/70 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
        Към началото
      </span>
    </button>
  );
}
