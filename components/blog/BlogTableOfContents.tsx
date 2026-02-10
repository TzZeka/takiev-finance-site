"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, ChevronDown, ChevronUp, PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  headings: Heading[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function BlogTableOfContents({ headings, isCollapsed, onToggleCollapse }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isStuck, setIsStuck] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [autoCollapsed, setAutoCollapsed] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const wasManuallyExpanded = useRef(false);

  // Group headings hierarchically - H2 as parents, H3/H4 as children
  // If no H2s exist, find the minimum level and use that as the parent level
  const groupedHeadings = useMemo(() => {
    const groups: Array<{
      heading: Heading;
      children: Heading[];
    }> = [];

    if (headings.length === 0) return groups;

    // Find the minimum heading level to use as the "parent" level
    const minLevel = Math.min(...headings.map((h) => h.level));

    let currentGroup: { heading: Heading; children: Heading[] } | null = null;

    headings.forEach((heading) => {
      if (heading.level === minLevel) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = { heading, children: [] };
      } else if (currentGroup && heading.level > minLevel) {
        currentGroup.children.push(heading);
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }, [headings]);

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Auto-expand all sections on mount
  useEffect(() => {
    const allIds = new Set(groupedHeadings.map((g) => g.heading.id));
    setExpandedSections(allIds);
  }, [groupedHeadings.length]);

  // IntersectionObserver for active section tracking
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

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Handle scroll progress, sticky state, and auto-collapse near footer
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      const footer = document.querySelector("footer");
      const tocElement = tocRef.current;

      if (footer && tocElement) {
        const footerRect = footer.getBoundingClientRect();
        const tocRect = tocElement.getBoundingClientRect();
        const headerAndNavHeight = 96;
        const availableSpace = footerRect.top - headerAndNavHeight;

        // Auto-collapse when there's not enough space
        if (availableSpace < 300 && !isCollapsed && !wasManuallyExpanded.current) {
          setAutoCollapsed(true);
          onToggleCollapse();
        }
        // Auto-expand when there's enough space again
        else if (availableSpace >= 450 && autoCollapsed && isCollapsed) {
          setAutoCollapsed(false);
          wasManuallyExpanded.current = false;
          onToggleCollapse();
        }

        // Reset manual flag when scrolled back to top
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsMobileOpen(false);
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

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button - Fixed at bottom right */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-full shadow-lg border border-white/10"
        >
          <List className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Съдържание</span>
          {isMobileOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile TOC Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed bottom-20 right-4 left-4 z-40 max-h-[60vh] overflow-auto"
          >
            <div className="bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <List className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-white text-sm">Съдържание</h3>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>
              <nav className="p-3 max-h-[40vh] overflow-y-auto custom-scrollbar">
                <ul className="space-y-1">
                  {groupedHeadings.map((group) => (
                    <MobileTOCItem
                      key={group.heading.id}
                      group={group}
                      activeId={activeId}
                      expandedSections={expandedSections}
                      onToggle={toggleSection}
                      onNavigate={scrollToSection}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop TOC - Sidebar with collapsible pattern */}
      <div
        ref={tocRef}
        className={cn(
          "hidden lg:block transition-all duration-300",
          isStuck ? "relative" : "sticky top-24"
        )}
      >
        <div className="bg-slate-900/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
                    {groupedHeadings.map((group) => {
                      const isActive = activeId === group.heading.id;
                      const isExpanded = expandedSections.has(group.heading.id);
                      const hasChildren = group.children.length > 0;
                      const isChildActive = group.children.some((c) => c.id === activeId);

                      return (
                        <li key={group.heading.id}>
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
                                  onClick={() => toggleSection(group.heading.id)}
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
                                onClick={() => scrollToSection(group.heading.id)}
                                className={cn(
                                  "flex-1 text-left text-[13px] py-1.5 px-2 rounded transition-all duration-200",
                                  hasChildren ? "" : "ml-6",
                                  isActive || isChildActive
                                    ? "text-primary font-medium"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                )}
                              >
                                {group.heading.text}
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
                                            {child.text}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

// Mobile TOC Item component
function MobileTOCItem({
  group,
  activeId,
  expandedSections,
  onToggle,
  onNavigate,
}: {
  group: { heading: Heading; children: Heading[] };
  activeId: string;
  expandedSections: Set<string>;
  onToggle: (id: string) => void;
  onNavigate: (id: string) => void;
}) {
  const isActive = activeId === group.heading.id;
  const isExpanded = expandedSections.has(group.heading.id);
  const hasChildren = group.children.length > 0;
  const isChildActive = group.children.some((c) => c.id === activeId);

  return (
    <li>
      <div className="relative">
        <div className="flex items-center gap-1">
          {hasChildren && (
            <button
              onClick={() => onToggle(group.heading.id)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <ChevronRight
                className={cn(
                  "w-3.5 h-3.5 text-white/50 transition-transform duration-200",
                  isExpanded && "rotate-90"
                )}
              />
            </button>
          )}

          <button
            onClick={() => onNavigate(group.heading.id)}
            className={cn(
              "flex-1 text-left text-sm py-2 px-2 rounded transition-all duration-200",
              hasChildren ? "" : "ml-6",
              isActive || isChildActive
                ? "text-primary font-medium"
                : "text-white/70"
            )}
          >
            {group.heading.text}
          </button>
        </div>

        {hasChildren && isExpanded && (
          <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
            {group.children.map((child) => {
              const isChildItemActive = activeId === child.id;
              return (
                <li key={child.id}>
                  <button
                    onClick={() => onNavigate(child.id)}
                    className={cn(
                      "w-full text-left text-xs py-1.5 px-2 rounded transition-all duration-200",
                      isChildItemActive
                        ? "text-primary font-medium bg-primary/10"
                        : "text-white/50"
                    )}
                  >
                    {child.text}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
}
