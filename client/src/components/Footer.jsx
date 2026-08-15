import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

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

// NAP (name/address/phone) — kept identical to the JSON-LD block and
// <address> in Header.jsx so search engines see one consistent business
// identity across the site.
const CONTACT_DETAILS = [
  {
    Icon: MapPin,
    label:
      "Ground Floor, Bhakti Apartment, near Dada Bhai Ground, Deshbandhu Para, Siliguri, West Bengal - 734004, India",
    href: null,
  },
  { Icon: Phone, label: "+91 98755 95155", href: "tel:+919875595155" },
  { Icon: Mail, label: "dfgroupslg@gmail.com", href: "mailto:dfgroupslg@gmail.com" },
];

// Same three accounts, same icon markup, as Header.jsx — LinkedIn was never
// a real Design Factory Group account (it was placeholder data alongside
// the "#" hrefs); YouTube is the studio's actual third channel.
const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/design_factory_group?igsh=MTgybzU2aG94Nmg2dw==",
    label: "Design Factory Group on Instagram",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/share/1CU3XF4ge8/",
    label: "Design Factory Group on Facebook",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@designfactorygroup?si=9BS0WxsK1qII5Igb",
    label: "Design Factory Group on YouTube",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.05 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
      </svg>
    ),
  },
];

function FooterCol({ title, links, bordered = true }) {
  return (
    <div className={bordered ? "md:border-l md:border-border md:pl-8" : ""}>
      <h3 className="label-caps mb-5 text-muted-foreground">{title}</h3>
      <ul className="space-y-3">
        {links.map(({ label, to }) => (
          <li key={to + label}>
            <Link
              to={to}
              className="group/link inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-300 hover:text-copper"
            >
              <span className="relative">
                {label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-copper transition-all duration-300 group-hover/link:w-full"
                />
              </span>
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
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8 md:pt-24 md:pb-10">
        {/* Statement row: headline + primary CTA, closing the page on an action */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border pb-14 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-3xl leading-[1.1] tracking-tight md:text-5xl">
            Designing spaces that{" "}
            <em className="text-copper">stand the test</em> of time.
          </h2>

          <Link
            to="/contact"
            className="group inline-flex flex-none items-center gap-3 rounded-full border border-border bg-card px-6 py-3.5 label-caps transition-all duration-300 hover:border-copper hover:bg-foreground hover:text-background"
          >
            Start a project
            <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-copper text-background">
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                focusable="false"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </div>

        {/* Link grid */}
        <div className="grid gap-10 pt-14 pb-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-8">
          <div>
            <span className="font-display text-xl tracking-tight">
              Design Factory Group
            </span>
            <p className="mt-4 max-w-[26ch] text-sm text-foreground/70">
              A design and build studio based in Siliguri, shaping considered,
              high-end residential and commercial work across India, from
              concept through completion.
            </p>
            <ul className="mt-6 flex list-none items-center gap-3 p-0 m-0">
              {SOCIAL_LINKS.map(({ svg, href, label }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/100 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-foreground hover:text-background"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {svg}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="contents">
            <FooterCol title="Pages" links={NAV_LINKS} />
            <FooterCol title="Explore" links={SECTION_LINKS} />
          </nav>

          <div className="md:border-l md:border-border md:pl-8">
            <h3 className="label-caps mb-5 text-muted-foreground">Contact</h3>
            <ul className="space-y-3.5">
              {CONTACT_DETAILS.map(({ Icon, label, href }) => {
                const isAddress = Icon === MapPin;
                const TextTag = isAddress ? "address" : "span";
                if (href) {
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        className="group/contact flex items-start gap-2.5 text-sm text-foreground/80 transition-colors duration-300 hover:text-copper"
                      >
                        <Icon
                          size={15}
                          aria-hidden="true"
                          focusable="false"
                          className="mt-0.5 flex-none text-muted-foreground/70 transition-colors duration-300 group-hover/contact:text-copper"
                        />
                        {label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={label}>
                    <TextTag className="flex items-start gap-2.5 text-sm not-italic text-foreground/80">
                      <Icon size={15} aria-hidden="true" focusable="false" className="mt-0.5 flex-none text-muted-foreground/70" />
                      {label}
                    </TextTag>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
            <span>
              © {new Date().getFullYear()} Design Factory Group. All rights
              reserved.
            </span>
            <nav aria-label="Legal" className="flex items-center gap-x-5">
              {LEGAL_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center justify-between gap-5 md:justify-end">
            <Link
              to="/admin/login"
              className="text-muted-foreground/70 transition-colors duration-300 hover:text-foreground"
            >
              Admin
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="group grid h-9 w-9 place-items-center rounded-full border border-border transition-all duration-300 hover:border-copper hover:text-copper"
            >
              <ArrowUp
                size={14}
                aria-hidden="true"
                focusable="false"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}