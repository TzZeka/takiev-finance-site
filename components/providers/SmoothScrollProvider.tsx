"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Disable browser scroll restoration once — prevents page refresh from
  // restoring the previous scroll position instead of starting from the top.
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (pathname?.match(/^\/blog\/.+/)) return;

    // Ensure we always start at the top on every navigation / refresh.
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Feed Lenis into GSAP ticker so ScrollTrigger stays in sync.
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // When ScrollTrigger refreshes (e.g. after creating a pin spacer), tell
    // Lenis to recalculate scroll length so it doesn't cap out too early.
    const onSTRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onSTRefresh);

    // Delay the first refresh so:
    //  1. All child components have finished setting up their ScrollTriggers.
    //  2. The page-transition animation from template.tsx (0.42 s) has
    //     completed, meaning element positions are final when ScrollTrigger
    //     measures them (important for the pinned CinematicScrollSection).
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 520);

    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.removeEventListener("refresh", onSTRefresh);
      gsap.ticker.remove(tickerFn);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
