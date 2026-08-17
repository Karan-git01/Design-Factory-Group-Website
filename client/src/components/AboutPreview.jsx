import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import TextReveal from "./TextReveal";
import aboutPreviewImg from "../assets/images/about-preview-img.webp";

/* ---------- ABOUT PREVIEW ---------- */
export default function AboutPreview() {
  return (
    <section aria-labelledby="about-heading" className="bg-cream-alt py-16 sm:py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[1.1fr_1fr] md:gap-16 lg:gap-20">
        {/* ---------- TEXT COLUMN ---------- */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="label-caps text-copper">— About</span>
          </Reveal>

          <div id="about-heading">
            <TextReveal
              className="mt-4 font-display text-[2.25rem] leading-[1.1] tracking-tight sm:text-4xl md:text-5xl md:leading-[1.08]"
              text="Design Factory Group is a team working at the intersection of architecture, construction and technology."
              emphasize={["architecture,"]}
            />
          </div>

          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-balance text-muted-foreground">
              We take on a small number of private residences each year, giving each project
              the studio's full attention from first sketch to final walkthrough.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <Link
              to="/contact"
              className="group mt-9 inline-flex w-fit items-center gap-4 rounded-full border border-copper/40 py-2 pl-6 pr-2 transition-colors duration-300 hover:border-copper"
            >
              <span className="label-caps text-foreground transition-colors duration-300 group-hover:text-copper">
                Discuss the Project
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-copper text-background">
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 ease-out group-hover:-rotate-45"
                />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* ---------- IMAGE COLUMN ---------- */}
        <div className="relative md:flex md:flex-col md:justify-center">
          <div className="img-zoom overflow-hidden rounded-sm border border-border bg-card">
            <img
              src={aboutPreviewImg}
              alt="Team working on architectural drawings"
              className="aspect-[4/3] w-full max-h-[360px] object-cover sm:max-h-[420px] md:aspect-auto md:h-[540px] md:max-h-none lg:aspect-[4/3] lg:h-auto lg:max-h-[480px]"
            />
          </div>

          <Reveal delay={280}>
            <div className="group absolute z-10 -bottom-4 -left-2 w-[calc(100%-2rem)] rounded-sm border border-copper bg-copper p-4 shadow-xl sm:-bottom-8 sm:-left-6 sm:w-auto sm:max-w-xs sm:p-6 md:z-10 md:-bottom-8 md:-left-4 md:w-auto md:max-w-xs md:p-6">
              <p className="label-caps relative inline-block w-fit pb-1 text-background/70">
                Who we work with
                <span className="absolute inset-x-0 bottom-0 h-px bg-background/30" />
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-background transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </p>
              <p className="relative mt-2 font-display text-sm leading-tight text-background text-[0.75rem] md:text-base lg:text-lg">
                Private clients, family offices and select developers building lasting homes.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}