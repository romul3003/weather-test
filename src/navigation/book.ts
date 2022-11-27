import HomePage from '../pages/HomePage'
import CityDetailsPage from '../pages/CityDetailsPage'

const baseUrl = '/'

export const book = Object.freeze({
  root: {
    path: `${baseUrl}`,
    page: HomePage,
  },
  details: {
    path: `${baseUrl}/city/:cityName`,
    page: CityDetailsPage,
  },
})
