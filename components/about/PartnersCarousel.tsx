"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const partners = [
  {
    name: "Portal Schetovodstvo",
    logo: "/firm-logo/partners/PortalSchetovodstvo.png",
    description: "Водещ портал за счетоводство и данъци в България",
    url: "https://www.portalschetovodstvo.bg/",
  },
  {
    name: "Finance Academy",
    logo: "/firm-logo/partners/Finance Academy.png",
    description: "Професионално обучение по счетоводство и финанси",
    url: "#",
  },
  {
    name: "Nexia Zaharinova",
    logo: "/firm-logo/partners/Zaharinova_Nexia_logo-300x128.png",
    description: "Водеща одиторска компания в България",
    url: "#",
  },
  {
    name: "Nula.bg",
    logo: "/firm-logo/partners/NULA.BG.png",
    description: "Единствената платформа за онлайн счетоводен софтуер в България",
    url: "https://nula.bg/",
  },
];

export function PartnersCarousel() {
  return (
    <div className="w-full">
      {/* Desktop & Tablet - Grid Layout */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {partners.map((partner, index) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group block h-full"
          >
            <div className="relative bg-slate-800/50 border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden h-full transition-all duration-500 ease-out hover:border-white/10 hover:-translate-y-1">
              {/* Logo Container */}
              <div className="relative h-24 sm:h-28 lg:h-32 bg-white/[0.02] flex items-center justify-center p-4 sm:p-5 lg:p-6">
                <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-1 sm:p-2"
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
                  />
                </div>
              </div>

              {/* Divider Line */}
              <div className="h-px bg-white/5" />

              {/* Partner Info */}
              <div className="p-3.5 sm:p-4 lg:p-5">
                <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg transition-colors duration-500 ease-out group-hover:text-primary">
                    {partner.name}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/20 transition-colors duration-500 ease-out group-hover:text-primary/60" />
                </div>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                  {partner.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-0.5 sm:h-1 bg-gradient-to-r from-primary via-teal-500 to-cyan-500 transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Mobile - Vertical Cards */}
      <div className="sm:hidden space-y-3">
        {partners.map((partner, index) => (
          <motion.a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
            className="group block"
          >
            <div className="relative bg-slate-800/50 border border-white/5 rounded-xl overflow-hidden transition-all duration-500 ease-out active:scale-[0.98]">
              <div className="flex items-center gap-3.5 p-3.5">
                {/* Logo Container */}
                <div className="relative w-16 h-12 flex-shrink-0 bg-white/[0.02] rounded-lg overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-1.5"
                    sizes="64px"
                  />
                </div>

                {/* Partner Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {partner.name}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-white/20 flex-shrink-0" />
                  </div>
                  <p className="text-white/40 text-[10px] leading-relaxed line-clamp-2">
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="h-0.5 bg-gradient-to-r from-primary/40 via-teal-500/40 to-cyan-500/40" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
