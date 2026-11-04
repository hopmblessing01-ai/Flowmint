"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Inertial “coast” after wheel/trackpad  -  smooth interpolation instead of
 * stopping the instant input ends. Skipped when user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      /** Lower = more glide after you stop scrolling (still stable) */
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      /** Smooth in-page anchors (e.g. /#process) */
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.resize();
  }, [pathname]);

  return <>{children}</>;
}
