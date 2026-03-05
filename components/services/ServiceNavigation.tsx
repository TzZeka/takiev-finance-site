"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesConfig } from "@/lib/services-config";
import { cn } from "@/lib/utils";

interface ServiceNavigationProps {
  currentSlug: string;
}

export function ServiceNavigation({ currentSlug }: ServiceNavigationProps) {
  return (
    <div className="sticky top-16 md:top-20 xl:top-24 z-40 bg-slate-950/98 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)] border-b border-white/[0.04]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative">
          {/* Edge fade — mobile only */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none lg:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none lg:hidden" />

          <nav className="flex items-center lg:justify-center gap-0.5 md:gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide px-4 lg:px-0 h-[52px] md:h-[56px]">
            {servicesConfig.map((service) => {
              const Icon = service.icon;
              const isActive = service.slug === currentSlug;

              return (
                <Link
                  key={service.id}
                  href={`/uslugi/${service.slug}`}
                  className={cn(
                    "relative flex items-center gap-1.5 md:gap-2 px-3 md:px-4 lg:px-5 py-2 rounded-lg font-medium text-xs md:text-sm whitespace-nowrap transition-colors duration-200 flex-shrink-0",
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
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

                  {/* Active bottom line */}
                  {isActive && (
                    <motion.span
                      layoutId="activeServiceLine"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
