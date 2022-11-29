import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const BackToMainLink: FC = () => (
  <Link
    to="/"
    component={RouterLink}
    underline="none"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}
  >
    <KeyboardBackspaceIcon />
    Back to Main
  </Link>
)

export default BackToMainLink
