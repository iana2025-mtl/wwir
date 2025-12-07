"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LocationPickerMapWrapper from "@/components/LocationPickerMapWrapper";
import { Sighting } from "@/types/sighting";

export default function PostSighting() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Sighting>>({
    date: "",
    time: "",
    type: "",
    notes: "",
    latitude: 0,
    longitude: 0,
  });
  const [locationSelected, setLocationSelected] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData({ ...formData, latitude: lat, longitude: lng });
    setLocationSelected(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Submit to API/database
    console.log("Submitting sighting:", formData);
    
    // Redirect to thank you page
    router.push("/thank-you");
  };

  return (
    <div className="min-h-screen bg-black text-ghost-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Post a Sighting</h1>
          <p className="text-lg text-ghost-white/80">
            Did you spot a spirit? Post information below so that our community can stand vigilant!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date of Sighting */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium mb-2"
            >
              Date of Sighting
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
            />
          </div>

          {/* Time of Sighting */}
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium mb-2"
            >
              Time of Sighting
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
            />
          </div>

          {/* Type of Sighting */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium mb-2"
            >
              Type of Sighting
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              placeholder="e.g., Headless Ghost, Shadow Figure, Apparition"
              className="w-full px-4 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange"
            />
          </div>

          {/* Sighting Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium mb-2"
            >
              Sighting Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Describe what you saw..."
              className="w-full px-4 py-2 bg-black border border-muted-gray rounded-md text-ghost-white focus:outline-none focus:ring-2 focus:ring-faded-orange resize-none"
            />
          </div>

          {/* Location Map */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Where Were You Exactly? (Place a Pin)
            </label>
            <div className="bg-ghost-white/10 rounded-lg p-4 border border-muted-gray/20">
              <div className="h-[400px] w-full rounded-lg overflow-hidden">
                <LocationPickerMapWrapper onLocationSelect={handleLocationSelect} />
              </div>
              {locationSelected && (
                <p className="mt-2 text-sm text-faded-orange">
                  ✓ Location selected: {formData.latitude?.toFixed(4)}, {formData.longitude?.toFixed(4)}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!locationSelected}
              className="w-full bg-black text-ghost-white px-6 py-4 rounded-md font-semibold text-lg border-2 border-ghost-white hover:bg-ghost-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Your Sighting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

