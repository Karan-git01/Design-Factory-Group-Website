import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "../context/LenisContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Why us", to: "/#why-us" },
  { label: "Testimonials", to: "/#testimonials" },
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
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Facebook",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
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
                        className="group grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/100 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-foreground hover:text-background"
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

