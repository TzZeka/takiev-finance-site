"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Youtube, ExternalLink, ChevronDown } from "lucide-react";

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile: accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between md:hidden py-4 border-b border-white/[0.06]"
        aria-expanded={isOpen}
      >
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/40">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/25 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Desktop: static header */}
      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-6 hidden md:block">
        {title}
      </p>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:!max-h-none md:!opacity-100 md:!mt-0 ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-deep text-white overflow-hidden">

      {/* ── Top accent line ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* ── Stylized Text Logo banner (Replacing Image) ── */}
      <div className="relative w-full bg-surface-deep border-b border-white/[0.05] flex items-center justify-center overflow-hidden py-12 md:py-20">
        <h2
          className="text-white/[0.04] text-[14vw] sm:text-[11vw] md:text-[9vw] leading-none select-none whitespace-nowrap italic pointer-events-none transition-colors duration-700 hover:text-white/[0.08]"
          style={{ fontFamily: "var(--font-berkslund)", fontWeight: 400 }}
        >
          Takiev Finance
        </h2>
      </div>

      {/* ── Main columns ── */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-16 pb-10 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 xl:gap-16 pb-14 border-b border-white/[0.05]">

          {/* Brand column */}
          <div className="md:col-span-3 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/30">
                ЕИК: 206666484
              </p>
              <div className="w-6 h-px bg-primary/60" />
              <p className="text-sm text-white/50 leading-relaxed">
                Избери своя доверен бизнес партньор. Експертно счетоводно обслужване на Вашия бизнес.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/25">
                Последвайте ни
              </p>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/n.takiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/takiev-finance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@nikolaytakiev6221"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@n.takiev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 4 link columns */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">

            {/* Бързи връзки */}
            <FooterAccordion title="Бързи връзки">
              <ul className="space-y-3">
                <li>
                  <Link href="/za-nas" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    За нас
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Блог
                  </Link>
                </li>
                <li>
                  <Link href="/video" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Видео
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            {/* Услуги */}
            <FooterAccordion title="Услуги">
              <ul className="space-y-3">
                <li>
                  <Link href="/uslugi/schetovodni-uslugi" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Счетоводни услуги
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/danachni-konsultacii" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Данъчни консултации
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/pravni-uslugi" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Правни услуги
                  </Link>
                </li>
                <li>
                  <Link href="/uslugi/registraciq-na-firmi" className="text-sm text-white/45 hover:text-white transition-colors duration-200">
                    Регистрация на фирми
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            {/* Полезни сайтове */}
            <FooterAccordion title="Полезни сайтове">
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://nula.bg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    Nula.bg
                    <ExternalLink className="w-3 h-3 opacity-35" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.portalschetovodstvo.bg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    Портал Счетоводство
                    <ExternalLink className="w-3 h-3 opacity-35" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://nap.bg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    НАП
                    <ExternalLink className="w-3 h-3 opacity-35" />
                  </a>
                </li>
              </ul>
            </FooterAccordion>

            {/* Контакти — без икони */}
            <FooterAccordion title="Контакти">
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:office@takiev.bg"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    office@takiev.bg
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+359899080016"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    +359 89 908 0016
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/K4z9hmq1RbuuUfQy6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/35 leading-relaxed block hover:text-primary transition-colors"
                  >
                    бул. „Александър Стамболийски" 30Б, 1000 София
                  </a>
                </li>
              </ul>
            </FooterAccordion>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-white/25 tracking-wide">
            &copy; 2021-{currentYear} Takiev Finance. Всички права запазени.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/25 hover:text-white/55 transition-colors duration-200"
            >
              Политика за поверителност
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/25 hover:text-white/55 transition-colors duration-200"
            >
              Общи условия
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
