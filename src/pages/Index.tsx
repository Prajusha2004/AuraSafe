import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SafetyDashboard } from "@/components/SafetyDashboard";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";
import { LogoDownload } from "@/components/LogoDownload";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <LogoDownload />
        </div>
      </section>
      <FeaturesSection />
      <MapSection />
      <SafetyDashboard />
      <Footer />
    </div>
  );
};

export default Index;