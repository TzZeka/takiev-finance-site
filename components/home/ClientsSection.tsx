"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Building2 } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import type { Client } from "@/types";

interface ClientsSectionProps {
  clients: Client[];
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  if (clients.length === 0) return null;

  const midpoint = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, midpoint);
  const row2 = clients.slice(midpoint);
  const row1Items = [...row1, ...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2, ...row2];

  const anim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5, delay },
        };

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Subtle gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div {...anim(0)} className="text-center mb-14">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4" />
            Партньори
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Нашите <span className="text-primary">партньори</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Сътрудничим с водещи компании за цялостни решения на Вашия бизнес
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />
        <div
          className="flex gap-5 animate-scroll-left"
          style={{ animationDuration: `${row1Items.length * 3}s`, width: "max-content" }}
        >
          {row1Items.map((client, index) => (
            <div
              key={`r1-${client._id}-${index}`}
              className="group flex-shrink-0 flex items-center justify-center w-44 h-24 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:border-primary/25 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="relative w-28 h-14">
                <Image
                  src={getImageUrl(client.logo)}
                  alt={client.name}
                  fill
                  sizes="112px"
                  className="object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      {row2.length > 0 && (
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          <div
            className="flex gap-5 animate-scroll-right"
            style={{ animationDuration: `${row2Items.length * 3}s`, width: "max-content" }}
          >
            {row2Items.map((client, index) => (
              <div
                key={`r2-${client._id}-${index}`}
                className="group flex-shrink-0 flex items-center justify-center w-44 h-24 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:border-primary/25 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="relative w-28 h-14">
                  <Image
                    src={getImageUrl(client.logo)}
                    alt={client.name}
                    fill
                    sizes="112px"
                    className="object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
