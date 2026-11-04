import { Reveal } from "@/components/reveal";
import { ToolIcon } from "@/components/tool-icon";
import { tools } from "@/lib/tools";
import { toolCardRowClass, toolCardRowLabelClass } from "@/lib/service-card-styles";

export function ToolsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="slide-left" durationMs={1000}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Stack-agnostic
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Tools & platforms we implement daily
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            We meet you where you operate - CRM, project tools, automation
            platforms, and AI - then connect them into one reliable system.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((t, i) => (
            <Reveal
              key={t.name}
              variant={i % 2 === 0 ? "slide-left" : "slide-right"}
              delayMs={i * 75}
              durationMs={900}
            >
              <div className={toolCardRowClass}>
                <ToolIcon name={t.name} src={t.icon} />
                <span className={`min-w-0 flex-1 ${toolCardRowLabelClass}`}>
                  {t.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
