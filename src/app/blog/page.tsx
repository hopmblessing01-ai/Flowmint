import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectPhoto } from "@/components/project-photo";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getArticles } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Flowmint on CRM setup, project tools, workflow automation, and AI assistants that teams can run after handover.",
  alternates: { canonical: "/blog" },
};

const hero = {
  src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2000&q=85",
  alt: "Open notebook and pen on a desk",
};

export default function BlogPage() {
  const articles = getArticles();

  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <PageHero image={hero.src} imageAlt={hero.alt} priority variant="page">
          <Reveal variant="fade-up" durationMs={1000}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/95">Blog</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
              How we think about systems
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]">
              Short notes on CRM, ops systems, workflows, and AI that stay useful after the build.
            </p>
          </Reveal>
        </PageHero>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <p className="text-slate-600">New posts will appear here soon.</p>
          ) : (
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {articles.map((article, index) => (
                <li key={article.slug}>
                  <Reveal variant="fade-up" delayMs={index * 40} durationMs={800}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group flex gap-5 py-7 transition sm:gap-8 sm:py-8"
                    >
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 group-hover:text-blue-800 sm:text-2xl">
                          {article.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {article.description}
                        </p>
                        <span className="mt-3 inline-block text-sm font-semibold text-blue-700 group-hover:text-blue-900">
                          Read post
                        </span>
                      </div>
                      {article.cover ? (
                        <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-[#071428] sm:block sm:h-28 sm:w-40">
                          <ProjectPhoto
                            src={article.cover.src}
                            alt={article.cover.alt}
                            sizes="160px"
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                        </div>
                      ) : null}
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
