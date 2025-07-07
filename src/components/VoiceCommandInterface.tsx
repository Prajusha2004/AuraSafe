import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface VoiceCommandInterfaceProps {
  onEmergency?: () => void;
  onFakeCall?: () => void;
  onShareLocation?: () => void;
  onSafeRoute?: () => void;
}

export function VoiceCommandInterface({ 
  onEmergency, 
  onFakeCall, 
  onShareLocation, 
  onSafeRoute 
}: VoiceCommandInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognition.current = new SpeechRecognition();
      
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript.toLowerCase());
        }
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or check microphone permissions.",
          variant: "destructive",
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const processVoiceCommand = (command: string) => {
    // Emergency commands
    if (command.includes('emergency') || command.includes('help') || 
        command.includes('danger') || command.includes('unsafe')) {
      speak("Activating emergency protocol. Help is on the way.");
      onEmergency?.();
      toast({
        title: "Emergency Activated",
        description: "Voice command detected: Emergency protocol activated",
      });
    }
    // Fake call commands
    else if (command.includes('fake call') || command.includes('exit') || 
             command.includes('get me out')) {
      speak("Starting fake call to help you exit safely.");
      onFakeCall?.();
      toast({
        title: "Fake Call Starting",
        description: "Voice command detected: Emergency exit strategy activated",
      });
    }
    // Location sharing commands
    else if (command.includes('share location') || command.includes('send location')) {
      speak("Sharing your location with trusted contacts.");
      onShareLocation?.();
      toast({
        title: "Location Shared",
        description: "Voice command detected: Location shared with trust network",
      });
    }
    // Safe route commands
    else if (command.includes('safe route') || command.includes('get home') || 
             command.includes('navigate')) {
      speak("Finding the safest route for you.");
      onSafeRoute?.();
      toast({
        title: "Safe Route Finding",
        description: "Voice command detected: Calculating safest path",
      });
    }
    // General safety check
    else if (command.includes('aura') || command.includes('hey aura')) {
      speak("I'm here to help keep you safe. Say emergency, fake call, share location, or safe route.");
      toast({
        title: "Aura Activated",
        description: "I'm listening for safety commands",
      });
    }
    else {
      // Provide help for unrecognized commands
      speak("I can help with emergency, fake call, share location, or safe route. What do you need?");
    }
  };

  const speak = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.current.start();
      setIsListening(true);
      toast({
        title: "Voice Commands Active",
        description: "Say 'Hey Aura' followed by: emergency, fake call, share location, or safe route",
      });
    }
  };

  if (!isSupported) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <MicOff className="h-5 w-5" />
            Voice Commands Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your browser doesn't support voice recognition. Please use a modern browser like Chrome or Firefox.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          Voice Commands
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "hero"}
            size="lg"
            className="w-24 h-24 rounded-full"
          >
            {isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          <p className="mt-4 text-sm font-medium">
            {isListening ? "Listening..." : "Tap to activate voice commands"}
          </p>
          
          {transcript && (
            <div className="mt-3 p-2 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground">Last command:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Available Commands:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• "Hey Aura, emergency" - Activate SOS</li>
            <li>• "Hey Aura, fake call" - Start exit strategy</li>
            <li>• "Hey Aura, share location" - Send location</li>
            <li>• "Hey Aura, safe route" - Find safe path</li>
          </ul>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Works in background when activated. Your privacy is protected.
        </p>
      </CardContent>
    </Card>
  );
}