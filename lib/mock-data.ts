import { Agency, City, Weather, AgencyPrediction } from './types';

export const mockCities: City[] = [
  {
    id: 'sekhirat',
    name: 'Sekhirat',
    country: 'Morocco',
    coordinates: {
      lat: 33.8531,
      lng: -7.0458,
    },
    agencies: [
      {
        id: 'cih-bank-1',
        name: 'CIH Bank',
        address: '123 Main Street, Sekhirat',
        crowdDensity: 65,
        city: 'Sekhirat',
        coordinates: {
          lat: 33.8531,
          lng: -7.0458,
        },
      },
    ],
  },
];

export const getNearbyAgencies = (cityId: string): Agency[] => {
  const city = mockCities.find((c) => c.id === cityId);
  return city?.agencies || [];
};

export const getCity = (cityId: string): City | undefined => {
  return mockCities.find((c) => c.id === cityId);
};

export const getPrediction = (agencyId: string): AgencyPrediction => {
  const currentHour = new Date().getHours();
  const predictions = Array.from({ length: 12 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    // Simulate different crowd patterns throughout the day
    let density = Math.floor(Math.random() * 100);
    if (hour >= 9 && hour <= 11) density = Math.min(density + 30, 100); // Busy morning
    if (hour >= 14 && hour <= 16) density = Math.min(density + 20, 100); // Busy afternoon
    if (hour >= 22 || hour <= 5) density = Math.max(density - 40, 0); // Quiet night
    
    return { hour, density };
  });

  // Find the best time to visit (lowest density in the next 12 hours)
  const bestTime = predictions.reduce((best, current) => 
    current.density < best.density ? current : best
  );

  return {
    currentDensity: predictions[0].density,
    predictions,
    bestTimeToVisit: bestTime.hour,
  };
};