import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { notFoundPageHero } from "@/lib/page-hero-assets";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] pb-24">
        <PageHero
          image={notFoundPageHero.src}
          imageAlt={notFoundPageHero.alt}
          variant="compact"
        >
          <div className="mx-auto max-w-lg">
            <Reveal variant="fade-scale" durationMs={1000}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">
                404
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] sm:text-4xl">
                We can’t find that page
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
                The link may be outdated, or the page was moved. Head back home
                or jump to services.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex h-11 min-w-[160px] items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-blue-900 shadow-md transition hover:bg-blue-50"
                >
                  Back to home
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-semibold text-sky-200 transition hover:text-white"
                >
                  View services →
                </Link>
              </div>
            </Reveal>
          </div>
        </PageHero>
      </main>
      <SiteFooter />
    </>
  );
}
