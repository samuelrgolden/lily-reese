import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import CutReveal from "../components/CutReveal.jsx";
import { ARTICLES, isRecent } from "../data/articles.js";
import { FILTERS, pubSlug } from "../data/publications.js";

/*
 * ALL WORK
 * ----------------------------------------------------------------------------
 * After "Project Showcase" (@jatin-yadav05, 21st.dev): a list of rows rather
 * than a grid. The row carries its own thumbnail hard right — same structure as
 * the Profile Studios work cards — and what rides the cursor is a disc with an
 * up-and-right arrow, the universal "this opens away from here" mark.
 *
 * The row sets `cursor: none` on fine pointers, so the disc IS the pointer
 * while you're over the list. That's why the follow weight is high (0.32): at a
 * lazy lerp it stops reading as the cursor and starts reading as a thing
 * chasing it. One node for the whole list, moved on rAF.
 *
 * Pointer-only. Touch keeps the pointer it never had replaced, and the row
 * thumbnail is doing the visual work at every size anyway.
 */
function useHoverCursor() {
  const previewRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const placed = useRef(false);
  const raf = useRef(0);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 48rem)").matches;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !wide || !motion) return undefined;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      /* First sighting jumps rather than travels — the disc is mounted at the
         origin, and easing in from the corner is a comet across the page. */
      if (!placed.current) {
        placed.current = true;
        current.current.x = e.clientX;
        current.current.y = e.clientY;
      }
    };

    const tick = () => {
      const el = previewRef.current;
      if (el) {
        current.current.x += (target.current.x - current.current.x) * 0.32;
        current.current.y += (target.current.y - current.current.y) * 0.32;
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return { previewRef, active, setActive };
}

export default function WorkPage() {
  const { previewRef, active, setActive } = useHoverCursor();
  const [filter, setFilter] = useState(FILTERS[0].label);

  const chosen = FILTERS.find((f) => f.label === filter) ?? FILTERS[0];
  const shown = ARTICLES.filter(chosen.match);

  return (
    <PageShell>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          {/* Standalone, centred — this page has one subject and says so. */}
          <div className="text-center">
            <Reveal>
              <p className="smallcaps text-[hsl(var(--muted-warm))]">The Complete File</p>
            </Reveal>
            <h1 className="display mt-4 text-[4.5rem] md:text-[6rem]">
              <CutReveal delay={90}>
                All <span className="italic text-[hsl(var(--oxblood))]">Work</span>
              </CutReveal>
            </h1>
            <Reveal as="p" delay={200} className="serif mx-auto mt-4 max-w-xl text-sm text-[hsl(var(--ink-soft))] md:mt-5 md:text-lg">
              {ARTICLES.length} pieces — features, essays, audio, and reported stories, from food carts to finish
              lines.
            </Reveal>

            {/* Filters sit under the title and control the list below. Each pill
                wears its masthead's colour, so this row doubles as the legend
                for the colour coding in the list. */}
            <Reveal
              delay={260}
              className="mt-9 flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filter work by publication"
            >
              {FILTERS.map((f) => {
                const active2 = filter === f.label;
                const count = ARTICLES.filter(f.match).length;
                return (
                  <button
                    key={f.label}
                    type="button"
                    data-pub={f.slug ?? undefined}
                    data-active={active2}
                    /* deliberately no data-filled — that's the home page's
                       "keep the ink fill on hover" hook, and here the fill is
                       the masthead colour, which must survive the hover. */
                    aria-pressed={active2}
                    onClick={() => setFilter(f.label)}
                    className={`showcase-filter smallcaps lift btn-flow inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 md:gap-2 md:px-4 md:py-2 ${
                      active2
                        ? ""
                        : "border-[hsl(var(--ink)/0.25)] text-[hsl(var(--ink-soft))] hover:border-[hsl(var(--ink))]"
                    }`}
                  >
                    {f.slug && <span className="showcase-filter-dot" aria-hidden="true" />}
                    {f.label}
                    <span className="opacity-55">{count}</span>
                  </button>
                );
              })}
            </Reveal>
          </div>

          {/* The list. Hovering a row indents it, colours it by masthead, and
              hands its hue to the cursor disc. */}
          <ul
            className="showcase mt-14 border-t border-[hsl(var(--ink)/0.18)] md:mt-20"
            onPointerLeave={() => setActive(null)}
          >
            {shown.map((article, i) => (
              <Reveal
                as="li"
                /* href, not index — keyed by index the rows would be reused
                   across a filter change and keep the previous entrance state. */
                key={article.href}
                delay={Math.min(i, 6) * 45}
                className="showcase-row"
                data-pub={pubSlug(article.pub)}
              >
                <a
                  href={article.href}
                  target="_blank"
                  rel="noreferrer"
                  className="showcase-link group"
                  /* Pointer only — the disc is a cursor, and summoning one on
                     keyboard focus would park it wherever the mouse was left. */
                  onPointerEnter={() => setActive(article)}
                >
                  <span className="showcase-idx smallcaps" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="showcase-body">
                    <span className="showcase-title serif">{article.title}</span>
                    <span className="showcase-meta smallcaps">
                      {article.pub} <span className="showcase-dot">•</span> {article.date}
                      {isRecent(article) && <span className="showcase-recent">Recent</span>}
                    </span>
                  </span>

                  <span className="showcase-tag smallcaps" aria-hidden="true">
                    {article.tags[0]}
                  </span>

                  <span className="showcase-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>

                  {/* Hard right, last in the row. Decorative — the headline
                      beside it already names the piece. */}
                  <span className="showcase-thumb">
                    <img src={article.img} alt="" loading="lazy" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* One node for the whole list. Fixed to the viewport so it's
            positioned in the same space the pointer coordinates already are —
            no offset parent to subtract. data-pub keeps the masthead colour
            coding: the disc wears the hue of the row it's sitting over. */}
        <div
          className="showcase-cursor"
          ref={previewRef}
          data-on={Boolean(active)}
          data-pub={active ? pubSlug(active.pub) : undefined}
          aria-hidden="true"
        >
          <span className="showcase-cursor__disc">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M4.6 11.4 11.4 4.6M5.9 4.6h5.5v5.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </section>
    </PageShell>
  );
}
