"use client";

import { useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useImageParallax — scrubbed Y parallax on an inner element inside an overflow:hidden container.
 * The inner element should be pre-scaled (scale 1.15) via useZoomReveal or CSS to prevent gaps.
 */
export function useImageParallax(
  containerRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!containerRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        gsap.to(innerRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      mm.add("(min-width: 769px)", () => {
        gsap.to(innerRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [containerRef, innerRef]);
}

/**
 * useZoomReveal — one-shot zoom-out entrance: scale 1.15 → 1 as container enters viewport.
 * Compose with useImageParallax on the same innerRef.
 */
export function useZoomReveal(
  containerRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!containerRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 768px)", () => {
        gsap.fromTo(
          innerRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      mm.add("(min-width: 769px)", () => {
        gsap.fromTo(
          innerRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [containerRef, innerRef]);
}

/**
 * useContainerMorph — scrubbed scale + borderRadius morph on the container itself.
 * Desktop only. 1 → 0.97 → 1 + borderRadius 12px → 20px → 12px.
 */
export function useContainerMorph(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
        tl.to(containerRef.current, {
          scale: 0.97,
          borderRadius: "20px",
          ease: "none",
        }).to(containerRef.current, {
          scale: 1,
          borderRadius: "12px",
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, [containerRef]);
}
