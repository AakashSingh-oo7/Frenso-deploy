import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import CustomThemeProvider from './components/homepage/Toggle.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider>
            <App />
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </CustomThemeProvider>
  </StrictMode>,
)
