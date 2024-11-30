"use client";

import { useState } from "react";
import { AgencyCard } from "@/components/agency-card";
import { LocationSelector } from "@/components/location-selector";
import { PreferencesDialog } from "@/components/preferences-dialog";
import { useToast } from "@/hooks/use-toast";
import { getNearbyAgencies } from "@/lib/mock-data";
import type { UserPreferences } from "@/lib/types";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>();
  const [preferences, setPreferences] = useState<UserPreferences>({
    crowdDensityThreshold: 70,
    notificationsEnabled: true,
  });
  const { toast } = useToast();

  const agencies = selectedCity ? getNearbyAgencies(selectedCity) : [];

  const handlePreferencesSave = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">CODAITECHS</h1>
          <PreferencesDialog preferences={preferences} onSave={handlePreferencesSave} />
        </div>

        <div className="mb-8">
          <LocationSelector
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>

        {agencies.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}