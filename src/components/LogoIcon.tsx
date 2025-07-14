import Logo from "../assets/NewLogo.svg";

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img 
      src={Logo} 
      alt="Aurasafe Logo" 
      className={`object-contain ${className}`} 
    />
  );
}
