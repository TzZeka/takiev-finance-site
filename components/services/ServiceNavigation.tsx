"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Percent } from "lucide-react";
import { servicesConfig } from "@/lib/services-config";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/* Override icon for "данъци" — rest come from servicesConfig */
const ICON_OVERRIDES: Partial<Record<string, LucideIcon>> = {
  danaci: Percent,
};

interface ServiceNavigationProps {
  currentSlug: string;
}

export function ServiceNavigation({ currentSlug }: ServiceNavigationProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  /* Hide when footer enters the viewport */
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* Auto-scroll active desktop tab into view */
  const activeItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        setTimeout(() => {
          node.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }, 60);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSlug]
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════
          DESKTOP  —  sticky top tab bar  (lg and up)
      ═══════════════════════════════════════════════ */}
      <div className="hidden lg:block sticky top-16 md:top-20 xl:top-24 z-40 bg-slate-950/98 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)] border-b border-white/[0.04]">
        <div className="container mx-auto px-8">
          <nav className="flex items-center justify-center gap-1 h-[56px]">
            {servicesConfig.map((service) => {
              const isActive = service.slug === currentSlug;
              return (
                <div
                  key={service.id}
                  ref={isActive ? activeItemRef : null}
                  className="flex-shrink-0"
                >
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className={cn(
                      "relative flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors duration-200",
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeServiceTab"
                        className="absolute inset-0 bg-primary/[0.15] rounded-lg border border-primary/20"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{service.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeServiceLine"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MOBILE  —  floating bottom nav  (below lg)
          z-[48]: below header (z-50) AND mobile panel (z-[49])
          Hides when footer is visible or mobile menu is open
      ═══════════════════════════════════════════════ */}
      <motion.div
        className="lg:hidden fixed left-3 right-3 z-[48]"
        style={{ bottom: "max(14px, env(safe-area-inset-bottom, 14px))" }}
        animate={{
          opacity: isFooterVisible ? 0 : 1,
          y: isFooterVisible ? 12 : 0,
          pointerEvents: isFooterVisible ? "none" : "auto",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <nav
          className="relative flex flex-col rounded-2xl overflow-hidden"
          style={{
            height: 90,          /* 22px label strip + 68px items */
            background: "rgba(12, 22, 19, 0.97)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow:
              "0 -4px 24px rgba(0,0,0,0.35), 0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* ── Context label ── */}
          <div
            className="flex items-center gap-2.5 px-4"
            style={{ height: 22, borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              aria-hidden
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(to right, transparent, rgba(25,191,183,0.28))",
              }}
            />
            <span
              className="font-body"
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: "rgba(25,191,183,0.60)",
                textTransform: "uppercase",
              }}
            >
              Услуги
            </span>
            <div
              aria-hidden
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(to left, transparent, rgba(25,191,183,0.28))",
              }}
            />
          </div>

          {/* ── Tab items ── */}
          <div className="flex flex-1 items-stretch">
          {servicesConfig.map((service) => {
            const isActive = service.slug === currentSlug;
            const Icon = (ICON_OVERRIDES[service.id] ?? service.icon) as LucideIcon;

            return (
              <Link
                key={service.id}
                href={`/uslugi/${service.slug}`}
                className="relative flex-1 flex flex-col items-center justify-center gap-[6px] z-10 select-none"
              >
                {/* Sliding teal pill behind the active item */}
                {isActive && (
                  <motion.span
                    layoutId="mobileNavPill"
                    className="absolute inset-y-[7px] inset-x-[6px] rounded-[14px]"
                    style={{
                      background: "rgba(25,191,183,0.11)",
                      border: "1px solid rgba(25,191,183,0.22)",
                    }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}

                {/* Icon */}
                <motion.span
                  className="relative flex items-center justify-center"
                  animate={{ color: isActive ? "#19BFB7" : "rgba(255,255,255,0.60)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    style={{ width: 20, height: 20, strokeWidth: isActive ? 2 : 1.65 }}
                    aria-hidden
                  />
                </motion.span>

                {/* Label — rgba(255,255,255,0.60) on #0c1613 ≈ 8:1, passes WCAG AA */}
                <motion.span
                  className="relative font-body leading-none text-center w-full px-1 truncate"
                  animate={{ color: isActive ? "#19BFB7" : "rgba(255,255,255,0.60)" }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.01em" }}
                >
                  {service.shortLabel}
                </motion.span>
              </Link>
            );
          })}
          </div>
        </nav>
      </motion.div>
    </>
  );
}
