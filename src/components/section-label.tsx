import type { ReactNode } from "react";

/**
 * The site's shared section label: an optional index, a monospace label, and a
 * hairline rule that runs to the edge. Used for numbered sections and for the
 * labelled bands inside each project case study.
 */
export function SectionLabel({
  index,
  children,
  line = true,
  className,
}: {
  index?: string;
  children: ReactNode;
  line?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-sage ${
        className ?? ""
      }`}
    >
      {index ? <span className="text-lime">{index}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
      {line ? (
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      ) : null}
    </p>
  );
}
