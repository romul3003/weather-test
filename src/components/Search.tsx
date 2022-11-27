import {
  ChangeEvent, FC, useState, useEffect, useRef,
} from 'react'
import {
  Autocomplete, TextField, CircularProgress, IconButton,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clearOptions, getCityOptionsAsync } from '../redux/slices/cities'
import { selectCities } from '../redux/selectors/cities'
import { CityOptionResponse } from '../redux/types/cities'
import { useDebounce } from '../hooks/useDebounce'

const Search: FC = () => {
  const [cityName, setCityName] = useState('')
  const dispatch = useAppDispatch()
  const debouncedCityName = useDebounce<string>(cityName)
  const { options, loading } = useAppSelector(selectCities)
  const autocompleteRef = useRef()

  // TODO: test, should it be or not
  useEffect(() => {
    dispatch(clearOptions())
  }, [dispatch])

  const handleTextOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.trim()
    setCityName(name)
  }

  const handleOnClearClick = () => {
    setCityName('')
    dispatch(clearOptions())
  }

  useEffect(() => {
    if (debouncedCityName) {
      dispatch(getCityOptionsAsync(debouncedCityName))
    } else {
      dispatch(clearOptions())
    }
  }, [debouncedCityName, dispatch])

  const handleOnSelectChange = (value: CityOptionResponse) => {
    // eslint-disable-next-line no-console
    console.log('value', JSON.stringify(value, null, 2))
  }

  return (
    <Autocomplete
      fullWidth
      freeSolo
      disableClearable
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
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && (
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                )}
                {cityName && (
                  <IconButton onClick={handleOnClearClick}>
                    <ClearIcon />
                  </IconButton>
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
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
