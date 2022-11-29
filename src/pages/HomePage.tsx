import { FC } from 'react'
import { Box } from '@mui/material'
import Search from '../components/Search'
import CitiesList from '../components/CitiesList'

const HomePage: FC = () => (
  <Box>
    <Search />
    <CitiesList />
  </Box>
)

export default HomePage
