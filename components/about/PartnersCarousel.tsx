"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

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
    <div className="relative w-full mt-10 md:mt-20">
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6">

        {/* Main Editorial Grid Wrapper */}
        <div className="flex flex-col border-t border-l border-r border-[#19BFB7]/30">

          {partners.map((partner, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={partner.name}
                className="relative grid grid-cols-1 md:grid-cols-2 border-b border-[#19BFB7]/30 group"
              >
                {/* Crosshairs - top left, top right, bottom left, bottom right */}
                {/* These give the architectural "blueprint" feel from the images */}
                <span className="absolute -top-[7px] -left-[3.5px] text-[#19BFB7]/50 text-xs font-light pointer-events-none">+</span>
                <span className="absolute -top-[7px] -right-[3.5px] text-[#19BFB7]/50 text-xs font-light pointer-events-none">+</span>
                <span className="absolute -bottom-[7px] -left-[3.5px] text-[#19BFB7]/50 text-xs font-light pointer-events-none z-10">+</span>
                <span className="absolute -bottom-[7px] -right-[3.5px] text-[#19BFB7]/50 text-xs font-light pointer-events-none z-10">+</span>

                {/* Center crosshair for desktop split */}
                <span className="hidden md:block absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-[#19BFB7]/50 text-xs font-light pointer-events-none z-10">+</span>

                {/* --- BLOCK 1 (Left on desktop) --- */}
                <div className={`relative flex items-center justify-center p-8 sm:p-12 md:p-20 border-[#19BFB7]/30 ${!isEven ? 'order-2 md:order-1 border-t md:border-t-0 md:border-r' : 'order-1 md:border-r'}`}>
                  {isEven ? (
                    // IMAGE BLOCK
                    <motion.div
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3] flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                    >
                      <div className="relative w-[75%] sm:w-[65%] lg:w-[55%] flex items-center justify-center aspect-video lg:aspect-[3/2]">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain rounded-3xl filter transition-all duration-700 brightness-[1.5] drop-shadow-[0_0_15px_rgba(25,191,183,0.1)]"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    // TEXT BLOCK
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2d3d3a] mb-6 tracking-wide uppercase">
                        {partner.name}
                      </h3>

                      <p className="text-[#2d3d3a]/80 text-lg md:text-xl font-light leading-relaxed mb-auto max-w-lg">
                        {partner.description}
                      </p>

                      <div className="mt-12 flex items-center gap-3">
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="peer flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-[#19BFB7]/30 text-[#19BFB7]/50 hover:bg-[#19BFB7] hover:border-[#19BFB7] hover:text-white transition-all duration-500 relative z-10"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                        <span className="overflow-hidden whitespace-nowrap text-sm font-medium text-[#19BFB7]/80 transition-all duration-500 max-w-[200px] opacity-100 peer-hover:max-w-0 peer-hover:opacity-0 peer-hover:-translate-x-4 pointer-events-none">
                          Посетете сайта
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* --- BLOCK 2 (Right on desktop) --- */}
                <div className={`relative flex items-center justify-center p-8 sm:p-12 md:p-20 border-[#19BFB7]/30 ${!isEven ? 'order-1 md:order-2' : 'order-2 border-t md:border-t-0'}`}>
                  {isEven ? (
                    // TEXT BLOCK
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2d3d3a] mb-6 tracking-wide uppercase">
                        {partner.name}
                      </h3>

                      <p className="text-[#2d3d3a]/80 text-lg md:text-xl font-light leading-relaxed mb-auto max-w-lg">
                        {partner.description}
                      </p>

                      <div className="mt-12 flex items-center gap-3">
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="peer flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-[#19BFB7]/30 text-[#19BFB7]/50 hover:bg-[#19BFB7] hover:border-[#19BFB7] hover:text-white transition-all duration-500 relative z-10"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                        <span className="overflow-hidden whitespace-nowrap text-sm font-medium text-[#19BFB7]/80 transition-all duration-500 max-w-[200px] opacity-100 peer-hover:max-w-0 peer-hover:opacity-0 peer-hover:-translate-x-4 pointer-events-none">
                          Посетете сайта
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    // IMAGE BLOCK
                    <motion.div
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3] flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                    >
                      <div className="relative w-[75%] sm:w-[65%] lg:w-[55%] aspect-video lg:aspect-[3/2] flex items-center justify-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain rounded-3xl filter transition-all duration-700 brightness-[1.5] drop-shadow-[0_0_15px_rgba(25,191,183,0.1)]"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
