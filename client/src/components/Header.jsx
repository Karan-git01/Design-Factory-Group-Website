import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "../context/LenisContext";

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

const INLINE_LINKS = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Branches", to: "/#branches" },
  { label: "Contact", to: "/contact" },
];

const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Instagram",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Facebook",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.6 3.5h-1.9a3.9 3.9 0 0 0-3.9 3.9V10H7.5v3.3h2.3V21h3.4v-7.7h2.6l.5-3.3h-3.1V7.6c0-.66.54-1.2 1.2-1.2h1.9V3.5Z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.2" y="9" width="3.6" height="11" />
        <circle cx="5" cy="4.7" r="1.9" />
        <path d="M10.5 9v11" />
        <path d="M10.5 13.6a4.3 4.3 0 0 1 8.6 0V20" />
      </svg>
    ),
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useLenis();

  const [hideNav, setHideNav] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 80) {
        setHideNav(false);
      } else if (currentY > lastScrollY.current) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (menuOpen) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenisRef]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-transform duration-300 ${
          hideNav ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 md:h-20 lg:px-12">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M3 11 12 3l9 8" />
                <path d="M5 10v10h14V10" />
                <path d="M10 20v-6h4v6" />
              </svg>
            </span>
            <span className="label-caps text-[0.7rem] leading-tight">
              Design Factory
              <br className="sm:hidden" />{" "}
              <span className="hidden sm:inline">·</span> Group
            </span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {INLINE_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="link-grow label-caps text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-copper hover:bg-copper hover:text-background"
          >
            <span className="relative flex h-[15px] w-[18px] flex-col justify-between">
              <span className="h-[1.5px] w-full origin-center bg-current transition-all duration-300 ease-out group-hover:translate-y-[7px] group-hover:rotate-45" />
              <span className="h-[1.5px] w-full bg-current transition-opacity duration-200 ease-out group-hover:opacity-0" />
              <span className="h-[1.5px] w-full origin-center bg-current transition-all duration-300 ease-out group-hover:-translate-y-[7px] group-hover:-rotate-45" />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-background"
          >
            <div className="pointer-events-none absolute right-8 top-24 hidden lg:block">
              <div className="dot-grid text-copper h-28 w-28" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 sm:px-8 lg:px-12">
              <div className="flex h-16 items-center justify-between border-b border-border/80 md:h-20">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M3 11 12 3l9 8" />
                      <path d="M5 10v10h14V10" />
                      <path d="M10 20v-6h4v6" />
                    </svg>
                  </span>
                  <span className="label-caps text-[0.7rem] leading-tight">
                    Design Factory
                    <span className="hidden sm:inline"> · Group</span>
                  </span>
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="group grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-all duration-300 hover:border-copper hover:bg-copper/10"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:rotate-90"
                  >
                    <path
                      d="M1 1L15 15M15 1L1 15"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid flex-1 gap-8 py-10 lg:grid-cols-[1fr_280px] lg:gap-16 lg:py-16">
                <nav>
                  <ul className="divide-y divide-border/80">
                    {NAV_LINKS.map((link, i) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.4 }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setMenuOpen(false)}
                          className="group flex items-center justify-between gap-6 py-4 md:py-5"
                        >
                          <span className="font-display text-3xl leading-none tracking-tight text-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-copper sm:text-4xl md:text-5xl">
                            {link.label}
                          </span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="shrink-0 -translate-x-2 text-copper opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          >
                            <path
                              d="M5 12H19M19 12L13 6M19 12L13 18"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <aside className="hidden lg:flex lg:flex-col lg:justify-between">
                  <div className="flex flex-col gap-7 rounded-2xl border border-border bg-card/60 p-7">
                    <div>
                      <p className="label-caps mb-4 flex items-center gap-2 text-muted-foreground">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="M3 7l9 6 9-6" />
                        </svg>
                        Get in touch
                      </p>
                      <a
                        href="mailto:studio@designfactory.group"
                        className="group flex items-center justify-between gap-3 border-b border-border/80 pb-4 text-foreground/90 transition-colors duration-300 hover:text-copper"
                      >
                        studio@designfactory.group
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        >
                          <path
                            d="M5 12H19M19 12L13 6M19 12L13 18"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                      <p className="mt-4 text-foreground/70">
                        +1 (415) 555-0148
                      </p>
                    </div>

                    <div>
                      <p className="label-caps mb-3 flex items-center gap-2 text-muted-foreground">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
                          <circle cx="12" cy="9.5" r="2.4" />
                        </svg>
                        Studio
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        120 Sandstone Avenue
                        <br />
                        Suite 4, San Francisco
                      </p>
                    </div>

                    <div className="border-l-2 border-copper py-1 pl-4">
                      <p className="label-caps mb-2 text-copper">
                        Currently
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/70">
                        Accepting new residential and hospitality
                        commissions for 2027.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="border-t border-border py-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="label-caps text-muted-foreground">
                    Follow
                  </span>
                  <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map(({ svg, href, label }, i) => (
                      <a
                        key={i}
                        href={href}
                        aria-label={label}
                        className="group grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-background"
                      >
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          {svg}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

