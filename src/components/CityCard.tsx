import {
  FC, useState, SyntheticEvent,
} from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Link,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useAppDispatch } from '../redux/hooks'
import { City, Coords } from '../redux/types/citiesTypes'
import { deleteCity, getCurrentWeather } from '../redux/slices/citiesSlice'
import DetailsList from './DetailsList'

type CityCardProps = {
  city: City;
}

const CityCard: FC<CityCardProps> = ({ city }) => {
  const {
    name,
    coordinates,
    main,
    weather: { main: status, description, icon },
  } = city

  const [expanded, setExpanded] = useState<string | false>(false)

  const dispatch = useAppDispatch()

  const handleDeleteCity = (cityName: string) => {
    dispatch(deleteCity(cityName))
  }

  const handleUpdateCity = (coords: Coords) => {
    dispatch(getCurrentWeather(coords))
  }

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
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
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h3"
              component="div"
            >
              {main.temp}
              °C
            </Typography>
            <CardMedia
              component="img"
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Weather"
              sx={{ width: '5rem', margin: '0 auto' }}
            />
          </Stack>
          <Typography variant="body2">
            {`${status}, ${description}`}
          </Typography>
        </Link>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              variant="h6"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              {expanded ? 'See less..' : 'See more..'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <List dense>
              <ListItem disablePadding>
                <ListItemText primary={`Feels like: ${main.feels_like}°C`} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={`Temp min: ${main.temp_min}°C`} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={`Temp max: ${main.temp_max}°C`} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={`Pressure: ${main.pressure} hPa`} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary={`Humidity: ${main.humidity}%`} />
              </ListItem>
            </List> */}
            <DetailsList
              cityMain={main}
              isDense
            />
          </AccordionDetails>
        </Accordion>
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
