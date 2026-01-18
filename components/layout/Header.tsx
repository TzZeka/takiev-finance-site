"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { ContactModal } from "@/components/shared/ContactModal";
import { Button } from "@/components/ui/button";
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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
            <Button
              onClick={() => setContactModalOpen(true)}
              className={cn(
                "hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-300",
                scrolled ? "h-9 px-4 text-sm" : "h-10 px-5 text-base"
              )}
            >
              <Mail className={cn("transition-all", scrolled ? "w-4 h-4" : "w-5 h-5")} />
              <span>Свържи се с нас</span>
            </Button>

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
            <Button
              onClick={() => {
                setContactModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
            >
              <Mail className="w-4 h-4" />
              <span>Свържи се с нас</span>
            </Button>
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
