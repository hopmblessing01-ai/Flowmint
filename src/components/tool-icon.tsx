"use client";

import Image from "next/image";
import { useState } from "react";

type ToolIconProps = {
  name: string;
  src: string;
};

function getInitials(name: string) {
  const words = name.split(/[\s.]+/).filter(Boolean);
  const letters =
    words.length === 1
      ? words[0].slice(0, 2)
      : words.map((word) => word[0]).join("");
  return letters.slice(0, 2).toUpperCase();
}

export function ToolIcon({ name, src }: ToolIconProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold tracking-tight text-blue-700 ring-1 ring-slate-200"
        aria-hidden
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white p-1.5 ring-1 ring-slate-200">
      <Image
        src={src}
        alt=""
        width={36}
        height={36}
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
