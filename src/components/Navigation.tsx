import { Button } from "@/components/ui/button";
import { Shield, Bell, Users, MessageSquare } from "lucide-react";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-card/50 backdrop-blur-sm border-b">
      <div className="flex items-center space-x-2">
        <Shield className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Aurasafe
        </span>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <a href="#features" className="text-foreground hover:text-primary transition-colors">
          Features
        </a>
        <a href="#safety" className="text-foreground hover:text-primary transition-colors">
          Safety Tools
        </a>
        <a href="#community" className="text-foreground hover:text-primary transition-colors">
          Community
        </a>
        <a href="#contact" className="text-foreground hover:text-primary transition-colors">
          Contact
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Alerts
        </Button>
        <Button variant="hero" size="sm">
          Get Started
        </Button>
      </div>
    </nav>
  );
}