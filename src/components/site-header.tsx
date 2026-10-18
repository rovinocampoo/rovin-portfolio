import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

const nav = [
  { label: "Work", href: "#work", compact: false },
  { label: "Experience", href: "#experience", compact: false },
  { label: "Toolkit", href: "#toolkit", compact: true },
  { label: "Contact", href: "#contact", compact: false },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-xl leading-none text-cream">
            {site.shortName}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-sage transition-colors group-hover:text-cyan sm:inline">
            {site.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link font-mono text-[11px] uppercase tracking-[0.18em] text-sage transition-colors hover:text-cream focus-visible:text-cream ${
                item.compact ? "hidden sm:inline" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
