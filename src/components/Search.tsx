import {
  ChangeEvent, FC, useState, useEffect, useRef,
} from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clearOptions, getCityOptionsAsync } from '../redux/slices/cities'
import { selectOptions } from '../redux/slices/selectors'
import { CityOptionResponse } from '../redux/types/cities'

const Search: FC = () => {
  const [cityName, setCityName] = useState('')
  const dispatch = useAppDispatch()
  const options = useAppSelector(selectOptions)
  const autocompleteRef = useRef()

  useEffect(() => {
    dispatch(clearOptions())
  }, [dispatch])

  const handleTextOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.trim()

    if (name) {
      dispatch(getCityOptionsAsync(name))
      setCityName(name)
    } else {
      dispatch(clearOptions())
      setCityName('')
    }
  }

  const handleOnSelectChange = (value: CityOptionResponse) => {
    // eslint-disable-next-line no-console
    console.log('value', JSON.stringify(value, null, 2))
  }

  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={cityName ? options : []}
      filterOptions={x => x}
      inputValue={cityName}
      ref={autocompleteRef}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        }
        return option.name
      }}
      onChange={(_, value) => handleOnSelectChange(value as CityOptionResponse)}
      renderInput={params => (
        <TextField
          {...params}
          fullWidth
          label="Enter city name"
          value={cityName}
          onChange={handleTextOnChange}
        />
      )}
      renderOption={(props, {
        name, lat, lon, state,
      }) => (
        <li
          {...props}
          key={`${name}${lat}${lon}`}
        >
          {`${name}${state ? `, ${state}` : ''}`}
        </li>
      )}
    />
  )
}

export default Search
