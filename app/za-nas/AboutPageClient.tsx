"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
    ArrowRight,
    Crown,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Facebook,
    Linkedin,
    Youtube,
} from "lucide-react";
import { PartnersCarousel } from "@/components/about/PartnersCarousel";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface TeamMemberDisplay {
    name: string;
    role: string;
    education: string;
    image: string;
    bio: string;
    isLeader: boolean;
}

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

function SectionTitle({
    title,
    subtitle,
    accent,
    center = true,
    className = "",
    darkText = false,
    titleClass = "",
    subtitleClass = "",
}: {
    title: string;
    subtitle?: string;
    accent?: string;
    center?: boolean;
    className?: string;
    darkText?: boolean;
    titleClass?: string;
    subtitleClass?: string;
}) {
    return (
        <motion.div
            className={`${center ? "text-left md:text-center" : ""} ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
        >
            <div className={`mb-5 sm:mb-6 ${center ? "flex md:justify-center" : ""}`}>
                <motion.div
                    className="w-12 h-[3px] bg-primary rounded-full"
                    variants={{
                        hidden: { scaleX: 0 },
                        visible: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
                    }}
                    style={{ transformOrigin: "left" }}
                />
            </div>

            <motion.h2
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-[1.1] ${darkText ? "text-[#101b1a]" : "text-white"} ${titleClass}`}
                variants={{
                    hidden: { y: 28, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.1 } },
                }}
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
            </motion.h2>

            {subtitle && (
                <motion.p
                    className={`text-sm sm:text-base md:text-lg max-w-2xl ${center ? "mx-auto" : ""} px-4 font-medium ${darkText ? "text-surface" : "text-white/80"} ${subtitleClass}`}
                    variants={{
                        hidden: { y: 16, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.25 } },
                    }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
}

// Parallax Image Wrapper for consistent parallax across the site
function ParallaxImage({ src, alt, className = "", imgClassName = "" }: { src: string, alt: string, className?: string, imgClassName?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !imgRef.current) return;

        // Symmetric parallax to keep image centered and avoid gaps
        gsap.fromTo(imgRef.current,
            { yPercent: -15 },
            {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            }
        );

        // Reveal animation
        gsap.from(containerRef.current, {
            scrollTrigger: { trigger: containerRef.current, start: "top 88%", once: true, invalidateOnRefresh: true },
            clipPath: "inset(10% 10% 10% 10% round 30px)",
            scale: 0.95,
            duration: 1.5,
            ease: "power3.inOut"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`relative overflow-hidden clip-path-container ${className}`}>
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                fill
                className={`object-cover scale-[1.3] ${imgClassName}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
            />
        </div>
    );
}

// ============================================================================
// DATA ARRAYS
// ============================================================================

const founderExpertise = ["Данъчни консултации", "Бизнес анализ", "Финансово планиране", "Обучения", "Публикации"];

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

// ============================================================================
// PAGE SECTIONS
// ============================================================================

// VALUES SECTION — Bento grid + scattered images
const scatterMap = [
    { rotate: -11, x: -16, y: -24 },
    { rotate:   7, x:  20, y: -10 },
    { rotate:  -5, x: -22, y:  18 },
    { rotate:  10, x:  14, y:  26 },
];

function ValuesSection() {
    return (
        <div className="max-w-6xl mx-auto mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-14 items-center">

                {/* ── LEFT: scattered image grid ── */}
                <motion.div
                    className="grid grid-cols-2 gap-5 p-10 cursor-default"
                    initial="scattered"
                    whileHover="aligned"
                >
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                scattered: {
                                    rotate: scatterMap[i].rotate,
                                    x: scatterMap[i].x,
                                    y: scatterMap[i].y,
                                },
                                aligned: { rotate: 0, x: 0, y: 0 },
                            }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.04 }}
                            className="relative aspect-square rounded-[2rem] overflow-hidden"
                            style={{
                                zIndex: 4 - i,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                            }}
                        >
                            <Image
                                src={value.image}
                                fill
                                alt={value.title}
                                className="object-cover"
                                sizes="(max-width: 1024px) 45vw, 22vw"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── RIGHT: bento text grid ── */}
                <div className="grid grid-cols-2 gap-3">
                    {values.map((value, i) => (
                        <div
                            key={i}
                            className="group/card rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 flex flex-col gap-3 hover:border-white/[0.18] hover:bg-white/[0.07] transition-colors duration-300"
                        >
                            <h3
                                className="text-xl text-white leading-snug"
                                style={{
                                    fontFamily: "'Hubot Sans', sans-serif",
                                    fontVariationSettings: "'wght' 800, 'wdth' 110",
                                    fontWeight: 800,
                                }}
                            >
                                {value.title}
                            </h3>
                            <p
                                className="text-white/75 text-sm"
                                style={{
                                    fontFamily: "'Mona Sans', sans-serif",
                                    fontVariationSettings: "'wght' 400, 'wdth' 100",
                                    fontWeight: 400,
                                    lineHeight: 1.7,
                                    letterSpacing: "0.01em",
                                }}
                            >
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

const bentoVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.08 },
    }),
};

function BusinessSectorsSection() {
    return (
        <div className="relative z-10 w-full mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {/* Row 1 */}
                <motion.div custom={0} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-2 md:col-span-2 relative group bg-white/[0.12] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-auto hover:will-change-transform overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 relative z-10">Електронна търговия</h3>
                    <p className="text-white/80 max-w-md text-base leading-relaxed relative z-10 font-medium">Пълно счетоводно обслужване на онлайн магазини, Amazon, Shopify и дропшипинг бизнеси.</p>
                </motion.div>

                <motion.div custom={1} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-end overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">ИТ Сектор</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">ИТ компании и софтуерни решения.</p>
                </motion.div>

                <motion.div custom={2} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-end overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Криптовалути</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Счетоводство и данъчно облагане.</p>
                </motion.div>

                {/* Row 2 */}
                <motion.div custom={3} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-1 md:col-span-1 relative group bg-primary/10 p-6 sm:p-8 rounded-3xl border border-primary/20 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-primary mb-2 relative z-10">Фрийлансъри</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Цялостно обслужване на свободни професии.</p>
                </motion.div>

                <motion.div custom={4} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-2 md:col-span-2 relative group bg-white/[0.12] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-auto hover:will-change-transform overflow-hidden shadow-2xl flex flex-col justify-center">
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 relative z-10">Строителство и Имоти</h3>
                    <p className="text-white/80 max-w-sm text-base leading-relaxed relative z-10 font-medium">Специфично счетоводно отчитане за инвеститори и строителни фирми.</p>
                </motion.div>

                <motion.div custom={5} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-1 md:col-span-3 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Маркетинг</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Агенции и дигитални услуги.</p>
                </motion.div>

                {/* Row 3 */}
                <motion.div custom={6} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-2 md:col-span-1 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Airbnb & Booking</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Оптимизация за краткосрочни наеми.</p>
                </motion.div>

                <motion.div custom={7} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-1 md:col-span-1 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Медицина</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Лечебни заведения.</p>
                </motion.div>

                <motion.div custom={8} variants={bentoVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="lg:col-span-1 md:col-span-1 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary-rgb),0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Изкуство</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Творчески индустрии.</p>
                </motion.div>

            </div>
        </div>
    );
}

function TeamSection({ teamMembers }: { teamMembers: TeamMemberDisplay[] }) {
    const [activeId, setActiveId] = useState<number | null>(0);

    return (
        <div className="relative z-10 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 h-auto md:h-[650px] px-4 md:px-0">
                {teamMembers.map((member, index) => {
                    const isActive = activeId === index;
                    const flexValue = isActive ? "45%" : "18%";

                    return (
                        <motion.div
                            key={index}
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-[2.5rem] cursor-pointer group will-change-[width,flex] min-h-[450px] md:min-h-0 border border-white/10"
                            style={{
                                flexBasis: flexValue,
                                flexGrow: isActive ? 1 : 0,
                                transition: "flex-basis 0.8s cubic-bezier(0.25, 1, 0.5, 1), flex-grow 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                            }}
                            onMouseEnter={() => window.innerWidth >= 768 && setActiveId(index)}
                            onClick={() => setActiveId(index === activeId ? null : index)}
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover object-top transition-transform duration-1500 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Blur overlay when active */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backdropFilter: isActive ? "blur(4px) brightness(0.75)" : "blur(0px) brightness(1)",
                                    WebkitBackdropFilter: isActive ? "blur(4px) brightness(0.75)" : "blur(0px) brightness(1)",
                                    transition: "backdrop-filter 0.7s ease, -webkit-backdrop-filter 0.7s ease",
                                    background: isActive ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0)",
                                    transitionProperty: "background",
                                    transitionDuration: "0.7s",
                                }}
                            />

                            {/* Soft top-to-glass gradient */}
                            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                            {/* Collapsed mini label — horizontal bottom, visible only when NOT active */}
                            <div
                                className="absolute left-0 right-0 bottom-0 pointer-events-none"
                                style={{
                                    opacity: isActive ? 0 : 1,
                                    transform: isActive ? "translateY(6px)" : "translateY(0px)",
                                    transition: "opacity 0.35s cubic-bezier(0.4, 0, 1, 1), transform 0.35s cubic-bezier(0.4, 0, 1, 1)",
                                    background: "linear-gradient(to bottom, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.13) 100%)",
                                    backdropFilter: "blur(18px) saturate(160%)",
                                    WebkitBackdropFilter: "blur(18px) saturate(160%)",
                                    borderTop: "1px solid rgba(255,255,255,0.10)",
                                    borderRadius: "1.25rem 1.25rem 0 0",
                                    padding: "0.875rem 1.25rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0.1rem",
                                }}
                            >
                                {member.isLeader && (
                                    <Crown className="w-4 h-4 text-primary mb-1" strokeWidth={2} />
                                )}
                                <span
                                    className="text-white text-[20px] leading-tight"
                                    style={{ fontFamily: "'Hubot Sans', sans-serif", fontVariationSettings: "'wght' 850, 'wdth' 115", fontWeight: 850 }}
                                >
                                    {member.name.split(" ")[0]}
                                </span>
                                <span
                                    className="text-white text-[20px] leading-tight"
                                    style={{ fontFamily: "'Hubot Sans', sans-serif", fontVariationSettings: "'wght' 850, 'wdth' 115", fontWeight: 850 }}
                                >
                                    {member.name.split(" ")[1]}
                                </span>
                                <span
                                    className="text-primary text-[10px] font-bold uppercase mt-1 text-center"
                                    style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 600, 'wdth' 100", fontWeight: 600, wordBreak: "break-word", whiteSpace: "normal" }}
                                >
                                    {member.role.split(" ").map((word, i) => (
                                        <span key={i} className="block">{word}</span>
                                    ))}
                                </span>
                            </div>

                            {/* Glassmorphism 2.0 text panel — visible only when active */}
                            <div
                                className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
                                style={{
                                    opacity: isActive ? 1 : 0,
                                    transform: isActive ? "translateY(0px)" : "translateY(8px)",
                                    transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                                    background: "linear-gradient(to bottom, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.09) 40%, rgba(255,255,255,0.13) 100%)",
                                    backdropFilter: "blur(18px) saturate(160%)",
                                    WebkitBackdropFilter: "blur(18px) saturate(160%)",
                                    borderTop: "1px solid rgba(255,255,255,0.10)",
                                    borderRadius: "1.5rem 1.5rem 0 0",
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                                }}
                            >
                                <div className="transform transition-transform duration-700 ease-smooth-out" style={{ transform: isActive ? "translateY(0)" : "translateY(10px)" }}>
                                    <div className="flex items-center gap-4 mb-2">
                                        {/* Name + role */}
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <h3
                                                className="text-2xl sm:text-3xl text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis mb-0.5"
                                                style={{ fontFamily: "'Hubot Sans', sans-serif", fontVariationSettings: "'wght' 850, 'wdth' 115", fontWeight: 850 }}
                                            >
                                                {member.name}
                                            </h3>
                                            <p className="text-primary text-[13px] font-bold whitespace-nowrap overflow-hidden text-ellipsis uppercase tracking-wide">{member.role}</p>
                                        </div>

                                        {/* Avatar + crown */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            {member.isLeader && (
                                                <Crown className="w-4 h-4 text-primary" strokeWidth={2} />
                                            )}
                                            <div style={{ perspective: "600px" }}>
                                                <motion.div
                                                    className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-primary/50"
                                                    animate={{ rotateY: isActive ? 0 : -90, opacity: isActive ? 1 : 0 }}
                                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: isActive ? 0.3 : 0 }}
                                                >
                                                    <Image src={member.image} alt="" fill className="object-cover object-top" sizes="200px" quality={90} />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>

                                <div
                                    className="overflow-hidden transition-all duration-700 ease-smooth-out"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        maxHeight: isActive ? "300px" : "0",
                                        marginTop: isActive ? "14px" : "0"
                                    }}
                                >
                                    <div className="border-t border-white/15 pt-4 w-full">
                                        <p className="relative text-white/80 text-[11px] sm:text-xs mb-4 font-bold uppercase tracking-wider pb-2.5 w-fit">
                                            {member.education}
                                            <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary/70 via-white/20 to-transparent" />
                                        </p>
                                        <p
                                            className="text-white/90 text-sm sm:text-[15px]"
                                            style={{ fontFamily: "'Mona Sans', sans-serif", fontVariationSettings: "'wght' 420, 'wdth' 100", fontWeight: 420, lineHeight: 1.7 }}
                                        >
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

const socialLinks = [
    { href: "https://www.facebook.com/n.takiev", label: "Facebook", icon: Facebook },
    { href: "https://www.linkedin.com/company/takiev-finance/", label: "LinkedIn", icon: Linkedin },
    { href: "https://www.youtube.com/@nikolaytakiev6221", label: "YouTube", icon: Youtube },
    { href: "https://www.tiktok.com/@n.takiev", label: "TikTok", icon: TikTokIcon },
];

export function AboutPageClient({ teamMembers }: { teamMembers?: TeamMemberDisplay[] }) {
    const displayMembers = teamMembers && teamMembers.length > 0 ? teamMembers : globalTeamMembers;

    const mainRef = useRef<HTMLDivElement>(null);
    const heroImgRef = useRef<HTMLElement>(null);

    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const { scrollYProgress } = useScroll({
        target: heroImgRef,
        offset: ["start start", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

    useGSAP(() => {
        // Top hero reveal — delay to ensure page transition completes first
        gsap.fromTo(heroImgRef.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut", delay: 0.5 }
        );

        // Founder 3D Image Parallax (Pop-out effect)
        gsap.fromTo(".founder-parallax-img",
            { y: 30 },
            {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".founder-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            }
        );

        // Refresh ScrollTrigger after layout settles (fixes intermittent freeze
        // caused by page-transition animation affecting scroll position calculations)
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 700);

        return () => clearTimeout(refreshTimer);

    }, { scope: mainRef });

    return (
        <div ref={mainRef} className="min-h-screen font-sans bg-[#F8FAFC]">
            {/* 
        GLOBAL BACKGROUND GRADIENT
      */}
            <div className="fixed inset-0 pointer-events-none z-[-2]">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#344541] to-[#122220]" />

                {/* Grain Noise Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Organic glowing background blobs for premium feel */}
                <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[60vw] h-[60vw] bg-dark-muted/60 rounded-full blur-[150px]" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .clip-slant {
           clip-path: polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%);
        }
        .clip-slant-reverse {
           clip-path: polygon(0 0, 100% 4vw, 100% 100%, 0 calc(100% - 4vw));
        }
        .founder-name-gradient {
           color: #c8d5d3;
        }
        .section-inset {
           box-shadow: inset 0 12px 40px -10px rgba(0,0,0,0.5), inset 0 -12px 40px -10px rgba(0,0,0,0.5), 0 0 100px rgba(0,0,0,0.4);
        }
        .stylish-divider {
           height: 1px;
           background: linear-gradient(90deg, transparent 0%, rgba(var(--color-primary-rgb),0.5) 25%, rgba(var(--color-primary-rgb),0.8) 50%, rgba(var(--color-primary-rgb),0.5) 75%, transparent 100%);
        }
      `}} />

            {/* ===== HERO SECTION ===== */}
            <section
                ref={heroImgRef}
                className="hero-container relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]"
                style={{ aspectRatio: "6912 / 2801", minHeight: "360px", maxHeight: "88vh" }}
            >
                {/* Parallax — inset-0 wrapper with scale-[1.08] bleed covers ±4% y movement */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={isDesktop ? { y: imageY } : undefined}
                >
                    <Image
                        src="/firm-logo/banners/banner-for-us.png"
                        alt="Takiev Finance - Екипът"
                        fill
                        priority
                        quality={95}
                        className="object-cover object-center scale-[1.08]"
                        sizes="100vw"
                    />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#06121c]/55 via-[#06121c]/20 to-[#06121c]/80 pointer-events-none" />

                {/* Breadcrumbs — top center, below header */}
                <div className="absolute top-0 inset-x-0 z-20 pt-32 md:pt-36 flex justify-center">
                    <Breadcrumbs />
                </div>

                {/* Glassmorphism card — bottom center */}
                <div className="absolute inset-x-0 bottom-0 px-4 z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="block bg-white/[0.015] backdrop-blur-2xl rounded-t-[1.5rem] md:rounded-t-[2.5rem] px-8 py-7 md:px-14 md:py-10 border border-white/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]">
                            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-white mb-4 tracking-tight">
                                За нас
                            </h1>
                            <p className="font-body text-[15px] md:text-[17px] text-white/65 leading-relaxed max-w-xl mx-auto tracking-wide" style={{ fontWeight: 300, fontStretch: "110%" }}>
                                Лично отношение. Професионален подход.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== INTRO HERO TEXT ===== */}
            <section className="relative py-16 mt-10 z-10 px-4">
                <div className="container mx-auto max-w-5xl text-center">
                    <SectionTitle
                        title="Лично отношение. Професионален подход."
                        subtitle="Такиев Финанс предлага първокласни счетоводни услуги и данъчни консултации, адаптирани за успеха на вашия бизнес."
                        darkText={true}
                        titleClass="!text-dark-muted"
                        subtitleClass="!text-dark-muted/80"
                    />
                </div>
            </section>

            {/* ===== FOUNDER ===== */}
            <section className="founder-section relative py-28 sm:py-36 z-10 clip-slant-reverse bg-surface section-inset border-y border-white/5 mt-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Title — extracted above the grid */}
                    <SectionTitle title="Основател и Управител" className="mb-8" />

                    {/* Stylish divider below title */}
                    <div className="stylish-divider w-full max-w-xl mx-auto mb-14" />

                    {/* Two-column grid: text + image */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Text column */}
                        <div className="lg:col-span-7">
                            <h3 className="founder-name-gradient text-5xl sm:text-6xl lg:text-8xl font-black mb-2 tracking-tighter leading-[0.95]">Николай<br />Такиев</h3>
                            <p className="text-lg sm:text-xl text-primary font-bold mb-10 uppercase tracking-widest">Магистър по счетоводство, финанси и бизнес анализ</p>

                            <div className="space-y-5 text-white/90 leading-relaxed text-[17px] max-w-2xl font-medium">
                                <p><span className="text-white font-bold">Николай Такиев</span> има надсетилетен професионален опит в областта на данъчното консултиране и счетоводството. Автор е на редица книги, статии и публикации, които подпомагат бизнес развитието.</p>
                                <p>От 2020 г. е лектор на множество обучения и семинари, а през 2021 г. основава професионалната програма за обучение към академията на <span className="font-bold text-white bg-primary/20 px-2 py-0.5 rounded">Finance Academy</span>.</p>
                                <p>Активен външен данъчен консултант на водещи одиторски компании. Автор в блога на единствената платформа за онлайн счетоводен софтуер – <a href="https://blog.nula.bg/author/nikolai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors duration-300 font-bold inline-flex items-center">NulaBG <ExternalLink className="w-4 h-4 ml-1" /></a></p>
                                <div className="border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/10 to-transparent rounded-r-xl">
                                    <p className="italic text-white">Компанията работи в тесни партньорски взаимоотношения с високо квалифицирани юристи в областта на гражданското, търговското и трудовото право.</p>
                                </div>
                            </div>
                        </div>

                        {/* Image column — 3D Pop-out Portrait */}
                        <div className="lg:col-span-5 relative flex items-end justify-center pt-20 pb-0">
                            <div className="relative w-[300px] sm:w-[380px] h-[400px] sm:h-[450px]">
                                {/* 3D Portal Base (Circle at bottom) */}
                                <div className="absolute bottom-0 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-white/10 bg-gradient-to-b from-dark-muted to-[#122220] shadow-[inset_0_-20px_60px_rgba(0,0,0,0.8),inset_0_10px_30px_rgba(var(--color-primary-rgb),0.15),0_30px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                                    {/* Inner grid/glow for depth */}
                                    <div className="absolute inset-x-0 bottom-0 h-[60%] opacity-30 bg-[linear-gradient(rgba(var(--color-primary-rgb),1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary-rgb),1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                                    <div className="absolute bottom-0 w-[80%] h-[50%] bg-primary/20 blur-[50px] rounded-full" />
                                </div>

                                {/* Image Wrapper clipped precisely to circle bottom but open at top */}
                                <div className="absolute bottom-0 w-[300px] sm:w-[380px] h-[550px] sm:h-[600px] overflow-hidden rounded-b-full z-10 pointer-events-none">
                                    <div className="founder-parallax-img absolute bottom-0 w-full h-full pointer-events-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
                                        <Image
                                            src="/firm-logo/Nikolay-Takiev–no-bgd.png"
                                            alt="Николай Такиев"
                                            fill
                                            className="object-contain object-bottom"
                                            sizes="(max-width: 1024px) 100vw, 400px"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* LinkedIn Social Badge */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20">
                                <motion.a
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, type: 'spring' }}
                                    href="https://www.linkedin.com/company/takiev-finance/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-surface transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Stylish divider above badges */}
                    <div className="stylish-divider w-full max-w-3xl mx-auto mt-14 mb-8" />

                    {/* Badges — full-width single row */}
                    <div className="flex flex-wrap lg:flex-nowrap justify-center gap-3">
                        {founderExpertise.map(exp => (
                            <div key={exp} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white shadow-lg text-[15px] font-semibold hover:border-primary/50 hover:bg-primary/20 transition-all cursor-default whitespace-nowrap">
                                {exp}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SOCIAL LINKS ===== */}
            <section className="relative py-8 bg-transparent z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-surface text-[13px] tracking-widest uppercase font-bold">Последвайте ни</p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full border border-surface/15 flex items-center justify-center text-surface/60 hover:text-primary hover:border-primary/80 hover:bg-primary/10 transition-all duration-300"
                                    >
                                        <span className="sr-only">{social.label}</span>
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section >

            {/* ===== AWARD ====== */}
            < section className="relative py-24 sm:py-32 z-10 clip-slant bg-[#1E2F2C] section-inset border-y border-white/5 mt-40" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-12 pb-12">
                    <SectionTitle title="Отличия и Признания" />


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
                        <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl p-6 bg-white/5 border border-white/10 shadow-2xl">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner bg-white">
                                <Image
                                    src="/firm-logo/awards/certificate-carrer-show.jpg"
                                    alt="Certificate"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="flex flex-wrap gap-2 mb-8">
                                {["Top 100 Bulgaria", "2025", "Finance & Accounting"].map((badge) => (
                                    <span key={badge} className="px-4 py-1.5 bg-primary/20 border border-primary/50 text-sm font-bold text-white uppercase tracking-wider rounded-full">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                                Отличен в <br /><span className="text-amber-400">Bulgaria&apos;s Top 100 Talents</span>
                            </h2>
                            <div className="space-y-6 text-white/90 text-lg leading-relaxed font-medium text-justify">
                                <p>През 2025 г. Николай Такиев е официално отличен в националния индекс <span className="text-white font-bold bg-white/10 px-2 rounded">Bulgaria&apos;s Top 100 Talents</span> на Career Show – инициатива, която ежегодно награждава най-изявените професионалисти в страната.</p>
                                <p>Той е избран в категория <span className="text-amber-400 font-bold">Finance & Accounting</span> като абсолютно признание за висок професионализъм, експертиза в областта на счетоводството и данъчното консултиране, както и безспорен принос към развитието на бизнеса в България.</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Second award ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">
                        <div className="order-1 lg:order-1">
                            <div className="flex flex-wrap gap-2 mb-8">
                                {["Finance Academy", "2023", "TOP EDUCATOR", "15K+ Impact"].map((badge) => (
                                    <span key={badge} className="px-4 py-1.5 bg-primary/20 border border-primary/50 text-sm font-bold text-white uppercase tracking-wider rounded-full">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                                Водещ лектор на <br /><span className="text-amber-400">Finance Academy 2023</span>
                            </h2>
                            <div className="space-y-6 text-white/90 text-lg leading-relaxed font-medium text-justify">
                                <p>Специално признание от <span className="text-white font-bold bg-white/10 px-2 rounded">Finance Academy</span> за изключителен принос в сферата на финансовото образование.</p>
                                <p>Наградата е връчена на Николай Такиев за реалното въздействие чрез преподаване и подобряването на финансовата култура и живота на <span className="text-amber-400 font-bold">над 15 000 курсисти</span> в България в рамките на една година.</p>
                            </div>
                        </div>
                        <div className="order-2 lg:order-2 rounded-3xl p-6 bg-white/5 border border-white/10 shadow-2xl">
                            <div className="rounded-2xl overflow-hidden shadow-inner bg-white">
                                <Image
                                    src="/firm-logo/awards/priznanie-fin-acad.png"
                                    alt="Finance Academy признание"
                                    width={0}
                                    height={0}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* ===== VALUES ===== */}
            < section className="relative py-24 sm:py-32 z-10" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute inset-x-0 inset-y-0 bg-dark-muted rounded-[3rem] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] -z-10" />
                    <div className="py-16">
                        <SectionTitle title="Нашите ценности" subtitle="Принципите, които направляват всяко наше действие и създават доверие" />
                        <ValuesSection />
                    </div>
                </div>
            </section >

            {/* ===== EXPERTISE BENTO ===== */}
            < section className="relative py-24 sm:py-32 z-10 clip-slant-reverse bg-dark-muted section-inset border-y border-white/5 mt-40" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SectionTitle title="Експертиза в разнообразни сектори" subtitle="Изключителен практически опит в разнообразни области на икономиката" />
                    <BusinessSectorsSection />
                </div>
            </section >

            {/* ===== MID-PAGE INFO TEXT ===== */}
            <section className="relative pt-16 pb-6 mt-32 mb-0 z-10 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col gap-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <motion.h2
                                initial={{ x: -40, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                                className="text-5xl md:text-6xl leading-tight text-dark-muted"
                                style={{
                                    fontFamily: "'Hubot Sans', sans-serif",
                                    fontVariationSettings: "'wght' 800, 'wdth' 110",
                                    fontWeight: 800,
                                }}
                            >
                                Изграждаме финансово бъдеще
                            </motion.h2>
                            <motion.p
                                initial={{ x: 40, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 }}
                                className="text-dark-muted/90 text-base leading-relaxed"
                                style={{
                                    fontFamily: "'Mona Sans', sans-serif",
                                    fontVariationSettings: "'wght' 400, 'wdth' 100",
                                    fontWeight: 400,
                                    lineHeight: 1.75,
                                    letterSpacing: "0.01em",
                                }}
                            >
                                Такиев Финанс предлага експертни счетоводни услуги и данъчни консултации за различни бизнеси и физически лица. В нашата практика обслужваме широка гама от клиенти, които успешно изграждат своя бизнес в различни сектори на икономиката.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TEAM ACCORDION ===== */}
            <section className="relative py-24 sm:py-32 z-10 clip-slant bg-dark-muted section-inset border-y border-white/5 mt-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SectionTitle title="Нашият екип" subtitle="Експерти с богат опит и безкомпромисен стандарт на работа" />
                    <TeamSection teamMembers={displayMembers} />
                </div>
            </section>

            {/* ===== PARTNERS SECTION ===== */}
            <section className="relative py-24 sm:py-32 z-10 overflow-hidden mt-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="max-w-7xl mx-auto text-center">
                        <SectionTitle
                            title="Нашите партньори"
                            subtitle="Заедно постигаме повече и работим с водещи организации в сектора"
                            center={true}
                            titleClass="!text-dark-muted"
                            subtitleClass="!text-dark-muted/80"
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.2 }}
                    className="relative mt-16 w-full max-w-[100rem] mx-auto px-4 sm:px-8"
                >
                    <PartnersCarousel />
                </motion.div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative py-40 z-10 -mt-10 overflow-hidden bg-[#101b1a] rounded-t-[4rem] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">

                {/* Diagonal Lines Background */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {/* White line (thinner) */}
                    <div className="absolute -top-[50%] right-[5%] sm:right-[15%] w-16 sm:w-24 h-[200%] bg-white/10 rotate-[35deg] transform origin-center transition-transform" />

                    {/* Turquoise line (thicker, overlapping white, casting shadow) */}
                    <div className="absolute -top-[50%] right-[10%] sm:right-[calc(15%+40px)] w-24 sm:w-36 h-[200%] bg-gradient-to-b from-primary to-primary-dark rotate-[35deg] transform origin-center shadow-[-20px_0_30px_rgba(0,0,0,0.6)]" />
                </div>

                {/* Brand icon — bottom right corner of section */}
                <div className="hidden lg:block absolute right-6 bottom-6 pointer-events-none z-10" aria-hidden="true">
                    <Image
                        src="/icon.svg"
                        alt=""
                        width={160}
                        height={160}
                        className="opacity-60 rotate-[-24deg]"
                    />
                </div>

                <div className="container mx-auto px-4 text-center relative z-20">
                    <SectionTitle title="Готови ли сте за старт?" subtitle="Свържете се с нас днес и нека заедно изградим финансовото бъдеще на вашия бизнес." />
                    <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.35 }}
                        className="mt-16 flex justify-center"
                    >
                        <PremiumCTA href="/kontakti" className="border border-white/20 bg-white/[0.08]">
                            Свържете се с нас <ArrowRight className="w-5 h-5 ml-2" />
                        </PremiumCTA>
                    </motion.div>
                </div>
            </section>

        </div >
    );
}
