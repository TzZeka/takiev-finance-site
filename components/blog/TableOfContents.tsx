"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Group headings by parent H2 using useMemo to avoid recalculation
  const groupedHeadings = useMemo(() => {
    const groups: Array<{
      heading: Heading;
      children: Heading[];
    }> = [];

    let currentGroup: { heading: Heading; children: Heading[] } | null = null;

    headings.forEach((heading) => {
      if (heading.level === 2) {
        if (currentGroup) {
          groups.push(currentGroup);
        }
        currentGroup = { heading, children: [] };
      } else if (currentGroup && heading.level > 2) {
        currentGroup.children.push(heading);
      }
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    return groups;
  }, [headings]);

  // Initialize all sections as expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Auto-expand all sections when headings change
  useEffect(() => {
    const allIndices = new Set<number>();
    groupedHeadings.forEach((_, index) => allIndices.add(index));
    setExpandedSections(allIndices);
  }, [groupedHeadings]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="sticky top-24 h-[calc(100vh-7rem)] hidden xl:block"
    >
      <div className="h-full bg-white rounded-xl border-2 border-primary/10 shadow-lg overflow-hidden flex flex-col relative min-h-0">
        {/* Header with progress indicator */}
        <div className="relative p-6 pb-4 border-b border-primary/10 bg-white z-10 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <List className="w-5 h-5 text-primary" />
            </motion.div>
            <h3 className="font-bold text-dark">Съдържание</h3>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-1 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Scrollable content with custom scrollbar */}
        <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-6 py-4 custom-scrollbar">
          <ul className="space-y-2 pb-4">
            {groupedHeadings.map((group, groupIndex) => {
              const isActive = activeId === group.heading.id;
              const isExpanded = expandedSections.has(groupIndex);
              const hasChildren = group.children.length > 0;

              return (
                <motion.li
                  key={group.heading.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.05 }}
                >
                  <div className="relative">
                    {/* Active indicator line */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          exit={{ scaleY: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/50 rounded-full origin-top"
                        />
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-1">
                      {hasChildren && (
                        <button
                          onClick={() => toggleSection(groupIndex)}
                          className="p-1.5 hover:bg-primary/10 rounded-md transition-all duration-300 hover:scale-110"
                          aria-label={isExpanded ? "Скрий подсекции" : "Покажи подсекции"}
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                          </motion.div>
                        </button>
                      )}

                      <a
                        href={`#${group.heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(group.heading.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                        className={`flex-1 block text-sm py-2.5 px-4 rounded-lg transition-all duration-500 relative overflow-hidden ${
                          hasChildren ? "" : "ml-5"
                        } ${
                          isActive
                            ? "text-white font-semibold shadow-lg shadow-primary/20"
                            : "text-dark hover:text-primary"
                        }`}
                      >
                        {/* Animated background for active state */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: 0 }}
                              exit={{ x: "100%" }}
                              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                              className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/80"
                            />
                          )}
                        </AnimatePresence>

                        <span className="relative z-10">{group.heading.text}</span>
                      </a>
                    </div>

                    {/* Nested children */}
                    <AnimatePresence>
                      {hasChildren && isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                          className="ml-6 mt-2 space-y-1.5 overflow-hidden border-l-2 border-primary/10 pl-2"
                        >
                          {group.children.map((child, childIndex) => {
                            const isChildActive = activeId === child.id;
                            return (
                              <motion.li
                                key={child.id}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                  delay: childIndex * 0.05,
                                  duration: 0.3,
                                  ease: "easeOut"
                                }}
                                style={{ paddingLeft: `${(child.level - 3) * 12}px` }}
                              >
                                <a
                                  href={`#${child.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(child.id)?.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }}
                                  className={`block text-xs py-2 px-3 rounded-md transition-all duration-500 relative overflow-hidden ${
                                    isChildActive
                                      ? "text-white font-semibold shadow-md"
                                      : "text-muted-foreground hover:text-primary"
                                  }`}
                                >
                                  {/* Animated background for active child */}
                                  <AnimatePresence>
                                    {isChildActive && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                                        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"
                                      />
                                    )}
                                  </AnimatePresence>

                                  <span className="relative z-10 flex items-center gap-2">
                                    {isChildActive && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-1.5 h-1.5 bg-white rounded-full"
                                      />
                                    )}
                                    {child.text}
                                  </span>
                                </a>
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom decorative accent */}
        <div className="flex-shrink-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </motion.div>
  );
}
