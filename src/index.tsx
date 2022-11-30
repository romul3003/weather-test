import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom'

import { persistor, store } from './redux/store'

import App from './App'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)
root.render(
  <StrictMode>
    <HashRouter>
      <CssBaseline>
        <GlobalStyles styles={{
          html: {
            height: '100%',
          },
          body: {
            backgroundColor: '#f8fafb',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
          '#root': {
            height: '100%',
          },
        }}
        />
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}
          >
            <App />
          </PersistGate>
        </Provider>
      </CssBaseline>
    </HashRouter>
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
