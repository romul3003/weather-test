// Core
import { FC } from 'react'
import {
  Route, Routes, Navigate,
} from 'react-router-dom'

import { book } from './book'

const RoutesComponent: FC = () => {
  const routesJSX = Object
    .values(book)
    .map(({ path, page: Page }) => (
      <Route
        key={path}
        path={path}
        element={<Page />}
      />
    ))

  return (
    <Routes>
      { routesJSX }
      <Route
        path="*"
        element={(
          <Navigate
            to={book.root.path}
            replace
          />
        )}
      />
    </Routes>
  )
}

export default RoutesComponent
