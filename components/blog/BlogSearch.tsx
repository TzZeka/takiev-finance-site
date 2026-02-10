"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Search, X, FileText, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchablePost {
  title: string;
  slug: string;
  tags?: string[];
}

interface BlogSearchProps {
  onSearch: (query: string) => void;
  posts?: SearchablePost[];
  placeholder?: string;
}

interface Suggestion {
  type: "title" | "tag";
  text: string;
  slug?: string;
  tags?: string[];
  matchStart: number;
  matchEnd: number;
}

function highlightMatch(text: string, start: number, end: number) {
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
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return null;

  let score = 1;
  if (idx === 0) score = 3;
  else if (lower[idx - 1] === " " || lower[idx - 1] === "-") score = 2;

  return { start: idx, end: idx + q.length, score };
}

function scrollToPost(slug: string) {
  const el = document.getElementById(`post-${slug}`);
  if (el) {
    const offset = 100;
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

export function BlogSearch({ onSearch, posts = [], placeholder = "Търсене в статии..." }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Build suggestions
  const suggestions = useMemo((): Suggestion[] => {
    if (!query || query.length < 2 || posts.length === 0) return [];
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
      if (a.type !== b.type) return a.type === "tag" ? -1 : 1;
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
  useEffect(() => {
    if (!showSuggestions || !wrapperRef.current) return;
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
  }, [showSuggestions]);

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
    <div ref={wrapperRef} className="w-full max-w-lg">
      {/* Inset search input */}
      <div
        className={cn(
          "relative bg-black/20 rounded-xl border transition-[transform,border-color] duration-300",
          isFocused
            ? "scale-[1.03] border-primary/25 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),inset_0_-1px_2px_rgba(255,255,255,0.05)]"
            : "border-white/5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),inset_0_-1px_2px_rgba(255,255,255,0.05)]"
        )}
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 z-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent text-foreground placeholder:text-slate-500 pl-10 pr-10 py-3 text-sm rounded-xl focus:outline-none transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-foreground transition-colors z-10"
            aria-label="Изчисти търсенето"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Inline suggestions - pushes content below */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          showSuggestions ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl">
          <ul className="p-1.5 space-y-0.5">
            {suggestions.map((s, i) => (
              <li key={`${s.type}-${s.text}-${i}`}>
                {s.type === "title" ? (
                  <button
                    onClick={() => handleSelect(s)}
                    className={cn(
                      "w-full flex items-start gap-3 px-3.5 py-2.5 rounded-lg transition-colors duration-150 text-left",
                      selectedIdx === i
                        ? "bg-primary/10"
                        : "hover:bg-white/5"
                    )}
                  >
                    <FileText className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-slate-200 line-clamp-1">
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
                        ? "bg-primary/10"
                        : "hover:bg-white/5"
                    )}
                  >
                    <Tag className="w-4 h-4 text-primary/60 flex-shrink-0" />
                    <span className="flex-1 text-sm text-slate-300">
                      {highlightMatch(s.text, s.matchStart, s.matchEnd)}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full flex-shrink-0">
                      таг
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Footer hint */}
          <div className="border-t border-white/5 px-4 py-2 flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd>
              навигация
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↵</kbd>
              избор
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout | null = null;

  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}
