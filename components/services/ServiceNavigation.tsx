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
    <div className="sticky top-16 md:top-20 xl:top-24 z-40 bg-slate-950/95 backdrop-blur-sm shadow-lg shadow-black/20 border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Wrapper with edge fade effect */}
        <div className="relative">
          {/* Left fade - only when scrollable */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none lg:hidden" />
          {/* Right fade - only when scrollable */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none lg:hidden" />

          <nav className="flex items-center lg:justify-center gap-1 md:gap-2 h-14 md:h-[56px] overflow-x-auto overflow-y-hidden scrollbar-hide px-6 lg:px-0">
            {servicesConfig.map((service) => {
              const Icon = service.icon;
              const isActive = service.slug === currentSlug;

              return (
                <Link
                  key={service.id}
                  href={`/uslugi/${service.slug}`}
                  className={cn(
                    "relative flex items-center gap-2 px-3 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base whitespace-nowrap transition-all duration-300 flex-shrink-0",
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTab"
                      className="absolute inset-0 bg-primary rounded-lg"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>{service.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
