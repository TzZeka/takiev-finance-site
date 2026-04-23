"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * PremiumCTA — animated border-line button used for primary marketing CTAs.
 *
 * When to use vs. <Button>:
 *   - PremiumCTA: dark hero/section backgrounds, full-bleed marketing callouts
 *   - Button: forms, dialogs, inline actions, any light-background context
 */
interface PremiumCTAProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "secondary" | "light";
  className?: string;
  disabled?: boolean;
  /** Required when the button contains only an icon and no visible text */
  "aria-label"?: string;
  children: React.ReactNode;
}

export function PremiumCTA({
  href,
  onClick,
  type = "button",
  variant = "default",
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
  children,
}: PremiumCTAProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDefault = variant === "default";
  const isLight = variant === "light";

  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setIsHovered(false);

  const baseClass = [
    "group relative inline-flex items-center justify-center gap-2",
    "px-8 py-4 font-semibold text-sm tracking-wide",
    "cursor-pointer select-none overflow-hidden",
    "rounded-t-[1.25rem] md:rounded-t-[1.75rem]",
    isLight ? "bg-[#1e3a36] text-white" : isDefault ? "bg-white/5 text-white" : "bg-white/[0.04] text-white/80",
    disabled ? "opacity-50 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const borderBase =
    "absolute h-px w-0 group-hover:w-full bg-primary/60 transition-[width] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

  const spotBg = isLight || isDefault ? "rgba(25,191,183,0.18)" : "rgba(255,255,255,0.08)";

  const inner = (
    <>
      {/* Top border: fills right → left */}
      <span className={`${borderBase} top-0 right-0 duration-[380ms]`} />
      {/* Bottom border: fills left → right, slightly slower */}
      <span className={`${borderBase} bottom-0 left-0 duration-[560ms] [transition-delay:40ms]`} />

      {/* Cursor-origin radial spotlight */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: spotPos.x,
          top: spotPos.y,
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: spotBg,
          transform: `translate(-50%, -50%) scale(${isHovered ? 2.4 : 0})`,
          transition: isHovered
            ? "transform 2400ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease"
            : "transform 1200ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease 100ms",
          opacity: isHovered ? 1 : 0,
          pointerEvents: "none",
        }}
      />

      <span className="relative z-10 flex items-center gap-2 cta-content">{children}</span>
    </>
  );

  const mouseHandlers = {
    onMouseEnter: handleMouseEnter as React.MouseEventHandler,
    onMouseMove: handleMouseMove as React.MouseEventHandler,
    onMouseLeave: handleMouseLeave,
  };

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.025 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      };

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        {...motionProps}
        {...mouseHandlers}
        className={baseClass}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
      {...mouseHandlers}
      className={baseClass}
    >
      {inner}
    </motion.button>
  );
}
