import type { Metadata } from "next";
import { ContactBanner } from "./ContactBanner";
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
    <div className="min-h-screen pb-[120px] lg:pb-0" style={{ backgroundColor: "#0d1f1c" }}>
      <ContactBanner />
      <ContactSection />
    </div>
  );
}
