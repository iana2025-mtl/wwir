"use client";

import dynamic from "next/dynamic";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-lg">
      <p className="text-ghost-white">Loading map...</p>
    </div>
  ),
});

interface LocationPickerMapWrapperProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

export default function LocationPickerMapWrapper(props: LocationPickerMapWrapperProps) {
  return <LocationPickerMap {...props} />;
}

