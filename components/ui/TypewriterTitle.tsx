"use client";

import { motion } from "framer-motion";

interface TypewriterTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TypewriterTitle({ text, className, delay = 0.9 }: TypewriterTitleProps) {
  return (
    <motion.h1
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
      }}
      initial="hidden"
      animate="visible"
      className={
        className ??
        "text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] tracking-tight"
      }
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.001 } },
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: 3 }}
        className="inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-1"
        style={{ marginBottom: "0.12em" }}
      />
    </motion.h1>
  );
}
