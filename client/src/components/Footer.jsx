import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Use", to: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-center">
      <h2 className="font-display mb-10 text-4xl font-medium text-surface sm:text-6xl">
        Design Factory Group
      </h2>

      <nav className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="text-secondary-light transition hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="text-sm text-secondary-light">
        © {new Date().getFullYear()} Design Factory Group. All rights reserved.
      </p>

      <Link
        to="/admin/login"
        className="mt-4 inline-block text-xs text-secondary-light/50 transition hover:text-secondary-light"
      >
        Admin
      </Link>
    </footer>
  );
}