"use client";

import { useRef } from "react";
import Image from "next/image";
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
      className="relative py-20 md:py-28 overflow-hidden shadow-sm"
      style={{
        borderTopLeftRadius: "50% 2rem",
        borderTopRightRadius: "50% 2rem",
        filter: "drop-shadow(0 -10px 20px rgba(0,0,0,0.10))",
      }}
    >
      {/* Background image */}
      <Image
        src="/firm-logo/contact-photos/ready-to-start.png"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden
      />
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/60" />

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
                color: "var(--color-dark)",
                fontVariationSettings: "'wght' 900, 'wdth' 125",
                fontWeight: 900,
                fontStretch: "125%",
              }}
            >
              {ctaText ? (
                ctaText
              ) : (
                <>Готови ли<br />сте да<br /><span style={{ color: "#0f766e" }}>започнете?</span></>
              )}
            </h2>
            <p className="mt-6 text-slate-600 text-base leading-relaxed max-w-[260px]">
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
            <div
              className="rounded-2xl p-7 md:p-9
                [&_label]:text-slate-800 [&_label]:font-semibold
                [&_input]:bg-white [&_input]:border-slate-200 [&_input]:text-slate-900 [&_input]:placeholder:text-slate-500 [&_input]:shadow-sm
                [&_textarea]:bg-white [&_textarea]:border-slate-200 [&_textarea]:text-slate-900 [&_textarea]:placeholder:text-slate-500 [&_textarea]:shadow-sm
                [&_a]:text-teal-700 [&_a:hover]:text-teal-800"
              style={{
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(22px) saturate(160%)",
                WebkitBackdropFilter: "blur(22px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.75)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
