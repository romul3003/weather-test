import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api'
import { ErrorResponse } from '../../types'
import { Coords } from '../types/citiesTypes'
import { Forecast, ForecastResponse } from '../types/weatherTypes'

export const getForecastAsync = createAsyncThunk<
  Forecast[],
  Coords,
  {rejectValue: ErrorResponse}
>(
  'forecast/getForecast',
  async (coords, thunkApi) => {
    const response = await api.weather.getForecast(coords)

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      return thunkApi.rejectWithValue(error)
    }

    const { list }: ForecastResponse = await response.json()
    return list
  },
)

type ForecastState = {
  forecastList: Forecast[];
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  forecastList: [],
  loading: false,
  error: null,
}

export const forecast = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForecastAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getForecastAsync.fulfilled, (state, action) => {
      state.loading = false
      state.forecastList = action.payload
    })
    builder.addCase(getForecastAsync.rejected, (state, action) => {
      state.loading = false
      state.forecastList = []
      if (action.payload) {
        state.error = action.payload?.message
      } else {
        state.error = action.error.message as string
      }
    })
  },
})

export default forecast.reducer
