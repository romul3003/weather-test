import { FC } from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import { useCreateData } from '../hooks/useCreateData'
import { City } from '../redux/types/citiesTypes'

type DetailsListProps = {
  cityMainIndicators: City['main'];
  isDense?: boolean;
}

const DetailsList: FC<DetailsListProps> = ({ cityMainIndicators, isDense }) => {
  const rows = useCreateData(cityMainIndicators)

  return (
    <List dense={isDense}>
      {rows.map(row => (
        <ListItem
          key={row.name}
          disablePadding
          sx={{ textAlign: 'center' }}
        >
          <ListItemText primary={`${row.name} ${row.value} ${row.measurementUnit}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default DetailsList
