import { Fragment, cloneElement, isValidElement, useEffect, useRef } from "react";
import useInView from "./useInView.js";

/**
 * Per-character cut reveal for the display headings — every character starts
 * fully below its word's clip edge and rises out of it on a stagger, so the
 * line assembles itself left to right instead of arriving whole.
 *
 * The split is done here rather than with SplitText: it has to survive the
 * inline markup the headings carry (`Selected <span class="italic">Work</span>`),
 * so it walks the element tree, splits only the text nodes, and rebuilds the
 * wrappers around the pieces. A stagger index threads through the whole walk,
 * which is what keeps the count continuous across those wrappers — restarting
 * it inside the span would make the accent word re-run the stagger from zero.
 *
 * Spaces stay as plain text between the word spans, so the heading still wraps
 * on its own at any width. Reserved for the display headings: at body-copy size
 * a per-character stagger reads as a gimmick rather than typesetting.
 */
function split(node, counter) {
  if (typeof node === "string" || typeof node === "number") {
    const text = String(node);
    const out = [];

    // Keep the separators — the split below yields [word, gap, word, …].
    text.split(/(\s+)/).forEach((chunk, ci) => {
      if (!chunk) return;
      if (/^\s+$/.test(chunk)) {
        out.push(chunk);
        return;
      }
      out.push(
        <span className="cut-word" key={`w${ci}-${counter.i}`}>
          {Array.from(chunk).map((ch, chi) => {
            const i = counter.i++;
            return (
              <span className="cut-char" style={{ "--cut-i": i }} key={`c${chi}`}>
                {ch}
              </span>
            );
          })}
        </span>
      );
    });

    return out;
  }

  /* Fragments carry the key: a mixed array like ["Lily ", <span>Reese</span>]
     expands into text-node pieces and cloned elements, none of which have a key
     of their own to inherit. */
  if (Array.isArray(node)) {
    return node.map((child, i) => <Fragment key={`n${i}`}>{split(child, counter)}</Fragment>);
  }

  if (isValidElement(node)) {
    return cloneElement(node, undefined, split(node.props.children, counter));
  }

  return node;
}

export default function CutReveal({ delay = 0, immediate = false, className = "", children }) {
  const inViewRef = useInView();
  const loadRef = useRef(null);

  /* `immediate` is for headings above the fold, which should run on load rather
     than wait on an observer that's already satisfied. It still has to mount in
     the hidden state and flip a frame later — rendering with `in` already set
     would put the characters at their final position with no transition left to
     run, i.e. no animation at all. */
  useEffect(() => {
    if (!immediate) return undefined;
    const el = loadRef.current;
    if (!el) return undefined;
    const id = requestAnimationFrame(() => el.classList.add("in"));
    return () => cancelAnimationFrame(id);
  }, [immediate]);

  const counter = { i: 0 };

  return (
    <span
      ref={immediate ? loadRef : inViewRef}
      className={`cut ${className}`}
      style={delay ? { "--cut-base": `${delay}ms` } : undefined}
    >
      {split(children, counter)}
    </span>
  );
}
