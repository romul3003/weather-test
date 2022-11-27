export type CityOptionResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type CityOption = {
  label: string;
  value: string;
}
