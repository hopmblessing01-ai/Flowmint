export type HeroSlide = {
  src: string;
  alt: string;
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  description: string;
};

/** One slide per service: `public/images/hero1.png` … `hero4.png`. */
export const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero1.png",
    alt: "HubSpot CRM dashboard with deals, revenue, and pipeline stages",
    eyebrow: "CRM systems",
    titleBefore: "A CRM your team trusts,",
    titleHighlight: "not another empty database",
    description:
      "We set up HubSpot, Salesforce, Zoho CRM, Pipedrive, or GoHighLevel with clean stages, clear ownership, and reports that match how you sell.",
  },
  {
    src: "/images/hero4.png",
    alt: "Project board and ops planning on a laptop",
    eyebrow: "Project & ops systems",
    titleBefore: "Boards and bases with",
    titleHighlight: "one clear source of truth",
    description:
      "Monday.com, Airtable, ClickUp, Asana, and Notion structured around status, owners, and views your team can follow.",
  },
  {
    src: "/images/hero2.png",
    alt: "Workflow automation connecting everyday business tools",
    eyebrow: "Workflow automation",
    titleBefore: "Automations on n8n, Zapier, and Make that",
    titleHighlight: "stay maintainable",
    description:
      "Production flows with monitoring, retries, and docs - so the glue between your tools still works after go-live.",
  },
  {
    src: "/images/hero3.png",
    alt: "AI chatbot and voice agent on a phone",
    eyebrow: "AI assistants",
    titleBefore: "AI that qualifies leads and",
    titleHighlight: "writes back to your CRM",
    description:
      "Chat and voice agents that book meetings, update records, and hand off to a person when the answer is not clear.",
  },
];
