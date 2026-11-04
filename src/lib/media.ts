import fs from "fs";
import path from "path";
import type { ProjectPhoto } from "@/lib/content-store";

const MAX_BYTES = 6 * 1024 * 1024;
const uploadsRoot = path.join(process.cwd(), "public", "images", "uploads");

function extension(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (fromName === "jpeg") return "jpg";
  if (["jpg", "png", "webp", "gif"].includes(fromName)) return fromName;
  if (file.type === "image/jpeg") return "jpg";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "";
}

export function isManagedUploadSrc(src: string) {
  return src.startsWith("/images/uploads/");
}

/** Deletes files only under public/images/uploads (path-traversal safe). */
export function deleteUploadFiles(srcs: Array<string | null | undefined>) {
  const root = path.resolve(uploadsRoot);
  for (const src of srcs) {
    if (!src || !isManagedUploadSrc(src)) continue;
    const resolved = path.resolve(path.join(process.cwd(), "public", src.slice(1)));
    if (resolved !== root && !resolved.startsWith(root + path.sep)) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      fs.unlinkSync(resolved);
    }
  }
}

export async function saveUploads(files: File[], folder: string, slug: string, alt: string) {
  const saved: ProjectPhoto[] = [];
  const dir = path.join(uploadsRoot, folder);
  fs.mkdirSync(dir, { recursive: true });
  let index = 0;

  for (const file of files) {
    if (!file || file.size === 0) continue;
    if (file.size > MAX_BYTES) {
      throw new Error("Each image must be under 6 MB.");
    }
    const ext = extension(file);
    if (!ext) throw new Error("Use a PNG, JPG, WebP, or GIF image.");
    const name = `${slug}-${Date.now()}-${index}.${ext}`;
    fs.writeFileSync(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    saved.push({
      src: `/images/uploads/${folder}/${name}`,
      alt: alt || file.name.replace(/\.[^.]+$/, ""),
    });
    index += 1;
  }

  return saved;
}
