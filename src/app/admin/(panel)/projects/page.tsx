import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { getProjects } from "@/lib/content-store";
import { projectCategoryLabels } from "@/lib/project-categories";

export const dynamic = "force-dynamic";

export default function AdminProjectsPage() {
  const projects = getProjects(true);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-sm text-slate-600">
            Published projects appear on /projects. Tick “Feature on homepage” on a project to choose
            which ones (up to three) show on the home page.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-11 items-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800"
        >
          New project
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {projects.length === 0 ? (
          <li className="px-5 py-8 text-sm text-slate-500">No projects yet.</li>
        ) : (
          projects.map((project) => (
            <li key={project.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-semibold">{project.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {(project.categories ?? [])
                    .map((item) => projectCategoryLabels[item])
                    .join(", ") || "Uncategorized"}{" "}
                  · /projects?project={project.slug} ·{" "}
                  {project.published ? "Published" : "Hidden"}
                  {project.featuredOnHome
                    ? ` · Home #${project.homeOrder}`
                    : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/projects/${project.slug}`} className="text-sm font-semibold text-blue-700">
                  Edit
                </Link>
                <DeleteButton action={deleteProjectAction.bind(null, project.slug)} label="project" />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
