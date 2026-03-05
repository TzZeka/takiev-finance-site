"use client";

import { useRef } from "react";
import Image from "next/image";
import { useImageParallax, useZoomReveal, useContainerMorph } from "@/hooks/useScrollAnim";

interface ServiceImageBlockProps {
  src: string;
  alt: string;
  isEven: boolean;
}

export function ServiceImageBlock({ src, alt, isEven }: ServiceImageBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useZoomReveal(containerRef, innerRef);
  useImageParallax(containerRef, innerRef);
  useContainerMorph(containerRef);

  return (
    <div
      ref={containerRef}
      className={`relative h-64 md:h-80 lg:h-96 overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}
    >
      <div
        ref={innerRef}
        style={{ position: "absolute", inset: "-15%", willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-transparent to-slate-950/60 hidden md:block`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
    </div>
  );
}
