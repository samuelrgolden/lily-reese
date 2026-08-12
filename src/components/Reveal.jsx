import useInView from "./useInView.js";

/**
 * Scroll-reveal wrapper: renders with the `reveal` class and picks up `in`
 * when it scrolls into view. Fade + rise.
 *
 * For the display headings use CutReveal instead — a per-character cut reads
 * better on type that large, and the two must not be nested or this fade
 * muddies the cut.
 */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useInView();

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
