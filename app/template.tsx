"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavDirection } from "@/components/providers/NavDirectionProvider";

const pageVariants = {
  initial: (dir: number) => ({
    x: dir > 0 ? "30%" : "-30%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.25, ease: "easeOut" },
    },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const direction = useNavDirection();

  return (
    <motion.div
      key={pathname}
      custom={direction}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
