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
 * than a grid, with the hovered row's image riding the cursor. It turns the
 * whole body of work into one scannable column and only spends screen space on
 * the piece you're actually pointing at.
 *
 * Rebuilt rather than installed. One preview element is reused for every row —
 * twenty-one mounted images that each animate their own opacity is twenty-one
 * chances to jank; swapping the `src` on a single node costs nothing and the
 * browser has them cached from the home page collage anyway.
 *
 * The follow is a lerp on rAF, not a transform written straight from the
 * pointer event: at 1:1 the image is welded to the cursor, and the lag is what
 * makes it read as a thing being dragged along rather than part of the pointer.
 *
 * Pointer-only, so touch gets a different affordance entirely — see the inline
 * thumbnail below, which is why the <img> is in the row markup too.
 */
function useCursorPreview() {
  const previewRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
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
    };

    const tick = () => {
      const el = previewRef.current;
      if (el) {
        // 0.12 is the follow weight: lower lags further behind the cursor.
        current.current.x += (target.current.x - current.current.x) * 0.12;
        current.current.y += (target.current.y - current.current.y) * 0.12;
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
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
  const { previewRef, active, setActive } = useCursorPreview();
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
            <h1 className="display mt-4 text-[3.2rem] md:text-[6rem]">
              <CutReveal delay={90}>
                All <span className="italic text-[hsl(var(--oxblood))]">Work</span>
              </CutReveal>
            </h1>
            <Reveal as="p" delay={200} className="serif mx-auto mt-5 max-w-xl text-lg text-[hsl(var(--ink-soft))]">
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
                    className={`showcase-filter smallcaps lift btn-flow inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 ${
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

          {/* The list. Hovering a row lifts it and hands its image to the
              preview; the row itself stays type, never a thumbnail grid. */}
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
                  onPointerEnter={() => setActive(article)}
                  onFocus={() => setActive(article)}
                  onBlur={() => setActive(null)}
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

                  {/* Touch has no hover to reveal the preview with, so the image
                      rides along in the row instead. Hidden once a fine pointer
                      and the breakpoint are both available. */}
                  <span className="showcase-thumb">
                    <img src={article.img} alt="" loading="lazy" />
                  </span>

                  <span className="showcase-tag smallcaps" aria-hidden="true">
                    {article.tags[0]}
                  </span>

                  <span className="showcase-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* One node, reused. Fixed to the viewport so it's positioned in the
            same space the pointer coordinates are already in. */}
        <div
          className="showcase-preview"
          ref={previewRef}
          data-on={Boolean(active)}
          data-pub={active ? pubSlug(active.pub) : undefined}
          aria-hidden="true"
        >
          {active && <img src={active.img} alt="" />}
        </div>
      </section>
    </PageShell>
  );
}
