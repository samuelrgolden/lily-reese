import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import CutReveal from "./CutReveal.jsx";
import useTilt from "./useTilt.js";

const WORDS = ["Writer", "Reporter", "Editor", "Storyteller"];

const BEATS = [
  "Climate",
  "Food",
  "Community",
  "Culture",
  "Activism",
  "Oregon",
  "Sustainability",
  "Arts",
  "Environment",
  "Long-form",
];

const DISPATCH = {
  title: "What’s in a Nickname?",
  pub: "Eugene Weekly",
  date: "July 23, 2026",
  tag: "Food",
  img: "/work/beccofino.webp",
  href: "https://eugeneweekly.com/2026/07/23/whats-in-a-nickname-2/",
};

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      className={`h-[0.9375rem] w-[0.9375rem] ${className}`}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 1700);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-grid whitespace-nowrap align-baseline text-[hsl(var(--ink))]">
      {/* invisible stack reserves the width of the longest word */}
      {WORDS.map((word) => (
        <span key={word} className="invisible col-start-1 row-start-1" aria-hidden="true">
          {word}.
        </span>
      ))}
      <span key={WORDS[index]} className="word-rotate col-start-1 row-start-1">
        {WORDS[index]}.
      </span>
    </span>
  );
}

export default function Hero() {
  const dispatchTilt = useTilt();

  return (
    /* pt-16 is exactly the nav's h-16, so the masthead's top rule lands flush
       against the bottom of the bar instead of floating below it. */
    <section className="flex min-h-[100svh] flex-col pb-5 pt-16">
      {/* Masthead bar — full-bleed rules; outer labels pushed to the page corners, center label stays put */}
      <div className="rule-strong" />
      <div className="smallcaps flex w-full items-center justify-between gap-4 px-6 py-3 text-[hsl(var(--muted-warm))] md:px-6">
        <span className="text-[hsl(var(--ink))]">The Lily Reese · Vol. 01</span>
        <span className="hidden md:block">Edition I · Portfolio</span>
        <span>Eugene, Oregon</span>
      </div>
      <div className="rule" />

      <div className="mx-auto w-full max-w-[90rem] px-6 md:px-12">
        {/* The masthead bar is pinned under the nav now, so this grid carries
            the hero's breathing room itself rather than inheriting it from the
            section's top padding — more space above the name than before. */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 pb-10 pt-20 md:gap-x-10 md:pb-12 md:pt-28">
          {/* Left: masthead heading */}
          <div className="col-span-12 md:col-span-8">
            {/* The one heading above the fold, so it runs on load rather than
                waiting for a scroll that already happened. */}
            <h1 className="display text-[clamp(3.5rem,13vw,13rem)]">
              <CutReveal immediate delay={120}>
                Lily <span className="italic text-[hsl(var(--oxblood))]">Reese</span>
              </CutReveal>
            </h1>

            <Reveal delay={120}>
              <p className="serif mt-6 text-2xl text-[hsl(var(--ink-soft))] md:text-3xl">
                A journalist who is a <RotatingWord />
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="smallcaps mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[hsl(var(--muted-warm))]">
                <span>
                  By <span className="text-[hsl(var(--ink))]">Lily Reese</span>
                </span>
                <span className="h-3.5 w-px bg-[hsl(var(--ink)/0.25)]" aria-hidden="true" />
                <span>
                  Reporting from <span className="text-[hsl(var(--ink))]">Eugene, OR</span>
                </span>
                <span className="h-3.5 w-px bg-[hsl(var(--ink)/0.25)]" aria-hidden="true" />
                <span>Honored — ACP 2025</span>
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                {/* .dl-arrow is a two-glyph mask: the ↓ falls out the bottom as a
                    fresh one drops in behind it. Below the breakpoint the class
                    is inert and the arrow is just a static ↓. */}
                <a
                  href="#about"
                  className="group dl lift inline-flex items-center gap-2 smallcaps text-[hsl(var(--ink))] hover:text-[hsl(var(--oxblood))]"
                >
                  Continue reading
                  <span aria-hidden="true" className="dl-arrow">
                    ↓
                  </span>
                </a>

                {/* Relocated from the nav. The hover:bg utility is what still
                    runs on touch and under the breakpoint; .btn-flow overrides
                    it on desktop with the disc fill. */}
                <a
                  href="#contact"
                  className="smallcaps lift btn-flow whitespace-nowrap rounded-full border border-[hsl(var(--ink))] px-5 py-2.5 [--flow:hsl(var(--oxblood))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))]"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Latest Dispatch card */}
          <div className="col-span-12 md:col-span-4 md:self-start">
            <Reveal delay={180}>
              <a
                ref={dispatchTilt}
                href={DISPATCH.href}
                target="_blank"
                rel="noreferrer"
                className="group tilt lift-card block rounded-xl border border-[hsl(var(--ink)/0.2)] bg-[hsl(var(--paper))] p-4"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="smallcaps text-[hsl(var(--oxblood))]">Latest Dispatch</span>
                  <ArrowUpRight className="text-[hsl(var(--muted-warm))] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--oxblood))]" />
                </span>
                <span className="relative mt-3 block aspect-[3/2] overflow-hidden rounded-lg bg-[hsl(var(--paper-deep))]">
                  <img src={DISPATCH.img} alt="" className="h-full w-full object-cover" />
                  <span className="smallcaps absolute left-3 top-3 rounded-sm border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] px-2.5 py-1 text-[0.6rem] text-[hsl(var(--ink))]">
                    {DISPATCH.tag}
                  </span>
                </span>
                <span className="smallcaps mt-3.5 block text-[hsl(var(--muted-warm))]">
                  {DISPATCH.pub} <span className="text-[hsl(var(--oxblood))]">•</span> {DISPATCH.date}
                </span>
                <span className="serif mt-1.5 block text-[1.25rem] leading-snug text-[hsl(var(--ink))] transition-colors duration-300 group-hover:text-[hsl(var(--oxblood))]">
                  {DISPATCH.title}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-bleed marquee ticker — pinned to the bottom of the first viewport */}
      <div className="mt-auto overflow-hidden border-y border-[hsl(var(--ink)/0.18)] bg-[hsl(var(--paper-deep)/0.55)] py-4">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {BEATS.map((beat) => (
                <span key={beat} className="serif flex items-center text-[1.6rem] text-[hsl(var(--ink))] md:text-[2rem]">
                  <span className="px-7 md:px-9">{beat}</span>
                  <span className="text-[hsl(var(--oxblood))]" aria-hidden="true">
                    ·
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
