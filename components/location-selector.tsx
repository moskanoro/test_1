"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CitySelector } from "@/components/city-selector";
import type { City } from "@/lib/types";

interface LocationSelectorProps {
  selectedCity?: string;
  onCityChange: (cityId: string) => void;
}

export function LocationSelector({ selectedCity, onCityChange }: LocationSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CitySelector onCityChange={onCityChange} selectedCity={selectedCity} />
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            // In a real app, this would use the browser's geolocation API
            onCityChange('sekhirat');
          }}
        >
          Use My Location
        </Button>
      </CardContent>
    </Card>
  );
}