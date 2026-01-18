"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactFormSectionProps {
  ctaText?: string;
}

export function ContactFormSection({ ctaText }: ContactFormSectionProps) {
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
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-32 bg-[#19BFB7]"
            style={{
              width: '200%',
              left: '-50%',
              top: `${i * 10}%`,
              transform: `rotate(45deg)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Свържете се с нас
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {ctaText || "Готови ли сте да "}<span className="text-primary">започнете?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Свържете се с нас днес и нека обсъдим как можем да помогнем на Вашия бизнес да расте и да успява
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className={`lg:col-span-1 space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/10 rounded-xl p-5 shadow-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

                <div className="relative">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
                    Информация за контакт
                  </h3>

                  <div className="space-y-2">
                    <div className="relative group/item">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full scale-y-0 group-hover/item:scale-y-100 transition-transform origin-top" />
                      <div className="flex items-center gap-3 p-3 pl-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300 transform hover:translate-x-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-0.5 text-xs uppercase tracking-wide opacity-70">
                            Телефон
                          </h4>
                          <a href="tel:+359123456789" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                            +359 123 456 789
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/item">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full scale-y-0 group-hover/item:scale-y-100 transition-transform origin-top" />
                      <div className="flex items-center gap-3 p-3 pl-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300 transform hover:translate-x-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-0.5 text-xs uppercase tracking-wide opacity-70">
                            Email
                          </h4>
                          <a href="mailto:office@takiev.bg" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
                            office@takiev.bg
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/item">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full scale-y-0 group-hover/item:scale-y-100 transition-transform origin-top" />
                      <div className="flex items-center gap-3 p-3 pl-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300 transform hover:translate-x-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-0.5 text-xs uppercase tracking-wide opacity-70">
                            Адрес
                          </h4>
                          <span className="text-foreground font-medium text-sm">София, България</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form - Same style as Contact Page */}
            <div className={`lg:col-span-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '400ms' }}>
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                {/* Diagonal accent bars */}
                <div className="absolute -top-2 -right-2 w-32 h-1 bg-gradient-to-r from-primary to-primary/50 transform rotate-12 rounded-full" />

                <div className="relative bg-card/90 backdrop-blur-md border-2 border-primary/20 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden">
                  {/* Diagonal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
                       style={{ transform: "skewY(-1deg)", transformOrigin: "top left" }} />

                  {/* Diagonal accent line */}
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent transform skew-x-12 origin-top-right opacity-20" />

                  <div className="relative">
                    <h3 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                      <div className="w-1 h-10 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
                      Изпратете запитване
                    </h3>
                    <p className="text-muted-foreground mb-8 ml-7">
                      Ще се свържем с вас възможно най-скоро
                    </p>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className={`mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Бърз отговор в рамките на 24 часа</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span>100% Поверителност</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Консултация</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
