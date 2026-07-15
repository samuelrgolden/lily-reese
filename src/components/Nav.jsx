import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Selected Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[hsl(var(--ink)/0.12)] bg-[hsl(var(--paper)/0.97)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-6 md:px-12">
        <a href="#top" className="serif lift inline-block text-2xl leading-none">
          Lily<span className="text-[hsl(var(--oxblood))]">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="smallcaps lift inline-block text-[hsl(var(--ink-soft))] hover:text-[hsl(var(--oxblood))]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="smallcaps lift whitespace-nowrap border border-[hsl(var(--ink))] px-4 py-2 hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
