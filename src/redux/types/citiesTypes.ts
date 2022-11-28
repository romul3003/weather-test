export type Coords = {
  lat: number;
  lon: number;
}

export type CityOptionResponse = Coords & {
  name: string;
  country: string;
  state?: string;
}

export type City = {
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  weather: {
    status: string;
    temperature: number;
    description: string;
    icon: string;
  }
}
