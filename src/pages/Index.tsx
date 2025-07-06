import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SafetyDashboard } from "@/components/SafetyDashboard";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <MapSection />
      <SafetyDashboard />
      <Footer />
    </div>
  );
};

export default Index;