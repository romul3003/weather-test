import { FC, PropsWithChildren } from 'react'
import { Container } from '@mui/material'
import Header from './Header'

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <main>
      <Container sx={{ margin: '4rem auto' }}>
        {children}
      </Container>
    </main>
  </>
)

export default Layout
