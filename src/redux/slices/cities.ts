import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api/index'
import { ErrorResponse } from '../../types'
import { CityOptionResponse } from '../types/cities'

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

type CitiesState = {
  options: CityOptionResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  options: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(getCityOptionsAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getCityOptionsAsync.fulfilled, (state, action) => {
      state.loading = false
      state.options = action.payload
    })
    builder.addCase(getCityOptionsAsync.rejected, (state, action) => {
      state.loading = false
      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message as string
      }
    })
  },
})

export const { clearOptions } = cities.actions

export default cities.reducer
