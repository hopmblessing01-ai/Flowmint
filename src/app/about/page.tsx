import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { aboutIntro, aboutStory, aboutValues } from "@/lib/about-content";
import { aboutPageHero } from "@/lib/page-hero-assets";
import {
  serviceCardBodyClass,
  serviceCardClass,
  serviceCardTitleClass,
} from "@/lib/service-card-styles";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Flowmint builds maintainable automation and CRM systems for growing teams.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <PageHero
          image={aboutPageHero.src}
          imageAlt={aboutPageHero.alt}
          priority
          variant="page"
        >
          <Reveal variant="fade-up" durationMs={1000}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">
              {aboutIntro.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
              {aboutIntro.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
              {aboutIntro.body}
            </p>
          </Reveal>
        </PageHero>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {aboutValues.map((b, i) => (
              <Reveal
                key={b.title}
                variant={i % 2 === 0 ? "slide-left" : "slide-right"}
                delayMs={i * 90}
                durationMs={1000}
              >
                <article className={`${serviceCardClass} h-full`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-sm font-bold text-white shadow-sm transition group-hover:bg-white/15 group-hover:text-white">
                    {b.mark}
                  </span>
                  <h2 className={`mt-4 text-base font-semibold ${serviceCardTitleClass}`}>
                    {b.title}
                  </h2>
                  <p className={`mt-2 ${serviceCardBodyClass}`}>{b.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal variant="fade-up" className="mt-20 max-w-3xl" durationMs={1000}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              How we work
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              {aboutStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal variant="fade-scale" className="mt-16" delayMs={80} durationMs={1000}>
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-sm font-semibold text-blue-900">
                Want the same clarity on your stack?
              </p>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Tell us what’s slow or broken - we’ll map constraints, quick wins,
                and a sensible first milestone.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-blue-700 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800"
              >
                Start a project
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
