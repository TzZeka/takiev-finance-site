"use client";
import { useId } from "react";
import { useReducedMotion } from "framer-motion";

interface ArcHeadingProps {
  mainText: string;
  accentText: string;
  /** Heading level announced to screen readers (default: 2) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Tailwind size classes on the SVG wrapper (default: "w-full max-w-3xl mx-auto") */
  className?: string;
  /** How pronounced the arch is — 0 = flat, lower value = more curved (default: 30) */
  archY?: number;
}

export function ArcHeading({
  mainText,
  accentText,
  level = 2,
  className = "w-full max-w-3xl mx-auto",
  archY = 30,
}: ArcHeadingProps) {
  const id = useId().replace(/:/g, "");
  useReducedMotion(); // respect preference (flat when reduced)

  // Quadratic bezier arc: starts left, peaks at center top, ends right
  const d = `M 40,110 Q 300,${archY} 560,110`;

  const HeadingTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <>
      {/* Real heading element — accessible to screen readers, hidden visually */}
      <HeadingTag className="sr-only">{mainText} {accentText}</HeadingTag>

      {/* Visual arc — hidden from assistive technology */}
      <svg
        viewBox="0 0 600 130"
        className={className}
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <path id={`arc-path-${id}`} d={d} />
        </defs>
        <text
          fontSize="52"
          fontWeight="800"
          fontFamily="var(--font-sans), 'Hubot Sans', sans-serif"
          textAnchor="middle"
          letterSpacing="-1"
        >
          <textPath href={`#arc-path-${id}`} startOffset="50%">
            <tspan fill="white">{mainText} </tspan>
            <tspan fill="var(--color-primary)" fontSize="60">{accentText}</tspan>
          </textPath>
        </text>
      </svg>
    </>
  );
}
