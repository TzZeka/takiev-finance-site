"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Building2 } from "lucide-react";
import { getImageUrl } from "@/lib/sanity/client";
import type { Client } from "@/types";

interface ClientsSectionProps {
  clients: Client[];
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (clients.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Vertical lines pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-[#19BFB7]"
            style={{
              left: `${i * 5}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#19BFB7] tracking-wider uppercase flex items-center justify-center gap-2">
              <Building2 className="w-4 h-4" />
              Партньори
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Нашите <span className="text-[#19BFB7]">партньори</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Сътрудничим с водещи компании за цялостни решения на Вашия бизнес
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {clients.map((client, index) => (
            <div
              key={client._id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="group relative flex items-center justify-center p-6 h-32 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-lg hover:border-[#19BFB7] transition-all duration-300 hover:shadow-lg">
                {/* Logo */}
                <div className="relative w-full h-20">
                  <Image
                    src={getImageUrl(client.logo)}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${clients.length * 50 + 200}ms` }}>
          {[
            { number: `${clients.length}+`, label: "Партньори" },
            { number: "10+", label: "Индустрии" },
            { number: "5+", label: "Години сътрудничество" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="text-4xl md:text-5xl font-bold text-[#19BFB7] mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
