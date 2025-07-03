import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface EmergencyButtonProps {
  onClick?: () => void;
  className?: string;
}

export function EmergencyButton({ onClick, className }: EmergencyButtonProps) {
  return (
    <Button
      variant="emergency"
      size="lg"
      onClick={onClick}
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