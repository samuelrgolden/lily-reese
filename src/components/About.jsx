import Reveal from "./Reveal.jsx";

const FACTS = [
  ["Beat", "Climate & Culture"],
  ["Based", "Eugene, OR"],
  ["School", "UO · SOJC"],
  ["Class of", "2027"],
  ["Honors", "ACP · 2025"],
];

const PARAGRAPHS = [
  "I am a journalism student at the University of Oregon’s School of Journalism and Communication, pursuing a Bachelor of Arts through the Clark Honors College with a minor in Food Studies. I write feature stories that begin with people and end somewhere larger — climate, sustainability, community, or the small institutions that make a city feel like itself.",
  "My work has appeared in the Eugene Weekly, Ethos Magazine, Ascend Magazine, Align Magazine, and the Daily Emerald. As a writer for SOJC Communications, I report on alumni, faculty research, and student work.",
  "In 2025, my climate reporting earned an Honorable Mention from the Associated Collegiate Press in the Local Climate Change Reporting category for Stories of the Year. I’m interested in the slow story — the kind that asks readers to sit with a place long enough to understand it.",
];

export default function About() {
  return (
    <section id="about" className="py-14 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          {/* Section label + facts */}
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="smallcaps text-[hsl(var(--muted-warm))]">Section I</p>
              <h2 className="display mt-3 text-[2.9rem] md:text-[3.6rem]">
                About<span className="text-[hsl(var(--oxblood))]">.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <dl className="mt-10 border-b border-[hsl(var(--ink)/0.18)]">
                {FACTS.map(([label, value]) => (
                  <div key={label} className="border-t border-[hsl(var(--ink)/0.18)] py-4">
                    <dt className="smallcaps text-[hsl(var(--muted-warm))]">{label}</dt>
                    <dd className="serif mt-1 text-lg leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal as="figure" delay={100} className="col-span-12 flex h-full flex-col md:col-span-4">
            <div className="min-h-[480px] flex-1 overflow-hidden bg-[hsl(var(--paper-deep))]">
              <img
                src="/lily-portrait.webp"
                alt="Black-and-white studio portrait of Lily Reese"
                className="h-full min-h-[480px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <div className="col-span-12 md:col-span-5">
            <Reveal delay={160}>
              <div className="serif space-y-6 text-xl leading-relaxed text-[hsl(var(--ink-soft))] md:text-[1.35rem] md:leading-relaxed">
                {PARAGRAPHS.map((text, i) => (
                  <p key={text.slice(0, 24)} className={i === 0 ? "drop-cap" : undefined}>
                    {text}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
