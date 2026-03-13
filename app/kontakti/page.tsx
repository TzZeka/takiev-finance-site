import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactSection } from "./ContactSection";

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

        <ContactSection />
      </div>
    </div>
  );
}
