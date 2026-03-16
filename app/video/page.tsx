import type { Metadata } from "next";
import { getAllVideos } from "@/lib/sanity/queries";
import { VideoPageClient } from "@/components/video/VideoPageClient";

export const metadata: Metadata = {
  title: "Видео по счетоводство и данъци - YouTube и TikTok",
  description:
    "Безплатни образователни видеа по счетоводство, данъци и бизнес от Takiev Finance. Практични съвети за ЕООД, ООД, ДДС и данъчни декларации в YouTube и TikTok.",
  keywords: [
    "видео счетоводство",
    "обучение данъци",
    "счетоводни съвети YouTube",
    "Такиев Финанс видео",
    "данъчни съвети",
    "счетоводство за начинаещи",
    "ДДС обяснение",
    "как да подам данъчна декларация",
  ],
  alternates: { canonical: "https://takiev.bg/video" },
  openGraph: {
    title: "Видео по счетоводство и данъци | Takiev Finance",
    description:
      "Безплатни образователни видеа по счетоводство и данъци от експертите на Takiev Finance.",
    url: "https://takiev.bg/video",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Видео - Takiev Finance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Видео по счетоводство и данъци | Takiev Finance",
    description:
      "Безплатни образователни видеа по счетоводство и данъци от експертите на Takiev Finance.",
    images: ["/opengraph-image"],
  },
};

export default async function VideoPage() {
  const videos = await getAllVideos();
  return <VideoPageClient videos={videos} />;
}
