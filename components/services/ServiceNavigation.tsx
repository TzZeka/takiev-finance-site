"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { servicesConfig } from "@/lib/services-config";
import { cn } from "@/lib/utils";

interface ServiceNavigationProps {
  currentSlug: string;
}

export function ServiceNavigation({ currentSlug }: ServiceNavigationProps) {
  const [showHint, setShowHint] = useState(true);

  // Scroll active tab into center view whenever slug changes
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

  // Fade out swipe hint after 2.5 s
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sticky top-16 md:top-20 xl:top-24 z-40 bg-slate-950/98 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)] border-b border-white/[0.04]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative">
          {/* Edge fade — mobile only */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none lg:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none lg:hidden" />

          {/* Swipe hint — animated chevron, fades out, mobile only */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute right-7 top-1/2 -translate-y-1/2 z-20 pointer-events-none lg:hidden"
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-4 h-4 text-primary/50" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <nav className="flex items-center lg:justify-center gap-0.5 md:gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide px-4 lg:px-0 h-[52px] md:h-[56px]">
            {servicesConfig.map((service) => {
              const Icon = service.icon;
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
                      "relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 lg:px-5 py-2 rounded-lg font-medium text-xs md:text-sm whitespace-nowrap transition-colors duration-200",
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
                    <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                      <Icon
                        className={cn(
                          "flex-shrink-0 transition-colors duration-200",
                          "w-3.5 h-3.5 md:w-4 md:h-4",
                          isActive ? "text-primary" : "text-white/40"
                        )}
                      />
                      <span>{service.label}</span>
                    </span>

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
    </div>
  );
}
