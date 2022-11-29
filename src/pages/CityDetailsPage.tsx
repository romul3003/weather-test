import { FC } from 'react'
import {
  Box, Typography, CardMedia, Stack,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { selectCity } from '../redux/selectors/citiesSelectors'

import BackToMainLink from '../components/BackToMainLink'
import DetailedTable from '../components/DetailedTable'

const CityDetailsPage: FC = () => {
  const { cityName } = useParams()
  const city = useAppSelector(selectCity(cityName))

  if (!city) {
    return (
      <>
        <BackToMainLink />
        <Typography
          component="h1"
          variant="h3"
          align="center"
          mb={3}
        >
          Oops, something went wrong :(
        </Typography>
      </>
    )
  }

  const {
    name,
    main,
    weather: { main: status, description, icon },
  } = city

  return (
    <Box>
      <BackToMainLink />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          mb={0}
        >
          {name}
        </Typography>
        <Typography
          paragraph
          variant="h3"
          align="center"
          mb={0}
        >
          {main.temp}
          °C
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography
          paragraph
          variant="h5"
          align="center"
          mb={0}
        >
          {`${status}, ${description}`}
        </Typography>
        <CardMedia
          component="img"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather"
          sx={{ width: '5rem', margin: '0 auto' }}
        />
      </Stack>
      <DetailedTable cityMainIndicators={main} />
    </Box>
  )
}

export default CityDetailsPage
