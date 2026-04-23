"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PremiumCTA } from "@/components/ui/PremiumCTA";

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, margin: "-12%" } as const;

export function UslugiCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28"
      style={{
        backgroundColor: "#0d1f1c",
        zIndex: 2,
        borderTopLeftRadius: "2.5rem",
        borderTopRightRadius: "2.5rem",
      }}
    >
      <div className="container mx-auto">
        {/* Card — scale + fade entrance */}
        <motion.div
          className="border border-primary/20 bg-white/[0.03] p-6 sm:p-8 md:p-12 text-center"
          style={{
            borderTopLeftRadius: "2.5rem",
            borderTopRightRadius: "2.5rem",
          }}
          initial={{ opacity: 0, y: reduced ? 0 : 48, scale: reduced ? 1 : 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Heading — slides up after card */}
          <motion.h2
            className="text-white font-bold"
            style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.875rem)", lineHeight: 1.25 }}
            initial={{ opacity: 0, y: reduced ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          >
            Не сте сигурни коя услуга ви е необходима?
          </motion.h2>

          {/* Body text */}
          <motion.p
            className="font-body mt-3 mb-7 sm:mb-8 max-w-2xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              lineHeight: 1.75,
            }}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
          >
            Свържете се с нас за консултация. Ще ви помогнем да изберете
            най-подходящото решение за вашия бизнес.
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
          >
            <PremiumCTA href="/kontakti">
              Свържете се с нас
              <ArrowRight className="w-4 h-4" />
            </PremiumCTA>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
