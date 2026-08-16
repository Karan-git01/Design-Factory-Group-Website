import { usePageMeta } from "../hooks/usePageMeta";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const SITE_URL = "https://designfactorygroup.com";
const POLICY_EFFECTIVE_DATE = "2026-08-16"; // update whenever the policy text changes
const POLICY_VERSION = "1.2";

const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      `Design Factory Group ("we," "us," or "our") respects your privacy and is committed to protecting the personal data you share with us through this website (the "Site"). This Privacy Policy explains what information we collect, how and why we use it, who we share it with, how long we keep it, and the rights you have over it.`,
      `By using the Site, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this policy, please do not use the Site.`,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      "We only collect personal information that you voluntarily provide to us directly through our contact form on the Site — namely your name, email address, phone number, and the content of your message.",
      "We do not use cookies, analytics tools, tracking pixels, or any other technology to automatically collect information about your visit, and we do not knowingly collect payment card details, government identification numbers, or other special categories of sensitive personal data through this Site.",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    body: [
      "Where applicable law requires it (including the EU/UK GDPR), we process the information you submit through the contact form on the basis of your consent, given when you complete and submit the form, and our legitimate interest in responding to your enquiry.",
      "You may withdraw consent at any time by contacting us; this will not affect the lawfulness of any processing carried out before withdrawal.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    body: [
      "We use the information submitted through the contact form solely to:",
      "• Respond to your enquiry, quote request, or project or career submission.",
      "• Communicate with you about the specific project or opportunity you contacted us about.",
      "• Maintain internal business, accounting, and administrative records.",
      "We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.",
    ],
  },
  {
    id: "sharing-disclosure",
    title: "How We Share Information",
    body: [
      "We may share your contact form submission with service providers who help us operate the Site or deliver our services on our behalf (for example, website hosting or email delivery), and who are contractually obligated to keep it confidential and use it only for the purposes we specify.",
      "We may also disclose information where required to do so by law, regulation, legal process, or governmental request, or where we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      "If Design Factory Group is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction; we will notify you of any such change and any choices you may have.",
    ],
  },
  {
    id: "data-storage-security",
    title: "Data Storage & Security",
    body: [
      "Information submitted through our contact form is stored securely in our database. We use industry-standard security measures, including encrypted HTTPS connections in transit and access controls at rest, to help protect your data from unauthorized access, alteration, disclosure, or destruction.",
      "No method of transmission or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: [
      "We retain contact form and enquiry submissions for as long as reasonably necessary to respond to you, deliver the services requested, and maintain business, legal, or accounting records, after which we delete or anonymize the data — unless you request earlier deletion or a longer retention period is required by law.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: [
      "Depending on your location, you may have the right to: access the personal information we hold about you; request correction of inaccurate or incomplete information; request deletion of your personal data; restrict or object to certain processing; request a portable copy of your data; and, where processing is based on consent, withdraw that consent at any time.",
      "If you are a California resident, you may have additional rights under applicable state privacy law, including the right to know what personal information is collected and the right to opt out of its sale or sharing; we do not sell personal information as defined under such laws.",
      "To exercise any of these rights, contact us using the details on our Contact page. We will respond within the timeframe required by applicable law.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    body: [
      "The Site is not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can delete it.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    body: [
      "The Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their privacy policies before providing any personal information.",
    ],
  },
  {
    id: "changes-to-policy",
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any changes will be posted on this page together with a revised effective date.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: [
      "If you have any questions regarding this Privacy Policy or wish to exercise your rights, please visit our Contact page.",
    ],
  },
];

// WebPage schema (this page is a legal/policy document, not an article) plus
// a BreadcrumbList so search engines can render the breadcrumb trail in
// results. dateModified drives the "last updated" freshness signal Google
// uses for policy pages.
const privacyPolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — Design Factory Group",
  url: `${SITE_URL}/privacy-policy`,
  description:
    "How Design Factory Group collects, uses, and protects personal information submitted through the contact form on this website.",
  dateModified: POLICY_EFFECTIVE_DATE,
  isPartOf: {
    "@type": "WebSite",
    name: "Design Factory Group",
    url: SITE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy-policy` },
    ],
  },
};

export default function PrivacyPolicy() {
  usePageMeta(
    "Privacy Policy — Design Factory Group",
    "Read how Design Factory Group collects, uses, and protects the information you submit through our contact form, and learn your rights under GDPR and CCPA."
  );

  const lastUpdated = new Date(POLICY_EFFECTIVE_DATE).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(privacyPolicySchema)}</script>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <span className="label-caps text-copper">— Legal</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            Privacy Policy
          </h1>
        </Reveal>
        <p className="mt-4 label-caps text-muted-foreground">
          Last updated ·{" "}
          <time dateTime={POLICY_EFFECTIVE_DATE}>{lastUpdated}</time>
          <span className="ml-2">(v{POLICY_VERSION})</span>
        </p>

        {/* Table of contents — improves in-page navigation and gives Google
            clear anchor targets/jump-link candidates for sitelinks. */}
        <Reveal delay={40}>
          <nav aria-label="Table of contents" className="mt-10 rounded-sm border border-border bg-cream-alt p-6">
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