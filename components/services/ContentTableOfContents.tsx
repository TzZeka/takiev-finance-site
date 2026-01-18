"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface ContentTableOfContentsProps {
  items: TOCItem[];
  onContact?: (packageName?: string) => void;
}

export function ContentTableOfContents({ items, onContact }: ContentTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
  }, []);

  // Handle scroll - show TOC from introduction to end of content
  useEffect(() => {
    const handleScroll = () => {
      const introSection = document.getElementById("introduction");
      const lastSection = document.getElementById("et-service");

      if (!introSection || !lastSection) return;

      const introRect = introSection.getBoundingClientRect();
      const lastRect = lastSection.getBoundingClientRect();

      const shouldShow = introRect.top <= 250 && lastRect.bottom > 100;
      setIsVisible(shouldShow);

      if (shouldShow) {
        const totalScrollDistance = lastRect.bottom - introRect.top;
        const scrolled = 250 - introRect.top;
        const progress = Math.min(Math.max((scrolled / totalScrollDistance) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      { rootMargin: "-30% 0% -50% 0%" }
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
      const headerOffset = 120;
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-6 top-0 bottom-0 z-40 flex items-center pointer-events-none"
        >
          <div className="bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl w-64 pointer-events-auto">
            {/* Header */}
            <div className="p-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <List className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-white text-sm">Съдържание</h3>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  animate={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-3">
              <ul className="space-y-1">
                {groupedItems.map((group) => {
                  const isActive = activeId === group.parent.id;
                  const isExpanded = expandedSections.has(group.parent.id);
                  const hasChildren = group.children.length > 0;
                  const isChildActive = group.children.some((c) => c.id === activeId);

                  return (
                    <li key={group.parent.id}>
                      <div className="relative">
                        {/* Active indicator with smooth transition */}
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
              <div className="p-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => onContact?.()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-primary/90 hover:bg-primary text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Свържете се с нас
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
