"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/shared/ContactForm";
import { SectionBadge } from "@/components/shared/SectionBadge";

interface ContactFormSectionProps {
  ctaText?: string;
}

export function ContactFormSection({ ctaText }: ContactFormSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      {...(prefersReducedMotion ? {} : {
        initial: { y: 120 },
        whileInView: { y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { type: "spring" as const, stiffness: 80, damping: 20 },
      })}
      className="relative py-20 md:py-28 bg-white overflow-hidden shadow-sm"
      style={{
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        filter: "drop-shadow(0 -10px 20px rgba(0,0,0,0.10))",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-12 lg:gap-20 items-start">

          {/* Left — sticky title */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0 }}
            className="lg:sticky lg:top-28"
          >
            <SectionBadge>Свържете се</SectionBadge>
            <h2
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05]"
              style={{
                color: "#40514E",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontWeight: 900,
                fontStretch: "125%",
              }}
            >
              {ctaText ? (
                ctaText
              ) : (
                <>Готови ли<br />сте да<br /><span className="text-primary">започнете?</span></>
              )}
            </h2>
            <p className="mt-6 text-slate-400 text-base leading-relaxed max-w-[260px]">
              Свържете се с нас и нека обсъдим как можем да помогнем на Вашия бизнес.
            </p>
            <div className="mt-8 h-px w-14 bg-primary/40" />
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.12 }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
