"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { servicesConfig } from "@/lib/services-config";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги", hasDropdown: true },
  { href: "/blog", label: "Блог" },
  { href: "/video", label: "Видео" },
  { href: "/kontakti", label: "Контакти" },
];

interface NavigationProps {
  scrolled?: boolean;
}

export function Navigation({ scrolled = false }: NavigationProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ballPosition, setBallPosition] = useState({ left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null && itemRefs.current[hoveredIndex] && !scrolled) {
      const item = itemRefs.current[hoveredIndex];
      const nav = navRef.current;
      if (item && nav) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const newLeft = itemRect.left - navRect.left + itemRect.width / 2;

        setBallPosition({ left: newLeft });
        setIsAnimating(true);

        // Reset animation after it completes
        setTimeout(() => setIsAnimating(false), 600);
      }
    }
  }, [hoveredIndex, scrolled]);

  const handleMouseEnter = (index: number, hasDropdown?: boolean) => {
    if (!scrolled) {
      setHoveredIndex(index);
    }
    if (hasDropdown) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = (hasDropdown?: boolean) => {
    setHoveredIndex(null);
    if (hasDropdown) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setDropdownOpen(false);
      }, 150);
    }
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <nav ref={navRef} className="flex items-center justify-center gap-1 lg:gap-2 relative">
      {/* Container for the ball - prevents layout shift - only show when NOT scrolled */}
      {!scrolled && (
        <div className="absolute -top-2 md:-top-2.5 lg:-top-3 left-0 right-0 h-2 md:h-2.5 lg:h-3 pointer-events-none">
          {/* Animated bouncing ball */}
          {hoveredIndex !== null && (
            <div
              className={cn(
                "absolute top-0 h-1.5 w-1.5 md:h-2 md:w-2 lg:h-2.5 lg:w-2.5 bg-primary rounded-full shadow-md lg:shadow-lg shadow-primary/60 z-10 transition-all duration-300 ease-out",
                isAnimating && "animate-bounce-jump"
              )}
              style={{
                left: `${ballPosition.left}px`,
                transform: "translateX(-50%)",
              }}
            />
          )}
        </div>
      )}

      {navItems.map((item, index) => {
        const isActive = pathname === item.href || (item.href === "/uslugi" && pathname.startsWith("/uslugi"));

        if (item.hasDropdown) {
          return (
            <div
              key={item.href}
              className="relative"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index, true)}
              onMouseLeave={() => handleMouseLeave(true)}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative font-medium transition-all duration-300 rounded-lg group whitespace-nowrap flex items-center gap-1 px-3 lg:px-4 py-2 text-sm",
                  isActive
                    ? "text-primary"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform duration-200",
                  dropdownOpen && "rotate-180"
                )} />
                {/* Active underline indicator */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="py-2">
                    {servicesConfig.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.id}
                          href={`/uslugi/${service.slug}`}
                          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-sm">{service.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            className={cn(
              "relative font-medium transition-all duration-300 rounded-lg group whitespace-nowrap px-3 lg:px-4 py-2 text-sm",
              isActive
                ? "text-primary"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            {item.label}
            {/* Active underline indicator */}
            {isActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </Link>
        );
      })}

      <style jsx>{`
        @keyframes bounce-jump {
          0% {
            transform: translateX(-50%) translateY(0) scale(1);
          }
          25% {
            transform: translateX(-50%) translateY(-6px) scale(1.15);
          }
          50% {
            transform: translateX(-50%) translateY(0) scale(0.95);
          }
          75% {
            transform: translateX(-50%) translateY(-3px) scale(1.05);
          }
          100% {
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @media (min-width: 1024px) {
          @keyframes bounce-jump {
            0% {
              transform: translateX(-50%) translateY(0) scale(1);
            }
            25% {
              transform: translateX(-50%) translateY(-10px) scale(1.15);
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.95);
            }
            75% {
              transform: translateX(-50%) translateY(-5px) scale(1.05);
            }
            100% {
              transform: translateX(-50%) translateY(0) scale(1);
            }
          }
        }

        :global(.animate-bounce-jump) {
          animation: bounce-jump 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </nav>
  );
}
