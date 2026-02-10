import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuickPanel } from "@/components/layout/QuickPanel";
import { PremiumLoader } from "@/components/shared/PremiumLoader";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LocalBusinessJsonLd, OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin", "cyrillic"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], variable: "--font-cormorant", weight: ["400", "600", "700"] });

const baseUrl = "https://takiev.bg";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Takiev Finance - Счетоводна Кантора | Такиев Финанс",
    template: "%s | Takiev Finance",
  },
  description:
    "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес. Takiev Finance (Такиев Финанс) - счетоводни услуги, данъчни консултации, регистрация на фирми.",
  keywords: [
    // Брандови ключови думи
    "Takiev",
    "Takiev Finance",
    "takiev",
    "takiev finance",
    "Такиев",
    "Такиев Финанс",
    "такиев",
    "такиев финанс",
    // Услуги
    "счетоводни услуги",
    "счетоводна кантора",
    "счетоводство",
    "счетоводител",
    "данъчни консултации",
    "данъчен консултант",
    "регистрация на фирми",
    "регистрация на ЕООД",
    "регистрация на ООД",
    "правни услуги",
    "ТРЗ услуги",
    "годишно приключване",
    "ДДС регистрация",
    // Локални
    "счетоводител София",
    "счетоводна кантора София",
    "счетоводни услуги България",
  ],
  authors: [{ name: "Nikolay Takiev" }],
  creator: "Takiev Finance",
  publisher: "Takiev Finance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Добави след регистрация в Google Search Console
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "bg-BG": baseUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: baseUrl,
    title: "Takiev Finance - Счетоводна Кантора",
    description:
      "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес.",
    siteName: "Takiev Finance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Takiev Finance - Счетоводна Кантора",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takiev Finance - Счетоводна Кантора",
    description:
      "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" data-scroll-behavior="smooth">
      <head>
        <LocalBusinessJsonLd />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${inter.className} ${cormorant.variable}`}>
        <PremiumLoader />
        <Header />
        <QuickPanel />
        <main className="min-h-screen w-full">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
