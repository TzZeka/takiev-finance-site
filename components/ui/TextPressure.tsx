"use client";

import { useRef, useEffect } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
  /** Minimum font-weight — Hubot Sans range: 200–900 */
  minWeight?: number;
  /** Maximum font-weight */
  maxWeight?: number;
  /** Minimum wdth axis — Hubot Sans range: 75–125 */
  minWidth?: number;
  /** Maximum wdth axis */
  maxWidth?: number;
  /** Mouse influence radius in pixels */
  radius?: number;
}

/**
 * TextPressure — variable-font proximity effect.
 * Characters near the cursor become bold & wide; far ones stay thin & narrow.
 * Uses Hubot Sans variable axes: wght (200–900) and wdth (75–125).
 */
export function TextPressure({
  text,
  className = "",
  minWeight = 200,
  maxWeight = 800,
  minWidth = 75,
  maxWidth = 125,
  radius = 300,
}: TextPressureProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const container = containerRef.current;
      if (container) {
        const { x, y } = mouseRef.current;
        const spans = container.querySelectorAll<HTMLSpanElement>("[data-ch]");
        spans.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const raw = Math.max(0, 1 - dist / radius);
          // smoothstep for organic, non-linear response
          const t = raw * raw * (3 - 2 * raw);
          const wght = Math.round(minWeight + (maxWeight - minWeight) * t);
          const wdth = Math.round(minWidth + (maxWidth - minWidth) * t);
          el.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [minWeight, maxWeight, minWidth, maxWidth, radius]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-ch
          aria-hidden
          style={{
            fontVariationSettings: `'wght' ${minWeight}, 'wdth' ${minWidth}`,
            display: "inline-block",
            lineHeight: "inherit",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
