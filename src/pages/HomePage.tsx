/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import Search from '../components/Search'
import CitiesList from '../components/CitiesList'

const HomePage: FC = () => (
  <Box>
    <Typography
      component="h1"
      variant="h3"
      mb={3}
    >
      HomePage
    </Typography>
    <Search />
    <CitiesList />
  </Box>
)

export default HomePage
