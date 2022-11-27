const BASE_URL = 'http://api.openweathermap.org/geo/1.0/direct'
const LIMIT = 5

export const city = Object.freeze({
  getCityOptions: (cityName: string, limit = LIMIT) => fetch(
    `${BASE_URL}?q=${cityName}&limit=${limit}&appId=${process.env.REACT_APP_API_KEY}`,
  ),
})
