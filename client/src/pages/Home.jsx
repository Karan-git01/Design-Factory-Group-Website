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

export default function Home() {
  usePageMeta(
    "Home",
    "High-end residential design & build. Design Factory Group delivers architecture, construction, and interior design with precision and care."
  );

  return (
    <main>
      <Hero />
      <StudioFocus />
      <AboutPreview />
      <WhatWeDo />
      <ProjectsTimeline />
      <WhyUs />
      <Stats />
      <WorkStages />
      <BranchesSection />
      <FAQ />
    </main>
  );
}