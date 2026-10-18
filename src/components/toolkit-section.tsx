import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { toolkit } from "@/lib/experience";

export function ToolkitSection() {
  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-title"
      className="scroll-mt-24 border-b border-line"
    >
      <Container className="py-20 sm:py-28">
        <SectionHeading
          id="toolkit-title"
          eyebrow="Toolkit"
          title="The tools behind the work."
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((group, index) => (
            <li key={group.group} className="bg-ink">
              <Reveal className="h-full" delay={index * 0.05}>
                <div className="flex h-full flex-col gap-4 p-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
                    {group.group}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm leading-relaxed text-cream"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
