import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

const serviceImages: Record<string, string> = {
  schetovodstvo: "/firm-logo/uslugi/счетоводни-услуги.png",
  danaci: "/firm-logo/uslugi/данъчни-консултации.png",
  pravni: "/firm-logo/uslugi/правни-услуги.png",
  registraciq: "/firm-logo/uslugi/регистрация-на-фирми.png",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Banner */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-20 text-white overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(25,191,183,0.15),transparent)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#19BFB7 1px, transparent 1px), linear-gradient(90deg, #19BFB7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Floating accent shapes */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Нашите услуги
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
            Професионални счетоводни и данъчни решения за вашия бизнес.
            Изберете услуга, за да научите повече.
          </p>
        </div>
      </section>

      {/* Services Zigzag */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24 space-y-12 md:space-y-20">
        {servicesConfig.map((service, index) => {
          const Icon = service.icon;
          const highlights = serviceHighlights[service.id] || [];
          const image = serviceImages[service.id];
          const isEven = index % 2 === 0;

          return (
            <Link
              key={service.id}
              href={`/uslugi/${service.slug}`}
              className="group relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-500"
            >
              {/* Image */}
              <div className={`relative h-64 md:h-80 lg:h-96 overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}>
                <Image
                  src={image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-transparent to-slate-950/60 hidden md:block`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
              </div>

              {/* Text content */}
              <div className={`relative p-6 md:p-8 lg:p-12 ${isEven ? "md:order-2" : "md:order-1"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                </div>

                <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-white/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  <span>Научи повече</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          );
        })}
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
