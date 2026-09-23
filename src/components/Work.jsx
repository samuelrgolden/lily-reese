import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import CutReveal from "./CutReveal.jsx";
import useTilt from "./useTilt.js";
import { ARTICLES, FEATURED } from "../data/articles.js";
import { pubSlug } from "../data/publications.js";

function ArticleCard({ article, index }) {
  /* Passing the image's real pixel size lets the browser reserve the card's
     full height on first paint. Without it the collage re-balances as each
     photo arrives and cards visibly jump between columns. */
  const [imgW, imgH] = article.size ?? [];

  /* Tilt goes on the <a>, not on the Reveal wrapper: the wrapper's own
     transform is the entrance, and the two would overwrite each other. */
  const tiltRef = useTilt();

  return (
    <Reveal as="article" delay={(index % 3) * 70} className="mb-2 break-inside-avoid sm:mb-8 md:mb-10">
      <a
        ref={tiltRef}
        href={article.href}
        target="_blank"
        rel="noreferrer"
        data-pub={pubSlug(article.pub)}
        className="group workcard tilt lift-card block rounded-md border border-[hsl(var(--ink)/0.1)] bg-[hsl(var(--paper))] p-1 sm:rounded-xl sm:p-3.5"
      >
        <div className="relative overflow-hidden rounded-sm bg-[hsl(var(--paper-deep))] sm:rounded-lg">
          {/* Natural aspect ratio — the collage columns absorb the height differences */}
          <img
            src={article.img}
            alt={article.title}
            width={imgW}
            height={imgH}
            loading="lazy"
            className="block h-auto w-full"
          />
          {/* Tag pill and arrow are desktop furniture — at a third of a phone
              screen they'd cover the photograph they sit on. */}
          <span className="smallcaps work-tag absolute left-3 top-3 hidden rounded-sm border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] px-2.5 py-1 text-[0.55rem] sm:block">
            {article.tags[0]}
          </span>
          <span
            aria-hidden="true"
            className="work-arrow absolute bottom-2.5 right-2.5 hidden h-8 w-8 items-center justify-center rounded-md border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] text-[hsl(var(--ink))] transition-colors duration-300 sm:flex"
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
        {/* Three-up on a phone leaves roughly 100px of column, so the card
            keeps only what survives at that width: masthead and headline. The
            date, blurb and tag list return at the first breakpoint. */}
        <p className="smallcaps mt-1.5 text-[0.42rem] leading-tight text-[hsl(var(--muted-warm))] sm:mt-3.5 sm:text-[0.65rem]">
          {article.pub}
          <span className="hidden sm:inline">
            {" "}
            <span className="work-dot">•</span> {article.date}
          </span>
        </p>
        <h3 className="serif work-title mt-1 text-[0.72rem] leading-tight transition-colors duration-300 sm:mt-1.5 sm:text-xl sm:leading-snug">
          {article.title}
        </h3>
        <p className="serif mt-1.5 hidden text-base italic leading-normal text-[hsl(var(--ink-soft))] sm:block">
          {article.description}
        </p>
        <p className="smallcaps mt-2.5 hidden flex-wrap gap-x-3 gap-y-1 text-[0.58rem] text-[hsl(var(--muted-warm))] sm:flex">
          {article.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      </a>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-14 md:py-16">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <div>
          {/* Heading kept out of the Reveal so the mask isn't fighting a fade */}
          <Reveal>
            <p className="smallcaps text-[hsl(var(--muted-warm))]">Section II</p>
          </Reveal>
          <h2 className="display mt-3 text-[3.5rem] md:text-[4.2rem]">
            <CutReveal delay={90}>
              Selected <span className="italic text-[hsl(var(--oxblood))]">Work</span>
            </CutReveal>
          </h2>
          <Reveal as="p" delay={170} className="serif mt-4 max-w-md text-sm text-[hsl(var(--ink-soft))] md:mt-5 md:text-lg">
            Five stories Lily chose to lead with — from the Eugene Weekly and Ascend to Ethos Magazine and
            the SOJC.
          </Reveal>
        </div>

        {/* Five cards don't need filtering; the All Work page is where the
            full file gets sorted by masthead. */}
        <div className="mt-10">
          {/* Route through to the full file. The collage below is a wall you
              browse; the All Work page is the list you search. */}
          <Reveal delay={210}>
            <Link
              to="/work"
              className="group smallcaps lift btn-flow inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--ink))] px-3.5 py-1.5 text-[0.55rem] [--flow:hsl(var(--oxblood))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))] md:gap-2 md:px-5 md:py-2.5 md:text-[0.72rem]"
            >
              View all {ARTICLES.length} pieces
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Masonry collage: cards keep their photos' natural shapes and
            interlock. Three columns on a phone — a thumbnail wall you scan —
            widening to two roomier ones at sm before returning to three. */}
        <div className="mt-8 columns-3 gap-2 sm:mt-12 sm:columns-2 sm:gap-8 lg:columns-3">
          {FEATURED.map((article, i) => (
            <ArticleCard key={article.href} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
