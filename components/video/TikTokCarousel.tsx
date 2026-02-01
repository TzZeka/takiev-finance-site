"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TikTokEmbed } from "./TikTokEmbed";

interface Video {
  _id: string;
  videoId: string;
  title: string;
  description?: string;
}

interface TikTokCarouselProps {
  videos: Video[];
}

export function TikTokCarousel({ videos }: TikTokCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(videos.length - 1);
    } else if (index >= videos.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const goToPrevious = () => goToSlide(currentIndex - 1);
  const goToNext = () => goToSlide(currentIndex + 1);

  if (videos.length === 0) return null;

  return (
    <div className="relative w-full">
      {/* Main carousel container */}
      <div className="relative flex justify-center items-center pb-16">
        {/* Video container - fixed size to prevent cropping */}
        <div className="relative">
          {videos.map((video, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={video._id}
                className={`transition-opacity duration-300 ${
                  isActive ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
              >
                {/* TikTok embed wrapper - let it use natural size */}
                <div className="flex flex-col items-center">
                  {isActive && (
                    <TikTokEmbed
                      key={`active-${video.videoId}-${currentIndex}`}
                      videoId={video.videoId}
                      title={video.title}
                    />
                  )}

                  {/* Description */}
                  {isActive && video.description && (
                    <div className="mt-4 max-w-[300px] px-4">
                      <p className="text-sm text-muted-foreground text-center line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - always visible, positioned outside video */}
        {videos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 md:left-8 lg:left-20 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 backdrop-blur-sm transition-colors duration-300"
              aria-label="Предишно видео"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 md:right-8 lg:right-20 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 backdrop-blur-sm transition-colors duration-300"
              aria-label="Следващо видео"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator - positioned below with clear spacing */}
      {videos.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/30 hover:bg-white/50 w-2.5"
              }`}
              aria-label={`Видео ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
