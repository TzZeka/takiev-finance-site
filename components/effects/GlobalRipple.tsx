"use client";
import { useEffect } from "react";

export function GlobalRipple() {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes _gr {
        0%   { width: 0;    height: 0;    opacity: 0.60; }
        100% { width: 72px; height: 72px; opacity: 0;    }
      }
      ._gr_dot {
        position: fixed;
        border-radius: 50%;
        background: rgba(25,191,183,0.24);
        pointer-events: none;
        transform: translate(-50%,-50%);
        z-index: 10000;
        animation: _gr 0.52s cubic-bezier(0,0,0.2,1) forwards;
      }
    `;
    document.head.appendChild(styleEl);

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a, button, [role="button"]')) return;

      const dot = document.createElement("span");
      dot.className = "_gr_dot";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 560);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      styleEl.remove();
    };
  }, []);

  return null;
}
