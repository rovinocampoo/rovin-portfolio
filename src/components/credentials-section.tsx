import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { credentialKindLabel, credentials } from "@/lib/experience";

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-title"
      className="scroll-mt-24 border-b border-line"
    >
      <Container className="py-20 sm:py-28">
        <SectionHeading
          id="credentials-title"
          index="04"
          eyebrow="Education & credentials"
          title="Grounding in computer science, cloud, and security."
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {credentials.map((credential, index) => (
            <li key={credential.title} className="bg-ink">
              <Reveal className="h-full" delay={index * 0.05}>
                <div className="flex h-full flex-col gap-4 p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                    {credentialKindLabel[credential.kind]}
                  </span>
                  <h3 className="max-w-[24ch] font-display text-xl leading-tight text-cream">
                    {credential.title}
                  </h3>
                  <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.16em] text-sage">
                    {credential.issuer}
                    {credential.period ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="px-2 text-line-strong"
                        >
                          /
                        </span>
                        {credential.period}
                      </>
                    ) : null}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
