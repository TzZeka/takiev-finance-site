"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import * as Icons from "lucide-react";

interface Message {
  _key: string;
  icon: string;
  title: string;
  description: string;
}

interface MessagesSectionProps {
  messages: Message[];
}

const messageImages = [
  { src: "/firm-logo/choose-us/индивидуален-подход.png", alt: "Индивидуален подход към всеки клиент" },
  { src: "/firm-logo/choose-us/професионална-експертиза.png", alt: "Висока професионална експертиза" },
  { src: "/firm-logo/choose-us/дигитализирано-счетоводствто.png", alt: "Дигитализиране на счетоводството" },
];

export function MessagesSection({ messages }: MessagesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
      };

  return (
    <section ref={ref} className="relative py-16 md:py-24 lg:py-32 bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs sm:text-sm font-semibold text-primary tracking-wider uppercase">
            Защо Такиев Финанс
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Защо да изберете <span className="text-primary">нас?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Нашият екип се отличава с професионализъм, иновативност и грижа към всеки клиент.
            Предоставяме цялостни счетоводни решения, които помагат на бизнеса Ви да расте и да се развива.
          </p>
        </motion.div>

        {/* Zig-zag Messages */}
        <div className="space-y-16 md:space-y-24 max-w-6xl mx-auto">
          {messages.map((message, index) => {
            const IconComponent =
              Icons[message.icon as keyof typeof Icons] || Icons.CheckCircle;
            const isReversed = index % 2 !== 0;
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={message._key}
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 40 },
                      animate: isInView ? { opacity: 1, y: 0 } : {},
                    })}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-12 lg:gap-16`}
              >
                {/* Text Side */}
                <div className="flex-1 w-full">
                  <div className="flex items-start gap-4">
                    <span className="text-6xl md:text-7xl font-bold text-slate-100 select-none leading-none">
                      {number}
                    </span>
                    <div className="pt-2">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        {/* @ts-ignore */}
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                        {message.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                        {message.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    {messageImages[index] ? (
                      <Image
                        src={messageImages[index].src}
                        alt={messageImages[index].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <Icons.ImageIcon className="w-8 h-8 text-slate-300" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="mt-16 md:mt-24 border-t border-slate-200" />
      </div>
    </section>
  );
}
