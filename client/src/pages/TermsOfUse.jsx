import { usePageMeta } from "../hooks/usePageMeta";

export default function TermsOfUse() {
  usePageMeta(
    "Terms of Use",
    "Review the terms and conditions governing your use of this website."
  );

  return (
    <main className="min-h-screen border-t border-secondary/20 bg-ink pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-14 bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.45em] text-secondary-light">
              Legal
            </span>
          </div>

          <h1 className="font-display text-5xl font-light tracking-[-0.05em] text-surface sm:text-6xl lg:text-7xl">
            Terms of
            <br />
            <span className="text-primary">Use</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-secondary-light">
            These Terms of Use govern your access to and use of the Design Factory
            Group website and its content.
          </p>

          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-secondary">
            Last Updated ·{" "}
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-16">
          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              1. Acceptance of Terms
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              By accessing and using this website, you accept and agree to be bound
              by these Terms of Use. If you do not agree, please do not use this
              website.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              2. Use of Content
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              All content on this website—including text, images, logos and project
              descriptions—is the property of Design Factory Group unless otherwise
              stated and may not be reproduced, distributed or used without prior
              written permission.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              3. Accuracy of Information
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              We aim to keep information on this website accurate and up to date,
              including project details, statistics and career listings. However,
              we make no guarantees regarding the completeness or accuracy of all
              content at all times.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              4. Third-Party Links
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              This website may contain links to third-party websites, including
              social media platforms. We are not responsible for the content,
              security or privacy practices of external websites.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              5. Limitation of Liability
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              Design Factory Group shall not be liable for any damages arising from
              the use of, or inability to use, this website or its content.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              6. Changes to These Terms
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              We may revise these Terms of Use at any time. Continued use of the
              website after changes are posted constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              7. Governing Law
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              These Terms of Use are governed by and construed in accordance with
              the laws of India.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              8. Contact Us
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              If you have any questions regarding these Terms of Use, please visit
              our{" "}
              <a href="/contact" className="text-primary transition hover:text-surface">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>

        {/* Restored: same disclaimer as Privacy Policy */}
        <div className="mt-24 rounded-[2rem] border border-secondary/20 bg-ink-light p-8">
          <p className="text-sm leading-7 text-secondary-light">
            This document is provided as a general template and does not constitute
            legal advice. We recommend having it reviewed by a qualified legal
            professional before relying on it for compliance purposes.
          </p>
        </div>
      </div>
    </main>
  );
}