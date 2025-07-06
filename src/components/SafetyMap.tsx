import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users } from 'lucide-react';

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

  useEffect(() => {
    if (!mapContainer.current) return;

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([latitude, longitude]); // Note: Leaflet uses [lat, lng]
        initializeMap(latitude, longitude);
      },
      () => {
        // Default to New York if location access denied
        setUserLocation([40.7128, -74.0059]);
        initializeMap(40.7128, -74.0059);
      }
    );

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const initializeMap = (lat: number, lng: number) => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [lat, lng],
      zoom: 14,
      zoomControl: true,
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Custom icons for different marker types
    const userIcon = new L.Icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNlZjQ0NDQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });

    const safeIcon = new L.Icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMjJjNTVlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });

    const warningIcon = new L.Icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDlWMTNNMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxQzcuMDI5NDQgMjEgMyAxNi45NzA2IDMgMTJDMyA3LjAyOTQ0IDcuMDI5NDQgMyAxMiAzQzE2Ljk3MDYgMyAyMSA3LjAyOTQ0IDIxIDEyWk0xMi4wMSAxN0gxMlYxN0gxMi4wMVoiIHN0cm9rZT0iI2Y1OWUwYiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9IiNmNTllMGIiLz4KPC9zdmc+',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });

    // Add user location marker
    L.marker([lat, lng], { icon: userIcon })
      .addTo(map.current)
      .bindPopup('<h3>Your Location</h3><p>You are here</p>');

    // Add mock safe zones
    const mockSafeZones = [
      { id: 1, name: 'Police Station', lat: lat + 0.01, lng: lng + 0.01 },
      { id: 2, name: 'Hospital', lat: lat + 0.005, lng: lng - 0.01 },
      { id: 3, name: 'Fire Station', lat: lat - 0.01, lng: lng + 0.005 },
    ];

    mockSafeZones.forEach(zone => {
      L.marker([zone.lat, zone.lng], { icon: safeIcon })
        .addTo(map.current!)
        .bindPopup(`<h3>${zone.name}</h3><p>Safe Zone</p>`);
    });

    // Add mock danger zones
    const mockDangerZones = [
      { id: 1, name: 'High Crime Area', lat: lat - 0.005, lng: lng - 0.015 },
      { id: 2, name: 'Poorly Lit Area', lat: lat - 0.01, lng: lng + 0.02 },
    ];

    mockDangerZones.forEach(zone => {
      L.marker([zone.lat, zone.lng], { icon: warningIcon })
        .addTo(map.current!)
        .bindPopup(`<h3>${zone.name}</h3><p>Exercise Caution</p>`);
    });

    setIsLoading(false);
  };

  const shareLocation = () => {
    if (userLocation) {
      const locationUrl = `https://maps.google.com/?q=${userLocation[0]},${userLocation[1]}`;
      navigator.share?.({
        title: 'My current location - Aurasafe',
        text: 'Sharing my location for safety',
        url: locationUrl
      }) || navigator.clipboard.writeText(locationUrl);
    }
  };

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