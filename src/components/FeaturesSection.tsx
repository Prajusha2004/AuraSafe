import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, MessageSquare, Bell, Users, ArrowDown, CirclePlus } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Safety Assistant",
    description: "24/7 intelligent chatbot that provides instant safety advice and emergency guidance",
    color: "text-primary"
  },
  {
    icon: Bell,
    title: "Smart Danger Alerts",
    description: "AI-powered prediction system that warns you about high-risk areas and situations",
    color: "text-warning"
  },
  {
    icon: Shield,
    title: "Instant SOS Detection",
    description: "Voice and text recognition that automatically triggers emergency protocols",
    color: "text-emergency"
  },
  {
    icon: Users,
    title: "Trust Network",
    description: "Connect with family and friends who receive automatic updates about your safety",
    color: "text-safe"
  },
  {
    icon: ArrowDown,
    title: "Safe Route Finder",
    description: "Real-time navigation that suggests the safest paths to your destination",
    color: "text-accent"
  },
  {
    icon: CirclePlus,
    title: "Panic Mode",
    description: "One-touch activation that records evidence and alerts emergency contacts",
    color: "text-destructive"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by Advanced
            <span className="block text-primary">AI Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aurasafe combines cutting-edge artificial intelligence with proven safety protocols 
            to create your personal protection ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="shadow-card hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}