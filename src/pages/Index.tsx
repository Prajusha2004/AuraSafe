import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SafetyDashboard } from "@/components/SafetyDashboard";
import { MapSection } from "@/components/MapSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <MapSection />
      <SafetyDashboard />
    </div>
  );
};

export default Index;