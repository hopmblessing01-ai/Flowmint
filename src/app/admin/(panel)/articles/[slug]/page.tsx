import { notFound } from "next/navigation";
import { saveArticleAction } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticle } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug, true);
  if (!article) notFound();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Edit blog post</h1>
      <p className="mt-2 text-sm text-slate-600">The address stays /blog/{article.slug}.</p>
      <div className="mt-6">
        <ArticleForm action={saveArticleAction} article={article} />
      </div>
    </div>
  );
}
