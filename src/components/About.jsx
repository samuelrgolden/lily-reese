import Reveal from "./Reveal.jsx";
import CutReveal from "./CutReveal.jsx";

const FACTS = [
  ["Currently", "Eugene Weekly · Ascend · Align"],
  ["Based", "Eugene, OR"],
  ["School", "UO · SOJC"],
  ["Class of", "2027"],
  ["Honors", "ACP · 2025"],
];

const PARAGRAPHS = [
  "Hi I'm Lily Reese, a journalism major at the University of Oregon with a minor in Food Studies, pursuing my BA through the Clark Honors College. My work explores the connections between people, place, and sustainability — through food, art, sport, and community — approaching journalism as a way to understand how individuals and systems shape one another.",
  "I report for the Eugene Weekly, serve as editorial lead, copy editor, and director for Ascend Magazine, writer for Align Magazine, and cover alumni profiles, faculty research, and cultural stories as a writing intern for the SOJC. My work has also appeared in Ethos Magazine and the Daily Emerald, where I spent a year on the copy desk.",
  "From community gardens rooted in sustainability, to theater companies redefining performance as connection, to small towns confronting air-quality challenges my reporting continues to grow. Across these stories, I’m drawn to what brings people together — and I believe journalism should do more than inform: it should invite reflection, foster empathy, and strengthen the bonds that tie us to one another.",
];

export default function About() {
  return (
    <section id="about" className="py-14 md:py-16">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          {/* Section label + facts */}
          <div className="col-span-12 md:col-span-3">
            {/* The heading sits outside the Reveal on purpose — a fade running
                over the mask muddies it, and only one of the two can win. */}
            <Reveal>
              <p className="smallcaps text-[hsl(var(--muted-warm))]">Section I</p>
            </Reveal>
            <h2 className="display mt-3 text-[2.9rem] md:text-[3.6rem]">
              <CutReveal delay={90}>
                About<span className="text-[hsl(var(--oxblood))]">.</span>
              </CutReveal>
            </h2>
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
            <div className="min-h-[30rem] flex-1 overflow-hidden bg-[hsl(var(--paper-deep))]">
              <img
                src="/lily-portrait.webp"
                alt="Black-and-white studio portrait of Lily Reese"
                className="h-full min-h-[30rem] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <div className="col-span-12 md:col-span-5">
            <Reveal delay={160}>
              <div className="serif space-y-6 text-xl leading-relaxed text-[hsl(var(--ink-soft))] md:text-[1.35rem] md:leading-relaxed">
                {PARAGRAPHS.map((text, i) => {
                  if (i === 0) {
                    const [firstWord, ...rest] = text.split(" ");
                    return (
                      <p key={text.slice(0, 24)}>
                        <span className="drop-word">{firstWord}</span> {rest.join(" ")}
                      </p>
                    );
                  }
                  return <p key={text.slice(0, 24)}>{text}</p>;
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
