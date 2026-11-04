"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

export function ProjectPhoto({
  src,
  alt,
  className = "object-cover",
  sizes,
  priority = false,
}: ProjectPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1d4ed8_0%,#0c1e3d_45%,#071428_100%)]"
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
