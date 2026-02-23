import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас - Счетоводна кантора в София от 2021 г.",
  description:
    "Запознайте се с екипа на Takiev Finance – счетоводна кантора в София от 2021 г. Професионално счетоводство, данъчни консултации и финансово обслужване за малък и среден бизнес.",
  keywords: [
    "за нас Takiev Finance",
    "счетоводна кантора София",
    "счетоводен екип София",
    "Николай Такиев счетоводител",
    "счетоводител София център",
    "данъчен консултант София",
    "финансови услуги София",
    "счетоводна фирма България",
  ],
  alternates: {
    canonical: "https://takiev.bg/za-nas",
  },
  openGraph: {
    title: "За нас | Takiev Finance - Счетоводна Кантора София",
    description:
      "Опознайте екипа и ценностите на Takiev Finance. Професионално счетоводство и данъчни консултации от 2021 г.",
    url: "https://takiev.bg/za-nas",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "За нас - Takiev Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "За нас | Takiev Finance",
    description:
      "Опознайте екипа и ценностите на Takiev Finance. Професионално счетоводство и данъчни консултации от 2021 г.",
    images: ["/opengraph-image"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
