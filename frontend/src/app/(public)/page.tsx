import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { MetricsStrip } from "@/components/landing/MetricsStrip";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { ScenarioShowcase } from "@/components/landing/ScenarioShowcase";
import { TrustedInstitutions } from "@/components/landing/TrustedInstitutions";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <LandingNavbar />
      <HeroSection />
      <MetricsStrip />
      <CapabilitiesSection />
      <ScenarioShowcase />
      <TrustedInstitutions />
      <TestimonialsSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
