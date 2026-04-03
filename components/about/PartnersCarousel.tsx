"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback, RefObject, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { Globe } from "lucide-react";

const partners = [
  {
    name: "Portal Schetovodstvo",
    logo: "/firm-logo/partners/PortalSchetovodstvo.png",
    description: "Водещ портал за счетоводство и данъци в България",
    url: "https://www.portalschetovodstvo.bg/",
  },
  {
    name: "Finance Academy",
    logo: "/firm-logo/partners/Finance Academy.png",
    description: "Професионално обучение по счетоводство и финанси",
    url: "https://financeacademy.bg/",
  },
  {
    name: "Zaharinova Nexia",
    logo: "/firm-logo/partners/Zaharinova_Nexia_logo-300x128.png",
    description: "Водеща одиторска компания в България",
    url: "https://zaharinovanexia.com/",
  },
  {
    name: "Nula.bg",
    logo: "/firm-logo/partners/NULA.BG.png",
    description: "Единствената платформа за онлайн счетоводен софтуер в България",
    url: "https://nula.bg/",
  },
];

const ITEMS = [...partners, ...partners, ...partners];
const SPEED = 0.65;
const GAP = 20; // gap-5 = 1.25rem = 20px
const FADE_ZONE = 260; // px from edge where card starts fading

function PartnerCard({
  partner,
  containerRef,
}: {
  partner: (typeof partners)[0];
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(1);
  const scale = useMotionValue(1);
  const [tapped, setTapped] = useState(false);

  useAnimationFrame(() => {
    if (!cardRef.current || !containerRef.current) return;
    const card = cardRef.current.getBoundingClientRect();
    const box = containerRef.current.getBoundingClientRect();

    let progress = 1;
    const fromLeft = card.right - box.left;
    const fromRight = box.right - card.left;

    if (fromLeft < FADE_ZONE) {
      progress = Math.max(0, fromLeft / FADE_ZONE);
    } else if (fromRight < FADE_ZONE) {
      progress = Math.max(0, fromRight / FADE_ZONE);
    }

    opacity.set(progress);
    scale.set(0.88 + 0.12 * progress);
  });

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-72 relative pb-14"
      style={{ opacity, scale }}
      whileHover="hovered"
      animate={tapped ? "hovered" : "rest"}
      initial="rest"
      onTap={() => setTapped(t => !t)}
    >
      {/* Card */}
      <div
        className="flex flex-col items-center gap-6 px-6 py-8 rounded-3xl"
        style={{ backgroundColor: "#40514E" }}
      >
        {/* Elliptical logo container */}
        <div className="w-56 h-[6.5rem] rounded-full overflow-hidden bg-white/95 flex items-center justify-center p-5">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={180}
            height={72}
            className="object-contain w-full h-full"
            draggable={false}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h3
            className="text-xl text-white"
            style={{
              fontFamily: "'Hubot Sans', sans-serif",
              fontVariationSettings: "'wght' 720, 'wdth' 105",
              fontWeight: 720,
            }}
          >
            {partner.name}
          </h3>
          <p
            className="text-white/85 text-sm"
            style={{
              fontFamily: "'Mona Sans', sans-serif",
              fontVariationSettings: "'wght' 400, 'wdth' 95",
              fontWeight: 400,
              lineHeight: 1.55,
            }}
          >
            {partner.description}
          </p>
        </div>
      </div>

      {/* Button — slides in below card on hover */}
      <motion.div
        variants={{
          rest: { opacity: 0, y: -6 },
          hovered: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 flex justify-center"
      >
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#40514E] text-white text-sm border border-white/20 hover:bg-primary hover:border-primary transition-colors duration-250"
          style={{
            fontFamily: "'Mona Sans', sans-serif",
            fontVariationSettings: "'wght' 500, 'wdth' 100",
            fontWeight: 500,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Globe className="w-3.5 h-3.5" />
          Посетете сайта
        </a>
      </motion.div>
    </motion.div>
  );
}

export function PartnersCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const singleWidth = useRef(0);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragStartClientX = useRef(0);
  const dragStartMotionX = useRef(0);
  const velocityRef = useRef(0);
  const lastClientX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const sw = (trackRef.current.scrollWidth + GAP) / 3;
      singleWidth.current = sw;
      x.set(-sw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  const wrap = useCallback((val: number) => {
    const sw = singleWidth.current;
    if (!sw) return val;
    if (val < -2 * sw) return val + sw;
    if (val > 0) return val - sw;
    return val;
  }, []);

  useAnimationFrame((_, delta) => {
    if (isDragging.current) return;
    if (Math.abs(velocityRef.current) > 0.08) {
      velocityRef.current *= 0.9;
      x.set(wrap(x.get() + velocityRef.current));
      return;
    }
    velocityRef.current = 0;
    if (isPaused.current) return;
    const step = SPEED * (delta / 16.667);
    x.set(wrap(x.get() - step));
  });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      velocityRef.current = 0;
      dragStartClientX.current = e.clientX;
      dragStartMotionX.current = x.get();
      lastClientX.current = e.clientX;
      lastTime.current = performance.now();
    },
    [x]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) velocityRef.current = ((e.clientX - lastClientX.current) / dt) * 16;
      lastClientX.current = e.clientX;
      lastTime.current = now;
      x.set(wrap(dragStartMotionX.current + (e.clientX - dragStartClientX.current)));
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [wrap, x]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      velocityRef.current = 0;
      dragStartClientX.current = e.touches[0].clientX;
      dragStartMotionX.current = x.get();
      lastClientX.current = e.touches[0].clientX;
      lastTime.current = performance.now();
    },
    [x]
  );

  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) velocityRef.current = ((e.touches[0].clientX - lastClientX.current) / dt) * 16;
      lastClientX.current = e.touches[0].clientX;
      lastTime.current = now;
      x.set(wrap(dragStartMotionX.current + (e.touches[0].clientX - dragStartClientX.current)));
    };
    const onEnd = () => { isDragging.current = false; };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [wrap, x]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex gap-5 w-max py-6"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {ITEMS.map((partner, i) => (
          <PartnerCard key={i} partner={partner} containerRef={containerRef} />
        ))}
      </motion.div>
    </div>
  );
}
