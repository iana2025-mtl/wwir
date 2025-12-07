"use client";

import { useState, useEffect, useMemo } from "react";
import SightingsMapWrapper from "@/components/SightingsMapWrapper";
import { Sighting, SightingStats } from "@/types/sighting";

// Mock data - will be replaced with actual data loading
const mockSightings: Sighting[] = [
  {
    id: "1",
    date: "9/22/25",
    time: "10:15 PM EST",
    type: "Headless Ghost",
    notes: "He almost got me! I ran away as fast as I could. He just floated there! So I took a picture.",
    latitude: 40.7128,
    longitude: -74.0060,
    city: "New York",
    state: "NY",
    imageUrl: undefined,
  },
  {
    id: "2",
    date: "9/20/25",
    time: "11:30 PM PST",
    type: "Shadow Figure",
    notes: "Saw a dark figure moving across the room. No explanation for it.",
    latitude: 34.0522,
    longitude: -118.2437,
    city: "Los Angeles",
    state: "CA",
    imageUrl: undefined,
  },
  {
    id: "3",
    date: "9/18/25",
    time: "9:45 PM CST",
    type: "Apparition",
    notes: "Clear apparition of a woman in white. Disappeared when I approached.",
    latitude: 41.8781,
    longitude: -87.6298,
    city: "Chicago",
    state: "IL",
    imageUrl: undefined,
  },
  {
    id: "4",
    date: "9/15/25",
    time: "8:20 PM EST",
    type: "Poltergeist",
    notes: "Objects moving on their own. Very unsettling experience.",
    latitude: 29.7604,
    longitude: -95.3698,
    city: "Houston",
    state: "TX",
    imageUrl: undefined,
  },
  {
    id: "5",
    date: "9/12/25",
    time: "10:00 PM MST",
    type: "Phantom",
    notes: "Saw a phantom figure in the old abandoned building.",
    latitude: 35.0844,
    longitude: -106.6504,
    city: "Albuquerque",
    state: "NM",
    imageUrl: undefined,
  },
  {
    id: "6",
    date: "9/10/25",
    time: "7:30 PM PST",
    type: "Spirit",
    notes: "Felt a cold presence and saw a misty figure.",
    latitude: 45.5152,
    longitude: -122.6784,
    city: "Portland",
    state: "OR",
    imageUrl: undefined,
  },
  {
    id: "7",
    date: "9/8/25",
    time: "11:15 PM EST",
    type: "Ghost",
    notes: "Classic ghost sighting. White figure floating through the hallway.",
    latitude: 39.9526,
    longitude: -75.1652,
    city: "Philadelphia",
    state: "PA",
    imageUrl: undefined,
  },
  {
    id: "8",
    date: "9/5/25",
    time: "9:00 PM CST",
    type: "Wraith",
    notes: "Dark wraith-like entity seen near the cemetery.",
    latitude: 32.7767,
    longitude: -96.7970,
    city: "Dallas",
    state: "TX",
    imageUrl: undefined,
  },
  {
    id: "9",
    date: "9/3/25",
    time: "8:45 PM EST",
    type: "Specter",
    notes: "Transparent specter moving through walls.",
    latitude: 25.7617,
    longitude: -80.1918,
    city: "Miami",
    state: "FL",
    imageUrl: undefined,
  },
  {
    id: "10",
    date: "9/1/25",
    time: "10:30 PM PST",
    type: "Phantom",
    notes: "Phantom figure in the mirror. Very creepy!",
    latitude: 37.7749,
    longitude: -122.4194,
    city: "San Francisco",
    state: "CA",
    imageUrl: undefined,
  },
  {
    id: "11",
    date: "8/28/25",
    time: "9:15 PM EST",
    type: "Apparition",
    notes: "Full body apparition of a man in period clothing.",
    latitude: 33.7490,
    longitude: -84.3880,
    city: "Atlanta",
    state: "GA",
    imageUrl: undefined,
  },
  {
    id: "12",
    date: "8/25/25",
    time: "11:00 PM MST",
    type: "Shadow Figure",
    notes: "Large shadow figure blocking the doorway.",
    latitude: 39.7392,
    longitude: -104.9903,
    city: "Denver",
    state: "CO",
    imageUrl: undefined,
  },
  {
    id: "13",
    date: "8/22/25",
    time: "8:30 PM EST",
    type: "Ghost",
    notes: "Child-like ghost figure playing in the yard.",
    latitude: 42.3601,
    longitude: -71.0589,
    city: "Boston",
    state: "MA",
    imageUrl: undefined,
  },
  {
    id: "14",
    date: "8/20/25",
    time: "10:45 PM PST",
    type: "Spirit",
    notes: "Friendly spirit presence. Felt warm, not scary.",
    latitude: 47.6062,
    longitude: -122.3321,
    city: "Seattle",
    state: "WA",
    imageUrl: undefined,
  },
  {
    id: "15",
    date: "8/18/25",
    time: "9:30 PM CST",
    type: "Poltergeist",
    notes: "Doors slamming and items being thrown. Very active!",
    latitude: 38.6270,
    longitude: -90.1994,
    city: "St. Louis",
    state: "MO",
    imageUrl: undefined,
  },
  {
    id: "16",
    date: "8/15/25",
    time: "10:00 PM EST",
    type: "Wraith",
    notes: "Dark wraith seen near the old lighthouse. Very eerie!",
    latitude: 36.8529,
    longitude: -75.9780,
    city: "Virginia Beach",
    state: "VA",
    imageUrl: undefined,
  },
  {
    id: "17",
    date: "8/12/25",
    time: "11:20 PM CST",
    type: "Apparition",
    notes: "Full body apparition in the hotel hallway. Disappeared into the wall.",
    latitude: 35.1495,
    longitude: -90.0490,
    city: "Memphis",
    state: "TN",
    imageUrl: undefined,
  },
  {
    id: "18",
    date: "8/10/25",
    time: "9:45 PM EST",
    type: "Shadow Figure",
    notes: "Tall shadow figure standing in the corner. Felt very cold.",
    latitude: 39.1031,
    longitude: -84.5120,
    city: "Cincinnati",
    state: "OH",
    imageUrl: undefined,
  },
  {
    id: "19",
    date: "8/8/25",
    time: "8:15 PM PST",
    type: "Phantom",
    notes: "Phantom figure seen in the old theater. Wearing vintage clothing.",
    latitude: 36.1699,
    longitude: -115.1398,
    city: "Las Vegas",
    state: "NV",
    imageUrl: undefined,
  },
  {
    id: "20",
    date: "8/5/25",
    time: "10:30 PM EST",
    type: "Ghost",
    notes: "Classic white figure floating down the stairs. Very clear sighting.",
    latitude: 38.9072,
    longitude: -77.0369,
    city: "Washington",
    state: "DC",
    imageUrl: undefined,
  },
  {
    id: "21",
    date: "8/3/25",
    time: "9:00 PM CST",
    type: "Spirit",
    notes: "Felt a presence and saw orbs of light. Peaceful feeling.",
    latitude: 35.4676,
    longitude: -97.5164,
    city: "Oklahoma City",
    state: "OK",
    imageUrl: undefined,
  },
  {
    id: "22",
    date: "8/1/25",
    time: "11:00 PM EST",
    type: "Poltergeist",
    notes: "Items flying off shelves. Very aggressive entity.",
    latitude: 43.1610,
    longitude: -77.6109,
    city: "Rochester",
    state: "NY",
    imageUrl: undefined,
  },
  {
    id: "23",
    date: "7/28/25",
    time: "9:30 PM PST",
    type: "Specter",
    notes: "Misty specter moving through the old mansion. Very transparent.",
    latitude: 32.7157,
    longitude: -117.1611,
    city: "San Diego",
    state: "CA",
    imageUrl: undefined,
  },
  {
    id: "24",
    date: "7/25/25",
    time: "10:15 PM EST",
    type: "Headless Ghost",
    notes: "Headless figure walking through the graveyard. Terrifying!",
    latitude: 35.2271,
    longitude: -80.8431,
    city: "Charlotte",
    state: "NC",
    imageUrl: undefined,
  },
  {
    id: "25",
    date: "7/22/25",
    time: "8:45 PM CST",
    type: "Wraith",
    notes: "Dark wraith-like shadow following me. Very unsettling.",
    latitude: 30.2672,
    longitude: -97.7431,
    city: "Austin",
    state: "TX",
    imageUrl: undefined,
  },
  {
    id: "26",
    date: "7/20/25",
    time: "11:00 PM EST",
    type: "Apparition",
    notes: "Woman in white dress appearing and disappearing. Classic haunting.",
    latitude: 41.7658,
    longitude: -72.6734,
    city: "Hartford",
    state: "CT",
    imageUrl: undefined,
  },
  {
    id: "27",
    date: "7/18/25",
    time: "9:15 PM PST",
    type: "Shadow Figure",
    notes: "Large shadow blocking the light. Felt very negative energy.",
    latitude: 38.5816,
    longitude: -121.4944,
    city: "Sacramento",
    state: "CA",
    imageUrl: undefined,
  },
  {
    id: "28",
    date: "7/15/25",
    time: "10:00 PM EST",
    type: "Phantom",
    notes: "Phantom figure in the mirror. Looked like it was trying to communicate.",
    latitude: 40.4406,
    longitude: -79.9959,
    city: "Pittsburgh",
    state: "PA",
    imageUrl: undefined,
  },
  {
    id: "29",
    date: "7/12/25",
    time: "8:30 PM CST",
    type: "Ghost",
    notes: "Child ghost playing with toys. Sad but not scary.",
    latitude: 39.0997,
    longitude: -94.5786,
    city: "Kansas City",
    state: "MO",
    imageUrl: undefined,
  },
  {
    id: "30",
    date: "7/10/25",
    time: "11:30 PM EST",
    type: "Spirit",
    notes: "Friendly spirit. Felt like it was protecting the house.",
    latitude: 25.7743,
    longitude: -80.1937,
    city: "Miami Beach",
    state: "FL",
    imageUrl: undefined,
  },
  {
    id: "31",
    date: "7/8/25",
    time: "9:45 PM PST",
    type: "Poltergeist",
    notes: "Very active poltergeist. Doors slamming, lights flickering.",
    latitude: 33.9533,
    longitude: -117.3962,
    city: "Riverside",
    state: "CA",
    imageUrl: undefined,
  },
  {
    id: "32",
    date: "7/5/25",
    time: "10:20 PM EST",
    type: "Specter",
    notes: "Misty specter floating through the old library. Very peaceful.",
    latitude: 39.2904,
    longitude: -76.6122,
    city: "Baltimore",
    state: "MD",
    imageUrl: undefined,
  },
  {
    id: "33",
    date: "7/3/25",
    time: "8:00 PM CST",
    type: "Headless Ghost",
    notes: "Headless horseman figure. Very clear and terrifying!",
    latitude: 41.2565,
    longitude: -95.9345,
    city: "Omaha",
    state: "NE",
    imageUrl: undefined,
  },
  {
    id: "34",
    date: "7/1/25",
    time: "11:15 PM EST",
    type: "Wraith",
    notes: "Dark wraith in the basement. Felt very cold and negative.",
    latitude: 40.7128,
    longitude: -74.0060,
    city: "Newark",
    state: "NJ",
    imageUrl: undefined,
  },
  {
    id: "35",
    date: "6/28/25",
    time: "9:30 PM PST",
    type: "Apparition",
    notes: "Full body apparition of a soldier. Very detailed and clear.",
    latitude: 47.2529,
    longitude: -122.4443,
    city: "Tacoma",
    state: "WA",
    imageUrl: undefined,
  },
  {
    id: "36",
    date: "6/25/25",
    time: "10:45 PM EST",
    type: "Shadow Figure",
    notes: "Tall shadow figure in the doorway. Blocked all light.",
    latitude: 42.8864,
    longitude: -78.8784,
    city: "Buffalo",
    state: "NY",
    imageUrl: undefined,
  },
  {
    id: "37",
    date: "6/22/25",
    time: "8:15 PM CST",
    type: "Phantom",
    notes: "Phantom figure in the old school. Wearing period clothing.",
    latitude: 35.5951,
    longitude: -82.5515,
    city: "Asheville",
    state: "NC",
    imageUrl: undefined,
  },
  {
    id: "38",
    date: "6/20/25",
    time: "11:00 PM EST",
    type: "Ghost",
    notes: "White figure floating through the hallway. Classic ghost sighting.",
    latitude: 40.2737,
    longitude: -76.8844,
    city: "Harrisburg",
    state: "PA",
    imageUrl: undefined,
  },
  {
    id: "39",
    date: "6/18/25",
    time: "9:00 PM MST",
    type: "Spirit",
    notes: "Friendly spirit presence. Felt warm and protective.",
    latitude: 33.4484,
    longitude: -112.0740,
    city: "Phoenix",
    state: "AZ",
    imageUrl: undefined,
  },
  {
    id: "40",
    date: "6/15/25",
    time: "10:30 PM EST",
    type: "Poltergeist",
    notes: "Very aggressive poltergeist. Objects flying everywhere!",
    latitude: 41.8781,
    longitude: -87.6298,
    city: "Evanston",
    state: "IL",
    imageUrl: undefined,
  },
  {
    id: "41",
    date: "6/12/25",
    time: "8:45 PM PST",
    type: "Specter",
    notes: "Misty specter in the fog. Very ethereal and beautiful.",
    latitude: 45.5152,
    longitude: -122.6784,
    city: "Beaverton",
    state: "OR",
    imageUrl: undefined,
  },
  {
    id: "42",
    date: "6/10/25",
    time: "11:20 PM EST",
    type: "Headless Ghost",
    notes: "Headless figure walking through the park. Very disturbing!",
    latitude: 38.2527,
    longitude: -85.7585,
    city: "Louisville",
    state: "KY",
    imageUrl: undefined,
  },
  {
    id: "43",
    date: "6/8/25",
    time: "9:15 PM CST",
    type: "Wraith",
    notes: "Dark wraith-like entity. Felt very negative and cold.",
    latitude: 29.4241,
    longitude: -98.4936,
    city: "San Antonio",
    state: "TX",
    imageUrl: undefined,
  },
  {
    id: "44",
    date: "6/5/25",
    time: "10:00 PM EST",
    type: "Apparition",
    notes: "Full body apparition of a woman. Very clear and detailed.",
    latitude: 43.1610,
    longitude: -77.6109,
    city: "Syracuse",
    state: "NY",
    imageUrl: undefined,
  },
  {
    id: "45",
    date: "6/3/25",
    time: "8:30 PM PST",
    type: "Shadow Figure",
    notes: "Large shadow figure. Felt very threatening.",
    latitude: 34.0522,
    longitude: -118.2437,
    city: "Burbank",
    state: "CA",
    imageUrl: undefined,
  },
];

