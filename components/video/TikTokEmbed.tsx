"use client";

interface TikTokEmbedProps {
  videoId: string;
  title: string;
}

export function TikTokEmbed({ videoId, title }: TikTokEmbedProps) {
  return (
    <div className="flex justify-center px-4">
      <div
        className="rounded-2xl overflow-hidden bg-black shadow-xl shadow-black/20 w-full max-w-[325px]"
      >
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          className="w-full"
          style={{
            height: "580px",
            border: "none"
          }}
          scrolling="no"
          allowFullScreen
          allow="encrypted-media"
          title={title}
        />
      </div>
    </div>
  );
}
