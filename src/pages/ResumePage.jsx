import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import CutReveal from "../components/CutReveal.jsx";

/*
 * The resume, shown as itself: a picture of the PDF's one page, with the file a
 * click away. A picture rather than an embedded PDF because phones don't show
 * embedded PDFs reliably. Android renders nothing, and iOS shows a frozen first
 * page you can't zoom. The picture links to the PDF, which every phone opens in
 * its own viewer, pinch-zoom and all.
 *
 * TO UPDATE IT: replace public/Lily-Reese-Resume.pdf (same filename), then
 * redraw the picture from it:
 *
 *   pdftoppm -r 220 -png -singlefile public/Lily-Reese-Resume.pdf /tmp/resume
 *   python3 scripts/to_webp.py /tmp/resume.png public/resume.webp --width 1700 --max-kb 450
 *
 * The script prints width × height; if it changed, copy it into `size` below.
 *
 * (The current file was built from a picture of the resume rather than a PDF export, so its
 * text can't be selected. Dropping in a real PDF export later restores that.)
 */
const RESUME = {
  pdf: "/Lily-Reese-Resume.pdf",
  fileName: "Lily-Reese-Resume.pdf",
  img: "/resume.webp",
  size: [1545, 1999],
  alt:
    "Lily Reese’s resume: reporting and editing at Ascend Magazine, Eugene Weekly, SOJC Communications, " +
    "Ethos Magazine and the Daily Emerald, and a B.A. in Journalism with a minor in Food Studies from " +
    "the University of Oregon’s Clark Honors College, 2027.",
};

export default function ResumePage() {
  const [w, h] = RESUME.size;

  return (
    <PageShell>
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-[90rem] px-6 md:px-12">
          {/* Deliberately quieter than the other pages' headers: the sheet
              below is the content, so the title just labels it. */}
          <div className="text-center">
            <h1 className="display text-[2.5rem] text-[hsl(var(--ink))] md:text-[3.25rem]">
              <CutReveal delay={90}>Resume</CutReveal>
            </h1>

            {/* Download is the job of this page, so it's the filled button;
                opening full size is the quieter second option. */}
            <Reveal delay={160} className="mt-4 flex flex-wrap items-center justify-center gap-2 md:mt-5 md:gap-3">
              <a
                href={RESUME.pdf}
                download={RESUME.fileName}
                className="group dl smallcaps lift btn-flow inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--ink))] bg-[hsl(var(--ink))] px-4 py-2 text-[0.6rem] text-[hsl(var(--paper))] [--flow:hsl(var(--oxblood))] md:px-5 md:py-2.5 md:text-[0.68rem]"
              >
                Download PDF <span className="dl-arrow" aria-hidden="true">↓</span>
              </a>
              <a
                href={RESUME.pdf}
                target="_blank"
                rel="noreferrer"
                className="smallcaps lift link-wipe inline-flex items-center gap-1.5 px-2 py-2 text-[0.6rem] text-[hsl(var(--ink-soft))] hover:text-[hsl(var(--oxblood))] md:text-[0.68rem]"
              >
                Open full size <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          {/* The sheet itself. The picture stays white in dark mode on purpose:
              it's a printed page, not part of the site's paper. The panel
              colour behind it only shows while the picture loads. */}
          <Reveal delay={220} className="mx-auto mt-6 max-w-[52rem] md:mt-8">
            <a
              href={RESUME.pdf}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Lily Reese’s resume as a PDF"
              className="lift-card block overflow-hidden rounded-sm border border-[hsl(var(--ink)/0.15)] bg-[hsl(var(--paper-deep))] shadow-xl shadow-[hsl(var(--ink)/0.08)]"
            >
              <img src={RESUME.img} alt={RESUME.alt} width={w} height={h} className="block h-auto w-full" />
            </a>
            {/* At phone width the page's type is too small to read in place. */}
            <p className="smallcaps mt-4 text-center text-[0.62rem] text-[hsl(var(--muted-warm))] md:hidden">
              Tap the page to open it full size
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
