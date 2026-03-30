"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavDirectionContext = createContext<1 | -1>(1);

export function useNavDirection() {
  return useContext(NavDirectionContext);
}

export function NavDirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const pathname = usePathname();

  // Browser back/forward button → backward direction
  useEffect(() => {
    const onPopState = () => setDirection(-1);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Reset direction to forward after each navigation completes
  useEffect(() => {
    return () => {
      setDirection(1);
    };
  }, [pathname]);

  return (
    <NavDirectionContext.Provider value={direction}>
      {children}
    </NavDirectionContext.Provider>
  );
}
