import type { Metadata } from "next";
import { getAllVideos } from "@/lib/sanity/queries";
import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import { TikTokEmbed } from "@/components/video/TikTokEmbed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "Видео - Takiev Finance",
  description:
    "Образователни видеа по счетоводство и данъци. Следете нашия YouTube канал и TikTok профил за полезни съвети и актуална информация.",
};

export default async function VideoPage() {
  const videos = await getAllVideos();

  const youtubeVideos = videos.filter((v) => v.platform === "youtube");
  const tiktokVideos = videos.filter((v) => v.platform === "tiktok");

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Takiev Finance в YouTube
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Обучения по данъци и счетоводство
          </p>
        </div>

        {/* YouTube Section */}
        {youtubeVideos.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <Youtube className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-foreground">YouTube</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {youtubeVideos.map((video) => (
                <Card key={video._id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <YouTubeEmbed videoId={video.videoId} title={video.title} />
                    {video.description && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        {video.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* TikTok Section */}
        {tiktokVideos.length > 0 && (
          <section>
            <div className="flex items-center mb-8">
              <Music className="h-8 w-8 text-black mr-3" />
              <h2 className="text-3xl font-bold text-foreground">TikTok</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tiktokVideos.map((video) => (
                <div key={video._id}>
                  <TikTokEmbed videoId={video.videoId} title={video.title} />
                  {video.description && (
                    <p className="mt-4 text-sm text-muted-foreground text-center">
                      {video.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Видеата ще бъдат добавени скоро.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
