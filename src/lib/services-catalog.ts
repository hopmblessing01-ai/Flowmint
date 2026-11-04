import { serviceSlugs, services, type ServiceSlug } from "@/lib/service-content";

export type ServiceCatalogEntry = {
  title: string;
  summary: string;
  href: string;
  image: string;
  imageAlt: string;
};

/** Listing rows for `/services`. */
export function getServiceCatalog(): ServiceCatalogEntry[] {
  return serviceSlugs.map((slug: ServiceSlug) => {
    const s = services[slug];
    return {
      title: s.title,
      summary: s.summary,
      href: `/services/${slug}`,
      image: s.coverImage,
      imageAlt: s.coverImageAlt,
    };
  });
}
