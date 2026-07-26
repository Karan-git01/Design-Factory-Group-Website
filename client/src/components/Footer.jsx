import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const SECTION_LINKS = [
  { label: "Why Us", to: "/#why-us" },
  { label: "Work Stages", to: "/#work-stages" },
  { label: "Testimonials", to: "/#testimonials" },
  { label: "Branches", to: "/#branches" },
  { label: "FAQ", to: "/#faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms" },
];

// Inline SVGs replacing lucide-react brand icons (Instagram/Facebook/Linkedin
// aren't exported by this project's lucide-react version)
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A5.98 5.98 0 0 1 16 8z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_ICONS = [InstagramIcon, FacebookIcon, LinkedinIcon];

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="label-caps mb-4 text-muted-foreground">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(({ label, to }) => (
          <li key={to + label}>
            <Link to={to} className="text-sm text-foreground/80 transition hover:text-copper">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream-alt">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-3xl leading-[1.1] tracking-tight md:text-5xl">
              Designing spaces that <em className="text-copper">stand the test</em> of time.
            </h2>
            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition hover:border-foreground/40 hover:bg-foreground hover:text-background"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Pages" links={NAV_LINKS} />
          <FooterCol title="Explore" links={SECTION_LINKS} />
          <FooterCol title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Design Factory Group. All rights reserved.</span>
          <Link to="/admin/login" className="text-muted-foreground/70 hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}







