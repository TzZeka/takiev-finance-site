"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  billingPeriod?: string;
  features: string[];
  popular?: boolean;
  onContact?: () => void;
}

export function PricingCard({
  name,
  description,
  price,
  billingPeriod = "месечно",
  features,
  popular = false,
  onContact,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative h-full rounded-2xl border-2 transition-all duration-300",
        popular
          ? "border-primary bg-gradient-to-br from-primary/10 via-white/5 to-primary/5 shadow-lg shadow-primary/20"
          : "border-white/10 bg-white/5 hover:border-primary/50 hover:shadow-lg"
      )}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full shadow-md">
          Най-популярен
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {name}
          </h3>
          <p className="text-sm md:text-base text-white/70">
            {description}
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-[#1effff] bg-clip-text text-transparent">
              {price}
            </span>
            {billingPeriod && (
              <span className="text-white/60 text-sm">/ {billingPeriod}</span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm md:text-base text-white/80">
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onContact}
          className={cn(
            "w-full py-3 md:py-4 px-6 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 group",
            popular
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
              : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          )}
        >
          Свържи се с нас
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 rounded-2xl backdrop-blur-sm pointer-events-none" />
    </motion.div>
  );
}
