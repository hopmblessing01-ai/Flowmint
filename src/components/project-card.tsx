"use client";

import { ProjectPhoto } from "@/components/project-photo";
import type { Project } from "@/lib/content-store";
import { projectCategoryLabel } from "@/lib/project-categories";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (slug: string) => void;
}) {
  const cover = project.photos[0];
  const categories = project.categories ?? [];

  return (
    <button
      type="button"
      onClick={() => onOpen(project.slug)}
      className="card-glass-hover group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/45 text-left shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] backdrop-blur-md outline-offset-4 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-900/15 supports-[backdrop-filter]:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#071428]">
        {cover ? (
          <ProjectPhoto
            src={cover.src}
            alt={cover.alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent"
          aria-hidden
        />
        <div className="absolute left-3 top-3 z-[2] flex max-w-[85%] flex-wrap gap-1.5">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-blue-800 shadow-sm transition duration-300 group-hover:bg-white/15 group-hover:text-white group-hover:ring-1 group-hover:ring-white/25"
            >
              {projectCategoryLabel(category)}
            </span>
          ))}
        </div>
        {project.photos.length > 1 ? (
          <span className="absolute bottom-3 right-3 z-[2] rounded-full bg-[#071428]/80 px-2.5 py-1 text-[11px] font-semibold text-white transition duration-300 group-hover:bg-white/15">
            {project.photos.length} photos
          </span>
        ) : null}
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 transition duration-300 group-hover:text-white">
          {project.title}
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 transition duration-300 group-hover:text-blue-50/95">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-800 transition duration-300 group-hover:bg-white/15 group-hover:text-sky-100"
            >
              {skill}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition duration-300 group-hover:gap-3 group-hover:text-sky-100">
          View project
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </button>
  );
}
