import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, PhoneCall, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FakeCallInterfaceProps {
  onClose?: () => void;
}

export function FakeCallInterface({ onClose }: FakeCallInterfaceProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callerName, setCallerName] = useState('Mom');
  const [callScript, setCallScript] = useState("Hey, where are you? I'm nearby and coming to pick you up.");
  const [selectedPreset, setSelectedPreset] = useState('emergency');
  const { toast } = useToast();

  const presets = {
    emergency: {
      name: 'Mom',
      script: "Hey, where are you? I'm nearby and coming to pick you up."
    },
    work: {
      name: 'Boss',
      script: "Hi, we need you back at the office immediately for an urgent meeting."
    },
    friend: {
      name: 'Sarah',
      script: "Hey! I'm outside waiting for you. Are you ready to go?"
    },
    medical: {
      name: 'Dr. Smith',
      script: "Hello, this is Dr. Smith. We need you to come in for your appointment right away."
    }
  };

  useEffect(() => {
    const preset = presets[selectedPreset as keyof typeof presets];
    setCallerName(preset.name);
    setCallScript(preset.script);
  }, [selectedPreset]);

  const startFakeCall = () => {
    setIsCallActive(true);
    
    // Simulate incoming call vibration pattern
    if (navigator.vibrate) {
      const pattern = [500, 300, 500, 300, 500];
      navigator.vibrate(pattern);
    }

    // Text-to-speech for the fake call script
    if (window.speechSynthesis) {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(callScript);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }, 3000); // Wait 3 seconds before "answering"
    }

    toast({
      title: "Fake Call Activated",
      description: "Incoming call simulation started. This will help you exit safely.",
      duration: 2000,
    });
  };

  const endCall = () => {
    setIsCallActive(false);
    window.speechSynthesis?.cancel();
    toast({
      title: "Call Ended",
      description: "Stay safe! Your location has been shared with trusted contacts.",
    });
  };

  if (isCallActive) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Fake Call Screen */}
        <div className="flex-1 flex flex-col items-center justify-center text-white p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Phone className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{callerName}</h2>
            <p className="text-lg text-gray-300">Incoming call...</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-sm text-center mb-8">
            <p className="text-sm italic">"{callScript}"</p>
          </div>

          <div className="flex gap-8">
            <Button
              onClick={endCall}
              variant="destructive"
              size="lg"
              className="w-16 h-16 rounded-full"
            >
              <X className="h-8 w-8" />
            </Button>
            <Button
              onClick={endCall}
              variant="safe"
              size="lg"
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600"
            >
              <PhoneCall className="h-8 w-8" />
            </Button>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">
            This is a fake call to help you exit safely
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Emergency Exit Strategy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Call Scenario</label>
          <Select value={selectedPreset} onValueChange={setSelectedPreset}>
            <SelectTrigger>
              <SelectValue placeholder="Choose scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emergency">Emergency Pickup</SelectItem>
              <SelectItem value="work">Work Emergency</SelectItem>
              <SelectItem value="friend">Friend Pickup</SelectItem>
              <SelectItem value="medical">Medical Appointment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Caller Name</label>
          <Input
            value={callerName}
            onChange={(e) => setCallerName(e.target.value)}
            placeholder="Enter caller name"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Call Script</label>
          <textarea
            className="w-full min-h-20 p-2 border rounded-md resize-none text-sm"
            value={callScript}
            onChange={(e) => setCallScript(e.target.value)}
            placeholder="What the caller will say..."
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={startFakeCall} variant="hero" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Start Fake Call
          </Button>
          {onClose && (
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          This creates a realistic fake incoming call to help you exit unsafe situations safely.
        </p>
      </CardContent>
    </Card>
  );
}