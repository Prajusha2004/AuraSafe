
import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, MapPin } from 'lucide-react';

// Fix for default markers in Leaflet with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export function SafetyMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Add a small delay to ensure the container is properly rendered
    const timer = setTimeout(() => {
      initializeLocation();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const initializeLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          console.log('User location obtained:', latitude, longitude);
          setUserLocation([latitude, longitude]);
          initializeMap(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Default to New York if location access denied
          console.log('Using default location: New York');
          setUserLocation([40.7128, -74.0059]);
          initializeMap(40.7128, -74.0059);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.warn('Geolocation not supported');
      setUserLocation([40.7128, -74.0059]);
      initializeMap(40.7128, -74.0059);
    }
  };

  const initializeMap = (lat: number, lng: number) => {
    try {
      if (!mapContainer.current) {
        console.error('Map container not found');
        setError('Map container not available');
        setIsLoading(false);
        return;
      }

      console.log('Initializing map at:', lat, lng);

      // Initialize map
      map.current = L.map(mapContainer.current, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: true,
        attributionControl: true,
      });

      // Add tile layer (OpenStreetMap)
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      });

      tileLayer.addTo(map.current);

      // Handle tile loading events
      tileLayer.on('loading', () => {
        console.log('Tiles loading...');
      });

      tileLayer.on('load', () => {
        console.log('Tiles loaded successfully');
        setIsLoading(false);
        setError(null);
      });

      tileLayer.on('tileerror', (e) => {
        console.error('Tile loading error:', e);
        setError('Failed to load map tiles');
        setIsLoading(false);
      });

      // Create custom icons
      const createCustomIcon = (color: string, symbol: string) => {
        return L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${symbol}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
      };

      const userIcon = createCustomIcon('#ef4444', '●');
      const safeIcon = createCustomIcon('#22c55e', '✓');
      const warningIcon = createCustomIcon('#f59e0b', '!');

      // Add user location marker
      L.marker([lat, lng], { icon: userIcon })
        .addTo(map.current)
        .bindPopup('<strong>Your Location</strong><br>You are here');

      // Add mock safe zones
      const mockSafeZones = [
        { id: 1, name: 'Police Station', lat: lat + 0.01, lng: lng + 0.01 },
        { id: 2, name: 'Hospital', lat: lat + 0.005, lng: lng - 0.01 },
        { id: 3, name: 'Fire Station', lat: lat - 0.01, lng: lng + 0.005 },
      ];

      mockSafeZones.forEach(zone => {
        L.marker([zone.lat, zone.lng], { icon: safeIcon })
          .addTo(map.current!)
          .bindPopup(`<strong>${zone.name}</strong><br>Safe Zone`);
      });

      // Add mock danger zones
      const mockDangerZones = [
        { id: 1, name: 'High Crime Area', lat: lat - 0.005, lng: lng - 0.015 },
        { id: 2, name: 'Poorly Lit Area', lat: lat - 0.01, lng: lng + 0.02 },
      ];

      mockDangerZones.forEach(zone => {
        L.marker([zone.lat, zone.lng], { icon: warningIcon })
          .addTo(map.current!)
          .bindPopup(`<strong>${zone.name}</strong><br>Exercise Caution`);
      });

      // Force map to resize after initialization
      setTimeout(() => {
        if (map.current) {
          map.current.invalidateSize();
          console.log('Map size invalidated');
        }
      }, 200);

    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  };

  const shareLocation = () => {
    if (userLocation) {
      const locationUrl = `https://maps.google.com/?q=${userLocation[0]},${userLocation[1]}`;
      if (navigator.share) {
        navigator.share({
          title: 'My current location - Aurasafe',
          text: 'Sharing my location for safety',
          url: locationUrl
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(locationUrl).then(() => {
          console.log('Location copied to clipboard');
        }).catch(() => {
          console.log('Failed to copy to clipboard');
        });
      }
    }
  };

  if (error) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <CardContent className="text-center">
          <MapPin className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-2">Map Error</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              initializeLocation();
            }}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <CardContent className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading map...</p>
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
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Safe Zones</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Caution Areas</span>
        </div>
      </div>
    </div>
  );
}
