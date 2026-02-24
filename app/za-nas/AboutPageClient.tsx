"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  LayoutGrid,
  Play,
  Facebook,
  Linkedin,
  Youtube
} from "lucide-react";
import { PartnersCarousel } from "@/components/about/PartnersCarousel";
import { PremiumCTA } from "@/components/ui/PremiumCTA";

export interface TeamMemberDisplay {
  name: string;
  role: string;
  education: string;
  image: string;
  bio: string;
  isLeader: boolean;
}

// Section Title Component — premium editorial style
function SectionTitle({
  title,
  subtitle,
  accent,
  center = true,
  light = false,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {/* Short primary accent line */}
      <div className={`mb-5 sm:mb-6 ${center ? "flex justify-center" : ""}`}>
        <div className="w-10 h-[2px] bg-primary" />
      </div>

      {/* Main title — large serif */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-[1.1]"
      >
        {accent ? (
          <>
            {title.split(accent)[0]}
            <span className="text-primary">{accent}</span>
            {title.split(accent)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-sm sm:text-base md:text-lg max-w-2xl ${center ? "mx-auto" : ""} px-4 ${light ? "text-white/70" : "text-white/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Business sectors organized in 3 rows for carousel
const businessSectorsRows = [
  // Row 1 - moves left
  [
    "Електронна търговия и дропшипинг бизнес",
    "Технологичен сектор (ИТ сектор)",
    "Творчески индустрии",
  ],
  // Row 2 - moves right
  [
    "Маркетингови и консултантски услуги",
    "Строителство и инвестиции в недвижими имоти",
    "Фрийлансъри на свободна практика",
  ],
  // Row 3 - moves left (slower)
  [
    "Краткосрочно отдаване под наем през Airbnb и Booking",
    "Лечебни заведения за извънболнична помощ",
    "Търговия с финансови инструменти – акции, облигации, криптовалути, деривати и други видове инвестиции",
  ],
];

// Expertise items for the Founder subtitle rotator
const founderExpertise = [
  "Данъчни консултации",
  "Бизнес анализ",
  "Финансово планиране",
  "Обучения",
  "Публикации",
];

const globalTeamMembers = [
  {
    name: "Кристина Тодорова",
    role: "Ръководител Счетоводен отдел",
    education: "Бакалавър по счетоводство",
    image: "/firm-logo/team/Krisi.png",
    bio: "Кристина Тодорова е завършила бакалавър по Счетоводство в УНСС и в момента следва магистратура в Стопанска академия Димитър А. Ценов - Свищов. Има над 2 години опит като оперативен счетоводител, а от една година ръководи счетоводния отдел на Такиев Финанс. Интересите ѝ са в областта на счетоводството, данъчното планиране и оптимизацията на счетоводните процеси.",
    isLeader: true,
  },
  {
    name: "Теодора Кръстева",
    role: "Оперативен счетоводител",
    education: "Студент в УНСС, специалност Счетоводство",
    image: "/firm-logo/team/Tedi.jpg",
    bio: "Теодора Кръстева е студент в УНСС, специалност Счетоводство. Завършила е Националната търговско-банкова гимназия, специалност Банково дело. Има интереси в различни области като икономика и технологии.",
    isLeader: false,
  },
  {
    name: "Роса Пантева",
    role: "Оперативен счетоводител",
    education: "Студент в УНСС, специалност Счетоводство",
    image: "/firm-logo/team/Rosi.png",
    bio: "Роса Пантева е студент в УНСС, специалност Счетоводство. Завършила е ЕГ Акад. Л. Стоянов в гр. Благоевград. Има интереси към света на финансите и притежава мотивация за професионално развитие.",
    isLeader: false,
  },
];

const values = [
  {
    image: "/firm-logo/our-values/nadejdnost.png",
    title: "Надеждност",
    description: "Гарантираме сигурност и точност във всяка операция. Вашият бизнес заслужава партньор, на когото може да разчита безусловно.",
  },
  {
    image: "/firm-logo/our-values/rastej.png",
    title: "Растеж",
    description: "Помагаме на бизнеса ви да се развива устойчиво. Нашата цел е вашият успех и дългосрочно финансово здраве.",
  },
  {
    image: "/firm-logo/our-values/ekspertiza.png",
    title: "Експертиза",
    description: "Дълбочинни познания и доказан практически опит. Професионализъм, изграден през годините работа с разнообразни клиенти.",
  },
  {
    image: "/firm-logo/our-values/partniorstvo.png",
    title: "Партньорство",
    description: "Дългосрочни взаимоотношения, базирани на доверие. Ние не сме просто счетоводители – ние сме вашият бизнес партньор.",
  },
];

// Shared animation config
const sectionReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { type: "spring" as const, stiffness: 200, damping: 30, mass: 1 },
};


// Values Section — Tab-based interactive design with auto-rotation + progress bar
function ValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  return (
    <div
      className="max-w-6xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        {/* Left — Value tabs */}
        <div className="space-y-1 order-2 lg:order-1">
          {values.map((value, index) => (
            <button
              key={value.title}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`values-panel-${index}`}
              onClick={() => { setActiveIndex(index); setIsPaused(true); }}
              className={`w-full text-left p-4 sm:p-5 transition-all duration-500 ${
                index === activeIndex
                  ? "bg-white/[0.05]"
                  : "hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500 ${
                    index === activeIndex ? "text-primary" : "text-white/15"
                  }`}
                >
                  0{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-500 ${
                      index === activeIndex ? "text-white" : "text-white/40"
                    }`}
                  >
                    {value.title}
                  </h3>
                  <AnimatePresence mode="wait">
                    {index === activeIndex && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-white/60 text-sm leading-relaxed overflow-hidden"
                      >
                        {value.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {/* Progress bar */}
                  <div className="relative h-[2px] bg-white/[0.06] mt-3 overflow-hidden">
                    {index === activeIndex && (
                      <div
                        className="absolute inset-y-0 left-0 bg-primary"
                        style={{
                          animation: "progress-fill 5s linear forwards",
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                        key={activeIndex}
                      />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right — Active value image */}
        <div id={`values-panel-${activeIndex}`} role="tabpanel" className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={values[activeIndex].image}
                alt={values[activeIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/10 block mb-1"
                >
                  0{activeIndex + 1}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                >
                  {values[activeIndex].title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Infinite Scroll Row Component with CSS animation
function InfiniteScrollRow({
  items,
  direction = "left",
  duration = 60
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "100px" }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div ref={rowRef} className="group/row relative overflow-hidden py-1">
      <div
        className={`flex gap-3 sm:gap-4 w-max ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        } group-hover/row:[animation-play-state:paused]`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        {duplicatedItems.map((sector, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 lg:gap-3 bg-white/[0.04] border border-white/[0.08] px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.07]"
          >
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-primary" />
            </div>
            <span className="text-white/90 text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap">
              {sector}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Grid Card Component for business sectors — clean flat card
function SectorGridCard({ sector, index }: { sector: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-white/[0.04] border border-white/[0.08] transition-all duration-500 ease-out group-hover:bg-white/[0.07] group-hover:border-primary/25">
        <div className="relative h-full flex items-center px-5 sm:px-6 py-4 sm:py-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5 w-5 h-5 bg-primary/10 border border-primary/20 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-primary" />
            </div>
            <span className="text-white/80 text-sm sm:text-base font-medium leading-relaxed transition-colors duration-500 ease-out group-hover:text-white/95">
              {sector}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Business Sectors Section with toggle between carousel and grid
function BusinessSectorsSection() {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const allSectors = businessSectorsRows.flat();

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden bg-gradient-to-b from-[#263d39] to-[#1e332f]">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...sectionReveal}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <SectionTitle
            title="Експертиза в разнообразни сектори"
            subtitle="Богат практически опит в множество области на икономиката"
          />

          <div className="mt-6 sm:mt-8">
            <div className="inline-flex items-center gap-0 border border-white/10">
              <button
                onClick={() => setViewMode("carousel")}
                title="Автоматично превъртане"
                className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 transition-all duration-500 ease-out ${
                  viewMode === "carousel"
                    ? "bg-primary text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                title="Покажи всички"
                className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 transition-all duration-500 ease-out ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "carousel" ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative space-y-3 sm:space-y-4 lg:space-y-5">
              <InfiniteScrollRow items={businessSectorsRows[0]} direction="left" duration={90} />
              <InfiniteScrollRow items={businessSectorsRows[1]} direction="right" duration={100} />
              <InfiniteScrollRow items={businessSectorsRows[2]} direction="left" duration={110} />
            </div>

            <div
              className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-28 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, #263d39 0%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-28 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to left, #1e332f 0%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative container mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto auto-rows-fr">
              {allSectors.map((sector, index) => (
                <SectorGridCard key={sector} sector={sector} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Team Section — Photo cards with 3D flip reveal, leader card bigger
function TeamSection({ teamMembers }: { teamMembers: TeamMemberDisplay[] }) {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const leader = teamMembers.find((m) => m.isLeader);
  const members = teamMembers.filter((m) => !m.isLeader);

  const renderCard = (member: TeamMemberDisplay, isLeaderCard: boolean, index: number) => {
    const isFlipped = flippedCard === member.name;

    return (
      <motion.div
        key={member.name}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring" as const, stiffness: 280, damping: 24, delay: index * 0.15 }}
      >
        <div className={`card-flip-container ${isLeaderCard ? "aspect-[3/4] sm:aspect-[2/3]" : "aspect-[3/4]"}`}>
          <div className={`card-flip-inner ${isFlipped ? "card-flipped" : ""}`}>
            {/* FRONT — Photo card */}
            <div className="card-flip-front rounded-2xl overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes={isLeaderCard
                    ? "(max-width: 640px) 100vw, 448px"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  }
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Leader badge */}
                {member.isLeader && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-md tracking-widest uppercase">
                      Ръководител
                    </span>
                  </div>
                )}

                {/* "Read more" button — top right */}
                <button
                  onClick={() => setFlippedCard(member.name)}
                  className="absolute top-4 right-4 bg-black/30 border border-white/20 rounded-md text-white/80 text-[10px] sm:text-xs font-medium px-3 py-1.5 tracking-wide uppercase hover:bg-white/10 transition-colors duration-300"
                >
                  Прочети повече
                </button>

                {/* Name + role at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3
                    className={`font-bold text-white mb-1 tracking-tight ${isLeaderCard ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
                  >
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
              </div>
            </div>

            {/* BACK — Bio card */}
            <div className="card-flip-back rounded-2xl overflow-hidden">
              <div className="relative w-full h-full bg-[#1a2b28] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col overflow-y-auto">
                {/* Accent line */}
                <div className="w-10 h-[2px] bg-primary mb-4" />

                <h3
                  className={`font-bold text-white mb-1 tracking-tight ${isLeaderCard ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
                >
                  {member.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-1">{member.role}</p>
                <p className="text-white/40 text-xs sm:text-sm mb-4">{member.education}</p>

                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  {member.bio}
                </p>

                {/* "Back" button */}
                <button
                  onClick={() => setFlippedCard(null)}
                  className="mt-4 self-start bg-transparent border border-white/20 rounded-md text-white/80 text-[10px] sm:text-xs font-medium px-3 py-1.5 tracking-wide uppercase hover:bg-white/10 transition-colors duration-300"
                >
                  Обратно
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#243b37] to-[#2a413d] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...sectionReveal}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <SectionTitle
            title="Нашият екип"
            subtitle="Професионалисти с богат опит и страст към счетоводството"
          />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
          {/* Leader — centered, bigger card */}
          {leader && (
            <div className="sm:max-w-md mx-auto">
              {renderCard(leader, true, 0)}
            </div>
          )}

          {/* Members — side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {members.map((member, index) => renderCard(member, false, index + 1))}
          </div>
        </div>
      </div>
    </section>
  );
}

// TikTok SVG icon used in social links
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

// Social link data
const socialLinks = [
  { href: "https://www.facebook.com/n.takiev", label: "Facebook", icon: Facebook, bg: "bg-[#1877F2]" },
  { href: "https://www.linkedin.com/company/takiev-finance/", label: "LinkedIn", icon: Linkedin, bg: "bg-[#0A66C2]" },
  { href: "https://www.youtube.com/@nikolaytakiev6221", label: "YouTube", icon: Youtube, bg: "bg-[#FF0000]" },
  { href: "https://www.tiktok.com/@n.takiev", label: "TikTok", icon: TikTokIcon, bg: "bg-black" },
];

export function AboutPageClient({ teamMembers }: { teamMembers?: TeamMemberDisplay[] }) {
  const displayMembers = teamMembers && teamMembers.length > 0 ? teamMembers : globalTeamMembers;

  // Parallax hero
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  // Spacer 180vh → content enters at 80vh scroll, banner fully revealed by ~62vh
  // This guarantees ~18vh of banner alone before content appears
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const titleOpacity = useTransform(scrollYProgress, [0.03, 0.15], [1, 0]);
  // Curtains complete by ~62vh, content enters at ~80vh — clear gap
  const overlayTopH = useTransform(scrollYProgress, [0.05, 0.33], ["50%", "0%"]);
  const overlayBottomH = useTransform(scrollYProgress, [0.07, 0.35], ["50%", "0%"]);
  // Fixed hero fades out once content has scrolled over it — prevents banner showing behind all sections
  const heroOpacity = useTransform(scrollYProgress, [0.52, 0.62], [1, 0]);

  return (
    <div className="relative">
      {/* ===== HERO — Fixed banner, title shrinks to reveal it ===== */}

      {/* Scroll spacer — controls how long the hero stays */}
      <div ref={heroContainerRef} className="relative h-[180vh]" />

      {/* Fixed hero — stays behind everything, fades out once content covers it */}
      <motion.div className="fixed inset-x-0 top-0 h-screen overflow-hidden" style={{ zIndex: 0, opacity: heroOpacity }}>
        {/* Banner — always present, background layer */}
        <div className="absolute inset-0">
          <Image
            src="/firm-logo/banners/banner-for-us.png"
            alt="Takiev Finance Team"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Split-curtain overlay — gradient edges for smooth blend */}
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top"
          style={{
            height: overlayTopH,
            background: "linear-gradient(to bottom, #40514E 55%, rgba(64,81,78,0.6) 82%, rgba(64,81,78,0) 100%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 origin-bottom"
          style={{
            height: overlayBottomH,
            background: "linear-gradient(to top, #40514E 55%, rgba(64,81,78,0.6) 82%, rgba(64,81,78,0) 100%)",
          }}
        />

        {/* Title layer — entrance animation on load, shrinks and fades on scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: titleOpacity, scale: titleScale }}
        >
          {/* Text content — centered */}
          <div className="flex flex-col items-center">
            {/* "От 2021 година" badge — appears first */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 280, damping: 24, delay: 0.2 }}
              className="inline-block border border-white/20 text-white px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wider uppercase mb-6 sm:mb-8"
            >
              От 2021 година
            </motion.div>

            {/* Title — appears second */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 30, mass: 1, delay: 0.5 }}
              className="text-fluid-hero font-bold text-white tracking-tight leading-[1.05] text-center"
            >
              За нас
            </motion.h1>

            {/* Subtitle — appears third */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 30, mass: 1, delay: 1.0 }}
              className="mt-4 sm:mt-6 text-white/50 text-sm sm:text-base md:text-lg max-w-md text-center"
            >
              Професионални счетоводни услуги и данъчни консултации
            </motion.p>
          </div>

          {/* Arrow — far right, appears last, from center moving down */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1.5 }}
            className="absolute right-6 sm:right-10 lg:right-16 xl:right-24 top-[44%]"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-px h-10 sm:h-14 lg:h-20 bg-gradient-to-b from-transparent via-white/20 to-white/50" />
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ===== PAGE CONTENT — scrolls over the fixed hero ===== */}
      <div className="relative z-10">

      {/* Subtitle section */}
      <section className="relative bg-[#40514E] pt-16 sm:pt-24 lg:pt-40 pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...sectionReveal}
            className="text-center max-w-4xl mx-auto"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
            >
              Изграждаме{" "}
              <span className="text-primary">финансово бъдеще</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
              Такиев Финанс предлага професионални счетоводни услуги и данъчни консултации
              за различни бизнеси и физически лица. В нашата практика обслужваме широка гама
              от клиенти, които успешно изграждат своя бизнес в различни сектори на икономиката.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SOCIAL LINKS — rounded coin-flip buttons ===== */}
      <section className="relative py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-[#40514E] to-[#344541]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...sectionReveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <p className="text-white/60 text-sm sm:text-base text-center">
              Последвайте ни за полезни съвети и актуални новини
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-flip relative w-10 h-10 sm:w-11 sm:h-11 block"
                  >
                    <div className="social-flip-inner relative w-full h-full">
                      <div className="social-flip-front border border-white/10 text-white/70">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className={`social-flip-back ${social.bg} text-white`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== VALUES — Tab-based interactive design ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#344541] to-[#2d3d3a] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...sectionReveal}
            className="mb-10 sm:mb-12 lg:mb-14"
          >
            <SectionTitle
              title="Нашите ценности"
              subtitle="Принципите, които направляват всяко наше действие"
            />
          </motion.div>

          <ValuesSection />
        </div>
      </section>

      {/* ===== FOUNDER SECTION ===== */}
      <section className="relative bg-gradient-to-b from-[#2d3d3a] to-[#1a2b28] overflow-hidden">
        {/* Photo — absolute, full section height (desktop only) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-[38%] h-full group/photo">
          <div className="relative w-full h-full">
            <Image
              src="/firm-logo/Nikolay-Takiev–no-bgd.png"
              alt="Николай Такиев - Основател и Управител"
              fill
              className="object-contain object-bottom transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
              sizes="38vw"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-28">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 30, mass: 1 }}
            className="mb-8 sm:mb-12 lg:mb-16 lg:ml-[40%]"
          >
            <SectionTitle
              title="Основател и Управител"
              subtitle="Водещ експерт в данъчното консултиране и счетоводството"
              center={false}
            />
          </motion.div>

          {/* Mobile photo */}
          <div className="lg:hidden relative min-h-[380px] sm:min-h-[440px] mb-6 sm:mb-8 group/photo">
            <Image
              src="/firm-logo/Nikolay-Takiev–no-bgd.png"
              alt="Николай Такиев - Основател и Управител"
              fill
              className="object-contain object-bottom"
              sizes="100vw"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 30, mass: 1 }}
            className="lg:ml-[40%] lg:mt-12 xl:mt-16"
          >
            <div>
              {/* Name + title */}
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight"
              >
                Николай Такиев
              </h3>
              <p className="text-primary font-semibold text-sm sm:text-base lg:text-lg mb-5 sm:mb-6 lg:mb-8">
                Магистър по счетоводство, финанси и бизнес анализ
              </p>

              {/* Bio text */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                <p className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed">
                  <span className="text-white font-semibold">Николай Такиев</span> е с <span className="text-white font-medium">богат професионален опит</span> в областта на <span className="text-primary font-semibold">данъчното консултиране</span> и <span className="text-primary font-semibold">счетоводството</span>. Той е автор на редица <span className="text-white font-medium">книги, статии и публикации</span>, които подпомагат по-доброто познаване на <span className="text-white/90 font-medium">данъчното законодателство</span> от предприемачите.
                </p>
                <p className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed">
                  От началото на <span className="text-white font-medium">2020 година</span> успешно развива дейност като <span className="text-primary font-semibold">лектор</span> на множество професионални <span className="text-white font-medium">обучения и семинари</span>, а през <span className="text-white font-medium">2021 година</span> става <span className="text-primary font-semibold">основател</span> на цялостната професионална програма за обучение по данъци и счетоводство към счетоводната академия на <span className="text-primary font-semibold">Finance Academy</span>.
                </p>
                <p className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Николай е активен външен <span className="text-primary font-semibold">данъчен консултант</span> на една от водещите <span className="text-white font-medium">одиторски компании</span> в страната. Той е автор и на редица статии за данъци и счетоводство в професионалния блог на единствената платформа за онлайн счетоводен софтуер в България –{" "}
                  <a
                    href="https://nula.bg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1 transition-colors duration-300"
                  >
                    NulaBG
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
                <p className="text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Компанията работи в <span className="text-white font-medium">партньорски взаимоотношения</span> с високо квалифицирани <span className="text-primary font-semibold">юристи</span> в областта на <span className="text-white/90 font-medium">гражданското, търговското и трудовото право</span>.
                </p>
              </div>

              {/* Expertise — square tags */}
              <div className="mt-6 sm:mt-8 lg:mt-10 pt-5 sm:pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {founderExpertise.map((item) => (
                    <span
                      key={item}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-primary border border-primary/20 bg-primary/[0.06] tracking-wide uppercase"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TOP 100 AWARD SECTION ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#1a2b28] via-[#1e332f] to-[#243b37] overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              {...sectionReveal}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              {/* Award Badges — square */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                {["Top 100 Bulgaria", "2025", "Finance & Accounting", "Award Winner"].map((badge, index) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/[0.04] border border-white/10 text-[10px] sm:text-xs font-medium text-white/80 tracking-wider uppercase"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>

              {/* Main Title */}
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
              >
                Николай Такиев –{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400">
                  BULGARIA&apos;S TOP 100 TALENTS
                </span>
                <span className="block sm:inline sm:ml-2 text-white/90">
                  in Finance & Accounting 2025
                </span>
              </h2>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
              {/* Certificate Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 30, mass: 1 }}
                className="order-2 lg:order-1"
              >
                <div className="relative">
                  <div className="relative border border-white/10 p-3 sm:p-4 lg:p-5 transition-all duration-500 ease-out hover:border-white/20">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src="/firm-logo/awards/certificate-carrer-show.jpg"
                        alt="Bulgaria's Top 100 Talents - Finance & Accounting 2025 Certificate"
                        fill
                        className="object-contain bg-white"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 30, mass: 1 }}
                className="order-1 lg:order-2"
              >
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
                    През 2025 г. Николай Такиев е официално отличен в националния индекс{" "}
                    <span className="text-white font-semibold">Bulgaria&apos;s Top 100 Talents</span>{" "}
                    на Career Show – инициатива, която ежегодно награждава най-изявените професионалисти в България.
                  </p>

                  <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
                    Той е избран в категория{" "}
                    <span className="text-amber-400 font-semibold">Finance & Accounting</span>{" "}
                    като признание за висок професионализъм, експертиза в областта на счетоводството и данъчното консултиране, както и значим принос към развитието на бизнеса.
                  </p>

                  {/* Achievement highlights */}
                  <div className="pt-4 sm:pt-6 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="text-center sm:text-left">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400 mb-1">Top 100</div>
                        <div className="text-xs sm:text-sm text-white/50">Най-изявени професионалисти</div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">2025</div>
                        <div className="text-xs sm:text-sm text-white/50">Career Show България</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <TeamSection teamMembers={displayMembers} />

      {/* ===== PARTNERS SECTION ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#2a413d] to-[#263d39] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...sectionReveal}
            className="mb-8 sm:mb-10 lg:mb-16"
          >
            <SectionTitle
              title="Нашите партньори"
              subtitle="Работим съвместно с водещи организации в сектора"
            />
          </motion.div>

          <PartnersCarousel />
        </div>
      </section>

      {/* ===== BUSINESS SECTORS ===== */}
      <BusinessSectorsSection />

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-[#1e332f] to-[#40514E] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...sectionReveal}
          >
            <SectionTitle
              title="Готови сте да започнете?"
              subtitle="Свържете се с нас днес и нека заедно изградим финансовото бъдеще на вашия бизнес."
            />
            <div className="mt-8 sm:mt-10">
              <PremiumCTA href="/kontakti">
                Свържете се с нас
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </PremiumCTA>
            </div>
          </motion.div>
        </div>
      </section>

      </div>{/* end content wrapper */}
    </div>
  );
}
