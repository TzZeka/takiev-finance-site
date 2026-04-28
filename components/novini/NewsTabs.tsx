"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NewsSource } from "@/types/novini";

type TabId = "all" | NewsSource["id"];

interface Tab {
  id: TabId;
  label: string;
  count: number;
}

interface NewsTabsProps {
  tabs: Tab[];
  active: TabId;
  onChange: (id: TabId) => void;
}

export function NewsTabs({ tabs, active, onChange }: NewsTabsProps) {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-full border overflow-x-auto scrollbar-hide"
      style={{ background: "rgba(64,81,78,0.05)", borderColor: "rgba(64,81,78,0.1)" }}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 flex-shrink-0"
            )}
            style={{ color: isActive ? "var(--color-dark)" : "var(--color-surface-raised)" }}
          >
            {isActive && (
              <motion.span
                layoutId="activeNewsTab"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            <span
              className="relative z-10 text-xs px-1.5 py-0.5 rounded-md tabular-nums"
              style={
                isActive
                  ? { background: "rgba(var(--color-primary-rgb),0.10)", color: "var(--color-primary-link)" }
                  : { background: "rgba(var(--color-dark-rgb),0.07)", color: "var(--color-surface-raised)" }
              }
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
