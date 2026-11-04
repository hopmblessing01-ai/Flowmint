import type { ProjectPhoto } from "@/lib/content-store";
import { isManagedUploadSrc } from "@/lib/media";

export function parsePhotoLines(raw: string): ProjectPhoto[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [src, ...altParts] = line.split("|");
      const url = src.trim();
      return {
        src: url,
        alt: altParts.join("|").trim() || "Project photo",
      };
    })
    .filter((photo) => isManagedUploadSrc(photo.src));
}

export function photosToLines(photos: ProjectPhoto[]) {
  return photos.map((photo) => `${photo.src} | ${photo.alt}`).join("\n");
}

/** Keep only photos whose src was already on the project (blocks path/URL injection). */
export function resolveExistingPhoto(
  tokenBody: string,
  allowedBySrc: Map<string, ProjectPhoto>,
): ProjectPhoto | null {
  const parsed = parsePhotoLines(tokenBody)[0];
  if (!parsed) return null;
  const allowed = allowedBySrc.get(parsed.src);
  if (!allowed) return null;
  return {
    src: allowed.src,
    alt: parsed.alt || allowed.alt,
  };
}
