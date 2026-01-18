"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQAccordion({ items, title = "Често задавани въпроси" }: FAQAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-12 md:mt-16">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {title}
        </h3>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={cn(
                "rounded-lg border-2 transition-all duration-300 overflow-hidden",
                isExpanded
                  ? "border-primary bg-gradient-to-br from-primary/10 via-white/5 to-primary/5"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between gap-4 text-left group"
              >
                <span className="text-base md:text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 md:px-8 md:pb-5 pt-0">
                      <p className="text-sm md:text-base text-white/70 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
