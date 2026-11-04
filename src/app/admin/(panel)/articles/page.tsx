import Image from "next/image";
import Link from "next/link";
import { deleteArticleAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { getArticles } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function AdminArticlesPage() {
  const articles = getArticles(true);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-2 text-sm text-slate-600">Published posts appear on /blog.</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex h-11 items-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800"
        >
          New post
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {articles.length === 0 ? (
          <li className="px-5 py-8 text-sm text-slate-500">No posts yet.</li>
        ) : (
          articles.map((article) => (
            <li key={article.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                  {article.cover ? (
                    <Image
                      src={article.cover.src}
                      alt=""
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-[10px] font-medium text-slate-400">
                      No cover
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{article.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    /blog/{article.slug} · {article.published ? "Published" : "Hidden"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/articles/${article.slug}`} className="text-sm font-semibold text-blue-700">
                  Edit
                </Link>
                <DeleteButton action={deleteArticleAction.bind(null, article.slug)} label="post" />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
