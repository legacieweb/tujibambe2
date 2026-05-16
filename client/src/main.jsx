import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>,
)
