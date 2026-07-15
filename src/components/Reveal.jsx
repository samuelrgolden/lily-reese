import { useEffect, useRef } from "react";

/**
 * Scroll-reveal wrapper: renders with the `reveal` class and adds `in`
 * when the element enters the viewport (or is already above it, so instant
 * jumps like anchor deep-links never leave gaps).
 *
 * IntersectionObserver is the primary trigger; a passive scroll/resize
 * check covers environments where observer callbacks are throttled.
 */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let io;
    const cleanup = () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    const show = () => {
      el.classList.add("in");
      cleanup();
    };
    function check() {
      // Some embedded webviews report innerHeight 0 — fall back sensibly.
      const vh = window.innerHeight || document.documentElement.clientHeight || 900;
      if (el.getBoundingClientRect().top < vh * 0.92) show();
    }

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && show()),
        { threshold: 0.12, rootMargin: "9999px 0px -8% 0px" }
      );
      io.observe(el);
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();

    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
