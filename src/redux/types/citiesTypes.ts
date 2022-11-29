import { CurrentWeatherResponse } from './weatherTypes'

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
  coordinates: Coords;
  main: CurrentWeatherResponse['main'];
  weather: CurrentWeatherResponse['weather'][0]
}
