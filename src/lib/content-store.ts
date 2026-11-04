import fs from "fs";
import path from "path";
import {
  normalizeProjectCategories,
  type ProjectCategory,
} from "@/lib/project-categories";

export type ProjectPhoto = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  skills: string[];
  photos: ProjectPhoto[];
  published: boolean;
  /** When true, eligible for the homepage projects section (up to 3). */
  featuredOnHome: boolean;
  /** Lower numbers appear first; 1 is the large lead card. */
  homeOrder: number;
  updatedAt: string;
};

type StoredProject = Omit<Project, "categories" | "featuredOnHome" | "homeOrder"> & {
  categories?: ProjectCategory[];
  category?: ProjectCategory | string;
  featuredOnHome?: boolean;
  homeOrder?: number;
};

function normalizeProject(item: StoredProject): Project {
  const { category: legacyCategory, categories: storedCategories, ...rest } = item;
  const homeOrder =
    typeof item.homeOrder === "number" && Number.isFinite(item.homeOrder)
      ? item.homeOrder
      : 100;
  return {
    ...rest,
    categories: normalizeProjectCategories(storedCategories ?? legacyCategory),
    skills: Array.isArray(item.skills) ? item.skills : [],
    photos: Array.isArray(item.photos) ? item.photos : [],
    featuredOnHome: Boolean(item.featuredOnHome),
    homeOrder,
  };
}

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  cover: ProjectPhoto | null;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
};

const projectsFile = path.join(process.cwd(), "data", "projects.json");
const articlesFile = path.join(process.cwd(), "data", "articles.json");

function readList<T>(file: string): T[] {
  if (!fs.existsSync(file)) return [];
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as T[];
  return Array.isArray(parsed) ? parsed : [];
}

function writeList<T>(file: string, items: T[]) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(items, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

export function getProjects(includeDrafts = false): Project[] {
  const items = readList<StoredProject>(projectsFile).map(normalizeProject);
  return includeDrafts ? items : items.filter((item) => item.published);
}

export function getProject(slug: string, includeDrafts = false) {
  return getProjects(includeDrafts).find((item) => item.slug === slug) ?? null;
}

/** Published projects marked for the homepage, ordered, max three. */
export function getHomeProjects(limit = 3): Project[] {
  return getProjects()
    .filter((item) => item.featuredOnHome)
    .sort((a, b) => a.homeOrder - b.homeOrder || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function saveProjects(items: Project[]) {
  writeList(projectsFile, items);
}

export function getArticles(includeDrafts = false): Article[] {
  const items = readList<Article>(articlesFile);
  const visible = includeDrafts ? items : items.filter((item) => item.published);
  return [...visible].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string, includeDrafts = false) {
  return (
    readList<Article>(articlesFile).find((item) => item.slug === slug && (includeDrafts || item.published)) ??
    null
  );
}

export function saveArticles(items: Article[]) {
  writeList(articlesFile, items);
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "item";
}

export function uniqueSlug(base: string, taken: string[]) {
  let slug = slugify(base);
  let n = 2;
  while (taken.includes(slug)) {
    slug = `${slugify(base).slice(0, 70)}-${n}`;
    n += 1;
  }
  return slug;
}
