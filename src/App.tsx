import { FC } from 'react'
import RoutesComponent from './navigation'
import Layout from './components/Layout'

const App: FC = () => (
  <Layout>
    <RoutesComponent />
  </Layout>

)

export default App
