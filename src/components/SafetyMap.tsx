import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, AlertTriangle } from 'lucide-react';

interface SafetyMapProps {
  apiKey?: string;
}

export function SafetyMap({ apiKey }: SafetyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [safeZones, setSafeZones] = useState<any[]>([]);
  const [dangerZones, setDangerZones] = useState<any[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        initializeMap(longitude, latitude);
      },
      () => {
        // Default to New York if location access denied
        setUserLocation([-74.0059, 40.7128]);
        initializeMap(-74.0059, 40.7128);
      }
    );
  }, [apiKey]);

  const initializeMap = (lng: number, lat: number) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = apiKey!;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 14,
      center: [lng, lat],
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add user location marker
      new mapboxgl.Marker({ color: '#ff3333' })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3><p>You are here</p>'))
        .addTo(map.current!);

      // Add mock safe zones
      const mockSafeZones = [
        { id: 1, name: 'Police Station', lng: lng + 0.01, lat: lat + 0.01 },
        { id: 2, name: 'Hospital', lng: lng - 0.01, lat: lat + 0.005 },
        { id: 3, name: 'Fire Station', lng: lng + 0.005, lat: lat - 0.01 },
      ];

      mockSafeZones.forEach(zone => {
        new mapboxgl.Marker({ color: '#22c55e' })
          .setLngLat([zone.lng, zone.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${zone.name}</h3><p>Safe Zone</p>`))
          .addTo(map.current!);
      });

      // Add mock danger zones
      const mockDangerZones = [
        { id: 1, name: 'High Crime Area', lng: lng - 0.015, lat: lat - 0.005 },
        { id: 2, name: 'Poorly Lit Area', lng: lng + 0.02, lat: lat - 0.01 },
      ];

      mockDangerZones.forEach(zone => {
        new mapboxgl.Marker({ color: '#f59e0b' })
          .setLngLat([zone.lng, zone.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${zone.name}</h3><p>Exercise Caution</p>`))
          .addTo(map.current!);
      });
    });
  };

  const shareLocation = () => {
    if (userLocation) {
      const locationUrl = `https://maps.google.com/?q=${userLocation[1]},${userLocation[0]}`;
      navigator.share?.({
        title: 'My current location - Aurasafe',
        text: 'Sharing my location for safety',
        url: locationUrl
      }) || navigator.clipboard.writeText(locationUrl);
    }
  };

  if (!apiKey) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <CardContent className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Map requires Mapbox API key</p>
          <p className="text-sm text-muted-foreground mt-2">
            Get your free token at mapbox.com
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden bg-card">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 space-y-2">
        <Button
          onClick={shareLocation}
          variant="secondary"
          size="sm"
          className="bg-card/90 backdrop-blur-sm"
        >
          <Users className="h-4 w-4 mr-2" />
          Share Location
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-safe rounded-full"></div>
          <span>Safe Zones</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span>Caution Areas</span>
        </div>
      </div>
    </div>
  );
}