import { usePageMeta } from "../hooks/usePageMeta";

export default function PrivacyPolicy() {
  usePageMeta(
    "Privacy Policy",
    "Learn how we collect, use, and protect your personal information."
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
            Privacy
            <br />
            <span className="text-primary">Policy</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-secondary-light">
            We respect your privacy and are committed to protecting the information
            you share with Design Factory Group.
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
              1. Introduction
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              Design Factory Group ("we," "us," or "our") respects your privacy and
              is committed to protecting the personal data you share with us through
              this website. This Privacy Policy explains what information we
              collect, how we use it, and your rights regarding that information.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              2. Information We Collect
            </h2>
            <p className="mb-6 leading-8 text-secondary-light">
              We collect information you voluntarily provide when you:
            </p>
            <ul className="space-y-4 text-secondary-light">
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>Submit our contact form (name, email, phone number, message)</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>Reach out regarding a career opportunity (contact details you choose to share)</span>
              </li>
            </ul>
            <p className="mt-8 max-w-3xl leading-8 text-secondary-light">
              We do not collect payment information, government identification, or
              other sensitive personal data through this website.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              3. How We Use Your Information
            </h2>
            <ul className="space-y-4 text-secondary-light">
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>To respond to your enquiries and requests.</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>To communicate with you about projects or opportunities.</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>To maintain internal business records.</span>
              </li>
            </ul>
            <p className="mt-8 max-w-3xl leading-8 text-secondary-light">
              We do not sell, rent or trade your personal information to third
              parties.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              4. Data Storage & Security
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              Information submitted through our contact form is stored securely in
              our database. We use industry-standard security practices, including
              encrypted HTTPS connections, to protect your data during transmission
              and storage.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              5. Data Retention
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              We retain contact form submissions for as long as reasonably
              necessary to respond to your enquiry and maintain business records,
              unless you request earlier deletion.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              6. Your Rights
            </h2>
            <ul className="space-y-4 text-secondary-light">
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>Request access to your personal information.</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>Request correction of inaccurate information.</span>
              </li>
              <li className="flex gap-4">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>Request deletion of your personal data.</span>
              </li>
            </ul>
            <p className="mt-8 leading-8 text-secondary-light">
              To exercise these rights, contact us using the details on our{" "}
              <a href="/contact" className="text-primary transition hover:text-surface">
                Contact page
              </a>
              .
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              7. Cookies & Analytics
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              We may use privacy-friendly analytics tools that do not rely on
              personally identifying cookies to understand website usage and improve
              our services.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              8. Changes to This Policy
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              We may update this Privacy Policy periodically. Any changes will be
              posted on this page together with the revised date.
            </p>
          </section>

          <section className="border-t border-secondary/20 pt-12">
            <h2 className="font-display mb-6 text-3xl font-light text-surface">
              9. Contact Us
            </h2>
            <p className="max-w-3xl leading-8 text-secondary-light">
              If you have any questions regarding this Privacy Policy, please visit
              our{" "}
              <a href="/contact" className="text-primary transition hover:text-surface">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>

        {/* Restored: important disclaimer — this is a template, not legal advice */}
        <div className="mt-24 rounded-[2rem] border border-secondary/20 bg-ink-light p-8">
          <p className="text-sm leading-7 text-secondary-light">
            This Privacy Policy is provided as a general template and does not
            constitute legal advice. We recommend having it reviewed by a qualified
            legal professional before relying on it for compliance purposes.
          </p>
        </div>
      </div>
    </main>
  );
}