export interface Agency {
  id: string;
  name: string;
  address: string;
  crowdDensity: number;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface City {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  agencies: Agency[];
}

export interface UserPreferences {
  crowdDensityThreshold: number;
  notificationsEnabled: boolean;
  preferredCity?: string;
}

export interface Weather {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface CrowdPrediction {
  hour: number;
  density: number;
}

export interface AgencyPrediction {
  currentDensity: number;
  predictions: CrowdPrediction[];
  bestTimeToVisit: number;
}