const mockStats: SightingStats = {
  totalSightings: 12002,
  mostRecentSighting: "2 Days Ago",
  mostGhostlyCity: "Albuquerque, NM",
};

export default function Home() {
  console.log("🏠 Home component rendering - WraithWatchers Dashboard");
  const [sightings, setSightings] = useState<Sighting[]>(mockSightings);
  const [stats, setStats] = useState<SightingStats>(mockStats);
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  
  console.log("📊 Current sightings count:", sightings.length);
  console.log("📈 Stats:", stats);
  const [filters, setFilters] = useState({
    type: "",
    dateFrom: "",
    dateTo: "",
    city: "",
  });

  useEffect(() => {
    // TODO: Load actual data from CSV/API
    console.log("🔄 WraithWatchers: Home page loaded with", mockSightings.length, "sightings");
    console.log("📍 Total markers on map:", mockSightings.length);
    console.log("📍 Sightings locations:", mockSightings.map(s => `${s.city}, ${s.state}`));
  }, []);

  // Helper function to parse date from "M/D/YY" format
  const parseSightingDate = (dateString: string): Date | null => {
    try {
      // Format is "M/D/YY" or "MM/D/YY" etc.
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0]) - 1; // Month is 0-indexed
        const day = parseInt(parts[1]);
        let year = parseInt(parts[2]);
        // Handle 2-digit years (assume 2000s)
        if (year < 100) {
          year += 2000;
        }
        return new Date(year, month, day);
      }
      return null;
    } catch {
      return null;
    }
  };

  // Calculate center and zoom for filtered sightings
  const calculateMapCenter = (sightings: Sighting[]): [number, number] => {
    if (sightings.length === 0) {
      return [39.8283, -98.5795]; // Default center of USA
    }
    
    // Calculate average center point
    const avgLat = sightings.reduce((sum, s) => sum + s.latitude, 0) / sightings.length;
    const avgLng = sightings.reduce((sum, s) => sum + s.longitude, 0) / sightings.length;
    
    return [avgLat, avgLng];
  };

  const calculateZoom = (sightings: Sighting[]): number => {
    if (sightings.length === 0) return 4;
    if (sightings.length === 1) return 10; // Zoom in for single marker
    
    // Calculate bounds
    const lats = sightings.map(s => s.latitude);
    const lngs = sightings.map(s => s.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    // Calculate approximate zoom based on spread
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);
    
    // Adjust zoom based on spread (larger spread = lower zoom)
    if (maxDiff > 20) return 3;
    if (maxDiff > 10) return 4;
    if (maxDiff > 5) return 5;
    if (maxDiff > 2) return 6;
    if (maxDiff > 1) return 7;
    if (maxDiff > 0.5) return 8;
    if (maxDiff > 0.2) return 9;
    return 10;
  };

  // Filter sightings based on filter criteria
  const filteredSightings = useMemo(() => {
    let filtered = [...mockSightings];

    // Filter by type (case-insensitive partial match)
    if (filters.type.trim()) {
      const typeFilter = filters.type.toLowerCase().trim();
      filtered = filtered.filter(sighting =>
        sighting.type.toLowerCase().includes(typeFilter)
      );
      console.log(`🔍 Filtering by type "${filters.type}": ${filtered.length} matches`);
    }

    // Filter by city (case-insensitive partial match)
    if (filters.city.trim()) {
      const cityFilter = filters.city.toLowerCase().trim();
      filtered = filtered.filter(sighting =>
        sighting.city?.toLowerCase().includes(cityFilter)
      );
      console.log(`🏙️ Filtering by city "${filters.city}": ${filtered.length} matches`);
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter(sighting => {
        const sightingDate = parseSightingDate(sighting.date);
        if (!sightingDate) return false;
        sightingDate.setHours(0, 0, 0, 0);
        return sightingDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // Include entire end date
      filtered = filtered.filter(sighting => {
        const sightingDate = parseSightingDate(sighting.date);
        if (!sightingDate) return false;
        sightingDate.setHours(23, 59, 59, 999);
        return sightingDate <= toDate;
      });
    }

    console.log("🔍 Filtering results:", {
      total: mockSightings.length,
      filtered: filtered.length,
      filters: filters,
      activeFilters: Object.entries(filters).filter(([_, v]) => v).length
    });

    return filtered;
  }, [filters]);

  // Calculate map center and zoom based on filtered sightings
  const mapCenter = useMemo(() => {
    const center = calculateMapCenter(filteredSightings);
    console.log("📍 Calculated map center:", center, "for", filteredSightings.length, "sightings");
    return center;
  }, [filteredSightings]);

  const mapZoom = useMemo(() => {
    const zoom = calculateZoom(filteredSightings);
    console.log("🔍 Calculated map zoom:", zoom, "for", filteredSightings.length, "sightings");
    return zoom;
  }, [filteredSightings]);

  const handleMarkerClick = (sighting: Sighting) => {
    console.log("👻 Marker clicked:", sighting.type, "in", sighting.city);
    setSelectedSighting(sighting);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      type: "",
      dateFrom: "",
      dateTo: "",
      city: "",
    });
    console.log("🧹 Filters cleared");
  };

  return (
    <div className="min-h-screen bg-black text-ghost-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-ghost-white text-black p-6 rounded-lg border-2 border-black">
            <h3 className="text-sm font-medium text-black/70 mb-1">
              Total Sightings
            </h3>
            <p className="text-3xl font-bold">{stats.totalSightings.toLocaleString()}</p>
          </div>
          <div className="bg-ghost-white text-black p-6 rounded-lg border-2 border-black">
            <h3 className="text-sm font-medium text-black/70 mb-1">
              Most Recent Sighting
            </h3>
            <p className="text-3xl font-bold">{stats.mostRecentSighting}</p>
          </div>
          <div className="bg-ghost-white text-black p-6 rounded-lg border-2 border-black">
            <h3 className="text-sm font-medium text-black/70 mb-1">
              Most Ghostly City
            </h3>
            <p className="text-3xl font-bold">{stats.mostGhostlyCity}</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Sightings Map</h2>
            <div className="flex items-center gap-3">
              {filteredSightings.length !== mockSightings.length && (
                <div className="bg-faded-orange text-black px-4 py-2 rounded-md font-semibold">
                  {filteredSightings.length} of {mockSightings.length} Markers
                </div>
              )}
              {filteredSightings.length === mockSightings.length && (
                <div className="bg-faded-orange text-black px-4 py-2 rounded-md font-semibold">
                  {mockSightings.length} Markers Active
                </div>
              )}
            </div>
          </div>
          <div className="bg-ghost-white/10 rounded-lg p-4 border border-muted-gray/20">
            <div className="h-[600px] w-full rounded-lg overflow-hidden" style={{ imageRendering: 'crisp-edges' }}>
              <SightingsMapWrapper
                key="sightings-map"
                sightings={filteredSightings}
                onMarkerClick={handleMarkerClick}
                isFiltered={filteredSightings.length !== mockSightings.length}
                center={mapCenter}
                zoom={mapZoom}
              />
            </div>
            {selectedSighting && (
              <div className="mt-4 bg-ghost-white text-black p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{selectedSighting.type}</h3>
                <p className="text-sm mb-1">
                  <strong>Date of Sighting:</strong> {selectedSighting.date}
                </p>
                <p className="text-sm mb-1">
                  <strong>Time of Sighting:</strong> {selectedSighting.time}
                </p>
                <p className="text-sm mb-1">
                  <strong>Type of Sighting:</strong> {selectedSighting.type}
                </p>
                {selectedSighting.imageUrl && (
                  <img
                    src={selectedSighting.imageUrl}
                    alt="Sighting"
                    className="w-full h-48 object-cover rounded mt-2 mb-2"
                  />
                )}
                <p className="text-sm">
                  <strong>Sighting Notes:</strong> {selectedSighting.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Filter Control Panel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Filter Control Panel</h2>
            {(filters.type || filters.city || filters.dateFrom || filters.dateTo) && (
              <button
                onClick={clearFilters}
                className="bg-muted-gray hover:bg-muted-gray/80 text-ghost-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="bg-muted-gray/20 rounded-lg p-6 border border-muted-gray/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Type of Sighting
                </label>
                <input
                  type="text"
                  value={filters.type}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFilters({ ...filters, type: newValue });
                    console.log("🔍 Type filter changed:", newValue);
                  }}
                  className="w-full px-3 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
                  placeholder="Filter by type..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFilters({ ...filters, city: newValue });
                    console.log("🏙️ City filter changed:", newValue);
                  }}
                  className="w-full px-3 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
                  placeholder="Filter by city..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sightings Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sightings Table</h2>
          <div className="bg-ghost-white text-black rounded-lg border-2 border-black p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Time</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Location</th>
                    <th className="text-left py-3 px-4 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSightings.length > 0 ? (
                    filteredSightings.map((sighting, index) => (
                      <tr key={sighting.id || index} className="border-b border-black/20">
                        <td className="py-3 px-4">{sighting.date}</td>
                        <td className="py-3 px-4">{sighting.time}</td>
                        <td className="py-3 px-4">{sighting.type}</td>
                        <td className="py-3 px-4">
                          {sighting.city && sighting.state
                            ? `${sighting.city}, ${sighting.state}`
                            : "N/A"}
                        </td>
                        <td className="py-3 px-4 max-w-md truncate">
                          {sighting.notes}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-black/60">
                        {mockSightings.length > 0 
                          ? "No sightings match your filters. Try adjusting your search criteria."
                          : "No sightings to display"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Data */}
        <div className="mb-8">
          <a
            href="#"
            className="text-faded-orange hover:text-faded-orange/80 underline"
          >
            Export Data
          </a>
        </div>
      </div>
    </div>
  );
}
