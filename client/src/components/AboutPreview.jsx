import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import TextReveal from "./TextReveal";

/* ---------- ABOUT PREVIEW ---------- */
export default function AboutPreview() {
  return (
    <section className="bg-cream-alt py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="label-caps text-copper">— About</span>
          </Reveal>

          <TextReveal
            className="mt-4                 font-display text-4xl leading-[1.08] tracking-tight md:text-5xl"
            text="Design Factory Group is a team working at the intersection of architecture, construction and technology."
            emphasize={["architecture,"]}
          />

          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-muted-foreground">
              We take on a small number of private residences each year, giving each project
              the studio's full attention from first sketch to final walkthrough.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link
              to="/contact"
              className="btn-arrow mt-8 inline-flex items-center gap-3 label-caps text-copper"
            >
              Discuss the Project <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="relative">
          <div className="img-zoom overflow-hidden rounded-[2rem] border border-border bg-card">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&h=1400&q=80"
              alt="Team working on architectural drawings"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 max-w-xs rounded-3xl border border-border bg-background p-6 shadow-xl md:-left-10">
            <p className="label-caps text-muted-foreground">Who we work with</p>
            <p className="mt-2 font-display text-xl leading-tight">
              Private clients, family offices and select developers building lasting homes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
