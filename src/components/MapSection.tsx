import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SafetyMap } from './SafetyMap';

export function MapSection() {
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
          <SafetyMap />
          
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