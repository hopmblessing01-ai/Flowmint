import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import {
  isServiceSlug,
  serviceSlugs,
  services,
  type ServiceSlug,
} from "@/lib/service-content";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  serviceCardBodyClass,
  serviceCardClass,
  serviceCardTitleClass,
} from "@/lib/service-card-styles";
import { siteName } from "@/lib/site-seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const s = services[slug];
  const url = `/services/${slug}`;
  return {
    title: s.title,
    description: s.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${s.title} | ${siteName}`,
      description: s.summary,
      url,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const s = services[slug as ServiceSlug];

  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <PageHero
          image={s.coverImage}
          imageAlt={s.coverImageAlt}
          priority
          variant="detail"
        >
          <Reveal variant="fade-up" durationMs={1000}>
            <Link
              href="/services"
              className="mb-8 inline-flex w-fit text-sm font-semibold text-white/90 transition hover:text-white"
            >
              <span aria-hidden className="mr-1.5 opacity-80">
                ←
              </span>
              Back to services
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">
              Service detail
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {s.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] sm:text-xl">
              {s.summary}
            </p>
          </Reveal>
        </PageHero>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal variant="fade-up" durationMs={1050}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Where we focus first
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Practical outcomes your operators will feel - not slide decks.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {s.highlights.map((h, i) => (
              <Reveal
                key={h.title}
                variant={i % 2 === 0 ? "slide-left" : "slide-right"}
                delayMs={i * 90}
                durationMs={1000}
              >
                <div className={`${serviceCardClass} h-full`}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 transition group-hover:text-sky-200">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={`mt-4 text-lg font-semibold ${serviceCardTitleClass}`}
                  >
                    {h.title}
                  </h3>
                  <p className={`mt-2 text-sm ${serviceCardBodyClass}`}>
                    {h.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-start">
            <Reveal
              variant="slide-right"
              className="lg:col-span-7"
              durationMs={1100}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Scope & deliverables
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                {s.body}
              </p>
              <ul className="mt-10 space-y-5">
                {s.bullets.map((b, i) => (
                  <li key={b}>
                    <Reveal
                      className="block"
                      variant="slide-up"
                      delayMs={i * 85}
                      durationMs={900}
                    >
                      <div className="flex gap-4">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100/80">
                          <CheckCircle2
                            className="h-5 w-5"
                            strokeWidth={2}
                            aria-hidden
                          />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700 sm:text-base">
                          {b}
                        </span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
              <Reveal variant="slide-left" durationMs={1000}>
                <figure className="space-y-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-xl ring-1 ring-slate-200/80">
                    <Image
                      src={s.inlineImage}
                      alt={s.inlineImageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition duration-700 hover:scale-[1.02]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <figcaption className="text-xs leading-relaxed text-slate-500">
                    {s.inlineImageAlt}
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal variant="slide-right" delayMs={100} durationMs={1000}>
                <div className={serviceCardClass}>
                  <p className={`text-sm font-semibold ${serviceCardTitleClass}`}>
                    Ready to scope this for your stack?
                  </p>
                  <p className={`mt-2 text-sm ${serviceCardBodyClass}`}>
                    Tell us your tools and the manual loop - we’ll outline a
                    pragmatic first milestone.
                  </p>
                  <Link
                    href="/contact"
                    className="btn-shine relative z-[3] mt-5 inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-lg bg-white px-6 text-sm font-semibold text-blue-900 shadow-md transition hover:bg-blue-50 sm:w-auto"
                  >
                    <span className="relative z-[1]">Start a project</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
