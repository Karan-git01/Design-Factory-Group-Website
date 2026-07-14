import { usePageMeta } from "../hooks/usePageMeta";
  
export default function TermsOfUse() {
  usePageMeta(
    "Terms of Use",
    "Review the terms and conditions governing your use of this website.",
  );

  return (
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display mb-4 text-5xl font-medium text-surface sm:text-6xl">
          Terms of Use
        </h1>
        <p className="mb-12 text-sm text-secondary-light">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-secondary-light">
          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to
              be bound by these Terms of Use. If you do not agree, please
              do not use this website.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              2. Use of Content
            </h2>
            <p>
              All content on this website — including text, images, logos,
              and project descriptions — is the property of Design Factory
              Group unless otherwise stated, and may not be reproduced,
              distributed, or used without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              3. Accuracy of Information
            </h2>
            <p>
              We aim to keep information on this website accurate and up to
              date, including project details, statistics, and career
              listings. However, we make no guarantees regarding the
              completeness or accuracy of all content at all times.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              4. Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party sites (such as
              social media platforms). We are not responsible for the
              content or privacy practices of external websites.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              5. Limitation of Liability
            </h2>
            <p>
              Design Factory Group shall not be liable for any damages
              arising from the use of, or inability to use, this website or
              its content.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              6. Changes to These Terms
            </h2>
            <p>
              We may revise these Terms of Use at any time. Continued use of
              the website after changes are posted constitutes acceptance of
              the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              7. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with
              the laws of India.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              8. Contact Us
            </h2>
            <p>
              For questions regarding these Terms of Use, please reach out
              via our{" "}
              <a href="/contact" className="underline hover:text-primary">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-16 text-xs text-secondary-light">
          This document is a general template and does not constitute legal
          advice. We recommend having it reviewed by a qualified legal
          professional before relying on it for compliance purposes.
        </p>
      </div>
    </main>
  );
}