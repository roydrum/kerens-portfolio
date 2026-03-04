import { Hero } from "@/components/Hero";
import { CaseStudies } from "@/components/CaseStudies";
import { CreativeManagement } from "@/components/CreativeManagement";
import { SectionTransition } from "@/components/SectionTransition";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionTransition>
        <CaseStudies />
        <CreativeManagement />
      </SectionTransition>
    </>
  );
}
