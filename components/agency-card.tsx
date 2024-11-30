"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CrowdDensityIndicator } from "@/components/crowd-density-indicator";
import { CrowdPredictionChart } from "@/components/crowd-prediction-chart";
import { WeatherDisplay } from "@/components/weather-display";
import { useWeather } from "@/hooks/use-weather";
import { getPrediction } from "@/lib/mock-data";
import { MapPin, Clock } from "lucide-react";
import type { Agency } from "@/lib/types";

interface AgencyCardProps {
  agency: Agency;
}

export function AgencyCard({ agency }: AgencyCardProps) {
  const { weather } = useWeather(agency.coordinates.lat, agency.coordinates.lng);
  const prediction = getPrediction(agency.id);
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {agency.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{agency.address}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {currentTime}
            </span>
          </div>
          
          <CrowdDensityIndicator 
            density={prediction.currentDensity}
            showRecommendation
          />

          {weather && (
            <WeatherDisplay weather={weather} className="mt-4" />
          )}
        </CardContent>
      </Card>

      <CrowdPredictionChart 
        predictions={prediction.predictions}
        bestTimeToVisit={prediction.bestTimeToVisit}
      />
    </div>
  );
}