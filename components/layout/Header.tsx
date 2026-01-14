"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { ContactModal } from "@/components/shared/ContactModal";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/video", label: "Видео" },
  { href: "/kontakti", label: "Контакти" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 shadow-lg transition-all duration-300",
        scrolled ? "backdrop-blur-md bg-slate-950/95" : ""
      )}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className={cn(
            "flex items-center justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 transition-all duration-300",
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20 xl:h-24"
          )}>
            <Logo />
            <Navigation />

            {/* Desktop CTA Button */}
            <button
              onClick={() => setContactModalOpen(true)}
              className={cn(
                "hidden md:inline-flex items-center gap-1 lg:gap-1.5 xl:gap-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md lg:rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap flex-shrink-0",
                scrolled
                  ? "px-2 py-1 text-[9px] lg:text-[10px]"
                  : "px-2 md:px-2.5 lg:px-3 xl:px-4 py-1 md:py-1.5 lg:py-1.5 xl:py-2 text-[10px] md:text-xs lg:text-xs xl:text-sm"
              )}
            >
              <Mail className={cn(
                "transition-all duration-300",
                scrolled ? "w-2.5 h-2.5 lg:w-3 lg:h-3" : "w-3 h-3 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4"
              )} />
              <span className={cn(scrolled ? "hidden" : "hidden xl:inline")}>Свържи се с нас</span>
              <span className={cn(scrolled ? "inline" : "xl:hidden")}>Контакт</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 text-white hover:text-primary transition-colors flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-16 z-40 overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <nav className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 shadow-xl">
          <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col space-y-1.5 sm:space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-white/70 hover:text-primary hover:bg-white/5"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile CTA Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-md mt-3 sm:mt-4"
            >
              <Mail className="w-4 h-4" />
              Свържи се с нас
            </button>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content jump */}
      <div className={cn(
        "transition-all duration-300",
        scrolled ? "h-14 md:h-16" : "h-16 md:h-20 xl:h-24"
      )} />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
