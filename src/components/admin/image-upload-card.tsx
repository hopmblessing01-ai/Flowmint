"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  name: string;
  label: string;
  hint?: string;
  multiple?: boolean;
  accept?: string;
  previewUrl?: string | null;
  previewAlt?: string;
  previewIsLocal?: boolean;
  onFiles?: (files: File[]) => void;
};

export function ImageUploadCard({
  name,
  label,
  hint = "PNG, JPG, WebP, or GIF",
  multiple = false,
  accept = "image/png,image/jpeg,image/webp,image/gif",
  previewUrl = null,
  previewAlt = "Preview",
  previewIsLocal = false,
  onFiles,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function takeFiles(list: FileList | File[] | null) {
    const files = Array.from(list ?? []).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) return;
    onFiles?.(multiple ? files : files.slice(0, 1));
  }

  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        if (event.currentTarget.contains(event.relatedTarget as Node)) return;
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        takeFiles(event.dataTransfer.files);
        if (inputRef.current && event.dataTransfer.files?.length) {
          const dt = new DataTransfer();
          const next = multiple
            ? Array.from(event.dataTransfer.files)
            : [event.dataTransfer.files[0]].filter(Boolean);
          next.forEach((file) => dt.items.add(file));
          inputRef.current.files = dt.files;
        }
      }}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition ${
        dragging
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
      }`}
    >
      {previewUrl ? (
        <div className="relative aspect-[16/10] w-full bg-slate-100">
          {previewIsLocal ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob preview
            <img src={previewUrl} alt={previewAlt} className="h-full w-full object-cover" />
          ) : (
            <Image
              src={previewUrl}
              alt={previewAlt}
              fill
              unoptimized
              sizes="480px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-4 py-3">
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="text-xs text-white/80">Drop a new image to replace, or click to browse</p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 px-6 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-700">
            +
          </span>
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          <p className="max-w-xs text-xs leading-relaxed text-slate-500">
            Drag and drop here, or click to browse. {hint}
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(event) => takeFiles(event.target.files)}
      />
    </div>
  );
}
