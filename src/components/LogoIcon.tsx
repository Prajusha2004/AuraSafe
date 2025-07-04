import aurasafeLogo from "@/assets/aurasafe-logo-transparent.png";

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img 
      src={aurasafeLogo} 
      alt="Aurasafe Logo" 
      className={`object-contain ${className}`}
    />
  );
}