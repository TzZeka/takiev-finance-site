"use client";

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="h-px w-8 bg-primary/50" />
      <span
        className="tracking-[0.28em] uppercase text-primary"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontSize: "1rem",
        }}
      >
        {children}
      </span>
      <span className="h-px w-8 bg-primary/50" />
    </div>
  );
}
