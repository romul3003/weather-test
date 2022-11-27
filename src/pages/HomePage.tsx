import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import Search from '../components/Search'

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
  </Box>
)

export default HomePage
