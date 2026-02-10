"use client";

import { useRef, useEffect } from "react";

const COLOR = "25, 191, 183";

const SENTENCES = [
  { lat: "In numeris fides", bg: "В числата е доверието", x: 8, y: 18, rot: -3, size: 16 },
  { lat: "Ubi ordo ibi copia", bg: "Където има ред, има изобилие", x: 70, y: 12, rot: 2, size: 15 },
  { lat: "Vigilantia", bg: "Бдителност", x: 85, y: 45, rot: -2, size: 19 },
  { lat: "Ratio regit vis", bg: "Разумът управлява силата", x: 5, y: 58, rot: 4, size: 15 },
  { lat: "Aequitas", bg: "Равновесие", x: 40, y: 80, rot: -3, size: 18 },
  { lat: "Pacta sunt servanda", bg: "Договорите трябва да се спазват", x: 62, y: 78, rot: 2, size: 14 },
  { lat: "Festina lente", bg: "Бързай бавно", x: 18, y: 38, rot: -5, size: 17 },
  { lat: "Ex nihilo nihil fit", bg: "От нищо нищо не става", x: 76, y: 58, rot: 3, size: 14 },
  { lat: "Lux in tenebris", bg: "Светлина в тъмнината", x: 48, y: 15, rot: -1, size: 16 },
  { lat: "Scientia potentia est", bg: "Знанието е сила", x: 28, y: 68, rot: 3, size: 15 },
];

function getResponsiveValues(width: number) {
  if (width < 480) {
    return { cell: 35, gridRadius: 130, textRadius: 150, sizeFactor: 0.7 };
  }
  if (width < 768) {
    return { cell: 42, gridRadius: 160, textRadius: 180, sizeFactor: 0.82 };
  }
  return { cell: 55, gridRadius: 200, textRadius: 220, sizeFactor: 1 };
}

