import Link from "next/link";
import Button from "./Button";

const NAV_LINKS = [
  { label: "Solutions", href: "/#services" },
  { label: "Providers", href: "/providers" },
  { label: "Resources", href: "/#buyer-first" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/90">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="text-base font-bold tracking-tight text-white">
          Cyber<span className="text-accent">Pick</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:partners@cyberpick.io"
            className="hidden text-sm text-white/70 transition-colors hover:text-white sm:inline"
          >
            For providers
          </a>
          <Button href="/questionnaire" size="sm">
            Find providers
          </Button>
        </div>
      </div>
    </header>
  );
}
