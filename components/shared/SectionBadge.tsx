"use client";

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-8 bg-primary/50" />
      <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary/80">
        {children}
      </span>
      <span className="h-px w-8 bg-primary/50" />
    </div>
  );
}
