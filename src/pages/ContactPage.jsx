import PageShell from "../components/PageShell.jsx";
import Contact from "../components/Contact.jsx";

/* A standalone copy of the Contact section — the same component the home page
   renders, so the two can't drift. */
export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}
