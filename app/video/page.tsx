import type { Metadata } from "next";
import { getAllVideos } from "@/lib/sanity/queries";
import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import { TikTokCarousel } from "@/components/video/TikTokCarousel";
import { Youtube } from "lucide-react";

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
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#0a0f1a] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />

        {/* Diagonal grid ornament - right side */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.5) 40px,
              rgba(255,255,255,0.5) 41px
            )`,
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%, black 100%)',
          }}
        />

        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-slate-300 font-medium">Видео съдържание</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Takiev Finance в{" "}
              <span className="text-red-500">YouTube</span>
              {" "}и{" "}
              <span className="text-slate-300">TikTok</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Обучения по данъци и счетоводство
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.youtube.com/@nikolaytakiev6221"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-600/20"
              >
                <Youtube className="w-5 h-5" />
                <span>Абонирай се в YouTube</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@n.takiev"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>Последвай в TikTok</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* Content Section */}
      <div className="relative bg-slate-950">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-20">
          {/* YouTube Section */}
          {youtubeVideos.length > 0 && (
            <section className="mb-24 md:mb-32 relative">
              {/* Section background glow */}
              <div className="absolute -inset-10 bg-red-500/5 rounded-3xl blur-3xl -z-10" />

              <div className="flex items-center justify-center gap-4 mb-14">
                <div className="h-px flex-1 max-w-40 bg-gradient-to-r from-transparent via-red-500/20 to-red-500/40" />
                <div className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500/20 to-red-600/10 rounded-full border border-red-500/30 shadow-lg shadow-red-500/10">
                  <Youtube className="h-7 w-7 text-red-500" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">YouTube</h2>
                </div>
                <div className="h-px flex-1 max-w-40 bg-gradient-to-l from-transparent via-red-500/20 to-red-500/40" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                {youtubeVideos.map((video, index) => (
                  <div
                    key={video._id}
                    className={`group relative rounded-2xl overflow-hidden ${
                      index === 0 && youtubeVideos.length > 2 ? "lg:col-span-2" : ""
                    }`}
                  >
                    {/* Card glow effect */}
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500/50 via-transparent to-red-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                    <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-white/10 group-hover:border-red-500/40 rounded-2xl overflow-hidden transition-colors duration-300">
                      <div className="aspect-video">
                        <YouTubeEmbed videoId={video.videoId} title={video.title} />
                      </div>
                      <div className="p-6 md:p-7 bg-gradient-to-t from-black/20 to-transparent">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-red-400 transition-colors mb-2">
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {video.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TikTok Section - Carousel */}
          {tiktokVideos.length > 0 && (
            <section className="mb-20 relative">
              {/* Section background with gradient */}
              <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/5 via-fuchsia-500/5 to-cyan-500/5 rounded-3xl blur-3xl -z-10" />

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 max-w-40 bg-gradient-to-r from-transparent via-white/10 to-white/30" />
                <div className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-white/20 shadow-lg shadow-white/5">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" className="fill-white"/>
                  </svg>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">TikTok</h2>
                </div>
                <div className="h-px flex-1 max-w-40 bg-gradient-to-l from-transparent via-white/10 to-white/30" />
              </div>

              {/* Carousel */}
              <TikTokCarousel videos={tiktokVideos} />
            </section>
          )}

          {/* Empty State */}
          {videos.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Youtube className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Очаквайте скоро
              </h3>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Видеата ще бъдат добавени скоро. Следете ни за актуално съдържание по данъци и счетоводство.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
