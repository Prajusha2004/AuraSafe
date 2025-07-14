import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SafetyDashboard } from "@/components/SafetyDashboard";
import { MapSection } from "@/components/MapSection";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />

      {/* 📞 Women Helpline Button */}
      <div className="flex justify-center mt-6">
        <Link to="/helpline">
          <button className="bg-emerald-600 hover:bg-emerald-700
 text-white px-6 py-3 rounded-full text-xl shadow-lg transition-all">
            📞 Women Helpline
          </button>
        </Link>
      </div>

      <FeaturesSection />
      <MapSection />
      <SafetyDashboard />
      <Footer />
    </div>
  );
};

export default Index;
