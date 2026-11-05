import Link from "next/link";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { bookingUrl, contactEmail, contactPhone, contactPhoneHref } from "@/lib/site-seo";
import { Reveal } from "@/components/reveal";

const exploreLinks = [
  { href: "/#problem", label: "What you gain" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#process", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/crm", label: "CRM setup & optimization" },
  { href: "/services/ops", label: "Project & ops systems" },
  { href: "/services/workflow", label: "Workflow automation" },
  { href: "/services/ai", label: "AI & voice automation" },
];

export function SiteFooter() {
  return (
    <footer className="relative">
      <div className="relative z-10 -mt-6 overflow-hidden rounded-t-3xl border border-b-0 border-white/10 bg-gradient-to-b from-[#0f2749] via-[#0c1e3d] to-[#081428] px-4 py-16 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.45)] sm:-mt-8 sm:px-6 sm:py-20 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-10 lg:pb-16">
            <Reveal
              variant="fade-up"
              className="lg:col-span-4"
              durationMs={1000}
            >
              <p className="text-xl font-bold tracking-tight text-white">
                Flowmint<span className="text-sky-400">.</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                We design and ship automation, CRM, and integrations your team can
                run after handover - documented, monitored, and built for how work
                actually happens.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-black/20 backdrop-blur-sm ring-1 ring-white/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-300/95">
                  Ready when you are
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Tell us what is slow, manual, or breaking - and we’ll reply with
                  next steps within one business day.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-semibold text-[#0c1e3d] shadow-md transition hover:bg-sky-400"
                >
                  Start a project
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
              <Reveal variant="slide-right" delayMs={80} durationMs={1000}>
                <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400/90">
                  Explore
                </span>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {exploreLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-medium text-slate-300 transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                </div>
              </Reveal>
              <Reveal variant="slide-up" delayMs={160} durationMs={1000}>
                <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400/90">
                  Service detail
                </span>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {serviceLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-medium text-slate-300 transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                </div>
              </Reveal>
            </div>

            <Reveal
              variant="fade-up"
              className="lg:col-span-3"
              delayMs={220}
              durationMs={1000}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400/90">
                Contact
              </span>
              <ul className="mt-4 flex flex-col gap-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-300 ring-1 ring-white/10">
                    <Mail className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-0.5 block font-medium text-white transition hover:text-sky-300"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-300 ring-1 ring-white/10">
                    <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Phone
                    </p>
                    <a
                      href={contactPhoneHref}
                      className="mt-0.5 block font-medium text-white transition hover:text-sky-300"
                    >
                      {contactPhone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-300 ring-1 ring-white/10">
                    <Calendar className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Meeting
                    </p>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-medium text-white transition hover:text-sky-300"
                    >
                      Book a meeting
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-300 ring-1 ring-white/10">
                    <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Hours & region
                    </p>
                    <p className="mt-0.5 font-medium leading-snug text-white">
                      Mon–Fri · 9:00–18:00
                      <span className="mt-1 block text-slate-400">
                        Remote-first · UK-based · US & EU-friendly hours
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal variant="fade-up" delayMs={120} durationMs={900}>
          <div className="flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
            <p className="max-w-xl text-xs leading-relaxed text-slate-400">
              Flowmint is a systems partner for growing teams: we align on outcomes,
              map your stack, then automate with clear ownership - not a black box.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
              <a
                href={`mailto:${contactEmail}?subject=Privacy%20policy%20request`}
                className="transition hover:text-sky-300"
              >
                Privacy
              </a>
              <a
                href={`mailto:${contactEmail}?subject=Terms%20of%20service%20request`}
                className="transition hover:text-sky-300"
              >
                Terms
              </a>
              <Link href="/contact" className="transition hover:text-sky-300">
                Support
              </Link>
              <Link href="/admin/login" className="transition hover:text-sky-300">
                Admin
              </Link>
            </div>
          </div>
          </Reveal>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#050d18] px-4 py-8 text-center sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <Reveal variant="fade-scale" durationMs={900}>
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs font-medium tracking-wide text-slate-400">
              © {new Date().getFullYear()} Flowmint. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              CRM · ops systems · workflows · AI guardrails you control
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
