"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, ChevronLeft, Phone, MessageSquare, PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface ContentTableOfContentsProps {
  items: TOCItem[];
  onContact?: (packageName?: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ContentTableOfContents({
  items,
  onContact,
  isCollapsed,
  onToggleCollapse
}: ContentTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isStuck, setIsStuck] = useState(false);
  const [autoCollapsed, setAutoCollapsed] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const wasManuallyExpanded = useRef(false);

  // Group items by parent (level 1)
  const groupedItems = items.reduce<Array<{ parent: TOCItem; children: TOCItem[] }>>(
    (acc, item) => {
      if (item.level === 1) {
        acc.push({ parent: item, children: [] });
      } else if (acc.length > 0) {
        acc[acc.length - 1].children.push(item);
      }
      return acc;
    },
    []
  );

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Auto-expand all sections on mount
  useEffect(() => {
    const allIds = new Set(groupedItems.map((g) => g.parent.id));
    setExpandedSections(allIds);
  }, [groupedItems.length]);

  // Handle scroll progress, sticky state, and auto-collapse near footer
  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById("business-forms");
      const lastSection = document.getElementById("et-service");
      const footer = document.querySelector("footer");
      const tocElement = tocRef.current;

      if (!firstSection || !lastSection) return;

      const firstRect = firstSection.getBoundingClientRect();
      const lastRect = lastSection.getBoundingClientRect();

      // Calculate scroll progress
      const totalScrollDistance = lastRect.bottom - firstRect.top;
      const offset = window.innerWidth >= 1280 ? 152 : window.innerWidth >= 768 ? 136 : 120;
      const scrolled = offset - firstRect.top;
      const progress = Math.min(Math.max((scrolled / totalScrollDistance) * 100, 0), 100);
      setScrollProgress(progress);

      // Check if should stop sticky before footer and auto-collapse
      if (footer && tocElement) {
        const footerRect = footer.getBoundingClientRect();
        const tocRect = tocElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const headerAndNavHeight = 140; // header + tab navigation
        const availableSpace = footerRect.top - headerAndNavHeight;

        // Auto-collapse when there's not enough space (less than 300px available)
        if (availableSpace < 300 && !isCollapsed && !wasManuallyExpanded.current) {
          setAutoCollapsed(true);
          onToggleCollapse();
        }
        // Auto-expand when there's enough space again (only if was auto-collapsed, not manually)
        else if (availableSpace >= 450 && autoCollapsed && isCollapsed) {
          setAutoCollapsed(false);
          wasManuallyExpanded.current = false;
          onToggleCollapse();
        }

        // Reset manual flag when scrolled back to top of content
        if (progress < 10) {
          wasManuallyExpanded.current = false;
        }

        if (footerRect.top < tocRect.bottom + 40) {
          setIsStuck(true);
        } else {
          setIsStuck(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCollapsed, autoCollapsed, onToggleCollapse]);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -50% 0%" }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Account for sticky header + service navigation bar
      const headerOffset = window.innerWidth >= 1280 ? 152 : window.innerWidth >= 768 ? 136 : 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (items.length === 0) return null;

  return (
    <div
      ref={tocRef}
      className="transition-all duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="py-6 px-2 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/5 transition-all duration-300 min-h-[220px]"
              onClick={() => {
                wasManuallyExpanded.current = true;
                setAutoCollapsed(false);
                onToggleCollapse();
              }}
            >
              <div className="flex flex-col items-center justify-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <PanelRightOpen className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
                </motion.div>
                <List className="w-5 h-5 text-primary" />
                <span
                  className="text-xs text-white/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-1"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Съдържание
                </span>
                {/* Mini progress indicator */}
                <div className="w-1.5 h-20 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="w-full bg-gradient-to-b from-primary to-primary/70 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${scrollProgress}%` }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="flex flex-col max-h-[calc(100vh-10rem)]"
            >
              {/* Header */}
              <div className="p-4 pb-3 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-white text-sm">Съдържание</h3>
                  </div>
                  <motion.button
                    onClick={() => {
                      wasManuallyExpanded.current = false;
                      onToggleCollapse();
                    }}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                    aria-label="Скрий съдържанието"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <PanelRightClose className="w-4 h-4 text-white/70 group-hover:text-primary transition-colors duration-300" />
                  </motion.button>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-3 overflow-y-auto flex-1 custom-scrollbar">
                <ul className="space-y-1">
                  {groupedItems.map((group) => {
                    const isActive = activeId === group.parent.id;
                    const isExpanded = expandedSections.has(group.parent.id);
                    const hasChildren = group.children.length > 0;
                    const isChildActive = group.children.some((c) => c.id === activeId);

                    return (
                      <li key={group.parent.id}>
                        <div className="relative">
                          {/* Active indicator */}
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-primary"
                            initial={false}
                            animate={{
                              opacity: isActive || isChildActive ? 1 : 0,
                              scaleY: isActive || isChildActive ? 1 : 0,
                            }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            style={{ originY: 0.5 }}
                          />

                          <div className="flex items-center gap-1">
                            {hasChildren && (
                              <button
                                onClick={() => toggleSection(group.parent.id)}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                              >
                                <motion.div
                                  animate={{ rotate: isExpanded ? 90 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                                </motion.div>
                              </button>
                            )}

                            <button
                              onClick={() => scrollToSection(group.parent.id)}
                              className={cn(
                                "flex-1 text-left text-[13px] py-1.5 px-2 rounded transition-all duration-200",
                                hasChildren ? "" : "ml-6",
                                isActive || isChildActive
                                  ? "text-primary font-medium"
                                  : "text-white/70 hover:text-white hover:bg-white/5"
                              )}
                            >
                              {group.parent.title}
                            </button>
                          </div>

                          {/* Nested children */}
                          <AnimatePresence initial={false}>
                            {hasChildren && isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                              >
                                <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                                  {group.children.map((child) => {
                                    const isChildItemActive = activeId === child.id;
                                    return (
                                      <li key={child.id}>
                                        <button
                                          onClick={() => scrollToSection(child.id)}
                                          className={cn(
                                            "w-full text-left text-xs py-1 px-2 rounded transition-all duration-200",
                                            isChildItemActive
                                              ? "text-primary font-medium bg-primary/10"
                                              : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                          )}
                                        >
                                          {child.title}
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Contact */}
              {onContact && (
                <div className="p-3 pt-2 border-t border-white/10 flex-shrink-0">
                  <button
                    onClick={() => onContact?.()}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-primary/90 hover:bg-primary text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Свържете се
                  </button>
                  <a
                    href="tel:+359123456789"
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2 text-white/50 hover:text-white text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +359 123 456 789
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
