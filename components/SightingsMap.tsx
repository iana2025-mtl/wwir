"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Map } from "leaflet";
import { Icon } from "leaflet";
import { Sighting } from "@/types/sighting";
import { useEffect, useMemo, useRef } from "react";
import "leaflet/dist/leaflet.css";

// Component to update map view when center/zoom changes and fit bounds to markers
function MapUpdater({ center, zoom, sightingsCount, sightings }: { center: [number, number]; zoom: number; sightingsCount: number; sightings: any[] }) {
  const map = useMap();
  
  // Store map instance for debugging
  useEffect(() => {
    (window as any).leafletMap = map;
  }, [map]);
  
  useEffect(() => {
    // Only update view if we have sightings to show
    if (sightingsCount > 0 && sightings.length > 0) {
      // Wait longer to ensure markers are fully rendered
      const timer = setTimeout(() => {
        // Check if markers are actually in the DOM
        const markers = document.querySelectorAll('.leaflet-marker-icon');
        console.log("🔍 Found", markers.length, "marker elements in DOM");
        
        if (markers.length > 0) {
          // Try to fit bounds to show all markers
          try {
            const bounds = sightings.map(s => [s.latitude, s.longitude] as [number, number]);
            if (bounds.length > 0) {
              // If only one marker or all markers are at same location, use setView
              const uniqueBounds = bounds.filter((b, i, self) => 
                i === self.findIndex(t => t[0] === b[0] && t[1] === b[1])
              );
              
              if (uniqueBounds.length === 1) {
                map.setView(uniqueBounds[0], Math.max(zoom, 10), { animate: true, duration: 0.5 });
              } else {
                // Fit bounds to show all markers with padding
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
              }
              console.log("🗺️ Map view updated/fit to bounds for", sightingsCount, "markers");
            }
          } catch (error) {
            // Fallback to setView if fitBounds fails
            map.setView(center, zoom, { animate: true, duration: 0.5 });
            console.log("🗺️ Map view updated to center (fallback):", center, "zoom:", zoom);
          }
          
          // Force map to refresh
          map.invalidateSize();
          
          // Double check markers are visible
          setTimeout(() => {
            const visibleMarkers = document.querySelectorAll('.leaflet-marker-icon:not([style*="display: none"])');
            console.log("👁️ Visible markers after update:", visibleMarkers.length);
          }, 500);
        } else {
          console.warn("⚠️ No markers found in DOM, retrying...");
          // Retry once more
          setTimeout(() => {
            const retryMarkers = document.querySelectorAll('.leaflet-marker-icon');
            if (retryMarkers.length > 0) {
              map.setView(center, zoom, { animate: false });
              map.invalidateSize();
            }
          }, 500);
        }
      }, 500); // Increased delay to 500ms
      
      return () => clearTimeout(timer);
    }
  }, [center, zoom, sightingsCount, sightings, map]);
  
  return null;
}

// Fix for default marker icons in Next.js - Higher resolution
const createCustomIcon = () => {
  // Create higher resolution SVG (2x for retina displays)
  const svgString = `
    <svg width="50" height="82" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.6" flood-color="#00FFFF"/>
        </filter>
      </defs>
      <path fill="#FF1493" stroke="#00FFFF" stroke-width="1.2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.5 12.5 28.5 12.5 28.5S25 21 25 12.5C25 5.6 19.4 0 12.5 0z" filter="url(#shadow)"/>
      <circle fill="#00FFFF" cx="12.5" cy="12.5" r="4"/>
    </svg>
  `;
  const iconUrl = "data:image/svg+xml;base64," + btoa(svgString);
  console.log("🎨 Creating high-resolution custom marker icon");
  const icon = new Icon({
    iconUrl: iconUrl,
    iconSize: [30, 50], // Smaller size
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
    className: "high-res-marker",
  });
  
  // Verify icon loads
  const img = new Image();
  img.onload = () => console.log("✅ Custom icon loaded successfully");
  img.onerror = () => console.error("❌ Custom icon failed to load");
  img.src = iconUrl;
  
  return icon;
};

