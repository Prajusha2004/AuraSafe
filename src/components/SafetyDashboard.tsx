import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BellPlus, MessageSquare } from "lucide-react";

export function SafetyDashboard() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Safety
            <span className="block text-primary">Command Center</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay safe, organized in one intelligent dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 bg-safe rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-safe-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Safety Status</CardTitle>
                  <Badge variant="secondary" className="bg-safe text-safe-foreground">
                    All Clear
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Trust Network (4 contacts)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 bg-accent rounded-full border-2 border-card flex items-center justify-center text-xs font-medium text-accent-foreground"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Ready to help with safety guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <BellPlus className="h-6 w-6 text-primary" />
                Intelligent Monitoring
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Real-time location sharing with trusted contacts
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Automatic check-ins based on your schedule
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  AI-powered risk assessment of your environment
                </li>
              </ul>
            </div>

            <div className="animate-slide-up">
              <h3 className="text-2xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12">
                  Share Location
                </Button>
                <Button variant="hero" className="h-12">
                  Get Safe Route
                </Button>
                <Button variant="secondary" className="h-12">
                  Check In
                </Button>
                <Button variant="emergency" className="h-12">
                  Emergency SOS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}