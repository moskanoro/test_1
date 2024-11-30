"use client";

import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Weather } from "@/lib/types";

interface WeatherDisplayProps {
  weather: Weather;
  className?: string;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case "rain":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case "cloudy":
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case "windy":
      return <Wind className="h-6 w-6 text-cyan-500" />;
    default:
      return <Sun className="h-6 w-6 text-yellow-500" />;
  }
};

export function WeatherDisplay({ weather, className }: WeatherDisplayProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WeatherIcon condition={weather.condition} />
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Temperature</span>
            <span className="font-medium">{weather.temperature}°C</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Condition</span>
            <span className="font-medium">{weather.condition}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Wind Speed</span>
            <span className="font-medium">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}