"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// ── Font helpers ──────────────────────────────────────────────────────────────
const cg = (wght = 700, italic = false): React.CSSProperties => ({
  fontFamily: "'Cormorant Garamond', serif",
  fontVariationSettings: `'wght' ${wght}`,
  fontWeight: wght,
  fontStyle: italic ? "italic" : "normal",
});

const mona = (wght = 420): React.CSSProperties => ({
  fontFamily: "'Mona Sans', sans-serif",
  fontVariationSettings: `'wght' ${wght}, 'wdth' 100`,
  fontWeight: wght,
});

// ─── Mobile: stacked scroll reveals ──────────────────────────────────────────
function MobileCinematic() {
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <section
      className="relative w-full py-24 px-6 overflow-hidden md:hidden"
      style={{ backgroundColor: "#060e0c" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/firm-logo/scene/ofice-scene-bcgr.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ filter: "blur(2px) brightness(0.58)", transform: "scale(1.05)" }}
          quality={80}
        />
      </div>
      {/* Dark contrast overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(4,10,9,0.52)" }}
      />
      {/* Teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 55% at 50% 40%, rgba(25,191,183,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-20 max-w-sm mx-auto text-center">

        {/* Scene 1 — Bold upright */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease }}
          className="text-[2.8rem] leading-[1.08]"
          style={{ ...cg(700), color: "white" }}
        >
          Успешният бизнес
          <br />
          <span style={{ color: "#19BFB7" }}>не се гради по случайност.</span>
        </motion.h2>

        {/* Scene 2 — Medium upright + Light italic subtext */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="flex items-baseline gap-3">
            <span
              style={{
                ...cg(700),
                fontSize: "3.2rem",
                color: "#19BFB7",
                lineHeight: 1,
              }}
            >
              2021
            </span>
            <span
              style={{
                ...cg(400, true),
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
              }}
            >
              От тогава до днес
            </span>
          </div>
          <p
            className="mt-2 text-[1.55rem] leading-[1.35]"
            style={{ ...cg(600), color: "white" }}
          >
            Такиев Финанс е до вас на всяка стъпка
          </p>
          <p
            className="mt-3 text-[1.05rem] leading-[1.6]"
            style={{ ...cg(400, true), color: "rgba(255,255,255,0.45)" }}
          >
            от първия документ до стратегическото решение.
          </p>
        </motion.div>

        {/* Scene 3 — Bold stagger, three services */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          {[
            { text: "Счетоводство.", color: "white", wght: 700 },
            { text: "Данъци.", color: "rgba(255,255,255,0.50)", wght: 600 },
            { text: "Консултации.", color: "#19BFB7", wght: 700 },
          ].map(({ text, color, wght }, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, ease, delay: i * 0.13 }}
              className="text-[2.1rem] leading-tight"
              style={{ ...cg(wght), color }}
            >
              {text}
            </motion.span>
          ))}
        </div>

        {/* Scene 4 — Stat: 150+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="leading-none"
            style={{ ...cg(700), fontSize: "7rem", color: "#19BFB7" }}
          >
            150+
          </span>
          <span
            className="text-lg"
            style={{ ...mona(460), color: "rgba(255,255,255,0.58)" }}
          >
            компании ни се довериха.
          </span>
        </motion.div>

        {/* Scene 5 — Bold italic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease }}
          className="flex flex-col items-center gap-7"
        >
          <h2
            className="text-[2.8rem] leading-[1.1]"
            style={{ ...cg(700, true), color: "white" }}
          >
            Доверете ни се и <span style={{ color: "#19BFB7" }}>Вие.</span>
          </h2>
          <Link
            href="/kontakti"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-sm transition-all duration-300 hover:bg-primary hover:border-primary"
            style={{
              ...mona(520),
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            Свържете се с нас
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Desktop: GSAP pinned cinematic scroll ────────────────────────────────────
export function CinematicScrollSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Scene wrappers — opacity only (text elements carry the y motion)
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);
  const s5Ref = useRef<HTMLDivElement>(null);

  // Scene 1 — two lines
  const s1L1 = useRef<HTMLSpanElement>(null);
  const s1L2 = useRef<HTMLSpanElement>(null);

  // Scene 2 — year block, main text, sub text
  const s2Year  = useRef<HTMLDivElement>(null);
  const s2Main  = useRef<HTMLParagraphElement>(null);
  const s2Sub   = useRef<HTMLParagraphElement>(null);

  // Scene 3 — three service words
  const s3w1 = useRef<HTMLSpanElement>(null);
  const s3w2 = useRef<HTMLSpanElement>(null);
  const s3w3 = useRef<HTMLSpanElement>(null);

  // Scene 4 — stat + subtitle
  const s4Stat = useRef<HTMLDivElement>(null);
  const s4Sub  = useRef<HTMLDivElement>(null);

  // Scene 5 — title line 1, line 2, cta
  const s5L1  = useRef<HTMLSpanElement>(null);
  const s5L2  = useRef<HTMLSpanElement>(null);
  const s5Cta = useRef<HTMLDivElement>(null);

  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;

      // Scene containers: invisible, no y (text elements carry the motion)
      gsap.set(
        [s1Ref.current, s2Ref.current, s3Ref.current, s4Ref.current, s5Ref.current],
        { autoAlpha: 0 }
      );

      // Per-element initial states
      gsap.set([s1L1.current, s1L2.current], { opacity: 0, y: 65 });
      gsap.set([s2Year.current, s2Main.current, s2Sub.current], { opacity: 0, y: 50 });
      gsap.set([s3w1.current, s3w2.current, s3w3.current], { opacity: 0, y: 70 });
      gsap.set(s4Stat.current, { opacity: 0, scale: 0.6, y: 30 });
      gsap.set(s4Sub.current, { opacity: 0, y: 30 });
      gsap.set(s5L1.current, { opacity: 0, x: -70 });
      gsap.set(s5L2.current, { opacity: 0 });
      gsap.set(s5Cta.current, { opacity: 0, x: -50 });

      const E = "power3.out";
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=480%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // ── SCENE 1 ────────────────────────────────────────────────────
      tl.set(s1Ref.current, { autoAlpha: 1 });
      tl.to(s1L1.current, { opacity: 1, y: 0, duration: 0.9, ease: E });
      tl.to(s1L2.current, { opacity: 1, y: 0, duration: 0.9, ease: E }, "-=0.5");
      tl.to({}, { duration: 2.2 });
      tl.to(s1Ref.current, { autoAlpha: 0, y: -60, duration: 0.8, ease: "power2.in" });
      tl.set(s1Ref.current, { y: 0 }); // reset for re-entry safety

      // ── SCENE 2 ────────────────────────────────────────────────────
      tl.set(s2Ref.current, { autoAlpha: 1 });
      tl.to(s2Year.current,  { opacity: 1, y: 0, duration: 0.9, ease: E });
      tl.to(s2Main.current,  { opacity: 1, y: 0, duration: 0.9, ease: E }, "-=0.35");
      tl.to(s2Sub.current,   { opacity: 1, y: 0, duration: 0.7, ease: E }, "-=0.35");
      tl.to({}, { duration: 2.2 });
      tl.to(s2Ref.current, { autoAlpha: 0, y: -60, duration: 0.8, ease: "power2.in" });
      tl.set(s2Ref.current, { y: 0 });

      // ── SCENE 3 ────────────────────────────────────────────────────
      tl.set(s3Ref.current, { autoAlpha: 1 });
      tl.to(s3w1.current, { opacity: 1, y: 0, duration: 0.85, ease: E });
      tl.to(s3w2.current, { opacity: 1, y: 0, duration: 0.85, ease: E }, "-=0.4");
      tl.to(s3w3.current, { opacity: 1, y: 0, duration: 0.85, ease: E }, "-=0.4");
      tl.to({}, { duration: 2.2 });
      tl.to(s3Ref.current, { autoAlpha: 0, y: -60, duration: 0.8, ease: "power2.in" });
      tl.set(s3Ref.current, { y: 0 });

      // ── SCENE 4 ────────────────────────────────────────────────────
      tl.set(s4Ref.current, { autoAlpha: 1 });
      tl.to(s4Stat.current, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "back.out(1.2)" });
      tl.to(s4Sub.current,  { opacity: 1, y: 0, duration: 0.7, ease: E }, "-=0.4");
      tl.to({}, { duration: 2.2 });
      tl.to(s4Ref.current, { autoAlpha: 0, y: -60, duration: 0.8, ease: "power2.in" });
      tl.set(s4Ref.current, { y: 0 });

      // ── SCENE 5 ────────────────────────────────────────────────────
      tl.set(s5Ref.current, { autoAlpha: 1 });
      tl.to(s5L1.current,  { opacity: 1, x: 0, duration: 1.0, ease: E });
      tl.to(s5Cta.current, { opacity: 1, x: 0, duration: 0.8, ease: E }, "-=0.3");
      tl.to({}, { duration: 2.5 });
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* ── Desktop ───────────────────────────────────────────────────── */}
      <section
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden hidden md:block"
        style={{ backgroundColor: "#060e0c" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/firm-logo/scene/ofice-scene-bcgr.png"
            alt=""
            fill
            className="object-cover object-center"
            style={{ filter: "blur(3px) brightness(0.62)", transform: "scale(1.05)" }}
            quality={80}
            priority
          />
        </div>
        {/* Dark contrast overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(4,10,9,0.50)" }}
        />
        {/* Teal glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(25,191,183,0.07) 0%, transparent 65%)",
          }}
        />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.07] z-10">
          <div
            ref={progressRef}
            className="h-full bg-primary origin-left"
          />
        </div>

        {/* ── SCENE 1 ─────────────────────────────────────────────────── */}
        <div
          ref={s1Ref}
          className="absolute inset-0 flex items-center justify-center px-8 text-center"
        >
          <h2 className="leading-[1.1]" style={{ ...cg(700), fontSize: "clamp(3rem,6.5vw,6rem)" }}>
            <span
              ref={s1L1}
              className="block"
              style={{ color: "white", display: "block" }}
            >
              Успешният бизнес
            </span>
            <span
              ref={s1L2}
              className="block"
              style={{ color: "#19BFB7", display: "block" }}
            >
              не се гради по случайност.
            </span>
          </h2>
        </div>

        {/* ── SCENE 2 ─────────────────────────────────────────────────── */}
        <div
          ref={s2Ref}
          className="absolute inset-0 flex items-center justify-center px-8 md:px-28 lg:px-44 text-center"
        >
          <div className="flex flex-col items-center gap-5">
            <div ref={s2Year} className="flex items-baseline gap-4">
              <span
                style={{
                  ...cg(700),
                  fontSize: "clamp(4rem,7vw,6.5rem)",
                  color: "#19BFB7",
                  lineHeight: 1,
                }}
              >
                2021
              </span>
              <span
                style={{
                  ...cg(400, true),
                  fontSize: "clamp(0.85rem,1.3vw,1.1rem)",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.12em",
                }}
              >
                От тогава до днес
              </span>
            </div>
            <p
              ref={s2Main}
              className="leading-[1.2]"
              style={{
                ...cg(600),
                fontSize: "clamp(2rem,4vw,3.75rem)",
                color: "white",
              }}
            >
              Такиев Финанс е до вас на всяка стъпка
            </p>
            <p
              ref={s2Sub}
              style={{
                ...cg(400, true),
                fontSize: "clamp(1.05rem,1.8vw,1.65rem)",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.55,
              }}
            >
              от първия документ до стратегическото решение.
            </p>
          </div>
        </div>

        {/* ── SCENE 3 ─────────────────────────────────────────────────── */}
        <div
          ref={s3Ref}
          className="absolute inset-0 flex items-center justify-start pl-[12vw] md:pl-[10vw] lg:pl-[13vw]"
        >
          <div className="flex flex-col items-start gap-1">
            <span
              ref={s3w1}
              className="leading-none"
              style={{ ...cg(700), fontSize: "clamp(3rem,7.5vw,7rem)", color: "white" }}
            >
              Счетоводство.
            </span>
            <span
              ref={s3w2}
              className="leading-none"
              style={{ ...cg(500), fontSize: "clamp(3rem,7.5vw,7rem)", color: "rgba(255,255,255,0.45)" }}
            >
              Данъци.
            </span>
            <span
              ref={s3w3}
              className="leading-none"
              style={{ ...cg(700), fontSize: "clamp(3rem,7.5vw,7rem)", color: "#19BFB7" }}
            >
              Консултации.
            </span>
          </div>
        </div>

        {/* ── SCENE 4 ─────────────────────────────────────────────────── */}
        <div
          ref={s4Ref}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-8"
        >
          <div
            ref={s4Stat}
            className="leading-none"
            style={{ ...cg(700), fontSize: "clamp(7rem,20vw,17rem)", color: "#19BFB7" }}
          >
            150+
          </div>
          <div
            ref={s4Sub}
            style={{ ...cg(500, true), fontSize: "clamp(1.2rem,2.5vw,2.2rem)", color: "rgba(255,255,255,0.60)" }}
          >
            компании ни се довериха.
          </div>
        </div>

        {/* ── SCENE 5 ─────────────────────────────────────────────────── */}
        <div
          ref={s5Ref}
          className="absolute inset-0 flex flex-col items-center justify-center gap-10 text-center px-8"
        >
          <h2
            className="leading-[1.05]"
            style={{ ...cg(700, true), fontSize: "clamp(3.5rem,9vw,8.5rem)" }}
          >
            <span ref={s5L1} className="block" style={{ color: "white", display: "block" }}>
              Доверете ни се и <span style={{ color: "#19BFB7" }}>Вие.</span>
            </span>
            <span ref={s5L2} style={{ display: "none" }} />
          </h2>

          <div ref={s5Cta}>
            <Link
              href="/kontakti"
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full text-white transition-all duration-300 hover:bg-primary hover:border-primary"
              style={{
                ...mona(520),
                fontSize: "1rem",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
            >
              Свържете се с нас
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mobile ────────────────────────────────────────────────────── */}
      <MobileCinematic />
    </>
  );
}
