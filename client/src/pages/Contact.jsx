import { usePageMeta } from "../hooks/usePageMeta";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  usePageMeta("Contact", "Get in touch with Design Factory Group for your next project.");

  return (
    <main className="min-h-screen border-t border-secondary/20 bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-14 bg-primary" />
          <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
            Contact
          </span>
        </div>

        <div className="mb-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="font-display text-5xl font-light leading-[0.92] tracking-[-0.05em] text-surface sm:text-6xl lg:text-7xl">
              Let's create
              <br />
              <span className="text-primary">something remarkable.</span>
            </h1>
          </div>
          <p className="max-w-md text-base leading-8 text-secondary-light">
            Whether you're planning a residence, commercial space or renovation,
            our team is ready to discuss your vision and guide you through every
            stage of the process.
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[380px_1fr]">
          <div className="space-y-10">
            <div className="rounded-[1.75rem] border border-secondary/20 bg-ink-light p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
                  Contact
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-secondary">
                    Phone
                  </p>
                  <a
                    href="tel:+13107428890"
                    className="text-lg text-surface transition hover:text-primary"
                  >
                    +1 310 742 8890
                  </a>
                </div>

                <div className="border-t border-secondary/20 pt-6">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-secondary">
                    Email
                  </p>
                  <a
                    href="mailto:info@designfactorygroup.com"
                    className="break-all text-lg text-surface transition hover:text-primary"
                  >
                    info@designfactorygroup.com
                  </a>
                </div>

                <div className="border-t border-secondary/20 pt-6">
                  <a
                    href="https://wa.me/13107428890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-5"
                  >
                    <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
                      Chat on WhatsApp
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 transition-all duration-300 group-hover:border-primary">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-ink transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-secondary/20 bg-ink-light p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
                  Follow Us
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <a href="#" className="text-secondary-light transition hover:text-primary">
                  Instagram
                </a>
                <a href="#" className="text-secondary-light transition hover:text-primary">
                  Facebook
                </a>
                <a href="#" className="text-secondary-light transition hover:text-primary">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}