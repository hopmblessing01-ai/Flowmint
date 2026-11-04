import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactPageHero } from "@/lib/page-hero-assets";
import { contactEmail } from "@/lib/site-seo";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Tell Flowmint what is slow or manual. Email hopmblessing@gmail.com or send a message - we reply within one business day.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <PageHero
          image={contactPageHero.src}
          imageAlt={contactPageHero.alt}
          priority
          variant="page"
        >
          <Reveal variant="fade-up" durationMs={1000}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">
              Contact
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
              Tell us what’s slow - we’ll help you automate it
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
              Share the tools and the manual loop. We’ll map the fastest path to
              a reliable system - and what it will take to ship.
            </p>
          </Reveal>
        </PageHero>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            <Reveal
              variant="slide-right"
              durationMs={1050}
              className="lg:col-span-2"
            >
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Reach us directly
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Prefer email or a quick call? Use the details below, or send
                  the form and we’ll get back within one business day.
                </p>

                <ul className="mt-8 space-y-5">
                  <li className="flex gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                      <Mail className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </p>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="mt-0.5 block text-base font-semibold text-slate-900 transition hover:text-blue-700"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                      <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Phone
                      </p>
                      <a
                        href="tel:+447543196059"
                        className="mt-0.5 block text-base font-semibold tabular-nums text-slate-900 transition hover:text-blue-700"
                      >
                        +44 7543 196 059
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href={`mailto:${contactEmail}?subject=Start%20a%20project`}
                    className="btn-shine relative inline-flex h-12 min-w-[200px] items-center justify-center overflow-hidden rounded-lg bg-blue-700 px-8 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800"
                  >
                    <span className="relative z-[1]">Email us</span>
                  </a>
                  <a
                    href={`mailto:${contactEmail}?subject=System%20audit%20request`}
                    className="inline-flex h-12 items-center text-sm font-semibold text-blue-800 underline-offset-4 transition hover:underline"
                  >
                    Request a free system audit →
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal
              variant="slide-up"
              delayMs={140}
              durationMs={1100}
              className="lg:col-span-3"
            >
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
