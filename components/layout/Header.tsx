"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, ChevronDown, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { ContactModal } from "@/components/shared/ContactModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { servicesConfig } from "@/lib/services-config";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги", hasSubmenu: true },
  { href: "/blog", label: "Блог" },
  { href: "/video", label: "Видео" },
  { href: "/kontakti", label: "Контакти" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "left-0 right-0 rounded-b-2xl bg-slate-950/70 backdrop-blur-xl border-b border-x border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      )}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className={cn(
            "relative flex items-center justify-between transition-all duration-300",
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20 xl:h-24"
          )}>
            {/* Left side - Logo */}
            <Logo />

            {/* Desktop Navigation - Absolutely centered */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Navigation scrolled={scrolled} />
            </div>

            {/* Right side - CTA Button + Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop CTA Button */}
              <Button
                onClick={() => setContactModalOpen(true)}
                className={cn(
                  "hidden md:flex items-center gap-2 rounded-full transition-all duration-300",
                  scrolled
                    ? "h-9 px-4 text-sm bg-primary/70 hover:bg-primary/80"
                    : "h-10 px-5 text-base bg-primary hover:bg-primary/90"
                )}
              >
                <Mail className={cn("transition-all", scrolled ? "w-4 h-4" : "w-5 h-5")} />
                <span>Свържи се с нас</span>
              </Button>

              {/* Mobile menu button - Animated Hamburger */}
              <button
                className="md:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors flex-shrink-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="w-6 h-5 relative flex flex-col justify-center items-center">
                  {/* Top line */}
                  <span
                    className={cn(
                      "absolute h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out",
                      mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                    )}
                  />
                  {/* Middle line */}
                  <span
                    className={cn(
                      "absolute h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out",
                      mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    )}
                  />
                  {/* Bottom line */}
                  <span
                    className={cn(
                      "absolute h-0.5 w-6 bg-current rounded-full transform transition-all duration-300 ease-in-out",
                      mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[45] transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed left-0 right-0 z-[45] transition-all duration-300 ease-in-out overflow-hidden",
          scrolled ? "top-14" : "top-16",
          mobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className={cn(
          "bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300",
          scrolled ? "rounded-2xl border-x mx-2 mt-1" : ""
        )}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === "/uslugi" && pathname.startsWith("/uslugi"));

                if (item.hasSubmenu) {
                  return (
                    <div key={item.href} className="flex flex-col">
                      {/* Services main link with toggle */}
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex-1 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="px-3 py-3 ml-1 rounded-lg text-white/50 hover:text-primary hover:bg-white/5 transition-all duration-200"
                          aria-label="Toggle services submenu"
                        >
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 transition-all duration-300",
                              servicesExpanded ? "rotate-180" : "animate-pulse-subtle"
                            )}
                          />
                        </button>
                      </div>

                      {/* Services submenu */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          servicesExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="ml-4 mt-1 pl-4 border-l-2 border-primary/30 space-y-1">
                          {servicesConfig.map((service) => {
                            const Icon = service.icon;
                            const isServiceActive = pathname === `/uslugi/${service.slug}`;

                            return (
                              <Link
                                key={service.id}
                                href={`/uslugi/${service.slug}`}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                                  isServiceActive
                                    ? "bg-primary/15 text-primary"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setServicesExpanded(false);
                                }}
                              >
                                <Icon className="w-4 h-4 text-primary/70" />
                                <span>{service.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <Button
                onClick={() => {
                  setContactModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
              >
                <Mail className="w-5 h-5" />
                <span>Свържи се с нас</span>
              </Button>
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Контакти</h3>
              <div className="space-y-2.5">
                <a
                  href="mailto:office@takiev.bg"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-primary hover:bg-white/5 transition-all"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">office@takiev.bg</span>
                </a>
                <a
                  href="tel:+359899080016"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-primary hover:bg-white/5 transition-all"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm">+359 89 908 0016</span>
                </a>
                <div className="flex items-start gap-3 px-3 py-2 text-white/50">
                  <MapPin className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">бул. „Ал. Стамболийски" 30Б, София</span>
                </div>
              </div>
            </div>

            {/* Mobile Social Links */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Социални мрежи</h3>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/n.takiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-white/60 hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/company/takiev-finance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white/60 hover:text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@nikolaytakiev6221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-white/60 hover:text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@n.takiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>


      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
