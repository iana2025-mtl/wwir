"use client";

import dynamic from "next/dynamic";
import { Sighting } from "@/types/sighting";

const SightingsMap = dynamic(() => import("./SightingsMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-lg">
      <p className="text-ghost-white">Loading map...</p>
    </div>
  ),
});

interface SightingsMapWrapperProps {
  sightings: Sighting[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (sighting: Sighting) => void;
  isFiltered?: boolean;
}

export default function SightingsMapWrapper(props: SightingsMapWrapperProps) {
  console.log("🗺️ SightingsMapWrapper: Loading map with", props.sightings.length, "sightings");
  console.log("🔍 Filtered mode:", props.isFiltered);
  return <SightingsMap {...props} />;
}

