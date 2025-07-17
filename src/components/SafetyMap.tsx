import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, MapPin } from 'lucide-react';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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

  const initializeLocation = useCallback((): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          updateMap(latitude, longitude);
        },
        () => {
          setUserLocation([40.7128, -74.0059]);
          updateMap(40.7128, -74.0059);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setUserLocation([40.7128, -74.0059]);
      updateMap(40.7128, -74.0059);
    }
  }, []);

  useEffect(() => {
    initializeLocation();
    const interval = setInterval(() => {
      initializeLocation();
    }, 15000);

    return () => clearInterval(interval);
  }, [initializeLocation]);

  const updateMap = (lat: number, lng: number): void => {
    if (!map.current && mapContainer.current) {
      map.current = L.map(mapContainer.current).setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      })
        .addTo(map.current)
        .on('load', () => setIsLoading(false))
        .on('tileerror', () => {
          setError('Failed to load map tiles');
          setIsLoading(false);
        });
    }

    if (map.current) {
      map.current.eachLayer((layer: L.Layer) => {
        if ((layer as L.Marker).getLatLng) map.current!.removeLayer(layer);
      });

      const createCustomIcon = (color: string, symbol: string): L.DivIcon =>
        L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${symbol}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

      const userIcon = createCustomIcon('#ef4444', '●');
      const safeIcon = createCustomIcon('#22c55e', '✓');
      const warningIcon = createCustomIcon('#f59e0b', '!');

      L.marker([lat, lng], { icon: userIcon }).addTo(map.current).bindPopup('You are here');

      const mockSafeZones = [
        { name: 'Police Station', lat: lat + 0.01, lng: lng + 0.01 },
        { name: 'Hospital', lat: lat + 0.005, lng: lng - 0.01 },
      ];
      mockSafeZones.forEach((zone) => {
        L.marker([zone.lat, zone.lng], { icon: safeIcon })
          .addTo(map.current!)
          .bindPopup(`${zone.name} (Safe Zone)`);
      });

      const mockDangerZones = [
        { name: 'High Crime Area', lat: lat - 0.005, lng: lng - 0.015 },
      ];
      mockDangerZones.forEach((zone) => {
        L.marker([zone.lat, zone.lng], { icon: warningIcon })
          .addTo(map.current!)
          .bindPopup(`${zone.name} (Caution)`);
      });

      setTimeout(() => {
        map.current?.invalidateSize();
      }, 200);
    }
  };

  const shareLocation = (): void => {
    if (!userLocation) return;
    const [lat, lng] = userLocation;
    const locationUrl = `https://maps.google.com/?q=${lat},${lng}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'My current location - Aurasafe',
          text: 'Sharing my location for safety',
          url: locationUrl,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(locationUrl)
        .then(() => console.log('Location copied'))
        .catch(() => console.log('Failed to copy'));
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
