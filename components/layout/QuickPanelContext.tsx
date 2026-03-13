"use client";

import { createContext, useContext, useState } from "react";

interface QuickPanelContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickPanelContext = createContext<QuickPanelContextType>({
  isOpen: false,
  setIsOpen: () => {},
  isVisible: true,
  setIsVisible: () => {},
});

export function QuickPanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <QuickPanelContext.Provider value={{ isOpen, setIsOpen, isVisible, setIsVisible }}>
      {children}
    </QuickPanelContext.Provider>
  );
}

export const useQuickPanel = () => useContext(QuickPanelContext);
