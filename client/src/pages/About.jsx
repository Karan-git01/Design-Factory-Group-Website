import { usePageMeta } from "../hooks/usePageMeta";
import TeamMemberCard from "../components/TeamMemberCard";
import TextReveal from "../components/TextReveal";
import { Reveal } from "../components/Reveal";

import himanshuSinghPhoto from "../assets/images/Himanshu-Singh.webp";
import abhinashKumarSinghPhoto from "../assets/images/Abhinash-Kumar-Singh.webp";
import mukulJoshiPhoto from "../assets/images/Mukul-Joshi.webp";
import aishikSarkarPhoto from "../assets/images/Aishik-Sarkar.webp";
import sunitaSurPhoto from "../assets/images/Sunita-Sur.webp";
import abhishekhSharma from "../assets/images/Abhishekh-Sharma.webp";

const SITE_URL = "https://designfactorygroup.com";

const TEAM = [
  {
    name: "Himanshu Singh",
    role: "Principal Architect & Founder",
    bio: "Leading the practice with a strong vision for innovative architecture, thoughtful design, and functional spaces that balance creativity, purpose, and lasting impact.",
    photoUrl: himanshuSinghPhoto,
  },
  {
    name: "Sunita Sur",
    role: "Interior Designer",
    bio: "Passionate about creating elegant, functional, and personalized spaces that reflect individual lifestyles, combining creativity and practicality to deliver comfortable, beautiful, and meaningful environments.",
    photoUrl: sunitaSurPhoto,
  },
  {
    name: "Abhinash Kumar Singh",
    role: "Marketing, Client Relations & Execution Head",
    bio: "Managing client relationships, project coordination, and execution while ensuring professional communication, quality delivery, and exceptional experiences from start to completion.",
    photoUrl: abhinashKumarSinghPhoto,
  },
  {
    name: "Abhishekh Sharma",
    role: "Architectural Visualizer & Interior Designer",
    bio: "Over seven years of experience creating immersive visual narratives that bring architectural concepts to life with realism, detail, and creativity.",
    photoUrl: abhishekhSharma,
  },
  {
    name: "Mukul Joshi",
    role: "Architect",
    bio: "Passionate about creating functional and beautiful spaces that enhance everyday living, combining thoughtful design, practical planning, and aesthetics to create meaningful environments for people.",
    photoUrl: mukulJoshiPhoto,
  },
  {
    name: "Aishik Sarkar",
    role: "Architectural Visualizer & Interior Designer",
    bio: "Over seven years of experience creating immersive visual narratives that bring architectural concepts to life with realism, detail, and creativity.",
    photoUrl: aishikSarkarPhoto,
  },
];

// AboutPage + ItemList(Person) structured data. Lets Google surface the
// studio's leadership/team directly in rich results and ties each person
// back to the Organization entity declared sitewide in App.jsx.
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Design Factory Group",
  url: `${SITE_URL}/about`,
  description:
    "Design Factory Group is a global studio for high-end residential architecture, interiors and construction, led by a multidisciplinary team of architects, designers and engineers.",
  mainEntity: {
    "@type": "Organization",
    name: "Design Factory Group",
    url: SITE_URL,
    employee: TEAM.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      image: member.photoUrl,
      worksFor: {
        "@type": "Organization",
        name: "Design Factory Group",
      },
    })),
  },
};

export default function About() {
  usePageMeta(
    "About Us — Architecture, Interiors & Construction",
    "Meet the architects, designers and engineers behind Design Factory Group, a global studio delivering high-end residential and commercial architecture, interiors and construction under one accountable team."
  );

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>

      {/* Hero intro */}
      <section
        aria-labelledby="about-heading"
        className="mx-auto grid max-w-7xl gap-10 px-5 pb-6 pt-10 sm:px-8 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-16 md:pb-8 md:pt-14"
      >
        <div>
          <Reveal>
            <span className="label-caps text-copper">— About the studio</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              id="about-heading"
              className="mt-3 max-w-5xl font-display text-5xl leading-[1.02] tracking-tight md:mt-4 md:text-7xl"
            >
              Building spaces with <em className="text-copper">purpose</em> &amp; precision.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8 md:mt-8">
              <span className="hidden h-px w-8 translate-y-3 bg-copper sm:block" />
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Design Factory Group is a global studio for high-end residential architecture,
                interiors and construction. We concentrate on a limited number of projects at a
                time, ensuring full attention, consistency and control from the first conversation
                to the final handover.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="relative hidden md:block">

            <figure className="relative">
              {/* Corner ticks frame — absolutely positioned off the figure box,
                  so it auto-tracks the image's height at every breakpoint
                  (tablet-tall aspect ratio included) with no separate tuning needed */}
              <div aria-hidden className="pointer-events-none absolute -inset-3 hidden md:block">
                <span className="absolute left-0 top-0 h-4 w-px bg-copper" />
                <span className="absolute left-0 top-0 h-px w-4 bg-copper" />
                <span className="absolute right-0 top-0 h-4 w-px bg-copper" />
                <span className="absolute right-0 top-0 h-px w-4 bg-copper" />
                <span className="absolute bottom-0 left-0 h-4 w-px bg-copper" />
                <span className="absolute bottom-0 left-0 h-px w-4 bg-copper" />
                <span className="absolute bottom-0 right-0 h-4 w-px bg-copper" />
                <span className="absolute bottom-0 right-0 h-px w-4 bg-copper" />
              </div>

              {/* Dot grid accent */}
              <div
                aria-hidden
                className="dot-grid pointer-events-none absolute -left-9 -top-9 z-10 hidden h-20 w-20 text-copper md:block"
              />

              <div className="relative overflow-hidden rounded-sm bg-card">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
                  alt="Architects and interior designers at Design Factory Group reviewing a residential project in the studio"
                  loading="eager"
                  fetchPriority="high"
                  draggable={false}
                  className="aspect-[3/4] w-full object-cover md:aspect-[3/4] lg:aspect-[8/5]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/25 to-transparent"
                />
                
              </div>
            </figure>
          </div>
        </Reveal>
      </section>

      {/* Two-column supporting text */}
      <section aria-label="Our approach" className="mx-auto max-w-7xl px-5 pb-10 pt-0 sm:px-8 md:pb-14">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <Reveal>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              We keep architecture, interiors and construction under one accountable team.
              That closeness lets us hold intent all the way from first sketch to the moment
              a client turns the key — details survive the journey.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              Our approach combines careful design thinking with hands-on construction
              expertise, giving every client one accountable team throughout the entire
              journey — from the first conversation to the final handover.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-heading" className="border-t border-border bg-cream-alt py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-10">
            <div>
              <Reveal>
                <span className="label-caps text-copper">— The team</span>
              </Reveal>
              <Reveal delay={80}>
                <TextReveal
                  text="Meet the team."
                  emphasize={["team."]}
                  as="h2"
                  id="team-heading"
                  className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:mt-4 md:text-5xl"
                />
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="max-w-md text-muted-foreground md:justify-self-end">
                A multidisciplinary team of architects, engineers and construction
                professionals working together to deliver timeless spaces with
                uncompromising quality.
              </p>
            </Reveal>
          </div>

          <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 60} as="li">
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}