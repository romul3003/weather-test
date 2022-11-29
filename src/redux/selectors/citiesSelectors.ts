import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectCities = (state: RootState) => state.cities

export const selectCity = (cityName: string | undefined) => createSelector(
  selectCities,
  (cities) => {
    if (!cityName) {
      return null
    }

    return cities.cities[cityName]
  },
)
