import { ROOT_URL } from './config'
import { Coords } from '../redux/types/citiesTypes'

const BASE_URL = `${ROOT_URL}/data/2.5`
const LIMIT = 12

export const weather = Object.freeze({
  getCurrentWeather: ({ lat, lon }: Coords) => fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
  ),

  getForecast: ({ lat, lon }: Coords, limit = LIMIT) => fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&cnt=${limit}&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
  ),
})
