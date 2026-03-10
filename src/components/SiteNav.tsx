import Link from "next/link";

const NAV_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "CAREERS", href: "/about#careers" },
  { label: "CONTACT US", href: "mailto:info@imprintapp.com" },
  { label: "FAQ", href: "/" },
  { label: "LOG IN", href: "/login" },
];

export default function SiteNav({ activePage }: { activePage?: string }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 sm:px-12 lg:px-20">
      <Link
        href="/"
        className="text-2xl font-bold text-imprint-dark"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Imprint
      </Link>
      <div className="hidden items-center gap-8 sm:flex">
        {NAV_LINKS.map((link) => {
          const isActive = activePage === link.label;
          const isExternal =
            link.href.startsWith("mailto:") || link.href.startsWith("http");

          const className = isActive
            ? "border-b border-imprint-dark text-xs font-medium tracking-wide text-imprint-dark"
            : "text-xs font-medium tracking-wide text-imprint-muted transition-colors hover:text-imprint-dark";

          if (isExternal) {
            return (
              <a key={link.label} href={link.href} className={className}>
                {link.label}
              </a>
            );
          }

          return (
            <Link key={link.label} href={link.href} className={className}>
              {link.label}
            </Link>
          );
        })}
      </div>
      <a
        href="https://imprintapp.com/quiz/welcome"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-imprint px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-imprint-hover"
      >
        Get Imprint
      </a>
    </nav>
  );
}
