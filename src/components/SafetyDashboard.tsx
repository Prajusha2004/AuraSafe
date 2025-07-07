import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BellPlus, MessageSquare, X, MapPin, Route, CheckCircle, Phone, Mic, BarChart3, AlertTriangle } from "lucide-react";
import { AIChatInterface } from "./AIChatInterface";
import { EmergencyButton } from "./EmergencyButton";
import { FakeCallInterface } from "./FakeCallInterface";
import { VoiceCommandInterface } from "./VoiceCommandInterface";
import { PersonalRiskScore } from "./PersonalRiskScore";
import { CommunityFeed } from "./CommunityFeed";
import { IncidentReporting } from "./IncidentReporting";
import { useToast } from "@/hooks/use-toast";

export function SafetyDashboard() {
  const [showAIChat, setShowAIChat] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showVoiceCommands, setShowVoiceCommands] = useState(false);
  const [showRiskScore, setShowRiskScore] = useState(false);
  const [showCommunityFeed, setShowCommunityFeed] = useState(false);
  const [showIncidentReport, setShowIncidentReport] = useState(false);
  const { toast } = useToast();

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          
          if (navigator.share) {
            navigator.share({
              title: 'My current location - Aurasafe',
              text: 'I\'m sharing my location for safety',
              url: locationUrl
            });
          } else {
            navigator.clipboard.writeText(locationUrl);
            toast({
              title: "Location Shared",
              description: "Your location link has been copied to clipboard and shared with your trust network.",
            });
          }
        },
        () => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location access to share your location.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const getSafeRoute = () => {
    toast({
      title: "Finding Safe Route",
      description: "Analyzing current conditions and finding the safest path to your destination...",
    });
    
    // Simulate route calculation
    setTimeout(() => {
      toast({
        title: "Safe Route Found",
        description: "Route optimized for well-lit areas and safe zones. Check the map for details.",
      });
    }, 2000);
  };

  const checkIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    toast({
      title: "Check-in Successful",
      description: `Your safety check-in at ${timeString} has been sent to your trust network.`,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="py-20 bg-muted/30" id="safety">
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
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowAIChat(true)}
                  >
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
                  <Button 
                    variant="outline" 
                    className="h-12"
                    onClick={shareLocation}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Share Location
                  </Button>
                  <Button 
                    variant="hero" 
                    className="h-12"
                    onClick={getSafeRoute}
                  >
                    <Route className="h-4 w-4 mr-2" />
                    Get Safe Route
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="h-12"
                    onClick={checkIn}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                  <Button 
                    variant="emergency" 
                    className="h-12"
                    onClick={() => setShowEmergency(true)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Emergency SOS
                  </Button>
                </div>
              </div>

              <div className="animate-slide-up">
                <h3 className="text-2xl font-semibold mb-4">Advanced Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-12"
                    onClick={() => setShowFakeCall(true)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Fake Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12"
                    onClick={() => setShowVoiceCommands(true)}
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Commands
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12"
                    onClick={() => setShowRiskScore(true)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Risk Score
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12"
                    onClick={() => setShowIncidentReport(true)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Incident
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Feature Modals */}
      {showAIChat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <Button onClick={() => setShowAIChat(false)} variant="outline" size="sm" className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm">
              <X className="h-4 w-4" />
            </Button>
            <AIChatInterface />
          </div>
        </div>
      )}

      {showEmergency && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button onClick={() => setShowEmergency(false)} variant="outline" size="sm" className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm">
              <X className="h-4 w-4" />
            </Button>
            <Card className="w-full max-w-md p-8 text-center">
              <CardHeader>
                <CardTitle className="text-red-500 mb-4">Emergency SOS</CardTitle>
                <CardDescription>Press and hold the button below to activate emergency protocols</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <EmergencyButton onClick={() => setShowEmergency(false)} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {showFakeCall && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <Button onClick={() => setShowFakeCall(false)} variant="outline" size="sm" className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm">
              <X className="h-4 w-4" />
            </Button>
            <FakeCallInterface onClose={() => setShowFakeCall(false)} />
          </div>
        </div>
      )}

      {showVoiceCommands && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <Button onClick={() => setShowVoiceCommands(false)} variant="outline" size="sm" className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm">
              <X className="h-4 w-4" />
            </Button>
            <VoiceCommandInterface 
              onEmergency={() => setShowEmergency(true)}
              onFakeCall={() => setShowFakeCall(true)}
              onShareLocation={shareLocation}
              onSafeRoute={getSafeRoute}
            />
          </div>
        </div>
      )}

      {showRiskScore && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <Button onClick={() => setShowRiskScore(false)} variant="outline" size="sm" className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm">
              <X className="h-4 w-4" />
            </Button>
            <PersonalRiskScore />
          </div>
        </div>
      )}

      {showIncidentReport && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl">
            <Button onClick={() => setShowIncidentReport(false)} variant="outline" size="sm" className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm">
              <X className="h-4 w-4" />
            </Button>
            <IncidentReporting />
          </div>
        </div>
      )}
    </>
  );
}