import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-5 py-9 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-display text-lg text-cream">
            {site.shortName}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sage">
            {site.role}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          {site.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="nav-link text-sage transition-colors hover:text-cream"
            >
              {social.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="nav-link text-sage transition-colors hover:text-cream"
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
