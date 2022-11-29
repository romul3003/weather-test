import { FC } from 'react'
import {
  Route, Routes, Navigate,
} from 'react-router-dom'

import CityDetailsPage from '../pages/CityDetailsPage'
import HomePage from '../pages/HomePage'

const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path="/"
      element={<HomePage />}
    />
    <Route
      path="/details/:cityName"
      element={<CityDetailsPage />}
    />
    <Route
      path="*"
      element={(
        <Navigate
          to="/"
          replace
        />
      )}
    />
  </Routes>
)

export default RoutesComponent
