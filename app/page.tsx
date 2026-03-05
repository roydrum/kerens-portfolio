import { Hero } from "@/components/Hero";
import { CaseStudies } from "@/components/CaseStudies";
import { Scrippo } from "@/components/Scrippo";
import { CreativeManagement } from "@/components/CreativeManagement";
import { Illustrations } from "@/components/Illustrations";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CaseStudies />
      <CreativeManagement />
      <Scrippo />
      <Illustrations />
      <Contact />
    </>
  );
}
