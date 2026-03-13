"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
    ArrowRight,
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
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const textRef = containerRef.current.querySelector(".split-title");
        if (textRef) {
            const split = new SplitType(textRef as HTMLElement, { types: 'words,chars' });
            gsap.from(split.chars, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    invalidateOnRefresh: true,
                },
                y: 30,
                opacity: 0,
                rotationX: -20,
                stagger: 0.015,
                duration: 0.8,
                ease: "power3.out"
            });
        }

        const lineRef = containerRef.current.querySelector(".accent-line");
        if (lineRef) {
            gsap.from(lineRef, {
                scrollTrigger: { trigger: containerRef.current, start: "top 85%", invalidateOnRefresh: true },
                width: 0,
                duration: 0.8,
                ease: "power3.inOut"
            });
        }

        const subRef = containerRef.current.querySelector(".subtitle-text");
        if (subRef) {
            gsap.from(subRef, {
                scrollTrigger: { trigger: containerRef.current, start: "top 85%", invalidateOnRefresh: true },
                y: 20,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out"
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`${center ? "text-left md:text-center" : ""} ${className}`}>
            <div className={`mb-5 sm:mb-6 ${center ? "flex md:justify-center" : ""}`}>
                <div className="w-12 h-[3px] bg-primary accent-line rounded-full" />
            </div>

            <h2
                className={`split-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-[1.1] ${darkText ? "text-[#101b1a]" : "text-white"} ${titleClass}`}
                style={{ perspective: "1000px" }}
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

            {subtitle && (
                <p className={`subtitle-text text-sm sm:text-base md:text-lg max-w-2xl ${center ? "mx-auto" : ""} px-4 font-medium ${darkText ? "text-[#1b2b28]" : "text-white/80"} ${subtitleClass}`}>
                    {subtitle}
                </p>
            )}
        </div>
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
            scrollTrigger: { trigger: containerRef.current, start: "top 85%", invalidateOnRefresh: true },
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

// VALUES SECTION - Premium Carousel Slider
function ValuesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % values.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div
            ref={containerRef}
            className="max-w-6xl mx-auto mt-16 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black/20 border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform translate-z-0">
                <div className="relative h-[650px] sm:h-[500px] w-full">
                    <AnimatePresence initial={false} mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8 } }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <Image src={values[activeIndex].image} fill alt="bg" className="object-cover" />
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-[#1b2b28] via-[#1b2b28]/80 to-transparent" />
                            {/* Overall subtle darkening */}
                            <div className="absolute inset-0 bg-black/20" />
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 z-20">
                        <div className="flex flex-col sm:flex-row gap-8 items-end justify-between">
                            <div className="max-w-2xl">
                                <motion.div
                                    key={"text-" + activeIndex}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl font-bold text-primary drop-shadow-lg">0{activeIndex + 1}</span>
                                        <h3 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">{values[activeIndex].title}</h3>
                                    </div>
                                    <p className="text-lg text-white/95 leading-relaxed font-medium drop-shadow-md">
                                        {values[activeIndex].description}
                                    </p>
                                </motion.div>
                            </div>

                            <div className="flex flex-col items-end gap-6 shrink-0">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setActiveIndex(prev => prev === 0 ? values.length - 1 : prev - 1)}
                                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md border border-white/30 text-white"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => setActiveIndex(prev => (prev + 1) % values.length)}
                                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 hover:scale-110 transition-all flex items-center justify-center backdrop-blur-md border border-white/30 text-white"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex gap-2 bg-black/20 p-2 rounded-full backdrop-blur-sm border border-white/10">
                                    {values.map((_, i) => (
                                        <div key={i} className="relative h-1.5 bg-white/30 rounded-full overflow-hidden transition-all duration-300" style={{ width: i === activeIndex ? "40px" : "20px" }}>
                                            {i === activeIndex && (
                                                <motion.div
                                                    key={`progress-${activeIndex}`}
                                                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_10px_#19BFB7]"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BusinessSectorsSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".bento-item", {
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "expo.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative z-10 w-full mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {/* Row 1 */}
                <div className="bento-item lg:col-span-2 md:col-span-2 relative group bg-white/[0.12] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 relative z-10">Електронна търговия</h3>
                    <p className="text-white/80 max-w-md text-base leading-relaxed relative z-10 font-medium">Пълно счетоводно обслужване на онлайн магазини, Amazon, Shopify и дропшипинг бизнеси.</p>
                </div>

                <div className="bento-item relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-end overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">ИТ Сектор</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">ИТ компании и софтуерни решения.</p>
                </div>

                <div className="bento-item relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-end overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Криптовалути</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Счетоводство и данъчно облагане.</p>
                </div>

                {/* Row 2 */}
                <div className="bento-item lg:col-span-1 md:col-span-1 relative group bg-primary/10 p-6 sm:p-8 rounded-3xl border border-primary/20 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-primary mb-2 relative z-10">Фрийлансъри</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Цялостно обслужване на свободни професии.</p>
                </div>

                <div className="bento-item lg:col-span-2 md:col-span-2 relative group bg-white/[0.12] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform overflow-hidden shadow-2xl flex flex-col justify-center">
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 relative z-10">Строителство и Имоти</h3>
                    <p className="text-white/80 max-w-sm text-base leading-relaxed relative z-10 font-medium">Специфично счетоводно отчитане за инвеститори и строителни фирми.</p>
                </div>

                <div className="bento-item lg:col-span-1 md:col-span-3 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Маркетинг</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Агенции и дигитални услуги.</p>
                </div>

                {/* Row 3 */}
                <div className="bento-item lg:col-span-2 md:col-span-1 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Airbnb & Booking</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Оптимизация за краткосрочни наеми.</p>
                </div>

                <div className="bento-item lg:col-span-1 md:col-span-1 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Медицина</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Лечебни заведения.</p>
                </div>

                <div className="bento-item lg:col-span-1 md:col-span-1 relative group bg-white/[0.12] backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:bg-white/[0.16] hover:shadow-[0_20px_40px_-15px_rgba(25,191,183,0.3)] will-change-transform flex flex-col justify-center overflow-hidden shadow-2xl">
                    <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">Изкуство</h3>
                    <p className="text-white/80 text-sm relative z-10 font-medium">Творчески индустрии.</p>
                </div>

            </div>
        </div>
    );
}

function TeamSection({ teamMembers }: { teamMembers: TeamMemberDisplay[] }) {
    const [activeId, setActiveId] = useState<number | null>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".team-member", {
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
            y: 60,
            opacity: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative z-10 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 h-auto md:h-[650px] px-4 md:px-0">
                {teamMembers.map((member, index) => {
                    const isActive = activeId === index;
                    const flexValue = isActive ? "45%" : "18%";

                    return (
                        <div
                            key={index}
                            className="team-member relative overflow-hidden rounded-[2.5rem] cursor-pointer group will-change-[width,flex] min-h-[450px] md:min-h-0 shadow-2xl border border-white/10"
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
                                className="object-cover object-top transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#1b2b28] via-[#1b2b28]/60 to-transparent pointer-events-none transition-opacity duration-700 opacity-90 group-hover:opacity-100" />

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end h-full">
                                <div className="w-full">
                                    <div className="transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: isActive ? "translateY(0)" : "translateY(15px)" }}>
                                        {member.isLeader && (
                                            <span className="inline-block bg-primary text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(25,191,183,0.5)]">
                                                Ръководител
                                            </span>
                                        )}

                                        <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight whitespace-nowrap overflow-hidden text-ellipsis mb-1 transition-all duration-700 ${isActive ? "drop-shadow-lg" : ""}`}>
                                            {member.name}
                                        </h3>
                                        <p className="text-primary text-[15px] font-bold whitespace-nowrap overflow-hidden text-ellipsis uppercase tracking-wide">{member.role}</p>
                                    </div>

                                    <div
                                        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            maxHeight: isActive ? "300px" : "0",
                                            marginTop: isActive ? "20px" : "0"
                                        }}
                                    >
                                        <div className="border-t border-white/20 pt-5 w-full">
                                            <p className="text-white/90 text-xs sm:text-sm mb-3 font-bold uppercase tracking-wider">
                                                {member.education}
                                            </p>
                                            <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed line-clamp-4 md:line-clamp-none font-medium">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    const heroImgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Top hero reveal — delay to ensure page transition completes first
        gsap.fromTo(heroImgRef.current,
            { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.8, ease: "power4.inOut", delay: 0.9 }
        );

        // Hero inner parallax
        gsap.fromTo(".hero-parallax-img",
            { yPercent: -10 },
            {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-container",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            }
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
                <div className="absolute bottom-[20%] left-[-10%] w-[60vw] h-[60vw] bg-[#2d3d3a]/60 rounded-full blur-[150px]" />
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
           background: linear-gradient(90deg, transparent 0%, rgba(25,191,183,0.5) 25%, rgba(25,191,183,0.8) 50%, rgba(25,191,183,0.5) 75%, transparent 100%);
        }
      `}} />

            {/* ===== HERO SECTION ===== */}
            <section className="hero-container relative h-[95vh] w-full flex flex-col items-center justify-center pt-24 pb-32">
                <div ref={heroImgRef} className="absolute inset-4 sm:inset-6 lg:inset-x-12 lg:inset-y-8 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                    <Image
                        src="/firm-logo/banners/banner-for-us.png"
                        alt="Takiev Finance Team"
                        fill
                        className="hero-parallax-img object-cover object-center scale-[1.25] "
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

                    <div className="absolute top-8 left-6 sm:left-10 md:top-12 md:left-12 z-20">
                        <Breadcrumbs />
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
                        titleClass="!text-[#2d3d3a]"
                        subtitleClass="!text-[#2d3d3a]/80"
                    />
                </div>
            </section>

            {/* ===== FOUNDER ===== */}
            <section className="founder-section relative py-28 sm:py-36 z-10 clip-slant-reverse bg-[#1b2b28] section-inset border-y border-white/5 mt-40">
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
                                <p>От 2020 г. е лектор на множество обучения и семинари, а през 2021 г. основава професионалната програма за обучение към академията на <span className="font-bold text-white bg-[#19BFB7]/20 px-2 py-0.5 rounded">Finance Academy</span>.</p>
                                <p>Активен външен данъчен консултант на водещи одиторски компании. Автор в блога на единствената платформа за онлайн счетоводен софтуер – <a href="https://blog.nula.bg/author/nikolai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors duration-300 font-bold inline-flex items-center">NulaBG <ExternalLink className="w-4 h-4 ml-1" /></a></p>
                                <div className="border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-[#19BFB7]/10 to-transparent rounded-r-xl">
                                    <p className="italic text-white">Компанията работи в тесни партньорски взаимоотношения с високо квалифицирани юристи в областта на гражданското, търговското и трудовото право.</p>
                                </div>
                            </div>
                        </div>

                        {/* Image column — 3D Pop-out Portrait */}
                        <div className="lg:col-span-5 relative flex items-end justify-center pt-20 pb-0">
                            <div className="relative w-[300px] sm:w-[380px] h-[400px] sm:h-[450px]">
                                {/* 3D Portal Base (Circle at bottom) */}
                                <div className="absolute bottom-0 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-white/10 bg-gradient-to-b from-[#2d3d3a] to-[#122220] shadow-[inset_0_-20px_60px_rgba(0,0,0,0.8),inset_0_10px_30px_rgba(25,191,183,0.15),0_30px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                                    {/* Inner grid/glow for depth */}
                                    <div className="absolute inset-x-0 bottom-0 h-[60%] opacity-30 bg-[linear-gradient(rgba(25,191,183,1)_1px,transparent_1px),linear-gradient(90deg,rgba(25,191,183,1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
                                    <div className="absolute bottom-0 w-[80%] h-[50%] bg-[#19BFB7]/20 blur-[50px] rounded-full" />
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
                                    className="w-14 h-14 rounded-full bg-[#1b2b28] border-2 border-[#19BFB7] flex items-center justify-center text-[#19BFB7] hover:bg-[#19BFB7] hover:text-[#1b2b28] transition-all duration-300 hover:-translate-y-1"
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
                            <div key={exp} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white shadow-lg text-[15px] font-semibold hover:border-primary/50 hover:bg-[#19BFB7]/20 transition-all cursor-default whitespace-nowrap">
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
                        <p className="text-[#1b2b28] text-[13px] tracking-widest uppercase font-bold">Последвайте ни</p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full border border-[#1b2b28]/15 flex items-center justify-center text-[#1b2b28]/60 hover:text-[#19BFB7] hover:border-[#19BFB7]/80 hover:bg-[#19BFB7]/10 transition-all duration-300"
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
                                    <span key={badge} className="px-4 py-1.5 bg-[#19BFB7]/20 border border-[#19BFB7]/50 text-sm font-bold text-white uppercase tracking-wider rounded-full">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                                Отличен в <br /><span className="text-amber-400">Bulgaria&apos;s Top 100 Talents</span>
                            </h2>
                            <div className="space-y-6 text-white/90 text-lg leading-relaxed font-medium">
                                <p>През 2025 г. Николай Такиев е официално отличен в националния индекс <span className="text-white font-bold bg-white/10 px-2 rounded">Bulgaria&apos;s Top 100 Talents</span> на Career Show – инициатива, която ежегодно награждава най-изявените професионалисти в страната.</p>
                                <p>Той е избран в категория <span className="text-amber-400 font-bold">Finance & Accounting</span> като абсолютно признание за висок професионализъм, експертиза в областта на счетоводството и данъчното консултиране, както и безспорен принос към развитието на бизнеса в България.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* ===== VALUES ===== */}
            < section className="relative py-24 sm:py-32 z-10" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="absolute inset-x-0 inset-y-0 bg-[#2d3d3a] rounded-[3rem] border border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] -z-10" />
                    <div className="py-16">
                        <SectionTitle title="Нашите ценности" subtitle="Принципите, които направляват всяко наше действие и създават доверие" />
                        <ValuesSection />
                    </div>
                </div>
            </section >

            {/* ===== EXPERTISE BENTO ===== */}
            < section className="relative py-24 sm:py-32 z-10 clip-slant-reverse bg-[#2d3d3a] section-inset border-y border-white/5 mt-40" >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <SectionTitle title="Експертиза в разнообразни сектори" subtitle="Изключителен практически опит в разнообразни области на икономиката" />
                    <BusinessSectorsSection />
                </div>
            </section >

            {/* ===== MID-PAGE INFO TEXT ===== */}
            < section className="relative py-16 mt-20 mb-10 z-10 px-4" >
                <div className="container mx-auto max-w-5xl text-center">
                    <SectionTitle
                        title="Изграждаме финансово бъдеще"
                        subtitle="Такиев Финанс предлага експертни счетоводни услуги и данъчни консултации за различни бизнеси и физически лица. В нашата практика обслужваме широка гама от клиенти, които успешно изграждат своя бизнес в различни сектори на икономиката."
                        darkText={true}
                        titleClass="!text-[#2d3d3a]"
                        subtitleClass="!text-[#2d3d3a]/80 font-medium"
                    />
                </div>
            </section>

            {/* ===== TEAM ACCORDION ===== */}
            <section className="relative py-24 sm:py-32 z-10 clip-slant bg-[#2d3d3a] section-inset border-y border-white/5 mt-40">
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
                            titleClass="!text-[#2d3d3a]"
                            subtitleClass="!text-[#2d3d3a]/80"
                        />
                    </div>
                </div>

                <div className="relative mt-16 w-full max-w-[100rem] mx-auto px-4 sm:px-8">
                    <PartnersCarousel />
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative py-40 z-10 -mt-10 overflow-hidden bg-[#101b1a] rounded-t-[4rem] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">

                {/* Diagonal Lines Background */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {/* White line (thinner) */}
                    <div className="absolute -top-[50%] right-[5%] sm:right-[15%] w-16 sm:w-24 h-[200%] bg-white/10 rotate-[35deg] transform origin-center transition-transform" />

                    {/* Turquoise line (thicker, overlapping white, casting shadow) */}
                    <div className="absolute -top-[50%] right-[10%] sm:right-[calc(15%+40px)] w-24 sm:w-36 h-[200%] bg-gradient-to-b from-[#19BFB7] to-[#128a84] rotate-[35deg] transform origin-center shadow-[-20px_0_30px_rgba(0,0,0,0.6)]" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-20">
                    <SectionTitle title="Готови ли сте за старт?" subtitle="Свържете се с нас днес и нека заедно изградим финансовото бъдеще на вашия бизнес." />
                    <div className="mt-16 flex justify-center">
                        <PremiumCTA href="/kontakti">
                            Свържете се с нас <ArrowRight className="w-5 h-5 ml-2" />
                        </PremiumCTA>
                    </div>
                </div>
            </section>

        </div >
    );
}
