import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";

import { AlertsInterface } from "./AlertsInterface";
import { GetStartedInterface } from "./GetStartedInterface";
import Logo from "../assets/NewLogo.svg"; // ✅ updated logo file name

export function Navigation() {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-card/50 backdrop-blur-sm border-b">
        <div className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="Aurasafe Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Aurasafe
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </a>
          <a
            href="#safety"
            className="text-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("safety")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Safety Tools
          </a>
          <a
            href="#community"
            className="text-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Community
          </a>
          <a
            href="#contact"
            className="text-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Button onClick={() => setShowAlerts(true)} variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </Button>
          <Button onClick={() => setShowGetStarted(true)} variant="hero" size="sm">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Alerts Modal */}
      {showAlerts && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <Button
              onClick={() => setShowAlerts(false)}
              variant="outline"
              size="sm"
              className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <AlertsInterface />
          </div>
        </div>
      )}

      {/* Get Started Modal */}
      {showGetStarted && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl">
            <Button
              onClick={() => setShowGetStarted(false)}
              variant="outline"
              size="sm"
              className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm"
            >
              <X className="h-4 w-4" />
            </Button>
            <GetStartedInterface />
          </div>
        </div>
      )}
    </>
  );
}
