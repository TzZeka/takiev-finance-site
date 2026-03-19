"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * PremiumCTA — animated corner-line button used for primary marketing CTAs.
 *
 * When to use vs. <Button>:
 *   - PremiumCTA: dark hero/section backgrounds, full-bleed marketing callouts
 *   - Button: forms, dialogs, inline actions, any light-background context
 */
interface PremiumCTAProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "secondary";
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

  const cornerLine = "absolute bg-primary/60 transition-all ease-out duration-base";

  const inner = (
    <>
      <span className={`${cornerLine} top-0 right-0 h-px w-1/2 group-hover:w-full`} />
      <span className={`${cornerLine} top-0 right-0 w-px h-1/2 group-hover:h-full`} />
      <span className={`${cornerLine} bottom-0 left-0 h-px w-0 group-hover:w-full [transition-delay:75ms]`} />
      <span className={`${cornerLine} bottom-0 left-0 w-px h-0 group-hover:h-full [transition-delay:75ms]`} />
      <span
        aria-hidden
        className={[
          "absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-slow pointer-events-none [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          isDefault ? "bg-primary/15" : "bg-white/[0.07]",
        ].join(" ")}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
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
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={prefersReducedMotion ? {} : { scale: 1.025 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={baseClass}
    >
      {inner}
    </motion.button>
  );
}
