import Reveal from "./Reveal.jsx";

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
    role: "Writer & Editor",
    org: "Ascend Magazine",
    location: "Eugene, OR",
    range: "Nov 2025 – Present",
    now: true,
    bullets: [
      "Write and edit feature stories highlighting student athletes.",
      "Conduct interviews, research, and fact-checking to ensure depth and accuracy.",
      "Collaborate on pitches, narrative refinement, and multimedia for print and digital.",
      "Hold editorial leadership responsibilities and mentor other writers.",
    ],
  },
  {
    year: "2025",
    role: "Communications Writer",
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
    range: "Mar 2025 – Present",
    now: true,
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
    range: "Oct 2023 – Present",
    now: true,
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
      "Developed original pitches and crafted narratives for a term-by-term publication.",
      "Edited and refined pieces to align with the magazine’s creative vision.",
    ],
  },
];

const STATS = [
  ["Bylines & Edits", "6 publications"],
  ["Current Beats", "Climate · Sports · Culture"],
  ["Editing", "Daily Emerald Copy"],
];

const HONORS = [
  { year: "2025", title: "Lorry I. Lokey Journalism Scholarship", org: "School of Journalism and Communication" },
  { year: "2024", title: "Arlyn Cole Scholarship", org: "School of Journalism and Communication" },
  { year: "2024", title: "SOJC Scholarship", org: "University of Oregon" },
  { year: "2023", title: "Sumit Scholarship", org: "Redwood High School" },
  { year: "2023–2025", title: "Dean’s List", org: "University of Oregon" },
];

function RibbonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-[hsl(var(--oxblood))]"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function TimelineEntry({ entry, showYear }) {
  return (
    <Reveal
      as="li"
      className="group relative border-t border-[hsl(var(--ink)/0.18)] py-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[110px_1fr] md:gap-10 md:py-10 md:first:pt-0"
    >
      {/* Dot on the vertical line */}
      <span
        aria-hidden="true"
        className="absolute left-[106px] top-[2.9rem] hidden h-[9px] w-[9px] rounded-full bg-[hsl(var(--oxblood))] outline outline-4 outline-[hsl(var(--paper))] group-first:top-[0.4rem] md:block"
      />

      {/* Year marker */}
      <div className="md:pr-10 md:text-right">
        {showYear && <span className="display block text-[1.9rem] leading-none md:text-[2.1rem]">{entry.year}</span>}
      </div>

      <div className={showYear ? "mt-3 md:mt-0" : ""}>
        <p className="smallcaps flex flex-wrap items-center gap-3 text-[hsl(var(--muted-warm))]">
          {entry.range}
          {entry.now && (
            <span className="smallcaps rounded-[2px] bg-[hsl(var(--oxblood-deep))] px-2 py-[3px] text-[0.55rem] text-[hsl(var(--paper))]">
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
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="smallcaps text-[hsl(var(--muted-warm))]">Section III</p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[2.9rem] md:text-[4.2rem]">Experience</h2>
            <p className="serif max-w-md text-lg text-[hsl(var(--ink-soft))] md:text-right">
              A vertical record — newest at the top, oldest at the foot of the page.
            </p>
          </div>
          <div className="rule mt-8" />
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          {/* Timeline */}
          <div className="col-span-12 md:col-span-8">
            <div className="relative border-b border-[hsl(var(--ink)/0.18)] md:pb-2">
              <span
                aria-hidden="true"
                className="absolute bottom-2 top-2 left-[110px] hidden w-px bg-[hsl(var(--ink)/0.18)] md:block"
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

          {/* Sticky aside */}
          <div className="col-span-12 md:col-span-4">
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
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-4 pt-12"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, hsl(var(--ink) / 0.72), hsl(var(--ink) / 0.3) 55%, transparent)",
                  }}
                >
                  <span className="smallcaps block text-[hsl(var(--paper))]">On Assignment</span>
                  <span className="serif mt-0.5 block text-lg italic text-[hsl(var(--paper))]">
                    Autzen Stadium, Eugene
                  </span>
                </figcaption>
              </figure>
              <p className="smallcaps mt-3 text-[hsl(var(--muted-warm))]">Fig. 2 — April 2026</p>

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

        {/* Honors & Recognition */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <p className="smallcaps text-[hsl(var(--muted-warm))]">Honors</p>
            <h3 className="display mt-3 text-[2.4rem] md:text-[3rem]">Recognition</h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-10">
            <Reveal className="col-span-12 md:col-span-5">
              <div className="h-full border border-[hsl(var(--oxblood)/0.35)] bg-[hsl(var(--oxblood-soft)/0.5)] p-6 md:p-8">
                <RibbonIcon />
                <h4 className="serif mt-5 text-[1.6rem] italic md:text-[1.8rem]">Honorable Mention</h4>
                <p className="serif mt-1 text-lg text-[hsl(var(--ink-soft))]">Local Climate Change Reporting</p>
                <p className="smallcaps mt-6 text-[hsl(var(--muted-warm))]">Associated Collegiate Press · 2025</p>
              </div>
            </Reveal>
            <Reveal delay={120} className="col-span-12 md:col-span-7">
              <ul className="border-b border-[hsl(var(--ink)/0.18)]">
                {HONORS.map((honor) => (
                  <li
                    key={`${honor.year}-${honor.title}`}
                    className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-6 border-t border-[hsl(var(--ink)/0.18)] py-4"
                  >
                    <span className="smallcaps text-[hsl(var(--muted-warm))]">{honor.year}</span>
                    <span>
                      <span className="serif block text-xl leading-snug">{honor.title}</span>
                      <span className="smallcaps mt-1 block text-[hsl(var(--muted-warm))]">{honor.org}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
