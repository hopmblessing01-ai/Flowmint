"use client";

import Image from "next/image";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { FormState } from "@/app/admin/actions";
import { ImageUploadCard } from "@/components/admin/image-upload-card";
import type { Project, ProjectPhoto } from "@/lib/content-store";
import {
  projectCategories,
  projectCategoryLabels,
} from "@/lib/project-categories";

const field =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-600/30 focus:border-blue-500 focus:ring-4";

type GalleryItem =
  | { key: string; kind: "existing"; photo: ProjectPhoto }
  | { key: string; kind: "local"; file: File; url: string };

function moveItem<T>(list: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) {
    return list;
  }
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item!);
  return next;
}

function itemsFromPhotos(photos: ProjectPhoto[]): GalleryItem[] {
  return photos.map((photo) => ({
    key: `existing:${photo.src}`,
    kind: "existing" as const,
    photo,
  }));
}

export function ProjectForm({
  action,
  project,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  project?: Project;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<GalleryItem[]>([]);
  const photosKey = (project?.photos ?? []).map((photo) => photo.src).join("\0");
  const [items, setItems] = useState<GalleryItem[]>(() =>
    itemsFromPhotos(project?.photos ?? []),
  );
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [overKey, setOverKey] = useState<string | null>(null);

  useEffect(() => {
    setItems(itemsFromPhotos(project?.photos ?? []));
  }, [project?.slug, photosKey]);

  useEffect(() => {
    const previous = itemsRef.current;
    const nextUrls = new Set(
      items.filter((item): item is Extract<GalleryItem, { kind: "local" }> => item.kind === "local").map((item) => item.url),
    );
    previous.forEach((item) => {
      if (item.kind === "local" && !nextUrls.has(item.url)) {
        URL.revokeObjectURL(item.url);
      }
    });
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        if (item.kind === "local") URL.revokeObjectURL(item.url);
      });
    };
  }, []);

  function addFiles(files: File[]) {
    if (files.length === 0) return;
    setItems((current) => [
      ...current,
      ...files.map((file, index) => ({
        key: `local:${file.name}-${file.size}-${file.lastModified}-${index}-${Math.random()}`,
        kind: "local" as const,
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  }

  function removeItem(key: string) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function onDragStart(key: string) {
    setDragKey(key);
  }

  function onDragOver(event: React.DragEvent, key: string) {
    event.preventDefault();
    if (dragKey && dragKey !== key) setOverKey(key);
  }

  function onDrop(key: string) {
    if (!dragKey || dragKey === key) {
      setDragKey(null);
      setOverKey(null);
      return;
    }
    setItems((current) => {
      const from = current.findIndex((item) => item.key === dragKey);
      const to = current.findIndex((item) => item.key === key);
      return moveItem(current, from, to);
    });
    setDragKey(null);
    setOverKey(null);
  }

  function beforeSubmit(event: React.FormEvent<HTMLFormElement>) {
    const locals = items.filter((item) => item.kind === "local");
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      locals.forEach((item) => {
        if (item.kind === "local") dt.items.add(item.file);
      });
      fileInputRef.current.files = dt.files;
    }
    if (items.length === 0) {
      event.preventDefault();
    }
  }

  return (
    <form action={formAction} onSubmit={beforeSubmit} className="space-y-5">
      {project ? <input type="hidden" name="slug" value={project.slug} /> : null}
      <input ref={fileInputRef} type="file" name="uploads" multiple className="hidden" />
      {items.map((item) =>
        item.kind === "existing" ? (
          <input
            key={`order-${item.key}`}
            type="hidden"
            name="photoOrder"
            value={`existing:${item.photo.src}|${item.photo.alt}`}
          />
        ) : (
          <input key={`order-${item.key}`} type="hidden" name="photoOrder" value="new" />
        ),
      )}

      <label className="block text-sm font-semibold text-slate-800">
        Title
        <input name="title" required defaultValue={project?.title} className={field} />
      </label>
      <label className="block text-sm font-semibold text-slate-800">
        Description
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={project?.description}
          className={field}
        />
      </label>
      <fieldset className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-800">
          Service categories
        </legend>
        <p className="mt-1 text-xs font-normal text-slate-500">
          Select every service this project covers. You can pick more than one.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {projectCategories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800"
            >
              <input
                type="checkbox"
                name="categories"
                value={category}
                defaultChecked={project?.categories?.includes(category)}
                className="h-4 w-4 rounded border-slate-300 text-blue-700"
              />
              {projectCategoryLabels[category]}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm font-semibold text-slate-800">
        Skills
        <input
          name="skills"
          required
          defaultValue={project?.skills.join(", ")}
          placeholder="HubSpot, n8n, Monday.com"
          className={field}
        />
        <span className="mt-1 block text-xs font-normal text-slate-500">Separate skills with commas.</span>
      </label>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Photos</p>
          <p className="mt-1 text-xs text-slate-500">
            Drag cards to change order. First image is the cover on the projects page.
          </p>
        </div>

        {items.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li
                key={item.key}
                draggable
                onDragStart={() => onDragStart(item.key)}
                onDragOver={(event) => onDragOver(event, item.key)}
                onDrop={() => onDrop(item.key)}
                onDragEnd={() => {
                  setDragKey(null);
                  setOverKey(null);
                }}
                className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
                  dragKey === item.key
                    ? "scale-[0.98] border-blue-400 opacity-70"
                    : overKey === item.key
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-[16/10] cursor-grab bg-slate-100 active:cursor-grabbing">
                  {item.kind === "existing" ? (
                    <Image
                      src={item.photo.src}
                      alt={item.photo.alt}
                      fill
                      unoptimized
                      sizes="240px"
                      className="pointer-events-none object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- local blob preview
                    <img
                      src={item.url}
                      alt={item.file.name}
                      className="pointer-events-none h-full w-full object-cover"
                    />
                  )}
                  <span className="absolute left-2 top-2 rounded-full bg-slate-950/75 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-slate-600 opacity-0 shadow transition group-hover:opacity-100">
                    Drag
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <p className="truncate text-xs text-slate-500">
                    {item.kind === "existing" ? item.photo.alt || "Uploaded photo" : `New · ${item.file.name}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="shrink-0 text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <ImageUploadCard
          name={`uploads-picker-${formId}`}
          label={items.length > 0 ? "Add more photos" : "Upload project photos"}
          multiple
          onFiles={addFiles}
        />
        <label className="block text-sm font-semibold text-slate-800">
          Description for new uploads
          <input name="uploadAlt" placeholder="Team using the new workflow" className={field} />
        </label>
      </div>

      <fieldset className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-800">Homepage</legend>
        <p className="mt-1 text-xs font-normal text-slate-500">
          Up to three featured projects appear on the home page. Order 1 is the large card; 2 and 3 are the side cards.
        </p>
        <label className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <input
            type="checkbox"
            name="featuredOnHome"
            defaultChecked={project?.featuredOnHome ?? false}
            className="h-4 w-4 rounded border-slate-300 text-blue-700"
          />
          Feature on homepage
        </label>
        <label className="mt-3 block text-sm font-semibold text-slate-800">
          Homepage order
          <input
            name="homeOrder"
            type="number"
            min={1}
            step={1}
            defaultValue={project?.homeOrder ?? 100}
            className={field}
          />
        </label>
      </fieldset>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <input
          type="checkbox"
          name="published"
          defaultChecked={project?.published ?? true}
          className="h-4 w-4 rounded border-slate-300 text-blue-700"
        />
        Published on the site
      </label>
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{state.error}</p>
      ) : null}
      {items.length === 0 ? (
        <p className="text-sm font-medium text-amber-700">Add at least one photo before saving.</p>
      ) : null}
      <button
        type="submit"
        disabled={pending || items.length === 0}
        className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-700 px-5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : project ? "Save project" : "Create project"}
      </button>
    </form>
  );
}
