"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

// ── WCAG 2.1 relative luminance ──────────────────────────────────────────────
function relativeLuminance(r: number, g: number, b: number): number {
  return [r, g, b]
    .map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    })
    .reduce((sum, val, i) => sum + val * [0.2126, 0.7152, 0.0722][i], 0);
}

// Parse "rgb(r,g,b)" / "rgba(r,g,b,a)" → [r, g, b, a]
function parseRgba(color: string): [number, number, number, number] | null {
  const m = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/
  );
  if (!m) return null;
  return [
    parseInt(m[1]),
    parseInt(m[2]),
    parseInt(m[3]),
    m[4] !== undefined ? parseFloat(m[4]) : 1,
  ];
}

// Find the first opaque background colour at a viewport point,
// skipping the button element and its children.
function resolveBackgroundAtPoint(
  cx: number,
  cy: number,
  skip: Element
): [number, number, number] {
  const hits = document.elementsFromPoint(cx, cy);
  for (const el of hits) {
    if (el === skip || skip.contains(el)) continue;
    // Walk up from this element to find a non-transparent bg
    let node: Element | null = el;
    while (node && node !== document.documentElement) {
      const bg = getComputedStyle(node).backgroundColor;
      const parsed = parseRgba(bg);
      if (parsed && parsed[3] > 0.05) return [parsed[0], parsed[1], parsed[2]];
      node = node.parentElement;
    }
  }
  // Last resort: body / html
  for (const el of [document.body, document.documentElement]) {
    const bg = getComputedStyle(el).backgroundColor;
    const parsed = parseRgba(bg);
    if (parsed && parsed[3] > 0.05) return [parsed[0], parsed[1], parsed[2]];
  }
  return [13, 31, 28]; // #0d1f1c — site default dark
}

export function ScrollToTop() {
  const pathname = usePathname();
  /* True on /uslugi/[slug] pages — mobile bottom nav is present there */
  const hasBottomNav =
    pathname.startsWith("/uslugi/") && pathname !== "/uslugi/";

  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNearFooter, setIsNearFooter] = useState(false);
  // true  → background is dark  → use light foreground
  // false → background is light → use dark foreground
  const [isDark, setIsDark] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const controls = useAnimation();
  const isHoveringRef = useRef(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // ── Detect background luminance behind the button ────────────────────────
  const checkContrast = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const [r, g, b] = resolveBackgroundAtPoint(
      left + width / 2,
      top + height / 2,
      btn
    );
    // Crossover luminance for ≥ 3 : 1 contrast against both black and white
    setIsDark(relativeLuminance(r, g, b) < 0.179);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    setIsVisible(scrollTop > 400);

    const footer = document.querySelector("footer");
    if (footer)
      setIsNearFooter(
        footer.getBoundingClientRect().top < window.innerHeight + 100
      );

    checkContrast();
  }, [checkContrast]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Hover: pull arrow down (rubber-band loading tension) ─────────────────
  const onHoverStart = () => {
    isHoveringRef.current = true;
    setIsHovering(true);
    controls.start({
      y: 6,
      transition: { type: "spring", stiffness: 160, damping: 12, mass: 1.4 },
    });
  };

  const onHoverEnd = () => {
    if (!isHoveringRef.current) return;
    isHoveringRef.current = false;
    setIsHovering(false);
    controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 420, damping: 26 },
    });
  };

  // ── Click: slingshot release ──────────────────────────────────────────────
  const onFire = () => {
    isHoveringRef.current = false;
    setIsHovering(false);
    controls.start({
      y: [null, -11, 0],
      transition: {
        duration: 0.52,
        times: [0, 0.28, 1],
        ease: [
          [0.95, 0.05, 0.08, 0.94],
          [0.22, 1, 0.36, 1],
        ],
      },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── SVG ring ──────────────────────────────────────────────────────────────
  const size = 48;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  // ── Adaptive colour tokens ────────────────────────────────────────────────
  // Dark bg  → translucent white pill  + white text
  // Light bg → solid dark pill (#0d1f1c) + white text (pill acts as its own dark bg)
  const fg = isHovering
    ? "rgba(255,255,255,1)"
    : "rgba(255,255,255,0.85)";

  const pillBg = isDark
    ? isHovering
      ? "rgba(255,255,255,0.15)"
      : "rgba(255,255,255,0.10)"
    : isHovering
    ? "rgba(13,31,28,0.92)"
    : "rgba(13,31,28,0.82)";

  const pillBorder = isHovering
    ? "rgba(25,191,183,0.60)"
    : isDark
    ? "rgba(255,255,255,0.22)"
    : "rgba(25,191,183,0.30)";

  const ringTrack = isDark
    ? "rgba(255,255,255,0.12)"
    : "rgba(255,255,255,0.20)";

  return (
    <button
      ref={btnRef}
      onClick={onFire}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      aria-label="Към начало"
      className={cn(
        "fixed z-50 transition-all duration-500 ease-out",
        /* Service slug pages: bottom nav hides near footer on its own,
           so keep the button fixed — no jarring downward jump */
        hasBottomNav
          ? "bottom-32 lg:bottom-8"
          /* Other pages: lift above footer when close */
          : isNearFooter
          ? "bottom-24 sm:bottom-28"
          : "bottom-6 sm:bottom-8",
        "right-4 sm:right-6 lg:right-8",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Glass pill — colour-adaptive */}
      <div
        className="absolute inset-0 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: pillBg,
          border: `1px solid ${pillBorder}`,
          transition:
            "background-color 0.35s ease, border-color 0.35s ease",
        }}
      />

      {/* Scroll-progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
        style={{
          transform: `rotate(-90deg) scale(${isHovering ? 1.1 : 1})`,
          transition: "transform 0.3s ease",
        }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringTrack}
          strokeWidth={strokeWidth}
          style={{ transition: "stroke 0.35s ease" }}
        />
        {/* Progress — always teal */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#19BFB7"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150"
        />
      </svg>

      {/* Arrow icon */}
      <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={controls}
          initial={{ y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ArrowUp
            style={{
              width: 20,
              height: 20,
              color: fg,
              transition: "color 0.35s ease",
            }}
          />
        </motion.div>
      </div>

      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 backdrop-blur-md rounded-lg text-xs whitespace-nowrap pointer-events-none hidden sm:block"
        style={{
          opacity: isHovering ? 1 : 0,
          backgroundColor: pillBg,
          border: `1px solid ${pillBorder}`,
          color: fg,
          transition:
            "opacity 0.3s ease, background-color 0.35s ease, border-color 0.35s ease, color 0.35s ease",
        }}
      >
        Към началото
      </span>
    </button>
  );
}
