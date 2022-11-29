import { FC } from 'react'
import { Box, Typography, CardMedia } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { selectCity } from '../redux/selectors/citiesSelectors'

import BackToMainLink from '../components/BackToMainLink'
import DetailsList from '../components/DetailsList'

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
      <Typography
        component="h1"
        variant="h3"
        align="center"
        mb={0}
      >
        {name}
      </Typography>
      <CardMedia
        component="img"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather"
        sx={{ width: '10rem', margin: '0 auto' }}
      />
      <Typography
        paragraph
        variant="h4"
        align="center"
        mb={0}
      >
        {main.temp}
        °C
      </Typography>
      <Typography
        paragraph
        variant="h5"
        align="center"
        mb={3}
      >
        {`${status}, ${description}`}
      </Typography>
      <DetailsList cityMain={main} />
    </Box>
  )
}

export default CityDetailsPage
