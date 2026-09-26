import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FandomProvider } from './context/FandomContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FandomProvider>
      <App />
    </FandomProvider>
  </StrictMode>,
)
