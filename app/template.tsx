"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{
        duration: 0.85,
        ease: [0.87, 0, 0.13, 1],
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
