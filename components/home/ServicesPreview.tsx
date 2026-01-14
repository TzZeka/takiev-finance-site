"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Service } from "@/types";

interface ServicesPreviewProps {
  services: Service[];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const serviceItems = [
    {
      name: "Счетоводни услуги",
      icon: "chart",
      description: "Пълно счетоводно обслужване",
    },
    {
      name: "Данъчни консултации",
      icon: "calculator",
      description: "Експертни данъчни решения",
    },
    {
      name: "Правни услуги",
      icon: "scale",
      description: "Правна защита и съвети",
    },
    {
      name: "Регистрация на дружества",
      icon: "building",
      description: "Бърза и надеждна регистрация",
    },
  ];

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "chart":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "calculator":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "scale":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      case "building":
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const inView = rect.top < windowHeight && rect.bottom > 0;

      if (inView) {
        const progress = Math.min(
          Math.max(
            (windowHeight - rect.top) / (windowHeight + rect.height),
            0
          ),
          1
        );

        const scale = 1 + progress * 0.15;
        imageRef.current.style.transform = `scale(${scale})`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#363B39] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Background Image with Parallax and Blur */}
      <div className="absolute inset-0 opacity-20">
        <div ref={imageRef} className="relative w-full h-full transition-transform duration-700 ease-out">
          <Image
            src="/firm-logo/pictures/office.png"
            alt="Офис"
            fill
            className="object-cover blur-sm"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title with animated underline */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Нашите <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#363B39] to-[#19BFB7]">услуги</span>
          </h2>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#363B39] to-transparent"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {serviceItems.map((service, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 transition-all duration-500 hover:border-[#19BFB7]/60 hover:brightness-110">
                {/* Icon */}
                <div className="relative mb-6 z-10">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-all duration-300 text-gray-300 group-hover:text-white">
                    {renderIcon(service.icon)}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[#19BFB7]">
                    {service.name}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#363B39] rounded-full animate-ping"></div>
                <div className="absolute top-1/4 right-0 w-2 h-2 bg-[#19BFB7] rounded-full animate-ping delay-200"></div>
                <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-[#363B39] rounded-full animate-ping delay-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#363B39]/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#19BFB7]/20 rounded-full animate-spin-slow"></div>

        {/* Button to all services */}
        <div className="text-center mt-16">
          <a
            href="/uslugi"
            className="group/btn inline-flex items-center px-8 py-4 border-2 border-[#19BFB7] text-[#19BFB7] font-semibold rounded-xl transition-all duration-300 hover:bg-[#19BFB7] hover:text-white"
          >
            Всички услуги
            <svg
              className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
