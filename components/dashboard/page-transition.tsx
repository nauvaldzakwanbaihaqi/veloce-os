"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="w-full animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out fill-mode-both"
    >
      {children}
    </div>
  );
}
