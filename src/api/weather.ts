import { ROOT_URL } from './config'
import { Coords } from '../redux/types/citiesTypes'

const BASE_URL = `${ROOT_URL}/data/2.5/weather`

export const weather = Object.freeze({
  getCurrentWeather: ({ lat, lon }: Coords) => fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`,
  ),
})
