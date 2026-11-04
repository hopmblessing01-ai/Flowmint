"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminIsConfigured,
  clearAdminSession,
  createAdminPassword,
  isAdmin,
  passwordMatches,
  setAdminSession,
} from "@/lib/admin-auth";
import {
  getArticles,
  getProjects,
  saveArticles,
  saveProjects,
  slugify,
  uniqueSlug,
  type Article,
  type Project,
} from "@/lib/content-store";
import { deleteUploadFiles, saveUploads } from "@/lib/media";
import { resolveExistingPhoto } from "@/lib/photo-lines";
import { normalizeProjectCategories } from "@/lib/project-categories";

export type FormState = { error?: string };

async function gate() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function filesOf(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File);
}

function refreshContent() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/blog");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/articles");
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!adminIsConfigured()) {
    return { error: "Create an admin password before signing in." };
  }
  if (!passwordMatches(text(formData, "password"))) {
    return { error: "That password is not correct." };
  }
  await setAdminSession();
  redirect("/admin");
}

export async function setupAdminAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (adminIsConfigured()) {
    return { error: "An admin password is already set. Sign in with it." };
  }
  const password = text(formData, "password");
  const confirm = text(formData, "confirm");
  if (password.length < 8) {
    return { error: "Use at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "The two passwords do not match." };
  }
  try {
    createAdminPassword(password);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save the password." };
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

function assembleProjectPhotos(
  order: string[],
  uploaded: Project["photos"],
  previous: Project["photos"] | undefined,
): Project["photos"] {
  const allowed = new Map((previous ?? []).map((photo) => [photo.src, photo]));
  const photos: Project["photos"] = [];
  let uploadIndex = 0;

  for (const token of order) {
    if (token === "new") {
      const nextUpload = uploaded[uploadIndex];
      if (nextUpload) {
        photos.push(nextUpload);
        uploadIndex += 1;
      }
      continue;
    }
    if (token.startsWith("existing:")) {
      const kept = resolveExistingPhoto(token.slice("existing:".length), allowed);
      if (kept) photos.push(kept);
    }
  }

  if (photos.length === 0) {
    return [...(previous ?? []), ...uploaded];
  }
  return photos;
}

export async function saveProjectAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await gate();
  const existingSlug = text(formData, "slug");
  const title = text(formData, "title");
  const description = text(formData, "description");
  const categories = normalizeProjectCategories(formData.getAll("categories"));
  const skills = text(formData, "skills")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  const published = formData.get("published") === "on";
  const featuredOnHome = formData.get("featuredOnHome") === "on";
  const homeOrderRaw = Number.parseInt(text(formData, "homeOrder"), 10);
  const homeOrder = Number.isFinite(homeOrderRaw) ? homeOrderRaw : 100;

  if (!title || !description) {
    return { error: "Title and description are required." };
  }
  if (categories.length === 0) {
    return { error: "Choose at least one service category." };
  }
  if (skills.length === 0) {
    return { error: "Add at least one skill, separated by commas." };
  }

  try {
    const current = getProjects(true);
    const slug = existingSlug
      ? slugify(existingSlug)
      : uniqueSlug(
          title,
          current.map((item) => item.slug),
        );
    const previous = current.find((item) => item.slug === slug);
    const uploaded = await saveUploads(
      filesOf(formData, "uploads"),
      "projects",
      slug,
      text(formData, "uploadAlt"),
    );
    const order = formData.getAll("photoOrder").map((value) => String(value));
    const photos = assembleProjectPhotos(order, uploaded, previous?.photos);

    if (photos.length === 0) {
      return { error: "Upload at least one image." };
    }

    const next: Project = {
      slug,
      title,
      description,
      categories,
      skills,
      photos,
      published,
      featuredOnHome,
      homeOrder,
      updatedAt: new Date().toISOString(),
    };
    const without = current.filter((item) => item.slug !== slug);
    saveProjects(existingSlug ? current.map((item) => (item.slug === slug ? next : item)) : [next, ...without]);

    const keptSrcs = new Set(photos.map((photo) => photo.src));
    deleteUploadFiles(
      (previous?.photos ?? [])
        .map((photo) => photo.src)
        .filter((src) => !keptSrcs.has(src)),
    );

    refreshContent();
    revalidatePath(`/admin/projects/${slug}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save the project." };
  }

  redirect("/admin/projects");
}

export async function deleteProjectAction(slug: string, _formData?: FormData) {
  await gate();
  const current = getProjects(true);
  const victim = current.find((item) => item.slug === slug);
  saveProjects(current.filter((item) => item.slug !== slug));
  deleteUploadFiles(victim?.photos.map((photo) => photo.src) ?? []);
  refreshContent();
  redirect("/admin/projects");
}

export async function saveArticleAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await gate();
  const existingSlug = text(formData, "slug");
  const title = text(formData, "title");
  const description = text(formData, "description");
  const body = text(formData, "body");
  const published = formData.get("published") === "on";
  const publishedAt = text(formData, "publishedAt") || new Date().toISOString().slice(0, 10);

  if (!title || !description || !body) {
    return { error: "Title, summary, and body are required." };
  }

  try {
    const current = getArticles(true);
    const slug = existingSlug
      ? slugify(existingSlug)
      : uniqueSlug(
          title,
          current.map((item) => item.slug),
        );
    const uploaded = await saveUploads(
      filesOf(formData, "coverFile"),
      "articles",
      slug,
      text(formData, "coverAlt") || title,
    );
    const previous = current.find((item) => item.slug === slug);
    const next: Article = {
      slug,
      title,
      description,
      body,
      cover: uploaded[0] ?? previous?.cover ?? null,
      published,
      publishedAt,
      updatedAt: new Date().toISOString(),
    };
    saveArticles(
      existingSlug
        ? current.map((item) => (item.slug === slug ? next : item))
        : [next, ...current],
    );

    if (uploaded[0] && previous?.cover?.src && previous.cover.src !== uploaded[0].src) {
      deleteUploadFiles([previous.cover.src]);
    }

    refreshContent();
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/admin/articles/${slug}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save the post." };
  }

  redirect("/admin/articles");
}

export async function deleteArticleAction(slug: string, _formData?: FormData) {
  await gate();
  const current = getArticles(true);
  const victim = current.find((item) => item.slug === slug);
  saveArticles(current.filter((item) => item.slug !== slug));
  deleteUploadFiles([victim?.cover?.src]);
  refreshContent();
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/articles");
}
