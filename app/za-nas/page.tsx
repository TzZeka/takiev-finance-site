"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { PartnersCarousel } from "@/components/about/PartnersCarousel";

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
    image: "/firm-logo/team/Krisi.jpg",
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
    image: "/firm-logo/team/Rosi.jpg",
    bio: "Роса Пантева е студент в УНСС, специалност Счетоводство. Завършила е ЕГ Акад. Л. Стоянов в гр. Благоевград. Има интереси към света на финансите и притежава мотивация за професионално развитие.",
    isLeader: false,
  },
];

const values = [
  {
    icon: Shield,
    title: "Надеждност",
    description: "Гарантираме сигурност и точност във всяка операция",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Растеж",
    description: "Помагаме на бизнеса ви да се развива устойчиво",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Award,
    title: "Експертиза",
    description: "Дълбочинни познания и доказан практически опит",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Партньорство",
    description: "Дългосрочни взаимоотношения, базирани на доверие",
    color: "from-purple-500 to-pink-500",
  },
];

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
        className={`flex gap-4 lg:gap-5 w-max ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        } group-hover/row:[animation-play-state:paused]`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {duplicatedItems.map((sector, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center gap-3 sm:gap-4 bg-slate-800/70 backdrop-blur-sm border border-white/10 px-5 sm:px-6 lg:px-8 py-4 sm:py-5 rounded-2xl transition-all duration-500 ease-out hover:border-primary/40 hover:bg-slate-800 hover:scale-[1.02] shadow-lg shadow-black/10"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary/20 to-teal-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-primary" />
            </div>
            <span className="text-white/90 text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
              {sector}
            </span>
          </div>
        ))}
      </div>
    </div>
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
              className="backdrop-blur-md bg-slate-900/40 rounded-xl p-3 sm:p-4 border border-white/10"
            >
              <motion.div layout="position">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-0.5 transition-colors duration-500 ease-out group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-[10px] sm:text-xs mb-1">{member.role}</p>
                <p className="text-white/50 text-[10px] sm:text-xs mb-2">{member.education}</p>
              </motion.div>

              {/* Bio with smooth expand animation */}
              <motion.div
                layout
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : "2.5em",
                  opacity: 1
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>

              {/* Read more button */}
              <motion.button
                layout="position"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 mt-2 text-primary text-[10px] sm:text-xs font-medium hover:text-primary/80 transition-colors duration-300"
              >
                {isExpanded ? "Скрий" : "Прочети повече"}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-3 h-3" />
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
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
            Нашият екип
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Професионалисти с богат опит и страст към счетоводството
          </p>
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
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-primary text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full">
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
                        className="backdrop-blur-md bg-slate-900/50 rounded-xl p-4 sm:p-5 border border-white/10"
                      >
                        <motion.div layout="position">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 transition-colors duration-500 ease-out group-hover:text-primary">
                            {leader.name}
                          </h3>
                          <p className="text-primary font-medium text-xs sm:text-sm mb-1.5">{leader.role}</p>
                          <p className="text-white/50 text-[10px] sm:text-xs mb-2">{leader.education}</p>
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
                          <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                            {leader.bio}
                          </p>
                        </motion.div>

                        <motion.button
                          layout="position"
                          onClick={() => setIsLeaderExpanded(!isLeaderExpanded)}
                          className="flex items-center gap-1 mt-2 text-primary text-xs sm:text-sm font-medium hover:text-primary/80 transition-colors duration-300"
                        >
                          {isLeaderExpanded ? "Скрий" : "Прочети повече"}
                          <motion.span
                            animate={{ rotate: isLeaderExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
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
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
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

      {/* Values Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Нашите ценности
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 max-w-2xl mx-auto px-4">
              Принципите, които направляват всяко наше действие
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="group relative bg-slate-800/50 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 xl:p-8 h-full transition-all duration-500 ease-out hover:border-white/10 hover:-translate-y-1">
                    <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${value.color} rounded-lg sm:rounded-xl mb-3 sm:mb-4 lg:mb-6 transition-transform duration-500 ease-out group-hover:scale-110`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 lg:mb-3 transition-colors duration-500 ease-out group-hover:text-primary">{value.title}</h3>
                    <p className="text-xs sm:text-sm lg:text-base text-white/50">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              Основател и Управител
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/60 px-4">
              Водещ експерт в данъчното консултиране и счетоводството
            </p>
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
                    <div className="bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-4">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">Николай Такиев</h3>
                      <p className="text-primary text-[10px] sm:text-xs lg:text-sm">Магистър по счетоводство, финанси и бизнес анализ</p>
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
              <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed">
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
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3 mt-4 sm:mt-6 lg:mt-8">
                {["Данъчни консултации", "Бизнес анализ", "Финансово планиране", "Обучения", "Публикации"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 sm:gap-1.5 lg:gap-2 bg-slate-800/50 border border-white/5 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm"
                  >
                    <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-primary" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Професионална квалификация
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              Сертификат
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-xl mx-auto px-4">
              Удостоверение за професионална компетентност в областта на счетоводството и данъците
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl lg:max-w-3xl mx-auto"
          >
            <div className="relative bg-slate-800/30 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
              {/* PDF Embed */}
              <div className="relative w-full aspect-[3/4] bg-white rounded-lg sm:rounded-xl overflow-hidden">
                <object
                  data="/firm-logo/awards/Certificate.pdf"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-6 sm:p-8 text-center">
                    <Award className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-3 sm:mb-4" />
                    <p className="text-slate-600 text-sm sm:text-base mb-3 sm:mb-4">
                      Вашият браузър не поддържа вградено показване на PDF.
                    </p>
                    <a
                      href="/firm-logo/awards/Certificate.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 hover:bg-primary/90"
                    >
                      Отвори сертификата
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </object>
              </div>

              {/* Download link */}
              <div className="mt-3 sm:mt-4 lg:mt-6 text-center">
                <a
                  href="/firm-logo/awards/Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-xs sm:text-sm font-medium transition-colors duration-300"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Отвори в нов прозорец
                </a>
              </div>
            </div>
          </motion.div>
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
            className="text-center mb-8 sm:mb-10 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Нашите партньори
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 max-w-2xl mx-auto px-4">
              Работим съвместно с водещи организации в сектора
            </p>
          </motion.div>

          <PartnersCarousel />
        </div>
      </section>

      {/* Business Sectors - Carousel */}
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
            className="text-center mb-10 sm:mb-12 lg:mb-14"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Експертиза в разнообразни сектори
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 px-4">
              Богат практически опит в множество области на икономиката
            </p>
          </motion.div>
        </div>

        {/* Carousel rows - full width */}
        <div className="relative space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Row 1 - moves left, slowest */}
          <InfiniteScrollRow items={businessSectorsRows[0]} direction="left" duration={60} />

          {/* Row 2 - moves right, medium */}
          <InfiniteScrollRow items={businessSectorsRows[1]} direction="right" duration={70} />

          {/* Row 3 - moves left, slow */}
          <InfiniteScrollRow items={businessSectorsRows[2]} direction="left" duration={80} />
        </div>

        {/* Fade edges for smoother look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">
              Готови сте да започнете?
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 max-w-2xl mx-auto mb-5 sm:mb-6 lg:mb-8 px-4">
              Свържете се с нас днес и нека заедно изградим финансовото бъдеще на вашия бизнес.
            </p>
            <Link
              href="/kontakti"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-teal-500 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full font-semibold text-xs sm:text-sm lg:text-lg transition-all duration-500 ease-out hover:scale-105"
            >
              Свържете се с нас
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
