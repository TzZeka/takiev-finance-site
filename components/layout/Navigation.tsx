"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/video", label: "Видео" },
  { href: "/kontakti", label: "Контакти" },
];

export function Navigation() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ballPosition, setBallPosition] = useState({ left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null && itemRefs.current[hoveredIndex]) {
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
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <nav ref={navRef} className="hidden md:flex items-center gap-1 lg:gap-2 relative">
      {/* Container for the ball - prevents layout shift */}
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

      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "relative font-medium transition-all duration-300 rounded-lg group whitespace-nowrap",
              scrolled
                ? "px-2.5 py-1.5 md:px-3 lg:px-3.5 text-sm md:text-base lg:text-lg"
                : "px-2 py-1.5 md:px-3 lg:px-4 md:py-1.5 lg:py-2 text-xs md:text-xs lg:text-sm",
              isActive
                ? "text-[#19BFB7]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            {item.label}
            {/* Active indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#19BFB7] to-transparent"></span>
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
