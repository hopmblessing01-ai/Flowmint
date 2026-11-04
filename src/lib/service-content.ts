import { serviceCardImage, serviceInlineImage } from "@/lib/service-images";

export type ServiceSlug = "crm" | "ops" | "workflow" | "ai";

export const serviceSlugs: ServiceSlug[] = [
  "crm",
  "ops",
  "workflow",
  "ai",
];

export type ServiceHighlight = {
  title: string;
  description: string;
};

type ServicePage = {
  slug: ServiceSlug;
  title: string;
  headline: string;
  summary: string;
  /** Extra paragraph for the detail page body column */
  body: string;
  bullets: string[];
  coverImage: string;
  coverImageAlt: string;
  /** Secondary visual in the content area */
  inlineImage: string;
  inlineImageAlt: string;
  highlights: ServiceHighlight[];
};

export const services: Record<ServiceSlug, ServicePage> = {
  crm: {
    slug: "crm",
    title: "CRM Systems Setup & Optimization",
    headline: "A CRM your team actually uses - clean data, clear ownership",
    summary:
      "Lifecycle stages, ownership, and automation for HubSpot, Salesforce, Zoho CRM, Pipedrive, and GoHighLevel - built around how you sell.",
    body:
      "Most CRM pain is not the tool - it is unclear stages, noisy fields, and automations that fight reality. We implement HubSpot, Salesforce, Zoho CRM, Pipedrive, and GoHighLevel, then rebuild the model around your motion so operators and leadership see the same truth.",
    bullets: [
      "HubSpot, Salesforce, Zoho CRM, Pipedrive, and GoHighLevel",
      "Pipeline architecture aligned to your motion (PLG, sales-led, hybrid)",
      "Lifecycle emails, tasks, and SLAs triggered from real behavior",
      "Reporting leadership trusts: source, velocity, and forecast hygiene",
      "Integrations with billing, support, and product telemetry where needed",
    ],
    coverImage: serviceCardImage("crm"),
    coverImageAlt: "CRM pipeline and sales dashboard on a laptop",
    inlineImage: serviceInlineImage("crm"),
    inlineImageAlt: "Professional reviewing CRM data at a desk",
    highlights: [
      {
        title: "Stage & field design",
        description:
          "Stages, required fields, and handoff rules that match how deals really move - not a textbook funnel.",
      },
      {
        title: "Automation with guardrails",
        description:
          "Sequences and workflows that respect opt-outs, ownership, and edge cases so reps trust the system.",
      },
      {
        title: "Executive-ready reporting",
        description:
          "Dashboards and definitions everyone agrees on: pipeline health, velocity, and forecast drivers.",
      },
    ],
  },
  ops: {
    slug: "ops",
    title: "Project & Ops Systems",
    headline: "Boards and bases your team trusts - one source of truth",
    summary:
      "Monday.com, Airtable, ClickUp, Asana, and Notion set up around how work actually moves - clear status, owners, and less retyping.",
    body:
      "Project tools fail when every team invents its own board. We design Monday.com, Airtable, ClickUp, Asana, and Notion around one source of truth per kind of work: status rules, ownership, and views people can follow without a weekly cleanup meeting.",
    bullets: [
      "Monday.com, Airtable, ClickUp, Asana, and Notion",
      "Board and base architecture with clear status and ownership rules",
      "Views and templates matched to delivery, ops, and leadership needs",
      "Fewer duplicate boards - one place status is allowed to live",
      "Ready for workflow automation when the structure is clean enough to trust",
    ],
    coverImage: serviceCardImage("ops"),
    coverImageAlt: "Project board and ops planning workspace",
    inlineImage: serviceInlineImage("ops"),
    inlineImageAlt: "Team reviewing a project board on a laptop",
    highlights: [
      {
        title: "Structure before sync",
        description:
          "Status definitions, required fields, and owners agreed first - so the tool mirrors how work really moves.",
      },
      {
        title: "One source of truth",
        description:
          "Fewer competing boards and spreadsheets. Each kind of work has a home your team can trust.",
      },
      {
        title: "Ready to connect",
        description:
          "Clean structure so later automations update the right records instead of spreading duplicates.",
      },
    ],
  },
  workflow: {
    slug: "workflow",
    title: "Workflow Automation (n8n, Zapier, Make)",
    headline: "Production workflows with monitoring, retries, and docs",
    summary:
      "n8n, Zapier, Make, and Power Automate flows that connect your stack - with monitoring, retries, and docs your team can extend.",
    body:
      "We treat every workflow like product: versioning, naming, logging, and clear owners. That means fewer silent failures and a path for your team to extend flows without fear - whether the glue sits in n8n, Zapier, Make, or Power Automate.",
    bullets: [
      "n8n, Zapier, Make, and Power Automate",
      "Idempotent patterns, dedupe, and safe replays when vendors glitch",
      "Structured logging and alerting so failures are obvious - not silent",
      "Versioned flows with naming conventions your team can extend",
      "Tool selection guidance: when to use Make vs n8n vs native integrations",
    ],
    coverImage: serviceCardImage("workflow"),
    coverImageAlt: "Workflow automation builder on a monitor",
    inlineImage: serviceInlineImage("workflow"),
    inlineImageAlt: "Node-based automation workflow on screen",
    highlights: [
      {
        title: "Reliability first",
        description:
          "Retries, backoff, and idempotency so duplicate webhooks and flaky APIs do not corrupt your data.",
      },
      {
        title: "Observable by default",
        description:
          "Structured logs and alerts tied to business outcomes - not just “flow failed” with no context.",
      },
      {
        title: "Maintainable structure",
        description:
          "Subflows, env separation, and documentation so the next engineer picks up where we left off.",
      },
    ],
  },
  ai: {
    slug: "ai",
    title: "AI Chatbots & Voice Automation",
    headline: "Assistants with guardrails - qualified, routed, measurable",
    summary:
      "From chat widgets to voice agents, we implement AI that escalates gracefully and logs outcomes for continuous improvement.",
    body:
      "Great AI in ops is boring on purpose: tight scopes, explicit handoff, and traces you can audit. We pair UX writing with engineering so customers get fast answers - and your team gets structured outcomes in CRM or ticketing without surprises.",
    bullets: [
      "Intent design, knowledge boundaries, and human handoff rules",
      "CRM and ticketing updates driven by conversation outcomes",
      "Voice flows with natural confirmations and PCI-aware patterns",
      "Evaluation harnesses so prompt changes don’t surprise production",
    ],
    coverImage: serviceCardImage("ai"),
    coverImageAlt: "AI chat and voice assistant workspace",
    inlineImage: serviceInlineImage("ai"),
    inlineImageAlt: "Headset and chat interface for AI customer support",
    highlights: [
      {
        title: "Guardrails & tone",
        description:
          "Policies, refusal patterns, and brand-safe responses with human escalation paths.",
      },
      {
        title: "Systems of record",
        description:
          "Tickets, deals, and tags updated from conversation outcomes - not orphaned chats.",
      },
      {
        title: "Evals before deploy",
        description:
          "Test sets and regression checks so prompt and tool changes ship with confidence.",
      },
    ],
  },
};

export function isServiceSlug(s: string): s is ServiceSlug {
  return serviceSlugs.includes(s as ServiceSlug);
}
