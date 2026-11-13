import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu.jsx";

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
          Lily Reese<span className="text-[hsl(var(--oxblood))]">.</span>
        </Link>

        {/* The link row moved into the menu panel; the hamburger takes the slot
            the Get in touch button used to hold, and that button moved to the
            hero. Mobile gains navigation it never had — the old row was
            hidden below the breakpoint with nothing standing in for it. */}
        <div className="flex items-center gap-5">
          <Menu />
        </div>
      </div>
    </header>
  );
}
