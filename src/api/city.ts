import { API_KEY, ROOT_URL } from './config'

const BASE_URL = `${ROOT_URL}/geo/1.0/direct`
const LIMIT = 5

export const city = Object.freeze({
  getCityOptions: (cityName: string, limit = LIMIT) => fetch(
    `${BASE_URL}?q=${cityName}&limit=${limit}&appId=${API_KEY}`,
  ),
})
