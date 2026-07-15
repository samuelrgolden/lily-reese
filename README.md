# Lily Reese — Portfolio

Single-page editorial portfolio for Lily Reese (journalist · writer · editor), rebuilt as a static
Vite + React + Tailwind site from the Emergent snapshot brief. No backend, no database.

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
```

## Build for production

```bash
npm run build    # static output in dist/
npm run preview  # serve the production build locally
```

The `dist/` folder can be deployed anywhere static files are served (e.g. Vercel, Netlify, GitHub Pages).

## Notes

- All images are self-hosted in `public/` (Lily's photos as compressed WebP, plus the seven
  Daily Emerald article thumbnails, which were previously hotlinked).
- Design tokens (paper/ink/oxblood palette) live as HSL custom properties in `src/index.css`.
- Fonts: Instrument Serif + Inter via Google Fonts (loaded in `index.html`).
