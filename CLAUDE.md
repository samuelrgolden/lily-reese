# Lily Reese — portfolio site

The live portfolio of Lily Reese, a journalist in Eugene, Oregon. Static Vite + React + Tailwind v4
site, no backend. Netlify builds and publishes it from `main` — **a push to `main` is a production
deploy.** Sam Golden built the site and owns the repository.

## Who you're working with

Requests usually come from Lily herself, through a GitHub issue. She is a writer, not a developer.

- Reply in plain English. Say what changed on the site as a visitor would see it, not which files
  you touched. No jargon she'd have to look up.
- Small or obvious requests: make a sensible choice, do it, and say what you chose. Don't stop to
  ask about wording or placement you can reasonably infer.
- Never invent facts about her or her work — job titles, dates, quotes, what an article says. If a
  fact you need isn't in her request or on the page she linked, ask.
- When you finish a GitHub request, end your reply with her next steps, in these words or close to
  them:
  1. Click the **Create PR** link above, then the green **Create pull request** button.
  2. Wait about a minute for Netlify to post a **Deploy Preview** link on that page, and open it to
     see the change.
  3. Happy with it? Click **Merge pull request**, then **Confirm merge**. It's live a minute later.
  4. Want something different? Leave a comment there starting with `@claude`.

## Commands

```bash
npm ci           # install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build into dist/ — must pass before you commit
```

There are no tests or linter. `npm run build` is the check. On a GitHub run the dependencies are
already installed.

## Where things live

| To change | Edit |
| --- | --- |
| Articles / clips | `src/data/articles.js` — the one list both the home page and All Work read |
| Publication names, colours, filter pills | `src/data/publications.js`, plus `[data-pub]` rules in `src/index.css` |
| "Latest Dispatch" card, rotating words, beats ticker | `DISPATCH`, `WORDS`, `BEATS` in `src/components/Hero.jsx` |
| Bio and the facts column | `PARAGRAPHS`, `FACTS` in `src/components/About.jsx` |
| Jobs timeline and stats | `ROLES`, `STATS` in `src/components/Experience.jsx` |
| Email and links | `CONTACTS` in `src/components/Contact.jsx` |
| Menu links | `LINKS` in `src/components/Menu.jsx` |
| Colours, fonts, shared styles | `src/index.css` (design tokens at the top) |
| Browser tab title, search/share description | `index.html` |
| Photos | `public/` (portraits) and `public/work/` (article thumbnails) |

The home page (`src/pages/Home.jsx`) stacks Hero, About, Work, Experience, Contact. `/about`,
`/work`, `/experience` and `/contact` are standalone pages that reuse those same components, so an
edit to a component shows up in both places.

## Adding an article (the most common request)

1. Read the article page for its headline, date, and lead photo.
2. Compress the photo into `public/work/` — never hotlink an image from another site:
   ```bash
   python3 scripts/to_webp.py <image file or URL> public/work/<short-slug>.webp --width 1200 --max-kb 250
   ```
   The script prints the final width × height; that pair is the entry's `size`. If Lily attached a
   photo to the issue, use hers rather than the article's.
3. Add the entry to `ARTICLES` in `src/data/articles.js`, **newest first**:
   - `pub` must match a key in `PUB_SLUGS` exactly (`"Eugene Weekly"`, not `"The Eugene Weekly"`).
   - `date` is `"Sep 17, 2026"` format. It has to stay parseable — the "recent" marker is computed
     from it.
   - `tags`: one or two, reusing existing tags where one fits.
   - `description`: one or two sentences in the register of the existing ones — specific, concrete,
     drawn from the article itself.
   - Typographic quotes and apostrophes (`’ “ ”`), as in the rest of the file.
   - Coursework carries `kind: "class"` and a label in place of a date.
4. If the new piece is now her most recent, point `DISPATCH` in `Hero.jsx` at it too. Note its
   differences: the date is spelled out (`"September 17, 2026"`) and it takes a single `tag`.
5. Leave `SELECTED` alone. Those five home-page picks are Lily's own choice; change them only when
   she asks.

A publication that isn't in `PUB_SLUGS` yet needs three things: a slug there, a `[data-pub="…"]`
colour in `src/index.css` in **both** the light and dark blocks (keep it in the same narrow band of
lightness and saturation as its neighbours), and a `FILTERS` entry only if she'll have several
pieces there.

## Other photos

Portraits and section photos: `--width 1600 --max-kb 400`. Keep the filename if you're replacing
one, so nothing else has to change. Always WebP, always self-hosted in `public/`.

## Design rules

The design is deliberate — an editorial, newspaper feel in paper, ink and oxblood, set in Instrument
Serif and Inter. Changes should look like they were always part of it.

- Colours come from the HSL tokens at the top of `src/index.css`, used as `hsl(var(--token))`.
  Never hardcode a colour.
- Every change has to work in dark mode (`:root[data-theme="dark"]`) and on a phone.
- Sizes are in `rem`, not `px` — the whole layout scales with the root font size on large screens.
- The comments in this codebase explain why things are the way they are. Read the ones near what
  you're changing, and keep them accurate when you change it.
- Don't add dependencies, pages, or sections unless that is what was asked for.

## Saving and publishing

- **GitHub issue or pull request:** commit to the branch you were given; the next-steps list above
  is how it reaches the live site.
- **Local session:** commit and push to `main` only when the person you're working with says to.
- Commit messages are one plain sentence about what changed for a visitor, e.g. "Add two Eugene
  Weekly clips and update the bio".
- Leave `.github/` and `netlify.toml` alone unless Sam asks.
