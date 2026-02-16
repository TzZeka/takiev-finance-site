"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link href="/" className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-shrink-0 group">
      {/* Icon */}
      <div className={cn(
        "relative flex-shrink-0 transition-all duration-300",
        scrolled
          ? "w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
          : "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
      )}>
        <Image
          src="/icon.svg"
          alt="Takiev Finance Icon"
          fill
          sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
          className="object-contain"
          priority
        />
      </div>

      {/* Text */}
      <div className={cn(
        "flex flex-col justify-center transition-all duration-300 overflow-hidden",
        scrolled ? "max-w-0 opacity-0" : "max-w-full opacity-100"
      )}>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white tracking-wide transition-all duration-300 group-hover:opacity-90 whitespace-nowrap" style={{ fontFamily: "'Berkslund', serif" }}>
          Takiev Finance
        </h1>
        <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-extrabold tracking-wider leading-tight bg-gradient-to-r from-[#147d6c] to-[#1effff] bg-clip-text text-transparent opacity-80 whitespace-nowrap uppercase" style={{ fontFamily: "'Avenir', sans-serif" }}>
          ACCOUNTING & TAX COMPANY
        </p>
      </div>
    </Link>
  );
}
