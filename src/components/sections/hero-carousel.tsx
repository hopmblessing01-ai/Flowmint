"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { heroSlides } from "@/lib/hero-slides";

const INTERVAL_MS = 8000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [autoplaySeed, setAutoplaySeed] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const dragStartXRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const slideCount = heroSlides.length;

  const restartAutoplay = useCallback(() => {
    setAutoplaySeed((v) => v + 1);
  }, []);

  const go = useCallback(
    (dir: -1 | 1, resetDelay = false) => {
      setIndex((i) => (i + dir + slideCount) % slideCount);
      if (resetDelay) restartAutoplay();
    },
    [restartAutoplay, slideCount],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoplaySeed, reducedMotion, slideCount]);

  const slide = heroSlides[index]!;
  const dragDirection =
    dragDelta <= -24 ? "next" : dragDelta >= 24 ? "prev" : null;

  function resetDrag() {
    dragStartXRef.current = null;
    setDragDelta(0);
  }

  function onPointerDown(e: PointerEvent<HTMLElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStartXRef.current = e.clientX;
    suppressClickRef.current = false;
    setDragDelta(0);
  }

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (dragStartXRef.current === null) return;
    const nextDelta = e.clientX - dragStartXRef.current;
    if (Math.abs(nextDelta) > 8) suppressClickRef.current = true;
    setDragDelta(nextDelta);
  }

  function onPointerUp() {
    if (dragStartXRef.current === null) return;
    if (dragDelta <= -70) go(1, true);
    else if (dragDelta >= 70) go(-1, true);
    resetDrag();
  }

  function onClickCapture(e: MouseEvent<HTMLElement>) {
    if (!suppressClickRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    suppressClickRef.current = false;
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured services"
      className="relative isolate h-[clamp(520px,72vw,900px)] w-full touch-pan-y overflow-hidden pt-[6.75rem] sm:pt-[6.25rem]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={resetDrag}
      onPointerLeave={onPointerUp}
      onClickCapture={onClickCapture}
    >
      {heroSlides.map((s, i) => (
        <div
          key={`${s.src}-${i}`}
          aria-hidden={i !== index}
          className={`absolute inset-x-0 bottom-0 top-[6.75rem] transition-opacity duration-700 ease-out sm:top-[6.25rem] ${
            i === index ? "z-0 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={i === index ? s.alt : ""}
            fill
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            sizes="100vw"
            className="object-cover object-[right_top]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#071428e8_0%,#0c1e3db3_28%,#0c1e3d00_62%)]"
            aria-hidden
          />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl select-none flex-col justify-center px-4 pb-8 pt-6 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
        <div key={index} className="max-w-2xl">
          <p
            className="animate-hero-line hero-stagger-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/95"
          >
            {slide.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
            <span className="animate-hero-line hero-stagger-2 inline-block">
              {slide.titleBefore}{" "}
            </span>
            <span className="animate-hero-line hero-stagger-3 inline-block bg-gradient-to-r from-sky-200 via-white to-blue-100 bg-clip-text text-transparent">
              {slide.titleHighlight}
            </span>
          </h1>
          <p className="animate-hero-line hero-stagger-4 mt-5 hidden max-w-xl text-base leading-relaxed text-slate-200/95 sm:block sm:text-lg">
            {slide.description}
          </p>

          <div className="animate-hero-line hero-stagger-5 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-shine inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Start a project
            </Link>
          </div>
        </div>

        {dragDirection ? (
          <div className="pointer-events-none absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md">
            <span className="inline-flex items-center gap-2">
              {dragDirection === "prev" ? (
                <ChevronLeft className="h-4 w-4" aria-hidden />
              ) : (
                <ChevronRight className="h-4 w-4" aria-hidden />
              )}
              {dragDirection === "prev" ? "Previous" : "Next"}
            </span>
          </div>
        ) : null}

        <div className="mt-12 flex items-center gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end" role="tablist" aria-label="Slides">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-sky-300" : "w-2 bg-white/35 hover:bg-white/55"
                }`}
                onClick={() => {
                  setIndex(i);
                  restartAutoplay();
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
