"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Receipt,
  Scale,
  Building2
} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceTabsProps {
  children: React.ReactNode[];
}

// Export tabs for use in navigation and footer
export const serviceTabs: Tab[] = [
  { id: "schetovodstvo", label: "Счетоводни услуги", icon: Calculator },
  { id: "danaci", label: "Данъчни консултации", icon: Receipt },
  { id: "pravni", label: "Правни услуги", icon: Scale },
  { id: "registraciq", label: "Регистрация на фирми", icon: Building2 },
];

export function ServiceTabs({ children }: ServiceTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  // Read tab from URL on mount and when URL changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const tabIndex = serviceTabs.findIndex((t) => t.id === tabParam);
      if (tabIndex !== -1) {
        setActiveTab(tabIndex);
      }
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    const tabId = serviceTabs[index].id;
    router.push(`/uslugi?tab=${tabId}`, { scroll: false });
  };

  return (
    <div id="services-tabs" className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
      {/* Tab Navigation */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-12 md:mb-16">
        {serviceTabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(index)}
              className={cn(
                "flex items-center justify-center gap-2 flex-1 px-4 py-3 md:px-6 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300",
                activeTab === index
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
