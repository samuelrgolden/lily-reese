import PageShell from "../components/PageShell.jsx";
import About from "../components/About.jsx";

/* A standalone copy of the About section — the same component the home page
   renders, so the two can't drift. */
export default function AboutPage() {
  return (
    <PageShell>
      <About />
    </PageShell>
  );
}
