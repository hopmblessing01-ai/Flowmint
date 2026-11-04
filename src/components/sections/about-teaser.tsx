import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { aboutIntro } from "@/lib/about-content";

export function AboutTeaserSection() {
  return (
    <section
      id="about"
      className="scroll-mt-[7.5rem] border-t border-slate-200/80 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" durationMs={1000}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            {aboutIntro.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {aboutIntro.headline}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            {aboutIntro.body}
          </p>
          <Link
            href="/about"
            className="btn-shine relative mt-8 inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border-2 border-blue-700 bg-white px-8 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
          >
            <span className="relative z-[1]">About us</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
