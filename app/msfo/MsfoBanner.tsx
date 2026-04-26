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

export function MsfoBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut", delay: 0.5 }
    );
  }, { scope: sectionRef });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-32 pb-0 md:pt-44 md:pb-0 rounded-b-[2.5rem] md:rounded-b-[4rem]"
      style={{ minHeight: "520px" }}
    >
      {/* Background image — replace banner-msfo.png when available */}
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
          alt="Международни счетоводни стандарти - Takiev Finance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06121c]/65 via-[#06121c]/35 to-[#06121c]/70 pointer-events-none" />

      {/* Breadcrumbs */}
      <div className="absolute top-0 inset-x-0 z-20 pt-32 md:pt-36 flex justify-center">
        <Breadcrumbs />
      </div>

      {/* Glassmorphism card */}
      <div className="absolute inset-x-0 bottom-0 px-4 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="block bg-white/[0.015] backdrop-blur-xl rounded-t-[1.5rem] md:rounded-t-[2.5rem] px-8 py-7 md:px-14 md:py-10 border border-white/[0.04] shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <h1
              className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-white mb-4 tracking-tight"
            >
              Международни стандарти
            </h1>
            <p
              className="font-body text-[15px] md:text-[17px] text-white/65 leading-relaxed max-w-xl mx-auto tracking-wide"
              style={{ fontWeight: 300, fontStretch: "110%" }}
            >
              МСС (IAS), МСФО (IFRS) и Разяснения — безплатен достъп до документите
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
