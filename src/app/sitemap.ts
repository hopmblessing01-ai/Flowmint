import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content-store";
import { siteUrl } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/services/crm", "/services/ops", "/services/workflow", "/services/ai", "/projects", "/blog", "/about", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...getArticles().map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
