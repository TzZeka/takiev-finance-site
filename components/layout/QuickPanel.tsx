"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";

// Custom icon - circle of squares transforms into logo pattern
function BricksIcon({ className, isOpen }: { className?: string; isOpen: boolean }) {
  // Square size
  const size = 5;
  const half = size / 2;

  // Circle positions (closed state) - 4 squares around center
  const radius = 6;
  const center = 12;
  const circlePositions = [
    { x: center - half, y: center - radius - half },        // top
    { x: center + radius - half, y: center - half },        // right
    { x: center - half, y: center + radius - half },        // bottom
    { x: center - radius - half, y: center - half },        // left
  ];

  // Logo positions (open state) - 3 top, 1 middle bottom
  const logoPositions = [
    { x: 3, y: 4 },           // top left
    { x: 9.5, y: 4 },         // top middle
    { x: 16, y: 4 },          // top right
    { x: 9.5, y: 11 },        // bottom middle
  ];

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      {[0, 1, 2, 3].map((i) => {
        const closed = circlePositions[i];
        const open = logoPositions[i];

        return (
          <rect
            key={i}
            width={size}
            height={size}
            rx="0.8"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              transform: isOpen
                ? `translate(${open.x}px, ${open.y}px)`
                : `translate(${closed.x}px, ${closed.y}px)`,
              transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
            }}
          />
        );
      })}
    </svg>
  );
}

export function QuickPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Calculate header height based on scroll state (only for lg+ screens)
  const getHeaderHeight = useCallback(() => {
    if (typeof window === 'undefined') return 80;
    const width = window.innerWidth;
    if (scrolled) {
      return 64; // md:h-16 when scrolled
    } else {
      return width >= 1280 ? 96 : 80; // xl:h-24 : md:h-20
    }
  }, [scrolled]);

  const [headerHeight, setHeaderHeight] = useState(80);

  // Update header height on scroll and resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      setHeaderHeight(getHeaderHeight());
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      updateHeaderHeight();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [getHeaderHeight]);

  // Check footer visibility
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const shouldHide = footerRect.top < windowHeight;

        if (shouldHide && isOpen) {
          setIsOpen(false);
        }
        setIsVisible(!shouldHide);
      }
    };

    checkFooterVisibility();
    window.addEventListener("scroll", checkFooterVisibility, { passive: true });
    return () => window.removeEventListener("scroll", checkFooterVisibility);
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Toggle Button - Fixed position below header, far left - DESKTOP ONLY (lg+) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex items-center justify-center fixed left-8 xl:left-12 z-50 w-10 h-10 rounded-xl border transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none -translate-x-4"
        } ${
          isOpen
            ? "bg-white/10 border-white/30 shadow-lg shadow-black/20"
            : "bg-slate-900/90 backdrop-blur-sm hover:bg-slate-800/90 border-white/10 hover:border-white/30"
        }`}
        style={{ top: `${headerHeight + 12}px` }}
        aria-label="Бързо меню"
        disabled={!isVisible}
      >
        <BricksIcon className="w-5 h-5 text-white/80" isOpen={isOpen} />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel - Drops from under header */}
      <div
        className={`fixed left-0 right-0 z-40 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{
          top: `${headerHeight}px`,
          maxHeight: isOpen ? "80vh" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-white/10 shadow-2xl shadow-black/50"
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-20px)",
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Top edge glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="container mx-auto px-6 lg:pl-24 lg:pr-8 xl:pl-28 xl:pr-12 py-8">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
              }}
            >
              {/* Google Maps */}
              <div
                className="sm:col-span-2 lg:col-span-1"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.05s",
                }}
              >
                {/* Using padding-bottom trick for consistent aspect ratio across browsers */}
                <div className="relative w-full min-h-[180px] rounded-lg overflow-hidden border border-white/10" style={{ paddingBottom: '75%' }}>
                  {isOpen && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.283956399353!2d23.319877890847863!3d42.697707877149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa855eff40e335%3A0xa7cffc05e42a4e56!2sTakiev%20Finance%20EOOD!5e0!3m2!1sbg!2sbg!4v1768080298879!5m2!1sbg!2sbg"
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Takiev Finance Location"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                </div>
              </div>

              {/* Useful Sites */}
              <div
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                }}
              >
                <h3 className="text-sm font-bold mb-4 flex items-center text-white">
                  <span className="text-primary">—</span>
                  <span className="ml-2">Полезни сайтове</span>
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { href: "https://nula.bg", label: "Nula.bg" },
                    { href: "https://www.portalschetovodstvo.bg/", label: "Портал Счетоводство" },
                    { href: "https://nap.bg", label: "НАП" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-sm text-white/70 hover:text-primary transition-colors flex items-center py-0.5"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2" />
                        {link.label}
                        <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
                }}
              >
                <h3 className="text-sm font-bold mb-4 flex items-center text-white">
                  <span className="text-primary">—</span>
                  <span className="ml-2">Контакти</span>
                </h3>
                <ul className="space-y-2.5">
                  <li className="group flex items-center space-x-3">
                    <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary transition-all duration-300">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <a
                      href="mailto:office@takiev.bg"
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      office@takiev.bg
                    </a>
                  </li>
                  <li className="group flex items-center space-x-3">
                    <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary transition-all duration-300">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <a
                      href="tel:+359899080016"
                      className="text-sm text-white/70 hover:text-primary transition-colors"
                    >
                      +359 89 908 0016
                    </a>
                  </li>
                  <li className="group flex items-start space-x-3">
                    <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary transition-all duration-300 flex-shrink-0">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-white/70 leading-relaxed">
                      бул. „Александър Стамболийски" 30Б, 1000 София
                    </span>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                }}
              >
                <h3 className="text-sm font-bold mb-4 flex items-center text-white">
                  <span className="text-primary">—</span>
                  <span className="ml-2">Социални мрежи</span>
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.facebook.com/n.takiev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/takiev-finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.youtube.com/@nikolaytakiev6221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@n.takiev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 bg-white/5 hover:bg-primary rounded-lg transition-all duration-300 border border-white/10 hover:border-primary"
                    aria-label="TikTok"
                  >
                    <svg className="h-4 w-4 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>

                {/* EIK */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-white/60">
                    ЕИК: 206666484
                  </p>
                </div>
              </div>

              {/* Founder Photo - Desktop XL only */}
              <div
                className="hidden xl:flex items-center justify-center"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0) rotate(0deg)" : "translateY(-20px) rotate(-5deg)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.25s",
                }}
              >
                <div className="relative">
                  {/* Diagonal frame decoration */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl transform rotate-3" />
                  <div className="absolute -inset-2 border border-primary/30 rounded-xl transform -rotate-2" />

                  {/* Photo container */}
                  <div className="relative w-32 h-40 transform rotate-2 overflow-hidden rounded-lg border-2 border-white/20 shadow-xl shadow-black/30">
                    <Image
                      src="/firm-logo/nikolay-takiev.jpg"
                      alt="Николай Такиев - Основател"
                      fill
                      className="object-cover object-top"
                      sizes="128px"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  </div>

                  {/* Name label */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rotate-2">
                    <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                      <p className="text-[10px] font-medium text-white/80 whitespace-nowrap">Николай Такиев</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
