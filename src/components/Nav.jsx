import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu.jsx";

/*
 * One dial that morphs between sun and moon rather than two icons that swap.
 * The mask is what makes the crescent: a black circle over the white field
 * punches a bite out of the body. Parked off-canvas it punches nothing, which
 * is the sun. The animation lives in .tt-* in index.css.
 *
 * The mask id has to be document-unique — useId keeps it that way if a second
 * toggle is ever added (a mobile row, say), since duplicate ids would make one
 * steal the other's mask.
 */
function SunMoon({ dark }) {
  const maskId = `tt-mask-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className="tt h-[1.125rem] w-[1.125rem]"
      data-dark={dark}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <mask id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle className="tt-carve" cx="17" cy="8" r="9" fill="black" />
      </mask>
      <circle className="tt-body" cx="12" cy="12" r="9" fill="currentColor" stroke="none" mask={`url(#${maskId})`} />
      <g className="tt-rays">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="5.64" y1="5.64" x2="4.22" y2="4.22" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        <line x1="5.64" y1="18.36" x2="4.22" y2="19.78" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      </g>
    </svg>
  );
}

/* Desktop-only, per the brief. The stylesheet still works at any width, so
   resizing a window below the breakpoint leaves a themed page rather than a
   half-themed one — it just hides the control. */
function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("lr-theme", dark ? "dark" : "light");
    } catch {
      /* private mode — no persistence, which is fine */
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      /* relative z-50 for the same reason as .burger — the menu panel is a
         positioned sibling and would otherwise paint over this. */
      className="lift relative z-50 hidden cursor-pointer text-[hsl(var(--ink-soft))] transition-colors duration-300 hover:text-[hsl(var(--oxblood))] active:scale-90 md:inline-flex"
    >
      <SunMoon dark={dark} />
    </button>
  );
}

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
      <div className="mx-auto flex h-16 md:px-6 items-center justify-between gap-6 px-6">
        <Link to="/" className="serif lift inline-block text-2xl leading-none">
          Lily<span className="text-[hsl(var(--oxblood))]">.</span>
        </Link>

        {/* The link row moved into the menu panel; the hamburger takes the slot
            the Get in touch button used to hold, and that button moved to the
            hero. Mobile gains navigation it never had — the old row was
            hidden below the breakpoint with nothing standing in for it. */}
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <Menu />
        </div>
      </div>
    </header>
  );
}
