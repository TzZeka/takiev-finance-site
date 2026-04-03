"use client";

/**
 * FlipLabel — clean vertical text-flip on hover.
 * Parent must have the `group` Tailwind class.
 */
export function FlipLabel({
  text,
  height = "1.1em",
}: {
  text: string;
  height?: string;
}) {
  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height, lineHeight: height, verticalAlign: "middle" }}
    >
      {/* Visible line */}
      <span
        className="flex transition-transform duration-300 group-hover:-translate-y-full"
        style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
      >
        {text}
      </span>
      {/* Hidden duplicate — slides in from below */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-full flex transition-transform duration-300 group-hover:-translate-y-full"
        style={{ transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)" }}
      >
        {text}
      </span>
    </span>
  );
}
