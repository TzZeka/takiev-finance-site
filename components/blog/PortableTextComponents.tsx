import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity/client";

export const portableTextComponents = {
  block: {
    h1: ({ children, value }: any) => (
      <div className="mt-16 mb-8 scroll-mt-24">
        <h1 id={slugify(children, value._key)} className="text-3xl md:text-4xl font-bold text-amber-100 leading-tight tracking-tight">
          {children}
        </h1>
        <div className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />
      </div>
    ),
    h2: ({ children, value }: any) => (
      <div className="mt-14 mb-6 scroll-mt-24">
        <h2 id={slugify(children, value._key)} className="text-2xl md:text-3xl font-bold text-amber-100 leading-snug">
          {children}
        </h2>
        <div className="mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r from-primary/80 to-transparent" />
      </div>
    ),
    h3: ({ children, value }: any) => (
      <div className="mt-10 mb-5 scroll-mt-24">
        <h3 id={slugify(children, value._key)} className="text-xl md:text-2xl font-semibold text-amber-100/90 leading-snug">
          {children}
        </h3>
        <div className="mt-2.5 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
    ),
    h4: ({ children, value }: any) => (
      <div className="mt-8 mb-4 scroll-mt-24">
        <h4 id={slugify(children, value._key)} className="text-lg md:text-xl font-semibold text-amber-100/80">
          {children}
        </h4>
        <div className="mt-2 h-px w-8 rounded-full bg-primary/40" />
      </div>
    ),
    h5: ({ children, value }: any) => (
      <div className="mt-7 mb-3 scroll-mt-24">
        <h5 id={slugify(children, value._key)} className="text-base md:text-lg font-semibold text-amber-100/70">
          {children}
        </h5>
        <div className="mt-1.5 h-px w-6 rounded-full bg-primary/30" />
      </div>
    ),
    h6: ({ children, value }: any) => (
      <div className="mt-6 mb-3 scroll-mt-24">
        <h6 id={slugify(children, value._key)} className="text-sm md:text-base font-semibold text-amber-100/60 uppercase tracking-wide">
          {children}
        </h6>
      </div>
    ),
    normal: ({ children }: any) => (
      <p className="text-[17px] md:text-lg text-stone-300 leading-[2] mb-7 md:text-justify break-words tracking-[0.015em]">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative border-l-[3px] border-primary/70 pl-6 pr-5 py-5 my-10 bg-white/[0.04] rounded-r-2xl">
        <div className="text-[17px] text-stone-300 leading-[1.85] italic">
          {children}
        </div>
      </blockquote>
    ),
    center: ({ children }: any) => (
      <p className="text-[17px] md:text-lg text-stone-300 leading-[2] mb-7 text-center tracking-[0.015em]">
        {children}
      </p>
    ),
    right: ({ children }: any) => (
      <p className="text-[17px] md:text-lg text-stone-300 leading-[2] mb-7 text-right tracking-[0.015em]">
        {children}
      </p>
    ),
    justify: ({ children }: any) => (
      <p className="text-[17px] md:text-lg text-stone-300 leading-[2] mb-7 md:text-justify break-words tracking-[0.015em]">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc space-y-2 mb-8 text-stone-300 pl-6">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal space-y-2 mb-8 text-stone-300 pl-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-[17px] md:text-lg leading-[1.8] pl-1">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-[17px] md:text-lg leading-[1.8] pl-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-inherit">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-inherit">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-white/[0.06] text-primary/90 px-2 py-0.5 rounded-md text-[0.88em] font-mono border border-white/[0.08]">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const target = value?.href?.startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary hover:text-primary/80 font-medium underline underline-offset-[3px] decoration-primary/30 hover:decoration-primary/60 transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10 rounded-2xl overflow-hidden border border-white/[0.06]">
          <Image
            src={getImageUrl(value)}
            alt={value.alt || "Article image"}
            width={1200}
            height={675}
            className="w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-slate-400 text-center py-3 bg-white/[0.02] italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    table: ({ value }: any) => {
      if (!value?.rows?.length) return null;
      const hasHeader = value.hasHeaderRow !== false;
      const headerRow = hasHeader ? value.rows[0] : null;
      const bodyRows = hasHeader ? value.rows.slice(1) : value.rows;

      return (
        <figure className="my-10">
          {value.title && (
            <figcaption className="text-sm text-slate-400 mb-3 font-medium tracking-wide uppercase">
              {value.title}
            </figcaption>
          )}
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              {headerRow && (
                <thead>
                  <tr className="bg-white/[0.05]">
                    {headerRow.cells?.map((cell: string, i: number) => (
                      <th
                        key={i}
                        className="px-5 py-3.5 text-white font-semibold border-b border-white/[0.08] whitespace-nowrap text-[13px] uppercase tracking-wider"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row: any, rowIndex: number) => (
                  <tr
                    key={row._key || rowIndex}
                    className="border-b border-white/[0.04] hover:bg-white/[0.04] even:bg-white/[0.015] transition-colors"
                  >
                    {row.cells?.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="px-5 py-3 text-slate-300 text-[15px]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    },
  },
};

// Helper function to create slugs from headings
function slugify(children: any, fallback: string = "heading"): string {
  if (!children) return fallback;

  let text = "";

  // Recursively extract text from any structure
  function extractText(node: any): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";
    if (node?.text) return node.text;
    if (node?.props?.children) return extractText(node.props.children);
    if (Array.isArray(node)) return node.map(extractText).join("");
    return "";
  }

  text = extractText(children);

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0400-\u04FF-]/g, "") // Support Cyrillic characters
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  return slug || fallback;
}

// Extract headings for Table of Contents
export function extractHeadings(blocks: any[]): Array<{ id: string; text: string; level: number }> {
  if (!blocks || !Array.isArray(blocks)) {
    return [];
  }

  const headings = blocks
    .filter((block) => {
      return block && block._type === "block" && block.style && /^h[1-6]$/.test(block.style);
    })
    .map((block, index) => {
      // Extract text from children (same format as Sanity block)
      const textContent = block.children
        ?.filter((child: any) => child && child.text)
        .map((child: any) => child.text)
        .join("")
        .trim() || "";

      // Generate ID using the same slugify function as the components
      // Must match how the rendering components call slugify(children, value._key)
      const id = slugify(textContent, block._key || `heading-${index}`) || block._key || `heading-${index}`;

      return {
        id,
        text: textContent || `Заглавие ${index + 1}`,
        level: parseInt(block.style.replace("h", "")),
      };
    })
    .filter((heading) => heading.text && heading.id); // Remove empty headings

  return headings;
}
