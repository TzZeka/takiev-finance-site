"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { servicesConfig } from "@/lib/services-config";
import { useQuickPanel } from "@/components/layout/QuickPanelContext";
import { BricksIcon } from "@/components/layout/QuickPanel";
import { FlipLabel } from "@/components/ui/FlipLabel";

const navItems = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За нас" },
  { href: "/uslugi", label: "Услуги", hasDropdown: true },
  // QuickPanel button is inserted here (between index 2 and 3)
  { href: "/blog", label: "Блог", hasBlogDropdown: true },
  { href: "/video", label: "Видео" },
  { href: "/kontakti", label: "Контакти" },
];

const blogItems = [
  { href: "/novini", label: "Новини" },
  { href: "/msfo",   label: "Международни стандарти" },
];

const DROPDOWN_ID = "services-dropdown-menu";
const BLOG_DROPDOWN_ID = "blog-dropdown-menu";

// Clean minimal trigger button
function QuickPanelNavButton() {
  const { isOpen, setIsOpen, isVisible } = useQuickPanel();
  const [spinAngle, setSpinAngle] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
    <motion.button
      onClick={() => setIsOpen((v) => !v)}
      onMouseEnter={() => {
        setHovered(true);
        // Spin only when opening — no animation while panel is already open
        if (!isOpen) setSpinAngle((a) => a + 360);
      }}
      onMouseLeave={() => setHovered(false)}
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

    {/* Tooltip */}
    <AnimatePresence>
      {hovered && !isOpen && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none rounded-md px-2.5 py-1"
          style={{
            fontFamily: "'Mona Sans', sans-serif",
            fontVariationSettings: "'wght' 430, 'wdth' 100",
            fontSize: "0.68rem",
            letterSpacing: "0.06em",
            color: "#0d1f1c",
            background: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          Бърз панел
        </motion.span>
      )}
    </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [blogDropdownPos, setBlogDropdownPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blogDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownBtnRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const blogTriggerRef = useRef<HTMLDivElement>(null);
  const blogDropdownBtnRef = useRef<HTMLButtonElement>(null);
  const blogFirstItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const openDropdown = () => {
    const trigger = triggerRef.current;
    if (trigger) {
      const tRect = trigger.getBoundingClientRect();
      setDropdownPos({ top: tRect.bottom + 8, left: tRect.left });
    }
    setDropdownOpen(true);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    openDropdown();
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const handleToggleClick = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      openDropdown();
    }
  };

  // Keyboard handler on the chevron toggle button
  const handleBtnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openDropdown();
      setTimeout(() => firstItemRef.current?.focus(), 50);
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  // Keyboard handler inside the dropdown: Escape closes and returns focus
  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setDropdownOpen(false);
      dropdownBtnRef.current?.focus();
    }
  };

  const openBlogDropdown = () => {
    const trigger = blogTriggerRef.current;
    if (trigger) {
      const tRect = trigger.getBoundingClientRect();
      setBlogDropdownPos({ top: tRect.bottom + 8, left: tRect.left });
    }
    setBlogDropdownOpen(true);
  };

  const handleBlogMouseEnter = () => {
    if (blogDropdownTimeoutRef.current) clearTimeout(blogDropdownTimeoutRef.current);
    openBlogDropdown();
  };

  const handleBlogMouseLeave = () => {
    blogDropdownTimeoutRef.current = setTimeout(() => setBlogDropdownOpen(false), 150);
  };

  const handleBlogToggleClick = () => {
    if (blogDropdownOpen) {
      setBlogDropdownOpen(false);
    } else {
      openBlogDropdown();
    }
  };

  const handleBlogBtnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openBlogDropdown();
      setTimeout(() => blogFirstItemRef.current?.focus(), 50);
    } else if (e.key === "Escape") {
      setBlogDropdownOpen(false);
    }
  };

  const handleBlogDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setBlogDropdownOpen(false);
      blogDropdownBtnRef.current?.focus();
    }
  };

  return (
    <nav
      className="flex items-center justify-center gap-1 lg:gap-2"
      style={{
        fontFamily: "'Hubot Sans', sans-serif",
        fontVariationSettings: "'wght' 500, 'wdth' 100",
        fontWeight: 500,
        fontSize: "0.9rem",
      }}
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === "/uslugi" && pathname.startsWith("/uslugi")) ||
          (item.href === "/blog" && (pathname.startsWith("/blog") || pathname.startsWith("/novini")));

        if (item.hasBlogDropdown) {
          return (
            <React.Fragment key={item.href}>
              <motion.div
                ref={blogTriggerRef}
                className="group relative"
                onMouseEnter={handleBlogMouseEnter}
                onMouseLeave={handleBlogMouseLeave}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
              >
                <div
                  className={cn(
                    "relative transition-colors duration-300 rounded-lg whitespace-nowrap flex items-center gap-1 px-3 lg:px-4 py-2",
                    isActive ? "text-primary" : "text-white/85 hover:text-white"
                  )}
                >
                  <Link href={item.href}>
                    <FlipLabel text={item.label} />
                  </Link>
                  <button
                    ref={blogDropdownBtnRef}
                    aria-expanded={blogDropdownOpen}
                    aria-haspopup="menu"
                    aria-controls={BLOG_DROPDOWN_ID}
                    aria-label="Показване на подменю Блог"
                    onClick={handleBlogToggleClick}
                    onKeyDown={handleBlogBtnKeyDown}
                    className="p-0.5 flex items-center leading-none"
                  >
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 flex-shrink-0 transition-transform duration-200",
                        blogDropdownOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {mounted && createPortal(
                <AnimatePresence>
                  {blogDropdownOpen && (
                    <motion.div
                      id={BLOG_DROPDOWN_ID}
                      role="menu"
                      aria-label="Блог"
                      onKeyDown={handleBlogDropdownKeyDown}
                      onMouseEnter={handleBlogMouseEnter}
                      onMouseLeave={handleBlogMouseLeave}
                      initial={{ clipPath: "inset(0 0 100% 0 round 14px)", opacity: 0 }}
                      animate={{ clipPath: "inset(0 0 0% 0 round 14px)", opacity: 1 }}
                      exit={{
                        clipPath: "inset(0 0 100% 0 round 14px)",
                        opacity: 0,
                        transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      style={{
                        position: "fixed",
                        top: blogDropdownPos.top,
                        left: blogDropdownPos.left,
                        width: "180px",
                        zIndex: 9999,
                        background: "rgba(16, 30, 26, 0.96)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderTop: "1px solid rgba(25, 191, 183, 0.18)",
                        borderRadius: "14px",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(25,191,183,0.05)",
                      }}
                    >
                      <div className="py-2">
                        {blogItems.map((blogItem, i) => (
                          <motion.div
                            key={blogItem.href}
                            role="none"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.07 + i * 0.04, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          >
                            <Link
                              ref={i === 0 ? blogFirstItemRef : undefined}
                              role="menuitem"
                              href={blogItem.href}
                              className="block px-5 py-3 text-sm text-white/55 hover:text-white hover:bg-white/[0.05] transition-colors"
                              onClick={() => setBlogDropdownOpen(false)}
                            >
                              {blogItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>,
                document.body
              )}
            </React.Fragment>
          );
        }

        if (item.hasDropdown) {
          return (
            <React.Fragment key={item.href}>
              <motion.div
                ref={triggerRef}
                className="group relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                transition={{ type: "spring", stiffness: 450, damping: 22 }}
              >
                <div
                  className={cn(
                    "relative transition-colors duration-300 rounded-lg whitespace-nowrap flex items-center gap-1 px-3 lg:px-4 py-2",
                    isActive ? "text-primary" : "text-white/85 hover:text-white"
                  )}
                >
                  <Link href={item.href}>
                    <FlipLabel text={item.label} />
                  </Link>

                  {/* Separate chevron button — provides keyboard access to the dropdown */}
                  <button
                    ref={dropdownBtnRef}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="menu"
                    aria-controls={DROPDOWN_ID}
                    aria-label="Показване на подменю Услуги"
                    onClick={handleToggleClick}
                    onKeyDown={handleBtnKeyDown}
                    className="p-0.5 flex items-center leading-none"
                  >
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 flex-shrink-0 transition-transform duration-200",
                        dropdownOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* QuickPanel button — inserted after Услуги */}
              <QuickPanelNavButton />

              {/* Portal dropdown — rendered outside header to avoid clip-path clipping */}
              {mounted && createPortal(
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      id={DROPDOWN_ID}
                      role="menu"
                      aria-label="Услуги"
                      onKeyDown={handleDropdownKeyDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      initial={{ clipPath: "inset(0 0 100% 0 round 14px)", opacity: 0 }}
                      animate={{ clipPath: "inset(0 0 0% 0 round 14px)", opacity: 1 }}
                      exit={{
                        clipPath: "inset(0 0 100% 0 round 14px)",
                        opacity: 0,
                        transition: { duration: 0.28, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      style={{
                        position: "fixed",
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: "260px",
                        zIndex: 9999,
                        background: "rgba(16, 30, 26, 0.96)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderTop: "1px solid rgba(25, 191, 183, 0.18)",
                        borderRadius: "14px",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(25,191,183,0.05)",
                      }}
                    >
                      <div className="py-2">
                        {servicesConfig.map((service, i) => (
                          <motion.div
                            key={service.id}
                            role="none"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.07 + i * 0.04,
                              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                            }}
                          >
                            <Link
                              ref={i === 0 ? firstItemRef : undefined}
                              role="menuitem"
                              href={`/uslugi/${service.slug}`}
                              className="block px-5 py-3 text-sm text-white/55 hover:text-white hover:bg-white/[0.05] transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              {service.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>,
                document.body
              )}
            </React.Fragment>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative transition-colors duration-300 rounded-lg whitespace-nowrap px-3 lg:px-4 py-2",
              isActive ? "text-primary" : "text-white/85 hover:text-white"
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
