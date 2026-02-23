"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "104%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 90, damping: 22, delay }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
