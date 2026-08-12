import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/* The source's house curve, registered once. */
if (!gsap.parseEase("sterling")) {
  CustomEase.create("sterling", "0.65, 0.01, 0.05, 0.99");
}

/* Routes now, not anchors — each opens its own page. The home page still has
   all four sections on it; these are additions, not a replacement. */
const LINKS = [
  { label: "About", to: "/about" },
  { label: "All Work", to: "/work" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

/*
 * KINETIC MENU
 * ----------------------------------------------------------------------------
 * After "Sterling Gate Kinetic Navigation" (21st.dev). The mechanic is kept —
 * three backdrop layers sweeping in from the right on a stagger, then the links
 * rising and unrotating behind them — and everything else is rebuilt.
 *
 * What changed from the source, and why:
 *
 *   NOT FULLSCREEN. It's a right-hand panel capped at 24rem. The source covers
 *   the viewport; on a one-page site the page behind is the context, so hiding
 *   all of it to show four links is a worse trade than it looks.
 *
 *   The ambient shape field is gone. It's five SVGs of indigo/violet/pink
 *   blobs that animate in as you hover each link — no room for them in a panel
 *   this width, and the palette is a different site's. The hover response it
 *   existed to provide is kept as the oxblood wash that wipes across each link,
 *   which is the component's own .nav-link-hover-bg doing the work instead.
 *
 *   The plus-to-cross glyph is a hamburger, per the brief, morphing to an X:
 *   the bars converge and cross rather than being swapped for a different icon.
 *
 * The panel is a real dialog — Escape closes it, focus moves in on open and
 * back to the trigger on close, and the page behind it is inert.
 */
export default function Menu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  /* Skips the close animation on first mount — without it the panel plays its
     exit on load, which flashes the scrim across the hero. */
  const mounted = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = rootRef.current?.querySelector(".nav-overlay-wrapper");
      const panel = panelRef.current;
      const overlay = rootRef.current?.querySelector(".overlay");
      const layers = rootRef.current?.querySelectorAll(".backdrop-layer");
      const links = rootRef.current?.querySelectorAll(".nav-link");
      const fades = rootRef.current?.querySelectorAll("[data-menu-fade]");
      if (!wrap || !panel) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const ease = reduced ? "none" : "sterling";
      const d = reduced ? 0.001 : 0.7;

      const tl = gsap.timeline({ defaults: { ease, duration: d } });

      if (open) {
        tl.set(wrap, { display: "block" })
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, 0)
          .fromTo(panel, { xPercent: 110 }, { xPercent: 0 }, 0)
          .fromTo(layers, { xPercent: 101 }, { xPercent: 0, stagger: reduced ? 0 : 0.12, duration: d * 0.82 }, 0)
          .fromTo(
            links,
            { yPercent: 140, rotate: 10 },
            { yPercent: 0, rotate: 0, stagger: reduced ? 0 : 0.05 },
            reduced ? 0 : "<+=0.35"
          );
        if (fades?.length) {
          tl.fromTo(
            fades,
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, stagger: reduced ? 0 : 0.04, clearProps: "all" },
            reduced ? 0 : "<+=0.2"
          );
        }
      } else if (mounted.current) {
        tl.to(overlay, { autoAlpha: 0 }, 0)
          .to(panel, { xPercent: 110 }, 0)
          .set(wrap, { display: "none" });
      }

      mounted.current = true;
    }, rootRef);

    return () => ctx.revert();
  }, [open]);

  /* Escape closes; focus goes into the panel on open and back to the trigger on
     close, so a keyboard visitor isn't dropped at the top of the document. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector("a");
    first?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <div ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="burger lift cursor-pointer text-[hsl(var(--ink))] hover:text-[hsl(var(--oxblood))]"
        data-open={open}
      >
        <span className="burger-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="nav-overlay-wrapper" data-nav={open ? "open" : "closed"}>
        {/* Scrim over the page, not a cover for it — the panel is the dialog. */}
        <button type="button" className="overlay" tabIndex={-1} aria-hidden="true" onClick={close} />

        <nav
          id="site-menu"
          ref={panelRef}
          className="menu-content"
          aria-label="Site"
          aria-hidden={!open}
          /* inert keeps the closed panel out of tab order even mid-transition,
             when it's still painted but sliding away. Boolean, not "" — React 19
             reads an empty string as false, which is the opposite of the intent. */
          inert={!open}
        >
          <div className="menu-bg" aria-hidden="true">
            <div className="backdrop-layer first" />
            <div className="backdrop-layer second" />
            <div className="backdrop-layer" />
          </div>

          <div className="menu-content-wrapper">
            <p className="smallcaps menu-eyebrow" data-menu-fade>
              Contents
            </p>

            <ul className="menu-list">
              {LINKS.map((link, i) => (
                <li className="menu-list-item" key={link.to}>
                  <Link to={link.to} className="nav-link" onClick={close}>
                    <span className="nav-link-index smallcaps" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="nav-link-text serif">{link.label}</span>
                    <span className="nav-link-hover-bg" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="smallcaps menu-foot" data-menu-fade>
              Eugene, Oregon
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}
