import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Link,
} from '@mui/material'

import { useAppDispatch } from '../redux/hooks'
import { City, Coords } from '../redux/types/citiesTypes'
import { deleteCity, getCurrentWeather } from '../redux/slices/citiesSlice'

type CityCardProps = {
  city: City;
}

const CityCard: FC<CityCardProps> = ({ city }) => {
  const {
    name,
    coordinates,
    weather: {
      temperature,
      status,
      description,
      icon,
    },
  } = city

  const dispatch = useAppDispatch()

  const handleDeleteCity = (cityName: string) => {
    dispatch(deleteCity(cityName))
  }

  const handleUpdateCity = (coords: Coords) => {
    dispatch(getCurrentWeather(coords))
  }

  return (
    <Card>
      <CardContent>
        <Link
          to={`/details/${name}`}
          component={RouterLink}
          underline="none"
          color="inherit"
          sx={{
            display: 'block',
            borderRadius: '0.5rem',
            padding: '1rem 0',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: 'rgb(66 165 245 / 10%)',
            },
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
          >
            {temperature}
            &#8451;
          </Typography>
          <Typography variant="body2">
            {`${status}, ${description}`}
          </Typography>
          <CardMedia
            component="img"
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="Weather"
            sx={{ width: '5rem', margin: '0 auto' }}
          />
        </Link>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          size="small"
          onClick={() => handleUpdateCity(coordinates)}
        >
          Update
        </Button>
        <Button
          fullWidth
          color="error"
          variant="contained"
          size="small"
          onClick={() => handleDeleteCity(name)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default CityCard
