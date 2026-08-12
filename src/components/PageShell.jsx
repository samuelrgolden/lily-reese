import { Link } from "react-router-dom";

/*
 * Chrome shared by every standalone page: clearance for the fixed nav (which is
 * h-16, and these pages have no masthead bar to sit under it), plus a way back
 * to the one-page site. The sections themselves are dropped in untouched, so
 * they render identically here and on the home page.
 */
export default function PageShell({ children }) {
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-[90rem] px-6 pt-8 md:px-12">
        <Link
          to="/"
          className="group dl smallcaps lift link-wipe inline-flex items-center gap-2 text-[hsl(var(--muted-warm))] hover:text-[hsl(var(--oxblood))]"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Back to the front page
        </Link>
      </div>
      {children}
    </div>
  );
}
