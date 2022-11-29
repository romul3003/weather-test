import { useMemo } from 'react'
import { City } from '../redux/types/citiesTypes'

export const createData = (
  name: string,
  value: number,
  measurementUnit: string,
) => ({
  name,
  value,
  measurementUnit,
})

export const useCreateData = (cityMainIndicators: City['main']) => useMemo(() => [
  createData('Feels like', cityMainIndicators.feels_like, '°C'),
  createData('Minimum temperature', cityMainIndicators.temp_min, '°C'),
  createData('Maximum temperature', cityMainIndicators.temp_max, '°C'),
  createData('Pressure', cityMainIndicators.pressure, 'hPa'),
  createData('Humidity', cityMainIndicators.humidity, '%'),
], [cityMainIndicators])
