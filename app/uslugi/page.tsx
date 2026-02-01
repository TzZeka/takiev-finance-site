import type { Metadata } from "next";
import Link from "next/link";
import { servicesConfig } from "@/lib/services-config";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Услуги | Takiev Finance - Счетоводна Кантора",
  description: "Професионални счетоводни, данъчни и правни услуги за вашия бизнес. Регистрация на фирми, месечно счетоводство, данъчни консултации и правна помощ.",
  keywords: [
    "счетоводни услуги",
    "данъчни консултации",
    "правни услуги",
    "регистрация на фирми",
    "счетоводител",
    "счетоводна кантора",
  ],
  alternates: {
    canonical: "https://takiev.bg/uslugi",
  },
  openGraph: {
    title: "Услуги | Takiev Finance",
    description: "Професионални счетоводни, данъчни и правни услуги за вашия бизнес.",
    url: "https://takiev.bg/uslugi",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
  },
};

const serviceHighlights: Record<string, string[]> = {
  schetovodstvo: [
    "Месечно счетоводно обслужване",
    "Годишно приключване",
    "ТРЗ и работни заплати",
    "Счетоводство за физически лица",
  ],
  danaci: [
    "ДДС регистрация и отчитане",
    "Данъчно планиране",
    "Представителство пред НАП",
    "Данъчни декларации",
  ],
  pravni: [
    "Изготвяне на договори",
    "Трудово право",
    "Търговско право",
    "Правни консултации",
  ],
  registraciq: [
    "Регистрация на ЕООД/ООД",
    "Регистрация на ЕТ",
    "Промени в обстоятелства",
    "Ликвидация на фирми",
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Нашите услуги
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Професионални счетоводни и данъчни решения за вашия бизнес.
            Изберете услуга, за да научите повече.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {servicesConfig.map((service, index) => {
            const Icon = service.icon;
            const highlights = serviceHighlights[service.id] || [];

            return (
              <Link
                key={service.id}
                href={`/uslugi/${service.slug}`}
                className="group relative bg-white/5 border-2 border-white/10 rounded-2xl p-6 md:p-8 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300"
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-white/60 text-sm md:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Научи повече</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-gradient-to-br from-primary/10 via-white/5 to-primary/5 border-2 border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Не сте сигурни коя услуга ви е необходима?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Свържете се с нас за безплатна консултация. Ще ви помогнем да изберете
            най-подходящото решение за вашия бизнес.
          </p>
          <Link
            href="/kontakti"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            Свържете се с нас
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
