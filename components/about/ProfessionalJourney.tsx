"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BookOpen, GraduationCap, Briefcase, Code } from "lucide-react";

interface JourneyItem {
  icon: any;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  year?: string;
}

const journeyItems: JourneyItem[] = [
  {
    icon: BookOpen,
    title: "Статии и публикации по данъци и счетоводство",
    description:
      "<strong>Николай Такиев</strong> е част от екипа на един от най-големите сайтове за счетоводство и данъци в България – <strong>PortalSchetovodstvo.bg</strong> където е автор на редица книги, статии и публикации в областта на счетоводството и данъците.",
    logo: "/firm-logo/partners/PortalSchetovodstvo.png",
    logoAlt: "Portal Schetovodstvo",
  },
  {
    icon: GraduationCap,
    title: "Обучения, семинари и курсове по данъци и счетоводство",
    description:
      "През 2020 година започва да се занимава с преподавателска дейност като към настоящия момент работи съвместно със счетоводната академия на Finance Academy, като основател и преподавател на цялостна професионална програма за обучение по счетоводство и данъци.",
    logo: "/firm-logo/partners/Finance Academy.png",
    logoAlt: "Finance Academy",
    year: "2020",
  },
  {
    icon: Briefcase,
    title: "Консултантска дейност",
    description:
      "Николай Такиев е данъчен консултант към една от водещите одиторски компании в България, където участва активно в разработването на стратегии за оптимизация на данъчното облагане на едни от най-големите дружества в страната в различните сектори на икономиката.",
    logo: "/firm-logo/partners/Zaharinova_Nexia_logo-300x128.png",
    logoAlt: "Nexia",
  },
  {
    icon: Code,
    title: "Съвременни решения в счетоводството",
    description:
      "През 2022 година Николай става част от екипа на NulaBG като счетоводен консултант във връзка с разработването на ново поколение счетоводен софтуер, който е изцяло уеб базиран и насочен както към организиране на счетоводната отчетност на едно предприятие, така и към управлението на бизнес процесите. Сайтът на NulaBG развива блог, в който можете да намерите полезни статии, свързани с данъците и счетоводството, чиито автор е Николай Такиев.",
    logo: "/firm-logo/partners/NULA.BG.png",
    logoAlt: "NulaBG",
    year: "2022",
  },
];

export function ProfessionalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const totalCards = journeyItems.length;
      const progressPerCard = 1 / (totalCards + 1);

      if (latest >= progressPerCard * totalCards) {
        setIsComplete(true);
        setCurrentCard(totalCards - 1);
      } else {
        setIsComplete(false);
        const cardIndex = Math.floor(latest / progressPerCard);
        setCurrentCard(Math.min(cardIndex, totalCards - 1));
      }
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${(journeyItems.length + 1) * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden will-change-transform">
        {/* Optimized Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10">
          {/* Static grid - no animation for better performance */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Simplified gradient orbs - fewer animations */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8 flex-shrink-0">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">
              Професионално развитие
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Партньорства и сътрудничество с водещи организации
            </p>
          </div>

          {/* Cards container - optimized */}
          <div className="w-full max-w-5xl flex-1 flex items-center justify-center">
            <div className="w-full">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  // Single card view (stacked) - optimized
                  <div key="single-view" className="relative" style={{ minHeight: "400px", maxHeight: "500px" }}>
                    {journeyItems.map((item, index) => {
                      const Icon = item.icon;
                      const isVisible = index <= currentCard;
                      const isCurrent = index === currentCard;
                      const offset = currentCard - index;

                      return (
                        <motion.div
                          key={index}
                          initial={false}
                          animate={{
                            opacity: isVisible ? 1 : 0,
                            scale: isVisible ? 1 - offset * 0.05 : 0.8,
                            y: isVisible ? -offset * 20 : 100,
                            zIndex: isCurrent ? 10 : index,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="absolute inset-0 will-change-transform"
                        >
                          <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary/10 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-primary via-teal-500 to-primary" />

                            <div className="p-6 md:p-8">
                              <div className="flex flex-col md:flex-row gap-6 items-center">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-teal-500 shadow-lg">
                                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                  </div>
                                </div>

                                {/* Text content */}
                                <div className="flex-1 space-y-3 text-center md:text-left">
                                  {item.year && (
                                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs md:text-sm font-bold">
                                      <div className="w-2 h-2 bg-primary rounded-full" />
                                      {item.year}
                                    </div>
                                  )}

                                  <h3 className="text-xl md:text-2xl font-bold text-dark">
                                    {item.title}
                                  </h3>

                                  <p className="text-sm md:text-base text-dark/80 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>

                                {/* Logo */}
                                <div className="flex-shrink-0 w-40 h-24 md:w-48 md:h-28 relative bg-white rounded-xl border-2 border-primary/20 p-3 flex items-center justify-center shadow-lg">
                                  <Image
                                    src={item.logo}
                                    alt={item.logoAlt}
                                    fill
                                    className="object-contain p-3"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Corner decorations */}
                            <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-primary/20 rounded-tr-xl" />
                            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-primary/20 rounded-bl-xl" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  // All cards view (grid) - optimized with proper spacing
                  <motion.div
                    key="grid-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-h-[80vh] overflow-y-auto custom-scrollbar pb-8"
                  >
                    {journeyItems.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.08,
                            ease: "easeOut",
                          }}
                          className="bg-white rounded-xl shadow-xl border-2 border-primary/10 overflow-hidden hover:border-primary/30 transition-colors duration-300 will-change-transform"
                        >
                          <div className="h-1.5 bg-gradient-to-r from-primary via-teal-500 to-primary" />

                          <div className="p-5">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-teal-500/20 flex-shrink-0">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>

                              <div className="flex-1 min-w-0">
                                {item.year && (
                                  <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold mb-1">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    {item.year}
                                  </div>
                                )}
                                <h3 className="text-base md:text-lg font-bold text-dark mb-1 line-clamp-2">
                                  {item.title}
                                </h3>
                              </div>
                            </div>

                            <p className="text-xs md:text-sm text-dark/70 leading-relaxed mb-3 line-clamp-4">
                              {item.description}
                            </p>

                            <div className="w-full h-16 relative bg-gray-50 rounded-lg border border-primary/10 p-2 flex items-center justify-center">
                              <Image
                                src={item.logo}
                                alt={item.logoAlt}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Scroll hint */}
          {!isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="flex-shrink-0 mt-6"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-primary/60 text-xs md:text-sm font-medium flex flex-col items-center gap-1"
              >
                <span>Скролирай</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  );
}
