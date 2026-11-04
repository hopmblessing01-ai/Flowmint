import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getServiceCatalog } from "@/lib/services-catalog";
import { servicesPageHero } from "@/lib/page-hero-assets";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CRM setup, project and ops systems, workflow automation, and AI assistants across HubSpot, Salesforce, Zoho CRM, Pipedrive, GoHighLevel, Monday.com, Airtable, ClickUp, Asana, and Notion.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesIndexPage() {
  const items = getServiceCatalog();

  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <PageHero
          image={servicesPageHero.src}
          imageAlt={servicesPageHero.alt}
          priority
          variant="page"
        >
          <Reveal variant="fade-up" durationMs={1000}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">
              Services
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
              From discovery through delivery
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
              Every engagement uses the same documentation habits and ownership
              model - so your team can run the system after we leave.
            </p>
          </Reveal>
        </PageHero>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {items.map((item, i) => (
              <Reveal
                key={item.title}
                variant={i % 2 === 0 ? "slide-left" : "slide-right"}
                delayMs={i * 75}
                durationMs={1000}
              >
                <Link
                  href={item.href}
                  className="card-glass-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/45 text-left no-underline shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] backdrop-blur-md outline-offset-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/15 supports-[backdrop-filter]:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 transition duration-300 group-hover:text-white sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 transition duration-300 group-hover:text-blue-50/95">
                      {item.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition duration-300 group-hover:gap-3 group-hover:text-sky-100">
                      View details
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
