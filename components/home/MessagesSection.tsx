"use client";

import { useEffect, useRef, useState } from "react";
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

export function MessagesSection({ messages }: MessagesSectionProps) {
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

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-background/95 backdrop-blur-sm border-b border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wider uppercase">
                Защо Такиев Финанс
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-5 md:mb-6 leading-tight">
              Защо да изберете <span className="text-primary">нас?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Нашият екип се отличава с професионализъм, иновативност и грижа към всеки клиент.
              Предоставяме цялостни счетоводни решения, които помагат на бизнеса Ви да расте и да се развива.
            </p>
          </div>

          {/* Right Column - Diagonal Elements */}
          <div className="relative mt-8 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              {messages.map((message, index) => {
                const IconComponent =
                  Icons[message.icon as keyof typeof Icons] || Icons.CheckCircle;

                return (
                  <div
                    key={message._key}
                    className={`transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-12"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="group relative flex items-center gap-4 sm:gap-6">
                      {/* Icon with diagonal background */}
                      <div className="relative flex-shrink-0 z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 transform rotate-45 scale-125 group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                          {/* @ts-ignore */}
                          <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-primary relative z-10" />
                        </div>
                      </div>

                      {/* Content with diagonal accent */}
                      <div className="flex-1 relative">
                        {/* Diagonal background accent */}
                        <div className="absolute -right-4 top-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent transform skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {message.title}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {message.description}
                          </p>
                        </div>

                        {/* Bottom diagonal line */}
                        <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent transform -skew-x-12" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
