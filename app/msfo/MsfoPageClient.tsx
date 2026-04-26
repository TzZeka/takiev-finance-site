"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Download,
  Eye,
  Calendar,
  BookOpen,
  X,
} from "lucide-react";
import type { Standard } from "@/lib/sanity/queries";

const TABS: { key: Standard["category"]; label: string; fullLabel: string }[] = [
  { key: "mcc",            label: "МСС (IAS)",    fullLabel: "Международни счетоводни стандарти" },
  { key: "msfo",           label: "МСФО (IFRS)",  fullLabel: "Международни стандарти за финансово отчитане" },
  { key: "interpretation", label: "Разяснения",   fullLabel: "Разяснения на стандартите" },
];

function formatBgDate(iso: string) {
  return new Date(iso).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function downloadFile(fileUrl: string, fileName: string) {
  const res = await fetch(fileUrl);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function MsfoPageClient({ standards }: { standards: Standard[] }) {
  const [activeTab, setActiveTab] = useState<Standard["category"]>("mcc");
  const [selected, setSelected] = useState<Standard | null>(null);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return standards
      .filter((s) => s.category === activeTab)
      .filter(
        (s) =>
          !q ||
          s.title.toLowerCase().includes(q) ||
          (s.description ?? "").toLowerCase().includes(q)
      );
  }, [standards, activeTab, search]);

  // Auto-select first on tab or search change
  useEffect(() => {
    setSelected(filtered[0] ?? null);
  }, [activeTab, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (key: Standard["category"]) => {
    setActiveTab(key);
    setSearch("");
  };

  const handleDownload = async () => {
    if (!selected?.fileUrl) return;
    setDownloading(true);
    try {
      await downloadFile(selected.fileUrl, selected.fileName ?? selected.title + ".pdf");
    } catch {
      // silent
    } finally {
      setDownloading(false);
    }
  };

  // Loading skeleton before hydration
  if (!mounted) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-white/35 text-sm">Зареждане на стандартите...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16 max-w-7xl mx-auto">

      {/* ── Search ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 max-w-lg"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
        <input
          type="text"
          placeholder="Търсене по заглавие или описание..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all duration-200"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/70 transition-colors"
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
        className="flex gap-2 mb-8 flex-wrap"
        role="tablist"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
              activeTab === tab.key
                ? "text-white"
                : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 bg-primary/15 border border-primary/35 rounded-xl"
                transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* ── Master-Detail Grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4"
      >

        {/* ── Sidebar ── */}
        <AnimatePresence mode="wait">
          <motion.aside
            key={activeTab}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden"
          >
            {/* Mobile: select dropdown */}
            <div className="lg:hidden p-4">
              <label className="text-[11px] uppercase tracking-widest text-white/35 font-semibold mb-2 block">
                {TABS.find((t) => t.key === activeTab)?.fullLabel}
              </label>
              <select
                value={selected?._id ?? ""}
                onChange={(e) =>
                  setSelected(filtered.find((s) => s._id === e.target.value) ?? null)
                }
                className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/40 appearance-none"
              >
                {filtered.length === 0 ? (
                  <option disabled value="">
                    Няма намерени резултати
                  </option>
                ) : (
                  filtered.map((s) => (
                    <option key={s._id} value={s._id}>
                      № {s.orderNumber} — {s.title}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Desktop: scrollable list */}
            <div
              className="hidden lg:block p-3 space-y-0.5"
              style={{ maxHeight: "640px", overflowY: "auto" }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/25 font-semibold px-3 py-2 mb-1">
                {filtered.length} стандарт{filtered.length !== 1 ? "а" : ""}
              </p>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <Search className="w-8 h-8 text-white/15" />
                  <p className="text-white/30 text-sm">Няма намерени резултати</p>
                  <button
                    onClick={() => setSearch("")}
                    className="text-primary text-xs hover:underline"
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
                      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-primary/12 border border-primary/28"
                          : "border border-transparent hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider block mb-1 transition-colors ${
                          isActive ? "text-primary" : "text-white/25 group-hover:text-white/40"
                        }`}
                      >
                        № {s.orderNumber}
                      </span>
                      <span
                        className={`text-[13px] font-medium leading-snug block transition-colors ${
                          isActive ? "text-white" : "text-white/60 group-hover:text-white/85"
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.aside>
        </AnimatePresence>

        {/* ── Detail Panel ── */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-7 md:p-10 flex flex-col gap-6"
              style={{ minHeight: "400px" }}
            >
              {/* Category badge + title */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.18em]">
                    {TABS.find((t) => t.key === activeTab)?.label}
                  </span>
                </div>
                <h2
                  className="text-2xl md:text-[1.75rem] font-bold text-white leading-tight mb-3"
                  style={{
                    fontFamily: "'Hubot Sans', sans-serif",
                    fontVariationSettings: "'wght' 800, 'wdth' 110",
                  }}
                >
                  {selected.title}
                </h2>
                {selected.lastUpdated && (
                  <div className="flex items-center gap-2 text-white/40 text-[13px]">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Последна актуализация: {formatBgDate(selected.lastUpdated)}</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-white/10 via-white/6 to-transparent" />

              {/* Description */}
              {selected.description ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-white/25 shrink-0" />
                    <span className="text-white/35 text-[11px] font-semibold uppercase tracking-[0.18em]">
                      Описание
                    </span>
                  </div>
                  <p
                    className="text-white/72 leading-relaxed text-[15px]"
                    style={{
                      fontFamily: "'Mona Sans', sans-serif",
                      fontVariationSettings: "'wght' 400, 'wdth' 100",
                    }}
                  >
                    {selected.description}
                  </p>
                </div>
              ) : (
                <p className="text-white/25 text-sm italic">Описанието не е добавено.</p>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Action buttons */}
              {selected.fileUrl ? (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={selected.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 hover:bg-primary/18 border border-primary/30 hover:border-primary/55 rounded-2xl text-primary font-semibold text-[14px] transition-all duration-250 group"
                  >
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                    Преглед (PDF)
                  </a>
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.10] hover:border-white/[0.22] rounded-2xl text-white/75 hover:text-white font-semibold text-[14px] transition-all duration-250 group disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Download
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        downloading ? "animate-bounce" : "group-hover:translate-y-0.5"
                      }`}
                    />
                    {downloading ? "Изтегляне..." : "Изтегли"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-5 py-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/30 text-[13px]">
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
              className="bg-white/[0.015] border border-white/[0.05] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center"
              style={{ minHeight: "400px" }}
            >
              {search ? (
                <>
                  <Search className="w-10 h-10 text-white/12" />
                  <div>
                    <p className="text-white/40 text-sm mb-1">
                      Няма намерени стандарти за
                    </p>
                    <p className="text-white/60 text-sm font-semibold">„{search}"</p>
                  </div>
                  <button
                    onClick={() => setSearch("")}
                    className="text-primary text-sm hover:underline mt-1"
                  >
                    Изчисти търсенето
                  </button>
                </>
              ) : (
                <>
                  <FileText className="w-10 h-10 text-white/12" />
                  <p className="text-white/35 text-sm">Изберете стандарт от списъка</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
