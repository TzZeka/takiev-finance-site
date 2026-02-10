"use client";

import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function BlogFilters({ tags, selectedTag, onTagSelect }: BlogFiltersProps) {
  if (tags.length === 0) return null;

  const baseClass = "relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-out";
  const insetClass = "bg-black/20 text-muted-foreground shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-1px_2px_rgba(255,255,255,0.05)] hover:bg-black/30 hover:text-foreground border border-white/5";
  const activeClass = "bg-primary text-white border border-transparent shadow-none";

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-wrap justify-start items-center gap-2 pb-1">
        {/* Filter badge */}
        <span className="bg-white/10 text-slate-400 px-3 py-1.5 rounded-full text-sm font-medium">
          Филтър:
        </span>
        <button
          onClick={() => onTagSelect(null)}
          className={cn(baseClass, selectedTag === null ? activeClass : insetClass)}
        >
          <span className="relative z-10">Всички</span>
          <span
            className={cn(
              "absolute inset-0 bg-primary rounded-full transition-transform duration-300 ease-out origin-center",
              selectedTag === null ? "scale-100" : "scale-0"
            )}
          />
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(baseClass, selectedTag === tag ? activeClass : insetClass)}
          >
            <span className="relative z-10">{tag}</span>
            <span
              className={cn(
                "absolute inset-0 bg-primary rounded-full transition-transform duration-300 ease-out origin-center",
                selectedTag === tag ? "scale-100" : "scale-0"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
