"use client";

import { OverlayLoader } from "@/components/overlay-loader";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

type Phase = "idle" | "visible" | "leaving";

const MIN_VISIBLE_MS = 400;
const FADE_MS = 220;
const FAILSAFE_MS = 12000;

function routeKey(pathname: string, search: string) {
  const query = search ? (search.startsWith("?") ? search : `?${search}`) : "";
  return `${pathname}${query}`;
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const route = routeKey(pathname, searchParams.toString());
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    const pending = pendingRef.current;
    if (phase !== "visible" || !pending) return;
    if (route !== pending && pathname !== pending.split("?")[0]) return;

    let cancelled = false;
    const finish = async () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAtRef.current));
      await new Promise((resolve) => window.setTimeout(resolve, wait));
      await nextFrame();
      if (cancelled) return;
      pendingRef.current = null;
      setPhase("leaving");
      window.setTimeout(() => {
        if (!pendingRef.current) setPhase("idle");
      }, FADE_MS);
    };
    void finish();

    return () => {
      cancelled = true;
    };
  }, [route, pathname, phase]);

  useEffect(() => {
    if (phase !== "visible") return;
    const failsafe = window.setTimeout(() => {
      pendingRef.current = null;
      setPhase("idle");
    }, FAILSAFE_MS);
    return () => window.clearTimeout(failsafe);
  }, [phase]);

  useEffect(() => {
    const start = (next: string) => {
      pendingRef.current = next;
      startedAtRef.current = Date.now();
      setPhase("visible");
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const next = routeKey(url.pathname, url.search);
      if (next === routeKey(window.location.pathname, window.location.search)) return;
      start(next);
    };

    const onPopState = () => start(routeKey(window.location.pathname, window.location.search));

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  if (phase === "idle") return null;
  return <OverlayLoader label="Loading page" visible={phase === "visible"} />;
}

export function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderInner />
    </Suspense>
  );
}
