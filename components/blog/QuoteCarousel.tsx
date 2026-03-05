"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
    {
        text: "Счетоводството е езикът на бизнеса.",
        author: "Уорън Бъфет",
    },
    {
        text: "Внимавайте за малките разходи малък теч може да потопи голям кораб.",
        author: "Бенджамин Франклин",
    },
    {
        text: "Не пестете това, което остава след харчене, а харчете това, което остава след спестяване.",
        author: "Уорън Бъфет",
    },
    {
        text: "Доброто счетоводство не е просто работа с числа, то е спокойствие за ума.",
        author: "Такиев Финанс",
    },
];

export function QuoteCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [isHovered]);

    return (
        <div
            className="w-full mx-auto py-6 md:py-8 px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full overflow-hidden flex flex-col items-center text-center">
                {/* Carousel Content */}
                <div className="min-h-[60px] md:min-h-[40px] w-full flex items-center justify-center relative z-10 px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3"
                        >
                            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                                <span className="italic">&ldquo;{QUOTES[currentIndex].text}&rdquo;</span>
                                <span className="font-semibold text-[#19BFB7] md:ml-2">
                                    — {QUOTES[currentIndex].author}
                                </span>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
