import PageShell from "../components/PageShell.jsx";
import Experience from "../components/Experience.jsx";

/* A standalone copy of the Experience section — the same component the home page
   renders, so the two can't drift. */
export default function ExperiencePage() {
  return (
    <PageShell>
      <Experience />
    </PageShell>
  );
}
