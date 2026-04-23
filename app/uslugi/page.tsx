import type { Metadata } from "next";
import { UslugiHero } from "@/components/uslugi/UslugiHero";
import { ServicesShowcase } from "@/components/uslugi/ServicesShowcase";
import { UslugiCTA } from "@/components/uslugi/UslugiCTA";

export const metadata: Metadata = {
  title: "Услуги | Takiev Finance - Счетоводна Кантора",
  description:
    "Професионални счетоводни, данъчни и правни услуги за вашия бизнес. Регистрация на фирми, месечно счетоводство, данъчни консултации и правна помощ.",
  keywords: [
    "счетоводни услуги",
    "данъчни консултации",
    "правни услуги",
    "регистрация на фирми",
    "счетоводител",
    "счетоводна кантора",
  ],
  alternates: { canonical: "https://takiev.bg/uslugi" },
  openGraph: {
    title: "Услуги | Takiev Finance",
    description:
      "Професионални счетоводни, данъчни и правни услуги за вашия бизнес.",
    url: "https://takiev.bg/uslugi",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1f1c" }}>
      {/* Banner hero — same style as За нас */}
      <UslugiHero />

      {/* Sticky services showcase with clip-path entrance */}
      <ServicesShowcase />

      {/* Animated CTA section */}
      <UslugiCTA />
    </div>
  );
}
