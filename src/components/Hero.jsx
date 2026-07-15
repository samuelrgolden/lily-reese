import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";

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
  title: "Fair Warning: Come Hungry",
  pub: "Eugene Weekly",
  date: "July 9, 2026",
  tag: "Food",
  img: "/work/fair-warning.webp",
  href: "https://eugeneweekly.com/2026/07/09/fair-warning-come-hungry/",
};

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      className={`h-[15px] w-[15px] ${className}`}
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
  return (
    <section className="flex min-h-[100svh] flex-col pb-5 pt-24 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Masthead bar */}
        <div className="rule-strong" />
        <div className="smallcaps flex items-center justify-between gap-4 py-3 text-[hsl(var(--muted-warm))]">
          <span className="text-[hsl(var(--ink))]">The Lily Reese · Vol. 01</span>
          <span className="hidden md:block">Edition I · Portfolio</span>
          <span>Eugene, Oregon</span>
        </div>
        <div className="rule" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-10 py-10 md:gap-x-10 md:py-12">
          {/* Left: masthead heading */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <h1 className="display text-[clamp(3.5rem,13vw,13rem)]">
                Lily <span className="italic text-[hsl(var(--oxblood))]">Reese</span>
              </h1>
            </Reveal>

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
              <a
                href="#about"
                className="group lift mt-10 inline-flex items-center gap-2 smallcaps text-[hsl(var(--ink))] hover:text-[hsl(var(--oxblood))]"
              >
                Continue reading
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </Reveal>
          </div>

          {/* Right: Latest Dispatch card */}
          <div className="col-span-12 md:col-span-4 md:self-start">
            <Reveal delay={180}>
              <a
                href={DISPATCH.href}
                target="_blank"
                rel="noreferrer"
                className="group lift-card block rounded-xl border border-[hsl(var(--ink)/0.2)] bg-[hsl(var(--paper))] p-4"
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
