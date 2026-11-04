"use client";

import { BrandLoader } from "@/components/brand-loader";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function OverlayLoader({
  label = "Loading page",
  visible,
}: {
  label?: string;
  visible: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(7, 20, 40, 0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 220ms ease",
      }}
      role="status"
      aria-live="polite"
      aria-label={label}
      aria-hidden={!visible}
    >
      <BrandLoader label={label} />
    </div>,
    document.body,
  );
}
