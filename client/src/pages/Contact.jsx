import { usePageMeta } from "../hooks/usePageMeta";
import { Phone, Mail, MessageCircle } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Reveal } from "../components/Reveal";

// Same brand marks used in Header.jsx's SOCIAL_LINKS — kept in sync so the
// icon shapes match everywhere the socials appear on the site.
const SOCIAL_ICONS = [
  {
    label: "Design Factory Group on Instagram",
    href: "https://www.instagram.com/design_factory_group?igsh=MTgybzU2aG94Nmg2dw==",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
    label: "Design Factory Group on Facebook",
    href: "https://www.facebook.com/share/1CU3XF4ge8/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
    label: "Design Factory Group on YouTube",
    href: "https://youtube.com/@designfactorygroup?si=9BS0WxsK1qII5Igb",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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

export default function Contact() {
  usePageMeta(
    "Contact | Design Factory Group — Architecture & Construction Studio, Siliguri",
    "Get in touch with Design Factory Group, one of Siliguri's leading architecture and construction studios, about your residential or commercial project across India."
  );

  // ContactPage structured data pointing at the same Organization details
  // declared globally in Header.jsx — kept in sync with the real phone/
  // email so this page's schema doesn't contradict the site-wide one.
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Design Factory Group",
    ...(typeof window !== "undefined" && { url: window.location.href }),
    about: {
      "@type": "Organization",
      name: "Design Factory Group",
      url: "https://www.designfactorygroup.in/",
      email: "dfgroupslg@gmail.com",
      telephone: "+91-98755-95155",
    },
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <Reveal>
        <span className="label-caps text-copper">— Contact</span>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          Let's create something <em className="text-copper">remarkable</em>.
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Whether you're planning a residence, commercial space or renovation, our team
          is ready to discuss your vision and guide you through every stage of the process.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-sm border border-border bg-card p-7">
              <h2 className="label-caps text-muted-foreground">Talk to us</h2>
              <address className="not-italic">
                <div className="mt-5 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
                  <a
                    href="tel:+919875595155"
                    className="flex items-center gap-3 text-foreground link-underline"
                  >
                    <Phone size={16} className="text-copper" aria-hidden="true" focusable="false" />
                    +91 98755 95155
                  </a>
                  <a
                    href="mailto:dfgroupslg@gmail.com"
                    className="flex items-center gap-3 text-foreground link-underline md:basis-full"
                  >
                    <Mail size={16} className="text-copper" aria-hidden="true" focusable="false" />
                    dfgroupslg@gmail.com
                  </a>
                  <a
                    href="https://wa.me/919875595155"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-arrow inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 label-caps text-background transition hover:bg-copper"
                  >
                    <MessageCircle size={14} aria-hidden="true" focusable="false" /> WhatsApp us
                  </a>
                </div>
              </address>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-sm border border-border bg-card p-7">
              <h2 className="label-caps text-muted-foreground underline decoration-2 underline-offset-4">
                Follow
              </h2>
              <nav aria-label="Design Factory Group on social media">
                <ul className="mt-5 flex list-none gap-3">
                  {SOCIAL_ICONS.map(({ svg, label, href }, i) => (
                    <li key={i}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="group relative grid h-11 w-11 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
                      >
                        {svg}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-4"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}