import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuickPanel } from "@/components/layout/QuickPanel";
import { PremiumLoader } from "@/components/shared/PremiumLoader";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LocalBusinessJsonLd, OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { NavDirectionProvider } from "@/components/providers/NavDirectionProvider";
import { QuickPanelProvider } from "@/components/layout/QuickPanelContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
    // Брандови
    "Takiev Finance",
    "Такиев Финанс",
    // Основни услуги
    "счетоводни услуги",
    "счетоводна кантора",
    "счетоводство",
    "счетоводител",
    "данъчни консултации",
    "данъчен консултант",
    "регистрация на фирми",
    "правни услуги",
    // Конкретни услуги (long-tail)
    "месечно счетоводство за фирми",
    "годишно приключване",
    "ТРЗ и осигуровки",
    "ДДС регистрация",
    "регистрация на ЕООД",
    "регистрация на ООД",
    "данъчна декларация",
    "данъчно планиране",
    "осчетоводяване на фактури",
    "финансови отчети",
    // Локални (София)
    "счетоводител София",
    "счетоводна кантора София",
    "счетоводни услуги София",
    "данъчен консултант София",
    "счетоводна фирма София",
    // Намерение за покупка
    "счетоводител София цена",
    "онлайн счетоводство",
    "счетоводство за малък бизнес",
    "счетоводство за стартъп",
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
        {/* Preload Hubot Sans — headings variable font */}
        <link
          rel="preload"
          href="/fonts/Hubot Sans/Hubot-Sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preload Mona Sans — body variable font (upright only; italic loads on demand) */}
        <link
          rel="preload"
          href="/fonts/Mona_Sans/MonaSans[wdth,wght].woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preload logo fonts to eliminate CLS in Header */}
        <link
          rel="preload"
          href="/fonts/Berkslund-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Avenir Heavy.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <LocalBusinessJsonLd />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body>
        <SmoothScrollProvider>
          <PremiumLoader />
          <QuickPanelProvider>
            <Header />
            <QuickPanel />
          </QuickPanelProvider>
          <NavDirectionProvider>
            <main className="min-h-screen w-full">{children}</main>
          </NavDirectionProvider>
          <Footer />
          <ScrollToTop />
        </SmoothScrollProvider>
        <SpeedInsights />
        <Analytics />
        {/*
          Film grain overlay — fixed, full-viewport, non-interactive.
          Uses SVG feTurbulence (fractalNoise) tiled at 200 × 200 px.

          Parameters:
            baseFrequency 0.72 — medium-coarse grain; 0.9 was too fine
              (like sand); 0.72 feels more like photographic film.
            numOctaves 4 — enough complexity without extra render cost.
            stitchTiles stitch — ensures seamless tiling so background-
              position jumps leave no visible seams.

          Animation:
            .grain-animated steps through 9 background-position offsets
            at 0.55 s / steps(1, end) → discrete frame jumps that mimic
            analogue film grain.  Disabled via prefers-reduced-motion.

          Blend mode soft-light:
            Multiplies contrast gently; keeps dark and light sections
            balanced without the harsh darkening of "overlay".

          Opacity 0.13:
            Visible without overwhelming — adjust ±0.02 to taste.
        */}
        <div
          aria-hidden="true"
          className="grain-animated"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            opacity: 0.15,
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </body>
    </html>
  );
}
