"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface PremiumCTAProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "secondary";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function PremiumCTA({
  href,
  onClick,
  type = "button",
  variant = "default",
  className = "",
  disabled = false,
  children,
}: PremiumCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xS = useSpring(x, { stiffness: 400, damping: 30 });
  const yS = useSpring(y, { stiffness: 400, damping: 30 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const isDefault = variant === "default";

  const baseClass = [
    "group relative inline-flex items-center justify-center gap-2",
    "px-8 py-4 font-semibold text-sm tracking-wide",
    "cursor-pointer select-none overflow-hidden",
    isDefault ? "bg-white/5 text-white" : "bg-white/[0.04] text-white/80",
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cornerLine = "absolute bg-primary/60 transition-all ease-out duration-300";

  const inner = (
    <>
      {/* Top line — right:0, grows left */}
      <span
        className={`${cornerLine} top-0 right-0 h-px w-1/2 group-hover:w-full`}
        style={{ transitionDuration: "300ms" }}
      />
      {/* Right line — top:0, grows down */}
      <span
        className={`${cornerLine} top-0 right-0 w-px h-1/2 group-hover:h-full`}
        style={{ transitionDuration: "300ms" }}
      />
      {/* Bottom line — left:0, appears */}
      <span
        className={`${cornerLine} bottom-0 left-0 h-px w-0 group-hover:w-full`}
        style={{ transitionDuration: "300ms", transitionDelay: "75ms" }}
      />
      {/* Left line — bottom:0, appears */}
      <span
        className={`${cornerLine} bottom-0 left-0 w-px h-0 group-hover:h-full`}
        style={{ transitionDuration: "300ms", transitionDelay: "75ms" }}
      />

      {/* Liquid fill */}
      <span
        aria-hidden
        className={[
          "absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform pointer-events-none",
          isDefault ? "bg-primary/15" : "bg-white/7",
        ].join(" ")}
        style={{ transitionDuration: "450ms", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        style={{ x: xS, y: yS }}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        whileHover={prefersReducedMotion ? {} : { scale: 1.025 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={baseClass}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ x: xS, y: yS }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={prefersReducedMotion ? {} : { scale: 1.025 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={baseClass}
    >
      {inner}
    </motion.button>
  );
}
