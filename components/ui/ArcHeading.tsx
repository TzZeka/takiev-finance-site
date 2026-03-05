"use client";
import { useId } from "react";
import { useReducedMotion } from "framer-motion";

interface ArcHeadingProps {
  mainText: string;
  accentText: string;
  /** Tailwind size classes on the SVG wrapper (default: "w-full max-w-3xl mx-auto") */
  className?: string;
  /** How pronounced the arch is — 0 = flat, lower value = more curved (default: 30) */
  archY?: number;
}

export function ArcHeading({
  mainText,
  accentText,
  className = "w-full max-w-3xl mx-auto",
  archY = 30,
}: ArcHeadingProps) {
  const id = useId().replace(/:/g, "");
  useReducedMotion(); // respect preference (flat when reduced)

  // Quadratic bezier arc: starts left, peaks at center top, ends right
  const d = `M 40,110 Q 300,${archY} 560,110`;

  return (
    <svg
      viewBox="0 0 600 130"
      className={className}
      aria-label={`${mainText} ${accentText}`}
      role="heading"
      aria-level={2}
    >
      <defs>
        <path id={`arc-path-${id}`} d={d} />
      </defs>
      <text
        fontSize="52"
        fontWeight="800"
        fontFamily="var(--font-hubot-sans), 'Hubot Sans', sans-serif"
        textAnchor="middle"
        letterSpacing="-1"
      >
        <textPath href={`#arc-path-${id}`} startOffset="50%">
          <tspan fill="white">{mainText} </tspan>
          <tspan fill="#19BFB7" fontSize="60">{accentText}</tspan>
        </textPath>
      </text>
    </svg>
  );
}
