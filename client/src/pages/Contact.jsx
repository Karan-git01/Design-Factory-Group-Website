import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <h1 className="font-display mb-4 text-5xl font-medium text-surface sm:text-6xl">
        Let's talk
      </h1>
      <p className="mb-16 max-w-xl text-secondary-light">
        Have more questions or need additional information? We are here to
        help.
      </p>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-10">
          <div>
            <h2 className="mb-4 text-sm uppercase tracking-wide text-secondary-light">
              Contact
            </h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
              <a
                href="tel:+13107428890"
                className="text-lg text-surface hover:text-primary"
              >
                +1 310 742 8890
              </a>
              <a
                href="mailto:info@designfactorygroup.com"
                className="text-lg text-surface hover:text-primary"
              >
                info@designfactorygroup.com
              </a>
            </div>
            {/* Click-to-WhatsApp — swap the number for your real WhatsApp business number */}
            <a
              href="https://wa.me/13107428890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-sm font-medium text-surface transition hover:bg-primary-dark"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-sm uppercase tracking-wide text-secondary-light">
              Follow Us
            </h2>
            <div className="flex gap-6">
              <a href="#" className="text-surface hover:text-primary">
                Instagram
              </a>
              <a href="#" className="text-surface hover:text-primary">
                Facebook
              </a>
              <a href="#" className="text-surface hover:text-primary">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}