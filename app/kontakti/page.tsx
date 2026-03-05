import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Calculator,
  Receipt,
  Scale,
  Building2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Контакти - Счетоводна кантора София, бул. Стамболийски",
  description:
    "Свържете се с Takiev Finance за счетоводна консултация. Телефон, имейл, адрес (бул. Ал. Стамболийски 30Б, София) и работно време.",
  keywords: [
    "контакти Takiev Finance",
    "счетоводна кантора София адрес",
    "счетоводител телефон",
    "счетоводна консултация",
    "счетоводна консултация София",
  ],
  alternates: { canonical: "https://takiev.bg/kontakti" },
  openGraph: {
    title: "Контакти | Takiev Finance - Счетоводна Кантора София",
    description: "Свържете се с Takiev Finance за счетоводна консултация. бул. Ал. Стамболийски 30Б, София.",
    url: "https://takiev.bg/kontakti",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Контакти - Takiev Finance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакти | Takiev Finance",
    description: "Свържете се с Takiev Finance за счетоводна консултация.",
    images: ["/opengraph-image"],
  },
};

const whyReasons = [
  "Бърз отговор — обичайно в рамките на 1 работен ден",
  "Експертен екип с доказан опит от 2021 г.",
  "Индивидуален подход към всеки клиент",
  "Прозрачна и коректна ценова политика",
  "Пълна поверителност на данните",
];

const services = [
  { href: "/uslugi/schetovodni-uslugi", label: "Счетоводни услуги", desc: "Месечно счетоводство, ТРЗ, годишно приключване", icon: Calculator },
  { href: "/uslugi/danachni-konsultacii", label: "Данъчни консултации", desc: "ДДС регистрация, данъчно планиране, НАП", icon: Receipt },
  { href: "/uslugi/pravni-uslugi", label: "Правни услуги", desc: "Договори, трудово и търговско право", icon: Scale },
  { href: "/uslugi/registraciq-na-firmi", label: "Регистрация на фирми", desc: "ЕООД, ООД, ЕТ — бързо и лесно", icon: Building2 },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Image
        src="/firm-logo/contact-photos/контакти-фон.png"
        alt=""
        fill
        className="object-cover fixed"
        priority
      />
      <div className="fixed inset-0 bg-slate-950/45" />

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section className="pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 text-white text-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-center mb-6">
              <Breadcrumbs />
            </div>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Свържете се с нас
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Контакти
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
              Ще се радваме да обсъдим как можем да помогнем на вашия бизнес
            </p>
          </div>
        </section>

        {/* ── INFO GRID ── */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 lg:gap-6">

            {/* LEFT: contact details + why choose us */}
            <div className="space-y-5">

              {/* Contact details card */}
              <div className="bg-slate-950/60 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-7">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-5">Свържете се директно</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email */}
                  <a
                    href="mailto:office@takiev.bg"
                    className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-primary/25 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Имейл</p>
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        office@takiev.bg
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+359899080016"
                    className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-primary/25 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Телефон</p>
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        +359 89 908 0016
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href="https://www.google.com/maps/place/Takiev+Finance+EOOD/@42.697707877149,23.319877890847863,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-primary/25 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Адрес</p>
                      <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                        бул. „Ал. Стамболийски" 30Б<br />
                        <span className="text-white/50 text-xs font-normal">1000 София</span>
                      </p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Работно Време</p>
                      <p className="text-sm font-medium text-white/80 leading-snug">
                        Пон–Пет: 9:00–18:00
                      </p>
                      <p className="text-xs text-white/35 mt-0.5">Събота–Неделя: почивен</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why choose us */}
              <div className="bg-slate-950/60 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-7">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2">Защо да ни изберете</p>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-5 tracking-tight">
                  Вашият надежден партньор
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {whyReasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-white/70 leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: services */}
            <div className="bg-slate-950/60 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-7 h-fit lg:sticky lg:top-28">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2">Разгледайте</p>
              <h2 className="text-lg font-bold text-white mb-5 tracking-tight">Нашите услуги</h2>
              <div className="space-y-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="group flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] hover:border-primary/25 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">
                          {service.label}
                        </p>
                        <p className="text-[11px] text-white/40 mt-0.5 leading-snug">{service.desc}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-14">
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-950/65 backdrop-blur-md border border-white/[0.08] rounded-2xl overflow-hidden">
              {/* Card header */}
              <div className="px-6 md:px-8 pt-7 pb-6 border-b border-white/[0.06]">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-1.5">Форма за контакт</p>
                <h2 className="text-2xl font-bold text-white tracking-tight">Изпратете запитване</h2>
                <p className="text-white/50 text-sm mt-1">Ще се свържем с вас в рамките на 1 работен ден</p>
              </div>
              {/* Form */}
              <div className="px-6 md:px-8 py-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── MAP — full width at bottom ── */}
        <section className="pb-0">
          <div className="h-[340px] md:h-[420px] overflow-hidden border-t border-white/[0.05]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.283956399353!2d23.319877890847863!3d42.697707877149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa855eff40e335%3A0xa7cffc05e42a4e56!2sTakiev%20Finance%20EOOD!5e0!3m2!1sbg!2sbg!4v1768080298879!5m2!1sbg!2sbg&style=feature:all|element:geometry|color:0x40514E&style=feature:all|element:labels.text.fill|color:0x19BFB7&style=feature:all|element:labels.text.stroke|color:0x2c3e3b&style=feature:water|element:geometry|color:0x2c3e3b"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Takiev Finance Location"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
