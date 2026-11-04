import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPhoto } from "@/components/project-photo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getArticle, getArticles } from "@/lib/content-store";
import { siteName } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Blog" };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: `${article.title} | ${siteName}`,
      description: article.description,
      type: "article",
    },
  };
}

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const more = getArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main className="pb-24 pt-[7.5rem]">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            <Link href="/blog" className="hover:text-blue-900">
              Blog
            </Link>
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{article.description}</p>
          {article.cover ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.75rem]">
              <ProjectPhoto
                src={article.cover.src}
                alt={article.cover.alt}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          ) : null}
          <div className="mt-10 space-y-5 text-base leading-relaxed text-slate-700 sm:text-lg">
            {paragraphs(article.body).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
        {more.length > 0 ? (
          <aside className="mx-auto mt-16 max-w-3xl border-t border-slate-200 px-4 pt-10 sm:px-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">More</h2>
            <ul className="mt-4 space-y-3">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="text-lg font-semibold text-blue-800 hover:text-blue-950"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
