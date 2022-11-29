import { FC } from 'react'
import { Grid, Paper, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppSelector } from '../redux/hooks'
import { selectCities } from '../redux/selectors/citiesSelectors'
import CityCard from './CityCard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const CitiesList: FC = () => {
  const { cities } = useAppSelector(selectCities)
  const list = Object.values(cities)

  if (!list.length) {
    return null
  }

  return (
    <Box sx={{ width: '100%', marginBottom: 4 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {list.map((city) => {
          const { lat, lon } = city.coordinates

          return (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={`${city.name}${lat}${lon}`}
            >
              <Item>
                <CityCard city={city} />
              </Item>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CitiesList
