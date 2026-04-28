"use client";

import { useState, useMemo, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Download,
  Eye,
  Calendar,
  BookOpen,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { Standard } from "@/lib/sanity/queries";

type TabKey = "all" | Standard["category"];

function PdfBadge() {
  return (
    <span className="inline-flex items-center px-1.5 py-[3px] rounded text-[9px] font-black tracking-widest bg-red-500/15 border border-red-500/25 text-red-500 leading-none select-none">
      PDF
    </span>
  );
}

const TABS: { key: TabKey; label: string; fullLabel: string; searchLabel: string }[] = [
  { key: "all",            label: "Всички",               fullLabel: "Всички стандарти",                                searchLabel: "Търсене в всички стандарти" },
  { key: "mcc",            label: "МСС (IAS)",            fullLabel: "Международни счетоводни стандарти",               searchLabel: "Търсене в МСС" },
  { key: "msfo",           label: "МСФО (IFRS)",          fullLabel: "Международни стандарти за финансово отчитане",    searchLabel: "Търсене в МСФО" },
  { key: "interpretation", label: "Разяснения на КРМСФО", fullLabel: "Разяснения на КРМСФО",                            searchLabel: "Търсене в Разяснения на КРМСФО" },
];

const CATEGORY_COLS: { key: Standard["category"]; label: string }[] = [
  { key: "mcc",            label: "МСС (IAS)" },
  { key: "msfo",           label: "МСФО (IFRS)" },
  { key: "interpretation", label: "Разяснения на КРМСФО" },
];

function formatBgDate(iso: string) {
  return new Date(iso).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const descriptionComponents: PortableTextComponents = {
  block: {
    normal:     ({ children }) => <p className="text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0" style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 400, 'wdth' 100" }}>{children}</p>,
    h2:         ({ children }) => <h2 className="text-[1.15rem] font-bold text-gray-900 mt-5 mb-2 pb-1.5 border-b border-black/[0.07]" style={{ fontFamily: "'Hubot Sans', sans-serif", fontVariationSettings: "'wght' 800, 'wdth' 110" }}>{children}</h2>,
    h3:         ({ children }) => <h3 className="text-[1rem] font-bold text-gray-800 mt-4 mb-1.5" style={{ fontFamily: "'Hubot Sans', sans-serif", fontVariationSettings: "'wght' 700, 'wdth' 105" }}>{children}</h3>,
    h4:         ({ children }) => <h4 className="text-[0.9rem] font-semibold text-gray-700 uppercase tracking-wider mt-3 mb-1" style={{ fontFamily: "'Hubot Sans', sans-serif" }}>{children}</h4>,
    blockquote:  ({ children }) => <blockquote className="pl-4 border-l-2 border-primary/40 text-gray-500 italic text-[14px] my-3">{children}</blockquote>,
    textLeft:    ({ children }) => <p className="text-left text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0" style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 400, 'wdth' 100" }}>{children}</p>,
    textCenter:  ({ children }) => <p className="text-center text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0" style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 400, 'wdth' 100" }}>{children}</p>,
    textRight:   ({ children }) => <p className="text-right text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0" style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 400, 'wdth' 100" }}>{children}</p>,
    textJustify: ({ children }) => <p className="text-justify text-gray-600 leading-relaxed text-[15px] mb-3 last:mb-0" style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 400, 'wdth' 100" }}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-1 my-3 pl-1">{children}</ul>,
    number: ({ children }) => <ol className="space-y-1 my-3 pl-1 list-decimal list-inside">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-gray-600 text-[14px] leading-relaxed">
        <span className="mt-[0.45em] w-1 h-1 rounded-full bg-primary-link shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-gray-600 text-[14px] leading-relaxed pl-1">{children}</li>,
  },
  marks: {
    strong:          ({ children }) => <strong className="font-bold text-gray-800">{children}</strong>,
    em:              ({ children }) => <em className="italic">{children}</em>,
    underline:       ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    "strike-through":({ children }) => <span className="line-through text-gray-400">{children}</span>,
    code:            ({ children }) => <code className="px-1.5 py-0.5 bg-slate-100 border border-black/[0.07] rounded text-[12px] font-mono text-primary-link">{children}</code>,
    link:            ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-primary-link underline underline-offset-2 hover:text-primary-link-hover transition-colors">
        {children}
      </a>
    ),
  },
};

function extractBlockText(blocks: Standard["description"]): string {
  if (!blocks) return "";
  return blocks
    .flatMap((block) =>
      ((block as { children?: { text?: string }[] }).children ?? []).map((c) => c.text ?? "")
    )
    .join(" ");
}

function matchesSearch(s: Standard, q: string): boolean {
  if (!q) return true;
  const clean = q.replace(/^№\s*/, "").trim().toLowerCase();
  if (/^\d+$/.test(clean)) {
    return String(s.orderNumber).includes(clean);
  }
  return (
    s.title.toLowerCase().includes(clean) ||
    extractBlockText(s.description).toLowerCase().includes(clean)
  );
}

export function MsfoPageClient({ standards }: { standards: Standard[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [selected, setSelected]   = useState<Standard | null>(null);
  const [search, setSearch]       = useState("");
  const [mounted, setMounted]     = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const counts = useMemo((): Record<TabKey, number> => ({
    all:            standards.length,
    mcc:            standards.filter((s) => s.category === "mcc").length,
    msfo:           standards.filter((s) => s.category === "msfo").length,
    interpretation: standards.filter((s) => s.category === "interpretation").length,
  }), [standards]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return [];
    return standards
      .filter((s) => s.category === activeTab)
      .filter((s) => matchesSearch(s, search));
  }, [standards, activeTab, search]);

  const filteredAll = useMemo(() => ({
    mcc:            standards.filter((s) => s.category === "mcc"            && matchesSearch(s, search)),
    msfo:           standards.filter((s) => s.category === "msfo"           && matchesSearch(s, search)),
    interpretation: standards.filter((s) => s.category === "interpretation" && matchesSearch(s, search)),
  }), [standards, search]);

  useEffect(() => {
    if (activeTab !== "all") {
      setSelected(filtered[0] ?? null);
    }
  }, [activeTab, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    setSearch("");
  };

  const handleDownload = async (standard: Standard) => {
    if (!standard.fileUrl || downloadingId === standard._id) return;
    const fileName = standard.fileName ?? standard.title + ".pdf";
    const proxyUrl =
      `/api/download?url=${encodeURIComponent(standard.fileUrl)}` +
      `&name=${encodeURIComponent(fileName)}`;
    setDownloadingId(standard._id);
    try {
      const res  = await fetch(proxyUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href     = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      // silent
    } finally {
      setDownloadingId(null);
    }
  };

  const activeTabData = TABS.find((t) => t.key === activeTab)!;

  const sectionClass =
    "relative z-20 mt-6 md:mt-10 bg-slate-50 rounded-t-[2.5rem] md:rounded-t-[3rem] border-t border-black/5";

  if (!mounted) {
    return (
      <div className={sectionClass}>
        <div className="min-h-[600px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Зареждане на стандартите...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={sectionClass}>
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 pt-12 pb-24 md:pt-14 md:pb-32">

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 max-w-xl"
        >
          <motion.div
            initial={{ scale: 1, y: "-50%" }}
            animate={{ scale: searchFocused ? 1.18 : 1, y: "-50%" }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="absolute left-4 top-1/2 pointer-events-none z-10"
          >
            <Search className={`w-4 h-4 transition-colors duration-300 ${searchFocused ? "text-primary" : "text-gray-500"}`} />
          </motion.div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-black/[0.08] rounded-2xl text-gray-900 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200 shadow-sm"
          />

          {/* Animated placeholder — clipped to input width */}
          <motion.span
            initial={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
            animate={
              searchFocused || !!search
                ? { opacity: 0, x: -12, y: "-50%", scale: 0.84 }
                : { opacity: 1, x: 0, y: "-50%", scale: 1 }
            }
            transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "left center", maxWidth: "calc(100% - 3.5rem)" }}
            className="absolute left-11 top-1/2 text-sm text-gray-500 pointer-events-none select-none whitespace-nowrap overflow-hidden"
          >
            {activeTabData.searchLabel}
            <span className="text-gray-400"> — по заглавие, описание или №...</span>
          </motion.span>

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Изчисти търсенето"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-primary transition-all duration-500 hover:rotate-[360deg]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1 p-1 rounded-full border overflow-x-auto scrollbar-hide mb-8"
          style={{ background: "rgba(64,81,78,0.05)", borderColor: "rgba(64,81,78,0.1)" }}
          role="tablist"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.key)}
                /* py-2.5 → ~44px touch target (WCAG 2.5.5) */
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 flex-shrink-0"
                style={{ color: isActive ? "var(--color-dark)" : "var(--color-surface-raised)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMsfoTab"
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
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Content area ── */}
        <AnimatePresence mode="wait">

          {/* ══ "Всички" — 3-column grid ══ */}
          {activeTab === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {CATEGORY_COLS.map((col) => {
                const items = filteredAll[col.key];
                return (
                  <div
                    key={col.key}
                    className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden shadow-sm flex flex-col"
                  >
                    {/* Clickable column header */}
                    <button
                      onClick={() => handleTabChange(col.key)}
                      className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] hover:bg-primary/[0.04] transition-colors duration-200 group shrink-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-3.5 h-3.5 text-primary-link shrink-0" />
                        <span
                          className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-link"
                          style={{ fontFamily: "'Hubot Sans', sans-serif", fontVariationSettings: "'wght' 700, 'wdth' 100" }}
                        >
                          {col.label}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-gray-500 group-hover:text-primary-link transition-colors duration-200">
                        <span className="tabular-nums font-medium">{items.length}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </button>

                    {/* Items list */}
                    <div
                      className="flex-1 overflow-y-auto p-2"
                      style={{ maxHeight: "460px" }}
                    >
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-10 text-center">
                          <Search className="w-6 h-6 text-gray-300" />
                          <p className="text-gray-500 text-xs">Няма резултати</p>
                        </div>
                      ) : (
                        <AnimatePresence initial={false}>
                          {items.map((s) => (
                            <motion.div
                              key={s._id}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.18 }}
                              className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 group border border-transparent hover:border-black/[0.05] transition-all duration-150"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {/* solid color, no opacity — contrast compliant */}
                                <span className="text-[10px] font-black text-gray-500 shrink-0 tabular-nums">
                                  №{s.orderNumber}
                                </span>
                                <span className="text-[13px] text-gray-700 leading-snug line-clamp-2">
                                  {s.title}
                                </span>
                              </div>
                              {s.fileUrl && (
                                /* Always visible on touch (mobile); hover-only on pointer devices */
                                <div className="flex items-center gap-0.5 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
                                  <a
                                    href={s.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Преглед в PDF"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 rounded-lg hover:bg-primary/10 text-gray-500 hover:text-primary transition-colors duration-150"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    title="Изтегли PDF"
                                    onClick={() => handleDownload(s)}
                                    disabled={downloadingId === s._id}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-gray-500 hover:text-gray-700 transition-colors duration-150 disabled:opacity-40"
                                  >
                                    {downloadingId === s._id
                                      ? <div className="w-3.5 h-3.5 border border-gray-400 border-t-gray-700 rounded-full animate-spin" />
                                      : <Download className="w-3.5 h-3.5" />
                                    }
                                  </button>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ══ Individual category — sidebar + detail ══ */}
          {activeTab !== "all" && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4"
            >
              {/* Sidebar */}
              <AnimatePresence mode="wait">
                <motion.aside
                  key={activeTab}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Mobile: styled select with custom arrow */}
                  <div className="lg:hidden p-4">
                    <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-2 block">
                      {activeTabData.fullLabel}
                    </label>
                    <div className="relative">
                      <select
                        value={selected?._id ?? ""}
                        onChange={(e) =>
                          setSelected(filtered.find((s) => s._id === e.target.value) ?? null)
                        }
                        className="w-full bg-slate-50 border border-black/[0.10] rounded-xl px-4 py-3 pr-10 text-gray-900 text-sm focus:outline-none focus:border-primary/40 appearance-none"
                      >
                        {filtered.length === 0 ? (
                          <option disabled value="">Няма намерени резултати</option>
                        ) : (
                          filtered.map((s) => (
                            <option key={s._id} value={s._id}>
                              № {s.orderNumber} — {s.title}
                            </option>
                          ))
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Desktop: scrollable list */}
                  <div
                    className="hidden lg:block p-3 space-y-0.5"
                    style={{ maxHeight: "640px", overflowY: "auto" }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500 font-semibold px-3 py-2 mb-1">
                      {filtered.length} стандарт{filtered.length !== 1 ? "а" : ""}
                    </p>
                    {filtered.length === 0 ? (
                      <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <Search className="w-8 h-8 text-gray-400" />
                        <p className="text-gray-500 text-sm">Няма намерени резултати</p>
                        <button
                          onClick={() => setSearch("")}
                          className="text-primary-link text-xs hover:underline"
                        >
                          Изчисти търсенето
                        </button>
                      </div>
                    ) : (
                      filtered.map((s) => {
                        const isActive = selected?._id === s._id;
                        return (
                          <button
                            key={s._id}
                            onClick={() => setSelected(s)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group flex items-center gap-2 ${
                              isActive
                                ? "bg-primary/[0.11] border border-primary/40"
                                : "border border-transparent hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 transition-colors ${
                                isActive ? "text-primary-link" : "text-gray-500 group-hover:text-gray-600"
                              }`}>
                                № {s.orderNumber}
                              </span>
                              <span className={`text-[13px] font-medium leading-snug block transition-colors ${
                                isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"
                              }`}>
                                {s.title}
                              </span>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                              isActive ? "text-primary-link opacity-100" : "opacity-0"
                            }`} />
                          </button>
                        );
                      })
                    )}
                  </div>
                </motion.aside>
              </AnimatePresence>

              {/* Detail panel */}
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected._id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white border border-black/[0.07] rounded-2xl p-6 md:p-10 flex flex-col gap-6 shadow-sm"
                    style={{ minHeight: "400px" }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-3.5 h-3.5 text-primary-link shrink-0" />
                        <span className="text-primary-link text-[11px] font-bold uppercase tracking-[0.18em]">
                          {activeTabData.label}
                        </span>
                      </div>
                      {/* Hubot Sans heading — break-words prevents overflow on mobile */}
                      <h2
                        className="font-bold text-gray-900 leading-tight mb-3 break-words"
                        style={{
                          fontFamily: "'Hubot Sans', sans-serif",
                          fontVariationSettings: "'wght' 800, 'wdth' 110",
                          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                        }}
                      >
                        {selected.title}
                      </h2>
                      {selected.lastUpdated && (
                        <div className="flex items-center gap-2 text-gray-500 text-[13px]">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>Последна актуализация: {formatBgDate(selected.lastUpdated)}</span>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-black/[0.06]" />

                    {selected.description && selected.description.length > 0 ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-gray-500 text-[11px] font-semibold uppercase tracking-[0.18em]">Описание</span>
                        </div>
                        <div>
                          <PortableText value={selected.description} components={descriptionComponents} />
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm italic">Описанието не е добавено.</p>
                    )}

                    <div className="flex-1" />

                    {selected.fileUrl ? (
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        {/* text-primary-link (4.86:1) instead of text-primary (2.19:1) */}
                        <a
                          href={selected.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary/8 hover:bg-primary/14 border border-primary/25 hover:border-primary/50 rounded-2xl text-primary-link font-semibold text-[14px] transition-all duration-200 group"
                        >
                          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                          Преглед (PDF)
                        </a>
                        <button
                          onClick={() => handleDownload(selected)}
                          disabled={downloadingId === selected._id}
                          className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-slate-50 hover:bg-slate-100 border border-black/[0.10] hover:border-black/[0.18] rounded-2xl text-gray-700 hover:text-gray-900 font-semibold text-[14px] transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {downloadingId === selected._id ? (
                            <>
                              <div className="w-4 h-4 shrink-0 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                              <span>Изтегляне...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 shrink-0 group-hover:translate-y-0.5 transition-transform duration-200" />
                              <span>Изтегли в</span>
                              <PdfBadge />
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 border border-black/[0.06] rounded-xl text-gray-500 text-[13px]">
                        <FileText className="w-4 h-4 shrink-0" />
                        Файлът все още не е качен.
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-black/[0.07] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center shadow-sm"
                    style={{ minHeight: "400px" }}
                  >
                    {search ? (
                      <>
                        <Search className="w-10 h-10 text-gray-400" />
                        <div>
                          <p className="text-gray-500 text-sm mb-1">Няма намерени стандарти за</p>
                          <p className="text-gray-600 text-sm font-semibold break-words">„{search}"</p>
                        </div>
                        <button
                          onClick={() => setSearch("")}
                          className="text-primary-link text-sm hover:underline mt-1"
                        >
                          Изчисти търсенето
                        </button>
                      </>
                    ) : (
                      <>
                        <FileText className="w-10 h-10 text-gray-400" />
                        <p className="text-gray-500 text-sm">Изберете стандарт от списъка</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </section>
    </div>
  );
}
