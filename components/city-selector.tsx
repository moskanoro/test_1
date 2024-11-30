"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCities } from "@/lib/mock-data";

interface CitySelectorProps {
  onCityChange: (cityId: string) => void;
  selectedCity?: string;
}

export function CitySelector({ onCityChange, selectedCity }: CitySelectorProps) {
  return (
    <Select onValueChange={onCityChange} value={selectedCity}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a city" />
      </SelectTrigger>
      <SelectContent>
        {mockCities.map((city) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}, {city.country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}