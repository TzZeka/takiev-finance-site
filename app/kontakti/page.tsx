"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const whyChooseUsReasons = [
  "Бърз отговор на запитвания",
  "Професионален екип от експерти",
  "Индивидуален подход към всеки клиент",
  "Над 10 години опит в бранша",
  "Прозрачна и коректна ценова политика",
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "office@takiev.bg",
    link: "mailto:office@takiev.bg",
  },
  {
    icon: Phone,
    title: "Телефон",
    content: "+359 89 908 0016",
    link: "tel:+359899080016",
  },
  {
    icon: MapPin,
    title: "Адрес",
    content: `бул. „Александър Стамболийски" 30Б, 1000 София`,
    link: null,
  },
  {
    icon: Clock,
    title: "Работно време",
    content: "Пон-Пет: 9:00 - 18:00",
    link: null,
  },
];

export default function ContactPage() {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [animationVariant, setAnimationVariant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReasonIndex((prev) => (prev + 1) % whyChooseUsReasons.length);
      setAnimationVariant((prev) => (prev + 1) % 4); // 4 different animation types
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Different animation variants
  const getAnimationVariant = () => {
    switch (animationVariant) {
      case 0:
        return {
          initial: { opacity: 0, y: 20, scale: 0.9 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -20, scale: 0.9 },
        };
      case 1:
        return {
          initial: { opacity: 0, x: 50, rotateY: 90 },
          animate: { opacity: 1, x: 0, rotateY: 0 },
          exit: { opacity: 0, x: -50, rotateY: -90 },
        };
      case 2:
        return {
          initial: { opacity: 0, scale: 0, rotate: -180 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          exit: { opacity: 0, scale: 0, rotate: 180 },
        };
      case 3:
        return {
          initial: { opacity: 0, y: -30, skewY: 10 },
          animate: { opacity: 1, y: 0, skewY: 0 },
          exit: { opacity: 0, y: 30, skewY: -10 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header Section with "Why Choose Us" */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Контакти
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Свържете се с нас за професионална консултация
              </p>
            </div>

            {/* Why Choose Us - Animated */}
            <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 md:min-w-[380px] shadow-xl overflow-hidden">
              {/* Diagonal accent */}
              <div className="absolute -top-2 -right-2 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative">
                <h3 className="font-semibold text-primary mb-4 text-lg">
                  Защо да изберете нас?
                </h3>

                {/* Animated rotating text */}
                <div className="relative h-20 flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReasonIndex}
                      {...getAnimationVariant()}
                      transition={{
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="text-primary text-2xl font-bold flex-shrink-0"
                        >
                          ✓
                        </motion.span>
                        <span className="text-foreground text-base font-medium leading-relaxed">
                          {whyChooseUsReasons[currentReasonIndex]}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2 mt-4 justify-center">
                  {whyChooseUsReasons.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === currentReasonIndex
                          ? "w-8 bg-primary"
                          : "w-1.5 bg-primary/30"
                      }`}
                      animate={{
                        scale: index === currentReasonIndex ? 1 : 0.8,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
            {/* Left Column: Map + Contact Info */}
            <div className="space-y-8">
              {/* Google Maps - Modern Styled */}
              <div className="relative group">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

                {/* Diagonal accent bars */}
                <div className="absolute -top-2 -left-2 w-24 h-1 bg-gradient-to-r from-primary to-primary/50 transform -rotate-12 rounded-full" />
                <div className="absolute -bottom-2 -right-2 w-24 h-1 bg-gradient-to-r from-primary/50 to-primary transform -rotate-12 rounded-full" />

                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-primary/20">
                  {/* Diagonal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none z-10"
                       style={{ transform: "skewY(-2deg)", transformOrigin: "top left" }} />

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.283956399353!2d23.319877890847863!3d42.697707877149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa855eff40e335%3A0xa7cffc05e42a4e56!2sTakiev%20Finance%20EOOD!5e0!3m2!1sbg!2sbg!4v1768080298879!5m2!1sbg!2sbg&style=feature:all|element:geometry|color:0x40514E&style=feature:all|element:labels.text.fill|color:0x19BFB7&style=feature:all|element:labels.text.stroke|color:0x2c3e3b&style=feature:water|element:geometry|color:0x2c3e3b"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Takiev Finance Location"
                  />
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-primary/10 rounded-xl p-5 shadow-xl overflow-hidden">
                {/* Diagonal background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

                <div className="relative">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
                    Информация за контакт
                  </h2>

                  <div className="space-y-2">
                    {contactInfo.map((item, index) => {
                      const IconComponent = item.icon;
                      const content = item.link ? (
                        <a
                          href={item.link}
                          className="text-foreground hover:text-primary transition-colors font-medium text-sm"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <span className="text-foreground font-medium text-sm">{item.content}</span>
                      );

                      return (
                        <div
                          key={index}
                          className="relative group/item"
                        >
                          {/* Hover effect line */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full scale-y-0 group-hover/item:scale-y-100 transition-transform origin-top" />

                          <div className="flex items-center gap-3 p-3 pl-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-300 transform hover:translate-x-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground mb-0.5 text-xs uppercase tracking-wide opacity-70">
                                {item.title}
                              </h3>
                              {content}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
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
                  <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <div className="w-1 h-10 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
                    Изпратете запитване
                  </h2>
                  <p className="text-muted-foreground mb-8 ml-7">
                    Ще се свържем с вас възможно най-скоро
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
