import { useState } from "react";
import Reveal from "./Reveal.jsx";

/* Ordered for collage rhythm: landscape and portrait images alternate */
const ARTICLES = [
  {
    title: "Fair Warning: Come Hungry",
    pub: "Eugene Weekly",
    date: "Jul 9, 2026",
    tags: ["Food", "Culture"],
    description:
      "A first-timer’s tour of the Oregon Country Fair’s legendary food booths, from Phoenix Rising Bakery to the elixir bar.",
    href: "https://eugeneweekly.com/2026/07/09/fair-warning-come-hungry/",
    img: "/work/fair-warning.webp",
  },
  {
    title: "The Comeback Run",
    pub: "Ascend Magazine",
    date: "May 19, 2026",
    tags: ["Sports", "Features"],
    description: "An athlete’s long road back to the start gate, from Ascend’s second print issue.",
    href: "https://issuu.com/ascenduomagazine/docs/ascend_issue_2/66",
    img: "/work/comeback-run.webp",
  },
  {
    title: "Strategic Communication Master’s Students Win National PR Case Study Award",
    pub: "SOJC",
    date: "Jun 26, 2026",
    tags: ["Campus", "Awards"],
    description:
      "Three strategic communication master’s students take first place in a national PR case study competition.",
    href: "https://journalism.uoregon.edu/news/2026-page-society-pr-case-study",
    img: "/work/page-society.webp",
  },
  {
    title: "From the Press Box",
    pub: "Ascend Magazine",
    date: "May 19, 2026",
    tags: ["Sports", "Essay"],
    description: "Copy editor Lily Reese explores the world of sports through her love of music and journalism.",
    href: "https://issuu.com/ascenduomagazine/docs/ascend_issue_2/150",
    img: "/work/press-box.webp",
  },
  {
    title: "Cottage Grove to Host First Ever Community Pride Picnic",
    pub: "Eugene Weekly",
    date: "Jun 25, 2026",
    tags: ["Community", "Culture"],
    description:
      "South Lane County Pride brings drag, live music, and family fun to Cottage Grove’s first community Pride celebration.",
    href: "https://eugeneweekly.com/2026/06/25/cottage-grove-to-host-first-ever-community-pride-picnic/",
    img: "/work/pride-picnic.webp",
  },
  {
    title: "Containing Female Rage",
    pub: "Ethos Magazine",
    date: "May 12, 2025",
    tags: ["Culture", "Essay"],
    description: "A cultural examination of how women’s anger gets shaped, suppressed, and expressed.",
    href: "https://dailyemerald.com/185012/ethos/containing-female-rage/",
    img: "/work/containing-female-rage.webp",
  },
  {
    title: "Audio magazine class gives voice to Oakridge residents",
    pub: "SOJC",
    date: "Apr 3, 2026",
    tags: ["Audio", "Community"],
    description: "Journalism students record an audio portrait of small-town life in Oakridge, Oregon.",
    href: "https://news.uoregon.edu/audio-magazine-class-gives-voice-oakridge-residents",
    img: "/work/oakridge-audio.webp",
  },
  {
    title: "Ascend Magazine, Issue 2",
    pub: "Ascend Magazine",
    date: "May 19, 2026",
    tags: ["Print", "Sports"],
    description: "The complete second print issue, cover to cover — the climb never ends.",
    href: "https://issuu.com/ascenduomagazine/docs/ascend_issue_2",
    img: "/work/ascend-issue-2.webp",
  },
  {
    title: "Oakridge through the eyes and ears of a journalism team from the U of O",
    pub: "Highway 58 Herald",
    date: "Jun 26, 2025",
    tags: ["Audio", "Community"],
    kind: "class",
    description:
      "Oakridge’s hometown paper on the UO audio team — Lily among its reporters — that spent a term telling the town’s stories.",
    href: "https://highway58herald.org/oakridge-through-the-eyes-and-ears-of-a-journalism-team-from-the-u-of-o/",
    img: "/work/oakridge-herald.webp",
  },
  {
    title: "75,000 Lane County Residents Rely on Food Benefits, and Many Face a Cutoff This April",
    pub: "JCOM 332",
    date: "Public Affairs",
    tags: ["Food", "Policy"],
    kind: "class",
    description:
      "As expanded federal work requirements take hold, tens of thousands of Lane County SNAP recipients face losing their food benefits.",
    href: "https://lilylreese.wixsite.com/lily-reese-portfol-1/copy-of-new-page",
    img: "/work/food-benefits.webp",
  },
  {
    title: "Plenty of Food, Not Enough Meals",
    pub: "JCOM 332",
    date: "Public Affairs Final",
    tags: ["Food", "Community"],
    kind: "class",
    description:
      "Oregon’s food network moves millions of pounds of groceries a year — but for unhoused people, infrastructure, not supply, decides whether food becomes a meal.",
    href: "https://lilylreese.wixsite.com/lily-reese-portfol-1/final",
    img: "/work/plenty-of-food.webp",
  },
  {
    title: "Are We All Victims of the Madonna–Whore Complex?",
    pub: "Ethos Magazine",
    date: "May 12, 2025",
    tags: ["Culture", "Features"],
    description: "A reported essay on a centuries-old binary that still shapes how women are seen.",
    href: "https://dailyemerald.com/185014/features/are-we-all-victims-of-the-madonna-whore-complex/",
    img: "/work/madonna-whore.webp",
  },
  {
    title: "The Sustainability Dilemma at the Heart of Community Living",
    pub: "Ethos Magazine",
    date: "Dec 1, 2025",
    tags: ["Climate", "Community", "Features"],
    description:
      "Inside Lost Valley, an intentional community grappling with what it really costs to live sustainably.",
    href: "https://dailyemerald.com/185072/features/the-sustainability-dilemma-at-the-heart-of-community-living/",
    img: "/work/sustainability-dilemma.webp",
  },
  {
    title: "Sensitivity and Climate Disaster Conversations",
    pub: "Ethos Magazine",
    date: "Jan 12, 2025",
    tags: ["Climate", "Features"],
    description: "On the language we use for climate grief, and the cost of getting it wrong.",
    href: "https://dailyemerald.com/184995/features/sensitivity-and-climate-disaster-conversations/",
    img: "/work/climate-conversations.webp",
  },
  {
    title: "The Partnerships Keeping Eugene’s Theater Alive",
    pub: "Ethos Magazine",
    date: "May 12, 2025",
    tags: ["Arts", "Community"],
    description: "How a network of small companies and stubborn artists keep live performance going.",
    href: "https://dailyemerald.com/185015/features/the-partnerships-keeping-eugenes-theater-alive/",
    img: "/work/eugene-theater.webp",
  },
  {
    title: "Master’s Student Builds Diversity into Lego Campaign",
    pub: "SOJC",
    date: "May 11, 2026",
    tags: ["Profiles", "Campus"],
    description:
      "How Hana Mazur turned her own adoption story into “Bricks of Belonging,” a Lego campaign celebrating diverse families.",
    href: "https://journalism.uoregon.edu/news/hana-mazur-corporate-social-responsibility",
    img: "/work/lego-campaign.webp",
  },
  {
    title: "Johani Askin’s Journey & Psychedelic Facilitation Through Cultural Connection",
    pub: "JCOM 331",
    date: "Reporting Profile",
    tags: ["Profiles", "Health"],
    kind: "class",
    description:
      "Inside EPIC Healing Eugene with a licensed psilocybin facilitator who guides clients under Oregon’s Measure 109.",
    href: "https://lilylreese.wixsite.com/lily-reese-portfol-1/copy-of-public-meeting",
    img: "/work/askins-profile.webp",
  },
  {
    title: "Growing the Grove Garden: The Need for Intentional Communities",
    pub: "Ethos Magazine",
    date: "Jun 5, 2024",
    tags: ["Climate", "Community", "Food"],
    description: "A community garden in Eugene becomes a study in what shared land can teach.",
    href: "https://dailyemerald.com/184070/features/growing-the-grove-garden-the-need-for-intentional-communities/",
    img: "/work/grove-garden.webp",
  },
  {
    title: "Embracing Change: Exploring Alternative Psilocybin Treatments in Eugene",
    pub: "Ethos Magazine",
    date: "Jun 4, 2024",
    tags: ["Health", "Features"],
    description: "Inside Oregon’s first legal psilocybin services, where ritual and regulation meet.",
    href: "https://dailyemerald.com/184064/ethos/embracing-change-exploring-alternative-psilocybin-treatments-in-eugene/",
    img: "/work/psilocybin.webp",
  },
];

