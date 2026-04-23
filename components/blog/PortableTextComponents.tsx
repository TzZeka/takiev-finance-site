import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/sanity/client";

export type ReadingTheme = "light" | "dark";

function getColors(theme: ReadingTheme) {
  if (theme === "light") {
    return {
      h1:               "text-[#0d1f1c]",
      h2:               "text-[#0d1f1c]",
      h3:               "text-[#0d1f1c]",
      h4:               "text-[#122820]",
      h5:               "text-[#1a3530]",
      h6:               "text-[#2a4a44]",
      body:             "text-[#374151]",
      bqBg:             "bg-[rgba(25,191,183,0.06)]",
      bqText:           "text-[#374151]",
      listC:            "text-[#374151]",
      code:             "bg-[#e6f3f2] text-[#0d1f1c] border border-[#c2dedd]",
      figBorder:        "border-[#dde9e7]",
      figCaption:       "text-[#6b7280] bg-[#f5f8f7]",
      tableWrap:        "border border-[#d0e5e3]",
      tableTitle:       "text-[#4b5563]",
      theadRow:         "bg-[#e4efed]",
      theadCell:        "text-[#0d1f1c] border-b border-[#c8dedd]",
      tbodyRowBorder:   "border-b border-[#e8f0ef]",
      tbodyRowAlt:      "even:bg-[#f2f8f7]",
      tbodyCell:        "text-[#374151]",
    };
  }
  return {
    h1:               "text-[#f0faf9]",
    h2:               "text-[#f0faf9]",
    h3:               "text-[#e8f6f5]",
    h4:               "text-[#d4eeec]",
    h5:               "text-[#c5e8e6]",
    h6:               "text-[#a8d5d3]",
    body:             "text-[rgba(255,255,255,0.82)]",
    bqBg:             "bg-[rgba(25,191,183,0.09)]",
    bqText:           "text-[rgba(255,255,255,0.78)]",
    listC:            "text-[rgba(255,255,255,0.80)]",
    code:             "bg-white/[0.07] text-primary/90 border border-white/[0.10]",
    figBorder:        "border-white/[0.07]",
    figCaption:       "text-slate-400 bg-white/[0.03]",
    tableWrap:        "border border-white/[0.08] bg-white/[0.02]",
    tableTitle:       "text-slate-400",
    theadRow:         "bg-white/[0.06]",
    theadCell:        "text-white border-b border-white/[0.08]",
    tbodyRowBorder:   "border-b border-white/[0.04]",
    tbodyRowAlt:      "even:bg-white/[0.02]",
    tbodyCell:        "text-slate-300",
  };
}

