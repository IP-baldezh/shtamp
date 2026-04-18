import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { TasksSection } from "@/components/sections/tasks";
import { AdvantagesSection } from "@/components/sections/advantages";
import { StatsSection } from "@/components/sections/stats";
import { ProductionSection } from "@/components/sections/production";
import { QualitySection } from "@/components/sections/quality";
import { ProcessSection } from "@/components/sections/process";
import { CasesPreviewSection } from "@/components/sections/cases-preview";
import { IndustriesSection } from "@/components/sections/industries";
import { FAQSection } from "@/components/sections/faq";
import { ArticlesPreviewSection } from "@/components/sections/articles-preview";
import { CTASection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TasksSection />
        <AdvantagesSection />
        <StatsSection />
        <ProductionSection />
        <QualitySection />
        <ProcessSection />
        <CasesPreviewSection />
        <IndustriesSection />
        <FAQSection />
        <ArticlesPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
