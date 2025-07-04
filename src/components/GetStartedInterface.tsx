import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Users, MapPin, Bell, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function GetStartedInterface() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    emergencyContact: '',
    enableLocation: false,
    enableAlerts: false,
    enableVoiceActivation: false
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    toast({
      title: "Welcome to Aurasafe! 🛡️",
      description: "Your AI shield is now active and protecting you.",
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Welcome to Aurasafe</h3>
        <p className="text-muted-foreground">Let's set up your personal AI safety shield</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="emergency">Primary Emergency Contact</Label>
          <Input
            id="emergency"
            placeholder="Emergency contact phone number"
            value={formData.emergencyContact}
            onChange={(e) => updateFormData('emergencyContact', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Bell className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Safety Preferences</h3>
        <p className="text-muted-foreground">Configure your AI protection settings</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <Checkbox
            id="location"
            checked={formData.enableLocation}
            onCheckedChange={(checked) => updateFormData('enableLocation', checked)}
          />
          <div className="flex-1">
            <Label htmlFor="location" className="flex items-center gap-2 cursor-pointer">
              <MapPin className="h-4 w-4" />
              Enable Location Tracking
            </Label>
            <p className="text-sm text-muted-foreground">
              Share your location with trusted contacts for enhanced safety
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <Checkbox
            id="alerts"
            checked={formData.enableAlerts}
            onCheckedChange={(checked) => updateFormData('enableAlerts', checked)}
          />
          <div className="flex-1">
            <Label htmlFor="alerts" className="flex items-center gap-2 cursor-pointer">
              <Bell className="h-4 w-4" />
              Smart Safety Alerts
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive AI-powered alerts about unsafe areas and situations
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <Checkbox
            id="voice"
            checked={formData.enableVoiceActivation}
            onCheckedChange={(checked) => updateFormData('enableVoiceActivation', checked)}
          />
          <div className="flex-1">
            <Label htmlFor="voice" className="flex items-center gap-2 cursor-pointer">
              <MessageSquare className="h-4 w-4" />
              Voice Activation
            </Label>
            <p className="text-sm text-muted-foreground">
              Activate emergency mode with voice commands like "Help me"
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">You're All Set!</h3>
        <p className="text-muted-foreground">Your AI shield is ready to protect you</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold">AI Protection</h4>
          <p className="text-sm text-muted-foreground">Active</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Bell className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold">Smart Alerts</h4>
          <p className="text-sm text-muted-foreground">
            {formData.enableAlerts ? 'Enabled' : 'Disabled'}
          </p>
        </Card>
        
        <Card className="p-4 text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold">Location</h4>
          <p className="text-sm text-muted-foreground">
            {formData.enableLocation ? 'Sharing' : 'Private'}
          </p>
        </Card>
        
        <Card className="p-4 text-center">
          <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
          <h4 className="font-semibold">Emergency Contact</h4>
          <p className="text-sm text-muted-foreground">
            {formData.emergencyContact ? 'Set' : 'None'}
          </p>
        </Card>
      </div>
      
      <div className="bg-primary/10 p-4 rounded-lg">
        <p className="text-sm text-center">
          <strong>Emergency Tip:</strong> Press and hold the red emergency button 
          anywhere on the site to instantly alert your contacts and emergency services.
        </p>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Setup Your AI Shield</span>
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
        </CardTitle>
        <CardDescription>
          Quick setup to activate your personal safety protection
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        
        <div className="flex justify-between pt-6">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline">
              Previous
            </Button>
          )}
          
          <div className="ml-auto">
            {step < 3 ? (
              <Button 
                onClick={handleNext} 
                variant="hero"
                disabled={step === 1 && (!formData.name || !formData.phone)}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} variant="hero">
                Start Protecting Me
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}