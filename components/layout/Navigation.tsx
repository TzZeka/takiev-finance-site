"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { servicesConfig } from "@/lib/services-config";
import { useQuickPanel } from "@/components/layout/QuickPanelContext";
import { BricksIcon } from "@/components/layout/QuickPanel";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги", hasDropdown: true },
  // QuickPanel button is inserted here (between index 2 and 3)
  { href: "/blog", label: "Блог" },
  { href: "/video", label: "Видео" },
  { href: "/kontakti", label: "Контакти" },
];

function FlipLabel({ text }: { text: string }) {
  return (
    <span
      className="relative overflow-hidden inline-flex flex-col"
      style={{ height: "1.15em" }}
    >
      <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-full block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
      >
        {text}
      </span>
    </span>
  );
}

// Clean minimal trigger button
function QuickPanelNavButton() {
  const { isOpen, setIsOpen, isVisible } = useQuickPanel();
  const [spinAngle, setSpinAngle] = useState(0);

  return (
    <motion.button
      onClick={() => setIsOpen((v) => !v)}
      onMouseEnter={() => {
        // Spin only when opening — no animation while panel is already open
        if (!isOpen) setSpinAngle((a) => a + 360);
      }}
      aria-label="Бързо меню"
      className="flex items-center justify-center flex-shrink-0"
      animate={{
        scale: isVisible ? 1 : 0.75,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isOpen ? "rgba(25,191,183,0.16)" : "rgba(255,255,255,0.00)",
        borderColor: isOpen ? "rgba(25,191,183,0.50)" : "rgba(255,255,255,0.22)",
      }}
      whileTap={{ scale: 0.88, transition: { duration: 0.1, ease: [0.4, 0, 1, 1] } }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        borderWidth: "1px",
        borderStyle: "solid",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <motion.span
        animate={{ rotate: spinAngle }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <BricksIcon className="w-5 h-5 text-white/90" isOpen={isOpen} />
      </motion.span>
    </motion.button>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <nav className="flex items-center justify-center gap-1 lg:gap-2">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === "/uslugi" && pathname.startsWith("/uslugi"));

        if (item.hasDropdown) {
          return (
            <React.Fragment key={item.href}>
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative font-medium transition-colors duration-300 rounded-lg whitespace-nowrap flex items-center gap-1 px-3 lg:px-4 py-2 text-sm",
                    isActive ? "text-primary" : "text-white/70 hover:text-white"
                  )}
                >
                  <FlipLabel text={item.label} />
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 flex-shrink-0 transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-xl overflow-hidden z-50"
                      style={{ background: "#0d1f1c", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-2">
                        {servicesConfig.map((service) => (
                          <Link
                            key={service.id}
                            href={`/uslugi/${service.slug}`}
                            className="block px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* QuickPanel button — inserted after Услуги */}
              <QuickPanelNavButton />
            </React.Fragment>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative font-medium transition-colors duration-300 rounded-lg whitespace-nowrap px-3 lg:px-4 py-2 text-sm",
              isActive ? "text-primary" : "text-white/70 hover:text-white"
            )}
          >
            <FlipLabel text={item.label} />
            {isActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
