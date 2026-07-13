export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display mb-4 text-5xl font-medium text-surface sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-secondary-light">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="space-y-8 text-secondary-light">
          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              1. Introduction
            </h2>
            <p>
              Design Factory Group ("we," "us," or "our") respects your
              privacy and is committed to protecting the personal data you
              share with us through this website. This Privacy Policy
              explains what information we collect, how we use it, and your
              rights regarding that information.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              2. Information We Collect
            </h2>
            <p className="mb-3">We collect information you voluntarily provide when you:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Submit our contact form (name, email, phone number, message)</li>
              <li>Reach out regarding a career opportunity (contact details you choose to share)</li>
            </ul>
            <p className="mt-3">
              We do not collect payment information, government identification,
              or other sensitive personal data through this website.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              3. How We Use Your Information
            </h2>
            <ul className="ml-5 list-disc space-y-2">
              <li>To respond to your enquiries and requests</li>
              <li>To communicate with you about potential projects or opportunities</li>
              <li>To maintain internal records of enquiries received</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              4. Data Storage and Security
            </h2>
            <p>
              Information submitted through our contact form is stored
              securely in our database. We use industry-standard security
              practices, including encrypted connections (HTTPS), to protect
              your data during transmission and storage.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              5. Data Retention
            </h2>
            <p>
              We retain contact form submissions for as long as reasonably
              necessary to respond to your enquiry and maintain business
              records, unless you request earlier deletion.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              6. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us using the details on our{" "}
              <a href="/contact" className="underline hover:text-primary">
                Contact page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              7. Cookies and Analytics
            </h2>
            <p>
              We may use privacy-friendly analytics tools that do not rely on
              personally identifying cookies to understand general website
              usage and improve our services.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3 text-2xl font-medium text-surface">
              9. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please reach
              out via our{" "}
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