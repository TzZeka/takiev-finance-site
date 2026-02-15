"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactFormSectionProps {
  ctaText?: string;
}

export function ContactFormSection({ ctaText }: ContactFormSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 25 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.5, delay },
        };

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div {...anim(0)} className="text-center mb-12">
            <span className="text-sm font-semibold text-primary tracking-wider uppercase">
              Свържете се с нас
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              {ctaText || "Готови ли сте да "}<span className="text-primary">започнете?</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Свържете се с нас днес и нека обсъдим как можем да помогнем на Вашия бизнес да расте и да успява
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Info */}
            <motion.div {...anim(0.1)} className="lg:col-span-1 space-y-4">
              {/* Info Card */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 text-white">
                <h3 className="text-lg font-bold mb-6">Информация за контакт</h3>

                <div className="space-y-5">
                  <a href="tel:+359899080016" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-white/40 mb-0.5">Телефон</div>
                      <span className="text-white font-medium text-sm group-hover:text-primary transition-colors">+359 89 908 0016</span>
                    </div>
                  </a>

                  <a href="mailto:office@takiev.bg" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-white/40 mb-0.5">Email</div>
                      <span className="text-white font-medium text-sm group-hover:text-primary transition-colors">office@takiev.bg</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-white/40 mb-0.5">Адрес</div>
                      <span className="text-white font-medium text-sm">бул. Ал. Стамболийски 30Б, 1000 София</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-white/40 mb-0.5">Работно време</div>
                      <span className="text-white font-medium text-sm">Пон - Пет: 9:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5">
                <div className="space-y-3">
                  {[
                    "Бърз отговор в рамките на 24 часа",
                    "100% Поверителност",
                    "Безплатна първа консултация",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-white/60">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...anim(0.2)} className="lg:col-span-2">
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-gradient-to-b from-primary to-emerald-400 rounded-full" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">Изпратете запитване</h3>
                    <p className="text-white/50 text-sm">Ще се свържем с вас възможно най-скоро</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
