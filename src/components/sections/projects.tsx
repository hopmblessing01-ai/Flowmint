import Link from "next/link";
import { ProjectPhoto } from "@/components/project-photo";
import { Reveal } from "@/components/reveal";
import { getHomeProjects } from "@/lib/content-store";
import { projectCategoryLabel } from "@/lib/project-categories";

export function ProjectsSection() {
  const [lead, ...side] = getHomeProjects(3);

  if (!lead) return null;

  return (
    <section
      id="projects"
      className="scroll-mt-[7.5rem] bg-[#071428] py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-up" durationMs={1000}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Projects
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Work shipped for growing teams
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            CRM, ops systems, workflows, and AI assistants - with the skills
            used on each build.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal variant="slide-left" className="lg:col-span-7" durationMs={1000}>
            <Link
              href={`/projects?project=${lead.slug}`}
              className="group relative flex min-h-[420px] overflow-hidden rounded-[1.75rem] sm:min-h-[480px]"
            >
              <ProjectPhoto
                src={lead.photos[0]?.src ?? ""}
                alt={lead.photos[0]?.alt ?? lead.title}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_top,#071428_0%,#071428cc_28%,transparent_68%)]"
                aria-hidden
              />
              <div className="relative mt-auto p-6 sm:p-8">
                <div className="flex flex-wrap gap-1.5">
                  {(lead.categories ?? []).map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-200"
                    >
                      {projectCategoryLabel(category)}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
                  {lead.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {lead.skills.slice(0, 4).map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-5">
            {side.map((project, i) => (
              <Reveal
                key={project.slug}
                variant="slide-right"
                delayMs={i * 90}
                durationMs={1000}
                className="min-h-0 flex-1"
              >
                <Link
                  href={`/projects?project=${project.slug}`}
                  className="group flex h-full overflow-hidden rounded-[1.5rem] bg-[#0c1e3d]"
                >
                  <div className="relative hidden w-[42%] sm:block">
                    <ProjectPhoto
                      src={project.photos[0]?.src ?? ""}
                      alt={project.photos[0]?.alt ?? project.title}
                      sizes="20vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                    <div className="flex flex-wrap gap-1">
                      {(project.categories ?? []).map((category) => (
                        <span
                          key={category}
                          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-300"
                        >
                          {projectCategoryLabel(category)}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
                      {project.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 3).map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-sky-100"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="fade-up" delayMs={160} durationMs={900}>
          <Link
            href="/projects"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-lg bg-sky-500 px-8 text-sm font-semibold text-[#071428] shadow-md transition hover:bg-sky-400"
          >
            View all projects
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
