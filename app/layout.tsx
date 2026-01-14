import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PremiumLoader } from "@/components/shared/PremiumLoader";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Takiev Finance - Счетоводна Кантора",
  description:
    "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес. Нашият екип ще осигури сигурност, защита и експертно счетоводно обслужване на Вашия бизнес.",
  keywords: [
    "счетоводни услуги",
    "данъчни консултации",
    "счетоводство",
    "Такиев Финанс",
    "регистрация на фирми",
    "правни услуги",
  ],
  authors: [{ name: "Nikolay Takiev" }],
  creator: "Takiev Finance",
  publisher: "Takiev Finance",
  openGraph: {
    type: "website",
    locale: "bg_BG",
    title: "Takiev Finance - Професионални Счетоводни Услуги",
    description:
      "Избери своя доверен бизнес партньор. Експертно счетоводно обслужване на Вашия бизнес.",
    siteName: "Takiev Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Takiev Finance - Професионални Счетоводни Услуги",
    description:
      "Избери своя доверен бизнес партньор. Експертно счетоводно обслужване на Вашия бизнес.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <PremiumLoader />
        <Header />
        <main className="min-h-screen overflow-x-hidden w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
