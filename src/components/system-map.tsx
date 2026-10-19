import type { SystemLayer } from "@/lib/projects";

const accentText = {
  lime: "text-lime",
  cyan: "text-cyan",
} as const;

/**
 * A static architecture map: the verified runtime layers of a project, in
 * request order, connected by a hairline flow (vertical on small screens,
 * horizontal from `lg` up). Decorative connectors live in `.system-flow` CSS,
 * so the accessible list stays a clean ordered list of layers; the caption
 * carries the plain-language summary for screen readers.
 */
export function SystemMap({
  layers,
  summary,
  note,
  accent,
  className,
}: {
  layers: SystemLayer[];
  summary: string;
  note?: string;
  accent: keyof typeof accentText;
  className?: string;
}) {
  return (
    <figure className={className}>
      <ol className="system-flow">
        {layers.map((layer, index) => (
          <li key={layer.role}>
            <div className="flex h-full flex-col border border-line bg-ink/40 p-4">
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                <span className="text-sage">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={accentText[accent]}>{layer.role}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-cream">
                {layer.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-sage">
                {layer.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="mt-5 flex flex-col gap-2">
        <p className="text-sm leading-relaxed text-sage">{summary}</p>
        {note ? (
          <p className="font-mono text-[11px] leading-relaxed text-sage">
            <span className="text-cream">Note · </span>
            {note}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
