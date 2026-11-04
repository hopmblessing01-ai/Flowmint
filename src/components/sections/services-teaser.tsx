import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function ServicesTeaserSection() {
  return (
    <section
      id="services"
      className="scroll-mt-[7.5rem] border-y border-slate-200/80 bg-white/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="slide-left" durationMs={1000}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Services
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            CRM, ops systems, workflows, and AI - built to hand over
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            See how we set up CRMs and project tools, automate workflows, and
            ship AI assistants your team can run after we leave.
          </p>
          <Link
            href="/services"
            className="btn-shine relative mt-8 inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-blue-700 px-8 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800"
          >
            <span className="relative z-[1]">View all services</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
