import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectGrid } from "@/components/project-grid";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projectsPageHero } from "@/lib/page-hero-assets";
import { getProjects } from "@/lib/content-store";
import { isProjectCategory } from "@/lib/project-categories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flowmint projects: CRM, ops, workflow, and AI systems - with the skills and delivery behind each build.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; category?: string }>;
}) {
  const { project, category } = await searchParams;
  const projects = getProjects();
  const initialCategory = category && isProjectCategory(category) ? category : null;

  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <PageHero
          image={projectsPageHero.src}
          imageAlt={projectsPageHero.alt}
          priority
          variant="page"
        >
          <Reveal variant="fade-up" durationMs={1000}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">
              Projects
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
              Systems we have shipped
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
              CRM, ops systems, workflows, and AI assistants built around how a
              team already works - with the skills behind each one.
            </p>
          </Reveal>
        </PageHero>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ProjectGrid
            projects={projects}
            initialSlug={project ?? null}
            initialCategory={initialCategory}
          />

          <Reveal variant="fade-scale" durationMs={1000} className="mt-16">
            <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-6 py-10 sm:px-12">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Want a project like these?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Tell us the tools and the manual loop. We’ll map the first
                system worth shipping.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-blue-700 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-blue-800"
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
