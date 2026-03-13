"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Search, X, FileText, Tag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity/client";
import { cn } from "@/lib/utils";

interface SearchablePost {
  title: string;
  slug: string;
  tags?: string[];
  mainImage?: any;
}

interface BlogSearchProps {
  onSearch: (query: string) => void;
  posts?: SearchablePost[];
  placeholder?: string;
  onExpandedHeightChange?: (height: number) => void;
}

interface Suggestion {
  type: "title" | "tag";
  text: string;
  slug?: string;
  tags?: string[];
  mainImage?: any;
  matchStart: number;
  matchEnd: number;
}

function highlightMatch(text: string, start: number, end: number) {
  if (!text) return null;
  if (start < 0 || end <= start) return <>{text}</>;
  return (
    <>
      {text.slice(0, start)}
      <span className="text-primary font-semibold">{text.slice(start, end)}</span>
      {text.slice(end)}
    </>
  );
}

function findBestMatch(text: string, query: string): { start: number; end: number; score: number } | null {
  if (!query || typeof text !== 'string') return null;
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Try word-start match first (higher score)
  const wordStartIdx = textLower.search(new RegExp(`(^|[\\s\\-])${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"));
  if (wordStartIdx !== -1) {
    const isWordStart = wordStartIdx === 0 || /[\s\-]/.test(text[wordStartIdx]);
    const start = isWordStart && wordStartIdx !== 0 ? wordStartIdx + 1 : wordStartIdx;
    return { start, end: start + query.length, score: wordStartIdx === 0 ? 3 : 2 };
  }

  // Fallback: substring match anywhere (lower score — important for Bulgarian)
  const subIdx = textLower.indexOf(queryLower);
  if (subIdx !== -1) {
    return { start: subIdx, end: subIdx + query.length, score: 1 };
  }

  return null;
}

function scrollToPost(slug: string) {
  const el = document.getElementById(`post-${slug}`);
  if (el) {
    const offset = 250; // Increased offset so the card is completely visible below the sticky header
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    // Brief highlight flash
    el.style.transition = "box-shadow 0.3s ease";
    el.style.boxShadow = "0 0 0 2px rgba(25, 191, 183, 0.5), 0 0 20px rgba(25, 191, 183, 0.15)";
    el.style.borderRadius = "12px";
    setTimeout(() => {
      el.style.boxShadow = "";
    }, 1500);
  }
}

export function BlogSearch({ onSearch, posts = [], placeholder = "Търсене в статии и категории/таг...", onExpandedHeightChange }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Build suggestions
  const suggestions = useMemo((): Suggestion[] => {
    if (!query || query.length < 1 || posts.length === 0) return [];
    const q = query.toLowerCase();
    const results: Suggestion[] = [];
    const seenTags = new Set<string>();

    // Title matches - include post tags
    for (const post of posts) {
      const match = findBestMatch(post.title, q);
      if (match) {
        results.push({
          type: "title",
          text: post.title,
          slug: post.slug,
          tags: post.tags?.slice(0, 3),
          mainImage: post.mainImage,
          matchStart: match.start,
          matchEnd: match.end,
        });
      }
    }

    // Tag matches
    for (const post of posts) {
      if (!post.tags) continue;
      for (const tag of post.tags) {
        if (seenTags.has(tag.toLowerCase())) continue;
        const match = findBestMatch(tag, q);
        if (match) {
          seenTags.add(tag.toLowerCase());
          results.push({
            type: "tag",
            text: tag,
            matchStart: match.start,
            matchEnd: match.end,
          });
        }
      }
    }

    results.sort((a, b) => {
      // Titles always before tags
      if (a.type !== b.type) return a.type === "title" ? -1 : 1;
      // Within same type: higher score first
      const aMatch = findBestMatch(a.text, q);
      const bMatch = findBestMatch(b.text, q);
      return (bMatch?.score || 0) - (aMatch?.score || 0);
    });

    return results.slice(0, 7);
  }, [query, posts]);

  const showSuggestions = isFocused && suggestions.length > 0;

  useEffect(() => {
    setSelectedIdx(-1);
  }, [suggestions]);

  // Keep parent section fully visible when suggestions push content down
  // Notify parent of expanding height to slide main right-side content down
  useEffect(() => {
    if (showSuggestions && contentRef.current && wrapperRef.current) {
      // Approximate height of search overlay
      const expandedHeight = contentRef.current.getBoundingClientRect().height;
      onExpandedHeightChange?.(expandedHeight);

      const timer = setTimeout(() => {
        const section = wrapperRef.current?.closest(".rounded-2xl");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const overflow = rect.bottom - window.innerHeight + 16;
        if (overflow > 0) {
          window.scrollBy({ top: overflow, behavior: "smooth" });
        }
      }, 350);
      return () => clearTimeout(timer);
    } else {
      onExpandedHeightChange?.(0);
    }
  }, [showSuggestions, suggestions, onExpandedHeightChange]);

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (s: Suggestion) => {
    if (s.type === "title" && s.slug) {
      setQuery(s.text);
      onSearch(s.text);
      setIsFocused(false);
      setTimeout(() => scrollToPost(s.slug!), 150);
    } else if (s.type === "tag") {
      setQuery(s.text);
      onSearch(s.text);
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIdx >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIdx]);
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="w-full relative z-[100] min-h-[74px]">
      <div
        className={cn(
          "bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col absolute top-0 left-0 w-full",
          isFocused
            ? "border-primary/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            : "border-black/5 hover:border-black/10 z-[60] transition-all duration-300 ease-out",
          showSuggestions ? "lg:max-w-[800px]" : ""
        )}
      >
        {/* Input Area */}
        <div className="p-4 lg:p-5 relative flex-shrink-0">
          <Search className={cn(
            "absolute left-7 lg:left-8 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 z-10",
            isFocused ? "text-primary" : "text-slate-500"
          )} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full bg-slate-50 text-[#1b2b28] placeholder:text-slate-400 focus:placeholder-transparent pl-10 pr-10 py-2.5 text-[16px] lg:text-sm rounded-xl focus:outline-none transition-all duration-300 placeholder:transition-colors placeholder:duration-300"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-7 lg:right-8 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-all duration-500 hover:rotate-[360deg] z-10"
              aria-label="Изчисти търсенето"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Suggestions Area - expands seamlessly downward */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex-shrink-0",
            showSuggestions ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div ref={contentRef} className="px-4 lg:px-5 pb-4 lg:pb-5">
            <div className="border-t border-black/5 pt-3">
              <ul className="space-y-0.5">
                {suggestions.map((s, i) => (
                  <li key={`${s.type}-${s.text}-${i}`}>
                    {s.type === "title" ? (
                      <button
                        onClick={() => handleSelect(s)}
                        className={cn(
                          "w-full flex items-start gap-3 px-3.5 py-2.5 rounded-lg transition-colors duration-150 text-left",
                          selectedIdx === i
                            ? "bg-slate-50"
                            : "hover:bg-slate-50"
                        )}
                      >
                        {s.mainImage && s.mainImage.asset ? (
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-black/5 mt-0.5">
                            <Image
                              src={getImageUrl(s.mainImage)}
                              alt={s.text}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0 pr-4 ml-1">
                          <span className="text-[13px] text-[#1b2b28] whitespace-nowrap overflow-hidden text-ellipsis block font-medium">
                            {highlightMatch(s.text, s.matchStart, s.matchEnd)}
                          </span>
                          {s.tags && s.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {s.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0 mt-0.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelect(s)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors duration-150 text-left",
                          selectedIdx === i
                            ? "bg-slate-50"
                            : "hover:bg-slate-50"
                        )}
                      >
                        <Tag className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        <span className="flex-1 text-[13px] text-[#1b2b28] whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                          {highlightMatch(s.text, s.matchStart, s.matchEnd)}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 border border-black/5 px-2 py-0.5 rounded-full flex-shrink-0">
                          таг
                        </span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Footer hint */}
              <div className="border-t border-black/5 mt-2 pt-2 flex items-center justify-between gap-4 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-slate-100 border border-black/10 shadow-sm px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd>
                    навигация
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-slate-100 border border-black/10 shadow-sm px-1.5 py-0.5 rounded text-[10px]">↵</kbd>
                    избор
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#19BFB7]/80">
                  Резултати
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


