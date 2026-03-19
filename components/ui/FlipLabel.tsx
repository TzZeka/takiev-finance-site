/**
 * FlipLabel — reusable text-flip hover animation.
 * Requires a parent with the `group` Tailwind class to trigger the animation.
 *
 * height should match lineHeight so `translate-y-full` moves exactly one text line.
 * 1.2em is the correct value for Cyrillic text (descenders reach ~0.2em below baseline).
 */
export function FlipLabel({
  text,
  height = "1.2em",
}: {
  text: string;
  height?: string;
}) {
  return (
    <span
      className="relative overflow-hidden inline-flex flex-col"
      style={{ height, lineHeight: height }}
    >
      <span className="block will-change-transform transition-transform duration-300 ease-expo-out group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 top-full block will-change-transform transition-transform duration-300 ease-expo-out group-hover:-translate-y-full"
      >
        {text}
      </span>
    </span>
  );
}
