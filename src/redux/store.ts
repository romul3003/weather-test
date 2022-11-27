import { configureStore } from '@reduxjs/toolkit'
import citiesReducer from './slices/cities'

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {auth: authReducer}
export type AppDispatch = typeof store.dispatch
