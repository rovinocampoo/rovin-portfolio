import { Container } from "@/components/container";
import { CredentialsSection } from "@/components/credentials-section";
import { ExperienceSection } from "@/components/experience-section";
import { Hero } from "@/components/hero";
import { ProjectShowcase } from "@/components/project-showcase";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SignalTrace } from "@/components/signal-trace";
import { ToolkitSection } from "@/components/toolkit-section";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { buttonPrimary, buttonSecondary } from "@/lib/ui";

const approachNodes = ["Interface", "API", "Data", "Deploy"];

const contactRows = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  ...site.socials.map((social) => ({
    label: social.label,
    value: social.href.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    href: social.href,
    external: true,
  })),
];

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="approach"
        aria-labelledby="approach-title"
        className="scroll-mt-24 border-b border-line"
      >
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal>
              <SectionLabel index="01">Approach</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="approach-title"
                className="max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-cream"
              >
                Interface, data, and infrastructure treated as one system.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-sage">
                I work across the stack so the pieces fit together — considered
                interfaces, dependable APIs, and data models that hold up after
                launch.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-2 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                {approachNodes.map((node, index) => (
                  <li key={node} className="flex items-center gap-2">
                    <span className="text-lime">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-cream">{node}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal y={0} amount={0.2}>
            <SignalTrace mode="scroll" />
          </Reveal>
        </Container>
      </section>

      <section
        id="work"
        aria-labelledby="work-title"
        className="scroll-mt-24 border-b border-line"
      >
        <Container className="py-20 sm:py-28">
          <Reveal>
            <h2
              id="work-title"
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-sage"
            >
              <span className="text-lime">02</span>
              <span className="whitespace-nowrap">Selected work</span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </h2>
          </Reveal>

          <div className="mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
            <div className="mb-10 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <p className="border-b border-line-strong pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream">
                  {projects.length} projects
                </p>
                <p className="mt-4 hidden max-w-[18ch] text-sm leading-relaxed text-sage lg:block">
                  Two products, built end to end.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              {projects.map((project, index) => (
                <ProjectShowcase
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ExperienceSection />

      <CredentialsSection />

      <ToolkitSection />

      <section
        id="contact"
        aria-labelledby="contact-title"
        className="scroll-mt-24"
      >
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionLabel index="06">Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="contact-title"
              className="mt-5 max-w-[22ch] font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-cream"
            >
              Let&rsquo;s build something useful.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sage">
              For work, collaboration, or a question — email is the fastest way
              to reach me.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className={buttonPrimary}>
                Email me
              </a>
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonSecondary}
                >
                  {social.label}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
              {contactRows.map((row) => (
                <div key={row.label} className="flex flex-col gap-2 bg-ink p-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
                    {row.label}
                  </dt>
                  <dd className="text-sm text-cream">
                    <a
                      href={row.href}
                      {...(row.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="break-words transition-colors hover:text-lime focus-visible:text-lime"
                    >
                      {row.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
