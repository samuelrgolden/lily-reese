import Reveal from "./Reveal.jsx";
import CutReveal from "./CutReveal.jsx";

const ROLES = [
  {
    year: "2026",
    role: "Intern Reporter",
    org: "Eugene Weekly",
    location: "Eugene, OR",
    range: "Jun 2026 – Present",
    now: true,
    bullets: [
      "Support reporting, research, and editorial production in a professional newsroom.",
      "Contribute to local journalism coverage and story development.",
    ],
  },
  {
    year: "2025",
    role: "Director, Editorial Lead, Copy Editor & Writer",
    org: "Ascend Magazine",
    location: "Eugene, OR",
    range: "Nov 2025 – Present",
    now: true,
    bullets: [
      "Write and edit feature stories highlighting athletes.",
      "Conduct interviews, research, and fact-checking to ensure depth and accuracy.",
      "Collaborate on pitches, narrative refinement, and multimedia for print and digital.",
      "Hold editorial leadership responsibilities and mentor other writers.",
    ],
  },
  {
    year: "2025",
    role: "Writing Intern",
    org: "SOJC Communications",
    location: "Eugene, OR",
    range: "Apr 2025 – Present",
    now: true,
    bullets: [
      "Write alumni profiles, faculty research stories, and featured student work for the School of Journalism and Communication.",
    ],
  },
  {
    year: "2025",
    role: "Copy Editor",
    org: "Daily Emerald",
    location: "Eugene, OR",
    range: "Mar 2025 – Mar 2026",
    now: false,
    bullets: [
      "Edit articles for grammar, clarity, AP style, and factual accuracy across the desk.",
      "Work across news, opinion, arts, and sports sections to ensure consistency and coherence.",
    ],
  },
  {
    year: "2023",
    role: "Writer",
    org: "Ethos Magazine",
    location: "Eugene, OR",
    range: "Oct 2023 – Mar 2026",
    now: false,
    bullets: [
      "Pitch and develop long-form story ideas for a student-run feature magazine.",
      "Conduct interviews and research to produce well-reported, AP-style features.",
      "Collaborate with editors, designers, and fellow writers on print and digital pieces.",
    ],
  },
  {
    year: "2023",
    role: "Writer",
    org: "Align Magazine",
    location: "Eugene, OR",
    range: "Sep 2023 – Nov 2025",
    now: false,
    bullets: [
      "Contributed opinion-driven pieces on fashion, culture, and the arts.",
      "Developed original pitches and crafted narratives for a term-by-term publication."
    ],
  },
];

const STATS = [
  ["Bylines & Edits", "5 publications"],
  ["Focus", "People · Place · Sustainability"],
  ["Editing", "Ascend"],
];

function TimelineEntry({ entry, showYear }) {
  return (
    <Reveal
      as="li"
      className="group relative border-t border-[hsl(var(--ink)/0.18)] py-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[6.875rem_1fr] md:gap-10 md:py-10 md:first:pt-0"
    >
      {/* Dot on the vertical line */}
      <span
        aria-hidden="true"
        className="absolute left-[6.625rem] top-[2.9rem] hidden h-[0.5625rem] w-[0.5625rem] rounded-full bg-[hsl(var(--oxblood))] outline outline-4 outline-[hsl(var(--paper))] group-first:top-[0.4rem] md:block"
      />

      {/* Year marker */}
      <div className="md:pr-10 md:text-right">
        {showYear && <span className="display block text-[1.9rem] leading-none md:text-[2.1rem]">{entry.year}</span>}
      </div>

      <div className={showYear ? "mt-3 md:mt-0" : ""}>
        <p className="smallcaps flex flex-wrap items-center gap-3 text-[hsl(var(--muted-warm))]">
          {entry.range}
          {entry.now && (
            <span className="smallcaps rounded-[0.125rem] bg-[hsl(var(--oxblood-deep))] px-2 py-[0.1875rem] text-[0.55rem] text-[hsl(var(--paper))]">
              Now
            </span>
          )}
        </p>
        <h3 className="serif mt-3 text-2xl md:text-[1.75rem]">
          {entry.role} <span className="text-[hsl(var(--muted-warm))]">·</span>{" "}
          <span className="italic text-[hsl(var(--oxblood))]">{entry.org}</span>
        </h3>
        <p className="smallcaps mt-2 text-[hsl(var(--muted-warm))]">{entry.location}</p>
        <ul className="mt-4 space-y-2">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="serif flex gap-3 text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
              <span aria-hidden="true" className="shrink-0 text-[hsl(var(--muted-warm))]">
                —
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-14 md:py-16">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <Reveal>
          <p className="smallcaps text-[hsl(var(--muted-warm))]">Section III</p>
        </Reveal>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Outside the Reveal — the mask carries this one, not a fade */}
          <h2 className="display text-[2.9rem] md:text-[4.2rem]">
            <CutReveal delay={90}>Experience</CutReveal>
          </h2>
        </div>
        <Reveal delay={230} className="rule mt-8" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          {/* Timeline */}
          <div className="col-span-12 md:col-span-8">
            <div className="relative border-b border-[hsl(var(--ink)/0.18)] md:pb-2">
              <span
                aria-hidden="true"
                className="absolute bottom-2 top-2 left-[6.875rem] hidden w-px bg-[hsl(var(--ink)/0.18)] md:block"
              />
              <ol>
                {ROLES.map((entry, i) => (
                  <TimelineEntry
                    key={`${entry.role}-${entry.org}`}
                    entry={entry}
                    showYear={i === 0 || ROLES[i - 1].year !== entry.year}
                  />
                ))}
              </ol>
            </div>
          </div>

          {/* Sticky aside — desktop only. On a phone it can't stick to
              anything, so the photo and stat box just land at the foot of the
              timeline as two more things to scroll past. */}
          <div className="hidden md:col-span-4 md:block">
            <Reveal delay={150} className="md:sticky md:top-24">
              <figure className="relative overflow-hidden bg-[hsl(var(--paper-deep))]">
                <div className="aspect-[3/4]">
                  <img
                    src="/lily-autzen.webp"
                    alt="Lily Reese standing at midfield in Autzen Stadium"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* --scrim / --on-scrim rather than --ink / --paper: those two
                    flip with the theme, which would turn this into a cream veil
                    under near-black type the moment dark mode is on. A scrim
                    over a photograph has to stay dark in both. */}
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-4 pt-12"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, hsl(var(--scrim) / 0.72), hsl(var(--scrim) / 0.3) 55%, transparent)",
                  }}
                >
                  <span className="smallcaps block text-[hsl(var(--on-scrim))]">On Assignment</span>
                  <span className="serif mt-0.5 block text-lg italic text-[hsl(var(--on-scrim))]">
                    Autzen Stadium, Eugene
                  </span>
                </figcaption>
              </figure>
              <dl className="mt-4 border border-[hsl(var(--ink)/0.25)]">
                {STATS.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex items-baseline justify-between gap-4 px-4 py-3.5 ${
                      i > 0 ? "border-t border-[hsl(var(--ink)/0.18)]" : ""
                    }`}
                  >
                    <dt className="smallcaps text-[hsl(var(--muted-warm))]">{label}</dt>
                    <dd className="serif text-right text-lg leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
