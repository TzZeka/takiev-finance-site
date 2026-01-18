"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  title: string;
  description: string;
  duration?: string;
}

interface ServiceTimelineProps {
  steps: TimelineStep[];
  title?: string;
}

export function ServiceTimeline({ steps, title }: ServiceTimelineProps) {
  return (
    <div>
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {title}
        </h3>
      )}

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        {/* Steps */}
        <div className="space-y-8 md:space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex gap-6 md:gap-8"
            >
              {/* Step Number/Circle */}
              <div className="relative flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3, type: "spring" }}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
                >
                  <span className="text-white font-bold text-sm md:text-base">
                    {index + 1}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-white/5 border-2 border-white/10 rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <h4 className="text-lg md:text-xl font-semibold text-white">
                      {step.title}
                    </h4>
                    {step.duration && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full w-fit">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: steps.length * 0.1 + 0.3, duration: 0.4, type: "spring" }}
          className="relative flex items-center gap-6 md:gap-8"
        >
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-[#1effff] flex items-center justify-center shadow-lg shadow-primary/50">
            <Check className="w-4 h-4 md:w-6 md:h-6 text-white" strokeWidth={3} />
          </div>
          <span className="text-lg md:text-xl font-semibold text-primary">
            Готово!
          </span>
        </motion.div>
      </div>
    </div>
  );
}
