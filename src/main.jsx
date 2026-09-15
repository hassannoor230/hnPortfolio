import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { SettingsProvider } from './contexts/SettingsContext.jsx'
import ScrollToTop from './hooks/scroll.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <ScrollToTop />
        <App />
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
