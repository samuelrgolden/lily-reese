import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import CutReveal from "./CutReveal.jsx";
import useTilt from "./useTilt.js";
import { ARTICLES, FEATURED } from "../data/articles.js";
import { pubSlug } from "../data/publications.js";

/* Filter by masthead — plus a Class Work view for coursework reporting */
const FILTERS = ["All", "Eugene Weekly", "SOJC", "Ascend Magazine", "Ethos Magazine", "Class Work"];

function ArticleCard({ article, index }) {
  /* Passing the image's real pixel size lets the browser reserve the card's
     full height on first paint. Without it the collage re-balances as each
     photo arrives and cards visibly jump between columns. */
  const [imgW, imgH] = article.size ?? [];

  /* Tilt goes on the <a>, not on the Reveal wrapper: the wrapper's own
     transform is the entrance, and the two would overwrite each other. */
  const tiltRef = useTilt();

  return (
    <Reveal as="article" delay={(index % 3) * 70} className="mb-8 break-inside-avoid md:mb-10">
      <a
        ref={tiltRef}
        href={article.href}
        target="_blank"
        rel="noreferrer"
        data-pub={pubSlug(article.pub)}
        className="group workcard tilt lift-card block rounded-xl border border-[hsl(var(--ink)/0.1)] bg-[hsl(var(--paper))] p-3.5"
      >
        <div className="relative overflow-hidden rounded-lg bg-[hsl(var(--paper-deep))]">
          {/* Natural aspect ratio — the collage columns absorb the height differences */}
          <img
            src={article.img}
            alt={article.title}
            width={imgW}
            height={imgH}
            loading="lazy"
            className="block h-auto w-full"
          />
          <span className="smallcaps work-tag absolute left-3 top-3 rounded-sm border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] px-2.5 py-1 text-[0.55rem]">
            {article.tags[0]}
          </span>
          <span
            aria-hidden="true"
            className="work-arrow absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-md border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] text-[hsl(var(--ink))] transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
              className="h-3 w-3"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </span>
        </div>
        <p className="smallcaps mt-3.5 text-[0.65rem] text-[hsl(var(--muted-warm))]">
          {article.pub} <span className="work-dot">•</span> {article.date}
        </p>
        <h3 className="serif work-title mt-1.5 text-xl leading-snug transition-colors duration-300">
          {article.title}
        </h3>
        <p className="serif mt-1.5 text-base italic leading-normal text-[hsl(var(--ink-soft))]">
          {article.description}
        </p>
        <p className="smallcaps mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[0.58rem] text-[hsl(var(--muted-warm))]">
          {article.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      </a>
    </Reveal>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("All");
  /* Every branch filters FEATURED, never ARTICLES — otherwise picking the SOJC
     filter would pull the alumni profiles back onto the page that deliberately
     excludes them. */
  const shown =
    filter === "All"
      ? FEATURED
      : filter === "Class Work"
        ? FEATURED.filter((a) => a.kind === "class")
        : FEATURED.filter((a) => a.pub === filter);

  return (
    <section id="work" className="py-14 md:py-16">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            {/* Heading kept out of the Reveal so the mask isn't fighting a fade */}
            <Reveal>
              <p className="smallcaps text-[hsl(var(--muted-warm))]">Section II</p>
            </Reveal>
            <h2 className="display mt-3 text-[2.9rem] md:text-[4.2rem]">
              <CutReveal delay={90}>
                Selected <span className="italic text-[hsl(var(--oxblood))]">Work</span>
              </CutReveal>
            </h2>
            <Reveal as="p" delay={170} className="serif mt-5 max-w-md text-lg text-[hsl(var(--ink-soft))]">
              Features, essays, and reported stories across five mastheads — from Ethos Magazine to the Eugene
              Weekly.
            </Reveal>

            {/* Route through to the full file. The collage below is a wall you
                browse; the All Work page is the list you search. */}
            <Reveal delay={210}>
              <Link
                to="/work"
                className="group smallcaps lift btn-flow mt-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--ink))] px-5 py-2.5 [--flow:hsl(var(--oxblood))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
              >
                View all {ARTICLES.length} pieces
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
          <Reveal
            delay={220}
            className="flex flex-wrap gap-2 md:max-w-md md:justify-end md:pt-2"
            role="group"
            aria-label="Filter articles by publication"
          >
            {FILTERS.map((pub) => {
              const active = filter === pub;
              return (
                <button
                  key={pub}
                  type="button"
                  onClick={() => setFilter(pub)}
                  aria-pressed={active}
                  data-filled={active}
                  className={`smallcaps lift btn-flow cursor-pointer border px-4 py-2 [--flow:hsl(var(--oxblood))] ${
                    active
                      ? "border-[hsl(var(--ink))] bg-[hsl(var(--ink))] text-[hsl(var(--paper))]"
                      : "border-[hsl(var(--ink)/0.25)] text-[hsl(var(--ink-soft))] hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--ink))]"
                  }`}
                >
                  {pub}
                </button>
              );
            })}
          </Reveal>
        </div>

        {/* Masonry collage: cards keep their photos' natural shapes and interlock */}
        <div className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {shown.map((article, i) => (
            <ArticleCard key={article.href} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
