import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AdvantagesSection } from "@/components/sections/advantages";
import { StatsSection } from "@/components/sections/stats";
import { ProcessSection } from "@/components/sections/process";
import { CasesPreviewSection } from "@/components/sections/cases-preview";
import { IndustriesSection } from "@/components/sections/industries";
import { CTASection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AdvantagesSection />
        <StatsSection />
        <ProcessSection />
        <CasesPreviewSection />
        <IndustriesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
