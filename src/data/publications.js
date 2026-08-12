/* Masthead colour coding.
 *
 * Each publication gets a hue, carried as a `data-pub` slug on the row and
 * resolved to `--pub` in the stylesheet. Deliberately subtle: the colour only
 * ever touches the index number, the meta bullet, the tag, the hairline that
 * grows on hover, and the filter pill. Never the headline at rest and never a
 * filled block — twenty-one coloured cards would read as a chart, not a body of
 * work.
 *
 * The values sit in one narrow band of lightness and saturation on purpose, so
 * they read as a set rather than as six unrelated accents. Eugene Weekly keeps
 * the house oxblood, being where most of the current reporting lands, and
 * coursework is a warm grey rather than a colour — it isn't a masthead.
 */
export const PUB_SLUGS = {
  "Eugene Weekly": "weekly",
  "Ethos Magazine": "ethos",
  "Ascend Magazine": "ascend",
  SOJC: "sojc",
  "Highway 58 Herald": "herald",
  "JCOM 331": "jcom",
  "JCOM 332": "jcom",
};

export const pubSlug = (pub) => PUB_SLUGS[pub] ?? "jcom";

/* The filter row. `Class Work` cuts across mastheads — it selects on `kind`,
   which is why this is a predicate list and not just a list of names. */
export const FILTERS = [
  { label: "All", slug: null, match: () => true },
  { label: "Eugene Weekly", slug: "weekly", match: (a) => a.pub === "Eugene Weekly" },
  { label: "Ethos Magazine", slug: "ethos", match: (a) => a.pub === "Ethos Magazine" },
  { label: "Ascend Magazine", slug: "ascend", match: (a) => a.pub === "Ascend Magazine" },
  { label: "SOJC", slug: "sojc", match: (a) => a.pub === "SOJC" },
  { label: "Class Work", slug: "jcom", match: (a) => a.kind === "class" },
];
