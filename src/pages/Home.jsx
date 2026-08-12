import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Work from "../components/Work.jsx";
import Experience from "../components/Experience.jsx";
import Contact from "../components/Contact.jsx";

/* The original one-page site, unchanged. The standalone pages are additions
   alongside it, not a replacement for any of this. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
    </>
  );
}
