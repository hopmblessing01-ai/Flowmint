"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { ProjectPhoto } from "@/components/project-photo";
import type { Project } from "@/lib/content-store";
import {
  projectCategories,
  projectCategoryLabel,
  projectHasCategory,
  type ProjectCategory,
} from "@/lib/project-categories";

export function ProjectGrid({
  projects,
  initialSlug,
  initialCategory = null,
}: {
  projects: Project[];
  initialSlug: string | null;
  initialCategory?: ProjectCategory | null;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [category, setCategory] = useState<ProjectCategory | "all">(
    initialCategory ?? "all",
  );

  const availableCategories = useMemo(
    () =>
      projectCategories.filter((item) =>
        projects.some((project) => projectHasCategory(project.categories, item)),
      ),
    [projects],
  );

  const visible = useMemo(
    () =>
      category === "all"
        ? projects
        : projects.filter((project) => projectHasCategory(project.categories, category)),
    [projects, category],
  );

  const active = projects.find((project) => project.slug === slug) ?? null;
  const photos = active?.photos ?? [];
  const photo = photos[photoIndex] ?? photos[0];

  useEffect(() => {
    setSlug(initialSlug);
  }, [initialSlug]);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [slug]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") shift(1);
      if (event.key === "ArrowLeft") shift(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, photos.length, category, slug]);

  function categoryHref(next: ProjectCategory | "all") {
    const params = new URLSearchParams();
    if (next !== "all") params.set("category", next);
    if (slug) params.set("project", slug);
    const query = params.toString();
    return query ? `/projects?${query}` : "/projects";
  }

  function open(nextSlug: string) {
    setSlug(nextSlug);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    params.set("project", nextSlug);
    router.replace(`/projects?${params.toString()}`, { scroll: false });
  }

  function close() {
    setSlug(null);
    router.replace(categoryHref(category), { scroll: false });
  }

  function selectCategory(next: ProjectCategory | "all") {
    setCategory(next);
    const params = new URLSearchParams();
    if (next !== "all") params.set("category", next);
    const current = projects.find((project) => project.slug === slug);
    if (slug && current && (next === "all" || projectHasCategory(current.categories, next))) {
      params.set("project", slug);
    } else {
      setSlug(null);
    }
    const query = params.toString();
    router.replace(query ? `/projects?${query}` : "/projects", { scroll: false });
  }

  function shift(delta: number) {
    if (photos.length < 2) return;
    setPhotoIndex((current) => (current + delta + photos.length) % photos.length);
  }

  return (
    <>
      {projects.length > 0 ? (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === "all"
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {(availableCategories.length > 0 ? availableCategories : projectCategories).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {projectCategoryLabel(item)}
              </button>
            ),
          )}
        </div>
      ) : null}

      {projects.length === 0 ? (
        <p className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-600">
          Selected projects will appear here soon.
        </p>
      ) : visible.length === 0 ? (
        <p className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-600">
          No projects in this category yet.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} onOpen={open} />
            </li>
          ))}
        </ul>
      )}

      {active && photo ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label="Close project"
            className="animate-modal-backdrop absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"
            onClick={close}
          />

          {photos.length > 1 ? (
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => shift(-1)}
              className="animate-modal-panel absolute left-2 top-1/2 z-[90] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white text-xl font-semibold text-slate-900 shadow-xl transition hover:scale-105 hover:bg-sky-50 sm:left-4 sm:h-14 sm:w-14"
            >
              ‹
            </button>
          ) : null}

          {photos.length > 1 ? (
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => shift(1)}
              className="animate-modal-panel absolute right-2 top-1/2 z-[90] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white text-xl font-semibold text-slate-900 shadow-xl transition hover:scale-105 hover:bg-sky-50 sm:right-4 sm:h-14 sm:w-14"
            >
              ›
            </button>
          ) : null}

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="animate-modal-panel relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.65)] sm:mx-16"
          >
            <div className="relative min-h-[240px] flex-1 bg-slate-950 sm:min-h-[420px]">
              <div key={photo.src} className="animate-modal-image absolute inset-0">
                <ProjectPhoto
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="absolute inset-x-0 top-0 z-[1] flex items-start justify-between p-3 sm:p-4">
                <p className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
                  {photoIndex + 1} / {photos.length}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 shadow transition hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </div>
            {photos.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50 px-4 py-3">
                {photos.map((item, index) => (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    aria-label={`Show photo ${index + 1}`}
                    onClick={() => setPhotoIndex(index)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200 transition ${
                      index === photoIndex
                        ? "ring-2 ring-blue-700 ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <ProjectPhoto src={item.src} alt="" sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex flex-wrap gap-1.5">
                {(active.categories ?? []).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-800"
                  >
                    {projectCategoryLabel(item)}
                  </span>
                ))}
              </div>
              <h2 id="project-dialog-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                {active.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{active.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {active.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
