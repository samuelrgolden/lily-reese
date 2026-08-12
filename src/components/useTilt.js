import { useEffect, useRef } from "react";

/**
 * Pointer-driven card tilt. Writes --rx/--ry on the element; the easing and the
 * perspective live in the `.tilt` rules in index.css.
 *
 * Gated three ways, all of which have to pass: a fine pointer that can actually
 * hover, no reduced-motion preference, and the desktop breakpoint. So it simply
 * does not exist on touch — no listeners attached, no transform written.
 *
 * @param {number} x  peak rotateY in degrees (horizontal pointer travel)
 * @param {number} y  peak rotateX in degrees (vertical pointer travel)
 */
export default function useTilt(x = 4.5, y = 3.5) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 48rem)").matches;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !wide || !motion) return undefined;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width; // 0..1
      const ny = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${(nx - 0.5) * 2 * x}deg`);
      el.style.setProperty("--rx", `${(0.5 - ny) * 2 * y}deg`);
    };

    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return ref;
}
