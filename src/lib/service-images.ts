/** Local assets under `public/images/services/` (add files before deploy). */
const base = "/images/services";

type ServiceImageSlug = "crm" | "ops" | "workflow" | "ai";

/** Service listing card + detail page hero */
export function serviceCardImage(slug: ServiceImageSlug): string {
  return `${base}/${slug}.png`;
}

/** Detail page sidebar image (4:3) */
export function serviceInlineImage(slug: ServiceImageSlug): string {
  return `${base}/${slug}-inline.png`;
}
