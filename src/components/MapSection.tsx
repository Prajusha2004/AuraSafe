import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SafetyMap } from './SafetyMap';

export function MapSection() {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowMap(true);
    }
  };

  if (!showMap) {
    return (
      <section id="map" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Live Safety
              <span className="block text-primary">Map & Routes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get real-time safety information, find safe routes, and locate emergency services near you.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Setup Safety Map</CardTitle>
              <CardDescription>
                Enter your Mapbox public token to enable the interactive safety map.
                Get your free token at{' '}
                <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  mapbox.com
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6IklEX0hFUkUifQ..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="font-mono text-sm"
              />
              <Button onClick={handleTokenSubmit} variant="hero" className="w-full">
                Load Safety Map
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This token is only stored temporarily in your browser session
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Live Safety
            <span className="block text-primary">Map & Routes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time safety information showing safe zones, emergency services, and areas to avoid.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <SafetyMap apiKey={mapboxToken} />
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safe Zones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Police stations, hospitals, fire departments, and other emergency services
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Caution Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Areas with recent incidents or poor lighting that require extra awareness
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share your real-time location with trusted contacts for added safety
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}