export function getPortableTextComponents(theme: ReadingTheme) {
  const c = getColors(theme);

  return {
    block: {
      h1: ({ children, value }: any) => (
        <div className="mt-16 mb-8 scroll-mt-24">
          <h1 id={slugify(children, value._key)} className={`text-3xl md:text-4xl font-bold ${c.h1} leading-tight tracking-tight`}>
            {children}
          </h1>
          <div className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />
        </div>
      ),
      h2: ({ children, value }: any) => (
        <div className="mt-14 mb-6 scroll-mt-24">
          <h2 id={slugify(children, value._key)} className={`text-2xl md:text-3xl font-bold ${c.h2} leading-snug`}>
            {children}
          </h2>
          <div className="mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r from-primary/70 to-transparent" />
        </div>
      ),
      h3: ({ children, value }: any) => (
        <div className="mt-10 mb-5 scroll-mt-24">
          <h3 id={slugify(children, value._key)} className={`text-xl md:text-2xl font-semibold ${c.h3} leading-snug`}>
            {children}
          </h3>
          <div className="mt-2.5 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary/45 to-transparent" />
        </div>
      ),
      h4: ({ children, value }: any) => (
        <div className="mt-8 mb-4 scroll-mt-24">
          <h4 id={slugify(children, value._key)} className={`text-lg md:text-xl font-semibold ${c.h4}`}>
            {children}
          </h4>
          <div className="mt-2 h-px w-8 rounded-full bg-primary/35" />
        </div>
      ),
      h5: ({ children, value }: any) => (
        <div className="mt-7 mb-3 scroll-mt-24">
          <h5 id={slugify(children, value._key)} className={`text-base md:text-lg font-semibold ${c.h5}`}>
            {children}
          </h5>
          <div className="mt-1.5 h-px w-6 rounded-full bg-primary/28" />
        </div>
      ),
      h6: ({ children, value }: any) => (
        <div className="mt-6 mb-3 scroll-mt-24">
          <h6 id={slugify(children, value._key)} className={`text-sm md:text-base font-semibold ${c.h6} uppercase tracking-wide`}>
            {children}
          </h6>
        </div>
      ),
      normal: ({ children }: any) => (
        <p className={`text-[17px] md:text-[18px] ${c.body} leading-[1.9] mb-7 md:text-justify break-words tracking-[0.012em]`}>
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className={`relative border-l-[3px] border-primary/60 pl-6 pr-5 py-5 my-10 ${c.bqBg} rounded-r-2xl`}>
          <div className={`text-[17px] ${c.bqText} leading-[1.85] italic`}>
            {children}
          </div>
        </blockquote>
      ),
      center: ({ children }: any) => (
        <p className={`text-[17px] md:text-[18px] ${c.body} leading-[1.9] mb-7 text-center tracking-[0.012em]`}>
          {children}
        </p>
      ),
      right: ({ children }: any) => (
        <p className={`text-[17px] md:text-[18px] ${c.body} leading-[1.9] mb-7 text-right tracking-[0.012em]`}>
          {children}
        </p>
      ),
      justify: ({ children }: any) => (
        <p className={`text-[17px] md:text-[18px] ${c.body} leading-[1.9] mb-7 md:text-justify break-words tracking-[0.012em]`}>
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className={`list-disc space-y-2 mb-8 ${c.listC} pl-6`}>{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className={`list-decimal space-y-2 mb-8 ${c.listC} pl-6`}>{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-[17px] md:text-[18px] leading-[1.8] pl-1">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="text-[17px] md:text-[18px] leading-[1.8] pl-1">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-inherit">{children}</strong>,
      em:     ({ children }: any) => <em className="italic text-inherit">{children}</em>,
      code:   ({ children }: any) => (
        <code className={`${c.code} px-2 py-0.5 rounded-md text-[0.88em] font-mono`}>
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
          <figure className={`my-10 rounded-2xl overflow-hidden border ${c.figBorder}`}>
            <Image
              src={getImageUrl(value)}
              alt={value.alt || "Article image"}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
            {value.caption && (
              <figcaption className={`text-sm ${c.figCaption} text-center py-3 italic`}>
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
        const bodyRows  = hasHeader ? value.rows.slice(1) : value.rows;
        return (
          <figure className="my-10">
            {value.title && (
              <figcaption className={`text-sm ${c.tableTitle} mb-3 font-medium tracking-wide uppercase`}>
                {value.title}
              </figcaption>
            )}
            <div className={`overflow-x-auto rounded-xl ${c.tableWrap}`}>
              <table className="w-full text-left text-sm">
                {headerRow && (
                  <thead>
                    <tr className={c.theadRow}>
                      {headerRow.cells?.map((cell: string, i: number) => (
                        <th key={i} className={`px-5 py-3.5 ${c.theadCell} whitespace-nowrap text-[13px] uppercase tracking-wider font-semibold`}>
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {bodyRows.map((row: any, ri: number) => (
                    <tr key={row._key || ri} className={`${c.tbodyRowBorder} ${c.tbodyRowAlt} transition-colors`}>
                      {row.cells?.map((cell: string, ci: number) => (
                        <td key={ci} className={`px-5 py-3 ${c.tbodyCell} text-[15px]`}>{cell}</td>
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
}

// Default export (light) — kept for any non-themed usage
export const portableTextComponents = getPortableTextComponents("light");

// ── Slug helper ────────────────────────────────────────────────────────
function slugify(children: any, fallback = "heading"): string {
  if (!children) return fallback;
  function extractText(node: any): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";
    if (node?.text) return node.text;
    if (node?.props?.children) return extractText(node.props.children);
    if (Array.isArray(node)) return node.map(extractText).join("");
    return "";
  }
  const slug = extractText(children)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0400-\u04FF-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

// ── Heading extractor ──────────────────────────────────────────────────
export function extractHeadings(blocks: any[]): Array<{ id: string; text: string; level: number }> {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b?._type === "block" && /^h[1-6]$/.test(b.style))
    .map((b, i) => {
      const text = (b.children ?? [])
        .filter((c: any) => c?.text)
        .map((c: any) => c.text)
        .join("")
        .trim();
      return {
        id:    slugify(text, b._key ?? `heading-${i}`),
        text:  text || `Заглавие ${i + 1}`,
        level: parseInt(b.style.replace("h", "")),
      };
    })
    .filter((h) => h.text && h.id);
}
