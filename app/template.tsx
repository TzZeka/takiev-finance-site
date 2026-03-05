"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for that "Premium" snap feel
      }}
      className="min-h-screen"
    >
      {/* We add AnimatePresence in layout.tsx or handle it here. Next App Router remounts Template completely, so exit animations require slightly more complex setups or just doing entrance animations like this is the industry standard for Next.js App Router for maximum stability without breaking scroll restoration. */}
      {children}
    </motion.div>
  );
}