export function BlogHeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const dpr = window.devicePixelRatio || 1;

    // Smooth state - no React, pure mutation
    let mouseX = -1000;
    let mouseY = -1000;
    let spotX = -1000;
    let spotY = -1000;
    let angle = 0;
    let lastT = 0;
    let raf = 0;
    let rv = getResponsiveValues(window.innerWidth);

    const resize = () => {
      const r = wrapper.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      rv = getResponsiveValues(r.width);

      // Update sentence font sizes responsively
      for (let i = 0; i < SENTENCES.length; i++) {
        const el = textRefs.current[i];
        if (!el) continue;
        const s = SENTENCES[i];
        const latEl = el.firstElementChild as HTMLElement;
        const bgEl = el.lastElementChild as HTMLElement;
        if (latEl) latEl.style.fontSize = `${Math.round(s.size * rv.sizeFactor)}px`;
        if (bgEl) bgEl.style.fontSize = `${Math.round(Math.max(9, (s.size - 3) * rv.sizeFactor))}px`;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse on the whole section (parent of wrapper)
    const section = wrapper.parentElement;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    if (!isMobile && section) {
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (time: number) => {
      const dt = lastT ? (time - lastT) / 1000 : 0.016;
      lastT = time;

      const w = canvas.width;
      const h = canvas.height;
      const wCss = w / dpr;
      const hCss = h / dpr;

      ctx.clearRect(0, 0, w, h);

      if (isMobile) {
        angle += dt * 0.45;
        spotX = wCss / 2 + Math.cos(angle) * wCss * 0.32;
        spotY = hCss / 2 + Math.sin(angle * 0.65 + 0.5) * hCss * 0.28;
      } else {
        if (mouseX < -500) {
          spotX = -1000;
          spotY = -1000;
        } else {
          // Smooth lerp - constant smooth follow
          const speed = 12;
          const factor = 1 - Math.exp(-speed * dt);
          spotX += (mouseX - spotX) * factor;
          spotY += (mouseY - spotY) * factor;
        }
      }

      // Canvas coords for grid
      const sx = spotX * dpr;
      const sy = spotY * dpr;
      const rad = rv.gridRadius * dpr;
      const cell = rv.cell * dpr;
      const cols = Math.ceil(w / cell) + 1;
      const rows = Math.ceil(h / cell) + 1;

      // Base grid - single batch
      ctx.beginPath();
      for (let r = 0; r <= rows; r++) {
        const y = r * cell;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      for (let c = 0; c <= cols; c++) {
        const x = c * cell;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      ctx.strokeStyle = `rgba(${COLOR}, 0.06)`;
      ctx.lineWidth = 0.5 * dpr;
      ctx.stroke();

      // Bright segments near spotlight
      if (spotX > -500) {
        for (let r = 0; r <= rows; r++) {
          const y = r * cell;
          if (Math.abs(y - sy) > rad) continue;
          for (let c = 0; c < cols; c++) {
            const x1 = c * cell;
            const mx = x1 + cell * 0.5;
            const d = Math.sqrt((mx - sx) ** 2 + (y - sy) ** 2);
            if (d >= rad) continue;
            const t = 1 - d / rad;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x1 + cell, y);
            ctx.strokeStyle = `rgba(${COLOR}, ${t * t * 0.6})`;
            ctx.lineWidth = (0.5 + t * 1.5) * dpr;
            ctx.stroke();
          }
        }
        for (let c = 0; c <= cols; c++) {
          const x = c * cell;
          if (Math.abs(x - sx) > rad) continue;
          for (let r = 0; r < rows; r++) {
            const y1 = r * cell;
            const my = y1 + cell * 0.5;
            const d = Math.sqrt((x - sx) ** 2 + (my - sy) ** 2);
            if (d >= rad) continue;
            const t = 1 - d / rad;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y1 + cell);
            ctx.strokeStyle = `rgba(${COLOR}, ${t * t * 0.6})`;
            ctx.lineWidth = (0.5 + t * 1.5) * dpr;
            ctx.stroke();
          }
        }
        // Dots
        for (let r = 0; r <= rows; r++) {
          const y = r * cell;
          if (Math.abs(y - sy) > rad) continue;
          for (let c = 0; c <= cols; c++) {
            const x = c * cell;
            const d = Math.sqrt((x - sx) ** 2 + (y - sy) ** 2);
            if (d >= rad) continue;
            const t = 1 - d / rad;
            if (t < 0.2) continue;
            ctx.beginPath();
            ctx.arc(x, y, (1 + t * 3) * dpr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${COLOR}, ${t * t * 0.7})`;
            ctx.fill();
          }
        }
      }

      // Update text elements directly via DOM - no React re-render
      for (let i = 0; i < SENTENCES.length; i++) {
        const el = textRefs.current[i];
        if (!el) continue;
        const s = SENTENCES[i];
        const cx = (s.x / 100) * wCss;
        const cy = (s.y / 100) * hCss;
        const dist = Math.sqrt((cx - spotX) ** 2 + (cy - spotY) ** 2);
        const t = Math.max(0, 1 - dist / rv.textRadius);
        const intensity = t * t;

        const latEl = el.firstElementChild as HTMLElement;
        const bgEl = el.lastElementChild as HTMLElement;
        if (!latEl || !bgEl) continue;

        // Latin text
        const latAlpha = 0.03 + intensity * 0.97;
        if (intensity > 0.25) {
          latEl.style.color = `rgba(215, 195, 145, ${0.25 + intensity * 0.75})`;
          latEl.style.textShadow = `0 0 ${10 * intensity}px rgba(215, 195, 145, ${intensity * 0.25})`;
        } else {
          latEl.style.color = `rgba(80, 95, 100, ${latAlpha})`;
          latEl.style.textShadow = "none";
        }
        latEl.style.opacity = `${latAlpha}`;

        // Bulgarian translation - appears together with latin, slightly softer
        const bgAlpha = Math.max(0, intensity * 1.1 - 0.08);
        bgEl.style.opacity = `${bgAlpha}`;
        bgEl.style.color = `rgba(185, 175, 155, ${bgAlpha})`;
        bgEl.style.transform = `translateY(${(1 - Math.min(1, intensity * 1.3)) * 5}px)`;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (section) {
        section.removeEventListener("mousemove", onMove);
        section.removeEventListener("mouseleave", onLeave);
      }
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      {SENTENCES.map((s, i) => (
        <div
          key={i}
          ref={(el) => { textRefs.current[i] = el; }}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `rotate(${s.rot}deg)`,
          }}
        >
          <div
            className="tracking-[0.15em] whitespace-nowrap font-semibold"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: `${s.size}px`,
              opacity: 0.03,
              color: "rgba(80, 95, 100, 0.03)",
              transition: "color 0.25s, opacity 0.25s, text-shadow 0.3s",
            }}
          >
            {s.lat}
          </div>
          <div
            className="italic"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: `${Math.max(10, s.size - 3)}px`,
              opacity: 0,
              color: "rgba(185, 175, 155, 0)",
              transition: "color 0.2s, opacity 0.2s, transform 0.25s",
              transform: "translateY(5px)",
            }}
          >
            {s.bg}
          </div>
        </div>
      ))}
    </div>
  );
}
