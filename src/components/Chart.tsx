import { FC, useMemo } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import {
  Box, Stack, Card, CardContent, Typography, CardMedia,
} from '@mui/material'
import { useAppSelector } from '../redux/hooks'
import { selectForecast } from '../redux/selectors/forecastSelectors'

const formatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  year: '2-digit',
  month: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

const Chart: FC = () => {
  const { loading, forecastList } = useAppSelector(selectForecast)

  const averageTemperature = useMemo(() => {
    if (forecastList.length) {
      return Math.round(
        forecastList.reduce(
          ((acc, item) => acc + item.main.temp),
          0,
        ) / forecastList.length,
      )
    }

    return 0
  }, [forecastList])

  if (loading) {
    return (
      <Box textAlign="center">
        <AutorenewIcon />
      </Box>
    )
  }

  return forecastList.length ? (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0}
      sx={{ height: '14rem', overflowX: 'auto' }}
    >
      {forecastList.map((item) => {
        const date = new Date(item.dt_txt)
        const temperature = Math.round(item.main.temp)

        return (
          <Card
            key={item.dt}
            sx={{
              flex: '0 0 9rem',
              textAlign: 'center',
              // eslint-disable-next-line no-magic-numbers
              transform: `translateY(${averageTemperature - temperature * 3}px)`,
            }}
          >
            <CardContent>
              <CardMedia
                component="img"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="Weather"
                sx={{ width: '3rem', margin: '0 auto' }}
              />
              <Typography>
                {formatter.format(date)}
              </Typography>
              <Typography variant="h6">
                {`${temperature}°C`}
              </Typography>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  ) : null
}

export default Chart