interface SightingsMapProps {
  sightings: Sighting[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (sighting: Sighting) => void;
  isFiltered?: boolean; // Indicates if these are filtered results
}

export default function SightingsMap({
  sightings,
  center = [39.8283, -98.5795], // Center of USA
  zoom = 4,
  onMarkerClick,
  isFiltered = false,
}: SightingsMapProps) {
  console.log("🗺️ SightingsMap component rendering");
  console.log("📊 Received", sightings.length, "sightings to display");
  console.log("📍 Marker positions:", sightings.map(s => `[${s.latitude}, ${s.longitude}]`));
  console.log("🔍 Filtered mode:", isFiltered);

  // Create highlighted icon for filtered results
  const createHighlightedIcon = () => {
    const svgString = `
      <svg width="50" height="82" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
        <defs>
          <filter id="shadow-highlight">
            <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.8" flood-color="#FF1493"/>
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path fill="#FF1493" stroke="#00FFFF" stroke-width="1.2" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.5 12.5 28.5 12.5 28.5S25 21 25 12.5C25 5.6 19.4 0 12.5 0z" filter="url(#shadow-highlight) url(#glow)"/>
        <circle fill="#00FFFF" cx="12.5" cy="12.5" r="5"/>
      </svg>
    `;
    const iconUrl = "data:image/svg+xml;base64," + btoa(svgString);
    return new Icon({
      iconUrl: iconUrl,
      iconSize: [35, 58], // Smaller size for highlighted markers
      iconAnchor: [17, 58],
      popupAnchor: [0, -58],
      className: "high-res-marker highlighted-marker",
    });
  };

  // Memoize icons to prevent recreation on every render
  const customIcon = useMemo(() => createCustomIcon(), []);
  const highlightedIcon = useMemo(() => createHighlightedIcon(), []);
  
  console.log("✅ High-resolution custom icon created successfully (30x50px)");
  if (isFiltered) {
    console.log("✨ Highlighted icons enabled for filtered results (35x58px)");
  }
  console.log("📐 Map resolution: High DPI tiles enabled, maxZoom: 19");

  const previousSightingsRef = useRef<string>('');
  
  useEffect(() => {
    // Create a unique string representation of sightings to detect changes
    const sightingsKey = sightings.map(s => `${s.id || s.latitude}-${s.longitude}`).join(',');
    
    console.log("✅ Map component updated with", sightings.length, "markers");
    console.log("🎯 Map center:", center, "Zoom:", zoom);
    console.log("📍 Sightings updated - markers should refresh");
    console.log("📍 Sightings data:", sightings.map(s => ({ id: s.id, city: s.city, type: s.type })));
    
    // If sightings changed, force a refresh
    if (previousSightingsRef.current !== sightingsKey) {
      previousSightingsRef.current = sightingsKey;
      console.log("🔄 Sightings array changed, forcing marker refresh");
      
      // Force map to invalidate size after markers are added/removed
      const timer = setTimeout(() => {
        const mapElement = document.querySelector('.leaflet-container');
        if (mapElement) {
          // Remove all existing markers first (React Leaflet should handle this, but force it)
          const existingMarkers = document.querySelectorAll('.leaflet-marker-icon');
          console.log("🧹 Found", existingMarkers.length, "existing markers in DOM");
          
          window.dispatchEvent(new Event('resize'));
          // Also try to get the map instance and invalidate
          const mapInstance = (window as any).leafletMap;
          if (mapInstance) {
            mapInstance.invalidateSize();
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sightings, center, zoom]);

  // Create a key that changes when sightings change to force React to update markers
  const sightingsKey = useMemo(() => {
    return sightings.map(s => `${s.id || s.latitude}-${s.longitude}`).sort().join('|');
  }, [sightings]);

  // Force re-render of markers when sightings change by using key on a wrapper
  const markersKey = `markers-${sightings.length}-${sightingsKey.substring(0, 50)}`;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        className="rounded-lg"
        whenReady={() => {
          // Map is ready - we'll access it via useMap hook in MapUpdater
          console.log("🗺️ Map container ready");
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          tileSize={256}
          zoomOffset={0}
          maxZoom={19}
          minZoom={2}
        />
        <MapUpdater center={center} zoom={zoom} sightingsCount={sightings.length} sightings={sightings} />
        {sightings.length > 0 ? (
          sightings.map((sighting, index) => {
            // Use a unique key that changes when sightings array changes to force React to update
            const markerKey = `marker-${markersKey}-${sighting.id || `idx-${index}`}-${sighting.latitude.toFixed(4)}-${sighting.longitude.toFixed(4)}`;
            const markerPosition: [number, number] = [sighting.latitude, sighting.longitude];
            console.log(`📍 Rendering marker ${index + 1}/${sightings.length}: ${sighting.type} at [${markerPosition[0]}, ${markerPosition[1]}]`);
            
            // Validate coordinates
            if (isNaN(markerPosition[0]) || isNaN(markerPosition[1])) {
              console.error("❌ Invalid coordinates for marker:", sighting);
              return null;
            }
            
            return (
              <Marker
                key={markerKey}
                position={markerPosition}
                icon={isFiltered ? highlightedIcon : customIcon}
                zIndexOffset={isFiltered ? 1000 : 500}
                eventHandlers={{
                  click: () => {
                    console.log("🖱️ Marker clicked:", sighting.id, sighting.type);
                    if (onMarkerClick) {
                      onMarkerClick(sighting);
                    }
                  },
                  add: () => {
                    console.log("✅ Marker added to map:", sighting.type, "at", markerPosition);
                  },
                  remove: () => {
                    console.log("🗑️ Marker removed from map:", sighting.type);
                  },
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-black mb-2">
                      {sighting.type}
                    </h3>
                    <p className="text-sm text-black/80 mb-1">
                      <strong>Date:</strong> {sighting.date}
                    </p>
                    <p className="text-sm text-black/80 mb-1">
                      <strong>Time:</strong> {sighting.time}
                    </p>
                    {sighting.city && sighting.state && (
                      <p className="text-sm text-black/80 mb-2">
                        <strong>Location:</strong> {sighting.city}, {sighting.state}
                      </p>
                    )}
                    {sighting.imageUrl && (
                      <img
                        src={sighting.imageUrl}
                        alt="Sighting"
                        className="w-full h-32 object-cover rounded mt-2 mb-2"
                      />
                    )}
                    <p className="text-sm text-black/70 mt-2">
                      {sighting.notes}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })
        ) : (
          (() => {
            console.log("⚠️ No sightings to display on map");
            return null;
          })()
        )}
      </MapContainer>
    </div>
  );
}

