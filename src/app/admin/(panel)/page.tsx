import Link from "next/link";
import { getArticles, getProjects } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  const projects = getProjects(true);
  const articles = getArticles(true);
  const publishedProjects = projects.filter((item) => item.published).length;
  const publishedArticles = articles.filter((item) => item.published).length;

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
        Projects and blog posts are saved in this project&apos;s data files. After you edit them
        here, commit the updated files and redeploy so the live site picks them up. A host like
        Netlify does not keep edits made only on the live server.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/projects"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200"
        >
          <p className="text-sm font-semibold text-blue-700">Projects</p>
          <p className="mt-2 text-3xl font-semibold">{projects.length}</p>
          <p className="mt-1 text-sm text-slate-500">{publishedProjects} published</p>
        </Link>
        <Link
          href="/admin/articles"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200"
        >
          <p className="text-sm font-semibold text-blue-700">Blog</p>
          <p className="mt-2 text-3xl font-semibold">{articles.length}</p>
          <p className="mt-1 text-sm text-slate-500">{publishedArticles} published</p>
        </Link>
      </div>
    </div>
  );
}
