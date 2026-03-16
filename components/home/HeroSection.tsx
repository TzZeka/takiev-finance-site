"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase);
}

interface HeroSectionProps {
  motto: string;
}

// Data for Scene 2 Phase A
// Modified with capitalized words
const acronymFirst = [
  { letter: "Т", word: "Трансформация" },
  { letter: "А", word: "Анализ" },
  { letter: "К", word: "Коректност" },
  { letter: "И", word: "Иновация" },
  { letter: "Е", word: "Ефективност" },
  { letter: "В", word: "Възможност" },
];

const acronymSecond = [
  { letter: "Ф" },
  { letter: "И" },
  { letter: "Н" },
  { letter: "А" },
  { letter: "Н" },
  { letter: "С" },
];

export function HeroSection({ motto: _motto }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Refs for tracking elements
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Scene 1 refs
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const scene1BtnWrapRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  
  // Scene 2 Phase A refs
  const takievWrapRef = useRef<HTMLDivElement>(null);
  const takievLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const takievWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statCardsRef = useRef<HTMLDivElement>(null);
  
  // Scene 2 Phase B refs
  const finansWrapRef = useRef<HTMLDivElement>(null);
  const finansLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  // Special Sentences refs
  const sentencesWrapRef = useRef<HTMLDivElement>(null);
  const sentence1Ref = useRef<HTMLParagraphElement>(null);
  const sentence2Ref = useRef<HTMLParagraphElement>(null);
  
  // Scene 3 Final Resolution refs
  const finalTagRef = useRef<HTMLDivElement>(null);
  const finalButtonsWrapRef = useRef<HTMLDivElement>(null);
  const btnBlogRef = useRef<HTMLAnchorElement>(null);
  const btnAboutRef = useRef<HTMLAnchorElement>(null); // New button

  // --- GSAP Scrollytelling Logic ---
  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReduced) {
      // Fallbacks...
      return;
    }

    CustomEase.create("cinematic", "0.25, 0.1, 0.25, 1");

    // 1. Initial Scene Reveal (The Hook)
    const initTl = gsap.timeline();
    
    // H1 Letters fade-in & blur removal
    initTl.fromTo(h1Ref.current, 
      { opacity: 0, filter: "blur(10px)", y: 40 }, 
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "cinematic" }
    );

    // Initial Buttons Reveal
    initTl.fromTo(scene1BtnWrapRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "cinematic" },
      "-=0.5"
    );
    
    // Video Reveal (No float, full bleed style)
    initTl.fromTo(videoWrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "cinematic", delay: -1.5 }
    );

    // 3. The Grand Scrollytelling Timeline (Scene 1 -> 2 -> 3)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 400vh for scroll duration
        pin: true,
        scrub: 1,     // 1 second scrub delay for buttery feel
        anticipatePin: 1,
      }
    });

    // SCENE 1 OUT
    scrollTl.to([leftColRef.current], {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power1.inOut"
    }, "scene1-out");

    scrollTl.to(scrollIndicatorRef.current, {
      opacity: 0,
      duration: 0.5
    }, "scene1-out");
    
    // Video slowly fades instead of blurring to prevent shadow flicker
    scrollTl.to(videoWrapRef.current, {
      opacity: 0,
      duration: 1.5,
    }, "scene1-out");

    // SCENE 2: PHASE A (ТАКИЕВ Start)
    scrollTl.fromTo(takievWrapRef.current, 
      { autoAlpha: 0, display: "none", top: "50%", left: "15%", yPercent: -50 },
      { autoAlpha: 1, display: "flex", duration: 0.1 }
    );

    // Fade in letters vertically
    scrollTl.from(takievLettersRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      fontVariationSettings: "'wght' 300, 'wdth' 125",
      duration: 1,
      ease: "power2.out"
    }, "takiev-in");

    // Reveal the words next to letters (tilt preserved via skewX)
    scrollTl.fromTo(takievWordsRef.current,
      { opacity: 0, x: -20, skewX: -7 },
      { opacity: 1, x: 0, skewX: -7, stagger: 0.1, duration: 1, ease: "power2.out" },
      "takiev-in+=0.8"
    );

    // When the last word appears, reveal the stat cards on the right
    scrollTl.fromTo(statCardsRef.current,
      { opacity: 0, scale: 0.85, x: 60 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "back.out(1.5)" },
      "takiev-in+=1.3"
    );

    // Provide a moment of pause
    scrollTl.to({}, { duration: 0.8 });

    // Transition: Phase A collapses and stays vertically centered OR moves?
    // User: "Phase A ("ТАКИЕВ") когато се покажат всички думи се свива и отива много нагоре нека да е центрирано от ляво"
    // Setting it to scale down but stay vertically centered on the left, fading icon out
    scrollTl.to(statCardsRef.current, {
      opacity: 0,
      duration: 0.5
    }, "takiev-collapse");

    scrollTl.to(takievWordsRef.current, {
      opacity: 0,
      x: -20,
      skewX: -7,
      duration: 0.5,
      stagger: -0.05
    }, "takiev-collapse");

    // Just scale down and move slightly to the top-left rather than extreme top
    scrollTl.to(takievWrapRef.current, {
      scale: 0.7,
      top: "15%", // Moving to top-left area to make room for ФИНАНС
      left: "10%",
      transformOrigin: "left center",
      duration: 1.5,
      ease: "power3.inOut"
    }, "takiev-collapse");

    // SCENE 2: PHASE B (ФИНАНС Reveal in center)
    scrollTl.fromTo(finansWrapRef.current,
      { autoAlpha: 0, display: "none", top: "50%", left: "50%", xPercent: -50, yPercent: -50 },
      { autoAlpha: 1, display: "flex", duration: 0.1 }
    );

    scrollTl.from(finansLettersRef.current, {
      opacity: 0,
      scale: 0.5,
      stagger: 0.1,
      fontVariationSettings: "'wght' 300, 'wdth' 125",
      duration: 1,
      ease: "power2.out"
    }, "finans-in");

    scrollTl.to(finansLettersRef.current, {
      fontVariationSettings: "'wght' 900, 'wdth' 125",
      duration: 1,
    }, "finans-in+=0.5");

    // Sentences appearing with 20vh whitespace breathing room
    scrollTl.fromTo(sentencesWrapRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "finans-in+=1"
    );
    scrollTl.fromTo(sentence1Ref.current, 
      { opacity: 0, filter: "blur(5px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1 },
      "finans-in+=1.2"
    );
    scrollTl.fromTo(sentence2Ref.current, 
      { opacity: 0, filter: "blur(5px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1 },
      "finans-in+=1.7"
    );

    // Pause for reading
    scrollTl.to({}, { duration: 1 });

    // SCENE 3: Final Resolution
    // Hide large components smoothly
    scrollTl.to([takievWrapRef.current, finansWrapRef.current], {
      opacity: 0,
      duration: 1
    }, "scene3-start");
    
    scrollTl.to(sentencesWrapRef.current, {
      y: "-15vh", // Move sentences up to center
      scale: 1.1,
      duration: 1.5,
      ease: "cinematic"
    }, "scene3-start");

    // Reveal Tag
    scrollTl.fromTo(finalTagRef.current, 
      { autoAlpha: 0, y: -20, letterSpacing: "0.1em" },
      { autoAlpha: 1, y: 0, letterSpacing: "0.4em", duration: 1.5, ease: "power2.out" },
      "scene3-start+=0.5"
    );

    // Reveal Buttons Staggered (Blog and About)
    scrollTl.fromTo(finalButtonsWrapRef.current,
      { autoAlpha: 0, display: "none" },
      { autoAlpha: 1, display: "flex", duration: 0.1 },
      "scene3-start+=1"
    );

    scrollTl.fromTo([btnBlogRef.current, btnAboutRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "back.out(1.7)" },
      "scene3-start+=1"
    );

    // End of pin.

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative bg-background text-white"
      style={{
        backgroundColor: "#40514E"
      }}
    >
      {/* --- PIN CONTAINER --- */}
      <div ref={pinWrapRef} className="h-screen w-full relative overflow-hidden">
        
        {/* ============================== */}
        {/* SCENE 1: THE FIRST FOLD        */}
        {/* ============================== */}
        
        {/* Split screen background video - Increased width, cropped bottom */}
        <div
            ref={videoWrapRef}
            className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0 overflow-hidden"
        >
            <video
                ref={videoRef}
                className="w-full h-[110%] object-cover object-top"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/firm-logo/hero-video/hero-section-video-2.mp4" type="video/mp4" />
            </video>
            {/* Horizontal gradient blend: left edge of video dissolves into bg */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #40514E 0%, rgba(64,81,78,0.92) 10%, rgba(64,81,78,0.55) 28%, rgba(64,81,78,0.18) 52%, rgba(64,81,78,0.04) 72%, transparent 92%)'
              }}
            />
            {/* Top + bottom vignette for cinematic depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(64,81,78,0.5) 0%, transparent 25%, transparent 70%, rgba(64,81,78,0.55) 100%)'
              }}
            />
        </div>

        {/* Scene 1 — absolute layout, no grid */}
        <div ref={leftColRef} className="absolute inset-0 z-10 pointer-events-none">

          {/* Atmospheric glow centered on heading */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 65% at 50% 44%, rgba(64,81,78,0.65) 0%, rgba(64,81,78,0.28) 45%, transparent 72%)',
              filter: 'blur(32px)',
            }}
          />

          {/* H1 — centered in viewport */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-5vh' }}>
            <div className="text-center px-4 pointer-events-auto relative z-20">
              <h1
                ref={h1Ref}
                className="text-fluid-hero leading-[1.1] text-white tracking-tight"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontStretch: "125%",
                  textShadow: '0 2px 24px rgba(0,0,0,0.75), 0 0 80px rgba(0,0,0,0.35)',
                }}
              >
                ИЗБЕРИ СВОЯ<br />
                <span
                  className="italic text-primary"
                  style={{ fontVariationSettings: "'wght' 900, 'wdth' 125", fontWeight: 900, fontStretch: "125%" }}
                >Доверен</span><br />
                <span
                  style={{ fontVariationSettings: "'wght' 900, 'wdth' 125", fontWeight: 900, fontStretch: "125%" }}
                >БИЗНЕС ПАРТНЬОР</span>
              </h1>
            </div>
          </div>

          {/* Buttons — left of center axis */}
          <div
            ref={scene1BtnWrapRef}
            className="absolute bottom-[18%] md:bottom-[22%] left-[6%] md:left-[14%] flex flex-col sm:flex-row gap-4 pointer-events-auto z-20"
          >
            {/* Primary — text-flip */}
            <Link
              href="/kontakti"
              className="group relative overflow-hidden rounded-full px-8 py-4 bg-primary text-dark font-bold border-2 border-primary hover:bg-transparent hover:text-primary transition-colors duration-300 shadow-xl"
            >
              <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full text-sm tracking-wide">
                Изпрати запитване
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 text-sm tracking-wide">
                Изпрати запитване
              </span>
            </Link>

            {/* Secondary — text-flip */}
            <Link
              href="/uslugi"
              className="group relative overflow-hidden rounded-full px-7 py-4 border border-white/25 text-white hover:border-white/60 transition-colors duration-300 backdrop-blur-sm bg-black/10 flex items-center gap-3 shadow-lg"
            >
              <Play className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" />
              <span className="relative overflow-hidden inline-block">
                <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full text-sm font-medium tracking-wide">
                  Нашите услуги
                </span>
                <span className="absolute inset-0 flex items-center translate-y-full transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 text-sm font-medium tracking-wide">
                  Нашите услуги
                </span>
              </span>
            </Link>
          </div>

        </div>

        {/* Scroll indicator Bottom */}
        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Скролни надолу</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>


        {/* ============================== */}
        {/* SCENE 2: THE DEEP DIVE         */}
        {/* ============================== */}
        
        {/* Phase A wrapper */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">

          {/* Phase A: ТАКИЕВ - Initially hidden */}
          <div
            ref={takievWrapRef}
            className="absolute flex-col gap-3 pointer-events-auto"
            style={{ visibility: 'hidden' }}
          >
            {acronymFirst.map((item, i) => (
              <div key={item.letter} className="flex items-center" style={{ gap: "0.6em" }}>
                {/* Tilt wrapper — GSAP animates the inner span, wrapper holds static skew */}
                <div style={{ display: "inline-block", transform: "skewX(-6deg)", transformOrigin: "left center" }}>
                  <span
                    ref={(el) => { takievLettersRef.current[i] = el; }}
                    className="text-fluid-2xl md:text-fluid-hero text-white inline-block"
                    style={{
                      fontFamily: "'Hubot Sans'",
                      fontVariationSettings: "'wght' 900, 'wdth' 125",
                    }}
                  >
                    {item.letter}
                  </span>
                </div>
                {/* Word — GSAP animates opacity/x/skewX */}
                <span
                  ref={(el) => { takievWordsRef.current[i] = el; }}
                  className="inline-block"
                  style={{
                    fontFamily: "'Hubot Sans', sans-serif",
                    fontVariationSettings: "'wght' 300, 'wdth' 100",
                    fontStyle: "italic",
                    fontSize: "clamp(0.85rem, 1.4vw, 1.3rem)",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {item.word.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Phase A: Stat cards — replace icon.svg */}
          <div
            ref={statCardsRef}
            className="absolute top-1/2 right-[8%] -translate-y-1/2 flex flex-col gap-5"
            style={{ opacity: 0 }}
          >
            <div className="rounded-2xl border border-white/15 backdrop-blur-sm bg-white/[0.04] p-6 min-w-[185px]">
              <div
                className="leading-none text-white mb-2"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 5.5vw, 4.5rem)",
                }}
              >
                150+
              </div>
              <div className="text-white/45 text-xs tracking-[0.18em] uppercase">Доволни клиенти</div>
            </div>

            <div className="rounded-2xl border border-primary/20 backdrop-blur-sm bg-primary/[0.05] p-6 min-w-[185px]">
              <div
                className="leading-none text-primary mb-2"
                style={{
                  fontFamily: "'Hubot Sans', sans-serif",
                  fontVariationSettings: "'wght' 900, 'wdth' 125",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)",
                }}
              >
                2021
              </div>
              <div className="text-white/45 text-xs tracking-[0.18em] uppercase">Опит до днес</div>
            </div>
          </div>

        </div>

        {/* Phase B: ФИНАНС - Initially hidden */}
        <div 
          ref={finansWrapRef} 
          className="absolute flex-col items-center justify-center gap-1 z-30 w-full"
          style={{ visibility: 'hidden' }} // GSAP centers it via top/left 50%
        >
          {acronymSecond.map((item, i) => (
            <span 
              key={`${item.letter}-${i}`}
              ref={(el) => { finansLettersRef.current[i] = el; }}
              className="text-fluid-xl md:text-[8rem] leading-[0.8] text-white opacity-20"
              style={{ 
                fontFamily: "'Hubot Sans'", 
                fontVariationSettings: "'wght' 300, 'wdth' 125",
                display: "inline-block"
              }}
            >
              {item.letter}
            </span>
          ))}
        </div>

        {/* Special Sentences overlapping Phase B */}
        <div 
          ref={sentencesWrapRef}
          className="absolute inset-x-0 bottom-[15vh] md:bottom-[20vh] flex flex-col items-center justify-center text-center z-40 px-6 max-w-4xl mx-auto"
          style={{ visibility: 'hidden' }}
        >
          <p ref={sentence1Ref} className="text-primary text-fluid-lg md:text-fluid-2xl font-light mb-4" style={{ fontVariationSettings: "'wght' 300" }}>
            Нашият екип ще осигури <span className="font-bold text-white" style={{ fontVariationSettings: "'wght' 700" }}>сигурност и защита</span>.
          </p>
          <p ref={sentence2Ref} className="text-white/80 text-fluid-base md:text-fluid-lg font-light max-w-2xl mx-auto">
            Счетоводството е <span className="italic text-primary">движеща сила</span> за всеки успешен бизнес.
          </p>
        </div>


        {/* ============================== */}
        {/* SCENE 3: FINAL RESOLUTION      */}
        {/* ============================== */}
        
        {/* The minimal Tag at top */}
        <div 
          ref={finalTagRef}
          className="absolute top-12 w-full text-center z-50 text-white/50 text-sm md:text-base uppercase"
          style={{ visibility: 'hidden' }}
        >
          [ ТАКИЕВ ФИНАНС ]
        </div>

        {/* Button Cluster at Bottom */}
        <div 
          ref={finalButtonsWrapRef}
          className="absolute inset-x-0 bottom-16 md:bottom-24 flex-col md:flex-row items-center justify-center gap-6 z-50"
          style={{ visibility: 'hidden' }}
        >
          {/* Tertiary - Blog */}
          <Link 
            href="/blog"
            ref={btnBlogRef}
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors border-b border-white/20 pb-1"
          >
            <span className="text-base font-medium relative overflow-hidden uppercase tracking-widest">
              Блог
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Tertiary - About Us */}
          <Link 
            href="/za-nas"
            ref={btnAboutRef}
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors border-b border-white/20 pb-1 ml-4"
          >
            <span className="text-base font-medium relative overflow-hidden uppercase tracking-widest">
              За нас
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
