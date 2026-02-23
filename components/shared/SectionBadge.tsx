"use client";

import { motion, useReducedMotion } from "framer-motion";

const Arc = () => (
  <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden="true" className="opacity-50">
    <path
      d="M2 12 Q14 2 26 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export function SectionBadge({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      {...(prefersReducedMotion ? {} : {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-20px" },
        transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
      })}
      className="inline-flex items-center gap-2.5 text-primary"
    >
      <Arc />
      <span className="text-xs font-bold tracking-[0.22em] uppercase">
        {children}
      </span>
      <Arc />
    </motion.div>
  );
}
