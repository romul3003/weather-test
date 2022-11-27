import { RootState } from '../store'

export const selectOptions = (state: RootState) => state.cities.options
