import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AboutTeaserSection } from "@/components/sections/about-teaser";
import { ProjectsSection } from "@/components/sections/projects";
import { Hero } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { ProblemSection } from "@/components/sections/problem";
import { ServicesTeaserSection } from "@/components/sections/services-teaser";
import { ToolsSection } from "@/components/sections/tools";
import {
  brandKeywords,
  defaultDescription,
  siteName,
  siteTagline,
  siteUrl,
} from "@/lib/site-seo";

export const metadata: Metadata = {
  title: `${siteName} | ${siteTagline}`,
  description: defaultDescription,
  keywords: brandKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteName} | ${siteTagline}`,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <ServicesTeaserSection />
        <HowItWorksSection />
        <ProjectsSection />
        <ToolsSection />
        <AboutTeaserSection />
      </main>
      <SiteFooter />
    </>
  );
}
