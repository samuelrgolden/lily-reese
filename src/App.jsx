import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
  }, []);

  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
