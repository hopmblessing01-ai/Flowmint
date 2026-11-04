import { Bot, Link2, TrendingUp, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  serviceCardBodyClass,
  serviceCardClass,
  serviceCardIconClass,
  serviceCardTitleClass,
} from "@/lib/service-card-styles";

const benefits = [
  {
    title: "Automated daily operations",
    body: "Your team spends less time on repeat data entry and status chasing. Reliable workflows run in the background while people focus on higher-value work.",
    icon: Workflow,
  },
  {
    title: "One connected stack",
    body: "CRM, finance, comms, and fulfillment stay in sync so handoffs are faster, cleaner, and easier to trust across teams.",
    icon: Link2,
  },
  {
    title: "Faster lead follow-up",
    body: "Consistent routing and timely responses help you convert more conversations into revenue - even when inquiry volume increases.",
    icon: TrendingUp,
  },
  {
    title: "24/7 chat & voice coverage",
    body: "AI chatbots and voice agents qualify inquiries, answer common questions, and route hot leads instantly - day or night.",
    icon: Bot,
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="scroll-mt-[7.5rem] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-scale" durationMs={1000}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            What you gain
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Systems that help your business run smoothly at scale
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            We help founders and operators connect tools, automate repetitive work,
            and respond faster - so growth feels steady, not fragile.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {benefits.map((item, i) => (
            <Reveal
              key={item.title}
              variant={i % 2 === 0 ? "slide-left" : "slide-right"}
              delayMs={i * 110}
              durationMs={1000}
            >
              <article className={serviceCardClass}>
                <div className={serviceCardIconClass}>
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className={`mt-5 text-lg font-semibold ${serviceCardTitleClass}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 flex-1 ${serviceCardBodyClass}`}>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
