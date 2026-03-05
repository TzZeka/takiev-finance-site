"use client";

import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function BlogFilters({ tags, selectedTag, onTagSelect }: BlogFiltersProps) {
  if (tags.length === 0) return null;

  const baseClass = "w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center justify-between group";
  const inactiveClass = "text-slate-600 hover:text-primary hover:bg-slate-50";
  const activeClass = "bg-primary/10 text-primary";

  return (
    <div className="flex flex-col gap-1 w-full pb-2">
      <button
        onClick={() => onTagSelect(null)}
        className={cn(baseClass, selectedTag === null ? activeClass : inactiveClass)}
      >
        <span>Всички статии</span>
        <span className={cn("w-1.5 h-1.5 rounded-full transition-transform duration-200", selectedTag === null ? "bg-primary scale-100" : "bg-transparent group-hover:bg-primary/40 scale-0 group-hover:scale-100")} />
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={cn(baseClass, selectedTag === tag ? activeClass : inactiveClass)}
        >
          <span>{tag}</span>
          <span className={cn("w-1.5 h-1.5 rounded-full transition-transform duration-200", selectedTag === tag ? "bg-primary scale-100" : "bg-transparent group-hover:bg-primary/40 scale-0 group-hover:scale-100")} />
        </button>
      ))}
    </div>
  );
}
