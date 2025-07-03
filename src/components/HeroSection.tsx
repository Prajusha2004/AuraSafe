import { Button } from "@/components/ui/button";
import { EmergencyButton } from "./EmergencyButton";
import { Shield, MessageSquare, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  const handleEmergencyClick = () => {
    // TODO: Implement emergency alert functionality
    alert("Emergency alert activated! (This is a demo)");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Invisible
            <span className="block bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
              AI Shield
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Aurasafe uses advanced AI to protect you before danger strikes. 
            Stay connected, stay safe, stay empowered.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <MessageSquare className="mr-2 h-5 w-5" />
              Talk to AI Assistant
            </Button>
            <Button variant="navy" size="lg" className="text-lg px-8 py-6">
              <Users className="mr-2 h-5 w-5" />
              Build Trust Network
            </Button>
          </div>

          {/* Emergency Button */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/80 text-sm uppercase tracking-wide">
              Emergency? Press & Hold
            </p>
            <EmergencyButton onClick={handleEmergencyClick} />
            <p className="text-white/60 text-xs max-w-xs">
              Instantly alerts your trust network and emergency services
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-slide-up delay-1000">
        <div className="w-12 h-12 bg-primary-glow/20 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-32 right-16 animate-slide-up delay-1500">
        <div className="w-8 h-8 bg-accent/30 rounded-full blur-sm"></div>
      </div>
    </section>
  );
}