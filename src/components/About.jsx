import Reveal from "./Reveal.jsx";
import CutReveal from "./CutReveal.jsx";

const FACTS = [
  ["writing for", "Eugene Weekly · Ascend · SOJC"],
  ["Based", "Eugene, OR"],
  ["School", "UO · SOJC"],
  ["Class of", "2027"],
  ["Honors", "ACP · 2025"],
];

const PARAGRAPHS = [
  "Lily Reese is a journalism major at the University of Oregon with a minor in Food Studies, pursuing her BA in the Clark Honors College, where she will graduate in June of 2027. Her work explores how people build community, make meaning and find belonging in a changing world through stories of food, art, sport and place.",
  "Lily currently reports for the Eugene Weekly, serves as the director for Ascend Magazine, and covers alumni profiles, faculty research, and community stories as a writing intern for the School of Journalism and Communications at the University of Oregon. Her work has also appeared in Ethos Magazine, Align Magazine, and the Daily Emerald, where she spent a year on the copy desk. Her work spans student-led publications, independent newsrooms and institutional communications, giving her experience across a range of journalistic settings.",
  "From medical tattoo artists’ path to healing, to small towns confronting air-quality challenges, Lily’s reporting continues to grow. Across these stories, she is drawn to what brings people together and what makes us uniquely human. In a world increasingly driven by efficiency and shaped by AI, she seeks to tell the stories that showcase what it truly means to be human.",
];

export default function About() {
  return (
    <section id="about" className="py-14 md:py-16">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        {/* On a phone the desktop column order — facts, then portrait, then
            bio — buries the writing under a table nobody reads first. The left
            column is `display: contents` below the breakpoint so its heading
            and its fact list become grid items in their own right and can be
            ordered apart: heading, portrait, bio, facts. At md the wrapper is
            a block again and the original three-column layout returns. */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-12">
          <div className="contents md:col-span-3 md:block">
            <div className="order-1 col-span-12">
              {/* The heading sits outside the Reveal on purpose — a fade running
                  over the mask muddies it, and only one of the two can win. */}
              <Reveal>
                <p className="smallcaps text-[hsl(var(--muted-warm))]">Section I</p>
              </Reveal>
              <h2 className="display mt-3 text-[2.9rem] md:text-[3.1rem]">
                <CutReveal delay={90}>
                  About<span className="text-[hsl(var(--oxblood))]">.</span>
                </CutReveal>
              </h2>
            </div>
            <Reveal delay={120} className="order-4 col-span-12">
              <dl className="border-b border-[hsl(var(--ink)/0.18)] md:mt-8">
                {FACTS.map(([label, value]) => (
                  <div key={label} className="border-t border-[hsl(var(--ink)/0.18)] py-3 md:py-3">
                    <dt className="smallcaps text-[hsl(var(--muted-warm))]">{label}</dt>
                    <dd className="serif mt-1 text-base leading-snug md:text-[1.05rem]">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Portrait — half height on a phone, where 30rem is most of a screen.
              From md up the frame holds a fixed 7:10 shape instead of stretching
              to the tallest column, so a longer bio can't pull it thin. */}
          <Reveal as="figure" delay={100} className="order-2 col-span-12 flex h-full flex-col md:col-span-4">
            <div className="min-h-[17rem] flex-1 overflow-hidden bg-[hsl(var(--paper-deep))] md:aspect-[7/10] md:min-h-0 md:flex-none">
              <img
                src="/lily-portrait.webp"
                alt="Black-and-white studio portrait of Lily Reese"
                className="h-full min-h-[17rem] w-full object-cover md:min-h-0"
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <div className="order-3 col-span-12 md:col-span-5">
            <Reveal delay={160}>
              <div className="serif space-y-5 text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:space-y-4 md:text-[clamp(0.85rem,1.3vw,1.2rem)] md:leading-relaxed">
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
