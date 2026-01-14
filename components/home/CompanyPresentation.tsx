"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, Users, TrendingUp, Shield, CheckCircle, Sparkles } from "lucide-react";

const stats = [
  { label: "Години опит", value: 15, suffix: "+" },
  { label: "Доволни клиенти", value: 500, suffix: "+" },
  { label: "Успешни проекти", value: 1200, suffix: "+" },
  { label: "Експерти в екипа", value: 25, suffix: "" },
];

const values = [
  {
    icon: Shield,
    title: "Сигурност & Надеждност",
    description: "Гарантираме пълна конфиденциалност и защита на вашите данни",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Award,
    title: "Професионализъм",
    description: "Сертифицирани счетоводители с дългогодишен опит",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: TrendingUp,
    title: "Растеж & Развитие",
    description: "Помагаме на бизнеса ви да расте и процъфтява",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: Sparkles,
    title: "Иновации",
    description: "Дигитализация и модерни технологии",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const timeline = [
  { year: "2009", event: "Основаване на Такиев Финанс", highlight: true },
  { year: "2012", event: "Разширяване на екипа до 10+ експерти" },
  { year: "2016", event: "Дигитализация на всички процеси" },
  { year: "2020", event: "500+ доволни корпоративни клиенти", highlight: true },
  { year: "2024", event: "Лидер в счетоводни услуги" },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-primary">
      {count}
      {suffix}
    </div>
  );
}

export function CompanyPresentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#19BFB7] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#40514E] rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#19BFB7]/20 text-[#19BFB7] text-sm font-semibold border border-[#19BFB7]/30">
              <Sparkles className="w-4 h-4" />
              За нас
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Вашият доверен{" "}
            <span className="text-[#19BFB7]">финансов партньор</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Повече от 15 години опит в предоставянето на професионални счетоводни услуги
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/10 hover:border-[#19BFB7]/30">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />

                <div className="relative">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-white/70 mt-2 font-medium">
                    {stat.label}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Нашата история
          </h3>
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary to-primary/20" />

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                        item.highlight ? "border-2 border-[#19BFB7]" : "border-2 border-white/10"
                      }`}
                    >
                      <div className={`text-2xl font-bold ${item.highlight ? "text-[#19BFB7]" : "text-white"} mb-2`}>
                        {item.year}
                      </div>
                      <div className="text-white/70">
                        {item.event}
                      </div>
                      {item.highlight && (
                        <div className="mt-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#19BFB7]">
                            <CheckCircle className="w-3 h-3" />
                            Важна стъпка
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 1 + index * 0.2 + 0.3, type: "spring" }}
                      className={`w-6 h-6 rounded-full ${
                        item.highlight ? "bg-primary ring-4 ring-primary/30" : "bg-primary/60 ring-4 ring-primary/20"
                      }`}
                    />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-white/10 hover:border-[#19BFB7]/30 overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative">
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#19BFB7] transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-white/10 hover:border-[#19BFB7]/30 transition-all duration-300">
              <Users className="w-12 h-12 text-[#19BFB7] mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Готови ли сте да станете част от успеха?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Присъединете се към стотиците компании, които вече се доверяват на нашата експертиза
              </p>
              <motion.a
                href="/kontakti"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#19BFB7] text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-[#19BFB7]/90"
              >
                Свържете се с нас
                <CheckCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