/* Filter by masthead — plus a Class Work view for coursework reporting */
const FILTERS = ["All", "Eugene Weekly", "SOJC", "Ascend Magazine", "Ethos Magazine", "Class Work"];

function ArticleCard({ article, index }) {
  return (
    <Reveal as="article" delay={(index % 3) * 70} className="mb-8 break-inside-avoid md:mb-10">
      <a
        href={article.href}
        target="_blank"
        rel="noreferrer"
        className="group lift-card block rounded-xl border border-[hsl(var(--ink)/0.1)] bg-[hsl(var(--paper))] p-3.5"
      >
        <div className="relative overflow-hidden rounded-lg bg-[hsl(var(--paper-deep))]">
          {/* Natural aspect ratio — the collage columns absorb the height differences */}
          <img src={article.img} alt={article.title} loading="lazy" className="block h-auto w-full" />
          <span className="smallcaps absolute left-3 top-3 rounded-sm border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] px-2.5 py-1 text-[0.55rem]">
            {article.tags[0]}
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-md border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper))] text-[hsl(var(--ink))] transition-colors duration-300 group-hover:bg-[hsl(var(--ink))] group-hover:text-[hsl(var(--paper))]"
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
          {article.pub} <span className="text-[hsl(var(--oxblood))]">•</span> {article.date}
        </p>
        <h3 className="serif mt-1.5 text-xl leading-snug transition-colors duration-300 group-hover:text-[hsl(var(--oxblood))]">
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
  const shown =
    filter === "All"
      ? ARTICLES
      : filter === "Class Work"
        ? ARTICLES.filter((a) => a.kind === "class")
        : ARTICLES.filter((a) => a.pub === filter);

  return (
    <section id="work" className="py-14 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="smallcaps text-[hsl(var(--muted-warm))]">Section II</p>
              <h2 className="display mt-3 text-[2.9rem] md:text-[4.2rem]">
                Selected <span className="italic text-[hsl(var(--oxblood))]">Work</span>
              </h2>
              <p className="serif mt-5 max-w-md text-lg text-[hsl(var(--ink-soft))]">
                Features, essays, and reported stories across five mastheads — from Ethos Magazine to the Eugene
                Weekly.
              </p>
            </div>
            <div
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
                    className={`smallcaps lift cursor-pointer border px-4 py-2 ${
                      active
                        ? "border-[hsl(var(--ink))] bg-[hsl(var(--ink))] text-[hsl(var(--paper))]"
                        : "border-[hsl(var(--ink)/0.25)] text-[hsl(var(--ink-soft))] hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--ink))]"
                    }`}
                  >
                    {pub}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

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
