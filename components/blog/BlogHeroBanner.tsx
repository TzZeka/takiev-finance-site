"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function BlogHeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Curtain lift reveal — matches About page hero animation
  useGSAP(() => {
    gsap.fromTo(sectionRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut", delay: 0.5 }
    );
  }, { scope: sectionRef });

  // Track how far the section has scrolled out of view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Desktop parallax: image drifts down slightly as section scrolls up
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32 rounded-b-[2.5rem] md:rounded-b-[4rem]"
    >
      {/* ── Background image ── */}
      <motion.div
        className="absolute inset-0 w-full pointer-events-none"
        style={
          isDesktop
            ? { y: imageY, height: "125%", top: "-12.5%" }
            : { height: "100%", top: 0 }
        }
      >
        <Image
          src="/firm-logo/banners/blog-hero.png"
          alt="Блог - Takiev Finance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Gradient overlay for readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06121c]/65 via-[#06121c]/35 to-[#06121c]/70 pointer-events-none" />

      {/* ── Content ── */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumbs */}
          <div className="flex justify-center mb-8">
            <Breadcrumbs />
          </div>

          {/* Glassmorphism card */}
          <div className="inline-block bg-white/[0.02] backdrop-blur-xl rounded-2xl md:rounded-3xl px-8 py-7 md:px-14 md:py-10 border border-white/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)]">
            <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-white mb-4 tracking-tight">
              Блог
            </h1>
            <p className="text-[16px] md:text-[18px] text-white/72 leading-relaxed max-w-xl mx-auto font-medium">
              Актуални новини, съвети и анализи по счетоводство, данъци и бизнес
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
