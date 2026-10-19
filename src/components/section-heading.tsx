import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 ${className ?? ""}`}>
      <Reveal>
        <SectionLabel index={index}>{eyebrow}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          id={id}
          className="max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-cream"
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="max-w-xl text-base leading-relaxed text-sage">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
