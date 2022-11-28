import {
  ChangeEvent, FC, useState, useEffect, useRef,
} from 'react'
import {
  Autocomplete, TextField, CircularProgress, IconButton,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clearOptions, getCityOptionsAsync, getCurrentWeather } from '../redux/slices/citiesSlice'
import { selectCities } from '../redux/selectors/citiesSelectors'
import { CityOptionResponse } from '../redux/types/citiesTypes'
import { useDebounce } from '../hooks/useDebounce'

const Search: FC = () => {
  const [cityName, setCityName] = useState('')
  const dispatch = useAppDispatch()
  const debouncedCityName = useDebounce<string>(cityName)
  const { options, loading } = useAppSelector(selectCities)
  const autocompleteRef = useRef()

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

  const handleOnSelectChange = ({ lat, lon }: CityOptionResponse) => {
    dispatch(getCurrentWeather({ lat, lon }))
    setCityName('')
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
                { cityName && loading && (
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
