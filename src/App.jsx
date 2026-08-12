import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

/* A route change leaves the browser where it was on the previous page, which on
   a long page means arriving halfway down the new one. Only reset when there's
   no hash — the home page's anchors still have to work. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
  }, []);

  return (
    <div id="top">
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Anything unrecognised is the front page rather than a dead end. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}
