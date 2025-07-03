import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { EmergencyButton } from "./EmergencyButton";
import { AIChatInterface } from "./AIChatInterface";
import { TrustNetwork } from "./TrustNetwork";
import { Shield, MessageSquare, Users, X } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  const [showChat, setShowChat] = useState(false);
  const [showTrustNetwork, setShowTrustNetwork] = useState(false);

  const handleEmergencyClick = () => {
    console.log('Emergency button activated');
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
            <Button 
              onClick={() => setShowChat(true)} 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Talk to AI Assistant
            </Button>
            <Button 
              onClick={() => setShowTrustNetwork(true)} 
              variant="navy" 
              size="lg" 
              className="text-lg px-8 py-6"
            >
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

      {/* Floating Chat Interface */}
      {showChat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <Button
              onClick={() => setShowChat(false)}
              variant="outline"
              size="sm"
              className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <AIChatInterface />
          </div>
        </div>
      )}

      {/* Floating Trust Network */}
      {showTrustNetwork && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl">
            <Button
              onClick={() => setShowTrustNetwork(false)}
              variant="outline"
              size="sm"
              className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <TrustNetwork />
          </div>
        </div>
      )}
    </section>
  );
}