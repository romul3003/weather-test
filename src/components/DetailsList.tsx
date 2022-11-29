import { List, ListItem, ListItemText } from '@mui/material'
import { FC } from 'react'
import { City } from '../redux/types/citiesTypes'

type DetailsListProps = {
  cityMain: City['main'];
  isDense?: boolean;
}

const DetailsList: FC<DetailsListProps> = ({ cityMain, isDense }) => (
  <List dense={isDense}>
    <ListItem
      disablePadding
      sx={{ textAlign: 'center' }}
    >
      <ListItemText primary={`Feels like: ${cityMain.feels_like}°C`} />
    </ListItem>
    <ListItem
      disablePadding
      sx={{ textAlign: 'center' }}
    >
      <ListItemText primary={`Temp min: ${cityMain.temp_min}°C`} />
    </ListItem>
    <ListItem
      disablePadding
      sx={{ textAlign: 'center' }}
    >
      <ListItemText primary={`Temp max: ${cityMain.temp_max}°C`} />
    </ListItem>
    <ListItem
      disablePadding
      sx={{ textAlign: 'center' }}
    >
      <ListItemText primary={`Pressure: ${cityMain.pressure} hPa`} />
    </ListItem>
    <ListItem
      disablePadding
      sx={{ textAlign: 'center' }}
    >
      <ListItemText primary={`Humidity: ${cityMain.humidity}%`} />
    </ListItem>
  </List>
)

export default DetailsList
