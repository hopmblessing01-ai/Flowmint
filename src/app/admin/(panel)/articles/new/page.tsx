import { saveArticleAction } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/article-form";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">New blog post</h1>
      <p className="mt-2 text-sm text-slate-600">Write in plain text. A blank line starts a new paragraph.</p>
      <div className="mt-6">
        <ArticleForm action={saveArticleAction} />
      </div>
    </div>
  );
}
