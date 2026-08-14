/* The single source of truth for Lily's clips — read by the home page collage
   (components/Work.jsx) and by the All Work page (pages/WorkPage.jsx). It lived
   inside Work.jsx until the second consumer arrived; two copies of a list this
   long would have drifted the first time a piece was added.

   Ordered for the home collage's rhythm: landscape and portrait images
   alternate, landscapes on the even slots and portraits on the odd ones. To add
   a piece, drop it into the stream matching its image's orientation.

   `size` is the image's [width, height] in pixels — the compression script
   prints it. It stops the cards jumping around while the photos load. */
export const ARTICLES = [
  {
    title: "Your Pet Has Been Studying You",
    pub: "Eugene Weekly",
    date: "Aug 13, 2026",
    tags: ["Pets", "Culture"],
    description:
      "Oregon State’s Human-Animal Interaction Lab on what pets learn about us — the routines they read, the moods they track, and why the attachment runs both ways.",
    featured: false,
    href: "https://eugeneweekly.com/2026/08/13/your-pet-has-been-studying-you/",
    img: "/work/pet-study.webp",
    size: [1200, 779],
  },
  {
    title: "Skål Yeah!",
    pub: "Eugene Weekly",
    date: "Aug 13, 2026",
    tags: ["Culture", "Community"],
    description:
      "Junction City’s Scandinavian Festival gives each of its four days to a different Nordic country — blacksmithing, embroidery, traditional dress, and four days of free admission.",
    featured: false,
    href: "https://eugeneweekly.com/2026/08/13/skal-yeah/",
    img: "/work/skal-yeah.webp",
    size: [1200, 779],
  },
  {
    title: "The Chronicle Closes After 117 Years",
    pub: "Eugene Weekly",
    date: "Aug 11, 2026",
    tags: ["Media", "Community"],
    description:
      "The Springfield paper shuts its doors after 117 years, undone by SBA loan debt, falling subscriptions, and advertising that never came back after the pandemic.",
    featured: false,
    href: "https://eugeneweekly.com/2026/08/11/the-chronicle-closes-after-117-years/",
    img: "/work/chronicle-closes.webp",
    size: [1200, 779],
  },
  {
    title: "What’s in a Nickname?",
    pub: "Eugene Weekly",
    date: "Jul 23, 2026",
    tags: ["Food", "Profiles"],
    description:
      "“Beccofino” means picky eater — the childhood nickname Maurizio Bianchi now paints on a red food truck serving handmade seasonal pasta.",
    featured: false,
    href: "https://eugeneweekly.com/2026/07/23/whats-in-a-nickname-2/",
    img: "/work/beccofino.webp",
    size: [1200, 779],
  },
  {
    title: "The Comeback Run",
    pub: "Ascend Magazine",
    date: "May 19, 2026",
    tags: ["Sports", "Features"],
    description: "An athlete’s long road back to the start gate, from Ascend’s second print issue.",
    href: "https://issuu.com/ascenduomagazine/docs/ascend_issue_2/66",
    img: "/work/comeback-run.webp",
    size: [1000, 1273],
  },
  {
    title: "More Than Breakfast",
    pub: "Eugene Weekly",
    date: "Jul 23, 2026",
    tags: ["Food", "Community"],
    description:
      "Elizabeth Fagan and Koa Rodby built Only Yolking into a Eugene fixture one messy egg-in-the-hole sandwich at a time.",
    href: "https://eugeneweekly.com/2026/07/23/more-than-breakfast/",
    img: "/work/morethanbreakfast.webp",
    size: [1200, 779],
  },
  {
    title: "From the Press Box",
    pub: "Ascend Magazine",
    date: "May 19, 2026",
    tags: ["Sports", "Essay"],
    description: "Copy editor Lily Reese explores the world of sports through her love of music and journalism.",
    href: "https://issuu.com/ascenduomagazine/docs/ascend_issue_2/150",
    img: "/work/press-box.webp",
    size: [1000, 1312],
  },
  {
    title: "Fair Warning: Come Hungry",
    pub: "Eugene Weekly",
    date: "Jul 9, 2026",
    tags: ["Food", "Culture"],
    description:
      "A first-timer’s tour of the Oregon Country Fair’s legendary food booths, from Phoenix Rising Bakery to the elixir bar.",
    href: "https://eugeneweekly.com/2026/07/09/fair-warning-come-hungry/",
    img: "/work/fair-warning.webp",
    size: [1200, 779],
  },
  {
    title: "Containing Female Rage",
    pub: "Ethos Magazine",
    date: "May 12, 2025",
    tags: ["Culture", "Essay"],
    description: "A cultural examination of how women’s anger gets shaped, suppressed, and expressed.",
    href: "https://dailyemerald.com/185012/ethos/containing-female-rage/",
    img: "/work/containing-female-rage.webp",
    size: [800, 1200],
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
    size: [768, 433],
  },
  {
    title: "Ascend Magazine, Issue 2",
    pub: "Ascend Magazine",
    date: "May 19, 2026",
    tags: ["Print", "Sports"],
    description: "The complete second print issue, cover to cover — the climb never ends.",
    href: "https://issuu.com/ascenduomagazine/docs/ascend_issue_2",
    img: "/work/ascend-issue-2.webp",
    size: [1000, 1273],
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
    size: [1200, 779],
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
    size: [440, 780],
  },
  {
    title: "Audio magazine class gives voice to Oakridge residents",
    pub: "SOJC",
    date: "Apr 3, 2026",
    tags: ["Audio", "Community"],
    description: "Journalism students record an audio portrait of small-town life in Oakridge, Oregon.",
    href: "https://news.uoregon.edu/audio-magazine-class-gives-voice-oakridge-residents",
    img: "/work/oakridge-audio.webp",
    size: [900, 506],
  },
  {
    title: "Are We All Victims of the Madonna–Whore Complex?",
    pub: "Ethos Magazine",
    date: "May 12, 2025",
    tags: ["Culture", "Features"],
    description: "A reported essay on a centuries-old binary that still shapes how women are seen.",
    href: "https://dailyemerald.com/185014/features/are-we-all-victims-of-the-madonna-whore-complex/",
    img: "/work/madonna-whore.webp",
    size: [800, 1200],
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
    size: [1000, 434],
  },
  {
    title: "Sensitivity and Climate Disaster Conversations",
    pub: "Ethos Magazine",
    date: "Jan 12, 2025",
    tags: ["Climate", "Features"],
    description: "On the language we use for climate grief, and the cost of getting it wrong.",
    href: "https://dailyemerald.com/184995/features/sensitivity-and-climate-disaster-conversations/",
    img: "/work/climate-conversations.webp",
    size: [960, 1200],
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
    size: [686, 532],
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
    size: [1200, 1276],
  },
  {
    title: "The Sustainability Dilemma at the Heart of Community Living",
    pub: "Ethos Magazine",
    date: "Dec 1, 2025",
    tags: ["Climate", "Community", "Features"],
    description:
      "Inside Lost Valley, an intentional community grappling with what it really costs to live sustainably.",
    featured: false,
    href: "https://dailyemerald.com/185072/features/the-sustainability-dilemma-at-the-heart-of-community-living/",
    img: "/work/sustainability-dilemma.webp",
    size: [1200, 800],
  },
  /* SOJC alumni profiles — the running series for the school's newsroom.
     `featured: false` keeps them off the home collage, which is a curated wall,
     while the All Work page still lists them. Four profiles of the same shape
     would flatten the collage's variety without adding to what it argues. */
  {
    title: "SOJC Alum Is Building the Future of Empathic AI",
    pub: "SOJC",
    date: "Dec 9, 2025",
    tags: ["Profiles", "Tech"],
    featured: false,
    description:
      "Alec Freudenstein’s capstone virtual financial advisor, Penny, led him to Hume AI — a firm building machines that read feeling.",
    href: "https://journalism.uoregon.edu/news/alec-freudenstein-future-of-empathic-ai",
    img: "/work/empathic-ai.webp",
    size: [900, 506],
  },
  {
    title: "Love of Writing Led Alum to Financial Reporting Career",
    pub: "SOJC",
    date: "Jul 23, 2025",
    tags: ["Profiles", "Campus"],
    featured: false,
    description:
      "Francesca Fontana ’17 turned a love of writing into a Wall Street Journal beat, and a weekly podcast translating the markets for everyone else.",
    href: "https://journalism.uoregon.edu/news/francesca-fontana-financial-reporting",
    img: "/work/francesca-fontana.webp",
    size: [900, 1200],
  },
  {
    title: "Alum Puts Audience First as Digital Strategist at OPB",
    pub: "SOJC",
    date: "Nov 17, 2025",
    tags: ["Profiles", "Media"],
    featured: false,
    description:
      "Sara Roth ’15 on why impact now means meeting readers wherever they already are — TikTok, newsletters, or the radio.",
    href: "https://journalism.uoregon.edu/news/sara-roth-audience-engagement",
    img: "/work/sara-roth.webp",
    size: [1200, 718],
  },
  {
    title: "Hannah Oakley’s PR Journey from SOJC to Rising Star",
    pub: "SOJC",
    date: "Oct 16, 2025",
    tags: ["Profiles", "Sports"],
    featured: false,
    description:
      "From managing talent at Rogers & Cowan PMK to leading women’s sports campaigns at Berk — a PRNEWS Rising Star’s route out of Allen Hall.",
    href: "https://journalism.uoregon.edu/news/hannah-oakley-entertainment-and-sports-pr",
    img: "/work/hannah-oakley.webp",
    size: [900, 600],
  },
  {
    title: "The Partnerships Keeping Eugene’s Theater Alive",
    pub: "Ethos Magazine",
    date: "May 12, 2025",
    tags: ["Arts", "Community"],
    description: "How a network of small companies and stubborn artists keep live performance going.",
    featured: false,
    href: "https://dailyemerald.com/185015/features/the-partnerships-keeping-eugenes-theater-alive/",
    img: "/work/eugene-theater.webp",
    size: [1200, 900],
  },
  {
    title: "Johani Askin’s Journey & Psychedelic Facilitation Through Cultural Connection",
    pub: "JCOM 331",
    date: "Reporting Profile",
    tags: ["Profiles", "Health"],
    kind: "class",
    description:
      "Inside EPIC Healing Eugene with a licensed psilocybin facilitator who guides clients under Oregon’s Measure 109.",
    featured: false,
    href: "https://lilylreese.wixsite.com/lily-reese-portfol-1/copy-of-public-meeting",
    img: "/work/askins-profile.webp",
    size: [1000, 489],
  },
  {
    title: "Growing the Grove Garden: The Need for Intentional Communities",
    pub: "Ethos Magazine",
    date: "Jun 5, 2024",
    tags: ["Climate", "Community", "Food"],
    description: "A community garden in Eugene becomes a study in what shared land can teach.",
    featured: false,
    href: "https://dailyemerald.com/184070/features/growing-the-grove-garden-the-need-for-intentional-communities/",
    img: "/work/grove-garden.webp",
    size: [1080, 720],
  },
  {
    title: "Embracing Change: Exploring Alternative Psilocybin Treatments in Eugene",
    pub: "Ethos Magazine",
    date: "Jun 4, 2024",
    tags: ["Health", "Features"],
    description: "Inside Oregon’s first legal psilocybin services, where ritual and regulation meet.",
    featured: false,
    href: "https://dailyemerald.com/184064/ethos/embracing-change-exploring-alternative-psilocybin-treatments-in-eugene/",
    img: "/work/psilocybin.webp",
    size: [1080, 720],
  },
];

/* The home collage is a curated wall; the All Work page is the complete file.
   Opt-out rather than opt-in — a new piece belongs on the front page unless
   there's a reason it doesn't, and an opt-in flag would mean every future
   addition silently fails to appear there. */
export const FEATURED = ARTICLES.filter((a) => a.featured !== false);

/* "Recent" is derived at render time rather than stored as a flag on each
   entry — a hand-set flag is true until someone remembers to clear it, and
   nobody ever does. Anything with a real date inside the window qualifies;
   the coursework entries carry labels like "Public Affairs" instead of a date,
   so Date.parse returns NaN and they're correctly excluded. */
const RECENT_DAYS = 60;

export function isRecent(article) {
  const t = Date.parse(article.date);
  return Number.isFinite(t) && Date.now() - t < RECENT_DAYS * 864e5;
}
