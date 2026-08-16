import { usePageMeta } from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const SITE_URL = "https://designfactorygroup.com";
const TERMS_EFFECTIVE_DATE = "2026-08-16"; // update whenever the terms text changes
const TERMS_VERSION = "1.1";

const SECTIONS = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: [
      `These Terms of Use ("Terms") govern your access to and use of this website (the "Site"), operated by Design Factory Group ("we," "us," or "our"). By accessing or using the Site, you accept and agree to be bound by these Terms. If you do not agree, please do not use the Site.`,
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: [
      "The Site is intended for individuals who are at least 18 years old or who otherwise have the legal capacity to enter into binding agreements. By using the Site, you represent that you meet this requirement.",
    ],
  },
  {
    id: "use-of-content",
    title: "Use of Content & Intellectual Property",
    body: [
      "All content on this Site — including text, images, logos, project photography, drawings and project descriptions — is the property of Design Factory Group or its licensors, unless otherwise stated, and is protected by applicable intellectual property laws.",
      "You may view and download content for personal, non-commercial reference only. Reproduction, distribution, modification, or commercial use of any content without our prior written permission is prohibited.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: [
      "When using the Site, you agree not to: violate any applicable law or regulation; submit false, misleading, or fraudulent information through any form on the Site; attempt to gain unauthorized access to the Site, its systems, or related networks; introduce viruses, malware, or other harmful code; or scrape, harvest, or otherwise extract data from the Site without our written consent.",
    ],
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    body: [
      "We aim to keep information on the Site accurate and up to date, including project details, statistics, and career listings. However, we make no guarantees regarding the completeness, accuracy, or currency of all content at all times, and content may be changed or removed without notice.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    body: [
      "The Site may contain links to third-party websites, including social media platforms. These links are provided for convenience only. We do not control and are not responsible for the content, security, or privacy practices of external websites, and inclusion of a link does not imply endorsement.",
    ],
  },
  {
    id: "disclaimer-of-warranties",
    title: "Disclaimer of Warranties",
    body: [
      `The Site and its content are provided "as is" and "as available," without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, secure, or error-free.`,
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Design Factory Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, arising from your use of, or inability to use, the Site or its content, even if advised of the possibility of such damages.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: [
      "You agree to indemnify and hold harmless Design Factory Group, its officers, employees, and agents from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising from your use of the Site or your violation of these Terms.",
    ],
  },
  {
    id: "termination",
    title: "Termination of Access",
    body: [
      "We reserve the right, at our sole discretion, to suspend or terminate your access to the Site, without notice, for conduct that we believe violates these Terms or is otherwise harmful to other users, us, or third parties.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to These Terms",
    body: [
      "We may revise these Terms at any time. Any changes will be posted on this page together with a revised effective date. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Dispute Resolution",
    body: [
      "These Terms are governed by and construed in accordance with the laws of India, without regard to its conflict-of-law principles. Any disputes arising out of or relating to these Terms or the Site shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India.",
    ],
  },
  {
    id: "severability",
    title: "Severability",
    body: [
      "If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will continue in full force and effect.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: [
      "If you have any questions regarding these Terms of Use, please visit our Contact page.",
    ],
  },
];

// WebPage + BreadcrumbList structured data, matching the Privacy Policy page's
// pattern so search engines treat both legal pages consistently and can
// surface the breadcrumb trail and freshness date in results.
const termsOfUseSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Use — Design Factory Group",
  url: `${SITE_URL}/terms-of-use`,
  description:
    "The terms and conditions governing access to and use of the Design Factory Group website.",
  dateModified: TERMS_EFFECTIVE_DATE,
  isPartOf: {
    "@type": "WebSite",
    name: "Design Factory Group",
    url: SITE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Terms of Use", item: `${SITE_URL}/terms-of-use` },
    ],
  },
};

export default function TermsOfUse() {
  usePageMeta(
    "Terms of Use — Design Factory Group",
    "Review the terms and conditions governing your access to and use of the Design Factory Group website, including intellectual property, liability, and governing law."
  );

  const lastUpdated = new Date(TERMS_EFFECTIVE_DATE).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(termsOfUseSchema)}</script>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <span className="label-caps text-copper">— Legal</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            Terms of Use
          </h1>
        </Reveal>
        <p className="mt-4 label-caps text-muted-foreground">
          Last updated ·{" "}
          <time dateTime={TERMS_EFFECTIVE_DATE}>{lastUpdated}</time>
          <span className="ml-2">(v{TERMS_VERSION})</span>
        </p>

        {/* Table of contents — improves in-page navigation and gives Google
            clear anchor targets/jump-link candidates for sitelinks. */}
        <Reveal delay={40}>
          <nav aria-label="Table of contents" className="mt-10 rounded-2xl border border-border bg-cream-alt p-6">
            <h2 className="label-caps text-muted-foreground">On this page</h2>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link-underline text-sm text-foreground/85">
                    {String(i + 1).padStart(2, "0")}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-12 max-w-none space-y-10 text-foreground/85">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} delay={i * 20}>
              <section id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24 border-t border-border pt-10">
                <h2 id={`${s.id}-heading`} className="font-display text-2xl tracking-tight md:text-3xl">
                  <span className="mr-3 text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed">
                  {s.body.map((p, j) => {
                    if (p.includes("Contact page")) {
                      const [before, after] = p.split("Contact page");
                      return (
                        <p key={j}>
                          {before}
                          <Link to="/contact" className="link-underline text-copper">
                            Contact page
                          </Link>
                          {after}
                        </p>
                      );
                    }
                    return <p key={j}>{p}</p>;
                  })}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}