"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube, ChevronRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Navigation } from "@/components/layout/Navigation";
import { ContactModal } from "@/components/shared/ContactModal";
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

function MenuIcon({ isOpen, dark }: { isOpen: boolean; dark: boolean }) {
  const lineColor = dark ? "#1b2b28" : "#ffffff";

  const lineBase: React.CSSProperties = {
    display: "block",
    height: "4px",
    background: lineColor,
    borderRadius: "4px",
    transition: "background 0.3s ease",
  };

  return (
    <>
      <svg aria-hidden="true" focusable="false" style={{ display: "none" }}>
        <defs>
          <filter id="goo-hamburger" x="-50%" y="-120%" width="200%" height="340%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </defs>
      </svg>

      <span
        aria-hidden="true"
        style={{ display: "inline-flex", flexDirection: "column", gap: "5px", width: "26px", filter: "url(#goo-hamburger)" }}
      >
        <span
          style={{
            ...lineBase,
            transformOrigin: "center center",
            transition: `background 0.3s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
            transform: isOpen ? "translateY(9px) rotate(45deg)" : "translateY(0) rotate(0deg)",
          }}
        />
        <span
          style={{
            ...lineBase,
            transition: `background 0.3s ease, transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.12s ease 0.46s`,
            transform: isOpen ? "scaleX(0.15)" : "scaleX(1)",
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            ...lineBase,
            transformOrigin: "center center",
            transition: `background 0.3s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
            transform: isOpen ? "translateY(-9px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
          }}
        />
      </span>
    </>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ═══════════════════════════ HEADER BAR ═══════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <LayoutGroup id="header-layout">
          <div className="w-full flex items-center px-6 md:px-8 lg:px-10 xl:px-12 py-4">

            {/* Col 1: Logo */}
            <div className="flex-1 flex items-center justify-start">
              <Logo />
            </div>

            {/* Col 2: Nav pill at centre — NOT scrolled */}
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  layoutId="nav-pill"
                  className="hidden md:inline-flex rounded-xl bg-black/25 backdrop-blur-md border border-white/10 shadow-sm px-3 py-2"
                  transition={{ type: "spring", stiffness: 340, damping: 38 }}
                >
                  <Navigation scrolled={false} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Col 3: Right group */}
            <div className="flex-1 flex items-center justify-end gap-3">

              {/* Nav pill at right — scrolled */}
              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    layoutId="nav-pill"
                    className="hidden md:inline-flex rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/10 shadow-sm px-3 py-1.5"
                    transition={{ type: "spring", stiffness: 340, damping: 38 }}
                  >
                    <Navigation scrolled={true} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop CTA — text flip when expanded, icon-only when scrolled */}
              <button
                onClick={() => setContactModalOpen(true)}
                className={cn(
                  "group hidden md:flex items-center justify-center transition-all duration-300 text-white font-medium bg-primary hover:bg-primary/90",
                  scrolled
                    ? "w-9 h-9 rounded-full bg-primary/70 hover:bg-primary/90 ring-2 ring-transparent hover:ring-primary/30"
                    : "gap-2 h-10 px-5 text-sm rounded-full overflow-hidden"
                )}
              >
                <Mail className={cn("flex-shrink-0 transition-all", scrolled ? "w-4 h-4" : "w-[1.1rem] h-[1.1rem]")} />
                {!scrolled && (
                  <span className="relative overflow-hidden inline-flex flex-col" style={{ height: "1.15em" }}>
                    <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                      Свържи се с нас
                    </span>
                    <span aria-hidden className="absolute inset-x-0 top-full block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                      Свържи се с нас
                    </span>
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <motion.button
                className="md:hidden relative w-11 h-11 flex items-center justify-center flex-shrink-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Затвори меню" : "Отвори меню"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-panel"
                whileTap={{ scale: 0.85 }}
              >
                <MenuIcon isOpen={mobileMenuOpen} dark={false} />
              </motion.button>

            </div>
          </div>
        </LayoutGroup>
      </header>

      {/* ═══════════════════════════ MOBILE PANEL ═══════════════════════════
          White background, dark-green text (#1b2b28), teal hover accent.
          Top strip preserves header legibility (dark gradient fade).
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-panel"
            id="mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Мобилно меню"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.32, ease: [0.36, 0, 0.66, -0.4] } }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[49] flex flex-col bg-white"
            style={{ height: "100dvh" }}
          >
            {/* Dark gradient at top — keeps logo + hamburger legible */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none z-0"
              style={{
                height: "76px",
                background: "linear-gradient(180deg, rgba(5,15,12,0.92) 0%, rgba(5,15,12,0.0) 100%)",
              }}
            />

            {/* Teal top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/40 via-primary to-primary/40 z-10" />

            {/* ── Nav area — scrollable ── */}
            <nav
              className="relative z-[1] flex-1 min-h-0 overflow-y-auto px-7 sm:px-10"
              style={{ paddingTop: scrolled ? "60px" : "68px" }}
            >
              <div className="flex flex-col mt-8 gap-0.5">
                {navItems.map((item, index) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === "/uslugi" && pathname.startsWith("/uslugi"));

                  if (item.hasSubmenu) {
                    return (
                      <div key={item.href}>
                        <motion.div
                          initial={{ opacity: 0, y: 22 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.52, delay: 0.07 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center justify-between"
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "group py-2.5 text-[1.9rem] sm:text-[2.3rem] leading-tight font-extrabold tracking-tight transition-colors duration-200",
                              isActive ? "text-primary" : "text-[#1b2b28]"
                            )}
                          >
                            <span className="relative overflow-hidden inline-flex flex-col" style={{ height: "1.15em" }}>
                              <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                                {item.label}
                              </span>
                              <span aria-hidden className="absolute inset-x-0 top-full block text-primary will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                                {item.label}
                              </span>
                            </span>
                          </Link>
                          <button
                            onClick={() => setServicesExpanded(!servicesExpanded)}
                            className="p-2 text-[#1b2b28]/30 hover:text-primary transition-colors"
                            aria-label="Expand services"
                          >
                            <motion.div
                              animate={{ rotate: servicesExpanded ? 90 : 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </motion.div>
                          </button>
                        </motion.div>

                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 pl-5 border-l border-primary/25 pb-3 pt-1 space-y-0.5">
                                {servicesConfig.map((service) => (
                                  <Link
                                    key={service.id}
                                    href={`/uslugi/${service.slug}`}
                                    className="block py-2 text-[15px] text-[#1b2b28]/45 hover:text-primary transition-colors"
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setServicesExpanded(false);
                                    }}
                                  >
                                    {service.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.52, delay: 0.07 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "group block py-2.5 text-[1.9rem] sm:text-[2.3rem] leading-tight font-extrabold tracking-tight transition-colors duration-200",
                          isActive ? "text-primary" : "text-[#1b2b28]"
                        )}
                      >
                        <span className="relative overflow-hidden inline-flex flex-col" style={{ height: "1.15em" }}>
                          <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                            {item.label}
                          </span>
                          <span aria-hidden className="absolute inset-x-0 top-full block text-primary will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                            {item.label}
                          </span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Hairline */}
            <div className="relative z-[1] flex-shrink-0 mx-7 sm:mx-10 h-px bg-[#1b2b28]/10" />

            {/* ── Footer: contact + social + CTA ── */}
            <motion.div
              className="relative z-[1] flex-shrink-0 px-7 sm:px-10 pt-5"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.4 }}
            >
              <div className="space-y-2.5 mb-5">
                <a href="mailto:office@takiev.bg" className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-primary/70 flex-shrink-0" />
                  <span className="text-[14px] text-[#1b2b28]/50 group-hover:text-[#1b2b28]/80 transition-colors">
                    office@takiev.bg
                  </span>
                </a>
                <a href="tel:+359899080016" className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-primary/70 flex-shrink-0" />
                  <span className="text-[14px] text-[#1b2b28]/50 group-hover:text-[#1b2b28]/80 transition-colors">
                    +359 89 908 0016
                  </span>
                </a>
                <a
                  href="https://www.google.com/maps/place/Takiev+Finance+EOOD/@42.697707877149,23.319877890847863,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#1b2b28]/50 group-hover:text-[#1b2b28]/80 transition-colors leading-snug">
                    бул. „Ал. Стамболийски" 30Б, София
                  </span>
                </a>
              </div>

              <div className="flex items-center justify-between">
                {/* Social icons */}
                <div className="flex items-center gap-1">
                  {[
                    {
                      href: "https://www.facebook.com/n.takiev",
                      label: "Facebook",
                      icon: <Facebook className="w-4 h-4" />,
                    },
                    {
                      href: "https://www.linkedin.com/company/takiev-finance/",
                      label: "LinkedIn",
                      icon: <Linkedin className="w-4 h-4" />,
                    },
                    {
                      href: "https://www.youtube.com/@nikolaytakiev6221",
                      label: "YouTube",
                      icon: <Youtube className="w-4 h-4" />,
                    },
                    {
                      href: "https://www.tiktok.com/@n.takiev",
                      label: "TikTok",
                      icon: (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      ),
                    },
                  ].map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-lg text-[#1b2b28]/30 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div>

                {/* CTA button — opens modal */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setContactModalOpen(true);
                  }}
                  className="group flex items-center gap-2 bg-[#1b2b28] text-white px-5 py-2.5 rounded-xl text-sm font-semibold overflow-hidden"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="relative overflow-hidden inline-flex flex-col" style={{ height: "1.15em" }}>
                    <span className="block will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                      Свържи се
                    </span>
                    <span aria-hidden className="absolute inset-x-0 top-full block text-primary will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                      Свържи се
                    </span>
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal / Side Panel */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}
