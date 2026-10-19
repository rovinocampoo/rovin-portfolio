import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-24 border-b border-line"
    >
      <Container className="py-20 sm:py-28">
        <SectionHeading
          id="experience-title"
          index="03"
          eyebrow="Experience"
          title="A decade shipping and supporting software."
          description="Development, developer support, and API work — with the operational side of running a business alongside it."
        />

        <ol className="relative mt-14 flex flex-col">
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[3px] top-3 w-px bg-line"
          />
          {experience.map((job) => (
            <li
              key={`${job.org}-${job.role}`}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[0.45rem] h-2 w-2 rounded-full border bg-ink ${
                  job.current ? "border-lime" : "border-line-strong"
                }`}
              />
              <Reveal>
                <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
                      {job.period}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream">
                      {job.org}
                    </p>
                    {job.current ? (
                      <span className="mt-1 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-lime"
                        />
                        Current
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h3 className="font-display text-xl leading-tight text-cream sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-sage">
                      {job.summary}
                    </p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-relaxed text-sage"
                        >
                          <span aria-hidden="true" className="text-lime">
                            –
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
