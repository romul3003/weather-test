import {
  createSlice, createAsyncThunk, AnyAction, PayloadAction,
} from '@reduxjs/toolkit'
import { formatToCelsius } from '../../helpers/formatToCelsius'
import { api } from '../../api/index'
import { ErrorResponse } from '../../types'
import { City, CityOptionResponse, Coords } from '../types/citiesTypes'
import { CurrentWeatherResponse } from '../types/weatherTypes'

export const getCityOptionsAsync = createAsyncThunk<
  CityOptionResponse[],
  string,
  {rejectValue: ErrorResponse}
>(
  'city/getCityOptions',
  async (name, thunkApi) => {
    const response = await api.city.getCityOptions(name)

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      return thunkApi.rejectWithValue(error)
    }

    return (await response.json()) as CityOptionResponse[]
  },
)

export const getCurrentWeather = createAsyncThunk<
  City,
  Coords,
  {rejectValue: ErrorResponse}
>(
  'city/getCurrentWeather',
  async (coords, thunkApi) => {
    const response = await api.weather.getCurrentWeather(coords)

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      return thunkApi.rejectWithValue(error)
    }

    const {
      name, main, weather, coord: coordinates,
    }: CurrentWeatherResponse = await response.json()

    const { main: status, description, icon } = weather[0]
    const temperature = formatToCelsius(main.temp)

    return {
      name,
      coordinates,
      weather: {
        status, temperature, description, icon,
      },
    }
  },
)

type CitiesState = {
  options: CityOptionResponse[];
  cities: {
    [name: string]: City;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  options: [],
  cities: {},
  loading: false,
  error: null,
}

export const cities = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    clearOptions: (state) => {
      state.options = []
    },
    deleteCity: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCityOptionsAsync.fulfilled, (state, action) => {
      state.loading = false
      state.options = action.payload
    })
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      const cityName = action.payload.name
      state.loading = false
      state.cities[cityName] = action.payload
    })

    builder.addMatcher(
      isPending,
      (state) => {
        state.loading = true
        state.error = null
      },
    )
    builder.addMatcher(
      isError,
      (state, action) => {
        state.loading = false
        if (action.payload) {
          state.error = action.payload?.message
        } else {
          state.error = action.error.message as string
        }
      },
    )
  },
})

export const { clearOptions, deleteCity } = cities.actions

export default cities.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending')
}
