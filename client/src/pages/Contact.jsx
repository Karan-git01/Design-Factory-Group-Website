import { usePageMeta } from "../hooks/usePageMeta";
import { Phone, Mail, MessageCircle } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { Reveal } from "../components/Reveal";

const SOCIAL_ICONS = [
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
        <path d="M10 9v12" />
        <path d="M10 13a4 4 0 0 1 8 0v8" />
      </svg>
    ),
  },
];

export default function Contact() {
  usePageMeta(
    "Contact — Design Factory Group",
    "Speak to a principal at Design Factory Group about your project."
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
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
            <div className="rounded-3xl border border-border bg-card p-7">
              <p className="label-caps text-muted-foreground">Talk to us</p>
              <div className="mt-5 space-y-4">
                <a
                  href="tel:+13107428890"
                  className="flex items-center gap-3 text-foreground link-underline"
                >
                  <Phone size={16} className="text-copper" /> +1 310 742 8890
                </a>
                <a
                  href="mailto:info@designfactorygroup.com"
                  className="flex items-center gap-3 text-foreground link-underline"
                >
                  <Mail size={16} className="text-copper" /> info@designfactorygroup.com
                </a>
                <a
                  href="https://wa.me/13107428890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-arrow inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 label-caps text-background transition hover:bg-copper"
                >
                  <MessageCircle size={14} /> WhatsApp us
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-3xl border border-border bg-card p-7">
              <p className="label-caps text-muted-foreground">Follow</p>
              <div className="mt-5 flex gap-3">
                {SOCIAL_ICONS.map(({ svg, label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
                  >
                    {svg}
                  </a>
                ))}
              </div>
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



























// import { usePageMeta } from "../hooks/usePageMeta";
// import ContactForm from "../components/ContactForm";

// export default function Contact() {
//   usePageMeta("Contact", "Get in touch with Design Factory Group for your next project.");

//   return (
//     <main className="min-h-screen border-t border-secondary/20 bg-ink pt-28 pb-24">
//       <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
//         <div className="mb-8 flex items-center gap-4">
//           <div className="h-px w-14 bg-primary" />
//           <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-secondary-light">
//             Contact
//           </span>
//         </div>

//         <div className="mb-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
//           <div>
//             <h1 className="font-display text-5xl font-light leading-[0.92] tracking-[-0.05em] text-surface sm:text-6xl lg:text-7xl">
//               Let's create
//               <br />
//               <span className="text-primary">something remarkable.</span>
//             </h1>
//           </div>
//           <p className="max-w-md text-base leading-8 text-secondary-light">
//             Whether you're planning a residence, commercial space or renovation,
//             our team is ready to discuss your vision and guide you through every
//             stage of the process.
//           </p>
//         </div>

//         <div className="grid gap-14 lg:grid-cols-[380px_1fr]">
//           <div className="space-y-10">
//             <div className="rounded-[1.75rem] border border-secondary/20 bg-ink-light p-8">
//               <div className="mb-8 flex items-center gap-3">
//                 <div className="h-px w-10 bg-primary" />
//                 <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
//                   Contact
//                 </span>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-secondary">
//                     Phone
//                   </p>
//                   <a
//                     href="tel:+13107428890"
//                     className="text-lg text-surface transition hover:text-primary"
//                   >
//                     +1 310 742 8890
//                   </a>
//                 </div>

//                 <div className="border-t border-secondary/20 pt-6">
//                   <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-secondary">
//                     Email
//                   </p>
//                   <a
//                     href="mailto:info@designfactorygroup.com"
//                     className="break-all text-lg text-surface transition hover:text-primary"
//                   >
//                     info@designfactorygroup.com
//                   </a>
//                 </div>

//                 <div className="border-t border-secondary/20 pt-6">
//                   <a
//                     href="https://wa.me/13107428890"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group inline-flex items-center gap-5"
//                   >
//                     <span className="font-display text-lg font-light text-surface transition-colors duration-300 group-hover:text-primary">
//                       Chat on WhatsApp
//                     </span>
//                     <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 transition-all duration-300 group-hover:border-primary">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-ink transition-transform duration-300 group-hover:translate-x-1">
//                         →
//                       </div>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-[1.75rem] border border-secondary/20 bg-ink-light p-8">
//               <div className="mb-8 flex items-center gap-3">
//                 <div className="h-px w-10 bg-primary" />
//                 <span className="text-[10px] uppercase tracking-[0.35em] text-secondary-light">
//                   Follow Us
//                 </span>
//               </div>
//               <div className="flex flex-col gap-5">
//                 <a href="#" className="text-secondary-light transition hover:text-primary">
//                   Instagram
//                 </a>
//                 <a href="#" className="text-secondary-light transition hover:text-primary">
//                   Facebook
//                 </a>
//                 <a href="#" className="text-secondary-light transition hover:text-primary">
//                   LinkedIn
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div>
//             <ContactForm />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }