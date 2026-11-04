import { notFound } from "next/navigation";
import { saveProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";
import { getProject } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug, true);
  if (!project) notFound();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
      <p className="mt-2 text-sm text-slate-600">The address stays /projects#{project.slug}.</p>
      <div className="mt-6">
        <ProjectForm action={saveProjectAction} project={project} />
      </div>
    </div>
  );
}
