import { usePageMeta } from "../hooks/usePageMeta";
import Hero from "../components/Hero";
import StudioFocus from "../components/StudioFocus";
import AboutPreview from "../components/AboutPreview";
import WhatWeDo from "../components/WhatWeDo";
import ProjectsTimeline from "../components/ProjectsTimeline";
import WhyUs from "../components/WhyUs";
import Stats from "../components/Stats";
import WorkStages from "../components/WorkStages";
import BranchesSection from "../components/BranchesSection";
import FAQ from "../components/FAQ";
import MarqueeStrip from "../components/MarqueeStrip";
import Testimonials from "../components/Testimonials";

export default function Home() {
  // FIX: previously passed "Home" as the title, producing
  // "Home | Design Factory Group" — a generic placeholder title on the
  // homepage, which is weaker for SEO/click-through than the brand name
  // alone. usePageMeta already falls back to plain "Design Factory Group"
  // when no title is given, so passing null uses that instead of adding a
  // new special case. Also added the canonical path, matching the
  // convention now used on every other page (Careers, Contact,
  // BranchPage).
  usePageMeta(
    null,
    "High-end residential design & build. Design Factory Group delivers architecture, construction, and interior design with precision and care.",
    "/"
  );

  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <StudioFocus />
      <AboutPreview />
      <WhatWeDo />
      <ProjectsTimeline />
      <WhyUs />
      <Testimonials />
      <Stats />
      <WorkStages />
      <BranchesSection />
      <FAQ />
    </main>
  );
}