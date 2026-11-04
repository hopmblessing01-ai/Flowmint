"use client";

import { useActionState, useEffect, useState } from "react";
import type { FormState } from "@/app/admin/actions";
import { ImageUploadCard } from "@/components/admin/image-upload-card";
import type { Article } from "@/lib/content-store";

const field =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-600/30 focus:border-blue-500 focus:ring-4";

export function ArticleForm({
  action,
  article,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  article?: Article;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [previewUrl, setPreviewUrl] = useState<string | null>(article?.cover?.src ?? null);
  const [previewIsLocal, setPreviewIsLocal] = useState(false);

  useEffect(() => {
    setPreviewUrl(article?.cover?.src ?? null);
    setPreviewIsLocal(false);
  }, [article?.cover?.src]);

  useEffect(() => {
    return () => {
      if (previewIsLocal && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewIsLocal, previewUrl]);

  function onCoverFiles(files: File[]) {
    const file = files[0];
    if (!file) return;
    if (previewIsLocal && previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setPreviewIsLocal(true);
  }

  return (
    <form action={formAction} className="space-y-5">
      {article ? <input type="hidden" name="slug" value={article.slug} /> : null}
      <label className="block text-sm font-semibold text-slate-800">
        Title
        <input name="title" required defaultValue={article?.title} className={field} />
      </label>
      <label className="block text-sm font-semibold text-slate-800">
        Summary
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={article?.description}
          className={field}
        />
      </label>
      <label className="block text-sm font-semibold text-slate-800">
        Body
        <textarea name="body" required rows={12} defaultValue={article?.body} className={field} />
        <span className="mt-1 block text-xs font-normal text-slate-500">
          Leave a blank line between paragraphs.
        </span>
      </label>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Cover image</p>
          <p className="mt-1 text-xs text-slate-500">
            Drag an image onto the card, or click to browse.
          </p>
        </div>
        <ImageUploadCard
          name="coverFile"
          label={previewUrl ? "Replace cover image" : "Upload cover image"}
          previewUrl={previewUrl}
          previewAlt={article?.cover?.alt || "Cover preview"}
          previewIsLocal={previewIsLocal}
          onFiles={onCoverFiles}
        />
        <label className="block text-sm font-semibold text-slate-800">
          Cover description
          <input name="coverAlt" defaultValue={article?.cover?.alt} className={field} />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        Date
        <input
          type="date"
          name="publishedAt"
          defaultValue={article?.publishedAt ?? new Date().toISOString().slice(0, 10)}
          className={field}
        />
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <input
          type="checkbox"
          name="published"
          defaultChecked={article?.published ?? true}
          className="h-4 w-4 rounded border-slate-300 text-blue-700"
        />
        Published on the site
      </label>
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : article ? "Save post" : "Create post"}
      </button>
    </form>
  );
}
