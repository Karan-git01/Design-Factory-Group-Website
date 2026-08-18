import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { Reveal } from "../components/Reveal";

// Internal links surfaced for a lost visitor — also gives crawlers a real
// path back into the site from a page that's otherwise a dead end.
const QUICK_LINKS = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function NotFound() {
  // FIX: previously passed "Page Not Found | Design Factory Group" —
  // usePageMeta already appends " | Design Factory Group" itself, so this
  // produced a duplicated suffix in the actual <title> tag (same bug
  // fixed in Careers.jsx, BranchPage.jsx, and Contact.jsx).
  usePageMeta(
    "Page Not Found",
    "The page you're looking for doesn't exist or may have moved. Return to the Design Factory Group homepage to keep exploring our architecture and construction work."
  );

  // 404s should never be indexed or followed as if they were real content —
  // a client-side route match here doesn't send a real HTTP 404 status, so
  // this meta tag is what tells crawlers to disregard the page.
  // FIX: previously always created a brand new <meta name="robots"> node
  // regardless of whether one already existed (e.g. a default one set in
  // index.html). If one did, this left two <meta name="robots"> tags in
  // the document at once with possibly conflicting directives — an
  // unreliable signal to crawlers on exactly the page where "noindex"
  // needs to be unambiguous. Now reuses an existing tag if present
  // (restoring its previous value on unmount) and only creates/removes a
  // new one if none existed — same pattern usePageMeta.js already uses
  // for description/canonical.
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    const alreadyExisted = Boolean(meta);
    const previousContent = meta?.content;

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";

    return () => {
      if (alreadyExisted) {
        meta.content = previousContent;
      } else {
        document.head.removeChild(meta);
      }
    };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden border-t border-border bg-background pt-28 pb-20">
      {/* Decorative accent, same dot-grid motif used in Header's menu */}
      <div className="pointer-events-none absolute right-8 top-24 hidden lg:block">
        <div className="dot-grid text-copper h-28 w-28" />
      </div>
      <div className="pointer-events-none absolute -left-16 bottom-10 hidden lg:block">
        <div className="dot-grid text-copper h-20 w-20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Reveal>
          <span className="label-caps text-copper">— Error</span>
        </Reveal>

        <Reveal delay={80}>
          <span className="mt-6 block font-display text-[7rem] font-light leading-none tracking-[-0.08em] text-copper sm:text-[9rem] lg:text-[12rem]">
            404
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Page not found
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            The page you're looking for doesn't exist, may have been moved,
            or the link you followed is no longer available.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <Link to="/" className="group mt-14 inline-flex items-center gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-border transition-all duration-300 group-hover:border-copper group-hover:bg-foreground group-hover:text-background">
              <ArrowLeft
                size={18}
                aria-hidden="true"
                focusable="false"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </span>
            <span className="label-caps text-foreground transition-colors duration-300 group-hover:text-copper">
              Back to Home
            </span>
          </Link>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-16 w-full max-w-2xl border-t border-border pt-10">
            <p className="label-caps mb-6 text-muted-foreground">
              Or try one of these
            </p>
            <nav aria-label="Suggested pages">
              <ul className="flex flex-wrap items-center justify-center gap-3">
                {QUICK_LINKS.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group/pill inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-foreground/85 transition-all duration-300 hover:border-copper hover:text-copper"
                    >
                      {label}
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        focusable="false"
                        className="text-copper opacity-0 transition-all duration-300 -translate-x-1 group-hover/pill:translate-x-0 group-hover/pill:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>
      </div>
    </main>
  );
}