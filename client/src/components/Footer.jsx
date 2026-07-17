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
  { label: "Branches", to: "/#branches" },
  { label: "FAQ", to: "/#faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-secondary/20 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 xl:py-24">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
              Design Factory Group
            </span>
          </div>

          <h2 className="font-display max-w-4xl text-4xl font-light leading-[0.92] tracking-[-0.05em] text-surface sm:text-5xl md:text-6xl lg:text-7xl">
            Designing spaces
            <br />
            that stand
            <br />
            the test of time.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-secondary/20 py-10 sm:grid-cols-3">
          {/* Pages */}
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-secondary">
              Pages
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium tracking-wide text-secondary-light transition-all duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Explore (on-page sections) */}
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-secondary">
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {SECTION_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium tracking-wide text-secondary-light transition-all duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-secondary">
              Legal
            </p>
            <nav className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium tracking-wide text-secondary-light transition-all duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-6 border-t border-secondary/20 pt-8 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Design Factory Group. All rights
            reserved.
          </p>

          <Link
            to="/admin/login"
            className="w-fit uppercase tracking-[0.25em] transition-colors duration-300 hover:text-primary"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}