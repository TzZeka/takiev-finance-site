import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity/client";

export const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 id={slugify(children)} className="text-4xl font-bold text-dark mt-12 mb-6 scroll-mt-20">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 id={slugify(children)} className="text-3xl font-bold text-dark mt-10 mb-5 scroll-mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={slugify(children)} className="text-2xl font-bold text-dark mt-8 mb-4 scroll-mt-20">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 id={slugify(children)} className="text-xl font-bold text-dark mt-6 mb-3 scroll-mt-20">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-primary/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4 text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4 text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-dark">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-primary px-2 py-1 rounded text-sm font-mono">
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
          className="text-primary hover:underline font-medium"
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
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(value)}
            alt={value.alt || "Article image"}
            width={1200}
            height={675}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

// Helper function to create slugs from headings
function slugify(children: any, fallback: string = "heading"): string {
  if (!children) return fallback;
  const text = children
    .map((child: any) => (typeof child === "string" ? child : child?.text || ""))
    .join("");

  const slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  return slug || fallback;
}

// Extract headings for Table of Contents
export function extractHeadings(blocks: any[]): Array<{ id: string; text: string; level: number }> {
  if (!blocks) return [];

  const seenIds = new Map<string, number>();

  return blocks
    .filter((block) => block._type === "block" && /^h[1-4]$/.test(block.style))
    .map((block, index) => {
      const text = block.children
        ?.map((child: any) => child.text)
        .join("") || "";

      let baseId = slugify([{ text }], `heading-${index}`);

      // Handle duplicates by appending a counter
      if (seenIds.has(baseId)) {
        const count = seenIds.get(baseId)! + 1;
        seenIds.set(baseId, count);
        baseId = `${baseId}-${count}`;
      } else {
        seenIds.set(baseId, 1);
      }

      return {
        id: baseId,
        text: text || `Заглавие ${index + 1}`,
        level: parseInt(block.style.replace("h", "")),
      };
    });
}
