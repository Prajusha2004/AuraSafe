import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Phone } from "lucide-react";

interface EmergencyButtonProps {
  onClick?: () => void;
  className?: string;
}

export function EmergencyButton({ onClick, className }: EmergencyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePress = () => {
    setIsPressed(true);
    setCountdown(5);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger emergency alert
          triggerEmergency();
          setIsPressed(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergency = () => {
    // In a real app, this would:
    // 1. Send location to emergency contacts
    // 2. Call emergency services
    // 3. Start recording audio/video
    // 4. Send alerts to trust network
    
    alert('🚨 EMERGENCY ALERT ACTIVATED!\n\nIn a real app, this would:\n• Send your location to emergency contacts\n• Alert local authorities\n• Start recording evidence\n• Notify your trust network\n\n(This is a demo)');
    onClick?.();
  };

  const cancelEmergency = () => {
    setIsPressed(false);
    setCountdown(0);
  };

  if (isPressed) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Button
            variant="emergency"
            size="lg"
            className={`
              h-24 w-24 rounded-full text-xl font-bold shadow-emergency
              animate-pulse-emergency scale-110 transition-transform
              ${className}
            `}
          >
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8" />
              <span className="text-lg font-bold">{countdown}</span>
            </div>
          </Button>
        </div>
        <Button onClick={cancelEmergency} variant="outline" size="sm">
          Cancel Emergency
        </Button>
        <p className="text-center text-sm text-foreground">
          Emergency services will be contacted in {countdown} seconds
        </p>
      </div>
    );
  }

  return (
    <Button
      variant="emergency"
      size="lg"
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      className={`
        h-20 w-20 rounded-full text-xl font-bold shadow-emergency
        animate-pulse-emergency hover:scale-110 transition-transform
        ${className}
      `}
    >
      <Shield className="h-8 w-8" />
    </Button>
  );
}