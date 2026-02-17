"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/*
 * PremiumLoader
 *
 * Brick icon matches app/icon.svg exactly:
 *   - 3 squares top row, 1 centered bottom row
 *   - Each brick is a square with ~13% gradient border
 *   - Gap between bricks ≈ 20% of brick size
 *   - Grid aspect ratio 54.5 : 35.3 ≈ 1.545 : 1
 *
 * Performance: CSS @keyframes for everything repeating,
 * Framer Motion only for the one-time exit transition.
 */

const TOTAL_MS = 3400;

/* SVG-exact brick positions (normalised to grid 0..1) */
const BRICKS = [
  { col: 0, row: 0, delay: 0 },
  { col: 1, row: 0, delay: 0.12 },
  { col: 2, row: 0, delay: 0.24 },
  { col: 1, row: 1, delay: 0.36 },
];

/* Grid constants derived from icon.svg coordinates */
const BRICK = 16.07;
const GAP = 3.17;
const COLS = 3;
const ROWS = 2;
const GRID_W = COLS * BRICK + (COLS - 1) * GAP; // 54.57
const GRID_H = ROWS * BRICK + (ROWS - 1) * GAP; // 35.31

function brickLeft(col: number) {
  return ((col * (BRICK + GAP)) / GRID_W) * 100;
}
function brickTop(row: number) {
  return ((row * (BRICK + GAP)) / GRID_H) * 100;
}
const BRICK_W = (BRICK / GRID_W) * 100; // ~29.45%
const BRICK_H = (BRICK / GRID_H) * 100; // ~45.5%
const BORDER_RATIO = 2.1 / 16.07; // ~13%

export function PremiumLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"bricks" | "text">("bricks");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    document.body.classList.add("loader-active");

    timers.current.push(setTimeout(() => setPhase("text"), 1100));
    timers.current.push(
      setTimeout(() => {
        setIsLoading(false);
        document.body.classList.remove("loader-active");
      }, TOTAL_MS)
    );

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.classList.remove("loader-active");
    };
  }, []);

  const textVisible = phase === "text";

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="loader-bg fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #020617 0%, #0f172a 20%, #19BFB7 50%, #0f172a 80%, #020617 100%)",
              backgroundSize: "300% 300%",
              animation: "loader-bg-flow 6s ease infinite",
              willChange: "transform",
            }}
          >
            {/* Radial glow behind bricks */}
            <div
              className="loader-glow-orb absolute rounded-full pointer-events-none"
              style={{
                width: "min(55vw, 300px)",
                height: "min(55vw, 300px)",
                background:
                  "radial-gradient(circle, rgba(25,191,183,0.35) 0%, transparent 70%)",
                animation: "loader-glow 3s ease-in-out infinite",
                willChange: "opacity, transform",
              }}
            />

            {/* ── Center column ── */}
            <div className="relative flex flex-col items-center z-10 px-6">
              {/* ── Brick grid ── */}
              <div
                className="relative mb-10 sm:mb-12"
                style={{
                  /* Responsive: 28vw clamped 130–210px, height by aspect ratio */
                  width: "clamp(130px, 28vw, 210px)",
                  aspectRatio: `${GRID_W} / ${GRID_H}`,
                  perspective: "800px",
                }}
              >
                {BRICKS.map(({ col, row, delay }, i) => (
                  <div
                    key={i}
                    className="loader-brick absolute"
                    style={{
                      left: `${brickLeft(col)}%`,
                      top: `${brickTop(row)}%`,
                      width: `${BRICK_W}%`,
                      height: `${BRICK_H}%`,
                      opacity: 0,
                      animation: `loader-brick-in 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}s forwards`,
                      willChange: "transform, opacity",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Gradient border — matches SVG 2.1-unit stroke */}
                    <div
                      className="w-full h-full rounded-[6%]"
                      style={{
                        padding: `${BORDER_RATIO * 100}%`,
                        background:
                          "linear-gradient(135deg, #147d6c 0%, #1effff 100%)",
                        boxShadow:
                          "0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(25,191,183,0.3)",
                      }}
                    >
                      {/* Inner fill */}
                      <div
                        className="relative w-full h-full rounded-[4%] overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(145deg, #22d4cb 0%, #19BFB7 40%, #15a39d 100%)",
                          boxShadow:
                            "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.15)",
                        }}
                      >
                        {/* 3D highlight edge (top-left) */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[20%] pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
                            borderRadius: "inherit",
                          }}
                        />

                        {/* Shimmer (single pass) */}
                        <div
                          className="loader-shimmer-bar absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                            width: "40%",
                            opacity: 0.8,
                            animation: `loader-brick-shimmer 0.8s ease-in-out ${
                              delay + 0.7
                            }s forwards`,
                            transform: "translateX(-120%)",
                            willChange: "transform",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Text section ── */}
              <div className="flex flex-col items-center text-center">
                {/* Top divider */}
                <div
                  className="loader-divider h-px w-16 sm:w-20 mb-5 origin-center"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                    opacity: 0,
                    transform: "scaleX(0)",
                    animation: textVisible
                      ? "loader-line-grow 0.5s ease-out 0s forwards"
                      : "none",
                  }}
                />

                {/* Company name — with single light sweep */}
                <h1
                  className="loader-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-2"
                  style={{
                    fontFamily: "'Berkslund', serif",
                    /* Base white text, then shine overlay via background-clip */
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(90deg, #fff 0%, #fff 42%, #19BFB7 47%, #1effff 50%, #19BFB7 53%, #fff 58%, #fff 100%)",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "-100% 0",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0,
                    animation: textVisible
                      ? "loader-text-in 0.6s ease-out 0.05s forwards, loader-text-shine 0.6s ease-in-out 0.6s forwards"
                      : "none",
                    willChange: "transform, opacity, background-position",
                  }}
                >
                  Takiev Finance
                </h1>

                {/* Slogan — matching Logo.tsx exactly */}
                <p
                  className="loader-slogan text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase mb-5"
                  style={{
                    fontFamily: "'Avenir', sans-serif",
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(90deg, #147d6c 0%, #147d6c 42%, #fff 47%, #1effff 50%, #fff 53%, #1effff 58%, #1effff 100%)",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "-100% 0",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0,
                    animation: textVisible
                      ? "loader-text-in 0.6s ease-out 0.2s forwards, loader-text-shine 0.6s ease-in-out 0.75s forwards"
                      : "none",
                    willChange: "transform, opacity, background-position",
                  }}
                >
                  Accounting & Tax Company
                </p>

                {/* Bottom divider */}
                <div
                  className="loader-divider h-px w-16 sm:w-20 mb-6 origin-center"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                    opacity: 0,
                    transform: "scaleX(0)",
                    animation: textVisible
                      ? "loader-line-grow 0.5s ease-out 0.3s forwards"
                      : "none",
                  }}
                />

                {/* Tagline — with light sweep */}
                <p
                  className="loader-tagline text-xs sm:text-sm tracking-wide"
                  style={{
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.55) 42%, #19BFB7 47%, #1effff 50%, #19BFB7 53%, rgba(255,255,255,0.55) 58%, rgba(255,255,255,0.55) 100%)",
                    backgroundSize: "300% 100%",
                    backgroundPosition: "-100% 0",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0,
                    animation: textVisible
                      ? "loader-text-in 0.5s ease-out 0.4s forwards, loader-text-shine 0.6s ease-in-out 0.9s forwards"
                      : "none",
                    willChange: "transform, opacity, background-position",
                  }}
                >
                  Счетоводна Кантора 
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
