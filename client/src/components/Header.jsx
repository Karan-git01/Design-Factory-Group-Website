import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Why us", to: "/#why-us" },
  { label: "Work stages", to: "/#work-stages" },
  { label: "Careers", to: "/careers" },
  { label: "Branches", to: "/#branches" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/#faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-1/2 z-50 flex w-[92%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full bg-ink/95 px-6 py-3 backdrop-blur">
        <Link to="/" className="font-display text-lg font-medium tracking-wide text-surface">
          Design Factory Group
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="rounded-full bg-surface px-5 py-2 text-sm font-medium text-ink transition hover:bg-primary hover:text-surface"
        >
          Menu
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-ink px-6 py-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-medium text-surface">
                Design Factory Group
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start justify-center gap-2 py-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-5xl font-medium text-surface transition hover:text-primary sm:text-6xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-secondary/30 pt-6">
              <span className="text-sm uppercase tracking-wide text-secondary-light">
                Social
              </span>
              <div className="flex flex-wrap gap-6">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-surface transition hover:text-primary"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}