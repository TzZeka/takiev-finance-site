"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function ContactBanner() {
  return (
    <section
      className="relative w-full overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]"
      style={{ maxHeight: "88vh", minHeight: "360px" }}
    >
      {/* Curtain reveal — wraps image + gradient */}
      <motion.div
        className="relative w-full"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] as [number, number, number, number] }}
      >
        <Image
          src="/firm-logo/contact-photos/контакти-фон.png"
          alt="Контакти - Takiev Finance"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="w-full h-auto block -translate-y-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06121c]/55 via-[#06121c]/20 to-[#06121c]/80 pointer-events-none" />
      </motion.div>

      {/* Breadcrumbs — top center, below header */}
      <div className="absolute top-0 inset-x-0 z-20 pt-32 md:pt-36 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Breadcrumbs />
        </motion.div>
      </div>

      {/* Glassmorphism card — bottom center */}
      <div className="absolute inset-x-0 bottom-0 px-4 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            className="bg-white/[0.015] backdrop-blur-2xl rounded-t-[1.5rem] md:rounded-t-[2.5rem] px-8 py-7 md:px-14 md:py-10 border border-white/[0.07]"
            style={{
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              delay: 0.6,
            }}
          >
            <h1
              className="text-white font-bold tracking-tight leading-[1.08]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              Контакти
            </h1>
            <p
              className="font-body mt-3 max-w-xl mx-auto leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(0.88rem, 1.6vw, 1rem)",
                fontWeight: 300,
                fontStretch: "110%",
              }}
            >
              Ще се радваме да обсъдим как можем да помогнем на вашия бизнес
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
