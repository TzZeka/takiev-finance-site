"use client";

import { useRef, useEffect, useCallback, useState } from "react";
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

const messageVideos = [
  "/firm-logo/messages-videos/индивидуален-подход.mp4",
  "/firm-logo/messages-videos/професионална-експертиза.mp4",
  "/firm-logo/messages-videos/дигитализирано-счетоводство.mp4",
];

const SWEEP_IN_MS = 900;
const SWEEP_HOLD_MS = 5000;
const SWEEP_OUT_MS = 900;
const SWEEP_TOTAL_MS = SWEEP_IN_MS + SWEEP_HOLD_MS + SWEEP_OUT_MS;

function MessageCard({
  message,
  index,
  isReversed,
}: {
  message: Message;
  index: number;
  isReversed: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-20%" });
  const hasTriggeredRef = useRef(false);
  const sweepingRef = useRef(false);
  const [sweepPhase, setSweepPhase] = useState<"idle" | "in" | "hold" | "out">("idle");

  const IconComponent =
    Icons[message.icon as keyof typeof Icons] || Icons.CheckCircle;
  const number = String(index + 1).padStart(2, "0");

  // Sweep direction based on image position
  // isReversed = image on LEFT → sweep enters from left
  // !isReversed = image on RIGHT → sweep enters from right
  const sweepFrom = isReversed ? -101 : 101;
  const sweepExit = isReversed ? 101 : -101;

  const getSweepTransform = () => {
    switch (sweepPhase) {
      case "idle": return `translateX(${sweepFrom}%)`;
      case "in": return "translateX(0%)";
      case "hold": return "translateX(0%)";
      case "out": return `translateX(${sweepExit}%)`;
    }
  };

  const getSweepTransition = () => {
    switch (sweepPhase) {
      case "idle": return "none";
      case "in": return `transform ${SWEEP_IN_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      case "hold": return "none";
      case "out": return `transform ${SWEEP_OUT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    }
  };

  const triggerSweep = useCallback(() => {
    if (sweepingRef.current) return;
    sweepingRef.current = true;

    setSweepPhase("in");

    setTimeout(() => {
      setSweepPhase("hold");
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }, SWEEP_IN_MS);

    setTimeout(() => {
      setSweepPhase("out");
    }, SWEEP_IN_MS + SWEEP_HOLD_MS);

    setTimeout(() => {
      setSweepPhase("idle");
      sweepingRef.current = false;
    }, SWEEP_TOTAL_MS);
  }, []);

  // Play video when card enters view, pause when it leaves
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setTimeout(() => {
          triggerSweep();
        }, 600);
      }
    } else {
      video.pause();
    }
  }, [isInView, triggerSweep]);

  // On video end, trigger sweep to hide restart
  const handleEnded = useCallback(() => {
    triggerSweep();
  }, [triggerSweep]);

  // Text color transitions based on sweep phase
  const isDarkText = sweepPhase === "hold" || sweepPhase === "in";
  const textTransition = "color 0.5s ease-in-out, opacity 0.5s ease-in-out";

  // Motion variants for text & image
  const textSlideFrom = isReversed ? 60 : -60;
  const imageSlideFrom = isReversed ? -60 : 60;

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-[420px]"
    >
      {/* Video background */}
      {messageVideos[index] && (
        <>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scale(1.05)", filter: "blur(2px)" }}
          >
            <source src={messageVideos[index]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      {/* White sweep overlay — behind content */}
      <div
        className="absolute inset-0 bg-white z-[5]"
        style={{
          transform: getSweepTransform(),
          transition: getSweepTransition(),
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-6 md:gap-10 lg:gap-14 p-8 md:p-12 h-full`}
      >
        {/* Text Side */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, x: textSlideFrom }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-start gap-4">
            <span
              className="text-6xl md:text-7xl font-bold select-none leading-none"
              style={{
                color: isDarkText ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.15)",
                transition: textTransition,
              }}
            >
              {number}
            </span>
            <div className="pt-2">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  backgroundColor: isDarkText ? "rgba(25,191,183,0.1)" : "rgba(255,255,255,0.1)",
                  transition: "background-color 0.5s ease-in-out",
                }}
              >
                {/* @ts-ignore */}
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <h3
                className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3"
                style={{
                  color: isDarkText ? "#0f172a" : "#ffffff",
                  transition: textTransition,
                }}
              >
                {message.title}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-lg"
                style={{
                  color: isDarkText ? "rgba(15,23,42,0.65)" : "rgba(255,255,255,0.75)",
                  transition: textTransition,
                }}
              >
                {message.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          className="flex-1 w-full max-w-xs md:max-w-sm"
          initial={{ opacity: 0, x: imageSlideFrom }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {messageImages[index] && (
            <div
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
              style={{
                borderColor: isDarkText ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.1)",
                borderWidth: "1px",
                transition: "border-color 0.5s ease-in-out",
              }}
            >
              <Image
                src={messageImages[index].src}
                alt={messageImages[index].alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

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

        {/* Messages with video backgrounds */}
        <div className="space-y-10 md:space-y-16 max-w-6xl mx-auto">
          {messages.map((message, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <MessageCard
                key={message._key}
                message={message}
                index={index}
                isReversed={isReversed}
              />
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="mt-16 md:mt-24 border-t border-slate-200" />
      </div>
    </section>
  );
}
