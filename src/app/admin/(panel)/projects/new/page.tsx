import { saveProjectAction } from "@/app/admin/actions";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
      <p className="mt-2 text-sm text-slate-600">Add a title, description, skills, and at least one photo.</p>
      <div className="mt-6">
        <ProjectForm action={saveProjectAction} />
      </div>
    </div>
  );
}
