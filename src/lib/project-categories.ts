import type { ServiceSlug } from "@/lib/service-content";
import { services } from "@/lib/service-content";

/** Project categories mirror the public services. */
export type ProjectCategory = ServiceSlug;

export const projectCategories: ProjectCategory[] = ["crm", "ops", "workflow", "ai"];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  crm: "CRM",
  ops: "Project & ops",
  workflow: "Workflow",
  ai: "AI assistants",
};

export function isProjectCategory(value: string): value is ProjectCategory {
  return projectCategories.includes(value as ProjectCategory);
}

export function projectCategoryLabel(category: ProjectCategory | string | undefined) {
  if (category && isProjectCategory(category)) {
    return projectCategoryLabels[category];
  }
  return "Uncategorized";
}

export function projectCategoryTitle(category: ProjectCategory) {
  return services[category].title;
}

/** Accepts legacy single `category` or `categories` array. Empty if none valid. */
export function normalizeProjectCategories(input: unknown): ProjectCategory[] {
  const raw = Array.isArray(input)
    ? input
    : typeof input === "string"
      ? [input]
      : [];
  const unique = [...new Set(raw.filter((value): value is string => typeof value === "string"))];
  return unique.filter(isProjectCategory);
}

export function projectHasCategory(
  categories: ProjectCategory[] | undefined,
  category: ProjectCategory,
) {
  return (categories ?? []).includes(category);
}
