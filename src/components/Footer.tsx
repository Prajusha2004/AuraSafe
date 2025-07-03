import { LogoIcon } from "@/components/LogoIcon";

export function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <LogoIcon className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Aurasafe
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Your invisible AI shield. Advanced artificial intelligence protecting women 
              through smart safety features, real-time alerts, and emergency assistance.
            </p>
          </div>

          {/* Safety Features */}
          <div>
            <h3 className="font-semibold mb-4">Safety Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>AI Safety Assistant</li>
              <li>Emergency SOS</li>
              <li>Trust Network</li>
              <li>Safe Route Finder</li>
              <li>Real-time Alerts</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Emergency</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Emergency: 911</li>
              <li>Crisis Text Line: 741741</li>
              <li>National Domestic Violence: 1-800-799-7233</li>
              <li>RAINN Hotline: 1-800-656-4673</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Aurasafe. Protecting women through AI innovation.</p>
        </div>
      </div>
    </footer>
  );
}