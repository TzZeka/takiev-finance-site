import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Phone, MapPin, Clock, CheckCircle, Calculator, Receipt, Scale, Building2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

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
  alternates: {
    canonical: "https://takiev.bg/kontakti",
  },
  openGraph: {
    title: "Контакти | Takiev Finance - Счетоводна Кантора София",
    description:
      "Свържете се с Takiev Finance за счетоводна консултация. бул. Ал. Стамболийски 30Б, София.",
    url: "https://takiev.bg/kontakti",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Контакти - Takiev Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакти | Takiev Finance",
    description:
      "Свържете се с Takiev Finance за счетоводна консултация.",
    images: ["/opengraph-image"],
  },
};

const whyChooseUsReasons = [
  "Бърз отговор на запитвания",
  "Професионален екип от експерти",
  "Индивидуален подход към всеки клиент",
  "Доказан опит от 2021 г.",
  "Прозрачна и коректна ценова политика",
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "office@takiev.bg",
    link: "mailto:office@takiev.bg",
  },
  {
    icon: Phone,
    title: "Телефон",
    content: "+359 89 908 0016",
    link: "tel:+359899080016",
  },
  {
    icon: MapPin,
    title: "Адрес",
    content: `бул. „Александър Стамболийски" 30Б, 1000 София`,
    link: "https://www.google.com/maps/place/Takiev+Finance+EOOD/@42.697707877149,23.319877890847863,17z",
  },
  {
    icon: Clock,
    title: "Работно време",
    content: "Пон-Пет: 9:00 - 18:00",
    link: null,
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Full-page background image */}
      <Image
        src="/firm-logo/contact-photos/контакти-фон.png"
        alt=""
        fill
        className="object-cover fixed"
        priority
      />

      {/* Dark overlay over entire page */}
      <div className="fixed inset-0 bg-slate-950/40" />

      {/* All content sits above the background */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-24 md:pb-32 text-white text-center">
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

        {/* Contact Info Cards */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 -mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              const content = item.link ? (
                <a
                  href={item.link}
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  {item.content}
                </a>
              ) : (
                <span className="text-white/80 text-sm">{item.content}</span>
              );

              return (
                <div
                  key={index}
                  className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="p-2.5 bg-primary/20 rounded-xl w-fit mb-4">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white text-sm uppercase tracking-wide mb-1">
                    {item.title}
                  </h3>
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content: Map + Form */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Google Maps */}
            <div className="h-[300px] lg:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.283956399353!2d23.319877890847863!3d42.697707877149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa855eff40e335%3A0xa7cffc05e42a4e56!2sTakiev%20Finance%20EOOD!5e0!3m2!1sbg!2sbg!4v1768080298879!5m2!1sbg!2sbg&style=feature:all|element:geometry|color:0x40514E&style=feature:all|element:labels.text.fill|color:0x19BFB7&style=feature:all|element:labels.text.stroke|color:0x2c3e3b&style=feature:water|element:geometry|color:0x2c3e3b"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Takiev Finance Location"
              />
            </div>

            {/* Contact Form */}
            <div className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Изпратете запитване
              </h2>
              <p className="text-white/60 mb-6">
                Ще се свържем с вас възможно най-скоро
              </p>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Защо да изберете нас?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUsReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm md:text-base">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links — Services */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Нашите услуги
          </h2>
          <p className="text-white/60 mb-8 max-w-xl">
            Разгледайте пълната гама услуги, които предлагаме на нашите клиенти.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/uslugi/schetovodni-uslugi", label: "Счетоводни услуги", desc: "Месечно счетоводство, годишно приключване, ТРЗ", icon: Calculator },
              { href: "/uslugi/danachni-konsultacii", label: "Данъчни консултации", desc: "ДДС регистрация, данъчно планиране, НАП", icon: Receipt },
              { href: "/uslugi/pravni-uslugi", label: "Правни услуги", desc: "Договори, трудово и търговско право", icon: Scale },
              { href: "/uslugi/registraciq-na-firmi", label: "Регистрация на фирми", desc: "ЕООД, ООД, ЕТ — бързо и лесно", icon: Building2 },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 transition-colors"
                >
                  <div className="p-2.5 bg-primary/20 rounded-xl flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white group-hover:text-primary transition-colors">{service.label}</p>
                    <p className="text-white/50 text-sm">{service.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
