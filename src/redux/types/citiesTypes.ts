export type Coords = {
  lat: number;
  lon: number;
}

export type CityOptionResponse = Coords & {
  name: string;
  country: string;
  state?: string;
}
