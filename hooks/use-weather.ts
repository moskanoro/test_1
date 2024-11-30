import useSWR from 'swr';
import type { Weather } from '@/lib/types';

const WEATHER_API_KEY = 'demo-key'; // Replace with actual API key in production

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch weather data');
  return res.json();
};

// For demo purposes, return mock weather data
const getMockWeather = (lat: number, lng: number): Weather => {
  const conditions = ['sunny', 'cloudy', 'rain', 'windy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
    condition: randomCondition,
    icon: `weather-${randomCondition}`,
    humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
  };
};

export function useWeather(lat?: number, lng?: number) {
  // In a real application, you would use the actual API URL
  // const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lng}`;
  
  // For demo purposes, we'll use mock data
  const { data, error } = useSWR(
    lat && lng ? `weather/${lat}/${lng}` : null,
    () => Promise.resolve(getMockWeather(lat!, lng!)),
    {
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  return {
    weather: data,
    isLoading: !error && !data,
    isError: error,
  };
}