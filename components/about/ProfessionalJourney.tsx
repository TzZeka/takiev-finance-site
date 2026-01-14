"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      "Николай Такиев е част от екипа на един от най-големите сайтове за счетоводство и данъци в България – PortalSchetovodstvo.bg където е автор на редица книги, статии и публикации в областта на счетоводството и данъците.",
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const cardIndex = Math.min(
        Math.floor(latest * journeyItems.length),
        journeyItems.length - 1
      );
      setCurrentCard(cardIndex);
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${journeyItems.length * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Parallax Background Layers */}
        <div className="absolute inset-0">
          {/* Layer 1 - Furthest back (slowest) */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -150]),
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-card to-teal-500/5"
          />

          {/* Layer 2 - Diagonal stripes */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -300]),
            }}
            className="absolute inset-0 opacity-5"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{
                  top: `${i * 10}%`,
                  left: "-20%",
                  right: "-20%",
                  transform: `rotate(-12deg)`,
                }}
              />
            ))}
          </motion.div>

          {/* Layer 3 - Floating shapes */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -200]),
              x: useTransform(scrollYProgress, [0, 1], [0, -100]),
            }}
            className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -250]),
              x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            }}
            className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="w-full max-w-6xl">
            {/* Header - moves with parallax */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.2], [0, -100]),
              }}
              className="absolute top-12 left-0 right-0 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Професионално развитие
              </h2>
              <p className="text-lg text-muted-foreground">
                Партньорства и сътрудничество с водещи организации
              </p>
            </motion.div>

            {/* Cards with diagonal/slanted design */}
            <div className="relative h-full flex items-center">
              {journeyItems.map((item, index) => {
                const Icon = item.icon;
                const progress = (currentCard - index) / journeyItems.length;
                const isActive = currentCard === index;
                const isPast = currentCard > index;
                const isFuture = currentCard < index;

                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Diagonal card container */}
                    <motion.div
                      initial={false}
                      animate={{
                        rotateY: isFuture ? 45 : isPast ? -45 : 0,
                        rotateZ: isFuture ? 5 : isPast ? -5 : 0,
                        x: isFuture ? 200 : isPast ? -200 : 0,
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.85,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="w-full max-w-4xl"
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                      }}
                    >
                      {/* Main card with slanted design */}
                      <div className="relative">
                        {/* Diagonal accent bar - top left */}
                        <div className="absolute -top-2 -left-2 w-32 h-1 bg-gradient-to-r from-primary to-teal-500 transform -rotate-12 rounded-full" />

                        {/* Diagonal accent bar - bottom right */}
                        <div className="absolute -bottom-2 -right-2 w-32 h-1 bg-gradient-to-r from-teal-500 to-primary transform -rotate-12 rounded-full" />

                        {/* Card content */}
                        <div className="relative bg-card rounded-xl shadow-2xl overflow-hidden border border-primary/20">
                          {/* Diagonal gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5"
                               style={{ transform: "skewY(-2deg)", transformOrigin: "top left" }} />

                          <div className="relative p-8 md:p-12">
                            <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
                              {/* Icon with parallax */}
                              <motion.div
                                style={{
                                  y: useTransform(scrollYProgress, [index / journeyItems.length, (index + 1) / journeyItems.length], [30, -30]),
                                }}
                                className="flex justify-center md:justify-start"
                              >
                                <div className="relative">
                                  {/* Diagonal line behind icon */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-teal-500/20 rounded-2xl transform rotate-6 scale-110" />

                                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-teal-500 flex items-center justify-center transform -rotate-6 shadow-xl">
                                    <Icon className="w-12 h-12 text-white" />
                                  </div>
                                </div>
                              </motion.div>

                              {/* Text content */}
                              <div className="space-y-4 text-center md:text-left">
                                {item.year && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold"
                                  >
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                    {item.year}
                                  </motion.div>
                                )}

                                <motion.h3
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                  transition={{ delay: 0.3 }}
                                  className="text-2xl md:text-3xl font-bold text-foreground"
                                >
                                  {item.title}
                                </motion.h3>

                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                  transition={{ delay: 0.4 }}
                                  className="text-base text-foreground/70 leading-relaxed"
                                >
                                  {item.description}
                                </motion.p>
                              </div>

                              {/* Logo with parallax */}
                              <motion.div
                                style={{
                                  y: useTransform(scrollYProgress, [index / journeyItems.length, (index + 1) / journeyItems.length], [-30, 30]),
                                }}
                                className="flex justify-center md:justify-end"
                              >
                                <div className="relative w-48 h-32">
                                  {/* Diagonal background */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-card rounded-xl border border-primary/10 transform rotate-3" />

                                  <div className="relative w-full h-full flex items-center justify-center p-4">
                                    <Image
                                      src={item.logo}
                                      alt={item.logoAlt}
                                      fill
                                      className="object-contain p-4"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>

                          {/* Diagonal line accent */}
                          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary via-teal-500 to-primary transform skew-x-12 origin-top-right opacity-20" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress indicator - minimalist */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {journeyItems.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1 bg-primary/20 rounded-full overflow-hidden"
                  style={{ width: currentCard === index ? "48px" : "24px" }}
                  animate={{
                    width: currentCard === index ? "48px" : "24px",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-teal-500"
                    initial={{ x: "-100%" }}
                    animate={{
                      x: currentCard === index ? "0%" : currentCard > index ? "0%" : "-100%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
