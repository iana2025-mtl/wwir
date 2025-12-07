"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js - Higher resolution
const createCustomIcon = () => {
  const svgString = `
    <svg width="50" height="82" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
      <defs>
        <filter id="shadow-picker">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path fill="#000" stroke="#FF9F40" stroke-width="0.8" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.5 12.5 28.5 12.5 28.5S25 21 25 12.5C25 5.6 19.4 0 12.5 0z" filter="url(#shadow-picker)"/>
      <circle fill="#FF9F40" cx="12.5" cy="12.5" r="4"/>
    </svg>
  `;
  return new Icon({
    iconUrl: "data:image/svg+xml;base64," + btoa(svgString),
    iconSize: [30, 50], // Smaller size
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
    className: "high-res-marker",
  });
};

interface LocationPickerMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

function LocationMarker({ position, onLocationSelect }: { position: [number, number] | null; onLocationSelect: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
      map.setView([lat, lng], map.getZoom());
    },
  });

  if (!position) return null;

  const customIcon = createCustomIcon();

  return <Marker position={position} icon={customIcon} />;
}

export default function LocationPickerMap({
  onLocationSelect,
  initialPosition = [39.8283, -98.5795],
}: LocationPickerMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition ? [initialPosition[0], initialPosition[1]] : null
  );

  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={initialPosition}
        zoom={6}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          tileSize={256}
          zoomOffset={0}
          maxZoom={19}
          minZoom={2}
        />
        <LocationMarker position={position} onLocationSelect={handleLocationSelect} />
      </MapContainer>
    </div>
  );
}

