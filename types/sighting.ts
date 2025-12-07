export interface Sighting {
  id?: string;
  date: string;
  time: string;
  type: string;
  notes: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  city?: string;
  state?: string;
}

export interface SightingStats {
  totalSightings: number;
  mostRecentSighting: string;
  mostGhostlyCity: string;
}

