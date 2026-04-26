import type { Metadata } from "next";
import { getStandards } from "@/lib/sanity/queries";
import { MsfoBanner } from "./MsfoBanner";
import { MsfoPageClient } from "./MsfoPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Международни стандарти МСС МСФО | Takiev Finance",
  description:
    "Пълна база данни с МСС (IAS), МСФО (IFRS) и Разяснения — безплатен достъп до PDF документите на международните счетоводни стандарти.",
  keywords: [
    "международни счетоводни стандарти",
    "МСС",
    "МСФО",
    "IAS",
    "IFRS",
    "разяснения МСФО",
    "счетоводни стандарти България",
    "МСС стандарти PDF",
  ],
  alternates: { canonical: "https://takiev.bg/msfo" },
  openGraph: {
    title: "Международни стандарти МСС / МСФО | Takiev Finance",
    description:
      "МСС (IAS), МСФО (IFRS) и Разяснения — безплатен достъп до PDF документите.",
    url: "https://takiev.bg/msfo",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Международни стандарти - Takiev Finance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Международни стандарти | Takiev Finance",
    description: "МСС (IAS), МСФО (IFRS) и Разяснения — безплатен достъп до PDF.",
    images: ["/opengraph-image"],
  },
};

export default async function MsfoPage() {
  const standards = await getStandards();

  return (
    <div
      className="min-h-screen pb-[120px] lg:pb-0"
      style={{ backgroundColor: "#0d1f1c" }}
    >
      <MsfoBanner />
      <MsfoPageClient standards={standards} />
    </div>
  );
}
