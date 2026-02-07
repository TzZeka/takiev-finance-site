"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Award,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Play,
  Facebook,
  Linkedin,
  Youtube
} from "lucide-react";
import { PartnersCarousel } from "@/components/about/PartnersCarousel";

// Section Title Component with elegant styling
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
      {/* Decorative top element */}
      <div className={`flex items-center gap-3 mb-4 sm:mb-5 ${center ? "justify-center" : ""}`}>
        <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-primary/50" />
        <div className="w-2 h-2 rotate-45 border border-primary/50 bg-primary/10" />
        <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-primary/50" />
      </div>

      {/* Main title with optional accent */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
        {accent ? (
          <>
            {title.split(accent)[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-primary">
              {accent}
            </span>
            {title.split(accent)[1]}
          </>
        ) : (
          <span className="relative">
            {title}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 ${light ? "text-white/70" : "text-white/60"}`}>
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

// Values Carousel Component
function ValuesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = values.length - 1;
      if (nextIndex >= values.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative max-w-6xl mx-auto group/carousel"
      onMouseEnter={() => { setIsPaused(true); setIsHovered(true); }}
      onMouseLeave={() => { setIsPaused(false); setIsHovered(false); }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-800/30 border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
          {/* Image Side */}
          <div className="relative h-[250px] sm:h-[300px] lg:h-auto overflow-hidden bg-slate-900/50">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0"
              >
                <Image
                  src={values[currentIndex].image}
                  alt={values[currentIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Subtle overlay for better text readability on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
              </motion.div>
            </AnimatePresence>

            {/* Slide Counter - Mobile */}
            <div className="absolute bottom-4 left-4 lg:hidden bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/80 font-medium">
              {currentIndex + 1} / {values.length}
            </div>
          </div>

          {/* Content Side */}
          <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Value Number */}
                <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/20">
                    0{currentIndex + 1}
                  </span>
                  <div className="h-px flex-1 max-w-[60px] bg-primary/30" />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">
                  {values[currentIndex].title}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed">
                  {values[currentIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots - Desktop */}
            <div className="hidden lg:flex items-center gap-3 mt-8 xl:mt-10">
              {values.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-2 rounded-full transition-all duration-500 ease-out ${
                    index === currentIndex
                      ? "w-10 bg-primary"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Show on hover with transparency */}
        <button
          onClick={() => paginate(-1)}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white hover:bg-slate-800/80 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white hover:bg-slate-800/80 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Navigation Dots - Mobile/Tablet */}
      <div className="flex lg:hidden items-center justify-center gap-2 mt-4 sm:mt-6">
        {values.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-2 rounded-full transition-all duration-500 ease-out ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
  // Duplicate items multiple times for seamless loop
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className="group/row relative overflow-hidden py-1">
      <div
        className={`flex gap-3 sm:gap-4 w-max ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        } group-hover/row:[animation-play-state:paused]`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {duplicatedItems.map((sector, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 lg:gap-3 bg-slate-800/70 backdrop-blur-sm border border-white/10 px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-500 ease-out hover:border-primary/40 hover:bg-slate-800 hover:scale-[1.02] shadow-lg shadow-black/10"
          >
            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary/20 to-teal-500/20 rounded-lg flex items-center justify-center">
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

// Grid Card Component for business sectors with elegant clipped corners
function SectorGridCard({ sector, index }: { sector: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
      className="group relative h-full"
    >
      {/* Card with clipped corners */}
      <div
        className="relative h-full bg-slate-800/80 backdrop-blur-sm transition-all duration-700 ease-out group-hover:bg-slate-800"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}
      >
        {/* Border layer */}
        <div
          className="absolute inset-0 border border-white/[0.08] transition-all duration-700 ease-out group-hover:border-primary/25"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        />

        {/* Diagonal lines decoration - right side */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-[0.06] transition-opacity duration-700 group-hover:opacity-[0.12]">
          <div className="w-8 h-px bg-white rotate-[-25deg] origin-right" />
          <div className="w-6 h-px bg-white rotate-[-25deg] origin-right" />
          <div className="w-10 h-px bg-white rotate-[-25deg] origin-right" />
          <div className="w-5 h-px bg-white rotate-[-25deg] origin-right" />
          <div className="w-7 h-px bg-white rotate-[-25deg] origin-right" />
        </div>

        {/* Top-right corner accent */}
        <div
          className="absolute top-0 right-0 w-4 h-4 border-b border-white/[0.08] transition-all duration-700 ease-out group-hover:border-primary/40"
          style={{ transform: 'rotate(45deg) translate(30%, -70%)' }}
        />

        {/* Bottom-left corner accent */}
        <div
          className="absolute bottom-0 left-0 w-4 h-4 border-t border-white/[0.08] transition-all duration-700 ease-out group-hover:border-primary/40"
          style={{ transform: 'rotate(45deg) translate(-30%, 70%)' }}
        />

        {/* Content */}
        <div className="relative h-full flex items-center px-5 sm:px-6 py-4 sm:py-5">
          <div className="flex items-start gap-3">
            {/* Animated checkbox */}
            <div className="flex-shrink-0 mt-0.5 relative w-5 h-5">
              {/* Empty circle */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-500 ease-out group-hover:border-primary" />

              {/* Checkmark SVG with draw animation */}
              <svg
                className="absolute -inset-0.5 w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                {/* Checkmark path - left part inside circle, right part extends outside */}
                <path
                  d="M7 12 L10.5 15.5 L18 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary checkmark-path"
                />
              </svg>
            </div>

            <span className="text-white/80 text-sm sm:text-base font-medium leading-relaxed transition-colors duration-700 ease-out group-hover:text-white/95 pr-12">
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
    <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <SectionTitle
            title="Експертиза в разнообразни сектори"
            subtitle="Богат практически опит в множество области на икономиката"
          />

          <div className="mt-6 sm:mt-8">
          {/* Toggle Button */}
          <div className="inline-flex items-center gap-1 p-1.5 bg-slate-800/70 border border-white/10 rounded-full">
            <button
              onClick={() => setViewMode("carousel")}
              title="Автоматично превъртане"
              className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-500 ease-out ${
                viewMode === "carousel"
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                Автоматично превъртане
              </span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Покажи всички"
              className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-500 ease-out ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                Покажи всички
              </span>
            </button>
          </div>
          </div>
        </motion.div>
      </div>

      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        {viewMode === "carousel" ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Carousel rows - full width */}
            <div className="relative space-y-3 sm:space-y-4 lg:space-y-5">
              {/* Row 1 - moves left, slowest */}
              <InfiniteScrollRow items={businessSectorsRows[0]} direction="left" duration={90} />

              {/* Row 2 - moves right, medium */}
              <InfiniteScrollRow items={businessSectorsRows[1]} direction="right" duration={100} />

              {/* Row 3 - moves left, slow */}
              <InfiniteScrollRow items={businessSectorsRows[2]} direction="left" duration={110} />
            </div>

            {/* Fade edges for smoother look - with vertical fade at top/bottom */}
            <div
              className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-28 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, rgb(2 6 23) 0%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-28 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to left, rgb(2 6 23) 0%, transparent 100%)',
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

// Team Member Card Component for non-leaders with expandable bio
function TeamMemberCard({ member, index }: { member: typeof globalTeamMembers[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden h-full border border-white/5 transition-all duration-500 ease-out hover:border-white/10">
        {/* Full height image with text overlay */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5]">
          {/* Image */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:-translate-y-1">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            />
          </div>

          {/* Gradient overlay - clear on top, blurred on bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Text Content - positioned at bottom, over the image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <motion.div
              layout
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-md bg-slate-900/40 rounded-xl p-3.5 sm:p-4 border border-white/10"
            >
              <motion.div layout="position">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1 transition-colors duration-500 ease-out group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-xs sm:text-sm mb-1 sm:mb-1.5">{member.role}</p>
                <p className="text-white/50 text-xs sm:text-sm mb-2 sm:mb-2.5">{member.education}</p>
              </motion.div>

              {/* Bio with smooth expand animation */}
              <motion.div
                layout
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : "3em",
                  opacity: 1
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>

              {/* Read more button */}
              <motion.button
                layout="position"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 mt-2.5 text-primary text-xs sm:text-sm font-medium hover:text-primary/80 transition-colors duration-300"
              >
                {isExpanded ? "Скрий" : "Прочети повече"}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-teal-500/50 to-cyan-500/50" />
      </div>
    </motion.div>
  );
}

// Team Section Component
function TeamSection({ teamMembers }: { teamMembers: typeof globalTeamMembers }) {
  const [isLeaderExpanded, setIsLeaderExpanded] = useState(false);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <SectionTitle
            title="Нашият екип"
            subtitle="Професионалисти с богат опит и страст към счетоводството"
          />
        </motion.div>

        {/* Hierarchical Layout */}
        <div className="max-w-5xl mx-auto">
          {/* Leader - Top Center, Larger */}
          {teamMembers.filter(m => m.isLeader).map((leader) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 sm:mb-8 lg:mb-12"
            >
              <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-primary/20">
                  {/* Leader Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-primary text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    Ръководител
                  </div>

                  {/* Full height image with text overlay */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6]">
                    {/* Image */}
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:-translate-y-1">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 512px, 576px"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6">
                      <motion.div
                        layout
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="backdrop-blur-md bg-slate-900/50 rounded-xl p-4 sm:p-5 lg:p-6 border border-white/10"
                      >
                        <motion.div layout="position">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-1.5 transition-colors duration-500 ease-out group-hover:text-primary">
                            {leader.name}
                          </h3>
                          <p className="text-primary font-medium text-sm sm:text-base mb-1.5 sm:mb-2">{leader.role}</p>
                          <p className="text-white/50 text-xs sm:text-sm mb-2 sm:mb-3">{leader.education}</p>
                        </motion.div>

                        {/* Bio with smooth expand animation */}
                        <motion.div
                          layout
                          initial={false}
                          animate={{
                            height: isLeaderExpanded ? "auto" : "3.5em",
                            opacity: 1
                          }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                            {leader.bio}
                          </p>
                        </motion.div>

                        <motion.button
                          layout="position"
                          onClick={() => setIsLeaderExpanded(!isLeaderExpanded)}
                          className="flex items-center gap-1.5 mt-3 text-primary text-sm sm:text-base font-medium hover:text-primary/80 transition-colors duration-300"
                        >
                          {isLeaderExpanded ? "Скрий" : "Прочети повече"}
                          <motion.span
                            animate={{ rotate: isLeaderExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-teal-500 to-cyan-500" />
                </div>
              </div>

              {/* Hierarchy Connection Lines - Desktop Only */}
              <div className="hidden lg:flex justify-center mt-6 lg:mt-8">
                <div className="flex flex-col items-center">
                  <div className="w-px h-6 lg:h-8 bg-gradient-to-b from-primary/40 to-primary/20" />
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-primary/20 border-2 border-primary/40" />
                  <div className="flex items-start">
                    <div className="w-24 sm:w-32 lg:w-40 h-px bg-gradient-to-r from-transparent to-primary/30" />
                    <div className="w-px h-4 lg:h-6 bg-primary/30" />
                    <div className="w-24 sm:w-32 lg:w-40 h-px bg-gradient-to-l from-transparent to-primary/30" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Team Members - Below Leader */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-2xl lg:max-w-3xl mx-auto">
            {teamMembers.filter(m => !m.isLeader).map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative bg-slate-950">
      {/* Hero Section - Banner Above Title */}
      <section className="relative overflow-hidden">
        {/* Banner Image - Full Width, 2:1 aspect ratio */}
        <div className="relative w-full">
          <div className="relative w-full aspect-[2/1]">
            <Image
              src="/firm-logo/banners/banner-for-us.png"
              alt="Takiev Finance Team"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Subtle bottom fade for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-10 lg:h-16 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>
        </div>

        {/* Title Content Below Banner */}
        <div className="relative bg-gradient-to-b from-slate-950 to-slate-900 py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-block bg-primary text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold mb-4 sm:mb-6">
                От 2021 година
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Изграждаме
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-cyan-400">
                  финансово бъдеще
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto px-4">
                Такиев Финанс предлага професионални счетоводни услуги и данъчни консултации
                за различни бизнеси и физически лица. В нашата практика обслужваме широка гама
                от клиенти, които успешно изграждат своя бизнес в различни сектори на икономиката.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="relative py-6 sm:py-8 lg:py-10 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <p className="text-white/60 text-sm sm:text-base text-center">
              Последвайте ни за полезни съвети и актуални новини
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/n.takiev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 border border-white/10 transition-all duration-300 hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/company/takiev-finance/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 border border-white/10 transition-all duration-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:scale-110"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/@nikolaytakiev6221"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 border border-white/10 transition-all duration-300 hover:bg-[#FF0000] hover:border-[#FF0000] hover:scale-110"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@n.takiev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 border border-white/10 transition-all duration-300 hover:bg-black hover:border-white/20 hover:scale-110"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section - Carousel */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 sm:mb-10 lg:mb-12"
          >
            <SectionTitle
              title="Нашите ценности"
              subtitle="Принципите, които направляват всяко наше действие"
            />
          </motion.div>

          <ValuesCarousel />
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 sm:mb-12 lg:mb-16"
          >
            <SectionTitle
              title="Основател и Управител"
              subtitle="Водещ експерт в данъчното консултиране и счетоводството"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start max-w-6xl mx-auto">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <div className="relative max-w-[280px] sm:max-w-xs mx-auto lg:max-w-none group">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ease-out group-hover:border-primary/30">
                  <Image
                    src="/firm-logo/nikolay-takiev.jpg"
                    alt="Николай Такиев - Основател и Управител"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 100%"
                  />
                  {/* Subtle dark gradient - not colorful */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Name Card */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">Николай Такиев</h3>
                      <p className="text-primary text-xs sm:text-sm lg:text-base">Магистър по счетоводство, финанси и бизнес анализ</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed">
                <p>
                  Николай Такиев е с богат професионален опит в областта на данъчното консултиране
                  и счетоводството. Той е автор на редица книги, статии и публикации, които подпомагат
                  по-доброто познаване на данъчното законодателство от предприемачите.
                </p>
                <p>
                  От началото на 2020 година успешно развива дейност като лектор на множество
                  професионални обучения и семинари, а през 2021 година става основател на
                  цялостната професионална програма за обучение по данъци и счетоводство към
                  счетоводната академия на Finance Academy.
                </p>
                <p>
                  Николай е активен външен данъчен консултант на една от водещите одиторски
                  компании в страната. Той е автор и на редица статии за данъци и счетоводство
                  в професионалния блог на единствената платформа за онлайн счетоводен софтуер
                  в България –{" "}
                  <a
                    href="https://nula.bg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1 transition-colors duration-300"
                  >
                    NulaBG
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
                <p>
                  Компанията работи в партньорски взаимоотношения с високо квалифицирани юристи
                  в областта на гражданското, търговското и трудовото право.
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 lg:gap-3 mt-5 sm:mt-6 lg:mt-8">
                {["Данъчни консултации", "Бизнес анализ", "Финансово планиране", "Обучения", "Публикации"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-slate-800/50 border border-white/5 text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base"
                  >
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top 100 Talents Award Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-slate-900 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-10 sm:mb-12 lg:mb-16"
            >
              {/* Award Badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                {["Top 100 Bulgaria", "2025", "Finance & Accounting", "Award Winner"].map((badge, index) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/80 border border-white/10 rounded-full text-xs sm:text-sm font-medium text-white/80"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>

              {/* Main Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
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
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-2 lg:order-1"
              >
                <div className="relative group">
                  {/* Premium frame */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative bg-slate-800/50 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all duration-500 ease-out group-hover:border-white/20">
                    <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
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
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
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

      {/* Team Section - Hierarchical Structure */}
      <TeamSection teamMembers={globalTeamMembers} />


      {/* Partners Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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

      {/* Business Sectors - Carousel/Grid */}
      <BusinessSectorsSection />


      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionTitle
              title="Готови сте да започнете?"
              subtitle="Свържете се с нас днес и нека заедно изградим финансовото бъдеще на вашия бизнес."
            />
            <div className="mt-6 sm:mt-8">
              <Link
                href="/kontakti"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-teal-500 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full font-semibold text-xs sm:text-sm lg:text-lg transition-all duration-500 ease-out hover:scale-105"
              >
                Свържете се с нас
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
