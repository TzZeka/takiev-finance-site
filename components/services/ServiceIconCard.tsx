"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceIconCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  index?: number;
}

export function ServiceIconCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: ServiceIconCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 backdrop-blur-sm"
    >
      {/* Icon Container */}
      <div className="mb-4 inline-flex p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      </div>

      {/* Title */}
      <h4 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h4>

      {/* Description */}
      {description && (
        <p className="text-sm md:text-base text-white/70 leading-relaxed">
          {description}
        </p>
      )}

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
