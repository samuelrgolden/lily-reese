import Reveal from "./Reveal.jsx";

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ArchiveIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

const CONTACTS = [
  { label: "Email", value: "lily.lreese@gmail.com", href: "mailto:lily.lreese@gmail.com", Icon: MailIcon },
  { label: "Phone", value: "(415) 849-8611", href: "tel:+14158498611", Icon: PhoneIcon },
  {
    label: "LinkedIn",
    value: "in/lily-reese",
    href: "https://www.linkedin.com/in/lily-reese-357395238/",
    external: true,
    Icon: LinkedInIcon,
  },
  {
    label: "Daily Emerald",
    value: "Staff archive",
    href: "https://dailyemerald.com/staff_name/lily-reese/",
    external: true,
    Icon: ArchiveIcon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="pt-10 md:pt-12">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="rule-strong" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-10 py-10 md:gap-x-10 md:py-12">
          {/* Photo */}
          <Reveal as="figure" className="col-span-12 md:col-span-4">
            <div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--paper-deep))]">
              <img
                src="/lily-on-assignment.webp"
                alt="Lily Reese sitting in the stadium stands"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="smallcaps mt-3 text-[hsl(var(--muted-warm))]">
              Fig. 3 — Autzen Stadium, Eugene · April 2026
            </figcaption>
          </Reveal>

          {/* Colophon */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <p className="smallcaps text-[hsl(var(--muted-warm))]">Section V — Colophon</p>
              <h2 className="display mt-3 text-[2.8rem] md:text-[3.8rem]">
                Tell me a<br />
                <span className="italic text-[hsl(var(--oxblood))]">story.</span>
              </h2>
              <p className="serif mt-4 max-w-lg text-lg italic leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
                I’m open to pitches, edits, coffees in Eugene, or quiet introductions to people whose stories
                deserve telling.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 border-b border-[hsl(var(--ink)/0.18)]">
                {CONTACTS.map((contact) => (
                  <li key={contact.label}>
                    <a
                      href={contact.href}
                      {...(contact.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group lift grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-t border-[hsl(var(--ink)/0.18)] py-3.5"
                    >
                      <contact.Icon className="h-[17px] w-[17px] text-[hsl(var(--oxblood))]" />
                      <span>
                        <span className="smallcaps block text-[0.65rem] text-[hsl(var(--muted-warm))]">
                          {contact.label}
                        </span>
                        <span className="serif mt-0.5 block text-lg transition-colors duration-300 group-hover:text-[hsl(var(--oxblood))] md:text-xl">
                          {contact.value}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="justify-self-end text-[hsl(var(--muted-warm))] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[hsl(var(--oxblood))]"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Footer / colophon line */}
        <footer className="flex flex-col gap-2 border-t border-[hsl(var(--ink)/0.18)] py-6 md:flex-row md:items-center md:justify-between">
          <p className="smallcaps text-[hsl(var(--muted-warm))]">© 2026 Lily Reese</p>
          <p className="smallcaps text-[hsl(var(--muted-warm))]">Set in Instrument Serif &amp; Inter</p>
        </footer>
      </div>
    </section>
  );
}
