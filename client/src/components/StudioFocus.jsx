import { PenTool, Layers, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "../components/Reveal";

const philosophyPoints = [
  {
    n: "01",
    title: "Focused expertise",
    body: "We concentrate on a limited number of projects to ensure full attention, consistency and control at every stage of the process.",
    icon: PenTool,
  },
  {
    n: "02",
    title: "Thoughtful execution",
    body: "Every element is carefully considered — from overall composition to the smallest architectural and technical decisions, with precision.",
    icon: Layers,
  },
  {
    n: "03",
    title: "Long-term quality",
    body: "Our work is guided by durability, relevance and carefully developed solutions that remain strong, refined and appropriate over time.",
    icon: ShieldCheck,
  },
  {
    n: "04",
    title: "Collaborative partnership",
    body: "We believe exceptional projects are built through transparent communication, close collaboration and a shared vision from concept to completion.",
    icon: Users,
  },
];

export default function Philosophy() {
  return (
    <section aria-labelledby="philosophy-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <span className="label-caps text-copper">— Studio focus</span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="philosophy-heading"
                className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl"
              >
                A modern studio with a clear <em className="text-copper">focus</em>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-md md:max-w-lg text-muted-foreground">
                Design Factory Group is a Siliguri-based architecture and
                construction studio serving residential and commercial
                clients across India, guided by four core principles.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-12 px-5 sm:px-8 md:mx-auto md:max-w-7xl">
        <ul className="grid list-none gap-5 p-0 m-0 sm:grid-cols-2">
          {philosophyPoints.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.n} className="flex">
                <Reveal delay={i * 70}>
                  <div className="group relative flex h-full flex-col rounded-sm border border-border bg-card p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-copper/40 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)] md:p-9">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2.5">
                        <span
                          aria-hidden="true"
                          className="font-display text-3xl leading-none tracking-tight text-foreground/85"
                        >
                          {p.n}
                        </span>
                        <span className="label-caps text-muted-foreground">
                          Principle
                        </span>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-copper/20 bg-copper/[0.07] text-copper shadow-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:rotate-12 group-hover:border-copper group-hover:bg-copper group-hover:text-background group-hover:shadow-[0_8px_20px_-6px_theme(colors.copper)]">
                        <Icon size={17} aria-hidden="true" focusable="false" />
                      </span>
                    </div>
                    <span className="mt-5 block h-px w-full bg-border transition-colors duration-500 group-hover:bg-copper/25" />

                    <h3 className="relative mt-6 inline-block w-fit pb-1.5 font-display text-2xl tracking-tight md:text-3xl">
                      {p.title}
                      <span className="absolute inset-x-0 bottom-0 h-px bg-foreground/70" />
                      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-copper transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}